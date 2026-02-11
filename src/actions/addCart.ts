"use server";

interface AddCartProps {
    productId: string;
    quantity: number;
}

export async function addCart(values: AddCartProps) {
    try {
        // ✅ FIX: Use the correct ENV variable
        const BASE_URL = process.env.NEXT_PUBLIC_REDPAY_STORE_BASE_URL || "https://redpaystore.staging.redpay.africa";

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
                message: data.message || "Failed to add to cart",
                data: data.data || null,
            };
        }

        return {
            status: true,
            message: data.message || "Added to cart successfully",
            data: data.data || null,
        };
    } catch (error) {
        console.error("Add to Cart Error:", error);
        return {
            status: false,
            message: "Unexpected error occurred",
            data: null,
        };
    }
}