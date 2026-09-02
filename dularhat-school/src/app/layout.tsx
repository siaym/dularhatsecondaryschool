import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-bengali";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopBar } from "@/components/layout/TopBar";

export const metadata: Metadata = {
  title: {
    default: "দুলারহাট মাধ্যমিক বিদ্যালয় | Dularhat Secondary School",
    template: "%s | দুলারহাট মাধ্যমিক বিদ্যালয়",
  },
  description:
    "চরফ্যাশন উপজেলার পশ্চিমাঞ্চলের প্রথম শিক্ষা প্রতিষ্ঠান। দক্ষ মানবসম্পদ গড়ে তুলতে আমরা অঙ্গীকারাবদ্ধ। EIIN: 101297",
  keywords: [
    "দুলারহাট মাধ্যমিক বিদ্যালয়",
    "Dularhat Secondary School",
    "Charfashion",
    "Bhola",
    "Bangladesh",
    "School",
    "EIIN 101297",
  ],
  authors: [{ name: "Dularhat Secondary School" }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://dularhatsecondaryschool.edu.bd",
    siteName: "দুলারহাট মাধ্যমিক বিদ্যালয়",
    title: "দুলারহাট মাধ্যমিক বিদ্যালয় | Dularhat Secondary School",
    description:
      "চরফ্যাশন উপজেলার পশ্চিমাঞ্চলের প্রথম শিক্ষা প্রতিষ্ঠান। EIIN: 101297",
  },
  twitter: {
    card: "summary_large_image",
    title: "দুলারহাট মাধ্যমিক বিদ্যালয়",
    description: "চরফ্যাশন, ভোলার অন্যতম শ্রেষ্ঠ মাধ্যমিক বিদ্যালয়",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "https://dularhatsecondaryschool.edu.bd/storage/uploads/company_assets/org-3/others/1698053681-favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="antialiased">
        <LanguageProvider>
          <TopBar />
          <Header />
          <main className="pt-[72px] lg:pt-[90px]">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
