import React from 'react';
import { ShieldAlert, FolderCheck, Search, FileSearch } from 'lucide-react';

export function DetectiveHeader({ lesson, title, stage, text = '' }) {
  const isClue = /clue|evidence|trace|footprint/i.test(title) || /evidence|clue/i.test(text);
  const isInterrogation = /interrogation|suspect|interview|witness/i.test(title) || /suspect|witness/i.test(text);
  const caseTitle = stage || 'The Stolen Diamond';

  return (
    <div className="w-full max-w-4xl mx-auto mb-3">
      <div className="bg-[#fef3c7] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
        <div className="bg-[#2c3e50] text-white px-3.5 py-1 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-amber-300">✦</span>
            <span className="font-bold tracking-wider">DETECTIVE_DOSSIER.LOG // FORENSIC_CASE_FILES</span>
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
              <span className="px-2.5 py-0.5 rounded bg-[#f59e0b] text-slate-950 font-mono text-xs font-black border border-slate-900 shadow-[1px_1px_0_#0f172a] inline-flex items-center space-x-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>CASE DOSSIER</span>
              </span>

              <span className="px-2.5 py-0.5 rounded bg-white text-slate-900 font-mono text-xs font-bold border border-slate-900 shadow-[1px_1px_0_#0f172a] inline-flex items-center space-x-1">
                <FolderCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>{caseTitle}</span>
              </span>

              {isClue && (
                <span className="px-2 py-0.5 rounded bg-[#fef08a] text-slate-950 font-mono text-[10px] font-bold border border-slate-900 inline-flex items-center space-x-1">
                  <Search className="w-3.5 h-3.5 text-amber-700" />
                  <span>DETECTIVE CLUE</span>
                </span>
              )}

              {isInterrogation && (
                <span className="px-2 py-0.5 rounded bg-[#f87171] text-slate-950 font-mono text-[10px] font-bold border border-slate-900 inline-flex items-center space-x-1">
                  <FileSearch className="w-3.5 h-3.5" />
                  <span>SUSPECT LOG</span>
                </span>
              )}
            </div>

            <div className="text-xs font-mono pt-0.5">
              <span className="font-bold text-amber-800">Scene #{lesson.id}: </span>
              <span className="font-bold text-slate-900">{lesson.title}</span>
              <span className="text-slate-600 ml-1">• Follow narrative clues and type each piece of evidence</span>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="px-2.5 py-0.5 rounded bg-white border border-slate-900 shadow-[1px_1px_0_#0f172a] text-slate-900 font-mono text-xs font-black">
              🔍 EVIDENCE BANNER
            </span>
            <span className="text-[10px] text-slate-600 font-mono mt-0.5">Interactive Story Chapter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
