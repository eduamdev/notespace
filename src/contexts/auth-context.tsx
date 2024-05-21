import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginUser,
  logout as logoutUser,
  getCurrentUser,
} from "@/services/auth-service";

interface AuthContextProps {
  user: unknown;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    void loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    const loggedInUser = await loginUser(username, password);
    setUser(loggedInUser);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
