
import React from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = () => {
  return (
    <motion.div
      className='w-full text-center py-4'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <p className="text-warm-subtext font-light text-sm md:text-base leading-relaxed max-w-lg mx-auto bg-white/50 px-6 py-2 rounded-full border border-warm-orange/10 shadow-sm inline-block">
        اكتب ما يجول في خاطرك في المحادثة أدناه، نحن نستمع إليك باهتمام
      </p>
    </motion.div>
  );
};

export default WelcomeMessage;
