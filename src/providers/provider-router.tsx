import type { PropsWithChildren } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScreenVitrine } from "../screens/screen-vitrine";
import { ScreenDetalhes } from "../screens/screen-detalhes";
import { ScreenCarrinho } from "../screens/screen-carrinho";
import { ScreenEnvio } from "../screens/screen-envio";
import { ScreenPagamento } from "../screens/screen-pagamento";

export const ProviderRouter: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScreenVitrine />} />
        <Route path="/detalhes/:id" element={<ScreenDetalhes />} />
        <Route path="/carrinho" element={<ScreenCarrinho />} />
        <Route path="/envio" element={<ScreenEnvio />} />
        <Route path="/pagamento/:id" element={<ScreenPagamento />} />
        {children}
      </Routes>
    </BrowserRouter>
  );
};
