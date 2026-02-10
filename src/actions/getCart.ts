export async function getCart() {
	try {
		const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

		const endpoint = `${BASE_URL}/api/product/cart/get`;

		const response = await fetch(endpoint, {
			method: "GET",
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
