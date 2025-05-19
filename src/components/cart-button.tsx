import { Link } from "react-router-dom";
import { AppContext } from "../providers/context";
import { use } from "react";

export const CartButton = () => {
  const { cart } = use(AppContext);

  const cupcakeCounter = cart?.reduce?.(
    (acc, curr) => (acc += curr.quantidade),
    0
  );

  return (
    <Link to="/carrinho" className="relative ml-2 btn btn-secondary">
      Carrinho
      <span className="text-2xl">🛒</span>
      {cupcakeCounter > 0 && (
        <span className="absolute opacity-80 right-0 top-0 text-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
          {cupcakeCounter}
        </span>
      )}
    </Link>
  );
};
