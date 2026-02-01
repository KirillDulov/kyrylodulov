import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsThunks';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (isLoading) return <p className="container">Завантаження...</p>;

  return (
    <div className="container">
      <h2>Каталог</h2>
      <div className="grid">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}