type Props = {
  title: string;
  paragraphs: string[];
};

export function ServiceOverview({ title, paragraphs }: Props) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
          / HİZMETLERİMİZ
        </p>
        <h2 className="mt-5 max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-tight text-neutral-900">
          {title}
        </h2>
        <div className="mt-8 max-w-3xl space-y-4 text-base font-light leading-relaxed text-neutral-900/60 md:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
