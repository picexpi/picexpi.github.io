// frontend/src/components/ProductCard.tsx
import React from 'react';
import './ProductCard.css';
import { useI18n } from '../i18n/I18nContext';

export interface Product {
  id: string;

  name: string;
  description: string;

  nameFa?: string;
  nameEn?: string;
  nameTr?: string;

  descriptionFa?: string;
  descriptionEn?: string;
  descriptionTr?: string;

  image?: string;
  icon?: string;
  category?: string;
  badge?: string;
  priceDisplay: string;
  actionLabel?: string;
}

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
  isProcessing: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onBuy,
  isProcessing,
}) => {
  const { lang, t } = useI18n();

  const loading = isProcessing === product.id;

  const tx = (key: string, fallback: string) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const getProductName = () => {
    if (lang === 'fa') return product.nameFa || product.name;
    if (lang === 'en') return product.nameEn || product.name;
    if (lang === 'tr') return product.nameTr || product.name;

    return product.name;
  };

  const getProductDescription = () => {
    if (lang === 'fa') return product.descriptionFa || product.description;
    if (lang === 'en') return product.descriptionEn || product.description;
    if (lang === 'tr') return product.descriptionTr || product.description;

    return product.description;
  };

  const productName = getProductName();
  const productDescription = getProductDescription();

  return (
    <article className="product-card">
      <div className="product-visual-wrapper">
        {product.image ? (
          <img
            src={product.image}
            alt={productName}
            className="product-image"
          />
        ) : (
          <div className="product-icon-fallback">
            {product.icon || 'π'}
          </div>
        )}

        <div className="product-price-badge">
          {product.priceDisplay}
        </div>

        {product.badge && (
          <div className="product-top-badge">
            {product.badge}
          </div>
        )}
      </div>

      <div className="product-content">
        {product.category && (
          <div className="product-category">
            {product.category}
          </div>
        )}

        <h3 className="product-title">{productName}</h3>

        <p className="product-description">
          {productDescription}
        </p>

        <button
          className={`product-button ${loading ? 'loading' : ''}`}
          onClick={() => onBuy(product)}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="product-spinner"></span>
              <span style={{ marginInlineStart: '8px' }}>
                {tx('processing', 'Processing...')}
              </span>
            </>
          ) : (
            product.actionLabel || tx('buyNow', 'Open')
          )}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
