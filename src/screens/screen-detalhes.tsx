import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use, useRef, useState } from "react";
import ModalImage from "react-modal-image";
import { useParams } from "react-router-dom";
import { type ServiceError, Error } from "../components/error";
import { Loading } from "../components/loading";
import { LogoTitle } from "../components/logo-title";
import { AppContext } from "../providers/context";
import type { Cupcake } from "../types";
import { Header } from "../components/header";
import { CartButton } from "../components/cart-button";
import toast from "react-hot-toast";

export const ScreenDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { baseurl, cart, cartAdd } = use(AppContext);
  const [quantidade, setQuantidade] = useState<number>(cart?.find((c) => c.cupcake.id === Number(id))?.quantidade || 1);

  const observacoesRef = useRef<HTMLInputElement>(null);

  const {
    isLoading,
    error,
    data: cupcake,
  } = useQuery<Cupcake, ServiceError>({
    queryKey: ["vitrine", id],
    queryFn: () => axios.get(baseurl + `/vitrine/${id}`).then((r) => r.data),
  });

  const adicionarCarrinho = () => {
    const observacoes = observacoesRef?.current?.value || "";

    if (isNaN(quantidade) || quantidade <= 0) {
      toast.error("Por favor, insira uma quantidade válida.");
      return;
    }

    cartAdd({
      cupcake: cupcake!,
      quantidade: quantidade,
      observacoes: observacoes,
    });
  };

  if (isLoading) {
    return <Loading message="Carregando detalhes do bolinho..." />;
  }

  if (error) {
    return (
      <Error
        message="Erro ao carregar detalhes do bolinho"
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <LogoTitle
        title={cupcake?.nome}
        subtitle="Detalhes do bolinho"
      />

      <div className="container max-w-[1000px] mx-auto pt-8 px-4">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
            <ModalImage
              small={cupcake?.imagem || ""}
              large={cupcake?.imagem}
              alt={cupcake?.nome}
            />

            <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-black bg-opacity-50 text-white p-2 rounded-lg pointer-events-none">
              <span className="text-xl">🔍</span>
              <span className="text-sm">CLIQUE PARA AMPLIAR</span>
            </div>

            <div className="mb-2 absolute top-0 left-0  pointer-events-none">
              <div className={`badge ${cupcake?.disponibilidade ? "badge-success" : "badge-error"} px-3 py-1 rounded-full text-white text-sm font-medium`}>
                {cupcake?.disponibilidade ? "Disponível" : "Indisponível"}
              </div>
            </div>
          </div>
          <div className="card-body p-4">
            <div className="text-lg font-semibold">Descrição:</div>
            <div className="text-gray-700 mb-4">{cupcake?.descricao}</div>

            <div className="text-lg font-semibold">Ingredientes:</div>
            <div className="text-gray-700 mb-4">{cupcake?.ingredientes || "Não informado"}</div>

            <div className="text-lg font-semibold">Peso:</div>
            <div className="text-gray-700 mb-4">{cupcake?.peso ? `${cupcake.peso} gramas` : "Não informado"}</div>

            <div className="text-lg font-semibold">Dimensões:</div>
            <div className="text-gray-700 mb-4">{cupcake?.dimensoes || "Não informado"}</div>

            <div className="text-lg font-semibold">Informações Nutricionais:</div>
            <div className="text-gray-700 mb-4">{cupcake?.informacoes_nutricionais || "Não informado"}</div>

            <div className="text-lg font-bold">R$ {cupcake?.preco?.toFixed?.(2)} cada</div>

            {!cupcake?.disponibilidade ? null : (
              <>
                <div className="flex flex-col mt-4">
                  <label className="text-lg font-semibold">Observações:</label>
                  <input
                    id="observacoes"
                    ref={observacoesRef}
                    type="text"
                    placeholder="Exemplo: Sem nozes"
                    className={`input input-primary w-full mt-4`}
                  />
                </div>

                <div className="pt-4 flex justify-start items-center">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <label className="mr-2">Quantidade:</label>
                      <input
                        id="quantidade"
                        onChange={(e) => setQuantidade(parseInt(e.target.value, 10) || 1)}
                        type="tel"
                        defaultValue={quantidade}
                        min={1}
                        className={`input input-primary w-24`}
                      />
                    </div>
                  </div>
                  <div className="text-2xl font-bold pl-2">Total R$ {((cupcake?.preco || 0) * quantidade)?.toFixed?.(2)}</div>
                </div>
              </>
            )}

            <div className="flex items-center mt-4">
              <button
                className={`btn btn-primary text-white ${cupcake?.disponibilidade ? "" : "btn-disabled cursor-not-allowed"} flex-1`}
                onClick={() => cupcake?.disponibilidade && adicionarCarrinho()}
                disabled={!cupcake?.disponibilidade}
              >
                {cupcake?.disponibilidade ? "Adicionar ao Carrinho" : "Bolinho indisponível"}
              </button>

              <CartButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
