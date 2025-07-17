import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lavender1 from '../assets/single/1.webp';
import lemongrass1 from '../assets/single/2.webp';
import sandalwood1 from '../assets/single/5.webp';
import original1 from '../assets/single/3.webp';
import jasmine1 from '../assets/single/4.webp';
// Example combo images
import originalLavender from '../assets/combo/1.webp';
import originalLemongrass from '../assets/combo/2.webp';
import originalSandalwood from '../assets/combo/3.webp';
import originalJasmine from '../assets/combo/4.webp';

import combo4Image from '../assets/single/5.webp';


const comboImages = {
  'Original + Lavender': [originalLavender, originalLavender],
  'Original + Lemongrass': [originalLemongrass, originalLemongrass],
  'Original + Sandalwood': [originalSandalwood, originalSandalwood],
  'Original + Jasmine': [originalJasmine, originalJasmine],
};

const flavorImages = {
  Lavender: [lavender1, lavender1],
  Lemongrass: [lemongrass1, lemongrass1],
  Sandalwood: [sandalwood1, sandalwood1],
  Original: [original1, original1],
  Jasmine: [jasmine1, jasmine1],
};

const flavorPrices = {
  Lavender: 349,
  Lemongrass: 349,
  Sandalwood: 349,
  Original: 390,
  Jasmine: 370,
};

const flavorMRPs = {
  Lavender: 599,
  Lemongrass: 599,
  Sandalwood: 599,
  Original: 699,
  Jasmine: 649,
};

const flavors = Object.keys(flavorImages);

const getCombinations = (arr, k) => {
  const results = [];
  const helper = (start, combo) => {
    if (combo.length === k) {
      results.push([...combo]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      helper(i + 1, [...combo, arr[i]]);
    }
  };
  helper(0, []);
  return results;
};

const SpecialComboOffer = ({ navigate }) => {
  
  const handleGrabCombo = () => {
    // All 5 flavors
    const allFlavors = Object.keys(flavorImages);
    const comboPrice = 1399; // Price for all 5 flavors
    const comboMRP = allFlavors.reduce((total, flavor) => total + flavorMRPs[flavor], 0);
    
    const comboItem = {
      name: 'Combo of 5 Fragrances',
      price: comboPrice,
      mrp: comboMRP,
      combo: allFlavors,
      id: Date.now(),
      quantity: 1
    };

    // Clear existing cart and add combo
    localStorage.setItem('cart', JSON.stringify([comboItem]));
    
    // Dispatch custom event to notify navbar
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Navigate to checkout with order details
    const orderDetails = {
      productName: 'Combo of 5 Fragrances',
      quantity: 1,
      fragrances: allFlavors,
      pricePerUnit: comboPrice,
      totalAmount: comboPrice,
      mainImage: combo4Image
    };
    
    navigate('/checkout', { state: orderDetails });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-10 bg-gradient-to-br from-yellow-50 to-yellow-100 px-6 py-16 rounded-xl shadow-lg my-10">
      {/* Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5d3c77] mb-4">
          Special Combo Offer
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Unlock the power of purity, calmness, and style — all in one exclusive pack. Our <strong>5-in-1 Combo</strong> features all premium fragrances including <span className="text-[#5d3c77] font-semibold">Original Camphor</span> plus four handpicked fragrances.
          <br /><br />
          Just <strong>open the pack</strong> and place it in your wardrobe, bathroom, car, or any room — no water, no electricity, no setup needed.
        </p>

        <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
          <li>Includes All 5 Premium Fragrances</li>
          <li>Long-lasting freshness with anti-bacterial properties</li>
          <li>No burning, no mess — 100% safe & natural</li>
          <li>Perfect for gifting, travel, or daily use</li>
        </ul>

        <button 
          onClick={handleGrabCombo}
          className="bg-gradient-to-r from-[#5d3c77] to-[#8a62ac] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Grab This Combo Now
        </button>
      </div>

      {/* Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={combo4Image}
          alt="Special Combo Offer"
          className="w-[300px] md:w-[450px] lg:w-[500px] rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
};


const generateCards = (packs, stockLeft) => {
  return packs.map((combo, index) => {
    const name = combo.join(' + ');
    const price = combo.reduce((total, f) => total + flavorPrices[f], 0);
    const mrp = combo.reduce((total, f) => total + flavorMRPs[f], 0);
    const displayImage = comboImages[name] || flavorImages[combo[0]];
    const showUrgency = index % 3 === 0;

    return (
      <div
        key={index}
        className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group bg-white"
      >
        {/* Image Section */}
        <div className="relative h-64 w-full">
          <img
            src={displayImage[0]}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={displayImage[1]}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        {/* Text Section */}

        <div className="p-5 text-center flex flex-col justify-between min-h-[240px]">

          <div>
            <h3 className="text-xl font-bold text-[#5d3c77] mb-1">{name} Combo</h3>
            <p className="text-sm text-gray-600 mb-2">
              {combo.length === 1
                ? 'Experience a signature fragrance in every breath.'
                : combo.length === 2
                ? 'Double the freshness. Perfectly paired aromas.'
                : 'A trio of scents for a balanced, vibrant vibe.'}
            </p>
            <div className="text-gray-400 text-sm line-through">MRP ₹{mrp}</div>
            <div className="text-green-600 font-semibold text-xl">Now ₹{price}</div>
          </div>

          <button
            onClick={() => {
              let cart = JSON.parse(localStorage.getItem('cart')) || [];
              const newItem = { name, price, combo, id: Date.now() };
              cart.push(newItem);
              localStorage.setItem('cart', JSON.stringify(cart));
              
              // Dispatch custom event to notify navbar
              window.dispatchEvent(new CustomEvent('cartUpdated'));
              
              // Show success message
              const button = document.activeElement;
              const originalText = button.textContent;
              button.textContent = 'Added!';
              button.style.backgroundColor = '#10b981';
              setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
              }, 1000);
            }}
            className="mt-4 bg-[#5d3c77] hover:bg-[#472c5d] text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  });
};

