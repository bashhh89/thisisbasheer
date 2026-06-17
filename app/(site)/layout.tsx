import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionConfigProvider } from "@/components/providers/motion-config";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfigProvider>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </MotionConfigProvider>
  );
}
