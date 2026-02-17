
import React from 'react';
import { BookOpen, Sparkles, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const SourceBadge = ({ source, sourceFile, sourceSection }) => {
  const isKnowledgeBase = source === 'knowledge_base';
  const isAI = source === 'ai';

  if (!source) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-2 select-none" dir="rtl">
      {/* Main Badge */}
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm transition-all hover:scale-105",
          isKnowledgeBase 
            ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border border-violet-400/30"
            : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border border-blue-400/30",
            !isKnowledgeBase && !isAI && "bg-gray-700 text-gray-300" // Fallback
        )}
      >
        {isKnowledgeBase ? (
          <>
            <BookOpen className="w-3.5 h-3.5" />
            <span>من قاعدة المعرفة</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5" />
            <span>إجابة مولدة بالذكاء الاصطناعي</span>
          </>
        )}
      </div>

      {/* Reference Details */}
      {(sourceFile || sourceSection) && isKnowledgeBase && (
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
          <FileText className="w-3 h-3 text-gray-400" />
          <span className="font-semibold">{sourceFile}</span>
          {sourceSection && (
            <>
              <span className="text-gray-500 mx-0.5">/</span>
              <span className="opacity-80">{sourceSection}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SourceBadge;
