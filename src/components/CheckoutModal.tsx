'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { showToast } from '@/utils';
import { useCart } from '@/context/CartContextProvider';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/actions/createOrder';
import * as Yup from 'yup'
import { Form, Formik } from 'formik';
import { notifyOrder } from '@/actions/notifyOrder';

interface CheckoutModalProps {
  totalAmount: number;
  onClose: () => void;
}

const CheckoutModal = ({ totalAmount, onClose }: CheckoutModalProps) => {
  const FormSchema = Yup.object().shape({
    customerName: Yup.string().required("Full Name is required"),
    customerEmail: Yup.string().email("Invalid email").required("Email is required"),
    customerPhoneNumber: Yup.string().required("Phone Number is required"),
    shippingAddress: Yup.string().required("Shipping Address is required"),
  });

  const { clearCart } = useCart();
  const router = useRouter();
  const [loading] = useState(false);

  const [reference, setReference] = useState<string>("");
  const [email, setEmail] = useState("")


  const { mutate: NotifyPaymentMutation } = useMutation({
    mutationFn: notifyOrder,
    onSuccess: (data) => {
      showToast(data.status ? "success" : "error", data.message)
    },
    onError: (error) => {
      showToast("error", error.message || "Failed to create order", { autoClose: 3000 });
    }
  })

  // const handleNotifyPayment = () => {
  //   NotifyPaymentMutation({
  //     orderReference: reference,
  //     totalAmountPaid: totalAmount
  //   })
  // }


  const { mutate: CreateOrderMutation, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      try {
        const ref = data?.data?.reference;
        if (!ref) throw new Error("Missing reference");

        showToast(data.status ? "success" : "error", data.message)
        setReference(ref);
        // payWithRedpay(reference, data.data.customerEmail)

        console.log(data);

      } catch (err) {
        console.error("Payment init failed:", err);
      }
    },


    onError: (error) => {
      showToast("error", error.message || "Failed to create order", { autoClose: 3000 });
      onClose()
    }
  })



  const handleCreateOrder = (values: any) => {
    setEmail(values.customerEmail)
    CreateOrderMutation({
      ...values,
    });
  };

  const verifyRedPayPayment = async (ref: string) => {
    try {
      console.log("Verifying payment for:", ref);
      router.push("/");
      clearCart();
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

    // Generate reference and store it for later verification
    const ref = `REF-${Math.ceil(Math.random() * 10e10)}`;
    setReference(ref);

    try {
      const handler = await window.RedPayPop.setup({
        key: "PK_A5B84429D5F3F20EFA9B20250319110107", // Test Key
        amount: totalAmount,
        email,
        currency: "NGN",
        channels: ["CARD", "USSD", "TRANSFER"],
        ref,
        onClose: function () {
          console.log("Window closed.");
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

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email address"
          className="border border-gray-300 px-3 py-2 w-full outline-none rounded-[8px] mb-4"
        />

        <button onClick={payWithRedpay}>Rep</button>



        {/* Form */}
        <Formik
          initialValues={{
            customerEmail: "",
            customerName: "",
            customerPhoneNumber: "",
            shippingAddress: "",
          }}
          onSubmit={(values) => {
            handleCreateOrder(values)
            payWithRedpay()
          }}
          validationSchema={FormSchema}
          validateOnChange
          validateOnBlur
          className="flex flex-col gap-4">
          {({ errors, handleChange, handleBlur, values, isValid, dirty }) => (
            <Form className='w-full flex flex-col gap-6 mx-auto'>
              <div className="space-y-1">
                <div className="flex items-center justify-between w-full">
                  <label className="text-sm font-bold text-redpay-grey pl-4">
                    Full Name
                  </label>
                  <h1 className="text-red-500 text-xs">{errors.customerName}</h1>
                </div>
                <input
                  name="customerName"
                  value={values.customerName || ''}
                  onChange={handleChange("customerName")}
                  onBlur={handleBlur("customerName")}

                  className="w-full h-12 px-6 rounded-full border border-gray-200 focus:border-redpay-red focus:outline-none transition-colors"
                  placeholder="Sarah Michael"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between w-full">
                  <label className="text-sm font-bold text-redpay-grey pl-4">
                    Email Address
                  </label>
                  <h1 className="text-red-500 text-xs">{errors.customerEmail}</h1>
                </div>
                <input
                  type="email"
                  name='customerEmail'
                  value={values.customerEmail}
                  onChange={handleChange("customerEmail")}
                  onBlur={handleBlur("customerEmail")}

                  placeholder="name@example.com"
                  className="w-full h-12 px-6 rounded-full border border-gray-200 focus:border-redpay-red focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between w-full">
                  <label className="text-sm font-bold text-redpay-grey pl-4">
                    Phone Number
                  </label>
                  <h1 className="text-red-500 text-xs">{errors.customerPhoneNumber}</h1>
                </div>
                <input
                  name="customerPhoneNumber"
                  value={values.customerPhoneNumber || ''}
                  onChange={handleChange("customerPhoneNumber")}
                  onBlur={handleBlur("customerPhoneNumber")}

                  className="w-full h-12 px-6 rounded-full border border-gray-200 focus:border-redpay-red focus:outline-none transition-colors"
                  placeholder="080 1234 5678"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between w-full">
                  <label className="text-sm font-bold text-redpay-grey pl-4">
                    Shipping Address
                  </label>
                  <h1 className="text-red-500 text-xs">{errors.shippingAddress}</h1>
                </div>
                <input
                  name="shippingAddress"
                  value={values.shippingAddress || ''}
                  onChange={handleChange("shippingAddress")}
                  onBlur={handleBlur("shippingAddress")}

                  className="w-full h-12 px-6 rounded-full border border-gray-200 focus:border-redpay-red focus:outline-none transition-colors"
                  placeholder="123 RedPay Street, Lagos"
                />
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
                  type='submit'
                  disabled={!isValid || !dirty || isPending || loading}
                  className="flex-[2] py-3 rounded-lg bg-redpay-dark text-white font-century font-bold hover:bg-black transition-all flex items-center justify-center gap-2 disabled:bg-redpay-dark/20"
                >
                  {loading ? 'Processing...' : `Pay ₦${totalAmount.toLocaleString()}`}
                  {!loading && <Icon icon="solar:card-send-linear" />}
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Icon icon="ri:lock-line" />
                <span>
                  Secured by <span className="font-bold text-redpay-red">REDPAY</span>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
};

export default CheckoutModal;
