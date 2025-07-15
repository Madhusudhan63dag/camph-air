import React from 'react';
import lavenderImg from '../assets/28.webp';
import roseImg from '../assets/28.webp';
import lemongrassImg from '../assets/28.webp';
import sandalwoodImg from '../assets/28.webp';
import originalImg from '../assets/28.webp';

const fragranceDetails = [
  {
    name: 'Lavender',
    description: `Lavender is nature’s answer to stress and sleeplessness. Its soft floral aroma has been cherished for centuries for its calming and grounding effects. Our Lavender fragrance is perfect for creating a peaceful atmosphere in bedrooms, meditation spaces, or work-from-home setups.
                  Used in our camphor-based air freshener product, it transforms your space into a sanctuary. Just a few drops fill the room with a gentle, soothing vibe that promotes deeper sleep and reduces anxiety. Ideal for those who crave calm at the end of a busy day.`,
    image: lavenderImg,
    color: 'from-purple-100 to-purple-50',
  },
  {
    name: 'Rose',
    description: `The Rose fragrance exudes romance, luxury, and timeless beauty. Its sweet floral profile isn’t just pleasing to the senses — it also uplifts the mood and subtly enhances confidence. A staple in perfumes and personal care, our version is soft, balanced, and refreshing.
                  Paired with the purifying essence of camphor, our Rose blend offers a double benefit: it refreshes the air and creates a sophisticated ambiance. Perfect for living rooms, vanity areas, or romantic evenings — this is elegance in a bottle.`,

    image: roseImg,
    color: 'from-pink-100 to-pink-50',
  },
  {
    name: 'Lemongrass',
    description:
      'Crisp, citrusy and refreshing — perfect for kitchens and bathrooms. Also helps repel mosquitoes naturally.',
    image: lemongrassImg,
    color: 'from-green-100 to-yellow-50',
  },
  {
    name: 'Sandalwood',
    description:
      'A warm, woody fragrance traditionally used in spiritual spaces. Brings peace and a grounded energy.',
    image: sandalwoodImg,
    color: 'from-yellow-100 to-orange-50',
  },
  {
    name: 'Original',
    description:
      'Pure camphor scent — strong and clean. Best for pooja rooms, wardrobes, or areas needing purification.',
    image: originalImg,
    color: 'from-gray-100 to-white',
  },
];

const Three = () => {
  return (
    <section
      id="fragrances"
      className="w-full py-16 px-4 md:px-12 lg:px-20 bg-gradient-to-b from-[#f6f1df] to-[#f0f9f7]"
    >
      <h2 className="text-3xl font-bold text-center text-[#5d3c77] mb-12">
        Discover Our Fragrance Types
      </h2>

      {/* First Two - Feature Rows */}
      {/* LAVENDER */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={lavenderImg}
              alt="Lavender"
              className="w-[300px] md:w-[450px] lg:w-[500px] rounded-2xl shadow-2xl"
            />
          </div>
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#5d3c77] mb-1">Lavender</h3>
              <h4 className="text-lg font-semibold text-gray-600 mb-5">For Deep Calm & Restful Nights</h4>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Lavender has long been prized for its ability to calm the nervous system, quiet the mind,
                and promote restorative sleep. Our lavender-infused camphor fragrance blends traditional
                therapeutic properties with modern air-purifying benefits — perfect for stress relief after
                a long day.
                <br />
                <br />
                Whether you're winding down in the bedroom, meditating, or creating a peaceful environment
                for your family, a touch of Lavender elevates the mood and brings serenity. The fragrance
                lingers gently without overwhelming your senses, making it ideal for daily use.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Reduces stress and anxiety naturally</li>
                <li>Improves sleep quality and relaxation</li>
                <li>Perfect for bedrooms, study zones, or workspaces</li>
                <li>Combines camphor’s purification with calming floral notes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ROSE */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-20">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={roseImg}
              alt="Rose"
              className="w-[300px] md:w-[450px] lg:w-[500px] rounded-2xl shadow-2xl"
            />
          </div>
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#5d3c77] mb-1">Rose</h3>
              <h4 className="text-lg font-semibold text-gray-600 mb-5">For Romance, Elegance & Uplifted Moods</h4>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                The timeless scent of Rose is more than just beautiful — it's emotionally powerful. Known
                for boosting confidence and reducing tension, our Rose fragrance adds charm and warmth to
                your space. When blended with pure camphor, it becomes a dual-action air freshener that both
                soothes and purifies.
                <br />
                <br />
                Ideal for living rooms, vanity spaces, or a romantic evening setting — it turns ordinary
                moments into luxurious rituals. The scent unfolds slowly, staying light and refreshing.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Symbol of elegance, love, and confidence</li>
                <li>Soft yet long-lasting — perfect for daily refresh</li>
                <li>Best for living areas, gifting, or date nights</li>
                <li>Infused with natural camphor for a cleaner atmosphere</li>
              </ul>
            </div>
          </div>
        </div>



      {/* Remaining - Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {fragranceDetails.slice(2).map((item) => (
          <div
            key={item.name}
            className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-contain rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-[#5d3c77] mb-2">
              {item.name}
            </h3>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Three;
