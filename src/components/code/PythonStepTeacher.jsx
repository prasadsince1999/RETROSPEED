import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BookOpen,
  Code2,
  Cpu,
  Terminal as TerminalIcon,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FastForward,
  Sparkles,
  Info,
  Flame,
  Zap,
  Tag,
  Lightbulb,
  Keyboard
} from 'lucide-react';
import DynamicVisualStage from './visuals/DynamicVisualStage';
import { sound } from '../../utils/audio';

/**
 * Tokenize simple Python code into interactive syntax pills
 */
function tokenizePythonCode(code = '') {
  if (!code) return [];

  const KEYWORDS = new Set([
    'def', 'if', 'elif', 'else', 'for', 'while', 'return', 'in', 'import',
    'from', 'as', 'try', 'except', 'finally', 'with', 'is', 'not', 'and',
    'or', 'pass', 'break', 'continue', 'lambda', 'yield', 'class', 'global',
    'nonlocal', 'assert', 'True', 'False', 'None'
  ]);

  const BUILTINS = new Set([
    'print', 'input', 'len', 'range', 'int', 'str', 'float', 'list',
    'dict', 'set', 'tuple', 'type', 'sum', 'min', 'max', 'sorted',
    'any', 'all', 'enumerate', 'zip', 'map', 'filter', 'open', 'round', 'abs'
  ]);

  const lines = code.split('\n');
  const tokenizedLines = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    const tokens = [];
    let i = 0;

    while (i < line.length) {
      // 1. Whitespace
      if (/\s/.test(line[i])) {
        let ws = '';
        while (i < line.length && /\s/.test(line[i])) {
          ws += line[i++];
        }
        tokens.push({ type: 'whitespace', text: ws });
        continue;
      }

      // 2. Comments
      if (line[i] === '#') {
        const commentText = line.slice(i);
        tokens.push({
          type: 'comment',
          text: commentText,
          description: 'A comment line ignored by Python, written for humans to read.'
        });
        i = line.length;
        continue;
      }

      // 3. String literals
      if (line[i] === '"' || line[i] === "'") {
        const quote = line[i];
        let str = quote;
        i++;
        while (i < line.length && line[i] !== quote) {
          if (line[i] === '\\' && i + 1 < line.length) {
            str += line[i++];
          }
          str += line[i++];
        }
        if (i < line.length) str += line[i++];
        tokens.push({
          type: 'string',
          text: str,
          description: `String literal: Text characters wrapped in quotes (${str}).`
        });
        continue;
      }

      // 4. Numbers
      if (/[0-9]/.test(line[i])) {
        let num = '';
        while (i < line.length && /[0-9.]/.test(line[i])) {
          num += line[i++];
        }
        tokens.push({
          type: 'number',
          text: num,
          description: `Numeric literal: ${num.includes('.') ? 'Floating point' : 'Integer'} value.`
        });
        continue;
      }

      // 5. Identifiers / Keywords / Builtins
      if (/[a-zA-Z_]/.test(line[i])) {
        let ident = '';
        while (i < line.length && /[a-zA-Z0-9_]/.test(line[i])) {
          ident += line[i++];
        }

        if (KEYWORDS.has(ident)) {
          tokens.push({
            type: 'keyword',
            text: ident,
            description: `Python keyword '${ident}': A reserved instruction controlling program flow.`
          });
        } else if (BUILTINS.has(ident)) {
          tokens.push({
            type: 'builtin',
            text: ident,
            description: `Built-in function '${ident}()': Python's pre-packaged standard utility.`
          });
        } else {
          tokens.push({
            type: 'variable',
            text: ident,
            description: `Identifier / Variable '${ident}': A custom name pointing to data in memory.`
          });
        }
        continue;
      }

      // 6. Operators & Punctuation
      const char = line[i++];
      tokens.push({
        type: 'operator',
        text: char,
        description:
          char === '=' ? 'Assignment operator: Stores the right-hand value into the left-hand variable.' :
          char === ':' ? 'Colon: Signals the start of an indented block of instructions.' :
          char === '(' || char === ')' ? 'Parentheses: Enclose function arguments or grouped expressions.' :
          char === '[' || char === ']' ? 'Square brackets: Used for lists, collections, and index lookups.' :
          `Symbol '${char}': Python operator or syntax delimiter.`
      });
    }

    tokenizedLines.push(tokens);
  }

  return tokenizedLines;
}

