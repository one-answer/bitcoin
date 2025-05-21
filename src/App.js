import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CryptoCard from './components/CryptoCard';
import UpdateInfo from './components/UpdateInfo';
import { fetchCryptoPrices } from './services/api';
import { setCustomFavicon } from './utils/setFavicon';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCryptoPrices = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchCryptoPrices();

      if (response.status === 'success') {
        setCryptoData(response.data);
      } else {
        throw new Error('Failed to fetch cryptocurrency data');
      }
    } catch (err) {
      setError('Failed to load cryptocurrency prices. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    // 设置自定义favicon
    setCustomFavicon();

    // 加载加密货币价格数据
    loadCryptoPrices();

    // Set up auto-refresh every 60 seconds
    const intervalId = setInterval(() => {
      loadCryptoPrices();
    }, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="main-content" role="main" aria-label="加密货币价格列表">
        <UpdateInfo
          onRefresh={loadCryptoPrices}
          isLoading={isLoading}
        />

        {error && <div className="error-message" role="alert" aria-live="assertive">{error}</div>}

        {isLoading && cryptoData.length === 0 ? (
          <div className="loading-container" aria-live="polite">
            <div className="loading-spinner" aria-hidden="true"></div>
            <p>正在加载加密货币价格... Loading cryptocurrency prices...</p>
          </div>
        ) : (
          <section className="crypto-container" aria-label="加密货币价格卡片">
            {cryptoData.map((crypto, index) => (
              <CryptoCard
                key={index}
                currencyName={crypto.currencyName}
                price={crypto.price}
                ticker={crypto.ticker}
                date={crypto.date}
                changePercent24Hr={crypto.changePercent24Hr}
              />
            ))}
          </section>
        )}
      </main>

      <footer className="footer" role="contentinfo">
        <p>&copy; {new Date().getFullYear()} Cryptocurrency Price Tracker | <a href="/sitemap.xml" aria-label="网站地图">Sitemap</a></p>
      </footer>
    </div>
  );
}

export default App;
