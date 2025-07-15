import React from 'react';

const Five = () => {
  return (
    <section className="w-full py-16 px-4 md:px-12 lg:px-20 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5d3c77] mb-12 text-center">
          All About Our Camphor-Based Fragrance Drops
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT: Product Info Table */}
          <div className="lg:w-1/2 w-full">
            <div className="border border-gray-200 shadow-md rounded-xl overflow-hidden">
              <table className="w-full text-sm md:text-base">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-3 font-semibold w-1/3">Brand</td>
                    <td className="px-4 py-3">Aroma Essence</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Type</td>
                    <td className="px-4 py-3">Camphor-Based Fragrance Oil</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-3 font-semibold">Fragrance Options</td>
                    <td className="px-4 py-3">Lavender, Rose, Lemongrass, Sandalwood, Original</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Form</td>
                    <td className="px-4 py-3">Liquid Drops</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-3 font-semibold">Primary Ingredient</td>
                    <td className="px-4 py-3">100% Natural Camphor & Essential Oils</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Quantity</td>
                    <td className="px-4 py-3">5 Bottles (10ml Each)</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-3 font-semibold">Usage Method</td>
                    <td className="px-4 py-3">Add 3–5 drops to diffuser, water bowl, cotton ball, or closet corner</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Shelf Life</td>
                    <td className="px-4 py-3">24 Months</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-3 font-semibold">Free From</td>
                    <td className="px-4 py-3">No Alcohol, No Artificial Chemicals</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT: Product Description */}
          <div className="lg:w-1/2 w-full flex flex-col justify-between">
            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#5d3c77] mb-3">
                Product Overview
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                This camphor-based fragrance solution combines traditional purification with modern aromatherapy.
                Each drop carries the essence of therapeutic essential oils — designed to cleanse the air,
                uplift your mood, and create a serene ambiance in any space.
              </p>
            </div>

            {/* Where to Use */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#5d3c77] mb-3">
                Where Can You Use It?
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                These drops are extremely versatile and can be used across various spaces in your home and life:
              </p>
              <ul className="list-disc list-inside mt-3 text-gray-600 text-sm md:text-base space-y-1">
                <li>Bedrooms – to promote relaxation and restful sleep</li>
                <li>Pooja Rooms – to purify the air and enhance spiritual energy</li>
                <li>Living Rooms – to keep the environment fresh and inviting</li>
                <li>Cars – to eliminate odors and freshen up your drive</li>
                <li>Wardrobes & Drawers – to prevent musty smells and maintain freshness</li>
                <li>Bathrooms – for a natural and subtle aromatic lift</li>
              </ul>
            </div>

            {/* Bonus Content */}
            <div>
              <h3 className="text-xl font-semibold text-[#5d3c77] mb-3">
                Why You'll Love It
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Unlike commercial sprays, our formula is made using only nature-derived ingredients.
                There's no harsh chemical smell — just the soft, long-lasting essence of real essential oils and camphor.
                It’s easy to use, travel-friendly, and makes for a thoughtful gift as well.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Five;
