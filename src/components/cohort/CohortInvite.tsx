"use client";

import { Check, Copy, Link2, Users, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/dictionaries";
import {
  createCohort,
  generateInviteLink,
  getCurrentCohortId,
  getCurrentCohortName,
  leaveCohort,
} from "@/lib/cohort";

interface CohortInviteProps {
  locale: Locale;
  dict: {
    title: string;
    createGroup: string;
    groupName: string;
    inviteLink: string;
    copyLink: string;
    copied: string;
    members: string;
    leaveGroup: string;
    yourGroup: string;
  };
}

export function CohortInvite({ locale: _locale, dict }: CohortInviteProps) {
  const [cohortId, setCohortId] = useState<string | null>(null);
  const [cohortName, setCohortName] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCohortId(getCurrentCohortId());
    setCohortName(getCurrentCohortName());
  }, []);

  useEffect(() => {
    if (cohortId) {
      setInviteLink(generateInviteLink(cohortId, cohortName || undefined));
    }
  }, [cohortId, cohortName]);

  const handleCreateGroup = useCallback(() => {
    const data = createCohort(newGroupName || undefined);
    setCohortId(data.cohortId);
    setCohortName(data.cohortName);
    setNewGroupName("");
  }, [newGroupName]);

  const handleLeaveGroup = useCallback(() => {
    leaveCohort();
    setCohortId(null);
    setCohortName(null);
    setInviteLink("");
  }, []);

  const handleCopyLink = useCallback(async () => {
    if (!inviteLink) return;

    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = inviteLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [inviteLink]);

  if (!cohortId) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            {dict.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder={dict.groupName}
            value={newGroupName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewGroupName(e.target.value)
            }
          />
          <Button onClick={handleCreateGroup} className="w-full">
            <Link2 className="h-4 w-4 mr-2" />
            {dict.createGroup}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            {dict.yourGroup}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLeaveGroup}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {cohortName && <p className="font-medium text-center">{cohortName}</p>}
        <div className="flex gap-2">
          <Input value={inviteLink} readOnly className="text-xs" />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopyLink}
            className="shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {dict.inviteLink}
        </p>
      </CardContent>
    </Card>
  );
}
