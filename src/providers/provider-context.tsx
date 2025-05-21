import { useCallback, useState, type FC, type PropsWithChildren } from "react";
import { AppContext } from "./context.tsx";
import type { CartItem } from "../types.ts";

export const ProviderContext: FC<PropsWithChildren> = ({ children }) => {
  const loadLocalStorage = (key: string, defaultValue: any) => {
    const storedCart = localStorage.getItem(key);
    return storedCart ? JSON.parse(storedCart) : defaultValue;
  };

  const saveLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const [cart, setCart] = useState<CartItem[]>(loadLocalStorage("cart", []));

  const cleanCart = () => {
    setCart([]);
    saveLocalStorage("cart", []);
  };

  const cartAdd = useCallback(
    (cartItem: CartItem) =>
      setCart((p) => {
        const newCart = p.filter((c) => c.cupcake.id != cartItem.cupcake.id);

        newCart.push(cartItem);
        saveLocalStorage("cart", newCart);
        return newCart;
      }),
    [setCart]
  );

  const cartDelete = useCallback(
    (cartItem: CartItem) => {
      setCart((prevCart) => {
        const newCart = prevCart.filter((c) => c.cupcake.id !== cartItem.cupcake.id);
        saveLocalStorage("cart", newCart);
        return newCart;
      });
    },
    [setCart]
  );

  const [address, setAddress] = useState<string>(loadLocalStorage("address", ""));

  const addressAdd = useCallback(
    (newAddress: string) => {
      saveLocalStorage("address", newAddress);
      setAddress(newAddress);
    },
    [setAddress]
  );

  const [phone, setPhone] = useState<string>(loadLocalStorage("phone", ""));

  const phoneAdd = useCallback(
    (newPhone: string) => {
      saveLocalStorage("phone", newPhone);
      setPhone(newPhone);
    },
    [setAddress]
  );

  const [adminKey, setAdminKey] = useState<string>(loadLocalStorage("adminKey", ""));

  const addAdminKey = useCallback(
    (newAdminKey: string) => {
      saveLocalStorage("adminKey", newAdminKey);
      setAdminKey(newAdminKey);
    },
    [setAddress]
  );

  return (
    <AppContext
      value={{
        baseurl: import.meta.env.VITE_BASE_URL,
        cart,
        cleanCart,
        cartAdd,
        cartDelete,
        address,
        addressAdd,
        phone,
        phoneAdd,
        adminKey,
        addAdminKey,
      }}
    >
      {children}
    </AppContext>
  );
};
