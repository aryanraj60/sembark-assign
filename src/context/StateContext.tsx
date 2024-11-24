import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";

// Define types for the product and context
interface ProductType {
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
  quantity?: number;
}

type StateContextType = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: ProductType[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: ProductType, quantity: number) => void;
  onRemove: (product: ProductType) => void;
  toggleCartItemQuantity: (id: string, value: "inc" | "dec") => void;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
  setCartItems: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

// Create the context
const Context = createContext<StateContextType | undefined>(undefined);

type StateContextProviderProps = {
  children: ReactNode;
};

const StateContext: React.FC<StateContextProviderProps> = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: ProductType | undefined;

  const onAdd = (product: ProductType, quantity: number) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id);

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + parseInt(product.price) * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: any) => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        } else {
          return cartProduct;
        }
      });

      if (updatedCartItems.length > 0) {
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } else {
        localStorage.setItem("cartItems", JSON.stringify([]));
      }

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);

      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { ...product }])
      );
    }

    toast.success(`${quantity} ${product.title} added to the cart.`);
  };

  const incQty = () => setQty((prevQty) => prevQty + 1);

  const decQty = () => setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));

  const onRemove = (product: ProductType) => {
    foundProduct = cartItems.find((item) => item.id === product.id);
    if (!foundProduct) return;

    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice -
        parseInt(foundProduct!.price) * (foundProduct!.quantity || 1)
    );
    setTotalQuantities(
      (prevTotalQuantities) =>
        prevTotalQuantities - (foundProduct!.quantity || 1)
    );

    setCartItems(newCartItems);

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const toggleCartItemQuantity = (id: string, value: "inc" | "dec") => {
    foundProduct = cartItems.find((item) => item.id === id);
    if (!foundProduct) return;

    const newCartItems = cartItems.filter((item) => item.id !== id);

    if (value === "inc" && foundProduct) {
      setCartItems([
        ...newCartItems,
        {
          ...foundProduct,
          quantity: (foundProduct.quantity || 1) + 1,
        },
      ]);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + parseInt(foundProduct!.price)
      );
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec" && (foundProduct.quantity || 1) > 1) {
      setCartItems([
        ...newCartItems,
        {
          ...foundProduct,
          quantity: (foundProduct.quantity || 1) - 1,
        },
      ]);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice - parseInt(foundProduct!.price)
      );
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
        setTotalPrice,
        setTotalQuantities,
        setCartItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom hook to use the StateContext
export const useStateContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  return context;
};

export default StateContext;
