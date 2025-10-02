# React Authentication Demo with Context API and Reducers

This project demonstrates a simple authentication system in React using the **Context API** combined with **reducers** (via `useReducer` hook) for state management. It handles user login, logout, and persists the user state in `localStorage`. The app includes two components: one for displaying user information and another for handling login/logout forms.

The setup mimics a Redux-like pattern but uses React's built-in hooks, making it lightweight and avoiding external libraries like Redux.

## Table of Contents
- [Overview](#overview)
- [Key Concepts](#key-concepts)
  - [Context API](#context-api)
  - [useReducer Hook](#usereducer-hook)
  - [Combining Context API with Reducers](#combining-context-api-with-reducers)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Setup and Running the Project](#setup-and-running-the-project)
- [Limitations and Improvements](#limitations-and-improvements)

## Overview
This demo app allows users to log in with a name, email, and password. The user data is stored in `localStorage` for persistence across page reloads. The state is managed globally via Context API and updated using a reducer. Changes to `localStorage` (e.g., from another tab) are synchronized using a `storage` event listener.

- **Login**: Dispatches a "login" action with user payload, saves to `localStorage`.
- **Logout**: Dispatches a "logout" action, removes from `localStorage`.
- **Display**: Shows user info if logged in.

## Key Concepts

### Context API
React's **Context API** provides a way to share data (like state or functions) across the component tree without passing props manually at every level (avoiding "prop drilling").

- **createContext**: Creates a context object. It can hold a default value (here, `null`).
- **Provider**: A component that wraps parts of the app and provides the context value to its descendants.
- **Consumer**: Components can access the context value using `useContext` hook (or the older `Consumer` component).

In this project:
- `AuthContext` is created to hold authentication-related data: `user`, `isLoggedIn`, and `dispatch`.
- The `AuthContextProvider` wraps the app and supplies the context value.

This makes the auth state available globally, accessible via a custom hook (`useAuth`).

### useReducer Hook
The **useReducer** hook is React's built-in way to manage complex state logic, similar to Redux reducers. It's ideal for state that involves multiple sub-values or transitions based on actions.

- **Syntax**: `const [state, dispatch] = useReducer(reducer, initialState);`
  - `reducer`: A pure function that takes the current state and an action, returning the new state.
  - `initialState`: The starting state (here, fetched from `localStorage`).
  - `dispatch`: A function to send actions to the reducer.

In this project:
- The reducer handles two actions:
  - `"login"`: Updates state with the user payload and saves to `localStorage`.
  - `"logout"`: Sets state to `null` and removes from `localStorage`.
- Initial state is loaded from `localStorage` using `getInitialUser()`.
- Actions are TypeScript-typed for safety (e.g., `Action` union type).

This approach keeps state updates predictable and centralized.

### Combining Context API with Reducers
By combining Context API with `useReducer`, you create a global state management system:
1. Use `useReducer` in the provider to manage state and get the `dispatch` function.
2. Pass the state and `dispatch` as the context value via the Provider.
3. Child components access it via `useContext` (wrapped in a custom hook for convenience and error handling).

Benefits:
- **Centralized State**: Auth state is managed in one place.
- **Scalability**: Easy to add more actions (e.g., "register", "updateUser").
- **Persistence**: Integrated with `localStorage` for session-like behavior.
- **Sync Across Tabs**: `useEffect` listens to `storage` events to update state if `localStorage` changes (e.g., logout in another tab).

Full Concept Flow:
1. **Initialization**: On app load, `getInitialUser()` parses user from `localStorage` (or returns `null`).
2. **Provider Setup**: `useReducer` initializes with this user. `useEffect` adds a listener for `storage` changes, dispatching login/logout accordingly.
3. **Login**: Form in `Component2` collects data, dispatches `"login"` with payload. Reducer updates state and saves to `localStorage`.
4. **Logout**: Button dispatches `"logout"`. Reducer clears state and `localStorage`.
5. **Consumption**: `Component1` and `Component2` use `useAuth()` to get `user`, `isLoggedIn`, and `dispatch`. They render conditionally based on login status.
6. **Error Handling**: `useAuth` throws an error if used outside the provider.

This pattern is great for medium-sized apps needing global state without Redux overhead.

## Project Structure
```
src/
├── App.tsx                # Main app component rendering Component1 and Component2
├── index.tsx              # Entry point, wraps App with AuthContextProvider
├── contexts/
│   └── AuthContext.tsx    # Context creation, reducer, provider, and storage handling
├── hooks/
│   └── useAuth.ts         # Custom hook to consume AuthContext
├── components/
│   ├── Component1.tsx     # Displays user info if logged in
│   └── Component2.tsx     # Login form or logout button
├── index.css              # Basic Tailwind-like styles (assuming Tailwind setup)
└── App.tsx                # (Duplicate in query, but assume one)
```

## How It Works
1. **Wrap the App**: In `index.tsx`, wrap `<App />` with `<AuthContextProvider>`.
2. **State Management**:
   - Reducer updates state based on actions.
   - `localStorage` persists the user JSON.
3. **Event Listener**: Syncs state if `localStorage` changes externally.
4. **Components**:
   - `Component1`: Shows user name/email if logged in.
   - `Component2`: Renders login form or logout button.
5. **Type Safety**: Uses TypeScript for `User`, `Action`, and context types.

## Setup and Running the Project
1. **Prerequisites**: Node.js, npm/yarn.
2. **Install Dependencies**: `npm install` (assumes React, React-DOM, TypeScript setup).
3. **Run**: `npm run dev` (or `vite` if using Vite).
4. **Test**:
   - Open the app.
   - Fill the form in Component2 and submit to login.
   - See user info in Component1.
   - Logout and observe changes.
   - Open another tab; login/logout syncs across tabs.

## Limitations and Improvements
- **Security**: Password is stored in plain text in `localStorage`—**never do this in production!** Use secure tokens (e.g., JWT) and backend auth.
- **Validation**: No form validation; add libraries like Formik/Yup.
- **Error Handling**: Basic; expand for network errors if integrating API.
- **Enhancements**:
  - Integrate with a backend (e.g., Firebase Auth).
  - Add loading states or more actions (e.g., "register").
  - Use `useSyncExternalStore` for better storage syncing if needed.

This demo illustrates the power of React's built-in tools for state management. For questions, refer to React docs on [Context](https://react.dev/reference/react/createContext) and [useReducer](https://react.dev/reference/react/useReducer).