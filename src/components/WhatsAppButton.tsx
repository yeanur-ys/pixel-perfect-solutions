
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
          <path d="M8.5 14a5 5 0 0 0 7 0" />
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
