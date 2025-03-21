
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
      x: mousePosition.x - 2, // Smaller size
      y: mousePosition.y - 2,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      scale: 1.1, // Less scale on hover
      backgroundColor: "rgba(255, 64, 129, 0.6)" // Change to gradient color
    }
  };

  const outlineVariants = {
    default: {
      x: mousePosition.x - 6, // Smaller outline
      y: mousePosition.y - 6,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      scale: 1.3, // Less scale on hover
      backgroundColor: "rgba(0, 0, 0, 0)", 
      borderColor: "rgba(255, 64, 129, 0.5)" // Match with primary color
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
