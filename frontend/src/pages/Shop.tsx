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

  const tx = (key: string, fallback: string) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<StatusMsg | null>(null);

  const [products] = useState<Product[]>([
    {
      id: 'spot-pi-usdt',
      name: 'PI / USDT Spot Market',
      nameFa: 'بازار اسپات PI / USDT',
      nameEn: 'PI / USDT Spot Market',
      nameTr: 'PI / USDT Spot Market',

      description:
        'A planned spot trading pair powered by the picex order book and internal trade history.',
      descriptionFa:
        'جفت‌ارز اسپات پیشنهادی با دفتر سفارش picex و تاریخچه معاملات داخلی.',
      descriptionEn:
        'A planned spot trading pair powered by the picex order book and internal trade history.',
      descriptionTr:
        'picex emir defteri ve dahili işlem geçmişi ile planlanan spot işlem çifti.',

      icon: 'π',
      category: 'Spot',
      badge: 'Core',
      priceDisplay: 'Low Fee',
      actionLabel: 'Preview Market',
    },
    {
      id: 'wallet-access',
      name: 'Wallet Deposit & Withdraw',
      nameFa: 'کیف پول، واریز و برداشت',
      nameEn: 'Wallet Deposit & Withdraw',
      nameTr: 'Cüzdan Yatırma ve Çekme',

      description:
        'Future wallet module for deposit addresses, pending balances, withdrawal queue, and hot/cold wallet operations.',
      descriptionFa:
        'ماژول آینده کیف پول برای آدرس واریز، موجودی در انتظار، صف برداشت و مدیریت کیف پول گرم و سرد.',
      descriptionEn:
        'Future wallet module for deposit addresses, pending balances, withdrawal queue, and hot/cold wallet operations.',
      descriptionTr:
        'Yatırma adresleri, bekleyen bakiyeler, çekim kuyruğu ve sıcak/soğuk cüzdan operasyonları için gelecek modül.',

      icon: '👛',
      category: 'Wallet',
      badge: 'Planned',
      priceDisplay: 'Pi Flow',
      actionLabel: 'View Flow',
    },
    {
      id: 'native-charts',
      name: 'Native picex Charts',
      nameFa: 'نمودارهای اختصاصی picex',
      nameEn: 'Native picex Charts',
      nameTr: 'Yerel picex Grafikleri',

      description:
        'Charts generated from picex executed trades, OHLC candles, depth, and real-time order book events.',
      descriptionFa:
        'نمودارهایی بر پایه معاملات انجام‌شده در picex، کندل‌های OHLC، عمق بازار و رویدادهای دفتر سفارش.',
      descriptionEn:
        'Charts generated from picex executed trades, OHLC candles, depth, and real-time order book events.',
      descriptionTr:
        'picex işlemleri, OHLC mumları, derinlik ve gerçek zamanlı emir defteri olaylarından üretilen grafikler.',

      icon: '📈',
      category: 'Market Data',
      badge: 'Native',
      priceDisplay: 'Internal Data',
      actionLabel: 'Explore Charts',
    },
    {
      id: 'ai-support',
      name: 'AI Support Assistant',
      nameFa: 'دستیار پشتیبانی هوش مصنوعی',
      nameEn: 'AI Support Assistant',
      nameTr: 'Yapay Zeka Destek Asistanı',

      description:
        'AI support layer for questions about Pi login, payments, deposits, withdrawals, KYC, fees, and order status.',
      descriptionFa:
        'لایه پشتیبانی هوش مصنوعی برای سوالات مربوط به ورود Pi، پرداخت، واریز، برداشت، KYC، کارمزد و وضعیت سفارش.',
      descriptionEn:
        'AI support layer for questions about Pi login, payments, deposits, withdrawals, KYC, fees, and order status.',
      descriptionTr:
        'Pi girişi, ödemeler, yatırma, çekme, KYC, ücretler ve emir durumu için yapay zeka destek katmanı.',

      icon: '🤖',
      category: 'Support',
      badge: 'AI',
      priceDisplay: '24/7',
      actionLabel: 'Open Assistant',
    },
    {
      id: 'picex-governance',
      name: 'picex Governance',
      nameFa: 'حاکمیت جامعه picex',
      nameEn: 'picex Governance',
      nameTr: 'picex Yönetişim',

      description:
        'Community voting and product prioritization for the picex roadmap using the existing poll infrastructure.',
      descriptionFa:
        'رأی‌گیری جامعه و اولویت‌بندی محصول برای نقشه‌راه picex با استفاده از زیرساخت Poll موجود.',
      descriptionEn:
        'Community voting and product prioritization for the picex roadmap using the existing poll infrastructure.',
      descriptionTr:
        'Mevcut anket altyapısı ile picex yol haritası için topluluk oylaması ve ürün önceliklendirmesi.',

      icon: '🗳️',
      category: 'Governance',
      badge: 'Community',
      priceDisplay: 'Vote',
      actionLabel: 'View Poll',
    },
    {
      id: 'futures-ready',
      name: 'Perpetual Futures Layer',
      nameFa: 'لایه فیوچرز دائمی',
      nameEn: 'Perpetual Futures Layer',
      nameTr: 'Sürekli Vadeli İşlemler Katmanı',

      description:
        'A future derivatives layer planned after spot liquidity, risk engine, margin controls, and liquidation logic are ready.',
      descriptionFa:
        'لایه مشتقات آینده پس از آماده شدن نقدینگی اسپات، موتور ریسک، کنترل مارجین و منطق لیکوییدیشن.',
      descriptionEn:
        'A future derivatives layer planned after spot liquidity, risk engine, margin controls, and liquidation logic are ready.',
      descriptionTr:
        'Spot likidite, risk motoru, marjin kontrolleri ve likidasyon mantığı hazır olduktan sonra planlanan türev katmanı.',

      icon: '⚡',
      category: 'Futures',
      badge: 'Future',
      priceDisplay: 'Risk Engine',
      actionLabel: 'Learn More',
    },
  ]);

  const handlePurchase = async (product: Product) => {
    setIsProcessing(product.id);
    setStatusMsg(null);

    try {
      /**
       * This is intentionally still mock.
       * Later we can connect specific cards to routes:
       * - Wallet -> #pi-payment-panel
       * - Governance -> #poll
       * - AI Support -> /support or #support-ai
       * - Spot -> /markets or /trade
       */
      await new Promise((resolve) => setTimeout(resolve, 900));

      setStatusMsg({
        type: 'info',
        text: `${product.name} is part of the picex roadmap. The previous purchase flow is preserved and can be connected to Pi payments when needed.`,
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
      <div className="shop-container">
        <header className="shop-header">
          <div className="shop-kicker">
            picex Trading Products
          </div>

          <h2 className="shop-title">
            {tx('picexProductsTitle', 'Markets, wallet tools, and exchange modules')}
          </h2>

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
      </div>
    </div>
  );
};

export default Shop;
