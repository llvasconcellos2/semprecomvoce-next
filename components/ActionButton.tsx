import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export default function ActionButton({
  children,
  className,
  boxClassName = "",
  href,
  ...props
}: {
  boxClassName?: string;
  href: Url;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <span className={`${boxClassName} shimmer-ring`}>
      <Link
        href={href}
        {...props}
        className={`${className ?? ""} block w-full bg-brand-pink text-white font-semibold font-display text-sm p-4 rounded-full
                   hover:bg-brand-pink/90 hover:shadow-xl hover:shadow-brand-pink/30 hover:-translate-y-0.5 whitespace-nowrap
                   active:translate-y-0 transition-[transform,box-shadow,background-color] duration-200 cursor-pointer`}
      >
        {children}
      </Link>
    </span>
  );
}
