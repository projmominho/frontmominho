import React, { use } from "react";
import qrcode from "./qrcode.json";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AppContext } from "../../../providers/context";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const PagamentoPix: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const params = new URLSearchParams(location.search);

  const telefone = params.get("telefone") || "";
  const { baseurl } = use(AppContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        id,
      };
      return axios.post(baseurl + "/pagamento-pix", payload);
    },
  });

  const confirmarPagamento = () => {
    toast.promise(mutation.mutateAsync(), {
      loading: "Processando pagamento...",
      success: (response) => {
        navigate(`/status/${id}?telefone=${telefone}`);
        return response?.data?.message || "Pagamento confirmado!";
      },
      error: (err) => err?.response?.data?.detail?.message || "Erro no pagamento",
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-bold">ATENÇÃO: Este é um app de demonstração</div>
      <div className="text-lg font-bold">não tente pagar esse pix prfv</div>
      <div className="mb-4">
        <img
          src={qrcode}
          alt="QR Code Pix de mentirinha"
          className="w-48 h-48 border rounded-lg"
        />
      </div>

      <button
        className="btn btn-primary w-full"
        onClick={confirmarPagamento}
      >
        Confirmar Pagamento
      </button>
    </div>
  );
};
