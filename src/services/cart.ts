import { supabase } from "../../lib/supabaseClient";
import { CartItem } from "@/redux/features/cart-slice";

export async function getCartItems(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      "quantity, product_id, products(name, description, price, image_url, category)"
    )
    .eq("user_id", userId);

  if (error || !data) {
    console.error("Error fetching cart items", error?.message);
    return [];
  }

  return data.map(
    (row: {
      quantity: number;
      product_id: string;
      products: {
        name: string;
        description: string;
        price: number;
        image_url: string;
        category: string;
      };
    }) => ({
      id: row.product_id,
      name: row.products.name,
      description: row.products.description,
      price: row.products.price,
      image_url: row.products.image_url,
      category: row.products.category,
      quantity: row.quantity,
    })
  );
}

export async function addOrUpdateCartItem(
  userId: string,
  productId: string,
  quantity: number
) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) {
    console.error("Error checking cart item", error.message);
    return;
  }

  if (data) {
    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: data.quantity + quantity })
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (updateError) {
      console.error("Error updating cart item", updateError.message);
    }
  } else {
    const { error: insertError } = await supabase.from("cart_items").insert({
      user_id: userId,
      product_id: productId,
      quantity,
    });

    if (insertError) {
      console.error("Error inserting cart item", insertError.message);
    }
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
