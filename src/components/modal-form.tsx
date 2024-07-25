import { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DESKTOP_MEDIA_QUERY } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  trigger: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
}

export default function ModalForm({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  onSubmit,
  children,
}: ModalFormProps) {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

  const content = (
    <form onSubmit={onSubmit}>
      <div className={cn("pt-3", !isDesktop && "px-4")}>{children}</div>
      {isDesktop ? (
        <DialogFooter>
          <div className="flex items-center justify-end gap-x-3.5">
            <DialogClose className="flex h-9 items-center justify-center rounded-lg border border-neutral-950/[0.12] bg-transparent px-4 text-neutral-700 shadow-sm">
              Cancel
            </DialogClose>
            <button
              type="submit"
              className="flex h-9 items-center justify-center rounded-lg border border-transparent bg-neutral-800 px-4 font-medium text-neutral-50"
            >
              {title}
            </button>
          </div>
        </DialogFooter>
      ) : (
        <DrawerFooter>
          <button
            type="submit"
            className="flex h-10 items-center justify-center rounded-lg border border-transparent bg-neutral-800 px-4 text-[15px] font-medium text-neutral-50"
          >
            {title}
          </button>
          <DrawerClose className="flex h-10 items-center justify-center rounded-lg border border-neutral-950/[0.12] bg-transparent px-4 text-[15px] text-neutral-700 shadow-sm">
            Cancel
          </DrawerClose>
        </DrawerFooter>
      )}
    </form>
  );

  return isDesktop ? (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription className="sr-only">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>
  );
}
