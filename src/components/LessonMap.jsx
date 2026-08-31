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
  Search
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
        <div className="px-2.5 py-0.5 rounded-md bg-[#1888ff] text-white font-black text-[9px] uppercase tracking-wider font-mono shadow-[2px_2px_0_#0f172a] border-2 border-slate-900 flex items-center space-x-1 group-hover:scale-105 transition-transform">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fef08a] animate-ping" />
          <span>YOU ARE HERE</span>
        </div>
        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-slate-900 -mt-0.5" />
      </div>

      {/* Character Pawn Vector Graphics */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Hero Character Mascot */}
        <svg viewBox="0 0 64 64" className="w-14 h-14 drop-shadow-[2px_2px_0_#0f172a] relative z-10">
          {/* Mechanical Backpack with Energy Core */}
          <rect x="14" y="24" width="36" height="28" rx="4" fill="#0369a1" stroke="#0f172a" strokeWidth="2" />
          <circle cx="32" cy="38" r="5" fill="#38bdf8" className="animate-pulse" />
          <circle cx="32" cy="38" r="2" fill="#ffffff" />

          {/* Explorer Suit Body */}
          <ellipse cx="32" cy="42" rx="14" ry="12" fill="#0284c7" stroke="#0f172a" strokeWidth="2" />
          <path d="M22 36 Q32 41 42 36" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />

          {/* Adventurer Head / Helmet */}
          <circle cx="32" cy="22" r="13" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />

          {/* Golden Explorer Hat & Crest */}
          <path d="M17 19 C17 9 47 9 47 19 Z" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
          <ellipse cx="32" cy="19" rx="17" ry="3.5" fill="#d97706" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx="32" cy="13" r="2.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1" />

          {/* Cyber Goggles / Visor */}
          <rect x="22" y="19" width="20" height="8" rx="3" fill="#0f172a" stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="27.5" cy="23" rx="3.5" ry="2.2" fill="#38bdf8" />
          <ellipse cx="36.5" cy="23" rx="3.5" ry="2.2" fill="#38bdf8" />
          <circle cx="28.5" cy="22" r="1" fill="#ffffff" />
          <circle cx="37.5" cy="22" r="1" fill="#ffffff" />

          {/* Happy Explorer Smile */}
          <path d="M28 29 Q32 32.5 36 29" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>

        {/* Dynamic Floor Shadow */}
        <div className="absolute -bottom-1 w-9 h-2.5 bg-slate-900/60 rounded-full animate-shadow-pulse" />
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
  const [isActivating, setIsActivating] = useState(false);
  const percent = Math.min(100, Math.round((completedLevels / Math.max(1, totalLevels)) * 100));

  const handleGateInteraction = () => {
    setIsActivating(true);
    sound.playGateRumble();
    sound.playRuneGlow(stageIndex);

    if (isUnlocked) {
      confetti({
        particleCount: 55,
        spread: 85,
        origin: { y: 0.65 },
        colors: ['#0284c7', '#38bdf8', '#fbbf24', '#34d399', '#f472b6']
      });
    }

    setTimeout(() => setIsActivating(false), 800);
    if (onInspectGate) onInspectGate();
  };

  const stoneRunes = ['[Q]', '[W]', '[E]', '[R]', '[T]', '[Y]', '[A]', '[S]', '[D]', '[F]', '[J]', '[K]', '[L]', '[;]', '[Space]'];

  return (
    <div className="my-10 relative select-none">
      {/* Stone Gate Archway Container Frame */}
      <div 
        onClick={handleGateInteraction}
        className={`relative mx-auto max-w-4xl rounded-2xl p-6 sm:p-7 border-2 border-slate-900 transition-all duration-300 shadow-[6px_6px_0_#0f172a] cursor-pointer ${
          isActivating ? 'animate-gate-rumble' : ''
        } ${
          isUnlocked
            ? 'bg-[#1e293b] text-white'
            : 'bg-[#292524] text-stone-200'
        }`}
      >
        {/* Background Mechanical Rotating Clockwork Gears */}
        <div className="absolute top-4 left-5 w-14 h-14 pointer-events-none opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-gear-cw text-amber-400 fill-current">
            <path d="M50 35 A15 15 0 1 0 50 65 A15 15 0 1 0 50 35 M45 5 L55 5 L55 20 L45 20 Z M45 80 L55 80 L55 95 L45 95 Z M5 45 L5 55 L20 55 L20 45 Z M80 45 L80 55 L95 55 L95 45 Z M18 18 L26 26 L16 36 L8 28 Z M74 74 L82 82 L72 92 L64 84 Z M82 18 L74 26 L84 36 L92 28 Z M26 74 L18 82 L28 92 L36 84 Z" />
          </svg>
        </div>
        <div className="absolute top-4 right-5 w-14 h-14 pointer-events-none opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-gear-ccw text-amber-400 fill-current">
            <path d="M50 35 A15 15 0 1 0 50 65 A15 15 0 1 0 50 35 M45 5 L55 5 L55 20 L45 20 Z M45 80 L55 80 L55 95 L45 95 Z M5 45 L5 55 L20 55 L20 45 Z M80 45 L80 55 L95 55 L95 45 Z M18 18 L26 26 L16 36 L8 28 Z M74 74 L82 82 L72 92 L64 84 Z M82 18 L74 26 L84 36 L92 28 Z M26 74 L18 82 L28 92 L36 84 Z" />
          </svg>
        </div>

        {/* Top Arch Lintel Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-700 pb-3.5 mb-4 relative z-10">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-slate-900 font-mono font-black text-lg shadow-[2px_2px_0_#0f172a] ${
              isUnlocked 
                ? 'bg-[#1888ff] text-white' 
                : 'bg-stone-700 text-stone-300'
            }`}>
              {isUnlocked ? '⚡' : '🔒'}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">
                STAGE MILESTONE GATEWAY • {fromStage.title} ➔ {toStage.title}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight font-display">
                {isUnlocked ? `Passage to ${toStage.title}` : `Sealed Gate to ${toStage.title}`}
              </h3>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] self-start sm:self-auto ${
            isUnlocked ? 'bg-[#48bb78] text-slate-950' : 'bg-[#f59e0b] text-slate-950'
          }`}>
            {isUnlocked ? 'STAGE GATEWAY OPEN' : `${completedLevels}/${totalLevels} Levels Done`}
          </span>
        </div>

        {/* Stone Monolith Pillars & Central Archway Vault */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative z-10">
          {/* Left Stone Monolith Pillar */}
          <div className="hidden md:flex md:col-span-2 flex-col items-center space-y-1.5 py-3 px-2 rounded-xl bg-black/40 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">KEY RUNES</span>
            {stoneRunes.slice(0, 5).map((rune, idx) => (
              <span
                key={idx}
                className={`font-mono text-xs font-black tracking-wider ${
                  isUnlocked ? 'text-sky-300' : 'text-stone-500'
                }`}
              >
                {rune}
              </span>
            ))}
          </div>

          {/* Central Portal / Portcullis Vault */}
          <div className="md:col-span-8 flex flex-col items-center justify-center p-5 rounded-xl bg-black/50 border-2 border-slate-900 text-center min-h-[140px] shadow-[3px_3px_0_#0f172a]">
            {isUnlocked ? (
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-[#1888ff] border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white font-display">Passage Unlocked!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mt-1 font-mono">
                    Prerequisites met for {fromStage.title}. Advance into {toStage.title}!
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-[#fef08a] text-slate-950 font-mono text-[10px] font-bold border border-slate-900">
                  ✦ Milestone Cleared • +250 XP Awarded
                </span>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center space-y-2 w-full">
                <div className="w-12 h-12 rounded-xl bg-stone-800 border-2 border-slate-900 flex items-center justify-center text-amber-400 shadow-[2px_2px_0_#0f172a]">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white font-display">Prerequisites Required</h4>
                  <p className="text-xs text-stone-300 max-w-md mt-1 font-mono">
                    Complete all {totalLevels} levels in {fromStage.title} to unlock this passage.
                  </p>
                </div>

                {/* Milestone Progress Bar */}
                <div className="w-full max-w-xs space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-mono font-bold text-stone-300">
                    <span>Stage Completion</span>
                    <span className="text-amber-400">{percent}%</span>
                  </div>
                  <div className="w-full h-3 bg-stone-800 rounded-md border-2 border-slate-900 overflow-hidden p-0.5">
                    <div 
                      className="h-full bg-[#f59e0b] rounded-xs"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Stone Monolith Pillar */}
          <div className="hidden md:flex md:col-span-2 flex-col items-center space-y-1.5 py-3 px-2 rounded-xl bg-black/40 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">KEY RUNES</span>
            {stoneRunes.slice(5, 10).map((rune, idx) => (
              <span
                key={idx}
                className={`font-mono text-xs font-black tracking-wider ${
                  isUnlocked ? 'text-sky-300' : 'text-stone-500'
                }`}
              >
                {rune}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Stone Gate Footer Controls */}
        <div className="mt-3 pt-2.5 border-t-2 border-slate-700 flex items-center justify-between text-[11px] font-mono text-slate-300 relative z-10">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Click gate to test mechanism resonance</span>
          </span>
          <span className="font-bold">
            {isUnlocked ? '✦ Milestone Conquered' : `✦ ${totalLevels - completedLevels} levels remaining`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LessonMap({ 
  course,
  stages = [],
  lessons = [],
  userProgress = {}, 
  onSelectLesson, 
  onJumpWarning,
  onBack,
  onNavigate
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [avatarHopping, setAvatarHopping] = useState(false);

  // Active course progress stats
  const courseScores = userProgress.courses?.[course.id]?.scores || {};
  const unlockedLevel = userProgress.courses?.[course.id]?.unlockedLevel || 1;
  const totalStars = userProgress.courses?.[course.id]?.totalStars || 0;
  const totalPoints = userProgress.courses?.[course.id]?.totalPoints || 0;

  const completedCount = Object.keys(courseScores).length;
  const progressPercent = Math.min(100, Math.round((completedCount / Math.max(1, lessons.length)) * 100));

  // Trigger avatar hop animation when unlockedLevel advances
  useEffect(() => {
    setAvatarHopping(true);
    sound.playAvatarHop();
    const t = setTimeout(() => setAvatarHopping(false), 600);
    return () => clearTimeout(t);
  }, [unlockedLevel]);

  // Focus and scroll active level into view
  const locateActiveHero = () => {
    const el = document.getElementById(`lesson-node-${unlockedLevel}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setAvatarHopping(true);
      sound.playAvatarHop();
      setTimeout(() => setAvatarHopping(false), 600);
    }
  };

  // Keyboard navigation on Map view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;

      if (e.key === 'Escape') {
        if (drawerOpen) {
          setDrawerOpen(false);
        } else if (onBack) {
          onBack();
        } else if (onNavigate) {
          onNavigate('portal');
        }
      } else if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        locateActiveHero();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setDrawerOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen, onBack, onNavigate]);

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    setAvatarHopping(true);
    sound.playAvatarHop();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#38bdf8', '#fbbf24']
    });
    setTimeout(() => setAvatarHopping(false), 600);
  };

  const handleCardClick = (lesson) => {
    sound.playKeyClick();
    const isUnlocked = lesson.id <= unlockedLevel;
    if (isUnlocked) {
      onSelectLesson(lesson);
    } else {
      onJumpWarning(lesson);
    }
  };

  const scrollToStage = (stage) => {
    const el = document.getElementById(stage.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper to render authentic lesson card icons
  const renderCardIllustration = (lesson, isCompleted) => {
    if (lesson.type === 'game') {
      const app = (lesson.gameApp || lesson.activityApp || '').toLowerCase();
      const title = (lesson.title || '').toLowerCase();
      const eng = (lesson.renderEngine || '').toLowerCase();
      const combined = `${app} ${title} ${eng}`;

      const isApple = combined.includes('apple') || combined.includes('thief') || combined.includes('thieves') || combined.includes('orchard') || combined.includes('raccoon');
      const isTemple = combined.includes('temple') || combined.includes('bash') || combined.includes('desert') || combined.includes('tomb') || combined.includes('relic');
      const isBubble = combined.includes('bubble') || combined.includes('ocean') || combined.includes('float');
      const isMonster = combined.includes('monster') || combined.includes('alien') || combined.includes('space');

      return (
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-11 h-11 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] flex items-center justify-center text-slate-950 font-black text-base bg-[#fef08a]">
            {isApple ? '🍎' : isTemple ? '🏛️' : isBubble ? '🫧' : isMonster ? '👾' : '🎈'}
          </div>
        </div>
      );
    }

    if (lesson.type === 'video') {
      return (
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-10 rounded-lg bg-slate-100 border-2 border-slate-900 flex items-center justify-center text-slate-800 shadow-[2px_2px_0_#0f172a]">
            <div className="w-6 h-6 rounded-md bg-[#f87171] border border-slate-900 text-slate-950 flex items-center justify-center">
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
        <div className={`w-12 h-9 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] flex items-center justify-center font-mono font-black text-xs ${
          isCompleted ? 'bg-[#48bb78] text-slate-950' : 'bg-white text-slate-900'
        }`}>
          {letters}
        </div>
      </div>
    );
  };

  const filteredStages = stages.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const matchesStage = s.title.toLowerCase().includes(q);
    const hasMatchingLesson = lessons.some(l => 
      l.id >= s.start && l.id <= s.end && (
        l.title.toLowerCase().includes(q) || String(l.id) === q || String(l.id).startsWith(q)
      )
    );
    return matchesStage || hasMatchingLesson;
  });

  // Solid header colors for course banner
  const courseColors = {
    'typing-jungle': 'bg-[#48bb78]',
    'code-typing': 'bg-[#6366f1]',
    'loanwords': 'bg-[#14b8a6]',
    'music-theory': 'bg-[#a855f7]',
    'us-state-facts': 'bg-[#3b82f6]',
    'mystery-detective': 'bg-[#f59e0b]',
    'vocab-nonfiction': 'bg-[#06b6d4]',
    'short-stories': 'bg-[#ec4899]'
  };
  const bannerBg = courseColors[course.id] || 'bg-[#2c3e50]';

  return (
    <div className="min-h-screen bg-[#e2e8f0] select-none relative pb-32 font-sans">
      
      {/* Top Breadcrumb & Course Banner Window */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-4 pb-2 space-y-4">
        
        {/* Navigation & Shortcuts Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              if (onBack) onBack();
              else if (onNavigate) onNavigate('portal');
            }}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs font-bold border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal</span>
          </button>

          <div className="text-xs text-slate-700 font-mono font-bold hidden sm:flex items-center space-x-1.5 bg-white px-3 py-1 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
            <span className="text-slate-500">Keys:</span>
            <kbd className="px-1 py-0.2 rounded bg-slate-100 border border-slate-400 text-[10px]">L</kbd>
            <span>Locate</span>
            <span>•</span>
            <kbd className="px-1 py-0.2 rounded bg-slate-100 border border-slate-400 text-[10px]">T</kbd>
            <span>Stages</span>
            <span>•</span>
            <kbd className="px-1 py-0.2 rounded bg-slate-100 border border-slate-400 text-[10px]">Esc</kbd>
            <span>Portal</span>
          </div>
        </div>

        {/* Solid Neo-Brutalist Course Banner Card */}
        <div className={`rounded-2xl ${bannerBg} p-5 sm:p-7 text-white border-2 border-slate-900 shadow-[6px_6px_0_#0f172a] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden`}>
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-black/30 text-white font-mono text-[10px] font-bold uppercase border border-white/20">
                {course.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-white text-slate-900 font-mono text-[10px] font-bold border border-slate-900">
                {course.grade}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              {course.title}
            </h1>
            
            <p className="text-xs sm:text-sm text-white/90 mt-2 font-medium leading-relaxed max-w-xl">
              {course.description}
            </p>
          </div>

          {/* Banner Progress Box */}
          <div className="relative z-10 w-full md:w-auto flex flex-col md:items-end space-y-2 bg-white text-slate-900 px-5 py-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0_#0f172a]">
            <div className="flex items-center justify-between md:justify-end gap-3 w-full font-mono">
              <span className="text-xs text-slate-600 font-bold">Progress</span>
              <span className="text-xl sm:text-2xl font-black">{progressPercent}%</span>
            </div>

            {/* Striped Progress Bar */}
            <div className="w-full md:w-48 h-3 bg-slate-100 rounded-md border-2 border-slate-900 overflow-hidden p-0.5">
              <div 
                className="h-full rounded-xs bg-[#48bb78]"
                style={{ 
                  width: `${progressPercent}%`,
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px)'
                }}
              />
            </div>

            <div className="flex items-center gap-2 pt-1 font-mono text-xs font-black">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                ★ {totalStars} Stars
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-300">
                {totalPoints.toLocaleString()} pts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter, Stats & Stage Drawer Navigation Bar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Stats Pill */}
        <div className="bg-white px-4 py-2 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] flex items-center space-x-3 text-xs font-mono font-bold text-slate-700 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-900 font-black">{completedCount} / {lessons.length}</span>
            <span className="text-slate-500 font-normal">done</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-amber-600 font-black">{totalStars}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-sky-600" />
            <span className="text-slate-900 font-black">{totalPoints.toLocaleString()}</span>
          </div>
        </div>

        {/* Search Input & Stage Drawer Button */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="flex-1 sm:w-64">
            <div className="flex items-center bg-white border-2 border-slate-900 rounded-xl px-3 py-1.5 shadow-[3px_3px_0_#0f172a]">
              <Search className="w-4 h-4 text-slate-600 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search level..."
                className="w-full bg-transparent border-none outline-none text-xs font-mono font-bold text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900"
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
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1 font-display"
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
            className="px-3 py-1.5 rounded-xl bg-[#fef08a] hover:bg-yellow-300 text-slate-950 font-black text-xs border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1 font-display"
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
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center shadow-[4px_4px_0_#0f172a] mt-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border-2 border-slate-900 text-slate-600 flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0_#0f172a]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 font-display">No levels found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No matches found for <strong className="text-slate-900">"{searchQuery}"</strong>. Try a level number or key phrase.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 px-3 py-1.5 rounded-lg bg-[#1888ff] text-white font-black text-xs border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-800 pb-2">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                          {stage.title}
                        </h2>
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-white font-mono text-[10px] font-bold">
                          Levels {stage.start}–{stage.end}
                        </span>
                      </div>

                      {stage.goal && (
                        <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-950 font-mono text-xs font-bold border-2 border-slate-900 shadow-[1px_1px_0_#0f172a] flex items-center space-x-1">
                          <Target className="w-3.5 h-3.5 text-sky-700" />
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
                              className={`relative aspect-square p-3 border-2 border-slate-900 rounded-xl flex flex-col justify-between cursor-pointer transition-all duration-150 select-none ${
                                isNextActive
                                  ? 'bg-[#fef08a] shadow-[5px_5px_0_#0f172a] ring-2 ring-sky-500 -translate-y-1'
                                  : isCompleted
                                  ? 'bg-[#ecfdf5] shadow-[3px_3px_0_#0f172a] hover:shadow-[5px_5px_0_#0f172a] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
                                  : isUnlocked
                                  ? 'bg-white shadow-[3px_3px_0_#0f172a] hover:shadow-[5px_5px_0_#0f172a] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
                                  : 'bg-slate-200/80 opacity-50 shadow-[1px_1px_0_#0f172a] cursor-not-allowed'
                              }`}
                            >
                              {/* Top: Lesson Number Badge & Lock / Stars */}
                              <div className="flex items-center justify-between">
                                <span className={`text-base font-black font-mono ${isNextActive ? 'text-slate-950' : 'text-slate-900'}`}>
                                  #{lesson.id}
                                </span>
                                {!isUnlocked && (
                                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                                )}
                                {isCompleted && (
                                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold border border-amber-400">
                                    ★ {score.stars || 5}
                                  </span>
                                )}
                              </div>

                              {/* Center: Illustration / Icon */}
                              <div className="flex-1 flex items-center justify-center my-1">
                                {renderCardIllustration(lesson, isCompleted)}
                              </div>

                              {/* Bottom: Lesson Title */}
                              <div className="border-t border-slate-300 pt-1 text-center">
                                <span className="text-[10px] font-bold text-slate-800 truncate block font-display">
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
      <div className="fixed right-4 top-1/3 z-40 hidden md:flex flex-col items-center space-y-2 bg-white p-2 rounded-xl shadow-[4px_4px_0_#0f172a] border-2 border-slate-900">
        <button 
          onClick={() => {
            sound.playKeyClick();
            setDrawerOpen(true);
          }}
          title="Table of Contents (T)"
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-900 text-slate-800 shadow-[1px_1px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
        >
          <List className="w-4 h-4" />
        </button>

        <button 
          onClick={locateActiveHero}
          title="Locate Pawn Hero (L)"
          className="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 border border-slate-900 text-sky-800 shadow-[1px_1px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
        >
          <Compass className="w-4 h-4" />
        </button>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Scroll to Top"
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-900 text-slate-800 shadow-[1px_1px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="w-7 h-7 rounded-lg bg-[#1888ff] text-white font-mono font-black text-xs flex items-center justify-center border border-slate-900 shadow-[1px_1px_0_#0f172a]">
          {unlockedLevel}
        </div>

        <button 
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          title="Scroll to Bottom"
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-900 text-slate-800 shadow-[1px_1px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Stage Drawer Modal */}
      <StageDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userProgress={{ unlockedLevel, totalStars, scores: courseScores }}
        stages={stages}
        onSelectStage={scrollToStage}
      />

    </div>
  );
}
