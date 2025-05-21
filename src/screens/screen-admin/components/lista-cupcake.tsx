import React, { use } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AppContext } from "../../../providers/context";
import { LinhaCupcake } from "./linha-cupcake";

interface Cupcake {
  id: number;
  nome: string;
  preco: number;
  disponibilidade: boolean;
  imagem: string;
}

export const ListaCupcake: React.FC = () => {
  const { baseurl, adminKey } = use(AppContext);

  const mutation = useMutation({
    mutationFn: async (): Promise<Cupcake[]> => {
      const response = await axios.post(`${baseurl}/admin-cupcakes`, {
        key: adminKey,
      });
      return response.data;
    },
  });

  React.useEffect(() => {
    mutation.mutate();
  }, []);

  if (mutation.isPending) {
    return <div>Carregando cupcakes...</div>;
  }

  if (mutation.isError) {
    return <div>Erro ao carregar cupcakes</div>;
  }

  const cupcakes = mutation.data || [];

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Lista de Cupcakes</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Disponível</th>
          </tr>
        </thead>
        <tbody>
          {cupcakes.map((cupcake) => (
            <LinhaCupcake
              key={cupcake.id}
              cupcake={cupcake}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
