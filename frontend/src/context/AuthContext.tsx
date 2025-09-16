// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { DecodedToken, Role } from "../types/auth";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuth: boolean;
  role: Role | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setRole(decoded.role);
          setIsAuth(true);
        } else {
          Cookies.remove("token");
        }
      } catch {
        Cookies.remove("token");
      }
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setRole(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
