"use client";
import React, { useEffect, useState } from "react";
import ProductDetails from "@/components/ShopDetails";
import { useParams } from "next/navigation";
import { Metadata } from "next";
import { getProductById } from "@/services/products";
import type { Product } from "@/types/product";

// export const metadata: Metadata = {
//   title: "Detalhes do Produto | Loja Catalog",
//   description: "Tela de detalhes do produto",
// };

const ProductsPage = () => {
  const params = useParams<{ id: string }>(); // nome do param
  const id = params?.id;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    getProductById(id).then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <main>
        <p>Carregando detalhes do produto...</p>
      </main>
    );
  }

  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
};

export default ProductsPage;
