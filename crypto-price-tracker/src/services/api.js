/**
 * API service for fetching cryptocurrency prices
 */

// Define API endpoints for different cryptocurrencies
const API_ENDPOINTS = {
  BTC: 'https://tsanghi.com/api/fin/crypto/realtime?token=demo&ticker=BTC/USD',
  ETH: 'https://tsanghi.com/api/fin/crypto/realtime?token=demo&ticker=ETH/USD',
  DOGE: 'https://tsanghi.com/api/fin/crypto/realtime?token=demo&ticker=DOGE/USD'
};

/**
 * Converts GMT time to GMT+8 (China Standard Time)
 * @param {string} gmtDateStr - Date string in GMT format (e.g., "2025-04-17 08:10:12")
 * @returns {string} Formatted date string in GMT+8
 */
const convertToGMT8 = (gmtDateStr) => {
  try {
    // Parse the GMT date string
    const [datePart, timePart] = gmtDateStr.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    // Create a Date object (which will be in local time)
    const gmtDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

    // Add 8 hours for GMT+8
    const gmt8Date = new Date(gmtDate.getTime() + (8 * 60 * 60 * 1000));

    // Format the date to a readable string (YYYY-MM-DD HH:MM:SS GMT+8)
    const gmt8Year = gmt8Date.getUTCFullYear();
    const gmt8Month = String(gmt8Date.getUTCMonth() + 1).padStart(2, '0');
    const gmt8Day = String(gmt8Date.getUTCDate()).padStart(2, '0');
    const gmt8Hour = String(gmt8Date.getUTCHours()).padStart(2, '0');
    const gmt8Minute = String(gmt8Date.getUTCMinutes()).padStart(2, '0');
    const gmt8Second = String(gmt8Date.getUTCSeconds()).padStart(2, '0');

    return `${gmt8Year}-${gmt8Month}-${gmt8Day} ${gmt8Hour}:${gmt8Minute}:${gmt8Second} (GMT+8)`;
  } catch (error) {
    console.error('Error converting time to GMT+8:', error);
    return gmtDateStr; // Return original string if conversion fails
  }
};

/**
 * Maps API data to a more user-friendly format
 * @param {Array} apiData - The raw data from the API
 * @returns {Array} Formatted cryptocurrency data
 */
const formatCryptoData = (apiData) => {
  return apiData.map(crypto => {
    // Extract the currency name from the ticker
    let currencyName = 'Unknown';
    if (crypto.ticker === 'BTC/USD') currencyName = '比特币';
    else if (crypto.ticker === 'ETH/USD') currencyName = '以太币';
    else if (crypto.ticker === 'DOGE/USD') currencyName = '狗狗币';

    // Convert GMT time to GMT+8
    const gmt8Date = convertToGMT8(crypto.date);

    return {
      currencyName,
      price: `${crypto.close} USD`,
      ticker: crypto.ticker,
      date: gmt8Date
    };
  });
};

/**
 * Fetches data from a single API endpoint
 * @param {string} url - The API endpoint URL
 * @returns {Promise<Array>} The formatted cryptocurrency data
 */
const fetchFromEndpoint = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();

  if (result.code !== 200) {
    throw new Error(`API error! Code: ${result.code}, Message: ${result.msg}`);
  }

  return result.data;
};

/**
 * Fetches cryptocurrency prices from multiple API endpoints
 * @returns {Promise<Object>} The combined API response with cryptocurrency data
 */
export const fetchCryptoPrices = async () => {
  try {
    // Fetch data from all endpoints in parallel
    const [btcData, ethData, dogeData] = await Promise.all([
      fetchFromEndpoint(API_ENDPOINTS.BTC),
      fetchFromEndpoint(API_ENDPOINTS.ETH),
      fetchFromEndpoint(API_ENDPOINTS.DOGE)
    ]);

    // Combine the data from all endpoints
    const combinedData = [...btcData, ...ethData, ...dogeData];

    // Format the combined data
    const formattedData = formatCryptoData(combinedData);

    // Get the update time from the first data point (assuming all data points have similar timestamps)
    const updateTime = combinedData.length > 0 ? combinedData[0].date : '';

    return {
      status: 'success',
      data: formattedData,
      updateTime
    };
  } catch (error) {
    console.error('Error fetching cryptocurrency prices:', error);
    throw error;
  }
};
