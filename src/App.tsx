import { useEffect, useState } from "react";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cupcake, setCupcake] = useState<any>(null);

  useEffect(() => {
    fetch("https://backmominho.onrender.com/cupcake")
      .then((res) => res.json())
      .then((data) => setCupcake(data))
      .catch((err) => console.error("Erro ao buscar cupcake:", err));
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 card-xl shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Mominho a sua loja de bolinhos</h2>
          <p>Em construção</p>
          <div
            className="justify-end card-actions"
            onClick={() => window.open("https://github.com/projmominho/")}
          >
            <button className="btn btn-primary">Ver no github</button>
          </div>
        </div>
      </div>

      <div className="p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Cupcake do Dia 🍰
        </h1>
        {cupcake ? (
          <div className="space-y-2">
            <p>
              <strong>ID:</strong> {cupcake.id}
            </p>
            <p>
              <strong>Nome:</strong> {cupcake.nome}
            </p>
            <p>
              <strong>Preço:</strong> R$ {cupcake.preco.toFixed(2)}
            </p>
            <p>
              <strong>Disponível:</strong> {cupcake.disponivel ? "Sim" : "Não"}
            </p>
          </div>
        ) : (
          <p>Carregando cupcake...</p>
        )}
      </div>
    </div>
  );
}

export default App;
