
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ServiceSection from '@/components/ServiceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Chatbot from '@/components/Chatbot';
import CursorEffect from '@/components/CursorEffect';
import { Loader2 } from 'lucide-react';

// Updated images for better topic relevance
const maintenanceImages = [
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573164713001-24066d7438c1?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&auto=format&fit=crop',
];

const aiImages = [
  'https://images.unsplash.com/photo-1677442135136-760c813270c2?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1675271591201-7e8f4ff8b3d7?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1701457592825-a4c1d1571006?w=800&auto=format&fit=crop',
];

const gfxImages = [
  'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop',
];

const vfxImages = [
  'https://images.unsplash.com/photo-1627501691850-db08eb81199a?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop',
];

const Index = () => {
  const [loading, setLoading] = useState(true);

  // Add smooth scroll behavior and loading effect
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Add intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    // Observe all elements with animation classes
    document.querySelectorAll('.slide-up, .scale-up, .slide-in-left, .slide-in-right').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.slide-up, .scale-up, .slide-in-left, .slide-in-right').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="loading-screen"
        >
          <div className="loading-container">
            <div className="loading-logo">
              <svg viewBox="0 0 200 50" className="loading-text">
                <text x="0" y="35" className="loading-text-stroke">EliteSiteCreation</text>
                <text x="0" y="35" className="loading-text-fill">EliteSiteCreation</text>
              </svg>
              <div className="loading-spinner">
                <Loader2 className="animate-spin h-10 w-10 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-black text-foreground overflow-hidden"
        >
          <Navbar />
          <Hero />
          
          <Services />
          
          <ServiceSection 
            id="maintenance"
            title="Website Maintenance"
            subtitle="Keep Your Site Fresh"
            description="Focus on your business while we ensure your website stays updated, secure, and optimized for performance. Our maintenance services include regular updates, security monitoring, content management, and performance optimization."
            images={maintenanceImages}
          />
          
          <ServiceSection 
            id="ai-ml"
            title="AI & ML Solutions"
            subtitle="Future-Proof Technology"
            description="Leverage AI and Machine Learning to gain actionable insights, automate tasks, and enhance decision-making for your business. Our AI solutions are tailored to your specific needs and designed to give you a competitive edge."
            images={aiImages}
            reversed
          />
          
          <ServiceSection 
            id="gfx"
            title="GFX Design"
            subtitle="Visual Excellence"
            description="Enhance your brand with cutting-edge graphic design that creates an immersive experience for your audience. Our GFX design services include branding, UI/UX design, illustration, and motion graphics."
            images={gfxImages}
          />
          
          <ServiceSection 
            id="vfx"
            title="VFX Design"
            subtitle="Motion Magic"
            description="Transform your visuals with stunning visual effects that captivate and engage your audience. Our VFX design services include compositing, 3D animation, particle effects, and more."
            images={vfxImages}
            reversed
          />
          
          <ContactSection />
          
          <Footer />
          
          {/* WhatsApp Button with updated phone number */}
          <WhatsAppButton phoneNumber="8801797168842" />
          
          {/* Chatbot Component */}
          <Chatbot />
          
          {/* Custom Cursor Effect */}
          <CursorEffect />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
