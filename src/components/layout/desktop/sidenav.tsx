import { Link } from "wouter";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import Logo from "@/assets/logo.svg";
import { NoteIcon } from "@/components/icons/note-icon";
import { NotebookIcon } from "@/components/icons/notebook-icon";
import { HeartIcon } from "@/components/icons/heart-icon";
import { TagsIcon } from "@/components/icons/tags-icon";

function Sidenav() {
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
            <div className="space-y-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/notes"
                    className="flex items-center justify-center p-1"
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
                    className="flex items-center justify-center p-1"
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
                    href="/favorites"
                    className="flex items-center justify-center p-1"
                  >
                    <HeartIcon className="size-6 shrink-0 text-neutral-700" />
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
                    className="flex items-center justify-center p-1"
                  >
                    <TagsIcon className="size-6 shrink-0 text-neutral-700" />
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
