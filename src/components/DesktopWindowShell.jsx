import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Target, 
  Trophy, 
  Calendar, 
  BarChart2, 
  Award, 
  ShoppingBag, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ChevronDown, 
  HelpCircle, 
  Settings, 
  Flame, 
  Maximize2, 
  Minimize2, 
  User, 
  Shield, 
  BookOpen, 
  RotateCcw,
  Check
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getPlayerProfile } from '../utils/storage';
import { COURSES_CATALOG } from '../data/courseCatalog';
import PlayerProfileModal from './PlayerProfileModal';

export default function DesktopWindowShell({
  children,
  currentView = 'home',
  userProgress = {},
  activeCourseId = 'keycraft-odyssey',
  soundEnabled = true,
  onNavigate,
  onSelectCourse,
  onToggleSound,
  onProfileUpdated,
  title = 'Keyword Typer'
}) {
  const [windowState, setWindowState] = useState('normal'); // 'normal' | 'maximized' | 'minimized'
  const [activeMenuDropdown, setActiveMenuDropdown] = useState(null); // 'game' | 'tracks' | 'stats' | 'settings' | 'help' | null
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const profile = getPlayerProfile(userProgress);
  const activeCourse = COURSES_CATALOG.find(c => c.id === activeCourseId) || COURSES_CATALOG[0];

  const handleNav = (view) => {
    sound.playKeyClick();
    setActiveMenuDropdown(null);
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const handleSelectCourse = (courseId) => {
    sound.playKeyClick();
    setActiveMenuDropdown(null);
    if (onSelectCourse) {
      onSelectCourse(courseId);
    }
  };

  const toggleSound = () => {
    sound.playKeyClick();
    if (onToggleSound) {
      onToggleSound();
    }
  };

  // Nav Items config matching user reference image + integrated features
  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: Home, highlight: 'bg-[#C7E8CA]' },
    { id: 'practice', label: 'Practice', icon: Target, highlight: 'bg-[#C7E8CA]' },
    { id: 'challenge', label: 'Challenge', icon: Trophy, highlight: 'bg-[#C7E8CA]' },
    { id: 'daily', label: 'Daily', icon: Calendar, highlight: 'bg-[#C7E8CA]' },
    { id: 'stats', label: 'Stats', icon: BarChart2, highlight: 'bg-[#C7E8CA]' },
    { id: 'badges', label: 'Trophies', icon: Award, highlight: 'bg-[#C7E8CA]' },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, highlight: 'bg-[#C7E8CA]' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-1rem)] bg-[#B9D2E8] p-2 sm:p-4 md:p-6 flex items-center justify-center font-sans select-none overflow-hidden">
      
      {/* Decorative Dark Brown 4-Point Sparkle Stars (✦) in canvas corners */}
      <span className="absolute top-4 left-6 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>
      <span className="absolute top-12 left-1/4 text-lg text-[#2D2319] font-black opacity-40 pointer-events-none select-none">✦</span>
      <span className="absolute top-6 right-8 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>
      <span className="absolute bottom-6 left-8 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>
      <span className="absolute bottom-8 right-6 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>

      {/* When Minimized: Floating Taskbar Dock */}
      {windowState === 'minimized' ? (
        <div className="z-50 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[6px_6px_0px_#2D2319] flex items-center space-x-4 animate-in zoom-in-95">
          <div className="w-8 h-8 rounded-lg bg-[#C3A6E8] border-2 border-[#2D2319] flex items-center justify-center font-bold text-[#2D2319]">
            ✦
          </div>
          <div>
            <div className="font-display font-black text-sm text-[#2D2319]">{title} [Minimized]</div>
            <div className="text-[11px] font-mono text-[#2D2319]/70">Click restore to expand desktop window</div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setWindowState('normal');
            }}
            className="px-4 py-2 bg-[#F6C445] hover:bg-[#ffd95e] border-2 border-[#2D2319] rounded-xl font-display font-black text-xs uppercase shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5"
          >
            Restore Window
          </button>
        </div>
      ) : (
        /* Main Retro OS Window Frame */
        <div 
          className={`border-2 border-[#2D2319] bg-[#FDF8EE] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden flex flex-col z-10 transition-all duration-200 ${
            windowState === 'maximized'
              ? 'w-full h-[98vh] max-w-none'
              : 'w-full max-w-6xl h-[90vh]'
          }`}
        >
          
          {/* ========================================================
              TITLEBAR: Solid Lilac (#C3A6E8)
              ======================================================== */}
          <div className="bg-[#C3A6E8] text-[#2D2319] px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between font-mono font-bold text-sm shrink-0">
            
            {/* Left: Window Title with Sparkle */}
            <div className="flex items-center space-x-2">
              <span className="text-[#2D2319] text-base leading-none">✦</span>
              <span className="tracking-wide text-xs sm:text-sm font-black uppercase font-display">
                {title}
              </span>
            </div>

            {/* Right: Window Controls (_ □ ✕) */}
            <div className="flex items-center space-x-1.5">
              
              {/* Minimize Button */}
              <button 
                type="button" 
                onClick={() => {
                  sound.playKeyClick();
                  setWindowState('minimized');
                }}
                className="w-5 h-5 bg-[#FDF8EE] hover:bg-white border-2 border-[#2D2319] rounded flex items-center justify-center text-[10px] font-mono font-black shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#2D2319]"
                title="Minimize to Dock"
              >
                _
              </button>

              {/* Maximize / Restore Button */}
              <button 
                type="button" 
                onClick={() => {
                  sound.playKeyClick();
                  setWindowState(prev => prev === 'maximized' ? 'normal' : 'maximized');
                }}
                className="w-5 h-5 bg-[#FDF8EE] hover:bg-white border-2 border-[#2D2319] rounded flex items-center justify-center text-[9px] font-mono font-black shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#2D2319]"
                title={windowState === 'maximized' ? 'Restore Window' : 'Maximize Window'}
              >
                {windowState === 'maximized' ? '❐' : '□'}
              </button>

              {/* Close Button */}
              <button 
                type="button" 
                onClick={() => {
                  sound.playKeyClick();
                  handleNav('home');
                }}
                className="w-5 h-5 bg-[#F28B82] hover:bg-[#f0746a] border-2 border-[#2D2319] rounded flex items-center justify-center text-[10px] font-mono font-black shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#2D2319]"
                title="Close to Home"
              >
                ✕
              </button>

            </div>

          </div>

          {/* ========================================================
              TOP MENU BAR (Game, Tracks, Stats, Settings, Help + Score & Audio)
              ======================================================== */}
          <div className="bg-[#FAF3E0] px-4 py-1.5 border-b-2 border-[#2D2319] flex flex-wrap items-center justify-between gap-3 text-xs font-mono font-bold text-[#2D2319] shrink-0 relative">
            
            {/* Left: Dropdown Menus */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              
              {/* Game ▾ Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenuDropdown(activeMenuDropdown === 'game' ? null : 'game')}
                  className="hover:underline flex items-center space-x-1 focus:outline-none"
                >
                  <span>Game</span>
                  <span className="text-[10px]">▾</span>
                </button>

                {activeMenuDropdown === 'game' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenuDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 w-48 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] z-50 overflow-hidden py-1 text-xs">
                      <button
                        type="button"
                        onClick={() => handleNav('home')}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] flex items-center justify-between font-bold"
                      >
                        <span>New Quick Drill</span>
                        <span className="text-[10px] font-mono text-[#2D2319]/60">⚡</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('daily')}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] flex items-center justify-between font-bold"
                      >
                        <span>Daily Sprint</span>
                        <span className="text-[10px] font-mono text-[#2D2319]/60">📅</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('practice')}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] flex items-center justify-between font-bold"
                      >
                        <span>Practice Hub</span>
                        <span className="text-[10px] font-mono text-[#2D2319]/60">🎯</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('challenge')}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] flex items-center justify-between font-bold"
                      >
                        <span>Challenge Hub</span>
                        <span className="text-[10px] font-mono text-[#2D2319]/60">🏆</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Tracks ▾ Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenuDropdown(activeMenuDropdown === 'tracks' ? null : 'tracks')}
                  className="hover:underline flex items-center space-x-1 focus:outline-none"
                >
                  <span>Tracks</span>
                  <span className="text-[10px]">▾</span>
                </button>

                {activeMenuDropdown === 'tracks' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenuDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 w-64 max-h-72 overflow-y-auto bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] z-50 py-1 text-xs">
                      <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#2D2319]/60 border-b border-[#2D2319]/20">
                        Select Active Track
                      </div>
                      {COURSES_CATALOG.map(c => {
                        const isCurrent = c.id === activeCourseId;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => handleSelectCourse(c.id)}
                            className={`w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] flex items-center justify-between font-medium ${
                              isCurrent ? 'bg-[#FAF3E0] font-black' : ''
                            }`}
                          >
                            <span className="truncate">{c.title}</span>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-[#48B89F] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Stats ▾ Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenuDropdown(activeMenuDropdown === 'stats' ? null : 'stats')}
                  className="hover:underline flex items-center space-x-1 focus:outline-none"
                >
                  <span>Stats</span>
                  <span className="text-[10px]">▾</span>
                </button>

                {activeMenuDropdown === 'stats' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenuDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 w-52 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] z-50 overflow-hidden py-1 text-xs">
                      <button
                        type="button"
                        onClick={() => handleNav('stats')}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] flex items-center justify-between font-bold"
                      >
                        <span>Diagnostics Viewer</span>
                        <BarChart2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('badges')}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] flex items-center justify-between font-bold"
                      >
                        <span>Trophy Cabinet</span>
                        <Award className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuDropdown(null);
                          setProfileModalOpen(true);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] flex items-center justify-between font-bold"
                      >
                        <span>Player Profile & XP</span>
                        <User className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Settings ▾ Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenuDropdown(activeMenuDropdown === 'settings' ? null : 'settings')}
                  className="hover:underline flex items-center space-x-1 focus:outline-none"
                >
                  <span>Settings</span>
                  <span className="text-[10px]">▾</span>
                </button>

                {activeMenuDropdown === 'settings' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenuDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 w-52 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] z-50 overflow-hidden py-1 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          toggleSound();
                          setActiveMenuDropdown(null);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] flex items-center justify-between font-bold"
                      >
                        <span>Sound FX Audio</span>
                        <span>{soundEnabled ? 'ON [✓]' : 'OFF'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('shop')}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] flex items-center justify-between font-bold"
                      >
                        <span>Themes & Keycaps</span>
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Help ▾ Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenuDropdown(activeMenuDropdown === 'help' ? null : 'help')}
                  className="hover:underline flex items-center space-x-1 focus:outline-none"
                >
                  <span>Help</span>
                  <span className="text-[10px]">▾</span>
                </button>

                {activeMenuDropdown === 'help' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenuDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 w-56 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] z-50 overflow-hidden py-2 text-xs p-3 space-y-2">
                      <div className="font-display font-black text-[#2D2319]">Keyword Typer Desktop</div>
                      <p className="text-[10px] text-[#2D2319]/70 leading-relaxed font-sans">
                        Press Space to submit keywords. Maintain home row finger posture for optimal velocity.
                      </p>
                      <div className="text-[10px] text-[#2D2319]/90 border-t border-[#2D2319]/20 pt-1">
                        Version 2.0 • Retro Neo-Brutalist Edition
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Right: Live Score Pill & Sound Toggle */}
            <div className="flex items-center space-x-2.5">
              
              {/* Score Pill */}
              <div className="bg-[#FDF8EE] px-2.5 py-0.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1.5 text-xs">
                <span className="text-[#F6C445] font-black">★</span>
                <span className="font-black text-[#2D2319]">{profile.totalXp.toLocaleString()} pts</span>
              </div>

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                className={`px-2 py-0.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-1 text-xs transition-colors cursor-pointer ${
                  soundEnabled ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-[#FAF3E0] text-[#2D2319]/60'
                }`}
                title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline font-bold">{soundEnabled ? 'FX: ON' : 'FX: OFF'}</span>
              </button>

            </div>

          </div>

          {/* ========================================================
              WINDOW BODY (Left Sidebar + Client Content Area)
              ======================================================== */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#FDF8EE]">
            
            {/* Left Sidebar */}
            <div className="w-full md:w-56 bg-[#FAF3E0] border-b-2 md:border-b-0 md:border-r-2 border-[#2D2319] p-3 sm:p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
              
              {/* Navigation Items */}
              <div className="space-y-1.5 flex md:flex-col flex-row overflow-x-auto md:overflow-visible gap-1.5 md:gap-0 pb-2 md:pb-0">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNav(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl border-2 border-[#2D2319] flex items-center space-x-2.5 text-xs font-display font-black tracking-wide transition-all shrink-0 md:shrink cursor-pointer ${
                        isActive
                          ? `${item.highlight} text-[#2D2319] shadow-[3px_3px_0px_#2D2319] -translate-y-0.5`
                          : 'bg-[#FDF8EE] hover:bg-white text-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#2D2319] shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Player Profile Card (Clickable to open Profile Modal) */}
              <div 
                onClick={() => {
                  sound.playKeyClick();
                  setProfileModalOpen(true);
                }}
                className="mt-3 pt-3 border-t-2 border-[#2D2319] bg-[#FDF8EE] p-2.5 rounded-xl border-2 shadow-[2px_2px_0px_#2D2319] space-y-2 cursor-pointer hover:bg-white transition-colors"
                title="Click to customize profile avatar, name, and view stats"
              >
                <div className="flex items-center space-x-2">
                  {/* Player Avatar */}
                  <div 
                    className="w-9 h-9 rounded-xl border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-lg shrink-0"
                    style={{ backgroundColor: profile.avatarBg }}
                  >
                    {profile.avatarIcon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-xs text-[#2D2319] truncate">{profile.displayName}</span>
                      <span className="px-1.5 py-0.2 bg-[#F6C445] border border-[#2D2319] rounded text-[9px] font-mono font-bold text-[#2D2319]">
                        Lv.{profile.level}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#2D2319]/70 truncate">
                      {profile.title}
                    </div>
                  </div>
                </div>

                {/* Level XP Progress Bar */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[9px] font-mono text-[#2D2319]/70 font-bold">
                    <span>{profile.currentLevelXp} / {profile.nextLevelXpRequirement} XP</span>
                    <span>{profile.percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#FAF3E0] rounded-full border border-[#2D2319] overflow-hidden p-0.5 flex">
                    <div
                      className="h-full bg-[#48B89F] rounded-full transition-all duration-300"
                      style={{ width: `${profile.percent}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Client Area */}
            <div className="flex-1 flex flex-col overflow-y-auto bg-[#FDF8EE]">
              {children}
            </div>

          </div>

        </div>
      )}

      {/* Interactive Player Profile Modal */}
      <PlayerProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        userProgress={userProgress}
        onProfileUpdated={onProfileUpdated}
      />

    </div>
  );
}
