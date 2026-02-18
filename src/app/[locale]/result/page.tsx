import { Suspense } from "react";
import { getDictionary, type Locale } from "@/dictionaries";
import { ResultClient } from "./ResultClient";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ResultClient
        locale={locale as Locale}
        dict={{
          result: dict.result,
          reveal: dict.reveal,
          cohort: dict.cohort,
          badges: dict.badges,
        }}
      />
    </Suspense>
  );
}
