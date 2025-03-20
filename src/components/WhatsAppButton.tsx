
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton = ({ phoneNumber, message = "Hello! I'm interested in your services." }: WhatsAppButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(message);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    const encodedMessage = encodeURIComponent(customMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        className="whatsapp-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
      >
        {/* Official WhatsApp SVG logo */}
        <svg viewBox="0 0 175.216 175.552" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
          <path d="M147.934 27.621C131.572 11.259 109.76 2 86.42 2 39.759 2 1.906 39.759 1.906 86.42c0 14.858 3.905 29.425 11.259 42.256L2 175.552l48.16-12.631c12.359 6.72 26.184 10.34 40.26 10.34 46.661 0 84.52-37.852 84.52-84.42 0-23.341-9.26-45.346-25.622-61.708l-1.384-.512zm-61.514 129.674h-.092c-12.631 0-25.07-3.352-35.871-9.811l-2.583-1.537-26.645 6.997 7.09-25.9-1.721-2.675c-7.183-11.444-10.993-24.534-10.993-38.005 0-39.389 32.151-71.541 71.724-71.541 19.157 0 37.209 7.46 50.752 20.96 13.543 13.56 21.003 31.611 20.96 50.768-.092 39.482-32.243 71.744-71.621 71.744zm39.297-53.58c-2.122-1.076-12.631-6.261-14.59-6.998-1.96-.737-3.396-1.076-4.833 1.076-1.437 2.152-5.509 6.997-6.812 8.433-1.26 1.383-2.521 1.537-4.643.461-12.631-6.32-20.918-11.259-29.166-25.439-2.214-3.797.166-3.565 6.32-11.903.691-1.46.346-2.675-.185-3.75-.537-1.077-4.833-11.628-6.628-15.902-1.717-4.178-3.488-3.565-4.771-3.657-1.261-.073-2.676-.073-4.127-.073-1.44 0-3.75.537-5.725 2.675-1.96 2.152-7.55 7.381-7.55 17.916 0 10.534 7.65 20.695 8.71 22.133 1.077 1.438 14.911 23.71 36.868 32.335 21.956 8.619 21.956 5.736 25.9 5.39 3.966-.346 12.631-5.159 14.406-10.164 1.773-5.005 1.773-9.26 1.257-10.167-.538-.922-1.974-1.442-4.096-2.467z" />
        </svg>
      </motion.div>

      {/* WhatsApp Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="whatsapp-popup"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="whatsapp-popup-header">
              <span>Send us a WhatsApp message</span>
              <motion.div whileHover={{ rotate: 90 }} onClick={() => setIsOpen(false)}>
                <X size={18} className="cursor-pointer" />
              </motion.div>
            </div>

            <div className="whatsapp-popup-content">
              <p className="text-gray-300 mb-4">
                Send us a message directly to our WhatsApp. We'll get back to you as soon as possible.
              </p>
              <textarea
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                rows={4}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your message here..."
              />
            </div>

            <div className="whatsapp-popup-footer">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="button-primary flex items-center justify-center"
                onClick={handleSend}
              >
                Send Message <Send className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;
