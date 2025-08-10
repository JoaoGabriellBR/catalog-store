"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import SingleItem from "./SingleItem";
import { useFavorites } from "@/app/context/FavoritesContext";
import Button from "@/components/Common/Button";
import { TableHeader } from "@/types/table-header";

export const Wishlist = () => {
  const { favorites: wishlistItems, clearFavorites } = useFavorites();

  const tableHeader = [
    { minWidth: "min-w-[387px]", title: "Produto" },
    { minWidth: "min-w-[498px]", title: "Preço unitário" },
    { minWidth: "min-w-[150px]", title: "Ação" },
  ];

  return (
    <>
      <Breadcrumb title={"Lista de desejos"} pages={["Lista de desejos"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">
              Sua lista de desejos
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue"
              onClick={() => clearFavorites()}
            >
              Limpar lista de desejos
            </Button>
          </div>

          <div className="bg-white rounded-[10px] shadow-1">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center py-5.5 px-10">
                  <div className="min-w-[83px]"></div>
                  {tableHeader.map(
                    ({ minWidth, title }: TableHeader, index) => (
                      <div key={index} className={minWidth}>
                        <p className="text-dark">{title}</p>
                      </div>
                    )
                  )}
                </div>

                {/* <!-- wish item --> */}
                {wishlistItems.map((item, key) => (
                  <SingleItem item={item} key={key} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
