const DEMOGRAPHICS_STORAGE_KEY = "user_demographics";

export type AgeGroup = "teens" | "20s" | "30s" | "40s" | "50s" | "60plus";
export type Gender = "male" | "female" | "other" | "prefer-not-to-say";

export interface Demographics {
  ageGroup?: AgeGroup;
  gender?: Gender;
  updatedAt: string;
}

export function saveDemographics(data: Partial<Demographics>): void {
  if (typeof window === "undefined") return;

  const existing = getDemographics();
  const updated: Demographics = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(DEMOGRAPHICS_STORAGE_KEY, JSON.stringify(updated));
}

export function getDemographics(): Demographics | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(DEMOGRAPHICS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function clearDemographics(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DEMOGRAPHICS_STORAGE_KEY);
}

export const AGE_GROUP_LABELS: Record<AgeGroup, { ko: string; en: string }> = {
  teens: { ko: "10대", en: "Teens" },
  "20s": { ko: "20대", en: "20s" },
  "30s": { ko: "30대", en: "30s" },
  "40s": { ko: "40대", en: "40s" },
  "50s": { ko: "50대", en: "50s" },
  "60plus": { ko: "60대 이상", en: "60+" },
};

export const GENDER_LABELS: Record<Gender, { ko: string; en: string }> = {
  male: { ko: "남성", en: "Male" },
  female: { ko: "여성", en: "Female" },
  other: { ko: "기타", en: "Other" },
  "prefer-not-to-say": { ko: "밝히지 않음", en: "Prefer not to say" },
};
