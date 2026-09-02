import { createClient } from "@/utils/supabase/server";
import RoutineClient from "./RoutineClient";

export default async function RoutinePage() {
  const supabase = await createClient();
  
  // Try to fetch routine documents
  const { data: routines } = await supabase
    .from("documents")
    .select("*")
    .eq("category", "routine")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return <RoutineClient routines={routines || []} />;
}

