import { AnimatePresence } from 'framer-motion'
import React, { useRef, useState } from 'react'

const ImageSlider = ({images}) => {

    //   const images = [ event1, event2, event3];
    //   const videos = [banner2, test2, test4];
    
      const [bannerIdx, setBannerIdx] = useState(0)
    const bannerDragStart = useRef(null)
    
    const handleBannerTouchStart = (e) => { bannerDragStart.current = e.touches[0].clientX }
    const handleBannerTouchEnd = (e) => {
      if (bannerDragStart.current === null) return
      const diff = bannerDragStart.current - e.changedTouches[0].clientX
      if (Math.abs(diff) > 40) {
        if (diff > 0) setBannerIdx((p) => (p + 1) % images.length)
        else setBannerIdx((p) => (p - 1 + images.length) % images.length)
      }
      bannerDragStart.current = null
    }
  return (
    <div
          className='block sm:hidden mt-4 relative overflow-hidden'
          onTouchStart={handleBannerTouchStart}
          onTouchEnd={handleBannerTouchEnd}
        >
      <AnimatePresence mode='wait'>
        <img
          key={bannerIdx}
          src={images[bannerIdx]}
          alt={`slide-${bannerIdx}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}    
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className='w-full object-cover'     
        />
      </AnimatePresence>

          {/* Dots */}
          <div className='flex justify-center gap-2 mt-3'>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setBannerIdx(i)}
                style={{
                  width: bannerIdx === i ? 20 : 8,
                  height: 8,
                  borderRadius: 99,
                  background: bannerIdx === i ? '#31BBD0' : '#00000033',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
  )
}

export default ImageSlider