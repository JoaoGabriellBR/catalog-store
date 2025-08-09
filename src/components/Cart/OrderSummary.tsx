"use client";

import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "@/app/context/AuthContext";
import { useCartActions } from "@/hooks/useCartActions";
import { createOrder } from "@/services/orders";
import { useRouter } from "next/navigation";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const { user } = useAuth();
  const { clearCart } = useCartActions();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  const handleCheckout = () => {
    setConfirming(true);
  };

  const confirmOrder = async () => {
    if (!user) return;
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
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      messageLines.join("\n")
    )}`;
    window.open(whatsappUrl, "_blank");
    await createOrder(user.id, cartItems, totalPrice);
    await clearCart();
    router.push("/order-success");
  };

  return (
    <div className="lg:max-w-[455px] w-full">
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Resumo do pedido</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
              <h4 className="font-medium text-dark">Produto</h4>
            </div>
            <div>
              <h4 className="font-medium text-dark text-right">Subtotal</h4>
            </div>
          </div>

          {cartItems.map((item, key) => (
            <div
              key={key}
              className="flex items-center justify-between py-5 border-b border-gray-3"
            >
              <div>
                <p className="text-dark">{item.name}</p>
              </div>
              <div>
                <p className="text-dark text-right">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-dark">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-dark text-right">
                R$ {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="w-full flex justify-center font-medium text-white bg-green-light py-3 px-6 mt-7 rounded-md ease-out duration-200 hover:bg-opacity-95"
          >
            <MessageCircle className="mr-2" />
            Finalizar compra
          </button>
        </div>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-md p-6 shadow-lg">
            <h3 className="text-lg font-medium mb-4">Confirmar Pedido</h3>
            <p className="text-sm mb-2">
              {user?.user_metadata?.full_name || user?.email}
            </p>
            <p className="text-sm mb-4">{user?.email}</p>
            <ul className="mb-4 space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="font-medium text-right mb-4">
              Total: R$ {totalPrice.toFixed(2)}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="px-4 py-2 rounded-md bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={confirmOrder}
                className="px-4 py-2 rounded-md bg-green-light text-white"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
