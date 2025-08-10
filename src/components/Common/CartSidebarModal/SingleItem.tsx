import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartActions } from "@/hooks/useCartActions";
import { Trash2 } from "lucide-react";
import type { CartItem } from "@/redux/features/cart-slice";
import Button from "@/components/Common/Button";
import { formatCurrency } from "@/lib/formatCurrency";

interface Props {
  item: CartItem;
}

const SingleItem = ({ item }: Props) => {
  const { removeFromCart } = useCartActions();
  const [removing, setRemoving] = useState(false);

  const handleRemoveFromCart = async () => {
    setRemoving(true);
    await removeFromCart(item.id);
    setRemoving(false);
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
            <span className="font-semibold">{formatCurrency(item.price)}</span>
          </p>
          <p className="text-custom-sm">
            Quantidade: <span className="font-semibold">{item.quantity}</span>{" "}
            <span className="font-semibold">
              {item.quantity === 1 ? "produto" : "produtos"}
            </span>
          </p>
        </div>
      </div>

      <Button
        onClick={handleRemoveFromCart}
        ariaLabel="button for remove product from cart"
        disabled={removing}
        size="icon"
        variant="gray"
        className="rounded-lg max-w-[38px] w-full h-9.5 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
      >
        {removing ? (
          <span className="animate-spin w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full" />
        ) : (
          <Trash2 className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default SingleItem;
