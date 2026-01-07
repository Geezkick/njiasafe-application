import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, onClick, variant = 'primary', size = 'medium', fullWidth = false, loading = false, disabled = false, className = '' }) => {
  const baseStyles = "rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
  const variants = {
    primary: "bg-gradient-to-r from-njia-darkblue to-njia-purple hover:from-njia-darkblue/90 hover:to-njia-purple/90 text-white focus:ring-njia-orange",
    secondary: "bg-gradient-to-r from-njia-orange to-orange-600 hover:from-njia-orange/90 hover:to-orange-600/90 text-white focus:ring-njia-purple",
    outline: "border-2 border-njia-darkblue text-njia-darkblue hover:bg-njia-darkblue hover:text-white focus:ring-njia-darkblue",
    ghost: "text-gray-300 hover:text-njia-orange hover:bg-gray-800 focus:ring-njia-orange"
  };
  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button whileHover={{ scale: disabled ? 1 : 1.05 }} whileTap={{ scale: disabled ? 1 : 0.95 }} onClick={onClick} disabled={disabled || loading} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} relative overflow-hidden`}>
      {loading && <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />}
      <span className="flex items-center justify-center space-x-2">
        {loading && <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />}
        <span>{children}</span>
      </span>
    </motion.button>
  );
};
export default AnimatedButton;
