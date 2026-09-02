import React from 'react';
import RetroVisualFrame from './RetroVisualFrame';

export default function Chapter1_DataTypesRoadmap() {
  const frames = [
    {
      title: "Why Data Types Matter",
      subtitle: "1. Math Addition vs Text Sticking",
      caption: "5 + 5 gives 10 (numerical addition), but '5' + '5' gives '55' (text string concatenation). Types define what operations are allowed!",
      render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md py-2">
          <div className="bg-[#C7E8CA] border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319] text-center">
            <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 block">NUMBERS (int)</span>
            <span className="font-mono font-black text-sm text-[#2D2319]">5 + 5 = 10</span>
            <span className="text-[9px] font-mono block text-[#2D2319]/80 mt-1 font-bold">Arithmetic Math</span>
          </div>

          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319] text-center">
            <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 block">TEXT (str)</span>
            <span className="font-mono font-black text-sm text-[#2D2319]">'5' + '5' = '55'</span>
            <span className="text-[9px] font-mono block text-[#2D2319]/80 mt-1 font-bold">String Sticking</span>
          </div>
        </div>
      )
    },
    {
      title: "The Core Python Data Types",
      subtitle: "2. The 4 Fundamental Categories",
      caption: "int (whole numbers), float (decimals), str (text characters), bool (True/False), and None (empty).",
      render: () => (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full py-1">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2.5 rounded-xl text-center shadow-[2px_2px_0px_#2D2319]">
            <span className="font-mono font-black text-xs text-[#2D2319]">int / float</span>
            <span className="text-[10px] font-mono block text-[#48B89F] font-bold">42, 3.14</span>
          </div>
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2.5 rounded-xl text-center shadow-[2px_2px_0px_#2D2319]">
            <span className="font-mono font-black text-xs text-[#2D2319]">str</span>
            <span className="text-[10px] font-mono block text-[#F6C445] font-bold">'Hello'</span>
          </div>
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2.5 rounded-xl text-center shadow-[2px_2px_0px_#2D2319]">
            <span className="font-mono font-black text-xs text-[#2D2319]">bool</span>
            <span className="text-[10px] font-mono block text-[#4BA3E3] font-bold">True / False</span>
          </div>
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-2.5 rounded-xl text-center shadow-[2px_2px_0px_#2D2319]">
            <span className="font-mono font-black text-xs text-[#2D2319]">NoneType</span>
            <span className="text-[10px] font-mono block text-[#F28B82] font-bold">None</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <RetroVisualFrame
      title="Data Types & Type Casting"
      analogy="Numbers vs Text vs Truth Signals"
      frames={frames}
    />
  );
}
