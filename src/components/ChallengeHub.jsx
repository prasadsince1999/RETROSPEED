import React, { useState } from 'react';
import { 
  Home, 
  Target, 
  Trophy, 
  Calendar, 
  BarChart2, 
  ShoppingBag, 
  ArrowLeft, 
  Play, 
  Zap, 
  Flame, 
  Star, 
  Clock, 
  ShieldCheck, 
  Gamepad2, 
  Sparkles, 
  Bomb, 
  Activity, 
  Terminal, 
  Cpu, 
  Car, 
  Ghost, 
  CheckCircle2,
  Lock,
  ChevronRight,
  RefreshCw,
  Filter
} from 'lucide-react';
import { sound } from '../utils/audio';

// Skill Trials Definitions
const SKILL_TRIALS = [
  {
    id: 'speed-trial',
    title: '60s WPM Sprint',
    category: 'Speed Trial',
    badge: 'High Velocity',
    badgeColor: 'bg-[#F6C445]',
    description: 'Type high-frequency keywords with maximum keystroke throughput in a 60-second burst.',
    target: 'Target: 80+ WPM',
    duration: '60s',
    reward: '350 XP',
    difficulty: 'Normal',
    icon: Zap
  },
  {
    id: 'accuracy-gauntlet',
    title: '100% Accuracy Gauntlet',
    category: 'Precision Drill',
    badge: 'Zero Tolerance',
    badgeColor: 'bg-[#F28B82]',
    description: 'Tackle intricate multisyllabic keywords. A single miss incurs immediate time penalty.',
    target: 'Target: 100% Acc',
    duration: '90s',
    reward: '500 XP',
    difficulty: 'Master',
    icon: ShieldCheck
  },
  {
    id: 'survival-time-attack',
    title: 'Survival Time Attack',
    category: 'Endurance Sprint',
    badge: 'Countdown',
    badgeColor: 'bg-[#C3A6E8]',
    description: 'Start with 15 seconds on the clock. Every accurate keyword adds +2s of survival time.',
    target: 'Survive 3+ Mins',
    duration: 'Dynamic',
    reward: '600 XP',
    difficulty: 'Intense',
    icon: Clock
  }
];

// 5 Authentic Live Arcade Games
const ARCADE_GAMES = [
  {
    id: 'balloon',
    title: 'Balloon Ninja',
    badge: 'Live Arcade',
    badgeColor: 'bg-[#C7E8CA]',
    description: 'Slash colorful floating balloons by typing characters before they drift past the upper ceiling.',
    engine: 'Slash & Pop Engine',
    theme: 'Pastel Garden',
    icon: '🎈'
  },
  {
    id: 'monster',
    title: 'Monster Attack',
    badge: 'Live Arcade',
    badgeColor: 'bg-[#C7E8CA]',
    description: 'Blast advancing alien spacecraft invaders and space octopi with rapid defensive turret keystrokes.',
    engine: 'Space Defender Engine',
    theme: 'Cyber Nebula',
    icon: '👾'
  },
  {
    id: 'temple',
    title: 'Temple Bash',
    badge: 'Live Arcade',
    badgeColor: 'bg-[#C7E8CA]',
    description: 'Demolish ancient desert stone ruins and golden hieroglyphs with heavy bronze warhammers.',
    engine: 'Physics Crumble Engine',
    theme: 'Desert Sanctuary',
    icon: '🏺'
  },
  {
    id: 'bubble',
    title: 'Floating Bubbles',
    badge: 'Live Arcade',
    badgeColor: 'bg-[#C7E8CA]',
    description: 'Pop translucent aquatic sea bubbles floating from the ocean deep before they escape.',
    engine: 'Hydrodynamic Engine',
    theme: 'Deep Coral Trench',
    icon: '🫧'
  },
  {
    id: 'apple',
    title: 'Apple Thieves',
    badge: 'Live Arcade',
    badgeColor: 'bg-[#C7E8CA]',
    description: 'Catch falling orchard apples and defend golden harvests from mischievous orchard raccoons.',
    engine: 'Harvest Fall Engine',
    theme: 'Autumn Orchard',
    icon: '🍎'
  }
];

