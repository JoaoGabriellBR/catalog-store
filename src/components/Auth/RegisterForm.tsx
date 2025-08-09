"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { supabase } from "../../../lib/supabaseClient";
import InputField from "./InputField";
import Loader from "@/components/Common/Loader";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { Circle, Eye, EyeOff } from "lucide-react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { zodResolver } from "@/lib/zodResolver";

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter letra minúscula")
      .regex(/[0-9]/, "A deve conter números")
      .regex(/[^A-Za-z0-9]/, "A senha deve conter símbolos"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [accountCreated, setAccountCreated] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const passwordValue = watch("password", "");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) router.replace("/my-account");
    };
    checkUser();
  }, [router]);

  const onSubmit = async (data: RegisterFormData) => {
    setMessage(null);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.name } },
    });
    if (error) {
      const text =
        error.message === "User already registered"
          ? "Este e-mail já está cadastrado"
          : error.message;
      setMessage({ type: "error", text });
    } else {
      setAccountCreated(true);
    }
  };

  if (accountCreated) {
    return (
      <>
        <Breadcrumb title={"Criar conta"} pages={["Criar conta"]} />
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11 text-center">
              <Circle className="mx-auto mb-4 h-16 w-16 text-green-light" />
              <h2 className="font-semibold text-2xl text-dark mb-4">
                Conta criada com sucesso!
              </h2>
              <p className="mb-6">
                Enviamos um link de confirmação para o seu{" "}
                <span className="font-bold">e-mail</span>. Verifique sua caixa
                de entrada para ativar a conta.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb title={"Criar conta"} pages={["Criar conta"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl text-dark mb-1.5">
                Criar uma conta
              </h2>
              <p>Digite seus dados abaixo</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <InputField
                label="Nome Completo"
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                registration={register("name")}
                error={errors.name}
              />
              <InputField
                label="Endereço de Email"
                id="email"
                type="email"
                placeholder="Digite seu endereço de email"
                registration={register("email")}
                error={errors.email}
              />
              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5">
                  Senha <span>*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Digite sua senha"
                    autoComplete="on"
                    {...register("password")}
                    className={`rounded-lg w-full py-3 px-5 outline-none duration-200 bg-gray-1 placeholder:text-dark-5 border ${
                      errors.password
                        ? "border-red focus:border-red focus:ring-2 focus:ring-red/20"
                        : "border-gray-3 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    } pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-dark-5"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <PasswordStrengthIndicator
                  password={passwordValue}
                  hasError={!!errors.password}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <InputField
                label="Repita a Senha"
                id="confirmPassword"
                type="password"
                placeholder="Repita sua senha"
                registration={register("confirmPassword")}
                error={errors.confirmPassword}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4" /> Cadastrando...
                  </>
                ) : (
                  "Criar Conta"
                )}
              </button>

              {message && (
                <p
                  className={`text-center mt-4 ${
                    message.type === "error" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {message.text}
                </p>
              )}

              <p className="text-center mt-6">
                Já possui uma conta
                <a
                  href="/signin"
                  className="text-dark ease-out duration-200 hover:text-blue pl-2"
                >
                  Entrar Agora
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
