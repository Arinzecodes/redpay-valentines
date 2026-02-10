
import { getProducts } from "@/actions/getProductData";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import { mapProductToUI } from "@/utils/mapper";

interface PageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({ params }: PageParams) {
  // Await params in Next.js 15+
  const { id } = await params;

  // 1. Fetch all products
  const apiProducts = await getProducts();

  // 2. Find the specific product (Type 'p' as any to fix the error)
  const rawItem = apiProducts.find((p: any) => p.id === id);

  // 3. Handle "Not Found" state
  if (!rawItem) {
    return (
      <div className="h-screen flex items-center justify-center text-redpay-red font-century text-xl">
        Item not found!
      </div>
    );
  }

  // 4. Map the API data to match your UI structure
  const item = mapProductToUI(rawItem);

  // 5. Render the client component with the fetched data
  return <ProductDetailsClient item={item} />;
}