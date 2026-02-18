"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { joinCohort } from "@/lib/cohort";

export function CohortHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const cohortId = searchParams.get("cohort");
    const cohortName = searchParams.get("name");

    if (cohortId) {
      joinCohort(cohortId, cohortName || undefined);
    }
  }, [searchParams]);

  return null;
}
