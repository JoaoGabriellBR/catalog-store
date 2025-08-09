import React, { useState } from "react";
import { useFavorites } from "@/app/context/FavoritesContext";
import { useCartActions } from "@/hooks/useCartActions";

import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/Common/Loader";

const SingleItem = ({ item }) => {
  const { toggleFavorite, loadingIds } = useFavorites();
  const { addToCart } = useCartActions();
  const [adding, setAdding] = useState(false);

  const handleRemoveFromWishlist = () => {
    toggleFavorite(item);
  };

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart({ ...item, quantity: 1 });
    setAdding(false);
  };

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-10">
      <div className="min-w-[83px]">
        <button
          onClick={handleRemoveFromWishlist}
          aria-label="botão para remover produto da lista de desejos"
          disabled={loadingIds.has(item.id)}
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red disabled:opacity-50"
        >
          {loadingIds.has(item.id) ? (
            <Loader className="w-4 h-4 text-gray-6" />
          ) : (
            <X className="w-4 h-4 text-gray-6" />
          )}
        </button>
      </div>

      <div className="min-w-[387px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
              <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
                <Image
                  src={item.image_url}
                  alt="produto"
                  width={200}
                  height={200}
                />
              </div>

            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-blue">
                <Link href={`/product/${item.id}`}> {item.name} </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[415px]">
        <p className="text-dark">R$ {item.price.toFixed(2)}</p>
      </div>

      <div className="min-w-[150px] flex justify-end">
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="inline-flex text-dark hover:text-white bg-gray-1 border border-gray-3 py-2.5 px-6 rounded-md ease-out duration-200 hover:bg-blue hover:border-gray-3 disabled:opacity-50"
        >
          {adding ? (
            <>
              <Loader className="w-4 h-4 mr-2" /> Adicionando...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" /> Adicionar ao carrinho
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