/**
 * Generate fallback code breakdown cards if not present in lesson
 */
function generateFallbackBreakdown(tokens = [], lesson) {
  if (lesson?.codeBreakdown && Array.isArray(lesson.codeBreakdown)) {
    return lesson.codeBreakdown;
  }

  // Deduplicate meaningful tokens
  const seen = new Set();
  const cards = [];

  for (const line of tokens) {
    for (const tok of line) {
      if (tok.type === 'whitespace' || seen.has(tok.text)) continue;
      seen.add(tok.text);

      let title = tok.text;
      let badge = tok.type;
      let explanation = tok.description;

      if (tok.type === 'builtin') {
        title = `${tok.text}()`;
        badge = 'Built-in Function';
        explanation = `Broadcasting or reading data using Python's standard library.`;
      } else if (tok.type === 'keyword') {
        badge = 'Keyword';
        explanation = `Reserved core syntax keyword telling the interpreter how to route code.`;
      } else if (tok.type === 'variable') {
        badge = 'Variable Name';
        explanation = `Labeled slot in computer memory where values are preserved.`;
      } else if (tok.type === 'string') {
        badge = 'Text String';
        explanation = `Literal text sequence bounded by quote marks.`;
      } else if (tok.type === 'number') {
        badge = 'Numeric Literal';
        explanation = `Calculated raw numeric quantity stored in RAM.`;
      }

      cards.push({
        token: title,
        role: badge,
        explanation
      });

      if (cards.length >= 4) break;
    }
    if (cards.length >= 4) break;
  }

  return cards;
}

/**
 * Animated Professor Byte Mascot in Teaching Pose
 */
