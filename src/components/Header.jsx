
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-warm-cream/90 backdrop-blur-xl border-b border-warm-orange/10 shadow-sm relative z-40" dir="rtl">
      {/* Top Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-warm-orange via-warm-gold to-warm-red"></div>
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
           {/* Logo and Institution Name */}
           <div className="flex items-center gap-4 md:gap-6">
             {/* Logo Section */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5 }}
               className="relative flex-shrink-0"
             >
               <Link to="/">
                 <div className="relative z-10 bg-white rounded-xl p-1.5 border border-warm-orange/20 shadow-warm cursor-pointer hover:shadow-warm-hover transition-all duration-300">
                   <img 
                     src="https://horizons-cdn.hostinger.com/3adad42e-ad0b-4cf5-b1d9-abe298bc88fb/ae8d93ef133666622eb7901981c7f1e9.png" 
                     alt="شعار وزارة التعليم العالي والبحث العلمي" 
                     className="h-14 md:h-16 w-auto object-contain"
                   />
                 </div>
               </Link>
             </motion.div>

             {/* Vertical Divider */}
             <div className="h-10 w-px bg-warm-orange/20 hidden sm:block"></div>

             {/* Text Section */}
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="flex flex-col justify-center"
             >
               <h1 className="text-warm-text font-bold text-lg md:text-2xl font-display tracking-wide leading-tight">
                 مركز البحوث النفسية
               </h1>
               <p className="text-warm-subtext text-[10px] md:text-sm font-medium tracking-wider">
                 وزارة التعليم العالي والبحث العلمي
               </p>
             </motion.div>
           </div>

           {/* Terms of Use Link */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
           >
             <Link 
               to="/disclaimer" 
               className="flex items-center gap-2 text-warm-subtext hover:text-warm-orange transition-colors text-xs md:text-sm font-medium bg-white/50 hover:bg-white px-3 py-2 rounded-xl border border-warm-orange/10 hover:border-warm-orange/30 hover:shadow-sm"
             >
               <ShieldAlert className="w-4 h-4" />
               <span className="hidden sm:inline">شروط الاستخدام</span>
             </Link>
           </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
