import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Target, 
  Trophy, 
  Calendar, 
  BarChart2, 
  ShoppingBag, 
  User, 
  Play, 
  ChevronDown, 
  Clock, 
  Zap, 
  Flame, 
  Star,
  Award,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  Keyboard,
  Hand,
  Settings,
  HelpCircle,
  BookOpen,
  Check,
  Compass,
  Code
} from 'lucide-react';
import { COURSES_CATALOG, getCourseById } from '../data/courseCatalog';
import { sound } from '../utils/audio';

export default function PortalHome({ 
  userProgress = {}, 
  activeCourseId = 'keycraft-odyssey',
  onSelectCourse, 
  onStartLesson, 
  onNavigate, 
  onOpenCatalog, 
  onOpenBadges, 
  onOpenStats,
  soundEnabled = true,
  onToggleSound,
  keyboardEnabled = true,
  onToggleKeyboard,
  handsEnabled = true,
  onToggleHands,
  selectedTheme = 'bone',
  onSelectTheme
}) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const menuBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCourse = getCourseById(activeCourseId);
  const courseData = userProgress.courses?.[activeCourseId] || {};
  const scores = courseData.scores || {};
  const completedCount = Object.keys(scores).length;

  let bestWpm = 78;
  let totalScore = 5580;
  let totalAttempts = 12;
  const streakDays = userProgress.streakDays || 3;

  if (Array.isArray(userProgress.attemptLogs) && userProgress.attemptLogs.length > 0) {
    const userMaxWpm = Math.max(...userProgress.attemptLogs.map(a => Number(a.wpm) || 0));
    if (userMaxWpm > 0) bestWpm = Math.max(bestWpm, userMaxWpm);
    
    let sumScore = 0;
    userProgress.attemptLogs.forEach(a => {
      sumScore += Number(a.points) || 0;
    });
    if (sumScore > 0) totalScore = Math.max(totalScore, sumScore);
    totalAttempts = Math.max(totalAttempts, userProgress.attemptLogs.length);
  } else if (courseData.totalPoints) {
    totalScore = Math.max(totalScore, courseData.totalPoints);
  }

  const handleQuickPlay = () => {
    sound.playKeyClick();
    if (onStartLesson) {
      const unlocked = courseData.unlockedLevel || 1;
      onStartLesson(activeCourseId, unlocked);
    } else if (onNavigate) {
      onNavigate('practice');
    }
  };

  const handleDailyChallenge = () => {
    sound.playKeyClick();
    if (onNavigate) {
      onNavigate('challenge');
    } else if (onStartLesson) {
      onStartLesson(activeCourseId, 1);
    }
  };

  const handleNav = (view) => {
    sound.playKeyClick();
    setOpenMenu(null);
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const handleCoursePick = (courseId) => {
    sound.playKeyClick();
    setOpenMenu(null);
    if (onSelectCourse) {
      onSelectCourse(courseId);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-2rem)] bg-[#B9D2E8] p-2 sm:p-6 flex items-center justify-center font-sans select-none overflow-hidden">
      
      <span className="absolute top-4 left-6 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>
      <span className="absolute top-12 left-1/4 text-lg text-[#2D2319] font-black opacity-40 pointer-events-none select-none">✦</span>
      <span className="absolute top-6 right-8 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>
      <span className="absolute bottom-6 left-8 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>
      <span className="absolute bottom-8 right-6 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>
      <span className="absolute bottom-12 right-1/4 text-lg text-[#2D2319] font-black opacity-40 pointer-events-none select-none">✦</span>

      <div className="w-full max-w-5xl border-2 border-[#2D2319] bg-[#FDF8EE] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden flex flex-col z-10">
        
        <div className="bg-[#C3A6E8] text-[#2D2319] px-3 sm:px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between font-mono font-bold text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-[#2D2319] text-base leading-none">✦</span>
            <span className="tracking-wide font-black uppercase font-display text-xs sm:text-sm">KEYCRAFT // Keyword Typer OS</span>
            <span className="hidden lg:inline-block px-2 py-0.5 rounded bg-[#FAF3E0] border border-[#2D2319] text-[10px] font-mono">v2.0</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-[#FDF8EE] px-2.5 py-0.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1.5 text-[11px] font-bold text-[#2D2319]">
              <Star className="w-3.5 h-3.5 text-[#F6C445] fill-[#F6C445]" />
              <span>{totalScore.toLocaleString()} pts</span>
            </div>

            {onToggleSound && (
              <button
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  onToggleSound();
                }}
                className={`px-2 py-0.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1 text-[11px] font-bold transition-all active:translate-x-0.5 active:translate-y-0.5 ${
                  soundEnabled ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-[#F28B82] text-[#2D2319]'
                }`}
                title={soundEnabled ? 'Sound FX Enabled (Click to mute)' : 'Sound FX Muted (Click to enable)'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 shrink-0" /> : <VolumeX className="w-3.5 h-3.5 shrink-0" />}
                <span className="hidden sm:inline">{soundEnabled ? 'FX: ON' : 'FX: OFF'}</span>
              </button>
            )}

            <div className="flex items-center space-x-1">
              <button 
                type="button" 
                className="w-5 h-5 bg-[#FDF8EE] hover:bg-white border-2 border-[#2D2319] rounded flex items-center justify-center text-[10px] font-mono font-black shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#2D2319]"
                title="Minimize"
              >
                _
              </button>
              <button 
                type="button" 
                className="w-5 h-5 bg-[#FDF8EE] hover:bg-white border-2 border-[#2D2319] rounded flex items-center justify-center text-[9px] font-mono font-black shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#2D2319]"
                title="Maximize"
              >
                □
              </button>
              <button 
                type="button" 
                onClick={() => sound.playKeyClick()}
                className="w-5 h-5 bg-[#F28B82] hover:bg-[#f0746a] border-2 border-[#2D2319] rounded flex items-center justify-center text-[10px] font-mono font-black shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#2D2319]"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div ref={menuBarRef} className="relative bg-[#FAF3E0] px-3 sm:px-4 py-1.5 border-b-2 border-[#2D2319] flex items-center space-x-4 sm:space-x-6 text-xs font-mono font-bold text-[#2D2319]">
          <div className="relative">
            <button 
              type="button" 
              onClick={() => setOpenMenu(openMenu === 'game' ? null : 'game')}
              className={`hover:underline cursor-pointer flex items-center space-x-1 ${openMenu === 'game' ? 'text-sky-700 underline font-black' : ''}`}
            >
              <span>Game</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {openMenu === 'game' && (
              <div className="absolute left-0 top-full mt-1.5 w-52 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={handleQuickPlay}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <Play className="w-3.5 h-3.5 text-[#F6C445]" />
                  <span>Quick Play Drill</span>
                </button>
                <button
                  type="button"
                  onClick={handleDailyChallenge}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#48B89F]" />
                  <span>Daily Challenge</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('map')}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <Compass className="w-3.5 h-3.5 text-[#4BA3E3]" />
                  <span>Lessons Journey Map</span>
                </button>
                <div className="my-1 border-t border-[#2D2319]/20" />
                <button
                  type="button"
                  onClick={() => handleNav('badges')}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <Trophy className="w-3.5 h-3.5 text-[#F6C445]" />
                  <span>Trophy Cabinet</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              type="button" 
              onClick={() => setOpenMenu(openMenu === 'tracks' ? null : 'tracks')}
              className={`hover:underline cursor-pointer flex items-center space-x-1 ${openMenu === 'tracks' ? 'text-sky-700 underline font-black' : ''}`}
            >
              <span>Tracks</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {openMenu === 'tracks' && (
              <div className="absolute left-0 top-full mt-1.5 w-72 max-h-96 overflow-y-auto bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[10px] font-black uppercase text-[#2D2319]/60 font-mono tracking-wider border-b border-[#2D2319]/10">
                  Switch Active Track ({COURSES_CATALOG.length})
                </div>
                {COURSES_CATALOG.map(c => {
                  const isActive = c.id === activeCourseId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleCoursePick(c.id)}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#FAF3E0] transition-all ${
                        isActive ? 'bg-[#C7E8CA] font-black text-[#2D2319]' : 'text-[#2D2319] font-medium'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="font-bold truncate">{c.title}</div>
                        <div className="text-[10px] text-[#2D2319]/60 font-mono">{c.lessonsCount} lessons • {c.category}</div>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-[#2D2319] shrink-0" />}
                    </button>
                  );
                })}
                <div className="my-1 border-t border-[#2D2319]/20" />
                <button
                  type="button"
                  onClick={() => handleNav('catalog')}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold text-[#4BA3E3] hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Browse Full Catalog Directory...</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              type="button" 
              onClick={() => setOpenMenu(openMenu === 'stats' ? null : 'stats')}
              className={`hover:underline cursor-pointer flex items-center space-x-1 ${openMenu === 'stats' ? 'text-sky-700 underline font-black' : ''}`}
            >
              <span>Stats</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {openMenu === 'stats' && (
              <div className="absolute left-0 top-full mt-1.5 w-56 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => handleNav('stats')}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <BarChart2 className="w-3.5 h-3.5 text-[#4BA3E3]" />
                  <span>Performance Diagnostics</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('stats')}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <Keyboard className="w-3.5 h-3.5 text-[#48B89F]" />
                  <span>Keyboard Heatmap</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('badges')}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <Award className="w-3.5 h-3.5 text-[#F6C445]" />
                  <span>Achievement Badges (24)</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              type="button" 
              onClick={() => setOpenMenu(openMenu === 'settings' ? null : 'settings')}
              className={`hover:underline cursor-pointer flex items-center space-x-1 ${openMenu === 'settings' ? 'text-sky-700 underline font-black' : ''}`}
            >
              <span>Settings</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {openMenu === 'settings' && (
              <div className="absolute left-0 top-full mt-1.5 w-64 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                {onToggleSound && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playKeyClick();
                      onToggleSound();
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-2">
                      <Volume2 className="w-3.5 h-3.5 text-[#2D2319]" />
                      <span>Audio FX</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${soundEnabled ? 'bg-[#C7E8CA]' : 'bg-[#F28B82]'}`}>
                      {soundEnabled ? 'ON' : 'MUTED'}
                    </span>
                  </button>
                )}
                {onToggleKeyboard && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playKeyClick();
                      onToggleKeyboard();
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-2">
                      <Keyboard className="w-3.5 h-3.5 text-[#2D2319]" />
                      <span>Virtual Keypad</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${keyboardEnabled ? 'bg-[#C7E8CA]' : 'bg-[#FAF3E0] border border-[#2D2319]'}`}>
                      {keyboardEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>
                )}
                {onToggleHands && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playKeyClick();
                      onToggleHands();
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-2">
                      <Hand className="w-3.5 h-3.5 text-[#2D2319]" />
                      <span>Hands Position Guide</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${handsEnabled ? 'bg-[#C7E8CA]' : 'bg-[#FAF3E0] border border-[#2D2319]'}`}>
                      {handsEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>
                )}
                <div className="my-1 border-t border-[#2D2319]/20" />
                <button
                  type="button"
                  onClick={() => handleNav('shop')}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#F6C445]" />
                  <span>Theme & Color Palette</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              type="button" 
              onClick={() => setOpenMenu(openMenu === 'help' ? null : 'help')}
              className={`hover:underline cursor-pointer flex items-center space-x-1 ${openMenu === 'help' ? 'text-sky-700 underline font-black' : ''}`}
            >
              <span>Help</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {openMenu === 'help' && (
              <div className="absolute left-0 top-full mt-1.5 w-60 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    setHelpModalOpen(true);
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#4BA3E3]" />
                  <span>Keyboard Shortcuts</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    setHelpModalOpen(true);
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#FAF3E0] flex items-center space-x-2"
                >
                  <Hand className="w-3.5 h-3.5 text-[#48B89F]" />
                  <span>Touch Typing Posture</span>
                </button>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-1.5 ml-auto text-[11px] bg-[#FDF8EE] px-2.5 py-0.5 rounded-md border border-[#2D2319]/40">
            <span className="text-[#2D2319]/60">Track:</span>
            <span className="font-bold truncate max-w-[180px]">{activeCourse.title}</span>
          </div>

        </div>

        <div className="flex flex-col md:flex-row flex-1">
          
          <aside className="w-full md:w-56 bg-[#F5EFE0] border-b-2 md:border-b-0 md:border-r-2 border-[#2D2319] p-3 sm:p-4 flex flex-col justify-between space-y-4 shrink-0">
            
            <nav className="space-y-2">
              <button
                type="button"
                onClick={() => handleNav('home')}
                className="w-full px-3 py-2 rounded-xl bg-[#C7E8CA] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-3 text-xs sm:text-sm font-black text-[#2D2319] font-display text-left transition-all"
              >
                <Home className="w-4 h-4 text-[#2D2319] shrink-0" />
                <span>Home</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('practice')}
                className="w-full px-3 py-2 rounded-xl bg-[#FDF8EE] hover:bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-3 text-xs sm:text-sm font-bold text-[#2D2319] font-display text-left active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <Target className="w-4 h-4 text-[#2D2319] shrink-0" />
                <span>Practice</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('challenge')}
                className="w-full px-3 py-2 rounded-xl bg-[#FDF8EE] hover:bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-3 text-xs sm:text-sm font-bold text-[#2D2319] font-display text-left active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <Trophy className="w-4 h-4 text-[#2D2319] shrink-0" />
                <span>Challenge</span>
              </button>

              <button
                type="button"
                onClick={handleDailyChallenge}
                className="w-full px-3 py-2 rounded-xl bg-[#FDF8EE] hover:bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-3 text-xs sm:text-sm font-bold text-[#2D2319] font-display text-left active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <Calendar className="w-4 h-4 text-[#2D2319] shrink-0" />
                <span>Daily</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('stats')}
                className="w-full px-3 py-2 rounded-xl bg-[#FDF8EE] hover:bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-3 text-xs sm:text-sm font-bold text-[#2D2319] font-display text-left active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <BarChart2 className="w-4 h-4 text-[#2D2319] shrink-0" />
                <span>Stats</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('badges')}
                className="w-full px-3 py-2 rounded-xl bg-[#FDF8EE] hover:bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-3 text-xs sm:text-sm font-bold text-[#2D2319] font-display text-left active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <Award className="w-4 h-4 text-[#2D2319] shrink-0" />
                <span>Trophies</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('shop')}
                className="w-full px-3 py-2 rounded-xl bg-[#FDF8EE] hover:bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-3 text-xs sm:text-sm font-bold text-[#2D2319] font-display text-left active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#2D2319] shrink-0" />
                <span>Shop</span>
              </button>
            </nav>

            <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#F28B82] border-2 border-[#2D2319] flex items-center justify-center text-[#2D2319] shrink-0 shadow-[1px_1px_0px_#2D2319]">
                  <User className="w-5 h-5 text-[#2D2319]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-[#2D2319] font-display truncate">Player</div>
                  <div className="text-[10px] font-mono font-bold text-[#2D2319]/70">Level 1</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono font-bold text-[#2D2319]">
                  <span>XP Progress</span>
                  <span>120 / 500 XP</span>
                </div>
                <div className="w-full h-2.5 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-full overflow-hidden p-0.5 flex">
                  <div 
                    className="h-full bg-[#48B89F] rounded-full transition-all duration-300"
                    style={{ width: '24%' }}
                  />
                </div>
              </div>
            </div>

          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-[#FDF8EE] p-4 sm:p-6 space-y-5 overflow-y-auto">
            
            {/* Hero Header */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2.5">
                {/* Speed Lines Leading into Title */}
                <span className="text-[#2D2319] font-mono font-bold text-sm tracking-tighter select-none">══</span>
                
                {/* Keycap [ A ] Icon */}
                <div className="w-8 h-8 rounded-lg bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-mono font-black text-sm text-[#2D2319] shrink-0">
                  A
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-[#2D2319] font-display uppercase tracking-tight">
                  Keyword Typer
                </h1>

                <span className="text-[#2D2319] font-mono font-bold text-sm tracking-tighter select-none">════</span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-[#2D2319]/80 pl-1">
                Type keywords. Beat the clock. Improve every day.
              </p>
            </div>

            {/* Quick Play Window Card */}
            <div className="bg-[#FBF6EA] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] space-y-4">
              
              {/* Card Title */}
              <div className="flex items-center space-x-2 border-b-2 border-[#2D2319]/20 pb-2">
                <span className="text-base">⚡</span>
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
                        { id: 'easy', label: 'Easy' },
                        { id: 'medium', label: 'Medium' },
                        { id: 'hard', label: 'Hard' }
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
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-black font-display border-2 border-[#2D2319] transition-all ${
                              isActive
                                ? 'bg-[#F6C445] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] translate-x-0'
                                : 'bg-[#FDF8EE] hover:bg-white text-[#2D2319] shadow-[1px_1px_0px_#2D2319]'
                            }`}
                          >
                            {diff.label}
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
                      onClick={handleQuickPlay}
                      className="px-6 py-3 rounded-xl bg-[#F6C445] hover:bg-[#ffd95e] text-[#2D2319] font-black font-display text-sm uppercase tracking-wide border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] active:translate-x-1 active:translate-y-1 transition-all flex items-center space-x-2 cursor-pointer"
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
                      <span className="font-black text-[#2D2319]">{totalScore.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF3E0] border border-[#2D2319]/30">
                      <span className="text-[#2D2319]/70 font-bold">Best WPM:</span>
                      <span className="font-black text-[#2D2319]">{bestWpm} WPM</span>
                    </div>

                    <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF3E0] border border-[#2D2319]/30">
                      <span className="text-[#2D2319]/70 font-bold">Games Played:</span>
                      <span className="font-black text-[#2D2319]">{totalAttempts}</span>
                    </div>

                    <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF3E0] border border-[#2D2319]/30">
                      <span className="text-[#2D2319]/70 font-bold">Current Streak:</span>
                      <span className="font-black text-amber-700 flex items-center space-x-1">
                        <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600 inline" />
                        <span>{streakDays} Days</span>
                      </span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Daily Challenge Window Card */}
            <div className="bg-[#FBF6EA] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] space-y-3">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                <div className="flex items-start space-x-3">
                  {/* Calendar Icon */}
                  <div className="w-10 h-10 rounded-xl bg-[#C7E8CA] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-[#2D2319] shrink-0">
                    <Calendar className="w-5 h-5 text-[#2D2319]" />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#2D2319] font-display flex items-center space-x-2">
                      <span>Daily Challenge</span>
                      <span className="px-2 py-0.2 rounded bg-[#F6C445] text-[10px] font-mono font-bold border border-[#2D2319]">
                        LIVE
                      </span>
                    </h3>
                    <p className="text-xs font-medium text-[#2D2319]/80 mt-0.5">
                      Type 25 unique keywords in 90 seconds
                    </p>
                  </div>
                </div>

                {/* Chunky Play Now Button */}
                <button
                  type="button"
                  onClick={handleDailyChallenge}
                  className="px-5 py-2.5 rounded-xl bg-[#48B89F] hover:bg-[#52c9af] text-[#2D2319] font-black font-display text-xs sm:text-sm uppercase tracking-wide border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all self-start sm:self-auto cursor-pointer"
                >
                  Play Now
                </button>

              </div>

              {/* Progress Bar: 12 / 25 */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-mono font-bold text-[#2D2319]">
                  <span>Daily Goal Progress</span>
                  <span>12 / 25 Keywords</span>
                </div>

                <div className="w-full h-3 bg-[#FAF3E0] rounded-md border-2 border-[#2D2319] overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-[#48B89F] border-r border-[#2D2319] rounded-xs transition-all duration-300"
                    style={{ width: '48%' }}
                  />
                </div>
              </div>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}