// Keyword Practice Games Suite (Arcade & Practice Games Roadmap)
const KEYWORD_PRACTICE_SUITE = [
  {
    id: 'meteor-words',
    title: 'Meteor Words',
    subtitle: 'Falling Words Arcade',
    badge: 'Arcade Sprint',
    badgeColor: 'bg-[#F6C445]',
    description: 'Fiery meteor keywords plummet from orbit. Type whole keywords before impact craters damage the shield.',
    mode: 'Keyword Blitz',
    status: 'Ready to Drill',
    icon: '☄️'
  },
  {
    id: 'velocity-gp',
    title: 'Velocity Grand Prix',
    subtitle: 'Typing Racer',
    badge: 'High Octane',
    badgeColor: 'bg-[#F28B82]',
    description: 'Compete in a high-speed circuit race. Each completed keyword injects nitro boost into your racecar.',
    mode: 'Racer Duel',
    status: 'Ready to Drill',
    icon: '🏎️'
  },
  {
    id: 'word-bomb',
    title: 'Word Bomb',
    subtitle: 'Ticking Keyword Match',
    badge: 'Sudden Death',
    badgeColor: 'bg-[#C3A6E8]',
    description: 'Pass the ticking explosive bomb by typing keywords containing given prefixes or anagram roots before the spark hits the fuse.',
    mode: 'Panic Match',
    status: 'Ready to Drill',
    icon: '💣'
  },
  {
    id: 'syntax-matrix',
    title: 'Syntax Matrix',
    subtitle: 'Developer Code Defense',
    badge: 'Code Protocol',
    badgeColor: 'bg-[#48B89F]',
    description: 'Incoming malware packets assault the mainframe. Fire syntax operators, regexes, and code tokens to patch vulnerabilities.',
    mode: 'Hacker Defense',
    status: 'Ready to Drill',
    icon: '🛡️'
  }
];

