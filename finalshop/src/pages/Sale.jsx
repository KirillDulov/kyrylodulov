import ProductCard from '../components/ProductCard';
import './Sale.css';

const saleProducts = [
  { id: 201, title: 'Блузка зелена', price: 800, image: 'https://via.placeholder.com/200' },
  { id: 202, title: 'Спідниця синя', price: 950, image: 'https://via.placeholder.com/200' },
];

export default function Sale() {
  return (
    <section className="sale">
      <h2>Розпродаж</h2>
      <div className="grid">
        {saleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}