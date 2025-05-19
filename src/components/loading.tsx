import React from "react";
import logo from "../assets/logo.png";

export const Loading: React.FC<{ message?: string }> = ({
  message = "Carregando...",
}) => {
  return (
    <div className="flex justify-center items-center h-screen bg-yellow-100">
      <div className="text-center">
        <div className="flex justify-center py-8">
          <img src={logo} alt="Logo" className="w-32 h-32" />
        </div>

        <div className="text-4xl font-bold text-purple-600">Mominho</div>
        <div className="text-2xl">sua casa de bolinhos</div>

        <div className="mt-8 flex justify-center items-center">
          <span className="text-6xl animate-bounce">{`🧁`}</span>
          <span className="text-xl font-semibold ml-4">{message}</span>
        </div>
      </div>
    </div>
  );
};
