import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const ModernHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Modern animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/30 to-purple-950/20" />
        
        {/* Floating orbs */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, hsl(${220 + i * 10}, 80%, 60%) 0%, transparent 70%)`,
              width: `${60 + Math.random() * 120}px`,
              height: `${60 + Math.random() * 120}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Interactive cursor effect */}
        <motion.div
          className="absolute w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
            left: mousePosition.x - 160,
            top: mousePosition.y - 160,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white">Next-Gen Digital Solutions</span>
            <Zap className="w-4 h-4 text-accent" />
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 leading-tight"
          >
            <span className="text-white">Craft Your</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              Digital Future
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We create stunning digital experiences that captivate audiences and drive results. 
            From AI-powered solutions to immersive designs.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              className="button-primary group flex items-center gap-2 px-8 py-4 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.dispatchEvent(new Event('openWhatsApp'))}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.a
              href="#services"
              className="button-secondary flex items-center gap-2 px-8 py-4 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Services
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
        >
          {[
            { label: 'Projects Completed', value: '100+' },
            { label: 'Happy Clients', value: '50+' },
            { label: 'Success Rate', value: '99%' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm text-gray-400 mb-3">Discover More</span>
          <motion.div
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernHero;