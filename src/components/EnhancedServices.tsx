
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MountainSnow, Cpu, PaintBucket, Video } from 'lucide-react';
import ServiceFeatureCard from './ServiceFeatureCard';
import { useScrollAnimation } from '@/lib/animations';

const EnhancedServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(sectionRef, 'fade-in');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: <MountainSnow className="h-8 w-8" />,
      title: "Website Maintenance",
      description: "Keep your digital presence fresh with our comprehensive maintenance services.",
      detailedDescription: "Our maintenance includes regular updates, security monitoring, content refreshes, and performance optimization to keep your site running smoothly."
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI & ML Solutions",
      description: "Leverage cutting-edge AI to drive innovation and efficiency for your business.",
      detailedDescription: "From chatbots to predictive analytics, our AI solutions are custom-designed to solve your specific business challenges."
    },
    {
      icon: <PaintBucket className="h-8 w-8" />,
      title: "GFX Design",
      description: "Captivate your audience with stunning visual design that elevates your brand.",
      detailedDescription: "Our graphic design services include branding, UI/UX design, illustrations, and more to create a cohesive visual identity."
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "VFX Design",
      description: "Add motion magic to your content with professional visual effects.",
      detailedDescription: "From motion graphics to 3D animation, our VFX services will bring your ideas to life with cinematic quality."
    }
  ];

  return (
    <section id="enhanced-services" ref={sectionRef} className="py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-blue-700/10 text-blue-400 border border-blue-800/50">
            Our Expertise
          </span>
          <h2 className="text-4xl font-light mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Comprehensive Digital Services
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            We offer a full spectrum of digital solutions to transform your online presence
            and help your business thrive in the digital landscape.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative"
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="serviceBg"
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <ServiceFeatureCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                detailedDescription={service.detailedDescription}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedServices;
