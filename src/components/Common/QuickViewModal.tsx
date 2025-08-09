"use client";
import React, { useEffect, useState } from "react";

import { useModalContext } from "@/app/context/QuickViewModalContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { updateproductDetails } from "@/redux/features/product-details";
import { X, Minus, Plus, ShoppingCart, ShoppingBag } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import { useCartActions } from "@/hooks/useCartActions";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const { openPreviewModal } = usePreviewSlider();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const { addToCart } = useCartActions();

  // get the product data
  const product = useAppSelector((state) => state.quickViewReducer.value);

  const [activePreview, setActivePreview] = useState(0);

  // Adicionar ao carrinho
  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      setQuantity(1);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div
      className={`${
        isModalOpen ? "z-99999" : "hidden"
      } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
    >
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
          <button
            onClick={() => closeModal()}
            aria-label="button for close modal"
            className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-12.5">
            <div className="max-w-[526px] w-full">
              <div className="flex gap-5">
                <div className="flex flex-col gap-5">
                  {/* Simplified image display since we only have one image */}
                  <div className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg bg-gray-1 border-2 border-blue">
                    {product?.image_url && (
                        <Image
                          src={product.image_url}
                          alt="thumbnail"
                          width={61}
                          height={61}
                          className="aspect-square"
                        />
                      )}
                  </div>
                </div>

                <div className="relative z-1 overflow-hidden flex items-center justify-center w-full sm:min-h-[508px] bg-gray-1 rounded-lg border border-gray-3">
                    <Image
                      src={product.image_url}
                      alt="products-details"
                      width={400}
                      height={400}
                    />
                </div>
              </div>
            </div>

            <div className="max-w-[445px] w-full flex flex-col gap-4">
              
              <span className="flex flex-row items-center gap-2 text-sm text-gray-500 bg-gray-100 rounded">
                <ShoppingBag size={16} className="text-gray-500" />
                {product.category}
              </span>

              <h3 className="font-semibold text-xl xl:text-heading-5 text-dark">
                {product.name}
              </h3>

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has.
              </p>

              <div>
                <h4 className="font-semibold text-lg text-dark">Preço</h4>

                <span className="font-semibold text-dark text-xl xl:text-heading-4">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-dark mb-3.5">
                  Quantidade
                </h4>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    aria-label="button for remove product"
                    className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                    disabled={quantity < 0 && true}
                  >
                    <Minus className="w-5 h-5" />
                  </button>

                  <span
                    className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark"
                    x-text="quantity"
                  >
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="button for add product"
                    className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  disabled={quantity === 0 && true}
                  onClick={() => handleAddToCart()}
                  className={`inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark
                  `}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao carrinho
                </button>

                {product && (
                  <FavoriteButton
                    product={product}
                    className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-3 ease-out duration-200 hover:text-white hover:bg-dark hover:border-transparent"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
