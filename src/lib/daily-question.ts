import { questions } from "@/data/questions";
import type { QuestionData } from "@/lib/questions";

const STREAK_KEY = "daily-question-streak";
const LAST_PLAYED_KEY = "daily-question-last-played";
const COMPLETED_TODAY_KEY = "daily-question-completed-today";

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string | null;
  completedToday: boolean;
}

function hashDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getTodayDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function getTodaysQuestion(): QuestionData {
  const today = getTodayDateString();
  const hash = hashDate(today);
  const index = hash % questions.length;
  return questions[index];
}

export function getStreakData(): StreakData {
  if (typeof window === "undefined") {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastPlayedDate: null,
      completedToday: false,
    };
  }

  const today = getTodayDateString();
  const stored = localStorage.getItem(STREAK_KEY);
  const lastPlayed = localStorage.getItem(LAST_PLAYED_KEY);
  const completedToday = localStorage.getItem(COMPLETED_TODAY_KEY) === today;

  if (!stored) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastPlayedDate: lastPlayed,
      completedToday,
    };
  }

  try {
    const data = JSON.parse(stored);
    return {
      currentStreak: data.currentStreak || 0,
      longestStreak: data.longestStreak || 0,
      lastPlayedDate: lastPlayed,
      completedToday,
    };
  } catch {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastPlayedDate: null,
      completedToday: false,
    };
  }
}

function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
}

export function recordDailyCompletion(): StreakData {
  if (typeof window === "undefined") {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastPlayedDate: null,
      completedToday: false,
    };
  }

  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();
  const currentData = getStreakData();

  if (currentData.completedToday) {
    return currentData;
  }

  let newStreak = 1;
  if (currentData.lastPlayedDate === yesterday) {
    newStreak = currentData.currentStreak + 1;
  }

  const newLongest = Math.max(currentData.longestStreak, newStreak);

  const newData = {
    currentStreak: newStreak,
    longestStreak: newLongest,
  };

  localStorage.setItem(STREAK_KEY, JSON.stringify(newData));
  localStorage.setItem(LAST_PLAYED_KEY, today);
  localStorage.setItem(COMPLETED_TODAY_KEY, today);

  return {
    ...newData,
    lastPlayedDate: today,
    completedToday: true,
  };
}

export function isStreakActive(): boolean {
  const data = getStreakData();
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  return data.lastPlayedDate === today || data.lastPlayedDate === yesterday;
}
