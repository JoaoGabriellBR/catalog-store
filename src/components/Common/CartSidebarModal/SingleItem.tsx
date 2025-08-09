import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartActions } from "@/hooks/useCartActions";
import { Trash2 } from "lucide-react";
import type { CartItem } from "@/redux/features/cart-slice";

interface Props {
  item: CartItem;
}

const SingleItem = ({ item }: Props) => {
  const { removeFromCart } = useCartActions();

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="w-full flex items-center gap-6">
        <div className="flex items-center justify-center rounded-[10px] bg-gray-3 max-w-[90px] w-full h-22.5">
          <Image src={item.image_url} alt="product" width={100} height={100} />
        </div>

        <div>
          <h3 className="font-medium text-dark mb-1 ease-out duration-200 hover:text-blue">
            <Link href={`/product/${item.id}`}>{item.name}</Link>
          </h3>
          <p className="text-custom-sm">
            Preço:{" "}
            <span className="font-semibold">R$ {item.price.toFixed(2)}</span>
          </p>
          <p className="text-custom-sm">
            Quantidade: <span className="font-semibold">{item.quantity}</span>{" "}
            <span className="font-semibold">
              {item.quantity === 1 ? "produto" : "produtos"}
            </span>
          </p>
        </div>
      </div>

      <button
        onClick={handleRemoveFromCart}
        aria-label="button for remove product from cart"
        className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SingleItem;
