import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const isWebsitePage = [
    '/',
    '/about',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/team',
    '/terms-conditions',
    '/ceynov-x'
  ].includes(location.pathname);
  
  const isWebAppPage = [
    '/onboarding',
    '/login',
    '/dashboard',
    '/profile',
    '/leaderboard',
    '/ceynovx',
    '/learn',
    '/subjects',
    '/quiz',
    '/settings',
    '/textbooks'
  ].includes(location.pathname);

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/logo.png" alt="CeyQuest" />
              <span className="ml-2 text-xl font-bold text-gray-900">CeyQuest</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {/* Website Navigation */}
            {isWebsitePage && (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </Link>
                <Link to="/team" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Team
                </Link>
                <Link to="/ceynov-x" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  CeynovX
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </Link>
                <Link to="/faq" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  FAQ
                </Link>
              </>
            )}
            
            {/* Web-app Navigation */}
            {isWebAppPage && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/learn" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Learn
                </Link>
                <Link to="/quiz" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Quiz
                </Link>
                <Link to="/leaderboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Leaderboard
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Profile
                </Link>
              </>
            )}
            
            {/* Switch between Website and Web-app */}
            <div className="flex items-center space-x-2">
              {isWebsitePage && (
                <Link 
                  to="/login" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Go to App
                </Link>
              )}
              {isWebAppPage && (
                <Link 
                  to="/" 
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Back to Website
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
