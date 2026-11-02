export type Subject = "maths" | "english";

export type Question = {
  id: string;
  subject: Subject;
  topic: string;
  difficulty: "core" | "exam";
  premium: boolean;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const QUESTIONS: Question[] = [
  // ── Maths ────────────────────────────────────────────────────────────────
  {
    id: "m-lim-1",
    subject: "maths",
    topic: "Limits and continuity",
    difficulty: "core",
    premium: false,
    prompt: "What is lim(x→0) sin(x) / x ?",
    options: ["0", "1", "∞", "−1"],
    answer: 1,
    explanation:
      "This is a standard limit. As x approaches 0, sin(x) behaves like x, so the ratio tends to 1. It is the key limit behind the derivative of sin.",
  },
  {
    id: "m-der-1",
    subject: "maths",
    topic: "Derivatives",
    difficulty: "core",
    premium: false,
    prompt: "If f(x) = x³ − 3x, what is f′(1)?",
    options: ["0", "3", "−2", "6"],
    answer: 0,
    explanation:
      "Differentiate term by term: f′(x) = 3x² − 3. At x = 1, f′(1) = 3 − 3 = 0. The tangent is horizontal there.",
  },
  {
    id: "m-der-2",
    subject: "maths",
    topic: "Derivatives",
    difficulty: "core",
    premium: false,
    prompt: "What is the derivative of ln(x² + 1)?",
    options: ["1/(x² + 1)", "2x/(x² + 1)", "2x ln(x² + 1)", "x/(x² + 1)"],
    answer: 1,
    explanation:
      "Use the chain rule: d/dx ln(u) = u′/u with u = x² + 1. Since u′ = 2x, the derivative is 2x/(x² + 1).",
  },
  {
    id: "m-int-1",
    subject: "maths",
    topic: "Integrals",
    difficulty: "core",
    premium: false,
    prompt: "Evaluate ∫₀¹ 2x dx.",
    options: ["1", "2", "1/2", "0"],
    answer: 0,
    explanation:
      "An antiderivative of 2x is x². Evaluate from 0 to 1: 1² − 0² = 1. It is also the area of a triangle with base 1 and height 2, so 1.",
  },
  {
    id: "m-seq-1",
    subject: "maths",
    topic: "Sequences",
    difficulty: "core",
    premium: true,
    prompt: "An arithmetic sequence has uₙ = 3 + 2n. What is u₁₀?",
    options: ["20", "23", "25", "30"],
    answer: 1,
    explanation:
      "Substitute n = 10: u₁₀ = 3 + 2×10 = 23. In an arithmetic sequence each term grows by the common difference 2.",
  },
  {
    id: "m-cplx-1",
    subject: "maths",
    topic: "Complex numbers",
    difficulty: "core",
    premium: true,
    prompt: "Compute (2 + 3i)(1 − i).",
    options: ["5 + i", "5 − i", "−1 + 5i", "2 − 3i"],
    answer: 0,
    explanation:
      "Expand: 2 − 2i + 3i − 3i². Since i² = −1, −3i² = +3, so the result is (2 + 3) + (−2 + 3)i = 5 + i.",
  },
  {
    id: "m-prob-1",
    subject: "maths",
    topic: "Probability",
    difficulty: "exam",
    premium: true,
    prompt: "Two fair dice are rolled. What is the probability that the sum is 7?",
    options: ["1/12", "1/6", "1/9", "5/36"],
    answer: 1,
    explanation:
      "There are 36 equally likely outcomes. The pairs summing to 7 are (1,6), (2,5), (3,4), (4,3), (5,2) and (6,1): 6 outcomes. So P = 6/36 = 1/6.",
  },
  {
    id: "m-exp-1",
    subject: "maths",
    topic: "Exponentials and logarithms",
    difficulty: "core",
    premium: true,
    prompt: "Solve 2ˣ = 8.",
    options: ["2", "3", "4", "8"],
    answer: 1,
    explanation:
      "Write 8 as a power of 2: 8 = 2³. Since the bases are equal, the exponents are equal, so x = 3.",
  },
  {
    id: "m-log-1",
    subject: "maths",
    topic: "Exponentials and logarithms",
    difficulty: "core",
    premium: true,
    prompt: "What is log₂(32)?",
    options: ["4", "5", "6", "16"],
    answer: 1,
    explanation:
      "log₂(32) asks: 2 raised to what power gives 32? Since 2⁵ = 32, the answer is 5.",
  },
  {
    id: "m-diff-1",
    subject: "maths",
    topic: "Differential equations",
    difficulty: "exam",
    premium: true,
    prompt: "Solve y′ = 2y with y(0) = 3.",
    options: ["y = 3e²ˣ", "y = e²ˣ + 2", "y = 3e⁻²ˣ", "y = 6x + 3"],
    answer: 0,
    explanation:
      "The general solution of y′ = ky is y = Ce^{kx}. Here k = 2, so y = Ce²ˣ. Using y(0) = 3 gives C = 3, hence y = 3e²ˣ.",
  },
  {
    id: "m-cont-1",
    subject: "maths",
    topic: "Limits and continuity",
    difficulty: "exam",
    premium: true,
    prompt:
      "The function f(x) = (x² − 1)/(x − 1) is defined for x ≠ 1. Which value of f(1) makes it continuous at x = 1?",
    options: ["0", "1", "2", "It cannot be made continuous"],
    answer: 2,
    explanation:
      "Factor the numerator: x² − 1 = (x − 1)(x + 1). For x ≠ 1, f(x) = x + 1, so lim(x→1) f(x) = 2. Setting f(1) = 2 removes the hole.",
  },
  {
    id: "m-geo-1",
    subject: "maths",
    topic: "Geometry in space",
    difficulty: "exam",
    premium: true,
    prompt: "What is the volume of a sphere of radius 3?",
    options: ["12π", "36π", "27π", "9π"],
    answer: 1,
    explanation:
      "The volume of a sphere is (4/3)πr³. With r = 3: (4/3)π × 27 = 36π.",
  },

  // ── English ──────────────────────────────────────────────────────────────
  {
    id: "e-cond-1",
    subject: "english",
    topic: "Conditionals",
    difficulty: "core",
    premium: false,
    prompt: "If I ___ harder, I would have passed the exam.",
    options: ["studied", "had studied", "study", "would study"],
    answer: 1,
    explanation:
      "This is a third conditional: past unreal situation. The pattern is If + past perfect, would have + past participle. So: If I had studied harder, I would have passed.",
  },
  {
    id: "e-perf-1",
    subject: "english",
    topic: "Tenses",
    difficulty: "core",
    premium: false,
    prompt: "She ___ in London since 2019.",
    options: ["lives", "lived", "has lived", "is living"],
    answer: 2,
    explanation:
      "Since 2019 marks a point in the past that continues to now, so use the present perfect: has lived. The present perfect connects past to present.",
  },
  {
    id: "e-pass-1",
    subject: "english",
    topic: "Passive voice",
    difficulty: "core",
    premium: false,
    prompt: "The report ___ by the manager yesterday.",
    options: ["wrote", "was written", "has written", "is writing"],
    answer: 1,
    explanation:
      "The report receives the action, so use the passive. Yesterday is past, so the past simple passive is was + past participle: was written.",
  },
  {
    id: "e-rep-1",
    subject: "english",
    topic: "Reported speech",
    difficulty: "core",
    premium: false,
    prompt: "He said, “I am tired.” → He said he ___ tired.",
    options: ["is", "was", "has been", "will be"],
    answer: 1,
    explanation:
      "When the reporting verb is in the past (said), the tense usually shifts back one step: am becomes was. So: He said he was tired.",
  },
  {
    id: "e-mod-1",
    subject: "english",
    topic: "Modals",
    difficulty: "core",
    premium: true,
    prompt: "You ___ smoke here. It is forbidden.",
    options: ["mustn't", "don't have to", "needn't", "shouldn't have"],
    answer: 0,
    explanation:
      "Mustn't expresses prohibition: it is not allowed. Don't have to and needn't mean it is not necessary, which is different.",
  },
  {
    id: "e-rel-1",
    subject: "english",
    topic: "Relative clauses",
    difficulty: "core",
    premium: true,
    prompt: "The book ___ I bought yesterday is excellent.",
    options: ["who", "which", "whose", "where"],
    answer: 1,
    explanation:
      "The antecedent is a thing (the book), so use which (or that). Who is for people, whose shows possession, and where is for places.",
  },
  {
    id: "e-vocab-1",
    subject: "english",
    topic: "Vocabulary",
    difficulty: "core",
    premium: true,
    prompt: "Choose the closest synonym of “achieve”.",
    options: ["accomplish", "abandon", "avoid", "admit"],
    answer: 0,
    explanation:
      "To achieve means to succeed in reaching a goal. Accomplish has the same meaning. Abandon and avoid are close to the opposite.",
  },
  {
    id: "e-coll-1",
    subject: "english",
    topic: "Collocations",
    difficulty: "core",
    premium: true,
    prompt: "We need to ___ a decision before Friday.",
    options: ["do", "make", "take", "give"],
    answer: 1,
    explanation:
      "The standard collocation is make a decision. English uses make for decisions, plans and choices, while do is used for tasks and activities.",
  },
  {
    id: "e-prep-1",
    subject: "english",
    topic: "Prepositions",
    difficulty: "core",
    premium: true,
    prompt: "She is very interested ___ astronomy.",
    options: ["on", "in", "at", "for"],
    answer: 1,
    explanation:
      "The adjective interested is followed by in: interested in something. Learn adjective + preposition pairs as fixed chunks.",
  },
  {
    id: "e-ger-1",
    subject: "english",
    topic: "Gerunds and infinitives",
    difficulty: "core",
    premium: true,
    prompt: "I enjoy ___ novels in the evening.",
    options: ["to read", "reading", "read", "to reading"],
    answer: 1,
    explanation:
      "The verb enjoy is followed by a gerund (-ing form): enjoy reading. Verbs like want and decide take the infinitive instead.",
  },
  {
    id: "e-tens-2",
    subject: "english",
    topic: "Tenses",
    difficulty: "exam",
    premium: true,
    prompt: "By the time we arrived, the film ___.",
    options: ["started", "has started", "had started", "was starting"],
    answer: 2,
    explanation:
      "One past action happened before another past action. Use the past perfect for the earlier one: the film had started before we arrived.",
  },
  {
    id: "e-vocab-2",
    subject: "english",
    topic: "Word formation",
    difficulty: "exam",
    premium: true,
    prompt: "What is the adjective formed from “environment”?",
    options: ["environmental", "environmentally", "environmentalist", "environ"],
    answer: 0,
    explanation:
      "The adjective is environmental (environment + -al), as in environmental issues. Environmentally is the adverb, and environmentalist is a person.",
  },
];

export const SUBJECTS: { id: Subject; label: string; blurb: string }[] = [
  { id: "maths", label: "Maths", blurb: "Limits, derivatives, integrals, sequences, complex numbers, probability." },
  { id: "english", label: "English", blurb: "Tenses, conditionals, passive, modals, vocabulary and word formation." },
];

export function topicsFor(subject: Subject): string[] {
  return Array.from(new Set(QUESTIONS.filter((q) => q.subject === subject).map((q) => q.topic)));
}
