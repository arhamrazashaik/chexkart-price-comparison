const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sports & Fitness products
const sportsProducts = [
  {
    name: "Nike Air Zoom Pegasus 40",
    description: "Responsive running shoes with Nike Air Zoom technology for a smooth, comfortable ride.",
    category: "Sports & Fitness",
    brand: "Nike",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        alt: "Nike Air Zoom Pegasus 40",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Nike Store",
        price: 10995,
        originalPrice: 12995,
        discount: 15,
        productUrl: "https://www.nike.com/in/t/air-zoom-pegasus-40",
        inStock: true,
        stockCount: 45,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 10499,
        originalPrice: 12995,
        discount: 19,
        productUrl: "https://www.amazon.in/Nike-Air-Zoom-Pegasus-40/dp/B0C123456",
        inStock: true,
        stockCount: 32,
        lastUpdated: new Date()
      },
      {
        storeName: "Flipkart",
        price: 10799,
        originalPrice: 12995,
        discount: 17,
        productUrl: "https://www.flipkart.com/nike-air-zoom-pegasus-40/p/itm123456789",
        inStock: true,
        stockCount: 28,
        lastUpdated: new Date()
      }
    ],
    rating: 4.6,
    reviews: [
      {
        userName: "Marathon Runner",
        userEmail: "marathon@example.com",
        comment: "Perfect for long distance running! Great cushioning and support.",
        rating: 5,
        verified: true,
        helpful: 89,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Daily Jogger",
        userEmail: "jogger@example.com",
        comment: "Comfortable for daily runs. Good value for money.",
        rating: 4,
        verified: true,
        helpful: 56,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Fitness Enthusiast",
        userEmail: "fitness3@example.com",
        comment: "Great shoes for gym workouts and running. Highly recommend!",
        rating: 5,
        verified: true,
        helpful: 43,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["running", "nike", "shoes", "fitness", "sports"],
    features: ["Nike Air Zoom", "Responsive cushioning", "Breathable mesh", "Durable outsole", "Lightweight"],
    status: "active",
    featured: false,
    trending: true,
    createdAt: new Date()
  },

  {
    name: "Yonex Arcsaber 11 Badminton Racket",
    description: "Professional badminton racket with advanced technology for power and control.",
    category: "Sports & Fitness",
    brand: "Yonex",
    images: [
      {
        url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
        alt: "Yonex Arcsaber 11",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Yonex Store",
        price: 18999,
        originalPrice: 21999,
        discount: 14,
        productUrl: "https://www.yonex.com/in/arcsaber-11",
        inStock: true,
        stockCount: 15,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 17999,
        originalPrice: 21999,
        discount: 18,
        productUrl: "https://www.amazon.in/Yonex-Arcsaber-11-Badminton/dp/B0D123456",
        inStock: true,
        stockCount: 12,
        lastUpdated: new Date()
      },
      {
        storeName: "Decathlon",
        price: 18499,
        originalPrice: 21999,
        discount: 16,
        productUrl: "https://www.decathlon.in/yonex-arcsaber-11",
        inStock: true,
        stockCount: 8,
        lastUpdated: new Date()
      }
    ],
    rating: 4.8,
    reviews: [
      {
        userName: "Badminton Pro",
        userEmail: "badminton@example.com",
        comment: "Excellent racket for advanced players. Great control and power balance.",
        rating: 5,
        verified: true,
        helpful: 67,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Club Player",
        userEmail: "club@example.com",
        comment: "Perfect for competitive play. Worth the investment!",
        rating: 5,
        verified: true,
        helpful: 45,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Weekend Player",
        userEmail: "weekend@example.com",
        comment: "Great quality racket. Improved my game significantly.",
        rating: 4,
        verified: true,
        helpful: 32,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["badminton", "racket", "yonex", "sports", "professional"],
    features: ["Advanced technology", "Power & control", "Professional grade", "Lightweight", "Durable"],
    status: "active",
    featured: true,
    trending: false,
    createdAt: new Date()
  },

  {
    name: "Cosco Football Size 5",
    description: "Official size football perfect for matches and training sessions.",
    category: "Sports & Fitness",
    brand: "Cosco",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=800",
        alt: "Cosco Football",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Cosco Store",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        productUrl: "https://www.cosco.in/football-size-5",
        inStock: true,
        stockCount: 156,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 799,
        originalPrice: 1299,
        discount: 38,
        productUrl: "https://www.amazon.in/Cosco-Football-Size-5/dp/B0E123456",
        inStock: true,
        stockCount: 234,
        lastUpdated: new Date()
      },
      {
        storeName: "Flipkart",
        price: 849,
        originalPrice: 1299,
        discount: 35,
        productUrl: "https://www.flipkart.com/cosco-football-size-5/p/itm123456789",
        inStock: true,
        stockCount: 189,
        lastUpdated: new Date()
      }
    ],
    rating: 4.3,
    reviews: [
      {
        userName: "Football Coach",
        userEmail: "coach@example.com",
        comment: "Good quality football for training. Durable and well-made.",
        rating: 4,
        verified: true,
        helpful: 78,
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "School Player",
        userEmail: "school@example.com",
        comment: "Perfect for school matches. Great value for money.",
        rating: 4,
        verified: true,
        helpful: 56,
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Weekend Player",
        userEmail: "weekend2@example.com",
        comment: "Good football for casual games. Holds air well.",
        rating: 4,
        verified: false,
        helpful: 34,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["football", "soccer", "cosco", "sports", "training"],
    features: ["Official size 5", "Durable material", "Good grip", "Training quality", "Affordable"],
    status: "active",
    featured: false,
    trending: false,
    createdAt: new Date()
  },

  {
    name: "Nivia Carbonite 1.0 Basketball",
    description: "High-quality basketball with superior grip and bounce for indoor and outdoor play.",
    category: "Sports & Fitness",
    brand: "Nivia",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
        alt: "Nivia Basketball",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Nivia Store",
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        productUrl: "https://www.nivia.com/carbonite-basketball",
        inStock: true,
        stockCount: 67,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 1399,
        originalPrice: 1999,
        discount: 30,
        productUrl: "https://www.amazon.in/Nivia-Carbonite-Basketball/dp/B0F123456",
        inStock: true,
        stockCount: 89,
        lastUpdated: new Date()
      },
      {
        storeName: "Decathlon",
        price: 1449,
        originalPrice: 1999,
        discount: 28,
        productUrl: "https://www.decathlon.in/nivia-carbonite-basketball",
        inStock: true,
        stockCount: 45,
        lastUpdated: new Date()
      }
    ],
    rating: 4.4,
    reviews: [
      {
        userName: "Basketball Player",
        userEmail: "basketball@example.com",
        comment: "Great basketball with excellent grip. Perfect for outdoor courts.",
        rating: 5,
        verified: true,
        helpful: 67,
        createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "School Coach",
        userEmail: "schoolcoach@example.com",
        comment: "Good quality ball for training sessions. Students love it!",
        rating: 4,
        verified: true,
        helpful: 45,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Casual Player",
        userEmail: "casual2@example.com",
        comment: "Nice basketball for weekend games. Good bounce and feel.",
        rating: 4,
        verified: true,
        helpful: 28,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["basketball", "nivia", "sports", "outdoor", "indoor"],
    features: ["Superior grip", "Excellent bounce", "Indoor/outdoor", "Durable rubber", "Official size"],
    status: "active",
    featured: false,
    trending: true,
    createdAt: new Date()
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/price-comparison');
    console.log('Connected to MongoDB');

    // Add sports products
    await Product.insertMany(sportsProducts);
    console.log(`Added ${sportsProducts.length} sports products successfully`);

    // Get total product count
    const totalProducts = await Product.countDocuments();
    console.log(`Total products in database: ${totalProducts}`);

    console.log('Sports products added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding sports products:', error);
    process.exit(1);
  }
};

seedDatabase();
