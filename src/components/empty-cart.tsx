import { Link } from "react-router-dom";
import { Header } from "./header";
import { LogoTitle } from "./logo-title";

export const EmptyCart: React.FC = () => {
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
};
