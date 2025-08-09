import { supabase } from "../../lib/supabaseClient";
import { CartItem } from "@/redux/features/cart-slice";

export async function getCartItems(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      "quantity, products:id, products(name, description, price, image_url, category)"
    )
    .eq("user_id", userId);

  if (error || !data) {
    console.error("Error fetching cart items", error?.message);
    return [];
  }

  return data.map((row: any) => ({
    id: row.products.id,
    name: row.products.name,
    description: row.products.description,
    price: row.products.price,
    image_url: row.products.image_url,
    category: row.products.category,
    quantity: row.quantity,
  }));
}

export async function addOrUpdateCartItem(
  userId: string,
  productId: string,
  quantity: number
) {
  const { data } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  const newQuantity = data ? data.quantity + quantity : quantity;

  const { error } = await supabase
    .from("cart_items")
    .upsert(
      { user_id: userId, product_id: productId, quantity: newQuantity },
      { onConflict: "user_id,product_id" }
    );

  if (error) {
    console.error("Error adding to cart", error.message);
  }
}

export async function setCartItemQuantity(
  userId: string,
  productId: string,
  quantity: number
) {
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    console.error("Error updating cart item", error.message);
  }
}

export async function removeCartItem(userId: string, productId: string) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    console.error("Error removing cart item", error.message);
  }
}

export async function clearCartItems(userId: string) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Error clearing cart", error.message);
  }
}
