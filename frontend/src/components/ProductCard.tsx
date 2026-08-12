// frontend/src/components/ProductCard.tsx
import React from 'react';
import './ProductCard.css'; // این همان خطی است که برای اتصال استایل‌ها اضافه شد

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
  isProcessing: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy, isProcessing }) => {
  const loading = isProcessing === product.id;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-price-badge">{product.priceDisplay}</div>
      </div>
      
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <button 
          className={`product-button ${loading ? 'loading' : ''}`}
          onClick={() => onBuy(product)}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner"></span>
          ) : (
            'Buy Now'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
