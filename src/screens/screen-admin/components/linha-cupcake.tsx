import React, { use, useState } from "react";
import { AppContext } from "../../../providers/context";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const LinhaCupcake: React.FC<{ cupcake: any }> = ({ cupcake }) => {
  const { baseurl, adminKey } = use(AppContext);
  const [nome, setNome] = useState(cupcake.nome);
  const [preco, setPreco] = useState(cupcake.preco);
  const [disponivel, setDisponivel] = useState(cupcake.disponibilidade);

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        key: adminKey,
        id: cupcake.id,
        nome,
        preco,
        disponibilidade: disponivel,
      };
      return axios.post(baseurl + "/admin-editar-cupcake", payload);
    },
  });

  async function confirmarAlteracao() {
    toast.promise(mutation.mutateAsync(), {
      loading: "Editando cupcake...",
      success: (response) => {
        return response?.data?.message || "Cupcake editado!";
      },
      error: (err) => err?.response?.data?.detail?.message || "Erro na edição do cupcake",
    });
  }

  return (
    <tr>
      <td>
        <img
          src={cupcake.imagem}
          alt={cupcake.nome}
          className="w-16 h-16 object-cover"
        />
      </td>
      <td>{cupcake.id}</td>
      <td>
        <input
          type="text"
          className="input input-bordered w-full"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-bordered w-full"
          value={preco}
          step="0.01"
          onChange={(e) => setPreco(Number(e.target.value))}
        />
      </td>
      <td>
        <select
          className="select select-bordered w-full"
          value={disponivel ? "sim" : "nao"}
          onChange={(e) => setDisponivel(e.target.value === "sim")}
        >
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
      </td>
      <td>
        <button
          className="btn btn-success"
          onClick={confirmarAlteracao}
        >
          Confirmar
        </button>
      </td>
    </tr>
  );
};
