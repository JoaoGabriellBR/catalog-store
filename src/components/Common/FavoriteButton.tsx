"use client";
import React from "react";
import { Heart, Loader2 } from "lucide-react";
import type { Product } from "@/types/product";
import { useFavorites } from "@/app/context/FavoritesContext";

interface FavoriteButtonProps {
  product: Product;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product, className }) => {
  const { isFavorite, toggleFavorite, loadingIds } = useFavorites();
  const loading = loadingIds.has(product.id);
  const active = isFavorite(product.id);

  return (
    <button
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      onClick={() => toggleFavorite(product)}
      disabled={loading}
      className={`p-2 rounded-md shadow transition-colors ${
        active ? "bg-blue text-white" : "bg-white text-dark"
      } ${className ?? ""}`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Heart className={`w-5 h-5 ${active ? "fill-current" : "stroke-current"}`} />
      )}
    </button>
  );
};

export default FavoriteButton;
