import {
    FACE_CAP,
    HAND_FAN,
    KEY_HOLDER,
    ONE_SHIRT,
    IMG_ONE,
    IMG_TWO,
    IMG_THREE,
    IMG_FOUR,
    IMG_FIVE,
    IMG_SIX,
    IMG_SEVEN,
    IMG_EIGHT,
    PRODUCT_TWO,
    PRODUCT_THREE,
    PRODUCT_FOUR,
    PRODUCT_FIVE,
    SNEAKER_ONE,
    SNEAKER_TWO,
    SNEAKER_THREE,
    BANNER_ONE,
    BANNER_TWO,
    BANNER_THREE,
    BANNER_FOUR,
    BANNER_FIVE
} from "@/images"; 
import { toast, ToastContent, ToastOptions, Slide, Id } from "react-toastify";

// --- Toast Config ---
export const defaultToastOptions: ToastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Slide,
};

export const showToast = (
    type: "success" | "error" | "info" | "warning" | "default",
    content: ToastContent,
    options: Partial<ToastOptions> = {}
): Id => {
    const optionsToApply = { ...defaultToastOptions, ...options };
    switch (type) {
        case "success": return toast.success(content, optionsToApply);
        case "error": return toast.error(content, optionsToApply);
        case "info": return toast.info(content, optionsToApply);
        case "warning": return toast.warn(content, optionsToApply);
        default: return toast(content, optionsToApply);
    }
};

export const productSizes = [
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
];

