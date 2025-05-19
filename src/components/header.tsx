import { Link } from "react-router-dom"; // Para navegação com React Router
import { CartButton } from "./cart-button"; // Importe o novo componente

export const Header = () => {
  return (
    <div className="bg-base-300 shadow-sm">
      <div className="px-2 py-4 flex justify-between items-center">
        <div className="btn btn-primary text-white">
          <Link to="/">🏠 Home</Link>
        </div>

        <div className="flex items-center">
          <div className="btn btn-primary">
            <Link to="/rastrear-pedido">🔍 Status</Link>
          </div>

          <CartButton />
        </div>
      </div>
    </div>
  );
};
