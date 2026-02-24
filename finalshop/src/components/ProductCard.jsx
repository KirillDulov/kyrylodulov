import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, addToFavorites, removeFromFavorites } from "../features/cart/cartSlice";
import ProductModal from "./ProductModal";
import { deleteProduct } from "../features/products/productsThunks";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { favoriteItems, items } = useSelector(state => state.cart);
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const isFavorite = favoriteItems.some(
    item => String(item.id) === String(product.id || product._id)
  );

  const isInCart = items.some(
    item => String(item.id) === String(product.id || product._id)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, id: product._id }));
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    dispatch(removeFromCart(product._id));
  };

  const handleAddToFavorites = (e) => {
    e.stopPropagation();
    const itemId = String(product._id || product.id);

    if (isFavorite) {
      dispatch(removeFromFavorites(itemId));
    } else {
      dispatch(addToFavorites({
        id: itemId,
        name: product.name,
        price: product.price,
        image: product.image
      }));
    }
  };

  const handleOpenView = () => {
    setEditMode(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e) => {
    e.stopPropagation();
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Ви впевнені, що хочете видалити товар?")) {
      dispatch(deleteProduct(product._id));
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="product-card" onClick={handleOpenView}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price} грн</p>

        {!isInCart ? (
          <button onClick={handleAddToCart}>
            Додати в кошик
          </button>
        ) : (
          <button onClick={handleRemoveFromCart} style={{ backgroundColor: "#ff4d4d" }}>
            Видалити з кошика
          </button>
        )}

        <button
          onClick={handleAddToFavorites}
          style={{ backgroundColor: isFavorite ? "red" : "#9c4e97" }}
        >
          {isFavorite ? "Видалити з улюблених" : "Додати до улюблених"}
        </button>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialEditing={editMode}
        isAdmin={isAdmin}
        onOpenEdit={handleOpenEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default ProductCard;