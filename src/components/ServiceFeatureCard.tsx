
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Sparkles, ArrowRight } from 'lucide-react';
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

  // Custom function to handle CTA click
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      window.dispatchEvent(new Event('openWhatsApp'));
    }
  };

  return (
    <motion.div
      className="glass-card p-6 h-full group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Dialog>
        <DialogTrigger className="w-full h-full text-left">
          <div className="flex flex-col h-full">
            {/* Icon */}
            <motion.div 
              className="mb-6 text-primary group-hover:text-primary-light transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {icon}
            </motion.div>
            
            {/* Title */}
            <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
              {description}
            </p>
            
            {/* CTA */}
            <motion.div 
              className="flex items-center text-primary text-sm font-medium group-hover:text-primary-light"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <span>Explore More</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </div>
        </DialogTrigger>
        
        <DialogContent className="max-w-md mx-auto glass-card border-primary/20">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <motion.div 
                className="p-3 rounded-xl bg-primary/20 text-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-6 w-6" />
              </motion.div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">{title}</h4>
                <p className="text-muted-foreground leading-relaxed">{detailedDescription}</p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatedButton 
                variant="primary" 
                className="w-full py-3 text-sm font-medium"
                onClick={handleCtaClick}
              >
                Start Your Project
              </AnimatedButton>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ServiceFeatureCard;
