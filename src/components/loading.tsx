import React from "react";
import { LogoTitle } from "./logo-title";

export const Loading: React.FC<{ message?: string }> = ({
  message = "Carregando...",
}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <LogoTitle />

        <div className="px-8 mt-8 flex justify-center items-center">
          <span className="text-6xl animate-bounce">{`🧁`}</span>
          <span className="text-xl font-semibold ml-4">{message}</span>
        </div>
      </div>
    </div>
  );
};
