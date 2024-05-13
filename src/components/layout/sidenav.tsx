import { Link } from "wouter";
import { AuthService } from "@/services/auth-service";
import Logo from "@/assets/logo.svg";
import { NoteIcon } from "@/components/icons/note-icon";
import { NotebookIcon } from "@/components/icons/notebook-icon";
import { StarIcon } from "@/components/icons/star-icon";
import { TagsIcon } from "@/components/icons/tags-icon";
import { LogoutIcon } from "@/components/icons/logout-icon";

function Sidenav() {
  const isAuthenticated = AuthService.isAuthenticated();

  const handleLogout = () => {
    AuthService.logout();
  };

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
              <Link
                href="/notes"
                className="flex items-center justify-center p-1"
              >
                <NoteIcon className="size-6 shrink-0 text-neutral-700" />
              </Link>
              <div className="flex items-center justify-center p-1">
                <NotebookIcon className="size-6 shrink-0 text-neutral-700" />
              </div>
              <div className="flex items-center justify-center p-1">
                <StarIcon className="size-6 shrink-0 text-neutral-700" />
              </div>
              <div className="flex items-center justify-center p-1">
                <TagsIcon className="size-6 shrink-0 text-neutral-700" />
              </div>
            </div>
          </nav>
        </div>
        <div className="pb-4">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-1"
            >
              <LogoutIcon className="size-6 shrink-0 text-neutral-700" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidenav;
