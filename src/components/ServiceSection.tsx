
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Slideshow from './Slideshow';
import { useScrollAnimation } from '@/lib/animations';

interface ServiceSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  reversed?: boolean;
}

const ServiceSection = ({ 
  id, 
  title, 
  subtitle, 
  description, 
  images, 
  reversed = false 
}: ServiceSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(sectionRef, 'fade-in');
  
  return (
    <section id={id} className="py-24 px-4 md:px-6" ref={sectionRef}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="section-title"
      >
        {title}
      </motion.h2>
      
      <div className={`container mx-auto flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
        <motion.div 
          initial={{ opacity: 0, x: reversed ? -50 : 50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <div className="aspect-video w-full h-full rounded-2xl overflow-hidden">
            <Slideshow images={images} />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: reversed ? 50 : -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full lg:w-1/2"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            {subtitle}
          </span>
          
          <h3 className="text-2xl md:text-3xl font-light mb-4">
            {title}
          </h3>
          
          <p className="text-foreground/80 mb-8 text-lg">
            {description}
          </p>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="button-primary"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
