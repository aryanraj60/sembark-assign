import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";

import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const Navbar: React.FC = () => {
  const { showCart, setShowCart, cartItems } = useStateContext();

  const getTotalQuantities = (): number => {
    return cartItems.reduce((acc, item: any) => acc + (item.quantity || 1), 0);
  };

  const totalQuantities = getTotalQuantities();

  return (
    <nav className="flex justify-between relative p-5">
      <p className="text-gray-400 text-lg">
        <Link to="/">Aryan's Store</Link>
      </p>

      <button
        type="button"
        className="text-xl text-gray-400 cursor-pointer relative bg-transparent"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping size="1.5rem" />
        <span className="absolute w-4 h-4 text-xs font-semibold rounded-lg text-[#eee] bg-[#f02d34] -top-1 -right-2">
          {totalQuantities}
        </span>
      </button>

      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
