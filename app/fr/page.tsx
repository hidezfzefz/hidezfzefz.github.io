import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

const featured = GUIDES.filter((g) => ["limits", "derivatives", "tenses"].includes(g.slug));

export const metadata: Metadata = {
  title: "Révision 2BAC STE — maths et anglais corrigés",
  description:
    "Révision gratuite pour le 2BAC STE au Maroc : questions de maths et d’anglais avec une correction écrite, examen chronométré, fiches et feuilles d’exercices à imprimer. Sans compte et sans publicité.",
  alternates: {
    canonical: "/fr/",
    languages: { en: "/", fr: "/fr/", ar: "/ar/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "/fr/",
    title: "Révision 2BAC STE — maths et anglais corrigés",
    description:
      "Questions corrigées, examen chronométré et fiches à imprimer pour le bac marocain. Gratuit, sans compte.",
    images: [{ url: "/og/fr.png", width: 1200, height: 630, alt: "BAC STE Tutor — révision 2BAC STE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Révision 2BAC STE — maths et anglais corrigés",
    description: "Questions corrigées, examen chronométré et fiches à imprimer. Gratuit.",
    images: ["/og/fr.png"],
  },
};

const subjects = [
  {
    label: "Maths",
    topics: "Limites · Dérivées · Intégrales · Suites · Nombres complexes · Probabilités",
    href: "/practice/?subject=maths",
  },
  {
    label: "Anglais",
    topics: "Temps · Conditionnels · Voix passive · Modaux · Vocabulaire · Formation des mots",
    href: "/practice/?subject=english",
  },
];

const steps = [
  {
    n: "01",
    title: "Réponds à une question",
    body: "Une question à la fois, quatre choix clairs, sans pression de chrono.",
  },
  {
    n: "02",
    title: "Lis la correction",
    body: "Chaque réponse affiche la méthode : tu retiens la règle, pas seulement le résultat.",
  },
  {
    n: "03",
    title: "Travaille ce qui bloque",
    body: "La page Progrès place le sujet le plus faible en premier : la prochaine séance sert vraiment.",
  },
];

export default function FrenchHome() {
  return (
    <div lang="fr">
      <section className="container-page pb-10 pt-14 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal">
            <p className="text-sm text-cv-text-50">2BAC STE · Maroc</p>
            <h1 className="mt-3 max-w-xl text-[clamp(2.4rem,5.5vw,3.6rem)] leading-[1.05] tracking-[-0.04em]">
              Réussis ton 2BAC STE avec des exercices corrigés.
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-cv-text-75">
              Des questions de maths et d’anglais, une correction écrite pour chaque réponse,
              un examen chronométré et des fiches à imprimer. Conçu pour le bac marocain, pas
              pour un cours générique.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/practice/" className="pill pill-primary">
                Commencer à réviser
              </Link>
              <Link href="/exam/" className="pill pill-secondary">
                Essayer l’examen
              </Link>
            </div>
            <p className="mt-4 text-sm text-cv-text-50">
              Gratuit · sans compte · sans publicité · les corrections sont en anglais simple
            </p>
          </div>

          <div className="card p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-cv-text-50">
              Exemple de question
            </p>
            <p className="mt-3 text-[17px] leading-snug">
              Quelle est la limite de sin(x)/x quand x tend vers 0 ?
            </p>
            <ol className="mt-4 grid gap-2 text-[15px] text-cv-text-75">
              <li className="rounded-xl border border-cv-line px-3 py-2">A. 0</li>
              <li className="rounded-xl border border-cv-line px-3 py-2">B. 1</li>
              <li className="rounded-xl border border-cv-line px-3 py-2">C. ∞</li>
              <li className="rounded-xl border border-cv-line px-3 py-2">D. −1</li>
            </ol>
            <p className="mt-4 rounded-xl border border-cv-line bg-cv-raised px-3 py-2.5 text-sm text-cv-text-75">
              Réponse B. Au voisinage de 0, sin(x) se comporte comme x, donc le rapport tend
              vers 1. C’est la limite derrière la dérivée de sin.
            </p>
            <Link href="/guides/limits/" className="pill pill-secondary pill-small mt-4">
              Voir la fiche sur les limites
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {subjects.map((s) => (
            <div key={s.label} className="card p-6">
              <h2 className="text-xl tracking-[-0.02em]">{s.label}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">{s.topics}</p>
              <Link href={s.href} className="pill pill-secondary pill-small mt-5">
                Réviser {s.label.toLowerCase()}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl tracking-[-0.02em]">La règle, puis l’exercice</h2>
            <p className="mt-1 max-w-lg text-[15px] text-cv-text-75">
              Huit fiches gratuites sur les chapitres qui décident de la note, chacune reliée
              à des exercices du même sujet.
            </p>
          </div>
          <Link href="/guides/" className="pill pill-secondary pill-small">
            Toutes les fiches
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {featured.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}/`}
              className="card flex flex-col p-5 transition-colors hover:bg-cv-raised"
            >
              <p className="text-xs text-cv-text-50">{g.topic}</p>
              <p className="mt-1.5 text-lg leading-snug tracking-[-0.02em]">{g.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-cv-text-75">
                {g.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="card overflow-hidden">
          <div className="grid divide-y divide-cv-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {steps.map((step) => (
              <div key={step.n} className="p-6 sm:p-8">
                <p className="text-sm text-cv-text-50">{step.n}</p>
                <h3 className="mt-2 text-lg tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="card flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-2xl tracking-[-0.02em]">Tu enseignes en 2BAC STE ?</h2>
            <p className="mt-1 max-w-lg text-[15px] text-cv-text-75">
              Génère une feuille d’exercices imprimable avec corrigé en quelques secondes, ou
              utilise l’examen chronométré comme activité de classe. Aucun compte élève.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/worksheets/" className="pill pill-primary">
              Créer une feuille
            </Link>
            <Link href="/fr/ecoles/" className="pill pill-secondary">
              Essai classe
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="rounded-[24px] border border-cv-line bg-cv-card p-6 sm:p-8">
          <h2 className="text-2xl tracking-[-0.02em]">Gratuit, et ça reste gratuit.</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-cv-text-75">
            Les questions essentielles et leurs corrections ne coûtent rien. Une version
            Premium avec la banque « style examen » est prévue, mais elle n’est pas encore en
            vente : aucun paiement n’est demandé sur ce site aujourd’hui.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/practice/" className="pill pill-primary">
              Réviser gratuitement
            </Link>
            <Link href="/pricing/" className="pill pill-secondary">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
