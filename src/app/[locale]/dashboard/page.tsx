"use client";

import { ExternalLink, Filter, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DemographicsForm } from "@/components/demographics/DemographicsForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import type { Locale } from "@/dictionaries";
import type { QuestionData } from "@/lib/questions";
import { type QuestionStats, supabase } from "@/lib/supabase";

type CategoryFilter = "all" | QuestionData["category"];

const categoryColors: Record<QuestionData["category"], string> = {
  social: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  political: "bg-red-100 text-red-800 hover:bg-red-200",
  workplace: "bg-green-100 text-green-800 hover:bg-green-200",
  values: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  lifestyle: "bg-gray-100 text-gray-800 hover:bg-gray-200",
};

const dict = {
  ko: {
    title: "모든 질문 보기",
    subtitle: "집단 착각 통계 대시보드",
    totalQuestions: "개 질문",
    category: {
      all: "전체",
      social: "사회",
      political: "정치",
      workplace: "직장",
      values: "가치관",
      lifestyle: "라이프스타일",
    },
    card: {
      actualStat: "실제 통계",
      communityGuess: "커뮤니티 추측",
      participants: "명 참여",
      notEnoughData: "데이터 수집 중",
      source: "출처",
    },
    empty: "선택한 카테고리에 질문이 없습니다",
    backToQuiz: "퀴즈로 돌아가기",
    home: "홈",
    demographics: {
      title: "인구통계 비교",
      subtitle: "비슷한 그룹과 결과를 비교해보세요",
      ageGroup: "연령대",
      gender: "성별",
      optional: "(선택사항)",
      save: "저장",
    },
  },
  en: {
    title: "All Questions",
    subtitle: "Collective Illusion Statistics Dashboard",
    totalQuestions: "questions",
    category: {
      all: "All",
      social: "Social",
      political: "Political",
      workplace: "Workplace",
      values: "Values",
      lifestyle: "Lifestyle",
    },
    card: {
      actualStat: "Actual Statistics",
      communityGuess: "Community Guess",
      participants: "participants",
      notEnoughData: "Collecting data",
      source: "Source",
    },
    empty: "No questions in this category",
    backToQuiz: "Back to Quiz",
    home: "Home",
    demographics: {
      title: "Demographic Comparison",
      subtitle: "Compare results with similar groups",
      ageGroup: "Age Group",
      gender: "Gender",
      optional: "(optional)",
      save: "Save",
    },
  },
};

export default function DashboardPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || "ko";
  const t = dict[locale];

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [allStats, setAllStats] = useState<Record<string, QuestionStats>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllStats() {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await supabase
          .from("votes")
          .select("question_id, guessed_percentage");

        if (data) {
          const statsMap: Record<
            string,
            { total: number; count: number; isVisible: boolean }
          > = {};

          for (const vote of data) {
            if (!statsMap[vote.question_id]) {
              statsMap[vote.question_id] = {
                total: 0,
                count: 0,
                isVisible: false,
              };
            }
            statsMap[vote.question_id].total += vote.guessed_percentage;
            statsMap[vote.question_id].count += 1;
            statsMap[vote.question_id].isVisible =
              statsMap[vote.question_id].count >= 10;
          }

          const result: Record<string, QuestionStats> = {};
          for (const [questionId, stats] of Object.entries(statsMap)) {
            result[questionId] = {
              questionId,
              voteCount: stats.count,
              averageGuess: Math.round(stats.total / stats.count),
              isVisible: stats.isVisible,
            };
          }
          setAllStats(result);
        }
      } catch {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllStats();
  }, []);

  const filteredQuestions = useMemo(() => {
    if (categoryFilter === "all") return questions;
    return questions.filter((q) => q.category === categoryFilter);
  }, [categoryFilter]);

  const categories: CategoryFilter[] = [
    "all",
    "social",
    "political",
    "workplace",
    "values",
    "lifestyle",
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="w-full space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
          <p className="text-sm text-muted-foreground">
            {questions.length} {t.totalQuestions}
          </p>
        </header>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={categoryFilter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(cat)}
              className="flex-shrink-0"
            >
              {t.category[cat === "all" ? "all" : cat]}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {t.empty}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((question) => {
              const stats = allStats[question.id];

              return (
                <Card key={question.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-relaxed">
                        {question.title[locale]}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className={`flex-shrink-0 ${categoryColors[question.category]}`}
                      >
                        {t.category[question.category]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {t.card.actualStat}
                          </span>
                          <span className="font-bold text-primary">
                            {question.actualPercentage}%
                          </span>
                        </div>
                        <Progress
                          value={question.actualPercentage}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {t.card.communityGuess}
                          </span>
                          {stats?.isVisible ? (
                            <span className="font-medium text-blue-600">
                              {stats.averageGuess}%
                              <span className="text-xs text-muted-foreground ml-1">
                                ({stats.voteCount} {t.card.participants})
                              </span>
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              {t.card.notEnoughData}
                              {stats?.voteCount
                                ? ` (${stats.voteCount}/10)`
                                : ""}
                            </span>
                          )}
                        </div>
                        {stats?.isVisible && (
                          <Progress
                            value={stats.averageGuess ?? 0}
                            className="h-2 bg-blue-100"
                          />
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {question.insight[locale]}
                    </p>

                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      {t.card.source}:{" "}
                      <a
                        href={question.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground inline-flex items-center gap-0.5"
                      >
                        {question.source.name} ({question.source.year})
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <DemographicsForm locale={locale} dict={t.demographics} />

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild className="flex-1">
            <Link href={`/${locale}/quiz`}>{t.backToQuiz}</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/${locale}`}>{t.home}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
