import type { Metadata } from "next";
import { ProgressApp } from "@/components/ProgressApp";

export const metadata: Metadata = {
  title: "Progress",
  description: "See your accuracy by subject and topic, and find what to revise next.",
};

export default function ProgressPage() {
  return <ProgressApp />;
}
