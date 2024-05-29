import { createContext, useState, useEffect, ReactNode } from "react";
import * as authService from "@/services/auth-service";
import { User } from "@/models/user";

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authService.getCurrentUser();
      console.log("current user is: ", currentUser);
      setUser(currentUser);
    };
    void fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    const loggedInUser = await authService.login(username, password);
    console.log("loggedInUser:", loggedInUser);
    setUser(loggedInUser);
  };

  useEffect(() => {
    console.log("User state in AuthProvider:", user);
  }, [user]);

  const register = async (username: string, password: string) => {
    await authService.register(username, password);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
