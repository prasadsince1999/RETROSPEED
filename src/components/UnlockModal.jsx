import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Key, 
  Zap, 
  Trophy, 
  Layers, 
  ExternalLink 
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getLicenseStatus, startTrial, activateFullUnlock, PRICING } from '../utils/license';

export default function UnlockModal({
  isOpen,
  onClose,
  userProgress = {},
  onLicenseUpdated
}) {
  const [unlockedSuccess, setUnlockedSuccess] = useState(false);

  if (!isOpen) return null;

  const license = getLicenseStatus(userProgress);

  const handleStartTrial = () => {
    sound.playLevelComplete();
    const updated = startTrial(userProgress, 30);
    if (onLicenseUpdated) onLicenseUpdated(updated);
  };

  const handlePurchaseUnlock = () => {
    sound.playLevelComplete();
    const updated = activateFullUnlock(userProgress, 'MS_STORE_DURABLE_IAP');
    if (onLicenseUpdated) onLicenseUpdated(updated);
    setUnlockedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/70 backdrop-blur-xs select-none modal-backdrop-animate">
      <div className="w-full max-w-xl bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden flex flex-col max-h-[90vh] modal-window-animate">
        
        {/* RETRO TITLEBAR */}
        <div className="px-4 py-3 bg-[#F6C445] border-b-2 border-[#2D2319] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FAF3E0] border border-[#2D2319]" />
            <span className="font-mono text-xs font-black tracking-wider text-[#2D2319] uppercase">
              RETROSPEED License // One-Time Unlock
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

        {/* BODY CONTENT */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#2D2319]">
          
          {/* Header Banner */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#C3A6E8] border-2 border-[#2D2319] rounded-full text-xs font-black uppercase shadow-[2px_2px_0px_#2D2319]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Durable Desktop License</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#2D2319]">
              Unlock Full Edition
            </h2>
            <p className="text-xs sm:text-sm text-[#2D2319]/80 font-mono">
              ₹899 in India ($9.99 International) • One single purchase for life.
            </p>
          </div>

          {/* Current Status Pill */}
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3.5 flex items-center justify-between shadow-[2px_2px_0px_#2D2319]">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#2D2319]/70 uppercase">
                Current Status
              </div>
              <div className="text-xs font-black text-[#2D2319]">
                {license.badgeText}
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-lg border border-[#2D2319] text-xs font-mono font-bold ${
              license.isUnlocked ? 'bg-[#48B89F] text-[#2D2319]' : 'bg-[#F28B82] text-white'
            }`}>
              {license.tierLabel}
            </span>
          </div>

          {/* What is Included Grid */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono font-bold text-[#2D2319] uppercase tracking-wider">
              What Lifetime Unlock Unlocks:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start space-x-2 bg-white border border-[#2D2319] rounded-lg p-2.5">
                <Check className="w-4 h-4 text-[#48B89F] shrink-0 mt-0.5" />
                <span><strong>Parts 3–8 Spine</strong> (Complete Zero-to-Hero Journey)</span>
              </div>
              <div className="flex items-start space-x-2 bg-white border border-[#2D2319] rounded-lg p-2.5">
                <Check className="w-4 h-4 text-[#48B89F] shrink-0 mt-0.5" />
                <span><strong>All 8 Arcade Games</strong> (Local Line, Pit Lane, etc.)</span>
              </div>
              <div className="flex items-start space-x-2 bg-white border border-[#2D2319] rounded-lg p-2.5">
                <Check className="w-4 h-4 text-[#48B89F] shrink-0 mt-0.5" />
                <span><strong>Full Shortcut Lab</strong> (OS chords & IDE navigation)</span>
              </div>
              <div className="flex items-start space-x-2 bg-white border border-[#2D2319] rounded-lg p-2.5">
                <Check className="w-4 h-4 text-[#48B89F] shrink-0 mt-0.5" />
                <span><strong>13 Curriculum Tracks</strong> (700+ exercises)</span>
              </div>
            </div>
          </div>

          {/* Ethical Commitment Note */}
          <div className="bg-[#FAF3E0] border border-[#2D2319] rounded-xl p-3 text-[11px] font-mono text-[#2D2319]/80 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-[#2D2319]">
              <ShieldCheck className="w-4 h-4 text-[#48B89F]" />
              <span>Honest Model Guarantee:</span>
            </div>
            <p>
              Zero subscriptions. Zero in-app ads. Zero cloud account requirements. All practice records and telemetry remain 100% offline on your device forever.
            </p>
          </div>

          {/* Action Buttons */}
          {license.status === 'full' || unlockedSuccess ? (
            <div className="p-4 bg-[#48B89F]/20 border-2 border-[#48B89F] rounded-xl text-center space-y-1">
              <div className="font-display font-black text-sm text-[#2D2319]">
                ✓ Fully Unlocked!
              </div>
              <p className="text-xs font-mono text-[#2D2319]/80">
                You have permanent lifetime access to all current and future tracks and games.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handlePurchaseUnlock}
                className="w-full py-3 bg-[#48B89F] hover:bg-[#3ea089] text-[#2D2319] font-display font-black text-sm uppercase rounded-xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Key className="w-4 h-4" />
                <span>Unlock Full Edition — ₹899 / $9.99</span>
              </button>

              {!userProgress.license?.trialStartedAt && (
                <button
                  type="button"
                  onClick={handleStartTrial}
                  className="w-full py-2 bg-[#FDF8EE] hover:bg-[#FAF3E0] text-[#2D2319] font-mono font-bold text-xs rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#F6C445]" />
                  <span>Start Store 30-Day Free Full Preview</span>
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
