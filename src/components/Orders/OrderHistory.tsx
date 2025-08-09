"use client";

import OrderCard from "./OrderCard";
import { Order } from "@/types/order";

interface OrderHistoryProps {
  orders: Order[];
  className?: string;
}

const OrderHistory = ({ orders, className }: OrderHistoryProps) => {
  if (!orders.length) {
    return (
      <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">
        Você ainda não fez nenhum pedido.
      </p>
    );
  }

  return (
    <div className={`space-y-6 ${className ?? ""}`}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderHistory;

