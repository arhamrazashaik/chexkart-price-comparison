const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Enhanced products with more variety and reviews
const enhancedProducts = [
  // Electronics - Smartphones
  {
    name: "iPhone 15 Pro Max",
    description: "The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system.",
    category: "Electronics",
    brand: "Apple",
    images: [
      {
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800",
        alt: "iPhone 15 Pro Max",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Apple Store",
        price: 159900,
        originalPrice: 159900,
        discount: 0,
        productUrl: "https://www.apple.com/in/iphone-15-pro/",
        inStock: true,
        stockCount: 25,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 154999,
        originalPrice: 159900,
        discount: 3,
        productUrl: "https://www.amazon.in/Apple-iPhone-15-Pro-Max/dp/B0CHX1W1XY",
        inStock: true,
        stockCount: 12,
        lastUpdated: new Date()
      },
      {
        storeName: "Flipkart",
        price: 156999,
        originalPrice: 159900,
        discount: 2,
        productUrl: "https://www.flipkart.com/apple-iphone-15-pro-max/p/itm123456789",
        inStock: true,
        stockCount: 8,
        lastUpdated: new Date()
      }
    ],
    rating: 4.9,
    reviews: [
      {
        userName: "Tech Enthusiast",
        userEmail: "tech@example.com",
        comment: "Absolutely stunning phone! The titanium build feels premium and the camera quality is unmatched.",
        rating: 5,
        verified: true,
        helpful: 45,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Photography Pro",
        userEmail: "photo@example.com",
        comment: "Best camera system I've used on a smartphone. The Action Button is a game changer!",
        rating: 5,
        verified: true,
        helpful: 32,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Business User",
        userEmail: "business@example.com",
        comment: "Perfect for professional use. Battery lasts all day even with heavy usage.",
        rating: 5,
        verified: true,
        helpful: 28,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Casual User",
        userEmail: "casual@example.com",
        comment: "Expensive but worth every rupee. The build quality is exceptional.",
        rating: 4,
        verified: false,
        helpful: 15,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["smartphone", "apple", "premium", "5g", "pro"],
    features: ["A17 Pro chip", "Titanium design", "Action Button", "USB-C", "48MP camera"],
    status: "active",
    featured: true,
    trending: true,
    createdAt: new Date()
  },

  // Electronics - Laptops
  {
    name: "Dell XPS 13 Plus",
    description: "Ultra-thin laptop with 13th Gen Intel processors, stunning OLED display, and premium build quality.",
    category: "Electronics",
    brand: "Dell",
    images: [
      {
        url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
        alt: "Dell XPS 13 Plus",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Dell Store",
        price: 149999,
        originalPrice: 169999,
        discount: 12,
        productUrl: "https://www.dell.com/en-in/shop/laptops/xps-13-plus/spd/xps-13-9320-laptop",
        inStock: true,
        stockCount: 15,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 145999,
        originalPrice: 169999,
        discount: 14,
        productUrl: "https://www.amazon.in/Dell-XPS-13-Plus/dp/B0B123456",
        inStock: true,
        stockCount: 7,
        lastUpdated: new Date()
      }
    ],
    rating: 4.7,
    reviews: [
      {
        userName: "Developer",
        userEmail: "dev@example.com",
        comment: "Perfect for coding! The keyboard is amazing and performance is top-notch.",
        rating: 5,
        verified: true,
        helpful: 38,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Student",
        userEmail: "student@example.com",
        comment: "Great for college work. Lightweight and battery life is excellent.",
        rating: 5,
        verified: true,
        helpful: 22,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Designer",
        userEmail: "design@example.com",
        comment: "OLED display is gorgeous for design work. Highly recommended!",
        rating: 4,
        verified: true,
        helpful: 19,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["laptop", "dell", "ultrabook", "oled", "premium"],
    features: ["13th Gen Intel", "OLED Display", "Thunderbolt 4", "Wi-Fi 6E", "Premium build"],
    status: "active",
    featured: true,
    trending: false,
    createdAt: new Date()
  },

  // Fashion - Shoes
  {
    name: "Adidas Ultraboost 23",
    description: "Revolutionary running shoes with BOOST midsole technology for ultimate energy return and comfort.",
    category: "Fashion",
    brand: "Adidas",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
        alt: "Adidas Ultraboost 23",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Adidas",
        price: 18999,
        originalPrice: 21999,
        discount: 14,
        productUrl: "https://www.adidas.co.in/ultraboost-23-shoes",
        inStock: true,
        stockCount: 45,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 17999,
        originalPrice: 21999,
        discount: 18,
        productUrl: "https://www.amazon.in/Adidas-Ultraboost-23/dp/B0C123456",
        inStock: true,
        stockCount: 32,
        lastUpdated: new Date()
      },
      {
        storeName: "Myntra",
        price: 18499,
        originalPrice: 21999,
        discount: 16,
        productUrl: "https://www.myntra.com/sports-shoes/adidas/ultraboost-23",
        inStock: true,
        stockCount: 28,
        lastUpdated: new Date()
      }
    ],
    rating: 4.8,
    reviews: [
      {
        userName: "Marathon Runner",
        userEmail: "runner@example.com",
        comment: "Best running shoes I've ever owned! The BOOST technology is incredible.",
        rating: 5,
        verified: true,
        helpful: 67,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Fitness Enthusiast",
        userEmail: "fitness@example.com",
        comment: "Super comfortable for daily workouts. Great cushioning and support.",
        rating: 5,
        verified: true,
        helpful: 43,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Casual Walker",
        userEmail: "walker@example.com",
        comment: "Perfect for daily walks. Stylish and extremely comfortable.",
        rating: 4,
        verified: true,
        helpful: 29,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Style Conscious",
        userEmail: "style@example.com",
        comment: "Love the design! Goes well with both athletic and casual wear.",
        rating: 5,
        verified: false,
        helpful: 18,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["shoes", "running", "adidas", "boost", "athletic"],
    features: ["BOOST midsole", "Primeknit upper", "Continental rubber", "Energy return", "Lightweight"],
    status: "active",
    featured: false,
    trending: true,
    createdAt: new Date()
  },

  // Home & Garden - Kitchen
  {
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "Multi-functional electric pressure cooker that replaces 7 kitchen appliances in one.",
    category: "Home & Garden",
    brand: "Instant Pot",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
        alt: "Instant Pot Duo",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Amazon",
        price: 8999,
        originalPrice: 12999,
        discount: 31,
        productUrl: "https://www.amazon.in/Instant-Pot-Duo-Electric-Pressure/dp/B00FLYWNYQ",
        inStock: true,
        stockCount: 156,
        lastUpdated: new Date()
      },
      {
        storeName: "Flipkart",
        price: 9499,
        originalPrice: 12999,
        discount: 27,
        productUrl: "https://www.flipkart.com/instant-pot-duo-7-in-1/p/itm123456789",
        inStock: true,
        stockCount: 89,
        lastUpdated: new Date()
      }
    ],
    rating: 4.6,
    reviews: [
      {
        userName: "Home Chef",
        userEmail: "chef@example.com",
        comment: "Game changer for my kitchen! Cooks everything perfectly and saves so much time.",
        rating: 5,
        verified: true,
        helpful: 89,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Busy Mom",
        userEmail: "mom@example.com",
        comment: "Perfect for busy families. Makes meal prep so much easier!",
        rating: 5,
        verified: true,
        helpful: 76,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "College Student",
        userEmail: "college@example.com",
        comment: "Great for dorm cooking. Easy to use and clean.",
        rating: 4,
        verified: true,
        helpful: 34,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["kitchen", "pressure-cooker", "instant-pot", "multi-cooker", "appliance"],
    features: ["7-in-1 functionality", "Smart programs", "Stainless steel", "Safety features", "Easy cleanup"],
    status: "active",
    featured: true,
    trending: false,
    createdAt: new Date()
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/price-comparison');
    console.log('Connected to MongoDB');

    // Add new products without clearing existing ones
    await Product.insertMany(enhancedProducts);
    console.log(`Added ${enhancedProducts.length} new products successfully`);

    console.log('Database enhanced successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error enhancing database:', error);
    process.exit(1);
  }
};

seedDatabase();
