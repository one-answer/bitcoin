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
        <p>Real-time prices for Bitcoin, Ethereum, and Dogecoin</p>
      </div>
    </header>
  );
};

export default Header;
