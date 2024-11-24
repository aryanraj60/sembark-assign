import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
// import getStripe from "../lib/getStripe";
import { useStateContext } from "../context/StateContext";

type CartItem = {
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
  quantity?: number;
};

const Cart: React.FC = () => {
  const cartRef = useRef<HTMLDivElement>(null);

  const { cartItems, setShowCart, toggleCartItemQuantity, onRemove } =
    useStateContext();

  const getTotalPrice = (): number => {
    return cartItems.reduce(
      (acc, item: any) => acc + item.price * (item.quantity || 1),
      0
    );
  };

  const getTotalQuantities = (): number => {
    return cartItems.reduce((acc, item: any) => acc + (item.quantity || 1), 0);
  };

  const totalPrice = getTotalPrice(); // Get total price
  const totalQuantities = getTotalQuantities(); // Get total quantities

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span>Your Cart</span>
          <span>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} className="mx-auto" />
            <h3>Your shopping bag is empty</h3>
            <Link to="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container px-6 pt-6 pb-24">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item.id}>
                {item?.image && (
                  <img
                    src={item?.image}
                    className="cart-product-image"
                    alt={item.title}
                  />
                )}
                <div className="item-desc">
                  <div className="flexy top">
                    <h5 className="truncate">{item.title}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flexy bottom">
                    <div>
                      <p className="quantity-desc flex">
                        <span
                          className="minus"
                          onClick={() => toggleCartItemQuantity(item.id, "dec")}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => toggleCartItemQuantity(item.id, "inc")}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom space-y-2">
            <div className="total">
              <h3>Total Items:</h3>
              <h3>{totalQuantities}</h3>
            </div>
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>

            <div className="btn-container">
              <button type="button" className="btn">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
