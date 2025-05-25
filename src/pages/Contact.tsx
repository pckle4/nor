
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Generator
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h1>
            <p className="text-gray-600 text-lg">
              Have questions, suggestions, or need support? We'd love to hear from you!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0 text-center">
            <Mail className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-3">Send us a message anytime</p>
            <a href="mailto:support@nowhile.com" className="text-indigo-600 hover:text-indigo-800 font-medium">
              support@nowhile.com
            </a>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0 text-center">
            <MapPin className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Location</h3>
            <p className="text-gray-600 mb-3">Based globally</p>
            <p className="text-indigo-600 font-medium">Remote-first company</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0 text-center">
            <Clock className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Response Time</h3>
            <p className="text-gray-600 mb-3">We aim to respond within</p>
            <p className="text-indigo-600 font-medium">24 hours</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="business">Business Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </Button>
          </form>
        </div>

        {/* FAQ Reference */}
        <div className="mt-8 text-center bg-white/60 backdrop-blur-sm rounded-lg p-6 border-0">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Quick Questions?</h3>
          <p className="text-gray-600 mb-4">
            Check our FAQ section for instant answers to common questions.
          </p>
          <Link 
            to="/faq" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Visit FAQ Section →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
