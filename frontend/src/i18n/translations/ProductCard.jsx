// frontend/src/components/ProductCard.jsx
import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import './ProductCard.css';

const ProductCard = ({
  title,
  description,
  price,
  image,
  badge,
  disabled = false,
  onSelect,
}) => {
  const { t } = useI18n();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const displayTitle = title || tx('defaultProductTitle', 'picex Trading Product');
  const displayDescription =
    description ||
    tx(
      'defaultProductDescription',
      'A picex product designed for future Pi trading, wallet, and exchange utilities.'
    );

  const displayBadge = badge || tx('comingSoon', 'Coming soon');

  return (
    <article className={`product-card ${disabled ? 'product-card-disabled' : ''}`}>
      {image && (
        <div className="product-card-image-wrap">
          <img src={image} alt={displayTitle} className="product-card-image" />
        </div>
      )}

      <div className="product-card-content">
        <div className="product-card-badge">
          {displayBadge}
        </div>

        <h3 className="product-card-title">
          {displayTitle}
        </h3>

        <p className="product-card-description">
          {displayDescription}
        </p>

        <div className="product-card-footer">
          <div className="product-card-price">
            <span>{tx('price', 'Price')}</span>
            <strong>
              {price ? `${price} PI` : tx('availableSoon', 'Available soon')}
            </strong>
          </div>

          <button
            type="button"
            className="product-card-button"
            disabled={disabled}
            onClick={onSelect}
          >
            {disabled ? tx('comingSoon', 'Coming soon') : tx('selectProduct', 'Select')}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
