
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const CallToAction = ({ onClick, text = "ابدأ المحادثة الآن" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 
                 bg-gradient-to-r from-warm-orange to-warm-red 
                 text-white font-bold rounded-xl shadow-warm 
                 hover:shadow-warm-hover transition-all duration-300 overflow-hidden"
    >
      <span className="relative z-10 font-display text-lg tracking-wide">{text}</span>
      <ArrowLeft className="w-5 h-5 relative z-10 group-hover:-translate-x-1 transition-transform" />
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-0" />
    </motion.button>
  );
};

export default CallToAction;
