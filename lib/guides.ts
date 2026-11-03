export type GuideSection = {
  heading: string;
  body: string[];
  formula?: string;
};

export type Guide = {
  slug: string;
  title: string;
  subject: "maths" | "english";
  topic: string;
  description: string;
  intro: string;
  sections: GuideSection[];
  keyPoints: string[];
  practiceTopic: string;
};

export const GUIDES: Guide[] = [
  {
    slug: "limits",
    title: "Limits and continuity",
    subject: "maths",
    topic: "Limits and continuity",
    description:
      "How to evaluate limits by substitution, factoring and conjugates, the standard limits to memorise, and what continuity means at a point.",
    intro:
      "A limit answers one question: what value does a function approach as x gets close to a number? The function does not have to be defined at that number. Most exam limits are solved with three moves: substitute, factor, or multiply by the conjugate.",
    sections: [
      {
        heading: "Start by substituting",
        body: [
          "If the function is built from polynomials, roots, exponentials or logarithms and the point is inside the domain, substitute the value. For example, lim(x→1) (x² + 3x) = 1 + 3 = 4.",
          "A result of the form 0/0 is called an indeterminate form. It does not mean the limit does not exist; it means you must simplify first.",
        ],
      },
      {
        heading: "Factor when you see 0/0",
        body: [
          "For a rational function, factor the numerator and the denominator and cancel the common factor. This removes the hole.",
          "Example: lim(x→2) (x² − 4)/(x − 2). Since x² − 4 = (x − 2)(x + 2), the expression equals x + 2 for every x ≠ 2, so the limit is 4.",
        ],
        formula: "lim(x→a) (x² − a²)/(x − a) = 2a",
      },
      {
        heading: "Multiply by the conjugate",
        body: [
          "When a square root creates 0/0, multiply the numerator and the denominator by the conjugate. This uses (a − b)(a + b) = a² − b².",
          "Example: lim(x→0) (√(1 + x) − 1)/x. Multiply by (√(1 + x) + 1)/(√(1 + x) + 1). The numerator becomes x, so the limit is 1/2.",
        ],
      },
      {
        heading: "Standard limits to memorise",
        body: [
          "These appear often in the national exam and are worth learning as facts, with the reasoning behind them.",
        ],
        formula:
          "lim(x→0) sin(x)/x = 1   ·   lim(x→0) (1 − cos x)/x² = 1/2   ·   lim(x→0) (eˣ − 1)/x = 1   ·   lim(x→0) ln(1 + x)/x = 1",
      },
      {
        heading: "Continuity at a point",
        body: [
          "A function f is continuous at a if three things happen: f(a) is defined, the limit as x→a exists, and the limit equals f(a).",
          "For a piecewise function, compute both one-sided limits at the join. They must agree, and the shared value must match the function value. If a hole can be filled by choosing the right value, the discontinuity is removable.",
        ],
        formula: "f continuous at a ⇔ lim(x→a⁻) f(x) = lim(x→a⁺) f(x) = f(a)",
      },
    ],
    keyPoints: [
      "Substitute first; only simplify when you meet 0/0 or ∞/∞.",
      "Factor for polynomials, conjugate for square roots.",
      "Learn the four standard limits by heart.",
      "Continuity needs the value and both one-sided limits to agree.",
    ],
    practiceTopic: "Limits and continuity",
  },
  {
    slug: "derivatives",
    title: "Derivatives",
    subject: "maths",
    topic: "Derivatives",
    description:
      "The derivative rules that cover the 2BAC STE exam: powers, products, quotients, the chain rule, exponentials, logs and trigonometry.",
    intro:
      "The derivative measures how fast a function changes. On a graph it is the slope of the tangent. In the exam it is usually a calculation question followed by a sign table or a tangent equation.",
    sections: [
      {
        heading: "The core rules",
        body: [
          "Differentiate term by term. Constants disappear, and a constant multiplier stays.",
        ],
        formula:
          "(xⁿ)′ = n·xⁿ⁻¹   ·   (eˣ)′ = eˣ   ·   (ln x)′ = 1/x   ·   (sin x)′ = cos x   ·   (cos x)′ = −sin x",
      },
      {
        heading: "Product and quotient",
        body: [
          "Use the product rule when two expressions are multiplied, and the quotient rule when one is divided by another. Write the rule down before substituting; most lost marks come from swapping the terms.",
        ],
        formula:
          "(uv)′ = u′v + uv′   ·   (u/v)′ = (u′v − uv′)/v²",
      },
      {
        heading: "The chain rule",
        body: [
          "For a function inside another function, differentiate the outside, then multiply by the derivative of the inside. For example, (ln(x² + 1))′ = 2x/(x² + 1), and (cos(2x))′ = −2 sin(2x).",
        ],
        formula: "(f ∘ g)′(x) = f′(g(x)) · g′(x)",
      },
      {
        heading: "Tangent and sign table",
        body: [
          "The tangent at x = a has slope f′(a). Its equation is y = f′(a)(x − a) + f(a).",
          "To study variations, solve f′(x) = 0, then check the sign of f′ on each interval. Where f′ > 0 the function increases; where f′ < 0 it decreases. A change from + to − gives a local maximum.",
        ],
        formula: "y = f′(a)(x − a) + f(a)",
      },
    ],
    keyPoints: [
      "Learn the table of standard derivatives.",
      "Product rule: u′v + uv′; quotient rule: (u′v − uv′)/v².",
      "Chain rule: outside derivative times inside derivative.",
      "Tangent slope is f′(a); use the sign of f′ for variations.",
    ],
    practiceTopic: "Derivatives",
  },
  {
    slug: "integrals",
    title: "Integrals",
    subject: "maths",
    topic: "Integrals",
    description:
      "Antiderivatives, the definite integral, area under a curve and the integration techniques tested in the 2BAC STE exam.",
    intro:
      "Integration reverses differentiation. An indefinite integral gives a family of functions (don't forget + C). A definite integral gives a number, usually an area.",
    sections: [
      {
        heading: "Antiderivatives you must know",
        body: [
          "Read the table from right to left compared with derivatives. Each entry is valid on an interval where the expression is defined.",
        ],
        formula:
          "∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C (n ≠ −1)   ·   ∫ 1/x dx = ln|x| + C   ·   ∫ eˣ dx = eˣ + C   ·   ∫ cos x dx = sin x + C   ·   ∫ sin x dx = −cos x + C",
      },
      {
        heading: "Definite integrals",
        body: [
          "To evaluate ∫ₐᵇ f(x) dx, find an antiderivative F, then compute F(b) − F(a). The constant C cancels, so you can leave it out.",
          "Example: ∫₀¹ 2x dx = [x²]₀¹ = 1 − 0 = 1. Geometrically this is the area of a triangle with base 1 and height 2.",
        ],
        formula: "∫ₐᵇ f(x) dx = F(b) − F(a)",
      },
      {
        heading: "Area between curves",
        body: [
          "If f is above g on [a, b], the area between them is ∫ₐᵇ (f − g) dx. Find the intersection points first; they become the bounds.",
          "If the curve crosses the x-axis, split the interval. A definite integral counts area below the axis as negative, while geometric area is always positive.",
        ],
        formula: "A = ∫ₐᵇ |f(x) − g(x)| dx",
      },
      {
        heading: "Useful techniques",
        body: [
          "For a product where one factor is the derivative of the other, use substitution. For example, ∫ 2x·e^{x²} dx: let u = x², du = 2x dx, giving ∫ eᵘ du = e^{x²} + C.",
          "For a product of unlike functions, such as x·eˣ, use integration by parts: ∫ u dv = uv − ∫ v du.",
        ],
        formula: "Integration by parts: ∫ u dv = uv − ∫ v du",
      },
    ],
    keyPoints: [
      "Always add + C for an indefinite integral.",
      "Definite integral: antiderivative at the top minus at the bottom.",
      "Area between curves: integrate the upper minus the lower.",
      "Substitution undoes the chain rule; parts undoes the product rule.",
    ],
    practiceTopic: "Integrals",
  },
  {
    slug: "complex-numbers",
    title: "Complex numbers",
    subject: "maths",
    topic: "Complex numbers",
    description:
      "Algebraic and trigonometric forms, modulus and argument, conjugates, and how complex numbers solve quadratic equations.",
    intro:
      "A complex number has the form z = a + bi, where a is the real part, b is the imaginary part, and i² = −1. The same rules as ordinary algebra apply, with i² replaced by −1 whenever it appears.",
    sections: [
      {
        heading: "Arithmetic",
        body: [
          "Add and subtract real and imaginary parts separately. Multiply by expanding, then replace i² with −1.",
          "Example: (2 + 3i)(1 − i) = 2 − 2i + 3i − 3i² = 2 + i + 3 = 5 + i.",
        ],
        formula: "(a + bi)(c + di) = (ac − bd) + (ad + bc)i",
      },
      {
        heading: "Conjugate and division",
        body: [
          "The conjugate of z = a + bi is z̄ = a − bi. Multiplying z by its conjugate gives a real number: z·z̄ = a² + b².",
          "To divide by a complex number, multiply the numerator and the denominator by the conjugate of the denominator. This makes the denominator real.",
        ],
        formula: "z·z̄ = |z|² = a² + b²",
      },
      {
        heading: "Modulus and argument",
        body: [
          "The modulus |z| is the distance from the origin. The argument θ is the angle from the positive real axis, measured anticlockwise.",
          "In the plane, z = a + bi is the point (a, b). The trigonometric form is z = r(cos θ + i sin θ), where r = |z|.",
        ],
        formula: "r = √(a² + b²)   ·   cos θ = a/r   ·   sin θ = b/r",
      },
      {
        heading: "Quadratic equations",
        body: [
          "When the discriminant Δ = b² − 4ac is negative, the equation ax² + bx + c = 0 has two conjugate complex roots.",
          "Example: x² + 4 = 0 gives x² = −4, so x = ±2i. The roots are conjugates, as expected with real coefficients.",
        ],
        formula: "x = (−b ± i√(−Δ))/(2a) when Δ < 0",
      },
    ],
    keyPoints: [
      "Replace i² with −1 in every expansion.",
      "Multiply by the conjugate to divide.",
      "|z| = √(a² + b²); the argument gives the direction.",
      "A negative discriminant gives two conjugate complex roots.",
    ],
    practiceTopic: "Complex numbers",
  },
  {
    slug: "tenses",
    title: "English tenses",
    subject: "english",
    topic: "Tenses",
    description:
      "A compact map of the English tenses tested in the 2BAC exam, with signal words and the mistakes students make most often.",
    intro:
      "Tense questions are not about memorising twelve labels. They are about two things: when the action happens, and whether it is finished, repeated or still connected to now. Read the whole sentence for a time marker before choosing.",
    sections: [
      {
        heading: "Present simple and continuous",
        body: [
          "Present simple: habits, routines and general truths. Signal words: always, usually, every day, never. She studies every evening.",
          "Present continuous: an action happening now or around now. Signal words: now, at the moment, this week. She is studying for the exam right now.",
          "Stative verbs such as know, believe, want and need are normally not used in the continuous form.",
        ],
      },
      {
        heading: "Past simple and past continuous",
        body: [
          "Past simple: a finished action at a finished time. They wrote the test yesterday.",
          "Past continuous: an action in progress in the past, often interrupted. They were writing when the bell rang.",
          "Use when for the short interrupting action and while for the longer background action.",
        ],
      },
      {
        heading: "Present perfect and past perfect",
        body: [
          "Present perfect: past action with a link to now, or experience without a specific time. Signal words: since, for, already, yet, ever, never. She has lived in London since 2019.",
          "Past perfect: the earlier of two past actions. By the time we arrived, the film had started.",
          "Do not use present perfect with a finished time expression such as yesterday or in 2020. Use the past simple there.",
        ],
      },
      {
        heading: "Future forms",
        body: [
          "Will: decisions made now, predictions and promises. I will help you.",
          "Be going to: plans and intentions, or predictions based on evidence. Look at those clouds; it is going to rain.",
          "Present continuous: fixed arrangements. We are meeting the teacher tomorrow at ten.",
        ],
      },
    ],
    keyPoints: [
      "Find the time marker before choosing a tense.",
      "Finished time → past simple, not present perfect.",
      "when + past simple, while + past continuous.",
      "Past perfect marks the earlier of two past actions.",
    ],
    practiceTopic: "Tenses",
  },
  {
    slug: "conditionals",
    title: "Conditionals",
    subject: "english",
    topic: "Conditionals",
    description:
      "Zero, first, second and third conditionals with the patterns, meanings and mixed forms that appear in the exam.",
    intro:
      "A conditional sentence has two parts: the if-clause (the condition) and the main clause (the result). The pattern changes with how real and how past the situation is.",
    sections: [
      {
        heading: "Zero conditional: always true",
        body: [
          "Use it for facts, rules and general truths. Both clauses use the present simple.",
          "If you heat water to 100°C, it boils. If you study regularly, you remember more.",
        ],
        formula: "If + present simple, present simple",
      },
      {
        heading: "First conditional: real future possibility",
        body: [
          "Use it when the condition is possible and the result is in the future.",
          "If it rains tomorrow, we will stay at home. Unless you hurry, you will miss the bus.",
        ],
        formula: "If + present simple, will + base verb",
      },
      {
        heading: "Second conditional: unreal present",
        body: [
          "Use it for imaginary or unlikely situations now. The past form does not mean past time here.",
          "If I had more time, I would revise every topic. If I were you, I would start today.",
          "With the verb be, were is standard for every subject in formal writing: If I were…",
        ],
        formula: "If + past simple, would + base verb",
      },
      {
        heading: "Third conditional: unreal past",
        body: [
          "Use it to imagine a different past. The situation did not happen, so the result cannot happen either.",
          "If I had studied harder, I would have passed the exam.",
        ],
        formula: "If + past perfect, would have + past participle",
      },
      {
        heading: "Mixed conditionals",
        body: [
          "Mixed forms combine a past condition with a present result, or a present condition with a past result.",
          "If I had saved money last year, I would be able to buy a laptop now. The condition is past; the result is present.",
        ],
      },
    ],
    keyPoints: [
      "Match the time and reality of the situation, not the tense label.",
      "Second conditional uses past forms for an unreal present.",
      "Third conditional: If + had done, would have done.",
      "Unless means if not.",
    ],
    practiceTopic: "Conditionals",
  },
  {
    slug: "passive-voice",
    title: "The passive voice",
    subject: "english",
    topic: "Passive voice",
    description:
      "How to form the passive in every tense, when to use it, and how to decide whether the agent belongs in the sentence.",
    intro:
      "In an active sentence, the subject does the action. In a passive sentence, the subject receives the action. The object of the active sentence becomes the subject of the passive one.",
    sections: [
      {
        heading: "The basic transformation",
        body: [
          "Active: The manager wrote the report. Passive: The report was written by the manager.",
          "The passive is be + past participle. The tense is carried by be; the main verb stays as a past participle.",
        ],
        formula: "object + be (in the right tense) + past participle + (by + agent)",
      },
      {
        heading: "Passive across tenses",
        body: [
          "Present simple: The report is written every week.",
          "Past simple: The report was written yesterday.",
          "Present perfect: The report has been written.",
          "Future: The results will be announced tomorrow.",
          "Modal: The form must be signed by the applicant.",
        ],
      },
      {
        heading: "When to use it",
        body: [
          "Use the passive when the action matters more than the doer, when the doer is unknown or obvious, or when you want a formal, impersonal tone.",
          "Scientific and news writing uses it often: The samples were heated to 80°C. The suspect was arrested last night.",
        ],
      },
      {
        heading: "When to leave out the agent",
        body: [
          "The by-phrase is optional. Leave it out when the agent is unknown (My bike was stolen), unimportant (The road was repaired), or obvious (He was arrested).",
          "Keep it when the agent adds real information: The novel was written by a Moroccan author.",
        ],
      },
    ],
    keyPoints: [
      "Passive = be + past participle; the tense lives in be.",
      "Only transitive verbs (verbs with an object) can be passive.",
      "The by-phrase is optional; include it only when it matters.",
      "Do not mix active and passive forms in one clause.",
    ],
    practiceTopic: "Passive voice",
  },
  {
    slug: "reported-speech",
    title: "Reported speech",
    subject: "english",
    topic: "Reported speech",
    description:
      "How tense, pronouns and time expressions shift when you report what someone said, plus reported questions and commands.",
    intro:
      "Reported speech turns direct words into a report. When the reporting verb is in the past (said, told, asked), the tenses usually move one step back, and pronouns and time expressions change to fit the new situation.",
    sections: [
      {
        heading: "Tense shift",
        body: [
          "Present simple → past simple: “I am tired” → He said he was tired.",
          "Present continuous → past continuous: “I am working” → She said she was working.",
          "Past simple → past perfect: “I saw him” → He said he had seen him.",
          "Present perfect → past perfect: “I have finished” → She said she had finished.",
          "Will → would, can → could, must → had to.",
        ],
      },
      {
        heading: "Pronouns and time words",
        body: [
          "Change pronouns so the report makes sense from the reporter's point of view: “I lost my keys” → He said he had lost his keys.",
          "Time and place words often shift: now → then, today → that day, tomorrow → the next day, yesterday → the day before, here → there, this → that.",
        ],
      },
      {
        heading: "Reported questions",
        body: [
          "For yes/no questions, use if or whether and keep statement word order: “Are you ready?” → She asked if I was ready.",
          "For wh-questions, keep the question word but remove the auxiliary inversion: “Where do you live?” → He asked where I lived.",
          "Do not use a question mark in the reported clause.",
        ],
        formula: "asked + if/whether + subject + verb",
      },
      {
        heading: "Reported commands and requests",
        body: [
          "Use told or asked + object + to + infinitive: “Close the door” → She told me to close the door.",
          "For negatives, use not to + infinitive: “Don't be late” → He told us not to be late.",
          "For requests, asked is softer than told: She asked me to wait.",
        ],
        formula: "told/asked + object + (not) to + base verb",
      },
    ],
    keyPoints: [
      "Past reporting verb usually means one step back in tense.",
      "Change pronouns, time and place words to fit the report.",
      "Reported questions use statement word order and no question mark.",
      "Commands: told/asked + object + (not) to + verb.",
    ],
    practiceTopic: "Reported speech",
  },
];

export function guideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesFor(subject: Guide["subject"]): Guide[] {
  return GUIDES.filter((g) => g.subject === subject);
}
