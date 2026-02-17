import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

// استخدام React.StrictMode يساعدكِ في اكتشاف المشاكل في الكود أثناء التطوير
// ويضمن توافقية التطبيق مع أجهزة الموبايل والمتصفحات المختلفة
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);