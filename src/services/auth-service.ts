import { navigate } from "wouter/use-browser-location";

// Simulated user database
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

// Simulated token generation
const generateToken = () => "this_is_a_random_text";

export const AuthService = {
  login: (username: string, password: string) => {
    // Simulated login logic
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      const token = generateToken();
      localStorage.setItem("token", token);
      navigate("/notes/all");
      return token;
    } else {
      throw new Error("Invalid username or password");
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    navigate("/login");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};
