import React from "react";
import AllProducts from "@/components/Products";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos | Loja Catalog",
  description: "Tela de produtos da loja",
};

const Products = () => {
  return (
    <main>
      <AllProducts />
    </main>
  );
};

export default Products;
