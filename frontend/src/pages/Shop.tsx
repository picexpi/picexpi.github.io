// frontend/src/pages/Shop.tsx
import React, { useState } from 'react';
import ProductCard, { Product } from '../components/ProductCard';

interface StatusMsg {
  type: 'success' | 'error' | 'info';
  text: string;
}

const Shop: React.FC = () => {
  // ۱. وضعیت‌ها (States)
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<StatusMsg | null>(null);
  
  // نمونه داده‌ها (در آینده از API دریافت می‌شود)
  const [products] = useState<Product[]>([
    { id: '1', name: 'Pi Digital Art', description: 'Exclusive NFT collection for Pi users.', image: 'https://via.placeholder.com/150', priceDisplay: '10 π' },
    { id: '2', name: 'Pi Membership', description: 'Access to premium DAO voting rights.', image: 'https://via.placeholder.com/150', priceDisplay: '50 π' },
    { id: '3', name: 'Crypto Course', description: 'Learn how to trade micro-cap coins.', image: 'https://via.placeholder.com/150', priceDisplay: '25 π' },
  ]);

  // ۲. مدیریت خرید
  const handlePurchase = async (product: Product) => {
    setIsProcessing(product.id);
    setStatusMsg(null);

    try {
      // شبیه‌سازی درخواست به بک‌اِند (در پروژه واقعی از axiosClient استفاده کنید)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // فرض می‌کنیم خرید موفقیت‌آمیز بود
      setStatusMsg({ type: 'success', text: `Successfully purchased ${product.name}!` });
    } catch (error) {
      setStatusMsg({ type: 'error', text: 'Transaction failed. Please try again.' });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Pi DAO Marketplace</h2>

      {statusMsg && (
        <div style={{ 
          ...bannerStyle, 
          backgroundColor: statusMsg.type === 'success' ? '#e8f5e9' : statusMsg.type === 'error' ? '#ffebee' : '#e3f2fd',
          color: statusMsg.type === 'success' ? '#2e7d32' : statusMsg.type === 'error' ? '#c62828' : '#1565c0'
        }}>
          {statusMsg.text}
        </div>
      )}

      <div style={gridStyle}>
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
  );
};

// --- Styles ---
const containerStyle: React.CSSProperties = {
  padding: '20px',
  maxWidth: '1000px',
  margin: '0 auto',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '30px',
  color: '#333',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // افزایش کمی سایز برای ظاهر بهتر
  gap: '25px',
  marginTop: '20px',
};

const bannerStyle: React.CSSProperties = {
  padding: '12px',
  borderRadius: '8px',
  marginBottom: '20px',
  textAlign: 'center',
  fontSize: '0.9rem',
  fontWeight: '500',
};

export default Shop;
