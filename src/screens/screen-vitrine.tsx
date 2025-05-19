import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Error, type ServiceError } from "../components/error";
import { Loading } from "../components/loading";
import { AppContext } from "../providers/context";
import type { Cupcake } from "../types";

export const ScreenVitrine: React.FC = () => {
  const { baseurl } = use(AppContext);
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: vitrine,
  } = useQuery<Cupcake[], ServiceError>({
    queryKey: ["vitrine"],
    queryFn: () => axios.get(baseurl + "/vitrine").then((r) => r.data),
  });

  if (isLoading) {
    return <Loading message="Carregando bolinhos..." />;
  }

  if (error) {
    return <Error message="Erro ao carregar bolinhos" error={error} />;
  }

  return (
    <div className="min-h-screen bg-yellow-100">
      <div className="flex items-center justify-center py-8">
        <img src={logo} alt="Logo" className="w-32 h-32" />
        <div className="pl-8">
          <div className="text-4xl font-bold text-purple-600">Mominho</div>
          <div className="pt-2 text-2xl">sua casa de bolinhos</div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {vitrine?.map?.((cupcake) => (
            <div
              key={cupcake.id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={cupcake.imagem}
                  alt={cupcake.nome}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="card-body p-4">
                {/* Badge de disponibilidade */}
                <div className="mb-2">
                  <div
                    className={`badge ${
                      cupcake.disponibilidade ? "badge-success" : "badge-error"
                    } px-3 py-1 rounded-full text-white text-sm font-medium`}
                  >
                    {cupcake.disponibilidade ? "Disponível" : "Indisponível"}
                  </div>
                </div>
                <div className="text-xl font-semibold">{cupcake.nome}</div>
                <div className="pt-2 text-gray-700">{cupcake.descricao}</div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-lg font-bold">
                    R$ {cupcake?.preco?.toFixed?.(2)}
                  </div>
                  <div
                    className="btn btn-primary text-white"
                    onClick={() => navigate(`detalhes/${cupcake.id}`)}
                  >
                    Ver detalhes
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
