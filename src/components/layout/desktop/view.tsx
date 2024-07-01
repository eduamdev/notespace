import Sidenav from "@/components/layout/desktop/sidenav";
import { cn } from "@/lib/utils";

function DesktopLayoutView({
  desktopMainContent,
  desktopSecondaryContent,
  containerClassName,
}: {
  desktopMainContent: React.ReactNode;
  desktopSecondaryContent?: React.ReactNode;
  containerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "h-dvh w-dvw flex-col items-center flex",
        containerClassName
      )}
    >
      <div className="flex size-full flex-row bg-gradient-to-b from-neutral-50 via-neutral-50 to-neutral-100">
        <Sidenav />
        <div className="flex size-full items-center">
          <div className="z-10 grid h-[calc(100dvh_-_20px)] w-[calc(100%_-_10px)] grid-cols-[420px,1fr] rounded-[10px] border border-neutral-950/[0.12] bg-white shadow-sm">
            <div className="relative after:absolute after:right-0 after:top-0 after:h-full after:w-px after:border-r after:border-neutral-950/10 after:content-['']">
              {desktopMainContent}
            </div>
            <div>{desktopSecondaryContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopLayoutView;
