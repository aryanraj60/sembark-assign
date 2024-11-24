import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader, GoBackButton } from "../../components";
import { useStateContext } from "../../context/StateContext";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { getProductById } from "../../services/Products/Products.service";

interface ProductType {
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
  quantity?: number;
}

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { id: productId } = useParams();

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuy = () => {
    if (product) {
      onAdd(product, qty);
      setShowCart(true);
    }
  };

  const fetchProduct = async (productId: string) => {
    if (loading) return;

    setLoading(true);
    try {
      const product = await getProductById(productId);

      if (product) {
        setProduct(product); // Stop fetching if no products are returned
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <Loader width="w-14" height="h-14" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div>
      <div className="my-4 px-4">
        <GoBackButton />
      </div>
      <div className="flex flex-col md:flex-row gap-10 m-10 mt-14 text-[#324d67]">
        <div>
          <div className="image-container flex items-center justify-center">
            <img
              src={product.image}
              className="product-detail-image h-[250px] md:h-auto md:w-[300px] rounded-2xl bg-gray-400 cursor-pointer hover:bg-[#f02d34]"
            />
          </div>
        </div>

        <div className="product-detail-desc">
          <h1 className="text-3xl">{product.title}</h1>
          <div className="reviews">
            <div className="flex">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc flex flex-row">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add To Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuy}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
