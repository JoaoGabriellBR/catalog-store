"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
  sale?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const carouselData: Slide[] = [
  {
    id: 1,
    title: "Controle Sem Fio DualSense PS5",
    description:
      "Controle com resposta tátil e gatilhos adaptáveis para imersão em jogos de nova geração.",
    image: "/images/hero/ps5.png",
    sale: "30%",
    ctaHref: "/products",
    ctaLabel: "Ver produtos",
  },
  {
    id: 2,
    title: "Fone de Ouvido Sony WH-1000XM5",
    description:
      "Fone de ouvido sem fio com cancelamento de ruído ativo, bateria de 30h e qualidade de áudio excepcional.",
    image: "/images/hero/sony-wh.webp",
    sale: "30%",
    ctaHref: "/products",
    ctaLabel: "Ver produtos",
  },
];

// Evita recriar arrays/objetos a cada render
const SWIPER_MODULES = [Autoplay, Pagination];
const AUTOPLAY = { delay: 2500, disableOnInteraction: false } as const;
const PAGINATION = { clickable: true } as const;

const HeroCarousel: React.FC<{ data?: Slide[] }> = ({
  data = carouselData,
}) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={AUTOPLAY}
      pagination={PAGINATION}
      modules={SWIPER_MODULES}
      className="hero-carousel"
    >
      {data.map((item, idx) => (
        <SwiperSlide key={item.id}>
          <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
            <div className="w-full sm:max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5 text-center sm:text-left">
              {item.sale && (
                <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                  <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                    {item.sale}
                  </span>
                  <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                    de
                    <br />
                    desconto
                  </span>
                </div>
              )}

              <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                {item.title}
              </h1>

              <p className="text-dark/80">{item.description}</p>

              {item.ctaHref && (
                <Link
                  href={item.ctaHref}
                  className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
                  aria-label={item.ctaLabel ?? "Saiba mais"}
                >
                  {item.ctaLabel ?? "Saiba mais"}
                </Link>
              )}
            </div>

            <div className="relative w-full flex justify-center sm:justify-end">
              <Image
                src={item.image}
                alt={item.title}
                width={451}
                height={458}
                priority={idx === 0}
                className="w-full h-auto max-w-xs sm:max-w-[451px]"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;
