"use client";

import { CraftCanvas } from "@/components/builder/craft";

export default function EditorPage() {
  // Template JSON can be provided from backend in the future
  // For now, passing null will use the default template
  const templateJson = null;

  return <CraftCanvas templateJson={templateJson} />;
}
