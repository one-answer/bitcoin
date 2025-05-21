import React from 'react';
import './Header.css';

/**
 * Header component for the cryptocurrency price tracker
 * Enhanced with semantic HTML and improved accessibility for SEO
 */
const Header = () => {
  return (
    <header className="header" role="banner" aria-label="网站头部">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo" aria-hidden="true">
            <span className="logo-icon">₿</span>
          </div>
          <h1 itemProp="headline">加密货币实时行情</h1>
        </div>
        <p itemProp="description">比特币、以太币、狗狗币和索拉纳的实时价格追踪</p>
        <div className="data-source">数据来源： <a href="https://www.okx.com/zh-hans/price/bitcoin-btc" target="_blank" rel="noopener noreferrer" aria-label="访问OKX.com获取更多加密货币信息">OKX.com</a></div>
      </div>
    </header>
  );
};

export default Header;
