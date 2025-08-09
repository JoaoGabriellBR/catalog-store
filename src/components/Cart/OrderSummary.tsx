"use client";

import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { MessageCircle } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
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
    </div>
  );
};

export default OrderSummary;