// Special card generator for combo of 4 flavors
const generateComboOf4Card = (navigate) => {
  const comboOf4 = flavors; // All 4 flavors
  const comboPrice = 1399; // Updated combo price for 4 flavors
  const comboMRP = flavors.reduce((total, flavor) => total + flavorMRPs[flavor], 0);
  const name = 'Combo of 5 Fragrances';
  const displayImage = combo4Image; // Use first flavor image

  return (
    <div className="rounded-3xl overflow-hidden shadow-xl border border-purple-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group bg-gradient-to-br from-purple-50 to-blue-50 relative">
      {/* Special Badge */}
      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 animate-pulse">
        BEST DEAL
      </div>
      
      {/* Image Section */}
      <div className="relative h-96 w-full">
        <img
          src={displayImage}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={displayImage}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Overlay with all flavor names */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="text-white text-xs font-medium">
            {comboOf4.join(' • ')}
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="p-5 text-center flex flex-col justify-between min-h-[280px]">
        <div>
          <h3 className="text-xl font-bold text-[#5d3c77] mb-2">{name}</h3>
          <p className="text-sm text-gray-600 mb-3">
            Complete collection of all 5 premium fragrances. Perfect for every mood and occasion.
          </p>
          
          {/* Special features */}
          <div className="mb-3 space-y-1">
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block">
              ✓ All 5 Fragrances
            </div>
            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block ml-1">
              ✓ Maximum Savings
            </div>
            <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full inline-block ml-1">
              ✓ Free Shipping
            </div>
          </div>
          
          <div className="text-gray-400 text-sm line-through">MRP ₹{comboMRP}</div>
          <div className="text-green-600 font-bold text-2xl">Now ₹{comboPrice}</div>
          <div className="text-sm text-green-700 font-medium mt-1">
            You Save ₹{comboMRP - comboPrice}!
          </div>
          
          <div className="bg-red-100 text-red-700 text-sm font-semibold mt-3 p-2 rounded-md shadow-sm animate-pulse">
            Only 10 packs left at this price. Don't miss out!
          </div>
        </div>

        <button
          onClick={() => {
            const comboItem = {
              name: 'Combo of 4 Fragrances',
              price: comboPrice,
              mrp: comboMRP,
              combo: comboOf4,
              id: Date.now(),
              quantity: 1
            };

            // Clear existing cart and add combo
            localStorage.setItem('cart', JSON.stringify([comboItem]));
            
            // Dispatch custom event to notify navbar
            window.dispatchEvent(new CustomEvent('cartUpdated'));
            
            // Navigate to checkout with order details
            const orderDetails = {
              productName: 'Combo of 4 Fragrances',
              quantity: 1,
              fragrances: comboOf4,
              pricePerUnit: comboPrice,
              totalAmount: comboPrice,
              mainImage: displayImage[0]
            };
            
            navigate('/checkout', { state: orderDetails });
          }}
          className="mt-4 bg-gradient-to-r from-[#5d3c77] to-[#472c5d] hover:from-[#472c5d] hover:to-[#3a2248] text-white text-sm font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Buy Now - Best Deal!
        </button>
      </div>
    </div>
  );
};

