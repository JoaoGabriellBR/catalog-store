import React, { useState } from "react";
import { useCartActions } from "@/hooks/useCartActions";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/redux/features/cart-slice";
import Loader from "@/components/Common/Loader";

interface Props {
  item: CartItem;
}

const SingleItem = ({ item }: Props) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const { removeFromCart, updateQuantity } = useCartActions();
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleRemoveFromCart = async () => {
    setRemoving(true);
    await removeFromCart(item.id);
    setRemoving(false);
  };

  const handleIncreaseQuantity = async () => {
    setUpdating(true);
    const newQty = quantity + 1;
    setQuantity(newQty);
    await updateQuantity(item.id, newQty);
    setUpdating(false);
  };

  const handleDecreaseQuantity = async () => {
    if (quantity > 1) {
      setUpdating(true);
      const newQty = quantity - 1;
      setQuantity(newQty);
      await updateQuantity(item.id, newQty);
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-7.5">
      <div className="min-w-[400px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
              <Image
                width={200}
                height={200}
                src={item.image_url}
                alt="product"
              />
            </div>

            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-blue">
                <Link href={`/product/${item.id}`}>{item.name}</Link>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[180px]">
        <p className="text-dark">R$ {item.price.toFixed(2)}</p>
      </div>

      <div className="min-w-[275px]">
        <div className="w-max flex items-center rounded-md border border-gray-3">
          <button
            onClick={handleDecreaseQuantity}
            aria-label="button for remove product"
            disabled={updating || removing}
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue disabled:opacity-50"
          >
            {updating ? <Loader className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
          </button>

          <span className="flex items-center justify-center w-16 h-11.5 border-x border-gray-4">
            {quantity}
          </span>

          <button
            onClick={handleIncreaseQuantity}
            aria-label="button for add product"
            disabled={updating || removing}
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue disabled:opacity-50"
          >
            {updating ? <Loader className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="min-w-[200px]">
        <p className="text-dark">R$ {(item.price * quantity).toFixed(2)}</p>
      </div>

      <div className="min-w-[50px] flex justify-end">
        <button
          onClick={handleRemoveFromCart}
          aria-label="button for remove product from cart"
          disabled={removing}
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red disabled:opacity-50"
        >
          {removing ? <Loader className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default SingleItem;