// --- SALE ITEMS with Old Prices ---
export const SALE_ITEMS = [
    // --- Gift Fast ---
    {
        id: "gift-hand-fan",
        cardTitle: "RedTech Hand Fan",
        price: 5000,
        oldPrice: 6500, // Added old price to trigger discount tag
        displayPics: [{ pic: HAND_FAN }],
        description: "Beat the heat with this portable and stylish hand fan.",
        category: "gift-fast"
    },
    {
        id: "gift-bottle",
        cardTitle: "Hydration Bottle",
        price: 8500,
        oldPrice: 10000,
        displayPics: [{ pic: PRODUCT_THREE }],
        description: "Premium insulated bottle to keep your drinks cold for 24hrs.",
        category: "gift-fast"
    },
    {
        id: "gift-keyholder",
        cardTitle: "Leather Key Holder",
        price: 3500,
        oldPrice: 4000,
        displayPics: [{ pic: KEY_HOLDER }],
        description: "Genuine leather key holder with RedTech branding.",
        category: "gift-fast"
    },
    {
        id: "gift-mug",
        cardTitle: "Valentine Mug",
        price: 4000,
        // No oldPrice here, so no discount tag will show
        displayPics: [{ pic: PRODUCT_TWO }],
        description: "Perfect for coffee lovers. Ceramic finish with a loving touch.",
        category: "gift-fast"
    },
    {
        id: "gift-notebook",
        cardTitle: "Executive Notebook",
        price: 6000,
        oldPrice: 7500,
        displayPics: [{ pic: PRODUCT_FOUR }],
        description: "Hardcover notebook for your daily journaling and ideas.",
        category: "gift-fast"
    },
    {
        id: "gift-perfume",
        cardTitle: "Mini Scent Box",
        price: 15000,
        oldPrice: 18000,
        displayPics: [{ pic: PRODUCT_FIVE }],
        description: "A collection of travel-sized scents for him and her.",
        category: "gift-fast"
    },

    // --- Look Good ---
    {
        id: "look-polo",
        cardTitle: "Classic Red Polo",
        price: 12000,
        oldPrice: 15000,
        displayPics: [{ pic: ONE_SHIRT }],
        description: "Breathable fabric with a perfect fit. The classic RedTech look.",
        category: "look-good"
    },
    {
        id: "look-facecap",
        cardTitle: "Signature Cap",
        price: 4500,
        oldPrice: 5000,
        displayPics: [{ pic: FACE_CAP }],
        description: "Adjustable snapback cap with embroidered details.",
        category: "look-good"
    },
    {
        id: "look-beanie",
        cardTitle: "Cozy Beanie",
        price: 4000,
        displayPics: [{ pic: IMG_ONE }],
        description: "Warm knit beanie for those chilly evening dates.",
        category: "look-good"
    },
    {
        id: "look-sneaker-1",
        cardTitle: "Air Max DN SE",
        price: 85000,
        oldPrice: 95000,
        displayPics: [{ pic: SNEAKER_ONE }],
        description: "Step out in style with these premium limited edition sneakers.",
        category: "look-good"
    },
    {
        id: "look-sneaker-2",
        cardTitle: "Nike Dunk Hi Retro",
        price: 65000,
        oldPrice: 70000,
        displayPics: [{ pic: SNEAKER_TWO }],
        description: "Retro vibes meet modern comfort. High top design.",
        category: "look-good"
    },
    {
        id: "look-sneaker-3",
        cardTitle: "Air Jordan Low",
        price: 75000,
        oldPrice: 80000,
        displayPics: [{ pic: SNEAKER_THREE }],
        description: "Low top comfort for everyday street wear.",
        category: "look-good"
    },
    {
        id: "look-dress",
        cardTitle: "Evening Gown",
        price: 45000,
        oldPrice: 60000,
        displayPics: [{ pic: IMG_TWO }],
        description: "Elegant red evening gown for a special Valentine's dinner.",
        category: "look-good"
    },

    // --- Eat Together ---
    {
        id: "eat-dinner-2",
        cardTitle: "Dinner for Two",
        price: 50000,
        oldPrice: 55000,
        displayPics: [{ pic: IMG_THREE }],
        description: "Voucher for a 3-course meal at RedTech Lounge.",
        category: "eat-together"
    },
    {
        id: "eat-cupcakes",
        cardTitle: "Love Cupcakes",
        price: 12000,
        displayPics: [{ pic: IMG_FOUR }],
        description: "Box of 6 velvet cupcakes with buttercream frosting.",
        category: "eat-together"
    },
    {
        id: "eat-wine",
        cardTitle: "Sparkling Wine",
        price: 25000,
        oldPrice: 30000,
        displayPics: [{ pic: IMG_FIVE }],
        description: "Premium sparkling wine to toast to your love.",
        category: "eat-together"
    },
    {
        id: "eat-chocolate",
        cardTitle: "Swiss Chocolates",
        price: 18000,
        oldPrice: 20000,
        displayPics: [{ pic: IMG_SIX }],
        description: "Assorted dark and milk chocolates in a heart box.",
        category: "eat-together"
    },
    {
        id: "eat-picnic",
        cardTitle: "Picnic Basket",
        price: 35000,
        oldPrice: 40000,
        displayPics: [{ pic: IMG_SEVEN }],
        description: "Curated snacks and drinks for a perfect outdoor date.",
        category: "eat-together"
    },

    // --- Experiences ---
    {
        id: "exp-spa",
        cardTitle: "Couples Spa Day",
        price: 60000,
        oldPrice: 75000,
        displayPics: [{ pic: IMG_EIGHT }],
        description: "Full body massage and facial for two. Relax and unwind.",
        category: "experiences"
    },
    {
        id: "exp-movie",
        cardTitle: "VIP Cinema Tickets",
        price: 15000,
        displayPics: [{ pic: IMG_THREE }], 
        description: "VIP seats + Popcorn + Drinks for the latest blockbuster.",
        category: "experiences"
    },
    {
        id: "exp-pottery",
        cardTitle: "Pottery Workshop",
        price: 25000,
        oldPrice: 30000,
        displayPics: [{ pic: IMG_FOUR }], 
        description: "Hands-on pottery class to create something together.",
        category: "experiences"
    },
    {
        id: "exp-paint",
        cardTitle: "Sip & Paint",
        price: 20000,
        oldPrice: 22000,
        displayPics: [{ pic: IMG_FIVE }], 
        description: "Unleash your creativity with wine and art supplies included.",
        category: "experiences"
    },
];