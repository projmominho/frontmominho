import { createContext } from "react";
import type { CartItem } from "../types";

type AppContextType = {
  baseurl: string;
  cart: CartItem[];
  cleanCart: () => void;
  cartAdd: (cartItem: CartItem) => void;
  cartDelete: (cartItem: CartItem) => void;
  address: string;
  addressAdd: (address: string) => void;
  phone: string;
  phoneAdd: (phone: string) => void;
  adminKey: string;
  addAdminKey: (phone: string) => void;
};

export const AppContext = createContext<AppContextType>({
  baseurl: import.meta.env.VITE_BASE_URL,
  cart: [],
  cleanCart: () => {},
  cartAdd: () => {},
  cartDelete: () => {},
  address: "",
  addressAdd: () => {},
  phone: "",
  phoneAdd: () => {},
  adminKey: "",
  addAdminKey: () => {},
});
