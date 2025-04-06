
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true until we check

  useEffect(() => {
    // More comprehensive check for touch devices
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      );
    };

    const isTouchCapable = checkTouchDevice();
    setIsTouchDevice(isTouchCapable);

    if (!isTouchCapable) {
      const mouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      };
      
      window.addEventListener("mousemove", mouseMove);
      
      // Add hover detection on interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .cursor-magnet');
      
      const handleMouseEnter = () => setCursorVariant('hover');
      const handleMouseLeave = () => setCursorVariant('default');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      
      // Hide the default cursor
      document.body.style.cursor = 'none';

      return () => {
        window.removeEventListener("mousemove", mouseMove);
        document.body.style.cursor = 'auto';
        
        // Clean up event listeners
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }
  }, []);

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1.5,
      backgroundColor: "rgba(59, 130, 246, 0.6)"
    }
  };

  const outlineVariants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 2,
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderColor: "rgba(59, 130, 246, 0.5)"
    }
  };

  // Only render on non-touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <motion.div
        className="cursor-dot"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "tween", duration: 0 }}
      />
      <motion.div
        className="cursor-ring"
        variants={outlineVariants}
        animate={cursorVariant}
        transition={{ type: "tween", duration: 0 }}
      />
    </>
  );
};

export default CursorEffect;
