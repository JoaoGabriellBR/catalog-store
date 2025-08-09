"use client";
import { useEffect } from "react";
import { useCartActions } from "@/hooks/useCartActions";

const CartInitializer = () => {
  const { initializeCart } = useCartActions();

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  return null;
};

export default CartInitializer;
