"use client";
import React, { useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import { Tag } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/services/products";
import type { Product } from "@/types/product";

const BestSeller = () => {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ limit: 6 }).then(({ products }) => setItems(products));
  }, []);

  return (
    <section className="overflow-hidden">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Tag className="w-[17px] h-[17px]" />
              Este mês
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Mais vendidos
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {/* <!-- Best Sellers item --> */}
          {items.map((item) => (
            <SingleItem item={item} key={item.id} />
          ))}
        </div>

        <div className="text-center mt-12.5">
          <Link
            href="/products"
            className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            Ver todos os produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
