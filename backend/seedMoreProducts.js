const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// More products across different categories
const moreProducts = [
  // Electronics - Gaming
  {
    name: "PlayStation 5 Console",
    description: "Next-generation gaming console with ultra-high speed SSD, haptic feedback, and 3D audio.",
    category: "Electronics",
    brand: "Sony",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
        alt: "PlayStation 5",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Sony Center",
        price: 54990,
        originalPrice: 54990,
        discount: 0,
        productUrl: "https://www.sony.co.in/electronics/playstation-5",
        inStock: true,
        stockCount: 5,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 54990,
        originalPrice: 54990,
        discount: 0,
        productUrl: "https://www.amazon.in/Sony-PlayStation-5-Console/dp/B08FC5L3RG",
        inStock: false,
        stockCount: 0,
        lastUpdated: new Date()
      }
    ],
    rating: 4.9,
    reviews: [
      {
        userName: "Gamer Pro",
        userEmail: "gamer@example.com",
        comment: "Incredible gaming experience! The graphics and loading speeds are mind-blowing.",
        rating: 5,
        verified: true,
        helpful: 156,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Tech Reviewer",
        userEmail: "reviewer@example.com",
        comment: "Best console of this generation. The DualSense controller is revolutionary!",
        rating: 5,
        verified: true,
        helpful: 134,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Casual Player",
        userEmail: "casual@example.com",
        comment: "Amazing console but hard to find in stock. Worth the wait!",
        rating: 5,
        verified: true,
        helpful: 89,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["gaming", "console", "playstation", "sony", "next-gen"],
    features: ["Ultra-high speed SSD", "Haptic feedback", "3D Audio", "Ray tracing", "4K gaming"],
    status: "active",
    featured: true,
    trending: true,
    createdAt: new Date()
  },

  // Fashion - Clothing
  {
    name: "Levi's 511 Slim Jeans",
    description: "Classic slim-fit jeans with modern styling and comfortable stretch denim.",
    category: "Fashion",
    brand: "Levi's",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
        alt: "Levi's 511 Jeans",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Levi's Store",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        productUrl: "https://www.levi.in/511-slim-jeans",
        inStock: true,
        stockCount: 78,
        lastUpdated: new Date()
      },
      {
        storeName: "Myntra",
        price: 4799,
        originalPrice: 6999,
        discount: 31,
        productUrl: "https://www.myntra.com/jeans/levis/511-slim-jeans",
        inStock: true,
        stockCount: 45,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 4899,
        originalPrice: 6999,
        discount: 30,
        productUrl: "https://www.amazon.in/Levis-511-Slim-Jeans/dp/B07123456",
        inStock: true,
        stockCount: 67,
        lastUpdated: new Date()
      }
    ],
    rating: 4.5,
    reviews: [
      {
        userName: "Fashion Lover",
        userEmail: "fashion@example.com",
        comment: "Perfect fit and great quality! These jeans are my go-to for any occasion.",
        rating: 5,
        verified: true,
        helpful: 45,
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Office Worker",
        userEmail: "office@example.com",
        comment: "Comfortable for all-day wear. Great for both casual and semi-formal occasions.",
        rating: 4,
        verified: true,
        helpful: 32,
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "College Student",
        userEmail: "student2@example.com",
        comment: "Good value for money. The stretch fabric is very comfortable.",
        rating: 4,
        verified: false,
        helpful: 28,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["jeans", "levis", "denim", "slim-fit", "casual"],
    features: ["Slim fit", "Stretch denim", "Classic styling", "Durable construction", "Versatile"],
    status: "active",
    featured: false,
    trending: false,
    createdAt: new Date()
  },

  // Books & Media
  {
    name: "Atomic Habits by James Clear",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones - International Bestseller",
    category: "Books & Media",
    brand: "Random House",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
        alt: "Atomic Habits Book",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Amazon",
        price: 399,
        originalPrice: 699,
        discount: 43,
        productUrl: "https://www.amazon.in/Atomic-Habits-James-Clear/dp/1847941834",
        inStock: true,
        stockCount: 234,
        lastUpdated: new Date()
      },
      {
        storeName: "Flipkart",
        price: 419,
        originalPrice: 699,
        discount: 40,
        productUrl: "https://www.flipkart.com/atomic-habits/p/itm123456789",
        inStock: true,
        stockCount: 189,
        lastUpdated: new Date()
      },
      {
        storeName: "Crossword",
        price: 559,
        originalPrice: 699,
        discount: 20,
        productUrl: "https://www.crossword.in/atomic-habits",
        inStock: true,
        stockCount: 45,
        lastUpdated: new Date()
      }
    ],
    rating: 4.8,
    reviews: [
      {
        userName: "Self-Help Reader",
        userEmail: "reader@example.com",
        comment: "Life-changing book! The strategies are practical and easy to implement.",
        rating: 5,
        verified: true,
        helpful: 234,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Productivity Enthusiast",
        userEmail: "productivity@example.com",
        comment: "Best book on habits I've ever read. Clear and actionable advice.",
        rating: 5,
        verified: true,
        helpful: 198,
        createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Student",
        userEmail: "student3@example.com",
        comment: "Helped me build better study habits. Highly recommend!",
        rating: 5,
        verified: true,
        helpful: 156,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Professional",
        userEmail: "professional@example.com",
        comment: "Great insights into habit formation. Applied many concepts at work.",
        rating: 4,
        verified: true,
        helpful: 89,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["book", "self-help", "habits", "productivity", "bestseller"],
    features: ["Practical strategies", "Scientific approach", "Easy to read", "Actionable advice", "International bestseller"],
    status: "active",
    featured: true,
    trending: false,
    createdAt: new Date()
  },

  // Sports & Fitness
  {
    name: "Decathlon Domyos Adjustable Dumbbells Set",
    description: "Space-saving adjustable dumbbells perfect for home workouts. Weight range: 2.5kg to 24kg per dumbbell.",
    category: "Sports & Fitness",
    brand: "Decathlon",
    images: [
      {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        alt: "Adjustable Dumbbells",
        isPrimary: true
      }
    ],
    prices: [
      {
        storeName: "Decathlon",
        price: 12999,
        originalPrice: 15999,
        discount: 19,
        productUrl: "https://www.decathlon.in/p/8357847/adjustable-dumbbells",
        inStock: true,
        stockCount: 23,
        lastUpdated: new Date()
      },
      {
        storeName: "Amazon",
        price: 13499,
        originalPrice: 15999,
        discount: 16,
        productUrl: "https://www.amazon.in/Decathlon-Adjustable-Dumbbells/dp/B08123456",
        inStock: true,
        stockCount: 15,
        lastUpdated: new Date()
      }
    ],
    rating: 4.4,
    reviews: [
      {
        userName: "Home Gym Owner",
        userEmail: "homegym@example.com",
        comment: "Excellent space-saving solution! Quality is great and easy to adjust weights.",
        rating: 5,
        verified: true,
        helpful: 67,
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Fitness Beginner",
        userEmail: "beginner@example.com",
        comment: "Perfect for starting my fitness journey. Good range of weights.",
        rating: 4,
        verified: true,
        helpful: 43,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      },
      {
        userName: "Personal Trainer",
        userEmail: "trainer@example.com",
        comment: "Recommend these to my clients. Good build quality and versatile.",
        rating: 4,
        verified: true,
        helpful: 38,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      }
    ],
    tags: ["fitness", "dumbbells", "home-gym", "adjustable", "strength-training"],
    features: ["Adjustable weight", "Space-saving design", "Durable construction", "Easy weight change", "Home workout"],
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

    // Add more products
    await Product.insertMany(moreProducts);
    console.log(`Added ${moreProducts.length} more products successfully`);

    console.log('Database enhanced with more products!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding more products:', error);
    process.exit(1);
  }
};

seedDatabase();
