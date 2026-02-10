// import CategoryPills from "@/components/CategoryPills";
// import ProductSection from "@/components/ProductSection";
// import { getProducts } from "@/actions/getProducts";
// import { mapProductToUI } from "@/utils";

import { getProducts } from "@/actions/getProductData";
import CategoryPills from "@/components/home/CategoryPills";
import ProductSection from "@/components/home/ProductSection";
import { mapProductToUI } from "@/utils/mapper";

export const dynamic = "force-dynamic"; // Ensure fresh data on each load

export default async function Home() {
  // 1. Fetch raw data
  const apiProducts = await getProducts();

  // 2. Map to UI format
  const products = apiProducts.map(mapProductToUI);

  return (
    <main className="min-h-screen bg-white">
      {/* ... your Hero Banner code ... */}
      
      {/* Category Navigation */}
      <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <CategoryPills />
      </div>

      {/* Product Sections with Dynamic Data */}
      <div className="flex flex-col gap-20 py-16">
        <ProductSection 
          title="Gift Fast" 
          subtitle="Curated gifts ready to go" 
          category="gift-fast" 
          products={products} 
        />
        
        <ProductSection 
          title="Eat Together" 
          subtitle="Share a meal, share the love" 
          category="eat-together" 
          products={products} 
        />
        
        <ProductSection 
          title="Look Good" 
          subtitle="Style that speaks volumes" 
          category="look-good" 
          products={products} 
        />
        
        <ProductSection 
          title="Experiences" 
          subtitle="Create memories that last" 
          category="experiences" 
          products={products} 
        />
      </div>
    </main>
  );
}