"use client";
import React from "react";
import OrderSummary from "./OrderSummary";
import { AppDispatch, useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";
import { TableHeader } from "@/types/table-header";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleClearCart = () => {
    dispatch(removeAllItemsFromCart());
  };

  const tableHeader = [
    { minWidth: "min-w-[400px]", title: "Produto" },
    { minWidth: "min-w-[180px]", title: "Preço" },
    { minWidth: "min-w-[275px]", title: "Quantidade" },
    { minWidth: "min-w-[200px]", title: "Subtotal" },
    { minWidth: "min-w-[50px]", title: "Ações" },
  ];

  return (
    <>
      {/* <!-- ===== Breadcrumb Section Start ===== --> */}
      <section>
        <Breadcrumb title={"Carrinho de Compras"} pages={["Cart"]} />
      </section>
      {/* <!-- ===== Breadcrumb Section End ===== --> */}
      {cartItems.length > 0 ? (
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
              <h2 className="font-medium text-dark text-2xl">Seu carrinho</h2>
              <button className="text-blue" onClick={() => handleClearCart()}>
                Limpar carrinho
              </button>
            </div>

            <div className="bg-white rounded-[10px] shadow-1">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  {/* <!-- table header --> */}
                  <div className="flex items-center py-5.5 px-7.5">
                    {tableHeader.map(
                      ({ minWidth, title }: TableHeader, index) => (
                        <div key={index} className={minWidth}>
                          <p className="text-dark">{title}</p>
                        </div>
                      )
                    )}
                  </div>

                  {/* <!-- cart item --> */}
                  {cartItems.length > 0 &&
                    cartItems.map((item, key) => (
                      <SingleItem item={item} key={key} />
                    ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9">
              <OrderSummary />
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="text-center mt-8">
            <div className="mx-auto pb-7.5">
              <ShoppingCart className="mx-auto w-16 h-16 text-gray-400" />
            </div>

            <p className="pb-6">Seu carrinho está vazio!</p>

            <Link
              href="/products"
              className="w-96 mx-auto flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
            >
              Continuar comprando
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
