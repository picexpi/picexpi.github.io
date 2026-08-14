// frontend/src/pages/Shop.tsx
import React, { useState } from 'react';
import ProductCard, { Product } from '../components/ProductCard';
import { useI18n } from '../i18n/I18nContext';
import './Shop.css';

interface StatusMsg {
  type: 'success' | 'error' | 'info';
  text: string;
}

const Shop: React.FC = () => {
  const { t } = useI18n();

  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<StatusMsg | null>(null);

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Pi Digital Art',
      nameFa: t('productDigitalArtName'),
      nameEn: 'Pi Digital Art',
      nameTr: t('productDigitalArtName'),

      description: 'Exclusive NFT collection for Pi users.',
      descriptionFa: t('productDigitalArtDesc'),
      descriptionEn: 'Exclusive NFT collection for Pi users.',
      descriptionTr: t('productDigitalArtDesc'),

      image: 'https://via.placeholder.com/150',
      priceDisplay: '10 π',
    },
    {
      id: '2',
      name: 'Pi Membership',
      nameFa: t('productMembershipName'),
      nameEn: 'Pi Membership',
      nameTr: t('productMembershipName'),

      description: 'Access to premium DAO voting rights.',
      descriptionFa: t('productMembershipDesc'),
      descriptionEn: 'Access to premium DAO voting rights.',
      descriptionTr: t('productMembershipDesc'),

      image: 'https://via.placeholder.com/150',
      priceDisplay: '50 π',
    },
    {
      id: '3',
      name: 'Crypto Course',
      nameFa: t('productCourseName'),
      nameEn: 'Crypto Course',
      nameTr: t('productCourseName'),

      description: 'Learn how to trade micro-cap coins.',
      descriptionFa: t('productCourseDesc'),
      descriptionEn: 'Learn how to trade micro-cap coins.',
      descriptionTr: t('productCourseDesc'),

      image: 'https://via.placeholder.com/150',
      priceDisplay: '25 π',
    },
  ]);

  const handlePurchase = async (product: Product) => {
    setIsProcessing(product.id);
    setStatusMsg(null);

    try {
      /**
       * فعلاً خرید فروشگاه mock است.
       * اگر بخواهی این را به Pi.createPayment وصل کنیم،
       * باید همین‌جا مثل PiTestnetPayment پرداخت واقعی صدا زده شود.
       */
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatusMsg({
        type: 'success',
        text: `${t('purchaseSuccess')}: ${product.name}`,
      });
    } catch (error) {
      setStatusMsg({
        type: 'error',
        text: t('purchaseError'),
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="shop-page">
      <div className="shop-container">
        <header className="shop-header">
          <h2 className="shop-title">{t('shopTitle')}</h2>
          <p className="shop-subtitle">{t('shopSubtitle')}</p>
        </header>

        {statusMsg && (
          <div className={`status-banner ${statusMsg.type}`}>
            {statusMsg.text}
          </div>
        )}

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={handlePurchase}
              isProcessing={isProcessing}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
