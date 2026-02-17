
import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import SourceBadge from './SourceBadge';
import Disclaimer from './Disclaimer';
import { cn } from '@/lib/utils';

const MessageBubble = ({ message, isUser, timestamp }) => {
  const { text, source, sourceFile, sourceSection } = message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        "flex w-full mb-6",
        isUser ? "justify-start" : "justify-end" // RTL: start is right (User)
      )}
    >
      <div className={cn(
        // Expanded to 98% on md screens as requested to maximize width
        "flex max-w-full md:max-w-[98%] gap-4",
        isUser ? "flex-row" : "flex-row-reverse" // RTL: reverse for Bot
      )}>
        
        {/* Avatar */}
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-md border-2 border-white",
          isUser ? "bg-gradient-to-br from-warm-gold to-warm-orange" : "bg-gradient-to-br from-warm-gold to-warm-orange"
        )}>
          {isUser ? <User className="w-6 h-6 text-white" /> : <Sparkles className="w-6 h-6 text-white" />}
        </div>

        {/* Content Container */}
        <div className="flex flex-col w-full">
          
          {/* Metadata for Assistant */}
          {!isUser && source && (
             <SourceBadge
               source={source}
               sourceFile={sourceFile}
               sourceSection={sourceSection}
             />
          )}

          {/* Bubble */}
          <div className={cn(
            "px-8 py-5 shadow-sm text-base leading-relaxed break-words relative transition-all hover:shadow-md border", 
            isUser 
              ? "bg-gradient-to-br from-warm-gold to-warm-orange text-gray-900 rounded-3xl rounded-tr-none border-warm-orange/20" // User (Right) - Updated to yellow/gold with dark text
              : "bg-white text-warm-text border-warm-orange/10 rounded-3xl rounded-tl-none" // Assistant (Left)
          )}>
            <p className="whitespace-pre-wrap font-sans font-medium">{text}</p>
          </div>

          {/* Footer Info */}
          <div className="flex items-center gap-2 mt-2 px-2">
             <span className="text-xs text-warm-subtext font-medium opacity-80">
                {timestamp ? new Date(timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) : ''}
             </span>
             {!isUser && source === 'ai' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-warm-gold/10 text-warm-orangeDark border border-warm-gold/20 font-medium">
                  مستشار ذكي
                </span>
             )}
          </div>

          {/* Disclaimer for Assistant */}
          {!isUser && source === 'ai' && <Disclaimer />}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
