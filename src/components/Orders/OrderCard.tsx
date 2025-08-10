"use client";

import { Clock, Package } from "lucide-react";
import { Order } from "@/types/order";
import { formatCurrency } from "@/lib/formatCurrency";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <article
      className="bg-white rounded-lg shadow-1 p-4 sm:p-6"
      aria-labelledby={`order-${order.id}`}
    >
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <h3
          id={`order-${order.id}`}
          className="flex items-center gap-2 font-medium text-dark"
        >
          <Package className="w-4 h-4 text-blue" aria-hidden="true" />
          Pedido #{order.id.slice(0, 6)}
        </h3>
        <time
          className="text-sm text-dark-4"
          dateTime={new Date(order.created_at).toISOString()}
        >
          {new Date(order.created_at).toLocaleDateString("pt-BR")}
        </time>
      </header>

      <ul className="divide-y divide-gray-3 mb-4">
        {order.items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-2 text-sm text-dark"
          >
            <span className="flex-1">
              {item.name} <span className="text-dark-4">x{item.quantity}</span>
            </span>
            <span className="font-medium">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="inline-flex items-center text-sm text-dark-4">
          <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
          Em processamento
        </span>
        <p className="font-semibold text-dark">
          Total: {formatCurrency(order.total)}
        </p>
      </div>
    </article>
  );
};

export default OrderCard;

