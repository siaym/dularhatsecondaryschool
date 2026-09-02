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
          bengali: `${schoolData.address.upazila.bengali}, ${schoolData.address.district.bengali} · EIIN: ${schoolData.eiin} · প্রতিষ্ঠাকাল ${schoolData.established}`,
          english: `${schoolData.address.upazila.english}, ${schoolData.address.district.english} · EIIN: ${schoolData.eiin} · Established ${schoolData.established_en}`,
        }}
        breadcrumbs={[
          { label: { bengali: "আমাদের সম্পর্কে", english: "About" } },
        ]}
      />
      <AboutClient />
    </div>
  );
}
