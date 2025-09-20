import MyAccount from "@/components/MyAccount";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Minha Conta | Catalog",
  description:
    "Gerencie suas informações pessoais, pedidos e preferências de conta.",
  keywords:
    "minha conta, gerenciamento de conta, pedidos, informações pessoais",
};

const MyAccountPage = () => {
  return (
    <main>
      <MyAccount />
    </main>
  );
};

export default MyAccountPage;
