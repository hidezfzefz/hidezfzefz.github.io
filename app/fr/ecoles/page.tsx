import type { Metadata } from "next";
import Link from "next/link";

const EMAIL = "bilal6087xx@gmail.com";
const PILOT_SUBJECT = "Essai classe — BAC STE Tutor";
const PILOT_BODY =
  "Bonjour, j’enseigne en 2BAC STE et je voudrais essayer l’essai gratuit de 30 jours. Matière : maths / anglais. Taille de la classe :";

export const metadata: Metadata = {
  title: "Pour les enseignants — BAC STE Tutor",
  description:
    "Utilisez BAC STE Tutor avec votre classe de 2BAC STE : feuilles d’exercices imprimables, examen chronométré et essai gratuit de 30 jours pour une classe. Maths et anglais.",
  alternates: {
    canonical: "/fr/ecoles/",
    languages: { en: "/schools/", fr: "/fr/ecoles/", "x-default": "/schools/" },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "/fr/ecoles/",
    title: "Pour les enseignants — BAC STE Tutor",
    description:
      "Feuilles d’exercices imprimables, examen chronométré et essai classe gratuit de 30 jours.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BAC STE Tutor" }],
  },
};

const included = [
  {
    title: "Feuilles d’exercices",
    body: "Choisissez une matière et un chapitre, mélangez les questions et imprimez une feuille propre, avec ou sans corrigé.",
  },
  {
    title: "Examen chronométré",
    body: "Dix questions mélangées en quinze minutes, avec une correction complète à la fin. Pratique comme test de classe.",
  },
  {
    title: "Aucun compte élève",
    body: "Rien à installer et aucune donnée personnelle collectée. Les élèves utilisent le site sur n’importe quel téléphone, ou travaillent sur papier.",
  },
];

const faq = [
  {
    q: "Les élèves doivent-ils créer un compte ?",
    a: "Non. La progression est enregistrée dans le navigateur de chaque appareil. Rien n’est envoyé à un serveur.",
  },
  {
    q: "Le contenu suit-il le programme 2BAC STE ?",
    a: "Les chapitres de maths suivent le programme 2BAC STE : limites, dérivées, intégrales, suites, nombres complexes, probabilités et géométrie. L’anglais couvre la grammaire et le vocabulaire testés à l’examen.",
  },
  {
    q: "Puis-je utiliser les feuilles en classe ?",
    a: "Oui. Imprimez-les, photocopiez-les ou projetez-les. Le corrigé est optionnel.",
  },
  {
    q: "Et s’il manque un chapitre ?",
    a: "Répondez à l’e-mail de l’essai avec le chapitre. Les nouvelles questions sont ajoutées à partir des demandes des enseignants.",
  },
];

export default function FrenchSchoolsPage() {
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(PILOT_SUBJECT)}&body=${encodeURIComponent(PILOT_BODY)}`;

  return (
    <div lang="fr" className="container-page max-w-4xl py-10 sm:py-14">
      <p className="text-sm text-cv-text-50">Pour les enseignants</p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
        Utilisez-le avec votre classe.
      </h1>
      <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-cv-text-75">
        BAC STE Tutor est gratuit pour tous les élèves. Pour un enseignant, l’intérêt est le
        générateur de feuilles imprimables et l’examen chronométré : des exercices prêts à
        l’emploi, sans un compte de plus à gérer.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {included.map((item) => (
          <section key={item.title} className="card p-5">
            <h2 className="text-lg tracking-[-0.02em]">{item.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">{item.body}</p>
          </section>
        ))}
      </div>

      <section className="card mt-8 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl tracking-[-0.02em]">Essai classe de 30 jours</h2>
          <span className="pill pill-small border border-cv-line text-cv-text-75">
            Gratuit · sans carte
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-cv-text-75">
          Essayez avec une classe pendant un mois. Je prépare un pack imprimable sur les
          chapitres que vous travaillez et j’ajoute les questions que vous demandez. Si cela
          vous fait gagner du temps, nous parlerons d’une licence de classe ; sinon, il ne se
          passe rien.
        </p>
        <ul className="mt-4 grid gap-2 text-[15px] text-cv-text-75">
          <li>· Un pack imprimable pour un chapitre de maths ou d’anglais.</li>
          <li>· L’examen chronométré, prêt à utiliser comme activité de classe.</li>
          <li>· De nouvelles questions écrites pour le chapitre choisi.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={href} className="pill pill-primary">
            Demander l’essai
          </a>
          <Link href="/worksheets/?lang=fr" className="pill pill-secondary">
            Essayer le générateur
          </Link>
          <Link
            href="/worksheets/?lang=fr&subject=maths&mix=balanced&count=20&title=Diagnostic%20d%E2%80%99entr%C3%A9e"
            className="pill pill-secondary"
          >
            Voir un diagnostic de 20 questions
          </Link>
        </div>
        <p className="mt-3 text-xs text-cv-text-50">
          Ouvre votre application e-mail avec un message court. Pas de formulaire, pas de
          compte.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl tracking-[-0.02em]">Ce que comprendra une licence de classe</h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-cv-text-75">
          L’essai est gratuit parce que le tableau de bord enseignant n’existe pas encore. Une
          licence à <strong className="text-cv-text">1 500 MAD par classe et par an</strong>{" "}
          est prévue avec des packs imprimés par chapitre, une page de classe privée et des
          demandes de chapitres prioritaires. La facture ne viendra qu’après un essai
          convaincant, et nous ne prétendrons pas que le tableau de bord est prêt avant qu’il
          le soit.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl tracking-[-0.02em]">Questions fréquentes</h2>
        <div className="mt-3 grid gap-3">
          {faq.map((item) => (
            <details key={item.q} className="card p-5">
              <summary className="cursor-pointer text-[15px] font-medium">{item.q}</summary>
              <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-8 text-sm text-cv-text-50">
        Version anglaise :{" "}
        <Link href="/schools/" hrefLang="en" className="underline hover:text-cv-text">
          For teachers
        </Link>
        .
      </p>
    </div>
  );
}
