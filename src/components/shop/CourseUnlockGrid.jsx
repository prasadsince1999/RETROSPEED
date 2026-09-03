import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';
import { COURSES_CATALOG } from '../../data/courseCatalog';

export function CourseUnlockGrid({ userProgress, onSelectCourse, onNavigate }) {
  const [courseCategory, setCourseCategory] = useState('All');
  const [courseSearch, setCourseSearch] = useState('');

  const enrolledIds = Array.isArray(userProgress.enrolledCourses) ? userProgress.enrolledCourses : ['retrospeed-odyssey'];
  const availableCourses = COURSES_CATALOG.filter(course => {
    if (enrolledIds.includes(course.id)) return false;

    if (courseCategory === 'Core Touch Typing' && course.category !== 'Core Touch Typing') return false;
    if (courseCategory === 'Programming & Tech' && course.category !== 'Programming & Tech') return false;
    if (courseCategory === 'Language & Vocab' && !(course.category === 'Language & Etymology' || course.category === 'Literature & Vocabulary')) return false;
    if (courseCategory === 'Stories & Trivia' && !(
      course.category === 'Interactive Story' ||
      course.category === 'General Knowledge' ||
      course.category === 'History & Tech' ||
      course.category === 'Science & Nature' ||
      course.category === 'Music & Arts'
    )) return false;

    if (courseSearch.trim()) {
      const query = courseSearch.toLowerCase();
      return (
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter Pills & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF3E0] p-3 rounded-2xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {[
            { id: 'All', label: 'All Curricula' },
            { id: 'Core Touch Typing', label: 'Core Typing' },
            { id: 'Programming & Tech', label: 'Coding & Tech' },
            { id: 'Stories & Trivia', label: 'Stories & Trivia' },
            { id: 'Language & Vocab', label: 'Language & Vocab' }
          ].map(cat => {
            const isSel = courseCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  setCourseCategory(cat.id);
                }}
                className={`px-3 py-1 rounded-xl border border-[#2D2319] font-bold text-[11px] transition-all ${
                  isSel 
                    ? 'bg-[#F6C445] text-[#2D2319] shadow-[1px_1px_0px_#2D2319] font-black' 
                    : 'bg-white hover:bg-[#FDF8EE] text-[#2D2319]/80 shadow-[1px_1px_0px_#2D2319]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#2D2319]/50" />
          <input
            type="text"
            value={courseSearch}
            onChange={e => setCourseSearch(e.target.value)}
            placeholder="Search course library..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#2D2319] bg-white text-xs font-mono font-bold placeholder-[#2D2319]/40 focus:outline-none focus:ring-2 focus:ring-[#48B89F] shadow-[1px_1px_0px_#2D2319]"
          />
        </div>
      </div>

      {availableCourses.length === 0 ? (
        <div className="bg-[#FAF3E0] p-8 rounded-2xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#48B89F] border-2 border-[#2D2319] text-white flex items-center justify-center mx-auto shadow-[2px_2px_0px_#2D2319]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="font-display font-black text-base text-[#2D2319]">
            All Curricula Enrolled in My Learnings!
          </div>
          <p className="text-xs text-[#2D2319]/70 font-medium font-serif max-w-sm mx-auto">
            All available international touch-typing courses are currently active in your personal space.
          </p>
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              if (onNavigate) onNavigate('learn');
            }}
            className="px-5 py-2.5 bg-[#4BA3E3] hover:bg-[#3d94d3] text-white border-2 border-[#2D2319] rounded-xl font-mono text-xs font-black shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center space-x-2 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>▶ Go to My Learnings Space</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableCourses.map(course => {
            const headerBg = 
              course.titleVariant === 'teal' ? 'bg-[#48B89F]' :
              course.titleVariant === 'mustard' ? 'bg-[#F6C445]' :
              course.titleVariant === 'coral' ? 'bg-[#F28B82]' :
              course.titleVariant === 'lilac' ? 'bg-[#C3A6E8]' :
              course.titleVariant === 'dark' ? 'bg-[#2D2319] text-white' :
              'bg-[#4BA3E3]';

            return (
              <div
                key={course.id}
                className="rounded-2xl border-2 border-[#2D2319] bg-[#FAF3E0] shadow-[4px_4px_0px_#2D2319] flex flex-col justify-between overflow-hidden transition-all hover:-translate-y-0.5"
              >
                <div>
                  <div className={`px-3.5 py-2 border-b-2 border-[#2D2319] flex items-center justify-between font-mono text-xs font-bold ${headerBg}`}>
                    <div className="flex items-center space-x-1.5 truncate">
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{course.badge || 'Course'}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/80 text-[#2D2319] border border-[#2D2319] text-[10px] font-black shrink-0 shadow-[1px_1px_0px_#2D2319]">
                      {course.lessonsCount} Lessons
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-display font-black text-base text-[#2D2319] leading-tight">
                      {course.title}
                    </h3>

                    <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-[#2D2319]/70">
                      <span className="px-2 py-0.5 rounded bg-white border border-[#2D2319]">
                        {course.category}
                      </span>
                      <span>•</span>
                      <span>{course.grade}</span>
                    </div>

                    <p className="text-xs text-[#2D2319]/80 font-medium leading-relaxed font-serif pt-1">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playKeyClick();
                      if (onSelectCourse) onSelectCourse(course.id);
                      if (onNavigate) onNavigate('learn');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border-2 border-[#2D2319] font-mono text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer bg-[#F6C445] hover:bg-[#fbd366] text-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <span>+ Add to My Learnings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
