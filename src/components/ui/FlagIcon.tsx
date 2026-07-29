"use client";

type FlagProps = {
  code: string; // ISO 2-letter e.g. TR, GB, US, DE, NL, FR, AE, SA, etc.
  className?: string;
};

export function FlagIcon({ code, className = "w-5 h-3.5 rounded-sm overflow-hidden inline-block align-middle" }: FlagProps) {
  const upper = code.toUpperCase();

  if (upper === "TR") {
    return (
      <svg className={className} viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="800" fill="#E30A17" />
        <circle cx="425" cy="400" r="200" fill="#ffffff" />
        <circle cx="475" cy="400" r="160" fill="#E30A17" />
        <polygon
          fill="#ffffff"
          points="583.333,400 689.42,434.47 623.864,344.095 623.864,455.905 689.42,365.53"
        />
      </svg>
    );
  }

  if (upper === "GB") {
    return (
      <svg className={className} viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="s">
          <path d="M0,0 v300 h600 v-300 z" />
        </clipPath>
        <clipPath id="t">
          <path d="M0,0 L600,300 M600,0 L0,300" />
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 L600,300 M600,0 L0,300" stroke="#fff" strokeWidth="60" />
          <path d="M0,0 L600,300 M600,0 L0,300" stroke="#C8102E" strokeWidth="40" clipPath="url(#t)" />
          <path d="M300,0 V300 M0,150 H600" stroke="#fff" strokeWidth="100" />
          <path d="M300,0 V300 M0,150 H600" stroke="#C8102E" strokeWidth="60" />
        </g>
      </svg>
    );
  }

  if (upper === "US") {
    return (
      <svg className={className} viewBox="0 0 1235 650" xmlns="http://www.w3.org/2000/svg">
        <rect width="1235" height="650" fill="#b22234" />
        <path d="M0,50H1235M0,150H1235M0,250H1235M0,350H1235M0,450H1235M0,550H1235" stroke="#fff" strokeWidth="50" />
        <rect width="494" height="350" fill="#3c3b6e" />
      </svg>
    );
  }

  if (upper === "DE") {
    return (
      <svg className={className} viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
        <rect width="5" height="3" y="0" fill="#000" />
        <rect width="5" height="2" y="1" fill="#DD0000" />
        <rect width="5" height="1" y="2" fill="#FFCE00" />
      </svg>
    );
  }

  if (upper === "FR") {
    return (
      <svg className={className} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="1" height="2" x="0" fill="#002395" />
        <rect width="1" height="2" x="1" fill="#fff" />
        <rect width="1" height="2" x="2" fill="#ED2939" />
      </svg>
    );
  }

  if (upper === "NL") {
    return (
      <svg className={className} viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
        <rect width="9" height="2" y="0" fill="#AE1C28" />
        <rect width="9" height="2" y="2" fill="#fff" />
        <rect width="9" height="2" y="4" fill="#21468B" />
      </svg>
    );
  }

  if (upper === "AE") {
    return (
      <svg className={className} viewBox="0 0 12 6" xmlns="http://www.w3.org/2000/svg">
        <rect width="12" height="2" y="0" fill="#00732F" />
        <rect width="12" height="2" y="2" fill="#fff" />
        <rect width="12" height="2" y="4" fill="#000" />
        <rect width="3" height="6" x="0" y="0" fill="#FF0000" />
      </svg>
    );
  }

  if (upper === "SA") {
    return (
      <svg className={className} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="2" fill="#006C35" />
      </svg>
    );
  }

  // Generic fallback badge
  return (
    <span className="inline-flex items-center justify-center rounded bg-neutral-200 px-1 text-[10px] font-bold text-neutral-700">
      {upper}
    </span>
  );
}
