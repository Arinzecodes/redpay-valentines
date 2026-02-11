"use client";

import { useRouter } from "next/navigation";
import { productSizes, SALE_ITEMS, showToast } from "@/utils";
import { use, useState } from "react";
import { Icon } from "@iconify/react";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import { useCart } from "@/context/CartContextProvider";

interface ProductDetailsParams {
    params: Promise<{
        id: string;
    }>;
}

export default function ProductDetails({ params }: ProductDetailsParams) {
    const router = useRouter();
    const [mainPicIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | undefined>();
    const { addToCart } = useCart();

    const { id } = use(params);
    const item = SALE_ITEMS.find((item) => item.id === id);

    if (!item) {
        return (
            <div className="h-screen flex items-center justify-center text-redpay-red font-century text-xl">
                Item not found!
            </div>
        );
    }

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    const proceedToCart = () => {
        if (selectedSize) {
            addToCart({
                id: item.id,
                name: item.cardTitle,
                size: selectedSize,
                price: item.price,
                image: item.displayPics[0].pic,
                quantity: 1,
            });

            showToast("success", `${item.cardTitle} added to cart`);
            setTimeout(() => {
                router.push("/cart");
            }, 1000);
        }
    };

    return (
        <main className="relative min-h-screen bg-redpay-cream pt-24 pb-10 px-4 lg:px-20">
            {/* Back Icon */}
            <button 
                onClick={() => router.back()} 
                className="absolute top-24 left-4 lg:left-20 z-10 p-2 bg-white/50 rounded-full hover:bg-white transition-all"
            >
                <Icon icon="mdi:arrow-left" className="h-8 w-8 text-redpay-dark" />
            </button>

            <div className="flex flex-col lg:flex-row gap-12 items-start mt-8">
                {/* Left: Image */}
                <section className="w-full lg:w-1/2 flex justify-center bg-white rounded-3xl p-8 shadow-card">
                    <div className="relative w-full aspect-square max-w-[500px]">
                        <Image
                            src={item.displayPics[mainPicIndex].pic}
                            alt={item.cardTitle}
                            fill
                            className="object-contain hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </section>

                {/* Right: Details */}
                <section className="w-full lg:w-1/2 flex flex-col gap-6">
                    <div>
                        <h1 className="text-4xl font-century font-bold text-redpay-dark mb-2">
                            {item.cardTitle}
                        </h1>
                        <div className="flex items-center gap-1 text-3xl font-bold text-redpay-red">
                            <Icon icon="tabler:currency-naira" />
                            <span>{item.price.toLocaleString()}</span>
                        </div>
                    </div>

                    <p className="text-redpay-grey text-lg leading-relaxed font-century">
                        {item.description}
                    </p>

                    <div className="h-px w-full bg-redpay-red/20 my-2" />

                    {/* Size Selector */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-redpay-dark font-bold font-century">Select Size</h3>
                            <span className="text-sm text-redpay-blue font-century cursor-pointer hover:underline">Size Guide</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {productSizes.map((sizeObj) => (
                                <button
                                    key={sizeObj.size}
                                    onClick={() => handleSizeSelect(sizeObj.size)}
                                    className={`w-14 h-14 rounded-full border-2 font-century font-bold transition-all duration-200
                                        ${selectedSize === sizeObj.size 
                                            ? "bg-redpay-red border-redpay-red text-white" 
                                            : "border-gray-300 text-redpay-grey hover:border-redpay-red"
                                        }`}
                                >
                                    {sizeObj.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6">
                        <CustomButton
                            buttonText={selectedSize ? "Add to Cart" : "Select a Size"}
                            variant="primary"
                            buttonSize="btn-lg"
                            className="w-full uppercase tracking-widest text-lg"
                            onClick={proceedToCart}
                            disabled={!selectedSize}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}