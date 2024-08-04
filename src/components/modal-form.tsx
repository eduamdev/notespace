import { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
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
          <div className="flex items-center justify-end gap-x-2.5">
            <Button variant="outline" asChild>
              <DialogClose>Cancel</DialogClose>
            </Button>
            <Button type="submit">{title}</Button>
          </div>
        </DialogFooter>
      ) : (
        <DrawerFooter>
          <Button type="submit">{title}</Button>
          <Button variant={"outline"} asChild>
            <DrawerClose>Cancel</DrawerClose>
          </Button>
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
