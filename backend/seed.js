const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
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
      { name: "Battery Life", value: "30", unit: "hours" },
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
        price: 29224,
        originalPrice: 29990,
        discount: 3,
        productUrl: "https://www.flipkart.com/sony-wh-1000xm4-bluetooth-headphones/p/itm9f84f49ad6ac8",
        inStock: true,
        stockCount: 8,
        lastUpdated: new Date()
      },
      {
        storeName: "Sony Store",
        price: 29990,
        originalPrice: 29990,
        discount: 0,
        productUrl: "https://www.sony.co.in/electronics/headband-headphones/wh-1000xm4",
        inStock: true,
        stockCount: 25,
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
      },
      {
        userName: "Rahul M.",
        userEmail: "rahul@example.com",
        comment: "Great for work from home. Noise cancellation is amazing.",
        rating: 4,
        verified: false,
        helpful: 5,
        createdAt: new Date()
      },
      {
        userName: "Anita K.",
        userEmail: "anita@example.com",
        comment: "Good headphones but a bit expensive. Sound quality is top-notch.",
        rating: 4,
        verified: true,
        helpful: 3,
        createdAt: new Date()
      }
    ],
    tags: ["wireless", "noise-canceling", "premium", "sony", "bluetooth"],
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Quick charge (10 min = 5 hours)",
      "Touch sensor controls"
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
  },
  {
    name: "Samsung 65\" QLED 4K Smart TV",
    description: "Quantum processor with AI upscaling, HDR, and smart features",
    category: "Electronics",
    images: [
      "https://example.com/samsung-tv-1.jpg",
      "https://example.com/samsung-tv-2.jpg"
    ],
    prices: [
      {
        storeName: "Samsung Store",
        price: 108549,
        productUrl: "https://www.samsung.com/in/tvs/qled-tv/"
      },
      {
        storeName: "Flipkart",
        price: 100199,
        productUrl: "https://www.flipkart.com/samsung-65-inch-qled-ultra-hd-4k-smart-tv/p/itmf8f9c8c8e8e8e"
      },
      {
        storeName: "Amazon",
        price: 96024,
        productUrl: "https://www.amazon.in/Samsung-65-inch-QLED-Ultra-Smart/dp/B08L5M5M5M"
      }
    ],
    rating: 4.6,
    reviews: [
      {
        userName: "Sarah M.",
        comment: "Amazing picture quality!",
        rating: 5,
        createdAt: new Date()
      },
      {
        userName: "Vikram P.",
        comment: "Perfect for our living room. Colors are vibrant and sharp.",
        rating: 5,
        createdAt: new Date()
      },
      {
        userName: "Meera J.",
        comment: "Good TV but setup was a bit complicated. Picture quality is excellent.",
        rating: 4,
        createdAt: new Date()
      },
      {
        userName: "Arjun T.",
        comment: "Great value for money. Smart features work well.",
        rating: 4,
        createdAt: new Date()
      },
      {
        userName: "Kavya R.",
        comment: "Love the QLED technology. Watching movies is a great experience.",
        rating: 5,
        createdAt: new Date()
      }
    ]
  },
  {
    name: "Apple iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    category: "Electronics",
    images: [
      "https://example.com/iphone-15-pro-1.jpg",
      "https://example.com/iphone-15-pro-2.jpg"
    ],
    prices: [
      {
        storeName: "Apple Store",
        price: 99900,
        productUrl: "https://www.apple.com/in/iphone-15-pro/"
      },
      {
        storeName: "Amazon",
        price: 97500,
        productUrl: "https://www.amazon.in/Apple-iPhone-15-Pro-256GB/dp/B0CHX1W1XY"
      },
      {
        storeName: "Flipkart",
        price: 98000,
        productUrl: "https://www.flipkart.com/apple-iphone-15-pro-256gb/p/itm6c4c4c4c4c4c4"
      }
    ],
    rating: 4.9,
    reviews: [
      {
        userName: "Tech Enthusiast",
        comment: "Amazing phone! Camera quality is outstanding.",
        rating: 5,
        createdAt: new Date()
      },
      {
        userName: "Rohit Sharma",
        comment: "Best iPhone yet. Titanium build feels premium.",
        rating: 5,
        createdAt: new Date()
      },
      {
        userName: "Priya Nair",
        comment: "Expensive but worth it. Performance is incredible.",
        rating: 4,
        createdAt: new Date()
      }
    ]
  },
  {
    name: "Dell XPS 13 Laptop",
    description: "Ultra-portable laptop with 13th Gen Intel Core processor and stunning display",
    category: "Electronics",
    images: [
      "https://example.com/dell-xps-13-1.jpg",
      "https://example.com/dell-xps-13-2.jpg"
    ],
    prices: [
      {
        storeName: "Dell Store",
        price: 89999,
        productUrl: "https://www.dell.com/en-in/shop/laptops/xps-13-laptop/spd/xps-13-9315-laptop"
      },
      {
        storeName: "Amazon",
        price: 87500,
        productUrl: "https://www.amazon.in/Dell-XPS-13-9315-Laptop/dp/B0B5B5B5B5"
      },
      {
        storeName: "Flipkart",
        price: 88000,
        productUrl: "https://www.flipkart.com/dell-xps-13-9315-laptop/p/itm8d8d8d8d8d8d8"
      }
    ],
    rating: 4.7,
    reviews: [
      {
        userName: "Software Developer",
        comment: "Perfect laptop for coding. Great build quality.",
        rating: 5,
        createdAt: new Date()
      },
      {
        userName: "Student User",
        comment: "Lightweight and powerful. Great for college.",
        rating: 4,
        createdAt: new Date()
      },
      {
        userName: "Business Pro",
        comment: "Excellent for business travel. Battery life is good.",
        rating: 5,
        createdAt: new Date()
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/price-comparison');
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
