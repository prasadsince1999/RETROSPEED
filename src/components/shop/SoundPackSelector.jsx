import React, { useState } from 'react';
import { Volume2, Headphones, Keyboard } from 'lucide-react';
import { sound } from '../../utils/audio';

export const KEYCAP_SOUND_PACKS = [
  {
    id: 'cherry-blue',
    name: 'Cherry MX Blue (Clicky)',
    description: 'Crisp, tactile, satisfying acoustic snap with instant key actuation feedback.',
    tag: 'Mechanical'
  },
  {
    id: 'gateron-brown',
    name: 'Gateron Brown (Tactile)',
    description: 'Smooth tactile bump with dampened low-frequency bottom-out acoustic profile.',
    tag: 'Silent Tactile'
  },
  {
    id: 'ibm-model-m',
    name: 'Vintage IBM Model M',
    description: 'Legendary heavy buckling spring clack from the 1980s computing era.',
    tag: 'Vintage Spring'
  },
  {
    id: 'thocky',
    name: 'Thocky Lubed Linear',
    description: 'Deep, marbly acoustic thock on premium POM stem switches.',
    tag: 'Custom Keyboard'
  },
  {
    id: 'chiptune',
    name: '8-Bit Chiptune Arcade',
    description: 'Retro 8-bit blips and synthesized frequency chirps for nostalgic gaming.',
    tag: 'Arcade Synth'
  }
];

export function SoundPackSelector({ currentSoundPack, onSelectSoundPack }) {
  const [pressedKey, setPressedKey] = useState(null);
  const [testInput, setTestInput] = useState('');

  const triggerTestSound = (packId = currentSoundPack, keyName = 'Key') => {
    sound.playKeyClick(packId);
    setPressedKey(keyName);
    setTimeout(() => setPressedKey(null), 150);
  };

  return (
    <div className="space-y-4">
      {/* Live Keyboard Audio Audition Desk */}
      <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#2D2319] bg-[#FAF3E0] shadow-[4px_4px_0px_#2D2319] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#2D2319]/15 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#F6C445] border-2 border-[#2D2319] flex items-center justify-center text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-black text-sm text-[#2D2319]">Keycap Audio Audition Desk</h3>
              <p className="text-[11px] font-mono text-[#2D2319]/70">
                Type on your keyboard or tap the test keycaps below to audition switch acoustics
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] font-mono text-[#2D2319]/60 font-bold">ACTIVE SWITCH:</span>
            <span className="px-2.5 py-1 bg-[#C7E8CA] border-2 border-[#2D2319] rounded-lg text-xs font-mono font-black text-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              <span>{KEYCAP_SOUND_PACKS.find(p => p.id === currentSoundPack)?.name}</span>
            </span>
          </div>
        </div>

        {/* Quick Switch Audition Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] font-mono font-bold text-[#2D2319]/60 mr-1">SWITCH:</span>
          {KEYCAP_SOUND_PACKS.map(pack => {
            const isCur = currentSoundPack === pack.id;
            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => onSelectSoundPack(pack.id)}
                className={`px-2.5 py-1 rounded-lg border-2 border-[#2D2319] text-xs font-mono font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  isCur 
                    ? 'bg-[#F6C445] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] -translate-y-0.5' 
                    : 'bg-[#FDF8EE] hover:bg-white text-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <span>{pack.name.split(' (')[0]}</span>
                {isCur && <span className="w-1.5 h-1.5 rounded-full bg-[#2D2319]" />}
              </button>
            );
          })}
        </div>

        {/* Interactive Typewriter Testing Input */}
        <div className="space-y-2 pt-1">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D2319]/40 pointer-events-none">
              <Keyboard className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              onKeyDown={(e) => {
                triggerTestSound(currentSoundPack, e.key.toUpperCase());
              }}
              placeholder="Click here and press keys on your physical keyboard to listen..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl text-xs font-mono font-bold text-[#2D2319] shadow-[2px_2px_0px_#2D2319] placeholder:text-[#2D2319]/40 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#2D2319]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-mono font-bold text-[#2D2319]/60">TRY TAPPING:</span>
            {['A', 'S', 'D', 'F', 'SPACE', 'ENTER'].map(k => {
              const isDown = pressedKey === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => triggerTestSound(currentSoundPack, k)}
                  className={`px-3 py-1.5 rounded-lg border-2 border-[#2D2319] font-mono font-black text-xs transition-all cursor-pointer ${
                    isDown 
                      ? 'bg-[#F6C445] text-[#2D2319] translate-x-0.5 translate-y-0.5 shadow-none' 
                      : 'bg-[#FDF8EE] hover:bg-white text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                  }`}
                >
                  [ {k} ]
                </button>
              );
            })}
            {testInput && (
              <button
                type="button"
                onClick={() => setTestInput('')}
                className="ml-auto text-[10px] font-mono text-[#F28B82] hover:underline cursor-pointer"
              >
                Clear text
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sound Pack Catalog Cards */}
      <div className="space-y-3">
        {KEYCAP_SOUND_PACKS.map(pack => {
          const isActive = currentSoundPack === pack.id;
          return (
            <div
              key={pack.id}
              onClick={() => onSelectSoundPack(pack.id)}
              className={`p-4 rounded-2xl border-2 border-[#2D2319] cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isActive 
                  ? 'bg-[#C7E8CA] shadow-[4px_4px_0px_#2D2319]' 
                  : 'bg-[#FAF3E0] hover:bg-white shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-[#2D2319]" />
                  <span className="font-display font-black text-sm text-[#2D2319]">{pack.name}</span>
                  <span className="px-2 py-0.2 rounded bg-[#FDF8EE] border border-[#2D2319] text-[10px] font-mono font-bold text-[#2D2319]">
                    {pack.tag}
                  </span>
                </div>
                <p className="text-xs text-[#2D2319]/80 font-medium max-w-xl">
                  {pack.description}
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerTestSound(pack.id, pack.name);
                  }}
                  className="px-3.5 py-1.5 bg-[#FDF8EE] hover:bg-white border-2 border-[#2D2319] rounded-xl text-xs font-mono font-black text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center space-x-1"
                  title={`Listen to ${pack.name}`}
                >
                  <span>🔊</span>
                  <span>Listen Sample</span>
                </button>
                {isActive && (
                  <span className="px-3 py-1.5 bg-[#48B89F] text-white border-2 border-[#2D2319] rounded-xl text-xs font-display font-black shadow-[1px_1px_0px_#2D2319]">
                    EQUIPPED
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
