import { Link } from "wouter";
import { AuthService } from "@/services/auth-service";
import Logo from "@/assets/logo.svg";

function Aside() {
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
            <div className="space-y-5">
              <Link
                href="/notes/all"
                className="flex items-center justify-center p-1"
              >
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
                  className="size-6 shrink-0 text-neutral-700"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M13 20l7 -7" />
                  <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
                </svg>
              </Link>
              <a href="" className="flex items-center justify-center p-1">
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
                  className="size-6 shrink-0 text-neutral-700"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
                  <path d="M13 8l2 0" />
                  <path d="M13 12l2 0" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
        <div className="pb-4">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-1"
            >
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
                className="size-6 shrink-0 text-neutral-700"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M9 12h12l-3 -3" />
                <path d="M18 15l3 -3" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Aside;
