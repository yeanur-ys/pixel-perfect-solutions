import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/lib/animations';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  index: number;
}

const PricingCard = ({ title, price, features, index }: PricingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(cardRef, 'scale-up');
  
  const handleGetStarted = () => {
    window.dispatchEvent(new CustomEvent('openWhatsApp'));
  };
  
  // Different styling for each card tier
  const isPopular = index === 1; // Advanced Website
  const isPremium = index === 2; // Premium Website
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: 0.2 + index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        y: -15,
        scale: 1.02,
        transition: { duration: 0.4 } 
      }}
      className={`glass-card p-10 flex flex-col h-full relative overflow-hidden group ${
        isPremium ? 'border-2 border-purple-400/30' : 
        isPopular ? 'border-2 border-blue-400/30' : 'border border-white/10'
      }`}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: isPremium 
            ? 'radial-gradient(circle at center, rgba(240, 147, 251, 0.3) 0%, transparent 70%)'
            : isPopular
            ? 'radial-gradient(circle at center, rgba(102, 126, 234, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
        }}
      />
      
      {/* Popular badge */}
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-sm font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          <Star className="w-4 h-4 inline mr-1" />
          MOST POPULAR
        </motion.div>
      )}
      
      {/* Premium badge */}
      {isPremium && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-sm font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
          }}
        >
          <Zap className="w-4 h-4 inline mr-1" />
          PREMIUM
        </motion.div>
      )}
      
      <div className="mb-8 relative z-10">
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <div className="text-5xl font-bold mb-2"
             style={{
               background: isPremium 
                 ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                 : isPopular
                 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                 : 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
             }}>
          {price}
        </div>
        <div className="text-sm text-gray-400 font-medium">One-time investment</div>
      </div>
      
      <ul className="space-y-4 mb-10 flex-grow relative z-10">
        {features.map((feature, i) => (
          <motion.li 
            key={i} 
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <span className="mr-3 mt-0.5 p-1 rounded-full"
                  style={{
                    background: isPremium 
                      ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                      : isPopular
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)',
                  }}>
              <Check size={14} className="text-black" />
            </span>
            <span className="text-gray-300 font-medium">{feature}</span>
          </motion.li>
        ))}
      </ul>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className={`w-full mt-auto py-4 px-8 rounded-lg font-bold text-lg transition-all duration-400 relative overflow-hidden ${
          isPremium || isPopular ? 'text-white' : 'text-black'
        }`}
        style={{
          background: isPremium 
            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            : isPopular
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)',
          boxShadow: isPremium || isPopular ? '0 10px 25px rgba(0, 0, 0, 0.2)' : '0 5px 15px rgba(0, 0, 0, 0.1)'
        }}
        onClick={handleGetStarted}
      >
        <Star className="w-5 h-5 inline mr-2" />
        Get Started Now
        
        {/* Button shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default PricingCard;