import React, { useState } from 'react';
import { 
  Home, 
  Target, 
  Trophy, 
  Calendar, 
  BarChart2, 
  ShoppingBag, 
  ArrowLeft, 
  Play, 
  Layers, 
  Star, 
  Code, 
  BookOpen, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  Map, 
  Search,
  Filter
} from 'lucide-react';
import { COURSES_CATALOG } from '../data/courseCatalog';
import { sound } from '../utils/audio';

const CATEGORY_MAP = {
  'core': {
    id: 'core',
    label: 'Core Foundations',
    courseIds: ['keycraft-odyssey', 'keystroke-foundations'],
    badge: 'Foundations',
    color: 'bg-[#C7E8CA]'
  },
  'dev': {
    id: 'dev',
    label: 'Developer & Syntax',
    courseIds: ['syntax-forge'],
    badge: 'Code & Terminal',
    color: 'bg-[#C3A6E8]'
  },
  'vocab': {
    id: 'vocab',
    label: 'Vocabulary & Lexicon',
    courseIds: ['global-lexicon', 'literary-heritage'],
    badge: 'Lexicon',
    color: 'bg-[#F28B82]'
  },
  'stories': {
    id: 'stories',
    label: 'Stories & Knowledge',
    courseIds: [
      'chronicles-of-mystery',
      'symphony-keys',
      'atlas-chronicles',
      'curiosity-vault',
      'pioneers-innovators',
      'wild-kingdom'
    ],
    badge: 'Trivia & Lore',
    color: 'bg-[#F6C445]'
  },
  'ergo': {
    id: 'ergo',
    label: 'Ergonomic Layouts',
    courseIds: ['ergo-dvorak', 'speed-colemak'],
    badge: 'Dvorak & Colemak',
    color: 'bg-[#48B89F]'
  }
};

