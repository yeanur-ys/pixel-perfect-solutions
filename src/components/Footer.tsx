
import { motion } from 'framer-motion';
import { Facebook, Instagram, Phone } from 'lucide-react';

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
                href="https://www.facebook.com/profile.php?id=61573012953551"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/elitesitecreation?igsh=MTh5eXZnYnoyMjF3bQ=="
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="https://wa.me/8801640063079"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                <Phone size={24} />
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
              <li>
                <a href="mailto:elitesitecreation@gmail.com" className="hover:text-primary transition-colors duration-300">
                  elitesitecreation@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801640063079" className="hover:text-primary transition-colors duration-300">
                  +8801640063079
                </a>
              </li>
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
