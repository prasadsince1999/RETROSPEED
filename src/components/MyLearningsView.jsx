import React from 'react';
import { 
  BookOpen, 
  ShoppingBag, 
  Star, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  Trash2,
  Sparkles,
  Layers
} from 'lucide-react';
import { COURSES_CATALOG, getCourseById } from '../data/courseCatalog';
import { sound } from '../utils/audio';

export default function MyLearningsView({
  userProgress = {},
  activeCourseId = 'keystroke-foundations',
  onSelectCourse,
  onUnenrollCourse,
  onNavigate
}) {
  const enrolledCourseIds = Array.isArray(userProgress.enrolledCourses) && userProgress.enrolledCourses.length > 0
    ? userProgress.enrolledCourses
    : ['keystroke-foundations'];

  const enrolledCourses = enrolledCourseIds
    .map(id => getCourseById(id))
    .filter(Boolean);

  const handleOpenCourse = (courseId) => {
    sound.playKeyClick();
    if (onSelectCourse) {
      onSelectCourse(courseId);
    }
  };

  const handleRemoveCourse = (e, courseId) => {
    e.stopPropagation();
    sound.playKeyClick();
    if (onUnenrollCourse) {
      onUnenrollCourse(courseId);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto">
      
      {/* Header Banner */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#2D2319]/20 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[#4BA3E3]" />
              <h1 className="text-xl sm:text-2xl font-black font-display text-[#2D2319]">
                My Learnings
              </h1>
            </div>
            <p className="text-xs text-[#2D2319]/70 font-medium mt-0.5 font-serif italic">
              Your personal touch-typing workspace and enrolled curricula.
            </p>
          </div>

          {/* Action Button to Add Courses from Shop */}
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              if (onNavigate) onNavigate('shop-courses');
            }}
            className="px-4 py-2 bg-[#F6C445] hover:bg-[#fbd366] text-[#2D2319] border-2 border-[#2D2319] rounded-xl font-mono text-xs font-black shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>✦ Add More Courses (Shop)</span>
          </button>
        </div>

      </div>

      {/* Main Enrolled Courses Grid */}
      <div className="my-5 flex-1 space-y-4">
        
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#2D2319]/70 uppercase tracking-wider">
            Enrolled Curricula ({enrolledCourses.length})
          </span>
          <span className="text-[11px] font-mono text-[#2D2319]/60">
            Click any course to open its lesson map & stages
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses.map(course => {
            const isActive = activeCourseId === course.id;
            const courseStats = (userProgress.courses && userProgress.courses[course.id]) || {};
            const scoresObj = courseStats.scores || {};
            const completedCount = Object.keys(scoresObj).length;
            const totalLessons = course.lessonsCount || 100;
            const percent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

            let totalStars = 0;
            let totalPoints = 0;
            Object.values(scoresObj).forEach(s => {
              totalStars += (s.stars || 0);
              totalPoints += (s.points || s.score || 0);
            });

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
                onClick={() => handleOpenCourse(course.id)}
                className={`rounded-2xl border-2 border-[#2D2319] bg-[#FAF3E0] shadow-[4px_4px_0px_#2D2319] flex flex-col justify-between overflow-hidden cursor-pointer transition-all ${
                  isActive 
                    ? 'ring-2 ring-[#48B89F] shadow-[6px_6px_0px_#2D2319] -translate-y-0.5' 
                    : 'hover:-translate-y-0.5 hover:bg-white'
                }`}
              >
                {/* Course Card Header */}
                <div>
                  <div className={`px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between font-mono text-xs font-bold ${headerBg}`}>
                    <div className="flex items-center space-x-1.5 truncate">
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{course.badge || 'Course'}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-white/90 text-[#2D2319] border border-[#2D2319] text-[10px] font-black shrink-0 shadow-[1px_1px_0px_#2D2319]">
                        {course.lessonsCount} Lessons
                      </span>

                      {enrolledCourses.length > 1 && course.id !== 'keystroke-foundations' && (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveCourse(e, course.id)}
                          className="p-1 rounded-md bg-white/80 hover:bg-[#F28B82] text-[#2D2319] border border-[#2D2319] transition-all cursor-pointer"
                          title="Remove from My Learnings"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Course Card Body */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-black text-base text-[#2D2319] leading-tight">
                        {course.title}
                      </h3>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded bg-[#C7E8CA] border border-[#2D2319] text-[10px] font-mono font-black text-[#2D2319] shrink-0 shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>CURRENT</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-[#2D2319]/70">
                      <span className="px-2 py-0.5 rounded bg-white border border-[#2D2319]">
                        {course.category}
                      </span>
                      <span>•</span>
                      <span>{course.grade}</span>
                    </div>

                    <p className="text-xs text-[#2D2319]/80 font-medium leading-relaxed font-serif line-clamp-2">
                      {course.description}
                    </p>

                    {/* Progress Bar & KPI Indicators */}
                    <div className="space-y-1.5 pt-2 border-t border-[#2D2319]/15">
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#2D2319]">
                        <span>Progress ({completedCount}/{totalLessons})</span>
                        <span>{percent}%</span>
                      </div>

                      {/* Striped Progress Bar */}
                      <div className="h-3 w-full bg-white rounded-lg border border-[#2D2319] overflow-hidden p-0.5 shadow-inner">
                        <div 
                          className="h-full bg-[#48B89F] rounded-md transition-all duration-300"
                          style={{ width: `${Math.max(4, percent)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#2D2319]/70 pt-1">
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-[#F6C445] fill-[#F6C445]" />
                          <span>{totalStars} Stars</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-[#4BA3E3] fill-[#4BA3E3]" />
                          <span>{totalPoints.toLocaleString()} Pts</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 pt-1">
                  <button
                    type="button"
                    onClick={() => handleOpenCourse(course.id)}
                    className={`w-full py-2.5 px-4 rounded-xl border-2 border-[#2D2319] font-mono text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#C7E8CA] hover:bg-[#b2e2b6] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
                        : 'bg-[#F6C445] hover:bg-[#fbd366] text-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
                    }`}
                  >
                    <span>▶ Continue Learning</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}

          {/* Add New Course from Shop Prompt Card */}
          <div
            onClick={() => {
              sound.playKeyClick();
              if (onNavigate) onNavigate('shop-courses');
            }}
            className="rounded-2xl border-2 border-dashed border-[#2D2319]/40 bg-[#FDF8EE] hover:bg-white hover:border-[#2D2319] p-6 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all shadow-[2px_2px_0px_#2D2319]/20 hover:shadow-[4px_4px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F6C445] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-[#2D2319]">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <div className="font-display font-black text-sm text-[#2D2319]">
                Add More Courses from Library
              </div>
              <p className="text-xs text-[#2D2319]/70 font-medium font-serif mt-1 max-w-xs">
                Browse our 10 international curricula in the Shop and add them to your personal space.
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-[#FAF3E0] border border-[#2D2319] font-mono text-[10px] font-bold text-[#2D2319]">
              ✦ Browse Shop Library
            </span>
          </div>

        </div>

      </div>

      {/* Footer Return Button */}
      <div className="border-t border-[#2D2319]/20 pt-3 flex items-center justify-between text-xs font-mono">
        <div className="text-[#2D2319]/70">
          Showing {enrolledCourses.length} active course{enrolledCourses.length !== 1 ? 's' : ''} in your workspace.
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            if (onNavigate) onNavigate('home');
          }}
          className="px-4 py-1.5 bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl font-bold text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          Return to Home
        </button>
      </div>

    </div>
  );
}
