"use client";

import { ChevronDown, ChevronUp, Users } from "lucide-react";
import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Locale } from "@/dictionaries";
import type { QuestionData } from "@/lib/questions";
import type { QuestionStats } from "@/lib/supabase";

interface RevealCardProps {
  question: QuestionData;
  locale: Locale;
  guessedPercentage: number;
  isLastQuestion: boolean;
  communityStats?: QuestionStats | null;
  isLoadingStats?: boolean;
  dict: {
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
  onNext: () => void;
}

export function RevealCard({
  question,
  locale,
  guessedPercentage,
  isLastQuestion,
  communityStats,
  isLoadingStats,
  dict,
  onNext,
}: RevealCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const difference = guessedPercentage - question.actualPercentage;
  const absDifference = Math.abs(difference);
  const hasDetailedInsight = !!question.detailedInsight?.[locale];

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl sm:text-2xl leading-relaxed">
          {question.title[locale]}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{dict.yourGuess}</span>
              <span className="font-medium">{guessedPercentage}%</span>
            </div>
            <AnimatedProgress value={guessedPercentage} duration={0.5} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{dict.actual}</span>
              <AnimatedNumber
                value={question.actualPercentage}
                suffix="%"
                className="font-bold text-primary"
                duration={0.8}
              />
            </div>
            <AnimatedProgress
              value={question.actualPercentage}
              delay={0.3}
              snap
              barClassName="bg-primary"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" />
                {dict.communityGuess}
              </span>
              {isLoadingStats ? (
                <span className="text-muted-foreground text-xs">...</span>
              ) : communityStats?.isVisible ? (
                <span className="font-medium text-blue-600">
                  <AnimatedNumber
                    value={communityStats.averageGuess ?? 0}
                    suffix="%"
                    duration={0.8}
                  />
                  <span className="text-xs text-muted-foreground ml-1">
                    ({communityStats.voteCount} {dict.communityVotes})
                  </span>
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {dict.communityProgress.replace(
                    "{current}",
                    String(communityStats?.voteCount ?? 0),
                  )}
                </span>
              )}
            </div>
            {communityStats?.isVisible ? (
              <AnimatedProgress
                value={communityStats.averageGuess ?? 0}
                className="bg-blue-100"
                barClassName="bg-blue-500"
                delay={0.6}
              />
            ) : (
              <div className="relative">
                <div className="h-3 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded-full blur-sm opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="h-3 bg-blue-300 rounded-full"
                    style={{
                      width: `${((communityStats?.voteCount ?? 0) / 10) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4 text-center">
          <div className="text-sm text-muted-foreground">{dict.difference}</div>
          <AnimatedNumber
            value={difference}
            prefix={difference > 0 ? "+" : ""}
            suffix="%p"
            className={`text-3xl font-bold ${absDifference < 10 ? "text-green-600" : absDifference < 25 ? "text-yellow-600" : "text-red-600"}`}
            duration={1}
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">{dict.insight}</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {question.insight[locale]}
          </p>

          {hasDetailedInsight && (
            <Collapsible open={isDetailOpen} onOpenChange={setIsDetailOpen}>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors mt-2"
                >
                  {isDetailOpen ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      {dict.showLess}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      {dict.showMore}
                    </>
                  )}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-md">
                  {question.detailedInsight?.[locale]}
                </p>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          {dict.source}:{" "}
          <a
            href={question.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            {question.source.name} ({question.source.year})
          </a>
        </div>

        <Button onClick={onNext} className="w-full" size="lg">
          {isLastQuestion ? dict.finish : dict.next}
        </Button>
      </CardContent>
    </Card>
  );
}
