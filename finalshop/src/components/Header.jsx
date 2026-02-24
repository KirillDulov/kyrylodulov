import { useState } from 'react';
import { useSelector } from 'react-redux';
import CartModal from './CartModal';
import { Link } from 'react-router-dom';
import { FaSearch, FaRegHeart, FaPhoneAlt, FaShoppingCart, FaUser } from 'react-icons/fa';
import './Header.css';

export default function Header() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [language, setLanguage] = useState('ua');
  const [currency, setCurrency] = useState('грн');

  const cart = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleCurrencyChange = (e) => setCurrency(e.target.value);
  const favoriteCount = useSelector(state => state.cart.favoriteItems.length);
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          LadyStyle
        </Link>

        <nav className="nav-links">
          {user?.role === 'admin' && (
            <Link to="/aDMIN/add-product">Додати продукт</Link>
          )}
        </nav>

        <div className="header__language">
          <select value={language} onChange={handleLanguageChange}>
            <option value="ua">UA</option>
            <option value="en">EN</option>
          </select>
        </div>

        <div className="header__currency">
          <select value={currency} onChange={handleCurrencyChange}>
            <option value="грн">грн</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </div>

        <div className="header__icons">
          <Link to="/contact">
            <FaPhoneAlt className="header__icon" title="Контакти" />
          </Link>
          <FaSearch className="header__icon" title="Пошук" />
          <Link to="/favorites"><FaRegHeart className="header__icon" title="Улюблені" /></Link>
          <Link to="/profile" className="profile-link">
            <FaUser />
          </Link>
        </div>

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