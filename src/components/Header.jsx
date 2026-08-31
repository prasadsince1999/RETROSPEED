import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Keyboard, 
  Settings, 
  Award, 
  Home, 
  BookOpen, 
  ChevronDown, 
  Check, 
  Map, 
  BarChart2, 
  Trophy, 
  Menu, 
  X, 
  Star,
  Sparkles,
  Sliders,
  Target
} from 'lucide-react';
import { COURSES_CATALOG } from '../data/courseCatalog';
import { sound } from '../utils/audio';

const NAV_LINKS = [
  { id: 'home', label: 'Home', icon: Home, shortcut: 'H' },
  { id: 'practice', label: 'Practice', icon: Target, shortcut: 'P' },
  { id: 'challenge', label: 'Challenge', icon: Trophy, shortcut: 'C' },
  { id: 'map', label: 'Map', icon: Map, shortcut: 'M' },
  { id: 'stats', label: 'Stats', icon: BarChart2, shortcut: 'S' },
  { id: 'badges', label: 'Badges', icon: Award, shortcut: 'B' },
];

export default function Header({ 
  currentView, 
  onNavigate, 
  activeCourseId = 'keycraft-odyssey',
  onSelectCourse,
  userProgress = {}, 
  onToggleSound, 
  onToggleKeyboard, 
  onToggleHands,
  soundEnabled = true, 
  keyboardEnabled = true, 
  handsEnabled = true,
  selectedTheme = 'bone',
  onSelectTheme 
}) {
  const [showCourseSwitcher, setShowCourseSwitcher] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const activeCourse = COURSES_CATALOG.find(c => c.id === activeCourseId) || COURSES_CATALOG[0];
  const enrolledIds = userProgress.enrolledCourses || ['keycraft-odyssey', 'syntax-forge', 'global-lexicon', 'curiosity-vault'];
  const enrolledCourses = COURSES_CATALOG.filter(c => enrolledIds.includes(c.id));

  // Current course metrics
  const currentCourseProgress = userProgress.courses?.[activeCourseId] || { totalStars: 0, totalPoints: 0 };

  const closeAllMenus = () => {
    setShowCourseSwitcher(false);
    setShowSettingsMenu(false);
    setShowMobileMenu(false);
  };

  // Close menus on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNav = (view) => {
    sound.playKeyClick();
    closeAllMenus();
    onNavigate(view);
  };

  return (
    <header className="bg-[#2c3e50] text-slate-100 select-none sticky top-0 z-50 border-b-2 border-slate-900 shadow-[0_4px_0_#1e293b] font-sans">
      
      {/* Top System Title Strip (Classic Retro OS Style) */}
      <div className="bg-[#1e293b] px-4 py-1 text-[11px] font-mono text-slate-300 border-b border-slate-700/80 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-amber-400 font-bold">✦</span>
          <span className="font-bold tracking-wider text-slate-200">KeyCraft Desktop OS v2.0</span>
          <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-slate-800 text-sky-400 text-[10px] border border-slate-700">
            SYSTEM READY
          </span>
        </div>

        {/* Retro Window Chrome Controls: _ □ ✕ */}
        <div className="flex items-center space-x-1">
          <button 
            type="button"
            className="w-4 h-4 bg-slate-700 hover:bg-slate-600 border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono font-bold leading-none text-slate-300 shadow-[1px_1px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
            title="Minimize Window"
            aria-label="Minimize"
          >
            _
          </button>
          <button 
            type="button"
            className="w-4 h-4 bg-slate-700 hover:bg-slate-600 border border-slate-900 rounded-xs flex items-center justify-center text-[8px] font-mono font-bold leading-none text-slate-300 shadow-[1px_1px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
            title="Maximize Window"
            aria-label="Maximize"
          >
            □
          </button>
          <button 
            type="button" 
            onClick={() => handleNav('home')}
            className="w-4 h-4 bg-[#f87171] hover:bg-rose-500 border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono font-bold leading-none text-slate-900 shadow-[1px_1px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
            title="Return to Home"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Navigation Toolbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-13 flex items-center justify-between">
        
        {/* Left: Brand Logo, Active Course Switcher & Navigation Links */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
              setShowCourseSwitcher(false);
              setShowSettingsMenu(false);
            }}
            aria-label="Toggle navigation menu"
            className="md:hidden p-1.5 rounded-lg bg-slate-800 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] text-slate-200 hover:text-white hover:bg-slate-700 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Retro Logo Stamp */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center space-x-1.5 cursor-pointer group px-2.5 py-1 rounded-lg bg-[#1888ff] border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:bg-[#38bdf8] active:translate-x-0.5 active:translate-y-0.5 transition-all text-white"
            title="Go to Home"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNav('home')}
          >
            <span className="font-mono text-xs font-black text-amber-300">⌨</span>
            <span className="font-display font-black text-sm sm:text-base tracking-tight text-white uppercase">
              Key<span className="text-amber-300">Craft</span>
            </span>
          </div>

          {/* Active Course Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCourseSwitcher(!showCourseSwitcher);
                setShowSettingsMenu(false);
                setShowMobileMenu(false);
              }}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#f8fafc] text-slate-900 hover:bg-amber-50 active:translate-x-0.5 active:translate-y-0.5 text-xs font-extrabold border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] transition-all max-w-[130px] sm:max-w-[190px] md:max-w-[230px] focus:outline-none"
              title="Switch Active Course"
              aria-label="Switch Active Course"
              aria-expanded={showCourseSwitcher}
            >
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate text-left">{activeCourse.title.replace('Typing | ', '')}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            </button>

            {/* Course Switcher Dropdown Window */}
            {showCourseSwitcher && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeAllMenus} />
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-[4px_4px_0_#0f172a] text-slate-900 border-2 border-slate-900 z-50 overflow-hidden origin-top-left animate-in fade-in zoom-in-95">
                  
                  {/* Dropdown Window Header */}
                  <div className="bg-[#2c3e50] text-white px-3.5 py-2 text-xs font-mono font-bold flex items-center justify-between border-b-2 border-slate-900">
                    <span className="flex items-center space-x-1.5">
                      <span className="text-amber-400">✦</span>
                      <span>ENROLLED CURRICULA</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-sky-500 text-white font-bold text-[10px]">
                      {enrolledCourses.length} ACTIVE
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
                    {enrolledCourses.map(course => {
                      const isActive = activeCourseId === course.id;
                      const courseStats = userProgress.courses?.[course.id] || { totalStars: 0, totalPoints: 0 };
                      return (
                        <button
                          key={course.id}
                          onClick={() => {
                            onSelectCourse(course.id);
                            closeAllMenus();
                            onNavigate('map');
                          }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between border transition-all ${
                            isActive 
                              ? 'bg-sky-100 text-sky-950 font-bold border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]' 
                              : 'text-slate-800 hover:bg-slate-100 border-transparent hover:border-slate-300'
                          }`}
                        >
                          <div className="pr-2 min-w-0">
                            <div className="font-bold text-slate-900 truncate">
                              {course.title.replace('Typing | ', '')}
                            </div>
                            <div className="text-[11px] text-slate-600 font-medium mt-0.5 flex items-center space-x-2">
                              <span>{course.lessonsCount} lessons</span>
                              <span>•</span>
                              <span className="flex items-center text-amber-600 font-bold">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-500 inline mr-0.5" />
                                {courseStats.totalStars || 0}
                              </span>
                            </div>
                          </div>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded bg-[#48bb78] text-slate-950 font-mono text-[10px] font-bold border border-slate-900 shrink-0">
                              ACTIVE
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2 border-t-2 border-slate-900 bg-slate-50">
                    <button
                      onClick={() => {
                        closeAllMenus();
                        onNavigate('catalog');
                      }}
                      className="w-full py-2 text-center text-xs font-black text-slate-900 bg-[#fef08a] hover:bg-yellow-300 border-2 border-slate-900 rounded-lg shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center space-x-1.5 uppercase font-display"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>+ Explore All 13 Tracks</span>
                    </button>
                  </div>

                </div>
              </>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {NAV_LINKS.map(link => {
              const Icon = link.icon;
              const isActive = currentView === link.id || 
                (link.id === 'home' && currentView === 'portal') || 
                (link.id === 'practice' && currentView === 'catalog') || 
                (link.id === 'challenge' && currentView === 'daily');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center space-x-1.5 border-2 transition-all font-display ${
                    isActive
                      ? 'bg-[#fef08a] text-slate-950 border-slate-900 shadow-[2px_2px_0_#0f172a] translate-x-0'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

        </div>

        {/* Right: Sound, Keyboard, Settings Dropdown & Score Badge */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          
          {/* Audio Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playKeyClick();
            }}
            title={soundEnabled ? "Audio FX: ON (Click to Mute)" : "Audio FX: OFF (Click to Enable)"}
            aria-label="Toggle Audio Sound Effects"
            className={`p-1.5 sm:px-2 sm:py-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all font-mono text-xs font-bold flex items-center space-x-1 ${
              soundEnabled ? 'bg-[#48bb78] text-slate-950 hover:bg-emerald-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden lg:inline">{soundEnabled ? 'FX' : 'MUTED'}</span>
          </button>

          {/* Virtual Keyboard Toggle */}
          <button
            onClick={onToggleKeyboard}
            title={keyboardEnabled ? "Virtual Keyboard: ON" : "Virtual Keyboard: OFF"}
            aria-label="Toggle Onscreen Virtual Keyboard"
            className={`p-1.5 sm:px-2 sm:py-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all font-mono text-xs font-bold flex items-center space-x-1 ${
              keyboardEnabled ? 'bg-[#38bdf8] text-slate-950 hover:bg-sky-300' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Keyboard className="w-4 h-4" />
            <span className="hidden lg:inline">KEYPAD</span>
          </button>

          {/* Settings & Themes Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSettingsMenu(!showSettingsMenu);
                setShowCourseSwitcher(false);
                setShowMobileMenu(false);
              }}
              title="Settings & Themes"
              aria-label="Visual and Audio Settings"
              aria-expanded={showSettingsMenu}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] text-slate-200 hover:text-white active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Settings className="w-4 h-4" />
            </button>

            {showSettingsMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeAllMenus} />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-[4px_4px_0_#0f172a] text-slate-900 border-2 border-slate-900 z-50 overflow-hidden origin-top-right animate-in fade-in zoom-in-95">
                  
                  <div className="bg-[#2c3e50] text-white px-3.5 py-2 text-xs font-mono font-bold flex items-center justify-between border-b-2 border-slate-900">
                    <span className="flex items-center space-x-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      <span>CONTROL PANEL</span>
                    </span>
                    <span className="text-[10px] text-slate-300">v2.0</span>
                  </div>

                  <div className="p-2 space-y-1">
                    <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-xs font-bold text-slate-800">
                      <span>Show Hand Guides</span>
                      <input
                        type="checkbox"
                        checked={handsEnabled}
                        onChange={onToggleHands}
                        className="w-4 h-4 accent-[#1888ff] border-2 border-slate-900 rounded cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-xs font-bold text-slate-800">
                      <span>Audio Sound FX</span>
                      <input
                        type="checkbox"
                        checked={soundEnabled}
                        onChange={onToggleSound}
                        className="w-4 h-4 accent-[#1888ff] border-2 border-slate-900 rounded cursor-pointer"
                      />
                    </label>
                  </div>

                  <div className="px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border-t-2 border-b-2 border-slate-900">
                    KEYBOARD PALETTE
                  </div>

                  <div className="p-2 space-y-1">
                    {[
                      { id: 'bone', label: 'Retro Cream (Bone)' },
                      { id: 'jungle', label: 'Jungle Moss (Green)' },
                      { id: 'cyber', label: 'Cyber Dark (Neon)' }
                    ].map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          onSelectTheme(theme.id);
                          closeAllMenus();
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between border transition-all ${
                          selectedTheme === theme.id 
                            ? 'bg-sky-100 text-sky-900 border-2 border-slate-900 font-extrabold' 
                            : 'text-slate-700 hover:bg-slate-100 border-transparent'
                        }`}
                      >
                        <span>{theme.label}</span>
                        {selectedTheme === theme.id && <Check className="w-3.5 h-3.5 text-sky-600 font-bold" />}
                      </button>
                    ))}
                  </div>

                </div>
              </>
            )}
          </div>

          {/* User Score Badge for Active Course */}
          <div className="hidden sm:flex items-center space-x-2 bg-[#f8fafc] text-slate-900 px-3 py-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] font-mono">
            <span className="text-amber-600 text-xs font-black flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
              <span>{currentCourseProgress.totalStars}</span>
            </span>
            <span className="text-slate-400 text-xs font-bold">|</span>
            <span className="text-slate-900 text-xs font-black tracking-tight">
              {currentCourseProgress.totalPoints.toLocaleString()} <span className="text-[10px] text-slate-600 font-bold">pts</span>
            </span>
          </div>

        </div>

      </div>

      {/* Mobile Navigation Dropdown Menu (Retro OS Window Style) */}
      {showMobileMenu && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeAllMenus} />
          <div className="absolute top-20 left-3 right-3 bg-white border-2 border-slate-900 rounded-xl shadow-[6px_6px_0_#0f172a] p-3 z-50 md:hidden animate-in slide-in-from-top-2 duration-150 text-slate-900">
            
            <div className="bg-[#2c3e50] text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center justify-between mb-3 border-2 border-slate-900">
              <span>✦ NAVIGATE DESKTOP</span>
              <button 
                onClick={closeAllMenus} 
                className="w-4 h-4 bg-[#f87171] text-slate-900 rounded-xs flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {NAV_LINKS.map(link => {
                const Icon = link.icon;
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className={`p-2.5 rounded-lg text-xs font-black flex items-center space-x-2 border-2 transition-all font-display ${
                      isActive
                        ? 'bg-[#fef08a] text-slate-950 border-slate-900 shadow-[2px_2px_0_#0f172a]'
                        : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Mobile Score & Active Course Bar */}
            <div className="p-2 bg-slate-100 rounded-lg border-2 border-slate-900 flex items-center justify-between text-xs font-mono font-bold">
              <span className="truncate pr-2">{activeCourse.title.replace('Typing | ', '')}</span>
              <span className="text-amber-600 font-black shrink-0 flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{currentCourseProgress.totalStars || 0}★</span>
              </span>
            </div>
          </div>
        </>
      )}

    </header>
  );
}


