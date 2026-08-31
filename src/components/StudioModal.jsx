// KSM × Tech Studio Shelf Modal
// Three quiet, honest blocks: Maker, Share RETROSPEED, Other Studio Builds.
import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  Heart,
  Share2,
  Star,
  Globe,
  Mail,
  BookOpen,
  Compass,
  Sparkles,
  Layers
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function StudioModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyShare = () => {
    if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
    const shareText = 'RETROSPEED — race your fingers. Offline typing + arcade. Free. https://github.com/prasadsince1999/RETROSPEED';
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLinkClick = (url) => {
    if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
    if (window.open) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/70 backdrop-blur-xs select-none">
      <div 
        className="w-full max-w-2xl bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* RETRO TITLEBAR */}
        <div className="px-4 py-3 bg-[#C3A6E8] border-b-2 border-[#2D2319] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FAF3E0] border border-[#2D2319]" />
            <span className="font-mono text-xs font-black tracking-wider text-[#2D2319] uppercase">
              KSM × Tech Studio Shelf // PrasaD
            </span>
          </div>
          <button
            onClick={() => {
              if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
              onClose();
            }}
            className="w-6 h-6 rounded bg-[#FAF3E0] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-[#2D2319]">
          
          {/* BLOCK 1: MAKER & STATEMENT */}
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-4 sm:p-5 shadow-[3px_3px_0px_#2D2319]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-black font-display text-[#2D2319]">
                    PrasaD at KSM × Tech
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#48B89F] text-[#2D2319] font-mono text-[9px] font-bold border border-[#2D2319]">
                    STUDIO
                  </span>
                </div>
                <p className="text-xs text-[#2D2319]/80 font-mono mt-1 leading-relaxed">
                  Built by PrasaD at KSM × Tech, India. Offline typing first. No account required. Family-built tools for clear next steps.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#2D2319]/20">
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

              <button
                onClick={() => handleLinkClick('https://github.com/prasadsince1999/RETROSPEED')}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FDF8EE] hover:bg-[#C3A6E8] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] text-xs font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <Star className="w-3.5 h-3.5 text-[#F6C445] fill-[#F6C445]" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-[#2D2319]/70" />
              </button>
            </div>
          </div>

          {/* BLOCK 2: SHARE RETROSPEED */}
          <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-4 sm:p-5 shadow-[3px_3px_0px_#2D2319]">
            <div className="flex items-center space-x-2 mb-2">
              <Share2 className="w-4 h-4 text-[#4BA3E3]" />
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[#2D2319]">
                Share RETROSPEED
              </h3>
            </div>
            
            <p className="text-xs font-mono text-[#2D2319]/80 mb-3">
              One line to share with friends, students, or colleagues:
            </p>

            <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-lg p-3 flex items-center justify-between gap-3 shadow-[2px_2px_0px_#2D2319]">
              <span className="font-mono text-xs font-bold text-[#2D2319] select-all truncate">
                RETROSPEED — race your fingers. Offline typing + arcade. Free.
              </span>
              <button
                onClick={handleCopyShare}
                className="px-3 py-1.5 rounded-lg bg-[#F6C445] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold text-[#2D2319] shrink-0 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* BLOCK 3: OTHER BUILDS FROM THE STUDIO */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Layers className="w-4 h-4 text-[#F6C445]" />
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[#2D2319]">
                Other Builds from KSM × Tech
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Build 1: Book Is Your Friend */}
              <div 
                onClick={() => handleLinkClick('https://ksmxtech.com/byf')}
                className="p-3.5 bg-[#FAF3E0] hover:bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[3px_3px_0px_#2D2319] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-[#4BA3E3]" />
                      <span className="font-bold text-xs text-[#2D2319] font-display">Book Is Your Friend</span>
                    </div>
                    <span className="px-1.5 py-0.2 rounded bg-[#48B89F] text-[#2D2319] font-mono text-[9px] font-bold border border-[#2D2319]">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-[#2D2319]/80 font-mono">
                    Right book for the feeling, now. Bibliotherapy audio summaries.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#2D2319]/15 flex items-center justify-between text-[10px] font-mono font-bold text-[#4BA3E3]">
                  <span>ksmxtech.com/byf</span>
                  <ExternalLink className="w-3 h-3 text-[#2D2319]" />
                </div>
              </div>

              {/* Build 2: Mārgadarshak */}
              <div 
                onClick={() => handleLinkClick('https://ksmxtech.com/margadarshak')}
                className="p-3.5 bg-[#FAF3E0] hover:bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[3px_3px_0px_#2D2319] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <Compass className="w-4 h-4 text-[#F6C445]" />
                      <span className="font-bold text-xs text-[#2D2319] font-display">Mārgadarshak</span>
                    </div>
                    <span className="px-1.5 py-0.2 rounded bg-[#48B89F] text-[#2D2319] font-mono text-[9px] font-bold border border-[#2D2319]">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-[#2D2319]/80 font-mono">
                    Clear path for Indian student stages & transparent admissions.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#2D2319]/15 flex items-center justify-between text-[10px] font-mono font-bold text-[#F6C445]">
                  <span>ksmxtech.com/margadarshak</span>
                  <ExternalLink className="w-3 h-3 text-[#2D2319]" />
                </div>
              </div>

              {/* Build 3: Krishna as Sarathi */}
              <div 
                onClick={() => handleLinkClick('https://ksmxtech.com/krishna-as-sarathi')}
                className="p-3.5 bg-[#FAF3E0] hover:bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[3px_3px_0px_#2D2319] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#C3A6E8]" />
                      <span className="font-bold text-xs text-[#2D2319] font-display">Krishna as Sarathi</span>
                    </div>
                    <span className="px-1.5 py-0.2 rounded bg-[#48B89F] text-[#2D2319] font-mono text-[9px] font-bold border border-[#2D2319]">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-[#2D2319]/80 font-mono">
                    Heavy mind. One honest, situation-aware ethical next step.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#2D2319]/15 flex items-center justify-between text-[10px] font-mono font-bold text-[#C3A6E8]">
                  <span>ksmxtech.com/krishna-as-sarathi</span>
                  <ExternalLink className="w-3 h-3 text-[#2D2319]" />
                </div>
              </div>

              {/* Build 4: Teacher-OS */}
              <div 
                onClick={() => handleLinkClick('https://github.com/prasadsince1999')}
                className="p-3.5 bg-[#FAF3E0] hover:bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl shadow-[3px_3px_0px_#2D2319] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 group flex flex-col justify-between opacity-90"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-[#F28B82]" />
                      <span className="font-bold text-xs text-[#2D2319] font-display">Teacher-OS</span>
                    </div>
                    <span className="px-1.5 py-0.2 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[9px] font-bold border border-[#2D2319]">
                      COMING SOON
                    </span>
                  </div>
                  <p className="text-[11px] text-[#2D2319]/80 font-mono">
                    A smart, local-first operating book and lesson toolkit for teachers.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#2D2319]/15 flex items-center justify-between text-[10px] font-mono font-bold text-[#F28B82]">
                  <span>GitHub when ready</span>
                  <ExternalLink className="w-3 h-3 text-[#2D2319]" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* FOOTER ACTION */}
        <div className="px-5 py-3 bg-[#FAF3E0] border-t-2 border-[#2D2319] flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#2D2319]/70 font-bold">
            KSM × Tech Studio · 100% Offline & Open
          </span>
          <button
            onClick={() => {
              if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-[#F6C445] hover:bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] text-xs font-mono font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Close Shelf
          </button>
        </div>

      </div>
    </div>
  );
}
