export default function ActionButton({
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <span className={`shimmer-ring ${className ?? ""}`}>
      <a
        {...props}
        className="block w-full bg-brand-pink text-white font-semibold font-display text-sm px-8 py-4 rounded-full
                   hover:bg-brand-pink/90 hover:shadow-xl hover:shadow-brand-pink/30 hover:-translate-y-0.5
                   active:translate-y-0 transition-[transform,box-shadow,background-color] duration-200 cursor-pointer"
      >
        {children}
      </a>
    </span>
  );
}
