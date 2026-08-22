// frontend/src/components/ProductCard.tsx
import React from 'react';
import './ProductCard.css';
import { useI18n } from '../i18n/I18nContext';

export interface Product {
  id: string;

  nameKey: string;
  fallbackName: string;

  descriptionKey: string;
  fallbackDescription: string;

  icon?: string;
  image?: string;

  categoryKey: string;
  fallbackCategory: string;

  badgeKey: string;
  fallbackBadge: string;

  priceDisplayKey: string;
  fallbackPriceDisplay: string;

  actionLabelKey: string;
  fallbackActionLabel: string;

  disabled?: boolean;
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
  const { t } = useI18n();

  const tx = (key: string, fallback: string) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const loading = isProcessing === product.id;
  const disabled = Boolean(product.disabled || loading);

  const productName = tx(product.nameKey, product.fallbackName);
  const productDescription = tx(
    product.descriptionKey,
    product.fallbackDescription
  );

  const category = tx(product.categoryKey, product.fallbackCategory);
  const badge = tx(product.badgeKey, product.fallbackBadge);
  const priceDisplay = tx(
    product.priceDisplayKey,
    product.fallbackPriceDisplay
  );
  const actionLabel = tx(
    product.actionLabelKey,
    product.fallbackActionLabel
  );

  return (
    <article
      className={`product-card ${disabled ? 'product-card-disabled' : ''}`}
    >
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
          {priceDisplay}
        </div>

        {badge && (
          <div className="product-top-badge">
            {badge}
          </div>
        )}
      </div>

      <div className="product-content">
        {category && (
          <div className="product-category">
            {category}
          </div>
        )}

        <h3 className="product-title">
          {productName}
        </h3>

        <p className="product-description">
          {productDescription}
        </p>

        <button
          type="button"
          className={`product-button ${loading ? 'loading' : ''}`}
          onClick={() => onBuy(product)}
          disabled={disabled}
        >
          {loading ? (
            <>
              <span className="product-spinner" />
              <span style={{ marginInlineStart: '8px' }}>
                {tx('processing', 'Processing...')}
              </span>
            </>
          ) : (
            actionLabel || tx('open', 'Open')
          )}
        </button>
      </div>
    </article>
  );
};

expo
  rt default ProductCard;
