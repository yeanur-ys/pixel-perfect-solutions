import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, ChevronRight, AlertCircle, Zap, Cpu, Info, Layers, PenSquare, ExternalLink } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

interface QuickReply {
  text: string;
  icon: React.ReactNode;
  action: () => void;
}

// Chat context types for more accurate responses
type ChatContext = 
  | 'initial'
  | 'website_package' 
  | 'contact_info'
  | 'ml_ai_design'
  | 'gfx_design'
  | 'vfx_design'
  | 'pricing'
  | 'timeline'
  | 'process'
  | 'technology'
  | 'portfolio';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! 👋 I'm the EliteSiteCreation assistant. How can I help you today?", sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ChatContext>('initial');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-close chat after period of inactivity (5 minutes)
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        if (messages.length > 0 && messages[messages.length - 1].sender === 'bot') {
          setIsOpen(false);
        }
      }, 5 * 60 * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    // If reopening, show suggestions again
    if (!isOpen) {
      setShowSuggestions(true);
    }
  };

  // More sophisticated response system with intelligent context tracking
  const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Handle context-specific responses
    switch(context) {
      case 'website_package':
        setContext('initial');
        return "Our website packages are designed to meet diverse needs:\n\n• Basic Package ($999): Responsive design, 5 pages, SEO-optimized, contact form\n• Professional Package ($1,999): 10 pages, CMS integration, advanced analytics, basic e-commerce\n• Enterprise Package ($2,999+): Unlimited pages, advanced e-commerce, custom features, priority support\n\nAll packages include hosting for the first year, SSL certificate, and mobile optimization. Would you like to discuss which package might be right for your business?";
      
      case 'contact_info':
        setContext('initial');
        return "You can reach our team through multiple channels:\n\n• Email: support@elitesitecreation.com\n• WhatsApp: +8801797168842\n• Office: Mirpur 1, Dhaka, Bangladesh\n\nOur business hours are Monday to Friday, 9 AM to 6 PM (GMT+6). For urgent inquiries, WhatsApp is the fastest way to reach us.";
      
      case 'ml_ai_design':
        setContext('initial');
        return "Our ML & AI solutions leverage cutting-edge technology to solve complex business problems. We offer:\n\n• Custom AI model development\n• Natural language processing systems\n• Predictive analytics implementations\n• Computer vision solutions\n• AI-powered automation tools\n• ML-based recommendation engines\n\nEach solution is tailored to your specific industry and business needs. Would you like to schedule a consultation to discuss how AI can transform your operations?";
      
      case 'gfx_design':
        setContext('initial');
        return "Our GFX design services create visually compelling assets that elevate your brand presence. Our offerings include:\n\n• Brand identity development (logos, style guides)\n• UI/UX design for web and mobile\n• Marketing materials (brochures, banners, social media)\n• Product packaging design\n• Illustration and infographics\n• Print design\n\nOur designers blend creativity with strategic thinking to deliver designs that not only look spectacular but also drive results. Would you like to see our portfolio?";
      
      case 'vfx_design':
        setContext('initial');
        return "Our VFX design services bring visual storytelling to life with dynamic motion and effects. We specialize in:\n\n• 3D modeling and animation\n• Motion graphics and kinetic typography\n• Visual effects for video content\n• Particle simulations and environments\n• Character animation\n• Compositing and color grading\n\nWhether for marketing videos, product demonstrations, or brand stories, our VFX work creates memorable visual experiences. Would you like to discuss a specific project?";
      
      case 'pricing':
        setContext('initial');
        return "Our pricing is structured to provide excellent value across all our service categories:\n\n• Website Development: $999-$2,999+\n• AI & ML Solutions: Starting at $2,500\n• GFX Design: Starting at $499\n• VFX Design: Starting at $799\n\nAll prices depend on project scope and complexity. We offer package discounts when combining multiple services. Would you like a custom quote for your specific needs?";
      
      case 'timeline':
        setContext('initial');
        return "Our typical project timelines vary by service:\n\n• Basic websites: 2-3 weeks\n• Complex web applications: 6-12 weeks\n• AI/ML solutions: 4-16 weeks\n• GFX design packages: 1-3 weeks\n• VFX projects: 2-6 weeks\n\nTimelines can be expedited for urgent projects (rush fees may apply). We always provide a detailed project schedule during the initial consultation. What's your target launch date?";
      
      case 'process':
        setContext('initial');
        return "Our client-centered process follows these key stages:\n\n1. Discovery: We learn about your business, goals, and requirements\n2. Proposal: We provide a detailed plan, timeline, and quote\n3. Design: We create mockups and prototypes for your approval\n4. Development: We build the solution with regular progress updates\n5. Review: You test and provide feedback for refinements\n6. Launch: We deploy your project and provide training\n7. Support: We offer ongoing maintenance and optimization\n\nThis collaborative approach ensures we deliver solutions perfectly aligned with your vision. Would you like to start with a discovery call?";
      
      case 'technology':
        setContext('initial');
        return "We leverage cutting-edge technologies across our service offerings:\n\n• Front-end: React, Vue.js, Angular, TailwindCSS\n• Back-end: Node.js, Python, PHP, Java\n• Databases: MongoDB, PostgreSQL, MySQL, Firebase\n• AI/ML: TensorFlow, PyTorch, scikit-learn\n• Design: Adobe Creative Suite, Figma, Blender, Cinema 4D\n• DevOps: AWS, Google Cloud, Azure, Docker\n\nWe select the optimal tech stack for each project based on requirements, scalability needs, and performance goals. Is there a specific technology you're interested in?";
      
      case 'portfolio':
        setContext('initial');
        return "We've successfully delivered projects across diverse industries including e-commerce, healthcare, education, finance, and entertainment. While our portfolio is extensive, here are some highlights:\n\n• An AI-powered analytics dashboard for a Fortune 500 retail company\n• A comprehensive e-learning platform with advanced user tracking\n• Award-winning brand identity for a tech startup\n• VFX and motion graphics for a national advertising campaign\n\nI'd be happy to connect you with our portfolio team who can share detailed case studies relevant to your industry. Would you like me to arrange this?";
      
      default:
        // Process general inquiries with keyword detection
        break;
    }

    // Keyword analysis for general queries
    if (lowerCaseMessage.includes('website') || 
        lowerCaseMessage.includes('web development') || 
        lowerCaseMessage.includes('site')) {
      setContext('website_package');
      return "Our website development services focus on creating responsive, high-performance sites that convert visitors into customers. Would you like to know about our specific website packages and pricing?";
    }

    if (lowerCaseMessage.includes('price') || 
        lowerCaseMessage.includes('cost') || 
        lowerCaseMessage.includes('package') ||
        lowerCaseMessage.includes('fee')) {
      setContext('pricing');
      return "We offer competitive pricing across all our service categories. Would you like me to provide our price ranges for websites, AI solutions, or design services?";
    }

    if (lowerCaseMessage.includes('contact') || 
        lowerCaseMessage.includes('reach') || 
        lowerCaseMessage.includes('talk') ||
        lowerCaseMessage.includes('call')) {
      setContext('contact_info');
      return "We'd be happy to connect with you directly. Would you like our contact information?";
    }

    if (lowerCaseMessage.includes('ml') || 
        lowerCaseMessage.includes('ai') || 
        lowerCaseMessage.includes('machine learning') || 
        lowerCaseMessage.includes('artificial intelligence') ||
        lowerCaseMessage.includes('intelligent') ||
        lowerCaseMessage.includes('automation')) {
      setContext('ml_ai_design');
      return "Our AI & Machine Learning solutions help businesses automate processes, gain insights from data, and create intelligent systems. Would you like to learn more about our AI services?";
    }

    if (lowerCaseMessage.includes('gfx') || 
        lowerCaseMessage.includes('graphics') || 
        lowerCaseMessage.includes('design') ||
        lowerCaseMessage.includes('logo') ||
        lowerCaseMessage.includes('brand')) {
      setContext('gfx_design');
      return "Our GFX design team creates compelling visual assets that strengthen your brand identity and engage your audience. Would you like details about our graphic design services?";
    }

    if (lowerCaseMessage.includes('vfx') || 
        lowerCaseMessage.includes('visual effects') || 
        lowerCaseMessage.includes('motion graphics') ||
        lowerCaseMessage.includes('animation') ||
        lowerCaseMessage.includes('video')) {
      setContext('vfx_design');
      return "Our VFX design capabilities bring stories to life through animation, motion graphics, and visual effects. Would you like to know more about our visual effects services?";
    }

    if (lowerCaseMessage.includes('location') || 
        lowerCaseMessage.includes('office') || 
        lowerCaseMessage.includes('where') ||
        lowerCaseMessage.includes('address')) {
      return "Our office is located in Mirpur 1, Dhaka, Bangladesh. You're welcome to visit us during business hours (Monday-Friday, 9 AM-6 PM) or schedule an appointment in advance. Would you like our contact details to arrange a visit?";
    }

    if (lowerCaseMessage.includes('timeline') || 
        lowerCaseMessage.includes('how long') || 
        lowerCaseMessage.includes('when') ||
        lowerCaseMessage.includes('deadline') ||
        lowerCaseMessage.includes('complete')) {
      setContext('timeline');
      return "Project timelines vary based on complexity and scope. Would you like information about our typical delivery timeframes?";
    }

    if (lowerCaseMessage.includes('process') || 
        lowerCaseMessage.includes('how do you') || 
        lowerCaseMessage.includes('steps') ||
        lowerCaseMessage.includes('approach') ||
        lowerCaseMessage.includes('work with')) {
      setContext('process');
      return "We follow a systematic yet flexible process to ensure project success. Would you like to learn about our end-to-end workflow?";
    }

    if (lowerCaseMessage.includes('technology') || 
        lowerCaseMessage.includes('tech stack') || 
        lowerCaseMessage.includes('platform') ||
        lowerCaseMessage.includes('framework') ||
        lowerCaseMessage.includes('tools')) {
      setContext('technology');
      return "We utilize modern technologies that ensure performance, security, and scalability. Would you like details about our technical capabilities?";
    }

    if (lowerCaseMessage.includes('portfolio') || 
        lowerCaseMessage.includes('examples') || 
        lowerCaseMessage.includes('case studies') ||
        lowerCaseMessage.includes('previous work') ||
        lowerCaseMessage.includes('clients')) {
      setContext('portfolio');
      return "We've successfully delivered hundreds of projects across various industries. Would you like to hear about some of our notable case studies?";
    }

    if (lowerCaseMessage.includes('hello') || 
        lowerCaseMessage.includes('hi') || 
        lowerCaseMessage.includes('hey') ||
        lowerCaseMessage.includes('start')) {
      return "Hello! Welcome to EliteSiteCreation. We specialize in website development, AI solutions, and design services. How can I assist you today?";
    }

    if (lowerCaseMessage.includes('thank') || 
        lowerCaseMessage.includes('thanks') ||
        lowerCaseMessage.includes('helpful') ||
        lowerCaseMessage.includes('appreciate')) {
      return "You're welcome! I'm glad I could help. Is there anything else you'd like to know about our services? Feel free to ask, or we can connect you with a team member for more detailed assistance.";
    }

    // Default response for unclear queries
    return "I'd be happy to help with information about our services. We specialize in website development, AI & ML solutions, graphic design, and visual effects. Could you please specify which of these areas you're interested in, or if you have questions about our process, pricing, or timeline?";
  };

  // Quick replies with icons for better visual appeal
  const quickReplies: QuickReply[] = useMemo(() => [
    { 
      text: "Website Packages", 
      icon: <Layers size={14} className="mr-1" />,
      action: () => handleQuickReply('website') 
    },
    { 
      text: "ML & AI Solutions", 
      icon: <Cpu size={14} className="mr-1" />,
      action: () => handleQuickReply('ml') 
    },
    { 
      text: "GFX Design", 
      icon: <PenSquare size={14} className="mr-1" />,
      action: () => handleQuickReply('gfx') 
    },
    { 
      text: "VFX Design", 
      icon: <Zap size={14} className="mr-1" />,
      action: () => handleQuickReply('vfx') 
    },
    { 
      text: "Pricing", 
      icon: <Info size={14} className="mr-1" />,
      action: () => handleQuickReply('pricing') 
    },
    { 
      text: "Contact Info", 
      icon: <ExternalLink size={14} className="mr-1" />,
      action: () => handleQuickReply('contact') 
    },
  ], []);

  const handleQuickReply = (type: string) => {
    // Hide suggestions after selection
    setShowSuggestions(false);
    
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

    // Hide suggestions after sending message
    setShowSuggestions(false);

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

    // Simulate bot response with dynamic timing
    const botResponse = getBotResponse(inputMessage);
    const typingDelay = Math.min(1000 + botResponse.length * 2, 3000); // Cap at 3 seconds

    setTimeout(() => {
      const newBotMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, newBotMessage]);
    }, typingDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format message text to handle line breaks for better readability
  const formatMessageText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      {/* Chatbot Toggle Button with improved visual effect */}
      <motion.div
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer relative overflow-hidden text-white"
        style={{
          background: 'var(--gradient-primary)',
          boxShadow: 'var(--shadow-medium)'
        }}
        whileHover={{ 
          scale: 1.1, 
          boxShadow: 'var(--shadow-strong), var(--shadow-glow)'
        }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChatbot}
      >
        <div className="absolute inset-0 bg-white/10 opacity-20"></div>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chatbot Interface with improved visuals */}
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
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span>EliteSiteCreation AI</span>
              </div>
              <motion.div 
                whileHover={{ rotate: 90 }} 
                onClick={toggleChatbot}
                className="cursor-pointer"
              >
                <X size={18} />
              </motion.div>
            </div>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`chatbot-message ${message.sender}`}
                >
                  {formatMessageText(message.text)}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="chatbot-message bot typing flex items-center gap-1"
                >
                  <span className="text-sm">AI is typing</span>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
            
            {/* Quick Replies */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div 
                  className="p-2 border-t border-border bg-background/50 max-h-24 overflow-y-auto"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <motion.button
                        key={index}
                        onClick={reply.action}
                        className="flex items-center gap-2 px-4 py-2 text-white text-sm rounded-lg transition-colors whitespace-nowrap"
                        style={{ background: 'var(--gradient-primary)' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {reply.icon}
                        {reply.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-3 border-t border-border flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="glass-card text-primary-foreground p-2 rounded-lg flex-1 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <motion.button
                onClick={handleSendMessage}
                className="text-white p-2 rounded-lg hover:opacity-90 transition-colors"
                style={{ background: 'var(--gradient-primary)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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