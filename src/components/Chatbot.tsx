
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! 👋 I'm the EliteSiteCreation assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Advanced responses based on keywords
  const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Website Development
    if (lowerCaseMessage.includes('website') || lowerCaseMessage.includes('web development') || lowerCaseMessage.includes('site')) {
      return "We offer professional website development services starting from $999. Our packages include responsive design, SEO optimization, and ongoing support. Would you like to know more about our specific packages?";
    }
    
    // Pricing
    else if (lowerCaseMessage.includes('price') || lowerCaseMessage.includes('cost') || lowerCaseMessage.includes('package')) {
      return "We have several pricing options: Basic Website ($999), Advanced Website ($1999), and Premium Website ($2999). Each package includes different features. Would you like me to elaborate on any specific package?";
    }
    
    // Contact
    else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach') || lowerCaseMessage.includes('talk')) {
      return "You can reach us through email at support@elitesitecreation.com or via WhatsApp at +8801797168842. Alternatively, you can fill out the contact form on our website.";
    }
    
    // AI & ML
    else if (lowerCaseMessage.includes('ai') || lowerCaseMessage.includes('ml') || lowerCaseMessage.includes('artificial intelligence') || lowerCaseMessage.includes('machine learning')) {
      return "Our AI & ML solutions help businesses automate processes, gain insights from data, and enhance decision-making. We customize solutions based on your specific needs. Would you like to schedule a consultation?";
    }
    
    // GFX & VFX
    else if (lowerCaseMessage.includes('gfx') || lowerCaseMessage.includes('vfx') || lowerCaseMessage.includes('graphics') || lowerCaseMessage.includes('visual')) {
      return "We provide high-quality GFX and VFX services to enhance your visual content. Our team creates stunning visuals tailored to your brand identity. Would you like to see some examples of our work?";
    }
    
    // Maintenance
    else if (lowerCaseMessage.includes('maintenance') || lowerCaseMessage.includes('update') || lowerCaseMessage.includes('support')) {
      return "Our website maintenance services ensure your site stays secure, updated, and optimized. We offer regular updates, security monitoring, content management, and performance optimization. Would you like to learn more about our maintenance packages?";
    }
    
    // Location
    else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('office') || lowerCaseMessage.includes('where')) {
      return "Our office is located in Mirpur 1, Dhaka, Bangladesh. Feel free to visit us during business hours or schedule an appointment in advance.";
    }
    
    // Default response
    else {
      return "Thank you for your message! I'd be happy to help with your inquiry about our services. Could you provide more details about what you're looking for? We offer website development, AI & ML solutions, GFX/VFX design, and website maintenance.";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    
    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      
      const newBotMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, newBotMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.div
        className="fixed right-5 bottom-24 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg z-50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChatbot}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.div>

      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chatbot-header">
              <span>EliteSiteCreation Support</span>
              <motion.div whileHover={{ rotate: 90 }} onClick={toggleChatbot}>
                <X size={18} className="cursor-pointer" />
              </motion.div>
            </div>

            <div className="chatbot-messages flex flex-col">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chatbot-message ${message.sender}`}
                >
                  {message.text}
                </div>
              ))}
              
              {isTyping && (
                <div className="chatbot-message bot typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
