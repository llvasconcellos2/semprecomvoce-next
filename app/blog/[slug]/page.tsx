import { notFound } from "next/navigation";
import type { Metadata } from "next";
import posts from "@/data/posts.json";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogAuthor } from "@/components/BlogAuthor";
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

function renderContent(content: string) {
  return content
    .split(/\n\n+/)
    .filter((para) => !para.trim().startsWith("!["))
    .map((para, i) => (
      <p key={i} className="text-brand-navy/70 leading-[1.85] text-lg">
        {para.trim()}
      </p>
    ));
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Instituto Sempre Com Você`,
    description: post.intro,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const cover = post.gallery[0];
  const galleryRest = post.gallery.slice(1);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* ── Cover image ── */}
        {cover && (
          <div className="relative w-full h-[45vh] md:h-[60vh] bg-brand-navy overflow-hidden">
            <Image
              src={cover.path}
              alt={cover.alt}
              fill
              className="object-cover opacity-75"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-navy/70 via-brand-navy/10 to-transparent" />
          </div>
        )}

        {/* ── Article ── */}
        <article className="max-w-2xl mx-auto px-6 py-12 lg:py-20">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-pink text-sm font-semibold font-display mb-10 group hover:gap-3 transition-all duration-200"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-200 inline-block">
              ←
            </span>
            Voltar ao blog
          </Link>

          {/* Date + tags */}
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-sm font-medium font-display bg-brand-pink-light text-brand-pink px-3 py-1.5 rounded-full">
              {formatDate(post.date)}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display font-extrabold text-brand-navy text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-8">
            {post.title}
          </h1>

          {/* Intro */}
          <p className="text-xl text-brand-navy/65 leading-relaxed border-l-[3px] border-brand-pink pl-6 mb-12">
            {post.intro}
          </p>

          {/* Body */}
          <div className="flex flex-col gap-6">
            {renderContent(post.content)}
          </div>
        </article>

        {/* ── Gallery ── */}
        {post.gallery.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px flex-1 bg-brand-navy/8" />
              <h2 className="font-display font-bold text-brand-navy text-xl">
                Galeria de fotos
              </h2>
              <span className="h-px flex-1 bg-brand-navy/8" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {/* Show cover in gallery too for completeness */}
              {post.gallery.map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl bg-brand-pink-light ${
                    i === 0 && post.gallery.length > 1
                      ? "col-span-2 row-span-2 aspect-square"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={img.path}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Author ── */}
        <BlogAuthor authorId={post.author} />

        {/* ── Next posts suggestion ── */}
        <section className="bg-brand-pink-light py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-brand-pink font-display font-semibold text-sm tracking-widest uppercase mb-3">
              Continue lendo
            </p>
            <h3 className="font-display font-extrabold text-brand-navy text-2xl mb-8">
              Mais histórias do Instituto
            </h3>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-brand-pink text-white text-sm font-semibold font-display px-8 py-3.5 rounded-full
                         hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/30 hover:-translate-y-px
                         active:translate-y-0 active:shadow-none transition-all duration-200"
            >
              Ver todas as histórias
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
