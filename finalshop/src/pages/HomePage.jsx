import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsThunks';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) return <p className="container">Завантаження...</p>;

  if (error) return <p className="container">Помилка: {error}</p>;

  return (
    <div className="container">
      <h2>Каталог товарів</h2>
      <div className="grid">
        {items.length === 0 ? (
          <p>Товари відсутні</p>
        ) : (
          items.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}