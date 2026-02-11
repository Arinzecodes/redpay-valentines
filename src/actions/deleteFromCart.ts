export async function deleteFromCart(productId: string) {
	const BASE_URL = process.env.NEXT_PUBLIC_REDPAY_STORE_BASE_URL;

	// Ensure the endpoint matches your backend documentation (PUT or DELETE)
	const endpoint = `${BASE_URL}/api/product/cart/remove?productId=${productId}`;

	const response = await fetch(endpoint, {
		method: "PUT", // Keeping your method as PUT based on your code
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		console.log(Error);

		throw new Error(data.message || `HTTP error! status: ${response.status}`);
	}

	return data;
}
