"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";

interface Props {
  value: string;
  className?: string;
}

export default function CountUp({ value, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  // Extract numeric part and suffix
  const match = value.match(/^([\d.]+)(.*)$/);
  const numericEnd = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const isNumeric = match !== null;

  useEffect(() => {
    if (!isInView || !isNumeric) {
      if (!isNumeric && isInView) setDisplay(value);
      return;
    }

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numericEnd);
      setDisplay(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, numericEnd, suffix, isNumeric]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {isInView ? display : "0"}
    </motion.span>
  );
}
