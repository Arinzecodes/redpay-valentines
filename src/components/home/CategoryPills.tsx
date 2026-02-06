"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

const categories = [
  { id: "gift-fast", label: "Gift Fast" },
  { id: "eat-together", label: "Eat Together" },
  { id: "look-good", label: "Look Good" },
  { id: "experiences", label: "Experiences" },
];

const CategoryPills = () => {
  const [active, setActive] = useState<string | null>("gift-fast");

  const handleScroll = (id: string) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset the scroll to account for the sticky header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full flex justify-center py-4">
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => handleScroll(cat.id)}
              className={`
                flex items-center justify-center gap-[10px] 
                px-[18px] py-[14px] rounded-[36px] 
                font-century text-lg transition-all duration-300
                ${isActive 
                  ? "bg-[#C80000] text-white font-bold shadow-lg" // Component 1 (Active)
                  : "bg-white text-black font-normal hover:bg-gray-50" // Component 2,3,4 (Inactive)
                }
              `}
            >
              {/* Only show the heart icon on the active tab, based on Figma "Component 1" */}
              {isActive && (
                <Icon icon="mingcute:love-fill" className="w-6 h-6" />
              )}
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPills;