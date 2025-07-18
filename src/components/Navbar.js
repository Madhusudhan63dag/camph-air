import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import one from '../assets/icons/1.png';
import two from '../assets/icons/2.png';
import three from '../assets/icons/3.png';
import four from '../assets/icons/4.png';
import five from '../assets/icons/5.png';
import six from '../assets/icons/6.png';
import Cart from './Cart';

const icons = {
  banner: one,
  products: five,
  flavours: three,
  usage: four,
  comparison: two,
  cart: six,
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Update cart count when component mounts and when cart changes
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItemCount(cart.length);
    };

    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const links = [
    { id: 'banner', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'flavours', label: 'Fragrance' },
    { id: 'usage', label: 'Where to Use' },
    { id: 'comparison', label: 'Why Us?' },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb] navbar shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <a href="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Camph Airr Logo"
              className="h-32"
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {links.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                className="flex items-center text-[#5d3c77] hover:text-[#3b275c] font-medium space-x-1">
                <img src={icons[link.id]} alt="" className="h-5 w-5" />
                <span>{link.label}</span>
              </a>
            ))}
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center text-[#5d3c77] hover:text-[#3b275c] font-medium space-x-1 p-2"
            >
              <img src={icons.cart} alt="" className="h-5 w-5" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#5d3c77] hover:text-[#3b275c] p-2"
            >
              <img src={icons.cart} alt="" className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[#fdf6ff]">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-100 to-purple-50 text-[#5d3c77] hover:bg-purple-200 transition-all duration-200 font-medium shadow-sm"
            >
              <img src={icons[link.id]} alt="" className="h-5 w-5" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      )}

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
