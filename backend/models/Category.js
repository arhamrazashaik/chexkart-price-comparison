const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  productCount: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  image: String,
  icon: String,
  subcategories: [subcategorySchema],
  productCount: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
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
categorySchema.index({ slug: 1 });
categorySchema.index({ featured: -1, order: 1 });
categorySchema.index({ status: 1 });

// Middleware to generate slug from name
categorySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  // Generate slugs for subcategories
  if (this.subcategories) {
    this.subcategories.forEach(sub => {
      if (!sub.slug) {
        sub.slug = sub.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
    });
  }
  
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Category', categorySchema);
