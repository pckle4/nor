
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import FileConverter from '@/components/FileConverter';
import { QrCode, FileText } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <Tabs defaultValue="qr-generator" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/80 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="qr-generator" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              QR Generator
            </TabsTrigger>
            <TabsTrigger value="file-converter" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              File Converter
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="qr-generator">
          <QRCodeGenerator />
        </TabsContent>

        <TabsContent value="file-converter">
          <FileConverter />
        </TabsContent>
      </Tabs>

      {/* Features Info */}
      <div className="mt-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border-0">
            <QrCode className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Multiple QR Types</h3>
            <p className="text-sm text-gray-600">Generate QR codes for WiFi, phone, email, and text</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border-0">
            <div className="w-12 h-12 text-indigo-600 mx-auto mb-3 flex items-center justify-center">🎨</div>
            <h3 className="font-semibold mb-2">Custom Colors</h3>
            <p className="text-sm text-gray-600">Choose from presets or create custom color combinations</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border-0">
            <FileText className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">File Conversion</h3>
            <p className="text-sm text-gray-600">Convert between PDF and Word documents</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border-0">
            <div className="w-12 h-12 text-indigo-600 mx-auto mb-3 flex items-center justify-center">⚡</div>
            <h3 className="font-semibold mb-2">Easy Download</h3>
            <p className="text-sm text-gray-600">Download your files in multiple formats instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
