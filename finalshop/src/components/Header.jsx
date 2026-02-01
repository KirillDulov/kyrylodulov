import { useState } from 'react';
import { useSelector } from 'react-redux';
import CartModal from './CartModal';
import './Header.css';

export default function Header() {
  const [isCartOpen, setCartOpen] = useState(false);

  const cart = useSelector(state => state.cart);

  return (
    <>
      <header className="header">
        <h1 className="logo">LadyStyle</h1>

        <div
          className="cart"
          onClick={() => setCartOpen(true)}
        >
          🛒 {cart.items.length} | {cart.totalPrice} грн
        </div>
      </header>

      {isCartOpen && (
        <CartModal onClose={() => setCartOpen(false)} />
      )}
    </>
  );
}