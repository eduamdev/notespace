import { useState } from "react";
import { Link } from "wouter";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    onLogin(username, password);
  };

  return (
    <div className="relative flex h-dvh w-dvw flex-col items-center">
      <div className="absolute top-[20%] w-full max-w-sm">
        <h1 className="pb-6 text-center text-xl font-semibold">
          Sign in to NoteGuard
        </h1>
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-3.5 py-[30px]">
            <div>
              <label htmlFor="username" className="sr-only">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                placeholder="Username"
                className="w-full border-b-[1.5px] py-2 text-[17px] placeholder:text-base focus-visible:border-b focus-visible:border-neutral-700 focus-visible:outline-none"
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
                className="w-full border-b-[1.5px] py-2 text-[17px] placeholder:text-base focus-visible:border-b focus-visible:border-neutral-700 focus-visible:outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-neutral-600 px-2 py-2.5 font-medium capitalize text-white"
            >
              continue
            </button>
          </div>
        </form>
        <div className="pt-7 text-center">
          <span className="text-[15px] text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-medium text-black">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
