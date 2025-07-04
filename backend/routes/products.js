const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// GET all products with advanced filters
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      search,
      category,
      subcategory,
      brand,
      minPrice,
      maxPrice,
      rating,
      inStock,
      featured,
      trending,
      sort = 'newest',
      page = 1,
      limit = 20
    } = req.query;

    // Build query
    const query = { status: 'active' };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Category filters
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (brand) query.brand = new RegExp(brand, 'i');

    // Price filters
    if (minPrice || maxPrice) {
      query['prices.price'] = {};
      if (minPrice) query['prices.price'].$gte = Number(minPrice);
      if (maxPrice) query['prices.price'].$lte = Number(maxPrice);
    }

    // Rating filter
    if (rating) query.rating = { $gte: Number(rating) };

    // Stock filter
    if (inStock === 'true') query['availability.inStock'] = true;

    // Featured/Trending filters
    if (featured === 'true') query.featured = true;
    if (trending === 'true') query.trending = true;

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'price-asc':
        sortOption = { 'prices.price': 1 };
        break;
      case 'price-desc':
        sortOption = { 'prices.price': -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'popular':
        sortOption = { 'analytics.views': -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      case 'newest':
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count
    const total = await Product.countDocuments(query);

    // Get filter aggregations for faceted search
    const filterAggregation = await Product.aggregate([
      { $match: { status: 'active' } },
      {
        $facet: {
          categories: [
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $project: { name: '$_id', count: 1, _id: 0 } }
          ],
          brands: [
            { $group: { _id: '$brand', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $project: { name: '$_id', count: 1, _id: 0 } }
          ],
          ratings: [
            { $group: { _id: { $floor: '$rating' }, count: { $sum: 1 } } },
            { $sort: { _id: -1 } },
            { $project: { rating: '$_id', count: 1, _id: 0 } }
          ]
        }
      }
    ]);

    const filters = filterAggregation[0] || { categories: [], brands: [], ratings: [] };

    res.json({
      products,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      filters
    });
  } catch (err) {
    console.error('Products fetch error:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET featured products
router.get('/featured', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const products = await Product.find({
      status: 'active',
      featured: true
    })
    .sort({ 'analytics.views': -1 })
    .limit(parseInt(limit))
    .lean();

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET trending products
router.get('/trending', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const products = await Product.find({
      status: 'active',
      trending: true
    })
    .sort({ 'analytics.views': -1 })
    .limit(parseInt(limit))
    .lean();

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET products on sale
router.get('/sale', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const products = await Product.find({
      status: 'active',
      'prices.discount': { $gt: 0 }
    })
    .sort({ 'prices.discount': -1 })
    .limit(parseInt(limit))
    .lean();

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET search suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const suggestions = await Product.aggregate([
      {
        $match: {
          status: 'active',
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { brand: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } }
          ]
        }
      },
      {
        $facet: {
          products: [
            { $project: { name: 1, type: { $literal: 'product' } } },
            { $limit: 5 }
          ],
          brands: [
            { $group: { _id: '$brand' } },
            { $project: { text: '$_id', type: { $literal: 'brand' } } },
            { $limit: 3 }
          ],
          categories: [
            { $group: { _id: '$category' } },
            { $project: { text: '$_id', type: { $literal: 'category' } } },
            { $limit: 3 }
          ]
        }
      }
    ]);

    const result = [
      ...suggestions[0].products.map(p => ({ type: 'product', text: p.name })),
      ...suggestions[0].brands,
      ...suggestions[0].categories
    ];

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET brands
router.get('/brands', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { status: 'active' };
    if (category) query.category = category;

    const brands = await Product.distinct('brand', query);
    res.json(brands.filter(Boolean).sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET price range
router.get('/price-range', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { status: 'active' };
    if (category) query.category = category;

    const priceRange = await Product.aggregate([
      { $match: query },
      { $unwind: '$prices' },
      {
        $group: {
          _id: null,
          min: { $min: '$prices.price' },
          max: { $max: '$prices.price' }
        }
      }
    ]);

    res.json(priceRange[0] || { min: 0, max: 100000 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Track view if user is authenticated
    if (req.user) {
      product.analytics.views += 1;
      await product.save();
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new product
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add review
router.post('/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    product.reviews.push(req.body);
    
    // Update average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating = totalRating / product.reviews.length;
    
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
