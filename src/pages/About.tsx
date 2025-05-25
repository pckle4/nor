
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, Zap, Heart, Award, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Generator
          </Link>
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img 
                src="/lovable-uploads/788d5288-fd6e-4356-9cf7-4fe6d075b7a3.png" 
                alt="NoWhile Logo" 
                className="w-16 h-16"
              />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                About NoWhile QR Generator
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Empowering businesses and individuals with advanced QR code technology that bridges the physical and digital worlds.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 mb-8 border-0">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            At NoWhile, we believe in making technology accessible and powerful. Our QR code generator represents 
            this philosophy by providing enterprise-grade QR code generation capabilities completely free, with no 
            compromises on quality, security, or functionality.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We're committed to bridging the gap between physical and digital experiences, enabling seamless 
            interactions that enhance how people connect, share, and engage with information in our increasingly 
            connected world.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0 text-center">
            <Zap className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
            <p className="text-gray-600">
              Continuously pushing the boundaries of what's possible with QR code technology and user experience.
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0 text-center">
            <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-3">Accessibility</h3>
            <p className="text-gray-600">
              Making advanced QR code generation accessible to everyone, from individuals to large enterprises.
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0 text-center">
            <Heart className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-3">Privacy</h3>
            <p className="text-gray-600">
              Your data stays with you. All QR code generation happens in your browser, ensuring complete privacy.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 mb-8 border-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Founded in 2024 as part of the NoWhile venture ecosystem, our QR code generator was born from a 
              simple observation: existing QR code tools were either too basic for professional use or too 
              expensive for small businesses and individuals.
            </p>
            <p>
              Our founder, Ansh, recognized the growing importance of QR codes in connecting physical and digital 
              experiences. From restaurant menus to business cards, from marketing campaigns to secure authentication, 
              QR codes have become an essential bridge in our digital-first world.
            </p>
            <p>
              We set out to create a tool that would be powerful enough for enterprise use, yet simple enough for 
              anyone to master. The result is a platform that generates millions of QR codes while maintaining 
              our core commitment to privacy, security, and accessibility.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">1M+</div>
            <div className="text-indigo-100">QR Codes Generated</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">50K+</div>
            <div className="text-purple-100">Happy Users</div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-lg p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">99.9%</div>
            <div className="text-pink-100">Uptime</div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 mb-8 border-0">
          <div className="flex items-center mb-6">
            <Award className="w-8 h-8 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">Leadership</h2>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                A
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Ansh</h3>
              <p className="text-indigo-600 font-medium mb-2">Founder & Lead Developer</p>
              <p className="text-gray-600">
                Passionate about creating tools that make technology more accessible. With a background in 
                software engineering and product design, Ansh leads the vision and development of our platform.
              </p>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border-0">
          <div className="flex items-center mb-6">
            <Globe className="w-8 h-8 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">Looking Forward</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            As we continue to grow, we're expanding our platform with new features like analytics, dynamic QR codes, 
            batch generation, and API access. Our goal is to remain the most comprehensive and user-friendly QR code 
            solution available.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We're also exploring integration with emerging technologies like AR, IoT, and blockchain to create even 
            more innovative ways to connect the physical and digital worlds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