export default function ChallengeHub({
  userProgress = {},
  activeCourseId = 'keycraft-odyssey',
  onSelectCourse,
  onStartLesson,
  onLaunchGame,
  onStartSkillTrial,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'trials' | 'arcade' | 'keyword-suite'
  const [activeModalGame, setActiveModalGame] = useState(null);
  const [miniDrillRunning, setMiniDrillRunning] = useState(false);
  const [drillInput, setDrillInput] = useState('');
  const [drillKeywords, setDrillKeywords] = useState([
    'algorithm', 'function', 'javascript', 'interface', 'variable', 
    'component', 'performance', 'database', 'asynchronous', 'framework'
  ]);
  const [drillIndex, setDrillIndex] = useState(0);
  const [drillScore, setDrillScore] = useState(0);

  const handleNav = (view) => {
    sound.playKeyClick();
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const handleStartLiveGame = (gameViewId) => {
    sound.playKeyClick();
    if (onLaunchGame) {
      onLaunchGame(gameViewId);
    } else if (onNavigate) {
      onNavigate(gameViewId);
    }
  };

  const handleOpenInteractiveDrill = (game) => {
    sound.playKeyClick();
    setActiveModalGame(game);
    setMiniDrillRunning(false);
    setDrillScore(0);
    setDrillIndex(0);
    setDrillInput('');
  };

  const startDrillSession = () => {
    sound.playKeyClick();
    setMiniDrillRunning(true);
    setDrillScore(0);
    setDrillIndex(0);
    setDrillInput('');
  };

  const handleDrillInput = (e) => {
    const val = e.target.value;
    setDrillInput(val);
    const targetWord = drillKeywords[drillIndex];
    if (val.trim().toLowerCase() === targetWord.toLowerCase()) {
      sound.playKeyClick();
      setDrillScore(prev => prev + 100);
      setDrillInput('');
      setDrillIndex(prev => (prev + 1) % drillKeywords.length);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto space-y-5">
      
      {/* Header Controls Banner */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] space-y-3">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#F6C445] text-[#2D2319] flex items-center justify-center border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#2D2319] font-display">
                Challenge & Arcade Hub
              </h1>
              <p className="text-xs text-[#2D2319]/70 font-mono">
                Skill trials, high-velocity sprints, 5 authentic arcade games, and keyword battle modes.
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-[#FDF8EE] text-[#2D2319] font-mono text-xs font-black border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] self-start sm:self-auto">
            ★ 13 ACTIVE CHALLENGES
          </span>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 font-mono text-xs">
          {[
            { id: 'all', label: 'All Modes (13)' },
            { id: 'trials', label: '⚡ Skill Trials (3)' },
            { id: 'arcade', label: '🕹️ Live Arcade Games (5)' },
            { id: 'keyword-suite', label: '👾 Keyword Battle Suite (5)' }
          ].map(tab => {
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl border-2 border-[#2D2319] font-bold transition-all shrink-0 ${
                  isSel
                    ? 'bg-[#C7E8CA] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-black'
                    : 'bg-[#FDF8EE] hover:bg-white text-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Sections Container */}
      <div className="space-y-6">
        
        {/* 1. Skill Trials Section */}
        {(activeTab === 'all' || activeTab === 'trials') && (
          <section className="space-y-3">
            <div className="flex items-center space-x-2 font-display font-black text-xs sm:text-sm text-[#2D2319] uppercase tracking-wider">
              <Zap className="w-4 h-4 text-[#F6C445]" />
              <span>Core Skill Trials & Speed Sprints</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SKILL_TRIALS.map(trial => {
                const Icon = trial.icon;
                return (
                  <div
                    key={trial.id}
                    className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] flex flex-col justify-between space-y-4 hover:-translate-y-0.5 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.2 rounded ${trial.badgeColor} border border-[#2D2319] text-[9px] font-mono font-bold text-[#2D2319]`}>
                          {trial.badge}
                        </span>
                        <span className="px-2 py-0.2 rounded bg-[#FDF8EE] border border-[#2D2319] text-[9px] font-mono font-bold text-[#2D2319]">
                          {trial.duration}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-[#2D2319]" />
                        <h3 className="text-base font-black text-[#2D2319] font-display">
                          {trial.title}
                        </h3>
                      </div>

                      <p className="text-xs text-[#2D2319]/80 font-medium mt-1 leading-relaxed">
                        {trial.description}
                      </p>

                      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#2D2319] mt-3 pt-2 border-t border-[#2D2319]/10">
                        <span className="text-[#2D2319]/70">{trial.target}</span>
                        <span className="text-amber-800">+{trial.reward}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playKeyClick();
                        if (onStartSkillTrial) {
                          onStartSkillTrial(trial.id);
                        } else if (onNavigate) {
                          onNavigate('drill');
                        }
                      }}
                      className="w-full px-4 py-2 rounded-xl bg-[#F6C445] hover:bg-[#ffd95e] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 font-display font-black text-xs uppercase tracking-wide flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#2D2319]" />
                      <span>Start Trial</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 2. Live Arcade Games Section */}
        {(activeTab === 'all' || activeTab === 'arcade') && (
          <section className="space-y-3">
            <div className="flex items-center space-x-2 font-display font-black text-xs sm:text-sm text-[#2D2319] uppercase tracking-wider">
              <Gamepad2 className="w-4 h-4 text-[#48B89F]" />
              <span>Live Arcade Games (Instant Play)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ARCADE_GAMES.map(game => (
                <div
                  key={game.id}
                  className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] flex flex-col justify-between space-y-4 hover:-translate-y-0.5 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.2 rounded bg-[#C7E8CA] border border-[#2D2319] text-[9px] font-mono font-bold text-[#2D2319]">
                        {game.badge}
                      </span>
                      <span className="px-2 py-0.2 rounded bg-[#FDF8EE] border border-[#2D2319] text-[9px] font-mono font-bold text-[#2D2319]">
                        {game.theme}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{game.icon}</span>
                      <h3 className="text-base font-black text-[#2D2319] font-display">
                        {game.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#2D2319]/80 font-medium mt-1 leading-relaxed">
                      {game.description}
                    </p>

                    <div className="text-[10px] font-mono text-[#2D2319]/60 mt-2 pt-2 border-t border-[#2D2319]/10">
                      Engine: {game.engine}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStartLiveGame(game.id)}
                    className="w-full px-4 py-2 rounded-xl bg-[#48B89F] hover:bg-[#3ca089] text-white border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 font-display font-black text-xs uppercase tracking-wide flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Launch Arcade Game</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Keyword Battle Suite Roadmap */}
        {(activeTab === 'all' || activeTab === 'keyword-suite') && (
          <section className="space-y-3">
            <div className="flex items-center space-x-2 font-display font-black text-xs sm:text-sm text-[#2D2319] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C3A6E8]" />
              <span>Keyword Practice Battle Suite (Mini-Drills)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {KEYWORD_PRACTICE_SUITE.map(suite => (
                <div
                  key={suite.id}
                  className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] flex flex-col justify-between space-y-4 hover:-translate-y-0.5 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.2 rounded ${suite.badgeColor} border border-[#2D2319] text-[9px] font-mono font-bold text-[#2D2319]`}>
                        {suite.badge}
                      </span>
                      <span className="px-2 py-0.2 rounded bg-[#C7E8CA] border border-[#2D2319] text-[9px] font-mono font-bold text-[#2D2319]">
                        {suite.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{suite.icon}</span>
                      <div>
                        <h3 className="text-base font-black text-[#2D2319] font-display">
                          {suite.title}
                        </h3>
                        <div className="text-[10px] font-mono text-[#2D2319]/70">{suite.subtitle}</div>
                      </div>
                    </div>

                    <p className="text-xs text-[#2D2319]/80 font-medium mt-2 leading-relaxed">
                      {suite.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStartLiveGame(suite.id)}
                    className="w-full px-4 py-2 rounded-xl bg-[#F6C445] hover:bg-[#ffd95e] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 font-display font-black text-xs uppercase tracking-wide flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#2D2319]" />
                    <span>Play {suite.title}</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Mini Drill Modal */}
      {activeModalGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/60 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden animate-in zoom-in-95 duration-150 font-sans">
            
            <div className="bg-[#C3A6E8] text-[#2D2319] px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between font-mono font-bold text-xs">
              <span className="font-display font-black uppercase">{activeModalGame.title} // MINI_DRILL</span>
              <button
                type="button"
                onClick={() => setActiveModalGame(null)}
                className="w-5 h-5 bg-[#F28B82] border border-[#2D2319] rounded flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-center">
              <div className="text-4xl">{activeModalGame.icon}</div>
              <h3 className="text-lg font-black font-display text-[#2D2319]">{activeModalGame.title}</h3>
              <p className="text-xs font-mono text-[#2D2319]/70">{activeModalGame.description}</p>

              {!miniDrillRunning ? (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={startDrillSession}
                    className="px-6 py-2.5 bg-[#48B89F] hover:bg-[#3ca089] border-2 border-[#2D2319] rounded-xl text-xs font-black text-white shadow-[2px_2px_0px_#2D2319]"
                  >
                    Start Quick Session
                  </button>
                </div>
              ) : (
                <div className="space-y-3 bg-[#FAF3E0] p-4 rounded-xl border border-[#2D2319]">
                  <div className="text-xs font-mono font-bold text-[#2D2319]">
                    Target Word: <span className="text-base font-black px-2 py-0.5 bg-white rounded border border-[#2D2319] ml-1">{drillKeywords[drillIndex]}</span>
                  </div>

                  <input
                    type="text"
                    value={drillInput}
                    onChange={handleDrillInput}
                    placeholder="Type the word above..."
                    className="w-full px-3 py-2 bg-white border-2 border-[#2D2319] rounded-xl text-center font-mono font-bold text-sm focus:outline-none"
                    autoFocus
                  />

                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span>Score: {drillScore} pts</span>
                    <span>Words Left: {drillKeywords.length - drillIndex}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMiniDrillRunning(false)}
                    className="px-4 py-1.5 bg-[#FAF3E0] border border-[#2D2319] rounded-lg text-xs font-bold"
                  >
                    Finish Session
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
