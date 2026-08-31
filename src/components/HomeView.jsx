import React, { useState } from 'react';
import { 
  Zap, 
  Target, 
  Clock, 
  Flame, 
  Star, 
  Play, 
  Calendar, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  Award,
  Compass,
  ArrowRight,
  BookOpen,
  Gamepad2
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getDailyChallengeState, getPlayerProfile } from '../utils/storage';
import { getNextSpineLesson, SPINE_PARTS } from '../data/spineCurriculum';

export default function HomeView({
  userProgress = {},
  activeCourseId = 'keystroke-foundations',
  onStartQuickDrill,
  onStartDailyChallenge,
  onStartSpineLesson,
  onOpenStudio,
  onNavigate
}) {
  const [drillMode, setDrillMode] = useState('quick'); // 'quick' | 'sprint' | 'gauntlet' | 'custom'
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

  const profile = getPlayerProfile(userProgress);
  const dailyState = getDailyChallengeState(userProgress);
  const nextSpine = getNextSpineLesson(userProgress);

  // Compute honest session truth from userProgress
  const attempts = Array.isArray(userProgress.attemptLogs) ? userProgress.attemptLogs : [];
  const bestWpm = attempts.length > 0 ? Math.max(...attempts.map(a => Number(a.wpm) || 0)) : 0;
  const totalScore = profile.totalXp || 0;
  const totalAttempts = attempts.length;
  const streakDays = userProgress.streakDays || 0;

  const handleSelectMode = (mode) => {
    sound.playKeyClick();
    setDrillMode(mode);
    if (mode === 'quick') {
      setSelectedDifficulty('easy');
      setTimeLimit(60);
    } else if (mode === 'sprint') {
      setSelectedDifficulty('medium');
      setTimeLimit(60);
    } else if (mode === 'gauntlet') {
      setSelectedDifficulty('hard');
      setTimeLimit(90);
    }
  };

  const handleStartGame = () => {
    sound.playKeyClick();
    if (onStartQuickDrill) {
      onStartQuickDrill(selectedDifficulty, timeLimit);
    }
  };

  const handlePlayDaily = () => {
    sound.playKeyClick();
    if (onStartDailyChallenge) {
      onStartDailyChallenge();
    }
  };

  const handleContinueSpine = () => {
    sound.playKeyClick();
    if (onStartSpineLesson) {
      onStartSpineLesson(nextSpine.part, nextSpine.lesson);
    } else if (onNavigate) {
      onNavigate('learn');
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto space-y-5">
      
      {/* Hero Header Section */}
      <div className="space-y-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start space-x-2.5">
          <span className="text-[#2D2319] font-mono font-bold text-sm tracking-tighter select-none">══</span>
          
          {/* Keycap [ ⚡ ] Icon */}
          <div className="w-8 h-8 rounded-lg bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-mono font-black text-sm text-[#2D2319] shrink-0">
            ⚡
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#2D2319] font-display uppercase tracking-tight">
            RETROSPEED
          </h1>

          <span className="text-[#2D2319] font-mono font-bold text-sm tracking-tighter select-none">════</span>
        </div>

        <div className="flex items-center justify-center sm:justify-start space-x-2 pl-1 pt-0.5">
          <span className="px-2 py-0.5 rounded bg-[#F6C445] border border-[#2D2319] text-[10px] font-mono font-black uppercase tracking-wider text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            Core Spine
          </span>
          <p className="text-xs sm:text-sm font-medium text-[#2D2319]/80 font-mono">
            Learn the keys. Build your rhythm. Speed follows naturally.
          </p>
        </div>
      </div>

      {/* ZERO-TO-HERO HERO CARD */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-[#4BA3E3] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              {nextSpine.part.title}
            </span>
            <span className="text-xs font-mono font-bold text-[#2D2319]/70">
              — {nextSpine.part.subtitle}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-[#2D2319] font-display">
            {nextSpine.lesson.title}
          </h2>
          <p className="text-xs text-[#2D2319]/80 font-mono">
            {nextSpine.lesson.description} · Target: {nextSpine.part.targetSpeed} ({nextSpine.part.passAccuracy}% Acc)
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={handleContinueSpine}
            className="px-5 py-2.5 rounded-xl bg-[#F6C445] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] font-mono text-xs font-black uppercase text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-2"
          >
            <Play className="w-4 h-4 fill-[#2D2319]" />
            <span>Continue Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Play & Practice Drills Window Card */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] space-y-4">
        
        {/* Card Title */}
        <div className="flex items-center space-x-2 border-b-2 border-[#2D2319]/20 pb-2">
          <Zap className="w-4 h-4 text-[#F6C445] fill-[#F6C445]" />
          <h2 className="text-base sm:text-lg font-black text-[#2D2319] font-display">
            Quick Practice & Drills
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Config Panel: Drill Modes + Config + Start */}
          <div className="lg:col-span-7 space-y-3.5">
            
            {/* Drill Mode Selection Presets */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-[#2D2319]/80 uppercase tracking-wider block">
                Select Drill:
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'quick', label: 'Quick Drill', desc: '60s · Easy', icon: Clock },
                  { id: 'sprint', label: 'Speed Sprint', desc: '60s · Medium', icon: Flame },
                  { id: 'gauntlet', label: 'Accuracy Gauntlet', desc: '90s · Hard', icon: Target },
                  { id: 'custom', label: 'Custom', desc: 'Manual Setup', icon: Zap }
                ].map((preset) => {
                  const isSelected = drillMode === preset.id;
                  const Icon = preset.icon;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectMode(preset.id)}
                      className={`p-2 sm:p-2.5 rounded-xl border-2 border-[#2D2319] text-left transition-all cursor-pointer min-h-[64px] flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#C7E8CA] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] -translate-y-0.5 font-black'
                          : 'bg-[#FDF8EE] hover:bg-[#FBF6EA] text-[#2D2319] shadow-[1px_1px_0px_#2D2319]'
                      }`}
                    >
                      <div className="flex items-start space-x-1.5 text-[11px] sm:text-xs font-bold font-display leading-tight">
                        <Icon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="break-words whitespace-normal leading-tight">{preset.label}</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#2D2319]/70 mt-1 leading-tight break-words whitespace-normal">
                        {preset.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Difficulty & Duration (Visible for Custom or Tweaking) */}
            <div className="flex flex-wrap gap-4 pt-1 items-end">
              
              {/* Difficulty */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 uppercase block">
                  Difficulty:
                </span>
                <div className="flex gap-1.5">
                  {[
                    { id: 'easy', label: 'Easy' },
                    { id: 'medium', label: 'Medium' },
                    { id: 'hard', label: 'Hard' }
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => {
                        sound.playKeyClick();
                        setSelectedDifficulty(diff.id);
                        setDrillMode('custom');
                      }}
                      className={`px-3 py-1 rounded-lg border-2 border-[#2D2319] font-mono text-xs font-bold transition-all ${
                        selectedDifficulty === diff.id
                          ? 'bg-[#F6C445] text-[#2D2319] shadow-[1px_1px_0px_#2D2319] font-black'
                          : 'bg-[#FDF8EE] hover:bg-[#FBF6EA] text-[#2D2319]'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Limit */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 uppercase block">
                  Time Limit:
                </span>
                <div className="relative inline-block w-36">
                  <button
                    type="button"
                    onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-1 rounded-lg bg-[#FDF8EE] hover:bg-[#FBF6EA] border-2 border-[#2D2319] text-xs font-mono font-bold text-[#2D2319] shadow-[1px_1px_0px_#2D2319]"
                  >
                    <span>{timeLimit}s</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#2D2319]" />
                  </button>

                  {timeDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-[#FDF8EE] border-2 border-[#2D2319] rounded-lg shadow-[4px_4px_0px_#2D2319] z-20 overflow-hidden">
                      {[30, 60, 90, 120].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            sound.playKeyClick();
                            setTimeLimit(t);
                            setDrillMode('custom');
                            setTimeDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-mono font-bold border-b border-[#2D2319]/10 last:border-0 hover:bg-[#C7E8CA] ${
                            timeLimit === t ? 'bg-[#C7E8CA] text-[#2D2319]' : 'text-[#2D2319]'
                          }`}
                        >
                          {t} Seconds
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Start Drill Action Button */}
              <div className="pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={handleStartGame}
                  className="px-6 py-2 rounded-xl bg-[#F6C445] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] font-mono text-xs font-black uppercase text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-[#2D2319]" />
                  <span>▶ Start Drill</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Performance Stats Summary Card */}
          <div className="lg:col-span-5 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[3px_3px_0px_#2D2319] space-y-2.5">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-[#2D2319] border-b border-[#2D2319]/20 pb-1 block">
              Performance Summary
            </span>

            <div className="space-y-1.5 font-mono text-xs text-[#2D2319]">
              <div className="flex justify-between items-center py-1 border-b border-[#2D2319]/10">
                <span className="text-[#2D2319]/70 font-medium">High Score:</span>
                <span className="font-black">{totalScore.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#2D2319]/10">
                <span className="text-[#2D2319]/70 font-medium">Best WPM:</span>
                <span className="font-black">{bestWpm > 0 ? `${bestWpm} WPM` : '—'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#2D2319]/10">
                <span className="text-[#2D2319]/70 font-medium">Games Played:</span>
                <span className="font-black">{totalAttempts}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#2D2319]/70 font-medium">Current Streak:</span>
                <span className="font-black text-[#E06D53] flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 fill-[#E06D53]" />
                  <span>{streakDays} Days</span>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Daily Challenge Window Card */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] space-y-3">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#C7E8CA] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-[#2D2319] shrink-0">
              <Calendar className="w-4 h-4" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm sm:text-base font-black text-[#2D2319] font-display">
                  Daily Challenge
                </h3>
                <span className="px-1.5 py-0.2 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319]">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-[#2D2319]/70 font-mono mt-0.5">
                Type 25 unique keywords in 90 seconds (+250 XP reward)
              </p>
            </div>
          </div>

          <button
            onClick={handlePlayDaily}
            className="px-5 py-2 rounded-xl bg-[#48B89F] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-black uppercase text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all shrink-0 cursor-pointer"
          >
            Play Now
          </button>

        </div>

        {/* Daily Goal Segmented Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono font-bold text-[#2D2319]/70">
            <span>Daily Goal Progress</span>
            <span>{dailyState.todayWordsCount || 0} / 25 Keywords</span>
          </div>

          <div className="w-full bg-[#FDF8EE] border-2 border-[#2D2319] rounded-lg h-3.5 p-0.5 shadow-[1px_1px_0px_#2D2319] overflow-hidden">
            <div 
              className="h-full bg-[#48B89F] border border-[#2D2319] rounded-[4px] transition-all duration-300"
              style={{ width: `${Math.min(100, Math.round(((dailyState.todayWordsCount || 0) / 25) * 100))}%` }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
