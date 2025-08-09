"use client";
import { useEffect } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import { useAuth } from "@/app/context/AuthContext";

const CartInitializer = () => {
  const { initializeCart } = useCartActions();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      initializeCart();
    }
  }, [initializeCart, user]);

  return null;
};

export default CartInitializer;
