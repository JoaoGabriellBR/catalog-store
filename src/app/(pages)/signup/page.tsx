import RegisterForm from "@/components/Auth/RegisterForm";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar conta | Loja Catalog",
  description: "Tela de criação de conta na loja",
};

const SignupPage = () => {
  return (
    <main>
      <RegisterForm />
    </main>
  );
};

export default SignupPage;
