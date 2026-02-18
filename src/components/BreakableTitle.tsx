"use client";

import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";

interface BreakableTitleProps {
  locale: string;
  text: string;
}

function getRandomOffset() {
  return {
    x: (Math.random() - 0.5) * 120,
    y: (Math.random() - 0.5) * 80 - 20,
    rotate: (Math.random() - 0.5) * 90,
    scale: 0.8 + Math.random() * 0.4,
  };
}

export function BreakableTitle({ locale, text }: BreakableTitleProps) {
  const [isBreaking, setIsBreaking] = useState(false);
  const controls = useAnimationControls();

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      // if (isBreaking) return;

      setIsBreaking(true);

      await controls.start((idx) => ({
        ...getRandomOffset(),
        opacity: 0.7,
        transition: {
          duration: 0.3,
          delay: idx * 0.02,
          type: "spring",
          stiffness: 200,
          damping: 15,
        },
      }));

      await new Promise((r) => setTimeout(r, 200));

      await controls.start((idx) => ({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
          delay: idx * 0.03,
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }));

      setIsBreaking(false);
    },
    [isBreaking, controls],
  );

  const chars = text.split("");
  const charIds = chars.map((char, idx) => `${locale}-${text}-${idx}-${char}`);

  return (
    <Link
      href={`/${locale}`}
      onClick={handleClick}
      className="inline-flex items-center select-none cursor-pointer group"
      aria-label="Break the Collective Illusions - Home"
    >
      {chars.map((char, idx) => (
        <motion.span
          key={charIds[idx]}
          custom={idx}
          animate={controls}
          className="font inline-block text-7xl font-bold text-foreground group-hover:text-primary transition-colors"
          style={{ originX: 0.5, originY: 0.5 }}
        >
          {char}
        </motion.span>
      ))}
    </Link>
  );
}
