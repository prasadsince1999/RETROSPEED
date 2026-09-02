import React from 'react';
import RetroVisualFrame from './RetroVisualFrame';
import { Megaphone, Mic, Terminal, ArrowRight } from 'lucide-react';

export default function Chapter1_MegaphoneAndFunctions() {
  const frames = [
    {
      title: "print(): The Megaphone",
      subtitle: "1. Output Broadcasting",
      caption: "print() is your program's megaphone. Whatever message you place inside parentheses is broadcast out to the terminal screen.",
      render: () => (
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
          <div className="flex items-center space-x-3 bg-[#FAF3E0] border-2 border-[#2D2319] p-3 rounded-2xl shadow-[3px_3px_0px_#2D2319]">
            <div className="w-12 h-12 rounded-xl bg-[#F6C445] border-2 border-[#2D2319] flex items-center justify-center text-2xl">
              📢
            </div>
            <div>
              <span className="text-xs font-mono font-black text-[#2D2319] block">print()</span>
              <span className="text-[10px] font-mono text-[#2D2319]/70">The Megaphone</span>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-[#2D2319]" />

          <div className="bg-[#2D2319] p-3 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] text-xs font-mono text-[#48B89F]">
            $ Output: Hello Python!
          </div>
        </div>
      )
    },
    {
      title: "Custom Separator (sep) & Endline (end)",
      subtitle: "2. Delimiter Control",
      caption: "print('A', 'B', sep=' -> ') inserts a custom glue between words instead of a simple space.",
      render: () => (
        <div className="bg-[#2D2319] p-4 rounded-xl border-2 border-[#2D2319] text-xs font-mono text-[#FDF8EE] w-full max-w-md space-y-2">
          <div><span className="text-[#48B89F]">print</span>('Python', 'Data', sep=' <span className="text-[#F6C445]">{'->'}</span> ')</div>
          <div className="text-[#48B89F] pt-1 border-t border-white/20">
            $ Python {'->'} Data
          </div>
        </div>
      )
    }
  ];

  return (
    <RetroVisualFrame
      title="The print() Function & Formatting"
      analogy="The Output Megaphone with Custom Delimiters"
      frames={frames}
    />
  );
}
