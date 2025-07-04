const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Final batch of products for comprehensive catalog
const finalProducts = [
  // Electronics - Smart TV
  {
    name: "LG OLED C3 55-inch 4K Smart TV",
    description: "Premium OLED TV with perfect blacks, infinite contrast, and webOS smart platform.",
    category: "Electronics",
    brand: "LG",
    images: [
      {
        url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800",
        alt: "LG OLED C3 TV",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "LG Store",
        price: 139990,
        originalPrice: 159990,
        discount: 13,
        productUrl: "https://www.lg.com/in/tvs/lg-oled55c3psa",
        inStock: true,
        stockCount: 8,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 134999,
        originalPrice: 159990,
        discount: 16,
        productUrl: "https://www.amazon.in/LG-OLED-C3-55-inch/dp/B0C123456",
        inStock: true,
        stockCount: 5,
        lastUpdated: new Date()
      },
      {
        storeName: "Flipkart",
        price: 137999,
        originalPrice: 159990,
        discount: 14,
        productUrl: "https://www.flipkart.com/lg-oled-c3-55-inch/p/itm123456789",
        inStock: true,
        stockCount: 3,
        lastUpdated: new Date()
      }
    ],
    rating: 4.8,
    reviews: [
      {
        userName: "Movie Enthusiast",
        userEmail: "movie@example.com",
        comment: "Absolutely stunning picture quality! Perfect blacks and vibrant colors.",
        rating: 5,
        verified: true,
        helpful: 89,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Tech Reviewer",
        userEmail: "techrev@example.com",
        comment: "Best TV I've ever owned. The OLED technology is incredible!",
        rating: 5,
        verified: true,
        helpful: 76,
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Gaming Fan",
        userEmail: "gaming@example.com",
        comment: "Perfect for gaming with low input lag and amazing HDR.",
        rating: 5,
        verified: true,
        helpful: 54,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["tv", "oled", "4k", "smart-tv", "premium"],
    features: ["OLED display", "4K resolution", "webOS", "HDR10", "Dolby Vision"],
    status: "active",
    featured: true,
    trending: false,
    createdAt: new Date()
  },

  // Fashion - Watch
  {
    name: "Apple Watch Series 9 GPS",
    description: "Advanced health and fitness tracking with the powerful S9 chip and bright Always-On Retina display.",
    category: "Fashion",
    brand: "Apple",
    images: [
      {
        url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800",
        alt: "Apple Watch Series 9",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Apple Store",
        price: 41900,
        originalPrice: 41900,
        discount: 0,
        productUrl: "https://www.apple.com/in/apple-watch-series-9/",
        inStock: true,
        stockCount: 25,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 39999,
        originalPrice: 41900,
        discount: 5,
        productUrl: "https://www.amazon.in/Apple-Watch-Series-9-GPS/dp/B0CHX123456",
        inStock: true,
        stockCount: 18,
        lastUpdated: new Date()
      },
      {
        storeName: "Croma",
        price: 40499,
        originalPrice: 41900,
        discount: 3,
        productUrl: "https://www.croma.com/apple-watch-series-9",
        inStock: true,
        stockCount: 12,
        lastUpdated: new Date()
      }
    ],
    rating: 4.7,
    reviews: [
      {
        userName: "Fitness Tracker",
        userEmail: "fitness2@example.com",
        comment: "Amazing health tracking features! The heart rate monitoring is very accurate.",
        rating: 5,
        verified: true,
        helpful: 67,
        createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Tech User",
        userEmail: "techuser@example.com",
        comment: "Great integration with iPhone. Battery life is impressive.",
        rating: 4,
        verified: true,
        helpful: 45,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Style Conscious",
        userEmail: "style2@example.com",
        comment: "Looks great and works perfectly. Love the always-on display.",
        rating: 5,
        verified: true,
        helpful: 38,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["smartwatch", "apple", "fitness", "health", "wearable"],
    features: ["S9 chip", "Always-On display", "Health tracking", "Water resistant", "ECG app"],
    status: "active",
    featured: false,
    trending: true,
    createdAt: new Date()
  },

  // Home & Garden - Furniture
  {
    name: "IKEA POÄNG Armchair",
    description: "Comfortable armchair with layer-glued bent birch frame and washable cushion cover.",
    category: "Home & Garden",
    brand: "IKEA",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        alt: "IKEA POÄNG Armchair",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "IKEA",
        price: 12990,
        originalPrice: 14990,
        discount: 13,
        productUrl: "https://www.ikea.com/in/en/p/poang-armchair-birch-veneer-knisa-light-beige-s49208394/",
        inStock: true,
        stockCount: 45,
        lastUpdated: new Date()
      },
      {
        storeName: "Urban Ladder",
        price: 13999,
        originalPrice: 15999,
        discount: 13,
        productUrl: "https://www.urbanladder.com/ikea-poang-armchair",
        inStock: true,
        stockCount: 23,
        lastUpdated: new Date()
      }
    ],
    rating: 4.5,
    reviews: [
      {
        userName: "Home Decorator",
        userEmail: "decorator@example.com",
        comment: "Classic design that fits any room. Very comfortable for reading.",
        rating: 5,
        verified: true,
        helpful: 56,
        createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Apartment Dweller",
        userEmail: "apartment@example.com",
        comment: "Perfect size for small spaces. Good value for money.",
        rating: 4,
        verified: true,
        helpful: 34,
        createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Comfort Seeker",
        userEmail: "comfort@example.com",
        comment: "Very comfortable chair. The cushion is soft and supportive.",
        rating: 4,
        verified: false,
        helpful: 29,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["furniture", "chair", "ikea", "comfort", "home"],
    features: ["Bent birch frame", "Washable cover", "Ergonomic design", "Durable construction", "Classic style"],
    status: "active",
    featured: false,
    trending: false,
    createdAt: new Date()
  },

  // Electronics - Headphones
  {
    name: "Bose QuietComfort 45 Headphones",
    description: "World-class noise cancelling headphones with exceptional audio quality and all-day comfort.",
    category: "Electronics",
    brand: "Bose",
    images: [
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
        alt: "Bose QuietComfort 45",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Bose Store",
        price: 32900,
        originalPrice: 32900,
        discount: 0,
        productUrl: "https://www.bose.in/en_in/products/headphones/over_ear_headphones/quietcomfort-45.html",
        inStock: true,
        stockCount: 18,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 29999,
        originalPrice: 32900,
        discount: 9,
        productUrl: "https://www.amazon.in/Bose-QuietComfort-45-Headphones/dp/B098FKXT8L",
        inStock: true,
        stockCount: 24,
        lastUpdated: new Date()
      },
      {
        storeName: "Flipkart",
        price: 30999,
        originalPrice: 32900,
        discount: 6,
        productUrl: "https://www.flipkart.com/bose-quietcomfort-45/p/itm123456789",
        inStock: true,
        stockCount: 16,
        lastUpdated: new Date()
      }
    ],
    rating: 4.6,
    reviews: [
      {
        userName: "Audio Professional",
        userEmail: "audio@example.com",
        comment: "Exceptional noise cancellation and audio quality. Perfect for travel.",
        rating: 5,
        verified: true,
        helpful: 78,
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Frequent Traveler",
        userEmail: "traveler@example.com",
        comment: "Best headphones for flights. Noise cancellation is incredible!",
        rating: 5,
        verified: true,
        helpful: 65,
        createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Music Lover",
        userEmail: "music@example.com",
        comment: "Amazing sound quality and very comfortable for long listening sessions.",
        rating: 4,
        verified: true,
        helpful: 42,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["headphones", "bose", "noise-canceling", "wireless", "premium"],
    features: ["World-class noise cancelling", "22-hour battery", "Comfortable design", "Clear calls", "Quick charge"],
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

    // Add final batch of products
    await Product.insertMany(finalProducts);
    console.log(`Added ${finalProducts.length} final products successfully`);

    // Get total product count
    const totalProducts = await Product.countDocuments();
    console.log(`Total products in database: ${totalProducts}`);

    console.log('Database fully populated with comprehensive product catalog!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding final products:', error);
    process.exit(1);
  }
};

seedDatabase();
