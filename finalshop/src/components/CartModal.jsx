import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';

export default function CartModal({ onClose }) {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);

    const totalPrice = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    const handlePay = () => {
        if (items.length === 0) return alert("Корзина порожня!");
        alert(`Оплата ${totalPrice} $ успішна 💳`);
        dispatch(clearCart());
        onClose();
    };

    return (
        <div className="modal">
            <h2>Корзина</h2>

            {items.length === 0 && <p>Корзина порожня</p>}

            {items.map(item => (
                <div key={item.id}>
                    {item.title} — {item.price}грн × {item.quantity || 1}
                </div>
            ))}

            <hr />
            <p><strong>Разом: {totalPrice}грн</strong></p>
            <div class="cart-actions">
                <button class="cart" onClick={handlePay}>Оплатити</button>
                <button class="cart" onClick={onClose}>Закрити</button>
            </div>
        </div>
    );
}