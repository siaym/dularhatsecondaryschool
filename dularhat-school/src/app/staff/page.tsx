"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StaffPage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHeader
        title={{ bengali: "কর্মকর্তা ও কর্মচারীবৃন্দ", english: "Officers & Staff" }}
        subtitle={{ bengali: "বিদ্যালয়ের শিক্ষেতর কর্মীবৃন্দ", english: "Non-teaching staff of the school" }}
        breadcrumbs={[{ label: { bengali: "কর্মচারীবৃন্দ", english: "Staff" } }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl p-8 text-center mt-6">
            <p className="text-gray-500 font-medium">
              {language === "bn"
                ? "কর্মকর্তা ও কর্মচারীবৃন্দের তথ্য শীঘ্রই প্রকাশ করা হবে। যেকোনো তথ্যের জন্য অনুগ্রহ করে যোগাযোগ করুন।"
                : "Staff information will be published soon. Please contact us for any inquiries."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
