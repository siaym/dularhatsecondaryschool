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
  
  // We consider the teacher with sort_order 1 (or the first one) to be the headmaster for the featured section.
  const headmaster = teachersList.length > 0 && teachersList[0].sort_order === 1 ? teachersList[0] : undefined;
  const assistantTeachers = headmaster ? teachersList.slice(1) : teachersList;

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
