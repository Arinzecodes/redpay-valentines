import { toast, ToastContent, ToastOptions, Slide, Id } from "react-toastify";

// --- Toast Config (KEEP THIS) ---
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

// --- NEW: Helper to Map Backend Data to UI (ADD THIS) ---
export const normalizeCategory = (categoryName: string | undefined | null) => {
    if (!categoryName) return "uncategorized";
    return categoryName.trim().toLowerCase().replace(/\s+/g, "-");
};

export const mapProductToUI = (apiItem: any) => {
    return {
        id: apiItem.id,
        cardTitle: apiItem.name,
        price: apiItem.price,
        oldPrice: null, // Backend doesn't have oldPrice yet
        displayPics: (apiItem.images && apiItem.images.length > 0)
            ? apiItem.images.map((img: any) => ({ pic: img.url }))
            : [{ pic: "/placeholder.png" }], 
        description: apiItem.description,
        category: normalizeCategory(apiItem.category?.name),
        stock: apiItem.quantity,
    };
};