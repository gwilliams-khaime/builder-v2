import { EditorLayout } from "@/components/builder/editor-layout";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <EditorLayout>{children}</EditorLayout>
  );
}
