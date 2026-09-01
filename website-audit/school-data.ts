export const schoolData = {
  name: {
    bengali: "দুলারহাট মাধ্যমিক বিদ্যালয়",
    english: "Dularhat Secondary School",
  },
  eiin: "101297",
  established: "১৯৬৩",
  established_en: "1963",
  education_board: "বরিশাল বোর্ড",
  education_board_en: "Barisal Board",
  tagline: {
    bengali: "দক্ষ মানবসম্পদ গড়ে তুলতে আমরা অঙ্গীকারাবদ্ধ",
    english: "We are committed to developing skilled human resources",
  },
  description: {
    bengali:
      "চরফ্যাশন উপজেলার পশ্চিমাঞ্চলের প্রথম শিক্ষা প্রতিষ্ঠান। ১৯৬৩ সালে প্রতিষ্ঠার পর থেকে ছাত্র-ছাত্রী, শিক্ষক, অভিভাবক, এলাকার শিক্ষা অনুরাগী ও সমাজহিতৈষী ব্যাক্তিদের আন্তরিক প্রচেষ্টায় এবং সার্বিক সহযোগিতায় বিদ্যালয়টি সুনামের সাথে পরিচালিত হয়ে আসছে।",
    english:
      "The first educational institution in the western part of Charfashion Upazila. Since its establishment in 1963, through the sincere efforts and cooperation of students, teachers, guardians and community members, the school has been running with great reputation.",
  },
  history: {
    bengali:
      "দুলারহাট মাধ্যমিক বিদ্যালয় ১লা এপ্রিল ১৯৬৩ সালে প্রতিষ্ঠিত হয়। এটি তৎকালীন সময়ে চরফ্যাশন উপজেলার অন্যতম প্রথম বিদ্যালয়। নীলকমল ইউনিয়ন পরিষদের তৎকালীন চেয়ারম্যান জনাব মহবুবুর রহমান ছিলেন বিদ্যালয়ের প্রতিষ্ঠাতা। জনাব আরব আলী মিয়া (এম.এ) ছিলেন বিদ্যালয়ের প্রথম প্রধান শিক্ষক। বর্তমানে এটি বরিশাল বোর্ডের অধীনে চরফ্যাশন উপজেলার জেএসসি ও এসএসসি পরীক্ষা কেন্দ্র।",
    english:
      "Dularhat Secondary School was established on 1st April 1963. It was one of the first schools in Charfashion Upazila at that time. Mr. Mahabubur Rahaman, the then Chairman of Nilkomol Union Council, was the founder of the school. Mr. Arab Ali Mia (M.A) was the first headmaster. It now serves as a JSC and SSC examination centre for Charfashion Upazila under the Barisal Board.",
  },
  address: {
    bengali: "দুলারহাট বাজার, বাস স্টেশনের পাশে, চরফ্যাশন, ভোলা, বাংলাদেশ",
    english: "Dularhat Bazar, Near Bus Station, Charfashion, Bhola, Bangladesh",
    village: "Dularhat",
    union: "Nilkomol",
    upazila: { bengali: "চরফ্যাশন", english: "Charfashion" },
    district: { bengali: "ভোলা", english: "Bhola" },
    division: { bengali: "বরিশাল", english: "Barisal" },
  },
  contact: {
    mobile_1: "01727379120",
    mobile_2: "01391012970",
    email: "dularhathighschool@gmail.com",
    website: "https://dularhatsecondaryschool.edu.bd",
  },
  academics: {
    classes: [
      { bengali: "ষষ্ঠ শ্রেণি", english: "Class Six", grade: 6 },
      { bengali: "সপ্তম শ্রেণি", english: "Class Seven", grade: 7 },
      { bengali: "অষ্টম শ্রেণি", english: "Class Eight", grade: 8 },
      { bengali: "নবম শ্রেণি", english: "Class Nine", grade: 9 },
      { bengali: "দশম শ্রেণি", english: "Class Ten", grade: 10 },
    ],
    disciplines: [
      { bengali: "বিজ্ঞান", english: "Science" },
      { bengali: "ব্যবসায় শিক্ষা", english: "Business Studies" },
      { bengali: "মানবিক", english: "Humanities" },
    ],
  },
  stats: {
    established: "১৯৬৩",
    classes: "৫",
    disciplines: "৩",
    exam_center: "JSC ও SSC কেন্দ্র",
  },
  logo_url:
    "https://dularhatsecondaryschool.edu.bd/storage/uploads/company_assets/org-3/others/1698053681-favicon-32x32.png",
  colors: {
    primary: "#016B00",
    primaryDark: "#024D00",
    secondary: "#D97706",
  },
};

export const navLinks = [
  {
    label: { bengali: "হোম", english: "Home" },
    href: "/",
  },
  {
    label: { bengali: "আমাদের সম্পর্কে", english: "About" },
    href: "/about",
    children: [
      {
        label: { bengali: "বিদ্যালয় পরিচিতি", english: "School Overview" },
        href: "/about",
      },
      {
        label: { bengali: "ইতিহাস", english: "History" },
        href: "/about/history",
      },
      {
        label: { bengali: "লক্ষ্য ও উদ্দেশ্য", english: "Mission & Vision" },
        href: "/about/mission",
      },
    ],
  },
  {
    label: { bengali: "প্রশাসন", english: "Administration" },
    href: "/administration",
    children: [
      {
        label: { bengali: "প্রধান শিক্ষকের বাণী", english: "Headmaster's Message" },
        href: "/administration/headmaster",
      },
      {
        label: { bengali: "ম্যানেজিং কমিটি", english: "Managing Committee" },
        href: "/administration/committee",
      },
    ],
  },
  {
    label: { bengali: "শিক্ষকবৃন্দ", english: "Teachers" },
    href: "/teachers",
  },
  {
    label: { bengali: "কর্মচারীবৃন্দ", english: "Staff" },
    href: "/staff",
  },
  {
    label: { bengali: "একাডেমিক", english: "Academics" },
    href: "/academics",
    children: [
      {
        label: { bengali: "শ্রেণি ও বিষয়", english: "Classes & Subjects" },
        href: "/academics",
      },
      {
        label: { bengali: "রুটিন", english: "Routine" },
        href: "/academics/routine",
      },
      {
        label: { bengali: "পরীক্ষা", english: "Examination" },
        href: "/academics/examination",
      },
    ],
  },
  {
    label: { bengali: "ভর্তি", english: "Admission" },
    href: "/admission",
  },
  {
    label: { bengali: "নোটিশ", english: "Notices" },
    href: "/notices",
  },
  {
    label: { bengali: "ফলাফল", english: "Results" },
    href: "/results",
  },
  {
    label: { bengali: "গ্যালারি", english: "Gallery" },
    href: "/gallery",
  },
  {
    label: { bengali: "যোগাযোগ", english: "Contact" },
    href: "/contact",
  },
];
