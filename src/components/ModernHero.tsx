import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Star, Rocket, Award } from 'lucide-react';

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-pink-100 to-rose-50">
      {/* Light baby pink animated background */}
      <div className="absolute inset-0">
        {/* Main gradient backdrop */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(248, 187, 217, 0.3) 0%, rgba(255, 255, 255, 0.1) 70%)'
          }}
        />
        
        {/* Floating particles with realistic physics */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(248, 187, 217, ${0.4 + Math.random() * 0.4}) 0%, transparent 70%)`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 15, 0],
              x: [0, 20 - Math.random() * 40, 0],
              scale: [1, 1.1 + Math.random() * 0.2, 1],
              opacity: [0.3, 0.7, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Interactive cursor glow effect */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(248, 187, 217, 0.2) 0%, transparent 70%)',
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Realistic light rays */}
        <div className="absolute inset-0 opacity-15">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full"
              style={{
                width: '1px',
                background: 'linear-gradient(to bottom, transparent, rgba(248, 187, 217, 0.4), transparent)',
                left: `${25 + i * 20}%`,
                transformOrigin: 'top center',
              }}
              animate={{
                rotate: [0, 1, -1, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Premium Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-3 px-8 py-4 mb-12 rounded-full glass-card border-2 border-white/20"
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-bold text-primary-foreground tracking-wide">PREMIUM DIGITAL EXPERIENCES</span>
            <Sparkles className="w-5 h-5 text-blue-400" />
          </motion.div>
          
          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight"
          >
            <span className="text-foreground">Crafting</span>
            <br />
            <span 
              className="bg-clip-text text-transparent font-extrabold"
              style={{
                background: 'linear-gradient(135deg, #f8bbd9 0%, #e91e63 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Digital Masterpieces
            </span>
          </motion.h1>
          
          {/* Compelling Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed font-light"
          >
            We create <span className="text-foreground font-semibold">hyperrealistic digital experiences</span> that captivate, 
            engage, and convert. From AI-powered solutions to stunning visual designs that leave lasting impressions.
          </motion.p>
          
          {/* CTA Buttons with enhanced design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <motion.button
              className="button-primary group flex items-center gap-3 px-10 py-5 text-lg font-bold text-white relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.dispatchEvent(new Event('openWhatsApp'))}
            >
              <Rocket className="w-6 h-6" />
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                }}
              />
            </motion.button>
            
            <motion.a
              href="#services"
              className="button-secondary flex items-center gap-3 px-10 py-5 text-lg font-semibold text-primary-foreground relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-5 h-5" />
              Explore Our Work
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Premium Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            { 
              icon: Award, 
              label: 'Projects Delivered', 
              value: '200+', 
              color: 'text-yellow-400',
              description: 'Successful launches'
            },
            { 
              icon: Star, 
              label: 'Happy Clients', 
              value: '150+', 
              color: 'text-blue-400',
              description: 'Global partnerships'
            },
            { 
              icon: Rocket, 
              label: 'Success Rate', 
              value: '99.8%', 
              color: 'text-purple-400',
              description: 'Client satisfaction'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 text-center group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Background glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.3) 0%, transparent 70%)'
                }}
              />
              
              <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
              <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-4 font-medium">Discover Excellence Below</span>
          <motion.div
            className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-2 glass-card"
            animate={{ 
              scale: [1, 1.1, 1],
              borderColor: ['rgba(255,255,255,0.3)', 'rgba(102,126,234,0.6)', 'rgba(255,255,255,0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-4 rounded-full"
              style={{
                background: 'linear-gradient(to bottom, #667eea, #764ba2)'
              }}
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernHero;