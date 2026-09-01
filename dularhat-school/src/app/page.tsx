import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsSection } from "@/components/home/StatsSection";
import { HeadmasterSection } from "@/components/home/HeadmasterSection";
import { NoticesSection } from "@/components/home/NoticesSection";
import { QuickLinksSection } from "@/components/home/QuickLinksSection";
import { AcademicsSection } from "@/components/home/AcademicsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ContactSection } from "@/components/home/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "দুলারহাট মাধ্যমিক বিদ্যালয় | Dularhat Secondary School",
  description:
    "চরফ্যাশন উপজেলার পশ্চিমাঞ্চলের প্রথম শিক্ষা প্রতিষ্ঠান। ১৯৬৩ সাল থেকে শিক্ষার মান ও ফলাফলে জেলার অন্যতম শ্রেষ্ঠ বিদ্যাপীঠ। EIIN: 101297",
  alternates: {
    canonical: "https://dularhatsecondaryschool.edu.bd",
  },
};

export default function HomePage() {
  return (
    <div className="-mt-[72px] lg:-mt-[90px]">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <HeadmasterSection />
      <NoticesSection />
      <QuickLinksSection />
      <AcademicsSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}
