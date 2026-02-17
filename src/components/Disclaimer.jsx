
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mt-3 overflow-hidden"
      dir="rtl"
    >
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-lg p-3 flex items-start gap-3">
        <div className="bg-amber-500/20 p-1.5 rounded-full flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
        </div>
        <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
          <span className="text-amber-400 font-bold block mb-1">تنبيه هام:</span>
          هذه الإجابة مولدة بالذكاء الاصطناعي وقد تحتمل الخطأ. يرجى دائماً استشارة متخصص نفسي معتمد للحصول على تشخيص دقيق وخطة علاجية مناسبة.
        </p>
      </div>
    </motion.div>
  );
};

export default Disclaimer;
