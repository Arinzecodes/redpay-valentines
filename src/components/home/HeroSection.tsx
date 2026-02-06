"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  BANNER_ONE, 
  BANNER_TWO, 
  BANNER_THREE, 
  BANNER_FOUR, 
  BANNER_FIVE 
} from "@/images"; 

const banners = [BANNER_ONE, BANNER_TWO, BANNER_THREE, BANNER_FOUR, BANNER_FIVE];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-switch logic (Every 5 seconds)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 7000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="w-full bg-[#FAFAFA] relative">
      
      {/* 1. Define the Panning Animation 
         This animates the object-position from Left (0%) to Right (100%).
      */}
      <style jsx global>{`
        @keyframes pan-horizontal {
          0% {
            object-position: 0% 50%;
          }
          100% {
            object-position: 100% 50%;
          }
        }
        .animate-pan {
          animation: pan-horizontal 3s linear infinite alternate;
        }
      `}</style>

      {/* Main Banner Carousel */}
      {/* We kept the height tall (h-[300px] on mobile) so it looks good,
         but now the animation reveals the hidden sides.
      */}
      <div className="relative w-full h-[300px] md:h-[406px] flex items-center justify-center bg-redpay-cream overflow-hidden">
         
         {/* Images Stacked */}
         {banners.map((banner, index) => (
            <div 
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
                <Image 
                    src={banner} 
                    alt={`Valentine Banner ${index + 1}`} 
                    fill 
                    priority={index === 0} 
                    className={`object-cover ${
                        // Only apply the animation to the CURRENT slide so it resets for the next one
                        index === currentSlide ? "animate-pan" : ""
                    }`}
                />
            </div>
         ))}

         {/* Page Indicators */}
         <div className="absolute bottom-6 flex gap-2 z-20">
            {banners.map((_, index) => (
                <div 
                    key={index}
                    onClick={() => setCurrentSlide(index)} 
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === index 
                            ? "w-8 bg-white" 
                            : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                />
            ))}
         </div>
      </div>
    </div>
  );
};

export default HeroSection;