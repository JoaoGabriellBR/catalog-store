"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import AddressModal from "./AddressModal";
import Orders from "../Orders";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "@/app/context/AuthContext";
import Loader from "@/components/Common/Loader";
import { CircleCheck, LogOut, ShoppingBasket, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@/lib/zodResolver";
import InputField from "@/components/Common/InputField";

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
  const [activeTab, setActiveTab] = useState("account-details");
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
      setTimeout(() => {
        setProfileMessage(null);
      }, 4000);
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
      setTimeout(() => {
        setPasswordMessage(null);
      }, 4000);
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
      <Breadcrumb title={"Minha Conta"} pages={["Minha Conta"]} />

      <section className="overflow-hidden py-4 sm:py-4 md:py-10 lg:py-14 xl:py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">
            <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-4 p-4 sm:p-7.5 xl:p-9">
                  <User className="w-20 h-20 text-gray-500" />

                  <div className="">
                    <p className="font-medium text-dark mb-0.5">
                      {profile.fullName || user.email}
                    </p>
                    <p className="text-custom-xs">{profile.email}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-7.5 xl:p-9 ">
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
                      {loggingOut ? (
                        <Loader className="mr-2 h-4 w-4" />
                      ) : (
                        <LogOut />
                      )}
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
                    <InputField
                      label="Nome"
                      id="firstName"
                      type="text"
                      value={profile.fullName}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          fullName: e.currentTarget.value,
                        })
                      }
                      required
                      className="py-2.5"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <InputField
                      label="Email"
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.currentTarget.value })
                      }
                      required
                      className="py-2.5"
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
                    className={`mt-4 text-sm flex flex-row items-center gap-2 ${
                      profileMessage.type === "success"
                        ? "text-green"
                        : "text-red"
                    }`}
                  >
                    <CircleCheck className="h-5 w-5" />
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
                    <InputField
                      label="Senha Antiga"
                      id="currentPassword"
                      type="password"
                      registration={register("currentPassword")}
                      error={errors.currentPassword}
                      className="py-2.5"
                    />
                  </div>

                  <div className="mb-5">
                    <InputField
                      label="Nova Senha"
                      id="newPassword"
                      type="password"
                      registration={register("newPassword")}
                      error={errors.newPassword}
                      className="py-2.5"
                    />
                  </div>

                  <div className="mb-5">
                    <InputField
                      label="Confirmar Nova Senha"
                      id="confirmPassword"
                      type="password"
                      registration={register("confirmPassword")}
                      error={errors.confirmPassword}
                      className="py-2.5"
                    />
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
                          ? "text-green"
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
