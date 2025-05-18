import React, { type PropsWithChildren } from "react";
import { ProviderContext } from "./provider-context";
import { ProviderQuery } from "./provider-query";
import { ProviderRouter } from "./provider-router";

// Componente Providers que encapsula todos os providers
export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProviderContext>
      <ProviderQuery>
        <ProviderRouter>{children}</ProviderRouter>
      </ProviderQuery>
    </ProviderContext>
  );
};
