
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, MessageSquare, Sparkles, LogOut, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import EmergencyAlert from './EmergencyAlert';
import Header from './Header';
import Footer from './Footer';
import WelcomeMessage from './WelcomeMessage';
import { sendMessage, getChatHistory, saveChatHistory, clearChatHistory } from '../services/api';
import { useToast } from './ui/use-toast';

const ChatWindow = ({
  userData,
  onLogout
}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);
  const messagesEndRef = useRef(null);
  const {
    toast
  } = useToast();

  // Load & Save History
  useEffect(() => {
    const history = getChatHistory();
    if (history.length > 0) setMessages(history);
  }, []);
  useEffect(() => {
    if (messages.length > 0) saveChatHistory(messages);
  }, [messages]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async e => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    const userText = inputValue.trim();
    const userMessage = {
      id: Date.now(),
      text: userText,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    try {
      const response = await sendMessage(userText, messages, userData);
      if (response.isEmergency) {
        setEmergencyData({
          message: response.emergencyMessage
        });
      }
      const assistantMessage = {
        id: Date.now() + 1,
        text: response.text,
        isUser: false,
        timestamp: new Date().toISOString(),
        source: response.source,
        sourceFile: response.sourceFile,
        sourceSection: response.sourceSection
      };
      setMessages(prev => [...prev, assistantMessage]);
      if (response.error) {
        toast({
          title: 'تنبيه اتصال',
          description: response.text,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'خطأ غير متوقع',
        description: 'حدث خطأ أثناء المعالجة. يرجى المحاولة مرة أخرى.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (messages.length === 0) return;
    if (window.confirm('هل أنت متأكد من حذف سجل المحادثة بالكامل؟')) {
      setMessages([]);
      clearChatHistory();
      toast({
        title: 'تم الحذف',
        description: 'تم مسح سجل المحادثة بنجاح.'
      });
    }
  };
  
  const handleLogout = () => {
    if (window.confirm('هل تريد حقاً تسجيل الخروج؟ سيتم حذف بياناتك المحلية.')) {
      onLogout();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-warm-creamDark text-warm-text font-sans selection:bg-warm-orange/30 overflow-hidden relative" dir="rtl">
      
      {/* Warm Ambience Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-warm-orange/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-warm-gold/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[30%] h-[30%] bg-warm-red/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Emergency Overlay */}
      {emergencyData && <EmergencyAlert message={emergencyData.message} onDismiss={() => setEmergencyData(null)} />}

      {/* Main Header */}
      <Header />

      {/* Sub Header / Chat Toolbar */}
      <div className="relative z-10 bg-white/60 backdrop-blur-md border-b border-warm-orange/10">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-warm-orange to-warm-red p-2 rounded-xl shadow-warm">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-warm-text font-display">
                مستشارك النفسي
              </h3>
              {userData && <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-warm-orangeDark" />
                  <p className="text-xs text-warm-subtext font-medium">
                    مرحباً {userData.name}
                  </p>
                </div>}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={handleClearChat} className="p-2 text-warm-subtext hover:text-warm-red hover:bg-warm-red/10 rounded-xl transition-all" title="مسح المحادثة">
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-warm-orange/20 mx-1"></div>
            <button onClick={handleLogout} className="p-2 text-warm-subtext hover:text-warm-text hover:bg-white rounded-xl transition-all flex items-center gap-2 group border border-transparent hover:border-warm-orange/10 hover:shadow-sm" title="تسجيل الخروج">
              <span className="text-xs font-medium hidden group-hover:inline-block transition-all">خروج</span>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto px-0 py-6 relative z-10 scroll-smooth">
        <div className="w-full px-4 min-h-full flex flex-col justify-end">
          {messages.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 flex-1 flex flex-col justify-center items-center">
              <div className="w-28 h-28 bg-white/80 rounded-full flex items-center justify-center mb-8 border border-warm-orange/20 shadow-warm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-warm-orange/10 to-warm-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Heart className="w-14 h-14 text-warm-red fill-warm-red/10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-warm-text mb-4 font-display">مرحباً بك في مساحتك الآمنة</h2>
              <p className="text-warm-subtext max-w-lg mx-auto text-lg leading-relaxed mb-6">
                أنا هنا للاستماع إليك ودعمك يا <span className="text-warm-orangeDark font-bold">{userData ? userData.name.split(' ')[0] : 'صديقي'}</span>. 
                جميع محادثاتنا سرية ومشفرة تماماً.
              </p>
              <WelcomeMessage />
            </motion.div>
          ) : (
            <div className="space-y-8 pb-4">
              {messages.map(msg => <MessageBubble key={msg.id} message={msg} isUser={msg.isUser} timestamp={msg.timestamp} />)}
            </div>
          )}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center gap-3 p-4 w-fit bg-white/80 rounded-2xl border border-warm-orange/10 shadow-sm mx-4 mb-4">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-warm-orange rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-warm-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-warm-red rounded-full animate-bounce" />
                </div>
                <span className="text-xs text-warm-subtext font-medium">جاري التحليل والكتابة...</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* Input Area */}
      <div className="bg-white/70 backdrop-blur-xl border-t border-warm-orange/10 p-4 relative z-20 shadow-[0_-5px_20px_-5px_rgba(255,140,66,0.1)]">
        <div className="w-full">
          <form onSubmit={handleSendMessage} className="relative flex items-center gap-3">
            <input 
              type="text" 
              value={inputValue} 
              onChange={e => setInputValue(e.target.value)} 
              placeholder="اكتب رسالتك هنا..." 
              disabled={isLoading} 
              className="w-full bg-warm-cream/50 border-2 border-warm-orange/10 text-warm-text rounded-2xl px-6 py-2 pr-6 pl-14 focus:outline-none focus:border-warm-orange focus:ring-4 focus:ring-warm-orange/10 transition-all placeholder:text-warm-subtext/60 text-sm leading-normal shadow-inner disabled:opacity-50" 
            />
            
            <motion.button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-warm-orange to-warm-red text-white p-2 rounded-xl shadow-warm hover:shadow-warm-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className={cn("w-4 h-4", isLoading && "opacity-0")} />
              {isLoading && <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>}
            </motion.button>
          </form>
          <p className="text-center text-[9px] text-warm-subtext mt-2 font-medium opacity-80">
             المحتوى للأغراض الإرشادية فقط ولا يغني عن الاستشارة الطبية المتخصصة
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChatWindow;
