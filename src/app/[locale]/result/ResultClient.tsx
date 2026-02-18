"use client";

import {
  AlertTriangle,
  Download,
  LayoutDashboard,
  Share2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BadgeDisplay } from "@/components/badges/BadgeDisplay";
import { CohortInvite } from "@/components/cohort/CohortInvite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import type { Locale } from "@/dictionaries";
import { useAllVoteStats } from "@/hooks";
import {
  type BadgeId,
  evaluateBadges,
  getEarnedBadges,
  incrementQuizCount,
  saveBadges,
} from "@/lib/badges";
import { getStreakData } from "@/lib/daily-question";
import {
  calculateAverageError,
  calculateIllusionLevel,
  calculatePersonalityType,
  type PersonalityType,
  type UserAnswer,
} from "@/lib/questions";
import { downloadShareCard, shareCardNative } from "@/lib/share-card";

interface ResultClientProps {
  locale: Locale;
  dict: {
    result: {
      title: string;
      subtitle: string;
      average: string;
      message: {
        low: string;
        medium: string;
        high: string;
      };
      restart: string;
      share: string;
      communityStats: string;
      communityAverage: string;
      participants: string;
      viewDashboard: string;
      topSurprises: string;
      surpriseRank: string;
      personalityTitle: string;
      personality: Record<
        PersonalityType,
        { title: string; description: string }
      >;
    };
    reveal: {
      yourGuess: string;
      actual: string;
      difference: string;
    };
    cohort: {
      title: string;
      createGroup: string;
      groupName: string;
      inviteLink: string;
      copyLink: string;
      copied: string;
      members: string;
      leaveGroup: string;
      yourGroup: string;
    };
    badges: {
      title: string;
      consensusWhisperer: { title: string; description: string };
      contrarianRadar: { title: string; description: string };
      realityCheck: { title: string; description: string };
      illusionBreaker: { title: string; description: string };
      streakMaster: { title: string; description: string };
      explorer: { title: string; description: string };
    };
  };
}

