import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import ProductModal from "./ProductModal";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    dispatch(addToCart(product));
  };

  return (
    <>
      <div className="product-card" onClick={() => setOpen(true)}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.price} грн</p>

        <button onClick={handleAddToCart}>
          Додати в кошик
        </button>
      </div>

      <ProductModal
        product={product}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ProductCard;