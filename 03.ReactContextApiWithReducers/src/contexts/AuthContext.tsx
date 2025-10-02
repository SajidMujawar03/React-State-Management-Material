import { createContext, useEffect, useReducer, type ReactNode } from "react";

type User = {
  name: string;
  email: string;
  password?: string;
} | null;

type Action = {
  type:"logout"
} |
{
    type:'login';
    payload:User
}

type AuthContextType = {
  user: User;
  isLoggedIn: boolean;
  dispatch: React.Dispatch<Action>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const reducer = (state: User, action: Action): User => {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload ?? null));
      return action.payload ?? null;

    case "logout":
      localStorage.removeItem("user");
      return null;

    default:
      return state;
  }
};

const getInitialUser = (): User => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialUser());

  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = getInitialUser();

      if (currentUser) {
        dispatch({ type: "login", payload: currentUser });
      } else {
        dispatch({ type: "logout" });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: state, isLoggedIn: !!state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
