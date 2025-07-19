import React from 'react';
import Slider from 'react-slick';
import originalImg from '../assets/single/3.webp';
import jasmineImg from '../assets/single/4.webp';
import lemongrassImg from '../assets/single/2.webp';
import sandalwoodImg from '../assets/single/5.webp';

const reviews = [
  {
    name: 'Arun Prabhu',
    location: 'Chennai, Tamil Nadu',
    review: 'The Original camphor scent instantly reminds me of spiritual mornings at home. I just opened the pack and placed it near my pooja area – so simple and powerful.',
    image: originalImg,
    product: 'Original Fragrance',
    stars: 5,
  },
  {
    name: 'Meera Rajan',
    location: 'Coimbatore, Tamil Nadu',
    review: 'Jasmine has this soft floral feel that lingers in my vanity area. The scent is not overwhelming, and the camphor undertone keeps the space fresh and clean.',
    image: jasmineImg,
    product: 'Jasmine Fragrance',
    stars: 5,
  },
  {
    name: 'Kavitha Shree',
    location: 'Hyderabad, Telangana',
    review: 'Sandalwood is such a grounding fragrance. I placed it in my meditation corner and it truly enhances the peace of the space. It’s lasting and authentic.',
    image: sandalwoodImg,
    product: 'Sandalwood Fragrance',
    stars: 5,
  },
  {
    name: 'Vishnu Reddy',
    location: 'Vijayawada, Andhra Pradesh',
    review: 'I ordered the original camphor for my bedroom. Every time I enter, I get a refreshing wave of purity. Also, my clothes don’t smell musty anymore! feel fresh and clean.',
    image: originalImg,
    product: 'Original Fragrance',
    stars: 5,
  },
];

const Six = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    variableWidth: true,
    arrows: false,
  };

  const renderStars = (count) => {
    return (
      <div className="flex space-x-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.284 3.946a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.284 3.946c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.785.57-1.84-.197-1.54-1.118l1.284-3.946a1 1 0 00-.364-1.118L2.07 9.373c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.284-3.946z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-0 md:py-16">
      <div className="">
        {/* <h2 className="text-3xl font-bold text-center text-[#5d3c77] mb-12">
          What Our South Indian Customers Are Saying
        </h2> */}

        <Slider {...settings}>
          {reviews.map((review, idx) => (
            <div key={idx} className="pr-4">
              <div className="w-[360px] bg-white rounded-xl shadow-md border border-gray-200 p-5">
                {/* Header */}
                <div className="flex items-center mb-3">
                  <div className="bg-[#5d3c77] text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold text-lg">
                    {review.name[0]}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-bold text-[#5d3c77]">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>

                {/* Stars */}
                {renderStars(review.stars)}

                {/* Review text */}
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">"{review.review}"</p>

                {/* Product image + name */}
                {/* <div className="flex flex-col items-start mt-4">
                    <div>
                        <p className="text-xs text-gray-500">Purchased:</p>
                        <p className="text-sm font-medium text-gray-800">{review.product}</p>
                    </div>
                    <img
                        src={review.image}
                        alt={review.product}
                        className="w-full object-cover "
                    />
                </div> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Six;
