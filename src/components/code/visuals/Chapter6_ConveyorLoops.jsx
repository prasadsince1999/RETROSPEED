import React from 'react';
import RetroVisualFrame from './RetroVisualFrame';

export default function Chapter6_ConveyorLoops() {
  const frames = [
    {
      title: "The Conveyor Belt: for Loops",
      subtitle: "1. Iterating Over Sequences",
      caption: "A for loop acts like a factory conveyor belt, picking up items one by one from a sequence and processing them inside the loop block.",
      render: () => (
        <div className="flex items-center justify-center gap-2 py-2">
          {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
            <div key={i} className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold text-center">
              📦 {item}
            </div>
          ))}
          <span className="font-mono text-xs font-black text-[#48B89F] ml-2">➔ Loop Body</span>
        </div>
      )
    },
    {
      title: "Emergency Break & Skip Continue",
      subtitle: "2. Loop Control Signals",
      caption: "'break' immediately stops and exits the loop. 'continue' skips the current turn and jumps directly to the next iteration.",
      render: () => (
        <div className="flex gap-3 justify-center py-2 font-mono text-xs">
          <div className="bg-[#F28B82]/20 border-2 border-[#2D2319] p-2.5 rounded-xl text-center shadow-[2px_2px_0px_#2D2319]">
            <span className="font-black text-[#F28B82] block">🛑 break</span>
            <span className="text-[10px] text-[#2D2319]">Emergency Exit</span>
          </div>
          <div className="bg-[#F6C445]/30 border-2 border-[#2D2319] p-2.5 rounded-xl text-center shadow-[2px_2px_0px_#2D2319]">
            <span className="font-black text-[#2D2319] block">⏩ continue</span>
            <span className="text-[10px] text-[#2D2319]">Skip to Next</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <RetroVisualFrame
      title="Python Loops & Conveyor Belts"
      analogy="Factory Conveyor Belt & Emergency Exits"
      frames={frames}
    />
  );
}
