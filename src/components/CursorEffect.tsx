
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // Check if we're on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (!isMobile) {
      window.addEventListener("mousemove", mouseMove);
      
      // Add hover detection on interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .cursor-magnet');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('hover'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
      
      // Hide the default cursor
      document.body.style.cursor = 'none';
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", mouseMove);
        document.body.style.cursor = 'auto';
        
        // Clean up event listeners
        const interactiveElements = document.querySelectorAll('a, button, .cursor-magnet');
        
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', () => setCursorVariant('hover'));
          el.removeEventListener('mouseleave', () => setCursorVariant('default'));
        });
      }
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1.5,
      backgroundColor: "rgba(79, 70, 229, 0.6)"
    }
  };

  const outlineVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.8,
      backgroundColor: "transparent",
      borderColor: "rgba(79, 70, 229, 0.5)"
    }
  };

  // Only render on desktop
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <motion.div
        className="cursor-dot"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
      />
      <motion.div
        className="cursor-outline"
        variants={outlineVariants}
        animate={cursorVariant}
        transition={{ type: "spring", damping: 40, stiffness: 250, mass: 0.8 }}
      />
    </>
  );
};

export default CursorEffect;
