"use client";
import React, { useEffect, useState } from "react";
import ProductDetails from "@/components/ShopDetails";
import { useParams } from "next/navigation";
import { products } from "../../../../../../lib/productsData";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Detalhes do Produto | Loja STG Catalog",
//   description: "Tela de detalhes do produto",
// };

const ProductsPage = () => {
  const { id } = useParams(); // nome do param
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productId = Number(id);
    const found = products.find((p) => Number(p.id) === productId);
    setProduct(found ?? null);
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
