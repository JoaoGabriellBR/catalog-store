"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { MessageCircle } from "lucide-react";

import { useAppSelector } from "@/redux/store";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAuth } from "@/app/context/AuthContext";
import { useCartActions } from "@/hooks/useCartActions";
import { createOrder } from "@/services/orders";

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const { user } = useAuth();
  const { clearCart } = useCartActions();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!cartItems.length) {
    return (
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 text-center">
          <p className="mb-6">Seu carrinho está vazio.</p>
          <Link
            href="/products"
            className="inline-flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
          >
            Continuar comprando
          </Link>
        </div>
      </section>
    );
  }

  const handleConfirm = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const messageLines = [
        "NOVO PEDIDO - STG CATALOG",
        `Cliente: ${user.user_metadata?.full_name || ""}`,
        `Email: ${user.email}`,
        "PRODUTOS:",
        ...cartItems.map(
          (item) =>
            `• ${item.name} - Qtd: ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
        ),
        "",
        `TOTAL: R$ ${totalPrice.toFixed(2)}`,
        "",
        "Pedido via STG Catalog",
      ];

      await createOrder(user.id, cartItems, totalPrice);
      await clearCart();
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(messageLines.join("\n"))}`;
      window.open(whatsappUrl, "_blank");
      router.push("/order-success");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/cart");
  };

  return (
    <section className="overflow-hidden py-20 bg-gray-2">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="bg-white rounded-xl shadow-1 p-6 sm:p-10">
          <h2 className="font-medium text-dark text-2xl mb-6 text-center">Confirmar Pedido</h2>
          <ul className="mb-4 divide-y divide-gray-3">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-4 text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="font-medium text-right mb-6">
            Total: R$ {totalPrice.toFixed(2)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCancel}
              className="w-full sm:w-1/2 px-6 py-3 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full sm:w-1/2 flex justify-center items-center font-medium text-white bg-green-light py-3 px-6 rounded-md ease-out duration-200 hover:bg-opacity-95 disabled:opacity-70"
            >
              <MessageCircle className="mr-2" />
              {loading ? "Processando..." : "Confirmar"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

