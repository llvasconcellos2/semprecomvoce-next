import Image from "next/image";
import authors from "@/data/authors.json";

type Author = (typeof authors)[0];

export function BlogAuthor({ authorId }: { authorId: string }) {
  const author = authors.find(
    (a) => a.id.toLowerCase() === authorId.toLowerCase()
  );
  if (!author) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 pb-12 lg:pb-20">
      <div className="h-px bg-brand-navy/10 mb-10" />
      <div className="flex gap-5 items-start">
        <div className="relative shrink-0 w-16 h-16 rounded-full overflow-hidden ring-2 ring-brand-pink/30 ring-offset-2">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-display font-bold text-brand-navy text-base leading-tight">
              {author.name}
            </span>
            <span className="text-xs font-medium text-brand-pink bg-brand-pink-light px-2.5 py-0.5 rounded-full">
              {author.role}
            </span>
          </div>
          <p className="text-brand-navy/60 text-sm leading-relaxed">
            {author.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
