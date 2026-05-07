import { useState, useEffect } from "react";

export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({ width: null, height: null });

  useEffect(() => {
    function update() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dimensions;
}
