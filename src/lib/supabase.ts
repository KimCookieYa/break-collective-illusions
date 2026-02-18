import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_PUBLIC_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Vote {
  id: string;
  question_id: string;
  fingerprint: string;
  user_guess: number;
  locale: string;
  cohort_id?: string | null;
  created_at: string;
}

export interface QuestionStats {
  questionId: string;
  voteCount: number;
  averageGuess: number | null;
  isVisible: boolean;
}

export interface CohortStats {
  cohortId: string;
  memberCount: number;
  questionStats: Map<string, QuestionStats>;
}

export async function getCohortStats(cohortId: string): Promise<CohortStats> {
  const { data, error } = await supabase
    .from("votes")
    .select("question_id, user_guess, fingerprint")
    .eq("cohort_id", cohortId);

  if (error || !data) {
    return {
      cohortId,
      memberCount: 0,
      questionStats: new Map(),
    };
  }

  const uniqueMembers = new Set(data.map((v) => v.fingerprint));
  const questionGroups = new Map<string, number[]>();

  for (const vote of data) {
    const existing = questionGroups.get(vote.question_id) || [];
    existing.push(vote.user_guess);
    questionGroups.set(vote.question_id, existing);
  }

  const questionStats = new Map<string, QuestionStats>();
  for (const [questionId, guesses] of questionGroups) {
    const avg = guesses.reduce((a, b) => a + b, 0) / guesses.length;
    questionStats.set(questionId, {
      questionId,
      voteCount: guesses.length,
      averageGuess: avg,
      isVisible: guesses.length >= 3,
    });
  }

  return {
    cohortId,
    memberCount: uniqueMembers.size,
    questionStats,
  };
}
