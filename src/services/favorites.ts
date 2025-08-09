import { supabase } from "../../lib/supabaseClient";
import type { Product } from "@/types/product";

export async function getFavorites(userId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select("products(id, name, description, price, image_url, category)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching favorites:", error.message);
    return [];
  }

  return data?.map((row: any) => row.products) ?? [];
}

export async function addFavorite(userId: string, productId: string) {
  const { error } = await supabase
    .from("favorites")
    .insert({ user_id: userId, product_id: productId });

  if (error) {
    console.error("Error adding favorite:", error.message);
    throw error;
  }
}

export async function removeFavorite(userId: string, productId: string) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    console.error("Error removing favorite:", error.message);
    throw error;
  }
}

export async function clearFavorites(userId: string) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Error clearing favorites:", error.message);
    throw error;
  }
}
