interface CreateOrderProps {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  customerPhoneNumber: string;
  productIds: string[];
}

export async function createOrder(values: CreateOrderProps) {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_REDPAY_STORE_BASE_URL;

    const endpoint = `${BASE_URL}/api/product/order`;

    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
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
