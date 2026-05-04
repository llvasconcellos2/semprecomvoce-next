export default function ActionButton({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={`bg-brand-pink text-white font-semibold font-display text-sm px-8 py-4 rounded-full
                         hover:bg-brand-pink/90 hover:shadow-xl hover:shadow-brand-pink/30 hover:-translate-y-0.5
                         active:translate-y-0 transition-all duration-200 ${props.className} cursor-pointer`}
    >
      {children}
    </a>
  );
}
