"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { showToast } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { addCart } from "@/actions/addCart";

interface ProductQuickViewProps {
    itemData: any; // Now receives the object directly
    onClose: () => void;
}

const ProductQuickViewModal = ({ itemData, onClose }: ProductQuickViewProps) => {
    const [quantity, setQuantity] = useState(1);

    const { mutate: AddToCartMutation } = useMutation({
        mutationFn: addCart,
        onSuccess: (data) => {
            showToast(data.status ? "success" : "error", data.status ? "Added to Cart!" : "Failed to add to cart");
            onClose();
        },
        onError: (error: Error) => {
            showToast("error", error.message);
            onClose();
        }
    });

    if (!itemData) return null;

    // Calculate prices
    const currentPrice = itemData.price;
    const oldPrice = itemData.oldPrice;
    const discount = oldPrice ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;

    const handleAddToCart = () => {
        AddToCartMutation({
            productId: itemData.id,
            quantity: quantity
        });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-zoom flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]">
                {/* Close Button */}
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
                            src={itemData.displayPics[0].pic}
                            alt={itemData.cardTitle}
                            fill
                            className="object-contain"
                        />
                    </div>
                    {discount > 0 && (
                        <div className="absolute top-0 left-0 bg-redpay-red text-white font-century font-bold text-lg px-4 py-2 rounded-br-2xl z-10">
                            -{discount}%
                        </div>
                    )}
                </div>

                {/* Right: Product Details */}
                <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-3xl font-century font-bold text-redpay-dark mb-2">
                            {itemData.cardTitle}
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

                    <div className="mb-8 flex-grow">
                        <h3 className="text-sm font-bold text-redpay-dark uppercase tracking-wider mb-2">Description</h3>
                        <p className="text-redpay-grey font-century leading-relaxed">
                            {itemData.description || "Experience the best quality with RedPay Store."}
                        </p>
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="flex gap-4">
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