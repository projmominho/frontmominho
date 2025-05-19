import React from "react";
import logo from "../assets/logo.png"; // Ajuste o caminho da logo se necessário

interface LogoTitleProps {
  title?: string;
  subtitle?: string;
}

export const LogoTitle: React.FC<LogoTitleProps> = ({
  title = "Mominho",
  subtitle = "sua casa de bolinhos",
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center pt-8">
        <img src={logo} alt="Logo" className="w-32 h-32" />
      </div>

      <div className="flex flex-col items-center justify-center pt-4">
        <div className="text-4xl font-bold">{title}</div>
        <div className="pt-2 text-2xl">{subtitle}</div>
      </div>
    </div>
  );
};