export function ResultClient({ locale, dict }: ResultClientProps) {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");

  const [earnedBadges, setEarnedBadges] = useState<BadgeId[]>([]);
  const [newBadges, setNewBadges] = useState<BadgeId[]>([]);

  const answers: UserAnswer[] = useMemo(() => {
    try {
      if (dataParam) {
        return JSON.parse(decodeURIComponent(dataParam));
      }
    } catch {
      return [];
    }
    return [];
  }, [dataParam]);

  const questionIds = useMemo(
    () => answers.map((a) => a.questionId),
    [answers],
  );

  const { statsMap, isLoading: isLoadingStats } = useAllVoteStats(questionIds);

  const averageError = calculateAverageError(answers);
  const illusionLevel = calculateIllusionLevel(averageError);
  const personalityResult = useMemo(
    () => calculatePersonalityType(answers),
    [answers],
  );

  const topSurprises = useMemo(() => {
    return [...answers]
      .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference))
      .slice(0, 3);
  }, [answers]);

  useEffect(() => {
    if (answers.length === 0) return;

    const totalQuizzes = incrementQuizCount();
    const streak = getStreakData();

    const badgesToEvaluate = evaluateBadges({
      answers,
      streak: streak.currentStreak,
      totalQuizzes,
    });

    const newlyEarned = saveBadges(badgesToEvaluate);
    setNewBadges(newlyEarned.map((b) => b.id));

    const allEarned = getEarnedBadges();
    setEarnedBadges(allEarned.map((b) => b.id));
  }, [answers]);

  const getMessage = () => {
    switch (illusionLevel) {
      case "low":
        return dict.result.message.low;
      case "medium":
        return dict.result.message.medium;
      case "high":
        return dict.result.message.high;
    }
  };

  const getColor = () => {
    switch (illusionLevel) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
    }
  };

  const [isGeneratingCard, setIsGeneratingCard] = useState(false);

  const shareCardOptions = useMemo(() => {
    return {
      averageError,
      illusionLevel,
      topSurprises: topSurprises.map((a) => {
        const q = questions.find((q) => q.id === a.questionId);
        return {
          title: q?.title[locale] ?? "",
          difference: a.difference,
        };
      }),
      locale,
    };
  }, [averageError, illusionLevel, topSurprises, locale]);

  const handleShareCard = useCallback(async () => {
    setIsGeneratingCard(true);
    try {
      const shared = await shareCardNative(shareCardOptions);
      if (!shared) {
        await downloadShareCard(shareCardOptions);
      }
    } finally {
      setIsGeneratingCard(false);
    }
  }, [shareCardOptions]);

  const handleShareLink = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: dict.result.title,
        text: `${dict.result.average}: ${averageError}%p`,
        url: window.location.href,
      });
    }
  }, [dict.result.title, dict.result.average, averageError]);

  if (answers.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="w-full">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No results found.</p>
            <Button asChild>
              <Link href={`/${locale}/quiz`}>Start Quiz</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl">
            {dict.result.title}
          </CardTitle>
          <p className="text-muted-foreground">{dict.result.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-6 text-center">
            <div className="text-sm text-muted-foreground">
              {dict.result.average}
            </div>
            <div className={`text-5xl font-bold ${getColor()}`}>
              {averageError}%p
            </div>
          </div>

          <p className="text-center text-muted-foreground">{getMessage()}</p>

          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">
              {dict.result.personalityTitle}
            </div>
            <div className="text-xl font-bold">
              {dict.result.personality[personalityResult.type].title}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {dict.result.personality[personalityResult.type].description}
            </p>
          </div>

          {topSurprises.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                {dict.result.topSurprises}
              </div>
              <div className="space-y-2">
                {topSurprises.map((answer, idx) => {
                  const question = questions.find(
                    (q) => q.id === answer.questionId,
                  );
                  if (!question) return null;
                  const rankEmoji = idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉";
                  return (
                    <div
                      key={answer.questionId}
                      className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 p-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{rankEmoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {question.title[locale]}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs">
                            <span className="text-muted-foreground">
                              {dict.reveal.yourGuess}:{" "}
                              {answer.guessedPercentage}%
                            </span>
                            <span className="text-muted-foreground">
                              {dict.reveal.actual}: {answer.actualPercentage}%
                            </span>
                            <span className="font-bold text-red-600">
                              {answer.difference > 0 ? "+" : ""}
                              {answer.difference}%p
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {answers.map((answer, index) => {
              const question = questions.find(
                (q) => q.id === answer.questionId,
              );
              if (!question) return null;

              return (
                <div
                  key={answer.questionId}
                  className="rounded-lg border p-4 space-y-2"
                >
                  <div className="font-medium text-sm">
                    {index + 1}. {question.title[locale]}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">
                        {dict.reveal.yourGuess}:{" "}
                      </span>
                      <span className="font-medium">
                        {answer.guessedPercentage}%
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        {dict.reveal.actual}:{" "}
                      </span>
                      <span className="font-medium">
                        {answer.actualPercentage}%
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        {dict.reveal.difference}:{" "}
                      </span>
                      <span
                        className={`font-medium ${Math.abs(answer.difference) < 10 ? "text-green-600" : Math.abs(answer.difference) < 25 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {answer.difference > 0 ? "+" : ""}
                        {answer.difference}%p
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={100 - Math.min(Math.abs(answer.difference), 50) * 2}
                    className="h-2"
                  />
                  {!isLoadingStats &&
                    statsMap.get(answer.questionId)?.isVisible && (
                      <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                        <Users className="h-3 w-3" />
                        <span>
                          {dict.result.communityAverage}:{" "}
                          {statsMap.get(answer.questionId)?.averageGuess}%
                          <span className="text-muted-foreground ml-1">
                            ({statsMap.get(answer.questionId)?.voteCount}{" "}
                            {dict.result.participants})
                          </span>
                        </span>
                      </div>
                    )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link href={`/${locale}/quiz`}>{dict.result.restart}</Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleShareCard}
              disabled={isGeneratingCard}
            >
              <Download className="h-4 w-4 mr-1" />
              {isGeneratingCard ? "..." : dict.result.share}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShareLink}
              aria-label="Share link"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <Button asChild variant="secondary" className="w-full">
            <Link
              href={`/${locale}/dashboard`}
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              {dict.result.viewDashboard}
            </Link>
          </Button>

          {earnedBadges.length > 0 && (
            <BadgeDisplay
              badgeIds={earnedBadges}
              locale={locale}
              dict={dict.badges}
              isNew={newBadges.length > 0}
            />
          )}

          <CohortInvite locale={locale} dict={dict.cohort} />
        </CardContent>
      </Card>
    </div>
  );
}
