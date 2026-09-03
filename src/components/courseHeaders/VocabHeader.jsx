import React from 'react';
import { BookOpen } from 'lucide-react';

export function VocabHeader({ lesson, title, stage }) {
  const isIntro = /intro/i.test(title);
  const isContext = /context/i.test(title) || /slide/i.test(title);
  const isSynonym = /synonym/i.test(title) || /antonym/i.test(title);
  const isReview = /review/i.test(title) || /quiz/i.test(title) || /assessment/i.test(title);

  return (
    <div className="w-full max-w-4xl mx-auto mb-3">
      <div className="bg-[#dcfce7] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
        <div className="bg-[#2c3e50] text-white px-3.5 py-1 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-300">✦</span>
            <span className="font-bold tracking-wider">VOCABULARY_READER.TXT // NONFICTION_MEMOIRS</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3.5 h-3.5 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono text-slate-300">_</span>
            <span className="w-3.5 h-3.5 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[8px] font-mono text-slate-300">□</span>
            <span className="w-3.5 h-3.5 bg-[#f87171] border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono text-slate-900">✕</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-900">
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-white text-slate-950 font-mono text-xs font-black border border-slate-900 shadow-[1px_1px_0_#0f172a] inline-flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span>Narrative Nonfiction</span>
              </span>

              <span className="px-2.5 py-0.5 rounded bg-emerald-200 text-emerald-950 font-mono text-xs font-bold border border-emerald-600">
                {stage || 'Literary Vocabulary'}
              </span>

              {isIntro && (
                <span className="px-2 py-0.5 rounded bg-[#1888ff] text-white font-mono text-[10px] font-bold border border-slate-900">
                  Word Introduction
                </span>
              )}

              {isContext && (
                <span className="px-2 py-0.5 rounded bg-[#f59e0b] text-slate-950 font-mono text-[10px] font-bold border border-slate-900">
                  Word in Context
                </span>
              )}

              {isSynonym && (
                <span className="px-2 py-0.5 rounded bg-[#a78bfa] text-slate-950 font-mono text-[10px] font-bold border border-slate-900">
                  Synonyms & Antonyms
                </span>
              )}

              {isReview && (
                <span className="px-2 py-0.5 rounded bg-[#48bb78] text-slate-950 font-mono text-[10px] font-bold border border-slate-900">
                  Mastery Challenge
                </span>
              )}
            </div>

            <div className="text-xs font-mono text-slate-700 pt-0.5">
              <span>Lesson {lesson.id}: {title} • </span>
              <span className="font-bold text-emerald-900">Build rich academic vocabulary through celebrated memoirs.</span>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="px-2.5 py-0.5 rounded bg-white border border-slate-900 shadow-[1px_1px_0_#0f172a] text-slate-900 font-mono text-xs font-black">
              📖 VOCABULARY
            </span>
            <span className="text-[10px] text-slate-600 font-mono mt-0.5">Roots & Meaning</span>
          </div>
        </div>
      </div>
    </div>
  );
}
