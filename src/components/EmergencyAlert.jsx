
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, X } from 'lucide-react';

const EmergencyAlert = ({ message, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Lock body scroll when alert is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(onDismiss, 300);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          dir="rtl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-lg bg-gradient-to-br from-red-600 to-orange-700 rounded-3xl shadow-2xl border border-red-400/30 overflow-hidden relative"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 left-4 p-2 bg-black/20 hover:bg-black/30 text-white/80 hover:text-white rounded-full transition-colors z-10"
              aria-label="إغلاق التنبيه"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 text-center relative z-0">
              {/* Icon */}
              <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse-slow">
                <AlertTriangle className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>

              {/* Title */}
              <h2 className="text-3xl font-black text-white mb-4 font-display">
                تحذير طوارئ
              </h2>

              {/* Message */}
              <div className="text-white/90 text-lg leading-relaxed mb-8 font-medium">
                {message || "يبدو أنك تمر بظروف صعبة جداً. سلامتك هي أولويتنا القصوى."}
              </div>

              {/* Hotline Action */}
              <div className="space-y-3">
                <motion.a
                  href="tel:920033360"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full bg-white text-red-600 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
                >
                  <Phone className="w-6 h-6 fill-current" />
                  <span>اتصل بالخط الساخن: 911</span>
                </motion.a>
                
                <p className="text-white/60 text-sm mt-4">
                  متاح 24 ساعة طوال أيام الأسبوع • اتصال سري ومجاني
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyAlert;
