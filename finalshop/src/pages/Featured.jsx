import ProductCard from '../components/ProductCard';
import './Featured.css';

const featuredProducts = [
  { id: 101, title: 'Сукня чорна', price: 1200, image: 'https://via.placeholder.com/200' },
  { id: 102, title: 'Сукня червона', price: 1500, image: 'https://via.placeholder.com/200' },
];

export default function Featured() {
  return (
    <section className="featured">
      <h2>Популярні товари</h2>
      <div className="grid">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}