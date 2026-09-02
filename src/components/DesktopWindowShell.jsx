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
  Layers,
  RotateCcw,
  Check,
  Palette
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getPlayerProfile } from '../utils/storage';
import { getLicenseStatus } from '../utils/license';
import { COURSES_CATALOG } from '../data/courseCatalog';
import { RETRO_THEMES } from './ShopView';
import PlayerProfileModal from './PlayerProfileModal';
import AboutModal from './AboutModal';
import UnlockModal from './UnlockModal';
import ResetDataModal from './ResetDataModal';

export default function DesktopWindowShell({
  children,
  currentView = 'home',
  userProgress = {},
  activeCourseId = 'keystroke-foundations',
  soundEnabled = true,
  selectedTheme = 'bone',
  onSelectTheme,
  onNavigate,
  onSelectCourse,
  onToggleSound,
  onProfileUpdated,
  onResetAllData,
  title = 'RETROSPEED'
}) {
  const [windowState, setWindowState] = useState('normal'); // 'normal' | 'maximized' | 'minimized'
  const [activeMenuDropdown, setActiveMenuDropdown] = useState(null); // 'theme' | 'settings' | 'help' | null
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const profile = getPlayerProfile(userProgress);
  const license = getLicenseStatus(userProgress);
  const activeCourse = COURSES_CATALOG.find(c => c.id === activeCourseId) || COURSES_CATALOG[0];

  const handleNav = (viewId) => {
    sound.playKeyClick();
    setActiveMenuDropdown(null);
    if (onNavigate) {
      onNavigate(viewId);
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

  // 5 Primary Desktop Rooms in Left Sidebar
  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: Home, highlight: 'bg-[#C7E8CA]' },
    { id: 'learn', label: 'My Learnings', icon: BookOpen, highlight: 'bg-[#C7E8CA]' },
    { id: 'play', label: 'Play', icon: Trophy, highlight: 'bg-[#C7E8CA]' },
    { id: 'stats', label: 'Stats', icon: BarChart2, highlight: 'bg-[#C7E8CA]' },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, highlight: 'bg-[#C7E8CA]' }
  ];

  const isNavActive = (itemId) => {
    if (itemId === 'home') return currentView === 'home' || currentView === 'drill' || currentView === 'daily' || currentView === 'practice';
    if (itemId === 'learn') return currentView === 'learn' || currentView === 'map' || currentView === 'lesson' || currentView === 'motion' || currentView === 'video' || currentView === 'shortcuts' || currentView === 'tracks';
    if (itemId === 'play') return currentView === 'play' || currentView === 'challenge' || ['press-room', 'paper-planes', 'local-line', 'night-market', 'drop-chits', 'pit-lane', 'fuse-box', 'fuse-desk', 'patch-terminal'].includes(currentView);
    if (itemId === 'stats') return currentView === 'stats' || currentView === 'progress' || currentView === 'badges';
    if (itemId === 'shop') return currentView === 'shop' || currentView === 'catalog';
    return currentView === itemId;
  };

  return (
    <div className="relative min-h-screen h-screen bg-[var(--rs-wallpaper)] p-1.5 sm:p-2.5 md:p-3 flex items-center justify-center font-sans select-none overflow-hidden transition-colors duration-200">
      
      {/* Decorative Dark Brown 4-Point Sparkle Stars (✦) in canvas corners */}
      <span className="absolute top-3 left-5 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>
      <span className="absolute top-10 left-1/4 text-lg text-[#2D2319] font-black opacity-40 pointer-events-none select-none">✦</span>
      <span className="absolute top-5 right-6 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>
      <span className="absolute bottom-5 left-6 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>
      <span className="absolute bottom-6 right-5 text-2xl sm:text-3xl text-[#2D2319] font-black opacity-80 pointer-events-none select-none">✦</span>

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
          className={`border-2 border-[#2D2319] bg-[var(--rs-paper)] rounded-2xl shadow-[6px_6px_0px_var(--rs-shadow)] overflow-hidden flex flex-col z-10 transition-all duration-200 ${
            windowState === 'maximized'
              ? 'w-full h-[99vh] max-w-none'
              : 'w-full max-w-[1640px] h-[96vh]'
          }`}
        >
          
          {/* ========================================================
              TITLEBAR: Dynamic Retro Titlebar
              ======================================================== */}
          <div className="bg-[var(--rs-titlebar)] text-[#2D2319] px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between font-mono font-bold text-sm shrink-0 transition-colors duration-200">
            
            {/* Left: Window Title with Sparkle */}
            <div className="flex items-center space-x-2">
              <span className="text-[#2D2319] text-base leading-none">✦</span>
              <span className="tracking-wide text-xs sm:text-sm font-black uppercase font-display">
                {title}
              </span>
              <span className="hidden sm:inline text-[10px] font-mono font-bold text-[#2D2319]/75 tracking-wider uppercase">
                // Race Your Fingers
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
              TOP MENU BAR (Theme, Settings, About, Help + Score & Audio)
              ======================================================== */}
          <div className="bg-[var(--rs-paper-alt)] px-4 py-1.5 border-b-2 border-[#2D2319] flex flex-wrap items-center justify-between gap-3 text-xs font-mono font-bold text-[#2D2319] shrink-0 relative transition-colors duration-200">
            
            {/* Left: Dropdown Menus */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              
              {/* Theme ▾ Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenuDropdown(activeMenuDropdown === 'theme' ? null : 'theme')}
                  className="hover:underline flex items-center space-x-1 focus:outline-none cursor-pointer"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Theme</span>
                  <span className="text-[10px]">▾</span>
                </button>

                {activeMenuDropdown === 'theme' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenuDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 w-64 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] z-50 overflow-hidden py-1 text-xs dropdown-menu-animate">
                      <div className="px-3 py-1.5 font-mono text-[10px] font-bold text-[#2D2319]/60 border-b border-[#2D2319]/10">
                        CHANGE OS PALETTE
                      </div>
                      {RETRO_THEMES.map(th => {
                        const isCurrent = (userProgress?.settings?.theme || selectedTheme || 'bone') === th.id;
                        return (
                          <button
                            key={th.id}
                            type="button"
                            onClick={() => {
                              sound.playKeyClick();
                              setActiveMenuDropdown(null);
                              if (onSelectTheme) onSelectTheme(th.id);
                            }}
                            className={`w-full text-left px-3 py-2 flex items-center justify-between font-bold cursor-pointer transition-colors ${
                              isCurrent ? 'bg-[#C7E8CA] text-[#2D2319]' : 'hover:bg-[#FAF3E0] text-[#2D2319]'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="w-3.5 h-3.5 rounded border border-[#2D2319] shrink-0" style={{ backgroundColor: th.header }} />
                              <div className="truncate">
                                <div>{th.name}</div>
                                <div className="text-[9px] font-normal text-[#2D2319]/60 font-mono">{th.tag}</div>
                              </div>
                            </div>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-[#2D2319] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Settings ▾ Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenuDropdown(activeMenuDropdown === 'settings' ? null : 'settings')}
                  className="hover:underline flex items-center space-x-1 focus:outline-none cursor-pointer"
                >
                  <span>Settings</span>
                  <span className="text-[10px]">▾</span>
                </button>

                {activeMenuDropdown === 'settings' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenuDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 w-64 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] z-50 overflow-hidden py-1 text-xs dropdown-menu-animate">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuDropdown(null);
                          handleNav('shop');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#FAF3E0] text-[#2D2319] flex items-center justify-between font-bold cursor-pointer transition-colors border-b border-[#2D2319]/10"
                      >
                        <div className="flex items-center space-x-2">
                          <ShoppingBag className="w-3.5 h-3.5 text-[#F6C445]" />
                          <span>Customization Shop...</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuDropdown(null);
                          setResetModalOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#F28B82] text-[#F28B82] hover:text-[#2D2319] flex items-center justify-between font-bold cursor-pointer transition-colors"
                      >
                        <span>Reset all progress...</span>
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* About Button */}
              <button
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  setActiveMenuDropdown(null);
                  setAboutModalOpen(true);
                }}
                className="hover:underline flex items-center space-x-1 focus:outline-none text-[#2D2319] cursor-pointer"
              >
                <span>About</span>
                <span className="text-[10px] text-[#F6C445]">✦</span>
              </button>

              {/* Help ▾ Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenuDropdown(activeMenuDropdown === 'help' ? null : 'help')}
                  className="hover:underline flex items-center space-x-1 focus:outline-none cursor-pointer"
                >
                  <span>Help</span>
                  <span className="text-[10px]">▾</span>
                </button>

                {activeMenuDropdown === 'help' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenuDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 w-60 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[4px_4px_0px_#2D2319] z-50 overflow-hidden py-1 text-xs divide-y divide-[#2D2319]/15 dropdown-menu-animate">
                      <div className="p-3 space-y-1 bg-[#FAF3E0]">
                        <div className="font-display font-black text-[#2D2319]">RETROSPEED</div>
                        <div className="text-[10px] font-mono font-bold text-[#F28B82] uppercase">Race Your Fingers</div>
                        <p className="text-[10px] text-[#2D2319]/75 leading-relaxed font-mono">
                          Offline touch typing. Maintain home row posture for maximum speed.
                        </p>
                      </div>

                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuDropdown(null);
                            setAboutModalOpen(true);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#F6C445] text-[#2D2319] font-mono font-bold text-[11px] cursor-pointer"
                        >
                          Studio & About RETROSPEED
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuDropdown(null);
                            setUnlockModalOpen(true);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#48B89F] text-[#2D2319] font-mono font-bold text-[11px] cursor-pointer"
                        >
                          License Status & Pricing
                        </button>
                      </div>

                      <div className="px-3 py-1.5 text-[9px] font-mono text-[#2D2319]/60">
                        Version 2.0 • Microsoft Store Edition
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
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[var(--rs-paper)] transition-colors duration-200">
            
            {/* Left Sidebar */}
            <div className="w-full md:w-56 bg-[var(--rs-paper-alt)] border-b-2 md:border-b-0 md:border-r-2 border-[#2D2319] p-3 sm:p-4 flex flex-col justify-between shrink-0 overflow-y-auto transition-colors duration-200">
              
              {/* Navigation Items */}
              <div className="space-y-1.5 flex md:flex-col flex-row overflow-x-auto md:overflow-visible gap-1.5 md:gap-0 pb-2 md:pb-0">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = isNavActive(item.id);
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

              {/* License Status Badge */}
              <button
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  setUnlockModalOpen(true);
                }}
                className={`w-full mt-2.5 p-2 rounded-xl border-2 border-[#2D2319] flex items-center justify-between text-xs font-mono font-bold shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all ${
                  license.isUnlocked
                    ? 'bg-[#C7E8CA] text-[#2D2319]'
                    : 'bg-[#F6C445] hover:bg-[#F28B82] text-[#2D2319]'
                }`}
                title={license.isUnlocked ? 'Lifetime License Active' : 'Click to Unlock full edition'}
              >
                <div className="flex items-center space-x-1.5 min-w-0">
                  <Shield className="w-3.5 h-3.5 shrink-0 text-[#2D2319]" />
                  <span className="truncate text-[10px] font-black">{license.badgeText}</span>
                </div>
                <div className="flex items-center space-x-1 shrink-0 px-2 py-0.5 bg-[#FDF8EE] rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-[10px] font-black uppercase text-[#2D2319]">
                  {!license.isUnlocked && <span className="text-[#2D2319] text-[11px] leading-none">✦</span>}
                  <span>{license.isUnlocked ? 'ACTIVE' : 'UNLOCK'}</span>
                </div>
              </button>

            </div>

            {/* Right Client Area with Smooth View Transition */}
            <div key={currentView} className="flex-1 flex flex-col overflow-y-auto bg-[var(--rs-paper)] view-transition-fade transition-colors duration-200">
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
        onOpenResetModal={() => {
          setProfileModalOpen(false);
          setResetModalOpen(true);
        }}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        userProgress={userProgress}
        onOpenUnlockModal={() => {
          setAboutModalOpen(false);
          setUnlockModalOpen(true);
        }}
        onOpenResetModal={() => {
          setAboutModalOpen(false);
          setResetModalOpen(true);
        }}
      />

      {/* Unlock Workshop Modal */}
      <UnlockModal
        isOpen={unlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
        userProgress={userProgress}
        onLicenseUpdated={updated => {
          if (onProfileUpdated) onProfileUpdated(updated);
        }}
      />

      {/* Reset Workshop Data Modal */}
      <ResetDataModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirmReset={() => {
          if (onResetAllData) onResetAllData();
        }}
      />

    </div>
  );
}
