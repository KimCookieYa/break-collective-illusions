"use client";

import { useCallback, useEffect, useState } from "react";
import { type QuestionStats, supabase } from "@/lib/supabase";

const MIN_VOTES_FOR_VISIBILITY = 10;

interface UseVoteStatsReturn {
  stats: QuestionStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useVoteStats(questionId: string): UseVoteStatsReturn {
  const [stats, setStats] = useState<QuestionStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from("votes")
        .select("user_guess")
        .eq("question_id", questionId);

      if (queryError) {
        setError(queryError.message);
        return;
      }

      const voteCount = data?.length ?? 0;
      const averageGuess =
        voteCount > 0
          ? Math.round(
              (data.reduce((sum, v) => sum + v.user_guess, 0) / voteCount) * 10,
            ) / 10
          : null;

      setStats({
        questionId,
        voteCount,
        averageGuess:
          voteCount >= MIN_VOTES_FOR_VISIBILITY ? averageGuess : null,
        isVisible: voteCount >= MIN_VOTES_FOR_VISIBILITY,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stats");
    } finally {
      setIsLoading(false);
    }
  }, [questionId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats };
}

interface UseAllVoteStatsReturn {
  statsMap: Map<string, QuestionStats>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAllVoteStats(questionIds: string[]): UseAllVoteStatsReturn {
  const [statsMap, setStatsMap] = useState<Map<string, QuestionStats>>(
    new Map(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllStats = useCallback(async () => {
    if (questionIds.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from("votes")
        .select("question_id, user_guess")
        .in("question_id", questionIds);

      if (queryError) {
        setError(queryError.message);
        return;
      }

      const grouped = new Map<string, number[]>();
      for (const id of questionIds) {
        grouped.set(id, []);
      }

      for (const vote of data ?? []) {
        const existing = grouped.get(vote.question_id) ?? [];
        existing.push(vote.user_guess);
        grouped.set(vote.question_id, existing);
      }

      const newStatsMap = new Map<string, QuestionStats>();
      for (const [questionId, guesses] of grouped) {
        const voteCount = guesses.length;
        const averageGuess =
          voteCount > 0
            ? Math.round(
                (guesses.reduce((a, b) => a + b, 0) / voteCount) * 10,
              ) / 10
            : null;

        newStatsMap.set(questionId, {
          questionId,
          voteCount,
          averageGuess:
            voteCount >= MIN_VOTES_FOR_VISIBILITY ? averageGuess : null,
          isVisible: voteCount >= MIN_VOTES_FOR_VISIBILITY,
        });
      }

      setStatsMap(newStatsMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stats");
    } finally {
      setIsLoading(false);
    }
  }, [questionIds]);

  useEffect(() => {
    fetchAllStats();
  }, [fetchAllStats]);

  return { statsMap, isLoading, error, refetch: fetchAllStats };
}
