"use client";

import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Locale } from "@/dictionaries";
import {
  AGE_GROUP_LABELS,
  type AgeGroup,
  GENDER_LABELS,
  type Gender,
  getDemographics,
  saveDemographics,
} from "@/lib/demographics";

interface DemographicsFormProps {
  locale: Locale;
  dict: {
    title: string;
    subtitle: string;
    ageGroup: string;
    gender: string;
    optional: string;
    save: string;
  };
}

export function DemographicsForm({ locale, dict }: DemographicsFormProps) {
  const [ageGroup, setAgeGroup] = useState<AgeGroup | "">("");
  const [gender, setGender] = useState<Gender | "">("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getDemographics();
    if (existing) {
      setAgeGroup(existing.ageGroup || "");
      setGender(existing.gender || "");
    }
  }, []);

  const handleSave = () => {
    saveDemographics({
      ageGroup: ageGroup || undefined,
      gender: gender || undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings className="h-5 w-5" />
          {dict.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{dict.subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-medium">
            {dict.ageGroup} {dict.optional}
          </span>
          <Select
            value={ageGroup}
            onValueChange={(v: string) => setAgeGroup(v as AgeGroup)}
          >
            <SelectTrigger>
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(AGE_GROUP_LABELS) as AgeGroup[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {AGE_GROUP_LABELS[key][locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">
            {dict.gender} {dict.optional}
          </span>
          <Select
            value={gender}
            onValueChange={(v: string) => setGender(v as Gender)}
          >
            <SelectTrigger>
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(GENDER_LABELS) as Gender[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {GENDER_LABELS[key][locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSave} className="w-full">
          {saved ? "✓" : dict.save}
        </Button>
      </CardContent>
    </Card>
  );
}
