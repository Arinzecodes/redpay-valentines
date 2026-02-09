'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { showToast } from '@/utils';
import { useCart } from '@/context/CartContextProvider';
import { useRouter } from 'next/navigation';

interface CheckoutModalProps {
  totalAmount: number;
  onClose: () => void;
}

const CheckoutModal = ({ totalAmount, onClose }: CheckoutModalProps) => {
  const { clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  // RedPay SDK Logic

  const verifyRedPayPayment = async (ref: string) => {
    try {
      console.log("Verifying payment for:", ref);
      router.push("/");
      clearCart();
      // setShowModal(false);
      showToast("success", "Payment Successful", { autoClose: 3000 });
    } catch (err: any) {
      showToast("error", err.message || "Payment verification failed", {
        autoClose: 3000,
      });
    }
  };

  console.log({ reference });

  const redPayCallback = async (response: any, ref: string) => {
    if (response.status === "success" || response.status === "completed") {
      await verifyRedPayPayment(ref);
      return;
    }
  };

  const payWithRedpay = async () => {
    if (typeof window === "undefined" || !window.RedPayPop) {
      console.log("RedPay SDK not loaded yet.");
      return;
    }

    setLoading(true);

    // Generate reference and store it for later verification
    const ref = `REF-${Math.ceil(Math.random() * 10e10)}`;
    setReference(ref);

    try {
      const handler = await window.RedPayPop.setup({
        key: "PK_A5B84429D5F3F20EFA9B20250319110107", // Test Key
        amount: totalAmount * 100, // Amount in kobo,
        email,
        currency: "NGN",
        channels: ["CARD", "USSD", "TRANSFER"],
        ref,
        onClose: function () {
          console.log("Window closed.");
          setLoading(false);
        },
        callback: function (response: any) {
          redPayCallback(response, ref);
        },
        onError: function (error: any) {
          console.error("RedPay error", error);
        },
      });

      await handler.openIframe();
    } catch (err: any) {
      console.error("Error initializing RedPay:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop Blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-[600px] rounded-2xl shadow-2xl p-8 animate-zoom">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-century font-bold text-redpay-dark">
            {' '}
            Delivery Details
          </h2>
          <p className="text-redpay-grey text-sm mt-1">
            Please enter your details to complete the purchase.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-redpay-grey pl-4">
              Full Name
            </label>
            <input
              name="name"
              value={fullName || ''}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 px-6 rounded-full border border-gray-200 focus:border-redpay-red focus:outline-none transition-colors"
              placeholder="Sarah Michael"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-redpay-grey pl-4">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full h-12 px-6 rounded-full border border-gray-200 focus:border-redpay-red focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-redpay-grey pl-4">
              Phone Number
            </label>
            <input
              name="phone"
              value={phone || ''}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 px-6 rounded-full border border-gray-200 focus:border-redpay-red focus:outline-none transition-colors"
              placeholder="080 1234 5678"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-redpay-grey pl-4">
              Shipping Address
            </label>
            <input
              name="address"
              value={address || ''}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-12 px-6 rounded-full border border-gray-200 focus:border-redpay-red focus:outline-none transition-colors"
              placeholder="123 RedPay Street, Lagos"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg bg-redpay-cream text-redpay-dark font-century hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={payWithRedpay}
            disabled={loading}
            className="flex-[2] py-3 rounded-lg bg-redpay-dark text-white font-century font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : `Pay ₦${totalAmount.toLocaleString()}`}
            {!loading && <Icon icon="solar:card-send-linear" />}
          </button>
        </div>

        {/* Secure Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Icon icon="ri:lock-line" />
          <span>
            Secured by <span className="font-bold text-redpay-red">REDPAY</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
