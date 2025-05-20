import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use, useState } from "react";
import { useParams } from "react-router-dom";
import { Error, type ServiceError } from "../../components/error";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { LogoTitle } from "../../components/logo-title";
import { AppContext } from "../../providers/context";
import type { ResumoPedido } from "../../types";
import { PagamentoCredito } from "./components/pagamento-cartao";
import { PagamentoPix } from "./components/pagamento-pix";
import { CardResumo } from "../../components/card-resumo";

export const ScreenPagamento: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { baseurl } = use(AppContext);

  const [metodo, setMetodo] = useState<"pix" | "credito" | null>(null);

  const params = new URLSearchParams(location.search);
  const telefone = params.get("telefone") || "";

  const payload = { id, telefone };

  const {
    data: pedido,
    isLoading,
    error,
  } = useQuery<ResumoPedido, ServiceError>({
    queryKey: ["resumo-pedido", id, telefone],
    queryFn: () => axios.post(baseurl + `/pedido-resumo`, payload).then((r) => r.data),
  });

  if (isLoading) {
    return <Loading message="Carregando pagamento..." />;
  }

  if (error) {
    return (
      <Error
        message="Erro ao carregar pagamento"
        error={error}
      />
    );
  }

  if (pedido?.valor_pago || 0 > 0) {
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
      <LogoTitle
        title="Pagamento"
        subtitle="fiado só amanhã"
      />

      <div className="container mx-auto pt-8 px-4 max-w-[1000px]">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="card-body p-6 flex flex-col items-center">
            <div className="w-full text-lg font-bold">Resumo do pedido:</div>
            <CardResumo
              id={id}
              pedido={pedido}
            />

            <div className="w-full text-lg font-bold">Forma de pagamento:</div>
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                className={`btn ${metodo === "pix" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setMetodo("pix")}
              >
                PIX
              </button>
              <button
                type="button"
                className={`btn ${metodo === "credito" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setMetodo("credito")}
              >
                Cartão de Crédito
              </button>
            </div>

            <div className="w-full">
              {metodo === "pix" && <PagamentoPix />}
              {metodo === "credito" && <PagamentoCredito />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
