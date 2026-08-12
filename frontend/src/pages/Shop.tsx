// frontend/src/pages/Shop.tsx
import React, { useState } from 'react';
import ProductCard, { Product } from '../components/ProductCard';
import './Shop.css'; // ایجاد این فایل الزامی است

interface StatusMsg {
  type: 'success' | 'error' | 'info';
  text: string;
}

const Shop: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<StatusMsg | null>(null);
  
  const [products] = useState<Product[]>([
    { id: '1', name: 'Pi Digital Art', description: 'Exclusive NFT collection for Pi users.', image: 'https://via.placeholder.com/150', priceDisplay: '10 π' },
    { id: '2', name: 'Pi Membership', description: 'Access to premium DAO voting rights.', image: 'https://via.placeholder.com/150', priceDisplay: '50 π' },
    { id: '3', name: 'Crypto Course', description: 'Learn how to trade micro-cap coins.', image: 'https://via.placeholder.com/150', priceDisplay: '25 π' },
  ]);

  const handlePurchase = async (product: Product) => {
    setIsProcessing(product.id);
    setStatusMsg(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatusMsg({ type: 'success', text: `موفقیت‌آمیز: ${product.name} خریداری شد!` });
    } catch (error) {
      setStatusMsg({ type: 'error', text: 'خطا در تراکنش. دوباره تلاش کنید.' });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="shop-page">
      <div className="shop-container">
        <header className="shop-header">
          <h2 className="shop-title">بازار Pi DAO</h2>
          <p className="shop-subtitle">محصولات دیجیتال با امنیت بلاک‌چین</p>
        </header>

        {statusMsg && (
          <div className={`status-banner ${statusMsg.type}`}>
            {statusMsg.text}
          </div>
        )}

        <div className="products-grid">
          {products.map(product => (
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
