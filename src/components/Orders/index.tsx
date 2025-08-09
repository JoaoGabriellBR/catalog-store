"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { getOrders } from "@/services/orders";
import { Order } from "@/types/order";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const data = await getOrders(user.id);
        setOrders(data);
      }
    };
    fetchOrders();
  }, [user]);

  if (!orders.length) {
    return (
      <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">
        Você ainda não fez nenhum pedido.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-md p-4">
          <div className="flex justify-between mb-2">
            <p className="text-sm text-dark">Pedido #{order.id}</p>
            <p className="text-sm text-dark">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <ul className="mb-2">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="font-medium text-right">
            Total: R$ {order.total.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
