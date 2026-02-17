
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, HeartPulse, Stethoscope, Pill, Bus as Ambulance, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DisclaimerPage = () => {
  const cards = [
    {
      title: "ليست بديلاً عن الرعاية الطبية",
      icon: <HeartPulse className="w-8 h-8 text-pink-500" />,
      content: "المعلومات المقدمة عبر هذا النظام هي لأغراض تعليمية وإرشادية فقط. لا ينبغي اعتبارها بديلاً عن الاستشارة الطبية المتخصصة أو التشخيص أو العلاج من قبل متخصصين مؤهلين."
    },
    {
      title: "عدم تقديم تشخيص طبي",
      icon: <Stethoscope className="w-8 h-8 text-blue-500" />,
      content: "هذا النظام الذكي لا يملك القدرة على إصدار تشخيصات طبية أو نفسية معتمدة. أي تقييم يظهر هو مجرد مؤشر أولي لا يعتد به كتشخيص نهائي."
    },
    {
      title: "لا تقدم علاجاً دوائياً",
      icon: <Pill className="w-8 h-8 text-purple-500" />,
      content: "لا يقدم النظام أي توصيات بخصوص الأدوية أو الجرعات. استشارة الطبيب المختص ضرورية قبل البدء أو التوقف عن تناول أي دواء."
    },
    {
      title: "حالات الطوارئ والأزمات",
      icon: <Ambulance className="w-8 h-8 text-red-500" />,
      content: "في حال وجود خطر فوري على حياتك أو حياة الآخرين، أو أفكار انتحارية، يرجى التوقف عن استخدام النظام فوراً والاتصال بالطوارئ أو التوجه لأقرب مستشفى."
    },
    {
      title: "مسؤولية المستخدم",
      icon: <UserCheck className="w-8 h-8 text-emerald-500" />,
      content: "استخدامك لهذا النظام يعني موافقتك على تحمل المسؤولية الكاملة عن قراراتك. لا يتحمل المركز مسؤولية أي إجراءات تتخذ بناءً على المعلومات المقدمة."
    },
    {
      title: "التكامل لا الاستبدال",
      icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
      content: "تم تصميم هذه الأدوات لتكون مساعدة وداعمة لعمل الأخصائيين النفسيين وليست لتحل محلهم. العلاج البشري يظل هو الأساس في الحالات النفسية."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans flex flex-col" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <div className="relative py-16 px-4 overflow-hidden flex-shrink-0">
        {/* Background gradient effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[20%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[20%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-full mb-6 border border-yellow-500/20"
          >
            <AlertTriangle className="w-10 h-10 text-yellow-500" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400"
          >
            إخلاء مسؤولية وشروط الاستخدام الهامة
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed"
          >
            يرجى قراءة هذه الشروط بعناية قبل استخدام المنصة. استخدامك للخدمة يعني موافقتك الكاملة على هذه البنود.
          </motion.p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto px-4 pb-20 relative z-10 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="bg-slate-950/80 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-slate-800 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {card.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-purple-400 transition-colors font-display">
                  {card.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed text-sm">
                  {card.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl transition-all font-medium border border-slate-700 hover:border-slate-600 hover:shadow-lg hover:shadow-purple-500/10"
          >
            <ArrowRight className="w-5 h-5" />
            <span>العودة للرئيسية</span>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default DisclaimerPage;
