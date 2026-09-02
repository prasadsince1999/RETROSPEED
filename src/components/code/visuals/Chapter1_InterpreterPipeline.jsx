import React from 'react';
import RetroVisualFrame from './RetroVisualFrame';
import { ArrowRight, FileCode, Cpu, Layers, CheckCircle2 } from 'lucide-react';

export default function Chapter1_InterpreterPipeline() {
  const frames = [
    {
      title: "The Source Code",
      subtitle: "1. Source Code (.py)",
      caption: "You write Python code in plain text (.py). It is human-readable and clean.",
      render: () => (
        <div className="flex items-center justify-center py-4">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-4 shadow-[4px_4px_0px_#2D2319] w-72">
            <div className="flex items-center justify-between border-b border-[#2D2319]/20 pb-1.5 mb-2 font-mono text-xs font-bold">
              <span>main.py</span>
              <span className="text-[#4BA3E3]">Source File</span>
            </div>
            <div className="bg-[#2D2319] p-3 rounded-lg text-xs font-mono text-[#FDF8EE]">
              <span className="text-[#48B89F]">print</span>('<span className="text-[#F6C445]">Hello World</span>')
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Translator",
      subtitle: "2. The Python Interpreter & Bytecode (.pyc)",
      caption: "The Python Interpreter translates your source code into Bytecode (.pyc) — compact intermediate instructions for the virtual machine.",
      render: () => (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319] text-center w-40">
            <span className="text-[10px] font-mono text-[#2D2319]/60 font-bold block">SOURCE</span>
            <span className="font-mono font-bold text-xs text-[#2D2319]">main.py</span>
          </div>

          <div className="bg-[#F6C445] border-2 border-[#2D2319] px-3 py-1.5 rounded-lg font-mono text-xs font-black shadow-[2px_2px_0px_#2D2319]">
            ⚙️ Interpreter
          </div>

          <div className="bg-[#C3A6E8] border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319] text-center w-40">
            <span className="text-[10px] font-mono text-[#2D2319]/60 font-bold block">BYTECODE</span>
            <span className="font-mono font-bold text-xs text-[#2D2319]">main.pyc</span>
          </div>
        </div>
      )
    },
    {
      title: "The Complete Execution Pipeline",
      subtitle: "3. Source -> Bytecode -> PVM -> CPU",
      caption: "The Python Virtual Machine (PVM) executes the bytecode and sends direct binary instructions to your CPU hardware!",
      render: () => (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full py-1">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319] text-center">
            <span className="text-[9px] font-mono text-[#2D2319]/60 font-bold block">STEP 1</span>
            <span className="font-mono font-black text-xs text-[#2D2319]">Source (.py)</span>
            <span className="text-[10px] text-[#2D2319]/70 block mt-1">Human Code</span>
          </div>

          <div className="bg-[#F6C445]/40 border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319] text-center">
            <span className="text-[9px] font-mono text-[#2D2319]/60 font-bold block">STEP 2</span>
            <span className="font-mono font-black text-xs text-[#2D2319]">Bytecode (.pyc)</span>
            <span className="text-[10px] text-[#2D2319]/70 block mt-1">Interpreter</span>
          </div>

          <div className="bg-[#4BA3E3]/30 border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319] text-center">
            <span className="text-[9px] font-mono text-[#2D2319]/60 font-bold block">STEP 3</span>
            <span className="font-mono font-black text-xs text-[#2D2319]">PVM</span>
            <span className="text-[10px] text-[#2D2319]/70 block mt-1">Virtual Machine</span>
          </div>

          <div className="bg-[#48B89F]/30 border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319] text-center">
            <span className="text-[9px] font-mono text-[#2D2319]/60 font-bold block">STEP 4</span>
            <span className="font-mono font-black text-xs text-[#48B89F]">CPU Output</span>
            <span className="text-[10px] text-[#2D2319]/70 block mt-1">Hardware</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <RetroVisualFrame
      title="The Python Interpreter & Bytecode Pipeline"
      analogy="Recipe In English -> Kitchen Prep Tickets -> Chef Cooking"
      frames={frames}
    />
  );
}
