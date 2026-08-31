import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Play, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  Keyboard as KeyboardIcon, 
  Hand, 
  Flame, 
  Award, 
  Shield, 
  Sparkles,
  Zap,
  Heart
} from 'lucide-react';
import VirtualKeyboard from '../../VirtualKeyboard';
import HandGuide from '../../HandGuide';
import GameEnvironment from './GameEnvironment';

// Life indicator icons representing authentic EdClub character themes
function CharacterLifeHead({ type = 'ninja', active = true, size = 26 }) {
  if (type === 'ninja') {
    return (
      <div 
        className={`relative flex items-center justify-center transition-all duration-300 ${
          active ? 'scale-100 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]' : 'scale-85 opacity-30 grayscale'
        }`}
      >
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" fill={active ? '#0f172a' : '#334155'} stroke={active ? '#38bdf8' : '#64748b'} strokeWidth="2" />
          <path d="M 6 15 Q 18 13 30 15 Q 30 22 18 22 Q 6 22 6 15" fill={active ? '#e2e8f0' : '#64748b'} />
          <ellipse cx="13" cy="18" rx="2" ry="2.5" fill="#0f172a" />
          <ellipse cx="23" cy="18" rx="2" ry="2.5" fill="#0f172a" />
          <circle cx="13.7" cy="17.2" r="0.7" fill="#ffffff" />
          <circle cx="23.7" cy="17.2" r="0.7" fill="#ffffff" />
          <path d="M 4 12 L 32 12" stroke={active ? '#ef4444' : '#64748b'} strokeWidth="3" strokeLinecap="round" />
          <circle cx="31" cy="12" r="2.5" fill={active ? '#ef4444' : '#64748b'} />
        </svg>
      </div>
    );
  }

  if (type === 'robot' || type === 'alien') {
    return (
      <div 
        className={`relative flex items-center justify-center transition-all duration-300 ${
          active ? 'scale-100 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'scale-85 opacity-30 grayscale'
        }`}
      >
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
          <rect x="6" y="8" width="24" height="22" rx="6" fill={active ? '#1e1b4b' : '#334155'} stroke={active ? '#c084fc' : '#64748b'} strokeWidth="2" />
          <line x1="18" y1="2" x2="18" y2="8" stroke={active ? '#38bdf8' : '#64748b'} strokeWidth="2" strokeLinecap="round" />
          <circle cx="18" cy="2" r="2" fill={active ? '#38bdf8' : '#64748b'} />
          <circle cx="12" cy="18" r="3" fill={active ? '#38bdf8' : '#64748b'} />
          <circle cx="24" cy="18" r="3" fill={active ? '#38bdf8' : '#64748b'} />
          <rect x="12" y="24" width="12" height="3" rx="1.5" fill={active ? '#ec4899' : '#64748b'} />
        </svg>
      </div>
    );
  }

  if (type === 'pharaoh' || type === 'temple') {
    return (
      <div 
        className={`relative flex items-center justify-center transition-all duration-300 ${
          active ? 'scale-100 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'scale-85 opacity-30 grayscale'
        }`}
      >
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
          <polygon points="18,4 32,28 4,28" fill={active ? '#78350f' : '#334155'} stroke={active ? '#fbbf24' : '#64748b'} strokeWidth="2" />
          <polygon points="18,10 28,26 8,26" fill={active ? '#b45309' : '#1e293b'} />
          <circle cx="18" cy="18" r="3" fill={active ? '#fde047' : '#64748b'} />
          <line x1="18" y1="21" x2="18" y2="26" stroke={active ? '#fbbf24' : '#64748b'} strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  if (type === 'diver' || type === 'ocean') {
    return (
      <div 
        className={`relative flex items-center justify-center transition-all duration-300 ${
          active ? 'scale-100 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'scale-85 opacity-30 grayscale'
        }`}
      >
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="14" fill={active ? '#0369a1' : '#334155'} stroke={active ? '#22d3ee' : '#64748b'} strokeWidth="2" />
          <ellipse cx="18" cy="17" rx="9" ry="7" fill={active ? '#082f49' : '#1e293b'} stroke={active ? '#67e8f9' : '#64748b'} strokeWidth="1.5" />
          <ellipse cx="15" cy="15" rx="2" ry="1.5" fill="#ffffff" opacity="0.7" />
          <line x1="6" y1="18" x2="2" y2="22" stroke={active ? '#38bdf8' : '#64748b'} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (type === 'raccoon' || type === 'orchard') {
    return (
      <div 
        className={`relative flex items-center justify-center transition-all duration-300 ${
          active ? 'scale-100 filter drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'scale-85 opacity-30 grayscale'
        }`}
      >
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
          <polygon points="8,14 11,4 17,11" fill={active ? '#334155' : '#1e293b'} stroke={active ? '#94a3b8' : '#64748b'} strokeWidth="1.5" />
          <polygon points="28,14 25,4 19,11" fill={active ? '#334155' : '#1e293b'} stroke={active ? '#94a3b8' : '#64748b'} strokeWidth="1.5" />
          <circle cx="18" cy="20" r="13" fill={active ? '#475569' : '#334155'} stroke={active ? '#cbd5e1' : '#64748b'} strokeWidth="2" />
          <path d="M 8 18 Q 18 16 28 18 Q 28 23 18 23 Q 8 23 8 18" fill="#0f172a" />
          <ellipse cx="13" cy="20" rx="2" ry="2.5" fill="#ffffff" />
          <ellipse cx="23" cy="20" rx="2" ry="2.5" fill="#ffffff" />
          <ellipse cx="13.5" cy="20" rx="1" ry="1.5" fill="#0f172a" />
          <ellipse cx="23.5" cy="20" rx="1" ry="1.5" fill="#0f172a" />
          <ellipse cx="18" cy="25" rx="2" ry="1.5" fill="#0f172a" />
        </svg>
      </div>
    );
  }

  // Default Heart
  return (
    <div 
      className={`relative flex items-center justify-center transition-all duration-300 ${
        active ? 'scale-100 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'scale-85 opacity-30 grayscale'
      }`}
    >
      <Heart 
        size={size} 
        className={active ? 'text-rose-500 fill-rose-500' : 'text-slate-500 fill-slate-700'} 
      />
    </div>
  );
}

export default function GameStageLayout({
  // Game & Lesson Meta
  lesson,
  title,
  subtitle,
  icon,
  gameTheme = 'daylight-sky',
  environment,
  backdrop,
  className = '',
  
  // Game Progression
  score = 0,
  combo = 0,
  maxCombo = 0,
  multiplier = 1,
  lives = 3,
  maxLives = 3,
  lifeType = 'ninja',
  
  // Target Keys & Progress
  targetKeys = [],
  activeChar = '',
  entityCount = 0,
  totalEntities = 0,
  itemsLeft = 0,
  totalItems = 0,
  targetsQueue = [],
  entityLabel = 'Entities',
  entityIcon,
  
  // Game Flow State
  hasStarted = false,
  startPrompt = 'Type letter to begin',
  showStartPrompt = true,
  isPaused: externalPaused,
  onPauseToggle,
  onResume,
  onRestart,
  onExit,
  
  // Audio & Settings
  soundEnabled = true,
  onToggleSound,
  
  // Virtual Keyboard & Hand Guide
  keyboardEnabled: initialKeyboardEnabled = false,
  handsEnabled: initialHandsEnabled = true,
  onToggleKeyboard,
  onToggleHands,
  pressedKeyId,
  errorKeyId,
  layout = 'qwerty',
  theme = 'bone',
  
  // Effects & Arena Children
  vignetteDanger = false,
  isScreenShaking = false,
  comboBanner = null,
  floatingParticles = [],
  floatingEffects = [],
  bottomLeftNode = null,
  bottomCenterNode = null,
  bottomRightNode = null,
  children
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isKeyboardDockVisible, setIsKeyboardDockVisible] = useState(initialKeyboardEnabled);
  const [isPausedInternal, setIsPausedInternal] = useState(false);

  const isPaused = externalPaused !== undefined ? externalPaused : isPausedInternal;

  // Handle ESC key for Pause / Menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        toggleMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isPaused]);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    if (onPauseToggle) {
      onPauseToggle(nextState);
    } else {
      setIsPausedInternal(nextState);
    }
  };

  const handleResume = () => {
    setIsMenuOpen(false);
    if (onResume) {
      onResume();
    } else if (onPauseToggle) {
      onPauseToggle(false);
    } else {
      setIsPausedInternal(false);
    }
  };

  const handleRestart = () => {
    setIsMenuOpen(false);
    if (onRestart) onRestart();
  };

  const handleToggleKeyboardDock = () => {
    const next = !isKeyboardDockVisible;
    setIsKeyboardDockVisible(next);
    if (onToggleKeyboard) onToggleKeyboard(next);
  };

  // Format Target Key Set: e.g. "( a s d f )"
  const formattedTargetKeys = Array.isArray(targetKeys) && targetKeys.length > 0
    ? targetKeys
    : lesson?.letters && lesson.letters.length > 0
      ? lesson.letters
      : lesson?.targetKeys && lesson.targetKeys.length > 0
        ? lesson.targetKeys
        : lesson?.text
          ? Array.from(new Set(lesson.text.replace(/\s+/g, '').split(''))).slice(0, 8)
          : ['a', 's', 'd', 'f'];

  const allFloatingParticles = floatingEffects.length > 0 ? floatingEffects : floatingParticles;

  return (
    <div 
      className={`relative w-full h-screen max-h-screen overflow-hidden flex flex-col justify-between select-none bg-slate-950 font-sans ${className} ${
        isScreenShaking ? 'animate-error-shake' : ''
      }`}
    >
      {/* Dynamic Background Environment */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {backdrop ? (
          backdrop
        ) : environment ? (
          typeof environment === 'string' ? (
            <GameEnvironment theme={environment} />
          ) : (
            environment
          )
        ) : (
          <GameEnvironment theme={gameTheme} />
        )}
      </div>

      {/* Pulsing Critical Danger Vignette */}
      {vignetteDanger && (
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(239,68,68,0.45)_100%)] animate-pulse" />
      )}

      {/* Top Minimalist Header Bar */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-white/10 bg-slate-950/40 backdrop-blur-md text-white">
        
        {/* Top-Left: Hamburger Menu Button ≡ */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMenu}
            aria-label="Game Menu and Settings"
            className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 backdrop-blur-md shadow-lg transition-all"
            title="Menu (Esc)"
          >
            <Menu className="w-5 h-5 text-white group-hover:text-amber-300 transition-colors" />
          </button>

          {/* Quick Exit / Back Button */}
          <button
            onClick={onExit}
            aria-label="Exit Game"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-rose-500/20 hover:border-rose-400/40 active:scale-95 border border-white/15 backdrop-blur-md text-xs font-bold text-slate-200 hover:text-white shadow-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>

        {/* Center: Lesson Meta & Live Score / Multiplier */}
        <div className="flex flex-col items-center justify-center text-center max-w-xs sm:max-w-md truncate">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{subtitle || 'Typing Jungle Arcade'}</span>
            </span>
            {combo >= 2 && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-[10px] font-black text-white shadow-sm animate-pulse">
                <Flame className="w-3 h-3 text-amber-200" />
                <span>{combo} COMBO ({multiplier}x)</span>
              </span>
            )}
          </div>
          <h1 className="text-base sm:text-lg font-black font-display tracking-tight text-white drop-shadow-md truncate">
            {title || lesson?.title || 'Keyboard Quest'}
          </h1>
        </div>

        {/* Top-Right: Authentic EdClub Target Key Set ( a s d f ) */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 shadow-inner font-mono text-sm sm:text-base font-bold text-slate-200">
            <span className="text-slate-400 mr-1.5 select-none font-sans font-medium text-xs hidden md:inline">Keys:</span>
            <span className="text-amber-400 font-extrabold mr-1">(</span>
            <div className="flex items-center space-x-1.5">
              {formattedTargetKeys.map((keyChar, idx) => {
                const isCharActive = activeChar && (
                  activeChar.toLowerCase() === keyChar.toLowerCase() ||
                  activeChar === keyChar
                );
                return (
                  <span
                    key={`${keyChar}-${idx}`}
                    className={`inline-flex items-center justify-center min-w-[20px] px-1 py-0.5 rounded transition-all duration-200 ${
                      isCharActive
                        ? 'bg-amber-400 text-slate-950 font-black scale-110 shadow-[0_0_12px_rgba(251,191,36,0.8)]'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {keyChar === ' ' ? '␣' : keyChar}
                  </span>
                );
              })}
            </div>
            <span className="text-amber-400 font-extrabold ml-1">)</span>
          </div>

          {/* Mini Live Score Counter */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
            <Award className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col text-right">
              <span className="text-[9px] uppercase font-bold text-slate-300 leading-none">Score</span>
              <span className="text-sm font-black text-amber-300 font-mono leading-tight">{score}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Stage / Arena Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-2 sm:px-4 min-h-0">
        
        {/* Center Initial Prompt: "Type letter to begin" */}
        {!hasStarted && showStartPrompt && (
          <div className="absolute top-12 z-40 animate-bounce pointer-events-none">
            <div className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.4)] text-amber-300 font-display font-extrabold text-sm sm:text-base tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>{startPrompt}</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-white font-mono text-xs font-bold border border-amber-400/40">
                {activeChar || formattedTargetKeys[0] || 'A'}
              </span>
            </div>
          </div>
        )}

        {/* Dynamic Combo Multiplier Banner Overlay */}
        {comboBanner && (
          <div className="absolute top-6 z-40 animate-combo-pop pointer-events-none">
            <div className={`px-6 py-2 rounded-xl bg-gradient-to-r ${comboBanner.color || 'from-amber-500 to-orange-600'} text-white font-black text-lg shadow-2xl border border-white/40 flex items-center space-x-3`}>
              <Flame className="w-5 h-5 text-amber-200 animate-bounce" />
              <span className="drop-shadow-lg tracking-wide">{comboBanner.title || comboBanner.text}</span>
              {comboBanner.badge && (
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-black/30 border border-white/30 font-mono font-bold">
                  {comboBanner.badge}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Floating Particles Overlay */}
        {allFloatingParticles.length > 0 && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
            {allFloatingParticles.map((particle) => (
              <div
                key={particle.id || Math.random()}
                className={`absolute animate-float-fade font-black text-2xl sm:text-3xl font-display flex items-center space-x-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] ${particle.color || 'text-amber-300'}`}
                style={{
                  top: particle.y !== undefined ? (typeof particle.y === 'number' ? `${particle.y}px` : particle.y) : '40%',
                  left: particle.x !== undefined ? (typeof particle.x === 'number' ? `${particle.x}px` : particle.x) : '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span>{particle.text || (particle.points ? `+${particle.points}` : '')}</span>
                {particle.multiplierText && (
                  <span className="text-sm bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md font-mono font-bold ml-1.5 shadow-md">
                    {particle.multiplierText}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Slot for the Game Arena & Bottom Center Interactive Component */}
        <div className="w-full h-full flex flex-col items-center justify-between relative">
          <div className="w-full flex-1 flex flex-col items-center justify-center relative">
            {children}
          </div>
          {bottomCenterNode && (
            <div className="relative z-20 w-full flex items-center justify-center pb-1">
              {bottomCenterNode}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Game HUD Bar & Controls */}
      <footer className="relative z-20 w-full px-4 sm:px-6 py-2.5 border-t border-white/10 bg-slate-950/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Bottom-Left: Custom Bottom-Left Node OR Sound/Hands Toggles */}
        <div className="flex items-center space-x-3">
          {bottomLeftNode ? (
            bottomLeftNode
          ) : (
            <div className="flex items-center space-x-2">
              {onToggleSound && (
                <button
                  onClick={onToggleSound}
                  aria-label={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-slate-300 hover:text-white border border-white/10 transition-all"
                  title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
                </button>
              )}

              {onToggleHands && (
                <button
                  onClick={onToggleHands}
                  aria-label="Toggle Hand Guides"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-slate-300 hover:text-white border border-white/10 transition-all hidden sm:flex items-center space-x-1 text-xs font-bold"
                  title="Toggle Hand Guides"
                >
                  <Hand className="w-3.5 h-3.5 text-sky-300" />
                  <span className="text-[11px] text-slate-300">Hands</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom-Center: "Hide ×" / "Keyboard ⌨" Toggle Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleToggleKeyboardDock}
            aria-label="Toggle Virtual Keyboard"
            className={`group flex items-center space-x-1.5 px-4 py-1.5 rounded-full border text-xs font-extrabold tracking-wide transition-all shadow-md active:scale-95 ${
              isKeyboardDockVisible
                ? 'bg-rose-500/20 border-rose-400/50 text-rose-200 hover:bg-rose-500/30'
                : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/20 hover:text-white'
            }`}
          >
            <KeyboardIcon className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
            <span>{isKeyboardDockVisible ? 'Hide ×' : 'Keyboard ⌨'}</span>
          </button>
        </div>

        {/* Bottom-Right: Custom Bottom-Right Node OR Entity Counter + Character Life Heads */}
        <div className="flex items-center space-x-4">
          {bottomRightNode ? (
            bottomRightNode
          ) : (
            <>
              {/* Entity Counter */}
              {(totalEntities > 0 || entityCount > 0 || totalItems > 0 || itemsLeft > 0) && (
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md">
                  {entityIcon ? (
                    entityIcon
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping mr-0.5" />
                  )}
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">{entityLabel}:</span>
                  <span className="text-sm font-black font-mono text-white">
                    {entityCount || (totalItems ? totalItems - itemsLeft : 0)}
                    {(totalEntities > 0 || totalItems > 0) && (
                      <span className="text-slate-400 text-xs font-normal"> / {totalEntities || totalItems}</span>
                    )}
                  </span>
                </div>
              )}

              {/* Character Life Heads / Indicators */}
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md shadow-inner">
                {Array.from({ length: maxLives }).map((_, idx) => {
                  const active = idx < lives;
                  return (
                    <CharacterLifeHead
                      key={`life-${idx}`}
                      type={lifeType}
                      active={active}
                      size={22}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </footer>

      {/* Collapsible Virtual Keyboard & Hand Guide Bottom Dock */}
      {isKeyboardDockVisible && (
        <div className="relative z-20 w-full bg-slate-900/90 border-t border-white/15 backdrop-blur-xl px-4 py-2 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <VirtualKeyboard
              activeChar={activeChar}
              pressedKeyId={pressedKeyId}
              errorKeyId={errorKeyId}
              layout={layout}
              theme={theme}
            />
            {initialHandsEnabled && (
              <div className="mt-1">
                <HandGuide activeChar={activeChar} layout={layout} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Authentic EdClub Pause & Game Menu Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border-2 border-white/20 rounded-3xl p-6 shadow-2xl text-white flex flex-col items-center">
            
            {/* Close / Resume Button in top corner */}
            <button
              onClick={handleResume}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Menu Header */}
            <div className="flex items-center space-x-2 text-amber-400 mb-1">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">EdClub Arcade</span>
            </div>
            <h2 className="text-2xl font-black font-display mb-1 text-center">
              Game Paused
            </h2>
            <p className="text-xs text-slate-400 mb-6 text-center">
              Take a breath! Your progress is saved while paused.
            </p>

            {/* Menu Actions */}
            <div className="w-full flex flex-col space-y-3">
              
              {/* Primary Action: Resume Game */}
              <button
                onClick={handleResume}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-98 font-black font-display text-white text-base shadow-lg flex items-center justify-center space-x-2.5 transition-all"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Resume Game</span>
                <span className="text-xs bg-emerald-700/60 px-2 py-0.5 rounded text-emerald-100 font-mono ml-2">Esc</span>
              </button>

              {/* Restart Level */}
              {onRestart && (
                <button
                  onClick={handleRestart}
                  className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-98 font-bold text-slate-200 hover:text-white text-sm border border-white/15 flex items-center justify-center space-x-2 transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>Restart Lesson</span>
                </button>
              )}

              {/* Sound Toggle Button */}
              {onToggleSound && (
                <button
                  onClick={onToggleSound}
                  className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-98 font-bold text-slate-200 hover:text-white text-sm border border-white/15 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center space-x-2.5">
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
                    <span>Sound Effects</span>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${soundEnabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                    {soundEnabled ? 'ON' : 'MUTED'}
                  </span>
                </button>
              )}

              {/* Exit Game / Return to Map */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onExit) onExit();
                }}
                className="w-full py-3 px-5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 active:scale-98 font-bold text-rose-300 hover:text-rose-200 text-sm border border-rose-500/30 flex items-center justify-center space-x-2 transition-all mt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit to Lesson Map</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
