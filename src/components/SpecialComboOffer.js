import React, { useEffect, useRef, useState } from 'react';
import banner from '../assets/banner6.webp'; // adjust path
import combo4Image from '../assets/banner6.webp'; // adjust path

const SpecialComboOffer = ({ navigate, flavorImages, flavorMRPs }) => {
  const sectionRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false); // to show popup only once

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !popupShown) {
          setShowPopup(true);
          setPopupShown(true); // only once
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [popupShown]);

  const handleConfirmPrepay = () => {
    const allFlavors = Object.keys(flavorImages);
    const comboPrice = 1399;
    const comboMRP = allFlavors.reduce((total, flavor) => total + flavorMRPs[flavor], 0);

    const comboItem = {
      name: 'Combo of 5 Fragrances',
      price: comboPrice,
      mrp: comboMRP,
      combo: allFlavors,
      id: Date.now(),
      quantity: 1,
    };

    localStorage.setItem('cart', JSON.stringify([comboItem]));
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    const orderDetails = {
      productName: 'Combo of 5 Fragrances',
      quantity: 1,
      fragrances: allFlavors,
      pricePerUnit: comboPrice,
      totalAmount: comboPrice,
      mainImage: combo4Image,
    };

    setShowPopup(false);
    navigate('/checkout', { state: orderDetails });
  };

  return (
    <div id="new" ref={sectionRef}>
      <img src={banner} alt="Special Combo Offer" className="w-full" />
      <div className="">
        <h2 className="text-3xl md:text-4xl font-bold text-start text-[#5d3c77] mb-4">
          ALL-In-One Fragrance Pack
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

        <div className="flex justify-center">
          <button
            onClick={() => handleConfirmPrepay()}
            className="bg-gradient-to-r from-[#5d3c77] to-[#8a62ac] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Grab This Combo Now
          </button>
        </div>
      </div>

      {/* Auto-popup on scroll */}
      {showPopup && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-2">Special Offer</h3>
            <p className="text-gray-700 mb-4">
              Get <strong>Free Shipping</strong> on Prepaid Orders!
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleConfirmPrepay}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Continue with Prepay
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialComboOffer;
