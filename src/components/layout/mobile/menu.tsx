import { MenuIcon } from "@/components/icons/menu-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";

function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: ((open: boolean) => void) | undefined;
}) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger className="rounded-md p-1">
        <MenuIcon className="text-neutral-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent collisionPadding={15}>
        <DropdownMenuItem asChild>
          <Link href="/notes">Notes</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/notebooks">Notebooks</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/favorites">Favorites</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/tags">Tags</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileMenu;
