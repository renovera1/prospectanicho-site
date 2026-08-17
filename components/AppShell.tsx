"use client";

import { usePathname } from "next/navigation";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PreviewBanner } from "@/components/PreviewBanner";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

const legacyRoutes = new Set<string>([]);

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  if (legacyRoutes.has(pathname)) {
    return <div className="shell shell--legacy">{children}</div>;
  }

  return (
    <div className="shell">
      <Header />
      <main>{children}</main>
      <Footer />
      <PreviewBanner />
      <WhatsAppFloatingButton />
      <CookieBanner />
    </div>
  );
}
