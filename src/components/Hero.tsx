
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-600"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 1}px`,
                height: `${Math.random() * 6 + 1}px`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `pulse-animation ${Math.random() * 4 + 3}s infinite alternate`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/40 to-black opacity-80" />
      </div>

      {/* Custom Cursor (only shown on desktop) */}
      <div className="hidden md:block">
        <motion.div
          className="cursor-dot"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            mass: 0.5
          }}
        />
        <motion.div
          className="cursor-outline"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: "spring",
            damping: 40,
            stiffness: 250,
            mass: 0.8
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        {/* Animated gradient circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(29,78,216,0.1) 50%, rgba(0,0,0,0) 70%)",
              width: "100vh",
              height: "100vh",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(30,64,175,0.4) 0%, rgba(30,58,138,0.1) 40%, rgba(0,0,0,0) 60%)",
              width: "70vh",
              height: "70vh",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-blue-600/10 text-blue-400 border border-blue-800/50 cursor-magnet"
          >
            Digital Excellence
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 text-white cursor-magnet"
          >
            Transform Your <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Digital Presence</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            We craft cutting-edge solutions to elevate your business in the digital world, 
            from stunning websites to AI innovations and captivating graphics.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              className="button-primary cursor-magnet"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.dispatchEvent(new Event('openWhatsApp'))}
            >
              Get Started
            </motion.button>
            <motion.a 
              href="#contact" 
              className="button-secondary cursor-magnet"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-magnet"
      >
        <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
        <div className="w-[30px] h-[50px] rounded-full border-2 border-gray-700 flex justify-center p-2">
          <motion.div 
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