function ProfessorByteMascot({ message, analogy }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[3px_3px_0px_#2D2319]">
      {/* Mascot Graphic */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#C3A6E8] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-3xl sm:text-4xl animate-bounce">
          🎓
        </div>
        <span className="text-[10px] font-mono font-black text-[#2D2319] bg-[#F6C445] px-2 py-0.5 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] -mt-2 uppercase tracking-wide">
          Coach Byte
        </span>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 relative w-full">
        <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl p-3.5 shadow-[2px_2px_0px_#2D2319] relative">
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-[#2D2319]/15">
            <span className="text-[11px] font-mono font-black text-[#2D2319] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F6C445]" />
              MENTOR INSIGHT
            </span>
            {analogy && (
              <span className="text-[10px] font-mono font-bold bg-[#FAF3E0] text-[#2D2319] px-2 py-0.5 rounded border border-[#2D2319]/40">
                💡 {analogy}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm font-sans font-medium text-[#2D2319] leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * PythonStepTeacher Component
 * 4-step interactive progressive guided teacher
 */
export default function PythonStepTeacher({
  lesson,
  chapter = 1,
  onStartTyping,
  onExit
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxVisitedStep, setMaxVisitedStep] = useState(1);
  const [selectedToken, setSelectedToken] = useState(null);

  // Step 3 Execution Simulation States
  const [simState, setSimState] = useState(1); // 1: Read, 2: Memory, 3: Output
  const [isSimPlaying, setIsSimPlaying] = useState(true);

  const code = lesson?.code || "print('Hello, Python!')";
  const expectedOutput = lesson?.expectedOutput || 'Hello, Python!';
  const explanation = lesson?.instructorExplanation || lesson?.concept || lesson?.text || "Let's explore how Python executes this step by step.";
  const analogy = lesson?.analogy || 'Physical Mental Model';

  const tokenizedLines = useMemo(() => tokenizePythonCode(code), [code]);
  const breakdownCards = useMemo(() => generateFallbackBreakdown(tokenizedLines, lesson), [tokenizedLines, lesson]);

  // Default active token for step 2
  useEffect(() => {
    if (!selectedToken) {
      for (const line of tokenizedLines) {
        for (const tok of line) {
          if (tok.type !== 'whitespace') {
            setSelectedToken(tok);
            return;
          }
        }
      }
    }
  }, [tokenizedLines, selectedToken]);

  // Simulation timer for Step 3
  useEffect(() => {
    let timer;
    if (currentStep === 3 && isSimPlaying) {
      timer = setInterval(() => {
        setSimState(prev => (prev >= 3 ? 1 : prev + 1));
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [currentStep, isSimPlaying]);

  const goToStep = useCallback((step) => {
    sound?.playKeyClick?.();
    setCurrentStep(step);
    setMaxVisitedStep(prev => Math.max(prev, step));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < 4) {
      goToStep(currentStep + 1);
    } else if (onStartTyping) {
      sound?.playKeyClick?.();
      onStartTyping();
    }
  }, [currentStep, goToStep, onStartTyping]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleBack();
      } else if (e.key === 'Escape' && onExit) {
        e.preventDefault();
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleBack, onExit]);

  const stepsMeta = [
    { num: 1, label: 'Mental Model', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { num: 2, label: 'Code Anatomy', icon: <Code2 className="w-3.5 h-3.5" /> },
    { num: 3, label: 'How It Runs', icon: <Cpu className="w-3.5 h-3.5" /> },
    { num: 4, label: 'Ready to Code', icon: <Keyboard className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="w-full h-full flex flex-col font-sans select-none bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] overflow-hidden">
      {/* 1. TOP HEADER & PROGRESS STEP PILLS */}
      <div className="bg-[#C3A6E8] px-3.5 py-2.5 border-b-2 border-[#2D2319] flex flex-wrap items-center justify-between gap-2.5 shrink-0 text-xs font-mono font-bold text-[#2D2319]">
        {/* Step Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5">
          {stepsMeta.map((s) => {
            const isActive = currentStep === s.num;
            const isDone = s.num < currentStep;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => goToStep(s.num)}
                className={`px-2.5 py-1 rounded-xl border-2 border-[#2D2319] flex items-center space-x-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F6C445] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] scale-105 font-black'
                    : isDone
                    ? 'bg-[#48B89F] text-white shadow-[1px_1px_0px_#2D2319]'
                    : 'bg-[#FDF8EE] text-[#2D2319]/70 opacity-70 hover:opacity-100'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                ) : (
                  s.icon
                )}
                <span>{s.num}. {s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Fast Action: Skip to Typing */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              sound?.playKeyClick?.();
              if (onStartTyping) onStartTyping();
            }}
            className="px-2.5 py-1 rounded-xl bg-[#FAF3E0] hover:bg-[#FDF8EE] border border-[#2D2319] text-[#2D2319] text-[11px] font-bold flex items-center space-x-1 shadow-[1px_1px_0px_#2D2319] cursor-pointer"
            title="Skip directly to code typing"
          >
            <span>Skip to Typing</span>
            <FastForward className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. MAIN STAGE CONTENT (STEPS 1 - 4) */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col justify-between">
        {/* STEP 1: THE MENTAL MODEL */}
        {currentStep === 1 && (
          <div className="space-y-4 max-w-2xl mx-auto w-full">
            {/* Animated Physical Mental Model */}
            <DynamicVisualStage analogyType={lesson?.analogyType} lesson={lesson} />

            {/* Coach Byte / Professor Byte Teaching Pose & Speech Bubble */}
            <ProfessorByteMascot message={explanation} analogy={analogy} />
          </div>
        )}

        {/* STEP 2: CODE ANATOMY */}
        {currentStep === 2 && (
          <div className="space-y-4 max-w-2xl mx-auto w-full">
            <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[3px_3px_0px_#2D2319]">
              <div className="flex items-center justify-between pb-2 border-b border-[#2D2319]/20 mb-3 text-xs font-mono font-bold text-[#2D2319]">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#F6C445]" />
                  INTERACTIVE TOKEN ANATOMY
                </span>
                <span className="text-[10px] text-[#2D2319]/60">Click or hover any pill to inspect</span>
              </div>

              {/* Code Snippet with Interactive Token Pills */}
              <div className="bg-[#2D2319] p-4 rounded-xl font-mono text-sm leading-loose border-2 border-[#2D2319] shadow-inner overflow-x-auto">
                {tokenizedLines.map((lineTokens, lineIdx) => (
                  <div key={lineIdx} className="flex items-baseline flex-wrap py-0.5">
                    <span className="text-[11px] text-[#FDF8EE]/30 w-6 select-none text-right mr-3 shrink-0">
                      {String(lineIdx + 1).padStart(2, '0')}
                    </span>
                    {lineTokens.map((tok, tokIdx) => {
                      if (tok.type === 'whitespace') {
                        return <span key={tokIdx} className="whitespace-pre">{tok.text}</span>;
                      }

                      const isSelected = selectedToken?.text === tok.text;
                      let pillClass = 'bg-[#FAF3E0] text-[#2D2319] border-[#2D2319]';

                      if (tok.type === 'keyword') pillClass = 'bg-[#C3A6E8] text-purple-950 border-purple-800';
                      else if (tok.type === 'builtin') pillClass = 'bg-indigo-200 text-indigo-950 border-indigo-700';
                      else if (tok.type === 'variable') pillClass = 'bg-[#4BA3E3] text-sky-950 border-sky-800';
                      else if (tok.type === 'string') pillClass = 'bg-[#48B89F] text-emerald-950 border-emerald-800';
                      else if (tok.type === 'number') pillClass = 'bg-[#F6C445] text-amber-950 border-amber-800';
                      else if (tok.type === 'comment') pillClass = 'bg-slate-300 text-slate-800 border-slate-600';

                      return (
                        <button
                          key={tokIdx}
                          type="button"
                          onClick={() => {
                            sound?.playKeyClick?.();
                            setSelectedToken(tok);
                          }}
                          onMouseEnter={() => setSelectedToken(tok)}
                          className={`inline-block px-2 py-0.5 mx-0.5 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer ${pillClass} ${
                            isSelected
                              ? 'ring-2 ring-white scale-110 shadow-[2px_2px_0px_#FAF3E0] z-10'
                              : 'opacity-90 hover:opacity-100 hover:scale-105'
                          }`}
                        >
                          {tok.text}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Selected Token Explainer Callout Card */}
              {selectedToken && (
                <div className="mt-3 p-3 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl flex items-start gap-2.5 shadow-[2px_2px_0px_#2D2319] animate-in fade-in duration-200">
                  <div className="p-1.5 rounded-lg bg-[#F6C445] border border-[#2D2319] shrink-0 text-[#2D2319]">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[#2D2319]">
                        {selectedToken.text}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#FAF3E0] border border-[#2D2319]/30 text-[#2D2319]/70 uppercase">
                        {selectedToken.type}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-[#2D2319]/80 mt-0.5">
                      {selectedToken.description || 'Core syntax component in this Python instruction.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Structured Breakdown Cards */}
            {breakdownCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {breakdownCards.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl shadow-[2px_2px_0px_#2D2319] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-black text-[#2D2319]">
                        {item.token}
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-[#C3A6E8] text-[#2D2319] px-1.5 py-0.5 rounded border border-[#2D2319]">
                        {item.role}
                      </span>
                    </div>
                    <p className="text-[11px] font-serif text-[#2D2319]/80 leading-snug">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: HOW IT RUNS (EXECUTION SIMULATION) */}
        {currentStep === 3 && (
          <div className="space-y-4 max-w-2xl mx-auto w-full">
            <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[3px_3px_0px_#2D2319]">
              {/* Simulation Header & Play Controls */}
              <div className="flex items-center justify-between pb-2 border-b border-[#2D2319]/20 mb-3 text-xs font-mono font-bold text-[#2D2319]">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#48B89F]" />
                  STEP-BY-STEP EXECUTION SIMULATOR
                </span>
                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      sound?.playKeyClick?.();
                      setIsSimPlaying(p => !p);
                    }}
                    className="px-2 py-0.5 rounded-md bg-[#FDF8EE] border border-[#2D2319] text-[10px] font-black flex items-center gap-1 cursor-pointer shadow-[1px_1px_0px_#2D2319]"
                  >
                    {isSimPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{isSimPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound?.playKeyClick?.();
                      setSimState(1);
                    }}
                    className="p-1 rounded-md bg-[#FDF8EE] border border-[#2D2319] text-[10px] font-black cursor-pointer shadow-[1px_1px_0px_#2D2319]"
                    title="Reset Simulation"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 3-Step Simulation Scrubber Bar */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { step: 1, label: '1. Read Line', desc: 'Lexer & AST Parser' },
                  { step: 2, label: '2. Update Memory', desc: 'RAM Allocation' },
                  { step: 3, label: '3. Emit Output', desc: 'CRT Terminal Spark' }
                ].map(s => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => {
                      sound?.playKeyClick?.();
                      setSimState(s.step);
                    }}
                    className={`p-2 rounded-xl border-2 border-[#2D2319] text-left transition-all cursor-pointer ${
                      simState === s.step
                        ? 'bg-[#F6C445] shadow-[2px_2px_0px_#2D2319] scale-105 font-black'
                        : 'bg-[#FDF8EE] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="font-mono text-xs text-[#2D2319]">{s.label}</div>
                    <div className="text-[9px] font-mono text-[#2D2319]/70">{s.desc}</div>
                  </button>
                ))}
              </div>

              {/* Simulation Visual Window */}
              <div className="space-y-3">
                {/* Stage 1: Line Read by Interpreter */}
                <div
                  className={`p-3 rounded-xl border-2 border-[#2D2319] transition-all font-mono text-xs ${
                    simState === 1
                      ? 'bg-[#FDF8EE] shadow-[3px_3px_0px_#2D2319] scale-[1.02]'
                      : 'bg-[#FAF3E0] opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#2D2319]/70 mb-1">
                    <span>1. INTERPRETER PIPELINE</span>
                    {simState === 1 && <span className="text-[#48B89F] font-black animate-pulse">PARSING ACTIVE</span>}
                  </div>
                  <div className="bg-[#2D2319] text-[#48B89F] p-2 rounded-lg flex items-center space-x-2">
                    <span className="text-white/40">&gt;</span>
                    <span className="font-bold">{code}</span>
                  </div>
                </div>

                {/* Stage 2: Memory & CPU Updated */}
                <div
                  className={`p-3 rounded-xl border-2 border-[#2D2319] transition-all font-mono text-xs ${
                    simState === 2
                      ? 'bg-[#FDF8EE] shadow-[3px_3px_0px_#2D2319] scale-[1.02]'
                      : 'bg-[#FAF3E0] opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#2D2319]/70 mb-1">
                    <span>2. RAM & CPU ALLOCATION</span>
                    {simState === 2 && <span className="text-[#4BA3E3] font-black animate-pulse">ALLOCATING</span>}
                  </div>
                  <div className="flex items-center gap-3 bg-[#FAF3E0] border border-[#2D2319] p-2 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-[#4BA3E3]" />
                      <span className="font-bold">RAM Slot 0x7FFE</span>
                    </div>
                    <span className="text-xs text-[#48B89F] font-black">Ready for Bytecode</span>
                  </div>
                </div>

                {/* Stage 3: Terminal Output with Particle Sparks! */}
                <div
                  className={`p-3 rounded-xl border-2 border-[#2D2319] transition-all font-mono text-xs ${
                    simState === 3
                      ? 'bg-[#19130D] text-white shadow-[3px_3px_0px_#2D2319] scale-[1.02]'
                      : 'bg-[#19130D]/70 text-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#48B89F] mb-1">
                    <span className="flex items-center gap-1">
                      <TerminalIcon className="w-3.5 h-3.5" />
                      3. CRT TERMINAL EMISSION
                    </span>
                    {simState === 3 && (
                      <span className="flex items-center gap-1 text-[#F6C445] font-black">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        SPARK EMITTED!
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-black text-[#48B89F] drop-shadow-[0_0_8px_rgba(72,184,159,0.9)] py-1">
                    {expectedOutput}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: READY TO CODE (ACTION TRANSITION) */}
        {currentStep === 4 && (
          <div className="space-y-4 max-w-xl mx-auto w-full my-auto">
            <div className="bg-[#FAF3E0] border-3 border-[#2D2319] rounded-2xl p-5 shadow-[5px_5px_0px_#2D2319] text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#48B89F] border-2 border-[#2D2319] mx-auto flex items-center justify-center text-2xl shadow-[2px_2px_0px_#2D2319] animate-bounce">
                🚀
              </div>

              <div>
                <h3 className="font-display font-black text-base sm:text-lg text-[#2D2319]">
                  You understand the mental model!
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#2D2319]/80 mt-1 max-w-md mx-auto">
                  Now type this code to commit the syntax and structure directly into muscle memory.
                </p>
              </div>

              {/* Target Code Preview Card */}
              <div className="bg-[#211A13] border-2 border-[#2D2319] rounded-xl p-3 text-left font-mono text-xs sm:text-sm shadow-inner text-[#FDF8EE] max-w-md mx-auto">
                <div className="flex items-center justify-between pb-1 mb-2 border-b border-white/15 text-[10px] text-white/50">
                  <span>main.py</span>
                  <span>Target Syntax</span>
                </div>
                {code.split('\n').map((line, idx) => (
                  <div key={idx} className="flex space-x-3">
                    <span className="text-white/30 select-none text-[11px] w-5 text-right">
                      {idx + 1}
                    </span>
                    <span className="text-[#F6C445] font-bold">{line}</span>
                  </div>
                ))}
              </div>

              {/* Prominent Action Button */}
              <button
                type="button"
                onClick={() => {
                  sound?.playKeyClick?.();
                  if (onStartTyping) onStartTyping();
                }}
                className="w-full max-w-md mx-auto px-6 py-3.5 rounded-2xl bg-[#F6C445] hover:bg-[#fcd673] border-3 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] font-black text-sm sm:text-base text-[#2D2319] flex items-center justify-center space-x-2 cursor-pointer active:translate-x-1 active:translate-y-1 transition-all"
              >
                <span>Start Typing (Enter)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM NAVIGATION CONTROLS BAR */}
      <div className="bg-[#FAF3E0] px-4 py-3 border-t-2 border-[#2D2319] flex items-center justify-between text-xs font-mono shrink-0">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-3 py-1.5 rounded-xl bg-[#FDF8EE] hover:bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-bold text-[#2D2319] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-[11px] font-mono font-bold text-[#2D2319]/60 hidden sm:inline">
          Use &larr; / &rarr; or Space / Enter to advance
        </span>

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-1.5 rounded-xl bg-[#F6C445] hover:bg-[#fcd673] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-black text-[#2D2319] flex items-center space-x-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              sound?.playKeyClick?.();
              if (onStartTyping) onStartTyping();
            }}
            className="px-4 py-1.5 rounded-xl bg-[#48B89F] hover:bg-[#3fa38b] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-black text-white flex items-center space-x-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>Start Typing &rarr;</span>
          </button>
        )}
      </div>
    </div>
  );
}
