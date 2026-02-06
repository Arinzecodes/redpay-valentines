"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-[999] p-3 bg-redpay-red text-white rounded-full shadow-lg hover:bg-red-800 transition-all duration-300 animate-bounce-in"
      aria-label="Scroll to top"
    >
      <Icon icon="solar:arrow-up-linear" className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;