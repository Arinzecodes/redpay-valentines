interface NotifyOrderProps { 
 orderReference: string;
 totalAmountPaid: number;
}

export async function notifyOrder(values: NotifyOrderProps) {
  try {
    // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    // if (!BASE_URL) {
    //   throw new Error("API base URL is not defined");
    // }

    const endpoint = `https://redpaystore.staging.redpay.africa/api/product/notify/payment`;

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
