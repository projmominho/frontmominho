import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { use, useState } from "react";
import { AppContext } from "../../../providers/context";
import toast from "react-hot-toast";

type LinhaPedidoProps = {
  pedido: {
    id: number;
    telefone: string;
    endereco: string;
    valor_pago: number;
    status: string;
  };
};

const statusOptions = ["pedido cancelado", "preparando pedido", "pedido embalado", "em trânsito", "pedido entregue"];

export const LinhaPedido: React.FC<LinhaPedidoProps> = ({ pedido }) => {
  const queryClient = useQueryClient();
  const { baseurl, adminKey } = use(AppContext);
  const [statusSelecionado, setStatusSelecionado] = useState(pedido.status);

  const mutation = useMutation({
    mutationFn: async () => {
      return axios.put(`${baseurl}/admin-update-status`, {
        key: adminKey,
        id: pedido.id,
        status: statusSelecionado,
      });
    },
  });

  const atualizarStatus = () => {
    toast.promise(mutation.mutateAsync(), {
      loading: "Atualizando pedido...",
      success: (response) => {
        queryClient.invalidateQueries({ queryKey: ["admin-pedidos"] });
        return response?.data?.message || "Pedido atualizado!";
      },
      error: (err) => err?.response?.data?.detail?.message || "Erro na atualização do pedido",
    });
  };

  return (
    <tr>
      <td>{pedido.id}</td>
      <td>{pedido.telefone}</td>
      <td>{pedido.endereco}</td>
      <td>R$ {pedido.valor_pago.toFixed(2)}</td>
      <td>{pedido.status}</td>
      <td>
        <select
          className="select select-bordered"
          value={statusSelecionado}
          onChange={(e) => setStatusSelecionado(e.target.value)}
        >
          {statusOptions.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => atualizarStatus()}
          disabled={mutation.isPending}
        >
          Confirmar
        </button>
      </td>
    </tr>
  );
};
