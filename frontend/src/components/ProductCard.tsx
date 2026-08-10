// frontend/src/components/ProductCard.tsx
import React from 'react';

// تعریف دقیق تایپ‌ها برای جلوگیری از خطای TypeScript
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  priceDisplay: string;
}

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
  isProcessing: string | null; // ID محصولی که در حال پردازش است
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy, isProcessing }) => {
  const loading = isProcessing === product.id;

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.price}>{product.priceDisplay}</p>
        
        <button 
          style={{ 
            ...styles.button, 
            backgroundColor: loading ? '#ccc' : '#673ab7',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          onClick={() => onBuy(product)}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: '1px solid #eee',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  content: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  title: {
    fontSize: '1.1rem',
    margin: '0 0 8px 0',
    minHeight: '2.4rem',
    color: '#333',
  },
  description: {
    fontSize: '0.85rem',
    color: '#666',
    minHeight: '3rem',
    margin: '0 0 12px 0',
    lineHeight: '1.4',
  },
  price: {
    color: '#673ab7',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginTop: 'auto', // هل دادن قیمت به پایین کارت
    marginBottom: '12px',
  },
  button: {
    width: '100%',
    padding: '10px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  }
};

export default ProductCard;