const DisplayCards = () => {
  const navigate = useNavigate();
  const [stockLeft, setStockLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [showMoreSingles, setShowMoreSingles] = useState(false);
  const [showMoreTwos, setShowMoreTwos] = useState(false);
  const [showMoreThrees, setShowMoreThrees] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleBuyNowCombo = () => {
    // Add all 4 flavors to cart
    const comboOf4 = flavors; // All 4 flavors
    const comboPrice = 1399; // Updated combo price for 4 flavors
    const comboMRP = flavors.reduce((total, flavor) => total + flavorMRPs[flavor], 0);
    
    const comboItem = {
      name: 'Combo of 4 Fragrances',
      price: comboPrice,
      mrp: comboMRP,
      combo: comboOf4,
      id: Date.now(),
      quantity: 1
    };

    // Clear existing cart and add combo
    localStorage.setItem('cart', JSON.stringify([comboItem]));
    
    // Dispatch custom event to notify navbar
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Navigate to checkout with order details
    const orderDetails = {
      productName: 'Combo of 4 Fragrances',
      quantity: 1,
      fragrances: comboOf4,
      pricePerUnit: comboPrice,
      totalAmount: comboPrice,
      mainImage: original1
    };
    
    navigate('/checkout', { state: orderDetails });
  };


  useEffect(() => {
    let stock = localStorage.getItem('stockLeft');
    let deadline = localStorage.getItem('dealEndsAt');

    if (!stock || !deadline) {
      stock = Math.floor(Math.random() * 30) + 10;
      deadline = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
      localStorage.setItem('stockLeft', stock);
      localStorage.setItem('dealEndsAt', deadline);
    }

    setStockLeft(stock);
    updateTimeLeft(deadline);

    const interval = setInterval(() => updateTimeLeft(deadline), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('products');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      setShowPopup(isVisible);
    };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
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

  const singlePacks = flavors.map((f) => [f]);
  const twoPacks = [
    [flavors[3], flavors[0]], // Original + Lavender
    [flavors[3], flavors[1]], // Original + Lemongrass
    [flavors[3], flavors[2]], // Original + Sandalwood
    [flavors[3], flavors[4]], // Original + Jasmine
  ];
  const fivePack = [flavors]; // All 4 flavors as a single combo (renamed from fivePack)
  const visibleTwoPacks = showMoreTwos ? twoPacks : twoPacks.slice(0, 4);
  const cards = [singlePacks, twoPacks];
  const visibleSinglePacks = showMoreSingles ? cards : cards.slice(0, 4); // Show 4 initially
  function getThreeCombosWithOriginal(allFlavors) {
    const others = allFlavors.filter(f => f !== 'Original');
    const combos = [];

    for (let i = 0; i < others.length; i++) {
      for (let j = i + 1; j < others.length; j++) {
        combos.push(['Original', others[i], others[j]]);
      }
    }

    return combos;
  }
  const threePacks = getThreeCombosWithOriginal(flavors);
  const visibleThreePacks = showMoreThrees ? threePacks : threePacks.slice(0, 3);

  return (
     <div id="products" className="p-6 space-y-12 bg-gradient-to-br from-purple-50 to-blue-50">
    <div className="text-center text-xl font-bold text-red-700 bg-red-100 px-4 py-3 rounded-lg shadow">
      Limited Stock Offer! Deal ends in <span className="text-red-800 font-bold">{timeLeft}</span>
    </div>
    {showPopup && (
      <div className="fixed z-10 bottom-6 right-6 max-w-xs bg-white border border-purple-300 shadow-xl p-4 rounded-2xl animate-bounce-in">
        <div className="text-[#5d3c77] font-bold text-lg mb-1">Buy Combo of 5</div>
        <p className="text-sm text-gray-700 mb-2">
          Get all 5 fragrances for just <span className="font-semibold text-green-600">₹1399</span>. Limited stock available!
        </p>
        <button 
          className="text-sm bg-[#5d3c77] text-white px-4 py-1 rounded-full hover:bg-[#472c5d]" 
          onClick={handleBuyNowCombo}
        >
          Buy Now
        </button>
      </div>
    )}

    <div>
      <h2 className="text-5xl font-extrabold text-center mb-3 text-[#5d3c77] tracking-tight leading-tight">
        Choose Your Perfect Fragrance Blend
      </h2>
      <h3 className="text-lg font-medium text-center text-gray-600">
        Feel the calm. Elevate your space. 100% Herbal & Natural Camphor Combos.
      </h3>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Single & Combo of 2 Packs</h2>

      {/* Combined Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {generateCards(
          (showMoreSingles ? [...singlePacks, ...twoPacks] : [...singlePacks, ...twoPacks].slice(0, 4)),
          stockLeft
        )}
      </div>

      {/* Unified View More Button */}
      {[...singlePacks, ...twoPacks].length > 4 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowMoreSingles(!showMoreSingles)}
            className="px-6 py-2 bg-[#5d3c77] hover:bg-[#472c5d] text-white font-semibold rounded-full transition shadow-md"
          >
            {showMoreSingles ? 'View Less' : 'Select Combo of 2'}
          </button>
        </div>
      )}
    </div>

    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Combo of 3 (with Original)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {generateCards(visibleThreePacks, stockLeft)}
      </div>

      {threePacks.length > 3 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowMoreThrees(!showMoreThrees)}
            className="px-6 py-2 bg-[#5d3c77] hover:bg-[#472c5d] text-white font-semibold rounded-full transition shadow-md"
          >
            {showMoreThrees ? 'View Less' : 'View More Combos of 3'}
          </button>
        </div>
      )}
    </div>


    {/* Special Combo of 4 Section */}
    <div>
      <SpecialComboOffer navigate={navigate} />
    </div>
  </div>
  );
};

export default DisplayCards;
