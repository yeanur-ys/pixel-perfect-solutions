
import { useRef } from 'react';
import { motion } from 'framer-motion';
import PricingCard from './PricingCard';
import { useScrollAnimation } from '@/lib/animations';

const pricingPlans = [
  {
    title: 'Basic Website',
    price: '৳4,999-14,999',
    features: [
      '5 Custom Pages',
      'Mobile Responsive',
      'Basic SEO',
      '3 Months Support',
      'Mail Integration',
      'Animation Interphase'
    ],
  },
  {
    title: 'Advanced Website',
    price: '৳24,999-49,999',
    features: [
      '10 Custom Pages',
      'SEO Optimization',
      'Advanced Analytics',
      '6 Months Support',
      'Payment Integration',
      'Custom Forms',
      'Customer Account Interphase'
    ],
  },
  {
    title: 'Premium Website',
    price: '৳79,999-1,19,999',
    features: [
      'Unlimited Pages',
      'Advanced SEO',
      'E-commerce Integration',
      '1 Year Support',
      'Custom Animations',
      'Performance Optimization',
      'Premium Hosting',
      'Customer Communication Interphase'
    ],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(sectionRef, 'fade-in');
  
  return (
    <section id="web-development" ref={sectionRef} className="py-24 px-4 md:px-6 relative overflow-hidden glass-card">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-20"
             style={{
               background: 'radial-gradient(circle, rgba(248, 187, 217, 0.4) 0%, transparent 70%)'
             }} />
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-8 py-4 mb-10 text-sm font-bold rounded-full glass-card border-2 text-primary-foreground tracking-wide"
            initial={{ scale: 0.8 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            💼 PREMIUM WEB DEVELOPMENT 💼
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-primary-foreground">
            Professional Websites That Convert
          </h2>
          <p className="text-muted-foreground max-w-4xl mx-auto text-xl leading-relaxed font-light">
            Transform your business with stunning, responsive websites built for performance, 
            conversions, and exceptional user experiences across all devices.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
