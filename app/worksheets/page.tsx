import type { Metadata } from "next";
import { WorksheetApp } from "@/components/WorksheetApp";

export const metadata: Metadata = {
  title: "Printable worksheets",
  description:
    "Generate a free printable 2BAC STE maths or English worksheet with an answer key. Choose a topic, shuffle the questions and print.",
  alternates: { canonical: "/worksheets/" },
};

export default function WorksheetsPage() {
  return <WorksheetApp />;
}
