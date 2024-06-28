import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileMenu from "@/components/layout/mobile/menu";

import Logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";

export default function MobileLayoutView({
  mobileMainContent,
  containerClassName,
}: {
  mobileMainContent: React.ReactNode;
  containerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div
      className={cn(
        "flex h-dvh w-dvw flex-col items-center",
        containerClassName
      )}
    >
      <div className="size-full bg-neutral-50">
        <div className="size-full pt-[10px]">
          <div className="size-full rounded-t-[10px] border border-neutral-950/[0.12] bg-white shadow-sm">
            <div className="px-4 py-5">
              <div className="flex items-center justify-between">
                <img
                  src={Logo}
                  alt="App Logo"
                  className="inline-flex size-[26px] shrink-0"
                />
                {!isDesktop && (
                  <MobileMenu open={open} onOpenChange={setOpen} />
                )}
              </div>
              <div className="pt-5">{mobileMainContent}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
