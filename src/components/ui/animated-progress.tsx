"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedProgressProps {
  value: number;
  className?: string;
  barClassName?: string;
  delay?: number;
  duration?: number;
  /** "탁" 효과 - 빠르게 등장하며 살짝 바운스 */
  snap?: boolean;
}

export function AnimatedProgress({
  value,
  className,
  barClassName,
  delay = 0,
  duration = 0.8,
  snap = false,
}: AnimatedProgressProps) {
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 100], ["0%", "100%"]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      animate(progress, value, {
        duration: snap ? 0.4 : duration,
        ease: snap ? [0.34, 1.56, 0.64, 1] : "easeOut", // snap: 오버슈트 바운스
      });
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [value, delay, duration, snap, progress]);

  return (
    <div
      className={cn(
        "bg-primary/20 relative h-3 w-full overflow-hidden rounded-full",
        className,
      )}
    >
      <motion.div
        className={cn("bg-primary h-full rounded-full", barClassName)}
        style={{ width }}
        initial={{ width: "0%" }}
      />
    </div>
  );
}
