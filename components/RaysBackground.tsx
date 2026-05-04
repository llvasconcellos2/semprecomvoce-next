"use client";

import { useEffect, useRef } from "react";

// ─── Shaders ────────────────────────────────────────────────────────────────

const VERT_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG_SRC = `
precision highp float;

uniform vec4 u_color1;
uniform vec4 u_color2;
uniform float u_intensity;
uniform float u_rays;
uniform float u_reach;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_rayPos1;
uniform vec2 u_rayPos2;

float rayStrength(
  vec2 raySource,
  vec2 rayRefDir,
  vec2 coord,
  float seedA,
  float seedB,
  float speed
) {
  vec2 d = coord - raySource;
  float cosAngle = dot(normalize(d), rayRefDir);
  float diagonal = length(u_resolution);

  float angular = clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + u_time * speed)) +
    (0.30 + 0.20 * cos(-cosAngle * seedB + u_time * speed)),
    u_reach, 1.0
  );

  float dist = clamp((diagonal - length(d)) / diagonal, u_reach, 1.0);

  return angular * dist;
}

void main() {
  // Framer uses CSS coordinates (y=0 at top, y=height at bottom).
  // WebGL gl_FragCoord has y=0 at bottom, so we flip here to match.
  vec2 coord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  vec2 center = vec2(u_resolution.x * 0.5, u_resolution.y * 0.5);

  vec2 rayRefDir1 = normalize(center - u_rayPos1);
  vec2 rayRefDir2 = normalize(center - u_rayPos2);

  // u_rays (0–0.3) scales the angular frequency → more rays as the value rises
  float seedScale = 1.0 + u_rays * 12.0;

  float s1 = rayStrength(u_rayPos1, rayRefDir1, coord,
    4.2 * seedScale, 5.9 * seedScale, 1.0);
  float s2 = rayStrength(u_rayPos2, rayRefDir2, coord,
    3.8 * seedScale, 7.3 * seedScale, 1.25);

  // Brighter near the top (close to sources above), fades downward — matches
  // Framer's attenuation: brightness = u_reach - (css_y / height)
  float height01 = coord.y / u_resolution.y;
  float attenuation = clamp((u_reach - height01) + 0.5 + u_intensity, 0.0, 1.0);

  float a1 = s1 * attenuation * u_color1.a;
  float a2 = s2 * attenuation * u_color2.a;

  vec3 rgb = u_color1.rgb * a1 + u_color2.rgb * a2;
  float alpha = a1 + a2 * (1.0 - a1);

  gl_FragColor = vec4(rgb, alpha);
}
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToVec4(
  hex: string,
  alpha: number,
): [number, number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
    alpha,
  ];
}

function mapRange(v: number, a: number, b: number, c: number, d: number) {
  return c + ((v - a) / (b - a)) * (d - c);
}

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "[RaysBackground] Shader compile error:",
      gl.getShaderInfoLog(shader),
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// ─── Component ───────────────────────────────────────────────────────────────

export interface RaysBackgroundProps {
  /** First ray color (hex). Defaults to brand-pink */
  color1?: string;
  /** Second ray color (hex). Defaults to brand-blue */
  color2?: string;
  /** Opacity of color1 (0–1) */
  alpha1?: number;
  /** Opacity of color2 (0–1) */
  alpha2?: number;
  /** Overall brightness of rays (0–100) */
  intensity?: number;
  /** Ray count / angular density (0–100) */
  rays?: number;
  /** Minimum brightness floor (0–100) */
  reach?: number;
  /** Horizontal position of the light source (0–100, 50 = center) */
  position?: number;
  /** Animation speed (0–100) */
  speed?: number;
  className?: string;
}

export function RaysBackground({
  color1 = "#E8178A",
  color2 = "#2060DF",
  alpha1 = 0.9,
  alpha2 = 0.75,
  intensity = 50,
  rays = 40,
  reach = 25,
  position = 50,
  speed = 25,
  className,
}: RaysBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mutable ref so prop changes are picked up inside the animation loop
  // without tearing down and recreating the WebGL context.
  const propsRef = useRef({
    color1,
    color2,
    alpha1,
    alpha2,
    intensity,
    rays,
    reach,
    position,
    speed,
  });
  propsRef.current = {
    color1,
    color2,
    alpha1,
    alpha2,
    intensity,
    rays,
    reach,
    position,
    speed,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vert || !frag) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(
        "[RaysBackground] Program link error:",
        gl.getProgramInfoLog(prog),
      );
      return;
    }
    gl.useProgram(prog);

    // Full-screen quad (two triangles)
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uColor1 = gl.getUniformLocation(prog, "u_color1");
    const uColor2 = gl.getUniformLocation(prog, "u_color2");
    const uIntensity = gl.getUniformLocation(prog, "u_intensity");
    const uRays = gl.getUniformLocation(prog, "u_rays");
    const uReach = gl.getUniformLocation(prog, "u_reach");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uResolution = gl.getUniformLocation(prog, "u_resolution");
    const uRayPos1 = gl.getUniformLocation(prog, "u_rayPos1");
    const uRayPos2 = gl.getUniformLocation(prog, "u_rayPos2");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Start at a random time offset so multiple instances look different
    let time = Math.random() * 1e4;
    let lastTs = -1;
    let rafId = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.round(rect.width * dpr);
      h = Math.round(rect.height * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    resize();

    const animate = (ts: number) => {
      if (lastTs < 0) lastTs = ts;
      const delta = ts - lastTs;
      lastTs = ts;

      const p = propsRef.current;

      // Matches the Framer plugin formula: delta_ms * speed / 10000
      time += (delta * p.speed) / 10000;

      const c1 = hexToVec4(p.color1, p.alpha1);
      const c2 = hexToVec4(p.color2, p.alpha2);
      const x = w * (p.position / 100);
      const offset = w * 0.08;

      gl.uniform4fv(uColor1, c1);
      gl.uniform4fv(uColor2, c2);
      gl.uniform1f(uIntensity, mapRange(p.intensity, 0, 100, 0, 0.5));
      gl.uniform1f(uRays, mapRange(p.rays, 0, 100, 0, 0.3));
      gl.uniform1f(uReach, mapRange(p.reach, 0, 100, 0, 0.5));
      gl.uniform1f(uTime, time);
      gl.uniform2f(uResolution, w, h);
      // Sources are positioned below the visible canvas, rays fan upward
      gl.uniform2f(uRayPos1, x, -0.4 * h);
      gl.uniform2f(uRayPos2, x + offset, -0.5 * h);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buf);
    };
  }, []); // WebGL context is created once; live props are read via propsRef

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
