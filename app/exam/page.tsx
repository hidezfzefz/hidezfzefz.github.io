import type { Metadata } from "next";
import { ExamApp } from "@/components/ExamApp";

export const metadata: Metadata = {
  title: "Exam",
  description: "A ten-question, fifteen-minute mixed maths and English exam simulation.",
};

export default function ExamPage() {
  return <ExamApp />;
}
