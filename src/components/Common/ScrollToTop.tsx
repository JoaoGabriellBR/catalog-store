"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Button from "@/components/Common/Button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          variant="primary"
          size="icon"
          className={`shadow-lg fixed bottom-8 right-8 z-999 ${
            isVisible ? "flex" : "hidden"
          }`}
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </Button>
      )}
    </>
  );
}
