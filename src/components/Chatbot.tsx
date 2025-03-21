
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, ChevronRight } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

interface QuickReply {
  text: string;
  action: () => void;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! 👋 I'm the EliteSiteCreation assistant. How can I help you today?", sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Advanced responses based on keywords and context
  const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Contextual responses
    if (context === 'website_package') {
      setContext(null); // Reset context after response
      return "Our Basic Website package includes responsive design, SEO optimization, and 3 pages. The Advanced package includes up to 10 pages and custom features. Would you like to know more?";
    }

    if (context === 'contact_info') {
      setContext(null);
      return "You can reach us via email at support@elitesitecreation.com or WhatsApp at +8801797168842. How else can I assist you?";
    }

    if (context === 'ml_ai_design') {
      setContext(null);
      return "Our ML & AI solutions include custom AI models, data analysis, and automation tools. We can help you build intelligent systems tailored to your business needs. Would you like to schedule a consultation?";
    }

    if (context === 'gfx_design') {
      setContext(null);
      return "We offer high-quality GFX design services, including logos, banners, and branding materials. Our designs are tailored to your brand identity. Would you like to see some examples?";
    }

    if (context === 'vfx_design') {
      setContext(null);
      return "Our VFX design services include video editing, motion graphics, and visual effects for videos. We can enhance your visual content to make it more engaging. Would you like to discuss a project?";
    }

    // Keyword-based responses
    if (lowerCaseMessage.includes('website') || lowerCaseMessage.includes('web development') || lowerCaseMessage.includes('site')) {
      setContext('website_package');
      return "We offer professional website development services starting from $999. Would you like to know more about our packages?";
    }

    if (lowerCaseMessage.includes('price') || lowerCaseMessage.includes('cost') || lowerCaseMessage.includes('package')) {
      return "Our pricing starts at $999 for a Basic Website, $1999 for Advanced, and $2999 for Premium. Each package includes different features. Would you like details on a specific package?";
    }

    if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach') || lowerCaseMessage.includes('talk')) {
      setContext('contact_info');
      return "You can contact us via email or WhatsApp. Would you like our contact details?";
    }

    if (lowerCaseMessage.includes('ml') || lowerCaseMessage.includes('ai') || lowerCaseMessage.includes('machine learning') || lowerCaseMessage.includes('artificial intelligence')) {
      setContext('ml_ai_design');
      return "We specialize in ML & AI solutions, including custom AI models and data analysis. Would you like to know more about our services?";
    }

    if (lowerCaseMessage.includes('gfx') || lowerCaseMessage.includes('graphics') || lowerCaseMessage.includes('design')) {
      setContext('gfx_design');
      return "We offer professional GFX design services, including logos, banners, and branding materials. Would you like to see some examples?";
    }

    if (lowerCaseMessage.includes('vfx') || lowerCaseMessage.includes('visual effects') || lowerCaseMessage.includes('motion graphics')) {
      setContext('vfx_design');
      return "Our VFX design services include video editing, motion graphics, and visual effects. Would you like to discuss a project?";
    }

    if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('office') || lowerCaseMessage.includes('where')) {
      return "Our office is located in Mirpur 1, Dhaka, Bangladesh. Feel free to visit us during business hours or schedule an appointment in advance.";
    }

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return "Hello! How can I assist you today?";
    }

    if (lowerCaseMessage.includes('thank') || lowerCaseMessage.includes('thanks')) {
      return "You're welcome! Is there anything else I can help with?";
    }

    // Default response for unclear queries
    return "I'm not sure I understand. Could you clarify? For example, are you asking about our website packages, ML & AI solutions, GFX/VFX design, or contact info?";
  };

  // Quick replies for common questions
  const quickReplies: QuickReply[] = [
    { text: "Website Packages", action: () => handleQuickReply('website') },
    { text: "ML & AI Solutions", action: () => handleQuickReply('ml') },
    { text: "GFX Design", action: () => handleQuickReply('gfx') },
    { text: "VFX Design", action: () => handleQuickReply('vfx') },
    { text: "Contact Info", action: () => handleQuickReply('contact') },
    { text: "Location", action: () => handleQuickReply('location') },
  ];

  const handleQuickReply = (type: string) => {
    // Add user message 
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: quickReplies.find(reply => reply.text.toLowerCase().includes(type))?.text || type,
      sender: 'user',
    };
    setMessages((prev) => [...prev, newUserMessage]);
    
    // Get bot response
    const response = getBotResponse(type);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const newBotMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, newBotMessage]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const newBotMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, newBotMessage]);
    }, 1000);
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
        className="w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer relative overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChatbot}
      >
        <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
        {isOpen ? <X size={22} /> : <Bot size={22} />}
      </motion.div>

      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-6 bottom-20 w-80 md:w-96 h-[450px] bg-gray-950 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border border-blue-900/30"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 text-white font-bold flex justify-between items-center relative">
              <div className="absolute inset-0 bg-blue-600 opacity-10"></div>
              <span className="relative">EliteSiteCreation Support</span>
              <motion.div 
                whileHover={{ rotate: 90 }} 
                onClick={toggleChatbot}
                className="relative cursor-pointer"
              >
                <X size={18} />
              </motion.div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-950 to-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-xl max-w-[85%] ${
                    message.sender === 'bot'
                      ? 'bg-gray-800 text-white rounded-bl-none self-start'
                      : 'bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-br-none self-end ml-auto'
                  }`}
                >
                  {message.text}
                </div>
              ))}

              {isTyping && (
                <div className="p-3 bg-gray-800 text-white rounded-xl rounded-bl-none self-start max-w-[85%]">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
            
            {/* Quick Replies */}
            <div className="p-2 border-t border-gray-800 bg-gray-900 max-h-24 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={reply.action}
                    className="bg-gray-800 hover:bg-gray-700 text-blue-300 px-3 py-1 rounded-lg text-sm flex items-center transition-colors border border-gray-700"
                  >
                    <ChevronRight size={14} className="mr-1" />
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 border-t border-gray-800 flex items-center gap-2 bg-gray-900">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-gray-800 text-white p-2 rounded-lg flex-1 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-2 rounded-lg hover:opacity-90 transition-colors"
                disabled={!inputMessage.trim()}
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
