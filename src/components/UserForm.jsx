
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Calendar, ArrowRight, Activity, HeartHandshake } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const UserForm = ({
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    education: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.gender || !formData.age || !formData.education) {
      setError('جميع الحقول مطلوبة');
      return;
    }
    if (parseInt(formData.age) < 18) {
      setError('يجب أن تكون 18 سنة أو أكثر للدخول');
      return;
    }

    // Success
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-warm-creamDark flex flex-col relative overflow-hidden font-sans" dir="rtl">
      
      {/* Warm Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-warm-orange/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-warm-gold/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <Header />

      <div className="flex-1 flex items-center justify-center p-4 relative z-10 my-8">
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl border border-warm-orange/10 rounded-3xl shadow-warm p-8 relative overflow-hidden">
            
            {/* Decor Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-warm-orange via-warm-gold to-warm-red" />

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-tr from-warm-orange to-warm-red rounded-full flex items-center justify-center mx-auto mb-5 shadow-warm ring-4 ring-white">
                <HeartHandshake className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold font-display text-warm-text mb-2">المنصة الافتراضية للاستشارات النفسية</h2>
              <p className="text-warm-subtext text-sm font-medium">خطوتك الأولى نحو الراحة النفسية تبدأ هنا</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-warm-text flex items-center gap-2">
                  <User className="w-4 h-4 text-warm-orange" />
                  الاسم
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="أدخل اسمك الكريم" className="w-full bg-warm-cream border border-warm-orange/10 rounded-xl px-4 py-3.5 text-warm-text placeholder:text-warm-subtext/50 focus:outline-none focus:border-warm-orange focus:ring-4 focus:ring-warm-orange/10 transition-all hover:bg-white" />
              </div>

              {/* Gender Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-warm-text flex items-center gap-2">
                  <User className="w-4 h-4 text-warm-goldDark" />
                  الجنس
                </label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-warm-cream border border-warm-orange/10 rounded-xl px-4 py-3.5 text-warm-text focus:outline-none focus:border-warm-orange focus:ring-4 focus:ring-warm-orange/10 transition-all appearance-none hover:bg-white">
                  <option value="" disabled>اختر الجنس</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>

              {/* Age Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-warm-text flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-warm-red" />
                  العمر
                </label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="أدخل عمرك" className="w-full bg-warm-cream border border-warm-orange/10 rounded-xl px-4 py-3.5 text-warm-text placeholder:text-warm-subtext/50 focus:outline-none focus:border-warm-orange focus:ring-4 focus:ring-warm-orange/10 transition-all hover:bg-white" />
              </div>

              {/* Education Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-warm-text flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-warm-orangeDark" />
                  المستوى التعليمي
                </label>
                <select name="education" value={formData.education} onChange={handleChange} className="w-full bg-warm-cream border border-warm-orange/10 rounded-xl px-4 py-3.5 text-warm-text focus:outline-none focus:border-warm-orange focus:ring-4 focus:ring-warm-orange/10 transition-all appearance-none hover:bg-white">
                  <option value="" disabled>اختر المستوى التعليمي</option>
                  <option value="ابتدائي">ابتدائي</option>
                  <option value="متوسط">متوسط</option>
                  <option value="ثانوي">ثانوي</option>
                  <option value="جامعي">جامعي</option>
                  <option value="ماجستير">ماجستير</option>
                  <option value="دكتوراه">دكتوراه</option>
                </select>
              </div>

              {/* Error Message */}
              {error && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-3 text-sm font-bold text-center">
                  {error}
                </motion.div>}

              {/* Submit Button */}
              <button type="submit" className="w-full bg-gradient-to-r from-warm-orange to-warm-red hover:from-warm-orangeDark hover:to-warm-redDark text-white font-bold py-4 px-6 rounded-xl shadow-warm hover:shadow-warm-hover transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4 text-lg">
                <span>ابدأ رحلتك الآن</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserForm;
