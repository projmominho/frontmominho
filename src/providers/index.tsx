import React, { type PropsWithChildren } from "react";
import { ProviderContext } from "./provider-context";
import { ProviderQuery } from "./provider-query";
import { ProviderRouter } from "./provider-router";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"] as any;

// Componente Providers que encapsula todos os providers
export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_PLACES_API_KEY}
      libraries={libraries}
    >
      <ProviderContext>
        <ProviderQuery>
          <ProviderRouter>{children}</ProviderRouter>
        </ProviderQuery>
      </ProviderContext>
    </LoadScript>
  );
};
