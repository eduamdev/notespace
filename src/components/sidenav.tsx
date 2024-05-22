import { Link } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/auth-context";

import Logo from "@/assets/logo.svg";
import { NoteIcon } from "@/components/icons/note-icon";
import { NotebookIcon } from "@/components/icons/notebook-icon";
import { StarIcon } from "@/components/icons/star-icon";
import { TagsIcon } from "@/components/icons/tags-icon";
import { LogoutIcon } from "@/components/icons/logout-icon";

function Sidenav() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <TooltipProvider>
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
          <div className="pb-4">
            {user && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center p-1"
                  >
                    <LogoutIcon className="size-6 shrink-0 text-neutral-700" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  collisionPadding={{ top: 20, bottom: 20, left: 20 }}
                >
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}

export default Sidenav;
