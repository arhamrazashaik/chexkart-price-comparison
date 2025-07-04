import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { productService } from '../services/productService';
import { wishlistService } from '../services/wishlistService';
import { useAuth } from '../contexts/AuthContext';
import { formatPriceIndian, getImageUrl, getImageAlt } from '../utils/currency';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await productService.getProduct(id);
        setProduct(productData);
        setError(null);

        // Check wishlist status if user is authenticated
        if (isAuthenticated) {
          try {
            const inWishlist = await wishlistService.checkWishlist(id);
            setIsInWishlist(inWishlist);
          } catch (wishlistError) {
            console.error('Error checking wishlist status:', wishlistError);
          }
        }
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, isAuthenticated]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to wishlist');
      return;
    }

    if (!id) return;

    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(id);
        setIsInWishlist(false);
      } else {
        await wishlistService.addToWishlist(id);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    } finally {
      setWishlistLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Product not found'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const lowestPrice = Math.min(...product.prices.map(p => p.price));
  const highestPrice = Math.max(...product.prices.map(p => p.price));
  const savings = highestPrice - lowestPrice;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 mb-4">
                <img
                  src={getImageUrl(product.images[selectedImage])}
                  alt={getImageAlt(product.images[selectedImage], product.name)}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-md ${
                        selectedImage === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={getImageAlt(image, product.name)}
                        className="h-full w-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex-1">{product.name}</h1>
                
                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  disabled={wishlistLoading}
                  className="ml-4 p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                  title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isInWishlist ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors" />
                  )}
                </button>
              </div>

              {/* Rating */}
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {formatPriceIndian(lowestPrice)}
                  </span>
                  {savings > 0 && (
                    <span className="text-lg text-green-600 dark:text-green-400">
                      Save {formatPriceIndian(savings)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Prices from {product.prices.length} store{product.prices.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Description</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{product.description}</p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Features</h3>
                  <ul className="mt-2 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Price Comparison */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Price Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.prices.map((price, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{price.storeName}</h4>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {formatPriceIndian(price.price)}
                      </p>
                      {price.originalPrice > price.price && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          {formatPriceIndian(price.originalPrice)}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {price.discount > 0 && (
                        <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full mb-2">
                          {price.discount}% OFF
                        </span>
                      )}
                      <p className={`text-sm ${price.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {price.inStock ? `In Stock (${price.stockCount})` : 'Out of Stock'}
                      </p>
                    </div>
                  </div>
                  <a
                    href={price.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block"
                  >
                    View on {price.storeName}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Customer Reviews</h3>
            
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{review.userName}</span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
