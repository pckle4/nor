
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="mb-8 flex justify-center">
      <div className="bg-white/60 backdrop-blur-sm rounded-lg px-6 py-3 border-0">
        <div className="flex space-x-6">
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">Home</Link>
          <Link to="/techstack" className="text-gray-600 hover:text-indigo-600 font-medium">Tech Stack</Link>
          <Link to="/faq" className="text-gray-600 hover:text-indigo-600 font-medium">FAQ</Link>
          <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
