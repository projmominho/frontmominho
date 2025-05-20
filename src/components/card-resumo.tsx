import React from "react";
import type { ResumoPedido } from "../types";

export const CardResumo: React.FC<{ pedido?: ResumoPedido }> = ({ pedido }) => (
  <div className="border w-full rounded-lg p-4 bg-gray-50 shadow-sm">
    <div className="mb-2">
      <span className="text-xl font-semibold">Pedido n°:</span> {pedido?.telefone}
    </div>
    <div className="mb-2">
      <span className="font-semibold">Telefone:</span> {pedido?.telefone}
    </div>
    <div className="mb-2">
      <span className="font-semibold">Endereço de Entrega:</span>
      <br />
      {pedido?.endereco}
    </div>
    <div className="mb-2">
      <span className="font-semibold">Itens:</span>
      <ul className="mt-1 text-sm">
        {pedido?.itens.map((item, index: number) => (
          <li key={index}>
            {item.quantidade}x {item.nome} <span className="text-gray-500">R$ {item.valor_unitario.toFixed(2)} cada</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="flex justify-end pt-2">
      <div className="text-right font-bold">
        Total: <span className="text-primary">R$ {pedido?.valor_total.toFixed(2)}</span>
      </div>

      <div className="pl-4 text-right font-bold">
        Valor pago: <span className="text-primary">R$ {pedido?.valor_pago.toFixed(2)}</span>
      </div>
    </div>
  </div>
);
