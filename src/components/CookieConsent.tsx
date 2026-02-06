"use client";

import { useState, useEffect } from "react";
import { initGA } from "@/utils/analytics";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsent = sessionStorage.getItem("analytics-consent");
    if (hasConsent === "true") {
      initGA();
    } else {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    sessionStorage.setItem("analytics-consent", "true");
    initGA();
    setShowConsent(false);
  };

  const declineCookies = () => {
    sessionStorage.setItem("analytics-consent", "false");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-redpay-dark/95 backdrop-blur text-white p-6 z-[100] border-t-4 border-redpay-red shadow-darkUnderlay">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-century leading-relaxed text-center md:text-left">
          We use cookies to ensure you get the best experience on our Valentine's Store. 
          By continuing, you agree to our terms.
        </p>
        <div className="flex gap-4">
          <button
            onClick={declineCookies}
            className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 font-century text-sm transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-redpay-red text-white font-bold rounded-full hover:bg-red-700 font-century text-sm shadow-md transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}