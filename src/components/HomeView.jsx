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
            Driving School Spine
          </span>
          <p className="text-xs sm:text-sm font-medium text-[#2D2319]/80 font-serif italic">
            First you learn the clutch. Then the road. Then highway shortcuts.
          </p>
        </div>
      </div>

      {/* ZERO-TO-HERO PRIMARY ROAD HERO CARD */}
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

      {/* Quick Play Window Card */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] space-y-4">
        
        {/* Card Title */}
        <div className="flex items-center space-x-2 border-b-2 border-[#2D2319]/20 pb-2">
          <Zap className="w-4 h-4 text-[#F6C445] fill-[#F6C445]" />
          <h2 className="text-base sm:text-lg font-black text-[#2D2319] font-display">
            Quick Play
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Left Config Panel: Difficulty + Time Limit + Start Game */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Select Difficulty Pills */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-[#2D2319]/80 uppercase tracking-wider block">
                Select Difficulty:
              </label>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'easy', label: 'Easy' },
                  { id: 'medium', label: 'Medium' },
                  { id: 'hard', label: 'Hard' }
                ].map((diff) => {
                  const isActive = selectedDifficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      onClick={() => {
                        sound.playKeyClick();
                        setSelectedDifficulty(diff.id);
                      }}
                      className={`px-3.5 py-1.5 rounded-lg border-2 border-[#2D2319] font-mono text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#C7E8CA] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] translate-x-0.5 translate-y-0.5'
                          : 'bg-[#FDF8EE] hover:bg-[#FBF6EA] text-[#2D2319] shadow-[2px_2px_0px_#2D2319]'
                      }`}
                    >
                      {diff.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Limit Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-[#2D2319]/80 uppercase tracking-wider block">
                Time Limit:
              </label>

              <div className="relative inline-block w-full sm:w-60">
                <button
                  onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#FDF8EE] hover:bg-[#FBF6EA] border-2 border-[#2D2319] text-xs font-mono font-bold text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-[#2D2319]" />
                    <span>{timeLimit} Seconds</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#2D2319]" />
                </button>

                {timeDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-[#FDF8EE] border-2 border-[#2D2319] rounded-lg shadow-[4px_4px_0px_#2D2319] z-20 overflow-hidden">
                    {[30, 60, 90, 120].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          sound.playKeyClick();
                          setTimeLimit(t);
                          setTimeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-mono font-bold border-b border-[#2D2319]/10 last:border-0 hover:bg-[#C7E8CA] transition-colors ${
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

            {/* Start Game Action Button */}
            <div>
              <button
                onClick={handleStartGame}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F6C445] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] font-mono text-xs font-black uppercase text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-[#2D2319]" />
                <span>▶ Start Game</span>
              </button>
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

      {/* QUIET STUDIO SHELF FOOTER */}
      <div className="pt-2 border-t-2 border-[#2D2319]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#2D2319]/70">
        <div className="flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F6C445]" />
          <span>Built with care by PrasaD at KSM × Tech, India · 100% Offline</span>
        </div>

        <button
          onClick={() => {
            if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
            if (onOpenStudio) onOpenStudio();
          }}
          className="hover:text-[#2D2319] font-bold underline cursor-pointer flex items-center space-x-1"
        >
          <span>More from the studio</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
}
