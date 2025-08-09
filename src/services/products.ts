import { supabase } from "../../lib/supabaseClient";
import { Product } from "@/types/product";

interface GetProductsParams {
  search?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<{ products: Product[]; count: number }> {
  const { search, category, limit, offset } = params;

  let query = supabase
    .from("products")
    .select("id, name, description, price, image_url, category", { count: "exact" });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (category && category !== "Todos") {
    query = query.eq("category", category);
  }

  if (typeof offset === "number" && typeof limit === "number") {
    query = query.range(offset, offset + limit - 1);
  } else if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching products:", error.message);
    return { products: [], count: 0 };
  }

  return { products: data ?? [], count: count ?? 0 };
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, price, image_url, category")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product by id:", error.message);
    return null;
  }

  return data;
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("products")
    .select("category", { distinct: true })
    .order("category", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  return data?.map((c) => c.category) ?? [];
}
