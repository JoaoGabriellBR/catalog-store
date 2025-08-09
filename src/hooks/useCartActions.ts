"use client";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/app/context/AuthContext";
import {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
  setCartItems,
  CartItem,
} from "@/redux/features/cart-slice";
import {
  addOrUpdateCartItem,
  removeCartItem,
  clearCartItems,
  getCartItems,
  setCartItemQuantity,
} from "@/services/cart";
import { AppDispatch } from "@/redux/store";

export const useCartActions = () => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const initializeCart = useCallback(async () => {
    if (!user) return;
    const items = await getCartItems(user.id);
    dispatch(setCartItems(items));
  }, [user, dispatch]);

  const addToCart = async (item: CartItem, quantity = 1) => {
    if (!user) return;
    await addOrUpdateCartItem(user.id, item.id, quantity);
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!user) return;
    await setCartItemQuantity(user.id, id, quantity);
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const removeFromCart = async (id: string) => {
    if (!user) return;
    await removeCartItem(user.id, id);
    dispatch(removeItemFromCart(id));
  };

  const clearCart = async () => {
    if (!user) return;
    await clearCartItems(user.id);
    dispatch(removeAllItemsFromCart());
  };

  return {
    initializeCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};
