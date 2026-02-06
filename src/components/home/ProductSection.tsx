"use client";

import React, { useState } from "react";
import Card from "@/components/Card";
import { SALE_ITEMS } from "@/utils"; 

interface ProductSectionProps {
    title: string;
    subtitle: string;
    category: string; 
}

const ProductSection = ({ title, subtitle, category }: ProductSectionProps) => {
    const [showAll, setShowAll] = useState(false);

    // 1. Get items for this category
    const categoryItems = SALE_ITEMS.filter((item) => item.category === category);

    // 2. Ensure we have exactly 8 items by repeating the list if necessary (as requested)
    // We combine the list with itself to ensure we have enough to fill 8 slots
    const paddedItems = [...categoryItems, ...categoryItems].slice(0, 8);

    // 3. Determine how many to show based on state (4 or 8)
    const itemsToRender = showAll ? paddedItems : paddedItems.slice(0, 4);

    return (
        <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8">
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-century font-bold text-redpay-red mb-2">
                    {title}
                </h2>
                <p className="text-redpay-grey text-lg font-century">
                    {subtitle}
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
                {itemsToRender.length > 0 ? (
                    itemsToRender.map((item, index) => (
                        <Card
                            // Using index in key because we are duplicating items, 
                            // so IDs might be repeated.
                            key={`${item.id}-${index}`} 
                            cardId={item.id}
                            cardTitle={item.cardTitle}
                            price={item.price}
                            imageSource={item.displayPics[0].pic} 
                            stock={Math.floor(Math.random() * 10)} 
                        />
                    ))
                ) : (
                    <div className="col-span-4 py-10 text-center text-redpay-grey">
                        No items found in this category yet.
                    </div>
                )}
            </div>
            
            {/* Toggle Button */}
            <div className="flex justify-center mt-12">
                <button 
                    onClick={() => setShowAll(!showAll)}
                    className="bg-redpay-red text-white px-8 py-3 rounded-full font-bold font-century hover:bg-red-800 transition-colors shadow-md min-w-[160px]"
                >
                    {showAll ? "See Less" : "See All Items"}
                </button>
            </div>
        </section>
    );
};

export default ProductSection;