import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { use, useState } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../../providers/context";
import { LogoTitle } from "../../components/logo-title";
import { ListaCupcake } from "./components/lista-cupcake";
import { ListaPedidos } from "./components/lista-pedido";

export const ScreenAdmin: React.FC = () => {
  const [key, setKey] = useState("");
  const { baseurl, adminKey, addAdminKey } = use(AppContext);
  const [metodo, setMetodo] = useState<"cupcakes" | "pedidos">("pedidos");

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        key,
      };
      return axios.post(baseurl + "/admin-connect", payload);
    },
  });

  const conectar = () => {
    if (!key?.trim()) {
      toast.error("Por favor, a api key.");
      return;
    }

    toast.promise(mutation.mutateAsync(), {
      loading: "Autenticando...",
      success: (response) => {
        addAdminKey(key);
        return response?.data?.message || "Autenticado!";
      },
      error: (err) => err?.response?.data?.detail?.message || "Erro na autenticação!",
    });
  };

  return (
    <div className="min-h-screen">
      <LogoTitle
        title="Administração"
        subtitle="Área restrita"
      />

      <div className="container mx-auto pt-8 px-4 max-w-[1000px]">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="card-body p-8">
            {!adminKey ? (
              <>
                <input
                  type="password"
                  className="input input-bordered w-full mb-4"
                  placeholder="Digite a senha"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />

                <button
                  className="btn btn-primary w-full"
                  onClick={conectar}
                  disabled={mutation.isPending}
                >
                  Entrar
                </button>
              </>
            ) : (
              <div className="container mx-auto py-8">
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    className={`btn ${metodo === "pedidos" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setMetodo("pedidos")}
                  >
                    Pedidos
                  </button>

                  <button
                    type="button"
                    className={`btn ${metodo === "cupcakes" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setMetodo("cupcakes")}
                  >
                    Cupcakes
                  </button>
                </div>

                <div className="w-full">
                  {metodo === "cupcakes" && <ListaCupcake />}
                  {metodo === "pedidos" && <ListaPedidos />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
