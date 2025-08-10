"use client";
import React, { useState } from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateQuickView } from "@/redux/features/quickView-slice";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/Common/FavoriteButton";
import Button from "@/components/Common/Button";
import { useCartActions } from "@/hooks/useCartActions";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";

const SingleItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();
  const { addToCart } = useCartActions();
  const [adding, setAdding] = useState(false);

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // Adicionar ao carrinho
  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(item, 1);
    setAdding(false);
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-[#F6F7FB] min-h-[403px]">
        <div className="text-center px-4 py-7.5">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className="w-4 h-4"
                  fill="currentColor"
                  stroke="none"
                />
              ))}
            </div>

            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {item.category}
            </span>
          </div>

          <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
            <Link href={`/product/${item.id}`}> {item.name} </Link>
          </h3>

          <span className="flex items-center justify-center gap-2 font-medium text-lg">
            <span className="text-dark">{formatCurrency(item.price)}</span>
          </span>
        </div>

        <div className="flex justify-center items-center">
          <Image src={item.image_url} alt="" width={280} height={280} />
        </div>

        <div className="absolute right-0 bottom-0 translate-x-full u-w-full flex flex-col gap-2 p-5.5 ease-linear duration-300 group-hover:translate-x-0">
          <Button
            onClick={() => {
              handleQuickViewUpdate();
              openModal();
            }}
            ariaLabel="button for quick view"
            size="icon"
            variant="gray"
            className="w-9 h-9 hover:text-gray-7 hover:bg-blue"
          >
            <Eye className="w-4 h-4" />
          </Button>

          <Button
            onClick={handleAddToCart}
            ariaLabel="button for Adicionar ao carrinho"
            id="addCartOne"
            disabled={adding}
            size="icon"
            variant="gray"
            className="w-9 h-9 hover:text-gray-7 hover:bg-blue"
          >
            {adding ? (
              <span className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </Button>

          <FavoriteButton
            product={item}
            className="w-9 h-9 flex items-center justify-center rounded-[5px] shadow-1"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
