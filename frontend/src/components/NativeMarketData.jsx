// frontend/src/components/NativeMarketData.jsx
import React from 'react';
import './NativeMarketData.css';
import { useI18n } from '../i18n/I18nContext';

const NativeMarketData = () => {
  const { t } = useI18n();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const markets = [
    {
      pair: tx('piUsdtPair', 'PI / USDT'),
      type: tx('spotMarket', 'Spot Market'),
      description: tx(
        'piUsdtMarketDescription',
        'Order book, trades, candles, volume'
      ),
      icon: '📊',
      accent: 'gold',
    },
    {
      pair: tx('piNightPair', 'PI / NIGHT'),
      type: tx('ecosystemPair', 'Ecosystem Pair'),
      description: tx(
        'piNightMarketDescription',
        'Designed for future picex utility economy'
      ),
      icon: '🌙',
      accent: 'purple',
    },
    {
      pair: tx('piPerpPair', 'PI-PERP'),
      type: tx('futuresReady', 'Futures Ready'),
      description: tx(
        'piPerpMarketDescription',
        'Planned perpetual market after risk engine maturity'
      ),
      icon: '⚡',
      accent: 'blue',
    },
  ];

  return (
    <section id="markets" className="native-market-section">
      <div className="container">
        <div className="native-market-heading">
          <span className="native-market-kicker">
            {tx('picexNativeData', 'picex native data')}
          </span>

          <h2>
            {tx('nativeMarketDataTitle', 'picex Native Market Data')}
          </h2>

          <p className="native-market-subtitle">
            {tx(
              'nativeMarketDataSubtitle',
              'Live markets powered by picex trading activity'
            )}
          </p>

          <p className="native-market-description">
            {tx(
              'nativeMarketDataDescription',
              'picex price charts are designed to be generated from our own executed trades, order book events, and OHLC candle aggregation — not from unrelated external market feeds. This gives Pi traders a cleaner view of the real picex market.'
            )}
          </p>
        </div>

        <div className="native-market-grid">
          {markets.map((market, index) => (
            <article
              key={index}
              className={`native-market-card native-market-card-${market.accent}`}
            >
              <div className="native-market-card-top">
                <span className="native-market-icon">
                  {market.icon}
                </span>

                <span className="native-market-pill">
                  {market.type}
                </span>
              </div>

              <h3>{market.pair}</h3>

              <p>{market.description}</p>

              <div className="native-market-meta">
                <span>{tx('orderBook', 'Order book')}</span>
                <span>{tx('trades', 'Trades')}</span>
                <span>{tx('candles', 'Candles')}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="native-market-footnote">
          <span>🔒</span>
          <p>
            {tx(
              'nativeMarketDataFootnote',
              'Market data is planned to be based on verified picex trading activity, internal ledgers, and exchange-generated candle data.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default NativeMarketData;
