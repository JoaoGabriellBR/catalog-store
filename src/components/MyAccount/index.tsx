"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import AddressModal from "./AddressModal";
import Orders from "../Orders";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "@/app/context/AuthContext";
import Loader from "@/components/Common/Loader";
import { LogOut, ShoppingBasket, User, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@/lib/zodResolver";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Senha atual é obrigatória"),
    newPassword: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter letra minúscula")
      .regex(/[0-9]/, "A senha deve conter números")
      .regex(/[^A-Za-z0-9]/, "A senha deve conter símbolos"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas devem ser iguais",
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const MyAccount = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [addressModal, setAddressModal] = useState(false);
  const [profile, setProfile] = useState({ fullName: "", email: "" });
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [profileMessage, setProfileMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({ resolver: zodResolver(passwordSchema) });

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setProfile({
          fullName: user.user_metadata?.full_name || "",
          email: user.email || "",
        });
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/");
  };

  const openAddressModal = () => setAddressModal(true);
  const closeAddressModal = () => setAddressModal(false);

  const handleProfileSave = async () => {
    setProfileMessage(null);
    if (!user) return;
    setSavingProfile(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: profile.fullName },
    });
    if (error) {
      setProfileMessage({ type: "error", text: error.message });
    } else {
      setProfileMessage({
        type: "success",
        text: "Nome atualizado com sucesso",
      });
    }
    setSavingProfile(false);
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setPasswordMessage(null);
    if (!user) return;
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email || "",
      password: data.currentPassword,
    });
    if (signInError) {
      setPasswordMessage({ type: "error", text: "Senha atual incorreta" });
      return;
    }
    const { error } = await supabase.auth.updateUser({
      password: data.newPassword,
    });
    if (error) {
      setPasswordMessage({ type: "error", text: error.message });
    } else {
      setPasswordMessage({
        type: "success",
        text: "Senha alterada com sucesso",
      });
      reset();
    }
  };

  if (loading || !user) {
    return (
      <section className="py-20 flex justify-center items-center">
        <Loader className="h-10 w-10 text-blue" />
      </section>
    );
  }

  return (
    <>
      <Breadcrumb title={"Minha Conta"} pages={["my account"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">
            <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
              <div className="flex xl:flex-col">
                
                <div className="flex flex-row items-center gap-4 p-4 sm:p-7.5 xl:p-9">

                    <User className="w-20 h-20 text-gray-500" />

                  <div>
                    <p className="font-medium text-dark mb-0.5">
                      {profile.fullName || user.email}
                    </p>
                    <p className="text-custom-xs">{profile.email}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-7.5 xl:p-9">
                  <div className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-4">
                    <button
                      onClick={() => setActiveTab("account-details")}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "account-details"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <User />
                      Detalhes da Conta
                    </button>

                    <button
                      onClick={() => setActiveTab("orders")}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duração-200 hover:bg-blue hover:text-white ${
                        activeTab === "orders"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <ShoppingBasket />
                      Histórico de Pedidos
                    </button>

                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duração-200 hover:bg-blue hover:text-white text-dark-2 bg-gray-1 disabled:opacity-50"
                    >
                      {loggingOut ? <Loader className="mr-2 h-4 w-4" /> : <LogOut />}
                      {loggingOut ? "Saindo..." : "Sair"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 ${
                activeTab === "orders" ? "block" : "hidden"
              }`}
            >
              <Orders />
            </div>

            <div
              className={`xl:max-w-[770px] w-full ${
                activeTab === "account-details" ? "block" : "hidden"
              }`}
            >
              <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="firstName" className="block mb-2.5">
                      Nome <span className="text-red">*</span>
                    </label>

                    <input
                      type="text"
                      id="firstName"
                      value={profile.fullName}
                      onChange={(e) =>
                        setProfile({ ...profile, fullName: e.target.value })
                      }
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duração-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label htmlFor="email" className="block mb-2.5">
                      Email <span className="text-red">*</span>
                    </label>

                    <input
                      type="email"
                      id="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duração-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleProfileSave}
                  disabled={savingProfile}
                  className="inline-flex items-center font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duração-200 hover:bg-blue-dark disabled:opacity-50"
                >
                  {savingProfile ? (
                    <>
                      <Loader className="mr-2 h-4 w-4" /> Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
                  )}
                </button>
                {profileMessage && (
                  <p
                    className={`mt-4 text-sm ${
                      profileMessage.type === "success"
                        ? "text-green-600"
                        : "text-red"
                    }`}
                  >
                    {profileMessage.text}
                  </p>
                )}
              </div>

              <p className="text-custom-sm mt-5 mb-9">
                É assim que seu nome será exibido na seção de conta e nas
                avaliações
              </p>

              <p className="font-medium text-xl sm:text-2xl text-dark mb-7">
                Mudar Senha
              </p>

              <form onSubmit={handleSubmit(onPasswordSubmit)} noValidate>
                <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
                  <div className="mb-5">
                    <label htmlFor="currentPassword" className="block mb-2.5">
                      Senha Antiga
                    </label>

                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        autoComplete="on"
                        {...register("currentPassword")}
                        className={`rounded-md border bg-gray-1 w-full py-2.5 px-5 outline-none duração-200 focus:border-transparent focus:shadow-input focus:ring-2 ${
                          errors.currentPassword
                            ? "border-red focus:ring-red/20"
                            : "border-gray-3 focus:ring-blue/20"
                        } pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-dark-5"
                        aria-label={showCurrentPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="mt-1 text-sm text-red">
                        {errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                    <div className="mb-5">
                      <label htmlFor="newPassword" className="block mb-2.5">
                        Nova Senha
                      </label>

                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          id="newPassword"
                          autoComplete="on"
                          {...register("newPassword")}
                          className={`rounded-md border bg-gray-1 w-full py-2.5 px-5 outline-none duração-200 focus:border-transparent focus:shadow-input focus:ring-2 ${
                            errors.newPassword
                              ? "border-red focus:ring-red/20"
                              : "border-gray-3 focus:ring-blue/20"
                          } pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-dark-5"
                          aria-label={showNewPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red">
                          {errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-5">
                      <label htmlFor="confirmPassword" className="block mb-2.5">
                        Confirmar Nova Senha
                      </label>

                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          autoComplete="on"
                          {...register("confirmPassword")}
                          className={`rounded-md border bg-gray-1 w-full py-2.5 px-5 outline-none duração-200 focus:border-transparent focus:shadow-input focus:ring-2 ${
                            errors.confirmPassword
                              ? "border-red focus:ring-red/20"
                              : "border-gray-3 focus:ring-blue/20"
                          } pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-dark-5"
                          aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duração-200 hover:bg-blue-dark disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="mr-2 h-4 w-4" /> Salvando...
                      </>
                    ) : (
                      "Mudar Senha"
                    )}
                  </button>
                  {passwordMessage && (
                    <p
                      className={`mt-4 text-sm ${
                        passwordMessage.type === "success"
                          ? "text-green-600"
                          : "text-red"
                      }`}
                    >
                      {passwordMessage.text}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <AddressModal isOpen={addressModal} closeModal={closeAddressModal} />
    </>
  );
};

export default MyAccount;
