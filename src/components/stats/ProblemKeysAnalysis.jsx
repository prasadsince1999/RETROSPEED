import React from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

export function ProblemKeysAnalysis({ problemKeys, onSelectKey, onPracticeKey }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
          <h2 className="text-xs font-mono font-bold text-[#2D2319] uppercase tracking-wider">
            Top Problem Keys & Targeted Remediation
          </h2>
        </div>
        <span className="text-xs font-mono text-[#2D2319]/70 font-bold">Keys with highest mistype frequency</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {problemKeys.length > 0 ? (
          problemKeys.map((item, idx) => (
            <div 
              key={item.key} 
              className="border-2 border-[#2D2319] bg-[var(--rs-paper)] hover:bg-[var(--rs-paper-alt)] rounded-xl p-5 shadow-[3px_3px_0px_var(--rs-shadow)] flex flex-col justify-between transition-all duration-150 cursor-pointer text-[#2D2319]"
              onClick={() => {
                sound.playKeyClick();
                onSelectKey(item.key);
              }}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-[#EF4444] text-[#2D2319] font-mono font-black text-xl flex items-center justify-center border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                      {item.label}
                    </div>
                    <div>
                      <div className="font-black text-[#2D2319] text-base font-display">
                        Key "{item.label}"
                      </div>
                      <div className="text-[11px] text-[#2D2319]/70 font-bold font-mono">
                        {item.finger}
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-[#EF4444] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                    #{idx + 1} Issue
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-[#2D2319]/15 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#2D2319]/80 font-bold">Error Rate:</span>
                    <span className="font-black text-[#EF4444]">{item.errorRate}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#2D2319]/80 font-bold">Misses vs Hits:</span>
                    <span className="font-bold text-[#2D2319]">
                      <span className="text-[#EF4444] font-black">{item.misses}</span> / {item.hits}
                    </span>
                  </div>

                  <div className="w-full bg-[var(--rs-paper-alt)] border-2 border-[#2D2319] rounded-lg h-2.5 p-0.5 shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                    <div
                      className="h-full bg-[#EF4444] border border-[#2D2319] rounded-[2px]"
                      style={{ width: `${Math.min(100, Math.max(10, item.errorRate * 3))}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPracticeKey(item.key);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#F28B82] hover:bg-[#e47970] text-[#2D2319] font-black font-display text-xs border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  Practice Key "{item.label}"
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center bg-[var(--rs-paper)] rounded-2xl border-2 border-[#2D2319] shadow-[3px_3px_0px_var(--rs-shadow)] text-[#2D2319]">
            <CheckCircle2 className="w-8 h-8 text-[#10B981] mx-auto mb-2" />
            <p className="text-sm font-black text-[#2D2319]">No major problem keys detected!</p>
            <p className="text-xs text-[#2D2319]/70 font-mono mt-0.5">Your accuracy across all keys is above standard thresholds.</p>
          </div>
        )}
      </div>
    </section>
  );
}
