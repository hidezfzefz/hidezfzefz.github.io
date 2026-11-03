// French text for the maths questions. English questions stay in English because the
// exercise itself is the English sentence.
//
// Options are only translated when they contain words; numeric and symbolic options are
// left as they are. Every entry keeps the same answer index as the English question.

export type QuestionTranslation = {
  prompt: string;
  options?: string[];
  explanation: string;
};

export const MATHS_FR: Record<string, QuestionTranslation> = {
  "m-lim-1": {
    prompt: "Quelle est la limite de sin(x)/x quand x → 0 ?",
    explanation:
      "C’est une limite usuelle. Quand x tend vers 0, sin(x) se comporte comme x, donc le quotient tend vers 1. C’est la limite qui permet de dériver sin.",
  },
  "m-der-1": {
    prompt: "Si f(x) = x³ − 3x, que vaut f′(1) ?",
    explanation:
      "On dérive terme à terme : f′(x) = 3x² − 3. En x = 1, f′(1) = 3 − 3 = 0. La tangente est horizontale en ce point.",
  },
  "m-der-2": {
    prompt: "Quelle est la dérivée de ln(x² + 1) ?",
    explanation:
      "On utilise la règle de la chaîne : d/dx ln(u) = u′/u avec u = x² + 1. Comme u′ = 2x, la dérivée est 2x/(x² + 1).",
  },
  "m-int-1": {
    prompt: "Calculez ∫₀¹ 2x dx.",
    explanation:
      "Une primitive de 2x est x². On évalue de 0 à 1 : 1² − 0² = 1. C’est aussi l’aire d’un triangle de base 1 et de hauteur 2, donc 1.",
  },
  "m-seq-1": {
    prompt: "Une suite arithmétique a pour terme général uₙ = 3 + 2n. Que vaut u₁₀ ?",
    explanation:
      "On remplace n par 10 : u₁₀ = 3 + 2×10 = 23. Dans une suite arithmétique, chaque terme augmente de la raison 2.",
  },
  "m-cplx-1": {
    prompt: "Calculez (2 + 3i)(1 − i).",
    explanation:
      "On développe : 2 − 2i + 3i − 3i². Comme i² = −1, −3i² = +3, donc le résultat est (2 + 3) + (−2 + 3)i = 5 + i.",
  },
  "m-prob-1": {
    prompt: "On lance deux dés équilibrés. Quelle est la probabilité que la somme fasse 7 ?",
    explanation:
      "Il y a 36 issues équiprobables. Les couples qui donnent 7 sont (1,6), (2,5), (3,4), (4,3), (5,2) et (6,1) : 6 issues. Donc P = 6/36 = 1/6.",
  },
  "m-exp-1": {
    prompt: "Résolvez 2ˣ = 8.",
    explanation:
      "On écrit 8 comme puissance de 2 : 8 = 2³. Les bases sont égales, donc les exposants aussi : x = 3.",
  },
  "m-log-1": {
    prompt: "Que vaut log₂(32) ?",
    explanation:
      "log₂(32) demande : à quelle puissance faut-il élever 2 pour obtenir 32 ? Comme 2⁵ = 32, la réponse est 5.",
  },
  "m-diff-1": {
    prompt: "Résolvez y′ = 2y avec y(0) = 3.",
    explanation:
      "La solution générale de y′ = ky est y = Ce^{kx}. Ici k = 2, donc y = Ce²ˣ. La condition y(0) = 3 donne C = 3, d’où y = 3e²ˣ.",
  },
  "m-cont-1": {
    prompt:
      "La fonction f(x) = (x² − 1)/(x − 1) est définie pour x ≠ 1. Quelle valeur de f(1) la rend continue en x = 1 ?",
    options: ["0", "1", "2", "On ne peut pas la rendre continue"],
    explanation:
      "On factorise le numérateur : x² − 1 = (x − 1)(x + 1). Pour x ≠ 1, f(x) = x + 1, donc lim(x→1) f(x) = 2. Poser f(1) = 2 comble le trou.",
  },
  "m-geo-1": {
    prompt: "Quel est le volume d’une sphère de rayon 3 ?",
    explanation:
      "Le volume d’une sphère est (4/3)πr³. Avec r = 3 : (4/3)π × 27 = 36π.",
  },
  "m-lim-2": {
    prompt: "Quelle est la limite de (x² − 4)/(x − 2) quand x → 2 ?",
    options: ["0", "2", "4", "La limite n’existe pas"],
    explanation:
      "On factorise le numérateur : x² − 4 = (x − 2)(x + 2). Pour x ≠ 2, l’expression vaut x + 2, donc la limite est 2 + 2 = 4.",
  },
  "m-der-3": {
    prompt: "Si f(x) = x²eˣ, que vaut f′(x) ?",
    explanation:
      "On applique la règle du produit : (uv)′ = u′v + uv′ avec u = x² et v = eˣ. Donc f′ = 2xeˣ + x²eˣ = eˣ(x² + 2x).",
  },
  "m-der-4": {
    prompt: "Quelle est la dérivée de cos(2x) ?",
    explanation:
      "On utilise la règle de la chaîne : d/dx cos(u) = −u′ sin(u). Avec u = 2x, u′ = 2, donc la dérivée est −2 sin(2x).",
  },
  "m-int-2": {
    prompt: "Que vaut ∫ (1/x) dx pour x > 0 ?",
    explanation:
      "La fonction dont la dérivée est 1/x est ln(x). Pour x < 0, on écrit ln|x|. Donc une primitive est ln(x) + C sur x > 0.",
  },
  "m-int-3": {
    prompt: "Calculez ∫₀^(π/2) cos(x) dx.",
    explanation:
      "Une primitive de cos(x) est sin(x). On évalue de 0 à π/2 : sin(π/2) − sin(0) = 1 − 0 = 1.",
  },
  "m-seq-2": {
    prompt: "Une suite géométrique a pour terme général uₙ = 2 × 3ⁿ. Que vaut u₃ ?",
    explanation:
      "On remplace n par 3 : u₃ = 2 × 3³ = 2 × 27 = 54. Chaque terme vaut trois fois le précédent.",
  },
  "m-cplx-2": {
    prompt: "Quel est le module de z = 3 + 4i ?",
    explanation:
      "Le module est |z| = √(a² + b²) = √(3² + 4²) = √(9 + 16) = √25 = 5. C’est la distance à l’origine.",
  },
  "m-prob-2": {
    prompt: "A et B sont indépendants avec P(A) = 0,5 et P(B) = 0,4. Que vaut P(A ∩ B) ?",
    options: ["0,1", "0,2", "0,4", "0,9"],
    explanation:
      "Pour des événements indépendants, P(A ∩ B) = P(A) × P(B) = 0,5 × 0,4 = 0,2. L’indépendance permet de multiplier les probabilités.",
  },
  "m-der-5": {
    prompt: "Quelle est la dérivée de cos(x) ?",
    explanation:
      "La dérivée de cos(x) est −sin(x). Le signe moins compte : cos part de 1 et décroît, donc sa pente en 0 est nulle puis devient négative juste après.",
  },
  "m-der-6": {
    prompt: "Quelle est l’équation de la tangente à f(x) = x² en x = 3 ?",
    explanation:
      "f(3) = 9 et f′(x) = 2x, donc f′(3) = 6. Avec la forme point-pente : y − 9 = 6(x − 3), soit y = 6x − 9.",
  },
  "m-int-5": {
    prompt: "Calculez ∫₀^π sin(x) dx.",
    explanation:
      "Une primitive de sin(x) est −cos(x). On évalue de 0 à π : −cos(π) − (−cos(0)) = 1 + 1 = 2.",
  },
  "m-seq-4": {
    prompt:
      "Une suite arithmétique a pour premier terme 1 et pour raison 2. Quelle est la somme des 10 premiers termes ?",
    explanation:
      "On utilise Sₙ = n/2 × (2u₁ + (n − 1)d). Avec n = 10 : S₁₀ = 5 × (2 + 18) = 5 × 20 = 100. Ce sont les dix premiers nombres impairs, dont la moyenne est 10.",
  },
  "m-cplx-3": {
    prompt: "Que vaut i² ?",
    explanation:
      "Par définition, i est un nombre dont le carré vaut −1, donc i² = −1. Tout le reste en découle : i³ = −i, i⁴ = 1, puis le cycle recommence.",
  },
  "m-prob-3": {
    prompt:
      "On lance un dé équilibré une fois. Quelle est la probabilité d’obtenir un nombre pair ?",
    explanation:
      "Les résultats pairs sont 2, 4 et 6 : 3 issues favorables sur 6 issues équiprobables. P = 3/6 = 1/2.",
  },
  "m-exp-2": {
    prompt: "Que vaut ln(e³) ?",
    explanation:
      "Le logarithme népérien est la fonction réciproque de l’exponentielle, donc ln(eˣ) = x pour tout réel x. Ici x = 3.",
  },
  "m-geo-2": {
    prompt: "Quelle est la distance entre A(1, 2, 3) et B(1, 2, 7) ?",
    explanation:
      "On utilise la formule de la distance dans l’espace : √((Δx)² + (Δy)² + (Δz)²). Seul z change, de 4, donc la distance est √16 = 4.",
  },
  "m-lim-4": {
    prompt: "Quelle est la limite de (√(x + 1) − 1)/x quand x → 0 ?",
    options: ["0", "1/2", "1", "La limite n’existe pas"],
    explanation:
      "La substitution donne 0/0, on multiplie par la quantité conjuguée : ((√(x+1) − 1)(√(x+1) + 1)) / (x(√(x+1) + 1)) = x / (x(√(x+1) + 1)). On simplifie par x ; quand x → 0, le dénominateur tend vers 2, donc la limite est 1/2.",
  },
  "m-cont-3": {
    prompt: "Laquelle de ces fonctions est continue en x = 0 ?",
    explanation:
      "|x| est définie en 0, sa limite en 0 vaut 0 et la valeur est égale à la limite : elle est continue. 1/x et ln(x) ne sont pas définies en 0, et (x−1)/|x−1| saute en x = 1.",
  },
  "m-der-7": {
    prompt: "Quelle est la dérivée de f(x) = x ln(x) ?",
    explanation:
      "On applique la règle du produit : (uv)′ = u′v + uv′ avec u = x et v = ln(x). Alors f′(x) = 1 × ln(x) + x × (1/x) = ln(x) + 1.",
  },
  "m-int-6": {
    prompt: "Que vaut ∫ e^(2x) dx ?",
    explanation:
      "On dérive (1/2)e^(2x) : la règle de la chaîne donne (1/2) × 2e^(2x) = e^(2x). Donc une primitive est (1/2)e^(2x) + C. Diviser par le coefficient 2 est l’étape clé.",
  },
  "m-seq-5": {
    prompt: "Quelle est la limite de (2n + 1)/(n + 3) quand n → ∞ ?",
    explanation:
      "On divise le numérateur et le dénominateur par n : (2 + 1/n)/(1 + 3/n). Quand n grandit, 1/n et 3/n tendent vers 0, il reste 2/1 = 2.",
  },
  "m-prob-4": {
    prompt:
      "On lance une pièce équilibrée deux fois. Quelle est la probabilité d’obtenir exactement un « face » ?",
    explanation:
      "Les quatre issues équiprobables sont FF, FP, PF et PP, avec F = face et P = pile. Exactement un face correspond à FP et PF, donc P = 2/4 = 1/2.",
  },
};

// Topic names used by the practice, exam and worksheet screens.
export const TOPIC_FR: Record<string, string> = {
  "Limits and continuity": "Limites et continuité",
  Derivatives: "Dérivées",
  Integrals: "Intégrales",
  Sequences: "Suites",
  "Complex numbers": "Nombres complexes",
  Probability: "Probabilités",
  "Exponentials and logarithms": "Exponentielles et logarithmes",
  "Differential equations": "Équations différentielles",
  "Geometry in space": "Géométrie dans l’espace",
  Tenses: "Temps",
  Conditionals: "Conditionnels",
  "Passive voice": "Voix passive",
  "Reported speech": "Discours rapporté",
  Modals: "Modaux",
  "Relative clauses": "Propositions relatives",
  Vocabulary: "Vocabulaire",
  Collocations: "Collocations",
  Prepositions: "Prépositions",
  "Gerunds and infinitives": "Gérondifs et infinitifs",
  Articles: "Articles",
  Comparatives: "Comparatifs",
  "Phrasal verbs": "Verbes à particule",
  "Linking words": "Connecteurs logiques",
  "Word formation": "Formation des mots",
};
