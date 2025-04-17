import React from 'react';
import './Header.css';

/**
 * Header component for the cryptocurrency price tracker
 */
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Cryptocurrency Price Tracker</h1>
        <p>Real-time prices from OKX for Bitcoin, Ethereum, and Dogecoin</p>
        <div className="data-source">Data provided by <a href="https://www.okx.com/zh-hans/price/bitcoin-btc" target="_blank" rel="noopener noreferrer">OKX.com</a></div>
      </div>
    </header>
  );
};

export default Header;
