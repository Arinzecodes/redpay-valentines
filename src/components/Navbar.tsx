"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContextProvider";
import { RedpayImage } from "@/images";
import { SALE_ITEMS } from "@/utils"; 

// IMPORT THE MODAL HERE
import ProductQuickViewModal from "./ProductQuickViewModal"; 

const Navbar = () => {
    const router = useRouter();
    const { cartItems } = useCart();
    
    // --- STATE (FIXED WITH TYPES) ---
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    // FIX: Restored <any[]> to prevent 'never' errors
    const [searchResults, setSearchResults] = useState<any[]>([]); 
    
    // FIX: Restored <string | null>
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    // --- NAVIGATION HANDLERS ---
    const goHome = () => router.push("/");
    const goToCart = () => router.push("/cart");

    // --- SCROLL TO CATEGORIES ---
    const scrollToCategories = () => {
        if (typeof window !== "undefined") {
            if (window.location.pathname !== "/") {
                router.push("/#categories-section");
            } else {
                const element = document.getElementById("categories-section");
                if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }
        }
    };

    // --- SEARCH LOGIC ---
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => {
                if(inputRef.current) inputRef.current.focus();
            }, 100);
        } else {
            setSearchQuery("");
            setSearchResults([]);
        }
    };

    // FIX: Added ': any' to event
    const handleSearch = (e: any) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 1 && Array.isArray(SALE_ITEMS)) {
            // FIX: Added ': any' to item
            const results = SALE_ITEMS.filter((item: any) => 
                item.cardTitle.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleProductClick = (id: string) => {
        setSearchQuery("");
        setSearchResults([]);
        setIsSearchOpen(false);
        setSelectedProductId(id);
    };

    const handleCloseModal = () => {
        setSelectedProductId(null);
    };

    useEffect(() => {
        // FIX: Added ': any' to event
        const handleClickOutside = (event: any) => {
            if (inputRef.current && !inputRef.current.contains(event.target) && !event.target.closest('.search-container')) {
                if (searchQuery === "") {
                    setIsSearchOpen(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [searchQuery]);

    return (
        <>
            {/* 1. ANIMATION STYLES */}
            <style jsx global>{`
                @keyframes slide-in-stop {
                    0% {
                        transform: translateX(10%);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-stop {
                    animation: slide-in-stop 5s ease-out 1 forwards;
                }
            `}</style>
            
            <header className="w-full z-50 sticky top-0">
                {/* 2. Top Marquee Bar */}
                <div className="w-full h-10 bg-[#F4E1C6] flex items-center justify-center overflow-hidden relative">
                    <div className="flex gap-8 items-center animate-slide-stop whitespace-nowrap min-w-full justify-center">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-8">
                                <span className="text-redpay-red font-century text-sm uppercase tracking-wide">
                                    RedPay Valentine’s Special
                                </span>
                                <span className="text-redpay-red">•</span>
                                <span className="text-redpay-red font-century text-sm">
                                    Up to 40% discount off on all orders
                                </span>
                                <span className="text-redpay-red">•</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Main Navbar */}
                <nav className="w-full bg-redpay-cream/80 backdrop-blur-md border-b border-redpay-red/10">
                    {/* Layout Fix: xl:px-0 pushes logo to the left */}
                    <div className="max-w-[1240px] mx-auto px-4 xl:px-0 h-[80px] flex items-center justify-between relative">
                        
                        {/* Left: Logo Area */}
                        <div 
                            className="flex flex-col items-center justify-center cursor-pointer group z-10"
                            onClick={goHome}
                        >
                            {RedpayImage ? (
                                <Image
                                    alt="RedPay Store"
                                    src={RedpayImage}
                                    height={40}
                                    width={120}
                                    className="object-contain"
                                />
                            ) : (
                                <div className="text-center">
                                    <div className="bg-redpay-red text-white text-xs px-2 py-1 rounded-t-sm">REDPAY</div>
                                    <div className="text-redpay-red font-century text-lg tracking-widest">STORE</div>
                                </div>
                            )}
                        </div>

                        {/* Center: Links (Desktop Only) */}
                        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                            <button onClick={goHome} className="border-b-2 border-redpay-red pb-1 text-redpay-red font-century">
                                Shop
                            </button>
                            <button onClick={scrollToCategories} className="text-redpay-grey hover:text-redpay-red transition-colors font-century">
                                Categories
                            </button>
                            <a 
                                href="https://redpay-terms-conditions.vercel.app/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-redpay-grey hover:text-redpay-red transition-colors font-century"
                            >
                                Terms & Conditions
                            </a>
                        </div>

                        {/* Right: Icons & Search */}
                        <div className="flex items-center gap-6 z-10">
                            
                            {/* Search Container */}
                            <div className="search-container flex items-center relative">
                                {/* Expandable Input Field */}
                                <div 
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        isSearchOpen ? "w-[180px] md:w-[240px] opacity-100 mr-2" : "w-0 opacity-0"
                                    }`}
                                >
                                    <input 
                                        ref={inputRef}
                                        type="text" 
                                        placeholder="Search products..." 
                                        className="w-full bg-transparent border-b border-redpay-red text-sm font-century text-redpay-dark outline-none placeholder:text-redpay-red/40 pb-1"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                </div>

                                {/* Search Icon */}
                                <Icon 
                                    icon={isSearchOpen ? "solar:close-circle-linear" : "solar:magnifer-linear"}
                                    className={`w-6 h-6 cursor-pointer transition-colors ${
                                        isSearchOpen ? "text-redpay-red" : "text-redpay-dark hover:text-redpay-red"
                                    }`}
                                    onClick={toggleSearch}
                                />

                                {/* Dropdown Results */}
                                {isSearchOpen && searchResults.length > 0 && (
                                    <div className="absolute top-full right-0 mt-4 w-[300px] bg-white rounded-xl shadow-lg border border-redpay-red/10 overflow-hidden max-h-[300px] overflow-y-auto">
                                        {/* FIX: Added ': any' to item */}
                                        {searchResults.map((item: any) => (
                                            <div 
                                                key={item.id}
                                                onClick={() => handleProductClick(item.id)}
                                                className="flex items-center gap-3 p-3 hover:bg-[#FAF5F0] cursor-pointer border-b border-gray-100 last:border-none"
                                            >
                                                {/* Image */}
                                                <div className="relative w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                                    {item.displayPics && item.displayPics[0] && (
                                                        <Image 
                                                            src={item.displayPics[0].pic} 
                                                            alt={item.cardTitle} 
                                                            fill 
                                                            className="object-cover" 
                                                        />
                                                    )}
                                                </div>
                                                {/* Text */}
                                                <div className="flex-grow min-w-0">
                                                    <p className="text-sm font-bold text-redpay-dark truncate font-century">
                                                        {item.cardTitle}
                                                    </p>
                                                    <p className="text-xs text-redpay-red">
                                                        ₦{item.price.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Cart Icon */}
                            <div className="relative group cursor-pointer" onClick={goToCart}>
                                <Icon 
                                    icon="solar:cart-large-2-linear" 
                                    className="w-7 h-7 text-redpay-dark group-hover:text-redpay-red transition-colors"
                                />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-redpay-red text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                        {cartItems.length}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* --- MODAL RENDERING --- */}
            {selectedProductId && (
                <ProductQuickViewModal 
                    cardId={selectedProductId} 
                    onClose={handleCloseModal} 
                />
            )}
        </>
    );
};

export default Navbar;