"use client";

import { useCallback, useState } from "react";
import { getCurrentCohortId } from "@/lib/cohort";
import { getFingerprint } from "@/lib/fingerprint";
import { supabase } from "@/lib/supabase";

interface UseVoteOptions {
  questionId: string;
  locale: string;
}

interface UseVoteReturn {
  submitVote: (userGuess: number) => Promise<boolean>;
  isSubmitting: boolean;
  error: string | null;
  hasVoted: boolean;
}

export function useVote({ questionId, locale }: UseVoteOptions): UseVoteReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const submitVote = useCallback(
    async (userGuess: number): Promise<boolean> => {
      if (hasVoted) return true;

      setIsSubmitting(true);
      setError(null);

      try {
        const fingerprint = await getFingerprint();
        const cohortId = getCurrentCohortId();

        const { error: insertError } = await supabase.from("votes").insert({
          question_id: questionId,
          fingerprint,
          user_guess: userGuess,
          locale,
          cohort_id: cohortId,
        });

        if (insertError) {
          if (insertError.code === "23505") {
            setHasVoted(true);
            return true;
          }
          setError(insertError.message);
          return false;
        }

        setHasVoted(true);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to submit vote");
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [questionId, locale, hasVoted],
  );

  return { submitVote, isSubmitting, error, hasVoted };
}
