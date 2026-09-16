import React, { useState, useEffect, useMemo } from 'react';
import {
  Box as BoxIcon,
  Megaphone as MegaphoneIcon,
  Mic as MicIcon,
  Train as TrainIcon,
  GitFork as ForkIcon,
  Repeat as ConveyorIcon,
  Cog as CogIcon,
  Layers as TrayIcon,
  Calculator as CalcIcon,
  Scissors,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  Sliders,
  Terminal,
  Cpu,
  Zap,
  Check
} from 'lucide-react';
import { sound } from '../../../utils/audio';

/**
 * Heuristic detector for lesson analogy type if not explicitly provided
 */
export function detectAnalogyType(lesson) {
  if (!lesson) return 'box';
  if (lesson.analogyType) return lesson.analogyType.toLowerCase();

  const textToScan = [
    lesson.title,
    lesson.concept,
    lesson.analogy,
    lesson.code,
    lesson.section,
    lesson.type
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (textToScan.includes('input(') || textToScan.includes('user input') || textToScan.includes('prompt')) {
    return 'microphone';
  }
  if (
    textToScan.includes('train') ||
    textToScan.includes('slice') ||
    textToScan.includes('index') ||
    textToScan.includes('string') ||
    textToScan.includes('substring') ||
    textToScan.includes('len(') ||
    /\[\s*-?\d*\s*:\s*-?\d*/.test(textToScan) ||
    /\[\s*-?\d+\s*\]/.test(textToScan)
  ) {
    return 'train';
  }
  if (
    textToScan.includes('if ') ||
    textToScan.includes('elif') ||
    textToScan.includes('else') ||
    textToScan.includes('fork') ||
    textToScan.includes('condition') ||
    textToScan.includes('boolean') ||
    textToScan.includes('branch')
  ) {
    return 'fork';
  }
  if (
    textToScan.includes('for ') ||
    textToScan.includes('while ') ||
    textToScan.includes('loop') ||
    textToScan.includes('conveyor') ||
    textToScan.includes('iterate') ||
    textToScan.includes('range(')
  ) {
    return 'conveyor';
  }
  if (
    textToScan.includes('def ') ||
    textToScan.includes('return') ||
    textToScan.includes('function') ||
    textToScan.includes('parameter') ||
    textToScan.includes('argument') ||
    textToScan.includes('machine')
  ) {
    return 'machine';
  }
  if (
    textToScan.includes('list') ||
    textToScan.includes('dict') ||
    textToScan.includes('array') ||
    textToScan.includes('tuple') ||
    textToScan.includes('set') ||
    textToScan.includes('tray') ||
    textToScan.includes('pigeonhole') ||
    textToScan.includes('collection') ||
    /\[\s*(['"].*?['"]|\d+)\s*,\s*(['"].*?['"]|\d+)/.test(textToScan) ||
    /\{\s*['"].*?['"]\s*:/.test(textToScan)
  ) {
    return 'tray';
  }
  if (
    textToScan.includes('math') ||
    textToScan.includes('arithmetic') ||
    textToScan.includes('calculate') ||
    textToScan.includes('operator') ||
    textToScan.includes('sum') ||
    textToScan.includes('+') ||
    textToScan.includes('-') ||
    textToScan.includes('*') ||
    textToScan.includes('//')
  ) {
    return 'arithmetic';
  }
  if (
    textToScan.includes('print(') ||
    textToScan.includes('megaphone') ||
    textToScan.includes('output') ||
    textToScan.includes('stdout') ||
    textToScan.includes('display')
  ) {
    return 'megaphone';
  }
  if (
    textToScan.includes('variable') ||
    textToScan.includes('memory') ||
    textToScan.includes('storage') ||
    textToScan.includes('box') ||
    textToScan.includes('=')
  ) {
    return 'box';
  }

  return 'box';
}

// ============================================================================
// 1. MEMORY BOX (Variables & Assignment)
// ============================================================================
function BoxVisual({ lesson, animKey }) {
  const [isOpen, setIsOpen] = useState(true);
  const [dropped, setDropped] = useState(false);

  // Extract variable name and value from code or lesson
  const { varName, varValue, varType } = useMemo(() => {
    const code = lesson?.code || 'score = 10';
    const match = code.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)/);
    let name = 'score';
    let val = '10';
    if (match) {
      name = match[1].trim();
      val = match[2].split('#')[0].trim();
    } else if (lesson?.variables && Object.keys(lesson.variables).length > 0) {
      name = Object.keys(lesson.variables)[0];
      val = String(lesson.variables[name]);
    }
    let type = 'int';
    if (val.startsWith("'") || val.startsWith('"')) type = 'str';
    else if (val === 'True' || val === 'False') type = 'bool';
    else if (val.includes('.')) type = 'float';
    else if (val.startsWith('[') || val.startsWith('{')) type = 'collection';

    return { varName: name, varValue: val, varType: type };
  }, [lesson]);

  useEffect(() => {
    setDropped(false);
    setIsOpen(true);
    const dropTimer = setTimeout(() => setDropped(true), 350);
    return () => clearTimeout(dropTimer);
  }, [animKey, lesson]);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-md select-none">
      {/* Upper Status & Memory Address Badge */}
      <div className="flex items-center justify-between w-full mb-3 px-2">
        <div className="flex items-center gap-1.5 bg-[#FAF3E0] border-2 border-[#2D2319] px-2.5 py-1 rounded-lg text-xs font-mono font-bold shadow-[2px_2px_0px_#2D2319]">
          <Cpu className="w-3.5 h-3.5 text-[#48B89F]" />
          <span>RAM: <strong className="text-[#2D2319]">0x7FFE</strong></span>
          <span className="w-2 h-2 rounded-full bg-[#48B89F] animate-pulse ml-1" />
        </div>
        <span className="text-[11px] font-mono font-bold text-[#2D2319]/70 bg-[#FAF3E0] border border-[#2D2319] px-2 py-0.5 rounded shadow-[1px_1px_0px_#2D2319]">
          Type: <strong className="text-[#48B89F]">{varType}</strong>
        </span>
      </div>

      {/* Floating Value Capsule Dropping Down */}
      <div className="h-14 flex items-center justify-center relative w-full">
        <div
          className={`px-4 py-1.5 rounded-xl border-2 border-[#2D2319] font-mono font-black text-sm shadow-[3px_3px_0px_#2D2319] transition-all duration-700 ${
            dropped
              ? 'translate-y-8 scale-95 opacity-0 bg-[#48B89F] text-white'
              : '-translate-y-1 scale-105 opacity-100 bg-[#F6C445] text-[#2D2319] animate-bounce'
          }`}
        >
          {varValue}
        </div>
      </div>

      {/* Physical Cardboard Memory Box with Animated Flaps */}
      <div
        onClick={() => {
          sound?.playKeyClick?.();
          setIsOpen(p => !p);
        }}
        className="relative bg-[#E6CC99] border-3 border-[#2D2319] rounded-2xl w-60 h-36 shadow-[5px_5px_0px_#2D2319] flex flex-col justify-between p-3.5 cursor-pointer hover:brightness-105 transition-all"
        title="Click to toggle box lid"
      >
        {/* Top Opening Lid Flap */}
        <div
          className={`absolute -top-3.5 left-4 right-4 h-6 bg-[#D8BA80] border-2 border-[#2D2319] rounded-t-xl transition-all duration-300 origin-bottom flex items-center justify-center text-[10px] font-mono font-bold text-[#2D2319]/80 shadow-[2px_-2px_0px_#2D2319] ${
            isOpen ? '-rotate-12 -translate-y-1' : 'rotate-0 translate-y-2'
          }`}
        >
          {isOpen ? '▲ LID OPEN' : '▼ LID CLOSED'}
        </div>

        {/* Swing Tag on String */}
        <div className="absolute -top-3 right-4 bg-[#F6C445] border-2 border-[#2D2319] px-2.5 py-0.5 rounded-md font-mono text-xs font-black text-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center gap-1">
          <span className="text-[10px] text-[#2D2319]/70">var</span>
          <span className="text-xs">{varName}</span>
        </div>

        {/* Box Interior / Stored Payload */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl my-1 p-2 shadow-inner">
          <span className="text-[10px] font-mono font-bold text-[#2D2319]/60 uppercase tracking-wider">
            Active Value in Box
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-3xl font-black font-mono text-[#2D2319]">
              {varValue}
            </span>
            {dropped && <Sparkles className="w-4 h-4 text-[#F6C445] animate-spin" />}
          </div>
        </div>

        {/* Cardboard Bottom Texture Lines & Badge */}
        <div className="flex items-center justify-between text-[9px] font-mono font-bold text-[#2D2319]/70 pt-1 border-t border-[#2D2319]/20">
          <span>📦 Memory Slot</span>
          <span className="text-[#48B89F] font-black">Address 0x7FFE</span>
        </div>
      </div>

      <p className="text-[11px] font-mono text-[#2D2319]/70 mt-3 text-center">
        Variable <strong>{varName}</strong> holds <strong>{varValue}</strong> in RAM address <strong>0x7FFE</strong>
      </p>
    </div>
  );
}

// ============================================================================
// 2. MEGAPHONE (Print & Output)
// ============================================================================
function MegaphoneVisual({ lesson, animKey }) {
  const [pulseWaves, setPulseWaves] = useState(false);

  const printText = useMemo(() => {
    const code = lesson?.code || "print('Hello, Python!')";
    const match = code.match(/print\s*\(\s*['"]?(.*?)['"]?\s*\)/s);
    if (match && match[1]) return match[1].replace(/['"]$/, '');
    return lesson?.expectedOutput || 'Hello, Python!';
  }, [lesson]);

  useEffect(() => {
    setPulseWaves(true);
  }, [animKey, lesson]);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-lg select-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        {/* Left: Vintage Brass Megaphone */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative group">
            {/* SVG Megaphone with Brass Shading */}
            <svg viewBox="0 0 100 80" className="w-24 h-20 drop-shadow-[3px_3px_0px_#2D2319]">
              {/* Megaphone Body */}
              <polygon
                points="25,32 75,10 75,70 25,48"
                fill="#F6C445"
                stroke="#2D2319"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Megaphone Mouth Ring */}
              <ellipse
                cx="75"
                cy="40"
                rx="6"
                ry="30"
                fill="#C3A6E8"
                stroke="#2D2319"
                strokeWidth="3"
              />
              {/* Grip Handle */}
              <path
                d="M32,45 L32,68 L24,68 L24,42"
                fill="#FAF3E0"
                stroke="#2D2319"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Speaker Mic Bell */}
              <ellipse
                cx="25"
                cy="40"
                rx="5"
                ry="8"
                fill="#48B89F"
                stroke="#2D2319"
                strokeWidth="2.5"
              />
            </svg>

            {/* Megaphone Tag */}
            <span className="absolute -bottom-2 -left-1 bg-[#FDF8EE] border-2 border-[#2D2319] px-2 py-0.5 rounded text-[10px] font-mono font-black shadow-[1px_1px_0px_#2D2319]">
              print()
            </span>
          </div>
        </div>

        {/* Center: Concentric Pulsing Sound Waves carrying the message */}
        <div className="flex flex-col items-center justify-center flex-1 px-2 relative min-h-[50px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-6 bg-[#48B89F] rounded-full animate-pulse" />
            <span className="w-2 h-10 bg-[#48B89F] rounded-full animate-pulse delay-75" />
            <span className="w-2.5 h-12 bg-[#F6C445] rounded-full animate-pulse delay-150" />
            <span className="w-2 h-8 bg-[#C3A6E8] rounded-full animate-pulse delay-200" />
            <span className="w-1.5 h-5 bg-[#48B89F] rounded-full animate-pulse delay-300" />
          </div>
          <span className="text-[9px] font-mono font-bold text-[#2D2319]/70 mt-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#F6C445]" /> soundwaves ➔ stdout
          </span>
        </div>

        {/* Right: Retro Green Phosphor CRT Terminal Screen */}
        <div className="bg-[#19130D] border-3 border-[#2D2319] rounded-2xl p-3 shadow-[5px_5px_0px_#2D2319] w-56 flex flex-col justify-between shrink-0">
          {/* CRT Header */}
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#48B89F]/30 text-[9px] font-mono text-[#48B89F]">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#48B89F] animate-ping" />
              <span>CRT DISPLAY</span>
            </div>
            <span>STDOUT</span>
          </div>

          {/* CRT Screen Body with Phosphor Text */}
          <div className="font-mono text-xs text-[#48B89F] py-2 min-h-[44px] flex items-center leading-relaxed">
            <span className="text-white/40 mr-1.5 select-none">&gt;</span>
            <span className="font-black drop-shadow-[0_0_8px_rgba(72,184,159,0.8)] truncate">
              {printText}
            </span>
            <span className="inline-block w-2 h-3.5 bg-[#48B89F] ml-1 animate-pulse" />
          </div>

          <div className="text-[9px] font-mono text-white/30 pt-1 border-t border-white/10 flex justify-between">
            <span>Terminal Buffer</span>
            <span className="text-[#48B89F]">OK</span>
          </div>
        </div>
      </div>

      <p className="text-[11px] font-mono text-[#2D2319]/70 mt-4 text-center">
        The <strong>print()</strong> megaphone broadcasts expressions straight to the terminal screen.
      </p>
    </div>
  );
}

// ============================================================================
// 3. MICROPHONE (Input & Strings)
// ============================================================================
function MicrophoneVisual({ lesson, animKey }) {
  const [hasCaptured, setHasCaptured] = useState(false);

  const { promptStr, sampleAnswer } = useMemo(() => {
    const code = lesson?.code || 'name = input("Enter name: ")';
    const match = code.match(/input\s*\(\s*['"](.*?)['"]\s*\)/);
    const prompt = match ? match[1] : 'Enter your name:';
    return { promptStr: prompt, sampleAnswer: 'Coder42' };
  }, [lesson]);

  useEffect(() => {
    setHasCaptured(false);
    const timer = setTimeout(() => setHasCaptured(true), 600);
    return () => clearTimeout(timer);
  }, [animKey, lesson]);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-lg select-none">
      <div className="flex flex-col sm:flex-row items-center justify-around gap-5 w-full">
        {/* Left: Vintage Radio Studio Mic */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* Retro Microphone SVG */}
            <svg viewBox="0 0 60 90" className="w-16 h-24 drop-shadow-[3px_3px_0px_#2D2319]">
              {/* Stand Base */}
              <ellipse cx="30" cy="82" rx="20" ry="6" fill="#FAF3E0" stroke="#2D2319" strokeWidth="2.5" />
              <line x1="30" y1="58" x2="30" y2="80" stroke="#2D2319" strokeWidth="3.5" />
              {/* Outer Cradle Ring */}
              <circle cx="30" cy="30" r="24" fill="none" stroke="#2D2319" strokeWidth="3" />
              {/* Mic Capsule */}
              <rect x="22" y="16" width="16" height="28" rx="8" fill="#C3A6E8" stroke="#2D2319" strokeWidth="2.5" />
              {/* Grille lines */}
              <line x1="24" y1="23" x2="36" y2="23" stroke="#2D2319" strokeWidth="1.5" />
              <line x1="24" y1="28" x2="36" y2="28" stroke="#2D2319" strokeWidth="1.5" />
              <line x1="24" y1="33" x2="36" y2="33" stroke="#2D2319" strokeWidth="1.5" />
            </svg>

            <span className="absolute -bottom-1 -right-2 bg-[#F6C445] border-2 border-[#2D2319] px-2 py-0.5 rounded text-[10px] font-mono font-black shadow-[1px_1px_0px_#2D2319]">
              input()
            </span>
          </div>

          {/* Soundwave Visualizer Bars */}
          <div className="flex items-end gap-1 h-6 mt-2">
            {[14, 22, 10, 24, 18, 12].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}px` }}
                className="w-1.5 bg-[#48B89F] rounded-t border border-[#2D2319] animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Center: Funnel & Speech Packet */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#2D2319] text-xs font-mono">
            <span className="text-[10px] text-[#2D2319]/70 block font-bold">User Speech / Keyboard</span>
            <span className="text-sm font-black text-[#2D2319]">"{sampleAnswer}"</span>
          </div>
          <ArrowRight className="w-5 h-5 text-[#2D2319] animate-pulse" />
        </div>

        {/* Right: Boxed String Variable */}
        <div className="bg-[#FDF8EE] border-3 border-[#2D2319] rounded-2xl p-3 shadow-[4px_4px_0px_#2D2319] text-center w-48">
          <div className="bg-[#48B89F] text-white border border-[#2D2319] px-2 py-0.5 rounded text-[10px] font-mono font-bold mb-2">
            Stored as str
          </div>
          <span className="text-[10px] font-mono text-[#2D2319]/70 block font-bold">Variable in Memory</span>
          <span className="font-mono text-base font-black text-[#2D2319] block my-1">
            "{sampleAnswer}"
          </span>
          <span className="text-[9px] font-mono text-[#2D2319]/60 block border-t border-[#2D2319]/15 pt-1">
            Always returns string
          </span>
        </div>
      </div>

      <p className="text-[11px] font-mono text-[#2D2319]/70 mt-3 text-center">
        <strong>input()</strong> listens to the learner, waits for Enter, and returns the response as a <strong>str</strong>.
      </p>
    </div>
  );
}

// ============================================================================
// 4. TRAIN (Strings & Slices)
// ============================================================================
function TrainVisual({ lesson, animKey }) {
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceStop, setSliceStop] = useState(3);

  const word = useMemo(() => {
    const code = lesson?.code || "word = 'PYTHON'";
    const match = code.match(/['"]([A-Za-z0-9_]{3,8})['"]/);
    return match ? match[1].toUpperCase() : 'PYTHON';
  }, [lesson]);

  const chars = useMemo(() => word.split(''), [word]);

  return (
    <div className="flex flex-col items-center justify-center p-3 w-full max-w-xl select-none">
      {/* Top Positive Index Ruler */}
      <div className="flex items-center space-x-2 pl-14 mb-1">
        {chars.map((_, i) => (
          <div
            key={i}
            className={`w-9 text-center font-mono text-[11px] font-black transition-colors ${
              i >= sliceStart && i < sliceStop ? 'text-[#48B89F]' : 'text-[#2D2319]/50'
            }`}
          >
            +{i}
          </div>
        ))}
      </div>

      {/* Train Locomotive + Carriages */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
        {/* Locomotive Head */}
        <div className="relative bg-[#2D2319] border-2 border-[#2D2319] w-12 h-14 rounded-l-2xl shadow-[3px_3px_0px_#2D2319] flex flex-col justify-between p-1 shrink-0">
          <div className="w-2.5 h-3 bg-[#F6C445] rounded-t-sm -mt-2 self-center border border-[#2D2319]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#48B89F] self-center border border-[#2D2319] animate-ping" />
          <div className="flex justify-around">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FAF3E0] border border-[#2D2319]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FAF3E0] border border-[#2D2319]" />
          </div>
        </div>

        {/* Passenger Carriages for Characters */}
        {chars.map((char, i) => {
          const inSlice = i >= sliceStart && i < sliceStop;
          return (
            <div
              key={i}
              className={`w-9 h-14 border-2 border-[#2D2319] rounded-xl flex flex-col items-center justify-between p-1 transition-all shrink-0 ${
                inSlice
                  ? 'bg-[#48B89F] text-white shadow-[3px_3px_0px_#2D2319] scale-105'
                  : 'bg-[#FAF3E0] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] opacity-75'
              }`}
            >
              <span className="text-[9px] font-mono font-bold select-none opacity-80">[{i}]</span>
              <span className="font-mono text-base font-black">{char}</span>
              <div className="flex space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D2319]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D2319]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Negative Index Ruler */}
      <div className="flex items-center space-x-2 pl-14 mt-1">
        {chars.map((_, i) => {
          const negIdx = i - chars.length;
          return (
            <div key={i} className="w-9 text-center font-mono text-[10px] font-bold text-[#F28B82]">
              {negIdx}
            </div>
          );
        })}
      </div>

      {/* Interactive Slicing Controls & Result Badge */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-3 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[3px_3px_0px_#2D2319]">
        <div className="flex items-center gap-1 text-xs font-mono font-bold">
          <Scissors className="w-3.5 h-3.5 text-[#F28B82] animate-bounce" />
          <span>Cut:</span>
          <button
            onClick={() => {
              sound?.playKeyClick?.();
              setSliceStart(0);
              setSliceStop(2);
            }}
            className="px-2 py-0.5 rounded bg-white border border-[#2D2319] text-[11px] font-black hover:bg-[#F6C445] cursor-pointer"
          >
            [0:2]
          </button>
          <button
            onClick={() => {
              sound?.playKeyClick?.();
              setSliceStart(0);
              setSliceStop(3);
            }}
            className="px-2 py-0.5 rounded bg-white border border-[#2D2319] text-[11px] font-black hover:bg-[#F6C445] cursor-pointer"
          >
            [0:3]
          </button>
          <button
            onClick={() => {
              sound?.playKeyClick?.();
              setSliceStart(1);
              setSliceStop(chars.length);
            }}
            className="px-2 py-0.5 rounded bg-white border border-[#2D2319] text-[11px] font-black hover:bg-[#F6C445] cursor-pointer"
          >
            [1:]
          </button>
        </div>

        <div className="bg-[#2D2319] text-white px-2.5 py-0.5 rounded-lg text-xs font-mono">
          Result: <strong className="text-[#48B89F]">'{word.slice(sliceStart, sliceStop)}'</strong>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. DECISION FORK (Conditionals if / elif / else)
// ============================================================================
function ForkVisual({ lesson, animKey }) {
  const [isTrue, setIsTrue] = useState(true);

  const { conditionText, trueAction, falseAction } = useMemo(() => {
    const code = lesson?.code || 'if score >= 80:\n    print("Pass")\nelse:\n    print("Retry")';
    let cond = 'score >= 80';
    let tAction = 'print("Pass")';
    let fAction = 'print("Retry")';
    const ifMatch = code.match(/if\s+(.*?):/);
    if (ifMatch) cond = ifMatch[1];
    return { conditionText: cond, trueAction: tAction, falseAction: fAction };
  }, [lesson]);

  return (
    <div className="flex flex-col items-center justify-center p-3 w-full max-w-lg select-none">
      {/* Railroad Fork Stage */}
      <div className="w-full flex items-center justify-between gap-4 py-2">
        {/* Main Track & Incoming Railcar */}
        <div className="flex flex-col items-center">
          <div className="bg-[#FAF3E0] border-2 border-[#2D2319] p-3 rounded-2xl shadow-[3px_3px_0px_#2D2319] text-center w-36">
            <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 block">TEST CONDITION</span>
            <span className="font-mono text-xs font-black text-[#2D2319] block my-0.5">
              {conditionText}
            </span>
          </div>

          <div className="w-8 h-8 rounded-lg bg-[#F6C445] border-2 border-[#2D2319] flex items-center justify-center font-mono font-black text-xs shadow-[2px_2px_0px_#2D2319] mt-2">
            🚃
          </div>
        </div>

        {/* Animated Track Switch Lever & Signal Lamp */}
        <div
          onClick={() => {
            sound?.playKeyClick?.();
            setIsTrue(p => !p);
          }}
          className="flex flex-col items-center cursor-pointer group"
          title="Click to flip track switch"
        >
          {/* Signal Lantern */}
          <div className="w-5 h-5 rounded-full border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] mb-1 flex items-center justify-center transition-colors duration-300">
            <span
              className={`w-3.5 h-3.5 rounded-full ${
                isTrue ? 'bg-[#48B89F] shadow-[0_0_8px_#48B89F]' : 'bg-[#F28B82] shadow-[0_0_8px_#F28B82]'
              }`}
            />
          </div>

          {/* Switch Lever */}
          <div className="w-3 h-12 bg-[#2D2319] rounded-full relative flex items-center justify-center">
            <span
              className={`w-6 h-6 rounded-full bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] transition-transform duration-300 ${
                isTrue ? '-translate-y-3 bg-[#48B89F]' : 'translate-y-3 bg-[#F28B82]'
              }`}
            />
          </div>
          <span className="text-[9px] font-mono font-bold text-[#2D2319]/70 mt-1">Switch</span>
        </div>

        {/* Diverging Branches (True / False) */}
        <div className="flex flex-col space-y-3 w-48">
          {/* True Branch */}
          <div
            className={`border-2 border-[#2D2319] p-2.5 rounded-xl transition-all ${
              isTrue
                ? 'bg-[#C7E8CA] shadow-[4px_4px_0px_#2D2319] scale-105 font-black'
                : 'bg-[#FAF3E0]/60 opacity-40 shadow-none'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span>✅ TRUE</span>
              {isTrue && <span className="text-[10px] bg-[#48B89F] text-white px-1.5 rounded font-black">ACTIVE</span>}
            </div>
            <div className="text-[11px] font-mono mt-1 truncate">{trueAction}</div>
          </div>

          {/* False Branch */}
          <div
            className={`border-2 border-[#2D2319] p-2.5 rounded-xl transition-all ${
              !isTrue
                ? 'bg-[#F28B82]/30 shadow-[4px_4px_0px_#2D2319] scale-105 font-black'
                : 'bg-[#FAF3E0]/60 opacity-40 shadow-none'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span>❌ FALSE</span>
              {!isTrue && <span className="text-[10px] bg-[#F28B82] text-white px-1.5 rounded font-black">ACTIVE</span>}
            </div>
            <div className="text-[11px] font-mono mt-1 truncate">{falseAction}</div>
          </div>
        </div>
      </div>

      <div className="mt-2 text-center">
        <button
          onClick={() => {
            sound?.playKeyClick?.();
            setIsTrue(p => !p);
          }}
          className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-[#F6C445] border border-[#2D2319] shadow-[2px_2px_0px_#2D2319] cursor-pointer"
        >
          Toggle Condition: <strong>{isTrue ? 'True ➔ True Branch' : 'False ➔ Else Branch'}</strong>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 6. CONVEYOR BELT (Loops for / while)
// ============================================================================
function ConveyorVisual({ lesson, animKey }) {
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const items = useMemo(() => ['Apple', 'Banana', 'Cherry', 'Date'], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveItemIdx(prev => (prev + 1) % items.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [items.length, animKey]);

  return (
    <div className="flex flex-col items-center justify-center p-3 w-full max-w-lg select-none">
      {/* Overhead Inspection Scanner */}
      <div className="flex flex-col items-center mb-1">
        <div className="bg-[#FAF3E0] border-2 border-[#2D2319] px-3 py-1 rounded-xl shadow-[2px_2px_0px_#2D2319] text-xs font-mono font-black flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F6C445]" />
          <span>Scanner: item = '{items[activeItemIdx]}'</span>
          <span className="text-[10px] text-[#2D2319]/60">({activeItemIdx + 1}/{items.length})</span>
        </div>
        {/* Laser Scanner Beam */}
        <div className="w-0.5 h-4 bg-[#48B89F] animate-ping" />
      </div>

      {/* Industrial Conveyor Belt */}
      <div className="relative w-full bg-[#E0D7C5] border-3 border-[#2D2319] rounded-2xl p-3 shadow-[5px_5px_0px_#2D2319] flex items-center justify-between overflow-hidden">
        {/* Moving Gear Wheels */}
        <div className="absolute left-2 w-6 h-6 rounded-full border-2 border-[#2D2319] bg-[#F6C445] flex items-center justify-center animate-spin">
          <CogIcon className="w-4 h-4 text-[#2D2319]" />
        </div>
        <div className="absolute right-2 w-6 h-6 rounded-full border-2 border-[#2D2319] bg-[#F6C445] flex items-center justify-center animate-spin">
          <CogIcon className="w-4 h-4 text-[#2D2319]" />
        </div>

        {/* Conveyor Items */}
        <div className="flex items-center justify-center gap-3 w-full px-8">
          {items.map((item, idx) => {
            const isScanned = idx === activeItemIdx;
            return (
              <div
                key={idx}
                onClick={() => {
                  sound?.playKeyClick?.();
                  setActiveItemIdx(idx);
                }}
                className={`px-3 py-2 rounded-xl border-2 border-[#2D2319] font-mono text-xs font-black transition-all cursor-pointer ${
                  isScanned
                    ? 'bg-[#48B89F] text-white shadow-[3px_3px_0px_#2D2319] scale-110 -translate-y-1'
                    : 'bg-[#FAF3E0] text-[#2D2319] opacity-70'
                }`}
              >
                📦 {item}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Belt Tread Notches */}
      <div className="flex items-center justify-around w-48 mt-1">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="w-4 h-1 bg-[#2D2319]/40 rounded-full" />
        ))}
      </div>

      <p className="text-[11px] font-mono text-[#2D2319]/70 mt-2 text-center">
        A <strong>for</strong> loop processes items one by one on the conveyor belt until the sequence ends.
      </p>
    </div>
  );
}

// ============================================================================
// 7. FUNCTION MACHINE (Functions def / return)
// ============================================================================
function MachineVisual({ lesson, animKey }) {
  const [steam, setSteam] = useState(false);

  useEffect(() => {
    setSteam(true);
    const t = setTimeout(() => setSteam(false), 800);
    return () => clearTimeout(t);
  }, [animKey]);

  return (
    <div className="flex flex-col items-center justify-center p-3 w-full max-w-md select-none">
      {/* Top Input Hopper */}
      <div className="flex flex-col items-center">
        <div className="bg-[#C3A6E8] border-2 border-[#2D2319] px-3 py-1 rounded-xl shadow-[2px_2px_0px_#2D2319] text-xs font-mono font-black">
          Input Parameters: x = 5
        </div>
        <div className="w-12 h-4 border-x-2 border-[#2D2319] bg-[#E0D7C5]" />
      </div>

      {/* Central Churning Gear Machine Chamber */}
      <div className="relative bg-[#FAF3E0] border-3 border-[#2D2319] rounded-2xl w-64 p-4 shadow-[5px_5px_0px_#2D2319] flex flex-col items-center">
        {/* Steam Puffs */}
        {steam && (
          <div className="absolute -top-4 right-6 text-sm animate-bounce">
            💨 💨
          </div>
        )}

        <div className="flex items-center justify-center gap-3 my-1">
          <div className="w-8 h-8 rounded-full border-2 border-[#2D2319] bg-[#F6C445] flex items-center justify-center animate-spin">
            <CogIcon className="w-5 h-5 text-[#2D2319]" />
          </div>
          <div className="font-mono text-center">
            <span className="text-[10px] text-[#2D2319]/70 font-bold block uppercase">INTERNAL LOGIC</span>
            <span className="text-xs font-black text-[#2D2319]">result = x * 2</span>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-[#2D2319] bg-[#48B89F] flex items-center justify-center animate-spin">
            <CogIcon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Brass Rivets */}
        <div className="flex justify-between w-full mt-2 pt-1 border-t border-[#2D2319]/20 text-[9px] font-mono text-[#2D2319]/60">
          <span>⚙ Boiler 100%</span>
          <span>⚡ Pure Function</span>
        </div>
      </div>

      {/* Delivery Chute & Return Output */}
      <div className="flex flex-col items-center mt-0.5">
        <div className="w-12 h-4 border-x-2 border-[#2D2319] bg-[#E0D7C5]" />
        <div className="bg-[#48B89F] text-white border-2 border-[#2D2319] px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_#2D2319] text-xs font-mono font-black flex items-center gap-1.5 animate-bounce">
          <span>return: 10</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <p className="text-[11px] font-mono text-[#2D2319]/70 mt-2 text-center">
        Functions intake parameter inputs, transform them inside the machine, and dispense a <strong>return</strong> value.
      </p>
    </div>
  );
}

// ============================================================================
// 8. TRAY (Lists & Dictionaries)
// ============================================================================
function TrayVisual({ lesson, animKey }) {
  const [activeSlot, setActiveSlot] = useState(1);
  const isDict = useMemo(() => {
    const code = lesson?.code || '';
    return code.includes('{') || code.includes(':') || lesson?.concept?.toLowerCase().includes('dict');
  }, [lesson]);

  const slots = useMemo(() => {
    if (isDict) {
      return [
        { label: "'name'", val: "'Byte'" },
        { label: "'role'", val: "'Coach'" },
        { label: "'rank'", val: "99" }
      ];
    }
    return [
      { label: '[0]', val: "'Python'" },
      { label: '[1]', val: "'Rust'" },
      { label: '[2]', val: "'Go'" }
    ];
  }, [isDict]);

  return (
    <div className="flex flex-col items-center justify-center p-3 w-full max-w-lg select-none">
      <div className="text-xs font-mono font-bold mb-2 text-[#2D2319]">
        {isDict ? 'Dictionary Key-Value Pigeonholes' : 'List Compartment Drawer'}
      </div>

      {/* Multi-Compartment Drawer */}
      <div className="grid grid-cols-3 gap-2.5 w-full bg-[#E0D7C5] border-3 border-[#2D2319] rounded-2xl p-3 shadow-[5px_5px_0px_#2D2319]">
        {slots.map((slot, i) => {
          const isSelected = activeSlot === i;
          return (
            <div
              key={i}
              onClick={() => {
                sound?.playKeyClick?.();
                setActiveSlot(i);
              }}
              className={`bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2.5 text-center cursor-pointer transition-all ${
                isSelected
                  ? 'ring-2 ring-[#48B89F] shadow-[3px_3px_0px_#2D2319] scale-105 bg-[#FDF8EE]'
                  : 'shadow-[1px_1px_0px_#2D2319] opacity-80'
              }`}
            >
              <span className="text-[10px] font-mono font-black text-[#2D2319]/70 block border-b border-[#2D2319]/20 pb-0.5">
                {slot.label}
              </span>
              <span className="font-mono text-xs font-black text-[#2D2319] block mt-1.5 truncate">
                {slot.val}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] font-mono text-[#2D2319]/70 mt-3 text-center">
        Access items in constant time O(1) by index <strong>items[{activeSlot}]</strong> or key.
      </p>
    </div>
  );
}

// ============================================================================
// 9. ARITHMETIC (Math Engine)
// ============================================================================
function ArithmeticVisual({ lesson, animKey }) {
  const [op, setOp] = useState('+');
  const a = 12;
  const b = 4;

  const result = useMemo(() => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '//': return Math.floor(a / b);
      default: return a + b;
    }
  }, [op]);

  return (
    <div className="flex flex-col items-center justify-center p-3 w-full max-w-md select-none">
      {/* Mechanical Arithmometer */}
      <div className="bg-[#FAF3E0] border-3 border-[#2D2319] rounded-2xl p-4 shadow-[5px_5px_0px_#2D2319] w-full flex flex-col items-center">
        <div className="flex items-center justify-around w-full font-mono">
          {/* Operand A Tumbler */}
          <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-2 text-center w-14 shadow-[2px_2px_0px_#2D2319]">
            <span className="text-[9px] text-[#2D2319]/60 block">a</span>
            <span className="text-xl font-black text-[#2D2319]">{a}</span>
          </div>

          {/* Operator Dial */}
          <div className="w-10 h-10 rounded-full bg-[#F6C445] border-2 border-[#2D2319] flex items-center justify-center text-base font-black shadow-[2px_2px_0px_#2D2319]">
            {op}
          </div>

          {/* Operand B Tumbler */}
          <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-2 text-center w-14 shadow-[2px_2px_0px_#2D2319]">
            <span className="text-[9px] text-[#2D2319]/60 block">b</span>
            <span className="text-xl font-black text-[#2D2319]">{b}</span>
          </div>

          <span className="text-lg font-black text-[#2D2319]">=</span>

          {/* Result Rolling Tumbler */}
          <div className="bg-[#48B89F] text-white border-2 border-[#2D2319] rounded-xl p-2 text-center w-16 shadow-[2px_2px_0px_#2D2319] animate-bounce">
            <span className="text-[9px] text-white/80 block font-bold">SUM</span>
            <span className="text-xl font-black">{result}</span>
          </div>
        </div>

        {/* Operator Selector Buttons */}
        <div className="flex gap-2 mt-4">
          {['+', '-', '*', '//'].map(symbol => (
            <button
              key={symbol}
              onClick={() => {
                sound?.playKeyClick?.();
                setOp(symbol);
              }}
              className={`px-3 py-1 rounded-lg border-2 border-[#2D2319] font-mono text-xs font-black cursor-pointer transition-all ${
                op === symbol
                  ? 'bg-[#F6C445] shadow-[2px_2px_0px_#2D2319] scale-105'
                  : 'bg-white hover:bg-amber-100 shadow-[1px_1px_0px_#2D2319]'
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[11px] font-mono text-[#2D2319]/70 mt-3 text-center">
        Python evaluates expressions strictly from left to right adhering to standard precedence (PEMDAS).
      </p>
    </div>
  );
}

// ============================================================================
// MAIN DYNAMIC VISUAL STAGE
// ============================================================================
export default function DynamicVisualStage({
  analogyType,
  lesson,
  isInteractive = true,
  className = ''
}) {
  const [animKey, setAnimKey] = useState(0);

  const effectiveType = useMemo(() => {
    if (analogyType) return analogyType.toLowerCase();
    return detectAnalogyType(lesson);
  }, [analogyType, lesson]);

  const triggerReplay = () => {
    sound?.playKeyClick?.();
    setAnimKey(p => p + 1);
  };

  const stageMeta = useMemo(() => {
    switch (effectiveType) {
      case 'box':
        return { title: 'RAM Memory Box', icon: <BoxIcon className="w-3.5 h-3.5" />, badge: 'Variables' };
      case 'megaphone':
        return { title: 'Megaphone & CRT Screen', icon: <MegaphoneIcon className="w-3.5 h-3.5" />, badge: 'Output' };
      case 'microphone':
        return { title: 'Studio Radio Microphone', icon: <MicIcon className="w-3.5 h-3.5" />, badge: 'Input' };
      case 'train':
        return { title: 'Locomotive Character Train', icon: <TrainIcon className="w-3.5 h-3.5" />, badge: 'Strings' };
      case 'fork':
        return { title: 'Railroad Decision Switch', icon: <ForkIcon className="w-3.5 h-3.5" />, badge: 'Conditionals' };
      case 'conveyor':
        return { title: 'Industrial Conveyor Loop', icon: <ConveyorIcon className="w-3.5 h-3.5" />, badge: 'Loops' };
      case 'machine':
        return { title: 'Contraption Function Machine', icon: <CogIcon className="w-3.5 h-3.5" />, badge: 'Functions' };
      case 'tray':
        return { title: 'Compartment Drawer Tray', icon: <TrayIcon className="w-3.5 h-3.5" />, badge: 'Structures' };
      case 'arithmetic':
      default:
        return { title: 'Mechanical Arithmometer', icon: <CalcIcon className="w-3.5 h-3.5" />, badge: 'Math' };
    }
  }, [effectiveType]);

  const renderVisualContent = () => {
    switch (effectiveType) {
      case 'box':
        return <BoxVisual lesson={lesson} animKey={animKey} />;
      case 'megaphone':
        return <MegaphoneVisual lesson={lesson} animKey={animKey} />;
      case 'microphone':
        return <MicrophoneVisual lesson={lesson} animKey={animKey} />;
      case 'train':
        return <TrainVisual lesson={lesson} animKey={animKey} />;
      case 'fork':
        return <ForkVisual lesson={lesson} animKey={animKey} />;
      case 'conveyor':
        return <ConveyorVisual lesson={lesson} animKey={animKey} />;
      case 'machine':
        return <MachineVisual lesson={lesson} animKey={animKey} />;
      case 'tray':
        return <TrayVisual lesson={lesson} animKey={animKey} />;
      case 'arithmetic':
        return <ArithmeticVisual lesson={lesson} animKey={animKey} />;
      default:
        return <BoxVisual lesson={lesson} animKey={animKey} />;
    }
  };

  return (
    <div
      className={`bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] overflow-hidden flex flex-col font-sans transition-all ${className}`}
    >
      {/* Visual Window Header */}
      <div className="bg-[#C3A6E8] px-3.5 py-2 border-b-2 border-[#2D2319] flex items-center justify-between text-xs font-mono font-bold text-[#2D2319] select-none">
        <div className="flex items-center space-x-2 truncate">
          {stageMeta.icon}
          <span className="truncate">{stageMeta.title}</span>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-2 py-0.5 rounded-md bg-[#F6C445] text-[#2D2319] text-[10px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            💡 {stageMeta.badge}
          </span>
          {isInteractive && (
            <button
              onClick={triggerReplay}
              className="p-1 rounded-md bg-[#FDF8EE] hover:bg-[#FAF3E0] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-[#2D2319] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all"
              title="Replay Animation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Animated Visual Canvas Stage */}
      <div className="p-3 sm:p-5 bg-[#FDF8EE] min-h-[220px] flex items-center justify-center relative overflow-hidden">
        {renderVisualContent()}
      </div>
    </div>
  );
}
