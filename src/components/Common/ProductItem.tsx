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
import { updateproductDetails } from "@/redux/features/product-details";
import { AppDispatch } from "@/redux/store";
import type { Product } from "@/types/product";

interface ProductItemProps {
  item: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
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

  const handleShowDetails = () => {
    dispatch(updateproductDetails(item));
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      {/* Quick View & Wishlist */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
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

      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain transition-transform duration-200 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <div className="flex items-center mb-2">
          <ShoppingBag size={16} className="text-gray-500" />
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-medium text-gray-800 hover:text-blue transition-colors mb-2">
          <Link
            href={`/product/${item.id}`}
            onClick={handleShowDetails}
            className="block"
          >
            {item.name}
          </Link>
        </h3>

        {/* Price */}
        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-lg font-semibold text-gray-900">
            R$ {item.price.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart - mostra só no hover */}
        <button
          onClick={handleAddToCart}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-blue px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100"
        >
          <ShoppingCart size={18} className="stroke-current" />
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
