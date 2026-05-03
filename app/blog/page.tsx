import posts from "@/data/posts.json";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

type Post = (typeof posts)[0];

function formatDate({ year, month, day }: Post["date"]) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

const sortedPosts = [...posts].sort((a, b) => {
  const da = new Date(a.date.year, a.date.month - 1, a.date.day).getTime();
  const db = new Date(b.date.year, b.date.month - 1, b.date.day).getTime();
  return db - da;
});

function PostCard({ post }: { post: Post }) {
  const cover = post.gallery[0];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-navy/8 hover:border-brand-pink/25 shadow-[0_2px_16px_-4px_rgba(29,43,79,0.08)] hover:shadow-[0_12px_40px_-8px_rgba(232,23,138,0.16)] transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden bg-brand-pink-light">
        {cover ? (
          <Image
            src={cover.path}
            alt={cover.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{
              objectPosition:
                cover.width && cover.height && cover.width < cover.height
                  ? "50% 20%"
                  : "center",
            }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-brand-pink/20 text-5xl select-none">♥</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col flex-1 p-6 gap-3">
        <span className="text-xs font-medium font-display text-brand-pink bg-brand-pink-light px-3 py-1 rounded-full self-start">
          {formatDate(post.date)}
        </span>

        <h3 className="font-display font-bold text-brand-navy text-base leading-snug group-hover:text-brand-pink transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-brand-navy/55 text-sm leading-relaxed line-clamp-3 flex-1">
          {post.intro}
        </p>

        <div className="flex items-center gap-1.5 flex-wrap mt-1">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-brand-blue-light text-brand-blue px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-1.5 text-brand-pink text-sm font-semibold font-display mt-2">
          Ler história
          <span className="group-hover:translate-x-1.5 transition-transform duration-200 inline-block">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  const cover = post.gallery[0];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid md:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
      <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-brand-pink-light shadow-[0_24px_64px_-16px_rgba(232,23,138,0.22)]">
        {cover && (
          <Image
            src={cover.path}
            alt={cover.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{
              objectPosition:
                cover.width && cover.height && cover.width < cover.height
                  ? "50% -10%"
                  : "center",
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-brand-navy/30 to-transparent" />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-brand-pink" />
          <span className="text-brand-pink text-xs font-semibold font-display tracking-widest uppercase">
            Mais recente
          </span>
        </div>

        <h2 className="font-display font-extrabold text-brand-navy text-2xl md:text-3xl lg:text-4xl leading-tight group-hover:text-brand-pink transition-colors duration-300">
          {post.title}
        </h2>

        <p className="text-brand-navy/60 leading-relaxed text-base">
          {post.intro.length > 180
            ? post.intro.slice(0, 180) + "…"
            : post.intro}
        </p>

        <div className="flex items-center gap-1.5 flex-wrap">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-1">
          <span className="inline-flex items-center gap-2 text-brand-pink font-semibold font-display text-sm">
            Ler história completa
            <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">
              →
            </span>
          </span>
          <span className="text-brand-navy/35 text-sm">
            {formatDate(post.date)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export const metadata = {
  title: "Blog — Instituto Sempre Com Você",
  description:
    "Histórias de cuidado, superação e solidariedade do Instituto Sempre Com Você.",
};

export default function BlogPage() {
  const [featured, ...rest] = sortedPosts;

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        {/* ── Hero ── */}
        <section className="relative bg-brand-navy overflow-hidden">
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 80% at 15% 60%, #E8178A 0%, transparent 70%), radial-gradient(ellipse 50% 70% at 85% 40%, #29ABE2 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center">
            <span className="inline-block text-brand-pink text-xs font-display font-semibold tracking-[0.2em] uppercase mb-5">
              Blog
            </span>
            <h1 className="font-display font-extrabold text-white! text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 tracking-tight">
              Histórias de
              <br />
              <span className="text-brand-pink">Cuidado</span>
            </h1>
            <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
              Acompanhe os momentos de superação, amor e solidariedade que fazem
              parte do dia a dia do Instituto.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-white/30 text-sm font-display">
              <span>{posts.length}</span>
              <span>histórias compartilhadas</span>
            </div>
          </div>
        </section>

        {/* ── Featured post ── */}
        {featured && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 border-b border-brand-navy/6">
            <FeaturedPost post={featured} />
          </section>
        )}

        {/* ── All posts grid ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-baseline gap-3 mb-12">
            <h2 className="font-display font-bold text-brand-navy text-2xl">
              Todas as histórias
            </h2>
            <span className="text-brand-navy/30 text-sm font-display">
              {rest.length} publicações
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
