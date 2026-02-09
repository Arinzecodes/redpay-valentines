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

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // RedPay SDK Logic
  const handlePayment = async () => {
    if (!formData.email || !formData.name) {
      showToast('error', 'Please fill in your details');
      return;
    }

    setLoading(true);

    if (typeof window === 'undefined' || !(window as any).RedPayPop) {
      showToast('error', 'Payment SDK not loaded');
      setLoading(false);
      return;
    }

    const ref = `RED-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
      const handler = await (window as any).RedPayPop.setup({
        key: 'PK_A5B84429D5F3F20EFA9B20250319110107', // Test Key from your code
        amount: totalAmount * 100, // Amount in kobo
        email: formData.email,
        currency: 'NGN',
        ref: ref,
        metadata: {
          custom_fields: [
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: formData.name,
            },
            {
              display_name: 'Phone',
              variable_name: 'phone',
              value: formData.phone,
            },
            {
              display_name: 'Address',
              variable_name: 'address',
              value: formData.address,
            },
          ],
        },
        onClose: () => {
          setLoading(false);
          console.log('Payment window closed');
        },
        callback: (response: any) => {
          console.log('Payment Success:', response);
          showToast('success', 'Payment Successful!');
          clearCart();
          onClose();
          router.push('/');
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Payment Init Error:', error);
      showToast('error', 'Could not initialize payment');
      setLoading(false);
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
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 px-6 rounded-full border border-gray-200 focus:border-redpay-red focus:outline-none transition-colors"
              placeholder="Sarah Michael"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-redpay-grey pl-4">
              Email Address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 px-6 rounded-full border border-gray-200 focus:border-redpay-red focus:outline-none transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-redpay-grey pl-4">
              Phone Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
              value={formData.address}
              onChange={handleChange}
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
            onClick={handlePayment}
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
