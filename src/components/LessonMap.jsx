import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  Check, 
  Play, 
  Timer, 
  Gamepad2, 
  ChevronUp, 
  ChevronDown, 
  List, 
  Award, 
  Star, 
  Video, 
  Zap, 
  Code, 
  Target, 
  Sparkles, 
  CheckCircle2,
  Compass,
  ArrowLeft,
  Search,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import StageDrawer from './StageDrawer';
import { sound } from '../utils/audio';

/**
 * Interactive Journey Avatar Pawn
 * Renders an animated typing adventurer positioned at the active level node.
 * Features gentle idle bobbing, squashing floor shadow, and hop jump trajectories.
 */
function JourneyAvatar({ isHopping, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`absolute -top-16 left-1/2 -translate-x-1/2 z-30 cursor-pointer select-none transition-transform group ${
        isHopping ? 'animate-avatar-hop' : 'animate-avatar-bob'
      }`}
      title="RETROSPEED Explorer • Click to cheer & hop!"
    >
      {/* Floating 'YOU ARE HERE' Pointer Pill (Retro Stamp) */}
      <div className="flex flex-col items-center mb-1">
        <div className="px-2.5 py-0.5 rounded-md bg-[#1888ff] text-white font-black text-[9px] uppercase tracking-wider font-mono shadow-[2px_2px_0px_#2D2319] border-2 border-[#2D2319] flex items-center space-x-1 group-hover:scale-105 transition-transform">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fef08a] animate-ping" />
          <span>YOU ARE HERE</span>
        </div>
        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#2D2319] -mt-0.5" />
      </div>

      {/* Character Pawn Vector Graphics */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg viewBox="0 0 64 64" className="w-14 h-14 drop-shadow-[2px_2px_0px_#2D2319] relative z-10">
          <rect x="14" y="24" width="36" height="28" rx="4" fill="#0369a1" stroke="#2D2319" strokeWidth="2" />
          <circle cx="32" cy="38" r="5" fill="#38bdf8" className="animate-pulse" />
          <circle cx="32" cy="38" r="2" fill="#ffffff" />
          <ellipse cx="32" cy="42" rx="14" ry="12" fill="#0284c7" stroke="#2D2319" strokeWidth="2" />
          <path d="M22 36 Q32 41 42 36" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="22" r="13" fill="#f8fafc" stroke="#2D2319" strokeWidth="2" />
          <path d="M17 19 C17 9 47 9 47 19 Z" fill="#f59e0b" stroke="#2D2319" strokeWidth="2" />
          <ellipse cx="32" cy="19" rx="17" ry="3.5" fill="#d97706" stroke="#2D2319" strokeWidth="1.5" />
          <circle cx="32" cy="13" r="2.5" fill="#fbbf24" stroke="#2D2319" strokeWidth="1" />
          <rect x="22" y="19" width="20" height="8" rx="3" fill="#2D2319" stroke="#2D2319" strokeWidth="1.5" />
          <ellipse cx="27.5" cy="23" rx="3.5" ry="2.2" fill="#38bdf8" />
          <ellipse cx="36.5" cy="23" rx="3.5" ry="2.2" fill="#38bdf8" />
          <circle cx="28.5" cy="22" r="1" fill="#ffffff" />
          <circle cx="37.5" cy="22" r="1" fill="#ffffff" />
          <path d="M28 29 Q32 32.5 36 29" stroke="#2D2319" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
        <div className="absolute -bottom-1 w-9 h-2.5 bg-[#2D2319]/40 rounded-full animate-shadow-pulse" />
      </div>
    </div>
  );
}

/**
 * Stage Boss Milestone Gate
 * Solid Retro Stone Archway between stages with rotating clockwork gears,
 * runes, hard offset shadows, and unlock fanfare.
 */
