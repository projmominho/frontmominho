import React from "react";
import logo from "../assets/logo.png";
import type { AxiosError } from "axios";

export type ServiceError = AxiosError<{ detail: { message: string } }>;

export const Error: React.FC<{
  message?: string;
  error?: ServiceError;
}> = ({ message = "Ocorreu um erro.", error }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-yellow-100">
      <div className="text-center">
        <div className="flex justify-center py-8">
          <img src={logo} alt="Logo" className="w-32 h-32" />
        </div>

        <div className="text-4xl font-bold text-purple-600">Mominho</div>
        <div className="text-2xl">sua casa de bolinhos</div>

        <div className="mt-8 alert alert-error shadow-lg">
          <div>
            <span className="text-xl font-semibold">
              {error?.response?.data?.detail?.message || message} 😢
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
