"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContextProvider";
import CustomButton from "@/components/CustomButton";
import CheckoutModal from "@/components/CheckoutModal";
import { getCart } from "@/actions/getCart";


export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    setCartItems,
  } = useCart();

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [coupon, setCoupon] = useState<number>(10000);

  /* ------------------ FETCH CART FROM API ------------------ */
  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await getCart();

        if (res.status) {
          const mappedItems = res.data.map((item) => ({
            id: item.productId,
            name: item.productName,
            image: item.productImage,
            quantity: item.quantity,
            price: item.price,
            size: "", // API doesn't return size
          }));

          setCartItems(mappedItems);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    fetchCart();
  }, [setCartItems]);

  /* ------------------ TOTALS ------------------ */
  const total = calculateTotal();
  const deliveryFee = 1500; // can later come from API
  const grandTotal = total + deliveryFee;
  const grandTotalWithCoupon = grandTotal - coupon;

  useEffect(() => {
    if (grandTotal < 100000) {
      setCoupon(5000);
    } else {
      setCoupon(10000);
    }
  }, [grandTotal]);

  const goToShop = () => router.push("/");

  return (
    <div className="min-h-screen bg-redpay-cream pt-10 pb-20 px-4 md:px-12 relative">
      <h1 className="text-4xl font-bold font-century text-redpay-red text-center mb-2">
        Your Cart
      </h1>
      <p className="text-center text-redpay-grey font-century mb-12">
        Review your items before checkout.
      </p>

      {cartItems.length === 0 ? (
        /* ------------------ EMPTY CART ------------------ */
        <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
          <div className="relative">
            <Icon
              icon="solar:cart-large-2-linear"
              className="w-24 h-24 text-redpay-red/50"
            />
            <Icon
              icon="mdi:heart"
              className="w-8 h-8 text-redpay-red absolute -top-2 -right-2 animate-bounce"
            />
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-redpay-dark mb-2">
              Seems your cart is empty
            </h3>
            <p className="text-redpay-grey">
              You are just a few clicks away from great discounts!
            </p>
          </div>

          <CustomButton
            buttonText="Start Shopping"
            onClick={goToShop}
            variant="primary"
          />
        </div>
      ) : (
        /* ------------------ CART CONTENT ------------------ */
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT: ITEMS */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-redpay-red/10"
              >
                <div className="relative h-24 w-24 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-redpay-dark text-lg">
                        {item.name}
                      </h3>
                      <p className="text-sm text-redpay-grey">
                        Size: {item.size || "-"}
                      </p>
                    </div>

                    <p className="font-bold text-redpay-red text-xl">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    {/* QUANTITY */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size ?? "",
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="px-3 font-bold text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size ?? "",
                            item.quantity + 1,
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => removeFromCart(item.id, item.size ?? "")}
                      className="text-redpay-grey hover:text-redpay-red flex items-center gap-1 text-sm"
                    >
                      <Icon icon="solar:trash-bin-trash-linear" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* COUPON */}
            <div className="flex items-center mt-4">
              <input
                type="text"
                placeholder="Coupon Code"
                className="h-12 pl-6 pr-4 rounded-l-full border border-r-0 border-gray-300 bg-white focus:outline-none w-full md:w-64"
              />
              <button className="h-12 px-8 bg-redpay-red text-white font-bold rounded-r-full">
                Apply
              </button>
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="bg-white p-6 rounded-2xl shadow-card h-fit">
            <h2 className="text-2xl font-bold text-redpay-dark mb-6 border-b pb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 text-redpay-grey">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-redpay-dark">
                  ₦{total.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-bold text-redpay-dark">
                  ₦{deliveryFee.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Coupon</span>
                <span className="font-bold text-redpay-dark">
                  (-₦{coupon.toLocaleString()})
                </span>
              </div>

              <div className="flex justify-between text-redpay-red font-bold text-xl pt-4 border-t">
                <span>Total</span>
                <span>₦{grandTotalWithCoupon.toLocaleString()}</span>
              </div>
            </div>

            {/* TERMS */}
            <div
              className="flex items-center gap-3 mb-6 cursor-pointer"
              onClick={() => setIsTermsAccepted(!isTermsAccepted)}
            >
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center ${isTermsAccepted
                    ? "bg-redpay-red border-redpay-red"
                    : "border-gray-400"
                  }`}
              >
                {isTermsAccepted && (
                  <Icon icon="mdi:check" className="text-white w-4 h-4" />
                )}
              </div>

              <span className="text-sm text-redpay-dark">
                I agree with RedPay’s terms & conditions
              </span>
            </div>

            {/* CHECKOUT */}
            <button
              onClick={() => setShowModal(true)}
              disabled={!isTermsAccepted}
              className={`w-full py-4 rounded-full font-bold text-lg ${isTermsAccepted
                  ? "bg-redpay-red text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <CheckoutModal
          totalAmount={grandTotal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

// "use client";

// import { useCart } from "@/context/CartContextProvider";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import CustomButton from "@/components/CustomButton";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import CheckoutModal from "@/components/CheckoutModal";

// export default function CartPage() {
//     const {
//         cartItems,
//         removeFromCart,
//         updateQuantity,
//         calculateTotal,
//     } = useCart();

//     const router = useRouter();
//     const [showModal, setShowModal] = useState(false);
//     const [isTermsAccepted, setIsTermsAccepted] = useState(false); // The Gatekeeper
//     const [coupon, setCoupon] = useState<number>(10000)

//     const total = calculateTotal();
//     const deliveryFee = 1500; // Example fixed fee, can be dynamic
//     const grandTotal = total + deliveryFee;

//     const grandTotalWithCoupon = grandTotal - coupon;

//     useEffect(() => {
//         if (grandTotal < 100000) {
//             setCoupon(5000)
//         } else {
//             setCoupon(10000)
//         }
//     }, [grandTotal])

//     const goToShop = () => router.push("/");

//     return (
//         <div className="min-h-screen bg-redpay-cream pt-10 pb-20 px-4 md:px-12 relative">
//             <h1 className="text-4xl font-bold font-century text-redpay-red text-center mb-2">Your Cart</h1>
//             <p className="text-center text-redpay-grey font-century mb-12">Review your items before checkout.</p>

//             {cartItems.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
//                     <div className="relative">
//                         <Icon icon="solar:cart-large-2-linear" className="w-24 h-24 text-redpay-red/50" />
//                         <Icon icon="mdi:heart" className="w-8 h-8 text-redpay-red absolute -top-2 -right-2 animate-bounce" />
//                     </div>
//                     <div className="text-center">
//                         <h3 className="text-2xl font-bold text-redpay-dark mb-2">Seems your cart is empty</h3>
//                         <p className="text-redpay-grey">You are just a few clicks away from great discounts!</p>
//                     </div>
//                     <CustomButton buttonText="Start Shopping" onClick={goToShop} variant="primary" />
//                 </div>
//             ) : (
//                 <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
//                     {/* Left: Items */}
//                     <div className="lg:col-span-2 flex flex-col gap-6">
//                         {cartItems.map((item) => (
//                             <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-redpay-red/10">
//                                 <div className="relative h-24 w-24 bg-gray-50 rounded-lg overflow-hidden shrink-0">
//                                     <Image src={item.image} alt={item.name} fill className="object-cover" />
//                                 </div>
//                                 <div className="flex-grow flex flex-col justify-between">
//                                     <div className="flex justify-between items-start">
//                                         <div>
//                                             <h3 className="font-bold text-redpay-dark text-lg">{item.name}</h3>
//                                             <p className="text-sm text-redpay-grey">Size: {item.size}</p>
//                                             <div className="flex items-center gap-1 mt-1">
//                                                 <Icon icon="solar:danger-circle-linear" className="text-redpay-orange w-4 h-4" />
//                                                 <span className="text-xs text-redpay-orange font-century">Low stock</span>
//                                             </div>
//                                         </div>
//                                         <p className="font-bold text-redpay-red text-xl">₦{item.price.toLocaleString()}</p>
//                                     </div>

//                                     <div className="flex justify-between items-center mt-2">
//                                         {/* Quantity Control */}
//                                         <div className="flex items-center border border-gray-300 rounded-lg">
//                                             <button
//                                                 onClick={() => updateQuantity(item.id, item.size ?? "", Math.max(1, item.quantity - 1))}
//                                                 className="px-3 py-1 hover:bg-gray-100 text-redpay-dark"
//                                             >-</button>
//                                             <span className="px-3 font-bold text-sm">{item.quantity}</span>
//                                             <button
//                                                 onClick={() => updateQuantity(item.id, item.size ?? "", item.quantity + 1)}
//                                                 className="px-3 py-1 hover:bg-gray-100 text-redpay-dark"
//                                             >+</button>
//                                         </div>

//                                         {/* Delete */}
//                                         <button
//                                             onClick={() => removeFromCart(item.id, item.size ?? "")}
//                                             className="text-redpay-grey hover:text-redpay-red flex items-center gap-1 text-sm transition-colors"
//                                         >
//                                             <Icon icon="solar:trash-bin-trash-linear" /> Remove
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                         {/* Coupon Section */}
//                         <div className="flex items-center mt-4">
//                             <input
//                                 type="text"
//                                 placeholder="Coupon Code"
//                                 className="h-12 pl-6 pr-4 rounded-l-full border border-r-0 border-gray-300 bg-white focus:outline-none w-full md:w-64"
//                             />
//                             <button className="h-12 px-8 bg-redpay-red text-white font-bold rounded-r-full hover:bg-red-800 transition-colors">
//                                 Apply
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right: Summary */}
//                     <div className="bg-white p-6 rounded-2xl shadow-card h-fit">
//                         <h2 className="text-2xl font-bold text-redpay-dark mb-6 border-b pb-4">Order Summary</h2>
//                         <div className="space-y-4 mb-6 text-redpay-grey">
//                             <div className="flex justify-between">
//                                 <span>Subtotal</span>
//                                 <span className="font-bold text-redpay-dark">₦{total.toLocaleString()}</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>Delivery</span>
//                                 <span className="font-bold text-redpay-dark">₦{deliveryFee.toLocaleString()}</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>Coupon</span>
//                                 <span className="font-bold text-redpay-dark">(-₦{coupon.toLocaleString()})</span>
//                             </div>
//                             <div className="flex justify-between text-redpay-red font-bold text-xl pt-4 border-t">
//                                 <span>Total</span>
//                                 <span>₦{grandTotalWithCoupon.toLocaleString()}</span>
//                             </div>
//                         </div>

//                         {/* Disclaimer */}
//                         <div className="p-3 bg-redpay-cream rounded-lg mb-6 border border-redpay-orange/20">
//                             {/* <div className="flex items-center gap-2 mb-2 text-redpay-orange">
//                                 <Icon icon="solar:danger-triangle-linear" />
//                                 <span className="font-bold text-xs uppercase">Important Info</span>
//                             </div> */}
//                             <p className="text-xs text-redpay-grey leading-relaxed">
//                                 By completing this purchase, you acknowledge and agree that your order fulfillment and  delivery will be managed entirely by the merchant. RedPay Store serves as a marketplace  platform connecting buyers and sellers. Delivery timelines, methods, and arrangements  are the sole responsibility of the merchant as specified in the product listing.
//                             </p>
//                         </div>

//                         {/* Gatekeeper Checkbox */}
//                         <div
//                             className="flex items-center gap-3 mb-6 cursor-pointer group"
//                             onClick={() => setIsTermsAccepted(!isTermsAccepted)}
//                         >
//                             <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isTermsAccepted ? 'bg-redpay-red border-redpay-red' : 'border-gray-400 group-hover:border-redpay-red'}`}>
//                                 {isTermsAccepted && <Icon icon="mdi:check" className="text-white w-4 h-4" />}
//                             </div>
//                             <span className="text-sm text-redpay-dark select-none">I agree with RedPay’s terms & conditions</span>
//                         </div>

//                         {/* Checkout Button */}
//                         <button
//                             onClick={() => setShowModal(true)}
//                             disabled={!isTermsAccepted}
//                             className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${isTermsAccepted
//                                 ? "bg-redpay-red text-white hover:bg-red-800 shadow-lg hover:shadow-red-900/20"
//                                 : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                 }`}
//                         >
//                             Proceed to Checkout
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Modal Injection */}
//             {showModal && (
//                 <CheckoutModal
//                     totalAmount={grandTotal}
//                     onClose={() => setShowModal(false)}
//                 />
//             )}
//         </div>
//     );
// }
