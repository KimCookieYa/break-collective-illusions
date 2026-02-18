import { QuizContainer } from "@/components/quiz";
import { getDictionary, type Locale } from "@/dictionaries";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <QuizContainer
      locale={locale as Locale}
      dict={{
        quiz: dict.quiz,
        swipe: dict.swipe,
        distribution: dict.distribution,
        reveal: dict.reveal,
        onboarding: dict.onboarding,
      }}
    />
  );
}
