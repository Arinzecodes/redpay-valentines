interface AddCartProps {
	productId: string;
	quantity: number;
}

export async function addToCart(values: AddCartProps) {
	try {
		const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

		if (!BASE_URL) {
			throw new Error("API base URL is not defined");
		}

		const endpoint = `${BASE_URL}/api/product/cart/add`;

		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});

		const data = await response.json();
		if (!response.ok) {
			return {
				status: false,
				message: data.message,
				data: data.data || null,
			};
		}

		return {
			status: true,
			message: data.message,
			data: data.data || null,
		};
	} catch (error) {
		console.error(error);
		return {
			status: false,
			message: "Unexpected error occurred",
			data: null,
		};
	}
}
