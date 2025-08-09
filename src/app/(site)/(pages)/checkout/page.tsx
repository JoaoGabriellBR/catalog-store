import Checkout from "@/components/Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmar Pedido | STG Catalog",
  description: "Revise e confirme seu pedido",
};

export default function CheckoutPage() {
  return (
    <main>
      <Checkout />
    </main>
  );
}
