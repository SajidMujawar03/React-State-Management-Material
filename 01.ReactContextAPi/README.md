# React Authentication Context Example

This project demonstrates a simple **authentication system in React** using **Context API**, **custom hooks**, and **localStorage** for persisting user sessions.

---

## Table of Contents

1. [Overview](#overview)  
2. [Folder Structure](#folder-structure)  
3. [Components](#components)  
4. [Auth Context](#auth-context)  
5. [Custom Hook](#custom-hook)  
6. [Usage](#usage)  
7. [Features](#features)  

---

## Overview

This example implements a **login/logout system** in React:

- Stores the authenticated user in `localStorage`.
- Shares user state across multiple components using **React Context**.
- Provides a **custom hook (`useAuth`)** to access authentication methods easily.
- Synchronizes login state across multiple tabs/windows using `storage` event.

---

## Folder Structure

```
src/
│
├─ contexts/
│   └─ AuthContext.tsx
│
├─ hooks/
│   └─ useAuth.ts
│
├─ components/
│   ├─ Component1.tsx   # Displays user info
│   └─ Component2.tsx   # Login form & logout button
│
└─ App.tsx
```

---

## Components

### Component1

- **Purpose:** Displays the currently logged-in user.
- **Behavior:**
  - Shows user info (name & email) if logged in.
  - Displays a message if no user is logged in.
  
```tsx
const Component1 = () => {
  const { user, isLoggedIn } = useAuth();
  return (
    <div>
      {isLoggedIn ? <div>{user?.name}</div> : <div>No User Logged In</div>}
    </div>
  );
};
```

### Component2

- **Purpose:** Login form and logout functionality.
- **Behavior:**
  - Accepts `name`, `email`, `password`.
  - Calls `login` method from `AuthContext` on submit.
  - Shows logout button if already logged in.

```tsx
const Component2 = () => {
  const { login, logout, isLoggedIn } = useAuth();
  // form handling
};
```

---

## Auth Context

### AuthContext.tsx

- Provides the global **authentication state** and **methods**.
- Stores the user in `localStorage` to persist sessions.
- Exposes:
  - `user` – currently logged-in user
  - `isLoggedIn` – boolean flag
  - `login(user)` – logs in a user
  - `logout()` – logs out the user

```tsx
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: AuthContextProp) => {
  const [user, setUser] = useState<User | null>(getInitialUser());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getInitialUser());

  const login = (user: User) => { ... };
  const logout = () => { ... };

  useEffect(() => {
    const handleStorageChange = () => { ... };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Key Concepts:**

- `getInitialUser()` reads user from `localStorage`.
- `useEffect` listens for `storage` changes across tabs.
- `login()` and `logout()` update state and `localStorage`.

---

## Custom Hook

### useAuth.ts

- A **custom hook** to simplify using `AuthContext`.
- Ensures that `AuthContext` is used inside its provider.

```ts
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthContextProvider");
  return context;
};
```

**Benefits:**

- Cleaner access to auth state in components.
- Avoids repetitive `useContext` boilerplate.

---

## Usage

1. Wrap your App with `AuthContextProvider`:

```tsx
import AuthContextProvider from "./contexts/AuthContext";

<AuthContextProvider>
  <App />
</AuthContextProvider>
```

2. Use `useAuth()` in any component:

```tsx
const { user, login, logout, isLoggedIn } = useAuth();
```

3. Use `login(user)` to log in and `logout()` to log out.

---

## Features

- Persistent login using `localStorage`.
- Real-time synchronization across browser tabs.
- Simple login form with conditional rendering.
- Easy-to-use custom hook for context access.
- TypeScript support with proper type safety.

---

This setup is a **lightweight alternative to full authentication libraries** like Redux or React Query and works perfectly for simple React apps that require basic login functionality.