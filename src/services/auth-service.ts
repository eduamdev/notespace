import { navigate } from "wouter/use-browser-location";
import { encryptWithUserKey, decryptWithUserKey } from "@/lib/encryption-new";

// Simulated token generation
const generateToken = () => "blablablabla";

export const AuthService = {
  register: (username: string, password: string, confirmPassword: string) => {
    // Basic validation
    if (!username || !password || password !== confirmPassword) {
      throw new Error("Please fill in all fields correctly");
    }

    // Here you would handle user registration, for demonstration, let's assume we store user data in localStorage
    const encryptedPassword = encryptWithUserKey(password, confirmPassword);
    localStorage.setItem("username", username);
    localStorage.setItem("password", encryptedPassword);

    // Registration successful, redirect to login page
    navigate("/login");
  },
  login: (username: string, password: string) => {
    // Simulated login logic

    // Here you would perform authentication, for demonstration, let's assume the user data is stored in localStorage
    const storedUsername = localStorage.getItem("username");
    const storedEncryptedPassword = localStorage.getItem("password");

    if (!storedUsername || !storedEncryptedPassword) {
      throw new Error("User not found");
    }

    const storedPassword = decryptWithUserKey(
      storedEncryptedPassword,
      password
    );

    if (username !== storedUsername || password !== storedPassword) {
      throw new Error("Invalid username or password");
    }

    const token = generateToken();
    // Authentication successful, redirect to dashboard
    localStorage.setItem("token", token);
    navigate("/notes");
    return token;
  },
  logout: () => {
    localStorage.removeItem("token");
    navigate("/login");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};
