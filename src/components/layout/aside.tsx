import { Link } from "wouter";
import { AuthService } from "@/services/auth-service";
import Logo from "@/assets/logo.svg";

function Aside() {
  const isAuthenticated = AuthService.isAuthenticated();

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <aside className="relative w-52 bg-neutral-50 p-3 after:absolute after:right-0 after:top-0 after:h-full after:w-px after:border-r after:border-neutral-200 after:content-['']">
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-start px-2 pb-7 pt-1">
            <img src={Logo} alt="" className="inline-flex size-[22px]" />
          </div>
          <nav>
            <div className="space-y-1.5">
              <Link
                href="/notes/all"
                className="flex items-center gap-1.5 rounded-md bg-neutral-200/60 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M13 20l7 -7" />
                  <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
                </svg>
                <span className="text-sm font-medium">Notes</span>
              </Link>
              <a href="" className="flex items-center gap-1.5 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
                  <path d="M13 8l2 0" />
                  <path d="M13 12l2 0" />
                </svg>
                <span className="text-sm">Notebooks</span>
              </a>
            </div>
          </nav>
        </div>
        <div className="pb-8">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="block w-full p-2 text-left"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Aside;
