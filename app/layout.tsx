import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const DEFAULT_OG_IMAGE =
  "/blog/assistidas-do-instituto-sempre-com-voce-sorrisos-que-contam-historias/img-001.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Instituto Sempre Com Você",
  description:
    "Nossa missão é melhorar a vida de pessoas com câncer e suas famílias.",
  openGraph: {
    siteName: "Instituto Sempre Com Você",
    locale: "pt_BR",
    type: "website",
    title: "Instituto Sempre Com Você",
    description:
      "Nossa missão é melhorar a vida de pessoas com câncer e suas famílias.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "Instituto Sempre Com Você" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instituto Sempre Com Você",
    description:
      "Nossa missão é melhorar a vida de pessoas com câncer e suas famílias.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <div id="viewport" className="viewport">
          <Navbar />
          <main className="flex-1 bg-white">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
