"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import type { Locale } from "@/dictionaries";
import type { QuestionData } from "@/lib/questions";

interface QuizCardProps {
  question: QuestionData;
  locale: Locale;
  questionNumber: number;
  totalQuestions: number;
  dict: {
    questionPrefix: string;
    of: string;
    yourGuess: string;
    submit: string;
  };
  onSubmit: (guessedPercentage: number) => void;
}

export function QuizCard({
  question,
  locale,
  questionNumber,
  totalQuestions,
  dict,
  onSubmit,
}: QuizCardProps) {
  const [guess, setGuess] = useState(50);

  const handleSubmit = () => {
    onSubmit(guess);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <div className="text-sm text-muted-foreground mb-2">
          {dict.questionPrefix} {questionNumber} {dict.of} {totalQuestions}
        </div>
        <CardTitle className="text-xl sm:text-2xl leading-relaxed">
          {question.title[locale]}
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          {question.description[locale]}
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {dict.yourGuess}
            </span>
            <span className="text-3xl font-bold">{guess}%</span>
          </div>
          <Slider
            value={[guess]}
            onValueChange={(value) => setGuess(value[0])}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        <Button onClick={handleSubmit} className="w-full" size="lg">
          {dict.submit}
        </Button>
      </CardContent>
    </Card>
  );
}
