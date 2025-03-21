
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/30 py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-medium mb-4">EliteSiteCreation</h3>
            <p className="text-foreground/70 mb-6">
              We craft cutting-edge digital solutions to elevate your business presence online.
            </p>
            <div className="flex space-x-6">
              <motion.a
                href="https://web.facebook.com/profile.php?id=61573012953551"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="https://web.facebook.com/profile.php?id=61573012953551"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </motion.a>
              <motion.a
                href="https://youtube.com"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                <Youtube size={24} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                { name: 'Website Development', href: '#web-development' },
                { name: 'Website Maintenance', href: '#maintenance' },
                { name: 'AI & ML Solutions', href: '#ai-ml' },
                { name: 'GFX Design', href: '#gfx' },
                { name: 'VFX Design', href: '#vfx' },
              ].map((service) => (
                <li key={service.name}>
                  <motion.a
                    href={service.href}
                    whileHover={{ x: 3, transition: { duration: 0.2 } }}
                    className="text-foreground/70 hover:text-primary transition-colors duration-300 inline-block"
                  >
                    {service.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Contact</h3>
            <ul className="space-y-3 text-foreground/70">
              <li>Mirpur 1, Dhaka, Bangladesh.</li>
              <li>support@elitesitecreation.com</li>
              <li>+8801797168842</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/20 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} EliteSiteCreation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
