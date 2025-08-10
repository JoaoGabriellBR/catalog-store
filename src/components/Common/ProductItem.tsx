"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Eye, ShoppingBag, ShoppingCart, Star } from "lucide-react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { AppDispatch } from "@/redux/store";
import type { Product } from "@/types/product";
import FavoriteButton from "./FavoriteButton";
import Button from "@/components/Common/Button";
import { useCartActions } from "@/hooks/useCartActions";
import Loader from "@/components/Common/Loader";
import { formatCurrency } from "@/lib/formatCurrency";

interface ProductItemProps {
  item: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModalContext();
  const { addToCart } = useCartActions();
  const [adding, setAdding] = useState(false);

  const handleQuickView = () => {
    dispatch(updateQuickView(item));
    openModal();
  };

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(item, 1);
    setAdding(false);
  };

  const handleShowDetails = () => {
    dispatch(updateproductDetails(item));
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      {/* Quick View & Wishlist */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <Button
          onClick={handleQuickView}
          ariaLabel="Visualização rápida"
          variant="ghost"
          size="icon"
          className="bg-white rounded-md shadow hover:bg-blue hover:text-gray-7"
        >
          <Eye size={20} className="stroke-current" />
        </Button>
        <FavoriteButton product={item} />
      </div>

      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <Image
          src={item.image_url}
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
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {item.category}
          </span>
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
            {formatCurrency(item.price)}
          </span>
        </div>

        {/* Add to Cart - mostra só no hover */}
        <Button
          onClick={handleAddToCart}
          disabled={adding}
          isLoading={adding}
          variant="primary"
          size="sm"
          className="mt-auto gap-2 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
        >
          {!adding && (
            <>
              <ShoppingCart size={18} className="stroke-current" />
              Adicionar ao carrinho
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
