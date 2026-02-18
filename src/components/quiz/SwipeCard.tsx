"use client";

import {
  motion,
  type PanInfo,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { RotateCcw, SkipForward } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/dictionaries";
import type { LikertValue, QuestionData } from "@/lib/questions";

const SWIPE_THRESHOLD = 100;
const ROTATION_RANGE = 15;

interface SwipeCardProps {
  question: QuestionData;
  locale: Locale;
  questionNumber: number;
  totalQuestions: number;
  dict: {
    swipeLeft: string;
    swipeRight: string;
    neutral: string;
    skip: string;
    stronglyDisagree: string;
    disagree: string;
    agree: string;
    stronglyAgree: string;
  };
  onSwipe: (value: LikertValue) => void;
  onSkip: () => void;
  canUndo: boolean;
  onUndo: () => void;
}

function getLikertFromDistance(x: number): LikertValue {
  if (x < -SWIPE_THRESHOLD * 1.5) return 1;
  if (x < -SWIPE_THRESHOLD) return 2;
  if (x > SWIPE_THRESHOLD * 1.5) return 5;
  if (x > SWIPE_THRESHOLD) return 4;
  return 3;
}

function getLikertLabel(
  value: LikertValue,
  dict: SwipeCardProps["dict"],
): string {
  switch (value) {
    case 1:
      return dict.stronglyDisagree;
    case 2:
      return dict.disagree;
    case 3:
      return dict.neutral;
    case 4:
      return dict.agree;
    case 5:
      return dict.stronglyAgree;
  }
}

function getLikertColor(value: LikertValue): string {
  switch (value) {
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-orange-400";
    case 3:
      return "bg-gray-400";
    case 4:
      return "bg-green-400";
    case 5:
      return "bg-green-600";
  }
}

export function SwipeCard({
  question,
  locale,
  questionNumber,
  totalQuestions,
  dict,
  onSwipe,
  onSkip,
  canUndo,
  onUndo,
}: SwipeCardProps) {
  const controls = useAnimationControls();
  const x = useMotionValue(0);
  const rotate = useTransform(
    x,
    [-300, 0, 300],
    [-ROTATION_RANGE, 0, ROTATION_RANGE],
  );
  const opacity = useTransform(
    x,
    [-300, -100, 0, 100, 300],
    [0.5, 1, 1, 1, 0.5],
  );

  const [currentLikert, setCurrentLikert] = useState<LikertValue>(3);
  const [isDragging, setIsDragging] = useState(false);
  const [hasPlayedHint, setHasPlayedHint] = useState(false);

  useEffect(() => {
    if (questionNumber === 1 && !hasPlayedHint) {
      const playHintAnimation = async () => {
        await new Promise((r) => setTimeout(r, 500));
        await controls.start({
          x: -60,
          rotate: -8,
          transition: { duration: 0.4 },
        });
        await controls.start({
          x: 60,
          rotate: 8,
          transition: { duration: 0.5, delay: 0.33 },
        });
        await controls.start({
          x: 0,
          rotate: 0,
          transition: { duration: 0.3, delay: 0.6 },
        });
        setHasPlayedHint(true);
      };
      playHintAnimation();
    }
  }, [questionNumber, hasPlayedHint, controls]);

  const handleDrag = useCallback((_: unknown, info: PanInfo) => {
    const value = getLikertFromDistance(info.offset.x);
    setCurrentLikert(value);
  }, []);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setIsDragging(false);
      const absX = Math.abs(info.offset.x);

      if (absX > SWIPE_THRESHOLD) {
        const value = getLikertFromDistance(info.offset.x);
        onSwipe(value);
      }
    },
    [onSwipe],
  );

  const handleNeutralTap = useCallback(() => {
    onSwipe(3);
  }, [onSwipe]);

  const handleButtonSelect = useCallback(
    (value: LikertValue) => {
      onSwipe(value);
    },
    [onSwipe],
  );

  return (
    <div className="relative w-full mx-auto">
      <div className="relative h-[400px] flex items-center justify-center">
        {isDragging && (
          <div className="absolute top-0 flex items-center justify-center pointer-events-none z-20">
            <div
              className={`px-6 py-3 rounded-full text-white font-bold text-lg ${getLikertColor(currentLikert)}`}
            >
              {getLikertLabel(currentLikert, dict)}
            </div>
          </div>
        )}

        <motion.div
          className="absolute w-full cursor-grab active:cursor-grabbing"
          style={{ x, rotate, opacity }}
          animate={controls}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.9}
          onDragStart={() => setIsDragging(true)}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 1.02 }}
        >
          <Card className="w-full shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-center leading-relaxed mb-6">
                {question.title[locale]}
              </h2>

              <div className="flex justify-between text-xs text-muted-foreground px-2 mb-2">
                <span>← {dict.swipeLeft}</span>
                <span>{dict.swipeRight} →</span>
              </div>

              <div className="flex justify-center gap-1 mb-4">
                {([1, 2, 3, 4, 5] as LikertValue[]).map((v) => (
                  <div
                    key={v}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentLikert === v && isDragging
                        ? getLikertColor(v)
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleNeutralTap}
              >
                {dict.neutral}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 필요없어서 주석처리 */}
      {/* <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex justify-between w-full text-xs text-muted-foreground px-1">
          <span>{dict.stronglyDisagree}</span>
          <span>{dict.stronglyAgree}</span>
        </div>
        <div className="flex justify-center gap-2">
          {([1, 2, 3, 4, 5] as LikertValue[]).map((v) => (
            <Button
              key={v}
              variant="outline"
              size="sm"
              className={`w-10 h-10 rounded-full text-xs ${getLikertColor(v)} text-white border-0 hover:opacity-80 transition-opacity`}
              onClick={() => handleButtonSelect(v)}
              aria-label={getLikertLabel(v, dict)}
            >
              {v}
            </Button>
          ))}
        </div>
      </div> */}

      <div className="flex justify-center gap-4 mt-6">
        {canUndo && (
          <Button variant="ghost" size="sm" onClick={onUndo}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Undo
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onSkip}>
          <SkipForward className="w-4 h-4 mr-1" />
          {dict.skip}
        </Button>
      </div>
    </div>
  );
}
