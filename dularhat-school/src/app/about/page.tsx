import { PageHeader } from "@/components/ui/PageHeader";
import { schoolData } from "@/data/school-data";
import { AboutClient } from "./AboutClient";

export default function AboutPage() {
  return (
    <div>
      {/* ── HERO ── */}
      <PageHeader
        title={{ bengali: "আমাদের সম্পর্কে", english: "About Us" }}
        subtitle={{
          bengali: "চরফ্যাশন, ভোলা · EIIN: 101297 · প্রতিষ্ঠাকাল ১৯৬৩",
          english: "Charfashion, Bhola · EIIN: 101297 · Established 1963",
        }}
        breadcrumbs={[
          { label: { bengali: "আমাদের সম্পর্কে", english: "About" } },
        ]}
      />
      <AboutClient />
    </div>
  );
}
