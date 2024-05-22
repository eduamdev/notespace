import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  login as loginUser,
  logout as logoutUser,
  register as registerUser,
} from "@/services/auth-service";
import { User } from "@/models/user";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    void fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    const loggedInUser = await loginUser(username, password);
    setUser(loggedInUser);
  };

  const logout = () => {
    void logoutUser();
    setUser(null);
  };

  const register = async (username: string, password: string) => {
    await registerUser(username, password);
    const newUser = await loginUser(username, password);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
