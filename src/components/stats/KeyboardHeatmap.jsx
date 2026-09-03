import React from 'react';
import { ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

export function KeyboardHeatmap({
  layoutKeys,
  keyAccuracyMap,
  keyTierCounts,
  selectedKey,
  normalizedSelectedKey,
  activeKeyData,
  activeKeyFinger,
  onSelectKey,
  onPracticeKey
}) {
  return (
    <div className="border-2 border-[#2D2319] bg-[var(--rs-paper)] rounded-xl shadow-[4px_4px_0px_var(--rs-shadow)] p-5 sm:p-6 text-[#2D2319] transition-colors duration-200">
      {/* Section Header with Solid Tiers Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#2D2319]/15 pb-4 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base sm:text-lg font-black text-[#2D2319] tracking-tight font-display">
              Interactive Keyboard Accuracy Heatmap
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#10B981] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              Click Any Key
            </span>
          </div>
          <p className="text-xs text-[#2D2319]/70 mt-0.5 font-mono">
            Solid color diagnostic keycaps across desktop keyboard layout. Hover or click to inspect hit/miss metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold font-mono">
          <div className="flex items-center space-x-1.5 bg-[#10B981] text-[#2D2319] px-2.5 py-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D2319]" />
            <span>&gt;95% Mastered ({keyTierCounts.emerald})</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#F59E0B] text-[#2D2319] px-2.5 py-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D2319]" />
            <span>85-94% Good ({keyTierCounts.amber})</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#EF4444] text-[#2D2319] px-2.5 py-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D2319]" />
            <span>&lt;85% Needs Work ({keyTierCounts.rose})</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#E2E8F0] text-[#2D2319] px-2.5 py-1 rounded-lg border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D2319]" />
            <span>Unpracticed ({keyTierCounts.slate})</span>
          </div>
        </div>
      </div>

      {/* Heatmap Interactive Keyboard + Key Diagnostic Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Keyboard SVG Canvas Chassis */}
        <div className="lg:col-span-8 bg-[#2D2319] p-4 sm:p-5 rounded-2xl border-2 border-[#2D2319] shadow-[4px_4px_0px_var(--rs-shadow)] flex items-center justify-center">
          <svg 
            viewBox="0 0 683.3 254" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto select-none"
          >
            <g id="heatmap-keys">
              {layoutKeys.map(key => {
                const rawChar = (key.label || key.id || '').toLowerCase();
                const keyChar = (key.id === 'space' || rawChar === 'space') ? ' ' : rawChar;
                const stat = keyAccuracyMap[keyChar] || keyAccuracyMap[key.id];
                const isSelected = normalizedSelectedKey.toLowerCase() === keyChar || 
                                   selectedKey.toLowerCase() === rawChar || 
                                   selectedKey.toLowerCase() === key.id;

                let fill = '#E2E8F0';
                let stroke = '#2D2319';
                let textFill = '#2D2319';

                if (stat && stat.total > 0) {
                  if (stat.accuracy >= 95) {
                    fill = '#10B981';
                  } else if (stat.accuracy >= 85) {
                    fill = '#F59E0B';
                  } else {
                    fill = '#EF4444';
                  }
                }

                return (
                  <g 
                    key={key.id}
                    className="cursor-pointer group"
                    onClick={() => {
                      sound.playKeyClick();
                      onSelectKey(key.id === 'space' ? ' ' : (key.label || key.id));
                    }}
                  >
                    {isSelected && (
                      <path
                        d={key.d}
                        fill="none"
                        stroke="#F6C445"
                        strokeWidth="4"
                        opacity="1"
                      />
                    )}

                    <path
                      d={key.d}
                      fill={fill}
                      stroke={isSelected ? '#F6C445' : stroke}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      className="transition-all duration-100 group-hover:opacity-90"
                      style={{
                        transform: isSelected ? 'translateY(-2px)' : 'none',
                        transformOrigin: `${key.cx}px ${key.cy}px`
                      }}
                    />

                    {key.isHomeKey && (
                      <line
                        x1={key.cx - 4.5}
                        y1={key.cy + 12.5}
                        x2={key.cx + 4.5}
                        y2={key.cy + 12.5}
                        stroke="#2D2319"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    )}

                    <text
                      x={key.cx}
                      y={key.id === 'space' ? key.cy + 1 : key.cy - 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={key.id === 'space' || key.id === 'shift-left' || key.id === 'shift-right' || key.id === 'capslock' || key.id === 'tab' || key.id === 'enter' || key.id === 'backspace' ? "10" : "13"}
                      fontWeight="900"
                      fontFamily="monospace"
                      fill={textFill}
                      className="pointer-events-none select-none"
                    >
                      {key.label || key.id}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Key Diagnostic Inspector Panel */}
        <div className="lg:col-span-4 h-full flex flex-col">
          <div className="border-2 border-[#2D2319] bg-[var(--rs-paper-alt)] rounded-xl p-4 sm:p-5 shadow-[3px_3px_0px_var(--rs-shadow)] flex flex-col justify-between h-full text-[#2D2319] transition-colors duration-200">
            <div>
              <div className="flex items-center justify-between gap-2 border-b-2 border-[#2D2319]/15 pb-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-[#4BA3E3] text-[#2D2319] font-mono text-[11px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] whitespace-nowrap shrink-0">
                  Key Diagnostic
                </span>
                <span className="text-[11px] uppercase font-black text-[#2D2319] font-mono whitespace-nowrap">
                  {activeKeyFinger.hand} Hand
                </span>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black font-mono border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] text-[#2D2319] shrink-0 ${
                  activeKeyData.status === 'emerald'
                    ? 'bg-[#10B981]'
                    : activeKeyData.status === 'amber'
                    ? 'bg-[#F59E0B]'
                    : activeKeyData.status === 'rose'
                    ? 'bg-[#EF4444]'
                    : 'bg-[#E2E8F0]'
                }`}>
                  {selectedKey === ' ' ? '␣' : selectedKey.toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xl font-black text-[#2D2319] font-display truncate">
                    Key "{selectedKey === ' ' ? 'Space' : selectedKey.toUpperCase()}"
                  </div>
                  <div className="text-xs font-bold text-[#2D2319]/70 font-mono mt-0.5 truncate">
                    {activeKeyFinger.finger}
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs font-bold font-mono">
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[var(--rs-paper)] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] transition-colors duration-200">
                  <span className="text-[#2D2319]/80 shrink-0">Accuracy:</span>
                  <span className="font-black text-[#2D2319] whitespace-nowrap text-right">
                    {activeKeyData.total > 0 ? `${activeKeyData.accuracy}%` : 'Unpracticed'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[var(--rs-paper)] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] transition-colors duration-200">
                  <span className="text-[#2D2319]/80 shrink-0">Correct Hits:</span>
                  <span className="font-black text-[#10B981] whitespace-nowrap text-right">
                    {activeKeyData.hits} hits
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[var(--rs-paper)] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] transition-colors duration-200">
                  <span className="text-[#2D2319]/80 shrink-0">Errors / Typos:</span>
                  <span className={`font-black whitespace-nowrap text-right ${activeKeyData.misses > 0 ? 'text-[#EF4444]' : 'text-[#2D2319]/50'}`}>
                    {activeKeyData.misses} misses
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t-2 border-[#2D2319]/15">
              <button
                type="button"
                onClick={() => onPracticeKey(selectedKey)}
                className="w-full py-2.5 px-3 bg-[#4BA3E3] hover:bg-[#3894d8] active:translate-x-0.5 active:translate-y-0.5 border-2 border-[#2D2319] rounded-xl font-display font-black text-xs text-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span className="whitespace-nowrap">Practice Key "{selectedKey === ' ' ? 'Space' : selectedKey.toUpperCase()}"</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
