export async function getCart() {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_REDPAY_STORE_BASE_URL;

    const endpoint = `${BASE_URL}/api/product/cart/get`;

    const response = await fetch(endpoint);

    const data = await response.json();

    console.log(data);

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
