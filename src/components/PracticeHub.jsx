// Learn Room: The 8-Part Zero-to-Hero Driving School Spine + Specialty Tracks
import React, { useState } from 'react';
import { 
  Play, 
  Layers, 
  Star, 
  Code, 
  BookOpen, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  Search,
  Filter,
  Gamepad2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Clock,
  Command
} from 'lucide-react';
import { COURSES_CATALOG } from '../data/courseCatalog';
import { SPINE_PARTS } from '../data/spineCurriculum';
import { sound } from '../utils/audio';

export default function PracticeHub({
  userProgress = {},
  activeCourseId = 'keystroke-foundations',
  onSelectCourse,
  onStartLesson,
  onStartSpineLesson,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('spine'); // 'spine' | 'specialty'
  const [selectedPartNumber, setSelectedPartNumber] = useState(1);
  const [specialtyCategory, setSpecialtyCategory] = useState('all');

  const selectedPart = SPINE_PARTS.find(p => p.partNumber === selectedPartNumber) || SPINE_PARTS[0];
  const completedMap = userProgress.completedLessons || {};

  const handleLaunchSpineLesson = (part, lesson) => {
    sound.playKeyClick();
    if (onStartSpineLesson) {
      onStartSpineLesson(part, lesson);
    }
  };

  const handleLaunchCourse = (courseId) => {
    sound.playKeyClick();
    if (onSelectCourse) {
      onSelectCourse(courseId);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto space-y-6">
      
      {/* HEADER BANNER */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              DRIVING SCHOOL CURRICULUM
            </span>
            <span className="text-xs font-mono text-[#2D2319]/70 font-bold">
              100% Offline · Local-First
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#2D2319] font-display mt-0.5">
            Learn to Race Your Fingers
          </h1>
        </div>

        {/* TAB SELECTOR PILLS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playKeyClick();
              setActiveTab('spine');
            }}
            className={`px-4 py-2 rounded-xl border-2 border-[#2D2319] font-mono text-xs font-bold transition-all ${
              activeTab === 'spine'
                ? 'bg-[#C7E8CA] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] translate-x-0.5 translate-y-0.5'
                : 'bg-[#FDF8EE] hover:bg-[#FBF6EA] text-[#2D2319] shadow-[2px_2px_0px_#2D2319]'
            }`}
          >
            🛣️ Zero-to-Hero Spine (8 Parts)
          </button>

          <button
            onClick={() => {
              sound.playKeyClick();
              setActiveTab('specialty');
            }}
            className={`px-4 py-2 rounded-xl border-2 border-[#2D2319] font-mono text-xs font-bold transition-all ${
              activeTab === 'specialty'
                ? 'bg-[#C3A6E8] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] translate-x-0.5 translate-y-0.5'
                : 'bg-[#FDF8EE] hover:bg-[#FBF6EA] text-[#2D2319] shadow-[2px_2px_0px_#2D2319]'
            }`}
          >
            📚 Specialty Tracks
          </button>
        </div>
      </div>

      {/* TAB 1: 8-PART ZERO-TO-HERO DRIVING SCHOOL SPINE */}
      {activeTab === 'spine' && (
        <div className="space-y-6">
          
          {/* HORIZONTAL STEPPER OF 8 PARTS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {SPINE_PARTS.map((part) => {
              const isSelected = selectedPartNumber === part.partNumber;
              const partLessons = part.lessons;
              const completedInPart = partLessons.filter(l => completedMap[l.id]).length;
              const isPartComplete = completedInPart === partLessons.length && partLessons.length > 0;

              return (
                <button
                  key={part.id}
                  onClick={() => {
                    sound.playKeyClick();
                    setSelectedPartNumber(part.partNumber);
                  }}
                  className={`p-3 rounded-xl border-2 border-[#2D2319] text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F6C445] shadow-[3px_3px_0px_#2D2319] translate-x-0.5 translate-y-0.5'
                      : 'bg-[#FAF3E0] hover:bg-[#FDF8EE] shadow-[2px_2px_0px_#2D2319]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-black text-[#2D2319]">
                      PART {part.partNumber}
                    </span>
                    {isPartComplete && <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />}
                  </div>
                  <div className="font-bold text-xs text-[#2D2319] font-display truncate mt-1">
                    {part.subtitle}
                  </div>
                  <div className="text-[10px] font-mono text-[#2D2319]/70 mt-1">
                    {completedInPart}/{partLessons.length} done
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE PART DETAIL CARD */}
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_#2D2319] space-y-5">
            
            {/* PART HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#2D2319]/15 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-[#4BA3E3] text-[#2D2319] font-mono text-xs font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                    PART {selectedPart.partNumber} OF 8
                  </span>
                  <span className="text-sm font-mono font-bold text-[#2D2319]">
                    {selectedPart.subtitle}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#2D2319] font-display mt-1">
                  {selectedPart.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#2D2319]/80 font-mono mt-0.5">
                  {selectedPart.focus}
                </p>
              </div>

              {/* TARGET SPEED & ACCURACY BADGE */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-2 rounded-xl bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] text-center">
                  <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 block">PASS TARGET</span>
                  <span className="font-mono text-xs font-black text-[#2D2319]">{selectedPart.targetSpeed}</span>
                </div>
                <div className="px-3 py-2 rounded-xl bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] text-center">
                  <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 block">PRECISION</span>
                  <span className="font-mono text-xs font-black text-[#10B981]">{selectedPart.passAccuracy}% Acc</span>
                </div>
              </div>
            </div>

            {/* LESSONS LIST */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[#2D2319]">
                ✦ Structured Lessons in this Part:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedPart.lessons.map((lesson) => {
                  const isDone = completedMap[lesson.id];

                  return (
                    <div 
                      key={lesson.id}
                      className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-1.5 py-0.2 rounded bg-[#FAF3E0] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319]">
                            Lesson {lesson.lessonNumber}
                          </span>
                          {isDone ? (
                            <span className="text-[10px] font-mono font-bold text-[#10B981] flex items-center space-x-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Passed</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold text-[#2D2319]/60">Ready</span>
                          )}
                        </div>

                        <h4 className="font-bold text-sm text-[#2D2319] font-display">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-[#2D2319]/80 font-mono mt-1">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#2D2319]/10 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#2D2319]/70">
                          Target: {lesson.goalWpm} WPM · {lesson.minAccuracy}%
                        </span>
                        <button
                          onClick={() => handleLaunchSpineLesson(selectedPart, lesson)}
                          className="px-3 py-1 rounded-lg bg-[#F6C445] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] font-mono text-xs font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-[#2D2319]" />
                          <span>{isDone ? 'Practice Again' : 'Start Lesson'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PART GAME BREAK PROMPT */}
            {selectedPart.gameBreak && (
              <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C3A6E8] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-[#2D2319] shrink-0">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-[#2D2319] font-display">
                        Game Break: {selectedPart.gameBreak.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[9px] font-bold border border-[#2D2319]">
                        FUN STRETCH
                      </span>
                    </div>
                    <p className="text-xs text-[#2D2319]/80 font-mono mt-0.5">
                      {selectedPart.gameBreak.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playKeyClick();
                    if (onNavigate) onNavigate('play');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#C3A6E8] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all shrink-0 cursor-pointer"
                >
                  Play Game Break ➔
                </button>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: SPECIALTY TRACKS (CODE, STORIES, LAYOUTS) */}
      {activeTab === 'specialty' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COURSES_CATALOG.map((course) => (
              <div
                key={course.id}
                className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[4px_4px_0px_#2D2319] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#FDF8EE] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319]">
                      {course.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#2D2319]/70">
                      {course.lessonsCount} Lessons
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#2D2319] font-display">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#2D2319]/80 font-mono mt-1 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2D2319]/15 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#2D2319]/70">
                    {course.grade}
                  </span>
                  <button
                    onClick={() => handleLaunchCourse(course.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#F6C445] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    Open Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
