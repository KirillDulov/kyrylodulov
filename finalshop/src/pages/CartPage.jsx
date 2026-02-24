import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../features/cart/cartSlice';
import ProductCard from '../components/ProductCard';
import './CartPage.css';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart-page">
      <h2>Ваш кошик</h2>
      {cartItems.length === 0 ? (
        <p>У вас немає товарів у кошику.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
              <button
                onClick={() => handleRemoveFromCart(product.id || product._id)}
                style={{ backgroundColor: "#ff4d4d" }}
              >
                Видалити з кошика
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}