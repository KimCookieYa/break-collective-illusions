"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OnboardingExample {
  question: string;
  commonGuess: string;
  actual: string;
  insight: string;
}

interface OnboardingProps {
  dict: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    result: string;
    start: string;
    skip: string;
    examplesTitle: string;
    examplesSubtitle: string;
    tapToReveal: string;
    yourGuess: string;
    actualResult: string;
    surprised: string;
    nextExample: string;
    startQuiz: string;
    examples: {
      work: OnboardingExample;
      marriage: OnboardingExample;
      climate: OnboardingExample;
    };
  };
  onStart: () => void;
  onSkip: () => void;
}

const steps = [
  { icon: "1️⃣", key: "step1" as const },
  { icon: "2️⃣", key: "step2" as const },
  { icon: "3️⃣", key: "step3" as const },
];

const exampleKeys = ["work", "marriage", "climate"] as const;

export function Onboarding({ dict, onStart, onSkip }: OnboardingProps) {
  const [phase, setPhase] = useState<"examples" | "howto">("examples");
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentExample = dict.examples[exampleKeys[currentExampleIndex]];
  const isLastExample = currentExampleIndex === exampleKeys.length - 1;

  function handleReveal() {
    setIsRevealed(true);
  }

  function handleNextExample() {
    if (isLastExample) {
      setPhase("howto");
    } else {
      setCurrentExampleIndex((prev) => prev + 1);
      setIsRevealed(false);
    }
  }

  function handleSkipExamples() {
    setPhase("howto");
  }

  if (phase === "examples") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full"
      >
        <Card className="w-full shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Sparkles className="w-10 h-10 mx-auto text-primary mb-2" />
              </motion.div>
              <h2 className="text-xl sm:text-2xl font-bold">
                {dict.examplesTitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                {dict.examplesSubtitle}
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {exampleKeys.map((key, index) => (
                <motion.div
                  key={key}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentExampleIndex
                      ? "bg-primary"
                      : index < currentExampleIndex
                        ? "bg-primary/50"
                        : "bg-muted"
                  }`}
                  animate={{
                    scale: index === currentExampleIndex ? 1.2 : 1,
                  }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentExampleIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm sm:text-base font-medium text-center">
                    {currentExample.question}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!isRevealed ? (
                    <motion.div
                      key="hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-24 border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all"
                        onClick={handleReveal}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-muted-foreground text-sm">
                            {dict.yourGuess}: {currentExample.commonGuess}?
                          </span>
                          <span className="text-primary font-medium">
                            {dict.tapToReveal}
                          </span>
                        </div>
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="revealed"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-3"
                    >
                      <div className="bg-primary/10 rounded-lg p-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">
                          {dict.actualResult}
                        </p>
                        <motion.p
                          className="text-4xl font-bold text-primary"
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 10 }}
                        >
                          {currentExample.actual}
                        </motion.p>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3"
                      >
                        <p className="text-sm text-center">
                          <span className="font-medium">{dict.surprised}</span>{" "}
                          {currentExample.insight}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-3 pt-2">
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button
                    size="lg"
                    onClick={handleNextExample}
                    className="w-full text-lg"
                  >
                    {isLastExample ? dict.startQuiz : dict.nextExample}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkipExamples}
                className="text-muted-foreground"
              >
                {dict.skip}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <Card className="w-full shadow-xl">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            {dict.title}
          </h2>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex items-start gap-3"
              >
                <span className="text-2xl">{step.icon}</span>
                <p className="text-sm sm:text-base text-muted-foreground pt-1">
                  {dict[step.key]}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 bg-primary/10 rounded-lg p-4"
          >
            <Target className="w-6 h-6 text-primary flex-shrink-0" />
            <p className="text-sm font-medium text-primary">{dict.result}</p>
          </motion.div>

          <div className="flex flex-col gap-3 pt-2">
            <Button size="lg" onClick={onStart} className="w-full text-lg">
              {dict.start}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground"
            >
              {dict.skip}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
