export type LikertValue = 1 | 2 | 3 | 4 | 5;

export interface QuestionData {
  id: string;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  actualPercentage: number;
  source: {
    name: string;
    url: string;
    year: number;
  };
  insight: {
    ko: string;
    en: string;
  };
  detailedInsight?: {
    ko: string;
    en: string;
  };
  category: "social" | "political" | "workplace" | "values" | "lifestyle";
}

export interface UserAnswer {
  questionId: string;
  myOpinion: LikertValue;
  guessedPercentage: number;
  actualPercentage: number;
  difference: number;
}

export interface QuizResult {
  answers: UserAnswer[];
  averageError: number;
  illusionLevel: "low" | "medium" | "high";
}

export function calculateIllusionLevel(
  averageError: number,
): "low" | "medium" | "high" {
  if (averageError < 10) return "low";
  if (averageError < 25) return "medium";
  return "high";
}

export function calculateAverageError(answers: UserAnswer[]): number {
  if (answers.length === 0) return 0;
  const totalError = answers.reduce(
    (sum, answer) => sum + Math.abs(answer.difference),
    0,
  );
  return Math.round(totalError / answers.length);
}

export type PersonalityType =
  | "optimist"
  | "pessimist"
  | "realist"
  | "contrarian";

export interface PersonalityResult {
  type: PersonalityType;
  score: number;
}

export function calculatePersonalityType(
  answers: UserAnswer[],
): PersonalityResult {
  if (answers.length === 0) {
    return { type: "realist", score: 0 };
  }

  let overestimateCount = 0;
  let underestimateCount = 0;
  let accurateCount = 0;
  let totalBias = 0;

  for (const answer of answers) {
    totalBias += answer.difference;

    if (answer.difference > 10) {
      overestimateCount++;
    } else if (answer.difference < -10) {
      underestimateCount++;
    } else {
      accurateCount++;
    }
  }

  const avgBias = totalBias / answers.length;
  const accuracyRate = accurateCount / answers.length;

  if (accuracyRate >= 0.6) {
    return { type: "realist", score: Math.round(accuracyRate * 100) };
  }

  if (avgBias > 15) {
    return { type: "pessimist", score: Math.round(Math.abs(avgBias)) };
  }

  if (avgBias < -15) {
    return { type: "optimist", score: Math.round(Math.abs(avgBias)) };
  }

  if (
    overestimateCount > 0 &&
    underestimateCount > 0 &&
    Math.min(overestimateCount, underestimateCount) /
      Math.max(overestimateCount, underestimateCount) >
      0.5
  ) {
    return { type: "contrarian", score: Math.round((1 - accuracyRate) * 100) };
  }

  if (avgBias > 0) {
    return { type: "pessimist", score: Math.round(avgBias) };
  }
  return { type: "optimist", score: Math.round(Math.abs(avgBias)) };
}
