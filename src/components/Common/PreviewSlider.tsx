"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef } from "react";
import "swiper/css/navigation";
import "swiper/css";
import Image from "next/image";

import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/store";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Button from "@/components/Common/Button";

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
      <Button
        onClick={() => closePreviewModal()}
        ariaLabel="button for close modal"
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0 sm:top-6 sm:right-6 text-white hover:text-meta-5 z-10"
      >
        <X size={36} />
      </Button>

      <div>
        <Button
          className="rotate-180 absolute left-100 p-5 cursor-pointer z-10 "
          onClick={handlePrev}
          variant="ghost"
        >
          <ChevronLeft color="white" size={36} />
        </Button>

        <Button
          className="absolute right-100 p-5 cursor-pointer z-10"
          onClick={handleNext}
          variant="ghost"
        >
          <ChevronRight color="white" size={36} />
        </Button>
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
