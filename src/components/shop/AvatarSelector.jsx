import React from 'react';
import { PLAYER_AVATARS } from '../../utils/storage';

export function AvatarSelector({ selectedAvatarId, onSelectAvatar }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {PLAYER_AVATARS.map(av => {
        const isSelected = selectedAvatarId === av.id;
        return (
          <div
            key={av.id}
            onClick={() => onSelectAvatar(av.id)}
            className={`p-4 rounded-2xl border-2 border-[#2D2319] flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all ${
              isSelected 
                ? 'bg-[#F6C445] shadow-[4px_4px_0px_#2D2319] -translate-y-0.5' 
                : 'bg-[#FAF3E0] hover:bg-white shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
            }`}
          >
            <div 
              className="w-14 h-14 rounded-2xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-3xl"
              style={{ backgroundColor: av.bg }}
            >
              {av.icon}
            </div>
            <div className="text-center">
              <div className="font-display font-black text-xs text-[#2D2319] truncate">{av.name}</div>
              <div className="text-[10px] font-mono text-[#2D2319]/70">Retro Persona</div>
            </div>
            {isSelected && (
              <span className="px-2 py-0.5 bg-[#2D2319] text-white text-[9px] font-mono font-bold rounded-md">
                ACTIVE
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
