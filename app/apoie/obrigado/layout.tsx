export default function ObrigadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Remove the white background from <main> so the body's navy gradient shows through */}
      <style>{`#viewport > main { background-color: transparent !important; }`}</style>
      {children}
    </>
  );
}
