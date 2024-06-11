import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useSignup } from "@/hooks/use-auth";
import Logo from "@/assets/logo.svg";

function SignUp() {
  const signupMutation = useSignup();
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || !confirmPassword) {
      setError("All fields are required. Please complete the form");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter your password");
      return;
    }

    try {
      await signupMutation.mutateAsync({ username, password });
      console.log("new user registered!");
      setLocation("/login");
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
          Sign up to NoteGuard
        </h1>
        <form onSubmit={(event) => void handleRegister(event)}>
          <div className="space-y-3 pt-10">
            <div>
              <label htmlFor="username" className="sr-only">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
                className="w-full border-b-[1.5px] py-2 text-[17px] transition-colors placeholder:text-base focus-visible:border-b focus-visible:border-neutral-700 focus-visible:outline-none"
                required
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                className="w-full border-b-[1.5px] py-2 text-[17px] transition-colors placeholder:text-base focus-visible:border-b focus-visible:border-neutral-700 focus-visible:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="Confirm Password"
                className="w-full border-b-[1.5px] py-2 text-[17px] transition-colors placeholder:text-base focus-visible:border-b focus-visible:border-neutral-700 focus-visible:outline-none"
                required
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
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-black">
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
