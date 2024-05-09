import { useState } from "react";
import { Link } from "wouter";
import { AuthService } from "@/services/auth-service";
import Logo from "@/assets/logo.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      AuthService.login(username, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="relative flex h-dvh w-dvw flex-col items-center">
      <div className="absolute top-[20%] w-full max-w-sm">
        <div className="flex items-center justify-center pb-7">
          <img src={Logo} alt="" height={38} width={38} />
        </div>
        <h1 className="text-center text-xl font-semibold text-black">
          Log in to NoteGuard
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 pt-10">
            <div>
              <label htmlFor="username" className="sr-only">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                placeholder="Username"
                className="w-full border-b-[1.5px] py-2 text-[17px] transition-colors placeholder:text-base focus-visible:border-b focus-visible:border-neutral-700 focus-visible:outline-none"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                className="w-full border-b-[1.5px] py-2 text-[17px] transition-colors placeholder:text-base focus-visible:border-b focus-visible:border-neutral-700 focus-visible:outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          {error && (
            <div className="pt-4">
              <span className="text-red-600">{error}</span>
            </div>
          )}
          <div className="pt-7">
            <button
              type="submit"
              className="w-full rounded-lg bg-neutral-950 px-2 py-2.5 font-semibold capitalize text-white"
            >
              continue
            </button>
          </div>
        </form>
        <div className="pt-7 text-center">
          <span className="text-[15px] text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-semibold text-black">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
