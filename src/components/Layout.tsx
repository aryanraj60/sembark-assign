import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../context/StateContext";

const Layout: React.FC = () => {
  const { setCartItems } = useStateContext();

  useEffect(() => {
    const cartItemsString = localStorage.getItem("cartItems");
    const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

    setCartItems(Array.isArray(cartItems) ? cartItems : []);
  }, []);
  return (
    <div className="bg-white">
      <header className="bg-black">
        <Navbar />
      </header>
      <section className="mb-10">
        <main>
          <Outlet />
        </main>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
