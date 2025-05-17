import { useQuery } from "@tanstack/react-query";
import type { Cupcake } from "./types";
import { use } from "react";
import { AppContext } from "./context";
import logo from "./assets/logo.png";

export const App = () => {
  const { baseurl } = use(AppContext);
  const {
    isPending,
    error,
    data: cupcakes,
  } = useQuery<Cupcake[]>({
    queryKey: ["repoData"],
    queryFn: () => fetch(baseurl + "/cupcakes").then((res) => res.json()),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          <span className="text-xl font-semibold">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="alert alert-error shadow-lg">
          <div>
            <span>Ocorreu um erro ao carregar os cupcakes!</span>
            <pre>{error.toString?.()}</pre>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-yellow-100">
      <header className="flex items-center justify-center py-10">
        <img src={logo} alt="Logo" className="mr-4 w-35 h-35" />
        <div>
          <h1 className="text-4xl font-bold text-purple-600">Mominho</h1>
          <h2 className="text-2xl text-purple-900">sua casa de bolinhos</h2>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cupcakes.map((cupcake) => (
            <div
              key={cupcake.id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <figure>
                <img
                  src={cupcake.imagem}
                  alt={cupcake.nome}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="text-xl font-semibold text-purple-900">
                  {cupcake.nome}
                </h3>
                <p className="text-gray-500 text-purple-900">
                  {cupcake.descricao}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-purple-900">
                    R${cupcake.preco}
                  </span>
                  <button className="btn btn-primary text-white">
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
