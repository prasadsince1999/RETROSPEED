import React from 'react';
import { Code } from 'lucide-react';

export function SyntaxHeader({ lesson, title, stage, text = '' }) {
  const textLower = (text + ' ' + title + ' ' + stage).toLowerCase();
  const isJS = /javascript|js|const |let |var |console\.log|function/i.test(textLower);
  const isPython = /python|def |print\(|elif |import |self\b/i.test(textLower);
  const isCpp = /c\+\+|cpp|#include|cout|std::|int main/i.test(textLower);
  const isHtml = /html|css|<div|<span|class=|margin|padding/i.test(textLower);
  const isJson = /json|{\s*"|key-value/i.test(textLower);

  const langName = isPython ? 'Python' : isCpp ? 'C++' : isHtml ? 'HTML / CSS' : isJson ? 'JSON' : isJS ? 'JavaScript' : 'Code Syntax';
  const langIcon = isPython ? '🐍' : isCpp ? '⚙️' : isHtml ? '🌐' : isJson ? '📋' : '⚡';

  const hasBraces = text.includes('{') || text.includes('}');
  const hasParens = text.includes('(') || text.includes(')');
  const hasBrackets = text.includes('[') || text.includes(']');
  const hasSemicolon = text.includes(';');
  const hasIndentation = text.includes('\t') || text.includes('  ');

  return (
    <div className="w-full max-w-4xl mx-auto mb-3">
      <div className="bg-[#0f172a] text-slate-200 border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
        <div className="bg-[#1e293b] text-white px-3.5 py-1 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-sky-400">✦</span>
            <span className="font-bold tracking-wider">DEV_TERMINAL.SH // SYNTAX_FORMATTING</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3.5 h-3.5 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono text-slate-300">_</span>
            <span className="w-3.5 h-3.5 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[8px] font-mono text-slate-300">□</span>
            <span className="w-3.5 h-3.5 bg-[#f87171] border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono text-slate-900">✕</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#1888ff] text-white font-mono text-xs font-black border border-slate-700 shadow-[1px_1px_0_#000] inline-flex items-center space-x-1">
                <span>{langIcon}</span>
                <span>{langName}</span>
              </span>

              <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-700">
                {stage || 'Syntax Formatting'}
              </span>

              {hasBraces && (
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] font-bold border border-amber-600">
                  Curly Braces {"{ }"}
                </span>
              )}

              {hasParens && (
                <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-mono text-[10px] font-bold border border-sky-600">
                  Parentheses ( )
                </span>
              )}

              {hasBrackets && (
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono text-[10px] font-bold border border-purple-600">
                  Square Brackets [ ]
                </span>
              )}

              {hasSemicolon && (
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-mono text-[10px] font-bold border border-rose-600">
                  Semicolon ;
                </span>
              )}

              {hasIndentation && (
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-600">
                  Indentation
                </span>
              )}
            </div>

            <div className="text-xs font-mono text-slate-300 pt-0.5 flex items-center space-x-1.5">
              <Code className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>
                Lesson {lesson.id}: {title} • <span className="text-sky-300">Reach with pinky fingers for punctuation and maintain clean rhythm.</span>
              </span>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700 shadow-[1px_1px_0_#000] text-sky-400 font-mono text-xs font-black">
              ⌨ CODE TYPING
            </span>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5">Structure & Syntax</span>
          </div>
        </div>
      </div>
    </div>
  );
}
