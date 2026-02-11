"use server";

export async function deleteFromCart(productId: string) {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_REDPAY_STORE_BASE_URL;

    if (!BASE_URL) {
      throw new Error("API base URL is not defined");
    }

    const endpoint = `${BASE_URL}/api/product/cart/remove?productId=${productId}`;

    const response = await fetch(endpoint, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: data.message || "Failed to remove item",
        data: data.data || null,
      };
    }

    return {
      status: true,
      message: data.message || "Item removed successfully",
      data: data.data || null,
    };
  } catch (error) {
    console.error("Delete from Cart Error:", error);
    return {
      status: false,
      message: "Unexpected error occurred",
      data: null,
    };
  }
}
