import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#f6f1df] to-[#f0f9f7] text-[#5d3c77] pt-12 pb-6 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo + Description */}
        <div className="md:col-span-1">
          <img src={logo} alt="Camph Airr" className="h-20 mb-4" />
          <p className="text-sm leading-relaxed text-gray-700 max-w-xs">
            Discover the natural power of camphor with a modern twist. Our fragrance drops purify your air, uplift your mood, and create calming energy — anytime, anywhere.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="#banner" className="hover:text-[#5d3c77]">Overview</a></li>
            <li><a href="#products" className="hover:text-[#5d3c77]">How It Works</a></li>
            <li><a href="#flavours" className="hover:text-[#5d3c77]">Fragrance Types</a></li>
            <li><a href="#usage" className="hover:text-[#5d3c77]">Usage Areas</a></li>
            <li><a href="#comparison" className="hover:text-[#5d3c77]">Why Choose Us</a></li>
          </ul>
        </div>

        {/* Policy Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="/terms" className="hover:text-[#5d3c77]">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-[#5d3c77]">Privacy Policy</a></li>
            <li><a href="/returns" className="hover:text-[#5d3c77]">Return Policy</a></li>
            <li><a href="/shipping" className="hover:text-[#5d3c77]">Shipping Information</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>Email: <a href="mailto:support@camphairr.com" className="hover:text-[#5d3c77]">support@camphairr.com</a></li>
            <li>Phone: +91-9876543210</li>
            <li>Address: Hyderabad, India</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t mt-10 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Camph Airr. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
