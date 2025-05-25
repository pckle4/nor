
import React from 'react';

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentDateTime = currentDate.toLocaleString();

  return (
    <footer className="mt-20 bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">Advanced QR Code Generator</h3>
            <p className="text-gray-300 text-sm max-w-2xl mx-auto">
              Professional QR code generation with advanced customization options. 
              Create high-quality QR codes for WiFi, contact cards, payments, and more.
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-6 space-y-2">
            <p className="text-gray-300 text-lg">
              Crafted with excellence by <span className="font-semibold text-indigo-400">Ansh</span>
            </p>
            <p className="text-gray-400 text-sm">
              A <a href="https://nowhile.com" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">nowhile.com</a> venture
            </p>
            <p className="text-gray-400 text-sm">
              © {currentYear} NoWhile Technologies - All rights reserved
            </p>
            <p className="text-gray-500 text-xs">
              Last updated: {currentDateTime}
            </p>
          </div>
          
          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
