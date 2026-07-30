type Props = {
  scope: string;
};

export function ServiceScope({ scope }: Props) {
  return (
    <section className="border-y border-neutral-900/10 bg-neutral-50 py-14 md:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
          Hizmet Kapsamı
        </h2>
        <p className="mt-5 max-w-4xl text-base font-light leading-relaxed text-neutral-900/70 md:text-lg">
          {scope}
        </p>
      </div>
    </section>
  );
}
