import React from "react";
import Link from "next/link";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  const { closeCartModal } = useCartModalContext();

  return (
    <div className="text-center flex flex-col items-center justify-center h-full gap-4">
      <ShoppingCart size={100} strokeWidth={1.5} color="#8D93A5" />

      <p className="">Seu carrinho está vazio!</p>

      <Link
        onClick={() => closeCartModal()}
        href="/products"
        className="w-full lg:w-10/12 mx-auto flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
      >
        Continuar comprando
      </Link>
    </div>
  );
};

export default EmptyCart;
