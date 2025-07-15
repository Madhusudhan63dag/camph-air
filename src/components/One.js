import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner.png'; // Replace with different banner if needed

const One = () => {
  const banners = [
    banner1,
    banner1, // Add another image here later
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="banner" className="w-full overflow-hidden relative">
     <div className="relative w-full aspect-[2.5/1]">
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

