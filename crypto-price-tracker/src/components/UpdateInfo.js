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
    const gmt8Time = new Date(now.getTime() + (8 * 60 * 60 * 1000));

    const year = gmt8Time.getUTCFullYear();
    const month = String(gmt8Time.getUTCMonth() + 1).padStart(2, '0');
    const day = String(gmt8Time.getUTCDate()).padStart(2, '0');
    const hours = String(gmt8Time.getUTCHours()).padStart(2, '0');
    const minutes = String(gmt8Time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(gmt8Time.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (GMT+8)`;
  };

  return (
    <div className="update-info">
      <div className="update-info-text">
        <p className="update-time">
          {updateTime ? `Last updated: ${updateTime}` : 'Loading...'}
        </p>
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
