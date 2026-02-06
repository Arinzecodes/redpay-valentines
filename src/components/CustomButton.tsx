import { Icon } from "@iconify/react";
import React, { MouseEventHandler } from "react";

interface ButtonProps {
  buttonSize?: "btn-xs" | "btn-sm" | "btn-md" | "btn-lg" | "btn-wide" | "btn-block" | "btn-square";
  onClick?: MouseEventHandler;
  disabled?: boolean;
  className?: string; // Changed 'style' to 'className' for standard practices
  buttonText: string | React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "black"; 
  buttonIcon?: string;
}

const CustomButton = ({
  buttonText,
  buttonSize = "btn-md",
  onClick,
  disabled,
  variant = "primary",
  className = "",
  buttonIcon,
}: ButtonProps) => {
  
  // Define styles based on Figma Design System
  const baseStyle = "flex items-center justify-center gap-2 rounded-full font-century transition-all duration-300 font-bold tracking-wide";
  
  const variants = {
    primary: "bg-redpay-red text-white hover:bg-red-800 border-none shadow-custom", // The Main Red Button
    secondary: "bg-redpay-cream text-redpay-red border border-redpay-red hover:bg-red-100", // Light buttons
    outline: "bg-transparent border-2 border-redpay-grey text-redpay-grey hover:border-redpay-red hover:text-redpay-red", // Size selectors
    black: "bg-redpay-dark text-white hover:bg-black", // The "Pay Now" button
  };

  return (
    <button
      className={`btn ${buttonSize} ${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonIcon && <Icon icon={buttonIcon} className="w-5 h-5" />}
      {buttonText}
    </button>
  );
};

export default CustomButton;