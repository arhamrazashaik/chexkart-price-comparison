import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  HeartIcon, 
  UserIcon, 
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  TagIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import DarkModeToggle from './DarkModeToggle';

const categories = [
  { name: 'Electronics', icon: '🔌', color: 'text-blue-600' },
  { name: 'Fashion', icon: '👕', color: 'text-pink-600' },
  { name: 'Home & Garden', icon: '🏡', color: 'text-green-600' },
  { name: 'Sports & Fitness', icon: '⚽', color: 'text-orange-600' },
  { name: 'Books & Media', icon: '📚', color: 'text-purple-600' }
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const userMenuRef = useRef(null);
  const categoriesRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowCategoriesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Chexkart
              </span>
            </Link>
          </div>

          {/* Categories Dropdown - Desktop */}
          <div className="hidden lg:flex items-center" ref={categoriesRef}>
            <div className="relative">
              <button
                onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <span>Categories</span>
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showCategoriesDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 py-2 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={`/category/${encodeURIComponent(category.name)}`}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setShowCategoriesDropdown(false)}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands, categories..."
                className="w-full pl-12 pr-16 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 text-sm"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg transition-colors"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {showMobileMenu ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                to="/wishlist"
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                title="Wishlist"
              >
                <HeartIcon className="h-6 w-6" />
              </Link>
            )}

            {/* Orders */}
            {isAuthenticated && (
              <Link
                to="/orders"
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                title="Orders"
              >
                <ShoppingBagIcon className="h-6 w-6" />
              </Link>
            )}

            {/* Today's Deals */}
            <Link
              to="/deals"
              className="hidden md:flex items-center space-x-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md"
            >
              <TagIcon className="h-4 w-4" />
              <span>Deals</span>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden lg:block font-medium">{user?.name}</span>
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-50 border dark:border-gray-700">
                    <div className="px-4 py-3 border-b dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    
                    <Link
                      to="/orders"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <ShoppingBagIcon className="h-4 w-4" />
                      <span>My Orders</span>
                    </Link>
                    
                    <Link
                      to="/wishlist"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <HeartIcon className="h-4 w-4" />
                      <span>My Wishlist</span>
                    </Link>
                    
                    <div className="border-t dark:border-gray-700 mt-2 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="hidden md:block text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t dark:border-gray-700">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="md:hidden">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 px-2">Categories</h3>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/category/${encodeURIComponent(category.name)}`}
                    className="flex items-center space-x-3 px-2 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Links */}
              {!isAuthenticated && (
                <div className="pt-4 border-t dark:border-gray-700 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
