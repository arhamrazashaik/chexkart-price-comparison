const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const simpleProducts = [
  {
    name: "Sony WH-1000XM4 Wireless Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology",
    shortDescription: "Premium noise-canceling wireless headphones",
    category: "Electronics",
    subcategory: "Audio",
    brand: "Sony",
    model: "WH-1000XM4",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        alt: "Sony WH-1000XM4 Headphones",
        isPrimary: true
      }
    ],
    specifications: [
      { name: "Battery Life", value: "30", unit: "hours" },
      { name: "Weight", value: "254", unit: "g" }
    ],
    variants: [],
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
    priceHistory: [],
    rating: 4.8,
    reviewCount: 2,
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
    tags: ["wireless", "noise-canceling", "premium", "sony"],
    features: ["Industry-leading noise canceling", "30-hour battery life"],
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
      stockCount: 23
    },
    seo: {
      metaTitle: "Sony WH-1000XM4 Wireless Headphones - Best Price",
      metaDescription: "Buy Sony WH-1000XM4 wireless headphones. Compare prices.",
      slug: "sony-wh-1000xm4-wireless-headphones"
    },
    analytics: {
      views: 150,
      clicks: 12,
      wishlistCount: 25
    },
    status: "active",
    featured: true,
    trending: true
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Latest flagship smartphone with AI features and S Pen",
    shortDescription: "Premium Android smartphone with S Pen",
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
        alt: "Samsung Galaxy S24 Ultra",
        isPrimary: true
      }
    ],
    specifications: [
      { name: "Display", value: "6.8", unit: "inches" },
      { name: "Storage", value: "256", unit: "GB" },
      { name: "RAM", value: "12", unit: "GB" }
    ],
    variants: [
      { name: "Storage", value: "256GB", priceModifier: 0, inStock: true },
      { name: "Storage", value: "512GB", priceModifier: 15000, inStock: true }
    ],
    prices: [
      {
        storeName: "Samsung Store",
        price: 129999,
        originalPrice: 134999,
        discount: 4,
        productUrl: "https://www.samsung.com/in/smartphones/galaxy-s24-ultra/",
        inStock: true,
        stockCount: 5,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 127999,
        originalPrice: 134999,
        discount: 5,
        productUrl: "https://www.amazon.in/Samsung-Galaxy-S24-Ultra/dp/B0CMDRCGZZ",
        inStock: true,
        stockCount: 12,
        lastUpdated: new Date()
      }
    ],
    priceHistory: [],
    rating: 4.7,
    reviewCount: 1,
    reviews: [
      {
        userName: "Tech Reviewer",
        userEmail: "tech@example.com",
        comment: "Amazing camera quality and performance. S Pen is very useful.",
        rating: 5,
        verified: true,
        helpful: 15,
        createdAt: new Date()
      }
    ],
    tags: ["smartphone", "android", "samsung", "s-pen", "flagship"],
    features: ["S Pen included", "AI camera features", "200MP main camera", "5000mAh battery"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty",
      provider: "Samsung India"
    },
    dimensions: {
      length: 162.3,
      width: 79.0,
      height: 8.6,
      weight: 232,
      unit: "mm/g"
    },
    availability: {
      inStock: true,
      stockCount: 17
    },
    seo: {
      metaTitle: "Samsung Galaxy S24 Ultra - Best Price in India",
      metaDescription: "Buy Samsung Galaxy S24 Ultra smartphone. Compare prices across stores.",
      slug: "samsung-galaxy-s24-ultra"
    },
    analytics: {
      views: 890,
      clicks: 67,
      wishlistCount: 134
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
    console.log('Cleared existing products');

    // Insert products
    await Product.insertMany(simpleProducts);
    console.log('Products seeded successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
