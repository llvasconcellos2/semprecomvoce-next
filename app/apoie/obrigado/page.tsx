import type { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Obrigado pela sua doação | Instituto Sempre Com Você",
  description:
    "Sua generosidade faz a diferença na vida de pessoas com câncer e suas famílias.",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ObrigadoPage({ searchParams }: Props) {
  const params = await searchParams;
  const raw = params.collection_status;
  const status = typeof raw === "string" ? raw : "approved";

  return <ThankYouClient status={status} />;
}
