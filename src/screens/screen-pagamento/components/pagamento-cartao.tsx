import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { use, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../providers/context";

// Função para retornar somente os dígitos de um input
function apenasDigitos(e: React.ChangeEvent<HTMLInputElement>, excecoes: string = ""): string {
  const value = e?.target?.value;

  if (!value) {
    return "";
  }

  const cleanValue = value.split("").reduce((acc, char) => {
    if (/\d/.test(char) || excecoes.includes(char)) {
      return acc + char;
    }
    return acc;
  }, "");

  return cleanValue;
}

export const PagamentoCredito: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const params = new URLSearchParams(location.search);
  const telefone = params.get("telefone") || "";

  const { baseurl } = use(AppContext);
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        id,
        numero: numero.replace(/\D/g, ""),
        validade: validade.replace(/\D/g, ""),
        cvv: cvv.replace(/\D/g, ""),
      };
      return axios.post(baseurl + "/pagamento-cartao", payload);
    },
  });

  const confirmarPagamento = (e: React.FormEvent) => {
    e.preventDefault();

    if (numero.length !== 16) {
      toast.error("Número do cartão deve ter 16 dígitos.");
      return;
    }

    if (validade.length < 4) {
      toast.error("Validade deve ter 4 dígitos com mes e ano (ex: 05/25).");
      return;
    }
    const validadeClean = validade.replace(/\D/g, "");
    const mes = parseInt(validadeClean.slice(0, 2), 10);
    const ano = parseInt(validadeClean.slice(2, 4), 10);
    const anoAtual = new Date().getFullYear() % 100;
    const ultimoAno = anoAtual - 20;

    if (mes < 1 || mes > 12) {
      toast.error("Mês inválido na validade (use MM/AA, mês de 01 a 12).");
      return;
    }

    // aceita validade no máximo 20 anos
    if (ano < ultimoAno) {
      toast.error(`Ano inválido na validade. O cartão não pode ser mais velho que 20${ultimoAno.toString().padStart(2, "0")}.`);
      return;
    }

    // Validação do CVV (3 ou 4 dígitos)
    if (cvv.length < 3 || cvv.length > 4) {
      toast.error("CVV deve ter 3 ou 4 dígitos.");
      return;
    }

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
    <form
      className="flex flex-col items-center w-full"
      onSubmit={confirmarPagamento}
    >
      <div className="text-lg font-bold">ATENÇÃO: Este é um app de demonstração</div>
      <div className="text-lg font-bold">não coloque dados reais prfv</div>
      <div>para exibir erro, use o número</div>
      <div>9999 9999 9999 9999</div>
      <div className="w-full mb-3">
        <label className="label">Número do cartão:</label>
        <input
          className="input input-primary w-full"
          type="text"
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          value={numero}
          onChange={(e) => setNumero(apenasDigitos(e))}
          required
        />
      </div>
      <div className="w-full mb-3 flex gap-4">
        <div className="flex-1">
          <label className="label">Validade:</label>
          <input
            className="input input-primary w-full"
            type="text"
            placeholder="MM/AA"
            maxLength={5}
            value={validade}
            onChange={(e) => setValidade(apenasDigitos(e, "/"))}
            required
          />
        </div>
        <div className="flex-1">
          <label className="label">CVV:</label>
          <input
            className="input input-primary w-full"
            type="text"
            placeholder="123"
            maxLength={3}
            value={cvv}
            onChange={(e) => setCvv(apenasDigitos(e))}
            required
          />
        </div>
      </div>
      <button
        className="btn btn-primary mt-6 w-full"
        type="submit"
        disabled={mutation?.isPending}
      >
        Confirmar Pagamento
      </button>
    </form>
  );
};
