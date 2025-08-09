"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef } from "react";
import "swiper/css/navigation";
import "swiper/css";
import Image from "next/image";

import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/store";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const PreviewSliderModal = () => {
  const { closePreviewModal, isModalPreviewOpen } = usePreviewSlider();

  const data = useAppSelector((state) => state.productDetailsReducer.value);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div
      className={`preview-slider w-full h-screen  z-999999 inset-0 flex justify-center items-center bg-[#000000F2] bg-opacity-70 ${
        isModalPreviewOpen ? "fixed" : "hidden"
      }`}
    >
      <button
        onClick={() => closePreviewModal()}
        aria-label="button for close modal"
        className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 text-white hover:text-meta-5 z-10"
      >
        <X size={36} />
      </button>

      <div>
        <button
          className="rotate-180 absolute left-100 p-5 cursor-pointer z-10 "
          onClick={handlePrev}
        >
          <ChevronLeft color="white" size={36} />
        </button>

        <button
          className="absolute right-100 p-5 cursor-pointer z-10"
          onClick={handleNext}
        >
          <ChevronRight color="white" size={36} />
        </button>
      </div>

      <Swiper ref={sliderRef} slidesPerView={1} spaceBetween={20}>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <Image
              src={"/images/products/product-2-bg-1.png"}
              alt={"product image"}
              width={450}
              height={450}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PreviewSliderModal;
