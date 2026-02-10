import { StaticImageData } from "next/image";

// Helper to normalize category strings (e.g., "Gift Fast" -> "gift-fast")
export const normalizeCategory = (categoryName: string | undefined | null) => {
  if (!categoryName) return "uncategorized";
  return categoryName.toLowerCase().replace(/\s+/g, "-");
};

// Map API Data to UI Data
export const mapProductToUI = (apiItem: any) => {
  return {
    id: apiItem.id,
    cardTitle: apiItem.name,
    price: apiItem.price,
    // The API doesn't provide oldPrice, so we assume null or 0 (no discount badge)
    oldPrice: null, 
    // Map the API image to your displayPics structure
    displayPics: apiItem.images && apiItem.images.length > 0 
      ? apiItem.images.map((img: any) => ({ pic: img.url }))
      : [{ pic: "/placeholder-image.png" }], // Add a fallback image path here
    description: apiItem.description,
    category: normalizeCategory(apiItem.category?.name),
    stock: apiItem.quantity,
  };
};