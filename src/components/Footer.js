import React from 'react';
import logo from '../assets/logo.png';

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/camphairr', // <-- Replace with your actual page
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zm7 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61578250815738', // <-- Replace with your actual page
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M22.675 0h-21.35C.597 0 .003.594.003 1.326v21.348C.003 23.406.597 24 1.325 24h11.495V14.708h-3.13v-3.63h3.13V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.765v2.313h3.588l-.467 3.63h-3.121V24h6.116c.728 0 1.322-.594 1.322-1.326V1.326C23.998.594 23.403 0 22.675 0"/>
      </svg>
    ),
  },
];

const Footer = () => (
  <footer className="bg-gradient-to-b from-[#f6f1df] to-[#f0f9f7] text-[#5d3c77] pt-12 pb-6 px-6 md:px-12 lg:px-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Logo + Description */}
      <div className="md:col-span-1">
        <img src={logo} alt="Camph Airr" className="h-32" />
        <p className="text-sm leading-relaxed text-gray-700 max-w-xs">
          Breathe easy with Camph Airr – pure camphor. Naturally cleanse your air and elevate your senses.
        </p>
      </div>
      {/* Navigation Links */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Explore</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li><a href="/#banner" className="hover:text-[#5d3c77]">Overview</a></li>
          <li><a href="/#products" className="hover:text-[#5d3c77]">Products</a></li>
          <li><a href="/#new" className="hover:text-[#5d3c77]">What's New</a></li>
          <li><a href="/#about" className="hover:text-[#5d3c77]">About Us</a></li>
          <li><a href="/contact" className="hover:text-[#5d3c77]">Contact Us</a></li>
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
      {/* Contact Info & Socials */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
        <ul className="text-sm text-gray-700 space-y-2 mb-4">
          <li>Email: <a href="mailto:support@camphairr.com" className="hover:text-[#5d3c77]">customercareproductcenter@gmail.com</a></li>
          <li>Phone: +91-9392277389</li>
          <li>Address: Hyderabad, India</li>
        </ul>
        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-2">
          {socialLinks.map(social => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5d3c77] hover:text-[#e76f51] transition"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
    {/* Divider */}
    <div className="border-t mt-10 pt-4 text-center text-xs text-gray-500">
      © {new Date().getFullYear()} Surya Media. All rights reserved.
    </div>
  </footer>
);

export default Footer;
