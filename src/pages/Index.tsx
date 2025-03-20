
import { useEffect } from 'react';
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

// Mock image imports (using placeholder images)
const maintenanceImages = [
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
];

const aiImages = [
  'https://images.unsplash.com/photo-1522542550215-423223a3a2e8?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
];

const gfxImages = [
  'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&auto=format&fit=crop',
];

const vfxImages = [
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&auto=format&fit=crop',
];

const Index = () => {
  // Add smooth scroll behavior
  useEffect(() => {
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
        
        {/* WhatsApp Button - Replace with your actual phone number */}
        <WhatsAppButton phoneNumber="1234567890" />
        
        {/* Chatbot Component */}
        <Chatbot />
        
        {/* Custom Cursor Effect */}
        <CursorEffect />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
