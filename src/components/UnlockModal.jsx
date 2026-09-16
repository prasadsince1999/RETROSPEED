import React from 'react';
import { 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Play
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function UnlockModal({
  isOpen,
  onClose,
  userProgress = {},
  onLicenseUpdated
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/70 backdrop-blur-xs select-none modal-backdrop-animate">
      <div className="w-full max-w-lg bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden flex flex-col max-h-[90vh] modal-window-animate">
        
        {/* RETRO TITLEBAR */}
        <div className="px-4 py-3 bg-[#48B89F] border-b-2 border-[#2D2319] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FAF3E0] border border-[#2D2319]" />
            <span className="font-mono text-xs font-black tracking-wider text-[#2D2319] uppercase">
              RETROSPEED // 100% FREE EDITION
            </span>
          </div>
          <button
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="w-6 h-6 rounded bg-[#FAF3E0] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs font-bold cursor-pointer"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* BODY CONTENT */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#2D2319]">
          
          {/* Header Banner */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#C3A6E8] border-2 border-[#2D2319] rounded-full text-xs font-black uppercase shadow-[2px_2px_0px_#2D2319]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free & Unlocked For Everyone</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#2D2319]">
              Everything Is 100% Free
            </h2>
            <p className="text-xs sm:text-sm text-[#2D2319]/80 font-mono">
              All 8 arcade games, 13 curriculum tracks, and shortcut labs are completely open.
            </p>
          </div>

          {/* Feature Inclusions */}
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start space-x-2 bg-white border border-[#2D2319] rounded-lg p-2.5">
                <Check className="w-4 h-4 text-[#48B89F] shrink-0 mt-0.5" />
                <span><strong>All Odyssey Parts</strong> (Zero to Hero)</span>
              </div>
              <div className="flex items-start space-x-2 bg-white border border-[#2D2319] rounded-lg p-2.5">
                <Check className="w-4 h-4 text-[#48B89F] shrink-0 mt-0.5" />
                <span><strong>All 8 Arcade Games</strong> (Full Access)</span>
              </div>
              <div className="flex items-start space-x-2 bg-white border border-[#2D2319] rounded-lg p-2.5">
                <Check className="w-4 h-4 text-[#48B89F] shrink-0 mt-0.5" />
                <span><strong>Complete Shortcut Lab</strong></span>
              </div>
              <div className="flex items-start space-x-2 bg-white border border-[#2D2319] rounded-lg p-2.5">
                <Check className="w-4 h-4 text-[#48B89F] shrink-0 mt-0.5" />
                <span><strong>Zero Ads & Subscriptions</strong></span>
              </div>
            </div>
          </div>

          {/* Ethics Note */}
          <div className="bg-[#FAF3E0] border border-[#2D2319] rounded-xl p-3 text-[11px] font-mono text-[#2D2319]/80 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-[#2D2319]">
              <ShieldCheck className="w-4 h-4 text-[#48B89F]" />
              <span>Zero Paywalls Guarantee:</span>
            </div>
            <p>
              No payment required. No subscriptions. No ads. All practice data stays locally in your browser.
            </p>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="w-full py-3 bg-[#F6C445] hover:bg-[#48B89F] text-[#2D2319] font-display font-black text-sm uppercase rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Playing Now</span>
          </button>

        </div>

      </div>
    </div>
  );
}
