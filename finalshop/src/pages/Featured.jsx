import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import './Featured.css';

export default function Featured() {
  const { user } = useSelector(state => state.auth);

  const products = useSelector(state => state.products.items);

  const featuredProducts = products.filter(p => p.isNew);

  return (
    <section className="featured">
      <h2>Популярні товари</h2>
      <div className="grid">
        {featuredProducts.map(product => (
          <ProductCard key={product._id} product={product} user={user} />
        ))}
      </div>
    </section>
  );
}