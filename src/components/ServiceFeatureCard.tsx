
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Lightbulb, ChevronRight } from 'lucide-react';
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

  // Custom function to handle CTA click - we'll dispatch the openWhatsApp event
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      window.dispatchEvent(new Event('openWhatsApp'));
    }
  };

  // Content to show in popup/hover card
  const PopupContent = () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-full bg-blue-500/20 p-2 text-blue-400">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <p className="text-xs text-gray-400">{detailedDescription}</p>
        </div>
      </div>
      <AnimatedButton 
        variant="primary" 
        className="mt-2 w-full py-1.5 text-xs"
        onClick={handleCtaClick}
      >
        Get Started
      </AnimatedButton>
    </div>
  );

  // Render different components based on mobile or desktop
  return (
    <motion.div
      className="glass-card p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {isMobile ? (
        // Mobile view - use Popover (tap to open)
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-col h-full cursor-pointer">
              <div className="mb-4 text-blue-400">
                {icon}
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">{title}</h3>
              <p className="text-gray-400 mb-4 flex-grow">{description}</p>
              
              <motion.div 
                className="flex items-center text-blue-400 text-sm font-medium"
                animate={{ x: isHovered ? 5 : 0 }}
              >
                {ctaText}
                <ChevronRight className="h-4 w-4 ml-1" />
              </motion.div>
            </div>
          </PopoverTrigger>
          
          <PopoverContent 
            className="w-72 bg-gray-900/90 backdrop-blur-md border-gray-800 p-5 z-50"
            side="bottom"
            align="center"
            sideOffset={5}
          >
            <PopupContent />
          </PopoverContent>
        </Popover>
      ) : (
        // Desktop view - use HoverCard
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex flex-col h-full cursor-pointer">
              <div className="mb-4 text-blue-400">
                {icon}
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">{title}</h3>
              <p className="text-gray-400 mb-4 flex-grow">{description}</p>
              
              <motion.div 
                className="flex items-center text-blue-400 text-sm font-medium"
                animate={{ x: isHovered ? 5 : 0 }}
              >
                {ctaText}
                <ChevronRight className="h-4 w-4 ml-1" />
              </motion.div>
            </div>
          </HoverCardTrigger>
          
          <HoverCardContent className="w-80 bg-gray-900/90 backdrop-blur-md border-gray-800 p-5 z-50">
            <PopupContent />
          </HoverCardContent>
        </HoverCard>
      )}
    </motion.div>
  );
};

export default ServiceFeatureCard;
