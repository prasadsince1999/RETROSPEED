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

  if (textToScan.includes('ladder') || textToScan.includes('tower') || textToScan.includes('language_ladder') || textToScan.includes('translator')) {
    return 'language_ladder';
  }
  if (textToScan.includes('cpython') || textToScan.includes('bytecode') || textToScan.includes('cpython_pipeline') || textToScan.includes('pipeline') || textToScan.includes('pvm')) {
    return 'cpython_pipeline';
  }
  if (textToScan.includes('sticky') || textToScan.includes('megaphone_sticky') || textToScan.includes('comment')) {
    return 'megaphone_sticky';
  }
  if (textToScan.includes('box_reassign') || textToScan.includes('reassign') || textToScan.includes('updating box') || textToScan.includes('swap')) {
    return 'box_reassign';
  }
  if (textToScan.includes('type_transformer') || textToScan.includes('transformer') || textToScan.includes('type converter') || textToScan.includes('string glue')) {
    return 'type_transformer';
  }

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
            className={`border-2 border-[#2D2319] p-2.5 rounded-xl transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
            className={`border-2 border-[#2D2319] p-2.5 rounded-xl transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
          className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-[#F6C445] border border-[#2D2319] shadow-[2px_2px_0px_#2D2319] hover:shadow-[3px_3px_0px_#2D2319] active:scale-95 active:translate-y-0.5 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
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
                className={`px-3 py-2 rounded-xl border-2 border-[#2D2319] font-mono text-xs font-black transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 cursor-pointer ${
                  isScanned
                    ? 'bg-[#48B89F] text-white shadow-[3px_3px_0px_#2D2319] scale-110 -translate-y-1'
                    : 'bg-[#FAF3E0] text-[#2D2319] opacity-70 hover:opacity-100 hover:shadow-[2px_2px_0px_#2D2319]'
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
  const [paramIdx, setParamIdx] = useState(0);
  const paramValues = useMemo(() => [5, 8, 12, 20], []);
  const currentX = paramValues[paramIdx];
  const returnVal = currentX * 2;

  useEffect(() => {
    setSteam(true);
    const t = setTimeout(() => setSteam(false), 800);
    return () => clearTimeout(t);
  }, [animKey, paramIdx]);

  const cycleParam = () => {
    sound?.playKeyClick?.();
    setParamIdx(prev => (prev + 1) % paramValues.length);
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 w-full max-w-md select-none">
      {/* Top Input Hopper */}
      <div
        onClick={cycleParam}
        className="flex flex-col items-center cursor-pointer group"
        title="Click to cycle input parameter"
      >
        <div className="bg-[#C3A6E8] border-2 border-[#2D2319] px-3.5 py-1.5 rounded-xl shadow-[2px_2px_0px_#2D2319] hover:shadow-[3px_3px_0px_#2D2319] active:scale-95 active:translate-y-0.5 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] text-xs font-mono font-black flex items-center gap-1.5">
          <span>Input Parameter: x = {currentX}</span>
          <span className="text-[10px] text-[#2D2319]/60">↻</span>
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
            <span className="text-xs font-black text-[#2D2319]">result = {currentX} * 2</span>
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
        <div className="bg-[#48B89F] text-white border-2 border-[#2D2319] px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_#2D2319] text-xs font-mono font-black flex items-center gap-1.5 animate-bounce transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <span>return: {returnVal}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="mt-2 text-center">
        <button
          onClick={cycleParam}
          className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-[#F6C445] border border-[#2D2319] shadow-[2px_2px_0px_#2D2319] hover:shadow-[3px_3px_0px_#2D2319] active:scale-95 active:translate-y-0.5 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
        >
          ⚙ Cycle Parameter: <strong>x = {currentX} ➔ return {returnVal}</strong>
        </button>
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
              className={`bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2.5 text-center cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 ${
                isSelected
                  ? 'ring-2 ring-[#48B89F] shadow-[3px_3px_0px_#2D2319] scale-105 bg-[#FDF8EE]'
                  : 'shadow-[1px_1px_0px_#2D2319] opacity-80 hover:opacity-100 hover:shadow-[2px_2px_0px_#2D2319]'
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
// 10. LANGUAGE LADDER TOWER (Levels of Languages: Human -> Python -> Assembly -> Binary)
// ============================================================================
function LanguageLadderVisual({ lesson, animKey }) {
  const [activeFloor, setActiveFloor] = useState(3); // 4=Human, 3=Python, 2=Assembly, 1=Binary
  const [isTranslating, setIsTranslating] = useState(false);

  const floors = [
    {
      id: 4,
      title: "Human Speech",
      codeSnippet: '"Calculate 5 + 5 for me"',
      desc: "Natural human languages (English, Hindi, Spanish) are too vague for computers to execute directly.",
      badge: "Floor 4: Human Intent"
    },
    {
      id: 3,
      title: "Python (High-Level)",
      codeSnippet: "print(5 + 5)",
      desc: "Clean, readable English-like syntax. Python acts as your universal translation bridge!",
      badge: "Floor 3: You Code Here! 🐍"
    },
    {
      id: 2,
      title: "Assembly (Low-Level)",
      codeSnippet: "MOV EAX, 5 \nADD EAX, 5",
      desc: "Hardware-specific CPU register instructions. Hard to write and bound to one chip architecture.",
      badge: "Floor 2: CPU Registers"
    },
    {
      id: 1,
      title: "Machine Binary",
      codeSnippet: "01001000 01100101",
      desc: "Raw electronic voltage states (On/Off) moving through physical silicon transistors.",
      badge: "Floor 1: Physical Hardware ⚡"
    }
  ];

  const handleTranslate = (targetFloor) => {
    sound?.playKeyClick?.();
    setIsTranslating(true);
    setActiveFloor(targetFloor);
    setTimeout(() => setIsTranslating(false), 400);
  };

  useEffect(() => {
    setActiveFloor(3);
  }, [animKey, lesson]);

  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      {/* Elevator Tower Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {floors.map((floor) => {
          const isActive = activeFloor === floor.id;
          return (
            <button
              key={floor.id}
              onClick={() => handleTranslate(floor.id)}
              className={`p-2.5 rounded-xl border-2 text-left cursor-pointer transition-all duration-200 relative ${
                isActive
                  ? 'bg-white border-[#2D2319] shadow-[3px_3px_0px_#2D2319] scale-[1.02] ring-2 ring-[#F6C445]'
                  : 'bg-[#FAF3E0]/70 border-[#2D2319]/40 hover:border-[#2D2319] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#FAF3E0] border border-[#2D2319]/30">
                  {floor.badge}
                </span>
                {isActive && <span className="text-xs">📍</span>}
              </div>
              <div className="font-bold text-xs text-[#2D2319] leading-tight mb-1">{floor.title}</div>
              <div className="font-mono text-[9px] bg-stone-900 text-emerald-400 p-1 rounded border border-[#2D2319] truncate">
                {floor.codeSnippet.split('\n')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Explanation Box */}
      <div className="w-full bg-white border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 bg-[#48B89F] text-[#2D2319] font-mono text-[10px] font-black rounded border border-[#2D2319]">
              Tier {activeFloor} of 4
            </span>
            <span className="text-xs font-bold text-[#2D2319]">
              {floors.find(f => f.id === activeFloor)?.title}
            </span>
          </div>
          <p className="text-xs text-[#2D2319]/80 font-sans leading-relaxed">
            {floors.find(f => f.id === activeFloor)?.desc}
          </p>
        </div>

        <div className="shrink-0 flex items-center space-x-2">
          <button
            onClick={() => handleTranslate(3)}
            className="px-3 py-1.5 bg-[#F6C445] hover:bg-amber-400 border-2 border-[#2D2319] rounded-lg font-mono text-xs font-bold text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            Focus Python 🐍
          </button>
        </div>
      </div>

      <div className="mt-2 text-[11px] font-mono text-[#2D2319]/70 text-center">
        💡 Python lets you write at Floor 3 and automatically translates everything down to Floor 1!
      </div>
    </div>
  );
}

// ============================================================================
// 11. CPYTHON 3-STAGE PIPELINE (app.py -> Compiler -> app.pyc Bytecode -> PVM)
// ============================================================================
function CPythonPipelineVisual({ lesson, animKey }) {
  const [pipelineStage, setPipelineStage] = useState(0); // 0=app.py, 1=Compiler, 2=Bytecode, 3=PVM/CPU
  const [isRunning, setIsRunning] = useState(false);

  const runPipeline = () => {
    sound?.playKeyClick?.();
    setIsRunning(true);
    setPipelineStage(1);
    setTimeout(() => setPipelineStage(2), 600);
    setTimeout(() => {
      setPipelineStage(3);
      setIsRunning(false);
    }, 1200);
  };

  useEffect(() => {
    setPipelineStage(0);
    setIsRunning(false);
  }, [animKey, lesson]);

  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      {/* 4 Pipeline Stages */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {/* Step 1: Source */}
        <div className={`p-2.5 rounded-xl border-2 transition-all duration-300 ${pipelineStage >= 0 ? 'bg-white border-[#2D2319] shadow-[2px_2px_0px_#2D2319]' : 'opacity-60 bg-stone-100'}`}>
          <div className="flex items-center space-x-1 text-[10px] font-mono font-bold text-[#2D2319] mb-1">
            <span>📄</span>
            <span>1. app.py</span>
          </div>
          <div className="bg-stone-900 text-amber-300 font-mono text-[9px] p-1.5 rounded border border-[#2D2319] truncate">
            print(5 + 5)
          </div>
          <div className="text-[9px] text-[#2D2319]/70 mt-1 font-mono">Your source code</div>
        </div>

        {/* Step 2: Compiler */}
        <div className={`p-2.5 rounded-xl border-2 transition-all duration-300 ${pipelineStage >= 1 ? 'bg-[#F6C445]/40 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]' : 'opacity-60 bg-stone-100'}`}>
          <div className="flex items-center space-x-1 text-[10px] font-mono font-bold text-[#2D2319] mb-1">
            <span className={pipelineStage === 1 ? 'animate-spin' : ''}>⚙️</span>
            <span>2. Compiler</span>
          </div>
          <div className="bg-[#FAF3E0] text-[#2D2319] font-mono text-[9px] p-1.5 rounded border border-[#2D2319] text-center font-bold">
            CPython Engine
          </div>
          <div className="text-[9px] text-[#2D2319]/70 mt-1 font-mono">Checks syntax</div>
        </div>

        {/* Step 3: Bytecode */}
        <div className={`p-2.5 rounded-xl border-2 transition-all duration-300 ${pipelineStage >= 2 ? 'bg-[#C3A6E8]/40 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]' : 'opacity-60 bg-stone-100'}`}>
          <div className="flex items-center space-x-1 text-[10px] font-mono font-bold text-[#2D2319] mb-1">
            <span>💾</span>
            <span>3. app.pyc</span>
          </div>
          <div className="bg-stone-900 text-sky-300 font-mono text-[9px] p-1.5 rounded border border-[#2D2319] truncate">
            LOAD_CONST 10
          </div>
          <div className="text-[9px] text-[#2D2319]/70 mt-1 font-mono">Intermediate bytecode</div>
        </div>

        {/* Step 4: PVM */}
        <div className={`p-2.5 rounded-xl border-2 transition-all duration-300 ${pipelineStage >= 3 ? 'bg-[#48B89F]/40 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]' : 'opacity-60 bg-stone-100'}`}>
          <div className="flex items-center space-x-1 text-[10px] font-mono font-bold text-[#2D2319] mb-1">
            <span className={pipelineStage === 3 ? 'animate-pulse' : ''}>⚡</span>
            <span>4. PVM Virtual Machine</span>
          </div>
          <div className="bg-black text-emerald-400 font-mono text-[9px] p-1.5 rounded border border-[#2D2319] text-center font-bold">
            &gt; 10
          </div>
          <div className="text-[9px] text-[#2D2319]/70 mt-1 font-mono">CPU Execution</div>
        </div>
      </div>

      {/* Pipeline Controller */}
      <div className="w-full bg-white border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319] flex items-center justify-between gap-3">
        <p className="text-xs text-[#2D2319]/80 font-sans">
          {pipelineStage === 0 && "Your human-written .py file is ready to compile."}
          {pipelineStage === 1 && "CPython compiler parses your code and generates bytecode."}
          {pipelineStage === 2 && "Bytecode (.pyc) is stored in memory so it can execute instantly."}
          {pipelineStage === 3 && "The Python Virtual Machine (PVM) feeds instructions straight to your CPU!"}
        </p>

        <button
          onClick={runPipeline}
          disabled={isRunning}
          className="px-3 py-1.5 bg-[#F6C445] hover:bg-amber-400 border-2 border-[#2D2319] rounded-lg font-mono text-xs font-bold text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer shrink-0"
        >
          {isRunning ? "Running..." : "▶ Run Pipeline"}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 12. MEGAPHONE & STICKY NOTE (print vs # comments)
// ============================================================================
function MegaphoneStickyVisual({ lesson, animKey }) {
  const [shouting, setShouting] = useState(false);
  const [stickyPeeling, setStickyPeeling] = useState(false);

  const message = useMemo(() => {
    const code = lesson?.code || "print('hello, terminal')";
    const match = code.match(/print\(\s*['"](.+?)['"]\s*\)/);
    return match ? match[1] : "hello, terminal";
  }, [lesson]);

  const comment = useMemo(() => {
    const code = lesson?.code || "# greet the terminal";
    const match = code.match(/#\s*(.+)/);
    return match ? match[1] : "greet the terminal";
  }, [lesson]);

  const triggerShout = () => {
    sound?.playKeyClick?.();
    setShouting(true);
    setTimeout(() => setShouting(false), 800);
  };

  const toggleSticky = () => {
    sound?.playKeyClick?.();
    setStickyPeeling(prev => !prev);
  };

  useEffect(() => {
    setShouting(false);
    setStickyPeeling(false);
  }, [animKey, lesson]);

  return (
    <div className="w-full max-w-xl flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Megaphone & Screen Side */}
      <div className="flex-1 w-full flex flex-col items-center bg-white border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319]">
        <div className="flex items-center space-x-2 mb-2 w-full justify-between">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#FAF3E0] rounded border border-[#2D2319]">
            The Megaphone: print()
          </span>
          <button
            onClick={triggerShout}
            className="px-2.5 py-1 bg-[#F6C445] hover:bg-amber-400 border-2 border-[#2D2319] rounded font-mono text-[11px] font-bold text-[#2D2319] shadow-[1px_1px_0px_#2D2319] cursor-pointer"
          >
            📢 Broadcast
          </button>
        </div>

        {/* Megaphone Graphic */}
        <div className="flex items-center space-x-3 my-1">
          <div className={`text-4xl transition-transform duration-300 ${shouting ? 'scale-125 -rotate-12' : ''}`}>
            📣
          </div>
          <div className="flex flex-col space-y-1">
            <span className={`text-xs font-mono font-bold text-amber-600 transition-opacity ${shouting ? 'opacity-100 animate-ping' : 'opacity-20'}`}>
              )))
            </span>
          </div>
        </div>

        {/* Green CRT Screen */}
        <div className="w-full bg-stone-900 border-2 border-[#2D2319] rounded-lg p-2 text-emerald-400 font-mono text-xs shadow-inner mt-1">
          <div className="text-[8px] text-emerald-600 mb-1 border-b border-emerald-900/50 pb-0.5 flex justify-between">
            <span>TERMINAL DISPLAY</span>
            <span>STDOUT</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-emerald-500 font-bold">&gt;</span>
            <span className={shouting ? 'font-bold text-white transition-colors' : ''}>
              {message}
            </span>
            <span className="w-2 h-3 bg-emerald-400 inline-block animate-pulse ml-1" />
          </div>
        </div>
      </div>

      {/* Sticky Note Side (# comments) */}
      <div className="w-full md:w-52 shrink-0 relative">
        <div
          onClick={toggleSticky}
          className={`cursor-pointer bg-yellow-200 border-2 border-yellow-500 p-3 rounded-lg shadow-[3px_3px_0px_#2D2319] transition-all duration-300 relative ${
            stickyPeeling ? 'rotate-6 translate-y-1 opacity-75' : '-rotate-2'
          }`}
        >
          {/* Tape / Pushpin */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-amber-300/80 border border-amber-500/50 rounded-sm" />

          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-bold text-amber-900 uppercase">
              # Sticky Note
            </span>
            <span className="text-[10px]">📌</span>
          </div>

          <p className="font-handwriting text-xs text-amber-950 italic mb-2">
            "{comment}"
          </p>

          <div className="bg-yellow-300/80 border border-yellow-600/50 rounded p-1 text-[9px] font-mono text-amber-900">
            {stickyPeeling ? "⚠️ Ignored by Python!" : "👀 Read by humans only"}
          </div>
        </div>

        <div className="text-[10px] font-mono text-center text-[#2D2319]/70 mt-2">
          Click note to peel or stick!
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 13. BOX REASSIGN VISUAL (Variable Storage & Value Swapping)
// ============================================================================
function BoxReassignVisual({ lesson, animKey }) {
  const [val, setVal] = useState(10);
  const [isSwapping, setIsSwapping] = useState(false);
  const [oldVal, setOldVal] = useState(null);

  const varName = useMemo(() => {
    const code = lesson?.code || 'score = 10';
    const match = code.match(/([a-zA-Z_]\w*)\s*=/);
    return match ? match[1] : 'score';
  }, [lesson]);

  const handleUpdate = (newVal) => {
    if (newVal === val) return;
    sound?.playKeyClick?.();
    setOldVal(val);
    setIsSwapping(true);
    setVal(newVal);
    setTimeout(() => {
      setIsSwapping(false);
      setOldVal(null);
    }, 600);
  };

  useEffect(() => {
    setVal(10);
    setIsSwapping(false);
    setOldVal(null);
  }, [animKey, lesson]);

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      {/* The Storage Box */}
      <div className="relative w-44 h-32 bg-[#E8DCC4] border-3 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] flex flex-col items-center justify-center p-3 my-1">
        {/* Box Lid & Swing Tag */}
        <div className="absolute -top-3 left-3 px-2.5 py-0.5 bg-[#F6C445] border-2 border-[#2D2319] rounded-md font-mono text-xs font-black shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1">
          <span>🏷️</span>
          <span>{varName}</span>
        </div>

        {/* Ejected old value floating out */}
        {isSwapping && oldVal !== null && (
          <div className="absolute -top-7 animate-out fade-out slide-out-to-top-4 duration-500 px-2.5 py-0.5 bg-rose-100 border-2 border-rose-500 rounded-lg font-mono text-xs font-bold text-rose-700 line-through">
            {oldVal}
          </div>
        )}

        {/* Inside the box: Current value badge */}
        <div className={`px-4 py-1.5 bg-white border-2 border-[#2D2319] rounded-xl font-mono text-2xl font-black text-[#2D2319] shadow-[2px_2px_0px_#2D2319] transition-transform duration-300 ${
          isSwapping ? 'scale-125 bg-emerald-100 border-emerald-600 text-emerald-800' : ''
        }`}>
          {val}
        </div>

        <div className="text-[10px] font-mono text-[#2D2319]/70 mt-1">
          RAM Memory Box
        </div>
      </div>

      {/* Interactive Value Assignment Controls */}
      <div className="w-full flex items-center justify-center space-x-2 mt-2">
        <button
          onClick={() => handleUpdate(10)}
          className={`px-3 py-1.5 rounded-lg border-2 border-[#2D2319] font-mono text-xs font-bold cursor-pointer transition-all ${
            val === 10
              ? 'bg-[#F6C445] shadow-[2px_2px_0px_#2D2319] scale-105'
              : 'bg-white hover:bg-stone-50 shadow-[1px_1px_0px_#2D2319]'
          }`}
        >
          {varName} = 10
        </button>

        <button
          onClick={() => handleUpdate(20)}
          className={`px-3 py-1.5 rounded-lg border-2 border-[#2D2319] font-mono text-xs font-bold cursor-pointer transition-all ${
            val === 20
              ? 'bg-[#F6C445] shadow-[2px_2px_0px_#2D2319] scale-105'
              : 'bg-white hover:bg-stone-50 shadow-[1px_1px_0px_#2D2319]'
          }`}
        >
          {varName} = 20
        </button>

        <button
          onClick={() => handleUpdate(val + 2)}
          className="px-3 py-1.5 rounded-lg border-2 border-[#2D2319] bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-mono text-xs font-bold cursor-pointer shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          + 2 (Reassign)
        </button>
      </div>

      <p className="text-[11px] font-mono text-[#2D2319]/70 mt-2 text-center">
        Reassigning replaces the old value inside the labeled box.
      </p>
    </div>
  );
}

// ============================================================================
// 14. TYPE TRANSFORMER CHAMBER ("5" + "5" = "55" vs int("5") + int("5") = 10)
// ============================================================================
function TypeTransformerVisual({ lesson, animKey }) {
  const [isCast, setIsCast] = useState(false);

  const toggleCast = () => {
    sound?.playKeyClick?.();
    setIsCast(prev => !prev);
  };

  useEffect(() => {
    setIsCast(false);
  }, [animKey, lesson]);

  return (
    <div className="w-full max-w-lg flex flex-col items-center">
      {/* Comparison Split Buttons */}
      <div className="w-full flex items-center justify-between mb-2 bg-[#FAF3E0] border-2 border-[#2D2319] p-1 rounded-xl shadow-[2px_2px_0px_#2D2319]">
        <button
          onClick={() => setIsCast(false)}
          className={`flex-1 py-1 rounded-lg font-mono text-xs font-bold cursor-pointer transition-all text-center ${
            !isCast
              ? 'bg-rose-200 border-2 border-[#2D2319] text-rose-950 shadow-[1px_1px_0px_#2D2319]'
              : 'text-[#2D2319]/60 hover:text-[#2D2319]'
          }`}
        >
          1. String Trap ("5" + "5")
        </button>
        <button
          onClick={() => setIsCast(true)}
          className={`flex-1 py-1 rounded-lg font-mono text-xs font-bold cursor-pointer transition-all text-center ${
            isCast
              ? 'bg-[#48B89F] border-2 border-[#2D2319] text-[#2D2319] shadow-[1px_1px_0px_#2D2319]'
              : 'text-[#2D2319]/60 hover:text-[#2D2319]'
          }`}
        >
          2. int() Transformer (5 + 5)
        </button>
      </div>

      {/* Main Visual Chamber */}
      <div className="w-full bg-white border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319] flex flex-col items-center">
        {!isCast ? (
          // String Concatenation Mode
          <div className="w-full flex flex-col items-center">
            <div className="text-[11px] font-mono font-bold text-rose-800 bg-rose-50 border border-rose-300 px-2 py-0.5 rounded-md mb-2">
              Without int(): Strings Glue Together!
            </div>

            <div className="flex items-center space-x-2 my-1">
              <div className="px-3 py-1.5 bg-amber-100 border-2 border-[#2D2319] rounded-xl font-mono text-base font-black text-amber-900 shadow-[2px_2px_0px_#2D2319]">
                "5"
              </div>
              <span className="font-mono text-lg font-black text-rose-600">+</span>
              <div className="px-3 py-1.5 bg-amber-100 border-2 border-[#2D2319] rounded-xl font-mono text-base font-black text-amber-900 shadow-[2px_2px_0px_#2D2319]">
                "5"
              </div>
              <span className="font-mono text-lg font-black text-[#2D2319]">=</span>
              <div className="px-3.5 py-1.5 bg-rose-100 border-2 border-[#2D2319] rounded-xl font-mono text-lg font-black text-rose-900 shadow-[2px_2px_0px_#2D2319]">
                "55"
              </div>
            </div>

            <p className="text-xs text-[#2D2319]/80 text-center mt-2 font-sans">
              Quotes tell Python these are text letters, so <code className="bg-stone-100 px-1 rounded font-bold">+</code> glues them together like words.
            </p>
          </div>
        ) : (
          // Integer Math Mode
          <div className="w-full flex flex-col items-center">
            <div className="text-[11px] font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-md mb-2">
              With int(): Quotes Stripped &rarr; Real Math!
            </div>

            <div className="flex items-center space-x-2 my-1">
              <div className="px-3 py-1.5 bg-[#48B89F]/30 border-2 border-[#2D2319] rounded-xl font-mono text-base font-black text-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                5
              </div>
              <span className="font-mono text-lg font-black text-emerald-600">+</span>
              <div className="px-3 py-1.5 bg-[#48B89F]/30 border-2 border-[#2D2319] rounded-xl font-mono text-base font-black text-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                5
              </div>
              <span className="font-mono text-lg font-black text-[#2D2319]">=</span>
              <div className="px-3.5 py-1.5 bg-[#F6C445] border-2 border-[#2D2319] rounded-xl font-mono text-lg font-black text-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
                10
              </div>
            </div>

            <p className="text-xs text-[#2D2319]/80 text-center mt-2 font-sans">
              <code className="bg-stone-100 px-1 rounded font-bold">int()</code> converts text into numbers so math addition equals <strong>10</strong>!
            </p>
          </div>
        )}

        <button
          onClick={toggleCast}
          className="mt-2 px-3 py-1 bg-[#FAF3E0] hover:bg-amber-100 border-2 border-[#2D2319] rounded-lg font-mono text-xs font-bold text-[#2D2319] shadow-[2px_2px_0px_#2D2319] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          {isCast ? "⬅️ See String Trap" : "⚡ Apply int() Transformer ➡️"}
        </button>
      </div>
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
      case 'language_ladder':
        return { title: '4-Tier Language Tower', icon: <TrayIcon className="w-3.5 h-3.5" />, badge: 'Abstraction' };
      case 'cpython_pipeline':
        return { title: 'CPython 3-Stage Pipeline', icon: <Cpu className="w-3.5 h-3.5" />, badge: 'Execution' };
      case 'megaphone_sticky':
        return { title: 'Megaphone & Sticky Note', icon: <MegaphoneIcon className="w-3.5 h-3.5" />, badge: 'Syntax' };
      case 'box_reassign':
        return { title: 'Storage Box & Value Swap', icon: <BoxIcon className="w-3.5 h-3.5" />, badge: 'Variables' };
      case 'type_transformer':
        return { title: 'Type Converter Chamber', icon: <Zap className="w-3.5 h-3.5" />, badge: 'Data Types' };
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
      case 'language_ladder':
        return <LanguageLadderVisual lesson={lesson} animKey={animKey} />;
      case 'cpython_pipeline':
        return <CPythonPipelineVisual lesson={lesson} animKey={animKey} />;
      case 'megaphone_sticky':
        return <MegaphoneStickyVisual lesson={lesson} animKey={animKey} />;
      case 'box_reassign':
        return <BoxReassignVisual lesson={lesson} animKey={animKey} />;
      case 'type_transformer':
        return <TypeTransformerVisual lesson={lesson} animKey={animKey} />;
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
