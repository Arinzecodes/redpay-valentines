"use client";

import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 items-center bg-white px-8 py-4 rounded-2xl shadow-lg border border-redpay-red/10">
       {/* Days */}
       <FlipUnit value={timeLeft.days} label="Days" />
       <Separator />
       {/* Hours */}
       <FlipUnit value={timeLeft.hours} label="Hours" />
       <Separator />
       {/* Minutes */}
       <FlipUnit value={timeLeft.minutes} label="Mins" />
       <Separator />
       {/* Seconds */}
       <FlipUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

// Sub-components for the flip effect
const FlipUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center gap-2">
        <div className="bg-redpay-red text-white w-12 h-16 md:w-16 md:h-20 rounded-lg flex items-center justify-center text-3xl md:text-4xl font-bold shadow-md">
            {value < 10 ? `0${value}` : value}
        </div>
        <span className="text-redpay-red font-century text-xs md:text-sm uppercase font-bold tracking-wider">
            {label}
        </span>
    </div>
);

const Separator = () => (
    <div className="flex flex-col gap-2 pb-6">
        <div className="w-1.5 h-1.5 bg-redpay-red rounded-full" />
        <div className="w-1.5 h-1.5 bg-redpay-red rounded-full" />
    </div>
);

export default CountdownTimer;