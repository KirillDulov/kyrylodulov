import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import Modal from "./Modal";

const ProductModal = ({ product, isOpen, onClose }) => {
    const dispatch = useDispatch();

    if (!product) return null;

    const handleAdd = () => {
        dispatch(addToCart(product));
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <strong>{product.price} грн</strong>
            <br />
            <button onClick={handleAdd}>Додати в кошик</button>
        </Modal>
    );
};

export default ProductModal;