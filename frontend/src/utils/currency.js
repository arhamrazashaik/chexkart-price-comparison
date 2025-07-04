/**
 * Format price in Indian Rupees
 * @param {number} price - Price in paise (smallest unit)
 * @returns {string} Formatted price string
 */
export const formatPriceIndian = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '₹0';
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Get image URL with fallback
 * @param {Object} image - Image object
 * @returns {string} Image URL
 */
export const getImageUrl = (image) => {
  if (!image || !image.url) {
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
  }
  return image.url;
};

/**
 * Get image alt text with fallback
 * @param {Object} image - Image object
 * @param {string} fallback - Fallback alt text
 * @returns {string} Alt text
 */
export const getImageAlt = (image, fallback = 'Product image') => {
  if (!image || !image.alt) {
    return fallback;
  }
  return image.alt;
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) {
    return 0;
  }
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Format discount percentage
 * @param {number} discount - Discount percentage
 * @returns {string} Formatted discount string
 */
export const formatDiscount = (discount) => {
  if (!discount || discount <= 0) {
    return '';
  }
  return `${discount}% OFF`;
};

/**
 * Get the lowest price from an array of prices
 * @param {Array} prices - Array of price objects
 * @returns {Object|null} Lowest price object
 */
export const getLowestPrice = (prices) => {
  if (!prices || !Array.isArray(prices) || prices.length === 0) {
    return null;
  }
  
  return prices.reduce((lowest, current) => {
    return current.price < lowest.price ? current : lowest;
  });
};

/**
 * Get the highest price from an array of prices
 * @param {Array} prices - Array of price objects
 * @returns {Object|null} Highest price object
 */
export const getHighestPrice = (prices) => {
  if (!prices || !Array.isArray(prices) || prices.length === 0) {
    return null;
  }
  
  return prices.reduce((highest, current) => {
    return current.price > highest.price ? current : highest;
  });
};

/**
 * Calculate savings between highest and lowest price
 * @param {Array} prices - Array of price objects
 * @returns {number} Savings amount
 */
export const calculateSavings = (prices) => {
  const lowest = getLowestPrice(prices);
  const highest = getHighestPrice(prices);
  
  if (!lowest || !highest) {
    return 0;
  }
  
  return highest.price - lowest.price;
};
