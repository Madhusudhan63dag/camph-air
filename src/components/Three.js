import React from 'react';
import Slider from 'react-slick';
import lavenderImg from '../assets/combo/12.webp';
import jasmineImg from '../assets/combo/14.webp';
import lemongrassImg from '../assets/combo/11.webp';
import sandalwoodImg from '../assets/combo/13.webp';
import originalImg from '../assets/combo/15.webp';

const fragranceDetails = [
  {
    name: 'Lavender',
    description: 'Step into serenity with the timeless power of Lavender. Scientifically shown to ease anxiety and enhance relaxation, this beloved floral aroma transforms your space in seconds.                                                       ',
    image: lavenderImg,
    color: 'from-purple-200 via-purple-50 to-white',
    border: 'border-violet-200',
    shadow: 'shadow-purple-200/50',
  },
  {
    name: 'Jasmine',
    description: 'Evoke elegance with the timeless allure of Jasmine — a fragrance long associated with romance, charm, and inner confidence. This sweet, floral aroma doesn’t just smell divine; it stimulates joy and serenity at a subconscious level.',
    image: jasmineImg,
    color: 'from-pink-200 via-pink-50 to-white',
    border: 'border-pink-200',
    shadow: 'shadow-pink-200/40',
  },
  {
    name: 'Lemongrass',
    description: 'Vibrant and zesty, Lemongrass awakens the senses and revitalizes your space instantly. Known for its sharp citrus notes and uplifting energy, this fragrance is perfect for spaces that need clarity and freshness.                    ',
    image: lemongrassImg,
    color: 'from-yellow-200 via-green-50 to-white',
    border: 'border-yellow-200',
    shadow: 'shadow-yellow-200/50',
  },
  {
    name: 'Sandalwood',
    description: 'Ground your energy and awaken your spirit with the sacred warmth of Sandalwood. Revered in ancient rituals for its spiritual depth, this rich, woody aroma brings a sense of inner peace and rootedness to any space.                  ',
    image: sandalwoodImg,
    color: 'from-orange-200 via-yellow-50 to-white',
    border: 'border-orange-200',
    shadow: 'shadow-orange-200/50',
  },
  {
    name: 'Original',
    description: 'Experience purity in its truest form. Our Original camphor scent is clean, crisp, and deeply refreshing — like a spiritual reset button for your space.                                                                                ',
    image: originalImg,
    color: 'from-gray-200 via-gray-50 to-white',
    border: 'border-gray-200',
    shadow: 'shadow-gray-200/40',
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: fragranceDetails.length,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 8000,
  centerMode: false,
  adaptiveHeight: true,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: Math.min(fragranceDetails.length, 3),
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


const FragranceCarousel = () => (
  <Slider {...sliderSettings}>
    {fragranceDetails.map((item) => (
      <div key={item.name} className="px-5 overflow-hidden py-12">
        <div
          className={`relative bg-gradient-to-br ${item.color} border ${item.border} ${item.shadow} rounded-3xl group hover:scale-105 transition-transform duration-300`}
        >
          {/* Decorative Circle */}
          <span 
            className="absolute -top-8 -right-8 w-40 h-32 bg-opacity-20 bg-white rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          {/* Product Image */}
          <div className="flex justify-center items-center mb-6">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover rounded-2xl border-2 border-white"
              style={{
                boxShadow: '0 10px 30px rgba(120,120,120,0.11)',
                background: 'rgba(255,255,255,0.4)',
              }}
            />
          </div>
          <h3 className="text-3xl font-extrabold text-[#5d3c77] mb-4 tracking-tight text-center drop-shadow-sm">
            {item.name}
          </h3>
          {/* <p className="text-gray-700 text-lg leading-relaxed font-medium text-center px-3">
            {item.description} 
          </p> */}
          {/* Subtle Glow on Hover */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-15 bg-white pointer-events-none transition-opacity duration-300" />
        </div>
      </div>
    ))}
  </Slider>
);

export default FragranceCarousel;

