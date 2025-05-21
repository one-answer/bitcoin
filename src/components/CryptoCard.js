import React from 'react';
import './CryptoCard.css';

/**
 * Component for displaying a cryptocurrency card with price information
 * Enhanced with semantic HTML and improved accessibility for SEO
 * @param {Object} props - Component props
 * @param {string} props.currencyName - Name of the cryptocurrency
 * @param {string} props.price - Current price of the cryptocurrency
 * @param {string} props.ticker - Ticker symbol of the cryptocurrency
 * @param {string} props.changePercent24Hr - 24-hour price change percentage
 * @param {string} props.icon - Icon for the cryptocurrency (optional)
 */
const CryptoCard = ({ currencyName, price, ticker, changePercent24Hr, icon }) => {
  // Map currency names to their respective icons and colors
  const getCurrencyInfo = (name) => {
    const currencyMap = {
      '比特币': {
        icon: '₿',
        color: '#f7931a',
        englishName: 'Bitcoin',
        gradient: 'linear-gradient(135deg, #f7931a, #ff8f00)'
      },
      '以太币': {
        icon: 'Ξ',
        color: '#627eea',
        englishName: 'Ethereum',
        gradient: 'linear-gradient(135deg, #627eea, #3b5998)'
      },
      '狗狗币': {
        icon: 'Ð',
        color: '#c3a634',
        englishName: 'Dogecoin',
        gradient: 'linear-gradient(135deg, #c3a634, #ba9f33)'
      },
      '索拉纳': {
        icon: 'S',
        color: '#14f195',
        englishName: 'Solana',
        gradient: 'linear-gradient(135deg, #14f195, #00c2c2)'
      }
    };

    return currencyMap[name] || { icon: '$', color: '#333', englishName: name, gradient: 'linear-gradient(135deg, #333, #666)' };
  };

  const currencyInfo = getCurrencyInfo(currencyName);

  // Extract the numeric part of the price for display
  const priceValue = typeof price === 'string' ? price : `${price} USD`;

  // Format the 24-hour change percentage
  const changePercent = changePercent24Hr ? parseFloat(changePercent24Hr).toFixed(2) : '0.00';
  const isPositiveChange = parseFloat(changePercent) >= 0;

  return (
    <article className="crypto-card" style={{ borderColor: currencyInfo.color }} itemScope itemType="https://schema.org/FinancialProduct">
      <div className="crypto-icon" style={{ background: currencyInfo.gradient }} aria-hidden="true">
        {icon || currencyInfo.icon}
      </div>
      <div className="crypto-details">
        <h2 itemProp="name">{currencyInfo.englishName}</h2>
        <h3 itemProp="alternateName">{currencyName} <span className="ticker">({ticker})</span></h3>
        <p className="crypto-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span itemProp="price">{priceValue}</span>
        </p>
        <p
          className={`crypto-change ${isPositiveChange ? 'positive' : 'negative'}`}
          aria-label={`24小时价格变化: ${isPositiveChange ? '上涨' : '下跌'} ${Math.abs(parseFloat(changePercent))}%`}
        >
          24h: {isPositiveChange ? '+' : ''}{changePercent}%
        </p>
        <meta itemProp="description" content={`${currencyName}(${currencyInfo.englishName})实时价格和24小时涨跌幅`} />
      </div>
    </article>
  );
};

export default CryptoCard;
