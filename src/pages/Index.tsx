import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ServiceSection from '@/components/ServiceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Chatbot from '@/components/Chatbot';
import CursorEffect from '@/components/CursorEffect';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

const maintenanceImages = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&auto=format&fit=crop',
];

const aiImages = [
  'https://images.unsplash.com/photo-1677442135136-760c813270c2?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1675271591201-7e8f4ff8b3d7?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1701457592825-a4c1d1571006?w=800&auto=format&fit=crop',
];

const gfxImages = [
  'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&auto=format&fit=crop',
];

const vfxImages = [
  'https://images.unsplash.com/photo-1627501691850-db08eb81199a?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop',
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const phoneNumber = "8801797168842";
  const defaultMessage = "Hello! I'm interested in your services.";

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
      setLoadingProgress(progress);
    }, 200);

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

    document.querySelectorAll('.slide-up, .scale-up, .slide-in-left, .slide-in-right').forEach((el) => {
      observer.observe(el);
    });

    const handleGetStarted = () => {
      setShowWhatsApp(true);
    };

    document.querySelectorAll('.button-primary').forEach((button) => {
      button.addEventListener('click', handleGetStarted);
    });

    window.addEventListener('openWhatsApp', handleGetStarted);

    return () => {
      clearInterval(interval);
      document.querySelectorAll('.slide-up, .scale-up, .slide-in-left, .slide-in-right').forEach((el) => {
        observer.unobserve(el);
      });

      document.querySelectorAll('.button-primary').forEach((button) => {
        button.removeEventListener('click', handleGetStarted);
      });
      
      window.removeEventListener('openWhatsApp', handleGetStarted);
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
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="loading-container max-w-md mx-auto text-center">
              <div className="relative mb-8">
                <div className="loading-logo-container">
                  <svg viewBox="0 0 300 50" width="300" height="50" className="mx-auto">
                    <text x="0" y="35" className="loading-text-stroke">
                      EliteSiteCreation
                    </text>
                    <text x="0" y="35" className="loading-text-fill">
                      EliteSiteCreation
                    </text>
                  </svg>
                  
                  <div className="loading-particles">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="loading-particle"
                        animate={{
                          x: [0, Math.random() * 100 - 50],
                          y: [0, Math.random() * 100 - 50],
                          opacity: [1, 0],
                          scale: [1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="loading-progress-container">
                <Progress value={loadingProgress} className="loading-progress h-2" />
                <p className="mt-3 text-sm text-gray-400">Loading awesome experience... {loadingProgress}%</p>
              </div>
              
              <div className="mt-8">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                  className="inline-block"
                >
                  <Loader2 className="animate-spin h-10 w-10 text-primary mx-auto" />
                </motion.div>
              </div>
              
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 text-sm text-gray-500"
              >
                Crafting digital excellence for you
              </motion.p>
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
          
          <div className="fixed bottom-6 right-6 flex items-center gap-4 z-50">
            <WhatsAppButton phoneNumber={phoneNumber} />
            <Chatbot />
          </div>
          
          <CursorEffect />
          
          <AnimatePresence>
            {showWhatsApp && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowWhatsApp(false)}
              >
                <motion.div
                  className="w-96 bg-gray-900 rounded-2xl overflow-hidden"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 flex justify-between items-center">
                    <h3 className="text-white font-semibold">Get Started with EliteSiteCreation</h3>
                    <X 
                      className="text-white cursor-pointer" 
                      size={18} 
                      onClick={() => setShowWhatsApp(false)} 
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-gray-300 mb-4">
                      Thank you for your interest in our services! Tell us more about your project and we'll get back to you as soon as possible.
                    </p>
                    <a 
                      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="button-primary w-full flex items-center justify-center mt-4"
                    >
                      <svg viewBox="0 0 175.216 175.552" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2">
                        <path d="M147.934 27.621C131.572 11.259 109.76 2 86.42 2 39.759 2 1.906 39.759 1.906 86.42c0 14.858 3.905 29.425 11.259 42.256L2 175.552l48.16-12.631c12.359 6.72 26.184 10.34 40.26 10.34 46.661 0 84.52-37.852 84.52-84.42 0-23.341-9.26-45.346-25.622-61.708l-1.384-.512zm-61.514 129.674h-.092c-12.631 0-25.07-3.352-35.871-9.811l-2.583-1.537-26.645 6.997 7.09-25.9-1.721-2.675c-7.183-11.444-10.993-24.534-10.993-38.005 0-39.389 32.151-71.541 71.724-71.541 19.157 0 37.209 7.46 50.752 20.96 13.543 13.56 21.003 31.611 20.96 50.768-.092 39.482-32.243 71.744-71.621 71.744zm39.297-53.58c-2.122-1.076-12.631-6.261-14.59-6.998-1.96-.737-3.396-1.076-4.833 1.076-1.437 2.152-5.509 6.997-6.812 8.433-1.26 1.383-2.521 1.537-4.643.461-12.631-6.32-20.918-11.259-29.166-25.439-2.214-3.797.166-3.565 6.32-11.903.691-1.46.346-2.675-.185-3.75-.537-1.077-4.833-11.628-6.628-15.902-1.717-4.178-3.488-3.565-4.771-3.657-1.261-.073-2.676-.073-4.127-.073-1.44 0-3.75.537-5.725 2.675-1.96 2.152-7.55 7.381-7.55 17.916 0 10.534 7.65 20.695 8.71 22.133 1.077 1.438 14.911 23.71 36.868 32.335 21.956 8.619 21.956 5.736 25.9 5.39 3.966-.346 12.631-5.159 14.406-10.164 1.773-5.005 1.773-9.26 1.257-10.167-.538-.922-1.974-1.442-4.096-2.467z" />
                      </svg>
                      Contact via WhatsApp
                    </a>
                    <a 
                      href="mailto:support@elitesitecreation.com" 
                      className="button-secondary w-full flex items-center justify-center mt-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      Email Us
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
