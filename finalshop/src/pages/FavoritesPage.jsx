import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import './FavoritesPage.css';
import { removeFromFavorites } from '../features/cart/cartSlice';
export default function FavoritesPage() {
    const favoriteProducts = useSelector(state => state.cart.favoriteItems || []);
    console.log("favoriteProducts:", favoriteProducts);
    return (
        <div className="favorites-page">
            <h2>Улюблені товари</h2>
            {favoriteProducts.length === 0 ? (
                <p>У вас немає улюблених товарів.</p>
            ) : (
                <div className="favorites-list">
                    {favoriteProducts.map((product) => (
                        <ProductCard key={product.id || product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}