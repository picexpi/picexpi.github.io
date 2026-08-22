// frontend/src/pages/Shop.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard, { Product } from '../components/ProductCard';
import { useI18n } from '../i18n/I18nContext';
import './Shop.css';

interface StatusMsg {
  type: 'success' | 'error' | 'info';
  text: string;
}

const Shop: React.FC = () => {
  const { t } = useI18n();

  const tx = (key: string, fallback: string) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<StatusMsg | null>(null);

  const products: Product[] = [
    {
      id: 'spot-pi-usdt',
      nameKey: 'shopProductSpotPiUsdtTitle',
      fallbackName: 'PI / USDT Spot Market',
      descriptionKey: 'shopProductSpotPiUsdtDescription',
      fallbackDescription:
        'A planned spot trading pair powered by the picex order book and internal trade history.',
      icon: 'π',
      categoryKey: 'featureTagSpot',
      fallbackCategory: 'Spot',
      badgeKey: 'productBadgeCore',
      fallbackBadge: 'Core',
      priceDisplayKey: 'productPriceLowFee',
      fallbackPriceDisplay: 'Low Fee',
      actionLabelKey: 'productActionPreviewMarket',
      fallbackActionLabel: 'Preview Market',
      disabled: false,
    },
    {
      id: 'wallet-access',
      nameKey: 'shopProductWalletAccessTitle',
      fallbackName: 'Wallet Deposit & Withdraw',
      descriptionKey: 'shopProductWalletAccessDescription',
      fallbackDescription:
        'Future wallet module for deposit addresses, pending balances, withdrawal queue, and hot/cold wallet operations.',
      icon: '👛',
      categoryKey: 'featureTagWallet',
      fallbackCategory: 'Wallet',
      badgeKey: 'planned',
      fallbackBadge: 'Planned',
      priceDisplayKey: 'productPricePiFlow',
      fallbackPriceDisplay: 'Pi Flow',
      actionLabelKey: 'productActionViewFlow',
      fallbackActionLabel: 'View Flow',
      disabled: false,
    },
    {
      id: 'native-charts',
      nameKey: 'shopProductNativeChartsTitle',
      fallbackName: 'Native picex Charts',
      descriptionKey: 'shopProductNativeChartsDescription',
      fallbackDescription:
        'Charts generated from picex executed trades, OHLC candles, depth, and real-time order book events.',
      icon: '📈',
      categoryKey: 'roadmapStatusMarket',
      fallbackCategory: 'Market Data',
      badgeKey: 'productBadgeNative',
      fallbackBadge: 'Native',
      priceDisplayKey: 'productPriceInternalData',
      fallbackPriceDisplay: 'Internal Data',
      actionLabelKey: 'productActionExploreCharts',
      fallbackActionLabel: 'Explore Charts',
      disabled: false,
    },
    {
      id: 'ai-support',
      nameKey: 'shopProductAiSupportTitle',
      fallbackName: 'AI Support Assistant',
      descriptionKey: 'shopProductAiSupportDescription',
      fallbackDescription:
        'AI support layer for questions about Pi login, payments, deposits, withdrawals, KYC, fees, and order status.',
      icon: '🤖',
      categoryKey: 'support',
      fallbackCategory: 'Support',
      badgeKey: 'featureTagAi',
      fallbackBadge: 'AI',
      priceDisplayKey: 'productPrice247',
      fallbackPriceDisplay: '24/7',
      actionLabelKey: 'productActionOpenAssistant',
      fallbackActionLabel: 'Open Assistant',
      disabled: false,
    },
    {
      id: 'picex-governance',
      nameKey: 'shopProductGovernanceTitle',
      fallbackName: 'picex Governance',
      descriptionKey: 'shopProductGovernanceDescription',
      fallbackDescription:
        'Community voting and product prioritization for the picex roadmap using the existing poll infrastructure.',
      icon: '🗳️',
      categoryKey: 'governance',
      fallbackCategory: 'Governance',
      badgeKey: 'footerCommunity',
      fallbackBadge: 'Community',
      priceDisplayKey: 'productPriceVote',
      fallbackPriceDisplay: 'Vote',
      actionLabelKey: 'productActionViewPoll',
      fallbackActionLabel: 'View Poll',
      disabled: false,
    },
    {
      id: 'futures-ready',
      nameKey: 'shopProductFuturesTitle',
      fallbackName: 'Perpetual Futures Layer',
      descriptionKey: 'shopProductFuturesDescription',
      fallbackDescription:
        'A future derivatives layer planned after spot liquidity, risk engine, margin controls, and liquidation logic are ready.',
      icon: '⚡',
      categoryKey: 'futures',
      fallbackCategory: 'Futures',
      badgeKey: 'productBadgeFuture',
      fallbackBadge: 'Future',
      priceDisplayKey: 'productPriceRiskEngine',
      fallbackPriceDisplay: 'Risk Engine',
      actionLabelKey: 'learnMore',
      fallbackActionLabel: 'Learn More',
      disabled: false,
    },
  ];

  const handlePurchase = async (product: Product) => {
    setIsProcessing(product.id);
    setStatusMsg(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const productName = tx(product.nameKey, product.fallbackName);

      setStatusMsg({
        type: 'info',
        text: tx(
          'productRoadmapNotice',
          '{product} is part of the picex roadmap. This action can later be connected to Pi payments, market previews, governance, or support flows.'
        ).replace('{product}', productName),
      });
    } catch (error) {
      setStatusMsg({
        type: 'error',
        text: tx('purchaseError', 'Action failed. Please try again.'),
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="shop-page">
      <Navbar />

      <main className="shop-container">
        <header className="shop-header">
          <div className="shop-kicker">
            {tx('shopKicker', 'picex Trading Products')}
          </div>

          <h1 className="shop-title">
            {tx('picexProductsTitle', 'Markets, wallet tools, and exchange modules')}
          </h1>

          <p className="shop-subtitle">
            {tx(
              'picexProductsSubtitle',
              'Explore the product modules that shape picex: spot markets, wallet operations, native charts, AI support, governance, and futures-ready infrastructure.'
            )}
          </p>
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
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
