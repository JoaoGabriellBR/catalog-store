"use client";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/app/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
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
  const { getAuthenticatedUserOrRedirect, ensureAuthenticated } =
    useAuthGuard();

  const initializeCart = useCallback(async () => {
    if (!user) return;
    const items = await getCartItems(user.id);
    dispatch(setCartItems(items));
  }, [user, dispatch]);

  const addToCart = async (item: CartItem, quantity = 1) => {
    const authUser = getAuthenticatedUserOrRedirect(
      "Você precisa estar logado para adicionar itens ao carrinho.",
      "cart"
    );
    if (!authUser) return;
    await addOrUpdateCartItem(authUser.id, item.id, quantity);
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const updateQuantity = async (id: string, quantity: number) => {
    const authUser = getAuthenticatedUserOrRedirect(
      "Você precisa estar logado para alterar a quantidade.",
      "cart"
    );
    if (!authUser) return;
    await setCartItemQuantity(authUser.id, id, quantity);
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const removeFromCart = async (id: string) => {
    const authUser = getAuthenticatedUserOrRedirect(
      "Você precisa estar logado para remover itens do carrinho.",
      "cart"
    );
    if (!authUser) return;
    await removeCartItem(authUser.id, id);
    dispatch(removeItemFromCart(id));
  };

  const clearCart = async () => {
    const authUser = getAuthenticatedUserOrRedirect(
      "Você precisa estar logado para limpar o carrinho.",
      "cart"
    );
    if (!authUser) return;
    await clearCartItems(authUser.id);
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
