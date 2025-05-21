import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";
import { AppContext } from "../../../providers/context";
import { LinhaPedido } from "./linha-pedido";

export const ListaPedidos: React.FC = () => {
  const { baseurl, adminKey } = use(AppContext);

  const { data: pedidos } = useQuery({
    queryKey: ["admin-pedidos"],
    queryFn: async () => {
      const res = await axios.post(`${baseurl}/admin-pedidos`, { key: adminKey });
      return res.data;
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Valor Pago</th>
            <th>Status</th>
            <th>Novo status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {pedidos?.map((pedido: any) => (
            <LinhaPedido
              key={pedido.id}
              pedido={pedido}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
