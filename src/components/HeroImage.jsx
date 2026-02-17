
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

const HeroImage = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-8 group">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1683226170046-a6794c48eefb" 
          alt="Warm supportive environment" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-warm-orange/80 via-warm-gold/60 to-warm-red/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-4 bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30"
        >
          <Sparkles className="w-8 h-8 text-warm-gold" />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold font-display mb-4 drop-shadow-md text-white"
        >
          نحن هنا لأجلك
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl font-light max-w-2xl text-white/90"
        >
          مساحة آمنة وموثوقة للدعم النفسي والاستشارات المتخصصة
        </motion.p>
        
        {/* Floating Icons Decor */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 hidden md:block"
        >
          <HeartHandshake className="w-6 h-6 text-white" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute top-8 left-8 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 hidden md:block"
        >
          <ShieldCheck className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroImage;
