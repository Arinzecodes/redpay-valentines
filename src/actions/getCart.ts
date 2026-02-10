export async function getCart() {
	const BASE_URL = process.env.NEXT_PUBLIC_REDPAY_STORE_BASE_URL;
	const endpoint = `${BASE_URL}/api/product/cart/get`;

	const response = await fetch(endpoint, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	console.log(data);

	if (!response.ok) {
		console.log(Error);

		throw new Error(data.message || `HTTP error! status: ${response.status}`);
	}

	return data;
}
