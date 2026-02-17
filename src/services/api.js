// ✅ نسخة نهائية تدعم الجوال والحاسوب عبر HTTPS
const API_BASE_URL = '/api'; 
const API_TIMEOUT = 300000; 

const EMERGENCY_KEYWORDS = {
  ar: ['انتحار', 'اقتل نفسي', 'أنهي حياتي', 'إيذاء النفس', 'الموت', 'أريد أن أموت'],
  en: ['suicide', 'kill myself', 'end my life', 'self-harm', 'want to die']
};

const EMERGENCY_MESSAGE = `تحذير: يبدو أنك تمر بأزمة نفسية حادة. يرجى الاتصال بـ 911 فوراً لتقديم المساعدة لك. نحن نهتم لأمرك.`;

function detectEmergency(message) {
  if (!message) return false;
  const lowerMessage = message.toLowerCase();
  return EMERGENCY_KEYWORDS.ar.some(k => lowerMessage.includes(k)) || 
         EMERGENCY_KEYWORDS.en.some(k => lowerMessage.includes(k));
}

export async function sendMessage(message, history = [], userData = null) {
  let timeoutId;
  try {
    if (detectEmergency(message)) {
      return { 
        text: EMERGENCY_MESSAGE, 
        isEmergency: true, 
        emergencyMessage: EMERGENCY_MESSAGE 
      };
    }

    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        history: history.map(msg => ({ 
          role: msg.isUser ? 'user' : 'assistant', 
          content: msg.text 
        })),
        user_id: userData?.id || "guest_user",
        user_profile: userData
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    return {
      text: data.response || 'عذراً، لم أستطع صياغة رد مناسب.',
      source: data.source || 'ذكاء اصطناعي',
      isEmergency: data.isEmergency || false,
      emergencyMessage: data.isEmergency ? data.response : null 
    };

  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId);
    return { 
        text: error.name === 'AbortError' ? 'السيرفر استغرق وقتاً طويلاً.' : 'فشل الاتصال بالخادم. يرجى التأكد من الإنترنت.', 
        error: true 
    };
  }
}

export function getChatHistory() { return JSON.parse(localStorage.getItem('psych_chat_history') || '[]'); }
export function saveChatHistory(messages) { localStorage.setItem('psych_chat_history', JSON.stringify(messages)); }
export function clearChatHistory() { localStorage.removeItem('psych_chat_history'); }
