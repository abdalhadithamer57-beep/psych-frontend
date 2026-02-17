
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full bg-gradient-to-br from-warm-cream to-white border-t border-warm-orange/10 relative z-30 min-h-[100px] flex flex-col"
      dir="rtl"
    >
      {/* Top Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-warm-orange/0 via-warm-orange/30 to-warm-orange/0" />
      
      {/* Spacer to push content to the bottom */}
      <div className="flex-grow" />

      <div className="container mx-auto px-2 pb-3 pt-6 md:pb-4 md:pt-8">
        <div className="flex flex-col items-center justify-end gap-1 text-center">
          <p className="text-warm-text text-sm md:text-base font-light font-display tracking-wide leading-tight">
            تصميم وبرمجة م.م. عبدالهادي ثامر
          </p>
          <div className="flex gap-2 py-0.5">
            <span className="h-1 w-1 rounded-full bg-warm-orange"></span>
            <span className="h-1 w-1 rounded-full bg-warm-gold"></span>
            <span className="h-1 w-1 rounded-full bg-warm-red"></span>
          </div>
          <p className="text-warm-subtext text-xs opacity-80">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
