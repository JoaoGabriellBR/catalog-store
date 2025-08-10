"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { MessageCircle } from "lucide-react";
import Button from "@/components/Common/Button";

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
          <Link href="/products">
            <Button variant="primary">Continuar comprando</Button>
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
            `• ${item.name} - Qtd: ${item.quantity} - R$ ${(
              item.price * item.quantity
            ).toFixed(2)}`
        ),
        "",
        `TOTAL: R$ ${totalPrice.toFixed(2)}`,
        "",
        "Pedido via STG Catalog",
      ];

      await createOrder(user.id, cartItems, totalPrice);
      await clearCart();
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        messageLines.join("\n")
      )}`;
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
          <h2 className="font-medium text-dark text-2xl mb-6 text-center">
            Confirmar Pedido
          </h2>
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
            <Button
              onClick={handleCancel}
              variant="gray"
              className="w-full sm:w-1/2"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              isLoading={loading}
              variant="success"
              className="w-full sm:w-1/2"
            >
              {!loading && (
                <>
                  <MessageCircle className="mr-2" /> Confirmar
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
