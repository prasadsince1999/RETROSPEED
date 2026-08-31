import React from 'react';
import { getKeysForLayout, getKeyForChar, isShiftChar } from '../data/keyboardLayout';
import Key from './Key';

export default function VirtualKeyboard({ 
  activeChar, 
  pressedKeyId, 
  errorKeyId,
  layout = 'qwerty',
  theme = 'bone' 
}) {
  const keys = getKeysForLayout(layout);
  const activeKeyDef = getKeyForChar(activeChar, layout);
  const isShiftRequired = isShiftChar(activeChar, layout);
  const requiredShiftId = isShiftRequired && activeKeyDef
    ? (activeKeyDef.hand === 'left' ? 'shift-right' : 'shift-left')
    : null;

  // Theme styling rules
  const isJungle = theme === 'jungle';
  const isCyber = theme === 'cyber';

  const boardBg = isCyber ? '#0f172a' : isJungle ? '#1e3a2b' : '#f8fafc';
  const boardBorder = isCyber ? '#334155' : isJungle ? '#2d5a3e' : '#e2e8f0';
  const keyDefaultFill = isCyber ? '#1e293b' : isJungle ? '#244733' : '#ffffff';
  const keyDefaultStroke = isCyber ? '#475569' : isJungle ? '#386c4e' : '#cbd5e1';
  const textDefaultFill = isCyber ? '#94a3b8' : isJungle ? '#a7f3d0' : '#475569';

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-2">
      <div 
        className="w-full max-w-[700px] p-3 rounded-lg shadow-sm border transition-colors duration-300"
        style={{ backgroundColor: boardBg, borderColor: boardBorder }}
      >
        <svg 
          viewBox="0 0 683.3 254" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-sm"
        >
          {/* Key Outlines Layer */}
          <g id="keys">
            {keys.map(key => (
              <Key
                key={key.id}
                keyDef={key}
                isActive={activeKeyDef && activeKeyDef.id === key.id}
                isShiftGuide={requiredShiftId === key.id}
                isPressed={pressedKeyId === key.id}
                isError={errorKeyId === key.id}
                isShiftRequired={isShiftRequired}
                fill={keyDefaultFill}
                stroke={keyDefaultStroke}
                textFill={textDefaultFill}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
