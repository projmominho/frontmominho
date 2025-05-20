import React, { type PropsWithChildren } from "react";
import { ProviderContext } from "./provider-context";
import { ProviderQuery } from "./provider-query";
import { ProviderRouter } from "./provider-router";
import { LoadScript } from "@react-google-maps/api";
import { Toaster } from "react-hot-toast";

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
          <Toaster
            position="top-center"
            toastOptions={{
              className: "bg-black shadow-lg border border-base-200 max-w-fit w-auto min-w-0",
              style: {
                maxWidth: "none",
              },
            }}
          />
        </ProviderQuery>
      </ProviderContext>
    </LoadScript>
  );
};
