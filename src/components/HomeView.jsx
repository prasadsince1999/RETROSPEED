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
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getDailyChallengeState, getPlayerProfile } from '../utils/storage';

export default function HomeView({
  userProgress = {},
  activeCourseId = 'keycraft-odyssey',
  onStartQuickDrill,
  onStartDailyChallenge,
  onNavigate
}) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

  const profile = getPlayerProfile(userProgress);
  const dailyState = getDailyChallengeState(userProgress);

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
            Race Your Fingers
          </span>
          <p className="text-xs sm:text-sm font-medium text-[#2D2319]/80 font-serif italic">
            Type keywords. Beat the clock. Improve every day.
          </p>
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
              <label className="text-xs font-mono font-bold text-[#2D2319] uppercase tracking-wider block">
                Select Difficulty:
              </label>
              <div className="flex items-center space-x-2">
                {[
                  { id: 'easy', label: 'Easy (Vocabulary)', color: 'bg-[#C7E8CA]' },
                  { id: 'medium', label: 'Medium (Technical)', color: 'bg-[#F6C445]' },
                  { id: 'hard', label: 'Hard (Code Syntax)', color: 'bg-[#F28B82]' }
                ].map(diff => {
                  const isActive = selectedDifficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => {
                        sound.playKeyClick();
                        setSelectedDifficulty(diff.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black font-display border-2 border-[#2D2319] transition-all ${
                        isActive
                          ? `${diff.color} text-[#2D2319] shadow-[2px_2px_0px_#2D2319] translate-x-0`
                          : 'bg-[#FDF8EE] hover:bg-white text-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
                      }`}
                    >
                      {diff.label.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Limit Dropdown */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-mono font-bold text-[#2D2319] uppercase tracking-wider block">
                Time Limit:
              </label>
              
              <div className="relative max-w-xs">
                <button
                  type="button"
                  onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FDF8EE] hover:bg-white text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold flex items-center justify-between focus:outline-none"
                >
                  <span className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-[#2D2319]" />
                    <span>{timeLimit} Seconds</span>
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#2D2319]" />
                </button>

                {timeDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setTimeDropdownOpen(false)} />
                    <div className="absolute left-0 top-full mt-1 w-full bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] z-50 overflow-hidden font-mono text-xs">
                      {[30, 60, 90, 120].map(sec => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => {
                            sound.playKeyClick();
                            setTimeLimit(sec);
                            setTimeDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 hover:bg-[#F6C445] font-bold text-[#2D2319] flex items-center justify-between transition-colors ${
                            timeLimit === sec ? 'bg-[#FAF3E0] font-black' : ''
                          }`}
                        >
                          <span>{sec} Seconds</span>
                          {timeLimit === sec && <span>✓</span>}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Chunky Yellow Start Game Action Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleStartGame}
                className="px-6 py-2.5 rounded-xl bg-[#F6C445] hover:bg-[#ffd95e] text-[#2D2319] font-black font-display text-sm uppercase tracking-wide border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2D2319] transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-[#2D2319] text-[#2D2319]" />
                <span>▶ Start Game</span>
              </button>
            </div>

          </div>

          {/* Right KPI Stats Panel */}
          <div className="lg:col-span-5 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[2px_2px_0px_#2D2319] space-y-2 font-mono">
            
            <div className="text-xs font-black uppercase text-[#2D2319] border-b border-[#2D2319]/20 pb-1 font-display">
              Performance Summary
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF3E0] border border-[#2D2319]/30">
                <span className="text-[#2D2319]/70 font-bold">High Score:</span>
                <span className="font-black text-[#2D2319]">{totalScore > 0 ? totalScore.toLocaleString() : '0'}</span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF3E0] border border-[#2D2319]/30">
                <span className="text-[#2D2319]/70 font-bold">Best WPM:</span>
                <span className="font-black text-[#2D2319]">{bestWpm > 0 ? `${bestWpm} WPM` : '—'}</span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF3E0] border border-[#2D2319]/30">
                <span className="text-[#2D2319]/70 font-bold">Games Played:</span>
                <span className="font-black text-[#2D2319]">{totalAttempts}</span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF3E0] border border-[#2D2319]/30">
                <span className="text-[#2D2319]/70 font-bold">Current Streak:</span>
                <span className="font-black text-amber-700 flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600 inline" />
                  <span>{streakDays} {streakDays === 1 ? 'Day' : 'Days'}</span>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Daily Challenge Window Card */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] space-y-3">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-start space-x-3">
            {/* Calendar Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#C7E8CA] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-[#2D2319] shrink-0">
              <Calendar className="w-5 h-5 text-[#2D2319]" />
            </div>

            <div>
              <h3 className="text-base font-black text-[#2D2319] font-display flex items-center space-x-2">
                <span>Daily Challenge</span>
                <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold border border-[#2D2319] ${
                  dailyState.isCompleted ? 'bg-[#48B89F] text-white' : 'bg-[#F6C445] text-[#2D2319]'
                }`}>
                  {dailyState.isCompleted ? 'COMPLETED' : 'LIVE'}
                </span>
              </h3>
              <p className="text-xs font-medium text-[#2D2319]/80 mt-0.5 font-sans">
                Type 25 unique keywords in 90 seconds (+250 XP reward)
              </p>
            </div>
          </div>

          {/* Chunky Play Now Button */}
          <button
            type="button"
            onClick={handlePlayDaily}
            className="px-5 py-2.5 rounded-xl bg-[#48B89F] hover:bg-[#3ca089] text-white font-black font-display text-xs sm:text-sm uppercase tracking-wide border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all self-start sm:self-auto cursor-pointer"
          >
            {dailyState.isCompleted ? 'Play Again' : 'Play Now'}
          </button>

        </div>

        {/* Progress Bar */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-xs font-mono font-bold text-[#2D2319]">
            <span>Daily Goal Progress</span>
            <span>{dailyState.completedKeywords} / {dailyState.targetKeywords} Keywords</span>
          </div>

          <div className="w-full h-3 bg-[#FDF8EE] rounded-full border-2 border-[#2D2319] overflow-hidden p-0.5 flex">
            <div 
              className="h-full bg-[#48B89F] rounded-full transition-all duration-300"
              style={{ width: `${dailyState.progressPercent}%` }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
