import { createContext } from "react";
import type { CartItem } from "../types";

type AppContextType = {
  baseurl: string;
  cart: CartItem[];
  cartAdd: (cartItem: CartItem) => void;
  cartDelete: (cartItem: CartItem) => void;
  address: string;
  addressAdd: (address: string) => void;
  phone: string;
  phoneAdd: (phone: string) => void;
};

export const AppContext = createContext<AppContextType>({
  baseurl: import.meta.env.VITE_BASE_URL,
  cart: [],
  cartAdd: () => {},
  cartDelete: () => {},
  address: "",
  addressAdd: () => {},
  phone: "",
  phoneAdd: () => {},
});
