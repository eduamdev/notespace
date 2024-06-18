import DesktopLayoutView from "@/components/layout/desktop-layout-view";
import MobileLayoutView from "@/components/layout/mobile-layout-view";

export function ResponsiveLayout({
  desktopMainContent,
  mobileMainContent,
  desktopSecondaryContent,
}: {
  desktopMainContent: React.ReactNode;
  mobileMainContent: React.ReactNode;
  desktopSecondaryContent?: React.ReactNode;
}) {
  return (
    <>
      <MobileLayoutView
        mobileMainContent={mobileMainContent}
        containerClassName="flex lg:hidden"
      />
      <DesktopLayoutView
        desktopMainContent={desktopMainContent}
        desktopSecondaryContent={desktopSecondaryContent}
        containerClassName="hidden lg:flex"
      />
    </>
  );
}
