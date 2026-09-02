import { PageHeader } from "@/components/ui/PageHeader";
import { createClient } from "@/utils/supabase/server";
import { GalleryClient } from "./GalleryClient";

export const revalidate = 3600; // Cache for 1 hour

export default async function GalleryPage() {
  const supabase = await createClient();
  
  const { data: items } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div>
      <PageHeader
        title={{ bengali: "ফটো গ্যালারি", english: "Photo Gallery" }}
        subtitle={{ bengali: "বিদ্যালয়ের অনুষ্ঠান ও কার্যক্রমের ছবি", english: "Photos of school events and activities" }}
        breadcrumbs={[{ label: { bengali: "গ্যালারি", english: "Gallery" } }]}
      />
      
      <GalleryClient items={items || []} />
    </div>
  );
}
