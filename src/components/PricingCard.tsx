
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
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
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: 0.2 + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 } 
      }}
      className="glass-card p-8 flex flex-col h-full"
    >
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <div className="text-4xl font-light text-primary mb-1">{price}</div>
        <div className="text-sm text-foreground/60">One-time payment</div>
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <span className="mr-2 text-primary mt-0.5">
              <Check size={18} />
            </span>
            <span className="text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>
      
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="button-primary w-full mt-auto"
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default PricingCard;
