
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Website Development', href: '#web-development' },
  { name: 'Website Maintenance', href: '#maintenance' },
  { name: 'AI & ML Solutions', href: '#ai-ml' },
  { name: 'GFX Design', href: '#gfx' },
  { name: 'VFX Design', href: '#vfx' },
  { name: 'Contact Us', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <a href="#" className="text-2xl font-medium tracking-tight">
            EliteSiteCreation
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 text-sm"
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <Menu className="h-6 w-6" />
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center px-6 py-5">
                  <span className="text-2xl font-medium">EliteSiteCreation</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close mobile menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-col space-y-8 px-6 py-8">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      className="text-lg font-light"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
