"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";
import CustomSelect from "../ShopWithSidebar/CustomSelect";
import shopData from "../Shop/shopData";
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react";

const ShopWithoutSidebar: React.FC = () => {
  const [productStyle, setProductStyle] = useState<"grid" | "list">("grid");

  const sortOptions = [
    { label: "Produtos mais recentes", value: "0" },
    { label: "Mais vendidos", value: "1" },
    { label: "Produtos antigos", value: "2" },
  ];

  const totalItems = shopData.length;
  const visibleCount = 9; // ajustar conforme necessidade

  return (
    <>
      <Breadcrumb
        title="Explorar todos os produtos"
        pages={["Loja", "/", "Sem sidebar"]}
      />

      <section className="relative bg-[#f3f4f6] pb-20 pt-5 lg:pt-20 xl:pt-28 overflow-hidden">
        <div className="mx-auto max-w-[1170px] w-full px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* Conteúdo principal */}
            <div className="w-full">
              {/* Barra de controle */}
              <div className="mb-6 flex items-center justify-between rounded-lg bg-white px-3 py-2.5 shadow-1">
                <div className="flex flex-wrap items-center gap-4">
                  <CustomSelect options={sortOptions} />
                  <p>
                    Exibindo{" "}
                    <span className="font-medium text-dark">
                      {visibleCount} de {totalItems}
                    </span>{" "}
                    produtos
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    aria-label="Exibir em grade"
                    onClick={() => setProductStyle("grid")}
                    className={`flex h-9 w-10.5 items-center justify-center rounded-[5px] border transition-colors duration-200 ${
                      productStyle === "grid"
                        ? "bg-blue border-blue text-white"
                        : "bg-gray-1 border-gray-3 text-dark hover:bg-blue hover:border-blue hover:text-white"
                    }`}
                  >
                    <Grid size={18} className="stroke-current" />
                  </button>

                  <button
                    aria-label="Exibir em lista"
                    onClick={() => setProductStyle("list")}
                    className={`flex h-9 w-10.5 items-center justify-center rounded-[5px] border transition-colors duration-200 ${
                      productStyle === "list"
                        ? "bg-blue border-blue text-white"
                        : "bg-gray-1 border-gray-3 text-dark hover:bg-blue hover:border-blue hover:text-white"
                    }`}
                  >
                    <List size={18} className="stroke-current" />
                  </button>
                </div>
              </div>

              {/* Lista de produtos */}
              <div
                className={
                  productStyle === "grid"
                    ? "grid grid-cols-1 gap-y-9 gap-x-7.5 sm:grid-cols-2 lg:grid-cols-4"
                    : "flex flex-col gap-7.5"
                }
              >
                {shopData.map((item, idx) =>
                  productStyle === "grid" ? (
                    <SingleGridItem item={item} key={idx} />
                  ) : (
                    <SingleListItem item={item} key={idx} />
                  )
                )}
              </div>

              {/* Paginação */}
              <div className="mt-15 flex justify-center">
                <nav className="rounded-md bg-white p-2 shadow-1">
                  <ul className="flex items-center gap-2">
                    <li>
                      <button
                        type="button"
                        disabled
                        aria-label="Página anterior"
                        className="flex h-9 w-8 items-center justify-center rounded-[3px] disabled:text-gray-4 transition-colors duration-200 hover:bg-blue hover:text-white"
                      >
                        <ChevronLeft size={18} className="stroke-current" />
                      </button>
                    </li>
                    {[
                      1,
                      2,
                      3,
                      4,
                      5,
                      "...",
                      Math.ceil(totalItems / visibleCount),
                    ].map((page, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className={`flex items-center justify-center rounded-[3px] px-3.5 py-1.5 text-custom-sm transition-colors duration-200 ${
                            page === 1
                              ? "bg-blue text-white"
                              : "hover:bg-blue hover:text-white"
                          }`}
                        >
                          {page}
                        </a>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        aria-label="Próxima página"
                        className="flex h-9 w-8 items-center justify-center rounded-[3px] transition-colors duration-200 hover:bg-blue hover:text-white"
                      >
                        <ChevronRight size={18} className="stroke-current" />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithoutSidebar;
