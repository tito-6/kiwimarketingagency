type Props = {
  title: string;
  paragraphs: string[];
};

export function SEOContent({ title, paragraphs }: Props) {
  return (
    <section className="border-t border-neutral-900/10 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <h2 className="max-w-3xl text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-tight text-neutral-900">
          {title}
        </h2>
        <div className="mt-8 max-w-3xl space-y-5 text-base font-light leading-relaxed text-neutral-900/55 md:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
