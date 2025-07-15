import React, { useState, useEffect } from 'react';
import lavender1 from '../assets/28.webp';
import lavender2 from '../assets/28.webp';
import rose1 from '../assets/28.webp';
import rose2 from '../assets/28.webp';
import lemongrass1 from '../assets/28.webp';
import sandalwood1 from '../assets/28.webp';
import original1 from '../assets/28.webp';

const flavorImages = {
  Lavender: [lavender1, lavender2],
  Rose: [rose1, rose2],
  Lemongrass: [lemongrass1],
  Sandalwood: [sandalwood1],
  Original: [original1],
};

const Two = () => {
  const flavors = Object.keys(flavorImages);
  const [selectedFlavor, setSelectedFlavor] = useState('Lavender');
  const [mainImage, setMainImage] = useState(flavorImages['Lavender'][0]);
  const [stockLeft, setStockLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [flavorCount, setFlavorCount] = useState(1);
  const [selectedFragrances, setSelectedFragrances] = useState(['Lavender']);


  const handleFlavorCountChange = (count) => {
    setFlavorCount(count);
    const defaults = Array(count).fill('Lavender');
    setSelectedFragrances(defaults);
    setSelectedFlavor(defaults[0]);
    setMainImage(flavorImages[defaults[0]][0]);
  };

  // Load urgency values from localStorage or set new
  useEffect(() => {
    let stock = localStorage.getItem('stockLeft');
    let deadline = localStorage.getItem('dealEndsAt');

    if (!stock || !deadline) {
      stock = Math.floor(Math.random() * 30) + 10; // Between 10–40
      deadline = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
      localStorage.setItem('stockLeft', stock);
      localStorage.setItem('dealEndsAt', deadline);
    }

    setStockLeft(stock);
    updateTimeLeft(deadline);

    const interval = setInterval(() => updateTimeLeft(deadline), 1000);
    return () => clearInterval(interval);
  }, []);

  const updateTimeLeft = (deadline) => {
    const end = new Date(deadline);
    const now = new Date();
    const diff = end - now;

    if (diff <= 0) {
      setTimeLeft('Offer expired');
      return;
    }

    const hrs = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const mins = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    setTimeLeft(`${hrs}:${mins}:${secs}`);
  };

  return (
    <section
      id="products"
      className="w-full bg-gradient-to-br from-[#e8d6f1] via-[#f6f1df] to-[#f0f9f7] py-12 px-4 md:px-12 lg:px-20"
    >
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Product Images */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start sticky top-28 self-start">
          <img
            src={mainImage}
            alt={`${selectedFlavor} Camph Airr`}
            className="w-full max-w-[500px] mx-auto rounded-xl shadow-xl transition-all duration-500 ease-in-out"
          />
          {/* Thumbnails */}
          <div className="mt-4 flex gap-3 flex-wrap justify-center">
            {flavorImages[selectedFlavor].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${selectedFlavor} ${index + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-contain rounded-lg border cursor-pointer transition hover:scale-105 ${
                  mainImage === img ? 'border-[#5d3c77] border-2' : 'border-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left bg-white/70 p-6 rounded-2xl shadow-lg backdrop-blur-md">
          <h2 className="text-3xl font-bold text-[#5d3c77]">
            {selectedFlavor} Camph Airr
          </h2>

          <p className="text-gray-700 text-base md:text-lg">
            A 100% organic camphor-based air freshener — naturally repels insects,
            purifies the air, and brings a soothing aroma to your surroundings.
            Safe for homes, wardrobes, cars, and pooja rooms.
          </p>

          <div className="text-lg font-semibold text-gray-800">
            Price: <span className="text-green-600">₹199</span>
          </div>

          <div className="text-yellow-600 text-sm font-medium">
            ★ 4.8 (1,200+ verified reviews)
          </div>

          {/* Urgency */}
          <div className="bg-red-100 text-red-800 rounded-lg px-4 py-2 shadow inline-block">
            Hurry! <strong>{stockLeft}</strong> items left. Deal ends in{' '}
            <strong>{timeLeft}</strong>.
          </div>

          {/* Attractive Fragrance Selector */}
          <div className="space-y-6 mt-6">
            {/* Step 1: Choose Quantity */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
              <h3 className="text-xl font-bold text-[#5d3c77] mb-4 flex items-center gap-2">
                <span className="bg-[#5d3c77] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                Choose Your Pack Size
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    onClick={() => handleFlavorCountChange(count)}
                    className={`p-4 rounded-xl text-center transition-all duration-300 ${
                      flavorCount === count
                        ? 'bg-gradient-to-br from-[#5d3c77] to-[#8a62ac] text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#5d3c77] hover:shadow-md'
                    }`}
                  >
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm opacity-90">
                      {count === 1 ? 'Single' : 'Pack'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Fragrances */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-100">
              <h3 className="text-xl font-bold text-[#5d3c77] mb-4 flex items-center gap-2">
                <span className="bg-[#5d3c77] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                Select Your Fragrances
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: flavorCount }).map((_, index) => (
                  <div key={index} className="relative">
                    <label className="block text-sm font-semibold text-[#5d3c77] mb-2">
                      🌸 Fragrance {index + 1}
                    </label>
                    <div className="relative">
                      <select
                        value={selectedFragrances[index]}
                        onChange={(e) => {
                          const updated = [...selectedFragrances];
                          updated[index] = e.target.value;
                          setSelectedFragrances(updated);
                          if (index === 0) {
                            setSelectedFlavor(e.target.value);
                            setMainImage(flavorImages[e.target.value][0]);
                          }
                        }}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#5d3c77] focus:border-[#5d3c77] appearance-none cursor-pointer text-gray-700 font-medium"
                      >
                        {Object.keys(flavorImages).map((flavor) => (
                          <option key={flavor} value={flavor}>
                            {flavor}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-5 h-5 text-[#5d3c77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Summary */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📦</span>
                <span className="font-semibold text-gray-700">Your Selection:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedFragrances.map((fragrance, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-[#5d3c77] border border-[#5d3c77]/30"
                  >
                    {fragrance}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Total: <span className="font-bold text-green-600">₹{199 * flavorCount}</span>
              </div>
            </div>
          </div>

          {/* Buy Now Button */}
          <div className='flex justify-center md:justify-start gap-6'>
          <button className="mt-4 bg-[#5d3c77] hover:bg-[#482a5e] text-white px-6 py-3 rounded-xl shadow-md font-semibold transition">
            Buy Now
          </button>
          <a href="tel:+916309792221">
            <button className="block md:hidden mt-4 bg-[#5d3c77] hover:bg-[#482a5e] text-white px-6 py-3 rounded-xl shadow-md font-semibold transition">
              Call now
            </button>
          </a>
          </div>
          

        </div>
      </div>
    </section>
  );
};

export default Two;
