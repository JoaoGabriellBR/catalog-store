"use client";
import React, { useEffect, useState } from "react";
import { useForm, FieldErrors, Resolver } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { supabase } from "../../../lib/supabaseClient";

const strengthLevels = {
  0: { label: "", color: "", bgColor: "", progress: 0 },
  1: {
    label: "Muito fraca",
    color: "text-red-600",
    bgColor: "bg-red-500",
    progress: 20,
  },
  2: {
    label: "Fraca",
    color: "text-orange-600",
    bgColor: "bg-orange-500",
    progress: 40,
  },
  3: {
    label: "Regular",
    color: "text-yellow-600",
    bgColor: "bg-yellow-500",
    progress: 60,
  },
  4: {
    label: "Forte",
    color: "text-blue-600",
    bgColor: "bg-blue-500",
    progress: 80,
  },
  5: {
    label: "Muito forte",
    color: "text-green-600",
    bgColor: "bg-green-500",
    progress: 100,
  },
} as const;

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Deve conter letra maiúscula")
      .regex(/[a-z]/, "Deve conter letra minúscula")
      .regex(/[0-9]/, "Deve conter números")
      .regex(/[^A-Za-z0-9]/, "Deve conter símbolos"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

const zodResolver =
  (schema: z.ZodSchema): Resolver<RegisterFormData> =>
  async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    const formErrors: FieldErrors<RegisterFormData> = {};
    result.error.errors.forEach((err) => {
      const path = err.path[0] as keyof RegisterFormData;
      formErrors[path] = {
        type: err.code,
        message: err.message,
      };
    });
    return { values: {}, errors: formErrors };
  };

const calculateStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const passwordValue = watch("password", "");

  useEffect(() => {
    setPasswordStrength(calculateStrength(passwordValue));
  }, [passwordValue]);

  const onSubmit = async (data: RegisterFormData) => {
    setMessage(null);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.name } },
    });
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Conta criada com sucesso!" });
      setTimeout(() => router.push("/signin"), 2000);
    }
  };

  const InputField = ({
    label,
    name,
    type,
    placeholder,
  }: {
    label: string;
    name: keyof RegisterFormData;
    type: string;
    placeholder: string;
  }) => (
    <div className="mb-5">
      <label htmlFor={name} className="block mb-2.5">
        {label} <span className="text-red">*</span>
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        autoComplete={type === "password" ? "on" : "off"}
        {...register(name)}
        className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  );

  const strength =
    strengthLevels[passwordStrength as keyof typeof strengthLevels];

  return (
    <>
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Criar uma Conta
              </h2>
              <p>Digite seus dados abaixo</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <InputField
                label="Nome Completo"
                name="name"
                type="text"
                placeholder="Digite seu nome completo"
              />
              <InputField
                label="Endereço de Email"
                name="email"
                type="email"
                placeholder="Digite seu endereço de email"
              />
              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5">
                  Senha <span className="text-red">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Digite sua senha"
                  autoComplete="on"
                  {...register("password")}
                  className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                />
                <div className="h-2 bg-gray-200 rounded mt-2">
                  <div
                    className={`${strength.bgColor} h-full rounded`}
                    style={{ width: `${strength.progress}%` }}
                  />
                </div>
                {strength.label && (
                  <p className={`text-sm mt-1 ${strength.color}`}>
                    {strength.label}
                  </p>
                )}
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <InputField
                label="Repita a Senha"
                name="confirmPassword"
                type="password"
                placeholder="Repita sua senha"
              />

              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
              >
                Criar Conta
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
