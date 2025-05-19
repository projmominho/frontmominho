import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";
import ModalImage from "react-modal-image";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { type ServiceError, Error } from "../components/error";
import { Loading } from "../components/loading";
import { AppContext } from "../providers/context";
import type { Cupcake } from "../types";

export const ScreenDetalhes: React.FC = () => {
  const { baseurl } = use(AppContext);
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    error,
    data: cupcake,
  } = useQuery<Cupcake, ServiceError>({
    queryKey: ["vitrine" + id],
    queryFn: () => axios.get(baseurl + `/vitrine/${id}`).then((r) => r.data),
  });

  const adicionarCarrinho = (id?: number) => {
    console.log(id);
  };

  if (isLoading) {
    return <Loading message="Carregando detalhes do bolinho..." />;
  }

  if (error) {
    return (
      <Error message="Erro ao carregar detalhes do bolinho" error={error} />
    );
  }

  return (
    <div className="min-h-screen bg-yellow-100">
      <div className="flex items-center justify-center pt-8">
        <img src={logo} alt="Logo" className="w-32 h-32" />
      </div>

      <div className="flex flex-col items-center justify-center pt-4">
        <div className="text-4xl font-bold text-purple-600">
          {cupcake?.nome}
        </div>
        <div className="pt-2 text-2xl">Detalhes do bolinho</div>
      </div>

      <div className="container mx-auto px-4 pt-8">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
            <ModalImage
              small={cupcake?.imagem || ""}
              large={cupcake?.imagem}
              alt={cupcake?.nome}
              className="w-full h-full object-cover"
            />

            {/* Emoji de lupa e texto */}
            <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-black bg-opacity-50 text-white p-2 rounded-lg pointer-events-none">
              <span className="text-xl">🔍</span>
              <span className="text-sm">CLIQUE PARA AMPLIAR</span>
            </div>
          </div>
          <div className="card-body p-4">
            {/* Descrição e Badge de Disponibilidade */}
            <div className="text-lg font-semibold">Descrição:</div>
            <div className="text-gray-700 mb-4">{cupcake?.descricao}</div>

            <div className="text-lg font-semibold">Ingredientes:</div>
            <div className="text-gray-700 mb-4">
              {cupcake?.ingredientes || "Não informado"}
            </div>

            <div className="text-lg font-semibold">Peso:</div>
            <div className="text-gray-700 mb-4">
              {cupcake?.peso || "Não informado"}
            </div>

            <div className="text-lg font-semibold">Dimensões:</div>
            <div className="text-gray-700 mb-4">
              {cupcake?.dimensoes || "Não informado"}
            </div>

            <div className="text-lg font-semibold">
              Informações Nutricionais:
            </div>
            <div className="text-gray-700 mb-4">
              {cupcake?.informacoesNutricionais || "Não informado"}
            </div>

            <div className="pt-4 flex justify-start items-center">
              <div className="text-2xl font-bold">
                R$ {cupcake?.preco?.toFixed?.(2)}
              </div>
              <div className="flex items-center space-x-4 pl-4">
                <div className="flex items-center">
                  <label className="mr-2">Quantidade:</label>
                  <input
                    id="quantidade"
                    type="number"
                    defaultValue={1}
                    min={1}
                    className={`input input-primary w-24 ${
                      cupcake?.disponibilidade ? "" : "input-disabled"
                    }`}
                    disabled={!cupcake?.disponibilidade}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <label className="text-lg font-semibold">Observações:</label>
              <input
                id="observacao"
                type="text"
                placeholder="Exemplo: Sem nozes"
                className={`input input-primary w-full mt-4 ${
                  cupcake?.disponibilidade ? "" : "input-disabled"
                }`}
                disabled={!cupcake?.disponibilidade}
              />
            </div>

            <button
              className={`btn btn-primary text-white mt-4 ${
                cupcake?.disponibilidade
                  ? ""
                  : "btn-disabled cursor-not-allowed"
              }`}
              onClick={() =>
                cupcake?.disponibilidade && adicionarCarrinho(cupcake.id)
              }
              disabled={!cupcake?.disponibilidade}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
