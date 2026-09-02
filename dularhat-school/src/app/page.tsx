import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsSection } from "@/components/home/StatsSection";
import { HeadmasterSection } from "@/components/home/HeadmasterSection";
import { NoticesSection } from "@/components/home/NoticesSection";

import { AcademicsSection } from "@/components/home/AcademicsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ContactSection } from "@/components/home/ContactSection";
import type { Metadata } from "next";
import { schoolData } from "@/data/school-data";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "দুলারহাট মাধ্যমিক বিদ্যালয় | Dularhat Secondary School",
  description:
    `${schoolData.description.bengali} EIIN: ${schoolData.eiin}`,
  alternates: {
    canonical: "https://dularhatsecondaryschool.edu.bd",
  },
};

export default async function HomePage() {
  const supabase = await createClient()
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  const { data: galleryItems } = await supabase
    .from('gallery')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <div className="-mt-[72px] lg:-mt-[90px]">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <HeadmasterSection />
      <NoticesSection notices={notices || []} />

      <AcademicsSection />
      <GallerySection items={galleryItems || []} />
      <ContactSection />
    </div>
  );
}
