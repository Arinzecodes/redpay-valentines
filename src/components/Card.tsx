"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContextProvider";
import { SALE_ITEMS, showToast } from "@/utils";
import { Icon } from "@iconify/react";
import Image, { StaticImageData } from "next/image";
import ProductQuickViewModal from "./ProductQuickViewModal";

interface CardProps {
  imageSource: StaticImageData | string;
  cardTitle: string;
  price: number | string;
  cardId: string;
  stock?: number;
}

const Card = ({ imageSource, cardTitle, price, cardId, stock = 10 }: CardProps) => {
  const { addToCart } = useCart();
  const [showQuickView, setShowQuickView] = useState(false);

  // Find item details
  const item = SALE_ITEMS.find((i) => i.id === cardId);
  const oldPrice = item?.oldPrice;
  const currentPrice = typeof price === 'number' ? price : Number(price);

  // Calculate Discount
  let discountPercentage = 0;
  if (oldPrice && oldPrice > currentPrice) {
    discountPercentage = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  }

  // Handle "Quick Add"
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item) {
        addToCart({
            id: item.id,
            name: item.cardTitle,
            price: item.price,
            image: typeof item.displayPics[0].pic === 'string' 
                ? item.displayPics[0].pic 
                : (item.displayPics[0].pic as StaticImageData).src,
            quantity: 1,
            size: "Regular"
        });
        showToast("success", "Added to Cart!");
    }
  };

  const handleViewDetails = () => {
    setShowQuickView(true);
  };

  return (
    <>
        {/* FIX: Made height auto on mobile, fixed on desktop. Width full on mobile, fixed max on desktop. */}
        <div className="group relative bg-white w-full md:max-w-[295px] h-auto md:h-[420px] rounded-xl shadow-card hover:shadow-xl transition-all duration-300 flex flex-col">
          
          {/* 1. Image Section */}
          <div 
            onClick={handleViewDetails}
            // FIX: Reduced height on mobile (160px), kept 231px on desktop
            className="relative h-[160px] md:h-[231px] w-full bg-[#F7F7F7] rounded-b-xl overflow-hidden cursor-pointer"
          >
            <Image
              src={imageSource}
              alt={cardTitle}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Discount Badge */}
            {discountPercentage > 0 && (
                <div className="absolute top-0 right-0 bg-[#C80000] text-white font-century font-bold text-[10px] md:text-sm px-2 md:px-3 py-1 rounded-bl-lg z-10">
                    -{discountPercentage}%
                </div>
            )}
          </div>

          {/* 2. Content Section */}
          <div className="p-3 md:p-4 flex flex-col justify-between flex-grow gap-2 md:gap-0">
            
            {/* Text Content */}
            <div onClick={handleViewDetails} className="cursor-pointer">
                {/* FIX: Smaller font on mobile */}
                <h3 className="font-century font-bold text-sm md:text-lg text-[#2E2E2E] truncate">
                    {cardTitle}
                </h3>

                {stock < 5 && (
                    <div className="flex items-center gap-1 mt-1">
                        <Icon icon="solar:danger-circle-bold" className="text-[#D98B06] w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-[10px] md:text-xs text-[#D98B06] font-century">
                            {stock} items left
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-2 mt-1 md:mt-2">
                    {oldPrice && (
                        <span className="text-xs md:text-sm text-[#969696] line-through font-century">
                            ₦{oldPrice.toLocaleString()}
                        </span>
                    )}
                    {/* FIX: Smaller price font on mobile */}
                    <span className="text-base md:text-xl font-bold text-[#C80000] font-century">
                        ₦{currentPrice.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* 3. Actions */}
            <div className="flex items-center justify-between mt-2 md:mt-4 gap-2">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowQuickView(true);
                    }}
                    // FIX: Smaller button padding and text on mobile
                    className="flex-1 border border-[#C80000] text-[#C80000] font-times rounded-full px-2 py-1.5 md:px-6 md:py-2 hover:bg-[#C80000] hover:text-white transition-colors text-xs md:text-lg whitespace-nowrap"
                >
                    View Details
                </button>

                <button 
                    onClick={handleQuickAdd}
                    // FIX: Smaller circle button on mobile
                    className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-[#FDEDF3] border border-[#C80000] flex items-center justify-center text-[#C80000] hover:bg-[#C80000] hover:text-white transition-colors shrink-0"
                >
                    <Icon icon="solar:cart-large-2-linear" className="w-4 h-4 md:w-6 md:h-6" />
                </button>
            </div>
          </div>
        </div>

        {/* Modal */}
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