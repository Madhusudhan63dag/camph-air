// ComboSlider.js
import React, { useState, useEffect } from 'react';

const SLIDE_DURATION = 400;
const PAUSE_DURATION = 4000;

export default function ComboSlider({ combos, flavorImages, flavorPrices, flavorMRPs }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [nextIdx, setNextIdx] = useState(1);
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const next = (current + 1) % combos.length;
      setNextIdx(next);
      setPhase('exit');
      setAnimating(true);

      setTimeout(() => {
        setCurrent(next);
        setPhase('enter');
        setTimeout(() => {
          setAnimating(false);
          setPhase('idle');
        }, SLIDE_DURATION);
      }, SLIDE_DURATION);
    }, PAUSE_DURATION);

    return () => clearTimeout(timeout);
  }, [current, combos.length]);

  const cardClasses = `w-72 sm:w-64 md:w-60 lg:w-64 xl:w-72 shrink-0 rounded-2xl border bg-white shadow-md overflow-hidden transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg`;

  return (
    <div className="relative w-full overflow-hidden px-2 py-6">
      <div className="flex items-center justify-center gap-6 transition-all duration-500 ease-in-out">
        {[combos[current]].map((combo, index) => {
          const comboName = combo.join(' + ');
          const price = combo.reduce((sum, f) => sum + flavorPrices[f], 0);
          const mrp = combo.reduce((sum, f) => sum + flavorMRPs[f], 0);

          return (
            <div key={index} className={cardClasses}>
              <div className="relative h-48">
                <img
                  src={flavorImages[combo[0]]}
                  alt={comboName}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 hover:opacity-0"
                />
                {combo[1] && (
                  <img
                    src={flavorImages[combo[1]]}
                    alt="Second"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100"
                  />
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-1 text-center text-[#5d3c77]">{comboName}</h4>
                <p className="text-center">
                  <span className="text-gray-400 line-through mr-2">₹{mrp}</span>
                  <span className="font-bold text-[#5d3c77]">₹{price}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
