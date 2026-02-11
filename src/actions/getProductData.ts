// 1. Define the shape of the Image based on the API response
export interface ProductImage {
	id: number;
	productId: string;
	altText: string;
	url: string;
	merchantId: string;
}

// 2. Define the shape of the Category
export interface ProductCategory {
	id: number;
	name: string;
	description: string | null;
}

// 3. Define the shape of a single Product Item
export interface ProductItem {
	id: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	soldOut: boolean;
	available: boolean;
	startDate: string;
	endDate: string;
	category: ProductCategory | null;
	images: ProductImage[];
}

// 4. Define the overall API Response structure
export interface FetchProductsResponse {
	statusCode: number;
	status: boolean;
	message: string;
	currentPage: number;
	itemsPerPage: number;
	totalItems: number;
	totalPages: number;
	items: ProductItem[];
}

export const getProducts = async () => {
	// Fallback to the staging URL if the env var isn't set
	const BASE_URL = process.env.NEXT_PUBLIC_REDPAY_STORE_BASE_URL;

	try {
		// No Authorization header needed
		const response = await fetch(
			`${BASE_URL}/api/reporting/list/products?pageSize=100`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				next: { revalidate: 60 }, // Cache data for 60 seconds (ISR)
			},
		);

		if (!response.ok) {
			console.error(
				`Failed to fetch products: ${response.status} ${response.statusText}`,
			);
			return [];
		}

		const data: FetchProductsResponse = await response.json();
		return data.items || [];
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
};
