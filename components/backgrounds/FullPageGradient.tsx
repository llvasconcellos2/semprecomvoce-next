/* Subtle ambient gradients */
export default function FullPageGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full -z-10"
      style={
        {
          //transform: `translate(-${DRAWER_WIDTH}px, -50px)`,
          //width: `calc(100% + ${DRAWER_WIDTH}px)`,
          // background: "radial-gradient(ellipse at 10% 0%, rgba(41,171,226,0.14) 0%, transparent 55%), radial-gradient(ellipse at 40% 100%, rgba(232,23,138,0.10) 0%, transparent 55%)",
        }
      }
    />
  );
}
