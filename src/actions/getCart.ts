// actions/cart/getCart.ts

export interface CartItemApi {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  deliveryFee: number;
}

export interface GetCartResponse {
  data: CartItemApi[];
  message: string;
  status: boolean;
  statusCode: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCart(): Promise<GetCartResponse> {
  if (!BASE_URL) {
    throw new Error("Base URL is not defined");
  }

  const res = await fetch(`${BASE_URL}/api/product/cart/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // keep cart session
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch cart: ${res.status}`);
  }

  return res.json();
}
