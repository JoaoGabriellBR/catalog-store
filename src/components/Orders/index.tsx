"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { getOrders } from "@/services/orders";
import { Order } from "@/types/order";
import OrderHistory from "./OrderHistory";

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

  return <OrderHistory orders={orders} />;
};

export default Orders;

