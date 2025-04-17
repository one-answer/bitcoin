import React from 'react';
import './UpdateInfo.css';

/**
 * Component to display the last update time and refresh button
 * @param {Object} props - Component props
 * @param {string} props.updateTime - The last update time
 * @param {Function} props.onRefresh - Function to call when refresh button is clicked
 * @param {boolean} props.isLoading - Whether data is currently being loaded
 */
const UpdateInfo = ({ updateTime, onRefresh, isLoading }) => {
  // Get current time in GMT+8
  const getCurrentTime = () => {
    const now = new Date();

    // Calculate the UTC time
    const utcYear = now.getUTCFullYear();
    const utcMonth = now.getUTCMonth();
    const utcDay = now.getUTCDate();
    const utcHour = now.getUTCHours();
    const utcMinute = now.getUTCMinutes();
    const utcSecond = now.getUTCSeconds();

    // Create a new Date object with UTC time
    const utcDate = new Date(Date.UTC(utcYear, utcMonth, utcDay, utcHour, utcMinute, utcSecond));

    // Add 8 hours for GMT+8
    const gmt8Date = new Date(utcDate.getTime() + (8 * 60 * 60 * 1000));

    // Format the date to a readable string (YYYY-MM-DD HH:MM:SS GMT+8)
    const gmt8Year = gmt8Date.getUTCFullYear();
    const gmt8Month = String(gmt8Date.getUTCMonth() + 1).padStart(2, '0');
    const gmt8Day = String(gmt8Date.getUTCDate()).padStart(2, '0');
    const gmt8Hour = String(gmt8Date.getUTCHours()).padStart(2, '0');
    const gmt8Minute = String(gmt8Date.getUTCMinutes()).padStart(2, '0');
    const gmt8Second = String(gmt8Date.getUTCSeconds()).padStart(2, '0');

    return `${gmt8Year}-${gmt8Month}-${gmt8Day} ${gmt8Hour}:${gmt8Minute}:${gmt8Second} (GMT+8)`;
  };

  return (
    <div className="update-info">
      <div className="update-info-text">
        <p className="current-time">
          Current time: {getCurrentTime()}
        </p>
      </div>
      <button
        className="refresh-button"
        onClick={onRefresh}
        disabled={isLoading}
      >
        {isLoading ? 'Refreshing...' : 'Refresh Prices'}
      </button>
    </div>
  );
};

export default UpdateInfo;
