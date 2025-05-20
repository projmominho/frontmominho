import React from "react";
import type { AxiosError } from "axios";
import { Link } from "react-router-dom"; // Importando Link para navegação
import { LogoTitle } from "./logo-title";

export type ServiceError = AxiosError<{ detail: { message: string } }>;

export const Error: React.FC<{
  subtitle?: string;
  message?: string;
  error?: ServiceError;
}> = ({ subtitle = "😨 PANE NO SISTEMA 😱", message = "Ocorreu um erro.", error }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <LogoTitle
          title="Mominho"
          subtitle={subtitle}
        />

        <div className="mt-8 w-full alert alert-error">
          <pre
            className="text-xl font-semibold text-center"
            dangerouslySetInnerHTML={{
              __html: error?.response?.data?.detail?.message || message,
            }}
          />
        </div>

        <div className="mt-4 flex justify-center w-full">
          <Link
            to="/"
            className="btn btn-primary text-white text-lg"
          >
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
