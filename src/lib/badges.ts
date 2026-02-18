import type { UserAnswer } from "./questions";

const BADGES_STORAGE_KEY = "earned_badges";

export type BadgeId =
  | "consensus-whisperer"
  | "contrarian-radar"
  | "reality-check"
  | "illusion-breaker"
  | "streak-master"
  | "explorer";

export interface Badge {
  id: BadgeId;
  emoji: string;
  condition: (context: BadgeContext) => boolean;
}

export interface BadgeContext {
  answers: UserAnswer[];
  streak: number;
  totalQuizzes: number;
}

export interface EarnedBadge {
  id: BadgeId;
  earnedAt: string;
}

const BADGE_DEFINITIONS: Badge[] = [
  {
    id: "consensus-whisperer",
    emoji: "🎯",
    condition: (ctx) => {
      const accurateGuesses = ctx.answers.filter(
        (a) => Math.abs(a.difference) <= 10,
      );
      return accurateGuesses.length >= 3;
    },
  },
  {
    id: "contrarian-radar",
    emoji: "🔮",
    condition: (ctx) => {
      const bigMisses = ctx.answers.filter((a) => Math.abs(a.difference) >= 30);
      return bigMisses.length >= 2;
    },
  },
  {
    id: "reality-check",
    emoji: "👁️",
    condition: (ctx) => ctx.totalQuizzes >= 1,
  },
  {
    id: "illusion-breaker",
    emoji: "💥",
    condition: (ctx) => ctx.totalQuizzes >= 5,
  },
  {
    id: "streak-master",
    emoji: "🔥",
    condition: (ctx) => ctx.streak >= 7,
  },
  {
    id: "explorer",
    emoji: "🧭",
    condition: (ctx) => ctx.answers.length >= 10,
  },
];

export function evaluateBadges(context: BadgeContext): BadgeId[] {
  const newBadges: BadgeId[] = [];

  for (const badge of BADGE_DEFINITIONS) {
    if (badge.condition(context)) {
      newBadges.push(badge.id);
    }
  }

  return newBadges;
}

export function getEarnedBadges(): EarnedBadge[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(BADGES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveBadges(badgeIds: BadgeId[]): EarnedBadge[] {
  if (typeof window === "undefined") return [];

  const existing = getEarnedBadges();
  const existingIds = new Set(existing.map((b) => b.id));

  const newBadges: EarnedBadge[] = badgeIds
    .filter((id) => !existingIds.has(id))
    .map((id) => ({
      id,
      earnedAt: new Date().toISOString(),
    }));

  const allBadges = [...existing, ...newBadges];
  localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(allBadges));

  return newBadges;
}

export function getBadgeInfo(badgeId: BadgeId): Badge | undefined {
  return BADGE_DEFINITIONS.find((b) => b.id === badgeId);
}

export function getTotalQuizCount(): number {
  if (typeof window === "undefined") return 0;

  try {
    const stored = localStorage.getItem("quiz_count");
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

export function incrementQuizCount(): number {
  if (typeof window === "undefined") return 0;

  const current = getTotalQuizCount();
  const newCount = current + 1;
  localStorage.setItem("quiz_count", String(newCount));
  return newCount;
}
