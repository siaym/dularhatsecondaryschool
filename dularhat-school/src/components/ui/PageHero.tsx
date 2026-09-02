"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export type PageHeroVariant = "green" | "light" | "dark" | "notice" | "gold";

interface BreadcrumbItem {
  label: string | { bengali: string; english: string };
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string | { bengali: string; english: string };
  title: string | { bengali: string; english: string };
  description?: string | { bengali: string; english: string };
  breadcrumbs?: BreadcrumbItem[];
  variant?: PageHeroVariant;
  /** Optional right-side visual. Pass null to suppress, omit for default SVG pattern. */
  visual?: React.ReactNode | null;
}

// ─── Decorative SVG pattern (abstract green circles) ───────────────────────
function DefaultVisual({ variant }: { variant: PageHeroVariant }) {
  const isLight = variant === "light" || variant === "gold";
  const ringColor = isLight ? "#006B2D" : "#ffffff";
  const opacity = isLight ? "0.08" : "0.12";

  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs opacity-90"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="160" cy="140" r="130" stroke={ringColor} strokeWidth="1.5" strokeOpacity={opacity} />
      {/* Mid ring */}
      <circle cx="160" cy="140" r="90" stroke={ringColor} strokeWidth="1.5" strokeOpacity="0.16" />
      {/* Inner ring */}
      <circle cx="160" cy="140" r="50" stroke={ringColor} strokeWidth="2" strokeOpacity="0.22" />
      {/* Center: School icon */}
      <rect x="128" y="108" width="64" height="48" rx="6"
        fill={ringColor} fillOpacity={isLight ? "0.15" : "0.2"} />
      {/* Roof / triangle */}
      <path d="M118 112 L160 80 L202 112Z"
        fill={ringColor} fillOpacity={isLight ? "0.22" : "0.3"} />
      {/* Door */}
      <rect x="148" y="130" width="24" height="26" rx="3"
        fill={ringColor} fillOpacity={isLight ? "0.3" : "0.45"} />
      {/* Windows */}
      <rect x="131" y="117" width="14" height="10" rx="2"
        fill={ringColor} fillOpacity={isLight ? "0.25" : "0.38"} />
      <rect x="175" y="117" width="14" height="10" rx="2"
        fill={ringColor} fillOpacity={isLight ? "0.25" : "0.38"} />
      {/* Floating orbits */}
      <circle cx="60" cy="60" r="18" stroke={ringColor} strokeWidth="1" strokeOpacity="0.14" />
      <circle cx="260" cy="220" r="28" stroke={ringColor} strokeWidth="1" strokeOpacity="0.14" />
      <circle cx="280" cy="70" r="12" stroke={ringColor} strokeWidth="1" strokeOpacity="0.12" />
      {/* EIIN badge */}
      <rect x="104" y="168" width="112" height="28" rx="14"
        fill={ringColor} fillOpacity={isLight ? "0.12" : "0.18"} />
      <text x="160" y="186" textAnchor="middle" fill={ringColor} fillOpacity="0.7"
        fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600">
        EIIN · 101297
      </text>
    </svg>
  );
}

// ─── Variant style maps ──────────────────────────────────────────────────────
const variantStyles: Record<PageHeroVariant, {
  wrapper: string;
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbBase: string;
  breadcrumbActive: string;
  divider: string;
}> = {
  green: {
    wrapper: "bg-gradient-to-br from-[#006B2D] via-[#005524] to-[#004D24] text-white",
    eyebrow: "bg-white/15 text-white border border-white/20",
    title: "text-white",
    description: "text-green-100",
    breadcrumbBase: "text-green-300 hover:text-white",
    breadcrumbActive: "text-white",
    divider: "bg-[#F5C400]",
  },
  dark: {
    wrapper: "bg-gradient-to-br from-[#003D1A] via-[#004D24] to-[#003D1A] text-white",
    eyebrow: "bg-white/10 text-green-200 border border-white/15",
    title: "text-white",
    description: "text-green-200",
    breadcrumbBase: "text-green-400 hover:text-white",
    breadcrumbActive: "text-white",
    divider: "bg-[#F5C400]",
  },
  light: {
    wrapper: "bg-[#F0FAF3] border-b border-[#DDE8DD] text-[#003D1A]",
    eyebrow: "bg-[#006B2D]/10 text-[#006B2D] border border-[#006B2D]/15",
    title: "text-[#003D1A]",
    description: "text-[#4A6B4A]",
    breadcrumbBase: "text-[#6B8C6B] hover:text-[#006B2D]",
    breadcrumbActive: "text-[#003D1A] font-medium",
    divider: "bg-[#006B2D]",
  },
  notice: {
    wrapper: "bg-gradient-to-br from-[#006B2D] to-[#004D24] text-white border-b-4 border-red-500",
    eyebrow: "bg-red-500/20 text-red-200 border border-red-400/30",
    title: "text-white",
    description: "text-green-100",
    breadcrumbBase: "text-green-300 hover:text-white",
    breadcrumbActive: "text-white",
    divider: "bg-red-400",
  },
  gold: {
    wrapper: "bg-gradient-to-br from-[#F5C400] via-[#E8B800] to-[#D4A900] text-[#003D1A]",
    eyebrow: "bg-[#003D1A]/10 text-[#003D1A] border border-[#003D1A]/15",
    title: "text-[#003D1A]",
    description: "text-[#3D3000]",
    breadcrumbBase: "text-[#5A4800] hover:text-[#003D1A]",
    breadcrumbActive: "text-[#003D1A] font-medium",
    divider: "bg-[#003D1A]",
  },
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  variant = "green",
  visual,
}: PageHeroProps) {
  const { t } = useLanguage();
  const s = variantStyles[variant];

  const getText = (v: string | { bengali: string; english: string }) =>
    typeof v === "string" ? v : t(v);

  const showVisual = visual !== null;
  const visualNode = visual ?? <DefaultVisual variant={variant} />;

  return (
    <section className={`${s.wrapper} relative overflow-hidden`}>
      {/* Subtle background texture — diagonal lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            variant === "light" || variant === "gold"
              ? undefined
              : "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav
            className="flex items-center flex-wrap gap-x-1 gap-y-0.5 text-sm mb-5"
            aria-label="Breadcrumb"
          >
            <Link href="/" className={`transition-colors ${s.breadcrumbBase}`}>
              হোম
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className={`${s.breadcrumbBase} opacity-60`}>›</span>
                {crumb.href ? (
                  <Link href={crumb.href} className={`transition-colors ${s.breadcrumbBase}`}>
                    {getText(crumb.label)}
                  </Link>
                ) : (
                  <span className={s.breadcrumbActive}>{getText(crumb.label)}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className={`grid gap-8 items-center ${showVisual ? "lg:grid-cols-2" : ""}`}>
          {/* Left: text */}
          <div>
            {eyebrow && (
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${s.eyebrow}`}
              >
                {getText(eyebrow)}
              </span>
            )}
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${s.title}`}>
              {getText(title)}
            </h1>
            <div className={`h-0.5 w-14 mt-3 mb-4 rounded-full ${s.divider}`} />
            {description && (
              <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${s.description}`}>
                {getText(description)}
              </p>
            )}
          </div>

          {/* Right: visual */}
          {showVisual && (
            <div className="hidden lg:flex justify-end items-center">
              {visualNode}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
