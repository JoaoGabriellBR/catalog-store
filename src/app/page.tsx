import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "STG Catalog | Loja de Produtos Online",
  description:
    "Explore a nossa vasta gama de produtos, desde eletrônicos a moda, tudo com qualidade garantida e entrega rápida.",
  keywords: "loja online, produtos, eletrônicos, moda, entrega rápida",
  openGraph: {
    title: "STG Catalog | Loja de Produtos Online",
    description:
      "Explore a nossa vasta gama de produtos, desde eletrônicos a moda, tudo com qualidade garantida e entrega rápida.",
    siteName: "STG Catalog",
  },
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
