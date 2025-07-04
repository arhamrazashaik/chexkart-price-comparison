import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Go Home
          </Link>
          
          <div className="text-center">
            <span className="text-gray-500 dark:text-gray-400">or</span>
          </div>

          <Link
            to="/search"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
            Search Products
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you think this is an error, please{' '}
            <a href="mailto:support@chexkart.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
