import React from 'react';
import RetroVisualFrame from './RetroVisualFrame';

export default function Chapter2_StringTrainAndRuler() {
  const frames = [
    {
      title: "Strings as Character Trains",
      subtitle: "1. Zero-Based Indexing & The Ruler",
      caption: "Python counts characters starting at 0! Positive indices count forward [0, 1, 2...], while negative indices count backward [-1, -2...].",
      render: () => (
        <div className="w-full flex flex-col items-center py-2 space-y-2">
          {/* Index Ruler */}
          <div className="flex items-center space-x-1 font-mono text-[10px] font-bold text-[#2D2319]/70">
            {['+0', '+1', '+2', '+3', '+4', '+5'].map((idx, i) => (
              <span key={i} className="w-9 text-center">{idx}</span>
            ))}
          </div>

          {/* Train Cars */}
          <div className="flex items-center space-x-1">
            {['P', 'Y', 'T', 'H', 'O', 'N'].map((char, i) => (
              <div key={i} className="w-9 h-10 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-lg shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-mono font-black text-sm text-[#2D2319]">
                {char}
              </div>
            ))}
          </div>

          {/* Negative Index Ruler */}
          <div className="flex items-center space-x-1 font-mono text-[10px] font-bold text-[#F28B82]">
            {['-6', '-5', '-4', '-3', '-2', '-1'].map((idx, i) => (
              <span key={i} className="w-9 text-center">{idx}</span>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Slicing Window [start:stop:step]",
      subtitle: "2. Extracting Sub-Strings",
      caption: "text[0:4] slices from index 0 up to index 4 (stop index 4 is excluded!). text[::-1] steps backward and reverses the string.",
      render: () => (
        <div className="bg-[#2D2319] p-3 rounded-xl border-2 border-[#2D2319] text-xs font-mono text-[#FDF8EE] space-y-1.5 w-full max-w-sm">
          <div>word = '<span className="text-[#48B89F]">PYTHON</span>'</div>
          <div>slice = word[<span className="text-[#F6C445]">0:2</span>]  <span className="text-white/40"># 'PY'</span></div>
          <div>rev = word[<span className="text-[#F28B82]">::-1</span>]   <span className="text-white/40"># 'NOHTYP'</span></div>
        </div>
      )
    }
  ];

  return (
    <RetroVisualFrame
      title="String Anatomy & Slicing Ruler"
      analogy="Connected Train Cars with Index Rulers"
      frames={frames}
    />
  );
}
