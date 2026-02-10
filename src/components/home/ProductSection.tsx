"use client";

import React, { useState } from "react";
import Card from "@/components/Card";
// Remove: import { SALE_ITEMS } from "@/utils"; 

interface ProductItemUI {
    id: string;
    cardTitle: string;
    price: number;
    oldPrice?: number | null;
    displayPics: { pic: string | any }[];
    category: string;
    stock: number;
}

interface ProductSectionProps {
    title: string;
    subtitle: string;
    category: string;
    products: ProductItemUI[]; // NEW PROP: Pass data from parent
}

const ProductSection = ({ title, subtitle, category, products }: ProductSectionProps) => {
    const [showAll, setShowAll] = useState(false);

    // 1. Get items for this category (Using the passed props)
    const categoryItems = products.filter((item) => item.category === category);

    // 2. Logic updated: Duplication removed.
    // We now use categoryItems directly instead of creating 'paddedItems'.

    // 3. Determine how many to show
    const itemsToRender = showAll ? categoryItems : categoryItems.slice(0, 4);

    return (
        <section id={category} className="w-full max-w-[1240px] mx-auto px-4 md:px-8 py-10">
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
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 place-items-center">
                {itemsToRender.length > 0 ? (
                    itemsToRender.map((item, index) => (
                        <Card
                            // Key format preserved
                            key={`${item.id}-${index}`}
                            cardId={item.id}
                            cardTitle={item.cardTitle}
                            price={item.price}
                            imageSource={item.displayPics[0].pic}
                            stock={item.stock}
                            // Pass the full item object to Card so it can pass it to QuickView
                            itemData={item}
                        />
                    ))
                ) : (
                    <div className="col-span-2 lg:col-span-4 py-10 text-center text-redpay-grey">
                        Coming soon to {title}...
                    </div>
                )}
            </div>

            {/* Toggle Button - Only show if we actually have items */}
            {categoryItems.length > 0 && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-redpay-red text-white px-8 py-3 rounded-full font-bold font-century hover:bg-red-800 transition-colors shadow-md min-w-[160px]"
                    >
                        {showAll ? "See Less" : "See All Items"}
                    </button>
                </div>
            )}
        </section>
    );
};

export default ProductSection;