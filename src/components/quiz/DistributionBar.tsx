"use client";

import {
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/dictionaries";
import type { QuestionData } from "@/lib/questions";

interface DistributionBarProps {
  question: QuestionData;
  locale: Locale;
  initialValue?: number;
  dict: {
    prompt: string;
    confirm: string;
    dragHint: string;
  };
  onConfirm: (percentage: number) => void;
}

export function DistributionBar({
  question,
  locale,
  initialValue = 50,
  dict,
  onConfirm,
}: DistributionBarProps) {
  const [percentage, setPercentage] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [barLeft, setBarLeft] = useState(0);

  const x = useMotionValue(0);

  useEffect(() => {
    const updateBarDimensions = () => {
      const bar = document.getElementById("distribution-bar");
      if (bar) {
        const rect = bar.getBoundingClientRect();
        setBarWidth(rect.width);
        setBarLeft(rect.left);
      }
    };

    updateBarDimensions();
    window.addEventListener("resize", updateBarDimensions);
    return () => window.removeEventListener("resize", updateBarDimensions);
  }, []);

  const handleDrag = useCallback(
    (_: unknown, info: PanInfo) => {
      if (barWidth === 0) return;

      const handlePosition = info.point.x - barLeft;
      const newPercentage = Math.min(
        100,
        Math.max(0, (handlePosition / barWidth) * 100),
      );
      setPercentage(Math.round(newPercentage));
    },
    [barWidth, barLeft],
  );

  const handleBarClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newPercentage = Math.min(
        100,
        Math.max(0, (clickX / rect.width) * 100),
      );
      setPercentage(Math.round(newPercentage));
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    onConfirm(percentage);
  }, [onConfirm, percentage]);

  const leftOpacity = useTransform(() => Math.max(0.3, 1 - percentage / 100));
  const rightOpacity = useTransform(() => Math.max(0.3, percentage / 100));

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg sm:text-xl leading-relaxed">
          {question.title[locale]}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">{dict.prompt}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between text-sm font-medium">
          <motion.span
            className="text-red-500"
            style={{ opacity: leftOpacity }}
          >
            반대 {100 - percentage}%
          </motion.span>
          <motion.span
            className="text-green-500"
            style={{ opacity: rightOpacity }}
          >
            동의 {percentage}%
          </motion.span>
        </div>

        <button
          type="button"
          id="distribution-bar"
          className="relative w-full h-12 bg-muted rounded-full overflow-hidden cursor-pointer"
          onClick={handleBarClick}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-400 to-red-300"
            style={{ width: `${100 - percentage}%` }}
            animate={{ width: `${100 - percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-gradient-to-l from-green-500 to-green-400"
            style={{ width: `${percentage}%` }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 cursor-grab active:cursor-grabbing z-10 flex items-center justify-center"
            style={{
              left: `calc(${percentage}% - 16px)`,
              x,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDrag={handleDrag}
            onDragEnd={() => setIsDragging(false)}
            whileDrag={{ scale: 1.1 }}
          >
            <div className="w-1 h-4 bg-gray-400 rounded-full" />
          </motion.div>

          {isDragging && (
            <div
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-sm font-bold"
              style={{ left: `${percentage}%` }}
            >
              {percentage}%
            </div>
          )}
        </button>

        <p className="text-xs text-center text-muted-foreground">
          {dict.dragHint}
        </p>

        <div className="text-center">
          <span className="text-4xl font-bold">{percentage}%</span>
          <span className="text-muted-foreground ml-2">동의할 것이다</span>
        </div>

        <Button onClick={handleConfirm} className="w-full" size="lg">
          {dict.confirm}
        </Button>
      </CardContent>
    </Card>
  );
}
