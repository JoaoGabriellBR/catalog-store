import React from "react";
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const SingleItem = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="shadow-testimonial bg-white rounded-[10px] py-7.5 px-4 sm:px-8.5 m-1">
      <div className="flex items-center gap-1 mb-5 text-yellow-400">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} className="w-4 h-4" fill="currentColor" stroke="none" />
        ))}
      </div>

      <p className="text-dark mb-6">{testimonial.review}</p>

      <Link href="#" className="flex items-center gap-4">
        <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
          <Image
            src={testimonial.authorImg}
            alt="author"
            className="w-12.5 h-12.5 rounded-full overflow-hidden"
            width={50}
            height={50}
          />
        </div>

        <div>
          <h3 className="font-medium text-dark">{testimonial.authorName}</h3>
          <p className="text-custom-sm">{testimonial.authorRole}</p>
        </div>
      </Link>
    </div>
  );
};

export default SingleItem;
