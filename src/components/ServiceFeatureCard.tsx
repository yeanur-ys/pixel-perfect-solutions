import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

interface ServiceFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  detailedDescription: string;
  ctaText?: string;
  onCtaClick?: () => void;
  isMobile?: boolean;
}

const ServiceFeatureCard = ({
  icon,
  title,
  description,
  detailedDescription,
  ctaText = "Learn More",
  onCtaClick,
  isMobile = false
}: ServiceFeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      window.dispatchEvent(new Event('openWhatsApp'));
    }
  };

  return (
    <motion.div
      className="glass-card p-8 h-full group cursor-pointer relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.4) 0%, transparent 70%)'
        }}
      />
      
      <Dialog>
        <DialogTrigger className="w-full h-full text-left relative z-10">
          <div className="flex flex-col h-full">
            {/* Enhanced Icon */}
            <motion.div 
              className="mb-8 text-white group-hover:text-blue-300 transition-colors duration-500 relative"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 inline-block">
                {icon}
              </div>
            </motion.div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors duration-500">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-300 mb-8 flex-grow leading-relaxed text-base">
              {description}
            </p>
            
            {/* Enhanced CTA */}
            <motion.div 
              className="flex items-center text-blue-400 text-sm font-bold group-hover:text-blue-300 transition-colors duration-300"
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Star className="h-4 w-4 mr-2" />
              <span>Explore More</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.div>
          </div>
        </DialogTrigger>
        
        <DialogContent className="max-w-lg mx-auto glass-card border border-white/20 backdrop-blur-xl">
          <div className="p-8">
            <div className="flex items-start gap-6 mb-8">
              <motion.div 
                className="p-4 rounded-2xl text-blue-400 relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(240, 147, 251, 0.1) 100%)'
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Sparkles className="h-8 w-8" />
              </motion.div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-3">{title}</h4>
                <p className="text-gray-300 leading-relaxed text-lg">{detailedDescription}</p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatedButton 
                variant="primary" 
                className="w-full py-4 text-lg font-bold button-primary"
                onClick={handleCtaClick}
              >
                <Star className="w-5 h-5 mr-2" />
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </AnimatedButton>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ServiceFeatureCard;