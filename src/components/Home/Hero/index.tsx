"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProducts } from "@/services/products";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import { formatCurrency } from "@/lib/formatCurrency";

type PromoItem = {
  id: string | number;
  title: string;
  subtitle?: string;
  price: number;
  oldPrice?: number;
  imageSrc: string;
  imageAlt: string;
  productQuery?: string;
};

const PROMOS: PromoItem[] = [
  {
    id: 1,
    title: "Apple Watch Series 9",
    subtitle: "limited time offer",
    price: 3999.99,
    oldPrice: 4399.99,
    imageSrc: "/images/hero/apple-watch-series-9.png",
    imageAlt: "Apple Watch Series 9",
    productQuery: "Apple Watch Series 9",
  },
  {
    id: 2,
    title: "iPad Pro 12.9",
    subtitle: "limited time offer",
    price: 8999.99,
    oldPrice: 9599.99,
    imageSrc: "/images/hero/ipad-pro-12.png",
    imageAlt: "iPad Pro 12.9",
    productQuery: "iPad Pro 12.9",
  },
];

const PromoCard = React.memo(function PromoCard({ item }: { item: PromoItem }) {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);

  const handleNavigate = async () => {
    if (navigating) return;
    setNavigating(true);
    try {
      const query = item.productQuery || item.title;
      const { products } = await getProducts({ search: query, limit: 1 });
      const first = products[0];
      if (first) {
        router.push(`/product/${first.id}`);
      } else {
        router.push(`/products?search=${encodeURIComponent(query)}`);
      }
    } finally {
      setNavigating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleNavigate}
      aria-label={`Ver produto: ${item.title}`}
      className="w-full h-full min-h-0 relative rounded-[10px] bg-white p-4 sm:p-6 transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex text-left"
      disabled={navigating}
    >
      <div className="flex items-start justify-between gap-6 w-full">
        <div className="min-w-0 h-full flex flex-col justify-between gap-2">
          <div className="flex flex-col items-start">
            <h2 className="font-semibold text-dark text-lg sm:text-xl mb-3 line-clamp-2">
              {item.title}
            </h2>
            {item.subtitle && (
              <p className="font-medium text-dark-4 text-custom-sm mb-2">
                Oferta por tempo limitado
              </p>
            )}
          </div>

          <span className="w-full flex flex-col items-start font-semibold text-2xl text-blue">
            {item.oldPrice && (
              <span className="text-sm text-red-light line-through">
                {formatCurrency(item.oldPrice)}
              </span>
            )}
            <span>{formatCurrency(item.price)}</span>
          </span>
        </div>

        <div className="relative w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] shrink-0 self-end">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 640px) 96px, 120px"
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </button>
  );
});

const Hero: React.FC = () => {
  return (
    <section
      className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]"
      aria-label="Destaques e promoções"
    >
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5 items-stretch">
          {/* Carrossel */}
          <div className="xl:max-w-[757px] w-full">
            <div className="relative rounded-[10px] bg-white overflow-hidden h-[380px] md:h-[440px] xl:h-[520px]">
              {/* BG decorativo */}
              <Image
                src="/images/hero/hero-bg.png"
                alt=""
                aria-hidden="true"
                className="absolute right-0 bottom-0"
                width={534}
                height={520}
                priority={false}
              />
              <HeroCarousel />
            </div>
          </div>

          {/* Promoções laterais */}
          <aside
            className="xl:max-w-[393px] w-full"
            aria-label="Ofertas rápidas"
          >
            {/* mesma altura do carrossel e dividida em 2 linhas */}
            <div className="grid grid-rows-2 gap-5 h-[380px] md:h-[440px] xl:h-[520px]">
              {PROMOS.map((promo) => (
                <PromoCard key={promo.id} item={promo} />
              ))}
            </div>
          </aside>
        </div>
      </div>

      <HeroFeature />
    </section>
  );
};

export default Hero;
