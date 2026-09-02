import { PageHeader } from "@/components/ui/PageHeader";
import { createClient } from "@/utils/supabase/server";
import { StaffClient } from "./StaffClient";

export default async function StaffPage() {
  const supabase = await createClient()
  const { data: staffList } = await supabase
    .from('staff')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  return (
    <div>
      <PageHeader
        title={{ bengali: "কর্মকর্তা ও কর্মচারীবৃন্দ", english: "Officers & Staff" }}
        subtitle={{ bengali: "বিদ্যালয়ের শিক্ষেতর কর্মীবৃন্দ", english: "Non-teaching staff of the school" }}
        breadcrumbs={[{ label: { bengali: "কর্মচারীবৃন্দ", english: "Staff" } }]}
      />
      <StaffClient staffList={staffList || []} />
    </div>
  );
}
