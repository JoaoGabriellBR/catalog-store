"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import SingleListItem from "../Shop/SingleListItem";
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/Common/Button";
import ProductItem from "../Common/ProductItem";
import { getProducts } from "@/services/products";
import type { Product } from "@/types/product";

const AllProducts: React.FC = () => {
  const [productStyle, setProductStyle] = useState<"grid" | "list">("grid");
  const itemsPerPage = 12;
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + products.length;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const load = async () => {
      const { products: data, count } = await getProducts({
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      });
      setProducts(data);
      setTotalItems(count);
    };
    load();
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <Breadcrumb
        title="Explorar todos os produtos"
        pages={["Loja", "/", "Explorar todos os produtos"]}
      />

      <section className="relative bg-[#f3f4f6] pb-20 pt-5 lg:pt-20 xl:pt-28 overflow-hidden">
        <div className="mx-auto max-w-[1170px] w-full px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* Conteúdo principal */}
            <div className="w-full">
              {/* Barra de controle */}
              <div className="mb-6 flex items-center justify-between rounded-lg bg-white px-3 py-2.5 shadow-1">
                <div className="flex flex-wrap items-center gap-4">
                  <p>
                    Exibindo{" "}
                    <span className="font-medium text-dark">
                      {startIndex + 1}-{Math.min(endIndex, totalItems)}
                    </span>{" "}
                    produtos
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <Button
                    ariaLabel="Exibir em grade"
                    onClick={() => setProductStyle("grid")}
                    variant={productStyle === "grid" ? "primary" : "gray"}
                    size="icon"
                    className="h-9 w-10.5"
                  >
                    <Grid size={18} className="stroke-current" />
                  </Button>

                  <Button
                    ariaLabel="Exibir em lista"
                    onClick={() => setProductStyle("list")}
                    variant={productStyle === "list" ? "primary" : "gray"}
                    size="icon"
                    className="h-9 w-10.5"
                  >
                    <List size={18} className="stroke-current" />
                  </Button>
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
                {products.map((item) =>
                  productStyle === "grid" ? (
                    <ProductItem item={item} key={item.id} />
                  ) : (
                    <SingleListItem item={item} key={item.id} />
                  )
                )}
              </div>

              {/* Paginação */}
              <div className="mt-15 flex justify-center">
                <nav className="rounded-md bg-white p-2 shadow-1">
                  <ul className="flex items-center gap-2">
                    <li>
                      <Button
                        type="button"
                        ariaLabel="Página anterior"
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        variant="ghost"
                        size="icon"
                        className="h-9 w-8 disabled:text-gray-4 hover:bg-blue hover:text-white"
                      >
                        <ChevronLeft size={18} className="stroke-current" />
                      </Button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li key={page}>
                          <Button
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            variant={page === currentPage ? "primary" : "ghost"}
                            className={`px-3.5 py-1.5 text-custom-sm`}
                          >
                            {page}
                          </Button>
                        </li>
                      )
                    )}
                    <li>
                      <Button
                        type="button"
                        ariaLabel="Próxima página"
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={
                          currentPage === totalPages || totalPages === 0
                        }
                        variant="ghost"
                        size="icon"
                        className="h-9 w-8 disabled:text-gray-4 hover:bg-blue hover:text-white"
                      >
                        <ChevronRight size={18} className="stroke-current" />
                      </Button>
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

export default AllProducts;
