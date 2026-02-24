import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import './Sale.css';

export default function Sale() {
  const { user } = useSelector(state => state.auth);
  const products = useSelector(state => state.products.items);
  const saleProducts = products.filter(p => p.isSale);

  return (
    <section className="sale">
      <h2>Розпродаж</h2>
      <div className="grid">
        {saleProducts.map(product => (
          <ProductCard key={product._id} product={product} user={user} />
        ))}
      </div>
    </section>
  );
}