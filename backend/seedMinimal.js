const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const minimalProducts = [
  {
    name: "Sony WH-1000XM4 Wireless Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology",
    category: "Electronics",
    brand: "Sony",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        alt: "Sony WH-1000XM4 Headphones",
        isPrimary: true
      }
    ],
    specifications: [],
    variants: [],
    prices: [
      {
        storeName: "Amazon",
        price: 22990,
        productUrl: "https://amzn.in/d/gcr687W",
        inStock: true,
        lastUpdated: new Date()
      },
      {
        storeName: "Flipkart",
        price: 24999,
        productUrl: "https://www.flipkart.com/sony-wh-1000xm4-bluetooth-headphones/p/itm9f84f49ad6ac8",
        inStock: true,
        lastUpdated: new Date()
      }
    ],
    priceHistory: [],
    rating: 4.8,
    reviews: [
      {
        userName: "John D.",
        comment: "Best noise-canceling headphones I've ever used!",
        rating: 5,
        verified: true,
        helpful: 12,
        createdAt: new Date()
      }
    ],
    tags: ["wireless", "noise-canceling", "premium"],
    features: ["Industry-leading noise canceling", "30-hour battery life"],
    availability: {
      inStock: true,
      stockCount: 25
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
    category: "Electronics",
    brand: "Samsung",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
        alt: "Samsung Galaxy S24 Ultra",
        isPrimary: true
      }
    ],
    specifications: [],
    variants: [],
    prices: [
      {
        storeName: "Samsung Store",
        price: 129999,
        productUrl: "https://www.samsung.com/in/smartphones/galaxy-s24-ultra/",
        inStock: true,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 127999,
        productUrl: "https://www.amazon.in/Samsung-Galaxy-S24-Ultra/dp/B0CMDRCGZZ",
        inStock: true,
        lastUpdated: new Date()
      }
    ],
    priceHistory: [],
    rating: 4.7,
    reviews: [
      {
        userName: "Tech Reviewer",
        comment: "Amazing camera quality and performance. S Pen is very useful.",
        rating: 5,
        verified: true,
        helpful: 15,
        createdAt: new Date()
      }
    ],
    tags: ["smartphone", "android", "samsung", "flagship"],
    features: ["S Pen included", "AI camera features", "200MP main camera"],
    availability: {
      inStock: true,
      stockCount: 17
    },
    analytics: {
      views: 890,
      clicks: 67,
      wishlistCount: 134
    },
    status: "active",
    featured: true,
    trending: true
  },
  {
    name: "MacBook Air M3",
    description: "Apple's thinnest and lightest laptop with M3 chip",
    category: "Electronics",
    brand: "Apple",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800",
        alt: "MacBook Air M3",
        isPrimary: true
      }
    ],
    specifications: [],
    variants: [],
    prices: [
      {
        storeName: "Apple Store",
        price: 114900,
        productUrl: "https://www.apple.com/in/macbook-air/",
        inStock: true,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 112900,
        productUrl: "https://www.amazon.in/Apple-MacBook-Air-M3/dp/B0CX23V2ZK",
        inStock: true,
        lastUpdated: new Date()
      }
    ],
    priceHistory: [],
    rating: 4.9,
    reviews: [
      {
        userName: "Developer",
        comment: "Perfect for coding and daily tasks. Battery life is incredible.",
        rating: 5,
        verified: true,
        helpful: 20,
        createdAt: new Date()
      }
    ],
    tags: ["laptop", "apple", "macbook", "m3"],
    features: ["M3 chip", "18-hour battery", "Liquid Retina display"],
    availability: {
      inStock: true,
      stockCount: 12
    },
    analytics: {
      views: 650,
      clicks: 45,
      wishlistCount: 89
    },
    status: "active",
    featured: true,
    trending: true
  },
  {
    name: "Nike Air Max 270",
    description: "Lifestyle running shoes with Max Air cushioning",
    category: "Fashion",
    brand: "Nike",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        alt: "Nike Air Max 270",
        isPrimary: true
      }
    ],
    specifications: [],
    variants: [],
    prices: [
      {
        storeName: "Nike",
        price: 12995,
        productUrl: "https://www.nike.com/in/t/air-max-270-mens-shoes/",
        inStock: true,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 11999,
        productUrl: "https://www.amazon.in/Nike-Air-Max-270/dp/B07DQZQZQZ",
        inStock: true,
        lastUpdated: new Date()
      }
    ],
    priceHistory: [],
    rating: 4.6,
    reviews: [
      {
        userName: "Runner",
        comment: "Super comfortable shoes! Great for running and daily wear.",
        rating: 5,
        verified: true,
        helpful: 8,
        createdAt: new Date()
      }
    ],
    tags: ["shoes", "nike", "running", "lifestyle"],
    features: ["Max Air cushioning", "Breathable mesh", "Durable rubber outsole"],
    availability: {
      inStock: true,
      stockCount: 35
    },
    analytics: {
      views: 420,
      clicks: 28,
      wishlistCount: 56
    },
    status: "active",
    featured: false,
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
    await Product.insertMany(minimalProducts);
    console.log('Products seeded successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
