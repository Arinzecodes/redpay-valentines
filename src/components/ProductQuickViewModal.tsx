"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContextProvider";
import { SALE_ITEMS, showToast } from "@/utils";

interface ProductQuickViewProps {
  cardId: string;
  onClose: () => void;
}

const ProductQuickViewModal = ({ cardId, onClose }: ProductQuickViewProps) => {
  const { addToCart } = useCart();
  const item = SALE_ITEMS.find((i) => i.id === cardId);
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  // Calculate prices
  const currentPrice = item.price;
  const oldPrice = item.oldPrice;
  const discount = oldPrice ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.cardTitle,
      price: item.price,
      image: typeof item.displayPics[0].pic === 'string' ? item.displayPics[0].pic : (item.displayPics[0].pic as any).src,
      quantity: quantity,
      size: "Regular"
    });
    showToast("success", "Added to Cart!");
    onClose(); // Optional: Close modal after adding
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-zoom flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]">
        
        {/* Close Button (Absolute Top Right) */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white hover:text-redpay-red transition-all shadow-sm"
        >
            <Icon icon="mdi:close" className="w-6 h-6 text-redpay-dark" />
        </button>

        {/* Left: Large Image */}
        <div className="w-full md:w-1/2 bg-[#F7F7F7] flex items-center justify-center p-8 relative">
            <div className="relative w-full h-64 md:h-full">
                <Image
                    src={item.displayPics[0].pic}
                    alt={item.cardTitle}
                    fill
                    className="object-contain"
                />
            </div>
            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-0 left-0 bg-redpay-red text-white font-century font-bold text-lg px-4 py-2 rounded-br-2xl z-10">
                    -{discount}%
                </div>
            )}
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
            
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-3xl font-century font-bold text-redpay-dark mb-2">
                    {item.cardTitle}
                </h2>
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-redpay-red font-century">
                        ₦{currentPrice.toLocaleString()}
                    </span>
                    {oldPrice && (
                        <span className="text-lg text-gray-400 line-through font-century">
                            ₦{oldPrice.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="mb-8 flex-grow">
                <h3 className="text-sm font-bold text-redpay-dark uppercase tracking-wider mb-2">Description</h3>
                <p className="text-redpay-grey font-century leading-relaxed">
                    {item.description || "Experience the best quality with RedPay Store. This item is curated for the season of love."}
                </p>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-4">
                
                {/* Quantity & Add to Cart Row */}
                <div className="flex gap-4">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-gray-300 rounded-full h-12 px-4 gap-4">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="text-redpay-dark hover:text-redpay-red text-xl"
                        >-</button>
                        <span className="font-bold text-redpay-dark w-4 text-center">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="text-redpay-dark hover:text-redpay-red text-xl"
                        >+</button>
                    </div>

                    {/* Add Button */}
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-redpay-red text-white h-12 rounded-full font-bold font-century hover:bg-red-800 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <Icon icon="solar:cart-large-2-bold" />
                        Add to Cart
                    </button>
                </div>
                
                <div className="text-center">
                    <span className="text-xs text-redpay-grey">
                        Secure checkout powered by <span className="font-bold text-redpay-dark">RedPay</span>
                    </span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;