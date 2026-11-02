import type { Metadata } from "next";
import { PracticeApp } from "@/components/PracticeApp";

export const metadata: Metadata = {
  title: "Practice",
  description: "Practise maths and English questions for the 2BAC STE exam with instant feedback.",
};

export default function PracticePage() {
  return <PracticeApp />;
}
