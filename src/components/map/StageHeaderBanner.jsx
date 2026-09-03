import React from 'react';
import { BookOpen } from 'lucide-react';

export function StageHeaderBanner({ course, progressPercent, totalStars, totalPoints }) {
  const titleVariant = course.titleVariant || 'sky';
  const headerBarBg = 
    titleVariant === 'coral' ? 'bg-[#F28B82]' :
    titleVariant === 'mustard' ? 'bg-[#F6C445]' :
    titleVariant === 'teal' ? 'bg-[#48B89F]' :
    titleVariant === 'lilac' ? 'bg-[#C3A6E8]' :
    titleVariant === 'dark' ? 'bg-[#2D2319]' :
    'bg-[#4BA3E3]';

  return (
    <div className="rounded-2xl bg-[var(--rs-paper-alt)] border-2 border-[#2D2319] shadow-[6px_6px_0px_var(--rs-shadow)] overflow-hidden transition-colors duration-200">
      <div className={`${headerBarBg} text-[#2D2319] px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between font-mono text-xs font-bold`}>
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-[#2D2319]" />
          <span className="tracking-wide uppercase truncate max-w-xs">{course.title || 'Course Map'}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-white/60 border border-[#2D2319] inline-block" />
          <span className="w-3 h-3 rounded-full bg-white/60 border border-[#2D2319] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#2D2319] inline-block" />
        </div>
      </div>

      <div className="p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-bold uppercase border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              {course.category}
            </span>
            <span className="px-2 py-0.5 rounded bg-white text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              {course.grade}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-[#2D2319]">
            {course.title}
          </h1>
          
          <p className="text-xs sm:text-sm text-[#2D2319]/80 mt-2 font-mono leading-relaxed max-w-xl">
            {course.description}
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col md:items-end space-y-2 bg-white text-[#2D2319] px-5 py-4 rounded-2xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]">
          <div className="flex items-center justify-between md:justify-end gap-3 w-full font-mono">
            <span className="text-xs text-[#2D2319]/70 font-bold">Progress</span>
            <span className="text-xl sm:text-2xl font-black">{progressPercent}%</span>
          </div>

          <div className="w-full md:w-48 h-3 bg-[var(--rs-paper)] rounded-full border-2 border-[#2D2319] overflow-hidden p-0.5">
            <div 
              className="h-full rounded-full bg-[#10B981] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-2 pt-1 font-mono text-xs font-black">
            <span className="px-2 py-0.5 rounded bg-[#F6C445] text-[#2D2319] border border-[#2D2319]">
              ★ {totalStars} Stars
            </span>
            <span className="px-2 py-0.5 rounded bg-[#4BA3E3] text-white border border-[#2D2319]">
              {totalPoints.toLocaleString()} pts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
