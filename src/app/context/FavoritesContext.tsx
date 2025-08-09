"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Product } from "@/types/product";
import { addFavorite, removeFavorite, getFavorites, clearFavorites as clearAll } from "@/services/favorites";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: Product[];
  count: number;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => Promise<void>;
  clearFavorites: () => Promise<void>;
  loadingIds: Set<string>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    const items = await getFavorites(user.id);
    setFavorites(items);
  }, [user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const toggleFavorite = async (product: Product) => {
    if (!user) return;
    const productId = product.id;
    setLoadingIds((prev) => new Set(prev).add(productId));
    const already = favorites.some((p) => p.id === productId);
    try {
      if (already) {
        await removeFavorite(user.id, productId);
        setFavorites((prev) => prev.filter((p) => p.id !== productId));
      } else {
        await addFavorite(user.id, productId);
        setFavorites((prev) => [...prev, product]);
      }
    } finally {
      setLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const clearFavorites = async () => {
    if (!user) return;
    await clearAll(user.id);
    setFavorites([]);
  };

  const isFavorite = (productId: string) => favorites.some((p) => p.id === productId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, count: favorites.length, isFavorite, toggleFavorite, clearFavorites, loadingIds }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};

