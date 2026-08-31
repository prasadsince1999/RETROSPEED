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
  Code
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getLicenseStatus, PRICING } from '../utils/license';

export default function AboutModal({
  isOpen,
  onClose,
  userProgress = {},
  onOpenUnlockModal
}) {
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' | 'apps' | 'whatsnew' | 'beta' | 'feedback' | 'license'
  const license = getLicenseStatus(userProgress);

  if (!isOpen) return null;

  const handleLinkClick = (url) => {
    sound.playKeyClick();
    if (window.open) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const TABS = [
    { id: 'studio', label: 'Studio', icon: Sparkles },
    { id: 'apps', label: 'Other Apps', icon: Layers },
    { id: 'whatsnew', label: "What's New", icon: Clock },
    { id: 'beta', label: 'In Beta & Coming', icon: Code },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'license', label: 'License & Support', icon: ShieldCheck }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/70 backdrop-blur-xs select-none">
      <div className="w-full max-w-2xl bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* RETRO TITLEBAR */}
        <div className="px-4 py-3 bg-[#C3A6E8] border-b-2 border-[#2D2319] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FAF3E0] border border-[#2D2319]" />
            <span className="font-mono text-xs font-black tracking-wider text-[#2D2319] uppercase">
              About RETROSPEED // KSM × Tech Studio
            </span>
          </div>
          <button
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="w-6 h-6 rounded bg-[#FAF3E0] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* TAB SELECTOR BAR */}
        <div className="flex overflow-x-auto bg-[#FAF3E0] border-b-2 border-[#2D2319] px-2 pt-2 gap-1 shrink-0">
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
                className={`px-3 py-1.5 rounded-t-lg border-t-2 border-x-2 border-[#2D2319] font-mono text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#FDF8EE] text-[#2D2319] border-b-2 border-b-[#FDF8EE] -mb-[2px] z-10 shadow-[0px_-2px_0px_#2D2319]'
                    : 'bg-[#FAF3E0] hover:bg-white text-[#2D2319]/70 border-b-2 border-b-[#2D2319]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-[#2D2319] flex-1">
          
          {/* TAB 1: STUDIO */}
          {activeTab === 'studio' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-5 shadow-[3px_3px_0px_#2D2319] space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-black font-display text-[#2D2319]">
                    PrasaD at KSM × Tech
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#48B89F] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319]">
                    MAKER
                  </span>
                </div>
                <p className="text-xs text-[#2D2319]/80 font-mono leading-relaxed">
                  RETROSPEED is an independent desktop touch typing workshop built with focus and care. We reject cloud-locked subscriptions, predatory microtransactions, and banner ads that break your concentration.
                </p>
                <p className="text-xs text-[#2D2319]/80 font-mono leading-relaxed">
                  Every line of code is designed to help you go from zero tactile familiarity to effortless touch typing speed, and then into high-efficiency computer shortcut mastery.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#2D2319]/20">
                  <button
                    onClick={() => handleLinkClick('https://ksmxtech.com')}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FDF8EE] hover:bg-[#F6C445] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] text-xs font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>ksmxtech.com</span>
                    <ExternalLink className="w-3 h-3 text-[#2D2319]/70" />
                  </button>

                  <button
                    onClick={() => handleLinkClick('mailto:support@ksmxtech.com')}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FDF8EE] hover:bg-[#4BA3E3] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] text-xs font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>support@ksmxtech.com</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OTHER APPS */}
          {activeTab === 'apps' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="text-xs font-mono font-bold text-[#2D2319]/80 uppercase">
                Other Independent Builds from KSM × Tech:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* App 1 */}
                <div 
                  onClick={() => handleLinkClick('https://github.com/prasadsince1999')}
                  className="bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[3px_3px_0px_#2D2319] cursor-pointer transition-all space-y-1.5"
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-[#4BA3E3]" />
                    <span className="font-display font-black text-xs text-[#2D2319]">Book Is Your Friend</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#2D2319]/75 leading-relaxed">
                    Personal reading companion, margin note synthesizer, and intellectual growth diary.
                  </p>
                </div>

                {/* App 2 */}
                <div 
                  onClick={() => handleLinkClick('https://github.com/prasadsince1999')}
                  className="bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[3px_3px_0px_#2D2319] cursor-pointer transition-all space-y-1.5"
                >
                  <div className="flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-[#48B89F]" />
                    <span className="font-display font-black text-xs text-[#2D2319]">Mārgadarshak</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#2D2319]/75 leading-relaxed">
                    Strategic life navigation, milestone roadmapping, and disciplined decision framework.
                  </p>
                </div>

                {/* App 3 */}
                <div 
                  onClick={() => handleLinkClick('https://github.com/prasadsince1999')}
                  className="bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[3px_3px_0px_#2D2319] cursor-pointer transition-all space-y-1.5"
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#F6C445]" />
                    <span className="font-display font-black text-xs text-[#2D2319]">Krishna as Sarathi</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#2D2319]/75 leading-relaxed">
                    Philosophical companion for calm reflection, moral clarity, and purposeful action.
                  </p>
                </div>

                {/* App 4 */}
                <div 
                  onClick={() => handleLinkClick('https://github.com/prasadsince1999')}
                  className="bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[3px_3px_0px_#2D2319] cursor-pointer transition-all space-y-1.5"
                >
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-[#C3A6E8]" />
                    <span className="font-display font-black text-xs text-[#2D2319]">Teacher-OS</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#2D2319]/75 leading-relaxed">
                    Classroom operating system, curriculum planner, and student mastery evaluator.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: WHAT'S NEW */}
          {activeTab === 'whatsnew' && (
            <div className="space-y-3.5 animate-in fade-in">
              <div className="text-xs font-mono font-bold text-[#2D2319]/80 uppercase">
                Last 5 Shipped Updates:
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="font-display font-black">v2.0 — The 8 Paper-Arcade Workshop Games</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#48B89F] text-[9px] font-mono border border-[#2D2319]">SHIPPED</span>
                  </div>
                  <p className="font-mono text-[11px] text-[#2D2319]/80">
                    Press Room, Paper Planes, Local Line, Night Market, Drop Chits, Fuse Desk, Pit Lane, and Patch Terminal unified under Neo-Brutalist paper desk.
                  </p>
                </div>

                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="font-display font-black">v1.9.5 — 60 FPS Canvas Animation Core</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#48B89F] text-[9px] font-mono border border-[#2D2319]">SHIPPED</span>
                  </div>
                  <p className="font-mono text-[11px] text-[#2D2319]/80">
                    Standalone lightweight procedural vector render engine without external runtime dependencies.
                  </p>
                </div>

                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="font-display font-black">v1.9.0 — Auto Pause-on-Blur Safety</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#48B89F] text-[9px] font-mono border border-[#2D2319]">SHIPPED</span>
                  </div>
                  <p className="font-mono text-[11px] text-[#2D2319]/80">
                    Game engines pause immediately on window unfocus or tab switch to prevent unfair penalty hits.
                  </p>
                </div>

                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="font-display font-black">v1.8.0 — Honest Zero-State Analytics</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#48B89F] text-[9px] font-mono border border-[#2D2319]">SHIPPED</span>
                  </div>
                  <p className="font-mono text-[11px] text-[#2D2319]/80">
                    Guaranteed mathematical precision with zero NaN artifacts and per-key accuracy heatmaps.
                  </p>
                </div>

                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="font-display font-black">v1.7.0 — 13-Track Master Curriculum</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#48B89F] text-[9px] font-mono border border-[#2D2319]">SHIPPED</span>
                  </div>
                  <p className="font-mono text-[11px] text-[#2D2319]/80">
                    From Home Row foundations to real-world developer syntax across JS, Python, Rust, and SQL.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: IN BETA & COMING SOON */}
          {activeTab === 'beta' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-[#2D2319]/80 uppercase">
                  Currently in the Build (Beta):
                </div>
                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[2px_2px_0px_#2D2319] space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#F6C445] text-[#2D2319] text-[9px] font-mono font-bold border border-[#2D2319]">
                      BETA
                    </span>
                    <span className="font-display font-black text-xs text-[#2D2319]">Shortcut Lab & Chords Kitchen</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#2D2319]/80">
                    Practice rapid OS window management and developer editing chords with live feedback.
                  </p>
                </div>
                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3.5 shadow-[2px_2px_0px_#2D2319] space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#F6C445] text-[#2D2319] text-[9px] font-mono font-bold border border-[#2D2319]">
                      BETA
                    </span>
                    <span className="font-display font-black text-xs text-[#2D2319]">Deterministic Simulation Harness</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#2D2319]/80">
                    Headless Vitest harness simulating thousands of gameplay ticks in milliseconds.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#2D2319]/20">
                <div className="text-xs font-mono font-bold text-[#2D2319]/80 uppercase">
                  Coming Soon (Honest Pipeline):
                </div>
                <div className="bg-white border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                  <div className="font-display font-black text-xs text-[#2D2319]">1. Custom Text Importer</div>
                  <p className="text-[11px] font-mono text-[#2D2319]/75">
                    Drop any local .txt or .md file onto the desk to generate a custom speed drill instantly.
                  </p>
                </div>
                <div className="bg-white border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-1">
                  <div className="font-display font-black text-xs text-[#2D2319]">2. Multi-Layout Ergonomics</div>
                  <p className="text-[11px] font-mono text-[#2D2319]/75">
                    Visual keyboard heatmaps calibrated for Workman and Colemak-DH layouts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] space-y-2">
                <div className="font-display font-black text-sm text-[#2D2319]">
                  Community Feedback & Issue Tracker
                </div>
                <p className="text-xs font-mono text-[#2D2319]/80 leading-relaxed">
                  We use an open public board so you can report bugs, suggest features, and vote on what gets built next.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleLinkClick('https://github.com/prasadsince1999/RETROSPEED/issues/new?template=bug_report.md')}
                  className="bg-[#FDF8EE] hover:bg-[#F28B82] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-left space-y-2 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <Bug className="w-5 h-5 text-[#2D2319]" />
                    <span className="font-display font-black text-xs uppercase">Report a Bug</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#2D2319]/80">
                    Found an issue with typing stream, timer, or audio? Open a quick issue.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleLinkClick('https://github.com/prasadsince1999/RETROSPEED/issues/new?template=feature_request.md')}
                  className="bg-[#FDF8EE] hover:bg-[#48B89F] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-left space-y-2 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-[#2D2319]" />
                    <span className="font-display font-black text-xs uppercase">Request a Feature</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#2D2319]/80">
                    Have an idea for a curriculum track, shortcut chord, or workshop drill?
                  </p>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleLinkClick('https://github.com/prasadsince1999/RETROSPEED/issues')}
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#2D2319] hover:underline"
                >
                  <span>View Public Roadmap & Issues Board</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: LICENSE & SUPPORT */}
          {activeTab === 'license' && (
            <div className="space-y-4 animate-in fade-in">
              
              {/* Status Card */}
              <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#2D2319]/70 uppercase">Current Workshop License</div>
                  <div className="text-sm font-black font-display text-[#2D2319]">{license.badgeText}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playKeyClick();
                    if (onOpenUnlockModal) onOpenUnlockModal();
                  }}
                  className="px-3 py-1.5 bg-[#48B89F] hover:bg-[#3ea089] border-2 border-[#2D2319] rounded-lg font-display font-black text-xs shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  {license.isUnlocked ? 'View License' : 'Unlock Now'}
                </button>
              </div>

              {/* Support the Desk Section */}
              <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] space-y-2">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-[#F28B82] fill-[#F28B82]" />
                  <span className="font-display font-black text-xs text-[#2D2319]">Support the Workshop Desk</span>
                </div>
                <p className="text-xs font-mono text-[#2D2319]/80 leading-relaxed">
                  RETROSPEED is completely ad-free. If you enjoy practicing here and want to support continued development, you can sponsor the maker on GitHub or contribute a small desk tip.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleLinkClick('https://github.com/sponsors/prasadsince1999')}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#FAF3E0] hover:bg-[#F6C445] border-2 border-[#2D2319] rounded-lg text-xs font-bold shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#F28B82]" />
                    <span>Sponsor on GitHub</span>
                    <ExternalLink className="w-3 h-3 text-[#2D2319]/70" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
