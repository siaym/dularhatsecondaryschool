import { PageHeader } from "@/components/ui/PageHeader";
import { createClient } from "@/utils/supabase/server";
import { HeadmasterClient } from "./HeadmasterClient";

export const revalidate = 3600; // Cache for 1 hour

export default async function HeadmasterPage() {
  const supabase = await createClient();

  const { data: allTeachers } = await supabase
    .from("teachers")
    .select("*")
    .eq("is_active", true);

  const headmaster = allTeachers?.find((t) => t.is_headmaster);

  return (
    <div>
      <PageHeader
        title={{ bengali: "প্রধান শিক্ষকের বাণী", english: "Headmaster's Message" }}
        subtitle={{ bengali: "বিদ্যালয়ের প্রধান শিক্ষকের পক্ষ থেকে বিশেষ বার্তা", english: "A special message from the Headmaster" }}
        breadcrumbs={[
          { label: { bengali: "প্রশাসন", english: "Administration" }, href: "/administration" },
          { label: { bengali: "প্রধান শিক্ষক", english: "Headmaster" } },
        ]}
      />
      <HeadmasterClient headmaster={headmaster} />
    </div>
  );
}
