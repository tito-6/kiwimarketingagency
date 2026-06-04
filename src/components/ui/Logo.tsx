type LogoProps = {
  className?: string;
  title?: string;
};

// The KIWI wordmark. Paths use `currentColor` so a single source file can be
// tinted per context (white in the header, green in the loader, faint in the
// footer) just by setting a Tailwind text color on it.
export function Logo({ className, title = "Kiwi Marketing Agency" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 754.6 149.89"
      fill="currentColor"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="676.38 2.19 601.68 149.8 563.43 149.89 511.36 46.3 456.2 149.81 418.19 149.82 343.47 1.66 381.63 1.7 437.58 113.94 496.54 2.06 527.21 2.05 582.33 114.37 638.87 2.04 676.38 2.19" />
      <polygon points="119.18 61.91 200.54 149.76 152.01 149.82 91.48 83.15 34.45 129.5 34.3 149.8 0 149.71 .06 0 34.3 .16 34.42 87.93 85.84 46.89 142.38 .94 195.37 1.02 119.18 61.91" />
      <rect x="190.08" y="58.05" width="148.64" height="34.98" transform="translate(188.76 339.91) rotate(-89.98)" />
      <rect x="719.65" y="1.87" width="34.95" height="147.98" />
    </svg>
  );
}
