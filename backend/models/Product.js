const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: false
  },
  comment: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  verified: {
    type: Boolean,
    default: false
  },
  helpful: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const priceHistorySchema = new mongoose.Schema({
  storeName: String,
  price: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

const priceSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: false
  },
  discount: {
    type: Number,
    default: 0
  },
  productUrl: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockCount: {
    type: Number,
    default: null
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const specificationSchema = new mongoose.Schema({
  name: String,
  value: String,
  unit: String
});

const variantSchema = new mongoose.Schema({
  name: String,
  value: String,
  priceModifier: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  subcategory: {
    type: String,
    index: true
  },
  brand: {
    type: String,
    required: true,
    index: true
  },
  model: String,
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  specifications: [specificationSchema],
  variants: [variantSchema],
  prices: [priceSchema],
  priceHistory: [priceHistorySchema],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],
  tags: [String],
  features: [String],
  warranty: {
    duration: String,
    type: String,
    provider: String
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    weight: Number,
    unit: String
  },
  availability: {
    inStock: {
      type: Boolean,
      default: true
    },
    stockCount: Number,
    restockDate: Date
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    slug: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    wishlistCount: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add comprehensive indexes for search and performance
productSchema.index({ name: 'text', description: 'text', category: 'text', brand: 'text', tags: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ 'prices.price': 1 });
productSchema.index({ featured: -1, trending: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ 'analytics.views': -1 });

// Virtual for minimum price
productSchema.virtual('minPrice').get(function() {
  if (this.prices && this.prices.length > 0) {
    return Math.min(...this.prices.map(p => p.price));
  }
  return 0;
});

// Virtual for maximum price
productSchema.virtual('maxPrice').get(function() {
  if (this.prices && this.prices.length > 0) {
    return Math.max(...this.prices.map(p => p.price));
  }
  return 0;
});

// Virtual for savings percentage
productSchema.virtual('savingsPercentage').get(function() {
  const min = this.minPrice;
  const max = this.maxPrice;
  if (max > 0 && min < max) {
    return Math.round(((max - min) / max) * 100);
  }
  return 0;
});

// Virtual for average rating
productSchema.virtual('averageRating').get(function() {
  if (this.reviews && this.reviews.length > 0) {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / this.reviews.length).toFixed(1);
  }
  return this.rating;
});

// Middleware to update timestamps
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  if (this.reviews) {
    this.reviewCount = this.reviews.length;
  }
  next();
});

// Middleware to generate slug from name
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.seo.slug) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
