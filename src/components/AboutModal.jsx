import React, { useState } from 'react';
import {
  X,
  Globe,
  Mail,
  Heart,
  ExternalLink,
  BookOpen,
  Compass,
  Sparkles,
  Layers,
  Bug,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  Check,
  Key,
  Flame,
  Info,
  Clock,
  Code,
  RotateCcw,
  Cpu,
  Terminal,
  Shield,
  Zap,
  Award,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getLicenseStatus, PRICING } from '../utils/license';

export default function AboutModal({
  isOpen,
  onClose,
  userProgress = {},
  onOpenUnlockModal,
  onOpenResetModal
}) {
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' | 'roadmap' | 'license'
  const license = getLicenseStatus(userProgress);

  if (!isOpen) return null;

  const handleLinkClick = (url) => {
    sound.playKeyClick();
    if (window.open) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const TABS = [
    { id: 'studio', label: 'Studio & Apps', icon: Sparkles, count: '4 Apps' },
    { id: 'roadmap', label: "Releases & Roadmap", icon: Clock, count: 'v2.0' },
    { id: 'license', label: 'License & System', icon: ShieldCheck, count: license.badgeText }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-[#2D2319]/75 backdrop-blur-xs select-none animate-in fade-in duration-150">
      <div className="w-full max-w-4xl h-[92vh] max-h-[740px] min-h-[580px] bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[8px_8px_0px_#2D2319] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 relative">
        
        {/* DECORATIVE CORNER SPARKLES */}
        <span className="absolute top-1 left-2 text-xs text-[#2D2319] font-black opacity-30 pointer-events-none select-none">✦</span>
        <span className="absolute bottom-2 right-3 text-xs text-[#2D2319] font-black opacity-30 pointer-events-none select-none">✦</span>

        {/* RETRO TITLEBAR */}
        <div className="px-4 py-3 bg-[#C3A6E8] border-b-2 border-[#2D2319] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-[#FAF3E0] border-2 border-[#2D2319]" />
            <span className="font-mono text-xs sm:text-sm font-black tracking-wider text-[#2D2319] uppercase flex items-center gap-1.5">
              <span>ABOUT RETROSPEED</span>
              <span className="text-[#2D2319]/40">//</span>
              <span className="hidden sm:inline">KSM × TECH STUDIO WORKSHOP</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="hidden md:inline px-2 py-0.5 rounded bg-[#FAF3E0] text-[#2D2319] text-[10px] font-mono font-bold border border-[#2D2319]">
              RELEASE 2.0.0
            </span>
            <button
              onClick={() => {
                sound.playKeyClick();
                onClose();
              }}
              className="w-7 h-7 rounded-lg bg-[#FAF3E0] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs font-black cursor-pointer"
              title="Close Dialog [ESC]"
            >
              ✕
            </button>
          </div>
        </div>

        {/* STREAMLINED TAB SELECTOR BAR (3 WIDE TABS, ZERO OVERFLOW) */}
        <div className="grid grid-cols-3 bg-[#FAF3E0] border-b-2 border-[#2D2319] px-3 pt-2.5 gap-2 shrink-0">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3 py-2 sm:py-2.5 rounded-t-xl border-t-2 border-x-2 border-[#2D2319] font-mono text-xs sm:text-sm font-black transition-all flex items-center justify-center space-x-2 cursor-pointer relative ${
                  isActive
                    ? 'bg-[#FDF8EE] text-[#2D2319] border-b-2 border-b-[#FDF8EE] -mb-[2px] z-10 shadow-[0px_-3px_0px_#2D2319]'
                    : 'bg-[#FAF3E0] hover:bg-white text-[#2D2319]/70 border-b-2 border-b-[#2D2319]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#2D2319]' : 'text-[#2D2319]/70'}`} />
                <span className="truncate">{tab.label}</span>
                <span className={`hidden md:inline text-[10px] px-1.5 py-0.2 rounded border border-[#2D2319] ${
                  isActive ? 'bg-[#F6C445] text-[#2D2319]' : 'bg-[#FAF3E0] text-[#2D2319]/60'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* SCROLLABLE RICH CONTENT BODY */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-[#2D2319] flex-1 bg-[#FDF8EE]">
          
          {/* ========================================================================= */}
          {/* TAB 1: STUDIO & APPS */}
          {/* ========================================================================= */}
          {activeTab === 'studio' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Studio Hero Banner Card */}
              <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_#2D2319] space-y-4 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#2D2319]/15 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-xl bg-[#4BA3E3] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-[#2D2319] shrink-0 font-bold">
                      <Sparkles className="w-6 h-6 fill-[#2D2319]" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-base sm:text-lg font-black font-display text-[#2D2319]">
                          PrasaD at KSM × Tech
                        </h2>
                        <span className="px-2 py-0.5 rounded bg-[#48B89F] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319]">
                          INDEPENDENT MAKER
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[#2D2319]/75 font-medium">
                        Crafting focused, tactile desktop tools that respect human attention.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleLinkClick('https://ksmxtech.com')}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FDF8EE] hover:bg-[#F6C445] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] text-xs font-mono font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>ksmxtech.com</span>
                      <ExternalLink className="w-3 h-3 text-[#2D2319]/60" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLinkClick('mailto:support@ksmxtech.com')}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FDF8EE] hover:bg-[#48B89F] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] text-xs font-mono font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Support</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono leading-relaxed text-[#2D2319]/85">
                  <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[2px_2px_0px_#2D2319] space-y-1.5">
                    <div className="font-display font-black text-xs text-[#2D2319] flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#48B89F]" />
                      <span>The Offline Workshop Pledge</span>
                    </div>
                    <p className="text-[11px] text-[#2D2319]/80">
                      No cloud locks, no mandatory accounts, no telemetric trackers, and zero intrusive ads. Your typing drills, keystroke latency, and progress remain 100% private on your machine.
                    </p>
                  </div>

                  <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[2px_2px_0px_#2D2319] space-y-1.5">
                    <div className="font-display font-black text-xs text-[#2D2319] flex items-center space-x-1.5">
                      <Zap className="w-4 h-4 text-[#F6C445]" />
                      <span>Driving School Philosophy</span>
                    </div>
                    <p className="text-[11px] text-[#2D2319]/80">
                      First learn the clutch (Home Row), then the open road (Full Alphabets & Numbers), then highway shortcuts (Developer Syntax & OS Chords). Practice feels like one cohesive arcade desk.
                    </p>
                  </div>
                </div>

                {/* System Specs Micro-Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-mono font-bold">
                  <span className="px-2 py-1 bg-[#FAF3E0] border border-[#2D2319] rounded-lg shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1">
                    <HardDrive className="w-3 h-3 text-[#4BA3E3]" />
                    <span>Local-First SQLite & Storage</span>
                  </span>
                  <span className="px-2 py-1 bg-[#FAF3E0] border border-[#2D2319] rounded-lg shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1">
                    <Cpu className="w-3 h-3 text-[#48B89F]" />
                    <span>Electron v30+ // React 19 // Vite 6</span>
                  </span>
                  <span className="px-2 py-1 bg-[#FAF3E0] border border-[#2D2319] rounded-lg shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1">
                    <Terminal className="w-3 h-3 text-[#C3A6E8]" />
                    <span>60 FPS Vector Canvas Core</span>
                  </span>
                </div>
              </div>

              {/* Other Independent Builds from KSM × Tech */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-[#2D2319] uppercase tracking-wider flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-[#2D2319]" />
                    <span>More Independent Tools from KSM × Tech</span>
                  </h3>
                  <span className="text-[10px] font-mono text-[#2D2319]/70 font-bold">4 Live Projects</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* App 1 */}
                  <div 
                    onClick={() => handleLinkClick('https://github.com/prasadsince1999')}
                    className="bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] hover:shadow-[4px_4px_0px_#2D2319] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-[#4BA3E3]" />
                        <span className="font-display font-black text-xs text-[#2D2319] group-hover:underline">Book Is Your Friend</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#2D2319]/50 group-hover:text-[#2D2319]" />
                    </div>
                    <p className="text-[11px] font-mono text-[#2D2319]/75 leading-relaxed">
                      Personal reading companion, margin note synthesizer, and intellectual growth diary.
                    </p>
                  </div>

                  {/* App 2 */}
                  <div 
                    onClick={() => handleLinkClick('https://github.com/prasadsince1999')}
                    className="bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] hover:shadow-[4px_4px_0px_#2D2319] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Compass className="w-4 h-4 text-[#48B89F]" />
                        <span className="font-display font-black text-xs text-[#2D2319] group-hover:underline">Mārgadarshak</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#2D2319]/50 group-hover:text-[#2D2319]" />
                    </div>
                    <p className="text-[11px] font-mono text-[#2D2319]/75 leading-relaxed">
                      Strategic life navigation, milestone roadmapping, and disciplined decision framework.
                    </p>
                  </div>

                  {/* App 3 */}
                  <div 
                    onClick={() => handleLinkClick('https://github.com/prasadsince1999')}
                    className="bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] hover:shadow-[4px_4px_0px_#2D2319] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-[#F6C445]" />
                        <span className="font-display font-black text-xs text-[#2D2319] group-hover:underline">Krishna as Sarathi</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#2D2319]/50 group-hover:text-[#2D2319]" />
                    </div>
                    <p className="text-[11px] font-mono text-[#2D2319]/75 leading-relaxed">
                      Philosophical companion for calm reflection, moral clarity, and purposeful action.
                    </p>
                  </div>

                  {/* App 4 */}
                  <div 
                    onClick={() => handleLinkClick('https://github.com/prasadsince1999')}
                    className="bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] hover:shadow-[4px_4px_0px_#2D2319] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Layers className="w-4 h-4 text-[#C3A6E8]" />
                        <span className="font-display font-black text-xs text-[#2D2319] group-hover:underline">Teacher-OS</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#2D2319]/50 group-hover:text-[#2D2319]" />
                    </div>
                    <p className="text-[11px] font-mono text-[#2D2319]/75 leading-relaxed">
                      Classroom operating system, curriculum planner, and student mastery evaluator.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: RELEASES & ROADMAP */}
          {/* ========================================================================= */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Community Feedback & Issues Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => handleLinkClick('https://github.com/prasadsince1999/RETROSPEED/issues/new?template=bug_report.md')}
                  className="bg-[#FAF3E0] hover:bg-[#F28B82] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-left space-y-1.5 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bug className="w-4 h-4 text-[#2D2319]" />
                      <span className="font-display font-black text-xs uppercase">Report a Bug</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#2D2319]/60 group-hover:text-[#2D2319]" />
                  </div>
                  <p className="text-[11px] font-mono text-[#2D2319]/80">
                    Found an issue with typing stream, timer, or audio? Open a fast public issue.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleLinkClick('https://github.com/prasadsince1999/RETROSPEED/issues/new?template=feature_request.md')}
                  className="bg-[#FAF3E0] hover:bg-[#48B89F] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-left space-y-1.5 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-[#2D2319]" />
                      <span className="font-display font-black text-xs uppercase">Request a Feature</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#2D2319]/60 group-hover:text-[#2D2319]" />
                  </div>
                  <p className="text-[11px] font-mono text-[#2D2319]/80">
                    Have an idea for a curriculum track, shortcut chord, or workshop drill?
                  </p>
                </button>
              </div>

              {/* Shipped Updates & In-Beta Pipeline */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* Left Column: Shipped Changelog */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold text-[#2D2319] uppercase tracking-wider flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#48B89F]" />
                    <span>Shipped Milestone Releases</span>
                  </h3>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="font-display font-black text-[#2D2319]">v2.0 — 8 Paper-Arcade Games</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#48B89F] text-[9px] font-mono border border-[#2D2319]">SHIPPED</span>
                      </div>
                      <p className="text-[11px] text-[#2D2319]/80">
                        Press Room, Paper Planes, Local Line, Night Market, Drop Chits, Fuse Desk, Pit Lane, and Patch Terminal unified under Neo-Brutalist paper desk.
                      </p>
                    </div>

                    <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="font-display font-black text-[#2D2319]">v1.9.5 — 60 FPS Vector Canvas Engine</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#48B89F] text-[9px] font-mono border border-[#2D2319]">SHIPPED</span>
                      </div>
                      <p className="text-[11px] text-[#2D2319]/80">
                        Standalone lightweight procedural vector render engine without external runtime dependencies.
                      </p>
                    </div>

                    <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="font-display font-black text-[#2D2319]">v1.8.0 — Honest Zero-State Analytics</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#48B89F] text-[9px] font-mono border border-[#2D2319]">SHIPPED</span>
                      </div>
                      <p className="text-[11px] text-[#2D2319]/80">
                        Guaranteed mathematical precision with zero NaN artifacts and per-key accuracy heatmaps.
                      </p>
                    </div>

                    <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="font-display font-black text-[#2D2319]">v1.7.0 — 13-Track Master Curriculum</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#48B89F] text-[9px] font-mono border border-[#2D2319]">SHIPPED</span>
                      </div>
                      <p className="text-[11px] text-[#2D2319]/80">
                        From Home Row foundations to real-world developer syntax across JS, Python, Rust, and SQL.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: In Beta & Coming Soon */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold text-[#2D2319] uppercase tracking-wider flex items-center space-x-1.5">
                    <Code className="w-4 h-4 text-[#F6C445]" />
                    <span>In Beta & Active Pipeline</span>
                  </h3>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="font-display font-black text-[#2D2319]">Shortcut Lab & Chords Kitchen</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#F6C445] text-[9px] font-mono border border-[#2D2319]">IN BETA</span>
                      </div>
                      <p className="text-[11px] text-[#2D2319]/80">
                        Practice rapid OS window management and developer editing chords with live feedback.
                      </p>
                    </div>

                    <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="font-display font-black text-[#2D2319]">Deterministic Simulation Harness</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#F6C445] text-[9px] font-mono border border-[#2D2319]">IN BETA</span>
                      </div>
                      <p className="text-[11px] text-[#2D2319]/80">
                        Headless Vitest harness simulating thousands of gameplay ticks in milliseconds.
                      </p>
                    </div>

                    <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="font-display font-black text-[#2D2319]">Custom File Drill Importer</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#FAF3E0] text-[9px] font-mono border border-[#2D2319]">COMING</span>
                      </div>
                      <p className="text-[11px] text-[#2D2319]/80">
                        Drop any local .txt or .md file onto the desk to generate a custom speed drill instantly.
                      </p>
                    </div>

                    <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="font-display font-black text-[#2D2319]">Ergonomic Dvorak & Colemak</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#FAF3E0] text-[9px] font-mono border border-[#2D2319]">COMING</span>
                      </div>
                      <p className="text-[11px] text-[#2D2319]/80">
                        Visual keyboard heatmaps calibrated for Workman and Colemak-DH layouts.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Public Issues Board Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleLinkClick('https://github.com/prasadsince1999/RETROSPEED/issues')}
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#2D2319] hover:underline cursor-pointer"
                >
                  <span>View Full Public GitHub Roadmap & Issues Board</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: LICENSE & SYSTEM */}
          {/* ========================================================================= */}
          {activeTab === 'license' && (
            <div className="space-y-5 animate-in fade-in">
              
              {/* License Status Hero Card */}
              <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-5 shadow-[4px_4px_0px_#2D2319] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-[#2D2319]/70 uppercase">Current Workshop License Status</div>
                  <div className="text-base sm:text-lg font-black font-display text-[#2D2319] flex items-center space-x-2">
                    <span>{license.badgeText}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-[#2D2319] ${
                      license.isUnlocked ? 'bg-[#48B89F] text-[#2D2319]' : 'bg-[#F6C445] text-[#2D2319]'
                    }`}>
                      {license.isUnlocked ? 'LIFETIME ACTIVE' : 'FREE TIER'}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#2D2319]/75">
                    {license.isUnlocked 
                      ? 'All 13 curriculum tracks, 8 arcade games, and shortcut lab unlocked permanently.'
                      : 'Free always on Parts 1-2, Press Room, Paper Planes, local stats, and shortcut basics.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playKeyClick();
                    if (onOpenUnlockModal) onOpenUnlockModal();
                  }}
                  className="px-4 py-2.5 bg-[#48B89F] hover:bg-[#3ea089] border-2 border-[#2D2319] rounded-xl font-display font-black text-xs sm:text-sm shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer shrink-0 text-[#2D2319]"
                >
                  {license.isUnlocked ? 'View License Details' : '✦ Unlock Full Workshop'}
                </button>
              </div>

              {/* Support & Tip Card */}
              <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl p-5 shadow-[3px_3px_0px_#2D2319] space-y-3">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-[#F28B82] fill-[#F28B82]" />
                  <span className="font-display font-black text-xs sm:text-sm text-[#2D2319]">Support Independent Workshop Development</span>
                </div>
                <p className="text-xs font-mono text-[#2D2319]/80 leading-relaxed">
                  RETROSPEED is completely ad-free and privacy-respecting. If you enjoy practicing here and want to sponsor the maker, you can support on GitHub or contribute a desk tip.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => handleLinkClick('https://github.com/sponsors/prasadsince1999')}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#FAF3E0] hover:bg-[#F6C445] border-2 border-[#2D2319] rounded-xl text-xs font-mono font-bold shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#F28B82]" />
                    <span>Sponsor on GitHub</span>
                    <ExternalLink className="w-3 h-3 text-[#2D2319]/70" />
                  </button>
                </div>
              </div>

              {/* Factory Reset Workshop Data Section */}
              {onOpenResetModal && (
                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-5 shadow-[3px_3px_0px_#2D2319] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-black font-display text-[#2D2319] flex items-center space-x-1.5">
                      <RotateCcw className="w-4 h-4 text-[#F28B82]" />
                      <span>Factory Reset All Workshop Data</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#2D2319]/70">
                      Wipe all lesson completion records, stars, XP, streaks, and restore brand-new state.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playKeyClick();
                      onOpenResetModal();
                    }}
                    className="px-3.5 py-2 bg-[#FAF3E0] hover:bg-[#F28B82] border-2 border-[#2D2319] rounded-xl text-xs font-mono font-bold text-[#F28B82] hover:text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Data...</span>
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="bg-[#FAF3E0] px-5 py-3 border-t-2 border-[#2D2319] flex items-center justify-between shrink-0">
          <div className="text-[11px] font-mono font-bold text-[#2D2319]/70 flex items-center space-x-1.5">
            <span>RETROSPEED OS v2.0</span>
            <span>·</span>
            <span>100% Offline Desk</span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#FAF3E0] hover:bg-[#F6C445] border-2 border-[#2D2319] rounded-xl text-xs font-mono font-black text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
