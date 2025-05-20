import { Autocomplete } from "@react-google-maps/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { use, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { LogoTitle } from "../components/logo-title";
import { AppContext } from "../providers/context";
import toast from "react-hot-toast";
import { EmptyCart } from "../components/empty-cart";

export const ScreenEnvio: React.FC = () => {
  const { baseurl, cart, address, addressAdd, phone, phoneAdd, cleanCart } = use(AppContext);

  const autocompleteRef = useRef<google.maps.places.Autocomplete>(null);
  const navigate = useNavigate();

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    autocompleteRef.current = autocomplete;
  }

  function locationSelected() {
    const formatted_address = autocompleteRef?.current?.getPlace?.()?.formatted_address;
    if (!formatted_address) {
      return;
    }

    addressAdd(formatted_address);
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        cart: cart.map?.((c) => ({
          id: c.cupcake.id,
          quantidade: c.quantidade,
          observacoes: c.observacoes,
        })),
        address,
        phone,
      };
      return axios.post(baseurl + "/pedido-iniciar", payload);
    },
  });

  const iniciarPedido = () => {
    if (!phone?.trim()) {
      toast.error("Por favor, preencha o telefone.");
      return;
    }

    if (!address?.trim()) {
      toast.error("Por favor, preencha o endereço de entrega.");
      return;
    }

    toast.promise(mutation.mutateAsync(), {
      loading: "Criando pedido...",
      success: (response) => {
        cleanCart();
        navigate(`/pagamento/${response?.data?.pedido_id}?telefone=${phone}`);
        return response?.data?.message || "Pedido iniciado!";
      },
      error: (err) => err?.response?.data?.detail?.message || "Erro na criação do pedido",
    });
  };

  if (!cart?.length) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <LogoTitle
        title="Dados de envio"
        subtitle="Pra onde chefe?"
      />

      <div className="container mx-auto pt-8 px-4 max-w-[1000px]">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="card-body p-4">
            <div className="mb-4">
              <label
                htmlFor="telefone"
                className="block text-lg font-semibold"
              >
                Telefone:
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={phone}
                onChange={(e) => phoneAdd(e.target.value)}
                placeholder="(XX) XXXXX-XXXX"
                className="input input-primary w-full mt-2"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="endereco"
                className="block text-lg font-semibold"
              >
                Endereço de Entrega:
              </label>
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={locationSelected}
              >
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  defaultValue={address}
                  placeholder="Digite o endereço de entrega"
                  className="input input-primary w-full mt-2"
                  required
                />
              </Autocomplete>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4 w-full"
              onClick={() => !mutation?.isPending && iniciarPedido()}
            >
              {!mutation?.isPending ? "Continuar para Pagamento" : "Gravando pedido..."}

              {!mutation?.isPending ? null : <span className="animate-bounce">{`🧁`}</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
