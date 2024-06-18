import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.svg";

export default function MobileLayoutView({
  mobileMainContent,
  containerClassName,
}: {
  mobileMainContent: React.ReactNode;
  containerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-dvh w-dvw flex-col items-center",
        containerClassName
      )}
    >
      <div className="flex size-full flex-row bg-gradient-to-b from-neutral-50 via-neutral-50 to-neutral-100">
        <div className="flex size-full items-center justify-center">
          <div className="z-10 h-[calc(100dvh_-_20px)] w-[calc(100%_-_20px)] rounded-[10px] border border-neutral-950/[0.12] bg-white shadow-sm">
            <div className="px-4 py-5">
              <div className="flex items-center justify-between">
                <img
                  src={Logo}
                  alt="App Logo"
                  className="inline-flex size-[26px] shrink-0"
                />
                <div>menu</div>
              </div>
              <div className="pt-5">{mobileMainContent}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
