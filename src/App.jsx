import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ChatWindow from './components/ChatWindow';
import UserForm from './components/UserForm';
import DisclaimerPage from './pages/DisclaimerPage';
import { Toaster } from './components/ui/toaster';

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // إعداد اتجاه اللغة العربية للموقع بالكامل
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    
    // جلب بيانات المستخدم المخزنة
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      try {
        setUserData(JSON.parse(savedUser));
      } catch (e) {
        console.error("خطأ في قراءة بيانات المستخدم", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleUserSubmit = (data) => {
    // إضافة معرف فريد (ID) للمستخدم إذا لم يوجد لضمان عمل قاعدة البيانات (SQLite) بشكل صحيح
    const userWithId = { 
      ...data, 
      id: data.id || `user_${Date.now()}` 
    };
    setUserData(userWithId);
    localStorage.setItem('userData', JSON.stringify(userWithId));
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
  };

  if (!isLoaded) return (
    <div className="h-screen flex items-center justify-center bg-warm-creamDark">
      <p className="text-warm-text animate-pulse">جاري التحميل...</p>
    </div>
  );

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={
            userData ? (
              // تمرير بيانات المستخدم كاملة لـ ChatWindow لتستخدمها في تخزين الرسائل
              <ChatWindow userData={userData} onLogout={handleLogout} />
            ) : (
              <UserForm onSubmit={handleUserSubmit} />
            )
          } 
        />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;