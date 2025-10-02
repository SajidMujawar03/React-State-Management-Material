import { createStore } from "redux";

// Use primitive 'string' instead of 'String'
type User = {
  name: string;
  email: string;
  password: string;
} | null;

export type State = {
  user: User;
  isLoggedIn: boolean;
};

// Action types
type Action = { type: "login"; payload: User } | { type: "logout" };

// Initialize state from localStorage
const initialState: State = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoggedIn: !!localStorage.getItem("user"),
};

// Reducer
const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "login":
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
      return { user: action.payload, isLoggedIn: true };
    case "logout":
      localStorage.removeItem("user");
      return { user: null, isLoggedIn: false };
    default:
      return state;
  }
};

// Create store
const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
