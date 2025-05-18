import type { PropsWithChildren } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScreenVitrine from "../screens/screen-vitrine";


export const ProviderRouter: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScreenVitrine />} />
        {children}
      </Routes>
    </BrowserRouter>
  );
};