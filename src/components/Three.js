import React from 'react';
import lavenderImg from '../assets/combo/12.webp';
import jasmineImg from '../assets/combo/14.webp';
import lemongrassImg from '../assets/combo/14.webp';
import sandalwoodImg from '../assets/combo/13.webp';
import originalImg from '../assets/combo/15.webp';

const fragranceDetails = [
  {
    name: 'Lavender',
    description: `Step into serenity with the timeless power of Lavender. Scientifically shown to ease anxiety and enhance relaxation, this beloved floral aroma transforms your space in seconds. Infused into our premium camphor cone, Lavender doesn’t just mask odors — it resets your mood.

    Designed for those seeking balance in a chaotic world, our Lavender fragrance taps into your brain’s natural relaxation centers, promoting better sleep, sharper focus, and emotional calm. Whether it’s your bedroom, workspace, or meditation corner, every breath brings you closer to peace.

    With just a few drops, experience an environment that feels like a warm hug. Breathe better, sleep deeper, and feel lighter — every single day.`,
    image: lavenderImg,
    color: 'from-purple-100 to-purple-50',
  },
  {
    name: 'Jasmine',
    description: `Evoke elegance with the timeless allure of Jasmine — a fragrance long associated with romance, charm, and inner confidence. This sweet, floral aroma doesn’t just smell divine; it stimulates joy and serenity at a subconscious level.

    Blended with the air-purifying power of camphor, our Jasmine variant refreshes your surroundings while creating an atmosphere of luxurious calm. Whether you're hosting guests, enjoying a self-care ritual, or setting the mood for a romantic evening — Jasmine adds that graceful, magnetic touch that lingers.`,
    image: jasmineImg,
    color: 'from-pink-100 to-pink-50',
  },
  {
    name: 'Lemongrass',
    description: `Vibrant and zesty, Lemongrass awakens the senses and revitalizes your space instantly. Known for its sharp citrus notes and uplifting energy, this fragrance is perfect for spaces that need clarity and freshness.

    More than just a mood-lifter, Lemongrass also serves a functional purpose — its natural mosquito-repelling properties make it ideal for kitchens, bathrooms, and entryways. Experience freshness with purpose — clean air, clear mind.`,
    image: lemongrassImg,
    color: 'from-green-100 to-yellow-50',
  },
  {
    name: 'Sandalwood',
    description: `Ground your energy and awaken your spirit with the sacred warmth of Sandalwood. Revered in ancient rituals for its spiritual depth, this rich, woody aroma brings a sense of inner peace and rootedness to any space.

    When paired with camphor’s cleansing essence, Sandalwood becomes the perfect companion for meditation, prayer, or introspection. Ideal for pooja rooms, reading corners, or any place where you seek silence, stillness, and soulful connection.`,
    image: sandalwoodImg,
    color: 'from-yellow-100 to-orange-50',
  },
  {
    name: 'Original',
    description: `Experience purity in its truest form. Our Original camphor scent is clean, crisp, and deeply refreshing — like a spiritual reset button for your space.

    Traditionally used in pooja rituals, camphor is known to cleanse not just the air but also the energy around you. It’s a natural purifier and a powerful deodorizer. Perfect for wardrobes, sacred spaces, or anywhere that needs a fresh, invigorating uplift with zero compromise.`,
    image: originalImg,
    color: 'from-gray-100 to-white',
  }

];

const Three = () => {
  return (
    <section
      id="flavours"
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
              <h4 className="text-lg font-semibold text-gray-600 mb-5">
                For Deep Calm, Better Sleep & Stress-Free Evenings
              </h4>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Let the calming essence of Lavender transform your space into a serene sanctuary.
                Loved for its soothing effects on the mind and body, Lavender helps release daily
                stress, ease anxious thoughts, and promote restorative sleep.
                <br />
                <br />
                Our camphor-infused Lavender cone does more than just smell beautiful — it
                subconsciously signals your brain to relax. Ideal for bedrooms, meditation zones,
                or work-from-home setups, it enhances your atmosphere while purifying the air.
                Experience a fragrance that gently resets your mood, one breath at a time.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Calms the nervous system and quiets the mind</li>
                <li>Encourages restful sleep and emotional balance</li>
                <li>Ideal for bedrooms, meditation corners, and reading nooks</li>
                <li>Combines calming floral notes with camphor’s cleansing power</li>
              </ul>
            </div>
          </div>
        </div>


        {/* JASMINE */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-20">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={jasmineImg}
              alt="Jasmine"
              className="w-[300px] md:w-[450px] lg:w-[500px] rounded-2xl shadow-2xl"
            />
          </div>
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#5d3c77] mb-1">Jasmine</h3>
              <h4 className="text-lg font-semibold text-gray-600 mb-5">
                For Romance, Luxury & Emotional Elevation
              </h4>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Indulge in the romantic charm of Jasmine — a fragrance known to uplift the spirit,
                spark joy, and stir subtle confidence. It has long been a symbol of elegance and
                femininity, and now it’s blended with the cleansing power of camphor to elevate your space.
                <br />
                <br />
                Whether you're hosting, pampering yourself, or setting the mood for a special evening,
                Jasmine adds a soft, luxurious vibe that stays light on the senses yet lingers beautifully.
                Every breath feels like a delicate floral hug.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Enhances mood, confidence, and emotional connection</li>
                <li>Sweet, soothing, and sophisticated floral profile</li>
                <li>Perfect for vanity spaces, living rooms, or romantic setups</li>
                <li>Blends jasmine’s elegance with camphor’s natural purity</li>
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
