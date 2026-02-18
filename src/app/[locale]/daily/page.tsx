"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Flame, Trophy } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DistributionBar } from "@/components/quiz/DistributionBar";
import { RevealCard } from "@/components/quiz/RevealCard";
import { SwipeCard } from "@/components/quiz/SwipeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/dictionaries";
import { useVote, useVoteStats } from "@/hooks";
import {
  getStreakData,
  getTodaysQuestion,
  recordDailyCompletion,
  type StreakData,
} from "@/lib/daily-question";
import type { LikertValue, QuestionData } from "@/lib/questions";

type DailyStep = "intro" | "opinion" | "distribution" | "reveal" | "complete";

const dict = {
  ko: {
    title: "오늘의 질문",
    subtitle: "매일 하나의 집단 착각을 깨보세요",
    currentStreak: "연속",
    days: "일",
    longestStreak: "최장 기록",
    startButton: "오늘의 질문 시작",
    alreadyCompleted: "오늘은 이미 완료했어요!",
    comeBackTomorrow: "내일 새로운 질문이 기다립니다",
    streakKept: "스트릭 유지 중!",
    newStreak: "새로운 스트릭 시작!",
    congratulations: "축하해요!",
    streakMessage: "일 연속 참여!",
    backToHome: "홈으로",
    tryFullQuiz: "전체 퀴즈 도전하기",
    swipe: {
      swipeLeft: "반대",
      swipeRight: "동의",
      neutral: "보통이에요",
      skip: "패스",
      undo: "되돌리기",
      stronglyDisagree: "매우 반대",
      disagree: "반대",
      agree: "동의",
      stronglyAgree: "매우 동의",
      dragHint: "좌우로 스와이프하거나 버튼을 눌러주세요",
    },
    distribution: {
      prompt: "다른 사람들 중 몇 %가 동의할까요?",
      confirm: "확인하기",
      dragHint: "바를 드래그하거나 탭해서 조절하세요",
      disagree: "반대",
      agree: "동의",
      willAgree: "동의할 것이다",
    },
    reveal: {
      actual: "실제 통계",
      yourGuess: "당신의 추측",
      difference: "차이",
      source: "출처",
      insight: "인사이트",
      next: "완료",
      finish: "완료",
      communityGuess: "커뮤니티 평균 추측",
      communityVotes: "명 참여",
      communityHidden: "10명 이상 참여 시 공개",
      communityProgress: "{current}명 참여 중 (10명 필요)",
      showMore: "자세히 보기",
      showLess: "접기",
    },
  },
  en: {
    title: "Daily Question",
    subtitle: "Break one collective illusion every day",
    currentStreak: "streak",
    days: "days",
    longestStreak: "Best",
    startButton: "Start Today's Question",
    alreadyCompleted: "You've already completed today!",
    comeBackTomorrow: "A new question awaits tomorrow",
    streakKept: "Streak maintained!",
    newStreak: "New streak started!",
    congratulations: "Congratulations!",
    streakMessage: " day streak!",
    backToHome: "Home",
    tryFullQuiz: "Try Full Quiz",
    swipe: {
      swipeLeft: "Disagree",
      swipeRight: "Agree",
      neutral: "Neutral",
      skip: "Skip",
      undo: "Undo",
      stronglyDisagree: "Strongly Disagree",
      disagree: "Disagree",
      agree: "Agree",
      stronglyAgree: "Strongly Agree",
      dragHint: "Swipe or tap the buttons",
    },
    distribution: {
      prompt: "What % of people do you think agree?",
      confirm: "Confirm",
      dragHint: "Drag or tap the bar to adjust",
      disagree: "Disagree",
      agree: "Agree",
      willAgree: "will agree",
    },
    reveal: {
      actual: "Actual Statistics",
      yourGuess: "Your Guess",
      difference: "Difference",
      source: "Source",
      insight: "Insight",
      next: "Done",
      finish: "Done",
      communityGuess: "Community Average",
      communityVotes: "participants",
      communityHidden: "Visible after 10 participants",
      communityProgress: "{current} participating (10 needed)",
      showMore: "Show more",
      showLess: "Show less",
    },
  },
};

