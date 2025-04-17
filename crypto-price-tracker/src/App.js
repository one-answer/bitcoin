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

      <main className="main-content">
        <UpdateInfo
          onRefresh={loadCryptoPrices}
          isLoading={isLoading}
        />

        {error && <div className="error-message">{error}</div>}

        {isLoading && cryptoData.length === 0 ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading cryptocurrency prices...</p>
          </div>
        ) : (
          <div className="crypto-container">
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
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Cryptocurrency Price Tracker</p>
      </footer>
    </div>
  );
}

export default App;
