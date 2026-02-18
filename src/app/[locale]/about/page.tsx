import { BookOpen, Lightbulb, MessageCircle, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary, type Locale } from "@/dictionaries";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const about = dict.about;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="w-full space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold">{about.title}</h1>
          <p className="text-muted-foreground text-lg">{about.subtitle}</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {about.origin.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {about.origin.content}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              {about.problem.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {about.problem.content}
            </p>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium">{about.problem.causes.title}</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                <li>{about.problem.causes.item1}</li>
                <li>{about.problem.causes.item2}</li>
                <li>{about.problem.causes.item3}</li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
              {about.problem.quote}
            </blockquote>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              {about.purpose.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {about.purpose.content}
            </p>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium">{about.purpose.examples.title}</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {about.purpose.examples.item1}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {about.purpose.examples.item2}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {about.purpose.examples.item3}
                </li>
              </ul>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {about.purpose.conclusion}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              {about.vision.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {about.vision.content}
            </p>

            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <span className="text-2xl">🧑</span>
                <p className="text-sm text-muted-foreground">
                  {about.vision.goals.item1}
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <span className="text-2xl">🌐</span>
                <p className="text-sm text-muted-foreground">
                  {about.vision.goals.item2}
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <span className="text-2xl">🤝</span>
                <p className="text-sm text-muted-foreground">
                  {about.vision.goals.item3}
                </p>
              </div>
            </div>

            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground font-medium">
              "{about.vision.quote}"
            </blockquote>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              📚 {about.bookInfo.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-semibold">{about.bookInfo.bookTitle}</p>
            <p className="text-sm text-muted-foreground">
              {about.bookInfo.author}
            </p>
            <p className="text-sm text-muted-foreground">
              {about.bookInfo.description}
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button asChild size="lg" className="flex-1">
            <Link href={`/${locale}/quiz`}>{dict.landing.cta}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link href={`/${locale}`}>{dict.nav.home}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
