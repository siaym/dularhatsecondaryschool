"use client";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dividerColor?: "green" | "gold" | "red";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dividerColor = "green",
}: SectionHeadingProps) {
  const dividerClass = {
    green: "bg-[#006B2D]",
    gold: "bg-[#F5C400]",
    red: "bg-red-500",
  }[dividerColor];

  const alignClass = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`flex flex-col ${alignClass} mb-10`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#006B2D] mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-inherit leading-tight">
        {title}
      </h2>
      <div
        className={`h-0.5 rounded-full mt-3 ${dividerClass} ${align === "center" ? "w-14" : "w-10"}`}
      />
      {description && (
        <p className="mt-4 text-sm sm:text-base leading-relaxed opacity-75 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
