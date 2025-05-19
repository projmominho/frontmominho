import type { PropsWithChildren } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScreenVitrine } from "../screens/screen-vitrine";
import { ScreenDetalhes } from "../screens/screen-detalhes";

export const ProviderRouter: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScreenVitrine />} />
        <Route path="/detalhes/:id" element={<ScreenDetalhes />} />
        {children}
      </Routes>
    </BrowserRouter>
  );
};
