import React from 'react';
import RetroVisualFrame from './RetroVisualFrame';
import { Box, Tag, ArrowRight, Database } from 'lucide-react';

export default function Chapter1_VariablesMemoryBox() {
  const frames = [
    {
      title: "What is a Variable?",
      subtitle: "1. The Labeled Storage Box in Computer RAM",
      caption: "A variable is like a labeled storage box in memory. You give it a name label (like 'age') and put a value inside (like 25).",
      render: () => (
        <div className="flex items-center justify-center py-2">
          {/* Storage Box Visual */}
          <div className="relative bg-[#FAF3E0] border-3 border-[#2D2319] rounded-2xl p-6 shadow-[6px_6px_0px_#2D2319] text-center w-64">
            {/* Hanging Label Tag */}
            <div className="absolute -top-3.5 left-6 bg-[#F6C445] border-2 border-[#2D2319] px-3 py-0.5 rounded-md font-mono text-xs font-black shadow-[2px_2px_0px_#2D2319] flex items-center space-x-1">
              <Tag className="w-3 h-3" />
              <span>name = "age"</span>
            </div>
            
            <div className="pt-2">
              <span className="text-[10px] font-mono font-bold text-[#2D2319]/60 block uppercase">STORED VALUE</span>
              <span className="text-4xl font-black font-mono text-[#48B89F] block my-1">25</span>
              <span className="text-[10px] font-mono bg-white border border-[#2D2319] px-2 py-0.5 rounded inline-block font-bold">
                Type: int (Integer)
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Reassigning Variables",
      subtitle: "2. Moving the Pointer to a New Value",
      caption: "When you write age = 30 later, Python updates the box contents or points the 'age' label to the new value 30.",
      render: () => (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
          {/* Old Box */}
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-4 shadow-[2px_2px_0px_#2D2319] text-center w-40 opacity-40">
            <span className="text-[10px] font-mono line-through text-[#F28B82] font-bold">Old Value: 25</span>
          </div>

          <div className="font-mono font-black text-xs text-[#48B89F]">
            ──[ Reassign ]──▶
          </div>

          {/* New Box */}
          <div className="relative bg-[#FAF3E0] border-3 border-[#2D2319] rounded-2xl p-4 shadow-[5px_5px_0px_#2D2319] text-center w-48">
            <div className="absolute -top-3 left-4 bg-[#F6C445] border-2 border-[#2D2319] px-2 py-0.5 rounded font-mono text-[10px] font-black">
              age
            </div>
            <span className="text-3xl font-black font-mono text-[#4BA3E3]">30</span>
            <span className="text-[9px] font-mono block text-[#2D2319]/70 mt-1 font-bold">Active in RAM</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <RetroVisualFrame
      title="Variables & Memory Storage"
      analogy="Labeled Storage Boxes in a Warehouse"
      frames={frames}
    />
  );
}
