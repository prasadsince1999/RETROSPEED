// RETROSPEED Learn Room: Shelf A Primary Path (Zero-to-Hero Numbered Map)
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
  Command,
  Hand,
  Trophy,
  RotateCcw,
  Check
} from 'lucide-react';
import { sound } from '../utils/audio';
import { SPINE_PARTS, TOTAL_SPINE_LESSONS } from '../data/spineCurriculum';
import { isLessonUnlocked } from '../utils/license';

export default function PracticeHub({
  userProgress = {},
  activeCourseId = 'keystroke-foundations',
  onSelectCourse,
  onStartLesson,
  onStartSpineLesson,
  onNavigate,
  onOpenUnlockModal
}) {
  const [selectedPartNumber, setSelectedPartNumber] = useState(1);
  const selectedPart = SPINE_PARTS.find(p => p.partNumber === selectedPartNumber) || SPINE_PARTS[0];

  const courseScores = userProgress.courses?.spine?.scores || {};
  const unlockedLevel = userProgress.courses?.spine?.unlockedLevel || 1;

  // Calculate total spine progress
  const completedTotal = Object.values(courseScores).filter(s => s?.completed).length;
  const totalStarsTotal = userProgress.courses?.spine?.totalStars || 0;

  const handleLaunchSpineLesson = (part, lesson) => {
    sound.playKeyClick();
    if (!isLessonUnlocked(lesson, userProgress)) {
      if (onOpenUnlockModal) onOpenUnlockModal();
      return;
    }
    if (onStartSpineLesson) {
      onStartSpineLesson(part, lesson);
    }
  };

  // Render type icon and label for each tile
  const renderTypeBadge = (lesson) => {
    switch (lesson.type) {
      case 'motion':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#C3A6E8] text-[#2D2319] font-mono text-[9px] font-black border border-[#2D2319] flex items-center space-x-1 shadow-[1px_1px_0px_#2D2319]">
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>COACH</span>
          </span>
        );
      case 'play':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#F28B82] text-[#2D2319] font-mono text-[9px] font-black border border-[#2D2319] flex items-center space-x-1 shadow-[1px_1px_0px_#2D2319]">
            <Gamepad2 className="w-2.5 h-2.5" />
            <span>GAME</span>
          </span>
        );
      case 'practice':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#4BA3E3] text-white font-mono text-[9px] font-black border border-[#2D2319] flex items-center space-x-1 shadow-[1px_1px_0px_#2D2319]">
            <Clock className="w-2.5 h-2.5" />
            <span>DRILL</span>
          </span>
        );
      case 'review':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#C7E8CA] text-[#2D2319] font-mono text-[9px] font-black border border-[#2D2319] flex items-center space-x-1 shadow-[1px_1px_0px_#2D2319]">
            <RotateCcw className="w-2.5 h-2.5" />
            <span>REVIEW</span>
          </span>
        );
      case 'one-hand':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#F6C445] text-[#2D2319] font-mono text-[9px] font-black border border-[#2D2319] flex items-center space-x-1 shadow-[1px_1px_0px_#2D2319]">
            <Hand className="w-2.5 h-2.5" />
            <span>ANCHOR</span>
          </span>
        );
      case 'checkpoint':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#F6C445] text-[#2D2319] font-mono text-[9px] font-black border border-[#2D2319] flex items-center space-x-1 shadow-[1px_1px_0px_#2D2319]">
            <Trophy className="w-2.5 h-2.5" />
            <span>GATE</span>
          </span>
        );
      case 'chord':
        return (
          <span className="px-2 py-0.5 rounded-md bg-[#C3A6E8] text-[#2D2319] font-mono text-[9px] font-black border border-[#2D2319] flex items-center space-x-1 shadow-[1px_1px_0px_#2D2319]">
            <Command className="w-2.5 h-2.5" />
            <span>CHORD</span>
          </span>
        );
      case 'keys':
      default:
        return (
          <span className="px-2 py-0.5 rounded-md bg-white text-[#2D2319] font-mono text-[9px] font-black border border-[#2D2319] flex items-center space-x-1 shadow-[1px_1px_0px_#2D2319]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>KEYS</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[var(--rs-paper)] p-4 sm:p-6 overflow-y-auto space-y-6 transition-colors duration-200">
      
      {/* 1. TOP BANNER (Shelf A: Primary Zero-to-Hero Spine) */}
      <div className="bg-[var(--rs-paper-alt)] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_var(--rs-shadow)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              PRIMARY CURRICULUM
            </span>
            <span className="text-xs font-mono text-[#2D2319]/70 font-bold">
              {TOTAL_SPINE_LESSONS} Micro-Lessons · 4-Box Cycle
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#2D2319] font-display mt-0.5">
            Zero-to-Hero Typing Path
          </h1>
        </div>

        {/* Global Stats Pill */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-black text-[#2D2319]">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{completedTotal} / {TOTAL_SPINE_LESSONS} done</span>
          </div>
          <span className="text-[#2D2319]/30">|</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{totalStarsTotal}</span>
          </div>
        </div>
      </div>

      {/* 2. UNIT SWITCHER CHIPS (Units 1 to 8) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {SPINE_PARTS.map((part) => {
          const isSelected = part.partNumber === selectedPartNumber;
          const completedInPart = part.lessons.filter(l => courseScores[l.id]?.completed).length;
          const isPartComplete = completedInPart === part.lessons.length;

          return (
            <button
              key={part.partNumber}
              onClick={() => {
                sound.playKeyClick();
                setSelectedPartNumber(part.partNumber);
              }}
              className={`px-3.5 py-2 rounded-xl border-2 border-[#2D2319] font-mono text-xs font-black shrink-0 transition-all flex items-center space-x-2 cursor-pointer ${
                isSelected
                  ? 'bg-[#C7E8CA] text-[#2D2319] shadow-[3px_3px_0px_#2D2319] translate-x-0.5 translate-y-0.5'
                  : 'bg-[var(--rs-paper-alt)] hover:bg-white text-[#2D2319] shadow-[2px_2px_0px_#2D2319]'
              }`}
            >
              <span>Unit {part.partNumber}: {part.shortTitle}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] border border-[#2D2319] ${
                isPartComplete 
                  ? 'bg-[#10B981] text-white' 
                  : completedInPart > 0 
                  ? 'bg-[#F6C445] text-[#2D2319]' 
                  : 'bg-white text-[#2D2319]/60'
              }`}
              >
                {completedInPart}/{part.lessons.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. ACTIVE UNIT HEADER BANNER */}
      <div className="bg-[var(--rs-paper-alt)] border-2 border-[#2D2319] rounded-2xl p-5 shadow-[4px_4px_0px_var(--rs-shadow)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-xs font-black uppercase text-[#2D2319]/60">
              Unit {selectedPart.partNumber} of 8
            </span>
            <span className="text-[#2D2319]/40">•</span>
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded border border-sky-300">
              Target Goal: {selectedPart.targetWpm} WPM
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2D2319] font-display">
            {selectedPart.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#2D2319]/80 font-mono mt-1 max-w-2xl">
            {selectedPart.description}
          </p>
        </div>

        {/* Quick Continue Button */}
        <button
          onClick={() => {
            const nextUnfinished = selectedPart.lessons.find(l => !courseScores[l.id]?.completed) || selectedPart.lessons[0];
            handleLaunchSpineLesson(selectedPart, nextUnfinished);
          }}
          className="px-5 py-2.5 rounded-xl bg-[#F6C445] hover:bg-[#eab308] text-[#2D2319] font-mono text-xs font-black border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-2 cursor-pointer shrink-0"
        >
          <span>Continue Unit {selectedPart.partNumber}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4. NUMBERED MICRO-STEP TILE MAP (4 to 6 Columns Grid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs font-bold text-[#2D2319]/70 px-1">
          <span>PATH TILES ({selectedPart.lessons.length} STEPS)</span>
          <span>4-BOX CYCLE: INTRO → REVIEW → PRACTICE → PLAY</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 pt-2">
          {selectedPart.lessons.map((lesson) => {
            const score = courseScores[lesson.id];
            const isCompleted = Boolean(score && score.completed);
            const isUnlocked = isLessonUnlocked(lesson, userProgress);
            const isNextActive = lesson.index === unlockedLevel;

            return (
              <div
                key={lesson.id}
                onClick={() => handleLaunchSpineLesson(selectedPart, lesson)}
                className={`relative aspect-square p-3 border-2 border-[#2D2319] rounded-2xl flex flex-col justify-between cursor-pointer transition-all duration-150 select-none ${
                  isNextActive
                    ? 'bg-[#F6C445] text-[#2D2319] shadow-[5px_5px_0px_#2D2319] ring-2 ring-[#1888ff] -translate-y-1'
                    : isCompleted
                    ? 'bg-[#C7E8CA] text-[#2D2319] shadow-[3px_3px_0px_#2D2319] hover:shadow-[5px_5px_0px_#2D2319] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
                    : isUnlocked
                    ? 'bg-white text-[#2D2319] shadow-[3px_3px_0px_#2D2319] hover:shadow-[5px_5px_0px_#2D2319] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
                    : 'bg-[#FDF8EE]/60 text-[#2D2319]/40 border-2 border-[#2D2319]/30 opacity-60 shadow-[1px_1px_0px_#2D2319] cursor-not-allowed'
                }`}
              >
                {/* Top Row: Global Index + Type Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-mono font-black text-[#2D2319]">
                    #{lesson.index}
                  </span>
                  {renderTypeBadge(lesson)}
                </div>

                {/* Center: Key stamp / Game title */}
                <div className="flex-1 flex flex-col items-center justify-center my-1 text-center">
                  {lesson.type === 'play' ? (
                    <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-lg">
                      {lesson.gameId === 'drop-chits' ? '🪂' : lesson.gameId === 'paper-planes' ? '✈️' : lesson.gameId === 'local-line' ? '🚂' : lesson.gameId === 'fuse-desk' ? '💣' : lesson.gameId === 'patch-terminal' ? '💻' : lesson.gameId === 'pit-lane' ? '🏎️' : '📰'}
                    </div>
                  ) : lesson.type === 'motion' ? (
                    <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-[#2D2319]">
                      <Play className="w-4 h-4 fill-current ml-0.5 text-[#F28B82]" />
                    </div>
                  ) : (
                    <div className="w-12 h-9 rounded-xl bg-white border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-mono font-black text-xs text-[#2D2319] px-1 truncate">
                      {lesson.keys ? lesson.keys.filter(k => k !== ' ').slice(0, 3).join('·') || 'SPACE' : '⌨'}
                    </div>
                  )}
                </div>

                {/* Bottom: Title & Stars / Lock */}
                <div className="border-t border-[#2D2319]/20 pt-1 flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#2D2319] truncate block max-w-[80px]">
                    {lesson.title.replace('Keys ', '').replace('Review: ', '').replace('Practice: ', '').replace('Play: ', '')}
                  </span>

                  {isCompleted ? (
                    <span className="text-[10px] font-mono font-black text-amber-950 bg-amber-200 px-1 rounded border border-[#2D2319]">
                      ★ {score.stars || 5}
                    </span>
                  ) : !isUnlocked ? (
                    <Lock className="w-3 h-3 text-[#2D2319]/40" />
                  ) : (
                    <span className="text-[9px] font-mono font-bold text-[#2D2319]/50">
                      {lesson.goalWpm}wpm
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}