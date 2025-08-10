"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import type { Product } from "@/types/product";
import FavoriteButton from "../Common/FavoriteButton";
import { useCartActions } from "@/hooks/useCartActions";
import Button from "@/components/Common/Button";
import { formatCurrency } from "@/lib/formatCurrency";

interface SingleListItemProps {
  item: Product;
}

const SingleListItem: React.FC<SingleListItemProps> = ({ item }) => {
  const dispatch = useDispatch();
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

  return (
    <div className="group relative flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden shadow-sm transition-transform duration-200 hover:shadow-lg">
      {/* Quick View & Wishlist */}
      <div className="absolute top-2 right-2 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          onClick={handleQuickView}
          ariaLabel="Visualização rápida"
          variant="ghost"
          size="icon"
          className="bg-white rounded-md shadow hover:bg-blue hover:text-white"
        >
          <Eye size={20} className="stroke-current" />
        </Button>
        <FavoriteButton product={item} />
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
              {formatCurrency(item.price)}
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
        <Button
          onClick={handleAddToCart}
          disabled={adding}
          isLoading={adding}
          variant="primary"
          size="sm"
          className="mt-4 self-start opacity-0 group-hover:opacity-100"
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

export default SingleListItem;