function StreakDisplay({
  streak,
  locale,
}: {
  streak: StreakData;
  locale: Locale;
}) {
  const t = dict[locale];

  return (
    <div className="flex items-center justify-center gap-6 py-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-orange-500">
          <Flame className="h-6 w-6" />
          <span className="text-2xl font-bold">{streak.currentStreak}</span>
        </div>
        <span className="text-xs text-muted-foreground">{t.currentStreak}</span>
      </div>
      <div className="h-8 w-px bg-border" />
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-yellow-500">
          <Trophy className="h-5 w-5" />
          <span className="text-xl font-bold">{streak.longestStreak}</span>
        </div>
        <span className="text-xs text-muted-foreground">{t.longestStreak}</span>
      </div>
    </div>
  );
}

export default function DailyQuestionPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || "ko";
  const t = dict[locale];

  const [step, setStep] = useState<DailyStep>("intro");
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: null,
    completedToday: false,
  });
  const [_currentOpinion, setCurrentOpinion] = useState<LikertValue | null>(
    null,
  );
  const [currentGuess, setCurrentGuess] = useState(50);
  const [question, setQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
    setQuestion(getTodaysQuestion());
    const data = getStreakData();
    setStreak(data);
    if (data.completedToday) {
      setStep("complete");
    }
  }, []);

  const { submitVote } = useVote({
    questionId: question?.id ?? "",
    locale,
  });

  const {
    stats: communityStats,
    isLoading: isLoadingStats,
    refetch,
  } = useVoteStats(question?.id ?? "");

  useEffect(() => {
    if (step === "reveal") {
      refetch();
    }
  }, [step, refetch]);

  const handleStart = useCallback(() => {
    setStep("opinion");
  }, []);

  const handleSwipe = useCallback((value: LikertValue) => {
    setCurrentOpinion(value);
    setStep("distribution");
  }, []);

  const handleDistributionConfirm = useCallback(
    async (percentage: number) => {
      setCurrentGuess(percentage);
      await submitVote(percentage);
      setStep("reveal");
    },
    [submitVote],
  );

  const handleRevealNext = useCallback(() => {
    const newStreak = recordDailyCompletion();
    setStreak(newStreak);
    setStep("complete");
  }, []);

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Calendar className="h-6 w-6" />
                  <h1 className="text-2xl font-bold">{t.title}</h1>
                </div>
                <p className="text-muted-foreground">{t.subtitle}</p>
              </div>

              <StreakDisplay streak={streak} locale={locale} />

              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-lg font-medium">
                    {question.title[locale]}
                  </p>
                </CardContent>
              </Card>

              <Button onClick={handleStart} className="w-full" size="lg">
                {t.startButton}
              </Button>
            </motion.div>
          )}

          {step === "opinion" && (
            <motion.div
              key="opinion"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <SwipeCard
                question={question}
                locale={locale}
                questionNumber={1}
                totalQuestions={1}
                dict={t.swipe}
                onSwipe={handleSwipe}
                onSkip={() => setStep("distribution")}
                canUndo={false}
                onUndo={() => {}}
              />
            </motion.div>
          )}

          {step === "distribution" && (
            <motion.div
              key="distribution"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <DistributionBar
                question={question}
                locale={locale}
                initialValue={50}
                dict={t.distribution}
                onConfirm={handleDistributionConfirm}
              />
            </motion.div>
          )}

          {step === "reveal" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <RevealCard
                question={question}
                locale={locale}
                guessedPercentage={currentGuess}
                isLastQuestion={true}
                communityStats={communityStats}
                isLoadingStats={isLoadingStats}
                dict={t.reveal}
                onNext={handleRevealNext}
              />
            </motion.div>
          )}

          {step === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl"
              >
                🎉
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{t.congratulations}</h2>
                <p className="text-lg text-muted-foreground">
                  <span className="text-orange-500 font-bold">
                    {streak.currentStreak}
                  </span>
                  {t.streakMessage}
                </p>
              </div>

              <StreakDisplay streak={streak} locale={locale} />

              <div className="space-y-3 pt-4">
                <Button asChild className="w-full" size="lg">
                  <Link href={`/${locale}/quiz`}>{t.tryFullQuiz}</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/${locale}`}>{t.backToHome}</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
