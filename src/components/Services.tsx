
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
    price: '৳24,999-49,000',
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
    <section id="web-development" ref={sectionRef} className="py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Web Development
          </span>
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Website Development that Works for You
          </h2>
          <p className="text-foreground/70 max-w-3xl mx-auto text-lg">
            Create a powerful online presence with our professional web development services. 
            Our websites are designed to be beautiful, functional, and optimized for conversions.
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
