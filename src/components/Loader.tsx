import React from "react";

interface LoaderProps {
  bodyStyle?: string;
  loaderSize?: "loading-sm" | "loading-md" | "loading-lg";
}

const Loader = ({ bodyStyle = "", loaderSize = "loading-md" }: LoaderProps) => {
  return (
    <main className={`flex w-full items-center justify-center py-10 ${bodyStyle}`}>
      <span className={`loading loading-bars ${loaderSize} text-redpay-red`}></span>
    </main>
  );
};

export default Loader;