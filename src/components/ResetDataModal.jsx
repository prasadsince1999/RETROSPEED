import React from 'react';
import { AlertTriangle, RotateCcw, ShieldAlert, Check, X } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ResetDataModal({
  isOpen,
  onClose,
  onConfirmReset
}) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    sound.playKeyClick();
    if (onConfirmReset) {
      onConfirmReset();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2D2319]/60 backdrop-blur-[1px] animate-in fade-in duration-150 font-sans select-none">
      
      {/* Modal Dialog Box */}
      <div className="w-full max-w-md bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Titlebar: Solid Coral (#F28B82) */}
        <div className="bg-[#F28B82] text-[#2D2319] px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between font-mono font-bold text-xs sm:text-sm select-none">
          <div className="flex items-center space-x-2">
            <span>✦</span>
            <span className="font-display font-black uppercase tracking-wider">FACTORY_RESET.EXE // WIPE DATA</span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="w-5 h-5 bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded flex items-center justify-center text-xs font-mono font-black shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 bg-[#FDF8EE]">
          
          {/* Warning Icon Banner */}
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F28B82] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center text-[#2D2319] shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-black text-sm text-[#2D2319]">
                Reset All Progress?
              </div>
              <p className="text-xs text-[#2D2319]/80 font-mono mt-1 leading-relaxed">
                This will erase all progress, completed drills, high scores, accuracy heatmaps, and custom player profile settings.
              </p>
            </div>
          </div>

          {/* Bullet Breakdown */}
          <div className="bg-[#FDF8EE] border border-[#2D2319]/20 rounded-xl p-3 text-xs font-mono text-[#2D2319]/90 space-y-1.5">
            <div className="font-bold text-[11px] uppercase tracking-wider text-[#F28B82] mb-1">
              ✦ The following will be reset:
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#F28B82]">•</span>
              <span>All lesson completions, stars, and XP points (Lv.1 reset)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#F28B82]">•</span>
              <span>Daily challenge history and streak counters</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#F28B82]">•</span>
              <span>Keystroke error logs and keyboard heatmap telemetry</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#F28B82]">•</span>
              <span>Custom player display name and avatar selection</span>
            </div>
          </div>

          <p className="text-[11px] font-mono text-[#2D2319]/70 italic text-center">
            Your application will restart freshly with all default curriculum tracks.
          </p>

        </div>

        {/* Action Buttons Footer */}
        <div className="bg-[#FAF3E0] px-4 py-3 border-t-2 border-[#2D2319] flex items-center justify-end space-x-2.5">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#FDF8EE] hover:bg-white border-2 border-[#2D2319] rounded-xl text-xs font-mono font-bold text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-1.5 bg-[#F28B82] hover:bg-[#eb746a] border-2 border-[#2D2319] rounded-xl text-xs font-display font-black text-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Yes, Reset Everything</span>
          </button>
        </div>

      </div>

    </div>
  );
}
