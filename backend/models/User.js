const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const wishlistItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  priceAlert: {
    enabled: {
      type: Boolean,
      default: false
    },
    targetPrice: Number,
    notified: {
      type: Boolean,
      default: false
    }
  }
});

const userPreferencesSchema = new mongoose.Schema({
  categories: [String],
  brands: [String],
  priceRange: {
    min: Number,
    max: Number
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    priceAlerts: {
      type: Boolean,
      default: true
    },
    newDeals: {
      type: Boolean,
      default: false
    }
  },
  currency: {
    type: String,
    default: 'INR'
  },
  language: {
    type: String,
    default: 'en'
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    trim: true
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  location: {
    city: String,
    state: String,
    country: {
      type: String,
      default: 'India'
    },
    pincode: String
  },
  wishlist: [wishlistItemSchema],
  preferences: userPreferencesSchema,
  analytics: {
    totalViews: {
      type: Number,
      default: 0
    },
    totalClicks: {
      type: Number,
      default: 0
    },
    favoriteCategories: [String],
    lastActive: {
      type: Date,
      default: Date.now
    }
  },
  verification: {
    email: {
      verified: {
        type: Boolean,
        default: false
      },
      token: String,
      expires: Date
    },
    phone: {
      verified: {
        type: Boolean,
        default: false
      },
      otp: String,
      expires: Date
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
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

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ 'analytics.lastActive': -1 });
userSchema.index({ createdAt: -1 });

// Virtual for wishlist count
userSchema.virtual('wishlistCount').get(function() {
  return this.wishlist ? this.wishlist.length : 0;
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update timestamp
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Add product to wishlist
userSchema.methods.addToWishlist = function(productId, priceAlert = null) {
  const existingItem = this.wishlist.find(item => 
    item.productId.toString() === productId.toString()
  );
  
  if (!existingItem) {
    this.wishlist.push({
      productId,
      priceAlert: priceAlert || { enabled: false }
    });
  }
  
  return this.save();
};

// Remove product from wishlist
userSchema.methods.removeFromWishlist = function(productId) {
  this.wishlist = this.wishlist.filter(item => 
    item.productId.toString() !== productId.toString()
  );
  return this.save();
};

// Ensure virtuals are included in JSON output
userSchema.set('toJSON', { 
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.verification;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
