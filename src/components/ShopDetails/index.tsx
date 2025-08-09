"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Newsletter from "../Common/Newsletter";
import ProductYouMayLike from "./ProductYouMayLike";
import { useDispatch } from "react-redux";

import { addItemToCart } from "@/redux/features/cart-slice";
import { AppDispatch } from "@/redux/store";
import {
  ArrowLeft,
  CircleCheckBig,
  Link,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Truck,
} from "lucide-react";
import FavoriteButton from "@/components/Common/FavoriteButton";
import { Product } from "@/types/product";

type ProductProps = {
  product: Product | null;
};

const ProductDetails = ({ product }: ProductProps) => {
  // const [previewImg, setPreviewImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...product, quantity }));
  };

  useEffect(() => {
    localStorage.setItem("productDetails", JSON.stringify(product));
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            {/* <Package className="h-16 w-16 text-gray-400" /> */}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Produto não encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            O produto que você está procurando não existe.
          </p>
          <Link href="/" className="text-blue-600 hover:underline">
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        title={"Detalhes do Produto"}
        pages={["detalhes do produto"]}
      />

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
            <div className="lg:max-w-[570px] w-full">
              <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                <Image
                  src={product?.image_url}
                  alt="products-details"
                  width={400}
                  height={400}
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                <button
                  className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-blue`}
                >
                  <Image
                    width={50}
                    height={50}
                    src={product?.image_url}
                    alt="thumbnail"
                  />
                </button>
              </div>
            </div>

            {/* <!-- product content --> */}
            <div className="max-w-[539px] w-full flex flex-col gap-6">
              <span className="flex flex-row items-center gap-2 text-sm text-gray-500 bg-gray-100 rounded">
                <ShoppingBag className="w-4 h-4 inline-block" />
                {product?.category}
              </span>
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark">
                {product?.name}
              </h2>

              <h5 className="font-light text-sm sm:text-2xl xl:text-custom-lg text-dark">
                {product?.description}
              </h5>

              <div className="">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-extrabold text-blue">
                    R$ {product?.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-blue" />
                  Entrega grátis
                </li>

                <li className="flex items-center gap-2.5">
                  <CircleCheckBig className="w-5 h-5 text-blue" />
                  Estoque disponível
                </li>
              </ul>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col items-start justify-start gap-4.5">
                  <h4 className="font-semibold text-lg text-dark">
                    Quantidade
                  </h4>
                  <div className="flex items-center rounded-md border border-gray-3">
                    <button
                      aria-label="button for remove product"
                      className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-blue"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <span className="flex items-center justify-center w-16 h-12 border-x border-gray-4">
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="button for add product"
                      className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-blue"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-row items-center gap-4.5 flex-wrap">
                    <button
                      disabled={quantity === 0 && true}
                      onClick={() => handleAddToCart()}
                      className={`inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark
                  `}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Comprar agora
                    </button>

                    {product && (
                      <FavoriteButton
                        product={product}
                        className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-3 ease-out duration-200 hover:text-white hover:bg-dark hover:border-transparent"
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ProductYouMayLike />
      <Newsletter />
    </>
  );
};

export default ProductDetails;
