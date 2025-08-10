"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import { getProducts } from "@/services/products";
import type { Product } from "@/types/product";
import { Store } from "lucide-react";

const NewArrival = () => {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ limit: 12 }).then(({ products }) => setItems(products));
  }, []);

  return (
    <section className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Store className="w-5 h-5 text-blue" />
              Esta semana
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Novidades
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {/* <!-- New Arrivals item --> */}
          {items.map((item) => (
            <ProductItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
