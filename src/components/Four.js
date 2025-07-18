import React from 'react'
import image from '../assets/banner2.webp'
import banner4Mobile from '../assets/banner4-mobile.webp';

const Four = () => {
  return (
    <div id="usage">
      {/* Desktop version - hidden on mobile */}
      <img 
        src={image} 
        alt="Banner" 
        className="hidden md:block w-full h-auto"
      />
      
      {/* Mobile version - hidden on desktop */}
      <img 
        src={banner4Mobile} 
        alt="Banner Mobile" 
        className="block md:hidden w-full h-auto"
      />
    </div>
  )
}

export default Four