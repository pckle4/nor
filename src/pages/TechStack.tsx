
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Layers, Zap, Shield, Cpu, Database } from 'lucide-react';

const TechStack = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Generator
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Tech Stack & QR Generation Process
            </h1>
            <p className="text-gray-600 text-lg">Deep dive into the technology powering our QR code generator</p>
          </div>
        </div>

        {/* QR Generation Process */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 mb-8 border-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-indigo-600" />
            How QR Codes Are Generated
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-xl font-semibold mb-2">1. Data Encoding</h3>
              <p className="text-gray-600">
                Input data is first analyzed and encoded using the most efficient mode (numeric, alphanumeric, byte, or kanji). 
                The system automatically selects the optimal encoding to minimize data size while maintaining accuracy.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold mb-2">2. Error Correction</h3>
              <p className="text-gray-600">
                Reed-Solomon error correction codes are added to ensure the QR code remains readable even if up to 30% 
                of the code is damaged. We use level M (15%) error correction by default for optimal balance.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold mb-2">3. Matrix Generation</h3>
              <p className="text-gray-600">
                The encoded data is arranged in a two-dimensional matrix with finder patterns, alignment patterns, 
                and timing patterns. The system automatically determines the optimal QR version (size) based on data length.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-semibold mb-2">4. Visual Rendering</h3>
              <p className="text-gray-600">
                The matrix is rendered as an SVG or Canvas element with customizable colors, patterns, and logos. 
                Our rendering engine ensures pixel-perfect output at any scale while maintaining scannability.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2 text-indigo-600" />
              Frontend Technologies
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span><strong>React 18:</strong> Component-based UI framework</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span><strong>TypeScript:</strong> Type-safe development</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                <span><strong>Tailwind CSS:</strong> Utility-first styling</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span><strong>Vite:</strong> Fast build tool and dev server</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Layers className="w-5 h-5 mr-2 text-indigo-600" />
              QR Libraries & Tools
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span><strong>qrcode.js:</strong> Core QR generation engine</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span><strong>Canvas API:</strong> High-quality rendering</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <span><strong>SVG:</strong> Scalable vector graphics</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                <span><strong>File APIs:</strong> Download functionality</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-indigo-600" />
              Security & Performance
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span><strong>Client-side processing:</strong> No data sent to servers</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span><strong>Memory optimization:</strong> Efficient rendering</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span><strong>Error handling:</strong> Robust validation</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                <span><strong>Progressive enhancement:</strong> Graceful fallbacks</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Cpu className="w-5 h-5 mr-2 text-indigo-600" />
              Advanced Features
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                <span><strong>Logo embedding:</strong> Custom branding support</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                <span><strong>Color customization:</strong> Full palette control</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-lime-500 rounded-full mr-3"></div>
                <span><strong>Pattern options:</strong> Squares, circles, rounded</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                <span><strong>Multi-format export:</strong> PNG, SVG, PDF</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 mt-8 border-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Database className="w-6 h-6 mr-3 text-indigo-600" />
            Technical Specifications
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">QR Code Versions</h4>
              <p className="text-gray-600 text-sm">Supports versions 1-40 (21x21 to 177x177 modules)</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Data Capacity</h4>
              <p className="text-gray-600 text-sm">Up to 7,089 numeric or 4,296 alphanumeric characters</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Error Correction</h4>
              <p className="text-gray-600 text-sm">L(7%), M(15%), Q(25%), H(30%) recovery levels</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Output Formats</h4>
              <p className="text-gray-600 text-sm">PNG, SVG, JPEG with customizable resolution</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Color Depth</h4>
              <p className="text-gray-600 text-sm">24-bit RGB with alpha transparency support</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Performance</h4>
              <p className="text-gray-600 text-sm">Sub-second generation for most QR codes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
