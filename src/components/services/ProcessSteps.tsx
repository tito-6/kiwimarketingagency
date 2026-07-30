type Step = {
  number: string;
  title: string;
  paragraphs: string[];
};

type Props = {
  title: string;
  intro: string[];
  steps: Step[];
};

export function ProcessSteps({ title, intro, steps }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
          / NASIL ÇALIŞIYORUZ?
        </p>
        <h2 className="mt-5 max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-tight text-neutral-900">
          {title}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-base font-light leading-relaxed text-neutral-900/60 md:text-lg">
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <ol className="mt-12 space-y-0 divide-y divide-neutral-900/10 border-y border-neutral-900/10">
          {steps.map((step) => (
            <li
              key={`${step.number}-${step.title}`}
              className="grid gap-4 py-8 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10"
            >
              <span className="font-mono text-sm tracking-[0.2em] text-kiwi-400">
                {step.number.padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-light tracking-tight text-neutral-900 md:text-2xl">
                  {step.title}
                </h3>
                <div className="mt-4 space-y-3 text-base font-light leading-relaxed text-neutral-900/60">
                  {step.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
