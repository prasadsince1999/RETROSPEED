import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Check, 
  Sparkles, 
  Filter, 
  Code, 
  Globe, 
  Shield, 
  Terminal, 
  Play, 
  Plus, 
  Layers, 
  Keyboard,
  Folder,
  Library,
  Search
} from 'lucide-react';
import { COURSES_CATALOG } from '../data/courseCatalog';
import { sound } from '../utils/audio';

const CATEGORY_TABS = [
  { id: 'All', label: 'All Curricula' },
  { id: 'Core Touch Typing', label: 'Core Typing' },
  { id: 'Programming & Tech', label: 'Coding & Tech' },
  { id: 'Trivia & Science', label: 'Stories & Trivia' },
  { id: 'Language & Vocab', label: 'Language & Vocab' },
  { id: 'Alternative Layouts', label: 'Alternative Layouts' },
];

export default function CourseCatalog({ onBack, onSelectCourse, enrolledCourses = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onBack) {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const matchesCategoryGroup = (course, catId) => {
    if (catId === 'All') return true;
    if (catId === 'Core Touch Typing') return course.category === 'Core Touch Typing';
    if (catId === 'Programming & Tech') return course.category === 'Programming & Tech';
    if (catId === 'Alternative Layouts') return course.category === 'Alternative Layouts';
    if (catId === 'Language & Vocab') {
      return course.category === 'Language & Etymology' || course.category === 'Literature & Vocabulary';
    }
    if (catId === 'Trivia & Science') {
      return (
        course.category === 'Interactive Story' ||
        course.category === 'Geography & Trivia' ||
        course.category === 'General Knowledge' ||
        course.category === 'History & Tech' ||
        course.category === 'Science & Nature' ||
        course.category === 'Music & Arts'
      );
    }
    return course.category === catId;
  };

  const filtered = COURSES_CATALOG.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.keyboardType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = matchesCategoryGroup(course, selectedCategory);
    return matchesSearch && matchesCat;
  });

  const tabsWithCounts = CATEGORY_TABS.map(tab => ({
    ...tab,
    count: COURSES_CATALOG.filter(c => matchesCategoryGroup(c, tab.id)).length
  }));

  const getCourseColor = (course) => {
    const map = {
      'typing-jungle': 'bg-[#48bb78]',
      'code-typing': 'bg-[#6366f1]',
      'loanwords': 'bg-[#14b8a6]',
      'music-theory': 'bg-[#a855f7]',
      'us-state-facts': 'bg-[#3b82f6]',
      'mystery-detective': 'bg-[#f59e0b]',
      'vocab-nonfiction': 'bg-[#06b6d4]',
      'short-stories': 'bg-[#ec4899]',
      'dvorak-layout': 'bg-[#8b5cf6]',
      'colemak-layout': 'bg-[#10b981]'
    };
    return map[course.id] || 'bg-[#2c3e50]';
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 select-none font-sans space-y-6">
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0_#0f172a]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <button
              type="button"
              onClick={() => {
                sound.playKeyClick();
                if (onBack) onBack();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-bold border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center space-x-1.5 mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portal</span>
            </button>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-[#fef08a] border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] flex items-center justify-center text-slate-900 font-bold">
                <Library className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                Curriculum Library Directory
              </h1>
              <span className="px-2.5 py-0.5 rounded-md bg-[#1888ff] text-white font-mono text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
                {COURSES_CATALOG.length} Tracks
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl font-medium">
              Curated touch typing tracks for programmers, music theorists, state trivia buffs, linguistic etymologists, and alternative layout enthusiasts.
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <div className="flex items-center bg-slate-50 border-2 border-slate-900 rounded-xl px-3 py-2 shadow-[3px_3px_0_#0f172a] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1888ff]">
              <Search className="w-4 h-4 text-slate-600 mr-2 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search tracks, topics..."
                className="w-full bg-transparent border-none outline-none text-xs font-bold text-slate-900 placeholder:text-slate-400 font-mono"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 px-1 font-mono"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {tabsWithCounts.map(tab => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playKeyClick();
                setSelectedCategory(tab.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all flex items-center space-x-1.5 font-display ${
                isActive
                  ? 'bg-[#1888ff] text-white border-slate-900 shadow-[3px_3px_0_#0f172a] -translate-y-0.5'
                  : 'bg-white text-slate-800 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:bg-slate-100 hover:shadow-[3px_3px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] ${
                isActive ? 'bg-sky-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center shadow-[4px_4px_0_#0f172a]">
          <div className="w-12 h-12 rounded-xl bg-slate-100 border-2 border-slate-900 text-slate-600 flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0_#0f172a]">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-slate-900 font-display">No courses found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            We couldn't find any courses matching your search query. Try clearing the filter or search bar.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-3 py-1.5 rounded-lg bg-[#1888ff] text-white font-black text-xs border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(course => {
            const isEnrolled = enrolledCourses.includes(course.id);
            const headerColor = getCourseColor(course);

            return (
              <div
                key={course.id}
                onClick={() => {
                  sound.playKeyClick();
                  onSelectCourse(course.id);
                }}
                className="bg-white border-2 border-slate-900 rounded-2xl shadow-[5px_5px_0_#0f172a] hover:shadow-[7px_7px_0_#0f172a] hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden flex flex-col justify-between group"
              >
                <div className={`min-h-[9.5rem] ${headerColor} p-5 flex flex-col justify-between gap-3 text-white border-b-2 border-slate-900 relative shrink-0`}>
                  <div className="flex items-start justify-between gap-2 z-10">
                    <span className="px-2 py-0.5 rounded bg-black/30 text-white font-mono text-[10px] font-bold uppercase border border-white/20 shrink-0">
                      {course.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white text-slate-900 text-[10px] font-mono font-bold border border-slate-900 text-right leading-tight">
                      {course.grade}
                    </span>
                  </div>

                  <div className="text-lg sm:text-xl font-black font-display text-white z-10 leading-snug tracking-tight break-words whitespace-normal">
                    {course.title.replace('Typing | ', '')}
                  </div>

                  <div className="absolute -right-3 -bottom-5 text-white/15 text-8xl font-black pointer-events-none select-none font-mono">
                    {course.id === 'code-typing' ? '</>' : '⌨'}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between bg-white space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 text-[11px] font-bold font-mono">
                        {course.category}
                      </span>
                      <span className="text-[11px] font-black text-slate-600 font-mono">
                        {course.lessonsCount} Lessons
                      </span>
                    </div>

                    <h3 className="font-black text-base text-slate-900 group-hover:text-sky-600 transition-colors font-display">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium break-words whitespace-normal">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t-2 border-slate-100 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300 text-[11px] font-mono font-bold flex items-center space-x-1">
                      <Keyboard className="w-3 h-3 text-amber-600" />
                      <span>{course.keyboardType.toUpperCase()}</span>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playKeyClick();
                        onSelectCourse(course.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-black text-xs border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 font-display ${
                        isEnrolled 
                          ? 'bg-[#1888ff] hover:bg-[#38bdf8] text-white' 
                          : 'bg-[#fef08a] hover:bg-yellow-300 text-slate-950'
                      }`}
                    >
                      {isEnrolled ? <Play className="w-3 h-3 fill-current" /> : <Plus className="w-3 h-3" />}
                      <span>{isEnrolled ? 'Open Track' : 'Enroll Track'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
