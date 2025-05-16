import { createContext } from "react";

export const AppContext = createContext({
  baseurl: import.meta.env.VITE_BASE_URL,
});
