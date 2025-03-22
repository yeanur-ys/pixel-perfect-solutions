
import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideshowProps {
  images: string[];
  interval?: number;
}

const Slideshow = memo(({ images, interval = 4000 }: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(new Array(images.length).fill(false));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize the reset timeout function
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Preload images for better performance
  useEffect(() => {
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setIsLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, [images]);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return resetTimeout;
  }, [currentIndex, images.length, interval, resetTimeout]);

  const handleImageLoad = useCallback((index: number) => {
    setIsLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

  // Memoize the click handler
  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Reduced animation time
          className="absolute inset-0"
        >
          {/* Low quality placeholder with blur effect (shown while loading) */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
          />
          
          {/* High quality image with optimized loading */}
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded[currentIndex] ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(currentIndex)}
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Controls - Optimized to avoid re-renders */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

Slideshow.displayName = 'Slideshow';

export default Slideshow;
