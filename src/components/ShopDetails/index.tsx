"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Newsletter from "../Common/Newsletter";
import RecentlyViewdItems from "./RecentlyViewd";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

import { addItemToCart } from "@/redux/features/cart-slice";
import { AppDispatch } from "@/redux/store";
import {
  CircleCheckBig,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
} from "lucide-react";

const ShopDetails = () => {
  const [previewImg, setPreviewImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("tabOne");

  const tabs = [
    {
      id: "tabOne",
      title: "Description",
    },
    {
      id: "tabTwo",
      title: "Additional Information",
    },
    {
      id: "tabThree",
      title: "Reviews",
    },
  ];

  const alreadyExist = localStorage.getItem("productDetails");
  const productFromStorage = useAppSelector(
    (state) => state.productDetailsReducer.value
  );

  const dispatch = useDispatch<AppDispatch>();
  const product = alreadyExist ? JSON.parse(alreadyExist) : productFromStorage;

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...product, quantity }));
  };

  useEffect(() => {
    localStorage.setItem("productDetails", JSON.stringify(product));
  }, [product]);

  return (
    <>
      <Breadcrumb title={"Detalhes do Produto"} pages={["shop details"]} />

      {product.title === "" ? (
        "Please add product"
      ) : (
        <>
          <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
              <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
                <div className="lg:max-w-[570px] w-full">
                  <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                    <Image
                      src={product.imgs?.previews[previewImg]}
                      alt="products-details"
                      width={400}
                      height={400}
                    />
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                    {product.imgs?.thumbnails.map((item, key) => (
                      <button
                        onClick={() => setPreviewImg(key)}
                        key={key}
                        className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-blue ${
                          key === previewImg
                            ? "border-blue"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          width={50}
                          height={50}
                          src={item}
                          alt="thumbnail"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* <!-- product content --> */}
                <div className="max-w-[539px] w-full flex flex-col gap-6">
                  <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark">
                    {product.title}
                  </h2>

                  <h5 className="font-light text-sm sm:text-2xl xl:text-custom-lg text-dark">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Aliquid vel a provident accusamus optio impedit ratione
                    consequuntur sed, cupiditate expedita.
                  </h5>

                  <div className="">
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-extrabold text-blue">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
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
                          onClick={() =>
                            quantity > 1 && setQuantity(quantity - 1)
                          }
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

                        <button className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-3 ease-out duration-200 hover:text-white hover:bg-dark hover:border-transparent">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <RecentlyViewdItems />
          <Newsletter />
        </>
      )}
    </>
  );
};

export default ShopDetails;
