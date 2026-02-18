"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/dictionaries";
import { type BadgeId, getBadgeInfo } from "@/lib/badges";

interface BadgeDisplayProps {
  badgeIds: BadgeId[];
  locale: Locale;
  dict: {
    title: string;
    consensusWhisperer: { title: string; description: string };
    contrarianRadar: { title: string; description: string };
    realityCheck: { title: string; description: string };
    illusionBreaker: { title: string; description: string };
    streakMaster: { title: string; description: string };
    explorer: { title: string; description: string };
  };
  isNew?: boolean;
}

const BADGE_DICT_MAP: Record<
  BadgeId,
  | "consensusWhisperer"
  | "contrarianRadar"
  | "realityCheck"
  | "illusionBreaker"
  | "streakMaster"
  | "explorer"
> = {
  "consensus-whisperer": "consensusWhisperer",
  "contrarian-radar": "contrarianRadar",
  "reality-check": "realityCheck",
  "illusion-breaker": "illusionBreaker",
  "streak-master": "streakMaster",
  explorer: "explorer",
};

export function BadgeDisplay({
  badgeIds,
  locale: _locale,
  dict,
  isNew,
}: BadgeDisplayProps) {
  if (badgeIds.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-yellow-500" />
          {dict.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {badgeIds.map((badgeId, index) => {
            const info = getBadgeInfo(badgeId);
            const dictKey = BADGE_DICT_MAP[badgeId];
            const badgeText = dict[dictKey];

            if (!info || !badgeText) return null;

            return (
              <motion.div
                key={badgeId}
                initial={isNew ? { scale: 0, rotate: -180 } : { scale: 1 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  delay: isNew ? index * 0.15 : 0,
                  duration: 0.5,
                }}
                className="flex flex-col items-center gap-1 p-3 bg-muted rounded-lg min-w-[80px]"
              >
                <span className="text-2xl">{info.emoji}</span>
                <span className="text-xs font-medium text-center">
                  {badgeText.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
