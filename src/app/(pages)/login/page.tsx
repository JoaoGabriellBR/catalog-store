import Signin from "@/components/Auth/Signin";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Loja STG Catalog",
  description: "Acesse sua conta para comprar e favoritar produtos",
};

export default function LoginPage() {
  return (
    <main>
      <Signin />
    </main>
  );
}
