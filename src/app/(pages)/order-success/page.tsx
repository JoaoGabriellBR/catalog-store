import React from "react";
import OrderSuccess from "@/components/OrderSuccess";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pedido Realizado | STG Catalog",
  description: "Página de confirmação de pedido",
};

const OrderSuccessPage = () => {
  return (
    <main>
      <OrderSuccess />
    </main>
  );
};

export default OrderSuccessPage;
