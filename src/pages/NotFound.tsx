import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] to-[#1a1a2e] flex items-center justify-center">
      <div className="text-center">
        {/* 404 Number */}
        <div className="text-9xl font-bold text-purple-400 mb-4">404</div>
        
        {/* Error Message */}
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-xl text-white/70 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
        
        {/* Additional Help */}
        <div className="mt-12 text-white/50">
          <p className="mb-2">Need help? Try these pages:</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/learn" className="text-purple-400 hover:text-purple-300">Learn</Link>
            <Link to="/ceynovx" className="text-purple-400 hover:text-purple-300">CeynovX</Link>
            <Link to="/leaderboard" className="text-purple-400 hover:text-purple-300">Leaderboard</Link>
            <Link to="/textbooks" className="text-purple-400 hover:text-purple-300">Textbooks</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