function StageBossMilestoneGate({ 
  fromStage, 
  toStage, 
  stageIndex,
  isUnlocked, 
  completedLevels, 
  totalLevels, 
  onInspectGate,
  onJumpToActive
}) {
  const percent = totalLevels > 0 ? Math.min(100, Math.round((completedLevels / totalLevels) * 100)) : 0;

  return (
    <div className="my-10 relative flex flex-col items-center justify-center select-none">
      <div className="w-full h-1 bg-[#2D2319]/20 absolute top-1/2 -translate-y-1/2 z-0" />

      <div className={`relative z-10 w-full max-w-xl p-4 sm:p-5 rounded-2xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-200 ${
        isUnlocked ? 'bg-[#C7E8CA]' : 'bg-[var(--rs-paper-alt)]'
      }`}>
        
        {/* Left: Gate Badge & Lore */}
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className={`w-11 h-11 rounded-xl border-2 border-[#2D2319] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#2D2319] ${
            isUnlocked ? 'bg-[#10B981] text-white' : 'bg-[#F6C445] text-[#2D2319]'
          }`}>
            {isUnlocked ? <Check className="w-6 h-6 stroke-[3]" /> : <Lock className="w-5 h-5 stroke-[2.5]" />}
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#2D2319] border border-[#2D2319]">
                STAGE GATE #{stageIndex + 1}
              </span>
              <span className="font-mono text-xs font-bold text-[#2D2319]/70">
                {isUnlocked ? 'UNLOCKED' : `${completedLevels}/${totalLevels} Cleared`}
              </span>
            </div>
            <h4 className="font-display font-black text-base sm:text-lg text-[#2D2319] leading-tight mt-0.5">
              {toStage?.title || 'Next Milestone Stage'}
            </h4>
          </div>
        </div>

        {/* Right: Progress & Action */}
        <div className="flex items-center space-x-3 shrink-0">
          {!isUnlocked && (
            <button
              type="button"
              onClick={onJumpToActive}
              className="px-3.5 py-1.5 rounded-xl bg-[#F6C445] hover:bg-[#eab308] text-[#2D2319] font-mono text-xs font-black border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              Resume Drill
            </button>
          )}
          {isUnlocked && (
            <div className="px-3 py-1 rounded-xl bg-white text-emerald-800 font-mono text-xs font-black border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>PASSED</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function LessonMap({
  course = {},
  stages = [],
  lessons = [],
  userProgress = {},
  onSelectLesson,
  onJumpWarning,
  onNavigate,
  onBack
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [avatarHopping, setAvatarHopping] = useState(false);

  const courseScores = userProgress.courses?.[course.id]?.scores || {};
  const unlockedLevel = userProgress.courses?.[course.id]?.unlockedLevel || 1;
  const totalStars = userProgress.courses?.[course.id]?.totalStars || 0;
  const totalPoints = userProgress.courses?.[course.id]?.totalPoints || 0;

  const completedCount = Object.values(courseScores).filter(s => s.completed).length;
  const progressPercent = lessons.length > 0 ? Math.min(100, Math.round((completedCount / lessons.length) * 100)) : 0;

  // Filter stages by search query
  const filteredStages = stages.filter(stage => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const matchesTitle = stage.title.toLowerCase().includes(q);
    const stageLessons = lessons.filter(l => l.id >= stage.start && l.id <= stage.end);
    const matchesLesson = stageLessons.some(l => 
      l.title.toLowerCase().includes(q) || 
      String(l.id) === q || 
      String(l.id).startsWith(q)
    );
    return matchesTitle || matchesLesson;
  });

  // Locate active level node on map
  const locateActiveHero = () => {
    sound.playKeyClick();
    const node = document.getElementById(`lesson-node-${unlockedLevel}`);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setAvatarHopping(true);
      setTimeout(() => setAvatarHopping(false), 900);
    }
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    sound.playSuccessChime();
    setAvatarHopping(true);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.6 }
    });
    setTimeout(() => setAvatarHopping(false), 900);
  };

  const handleCardClick = (lesson) => {
    sound.playKeyClick();
    if (lesson.id > unlockedLevel) {
      if (onJumpWarning) onJumpWarning(lesson);
      return;
    }
    if (onSelectLesson) onSelectLesson(lesson);
  };

  // Render card illustration stamp based on lesson type
  const renderCardIllustration = (lesson, isCompleted) => {
    if (lesson.type === 'game') {
      const gTitle = `${lesson.title || ''} ${lesson.gameId || ''}`.toLowerCase();
      const isPlane = gTitle.includes('plane') || gTitle.includes('paper');
      const isTrain = gTitle.includes('line') || gTitle.includes('train') || gTitle.includes('local');
      const isMarket = gTitle.includes('market') || gTitle.includes('night');
      const isChits = gTitle.includes('chit') || gTitle.includes('drop');
      const isFuse = gTitle.includes('fuse') || gTitle.includes('desk') || gTitle.includes('circuit');
      const isPit = gTitle.includes('pit') || gTitle.includes('lane') || gTitle.includes('racer');
      const isPatch = gTitle.includes('patch') || gTitle.includes('terminal');

      const emoji = isPlane ? '✈️' : isTrain ? '🚂' : isMarket ? '🏮' : isChits ? '📜' : isFuse ? '⚡' : isPit ? '🏎️' : isPatch ? '🔌' : '🖨️';

      return (
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-[#2D2319] font-black text-lg bg-[#F6C445]">
            {emoji}
          </div>
        </div>
      );
    }

    if (lesson.type === 'video' || lesson.type === 'motion') {
      return (
        <div className="relative flex items-center justify-center">
          <div className="w-11 h-9 rounded-xl bg-white border-2 border-[#2D2319] flex items-center justify-center text-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <div className="w-6 h-6 rounded-lg bg-[#F28B82] border border-[#2D2319] text-[#2D2319] flex items-center justify-center">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
          </div>
        </div>
      );
    }

    // Default typing exercise key stamp
    const letters = (lesson.newKeys || lesson.title || '⌨').slice(0, 4);
    return (
      <div className="relative flex items-center justify-center">
        <div className={`w-12 h-9 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-mono font-black text-xs ${
          isCompleted ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-white text-[#2D2319]'
        }`}>
          {letters}
        </div>
      </div>
    );
  };

  const titleVariant = course.titleVariant || 'sky';
  const headerBarBg = 
    titleVariant === 'coral' ? 'bg-[#F28B82]' :
    titleVariant === 'mustard' ? 'bg-[#F6C445]' :
    titleVariant === 'teal' ? 'bg-[#48B89F]' :
    titleVariant === 'lilac' ? 'bg-[#C3A6E8]' :
    titleVariant === 'dark' ? 'bg-[#2D2319]' :
    'bg-[#4BA3E3]';

  return (
    <div className="min-h-screen bg-[var(--rs-paper)] select-none relative pb-32 font-sans text-[#2D2319] transition-colors duration-200">
      
      {/* Top Breadcrumb & Course Banner Window */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-4 pb-2 space-y-4">
        
        {/* Navigation & Shortcuts Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              if (onNavigate) onNavigate('shop');
              else if (onBack) onBack();
            }}
            className="px-3 py-1.5 rounded-xl bg-[var(--rs-paper-alt)] hover:bg-white text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#4BA3E3]" />
            <span>Course Library</span>
          </button>

          <div className="text-xs text-[#2D2319] font-mono font-bold hidden sm:flex items-center space-x-2 bg-[var(--rs-paper-alt)] px-3.5 py-1.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <span className="text-[#2D2319]/60">Keys:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#2D2319] text-[10px]">L</kbd>
            <span>Locate</span>
            <span>•</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#2D2319] text-[10px]">T</kbd>
            <span>Stages</span>
            <span>•</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#2D2319] text-[10px]">Esc</kbd>
            <span>Hub</span>
          </div>
        </div>

        {/* Solid Retro Paper Course Banner Card */}
        <div className="rounded-2xl bg-[var(--rs-paper-alt)] border-2 border-[#2D2319] shadow-[6px_6px_0px_var(--rs-shadow)] overflow-hidden transition-colors duration-200">
          
          {/* Top Titlebar Strip with Window Controls */}
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

          {/* Banner Body */}
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

            {/* Banner Progress Box */}
            <div className="w-full md:w-auto flex flex-col md:items-end space-y-2 bg-white text-[#2D2319] px-5 py-4 rounded-2xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]">
              <div className="flex items-center justify-between md:justify-end gap-3 w-full font-mono">
                <span className="text-xs text-[#2D2319]/70 font-bold">Progress</span>
                <span className="text-xl sm:text-2xl font-black">{progressPercent}%</span>
              </div>

              {/* Striped Progress Bar */}
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
      </div>

      {/* Filter, Stats & Stage Drawer Navigation Bar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Stats Pill */}
        <div className="bg-[var(--rs-paper-alt)] px-4 py-2 rounded-2xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] flex items-center space-x-3 text-xs font-mono font-bold text-[#2D2319] w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-[#2D2319] font-black">{completedCount} / {lessons.length}</span>
            <span className="text-[#2D2319]/60 font-normal">done</span>
          </div>
          <span className="text-[#2D2319]/30">|</span>
          <div className="flex items-center space-x-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-amber-700 font-black">{totalStars}</span>
          </div>
          <span className="text-[#2D2319]/30">|</span>
          <div className="flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-sky-600" />
            <span className="text-[#2D2319] font-black">{totalPoints.toLocaleString()}</span>
          </div>
        </div>

        {/* Search Input & Stage Drawer Button */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="flex-1 sm:w-64">
            <div className="flex items-center bg-white border-2 border-[#2D2319] rounded-xl px-3 py-1.5 shadow-[3px_3px_0px_#2D2319]">
              <Search className="w-4 h-4 text-[#2D2319]/60 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search level or key..."
                className="w-full bg-transparent border-none outline-none text-xs font-mono font-bold text-[#2D2319] placeholder:text-[#2D2319]/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-mono font-bold text-[#2D2319]/50 hover:text-[#2D2319]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={locateActiveHero}
            title="Locate Hero on Map (L)"
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] font-black text-xs border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1 font-display cursor-pointer"
          >
            <Compass className="w-4 h-4 text-sky-600" />
            <span>Locate</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setDrawerOpen(true);
            }}
            title="Open Table of Contents (T)"
            className="px-3.5 py-1.5 rounded-xl bg-[#F6C445] hover:bg-[#eab308] text-[#2D2319] font-black text-xs border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 font-display cursor-pointer"
          >
            <List className="w-4 h-4" />
            <span>Stages ({stages.length})</span>
          </button>
        </div>

      </div>

      {/* Main Levels Map Container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 relative">
        
        {/* Stages Loop or Empty State */}
        {filteredStages.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-[#2D2319]/40 rounded-2xl p-12 text-center shadow-[4px_4px_0px_#2D2319] mt-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--rs-paper)] border-2 border-[#2D2319] text-[#2D2319] flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#2D2319]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#2D2319] font-display">No levels found</h3>
            <p className="text-xs text-[#2D2319]/70 mt-1 max-w-sm mx-auto font-mono">
              No matches found for <strong className="text-[#2D2319]">"{searchQuery}"</strong>. Try a level number or key phrase.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 px-3 py-1.5 rounded-xl bg-[#1888ff] text-white font-black text-xs border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="space-y-12 mt-4">
            {filteredStages.map((stage, stageIndex) => {
              const stageLessons = lessons.filter(l => {
                if (l.id < stage.start || l.id > stage.end) return false;
                if (!searchQuery.trim()) return true;
                const q = searchQuery.toLowerCase().trim();
                return l.title.toLowerCase().includes(q) || String(l.id) === q || String(l.id).startsWith(q);
              });

              if (stageLessons.length === 0) return null;

              // Milestone Gate Calculations
              const nextStage = filteredStages[stageIndex + 1];
              const completedInThisStage = lessons.filter(l => l.id >= stage.start && l.id <= stage.end && courseScores[l.id]?.completed).length;
              const totalInThisStage = stage.end - stage.start + 1;
              const isStageGateUnlocked = completedInThisStage >= totalInThisStage || unlockedLevel > stage.end;

              return (
                <React.Fragment key={stage.id}>
                  <div id={stage.id} className="space-y-4">
                    
                    {/* Stage Heading Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#2D2319] pb-2">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl sm:text-2xl font-black text-[#2D2319] tracking-tight font-display">
                          {stage.title}
                        </h2>
                        <span className="px-2 py-0.5 rounded-md bg-[#2D2319] text-[#FDF8EE] font-mono text-[10px] font-bold">
                          Levels {stage.start}–{stage.end}
                        </span>
                      </div>

                      {stage.goal && (
                        <span className="px-2.5 py-0.5 rounded-md bg-[#C7E8CA] text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1">
                          <Target className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Goal: {stage.goal}</span>
                        </span>
                      )}
                    </div>

                    {/* Level Cards Grid (Retro Neo-Brutalist Node Stamps) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-10">
                      {stageLessons.map(lesson => {
                        const score = courseScores[lesson.id];
                        const isCompleted = Boolean(score && score.completed);
                        const isUnlocked = lesson.id <= unlockedLevel;
                        const isNextActive = lesson.id === unlockedLevel;

                        return (
                          <div key={lesson.id} id={`lesson-node-${lesson.id}`} className="relative">
                            {/* Interactive Journey Avatar Pawn on the Active Level */}
                            {isNextActive && (
                              <JourneyAvatar 
                                isHopping={avatarHopping} 
                                onClick={handleAvatarClick} 
                              />
                            )}

                            <div
                              onClick={() => handleCardClick(lesson)}
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
                              {/* Top: Lesson Number Badge & Lock / Stars */}
                              <div className="flex items-center justify-between">
                                <span className={`text-base font-black font-mono ${isNextActive ? 'text-[#2D2319]' : 'text-[#2D2319]'}`}>
                                  #{lesson.id}
                                </span>
                                {!isUnlocked && (
                                  <Lock className="w-3.5 h-3.5 text-[#2D2319]/50" />
                                )}
                                {isCompleted && (
                                  <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-950 font-mono text-[10px] font-black border border-[#2D2319]">
                                    ★ {score.stars || 5}
                                  </span>
                                )}
                              </div>

                              {/* Center: Illustration / Icon */}
                              <div className="flex-1 flex items-center justify-center my-1">
                                {renderCardIllustration(lesson, isCompleted)}
                              </div>

                              {/* Bottom: Lesson Title */}
                              <div className="border-t border-[#2D2319]/20 pt-1 text-center">
                                <span className="text-[10px] font-bold text-[#2D2319] truncate block font-display">
                                  {lesson.title}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                  {/* Stage Boss Milestone Gates between stages */}
                  {nextStage && (
                    <StageBossMilestoneGate
                      fromStage={stage}
                      toStage={nextStage}
                      stageIndex={stageIndex}
                      isUnlocked={isStageGateUnlocked}
                      completedLevels={completedInThisStage}
                      totalLevels={totalInThisStage}
                      onInspectGate={() => {}}
                      onJumpToActive={locateActiveHero}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

      </div>

      {/* Floating Right Navigation Rail (Retro OS Tool Pallet) */}
      <div className="fixed right-4 top-1/3 z-40 hidden md:flex flex-col items-center space-y-2 bg-[var(--rs-paper-alt)] p-2 rounded-2xl shadow-[4px_4px_0px_#2D2319] border-2 border-[#2D2319]">
        <button 
          onClick={() => {
            sound.playKeyClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Scroll to Top"
          className="p-2 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <button 
          onClick={() => {
            sound.playKeyClick();
            setDrawerOpen(true);
          }}
          title="Table of Contents (T)"
          className="p-2 rounded-xl bg-[#F6C445] hover:bg-[#eab308] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <List className="w-4 h-4" />
        </button>

        <button 
          onClick={locateActiveHero}
          title="Locate Hero (L)"
          className="p-2 rounded-xl bg-[#4BA3E3] hover:bg-sky-500 text-white border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4" />
        </button>

        <button 
          onClick={() => {
            sound.playKeyClick();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }}
          title="Scroll to Bottom"
          className="p-2 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Stage Drawer Modal */}
      <StageDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        stages={stages}
        userProgress={userProgress.courses?.[course.id] || {}}
        onSelectStage={stage => {
          setDrawerOpen(false);
          const el = document.getElementById(stage.id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />

    </div>
  );
}
