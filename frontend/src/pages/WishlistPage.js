import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { wishlistService } from '../services/wishlistService';
import { productService } from '../services/productService';
import { formatPriceIndian } from '../utils/currency';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await wishlistService.getWishlist();
        // Handle different response formats
        let items = Array.isArray(response) ? response : (response.items || response.data || []);

        // If items don't have full product data, fetch it
        if (items.length > 0 && items[0] && !items[0].product) {
          const enrichedItems = await Promise.all(
            items.map(async (item) => {
              try {
                const product = await productService.getProduct(item.productId);
                return {
                  ...item,
                  product: product
                };
              } catch (error) {
                console.error('Error fetching product:', error);
                return null;
              }
            })
          );
          items = enrichedItems.filter(item => item !== null);
        }

        setWishlistItems(items);
        setError('');
      } catch (err) {
        setError('Failed to load wishlist');
        console.error('Error fetching wishlist:', err);
        // Set empty array on error to prevent map error
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isAuthenticated]);

  const handleRemoveItem = async (productId) => {
    try {
      await wishlistService.removeFromWishlist(productId);
      setWishlistItems(items => {
        if (Array.isArray(items)) {
          return items.filter(item => item.product._id !== productId);
        }
        return [];
      });
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      alert('Failed to remove item from wishlist');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Please sign in</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You need to be signed in to view your wishlist.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Wishlist
          </h1>
          {!loading && Array.isArray(wishlistItems) && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : !Array.isArray(wishlistItems) || wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Start adding products you love to your wishlist.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(wishlistItems) && wishlistItems.map((item) => (
              <div key={item._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <Link to={`/product/${item.product._id}`}>
                  <img
                    src={item.product.images[0]?.url || 'https://via.placeholder.com/300'}
                    alt={item.product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${item.product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                    {item.product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {formatPriceIndian(Math.min(...item.product.prices.map(p => p.price)))}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                      title="Remove from wishlist"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
