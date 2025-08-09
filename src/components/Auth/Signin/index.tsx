"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "../../../../lib/supabaseClient";
import InputField from "../InputField";
import Loader from "@/components/Common/Loader";
import { useAuth } from "@/app/context/AuthContext";
import { zodResolver } from "@/lib/zodResolver";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const Signin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const { user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (!loading && user) {
      const next = searchParams?.get("next") || "/my-account";
      router.replace(next);
    }
  }, [user, loading, router, searchParams]);

  const onSubmit = async (data: LoginFormData) => {
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      const next = searchParams?.get("next") || "/my-account";
      router.push(next);
    }
  };

  return (
    <>
      <Breadcrumb title={"Entrar"} pages={["Entrar"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl text-dark mb-1.5">
                Entrar na sua conta
              </h2>
              <p>Digite seus dados abaixo</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <InputField
                label="E-mail"
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                registration={register("email")}
                error={errors.email}
              />
              <InputField
                label="Senha"
                id="password"
                type="password"
                placeholder="Digite sua senha"
                registration={register("password")}
                error={errors.password}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4" /> Entrando...
                  </>
                ) : (
                  "Entrar na conta"
                )}
              </button>
              {message && (
                <p className="text-center mt-4 text-red-600">{message}</p>
              )}
              <a
                href="#"
                className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
              >
                Esqueceu sua senha?
              </a>
              <span className="relative z-1 block font-medium text-center mt-4.5">
                <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
                <span className="inline-block px-3 bg-white">Ou</span>
              </span>
              <p className="text-center mt-6">
                Não tem uma conta?
                <Link
                  href="/signup"
                  className="text-dark ease-out duration-200 hover:text-blue pl-2"
                >
                  Cadastre-se agora!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
