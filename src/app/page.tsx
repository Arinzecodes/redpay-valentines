"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ProductSection from "@/components/home/ProductSection";
import CategoryPills from "@/components/home/CategoryPills";

export default function Home() {

  return (
    <main className="w-full min-h-screen flex flex-col pb-24 bg-redpay-cream overflow-x-hidden">

      {/* 1. Hero Section (Banner Carousel) */}
      <section className="relative w-full">
        <HeroSection />
      </section>

      {/* 2. Category Options (Pills) 
          - Changed from negative margin to positive margin (mt-12) 
          - This pushes it down away from the banner.
      */}
      <div
        id="categories-section"
        className="flex flex-col items-center z-30 relative px-4 w-full mt-12 mb-12">
        <CategoryPills />
      </div>

      {/* 3. Product Sections 
          - Added 'pt-16' to the container to push the first category down further 
          - Increased gap between sections to 'gap-32' to match the spacious Figma layout
      */}
      <div className="flex flex-col gap-32 pt-16">



        {/* ID: gift-fast */}
        <div id="gift-fast" className="scroll-mt-32">
          <ProductSection
            title="Gift Fast"
            subtitle="Flowers, cakes, perfumes, beauty and lifestyle gifts - ready when you are."
            category="gift-fast"
          />
        </div>


        {/* ID: eat-together */}
        <div id="eat-together" className="scroll-mt-32">
          <ProductSection
            title="Eat Together"
            subtitle="Dining deals, cafés, and lounges perfect for Valentine moments."
            category="eat-together"
          />
        </div>

        {/* ID: look-good */}
        <div id="look-good" className="scroll-mt-32">
          <ProductSection
            title="Look Good"
            subtitle="Hair, beauty, skincare, and grooming essentials."
            category="look-good"
          />
        </div>

        {/* ID: experiences */}
        <div id="experiences" className="scroll-mt-32">
          <ProductSection
            title="Experiences"
            subtitle="Vouchers and experiences that turn moments into memories."
            category="experiences"
          />
        </div>
      </div>
    </main>
  );
}