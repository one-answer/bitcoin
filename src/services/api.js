/**
 * API service for fetching cryptocurrency prices
 */

// Define OKX API endpoints
const OKX_BASE_URL = 'https://www.okx.com/api/v5/market';
const API_ENDPOINTS = {
  BTC: `${OKX_BASE_URL}/ticker?instId=BTC-USDT`,
  ETH: `${OKX_BASE_URL}/ticker?instId=ETH-USDT`,
  DOGE: `${OKX_BASE_URL}/ticker?instId=DOGE-USDT`,
  SOL: `${OKX_BASE_URL}/ticker?instId=SOL-USDT`
};

/**
 * Formats a date to GMT+8 (China Standard Time)
 * @param {string} dateStr - Date string in any valid format
 * @returns {string} Formatted date string in GMT+8
 */
const convertToGMT8 = (dateStr) => {
  try {
    // Create a Date object from the input string
    const date = new Date(dateStr);

    // Calculate the UTC time
    const utcYear = date.getUTCFullYear();
    const utcMonth = date.getUTCMonth();
    const utcDay = date.getUTCDate();
    const utcHour = date.getUTCHours();
    const utcMinute = date.getUTCMinutes();
    const utcSecond = date.getUTCSeconds();

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
  } catch (error) {
    console.error('Error converting time to GMT+8:', error);
    return dateStr; // Return original string if conversion fails
  }
};

/**
 * Maps OKX API data to a more user-friendly format
 * @param {Array} cryptoData - The array of cryptocurrency data objects
 * @returns {Array} Formatted cryptocurrency data
 */
const formatCryptoData = (cryptoData) => {
  return cryptoData.map(crypto => {
    // Extract the instrument ID to determine which cryptocurrency this is
    const instId = crypto.instId;
    let currencyName = 'Unknown';
    let ticker = 'Unknown';

    if (instId === 'BTC-USDT') {
      currencyName = '比特币';
      ticker = 'BTC/USDT';
    } else if (instId === 'ETH-USDT') {
      currencyName = '以太币';
      ticker = 'ETH/USDT';
    } else if (instId === 'DOGE-USDT') {
      currencyName = '狗狗币';
      ticker = 'DOGE/USDT';
    } else if (instId === 'SOL-USDT') {
      currencyName = '索拉纳';
      ticker = 'SOL/USDT';
    }

    // Format the price to show USD with 2 decimal places
    const priceUsd = parseFloat(crypto.last).toFixed(2);

    // Calculate 24h change percentage
    const open24h = parseFloat(crypto.open24h);
    const last = parseFloat(crypto.last);
    const changePercent24Hr = ((last - open24h) / open24h * 100).toFixed(2);

    // Convert timestamp to date (OKX provides timestamp in milliseconds)
    const timestamp = parseInt(crypto.ts);
    const date = new Date(timestamp);
    const gmt8Date = convertToGMT8(date.toISOString());

    return {
      currencyName,
      price: `${priceUsd} USDT`,
      ticker,
      date: gmt8Date,
      changePercent24Hr
    };
  });
};

/**
 * Fetches data from a single OKX API endpoint
 * @param {string} url - The API endpoint URL
 * @returns {Promise<Object>} The cryptocurrency data
 */
const fetchFromEndpoint = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();

  if (result.code !== '0' || !result.data || result.data.length === 0) {
    throw new Error('Invalid API response format or empty data');
  }

  return result.data[0]; // OKX returns an array, but we only need the first item
};

/**
 * Fetches cryptocurrency prices from OKX API
 * @returns {Promise<Object>} The combined API response with cryptocurrency data
 */
export const fetchCryptoPrices = async () => {
  try {
    // Fetch data from all endpoints in parallel
    const [btcData, ethData, dogeData, solData] = await Promise.all([
      fetchFromEndpoint(API_ENDPOINTS.BTC),
      fetchFromEndpoint(API_ENDPOINTS.ETH),
      fetchFromEndpoint(API_ENDPOINTS.DOGE),
      fetchFromEndpoint(API_ENDPOINTS.SOL)
    ]);

    // Combine the data into an array
    const combinedData = [btcData, ethData, dogeData, solData];

    // Format the combined data
    const formattedData = formatCryptoData(combinedData);

    return {
      status: 'success',
      data: formattedData
    };
  } catch (error) {
    console.error('Error fetching cryptocurrency prices:', error);
    throw error;
  }
};
