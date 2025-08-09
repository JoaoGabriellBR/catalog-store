"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Eye, Heart, ShoppingBag, ShoppingCart, Star } from "lucide-react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { AppDispatch } from "@/redux/store";
import type { Product } from "@/types/product";

interface SingleListItemProps {
  item: Product;
}

const SingleListItem: React.FC<SingleListItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModalContext();

  const handleQuickView = () => {
    dispatch(updateQuickView(item));
    openModal();
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
  };

  const handleAddToWishlist = () => {
    dispatch(addItemToWishlist({ ...item, status: "available", quantity: 1 }));
  };

  return (
    <div className="group relative flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden shadow-sm transition-transform duration-200 hover:shadow-lg">
      {/* Quick View & Wishlist */}
      <div className="absolute top-2 right-2 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleQuickView}
          aria-label="Visualização rápida"
          className="p-2 bg-white rounded-md shadow hover:bg-blue hover:text-white transition-colors"
        >
          <Eye size={20} className="stroke-current" />
        </button>
        <button
          onClick={handleAddToWishlist}
          aria-label="Adicionar aos favoritos"
          className="p-2 bg-white rounded-md shadow hover:bg-blue hover:text-white transition-colors"
        >
          <Heart size={20} className="stroke-current" />
        </button>
      </div>

      {/* Imagem */}
        <div className="flex-shrink-0 w-full sm:w-[270px] p-4 bg-gray-100 flex items-center justify-center">
          <Image
            src={item.image_url}
            alt={item.name}
            width={250}
            height={250}
            className="object-contain transition-transform duration-200 group-hover:scale-110"
          />
        </div>

      {/* Detalhes */}
      <div className="flex flex-col flex-grow p-4 justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-800 hover:text-blue transition-colors mb-2">
            <Link href={`/product/${item.id}`} className="block">
              {item.name}
            </Link>
          </h3>

          <div className="flex items-baseline space-x-3 mb-3">
            <span className="text-lg font-semibold text-gray-900">
              R$ {item.price.toFixed(2)}
            </span>
            <span className="flex flex-row items-center gap-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              <ShoppingBag size={16} className="text-gray-500" />
              {item.category}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        </div>

        {/* Botão Adicionar ao carrinho (só no hover) */}
        <button
          onClick={handleAddToCart}
          className="mt-4 self-start inline-flex items-center gap-2 rounded-md bg-blue px-4 py-2 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ShoppingCart size={18} className="stroke-current" />
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};

export default SingleListItem;
