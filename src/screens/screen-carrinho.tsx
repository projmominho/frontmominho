import React, { useContext, useMemo } from "react";
import { AppContext } from "../providers/context";
import { LogoTitle } from "../components/logo-title";
import { Header } from "../components/header";
import type { CartItem } from "../types";
import { Link, useNavigate } from "react-router-dom";

export const ScreenCarrinho: React.FC = () => {
  const { cart, cartAdd, cartDelete } = useContext(AppContext);
  const navigate = useNavigate();

  const orderedCart = useMemo(
    () => cart?.sort((a, b) => a.cupcake.id - b.cupcake.id),
    [cart]
  );

  const handleQuantidadeChange = (item: CartItem, quantidade: number) => {
    if (isNaN(quantidade) || quantidade <= 0) {
      return;
    }

    const newCartItem = { ...item, quantidade };
    cartAdd(newCartItem);
  };

  const totalPedido = useMemo(
    () =>
      cart.reduce((total, item) => {
        return total + item.cupcake.preco * item.quantidade;
      }, 0),
    [cart]
  );

  if (!cart?.length) {
    return (
      <div className="min-h-screen">
        <Header />
        <LogoTitle
          title="Carrinho de Compras"
          subtitle="😔 O carrinho está vazio!"
        />
        <div className="container mx-auto pt-8 px-4">
          <div className="text-center bg-yellow-100 p-6 rounded-md">
            <p className="text-lg text-gray-700 mb-4">
              Que tal voltar à nossa{" "}
              <div className="btn btn-primary text-white">
                <Link to="/">🏠 Home</Link>
              </div>{" "}
              para escolher um cupcake delicioso e adicionar ao carrinho?
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <LogoTitle
        title="Carrinho de Compras"
        subtitle="Dá uma conferida antes do envio!"
      />

      <div className="container mx-auto pt-8 px-4">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="card-body p-4">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Quantidade</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderedCart.map((item) => (
                  <React.Fragment key={item.cupcake.id}>
                    <tr>
                      <td>{item.cupcake.nome}</td>
                      <td>R$ {item.cupcake.preco.toFixed(2)}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          defaultValue={item.quantidade}
                          onChange={(e) =>
                            handleQuantidadeChange(
                              item,
                              parseInt(e.target.value, 10)
                            )
                          }
                          className="input input-primary w-12"
                        />

                        <button
                          onClick={() => cartDelete(item)}
                          className="ml-2"
                          aria-label="Deletar item"
                        >
                          ❌
                        </button>
                      </td>
                      <td className="text-lg font-bold">
                        R$ {(item.cupcake.preco * item.quantidade).toFixed(2)}
                      </td>
                    </tr>

                    {!item?.observacoes ? null : (
                      <tr>
                        <td colSpan={4} className="text-xs">
                          {item.observacoes
                            ? `observações: ${item.observacoes}`
                            : "Sem observações"}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-xl font-bold">
              Total do Pedido: R$ {totalPedido.toFixed(2)}
            </div>

            <button
              className="btn btn-primary mt-4 w-full"
              onClick={() => navigate("/envio")}
            >
              Continuar para dados de envio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
