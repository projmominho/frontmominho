import { Header } from "../components/header";
import { Loading } from "../components/loading";
import { LogoTitle } from "../components/logo-title";
import React, { use, useState } from "react";
import { Error, type ServiceError } from "../components/error";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../providers/context";
import type { ResumoPedido } from "../types";

// // Importa os dois componentes de pagamento (você vai criar eles depois)
// import { PagamentoPix } from "../components/pagamento-pix";
// import { PagamentoCredito } from "../components/pagamento-credito";

export const ScreenPagamento: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { baseurl } = use(AppContext);

  const [metodo, setMetodo] = useState<"pix" | "credito" | null>(null);

  const { data, isLoading, error } = useQuery<ResumoPedido, ServiceError>({
    queryKey: ["resumo-pedido", id],
    queryFn: () =>
      axios.get(baseurl + `/pedido-resumo/${id}`).then((r) => r.data),
  });

  if (isLoading) {
    return <Loading message="Carregando pagamento..." />;
  }

  if (error) {
    return <Error message="Erro ao carregar pagamento" error={error} />;
  }

  if (data?.valor_pago || 0 > 0) {
    return (
      <Error
        subtitle="Este pedido já está pago!"
        message="Para mais informações<br>Vá para home e clique em status"
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <LogoTitle title="Pagamento" subtitle="fiado só amanhã" />

      <div className="container mx-auto pt-8 px-4">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="card-body p-6 flex flex-col items-center">
            <div className="w-full text-lg font-bold">Resumo do pedido:</div>
            <div className="w-full mb-8">
              <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                <div className="mb-2">
                  <span className="font-semibold">Telefone:</span>{" "}
                  {data?.telefone}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Endereço de Entrega:</span>
                  <br />
                  {data?.endereco}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Itens:</span>
                  <ul className="mt-1 text-sm">
                    {data?.itens.map((item, index: number) => (
                      <li key={index}>
                        {item.quantidade}x {item.nome}{" "}
                        <span className="text-gray-500">
                          R$ {item.valor_unitario.toFixed(2)} cada
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2 text-right font-bold text-lg">
                  Total:{" "}
                  <span className="text-primary">
                    R$ {data?.valor_total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full text-lg font-bold">Forma de pagamento:</div>
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                className={`btn ${
                  metodo === "pix" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setMetodo("pix")}
              >
                PIX
              </button>
              <button
                type="button"
                className={`btn ${
                  metodo === "credito" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setMetodo("credito")}
              >
                Cartão de Crédito
              </button>
            </div>

            {/* <div className="w-full">
              {metodo === "pix" && <PagamentoPix />}
              {metodo === "credito" && <PagamentoCredito />}
            </div> */}

            <button className="btn btn-primary mt-8 w-full">
              Confirmar Pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
