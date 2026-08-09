import Link from "next/link";
import type { ReactNode } from "react";

const TOKEN_RE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

/** Renders light markdown: **bold** and [label](/path) links. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN_RE).filter((p) => p.length > 0);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-medium text-neutral-900/80">
              {part.slice(2, -2)}
            </strong>
          );
        }

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          const external = href.startsWith("http");
          if (external) {
            return (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-kiwi-600 underline decoration-kiwi-400/40 underline-offset-4 transition-colors hover:text-kiwi-500"
              >
                {label}
              </a>
            );
          }
          return (
            <Link
              key={i}
              href={href}
              data-cursor="pointer"
              className="font-medium text-kiwi-600 underline decoration-kiwi-400/40 underline-offset-4 transition-colors hover:text-kiwi-500"
            >
              {label}
            </Link>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function richNodes(text: string): ReactNode {
  return <RichText text={text} />;
}
