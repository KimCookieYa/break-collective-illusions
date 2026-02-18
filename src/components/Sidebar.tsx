"use client";

import { useParams } from "next/navigation";
import { BreakableTitle } from "./BreakableTitle";

export function Sidebar() {
  const params = useParams();
  const locale = (params.locale as string) || "ko";

  return (
    <aside className="text-center flex flex-col items-center justify-center min-h-screen backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <BreakableTitle locale={locale} text="집단 착각" />
      <br />
      <BreakableTitle locale={locale} text="부수기" />
    </aside>
  );
}
