import { useState, type FC, type PropsWithChildren } from "react";
import { AppContext } from "./context.tsx";

export const ProviderContext: FC<PropsWithChildren> = ({ children }) => {
  const [baseurl] = useState(import.meta.env.VITE_BASE_URL);

  return <AppContext value={{ baseurl }}>{children}</AppContext>;
};
