import type { Metadata } from "next";
import { TutorApp } from "@/components/TutorApp";

export const metadata: Metadata = {
  title: "Tutor",
  description: "Search the revision bank for a rule, a topic or a keyword and read a short explanation.",
};

export default function TutorPage() {
  return <TutorApp />;
}
