import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './styles.css';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import lavender1 from '../assets/single/1.webp';
import lemongrass1 from '../assets/single/2.webp';
import sandalwood1 from '../assets/single/5.webp';
import original1 from '../assets/single/3.webp';
import jasmine1 from '../assets/single/4.webp';
import rose1 from '../assets/single/6.webp';
import originalLavender from '../assets/combo/1.webp';
import originalLemongrass from '../assets/combo/2.webp';
import originalSandalwood from '../assets/combo/3.webp';
import originalJasmine from '../assets/combo/4.webp';
import combo from '../assets/combo/5.webp';
import combo1 from '../assets/combo/6.webp';
import combo2 from '../assets/combo/7.webp';
import combo3 from '../assets/combo/8.webp';
import combo4 from '../assets/combo/9.webp';
import combo4Image from '../assets/combo/10.webp';
import banner from '../assets/banner6.webp';


const SinglePackSlider = ({ packs, flavorImages, flavorMRPs, flavorPrices }) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-10">
      <Swiper
        navigation
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full"
      >
        {packs.map(([flavor], idx) => {
          const image = flavorImages[flavor][0];
          const price = flavorPrices[flavor];
          const mrp = flavorMRPs[flavor];

          return (
            <SwiperSlide key={idx}>
              <div className="bg-white h-full flex flex-col">
                {/* Product Image */}
                <div className="relative w-full overflow-hidden mb-3">
                  <img
                    src={image}
                    alt={flavor}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className='p-5'>
                  
                  {/* Title */}
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    {flavor} Camphor Cone
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 text-xs mb-2">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                      100% Organic
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Safe for Kids
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      New Launch
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="line-through text-sm text-gray-400">
                      ₹{mrp}
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      ₹{price}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm mb-4">
                    <span className="text-gray-600">Pack:</span>
                    {[1, 2, 3].map((count) => (
                      <button
                        key={count}
                        className="w-7 h-7 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-500 text-gray-600 text-sm font-medium"
                      >
                        {count}
                      </button>
                    ))}
                  </div>

                  {/* Add to Cart */}
                  <button className="bg-blue-600  text-white text-sm font-medium p-2 rounded-lg hover:bg-blue-700 transition mt-auto"
                    onClick={() => {
                      let cart = JSON.parse(localStorage.getItem('cart')) || [];
                      cart.push({ name: flavor, price, combo: [flavor], id: Date.now() });
                      localStorage.setItem('cart', JSON.stringify(cart));
                      window.dispatchEvent(new CustomEvent('cartUpdated'));
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};



const REVIEWS = [
  "⭐⭐⭐⭐⭐\n\n“Keeps my wardrobe fresh for weeks!”",
  "⭐⭐⭐⭐⭐\n\n“Loved the surprise tester flavour!”",
  "⭐⭐⭐⭐⭐\n\n“No chemicals — perfect for kids’ rooms.”",
];

const SLIDE_TIME = 3500; // 3.5 seconds per review

const ReviewsSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, SLIDE_TIME);

    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="w-full max-w-md mx-auto text-center text-gray-800 my-8 p-4">
      <p className="whitespace-pre-line text-lg font-medium">{REVIEWS[current]}</p>
    </div>
  );
};


const PromoBanner2 = () => {
  return (
    <div className="w-full text-black py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap text-sm sm:text-base font-semibold tracking-wide">
        <span className="mx-10"> 🌿 100% Natural Camphor</span>
        <span className="mx-10"> 👨‍👩‍👧‍👦 Safe for Family & Pets </span>
        <span className="mx-10"> 🚫 No Chemicals </span>
        <span className="mx-10"> ⏳ Long-Lasting Freshness</span>
        <span className="mx-10"> 🌿 100% Natural Camphor</span>
        <span className="mx-10"> 👨‍👩‍👧‍👦 Safe for Family & Pets</span>
        <span className="mx-10"> 🚫 No Chemicals</span>
        <span className="mx-10"> ⏳ Long-Lasting Freshness</span>
        <span className="mx-10"> 🌿 100% Natural Camphor</span>
        <span className="mx-10"> 👨‍👩‍👧‍👦 Safe for Family & Pets </span>
        <span className="mx-10"> 🚫 No Chemicals </span>
        <span className="mx-10"> ⏳ Long-Lasting Freshness</span>
        <span className="mx-10"> 🌿 100% Natural Camphor</span>
        <span className="mx-10"> 👨‍👩‍👧‍👦 Safe for Family & Pets</span>
        <span className="mx-10"> 🚫 No Chemicals</span>
        <span className="mx-10"> ⏳ Long-Lasting Freshness</span>
      </div>
    </div>
  );
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
    <div id="new" className="">
      <img src={banner} alt="Special Combo Offer" className="w-full" />
      <div className=''>
        {/* Content */}
        <div className="md:w-full text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#5d3c77] mb-4">
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
  Rose: [rose1, rose1],
};

const flavorPrices = {
  Lavender: 199,
  Lemongrass: 199,
  Sandalwood: 199,
  Original: 199,
  Jasmine: 199,
  Rose: 199,
};

const flavorMRPs = {
  Lavender: 599,
  Lemongrass: 599,
  Sandalwood: 599,
  Original: 699,
  Jasmine: 649,
  Rose: 649,
};

const flavors = Object.keys(flavorImages);

const generateCards = (packs) => {
  return packs.map((combo, index) => {
    const name = combo.join(' + ');
    // Set fixed price for combo of 2, otherwise calculate normally
    const price = combo.length === 2 ? 399 : combo.reduce((total, f) => total + flavorPrices[f], 0);
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

const ComboPackSlider = ({ packs, flavorImages, flavorPrices, flavorMRPs }) => (
  <div className="w-full px-4 py-5">
    <Swiper
      navigation
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      loop
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      className="w-full"
    >
      {packs.map((combo, idx) => {
        const name = combo.join(' + ');
        const price = combo.length === 2 ? 399 : combo.reduce((t, f) => t + flavorPrices[f], 0);
        const mrp = combo.reduce((t, f) => t + flavorMRPs[f], 0);
        let displayImage;

        if (combo.length === 3) {
          displayImage = threePackImages[name] || flavorImages[combo[0]];
        } else if (combo.length === 2) {
          displayImage = comboImages[name] || flavorImages[combo[0]];
        } else {
          displayImage = flavorImages[combo[0]];
        }

        return (
          <SwiperSlide key={idx}>
            <div className="bg-white h-full flex flex-col shadow-lg rounded-2xl overflow-hidden">
              <div className="relative w-full overflow-hidden mb-3">
                <img
                  src={displayImage[0]}
                  alt={name}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className='p-5 flex flex-col flex-1'>
                <h3 className="text-sm font-semibold text-gray-700 mb-1 text-center">
                  {name} Combo
                </h3>
                <div className="flex items-center space-x-2 justify-center mb-2">
                  <span className="line-through text-sm text-gray-400">₹{mrp}</span>
                  <span className="text-lg font-bold text-green-600">₹{price}</span>
                </div>
                <button
                  onClick={() => {
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    cart.push({ name, price, combo, id: Date.now() });
                    localStorage.setItem('cart', JSON.stringify(cart));
                    window.dispatchEvent(new CustomEvent('cartUpdated'));
                  }}
                  className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 mt-auto transition"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  </div>
);


const DisplayCards = () => {
  const navigate = useNavigate();
  const [stockLeft, setStockLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [showMoreSingles, setShowMoreSingles] = useState(false);
  const [showMoreCombos, setShowMoreCombos] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [selectedFlavors, setSelectedFlavors] = useState([]);

  const handleBuyNowCombo = (selected) => {
    if (!selected.length) return;
    // Calculate price based on selection
    const comboPrice = selected.reduce((total, flavor) => total + flavorPrices[flavor], 0);
    const comboMRP = selected.reduce((total, flavor) => total + flavorMRPs[flavor], 0);

    const comboItem = {
      name: `Combo of ${selected.length} (${selected.join(', ')})`,
      price: comboPrice,
      mrp: comboMRP,
      combo: selected,
      id: Date.now(),
      quantity: 1
    };

    localStorage.setItem('cart', JSON.stringify([comboItem]));
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    const orderDetails = {
      productName: comboItem.name,
      quantity: 1,
      fragrances: selected,
      pricePerUnit: comboPrice,
      totalAmount: comboPrice,
      mainImage: combo4Image // Or another relevant image
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

  const handleScroll = () => {
    const section = document.getElementById('products');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    // Show popup only once when visible for the first time
    if (isVisible && !popupShown) {
      setShowPopup(true);
      setPopupShown(true);  // Mark popup as shown
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [popupShown]);

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

  // Prepare data for each category
  const singlePacks = [['Original'], ['Lavender'], ['Lemongrass'], ['Sandalwood'], ['Jasmine'], ['Rose']];
  const mixedCombos = [
    [flavors[3], flavors[0]],
    [flavors[3], flavors[1]],
    [flavors[3], flavors[2]],
    [flavors[3], flavors[4]],
    ['Lavender', 'Original', 'Lemongrass'],
    ['Original', 'Sandalwood', 'Jasmine'],
    ['Sandalwood', 'Original', 'Lavender'],
    ['Original', 'Jasmine', 'Lemongrass'],
    ['Original', 'Jasmine', 'Lavender'],
  ];

  return (
    <div id="products" className="overflow-hidden p-6 bg-gradient-to-br from-purple-50 to-blue-50">

    {showPopup && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        onClick={() => setShowPopup(false)} // Clicking outside closes popup
        role="dialog"
        aria-modal="true"
      >
        <div
          className="bg-white border border-purple-300 shadow-xl p-6 rounded-2xl max-w-sm w-full relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside popup
        >
          <h2 className="text-[#5d3c77] font-bold text-lg mb-4">Select Your Combo</h2>
          <p className="text-sm text-gray-700 mb-4">
            Mix and match your favourite fragrances
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {flavors.map((flavor) => (
              <button
                key={flavor}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  selectedFlavors.includes(flavor)
                    ? 'bg-[#5d3c77] text-white border-[#5d3c77]'
                    : 'bg-white text-[#5d3c77] border-[#5d3c77]'
                }`}
                onClick={() => {
                  setSelectedFlavors((prev) =>
                    prev.includes(flavor)
                      ? prev.filter((f) => f !== flavor)
                      : [...prev, flavor]
                  );
                }}
                type="button"
              >
                {flavor}
              </button>
            ))}
          </div>
          <button
            className={`text-sm w-full px-4 py-2 rounded-full font-medium mb-3 ${
              selectedFlavors.length
                ? 'bg-[#5d3c77] text-white hover:bg-[#472c5d]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => handleBuyNowCombo(selectedFlavors)}
            disabled={selectedFlavors.length === 0}
            type="button"
          >
            Buy Now
          </button>
          <button
            className="text-sm w-full px-4 py-2 rounded-full font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => setShowPopup(false)}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    )}


      {/* Heading */}
      <div>
        <h2 className="text-5xl font-extrabold text-center mb-3 text-[#5d3c77] tracking-tight leading-tight">
          Bring Home Natural Freshness
        </h2>
        <h3 className="text-lg font-medium text-center text-gray-600">
          Get our best-selling Camph Air Pack + FREE Tester — Only for early birds!
        </h3>

      </div>

      <div>
        {/* <h2 className="text-2xl font-bold text-center mb-6 text-[#5d3c77]">Single Pack</h2> */}
        <SinglePackSlider
            packs={singlePacks}
            flavorImages={flavorImages}
            flavorPrices={flavorPrices}
            flavorMRPs={flavorMRPs}
        />
      </div>
      <PromoBanner2 />


      {/* Combo Mix */}
      <div>
        <h2 className="text-3xl font-bold text-center my-6">Aroma Duo/Trio</h2>
        <h3 className="text-lg font-medium text-center text-gray-600">
          Experience our refreshing aroma. Every first pack comes with a free 30g tester in a surprise scent!
        </h3>
        <div className="">
          <ComboPackSlider
            packs={mixedCombos.filter((c) => c.length === 2)}
            flavorImages={flavorImages}
            flavorPrices={flavorPrices}
            flavorMRPs={flavorMRPs}
          />
        </div>
        <div className="">
          <ComboPackSlider
            packs={mixedCombos.filter((c) => c.length === 3)}
            flavorImages={flavorImages}
            flavorPrices={flavorPrices}
            flavorMRPs={flavorMRPs}
          />
        </div>
        {mixedCombos.length > 9 && (
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
      <ReviewsSlider />
      {/* Special Combo of 4 Section */}
      <div>
        <SpecialComboOffer navigate={navigate} />
      </div>
    </div>
  );
};

export default DisplayCards;
