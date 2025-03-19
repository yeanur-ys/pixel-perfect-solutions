
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideshowProps {
  images: string[];
  interval?: number;
}

const Slideshow = ({ images, interval = 4000 }: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(new Array(images.length).fill(false));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, images.length, interval]);

  const handleImageLoad = (index: number) => {
    const newLoadedState = [...isLoaded];
    newLoadedState[index] = true;
    setIsLoaded(newLoadedState);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Low quality placeholder with blur effect (shown while loading) */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
          />
          
          {/* High quality image */}
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isLoaded[currentIndex] ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(currentIndex)}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