export default function PracticeHub({
  userProgress = {},
  activeCourseId = 'keycraft-odyssey',
  onSelectCourse,
  onStartLesson,
  onNavigate
}) {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'core' | 'dev' | 'vocab' | 'stories' | 'ergo'
  const [searchQuery, setSearchQuery] = useState('');

  const handleLaunchCourse = (courseId, targetLevelId = null) => {
    sound.playKeyClick();
    if (onSelectCourse) {
      onSelectCourse(courseId, targetLevelId);
    }
  };

  const handleOpenMap = (courseId) => {
    sound.playKeyClick();
    if (onSelectCourse) {
      onSelectCourse(courseId);
    }
    if (onNavigate) {
      onNavigate('map');
    }
  };

  const handleNav = (view) => {
    sound.playKeyClick();
    if (onNavigate) {
      onNavigate(view);
    }
  };

  // Filter courses
  const filteredCourses = COURSES_CATALOG.filter(course => {
    if (selectedCategory !== 'all') {
      const catConfig = CATEGORY_MAP[selectedCategory];
      if (!catConfig || !catConfig.courseIds.includes(course.id)) {
        return false;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchDesc = (course.description || '').toLowerCase().includes(q);
      const matchCat = (course.category || '').toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto space-y-5">
      
      {/* Header Controls Banner */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] space-y-3">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#48B89F] text-white flex items-center justify-center border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
              <Target className="w-5 h-5 text-[#2D2319]" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#2D2319] font-display">
                Practice Curricula Directory
              </h1>
              <p className="text-xs text-[#2D2319]/70 font-mono">
                13 Official KeyCraft Touch Typing tracks across 5 learning disciplines.
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-64">
            <div className="relative">
              <Search className="w-4 h-4 text-[#2D2319]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter courses..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl text-xs font-mono font-bold text-[#2D2319] placeholder:text-[#2D2319]/50 shadow-[2px_2px_0px_#2D2319] focus:outline-none focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 pt-1 font-mono text-xs">
          <span className="text-[#2D2319]/70 font-bold uppercase tracking-wider text-[10px] mr-1 flex items-center space-x-1 shrink-0">
            <Filter className="w-3 h-3" />
            <span>Category:</span>
          </span>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setSelectedCategory('all');
            }}
            className={`px-3 py-1 rounded-xl border-2 border-[#2D2319] font-bold transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-[#F6C445] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-black'
                : 'bg-[#FDF8EE] hover:bg-white text-[#2D2319] shadow-[1px_1px_0px_#2D2319]'
            }`}
          >
            All Tracks ({COURSES_CATALOG.length})
          </button>

          {Object.values(CATEGORY_MAP).map(cat => {
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1 rounded-xl border-2 border-[#2D2319] font-bold transition-all shrink-0 ${
                  isSel
                    ? `${cat.color} text-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-black`
                    : 'bg-[#FDF8EE] hover:bg-white text-[#2D2319] shadow-[1px_1px_0px_#2D2319]'
                }`}
              >
                {cat.label} ({cat.courseIds.length})
              </button>
            );
          })}
        </div>

      </div>

      {/* Courses Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-8 text-center shadow-[4px_4px_0px_#2D2319]">
          <h3 className="font-display font-black text-sm text-[#2D2319]">No curricula found</h3>
          <p className="text-xs font-mono text-[#2D2319]/70 mt-1">Try clearing your search query or selecting a different category.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 px-4 py-1.5 bg-[#F6C445] border-2 border-[#2D2319] rounded-xl font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map(course => {
            const courseData = userProgress.courses?.[course.id] || {};
            const scores = courseData.scores || {};
            const completedInCourse = Object.keys(scores).length;
            const currentLevel = courseData.unlockedLevel || 1;
            const pct = Math.min(100, Math.round((completedInCourse / (course.lessonsCount || 100)) * 100));
            const isEnrolled = (userProgress.enrolledCourses || []).includes(course.id);
            const totalStarsInCourse = courseData.totalStars || 0;

            return (
              <div 
                key={course.id}
                className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] flex flex-col justify-between space-y-4 hover:-translate-y-0.5 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.2 rounded bg-[#C7E8CA] border border-[#2D2319] text-[9px] font-mono font-bold text-[#2D2319]">
                      {course.category}
                    </span>
                    <span className="px-2 py-0.2 rounded bg-[#FDF8EE] border border-[#2D2319] text-[9px] font-mono font-bold text-[#2D2319] uppercase">
                      {course.keyboardType || 'QWERTY'}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#2D2319] font-display">
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#2D2319]/80 font-medium line-clamp-2 mt-1">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#2D2319] mt-3 pt-2 border-t border-[#2D2319]/10">
                    <span className="flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-[#2D2319]/70" />
                      <span>{course.lessonsCount} Lessons</span>
                    </span>
                    <span className="flex items-center space-x-1 text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-[#F6C445] text-[#F6C445]" />
                      <span>{totalStarsInCourse}★</span>
                    </span>
                  </div>

                  {/* Course Progress */}
                  <div className="space-y-1 mt-2">
                    <div className="w-full h-2.5 bg-[#FDF8EE] rounded-full border-2 border-[#2D2319] overflow-hidden p-0.5 flex">
                      <div 
                        className="h-full bg-[#48B89F] rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-[#2D2319]/70 font-bold">
                      <span>{completedInCourse} Completed</span>
                      <span>{pct}%</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-2 border-t border-[#2D2319]/20">
                  <button
                    type="button"
                    onClick={() => handleLaunchCourse(course.id, currentLevel)}
                    className="flex-1 px-4 py-2 rounded-xl bg-[#F6C445] hover:bg-[#ffd95e] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 font-display font-black text-xs uppercase tracking-wide flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#2D2319]" />
                    <span>{completedInCourse > 0 ? `Resume (L${currentLevel})` : 'Start Course'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenMap(course.id)}
                    className="p-2 rounded-xl bg-[#FDF8EE] hover:bg-white text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center cursor-pointer"
                    title="View Lesson Map"
                  >
                    <Map className="w-4 h-4 text-[#2D2319]" />
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
