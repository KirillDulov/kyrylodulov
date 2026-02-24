import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { updateProduct } from "../features/products/productsThunks";
import Modal from "./Modal";

const ProductModal = ({ product, isOpen, onClose, initialEditing = false, isAdmin = false, onOpenEdit, onDelete }) => {
    const dispatch = useDispatch();
    if (!product) return null;

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description || "");
    const [image, setImage] = useState(product.image || "");
    const [isNew, setIsNew] = useState(product.isNew || false);
    const [isSale, setIsSale] = useState(product.isSale || false);
    const [isEditing, setIsEditing] = useState(initialEditing);

    useEffect(() => {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description || "");
        setImage(product.image || "");
        setIsNew(product.isNew || false);
        setIsSale(product.isSale || false);
        setIsEditing(initialEditing);
    }, [product, initialEditing]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        onClose();
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                id: product._id,
                updatedData: { name, price: Number(price), description, image, isNew, isSale },
            })
        );
        setIsEditing(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {!isEditing ? (
                <div className="product-view">
                    <img src={image} alt={name} className="product-modal-image" />
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <strong>{price} грн</strong>

                    <div className="product-modal-buttons">
                        <button onClick={handleAddToCart}>Додати в кошик</button>
                        {isAdmin && (
                            <>
                                <button onClick={onOpenEdit}>Редагувати</button>
                                <button onClick={onDelete} className="delete-btn">Видалити</button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <form className="product-modal-form" onSubmit={handleSave}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                    <label>
                        <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} /> Новинка
                    </label>
                    <label>
                        <input type="checkbox" checked={isSale} onChange={(e) => setIsSale(e.target.checked)} /> Знижка
                    </label>
                    <div className="product-modal-buttons">
                        <button type="submit">Зберегти</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Відмінити</button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default ProductModal;