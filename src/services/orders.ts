import { supabase } from "../../lib/supabaseClient";
import { Order } from "@/types/order";
import { CartItem } from "@/redux/features/cart-slice";

export async function createOrder(
  userId: string,
  items: CartItem[],
  total: number
) {
  const formattedItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const { error } = await supabase.from("orders").insert({
    user_id: userId,
    items: formattedItems,
    total,
  });

  if (error) {
    console.error("Error creating order", error.message);
  }
}

export async function getOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("id, items, total, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error fetching orders", error?.message);
    return [];
  }

  return data as Order[];
}
