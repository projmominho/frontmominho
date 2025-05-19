import React from "react";
import type { AxiosError } from "axios";
import { Link } from "react-router-dom"; // Importando Link para navegação
import { LogoTitle } from "./logo-title";

export type ServiceError = AxiosError<{ detail: { message: string } }>;

export const Error: React.FC<{
  message?: string;
  error?: ServiceError;
}> = ({ message = "Ocorreu um erro.", error }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <LogoTitle title="Mominho" subtitle="😨 PANE NO SISTEMA 😱" />

        <div className="mt-8 alert alert-error mx-4">
          <pre className="text-xl font-semibold">
            {error?.response?.data?.detail?.message || message} 😢
          </pre>
        </div>

        <div className="mt-4 flex">
          <Link to="/" className="btn btn-primary text-white text-lg">
            🏠 Ir pra Home
          </Link>

          <a
            href="mailto:projmominho@proton.me"
            className="btn btn-secondary text-white text-lg ml-2"
          >
            📧 Entrar em Contato
          </a>
        </div>
      </div>
    </div>
  );
};
