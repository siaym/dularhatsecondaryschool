import { PageHeader } from "@/components/ui/PageHeader";
import { createClient } from "@/utils/supabase/server";
import { TeachersClient } from "./TeachersClient";

export const revalidate = 3600; // Cache for 1 hour

export default async function TeachersPage() {
  const supabase = await createClient();
  
  const { data: allTeachers } = await supabase
    .from("teachers")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  const teachersList = allTeachers || [];
  
  const headmaster = teachersList.find(t => t.is_headmaster);
  const assistantTeachers = teachersList.filter(t => !t.is_headmaster);

  return (
    <div>
      <PageHeader
        title={{ bengali: "আমাদের শিক্ষকমণ্ডলী", english: "Our Teaching Faculty" }}
        subtitle={{ bengali: "দুলারহাট মাধ্যমিক বিদ্যালয়ের দক্ষ ও অভিজ্ঞ শিক্ষকবৃন্দ", english: "Qualified and experienced teachers of Dularhat Secondary School" }}
        breadcrumbs={[{ label: { bengali: "শিক্ষকবৃন্দ", english: "Teachers" } }]}
      />
      
      <TeachersClient headmaster={headmaster} teachers={assistantTeachers} />
    </div>
  );
}
