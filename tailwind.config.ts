import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // 1. We mapped the Figma colors here
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                redpay: {
                    red: "#C80000",      // Primary Brand Color
                    cream: "#FAF5F0",    // Main Background
                    dark: "#2E2E2E",     // Primary Text / Pay Button
                    grey: "#4D4D4D",     // Secondary Text
                    orange: "#D98B06",   // "Low Stock" Warning
                    blue: "#0653D9",     // Tags like "Cafe"
                    light: "#FAFAFA",    // Card Backgrounds
                },
            },
            // 2. Added the two key fonts from the design
            fontFamily: {
                century: ["var(--font-century-gothic)", "sans-serif"], // Headings
                times: ["Times New Roman", "serif"], // "View Details" buttons
            },
            keyframes: {
                zoom: {
                    "0%": { transform: "scale(0.95)" },
                    "50%": { transform: "scale(1)" },
                    "100%": { transform: "scale(0.95)" },
                },
            },
            animation: {
                zoom: "zoom 3s ease-in-out infinite",
            },
            boxShadow: {
                custom: "0 4px 30px rgba(0, 0, 0, 0.1)",
                card: "0px 4px 8px rgba(69, 67, 67, 0.1)", // Specific shadow from Figma cards
                underlay: "12px 12px 0 -2.5px #fff, 12px 12px 0 0 #000;",
                darkUnderlay: "12px 12px 0 -1.5px #c80000, 12px 12px 0 0 #000;",
            },
            dropShadow: {
                customDrop: "1rem 1.2rem 1rem rgba(54, 53, 53, 0.87)",
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        // 3. I added a custom 'valentine' theme so standard daisyUI components use our colors
        themes: [
            {
                valentine: {
                    "primary": "#C80000",    // RedPay Red
                    "secondary": "#2E2E2E",  // Dark Text/Button
                    "accent": "#D98B06",     // Orange Warning
                    "neutral": "#4D4D4D",    // Grey Text
                    "base-100": "#FAF5F0",   // Cream Background
                    "info": "#0653D9",       // Blue Tags
                    "success": "#5AB062",    // From the "Secured by" badge
                    "warning": "#CDAF3A",
                    "error": "#FC0606",
                },
            },
            "wireframe",
            "retro",
        ],
    },
} satisfies Config;