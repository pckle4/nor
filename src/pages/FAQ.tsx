
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What types of QR codes can I generate?",
      answer: "Our generator supports multiple QR code types including URLs, WiFi credentials, phone numbers, email addresses, SMS messages, geographic locations, vCard contact information, calendar events, and plain text."
    },
    {
      question: "Are my QR codes generated securely?",
      answer: "Yes! All QR code generation happens entirely in your browser. No data is sent to our servers, ensuring complete privacy and security of your information."
    },
    {
      question: "What file formats can I download?",
      answer: "You can download your QR codes in multiple formats including PNG, SVG, and JPEG. SVG format provides scalable vector graphics perfect for print, while PNG offers high-quality raster images."
    },
    {
      question: "Can I customize the appearance of my QR codes?",
      answer: "Absolutely! You can customize colors, add logos, choose different patterns (squares, circles, rounded corners), adjust sizes, and modify error correction levels to suit your needs."
    },
    {
      question: "What is error correction and why is it important?",
      answer: "Error correction allows QR codes to remain readable even when partially damaged or obscured. We offer four levels: L (7%), M (15%), Q (25%), and H (30%) recovery capability."
    },
    {
      question: "How large can my QR code data be?",
      answer: "The maximum data capacity depends on the content type and error correction level. You can store up to 7,089 numeric characters, 4,296 alphanumeric characters, or 2,953 bytes of binary data."
    },
    {
      question: "Can I add a logo to my QR code?",
      answer: "Yes! You can upload and embed your logo in the center of the QR code. Our system automatically adjusts the error correction to ensure the code remains scannable with your logo."
    },
    {
      question: "Are the QR codes compatible with all scanners?",
      answer: "Our QR codes follow the international ISO/IEC 18004 standard, making them compatible with virtually all QR code scanners and smartphone cameras worldwide."
    },
    {
      question: "Can I generate QR codes for commercial use?",
      answer: "Yes! All QR codes generated with our tool can be used for both personal and commercial purposes without any restrictions or licensing fees."
    },
    {
      question: "How do I create a WiFi QR code?",
      answer: "Select 'WiFi' from the QR type dropdown, enter your network name (SSID), password, and select the security type (WPA/WEP/None). Users can scan the code to automatically connect to your WiFi network."
    },
    {
      question: "What's the difference between QR code versions?",
      answer: "QR code versions (1-40) determine the size and data capacity. Version 1 is 21x21 modules, while Version 40 is 177x177 modules. The system automatically selects the optimal version based on your data."
    },
    {
      question: "Can I batch generate multiple QR codes?",
      answer: "Currently, our tool focuses on generating individual high-quality QR codes with extensive customization options. For batch generation needs, please contact us for enterprise solutions."
    },
    {
      question: "How do I ensure my QR code scans correctly?",
      answer: "Ensure sufficient contrast between foreground and background colors, test with multiple scanning apps, maintain adequate quiet zone (white space) around the code, and avoid excessive customization that might affect readability."
    },
    {
      question: "Can I edit a QR code after generating it?",
      answer: "QR codes are static once generated. To modify the content, you'll need to create a new QR code. However, you can save your settings as templates for future use with similar configurations."
    },
    {
      question: "What devices can scan QR codes?",
      answer: "Most modern smartphones with cameras can scan QR codes using built-in camera apps or dedicated QR scanner applications. This includes iOS devices (iPhone), Android devices, and many feature phones."
    }
  ];

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
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-lg">Everything you need to know about our QR code generator</p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-sm rounded-lg border-0 overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/40 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-white/60 backdrop-blur-sm rounded-lg p-8 border-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Feel free to reach out to our support team.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
