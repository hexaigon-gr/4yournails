"use client";

import { usePathname } from "@/lib/i18n/navigation";
import { SiteHeader } from "@/components/site-header";

// Single source of truth for the public-site chrome:
// - Admin routes get nothing (admin has its own sidebar/header).
// - Home renders the header transparent over the full-bleed hero, no top offset.
// - All other public routes get a uniform top offset so content clears the fixed header.
export const PublicShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return <>{children}</>;

  const isHome = pathname === "/";

  return (
    <>
      <SiteHeader />
      {isHome ? children : <div className="md:pt-28 lg:pt-32">{children}</div>}
    </>
  );
};
