import { StrictMode, useState, type FC, type PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContext } from "./context.tsx";

// instância para fazer chamadas no backend
const queryClient = new QueryClient();

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [baseurl] = useState(import.meta.env.VITE_BASE_URL);

  return <AppContext value={{ baseurl }}>{children}</AppContext>;
};

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
      </StrictMode>
    </QueryClientProvider>
  </AppContextProvider>
);
