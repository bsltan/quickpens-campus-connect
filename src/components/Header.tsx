
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-quickpens-navy">QuickPens</span>
          <span className="text-quickpens-gold text-xl">✎</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium text-gray-600 hover:text-quickpens-navy transition-colors">
            Home
          </Link>
          <Link to="/how-it-works" className="font-medium text-gray-600 hover:text-quickpens-navy transition-colors">
            How It Works
          </Link>
          <Link to="/browse" className="font-medium text-gray-600 hover:text-quickpens-navy transition-colors">
            Browse Writers
          </Link>
          <Link to="/about" className="font-medium text-gray-600 hover:text-quickpens-navy transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:block">Log In</Button>
          <Button className="bg-quickpens-navy text-white hover:bg-quickpens-navy/90">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
