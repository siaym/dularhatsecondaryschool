import { createClient } from "@/utils/supabase/server";
import ExaminationClient from "./ExaminationClient";

export default async function ExaminationPage() {
  const supabase = await createClient();
  
  // Try to fetch examination and syllabus documents
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .in("category", ["examination", "syllabus"])
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return <ExaminationClient documents={documents || []} />;
}

