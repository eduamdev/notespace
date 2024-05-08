import React, { useState } from "react";
import { navigate } from "wouter/use-browser-location";
import { encryptWithUserKey } from "@/lib/encryption-new";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!username || !password || password !== confirmPassword) {
      setError("Please fill in all fields correctly");
      return;
    }

    // Here you would handle user registration, for demonstration, let's assume we store user data in localStorage
    const encryptedPassword = encryptWithUserKey(password, confirmPassword);
    localStorage.setItem("username", username);
    localStorage.setItem("password", encryptedPassword);

    // Registration successful, redirect to login page
    navigate("/login");
  };

  return (
    <>
      <h1 className="py-3 text-xl font-semibold">Sign up</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default SignUp;
