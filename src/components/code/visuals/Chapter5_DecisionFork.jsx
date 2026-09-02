import React from 'react';
import RetroVisualFrame from './RetroVisualFrame';

export default function Chapter5_DecisionFork() {
  const frames = [
    {
      title: "The Fork in the Road",
      subtitle: "1. if / elif / else Branching",
      caption: "Conditionals allow code to take different paths depending on whether a test evaluates to True or False.",
      render: () => (
        <div className="flex items-center justify-center gap-4 py-2 font-mono">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-3 rounded-xl shadow-[3px_3px_0px_#2D2319] text-center">
            <span className="text-[10px] text-[#2D2319]/60 font-bold block">CONDITION</span>
            <span className="font-black text-xs text-[#2D2319]">score &gt;= 80</span>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="bg-[#C7E8CA] border-2 border-[#2D2319] px-3 py-1 rounded-lg text-xs font-bold shadow-[2px_2px_0px_#2D2319]">
              ✅ TRUE ➔ 'Pass'
            </div>
            <div className="bg-[#F28B82]/20 border-2 border-[#2D2319] px-3 py-1 rounded-lg text-xs font-bold shadow-[2px_2px_0px_#2D2319]">
              ❌ FALSE ➔ 'Retry'
            </div>
          </div>
        </div>
      )
    },
    {
      title: "4-Space Indentation Blocks",
      subtitle: "2. The Colon & Indentation Gate",
      caption: "The colon (:) signals a code block is beginning. Exactly 4 spaces of indentation tell Python what code belongs inside the branch.",
      render: () => (
        <div className="bg-[#2D2319] p-3 rounded-xl border-2 border-[#2D2319] text-xs font-mono text-[#FDF8EE] w-full max-w-sm space-y-1">
          <div><span className="text-[#F6C445]">if</span> score &gt;= 80<span className="text-[#F28B82] font-black">:</span></div>
          <div className="pl-4 text-[#48B89F]">↳ <span className="text-[#48B89F]">print</span>('You passed!') <span className="text-white/40">(4 spaces)</span></div>
        </div>
      )
    }
  ];

  return (
    <RetroVisualFrame
      title="Conditional Statements & Decision Trees"
      analogy="The Fork in the Road & Indentation Gates"
      frames={frames}
    />
  );
}
