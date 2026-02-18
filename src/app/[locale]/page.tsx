import { Calendar } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { CohortHandler } from "@/components/cohort/CohortHandler";
import { Button } from "@/components/ui/button";
import { getDictionary, type Locale } from "@/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Suspense fallback={null}>
        <CohortHandler />
      </Suspense>
      <main className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl break-keep">
            {dict.landing.headline}
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            {dict.landing.subheadline}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-lg">
            <Link href={`/${locale}/quiz`}>{dict.landing.cta}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg">
            <Link href={`/${locale}/about`}>{dict.landing.learnMore}</Link>
          </Button>
        </div>

        <div className="mt-4 w-full max-w-sm">
          <Link
            href={`/${locale}/daily`}
            className="flex items-center justify-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4 transition-colors hover:bg-orange-100 dark:border-orange-900 dark:bg-orange-950 dark:hover:bg-orange-900"
          >
            <Calendar className="h-5 w-5 text-orange-500" />
            <div className="text-left">
              <p className="font-semibold text-orange-700 dark:text-orange-300">
                {dict.landing.dailyQuestion}
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                {dict.landing.dailyQuestionDesc}
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
          <Link
            href="/ko"
            className={locale === "ko" ? "font-bold text-foreground" : ""}
          >
            한국어
          </Link>
          <span>|</span>
          <Link
            href="/en"
            className={locale === "en" ? "font-bold text-foreground" : ""}
          >
            English
          </Link>
        </div>
      </main>
    </div>
  );
}
