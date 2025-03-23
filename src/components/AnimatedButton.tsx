
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const AnimatedButton = ({ 
  children, 
  className = "", 
  onClick, 
  type = "button",
  disabled = false,
  variant = "primary"
}: AnimatedButtonProps) => {
  const baseClasses = variant === "primary" 
    ? "button-primary" 
    : "button-secondary";
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className} relative overflow-hidden group`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span 
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
