import { createContext, useEffect, useState, type ReactNode } from "react";

type User = {
  name: string;
  email: string;
  password?: string; // password optional for safety
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

type AuthContextProp = {
  children: ReactNode;
};

const getInitialUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: AuthContextProp) => {
  const [user, setUser] = useState<User | null>(getInitialUser());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getInitialUser());

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  // Optional: sync login state if localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = getInitialUser();
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
