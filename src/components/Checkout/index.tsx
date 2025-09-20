"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  CreditCard,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Button from "@/components/Common/Button";

import { useAppSelector } from "@/redux/store";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAuth } from "@/app/context/AuthContext";
import { useCartActions } from "@/hooks/useCartActions";
import { createOrder } from "@/services/orders";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { formatCurrency } from "@/lib/formatCurrency";

type PaymentMethod = "whatsapp" | "pix" | "credit";
type ShippingMethod = "standard" | "express";

const Checkout: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const subtotal = useSelector(selectTotalPrice);
  const { user } = useAuth();
  const { clearCart } = useCartActions();
  const { ensureAuthenticated } = useAuthGuard();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("whatsapp");
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("standard");

  const shippingCost = useMemo(() => {
    return shippingMethod === "express" ? 19.9 : 0;
  }, [shippingMethod]);

  const grandTotal = useMemo(
    () => subtotal + shippingCost,
    [subtotal, shippingCost]
  );

  const handleConfirm = useCallback(async () => {
    const canProceed = ensureAuthenticated(
      "Você precisa estar logado para finalizar a compra",
      "cart"
    );
    if (!canProceed || !user) return;
    if (paymentMethod !== "whatsapp") return;

    setLoading(true);
    try {
      const messageLines = [
        "NOVO PEDIDO - Catalog",
        `Cliente: ${user.user_metadata?.full_name || ""}`,
        `Email: ${user.email}`,
        "PRODUTOS:",
        ...cartItems.map(
          (item) =>
            `• ${item.name} - Qtd: ${item.quantity} - ${formatCurrency(
              item.price * item.quantity
            )}`
        ),
        "",
        `Subtotal: ${formatCurrency(subtotal)}`,
        `Frete (${
          shippingMethod === "express" ? "Expresso" : "Padrão"
        }): ${formatCurrency(shippingCost)}`,
        `TOTAL: ${formatCurrency(grandTotal)}`,
        "",
        "Pedido via Catalog",
      ];

      await createOrder(user.id, cartItems, grandTotal);
      await clearCart();
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        messageLines.join("\n")
      )}`;
      window.open(whatsappUrl, "_blank");
      router.push("/order-success");
    } finally {
      setLoading(false);
    }
  }, [
    ensureAuthenticated,
    user,
    paymentMethod,
    shippingMethod,
    cartItems,
    subtotal,
    shippingCost,
    grandTotal,
    clearCart,
    router,
  ]);

  const handleCancel = useCallback(() => {
    router.push("/cart");
  }, [router]);

  if (!cartItems.length) {
    return (
      <section className="overflow-hidden py-16 sm:py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 text-center">
          <p className="mb-6">Seu carrinho está vazio.</p>
          <Link href="/products">
            <Button variant="primary">Continuar comprando</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-gray-2 pt-[250px] sm:pt-[200px] lg:pt-[140px] xl:pt-[200px] pb-16 sm:pb-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <h1 className="text-2xl sm:text-3xl font-semibold text-dark mb-6 sm:mb-8 text-center sm:text-left">
          Finalizar compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pagamento */}
            <section
              className="bg-white rounded-xl shadow-1 p-5 sm:p-7"
              aria-labelledby="payment-title"
            >
              <h2
                id="payment-title"
                className="font-medium text-xl text-dark mb-5"
              >
                Formas de pagamento
              </h2>

              <fieldset
                className="space-y-4"
                aria-label="Selecione a forma de pagamento"
              >
                <legend className="sr-only">Pagamento</legend>

                <label className="flex items-start gap-4 p-4 border border-gray-3 rounded-lg cursor-pointer hover:border-blue/60 focus-within:ring-2 focus-within:ring-blue/40">
                  <input
                    type="radio"
                    name="payment"
                    value="whatsapp"
                    className="mt-1"
                    checked={paymentMethod === "whatsapp"}
                    onChange={() => setPaymentMethod("whatsapp")}
                    aria-describedby="pm-whatsapp-desc"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MessageCircle
                        className="w-5 h-5 text-green-600"
                        aria-hidden="true"
                      />
                      <span className="font-medium text-dark">WhatsApp</span>
                      <span className="ml-2 rounded bg-green-50 text-green-700 text-xs px-2 py-0.5">
                        Recomendado
                      </span>
                    </div>
                    <p
                      id="pm-whatsapp-desc"
                      className="text-dark-4 text-sm mt-1"
                    >
                      Enviaremos os detalhes do pedido via WhatsApp para
                      prosseguir.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 border border-gray-3 rounded-lg cursor-not-allowed opacity-60">
                  <input
                    type="radio"
                    name="payment"
                    value="pix"
                    className="mt-1"
                    checked={paymentMethod === "pix"}
                    onChange={() => setPaymentMethod("pix")}
                    disabled
                    aria-describedby="pm-pix-desc"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium text-dark">PIX</span>
                      <span className="ml-2 rounded bg-gray-1 text-dark text-xs px-2 py-0.5">
                        Em breve
                      </span>
                    </div>
                    <p id="pm-pix-desc" className="text-dark-4 text-sm mt-1">
                      Pague com QR Code PIX. Indisponível no momento.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 border border-gray-3 rounded-lg cursor-not-allowed opacity-60">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    className="mt-1"
                    checked={paymentMethod === "credit"}
                    onChange={() => setPaymentMethod("credit")}
                    disabled
                    aria-describedby="pm-credit-desc"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium text-dark">
                        Cartão de crédito
                      </span>
                      <span className="ml-2 rounded bg-gray-1 text-dark text-xs px-2 py-0.5">
                        Em breve
                      </span>
                    </div>
                    <p id="pm-credit-desc" className="text-dark-4 text-sm mt-1">
                      Pague em até 12x sem juros. Indisponível no momento.
                    </p>
                  </div>
                </label>
              </fieldset>

              <div className="mt-5 flex items-center gap-2 text-dark-4 text-sm">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Compra segura e criptografada</span>
              </div>
            </section>

            {/* Entrega */}
            <section
              className="bg-white rounded-xl shadow-1 p-5 sm:p-7"
              aria-labelledby="shipping-title"
            >
              <h2
                id="shipping-title"
                className="font-medium text-xl text-dark mb-5"
              >
                Entrega
              </h2>

              <fieldset
                className="grid gap-4 sm:grid-cols-2"
                aria-label="Selecione o método de entrega"
              >
                <legend className="sr-only">Entrega</legend>
                <label className="flex items-start gap-3 p-4 border border-gray-3 rounded-lg cursor-pointer hover:border-blue/60 focus-within:ring-2 focus-within:ring-blue/40">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    className="mt-1"
                    checked={shippingMethod === "standard"}
                    onChange={() => setShippingMethod("standard")}
                    aria-describedby="ship-standard-desc"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium text-dark">Padrão</span>
                    </div>
                    <p
                      id="ship-standard-desc"
                      className="text-dark-4 text-sm mt-1"
                    >
                      5-8 dias úteis — {formatCurrency(0)}
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-gray-3 rounded-lg cursor-pointer hover:border-blue/60 focus-within:ring-2 focus-within:ring-blue/40">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    className="mt-1"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    aria-describedby="ship-express-desc"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium text-dark">Expresso</span>
                    </div>
                    <p
                      id="ship-express-desc"
                      className="text-dark-4 text-sm mt-1"
                    >
                      2-3 dias úteis — {formatCurrency(19.9)}
                    </p>
                  </div>
                </label>
              </fieldset>
            </section>
          </div>

          {/* Resumo (sticky no desktop) */}
          <aside className="lg:col-span-1 lg:sticky lg:top-6">
            <div className="bg-white rounded-xl shadow-1 p-5 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-xl text-dark">
                  Resumo do pedido
                </h2>
                <span className="text-sm text-dark-4">
                  {cartItems.length} itens
                </span>
              </div>

              <ul
                className="divide-y divide-gray-3 mb-4"
                aria-label="Itens do pedido"
              >
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-md bg-gray-2 overflow-hidden shrink-0">
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-dark truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-dark-4">
                          Qtd: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-dark">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-dark-4">Subtotal</span>
                  <span className="text-dark">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-4">Frete</span>
                  <span className="text-dark">
                    {formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-3">
                  <span className="text-dark font-medium">Total</span>
                  <span className="text-dark font-semibold">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleCancel}
                  variant="gray"
                  className="w-full sm:w-1/2"
                  ariaLabel="Cancelar e voltar ao carrinho"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirm}
                  isLoading={loading}
                  variant="success"
                  className="w-full sm:w-1/2"
                  ariaLabel={
                    paymentMethod === "whatsapp"
                      ? "Confirmar e enviar pedido pelo WhatsApp"
                      : "Método de pagamento indisponível"
                  }
                  disabled={paymentMethod !== "whatsapp"}
                >
                  {!loading && (
                    <span className="inline-flex items-center">
                      <MessageCircle className="mr-2" /> Confirmar pedido
                    </span>
                  )}
                </Button>
              </div>

              <p className="mt-3 text-xs text-dark-4 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                Seus dados estão protegidos.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
