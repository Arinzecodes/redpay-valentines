interface CreateOrderProps {
	customerName: string;
	customerEmail: string;
	shippingAddress: string;
	customerPhoneNumber: string;
	productIds: string[];
}

export async function createOrder(values: CreateOrderProps) {
	try {
		// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

		const endpoint = `https://redpaystore.staging.redpay.africa/api/product/order`;

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
