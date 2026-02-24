import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import './CartModal.css';

export default function CartModal({ onClose }) {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);

    const totalPrice = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    const handlePay = () => {
        if (items.length === 0) return alert("Корзина порожня!");
        alert(`Оплата ${totalPrice}грн успішна 💳`);
        dispatch(clearCart());
        onClose();
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="modal">
            <h2>Корзина</h2>

            {items.length === 0 ? (
                <p>Корзина порожня</p>
            ) : (
                <>
                    {items.map(item => (
                        <div key={item.id || item._id} className="cart-item">
                            <p>{item.name} — {item.price}грн × {item.quantity || 1}</p>

                            <button className='cart-item button'
                                onClick={() => handleRemoveFromCart(item.id || item._id)}
                            >
                                Видалити з кошика
                            </button>
                        </div>
                    ))}

                    <hr />
                    <p><strong>Разом: {totalPrice}грн</strong></p>
                </>
            )}

            <div className="cart-actions">
                <button className="cart" onClick={handlePay}>
                    Оплатити
                </button>
                <button className="cart" onClick={onClose}>
                    Закрити
                </button>
            </div>
        </div>
    );
}