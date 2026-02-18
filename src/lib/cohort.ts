import { nanoid } from "nanoid";

const COHORT_STORAGE_KEY = "cohort_id";
const COHORT_NAME_KEY = "cohort_name";

export interface CohortData {
  cohortId: string;
  cohortName: string | null;
  createdAt: string;
  isOwner: boolean;
}

export function createCohort(name?: string): CohortData {
  const cohortId = nanoid(10);
  const cohortName = name || null;
  const createdAt = new Date().toISOString();

  if (typeof window !== "undefined") {
    localStorage.setItem(COHORT_STORAGE_KEY, cohortId);
    if (cohortName) {
      localStorage.setItem(COHORT_NAME_KEY, cohortName);
    }
  }

  return {
    cohortId,
    cohortName,
    createdAt,
    isOwner: true,
  };
}

export function joinCohort(cohortId: string, cohortName?: string): CohortData {
  if (typeof window !== "undefined") {
    localStorage.setItem(COHORT_STORAGE_KEY, cohortId);
    if (cohortName) {
      localStorage.setItem(COHORT_NAME_KEY, cohortName);
    }
  }

  return {
    cohortId,
    cohortName: cohortName || null,
    createdAt: new Date().toISOString(),
    isOwner: false,
  };
}

export function getCurrentCohortId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(COHORT_STORAGE_KEY);
}

export function getCurrentCohortName(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(COHORT_NAME_KEY);
}

export function generateInviteLink(
  cohortId: string,
  cohortName?: string,
): string {
  if (typeof window === "undefined") return "";

  const baseUrl = window.location.origin;
  const params = new URLSearchParams({ cohort: cohortId });
  if (cohortName) {
    params.set("name", cohortName);
  }

  return `${baseUrl}?${params.toString()}`;
}

export function leaveCohort(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COHORT_STORAGE_KEY);
  localStorage.removeItem(COHORT_NAME_KEY);
}
