"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContextProvider";
import { SALE_ITEMS, showToast } from "@/utils";
import { Icon } from "@iconify/react";
import Image, { StaticImageData } from "next/image";
import ProductQuickViewModal from "./ProductQuickViewModal"; // Import the new modal

interface CardProps {
  imageSource: StaticImageData | string;
  cardTitle: string;
  price: number | string;
  cardId: string;
  stock?: number;
}

const Card = ({ imageSource, cardTitle, price, cardId, stock = 10 }: CardProps) => {
  const { addToCart } = useCart();
  const [showQuickView, setShowQuickView] = useState(false); // New State

  // Find item details
  const item = SALE_ITEMS.find((i) => i.id === cardId);
  const oldPrice = item?.oldPrice;
  const currentPrice = typeof price === 'number' ? price : Number(price);

  // Calculate Discount
  let discountPercentage = 0;
  if (oldPrice && oldPrice > currentPrice) {
    discountPercentage = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  }

  // Handle "Quick Add" (The small cart icon)
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item) {
        addToCart({
            id: item.id,
            name: item.cardTitle,
            price: item.price,
            image: typeof item.displayPics[0].pic === 'string' ? item.displayPics[0].pic : (item.displayPics[0].pic as any).src,
            quantity: 1,
            size: "Regular"
        });
        showToast("success", "Added to Cart!");
    }
  };

  // Handle Main Click (Opens Modal)
  const handleViewDetails = () => {
    setShowQuickView(true);
  };

  return (
    <>
        <div 
          onClick={handleViewDetails}
          className="group relative bg-white w-full max-w-[295px] h-[420px] rounded-xl shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
        >
          {/* 1. Image Section */}
          <div className="relative h-[231px] w-full bg-[#F7F7F7] rounded-b-xl overflow-hidden">
            <Image
              src={imageSource}
              alt={cardTitle}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Discount Badge */}
            {discountPercentage > 0 && (
                <div className="absolute top-0 right-0 bg-[#C80000] text-white font-century font-bold text-sm px-3 py-1 rounded-bl-lg z-10">
                    -{discountPercentage}%
                </div>
            )}
          </div>

          {/* 2. Content Section */}
          <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
                <h3 className="font-century font-bold text-lg text-[#2E2E2E] truncate">
                    {cardTitle}
                </h3>

                {stock < 5 && (
                    <div className="flex items-center gap-1 mt-1">
                        <Icon icon="solar:danger-circle-bold" className="text-[#D98B06] w-4 h-4" />
                        <span className="text-xs text-[#D98B06] font-century">
                            {stock} items left
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                    {oldPrice && (
                        <span className="text-sm text-[#969696] line-through font-century">
                            ₦{oldPrice.toLocaleString()}
                        </span>
                    )}
                    <span className="text-xl font-bold text-[#C80000] font-century">
                        ₦{currentPrice.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* 3. Actions */}
            <div className="flex items-center justify-between mt-4">
                {/* Replaced 'View Details' button click to trigger modal */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowQuickView(true);
                    }}
                    className="border border-[#C80000] text-[#C80000] font-times rounded-full px-6 py-2 hover:bg-[#C80000] hover:text-white transition-colors text-lg"
                >
                    View Details
                </button>

                <button 
                    onClick={handleQuickAdd}
                    className="w-11 h-11 rounded-full bg-[#FDEDF3] border border-[#C80000] flex items-center justify-center text-[#C80000] hover:bg-[#C80000] hover:text-white transition-colors"
                >
                    <Icon icon="solar:cart-large-2-linear" className="w-6 h-6" />
                </button>
            </div>
          </div>
        </div>

        {/* Modal - Rendered conditionally */}
        {showQuickView && (
            <ProductQuickViewModal 
                cardId={cardId} 
                onClose={() => setShowQuickView(false)} 
            />
        )}
    </>
  );
};

export default Card;