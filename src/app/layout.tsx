import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeContextProvider from "@/context/ThemeContextProvider";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ToastProvider from "@/providers/ToastProvider";
import { CartContextProvider } from "@/context/CartContextProvider";
import AnalyticsProvider from "@/providers/AnalyticsProvider";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsLayout from "./layouts/analytics-layout";
// FIX: Import the new button
import ScrollToTopButton from "@/components/ScrollToTopButton";

// Ensure this variable matches what we put in tailwind.config.ts
const centuryGothic = localFont({
  src: [
    {
      path: "./fonts/centurygothic.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-century-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RedPay Valentine's Store",
  description: "Gift Fast. Eat Together. Look Good.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={centuryGothic.variable} data-theme="valentine">
      <head>
        <script
          async
          src="https://redpay-sdk-js.s3.eu-west-2.amazonaws.com/omni-payment-gateway-sdk.js"
        ></script>
      </head>
      <body className="font-century antialiased bg-redpay-cream text-redpay-dark min-h-screen flex flex-col">
        <ThemeContextProvider>
          <CartContextProvider>
            <ToastProvider>
              <ReactQueryProvider>
                <AnalyticsProvider>
                  <Navbar />
                  <CookieConsent />
                  <AnalyticsLayout>
                    <main className="flex-grow">
                      {children}
                    </main>
                  </AnalyticsLayout>

                  {/* FIX: Add the Scroll Button here */}
                  <ScrollToTopButton />

                </AnalyticsProvider>
              </ReactQueryProvider>
            </ToastProvider>
          </CartContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}