import React from 'react';
import RetroVisualFrame from './RetroVisualFrame';
import { ArrowRight, HelpCircle, FileCode, CheckCircle2, Sparkles, Terminal, Cpu } from 'lucide-react';

export default function Chapter1_LevelsOfLanguages() {
  const frames = [
    // Frame 1: Natural English -> Computer Confused
    {
      title: "The Communication Gap",
      subtitle: "1. Human English vs Computer Hardware",
      caption: "If you tell your computer: 'Hey Computer, please calculate 5 + 5', it has no idea what you mean. Computers do not understand human words.",
      render: () => (
        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-6 py-2">
          {/* Human Character */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              {/* Retro Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-[#C3A6E8] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] flex items-center justify-center font-mono text-3xl">
                👨‍💻
              </div>
              {/* Speech Bubble */}
              <div className="absolute -top-12 -right-24 sm:-right-32 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl px-3 py-1.5 shadow-[3px_3px_0px_#2D2319] text-[11px] font-mono font-bold text-[#2D2319] whitespace-nowrap animate-bounce">
                💬 "Hey Computer, calculate 5+5"
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#2D2319] bg-[#FAF3E0] px-2 py-0.5 rounded border border-[#2D2319]">
              Human (English)
            </span>
          </div>

          <ArrowRight className="w-8 h-8 text-[#2D2319]/40 hidden md:block" />

          {/* Confused Computer */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-28 h-20 bg-[#2D2319] border-2 border-[#2D2319] rounded-t-xl p-2 shadow-[4px_4px_0px_#2D2319] flex flex-col items-center justify-center relative">
              <span className="text-2xl font-black text-[#F28B82] animate-pulse">? ? ?</span>
              <span className="text-[9px] font-mono text-[#FDF8EE]/60 mt-1">Cannot Parse English</span>
            </div>
            {/* Keyboard base */}
            <div className="w-32 h-3 bg-[#E2E8F0] border-2 border-[#2D2319] rounded-b-lg shadow-[2px_2px_0px_#2D2319]" />
            <span className="text-xs font-mono font-bold text-[#2D2319] bg-[#FAF3E0] px-2 py-0.5 rounded border border-[#2D2319]">
              Computer Laptop
            </span>
          </div>
        </div>
      )
    },

    // Frame 2: Writing Code
    {
      title: "Writing Program Code",
      subtitle: "2. The Code Document (main.py)",
      caption: "To give instructions the computer can execute, we write a program file containing high-level code: print(5 + 5).",
      render: () => (
        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-4 py-2">
          {/* Human */}
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-16 h-16 rounded-2xl bg-[#C3A6E8] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] flex items-center justify-center text-2xl">
              👨‍💻
            </div>
            <span className="text-[11px] font-mono font-bold text-[#2D2319]">Author</span>
          </div>

          <ArrowRight className="w-6 h-6 text-[#2D2319] hidden md:block" />

          {/* Program Code File */}
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[4px_4px_0px_#2D2319] w-64">
            <div className="flex items-center justify-between border-b border-[#2D2319]/20 pb-1.5 mb-2 font-mono text-[10px] font-bold">
              <span className="flex items-center space-x-1">
                <FileCode className="w-3 h-3 text-[#F6C445]" />
                <span>program.py</span>
              </span>
              <span className="bg-[#48B89F] text-white px-1.5 py-0.2 rounded text-[9px]">Code</span>
            </div>
            <div className="bg-[#2D2319] p-2.5 rounded-lg text-xs font-mono text-[#FDF8EE] space-y-1">
              <span className="text-[#48B89F] font-bold">print</span>
              <span className="text-[#F6C445]">(</span>
              <span className="text-[#F28B82] font-black">5 + 5</span>
              <span className="text-[#F6C445]">)</span>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-[#2D2319] hidden md:block" />

          {/* Laptop reading file */}
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-24 h-16 bg-[#2D2319] border-2 border-[#2D2319] rounded-t-xl p-2 shadow-[3px_3px_0px_#2D2319] flex items-center justify-center text-[10px] font-mono text-[#F6C445]">
              Loading .py...
            </div>
            <div className="w-28 h-2.5 bg-[#E2E8F0] border-2 border-[#2D2319] rounded-b" />
            <span className="text-[11px] font-mono font-bold text-[#2D2319]">Target Machine</span>
          </div>
        </div>
      )
    },

    // Frame 3: Execution Result 10
    {
      title: "Execution & Output",
      subtitle: "3. Calculated Result: 10",
      caption: "Python interprets the instruction, performs the math calculation, and displays the final result 10 onto the terminal screen!",
      render: () => (
        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-4 py-2">
          {/* Program Code */}
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319] w-52">
            <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 block mb-1">PROGRAM CODE</span>
            <div className="bg-[#2D2319] p-2 rounded text-xs font-mono text-[#FDF8EE]">
              <span className="text-[#48B89F]">print</span>(<span className="text-[#F6C445]">5 + 5</span>)
            </div>
          </div>

          <div className="flex items-center space-x-1 font-mono font-black text-xs text-[#48B89F]">
            <span>──[ Executes ]──▶</span>
          </div>

          {/* Screen Output: 10 */}
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-36 h-24 bg-[#1F1912] border-2 border-[#2D2319] rounded-t-xl p-2 shadow-[5px_5px_0px_#2D2319] flex flex-col items-center justify-center relative">
              <div className="absolute top-1.5 left-2 flex space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F28B82]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6C445]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#48B89F]" />
              </div>
              <span className="text-3xl font-black text-[#48B89F] font-mono tracking-wider animate-in zoom-in">
                10
              </span>
              <span className="text-[9px] font-mono text-[#F6C445] mt-1 font-bold">← RESULT</span>
            </div>
            <div className="w-40 h-3 bg-[#E2E8F0] border-2 border-[#2D2319] rounded-b-lg shadow-[2px_2px_0px_#2D2319]" />
          </div>
        </div>
      )
    },

    // Frame 4: 4-Tier Language Ladder (PDF Page 4)
    {
      title: "Levels of Programming Languages",
      subtitle: "4. The 4-Tier Language Hierarchy Ladder",
      caption: "Languages range from human-friendly Natural English down to raw Binary Machine Code. Python is High-Level: readable like English yet executable by hardware.",
      render: () => (
        <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-2.5 py-1">
          {/* Level 1: Natural */}
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-bold font-mono">
                <span className="text-[#48B89F]">EASY (Human)</span>
                <span>🇬🇧 🇪🇸 🇮🇳</span>
              </div>
              <h4 className="font-bold text-xs text-[#2D2319] font-mono mt-0.5">1. Natural Language</h4>
            </div>
            <div className="bg-white border border-[#2D2319] rounded p-1.5 text-[10px] font-mono text-[#2D2319]/80 mt-2">
              "Hey, please calculate 5+5"
            </div>
          </div>

          {/* Level 2: High-Level Python */}
          <div className="bg-[#C7E8CA] border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between relative ring-2 ring-[#48B89F]">
            <div>
              <div className="flex items-center justify-between text-[10px] font-bold font-mono">
                <span className="bg-[#48B89F] text-white px-1 rounded text-[9px]">YOU ARE HERE</span>
                <span>🐍 JS</span>
              </div>
              <h4 className="font-black text-xs text-[#2D2319] font-mono mt-0.5">2. High-Level (Python)</h4>
            </div>
            <div className="bg-[#2D2319] rounded p-1.5 text-[10px] font-mono text-[#48B89F] mt-2">
              print(5 + 5)
            </div>
          </div>

          {/* Level 3: Low-Level Assembly */}
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-bold font-mono">
                <span className="text-[#F6C445]">HARDER</span>
                <span>⚙️ C</span>
              </div>
              <h4 className="font-bold text-xs text-[#2D2319] font-mono mt-0.5">3. Low-Level (Assembly)</h4>
            </div>
            <div className="bg-white border border-[#2D2319] rounded p-1.5 text-[9px] font-mono text-[#2D2319]/80 mt-2">
              MOV AX, 5<br/>ADD AX, 5
            </div>
          </div>

          {/* Level 4: Machine Binary */}
          <div className="bg-[#F28B82]/20 border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-bold font-mono">
                <span className="text-[#F28B82]">MACHINE</span>
                <span>⚡ 🤖</span>
              </div>
              <h4 className="font-bold text-xs text-[#2D2319] font-mono mt-0.5">4. Binary Bits</h4>
            </div>
            <div className="bg-[#2D2319] rounded p-1.5 text-[9px] font-mono text-[#F28B82] mt-2 tracking-tighter">
              10101100 11010001
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <RetroVisualFrame
      title="How Python Works: Communication & Language Levels"
      analogy="Natural English vs High-Level Python vs Binary Hardware"
      frames={frames}
    />
  );
}
