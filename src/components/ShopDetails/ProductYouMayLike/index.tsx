"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductItem from "@/components/Common/ProductItem";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { getProducts } from "@/services/products";
import type { Product } from "@/types/product";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";

const ProductYouMayLike = () => {
  const sliderRef = useRef(null);
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ limit: 8 }).then(({ products }) => setItems(products));
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <div className="swiper categories-carousel common-carousel">
          {/* <!-- section title --> */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                <Tag className="w-4 h-4 inline-block text-blue" />
                Categorias
              </span>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                Produtos que você talvez goste (:
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handlePrev} className="swiper-button-prev">
                <ChevronLeft className="w-6 h-6 inline-block" />
              </button>

              <button onClick={handleNext} className="swiper-button-next">
                <ChevronRight className="w-6 h-6 inline-block" />
              </button>
            </div>
          </div>
          {/* <!-- Swiper --> */}
          <Swiper
            ref={sliderRef}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 12 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="justify-between"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductYouMayLike;
