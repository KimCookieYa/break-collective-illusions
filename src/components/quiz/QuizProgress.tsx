"use client";

import { motion } from "framer-motion";

interface QuizProgressProps {
  current: number;
  total: number;
  timeRemainingText?: string;
  boostMessage?: string;
}

export function QuizProgress({
  current,
  total,
  timeRemainingText,
  boostMessage,
}: QuizProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full space-y-2 mb-6">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium">
          {current} / {total}
        </span>
        {timeRemainingText && (
          <span className="text-muted-foreground text-xs">
            {timeRemainingText}
          </span>
        )}
      </div>

      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {boostMessage && (
        <motion.p
          className="text-center text-sm text-primary font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {boostMessage}
        </motion.p>
      )}
    </div>
  );
}
