import React, { useState } from "react";
import { useFavorites } from "@/app/context/FavoritesContext";
import { useCartActions } from "@/hooks/useCartActions";

import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import Button from "@/components/Common/Button";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/formatCurrency";

interface SingleItemProps {
  item: Product;
}

const SingleItem: React.FC<SingleItemProps> = ({ item }) => {
  const { toggleFavorite, loadingIds } = useFavorites();
  const { addToCart } = useCartActions();
  const [adding, setAdding] = useState(false);

  const handleRemoveFromWishlist = () => {
    toggleFavorite(item);
  };

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(item, 1);
    setAdding(false);
  };

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-10">
      <div className="min-w-[83px]">
        <Button
          onClick={handleRemoveFromWishlist}
          ariaLabel="botão para remover produto da lista de desejos"
          disabled={loadingIds.has(item.id)}
          size="icon"
          variant="gray"
          className="rounded-lg max-w-[38px] w-full h-9.5 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          {loadingIds.has(item.id) ? (
            <span className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full" />
          ) : (
            <X className="w-4 h-4 text-gray-6" />
          )}
        </Button>
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
        <p className="text-dark">{formatCurrency(item.price)}</p>
      </div>

      <div className="min-w-[150px] flex justify-end">
        <Button
          onClick={handleAddToCart}
          disabled={adding}
          isLoading={adding}
          variant="outline"
          className="py-2.5 px-6"
        >
          {!adding && (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" /> Adicionar ao carrinho
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SingleItem;
