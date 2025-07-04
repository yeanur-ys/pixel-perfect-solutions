
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Palette, Camera } from 'lucide-react';
import ServiceFeatureCard from './ServiceFeatureCard';
import { useScrollAnimation } from '@/lib/animations';
import { useIsMobile } from '@/hooks/use-mobile';

const EnhancedServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(sectionRef, 'fade-in');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Use the custom hook instead of useState + useEffect logic
  const isMobile = useIsMobile();

  const services = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Website Maintenance",
      description: "Keep your digital presence secure, updated, and performing at its peak.",
      detailedDescription: "Comprehensive maintenance including security monitoring, performance optimization, content updates, and 24/7 technical support to ensure your website runs flawlessly."
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI & ML Solutions", 
      description: "Harness the power of artificial intelligence to transform your business operations.",
      detailedDescription: "Custom AI solutions including intelligent chatbots, predictive analytics, automation systems, and machine learning models tailored to your specific business needs."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Graphic Design",
      description: "Create stunning visual identities that captivate and convert your audience.",
      detailedDescription: "Professional design services including brand identity, UI/UX design, marketing materials, logo design, and complete visual communication strategies."
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "VFX & Motion",
      description: "Bring your vision to life with cinematic visual effects and animations.",
      detailedDescription: "Professional VFX services including motion graphics, 3D animation, video effects, compositing, and interactive multimedia experiences."
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="py-20 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full glass-card"
            initial={{ scale: 0.8 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ✨ Our Expertise
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
            Digital Solutions That Drive Results
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            We combine cutting-edge technology with creative excellence to deliver 
            comprehensive digital solutions that elevate your brand and drive business growth.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative group"
            >
              <ServiceFeatureCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                detailedDescription={service.detailedDescription}
                isMobile={isMobile}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedServices;
