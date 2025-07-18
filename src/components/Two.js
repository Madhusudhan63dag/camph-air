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

// combo of 3 
import combo from '../assets/combo/5.webp';
import combo1 from '../assets/combo/6.webp';
import combo2 from '../assets/combo/7.webp';
import combo3 from '../assets/combo/8.webp';
import combo4 from '../assets/combo/9.webp';

import combo4Image from '../assets/combo/10.webp';
import banner from '../assets/banner6.webp';

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
    <div className="">
      <img src={banner} alt="Special Combo Offer" className="w-full" />
      <div className=''>
        {/* Content */}
        <div className="md:w-full text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5d3c77] mb-4">
            New Combo Pack
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
      </div>
    </div>
  );
};

const comboImages = {
  'Original + Lavender': [originalLavender, originalLavender],
  'Original + Lemongrass': [originalLemongrass, originalLemongrass],
  'Original + Sandalwood': [originalSandalwood, originalSandalwood],
  'Original + Jasmine': [originalJasmine, originalJasmine],
};

// Combo of 3 images mapping
const threePackImages = {
  'Lavender + Original + Lemongrass': [combo, combo],
  'Original + Sandalwood + Jasmine': [combo1, combo1],
  'Sandalwood + Original + Lavender': [combo2, combo2],
  'Original + Jasmine + Lemongrass': [combo3, combo3],
  'Original + Jasmine + Lavender': [combo4, combo4],
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

const generateCards = (packs) => {
  return packs.map((combo, index) => {
    const name = combo.join(' + ');
    const price = combo.reduce((total, f) => total + flavorPrices[f], 0);
    const mrp = combo.reduce((total, f) => total + flavorMRPs[f], 0);
    let displayImage;
    if (combo.length === 3) {
      displayImage = threePackImages[name] || flavorImages[combo[0]];
    } else if (combo.length === 2) {
      displayImage = comboImages[name] || flavorImages[combo[0]];
    } else {
      displayImage = flavorImages[combo[0]];
    }
    return (
      <div
  key={index}
  className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white hover:shadow-3xl transition-transform duration-300 hover:-translate-y-2 group flex flex-col items-center"
  style={{ width: 380, maxWidth: '100%' }}
>
  {/* Image Section */}
  <div className="flex justify-center items-center w-full bg-gradient-to-br from-purple-50 to-white mb-2">
    <div className="w-full max-w-[400px] aspect-square relative">
      <img
        src={displayImage[0]}
        alt={name}
        className="rounded-2xl w-full h-full object-cover shadow-lg transition-opacity duration-500 group-hover:opacity-0"
        style={{ border: "4px solid #ece9ff", background: "#fff" }}
      />
      <img
        src={displayImage[1]}
        alt={name}
        className="rounded-2xl w-full h-full object-cover shadow-lg transition-opacity duration-500 absolute top-0 left-0 opacity-0 group-hover:opacity-100"
        style={{ border: "4px solid #ece9ff", background: "#fff" }}
      />
    </div>
  </div>
  {/* Text Section */}
  <div className="px-7 pt-4 pb-5 flex flex-col flex-1 items-center w-full">
    <h3 className="text-xl font-extrabold text-[#5d3c77] mb-1 tracking-tight text-center">
      {name}{combo.length > 1 ? ' Combo' : ''}
    </h3>
    <div className="text-gray-400 text-sm line-through mb-1">MRP ₹{mrp}</div>
    <div className="text-green-600 font-bold text-2xl mb-2">Now ₹{price}</div>
    <button
       onClick={() => {
              let cart = JSON.parse(localStorage.getItem('cart')) || [];
              const newItem = { name, price, combo, id: Date.now() };
              cart.push(newItem);
              localStorage.setItem('cart', JSON.stringify(cart));
              window.dispatchEvent(new CustomEvent('cartUpdated'));
              const button = document.activeElement;
              const originalText = button.textContent;
              button.textContent = 'Added!';
              button.style.backgroundColor = '#10b981';
              setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
              }, 1000);
            }}
      className="mt-4 bg-gradient-to-r from-[#5d3c77] to-[#8a62ac] hover:from-[#472c5d] hover:to-[#3a2248] text-white text-base font-semibold px-6 py-2 rounded-full shadow transition-all duration-200"
    >
      Add to Cart
    </button>
  </div>
</div>

    );
  });
};



const DisplayCards = () => {
  const navigate = useNavigate();
  const [stockLeft, setStockLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [showMoreSingles, setShowMoreSingles] = useState(false);
  const [showMoreCombos, setShowMoreCombos] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  
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

  // Prepare data for each category
  const singlePacks = [['Original'], ['Lavender'], ['Lemongrass'], ['Sandalwood'], ['Jasmine']];
  const mixedCombos = [
    // Two-pack combos
    [flavors[3], flavors[0]], // Original + Lavender
    [flavors[3], flavors[1]], // Original + Lemongrass
    [flavors[3], flavors[2]], // Original + Sandalwood
    [flavors[3], flavors[4]], // Original + Jasmine
    // Three-pack combos
    ['Lavender', 'Original', 'Lemongrass'],
    ['Original', 'Sandalwood', 'Jasmine'],
    ['Sandalwood', 'Original', 'Lavender'],
    ['Original', 'Jasmine', 'Lemongrass'],
    ['Original', 'Jasmine', 'Lavender'],
  ];

  return (
    <div id="products" className="overflow-hidden p-6 space-y-12 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center text-xl font-bold text-red-700 bg-red-100 px-4 py-3 rounded-lg shadow">
        Limited Stock Offer! Deal ends in <span className="text-red-800 font-bold">{timeLeft}</span>
      </div>
      {showPopup && (
        <div className="fixed z-10 bottom-6 right-6 max-w-xs bg-white border border-purple-300 shadow-xl p-4 rounded-2xl animate-bounce-in">
          <div className="text-[#5d3c77] font-bold text-lg mb-1"> Select Your Own combo </div>
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

      {/* Heading */}
      <div>
        <h2 className="text-5xl font-extrabold text-center mb-3 text-[#5d3c77] tracking-tight leading-tight">
          Choose Your Perfect Fragrance Blend
        </h2>
        <h3 className="text-lg font-medium text-center text-gray-600">
          Feel the calm. Elevate your space. 100% Herbal & Natural Camphor Combos.
        </h3>
      </div>

      {/* Single */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Single Pack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {showMoreSingles ? generateCards(singlePacks) : generateCards(singlePacks.slice(0, 4))}
        </div>
        {singlePacks.length > 4 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowMoreSingles(!showMoreSingles)}
              className="px-6 py-2 bg-[#5d3c77] hover:bg-[#472c5d] text-white font-semibold rounded-full transition shadow-md"
            >
              {showMoreSingles ? 'View Less' : 'View All'}
            </button>
          </div>
        )}
      </div>

      {/* Combo Mix */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Combo Mix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {showMoreCombos ? generateCards(mixedCombos) : generateCards(mixedCombos.slice(0, 4))}
        </div>
        {mixedCombos.length > 4 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowMoreCombos(!showMoreCombos)}
              className="px-6 py-2 bg-[#5d3c77] hover:bg-[#472c5d] text-white font-semibold rounded-full transition shadow-md"
            >
              {showMoreCombos ? 'View Less' : 'View All Combos'}
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
