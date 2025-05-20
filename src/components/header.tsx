import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartButton } from "./cart-button";

export const Header = () => {
  const [showStatusInput, setShowStatusInput] = useState(false);
  const pedidoIdRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleVerificar = (e: React.FormEvent) => {
    e.preventDefault();
    const pedidoId = pedidoIdRef.current?.value?.replace(/\D/g, "");
    const telefone = telefoneRef.current?.value?.replace(/\D/g, "");
    if (pedidoId && telefone) {
      navigate(`/status/${pedidoId}?telefone=${telefone}`);
      setShowStatusInput(false);
      if (pedidoIdRef.current) pedidoIdRef.current.value = "";
      if (telefoneRef.current) telefoneRef.current.value = "";
    }
  };

  return (
    <>
      <div className="bg-base-300 shadow-sm">
        <div className="px-2 py-4 flex justify-between items-center">
          <div className="btn btn-primary text-white">
            <Link to="/">🏠 Home</Link>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              className="btn btn-primary mr-2"
              onClick={() => setShowStatusInput((v) => !v)}
            >
              🔍 Status
            </button>
            <CartButton />
          </div>
        </div>
      </div>

      {showStatusInput && (
        <form
          className="w-full bg-base-200 px-4 py-2 flex justify-center items-center gap-2 border-t border-base-300"
          onSubmit={handleVerificar}
        >
          <input
            type="text"
            className="input input-bordered w-15"
            placeholder="Número do pedido"
            ref={pedidoIdRef}
            autoFocus
          />
          <input
            type="text"
            className="input input-bordered flex-grow"
            placeholder="Telefone com ddd"
            ref={telefoneRef}
          />
          <button
            className="btn btn-primary"
            type="submit"
          >
            Ver status
          </button>
        </form>
      )}
    </>
  );
};
