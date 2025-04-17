import React from 'react';
import './Header.css';

/**
 * Header component for the cryptocurrency price tracker
 */
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo">
            <span className="logo-icon">₿</span>
          </div>
          <h1>加密货币实时行情</h1>
        </div>
        <p>比特币、以太币和狗狗币的实时价格追踪</p>
        <div className="data-source">数据来源： <a href="https://www.okx.com/zh-hans/price/bitcoin-btc" target="_blank" rel="noopener noreferrer">OKX.com</a></div>
      </div>
    </header>
  );
};

export default Header;
