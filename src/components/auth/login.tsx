import { useState } from "react";

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
    <>
      <h1 className="py-3 text-xl font-semibold">Login</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            className="border"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            className="border"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="bg-neutral-200 px-2 py-1">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
