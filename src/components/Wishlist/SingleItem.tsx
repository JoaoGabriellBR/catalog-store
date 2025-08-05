import React from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

import { removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { addItemToCart } from "@/redux/features/cart-slice";

import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";

const SingleItem = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromWishlist = () => {
    dispatch(removeItemFromWishlist(item.id));
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-10">
      <div className="min-w-[83px]">
        <button
          onClick={() => handleRemoveFromWishlist()}
          aria-label="botão para remover produto da lista de desejos"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <X className="w-4 h-4 text-gray-6" />
        </button>
      </div>

      <div className="min-w-[387px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
              <Image
                src={item.imgs?.thumbnails[0]}
                alt="produto"
                width={200}
                height={200}
              />
            </div>

            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-blue">
                <a href="#"> {item.title} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[415px]">
        <p className="text-dark">${item.discountedPrice}</p>
      </div>

      <div className="min-w-[150px] flex justify-end">
        <button
          onClick={() => handleAddToCart()}
          className="inline-flex text-dark hover:text-white bg-gray-1 border border-gray-3 py-2.5 px-6 rounded-md ease-out duration-200 hover:bg-blue hover:border-gray-3"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
