import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/Sidebar";
import { getDictionary, type Locale, locales } from "@/dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto max-w-mobile md:max-w-[800px] min-h-screen flex gap-x-[80px]">
          <Sidebar />
          <main className="flex-1  bg-white md:shadow-sm md:border-x border-gray-200">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
