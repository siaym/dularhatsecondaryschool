import { PageHeader } from "@/components/ui/PageHeader";
import { createClient } from "@/utils/supabase/server";
import { DocumentsClient } from "./DocumentsClient";

export const revalidate = 3600; // Cache for 1 hour

export default async function DocumentsPage() {
  const supabase = await createClient()
  
  // Public pages must query only: is_published = true
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader
        title={{ bengali: "প্রয়োজনীয় ডকুমেন্ট", english: "Official Documents" }}
        subtitle={{ bengali: "ভর্তি, রুটিন, সিলেবাস ও অন্যান্য প্রয়োজনীয় তথ্য", english: "Admission, Routine, Syllabus & other important resources" }}
        breadcrumbs={[{ label: { bengali: "ডকুমেন্ট", english: "Documents" } }]}
      />
      <DocumentsClient initialDocuments={documents || []} />
    </div>
  );
}
