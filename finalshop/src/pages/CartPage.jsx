import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cart/cartSlice';
import './CartPage.css';

export default function CartPage() {
  const { items, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart-container">
      <h2>Кошик</h2>
      {items.length === 0 && <p>Кошик порожній</p>}
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.title} x {item.quantity}</span>
          <span>{item.price * item.quantity} грн</span>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Видалити
          </button>
        </div>
      ))}
      {items.length > 0 && <h3>Разом: {totalPrice} грн</h3>}
    </div>
  );
}