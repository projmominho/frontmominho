import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CardResumo } from "../components/card-resumo";
import { Error, type ServiceError } from "../components/error";
import { Header } from "../components/header";
import { Loading } from "../components/loading";
import { LogoTitle } from "../components/logo-title";
import { AppContext } from "../providers/context";
import type { PedidoStatus, ResumoPedido } from "../types";

export const ScreenStatus: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { baseurl } = use(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  const { data: statusList, isLoading: loadingStatus } = useQuery<PedidoStatus[]>({
    queryKey: ["pedido-status", id, telefone],
    queryFn: () => axios.post(baseurl + `/pedido-status`, payload).then((r) => r.data),
  });

  if (isLoading || loadingStatus) {
    return <Loading message="Carregando status do pedido..." />;
  }

  if (error) {
    return (
      <Error
        message="Erro ao carregar dados do pedido"
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <LogoTitle
        title="Status do Pedido"
        subtitle="acompanhe seu pedido"
      />

      <div className="container mx-auto pt-8 px-4 max-w-[1000px]">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="card-body p-6 flex flex-col items-center">
            <div className="w-full text-lg font-bold mb-2">Resumo do pedido:</div>
            <CardResumo
              id={id}
              pedido={pedido}
            />

            {pedido && pedido.valor_pago === 0 && (
              <div className="w-full pd-4 flex justify-center items-center">
                <div className="text-lg font-bold pr-4">ATENÇÃO: Este pedido ainda não foi pago!</div>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/pagamento/${id}?telefone=${telefone}`)}
                >
                  Ir para pagamento
                </button>
              </div>
            )}

            <div className="w-full mt-8 text-lg font-bold mb-2">Status do pedido:</div>
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {statusList && statusList.length > 0 ? (
                    statusList.map((status, idx) => (
                      <tr key={idx}>
                        <td>{status.status.replace(/_/g, " ")}</td>
                        <td>
                          {new Date(status.data_status).toLocaleString("pt-BR", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="text-center text-gray-500"
                      >
                        Nenhum status encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
