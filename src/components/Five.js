import React from 'react';

const Five = () => {
  return (
    <section id="comparison" className="w-full py-16 px-4 md:px-12 lg:px-20 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5d3c77] mb-12 text-center">
          Discover the Power of Camphor with Camph Airr
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT: Product Info Table */}
          <div className="lg:w-1/2 w-full">
            <div className="overflow-hidden">
              <table className="w-full text-sm md:text-base">
                <tbody>
                  <tr className="border-b-[1px] border-black">
                    <td className="px-4 py-3 font-semibold w-1/3">Brand</td>
                    <td className="px-4 py-3">Camph Airr</td>
                  </tr>
                  <tr className="border-b-[1px] border-black">
                    <td className="px-4 py-3 font-semibold">Type</td>
                    <td className="px-4 py-3">Camphor-Based Fragrance Oil</td>
                  </tr>
                  <tr className="border-b-[1px] border-black">
                    <td className="px-4 py-3 font-semibold">Fragrance Options</td>
                    <td className="px-4 py-3">Lavender, Jasmine, Lemongrass, Sandalwood, Original</td>
                  </tr>
                  <tr className="border-b-[1px] border-black">
                    <td className="px-4 py-3 font-semibold">Primary Ingredient</td>
                    <td className="px-4 py-3">100% Natural Camphor & Essential Oils</td>
                  </tr>
                  <tr className="border-b-[1px] border-black">
                    <td className="px-4 py-3 font-semibold">Quantity</td>
                    <td className="px-4 py-3">1 pack</td>
                  </tr>
                  <tr className="border-b-[1px] border-black">
                    <td className="px-4 py-3 font-semibold">Usage Method</td>
                    <td className="px-4 py-3">ust open the pack and place it in your desired spot — no mixing, no mess.</td>
                  </tr>
                  <tr className="border-b-[1px] border-black">
                    <td className="px-4 py-3 font-semibold">Shelf Life</td>
                    <td className="px-4 py-3">45 days</td>
                  </tr>
                  <tr className="border-b-[1px] border-black">
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
              <h3 className="text-2xl font-bold text-[#5d3c77] mb-4">
                What Makes Camph Airr Special?
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Camph Airr is inspired by the pure essence of camphor—a natural aromatic known for its air-purifying, calming, and revitalizing properties. Revered for generations, camphor cleanses environments, dispels negativity, and introduces a refreshing sense of clarity and tranquility into any space.
                <br /><br />
                Its gentle fragrance not only uplifts your mood but also helps maintain a clean and serene atmosphere throughout your home, workspace, or sacred places. Free from harsh additives, Camph Airr brings the authentic power of camphor into daily living for true well-being and peace of mind.
              </p>
            </div>

            {/* Where to Use */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#5d3c77] mb-3">
                Perfect for Every Corner of Your Life
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Light, versatile, and incredibly soothing — here’s where Camph Airr truly shines:
              </p>
              <ul className="list-disc list-inside mt-3 text-gray-600 text-sm md:text-base space-y-1">
                <li>Bedrooms – unwind and drift into peaceful sleep</li>
                <li>Pooja Rooms – purify energy and invite spiritual calm</li>
                <li>Living Rooms – elevate mood and maintain freshness</li>
                <li>Cars – eliminate odors and uplift your drive</li>
                <li>Wardrobes – keep your clothes smelling crisp & clean</li>
                <li>Bathrooms – a natural refresh without synthetic sprays</li>
              </ul>
            </div>

            {/* Bonus Content */}
            <div>
              <h3 className="text-xl font-semibold text-[#5d3c77] mb-3">
                Why Choose Camph Airr?
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Unlike artificial sprays that fade fast or irritate the senses, Camph Airr delivers
                a slow-releasing, emotionally grounding fragrance. It’s compact, travel-ready, and
                beautifully packaged — making it a wonderful self-care gift or home essential.
                <br /><br />
                Feel the difference that real purity makes. One drop is all it takes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Five;
