type Item = {
  title: string;
  paragraphs: string[];
};

type Props = {
  items: Item[];
};

export function WhyKiwi({ items }: Props) {
  return (
    <section className="bg-neutral-950 py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
          / NEDEN KIWI MARKETING AGENCY?
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="border border-white/10 bg-white/[0.02] p-6 md:p-8"
            >
              <h3 className="text-xl font-light tracking-tight text-white">
                {item.title}
              </h3>
              <div className="mt-4 space-y-3 text-sm font-light leading-relaxed text-white/55 md:text-base">
                {item.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
