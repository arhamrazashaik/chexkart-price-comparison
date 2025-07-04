// JavaScript version - Type definitions converted to JSDoc comments and constants

/**
 * @typedef {Object} ProductImage
 * @property {string} url
 * @property {string} alt
 * @property {boolean} isPrimary
 */

/**
 * @typedef {Object} ProductPrice
 * @property {string} storeName
 * @property {number} price
 * @property {number} originalPrice
 * @property {number} discount
 * @property {string} productUrl
 * @property {boolean} inStock
 * @property {number} stockCount
 * @property {Date} lastUpdated
 */

/**
 * @typedef {Object} ProductReview
 * @property {string} userName
 * @property {string} userEmail
 * @property {string} comment
 * @property {number} rating
 * @property {boolean} verified
 * @property {number} helpful
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Product
 * @property {string} _id
 * @property {string} name
 * @property {string} description
 * @property {string} category
 * @property {string} brand
 * @property {ProductImage[]} images
 * @property {ProductPrice[]} prices
 * @property {number} rating
 * @property {ProductReview[]} reviews
 * @property {string[]} tags
 * @property {string[]} features
 * @property {string} status
 * @property {boolean} featured
 * @property {boolean} trending
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} WishlistItem
 * @property {string} _id
 * @property {string} userId
 * @property {string} productId
 * @property {Product} product
 * @property {Date} addedAt
 * @property {boolean} priceAlert
 * @property {number} targetPrice
 */

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 * @property {string} [phone]
 * @property {string} [address]
 * @property {Date} [dateOfBirth]
 * @property {string} [gender]
 * @property {Object} [location]
 * @property {string} location.city
 * @property {string} location.state
 * @property {string} location.country
 * @property {string} location.pincode
 * @property {Object} [preferences]
 * @property {string} preferences.currency
 * @property {string} preferences.language
 * @property {boolean} preferences.notifications
 * @property {string} role
 * @property {string} status
 * @property {number} [wishlistCount]
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {boolean} isAuthenticated
 * @property {boolean} loading
 * @property {Function} login
 * @property {Function} register
 * @property {Function} logout
 * @property {Function} updateUser
 */

/**
 * @typedef {Object} ThemeContextType
 * @property {boolean} isDarkMode
 * @property {Function} toggleDarkMode
 */

/**
 * @typedef {Object} SearchFilters
 * @property {string} [search]
 * @property {string} [category]
 * @property {number} [minPrice]
 * @property {number} [maxPrice]
 * @property {string} [sort]
 * @property {number} [rating]
 * @property {string} [brand]
 * @property {boolean} [inStock]
 */

/**
 * @typedef {Object} ProductsResponse
 * @property {Product[]} products
 * @property {number} total
 * @property {number} page
 * @property {number} limit
 * @property {number} totalPages
 */

// Constants
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
};

export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  OUT_OF_STOCK: 'out_of_stock'
};

export const SORT_OPTIONS = {
  RELEVANCE: 'relevance',
  PRICE_LOW_TO_HIGH: 'price_asc',
  PRICE_HIGH_TO_LOW: 'price_desc',
  RATING: 'rating',
  NEWEST: 'newest'
};

export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports & Fitness',
  'Books & Media'
];
