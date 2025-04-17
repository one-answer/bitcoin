import React from 'react';
import './CryptoCard.css';

/**
 * Component for displaying a cryptocurrency card with price information
 * @param {Object} props - Component props
 * @param {string} props.currencyName - Name of the cryptocurrency
 * @param {string} props.price - Current price of the cryptocurrency
 * @param {string} props.ticker - Ticker symbol of the cryptocurrency
 * @param {string} props.date - Date of the price data
 * @param {string} props.changePercent24Hr - 24-hour price change percentage
 * @param {string} props.icon - Icon for the cryptocurrency (optional)
 */
const CryptoCard = ({ currencyName, price, ticker, date, changePercent24Hr, icon }) => {
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
    <div className="crypto-card" style={{ borderColor: currencyInfo.color }}>
      <div className="crypto-icon" style={{ background: currencyInfo.gradient }}>
        {icon || currencyInfo.icon}
      </div>
      <div className="crypto-details">
        <h2>{currencyInfo.englishName}</h2>
        <h3>{currencyName} <span className="ticker">({ticker})</span></h3>
        <p className="crypto-price">{priceValue}</p>
        <p className={`crypto-change ${isPositiveChange ? 'positive' : 'negative'}`}>
          24h: {isPositiveChange ? '+' : ''}{changePercent}%
        </p>
        <p className="crypto-date">{date}</p>
      </div>
    </div>
  );
};

export default CryptoCard;
