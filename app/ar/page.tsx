import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

const featured = GUIDES.filter((g) => ["limits", "derivatives", "tenses"].includes(g.slug));

export const metadata: Metadata = {
  title: "مراجعة 2BAC STE — رياضيات وإنجليزية مع التصحيح",
  description:
    "مراجعة مجانية لطلبة 2BAC STE في المغرب: أسئلة في الرياضيات والإنجليزية مع تصحيح مكتوب، امتحان مؤقت، ملخصات وأوراق تمارين للطباعة. بلا تسجيل وبلا إعلانات.",
  alternates: {
    canonical: "/ar/",
    languages: { en: "/", fr: "/fr/", ar: "/ar/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "ar_MA",
    url: "/ar/",
    title: "مراجعة 2BAC STE — رياضيات وإنجليزية مع التصحيح",
    description: "أسئلة مصححة، امتحان مؤقت وملخصات للطباعة. مجاني وبلا تسجيل.",
    images: [{ url: "/og/ar.png", width: 1200, height: 630, alt: "BAC STE Tutor — مراجعة 2BAC STE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "مراجعة 2BAC STE — رياضيات وإنجليزية مع التصحيح",
    description: "أسئلة مصححة، امتحان مؤقت وملخصات للطباعة. مجاني.",
    images: ["/og/ar.png"],
  },
};

const subjects = [
  {
    label: "الرياضيات",
    topics: "النهايات · الاشتقاق · التكامل · المتتاليات · الأعداد العقدية · الاحتمالات",
    href: "/practice/?subject=maths",
  },
  {
    label: "الإنجليزية",
    topics: "الأزمنة · الجمل الشرطية · المبني للمجهول · الأفعال الناقصة · المفردات · تكوين الكلمات",
    href: "/practice/?subject=english",
  },
];

const steps = [
  {
    n: "01",
    title: "أجب على سؤال",
    body: "سؤال واحد في كل مرة، أربعة اختيارات واضحة، وبلا ضغط الوقت.",
  },
  {
    n: "02",
    title: "اقرأ التصحيح",
    body: "كل جواب يبيّن الطريقة: تحفظ القاعدة، ماشي غير النتيجة.",
  },
  {
    n: "03",
    title: "راجع اللي صعيب",
    body: "صفحة التقدم كتقدّم الموضوع الأضعف باش تبدأ من اللي محتاج.",
  },
];

export default function ArabicHome() {
  return (
    <div lang="ar" dir="rtl">
      <section className="container-page pb-10 pt-14 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal">
            <p className="text-sm text-cv-text-50">2BAC STE · المغرب</p>
            <h1 className="mt-3 max-w-xl text-[clamp(2.2rem,5.5vw,3.4rem)] leading-[1.15] tracking-[-0.02em]">
              راجع للباك 2BAC STE بتمارين مصححة.
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-cv-text-75">
              أسئلة في الرياضيات والإنجليزية، تصحيح مكتوب لكل جواب، امتحان مؤقت، وملخصات
              وأوراق تمارين تقدر تطبعها. مصمم للباك المغربي، ماشي لكورس عام.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/practice/" className="pill pill-primary">
                ابدا المراجعة
              </Link>
              <Link href="/exam/" className="pill pill-secondary">
                جرب الامتحان
              </Link>
            </div>
            <p className="mt-4 text-sm text-cv-text-50">
              مجاني · بلا تسجيل · بلا إعلانات · التصحيح بالإنجليزية المبسطة
            </p>
          </div>

          <div className="card p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-cv-text-50">مثال سؤال</p>
            <p className="mt-3 text-[17px] leading-snug">
              ما هي نهاية sin(x)/x عندما يقترب x من 0؟
            </p>
            <ol className="mt-4 grid gap-2 text-[15px] text-cv-text-75">
              <li className="rounded-xl border border-cv-line px-3 py-2">A. 0</li>
              <li className="rounded-xl border border-cv-line px-3 py-2">B. 1</li>
              <li className="rounded-xl border border-cv-line px-3 py-2">C. ∞</li>
              <li className="rounded-xl border border-cv-line px-3 py-2">D. −1</li>
            </ol>
            <p className="mt-4 rounded-xl border border-cv-line bg-cv-raised px-3 py-2.5 text-sm text-cv-text-75">
              الجواب B. قريب من 0، sin(x) كيتصرف بحال x، إذن النسبة كتقترب من 1. هي النهاية
              اللي ورا اشتقاق sin.
            </p>
            <Link href="/guides/limits/" className="pill pill-secondary pill-small mt-4">
              شوف ملخص النهايات
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
                راجع {s.label}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl tracking-[-0.02em]">القاعدة، ومن بعد التمرين</h2>
            <p className="mt-1 max-w-lg text-[15px] text-cv-text-75">
              ثمانية ملخصات مجانية على الفصول اللي كتحدد النقطة، وكل واحد مرتبط بتمارين من نفس
              الموضوع.
            </p>
          </div>
          <Link href="/guides/" className="pill pill-secondary pill-small">
            كل الملخصات
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {featured.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}/`}
              lang="en"
              dir="ltr"
              className="card flex flex-col p-5 text-left transition-colors hover:bg-cv-raised"
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
            <h2 className="text-2xl tracking-[-0.02em]">كتدرّس 2BAC STE؟</h2>
            <p className="mt-1 max-w-lg text-[15px] text-cv-text-75">
              ولّد ورقة تمارين قابلة للطباعة مع التصحيح فثواني، ولا استعمل الامتحان المؤقت
              كنشاط فالقسم. بلا حساب للتلاميذ.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/worksheets/" className="pill pill-primary">
              أنشئ ورقة
            </Link>
            <Link href="/schools/" className="pill pill-secondary">
              تجربة القسم
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="rounded-[24px] border border-cv-line bg-cv-card p-6 sm:p-8">
          <h2 className="text-2xl tracking-[-0.02em]">مجاني، وكيبقى مجاني.</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-cv-text-75">
            الأسئلة الأساسية مع التصحيح ما كتكلّف والو. كاينة نسخة Premium فيها بنك أسئلة
            «بحال الامتحان»، ولكن مازال ما كاينة للبيع: هاد الموقع ما كيطلب منك أي دفع دابا.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/practice/" className="pill pill-primary">
              راجع مجانا
            </Link>
            <Link href="/pricing/" className="pill pill-secondary">
              شوف الأثمنة
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
