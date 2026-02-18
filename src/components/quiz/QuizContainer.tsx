"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { questions as allQuestions } from "@/data/questions";
import type { Locale } from "@/dictionaries";
import { useVote, useVoteStats } from "@/hooks";
import type { LikertValue, UserAnswer } from "@/lib/questions";
import { DistributionBar } from "./DistributionBar";
import { Onboarding } from "./Onboarding";
import { QuizProgress } from "./QuizProgress";
import { RevealCard } from "./RevealCard";
import { SwipeCard } from "./SwipeCard";

const QUESTIONS_PER_SESSION = 3;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type QuizStep = "onboarding" | "opinion" | "distribution" | "reveal";

interface HistoryEntry {
  questionIndex: number;
  myOpinion: LikertValue;
  guessedPercentage?: number;
}

interface QuizContainerProps {
  locale: Locale;
  dict: {
    quiz: {
      questionPrefix: string;
      of: string;
      yourGuess: string;
      submit: string;
      next: string;
      finish: string;
      timeRemaining: string;
      halfwayBoost: string;
      almostDone: string;
    };
    swipe: {
      swipeLeft: string;
      swipeRight: string;
      neutral: string;
      skip: string;
      undo: string;
      stronglyDisagree: string;
      disagree: string;
      agree: string;
      stronglyAgree: string;
      dragHint: string;
    };
    distribution: {
      prompt: string;
      confirm: string;
      dragHint: string;
      disagree: string;
      agree: string;
      willAgree: string;
    };
    reveal: {
      actual: string;
      yourGuess: string;
      difference: string;
      source: string;
      insight: string;
      next: string;
      finish: string;
      communityGuess: string;
      communityVotes: string;
      communityHidden: string;
      communityProgress: string;
      showMore: string;
      showLess: string;
    };
    onboarding: {
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
        work: {
          question: string;
          commonGuess: string;
          actual: string;
          insight: string;
        };
        marriage: {
          question: string;
          commonGuess: string;
          actual: string;
          insight: string;
        };
        climate: {
          question: string;
          commonGuess: string;
          actual: string;
          insight: string;
        };
      };
    };
  };
}

export function QuizContainer({ locale, dict }: QuizContainerProps) {
  const router = useRouter();

  const [sessionQuestions] = useState(() =>
    shuffleArray(allQuestions).slice(0, QUESTIONS_PER_SESSION),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<QuizStep>("onboarding");
  const [currentOpinion, setCurrentOpinion] = useState<LikertValue | null>(
    null,
  );
  const [currentGuess, setCurrentGuess] = useState(50);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const currentQuestion = sessionQuestions[currentIndex];
  const isLastQuestion = currentIndex === sessionQuestions.length - 1;
  const totalQuestions = sessionQuestions.length;

  const remainingQuestions = totalQuestions - currentIndex;
  const timeRemaining = Math.ceil(remainingQuestions * 0.17);
  const timeRemainingText = dict.quiz.timeRemaining.replace(
    "{time}",
    String(timeRemaining),
  );

  const boostMessage = useMemo(() => {
    const progress = (currentIndex + 1) / totalQuestions;
    if (progress >= 0.5 && progress < 0.7) {
      return dict.quiz.halfwayBoost;
    }
    if (progress >= 0.85) {
      return dict.quiz.almostDone;
    }
    return undefined;
  }, [currentIndex, totalQuestions, dict.quiz]);

  const { submitVote } = useVote({
    questionId: currentQuestion.id,
    locale,
  });

  const {
    stats: communityStats,
    isLoading: isLoadingStats,
    refetch,
  } = useVoteStats(currentQuestion.id);

  useEffect(() => {
    if (step === "reveal") {
      refetch();
    }
  }, [step, refetch]);

  const handleSwipe = useCallback(
    (value: LikertValue) => {
      setCurrentOpinion(value);

      setHistory((prev) => [
        ...prev,
        { questionIndex: currentIndex, myOpinion: value },
      ]);

      setStep("distribution");
    },
    [currentIndex],
  );

  const handleSkip = useCallback(() => {
    if (isLastQuestion) {
      const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
      router.push(`/${locale}/result?data=${encodedAnswers}`);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setStep("opinion");
      setCurrentOpinion(null);
      setCurrentGuess(50);
    }
  }, [isLastQuestion, answers, locale, router]);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;

    const lastEntry = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));

    if (answers.length > 0) {
      const lastAnswer = answers[answers.length - 1];
      if (lastAnswer.questionId !== currentQuestion.id || step !== "opinion") {
        setAnswers((prev) => prev.slice(0, -1));
      }
    }

    setCurrentIndex(lastEntry.questionIndex);
    setCurrentOpinion(lastEntry.myOpinion);

    if (lastEntry.guessedPercentage !== undefined) {
      setCurrentGuess(lastEntry.guessedPercentage);
      setStep("distribution");
    } else {
      setStep("opinion");
    }
  }, [history, answers, currentQuestion.id, step]);

  const handleDistributionConfirm = useCallback(
    async (percentage: number) => {
      setCurrentGuess(percentage);

      setHistory((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1].guessedPercentage = percentage;
        }
        return updated;
      });

      await submitVote(percentage);
      setStep("reveal");
    },
    [submitVote],
  );

  const handleRevealNext = useCallback(() => {
    if (currentOpinion === null) return;

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      myOpinion: currentOpinion,
      guessedPercentage: currentGuess,
      actualPercentage: currentQuestion.actualPercentage,
      difference: currentGuess - currentQuestion.actualPercentage,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    if (isLastQuestion) {
      const allAnswers = [...answers, newAnswer];
      const encodedAnswers = encodeURIComponent(JSON.stringify(allAnswers));
      router.push(`/${locale}/result?data=${encodedAnswers}`);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setStep("opinion");
      setCurrentOpinion(null);
      setCurrentGuess(50);
    }
  }, [
    currentOpinion,
    currentGuess,
    currentQuestion,
    isLastQuestion,
    answers,
    locale,
    router,
  ]);

  const handleOnboardingStart = useCallback(() => {
    setStep("opinion");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full">
        {step !== "onboarding" && (
          <QuizProgress
            current={currentIndex + 1}
            total={totalQuestions}
            timeRemainingText={timeRemainingText}
            boostMessage={boostMessage}
          />
        )}

        <AnimatePresence mode="wait">
          {step === "onboarding" && (
            <Onboarding
              dict={dict.onboarding}
              onStart={handleOnboardingStart}
              onSkip={handleOnboardingStart}
            />
          )}

          {step === "opinion" && (
            <motion.div
              key={`opinion-${currentQuestion.id}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <SwipeCard
                question={currentQuestion}
                locale={locale}
                questionNumber={currentIndex + 1}
                totalQuestions={totalQuestions}
                dict={dict.swipe}
                onSwipe={handleSwipe}
                onSkip={handleSkip}
                canUndo={history.length > 0}
                onUndo={handleUndo}
              />
            </motion.div>
          )}

          {step === "distribution" && (
            <motion.div
              key={`distribution-${currentQuestion.id}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <DistributionBar
                question={currentQuestion}
                locale={locale}
                initialValue={50}
                dict={dict.distribution}
                onConfirm={handleDistributionConfirm}
              />
            </motion.div>
          )}

          {step === "reveal" && (
            <motion.div
              key={`reveal-${currentQuestion.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <RevealCard
                question={currentQuestion}
                locale={locale}
                guessedPercentage={currentGuess}
                isLastQuestion={isLastQuestion}
                communityStats={communityStats}
                isLoadingStats={isLoadingStats}
                dict={dict.reveal}
                onNext={handleRevealNext}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
