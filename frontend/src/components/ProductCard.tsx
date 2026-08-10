// frontend/src/components/ProductCard.tsx
import React from 'react';

// تعریف ساختار محصول بر اساس نیازهای Pi Network
interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // قیمت بر حسب Pi
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy }) => {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/150'} 
          alt={product.name} 
          style={styles.image} 
        />
      </div>
      
      <div style={styles.content}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        
        <div style={styles.footer}>
          <span style={styles.price}>{product.price} π</span>
          <button 
            onClick={() => onBuy(product)}
            style={styles.button}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

// استایل‌های درون‌خطی برای جلوگیری از وابستگی به فایل خارجی در مرحله تست
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px',
    margin: '10px'
  },
  imageContainer: {
    width: '100%',
    height: '180px',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  title: {
    fontSize: '1.2rem',
    margin: '0 0 10px 0',
    color: '#333',
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    margin: '0 0 15px 0',
    lineHeight: '1.4',
  },
  footer: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#ff9900', // Pi Network color vibe
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#673ab7', // Deep purple
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default ProductCard;
