const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
require('dotenv').config();

// Categories data
const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronic devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    icon: "📱",
    subcategories: [
      { name: "Smartphones", slug: "smartphones", description: "Latest mobile phones", featured: true },
      { name: "Laptops", slug: "laptops", description: "Computers and laptops", featured: true },
      { name: "Audio", slug: "audio", description: "Headphones and speakers", featured: true },
      { name: "Cameras", slug: "cameras", description: "Digital cameras and accessories", featured: false },
      { name: "Gaming", slug: "gaming", description: "Gaming consoles and accessories", featured: true }
    ],
    featured: true,
    order: 1
  },
  {
    name: "Fashion",
    slug: "fashion",
    description: "Clothing, shoes, and accessories",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    icon: "👕",
    subcategories: [
      { name: "Men's Clothing", slug: "mens-clothing", description: "Men's fashion and apparel", featured: true },
      { name: "Women's Clothing", slug: "womens-clothing", description: "Women's fashion and apparel", featured: true },
      { name: "Shoes", slug: "shoes", description: "Footwear for all occasions", featured: true },
      { name: "Accessories", slug: "accessories", description: "Fashion accessories", featured: false }
    ],
    featured: true,
    order: 2
  },
  {
    name: "Home & Garden",
    slug: "home-garden",
    description: "Home improvement and garden supplies",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    icon: "🏠",
    subcategories: [
      { name: "Furniture", slug: "furniture", description: "Home and office furniture", featured: true },
      { name: "Kitchen", slug: "kitchen", description: "Kitchen appliances and tools", featured: true },
      { name: "Garden", slug: "garden", description: "Gardening tools and supplies", featured: false },
      { name: "Decor", slug: "decor", description: "Home decoration items", featured: true }
    ],
    featured: true,
    order: 3
  },
  {
    name: "Sports & Fitness",
    slug: "sports-fitness",
    description: "Sports equipment and fitness gear",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    icon: "⚽",
    subcategories: [
      { name: "Fitness Equipment", slug: "fitness-equipment", description: "Home gym and fitness gear", featured: true },
      { name: "Sports Gear", slug: "sports-gear", description: "Equipment for various sports", featured: true },
      { name: "Outdoor", slug: "outdoor", description: "Outdoor and adventure gear", featured: false }
    ],
    featured: true,
    order: 4
  },
  {
    name: "Books & Media",
    slug: "books-media",
    description: "Books, movies, and digital media",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    icon: "📚",
    subcategories: [
      { name: "Books", slug: "books", description: "Physical and digital books", featured: true },
      { name: "Movies", slug: "movies", description: "DVDs and digital movies", featured: false },
      { name: "Music", slug: "music", description: "CDs and digital music", featured: false }
    ],
    featured: false,
    order: 5
  }
];

// Enhanced products data
const products = [
  {
    name: "Sony WH-1000XM4 Wireless Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30 hours of battery life with quick charge.",
    shortDescription: "Premium noise-canceling wireless headphones with 30-hour battery life",
    category: "Electronics",
    subcategory: "Audio",
    brand: "Sony",
    model: "WH-1000XM4",
    sku: "SONY-WH1000XM4-BLK",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        alt: "Sony WH-1000XM4 Headphones",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
        alt: "Sony Headphones Side View",
        isPrimary: false
      }
    ],
    specifications: [
      { name: "Driver Size", value: "40", unit: "mm" },
      { name: "Frequency Response", value: "4Hz-40kHz", unit: "" },
      { name: "Battery Life", value: "30", unit: "hours" },
      { name: "Charging Time", value: "3", unit: "hours" },
      { name: "Weight", value: "254", unit: "g" }
    ],
    variants: [
      { name: "Color", value: "Black", priceModifier: 0, inStock: true },
      { name: "Color", value: "Silver", priceModifier: 500, inStock: true }
    ],
    prices: [
      {
        storeName: "Amazon",
        price: 22990,
        originalPrice: 29990,
        discount: 23,
        productUrl: "https://amzn.in/d/gcr687W",
        inStock: true,
        stockCount: 15,
        lastUpdated: new Date()
      },
      {
        storeName: "Flipkart",
        price: 24999,
        originalPrice: 29990,
        discount: 17,
        productUrl: "https://www.flipkart.com/sony-wh-1000xm4-bluetooth-headphones/p/itm9f84f49ad6ac8",
        inStock: true,
        stockCount: 8,
        lastUpdated: new Date()
      }
    ],
    priceHistory: [
      { storeName: "Amazon", price: 29990, date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      { storeName: "Amazon", price: 22990, date: new Date() }
    ],
    rating: 4.8,
    reviewCount: 4,
    reviews: [
      {
        userName: "John D.",
        userEmail: "john@example.com",
        comment: "Best noise-canceling headphones I've ever used!",
        rating: 5,
        verified: true,
        helpful: 12,
        createdAt: new Date()
      },
      {
        userName: "Priya S.",
        userEmail: "priya@example.com",
        comment: "Excellent sound quality and battery life. Worth every rupee!",
        rating: 5,
        verified: true,
        helpful: 8,
        createdAt: new Date()
      }
    ],
    tags: ["wireless", "noise-canceling", "premium", "sony", "bluetooth"],
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Quick charge (10 min = 5 hours)",
      "Touch sensor controls",
      "Speak-to-chat technology"
    ],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty",
      provider: "Sony India"
    },
    dimensions: {
      length: 254,
      width: 220,
      height: 38,
      weight: 254,
      unit: "mm/g"
    },
    availability: {
      inStock: true,
      stockCount: 48
    },
    seo: {
      metaTitle: "Sony WH-1000XM4 Wireless Noise Canceling Headphones - Best Price in India",
      metaDescription: "Buy Sony WH-1000XM4 wireless headphones with industry-leading noise canceling. Compare prices across Amazon, Flipkart & Sony Store.",
      slug: "sony-wh-1000xm4-wireless-headphones"
    },
    analytics: {
      views: 1250,
      clicks: 89,
      wishlistCount: 156
    },
    status: "active",
    featured: true,
    trending: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/price-comparison');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    await Category.insertMany(categories);
    console.log('Categories seeded successfully');

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
