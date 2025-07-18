import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner1.webp';
import banner2 from '../assets/banner2.webp';
import banner3 from '../assets/banner4.webp';
import banner5 from '../assets/banner5.webp';
import banner6 from '../assets/banner6.webp';

// Import mobile-specific banners
import banner1Mobile from '../assets/banner1-mobile.webp';
import banner2Mobile from '../assets/banner2-mobile.webp';
import banner3Mobile from '../assets/banner3-mobile.webp';
import banner5Mobile from '../assets/banner5-mobile.webp';

const MOBILE_BREAKPOINT = 768; // px (adjust as needed)

const One = () => {
  const bannersDesktop = [banner1, banner6, banner2, banner3, banner5];
  const bannersMobile = [banner1Mobile, banner2Mobile, banner3Mobile, banner5Mobile];

  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    // Listen for resize events to switch between mobile and desktop
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const banners = isMobile ? bannersMobile : bannersDesktop;
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, bannersDesktop.length, bannersMobile.length]);

  const banners = isMobile ? bannersMobile : bannersDesktop;
  const aspectClass = isMobile ? 'aspect-[545/800]' : 'aspect-[2.5/1]';

  return (
    <section id="banner" className="w-full overflow-hidden relative">
      <div className={`relative w-full ${aspectClass}`}>
        {banners.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Banner ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              current === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to banner ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? 'bg-white scale-110' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default One;
