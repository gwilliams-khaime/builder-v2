import { EditorLayout } from "@/components/builder/EditorLayout";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <EditorLayout>{children}</EditorLayout>
  );
}
