// Play Room: 8 Paper-Arcade Workshop Games & Core Skill Trials
import React, { useState } from 'react';
import { 
  Play, 
  Zap, 
  Flame, 
  Star, 
  Clock, 
  ShieldCheck, 
  Gamepad2, 
  Sparkles, 
  Printer,
  Send,
  Train,
  ShoppingBag,
  FileText,
  FlameKindling,
  Car,
  Terminal,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/audio';

const SKILL_TRIALS = [
  {
    id: 'speed-sprint',
    title: '60s WPM Sprint',
    category: 'Speed Trial',
    badge: 'Velocity',
    badgeColor: 'bg-[#F6C445]',
    description: 'Type high-frequency words with maximum throughput in a 60-second burst.',
    target: 'Target: 60+ WPM',
    duration: '60s',
    reward: '350 XP',
    icon: Zap
  },
  {
    id: 'accuracy-gauntlet',
    title: '100% Accuracy Gauntlet',
    category: 'Precision Drill',
    badge: 'Zero Tolerance',
    badgeColor: 'bg-[#F28B82]',
    description: 'Tackle intricate multisyllabic keywords. A single miss incurs immediate penalty.',
    target: 'Target: 100% Acc',
    duration: '90s',
    reward: '500 XP',
    icon: ShieldCheck
  },
  {
    id: 'survival-attack',
    title: 'Survival Time Attack',
    category: 'Endurance Sprint',
    badge: 'Countdown',
    badgeColor: 'bg-[#C3A6E8]',
    description: 'Start with 15 seconds on the clock. Every accurate keyword adds +2s of survival time.',
    target: 'Survive 3+ Mins',
    duration: 'Dynamic',
    reward: '600 XP',
    icon: Clock
  }
];

const WORKSHOP_GAMES = [
  {
    id: 'press-room',
    title: 'Press Room',
    badge: 'Letters',
    badgeColor: 'bg-[#4BA3E3]',
    description: 'Single-key reflex factory: Rubber stamp slams down on moving paper slips.',
    icon: Printer,
    focus: 'Part 1–2 Home Row'
  },
  {
    id: 'paper-planes',
    title: 'Paper Planes',
    badge: 'Short Words',
    badgeColor: 'bg-[#48B89F]',
    description: 'Origami flight: Type words on ascending paper notes to fold and launch them.',
    icon: Send,
    focus: 'Part 2 Home Words'
  },
  {
    id: 'local-line',
    title: 'Local Line',
    badge: 'Pace',
    badgeColor: 'bg-[#F6C445]',
    description: 'Commuter rail duel: Clean words accelerate your coach; typos slam the brakes.',
    icon: Train,
    focus: 'Part 3–4 Mixed Words'
  },
  {
    id: 'night-market',
    title: 'Night Market',
    badge: 'Accuracy',
    badgeColor: 'bg-[#F28B82]',
    description: 'Counter dispatch: Order chits slide in from the right. Type item names to stamp PAID.',
    icon: ShoppingBag,
    focus: 'Part 4 Phrases'
  },
  {
    id: 'drop-chits',
    title: 'Drop Chits',
    badge: 'Falling Words',
    badgeColor: 'bg-[#C3A6E8]',
    description: 'Sorting rail defense: Type words on falling paper chits before they hit the desk.',
    icon: FileText,
    focus: 'Part 6 Speed'
  },
  {
    id: 'fuse-desk',
    title: 'Fuse Desk',
    badge: 'Root Words',
    badgeColor: 'bg-[#F6C445]',
    description: 'Manila envelope pressure: Submit words containing the target root before the fuse burns.',
    icon: FlameKindling,
    focus: 'Part 5 Symbols & Roots'
  },
  {
    id: 'pit-lane',
    title: 'Pit Lane',
    badge: '60s Race',
    badgeColor: 'bg-[#48B89F]',
    description: 'Typewriter duel: Two mechanical typewriters race on paper roads powered by live WPM.',
    icon: Car,
    focus: 'Part 6 Velocity'
  },
  {
    id: 'patch-terminal',
    title: 'Patch Terminal',
    badge: 'Code Syntax',
    badgeColor: 'bg-[#2D2319]',
    description: 'Clean code workbench: Patch single falling lines of real code syntax without errors.',
    icon: Terminal,
    focus: 'Part 8 Pro Developers'
  }
];

export default function ChallengeHub({
  userProgress = {},
  onLaunchGame,
  onStartSkillTrial,
  onNavigate
}) {
  const handleLaunch = (gameId) => {
    sound.playKeyClick();
    if (onLaunchGame) {
      onLaunchGame(gameId);
    }
  };

  const handleTrial = (trialId) => {
    sound.playKeyClick();
    if (onStartSkillTrial) {
      onStartSkillTrial(trialId);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto space-y-6">
      
      {/* HEADER BANNER */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              PAPER ARCADE WORKSHOP
            </span>
            <span className="text-xs font-mono text-[#2D2319]/70 font-bold">
              8 Original Games · One Shared HUD
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#2D2319] font-display mt-0.5">
            Arcade & Skill Workshop
          </h1>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold text-[#2D2319]">
          ★ 8 Active Workshop Games
        </div>
      </div>

      {/* SECTION 1: CORE SKILL TRIALS */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-[#F6C445] fill-[#F6C445]" />
          <h2 className="text-xs font-mono font-black uppercase tracking-wider text-[#2D2319]">
            Core Skill Trials & Sprints
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {SKILL_TRIALS.map((trial) => {
            const Icon = trial.icon;
            return (
              <div
                key={trial.id}
                className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] ${trial.badgeColor}`}>
                      {trial.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#2D2319]">
                      {trial.duration}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-[#2D2319]" />
                    <h3 className="font-bold text-sm text-[#2D2319] font-display">
                      {trial.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#2D2319]/80 font-mono mt-1.5 leading-relaxed">
                    {trial.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2D2319]/15 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#2D2319]/70">
                    {trial.target}
                  </span>
                  <button
                    onClick={() => handleTrial(trial.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#F6C445] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] font-mono text-xs font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-[#2D2319]" />
                    <span>Start Trial</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: THE 8 WORKSHOP GAMES */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="w-4 h-4 text-[#48B89F]" />
          <h2 className="text-xs font-mono font-black uppercase tracking-wider text-[#2D2319]">
            The 8 Workshop Games
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {WORKSHOP_GAMES.map((game) => {
            const Icon = game.icon;

            return (
              <div
                key={game.id}
                className="bg-[#FAF3E0] hover:bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[4px_4px_0px_#2D2319] flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] ${game.badgeColor}`}>
                      {game.badge}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#2D2319]/60">
                      {game.focus}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2.5 mt-1">
                    <div className="w-8 h-8 rounded-lg bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-black text-base text-[#2D2319] font-display">
                      {game.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#2D2319]/80 font-mono mt-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2D2319]/15 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#2D2319]/70">
                    Workshop Edition
                  </span>
                  <button
                    onClick={() => handleLaunch(game.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#F6C445] hover:bg-[#48B89F] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#2D2319]" />
                    <span>Play Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
