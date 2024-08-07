import { Link } from "wouter";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useRoute } from "wouter";

import Logo from "@/assets/logo.svg";
import { NoteIcon } from "@/components/icons/note-icon";
import { NotebookIcon } from "@/components/icons/notebook-icon";
import { StarIcon } from "@/components/icons/star-icon";
import { HashIcon } from "@/components/icons/hash-icon";
import { cn } from "@/lib/utils";

function Sidenav() {
  const [matchNoteRoutes] = useRoute("/notes/*?");
  const [matchNotebookRoutes] = useRoute("/notebooks/*?");
  const [matchTagRoutes] = useRoute("/tags/*?");
  const [matchFavoriteRoutes] = useRoute("/favorites/*?");

  const linkClassNames =
    "rounded-lg flex items-center justify-center px-2.5 py-2 border border-transparent";
  const activeLinkClassNames = "border-neutral-950/[0.12] bg-white shadow-sm";

  return (
    <aside className="w-16 p-3">
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-center pb-2 pt-5">
            <img
              src={Logo}
              alt=""
              className="inline-flex size-[26px] shrink-0"
            />
          </div>
          <div className="py-7">
            <div className="mx-auto h-[2px] w-5 bg-neutral-950/10"></div>
          </div>
          <nav>
            <div className="space-y-[18px]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/notes"
                    className={cn(
                      linkClassNames,
                      matchNoteRoutes && activeLinkClassNames
                    )}
                  >
                    <NoteIcon className="size-6 shrink-0 text-neutral-700" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={24}
                  collisionPadding={{ top: 20, bottom: 20, left: 20 }}
                >
                  <p>Notes</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/notebooks"
                    className={cn(
                      linkClassNames,
                      matchNotebookRoutes && activeLinkClassNames
                    )}
                  >
                    <NotebookIcon className="size-6 shrink-0 text-neutral-700" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={24}
                  collisionPadding={{ top: 20, bottom: 20, left: 20 }}
                >
                  <p>Notebooks</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/favorites/notes"
                    className={cn(
                      linkClassNames,
                      matchFavoriteRoutes && activeLinkClassNames
                    )}
                  >
                    <StarIcon className="size-6 shrink-0 text-neutral-700" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={24}
                  collisionPadding={{ top: 20, bottom: 20, left: 20 }}
                >
                  <p>Favorites</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/tags"
                    className={cn(
                      linkClassNames,
                      matchTagRoutes && activeLinkClassNames
                    )}
                  >
                    <HashIcon className="size-6 shrink-0 text-neutral-700" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={24}
                  collisionPadding={{ top: 20, bottom: 20, left: 20 }}
                >
                  <p>Tags</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default Sidenav;
