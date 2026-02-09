interface CreateOrderProps {
	customerName: string;
	customerEmail: string;
	shippingAddress: string;
	customerPhoneNumber: string;
	// paymentMethod: string
}

export async function createOrder(values: CreateOrderProps) {
	const BASE_URL =
		process.env.NEXT_PUBLIC_BASE_URL ||
		"https://redpaystore.staging.redpay.africa";

	const endpoint = `${BASE_URL}/api/product/order`;

	const response = await fetch(endpoint, {
		method: "POST",
		body: JSON.stringify(values),
	});

	const contentType = response.headers.get("content-type");
	if (!response.ok) {
		if (contentType && contentType.includes("application/json")) {
			const text = await response.text();
			if (text) {
				const errorData = JSON.parse(text);
				throw new Error(errorData.message || "Something went wrong");
			}
		}
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	if (contentType && contentType.includes("application/json")) {
		const text = await response.text();
		if (text) {
			return JSON.parse(text);
		}
	}

	return null;
}
