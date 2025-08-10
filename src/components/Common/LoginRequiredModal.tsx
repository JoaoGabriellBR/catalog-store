"use client";
import React, { useEffect } from "react";
import { X, Lock, Heart, ShoppingCart } from "lucide-react";
import { useLoginRequiredModal } from "@/app/context/LoginRequiredModalContext";
import Link from "next/link";
import Button from "@/components/Common/Button";

export default function LoginRequiredModal() {
  const { isOpen, reason, close } = useLoginRequiredModal();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const title = "Você precisa estar logado";
  const description =
    reason === "cart"
      ? "Para adicionar produtos ao carrinho, entre na sua conta ou crie uma gratuitamente."
      : reason === "favorite"
      ? "Para favoritar produtos, entre na sua conta ou crie uma gratuitamente."
      : "Entre na sua conta ou crie uma gratuitamente para continuar.";

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />

      {/* modal content */}
      <div className="relative z-[1001] w-[92%] sm:w-[520px] max-w-[92%] rounded-2xl bg-white shadow-2xl p-6 sm:p-8 animate-[fadeIn_0.15s_ease-out]">
        <Button
          ariaLabel="Fechar"
          onClick={close}
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 text-gray-500 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-3 mb-4 text-blue">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue/10">
            {reason === "favorite" ? (
              <Heart className="w-5 h-5" />
            ) : reason === "cart" ? (
              <ShoppingCart className="w-5 h-5" />
            ) : (
              <Lock className="w-5 h-5" />
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-dark">
            {title}
          </h3>
        </div>

        <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-blue text-white py-3 px-4 font-medium hover:bg-blue-dark transition-colors"
            onClick={close}
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 text-dark py-3 px-4 font-medium hover:bg-gray-50 transition-colors"
            onClick={close}
          >
            Criar conta
          </Link>
        </div>

        <p className="text-[12px] text-gray-500 mt-4 text-center">
          Dica: você poderá continuar exatamente de onde parou após entrar.
        </p>
      </div>
    </div>
  );
}
