
import React from 'react';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { QrCode } from 'lucide-react';
import Layout from '@/components/shared/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img 
            src="/lovable-uploads/788d5288-fd6e-4356-9cf7-4fe6d075b7a3.png" 
            alt="NoWhile Logo" 
            className="w-12 h-12"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Advanced QR Code Generator
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Create beautiful, customizable QR codes with advanced features</p>
      </div>

      <QRCodeGenerator />

      {/* Features Info */}
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-6">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border-0">
            <QrCode className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Multiple QR Types</h3>
            <p className="text-sm text-gray-600">WiFi, phone, email, SMS, location & more</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border-0">
            <div className="w-12 h-12 text-indigo-600 mx-auto mb-3 flex items-center justify-center">🎨</div>
            <h3 className="font-semibold mb-2">Custom Styling</h3>
            <p className="text-sm text-gray-600">Colors, logos, patterns & advanced designs</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border-0">
            <div className="w-12 h-12 text-green-600 mx-auto mb-3 flex items-center justify-center">📍</div>
            <h3 className="font-semibold mb-2">Location & Maps</h3>
            <p className="text-sm text-gray-600">GPS coordinates and map integration</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border-0">
            <div className="w-12 h-12 text-purple-600 mx-auto mb-3 flex items-center justify-center">💼</div>
            <h3 className="font-semibold mb-2">Business Cards</h3>
            <p className="text-sm text-gray-600">vCard format with contact details</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border-0">
            <div className="w-12 h-12 text-indigo-600 mx-auto mb-3 flex items-center justify-center">⚡</div>
            <h3 className="font-semibold mb-2">Instant Download</h3>
            <p className="text-sm text-gray-600">Multiple formats with high quality</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
