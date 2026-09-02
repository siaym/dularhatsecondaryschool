import { createClient } from "@/utils/supabase/server";
import AcademicsClient from "./AcademicsClient";

export default async function AcademicsPage() {
  const supabase = await createClient();
  
  // Fetch academic calendar documents
  const { data: events } = await supabase
    .from("documents")
    .select("*")
    .eq("category", "academic_calendar")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return <AcademicsClient events={events || []} />;
}
