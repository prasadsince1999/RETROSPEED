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
  Keyboard,
  Volume2,
  VolumeX
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
          char === '=' ? 'Stores the right-hand value into the left-hand variable box.' :
          char === ':' ? 'Header colon: Tells Python the next indented lines belong together.' :
          char === '(' || char === ')' ? 'The mouth of the function. Whatever message you put inside gets processed!' :
          char === '[' || char === ']' ? 'Numbered slots for items in a list or characters in a string.' :
          char === '{' || char === '}' ? 'Placeholder braces: Python replaces variables inside with actual values.' :
          char === '+' ? 'Plus: Adds numbers, or glues text together.' :
          char === '-' ? 'Minus: Subtracts numbers.' :
          char === '*' ? 'Multiply: Multiplies numbers.' :
          char === '/' ? 'Divide: Divides numbers.' :
          `Symbol '${char}': Python operator or syntax mark.`
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
  if (lesson?.codeBreakdown && Array.isArray(lesson.codeBreakdown) && lesson.codeBreakdown.length > 0) {
    return lesson.codeBreakdown;
  }

  // Deduplicate meaningful tokens and eliminate beginner confusion
  const seen = new Set();
  const cards = [];

  for (const line of tokens) {
    for (const tok of line) {
      if (tok.type === 'whitespace') continue;

      let key = tok.text;
      let title = tok.text;
      let badge = tok.type;
      let explanation = tok.description;

      if (tok.text === '(' || tok.text === ')') {
        key = 'parens';
        title = '( ... )';
        badge = 'Message Container';
        explanation = 'The mouth of the function. Whatever message or numbers you place inside get shouted onto the screen!';
      } else if (tok.text === '[' || tok.text === ']') {
        key = 'brackets';
        title = '[ ... ]';
        badge = 'Item Slots';
        explanation = 'Numbered slots for items in a list or characters in a string.';
      } else if (tok.text === '{' || tok.text === '}') {
        key = 'braces';
        title = '{ ... }';
        badge = 'f-String Variable';
        explanation = 'In an f-string, Python replaces whatever variable is inside with its actual value!';
      } else if (tok.type === 'builtin') {
        title = `${tok.text}()`;
        badge = 'Built-in Tool';
        explanation = tok.text === 'print'
          ? 'The megaphone: shows your message or calculation onto the terminal screen.'
          : tok.text === 'input'
          ? 'The microphone: waits for the user to type something and press Enter.'
          : tok.text === 'int'
          ? 'The number transformer: turns text strings into real numbers for math.'
          : `Python's built-in helper tool ready for you to use.`;
      } else if (tok.type === 'keyword') {
        badge = 'Python Command';
        explanation = `Core Python keyword telling the computer what action to take.`;
      } else if (tok.type === 'variable') {
        badge = 'Storage Box';
        explanation = `Labeled storage box in memory where values are safely kept.`;
      } else if (tok.type === 'string') {
        badge = 'Text Message';
        explanation = `The quote marks tell Python: "These are words to display, not commands to run!"`;
      } else if (tok.type === 'number') {
        badge = 'Whole Number';
        explanation = `A real number that Python can calculate with.`;
      } else if (tok.type === 'comment') {
        badge = 'Sticky Note';
        explanation = `A friendly note left for humans. Python ignores this completely.`;
      }

      if (seen.has(key)) continue;
      seen.add(key);

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
 * Generate educational notes explaining the "why" and design intent (add-educational-comments skill)
 */
function generateEducationalNotes(code = '', lesson) {
  const notes = [];
  const trimmed = code.trim();

  // Note 1: Core purpose & why
  if (trimmed.includes('f"') || trimmed.includes("f'")) {
    notes.push({
      noteNumber: 1,
      title: 'Modern f-String Formatting',
      tag: 'Modern Python',
      explanation: 'Just put an f in front of quotes and write variables inside {curly braces}. Python automatically fills in the values!'
    });
  } else if (trimmed.includes('=')) {
    notes.push({
      noteNumber: 1,
      title: 'Labeled Storage Box',
      tag: 'Variables',
      explanation: 'In Python, = drops an item into a box and sticks a friendly name label on the outside.'
    });
  } else if (trimmed.startsWith('print(')) {
    notes.push({
      noteNumber: 1,
      title: 'Screen Megaphone',
      tag: 'Output',
      explanation: 'print() takes whatever message or calculation is inside the parentheses and shouts it onto your screen.'
    });
  } else if (trimmed.startsWith('def ')) {
    notes.push({
      noteNumber: 1,
      title: 'Creating Reusable Recipes',
      tag: 'Functions',
      explanation: 'def creates a reusable recipe that you can call anytime without re-writing the same code.'
    });
  } else {
    notes.push({
      noteNumber: 1,
      title: 'Step-by-Step Instructions',
      tag: 'Flow',
      explanation: 'Python reads and runs each line in order from top to bottom, like following a cooking recipe.'
    });
  }

  // Note 2: Best practice or pitfall avoidance
  if (trimmed.includes('input(')) {
    notes.push({
      noteNumber: 2,
      title: 'The Input Text Trap',
      tag: 'Beginner Tip',
      explanation: 'input() always receives text strings! If the user types 5, send it through int() before doing math.'
    });
  } else if (trimmed.endsWith(':')) {
    notes.push({
      noteNumber: 2,
      title: 'The Header Colon',
      tag: 'Syntax Rule',
      explanation: 'The colon announces: "The indented lines below belong to this block!" Python uses 4 clean spaces.'
    });
  } else if (trimmed.includes('[') && trimmed.includes(']')) {
    notes.push({
      noteNumber: 2,
      title: 'Zero-Based Indexing',
      tag: 'Counting Rule',
      explanation: 'Python starts counting items from 0: [0] is the 1st item, [1] is the 2nd item.'
    });
  } else {
    notes.push({
      noteNumber: 2,
      title: 'Clean Readability',
      tag: 'Zen of Python',
      explanation: 'Clear, readable code is always best. Keep your variable names friendly and descriptive.'
    });
  }

  return notes;
}

/**
 * Extract memory allocation table & visual state (data-visualization skill)
 */
function parseMemoryAllocation(code = '', lesson) {
  if (lesson?.executionSteps?.[1]?.memoryState) {
    const entries = Object.entries(lesson.executionSteps[1].memoryState);
    if (entries.length > 0) {
      return entries.map(([name, val], idx) => ({
        name,
        val: String(val),
        address: `Box #${idx + 1}`,
        type: String(val).startsWith('"') || String(val).startsWith("'") ? 'text (str)' : !isNaN(Number(val)) ? 'number (int)' : 'data'
      }));
    }
  }

  const trimmed = code.trim();
  const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
  if (assignMatch) {
    const name = assignMatch[1];
    const rawVal = assignMatch[2].trim();
    let type = 'data';
    if (/^f?["'].*["']$/.test(rawVal)) type = 'text (str)';
    else if (/^-?\d+\.\d+$/.test(rawVal)) type = 'decimal (float)';
    else if (/^-?\d+$/.test(rawVal)) type = 'number (int)';
    else if (/^\[.*\]$/.test(rawVal)) type = 'list';
    else if (/^\{.*\}$/.test(rawVal)) type = 'dict';

    return [{
      name,
      val: rawVal,
      address: 'Box #1',
      type
    }];
  }

  return [{
    name: 'Current Line',
    val: code.length > 24 ? code.slice(0, 22) + '...' : code,
    address: 'Processor',
    type: 'code'
  }];
}

/**
 * Animated Professor Byte Mascot in Teaching Pose
 */
function ProfessorByteMascot({ message, analogy, isSpeaking, onToggleVoice }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3.5 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {/* Mascot Graphic */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#C3A6E8] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-3xl sm:text-4xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSpeaking ? 'scale-105 ring-4 ring-[#F6C445] bg-[#d3bbf3]' : 'hover:scale-105'
          }`}
        >
          {isSpeaking ? '🗣️' : '🎓'}
        </div>
        <span className="text-[10px] font-mono font-black text-[#2D2319] bg-[#F6C445] px-2.5 py-0.5 rounded-full border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] -mt-2.5 uppercase tracking-wide">
          Coach Byte
        </span>

        {/* Dynamic Voice Status Pill */}
        <span className="text-[9px] font-mono font-bold text-[#2D2319]/70 mt-1 flex items-center gap-1">
          {isSpeaking ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#48B89F] animate-ping" />
              <span className="text-[#48B89F] font-black">Speaking</span>
            </>
          ) : (
            <span>Voice Ready</span>
          )}
        </span>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 relative w-full">
        <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[2px_2px_0px_#2D2319] relative">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#2D2319]/15 flex-wrap gap-2">
            <span className="text-[11px] font-mono font-black text-[#2D2319] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F6C445]" />
              MENTOR INSIGHT
              {isSpeaking && (
                <span className="flex items-end gap-0.5 h-3 px-1.5 py-0.5 bg-[#2D2319]/5 rounded">
                  <span className="w-1 bg-[#F6C445] rounded-full animate-pulse h-2" />
                  <span className="w-1 bg-[#48B89F] rounded-full animate-bounce h-3" />
                  <span className="w-1 bg-[#C3A6E8] rounded-full animate-pulse h-2.5" />
                  <span className="w-1 bg-[#F6C445] rounded-full animate-bounce h-3" />
                </span>
              )}
            </span>
            <div className="flex items-center gap-1.5">
              {analogy && (
                <span className="text-[10px] font-mono font-bold bg-[#FAF3E0] text-[#2D2319] px-2 py-0.5 rounded-md border border-[#2D2319]/30">
                  💡 {analogy}
                </span>
              )}
              {onToggleVoice && (
                <button
                  type="button"
                  onClick={onToggleVoice}
                  className={`px-2.5 py-1 rounded-full border border-[#2D2319] text-[10px] font-mono font-black flex items-center gap-1.5 cursor-pointer active:scale-95 active:translate-y-0.5 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[1px_1px_0px_#2D2319] hover:shadow-[2px_2px_0px_#2D2319] ${
                    isSpeaking
                      ? 'bg-[#F28B82] text-white animate-pulse'
                      : 'bg-[#F6C445] hover:bg-[#fcd673] text-[#2D2319]'
                  }`}
                  title={isSpeaking ? "Stop Voice Narration (or press V)" : "Listen to Coach Byte's Voice (or press V)"}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3 h-3" />
                      <span>Stop Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3 h-3" />
                      <span>Listen (Voice)</span>
                    </>
                  )}
                </button>
              )}
            </div>
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

  // Voice narration state (Web Speech API)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('retrospeed_py_voice') === 'true';
    }
    return false;
  });

  const code = lesson?.code || "print('Hello, Python!')";
  const expectedOutput = lesson?.expectedOutput || 'Hello, Python!';
  const explanation = lesson?.instructorExplanation || lesson?.concept || lesson?.text || "Let's explore how Python executes this step by step.";
  const analogy = lesson?.analogy || 'Physical Mental Model';

  const tokenizedLines = useMemo(() => tokenizePythonCode(code), [code]);
  const breakdownCards = useMemo(() => generateFallbackBreakdown(tokenizedLines, lesson), [tokenizedLines, lesson]);
  const educationalNotes = useMemo(() => generateEducationalNotes(code, lesson), [code, lesson]);
  const memoryAllocations = useMemo(() => parseMemoryAllocation(code, lesson), [code, lesson]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const speakText = useCallback((text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      if (!text) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  }, []);

  const toggleVoice = useCallback(() => {
    sound?.playKeyClick?.();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      let textToRead = '';
      if (currentStep === 1) {
        textToRead = `${explanation}`;
      } else if (currentStep === 2) {
        textToRead = selectedToken
          ? `${selectedToken.text}. ${selectedToken.description}`
          : `Code anatomy for ${lesson?.title || 'this lesson'}.`;
      } else if (currentStep === 3) {
        textToRead = `Execution simulation: step 1 parses the code, step 2 updates memory in RAM, step 3 prints output: ${expectedOutput}.`;
      } else if (currentStep === 4) {
        textToRead = `You understand the mental model! Now type this code to commit the syntax directly into muscle memory.`;
      }
      speakText(textToRead);
    }
  }, [isSpeaking, stopSpeaking, currentStep, explanation, selectedToken, lesson, expectedOutput, speakText]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  // If auto-voice is enabled, automatically speak explanation when entering Step 1
  useEffect(() => {
    if (voiceEnabled) {
      if (currentStep === 1 && explanation) {
        speakText(explanation);
      }
    } else {
      stopSpeaking();
    }
  }, [currentStep, voiceEnabled, explanation, speakText, stopSpeaking]);

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
    stopSpeaking();
    setCurrentStep(step);
    setMaxVisitedStep(prev => Math.max(prev, step));
  }, [stopSpeaking]);

  const handleNext = useCallback(() => {
    stopSpeaking();
    if (currentStep < 4) {
      goToStep(currentStep + 1);
    } else if (onStartTyping) {
      sound?.playKeyClick?.();
      onStartTyping();
    }
  }, [currentStep, goToStep, onStartTyping, stopSpeaking]);

  const handleBack = useCallback(() => {
    stopSpeaking();
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep, stopSpeaking]);

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
      } else if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        toggleVoice();
      } else if (e.key === 'Escape' && onExit) {
        e.preventDefault();
        stopSpeaking();
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleBack, onExit, toggleVoice, stopSpeaking]);

  const stepsMeta = [
    { num: 1, label: 'Visual Story 💡', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { num: 2, label: 'How to Read Code 🔍', icon: <Code2 className="w-3.5 h-3.5" /> },
    { num: 3, label: 'Live Simulation ⚡', icon: <Cpu className="w-3.5 h-3.5" /> },
    { num: 4, label: 'Type It Out ⌨️', icon: <Keyboard className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="w-full h-full p-1.5 sm:p-2 bg-[#E0D7C5]/50 border-3 border-[#2D2319] rounded-[2rem] shadow-[6px_6px_0px_#2D2319] flex flex-col min-h-0">
      <div className="w-full h-full flex flex-col font-sans select-none bg-[#FAF3E0] border-2 border-[#2D2319] rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)] overflow-hidden">
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
                  className={`px-2.5 py-1 rounded-xl border-2 border-[#2D2319] flex items-center space-x-1.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 cursor-pointer ${
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

          {/* Top Controls: Voice Toggle & Skip to Typing */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                sound?.playKeyClick?.();
                setVoiceEnabled(prev => {
                  const next = !prev;
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('retrospeed_py_voice', String(next));
                  }
                  if (!next) {
                    stopSpeaking();
                  } else if (currentStep === 1) {
                    speakText(explanation);
                  }
                  return next;
                });
              }}
              className={`px-3 py-1 rounded-full border border-[#2D2319] text-[11px] font-mono font-bold flex items-center space-x-1.5 shadow-[1px_1px_0px_#2D2319] hover:shadow-[2px_2px_0px_#2D2319] active:scale-95 active:translate-y-0.5 cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                voiceEnabled
                  ? 'bg-[#48B89F] text-white'
                  : 'bg-[#FAF3E0] hover:bg-[#FDF8EE] text-[#2D2319]'
              }`}
              title={voiceEnabled ? "Auto-Voice Enabled: Coach Byte speaks explanations automatically. Press V to toggle." : "Auto-Voice Disabled: Silent visual reading. Press V to toggle."}
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>Voice: {voiceEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound?.playKeyClick?.();
                stopSpeaking();
                if (onStartTyping) onStartTyping();
              }}
              className="px-3 py-1 rounded-full bg-[#FAF3E0] hover:bg-[#FDF8EE] border border-[#2D2319] text-[#2D2319] text-[11px] font-bold flex items-center space-x-1 shadow-[1px_1px_0px_#2D2319] hover:shadow-[2px_2px_0px_#2D2319] active:scale-95 active:translate-y-0.5 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
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
              {/* Agency-Tier Eyebrow Badge & Voice Mode Status */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-mono font-black bg-[#F6C445] text-[#2D2319] border border-[#2D2319] shadow-[1.5px_1.5px_0px_#2D2319]">
                  <Sparkles className="w-3 h-3 text-[#2D2319]" />
                  STAGE {lesson?.stage || 1} · {analogy.toUpperCase()}
                </div>
                <span className="text-[10px] font-mono text-[#2D2319]/60 font-bold">
                  {voiceEnabled ? '🔊 Auto-Voice Ready' : '🔇 Silent Reading Mode'}
                </span>
              </div>

              {/* Animated Physical Mental Model */}
              <DynamicVisualStage analogyType={lesson?.analogyType} lesson={lesson} />

              {/* Coach Byte / Professor Byte Teaching Pose & Speech Bubble with Voice */}
              <ProfessorByteMascot
                message={explanation}
                analogy={analogy}
                isSpeaking={isSpeaking}
                onToggleVoice={toggleVoice}
              />
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

            {/* Educational Pedagogical Notes (add-educational-comments skill) */}
            {educationalNotes.length > 0 && (
              <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#2D2319]/15 text-[10px] font-mono font-black text-[#2D2319]">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#C3A6E8]" />
                    PEDAGOGICAL NOTES &amp; CONTEXT (THE "WHY")
                  </span>
                  <span className="text-[9px] bg-[#C3A6E8]/40 px-2 py-0.5 rounded-full border border-[#2D2319]/30 font-bold">
                    Educational Guidance
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {educationalNotes.map((note) => (
                    <div
                      key={note.noteNumber}
                      className="p-2 bg-[#FDF8EE] border border-[#2D2319] rounded-lg shadow-[1px_1px_0px_#2D2319]"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono font-black text-[#2D2319]">
                          Note {note.noteNumber}: {note.title}
                        </span>
                        <span className="text-[8px] font-mono font-bold bg-[#F6C445] text-[#2D2319] px-1.5 py-0.2 rounded border border-[#2D2319]/50">
                          {note.tag}
                        </span>
                      </div>
                      <p className="text-[10px] font-sans text-[#2D2319]/80 leading-relaxed">
                        {note.explanation}
                      </p>
                    </div>
                  ))}
                </div>
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
                  { step: 1, label: '1. Reads Your Code', desc: 'Checks from left to right' },
                  { step: 2, label: '2. Values in Memory', desc: 'Saves items in labeled boxes' },
                  { step: 3, label: '3. Screen Output', desc: 'Lights up terminal with result' }
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
                    <span>1. PYTHON READS YOUR WORDS</span>
                    {simState === 1 && <span className="text-[#48B89F] font-black animate-pulse">READING ACTIVE</span>}
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
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#2D2319]/70 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#4BA3E3]" />
                      2. LABELED STORAGE BOXES IN MEMORY
                    </span>
                    {simState === 2 && (
                      <span className="text-[#4BA3E3] font-black animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4BA3E3] animate-ping" />
                        SAVED IN BOX
                      </span>
                    )}
                  </div>

                  {/* Interactive Memory State Data Table */}
                  <div className="space-y-1.5">
                    {memoryAllocations.map((mem, mIdx) => (
                      <div
                        key={mIdx}
                        className="flex items-center justify-between gap-2 p-2 bg-[#FAF3E0] border border-[#2D2319] rounded-lg shadow-[1px_1px_0px_#2D2319]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-[#2D2319]/60">
                            {mem.address}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
                            {mem.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-[#2D2319]/40 font-mono">&rarr;</span>
                          <span className="font-mono text-xs font-black text-[#2D2319] bg-[#FDF8EE] px-2 py-0.5 rounded border border-[#2D2319]/40 truncate max-w-[140px]">
                            {mem.val}
                          </span>
                          <span className="text-[9px] font-mono font-bold bg-[#C3A6E8] text-[#2D2319] px-1.5 py-0.5 rounded border border-[#2D2319]">
                            {mem.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {lesson?.executionSteps?.[1]?.description && (
                    <p className="text-[10px] font-sans text-[#2D2319]/70 mt-2 italic">
                      {lesson.executionSteps[1].description}
                    </p>
                  )}
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

              {/* Prominent Action Button with Button-in-Button Trailing Icon */}
              <button
                type="button"
                onClick={() => {
                  sound?.playKeyClick?.();
                  if (onStartTyping) onStartTyping();
                }}
                className="group w-full max-w-md mx-auto px-6 py-3.5 rounded-full bg-[#F6C445] hover:bg-[#fcd673] border-3 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] hover:shadow-[5px_5px_0px_#2D2319] font-black text-sm sm:text-base text-[#2D2319] flex items-center justify-between cursor-pointer active:scale-[0.98] active:translate-y-0.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <span className="pl-3">Start Typing (Enter)</span>
                <span className="w-9 h-9 rounded-full bg-[#2D2319]/10 border border-[#2D2319]/20 flex items-center justify-center shrink-0 group-hover:translate-x-1 group-hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <ArrowRight className="w-5 h-5" />
                </span>
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
          className="px-4 py-1.5 rounded-full bg-[#FDF8EE] hover:bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-bold text-[#2D2319] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1.5 cursor-pointer active:scale-95 active:translate-y-0.5 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
            className="group px-4 py-1.5 rounded-full bg-[#F6C445] hover:bg-[#fcd673] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] hover:shadow-[3px_3px_0px_#2D2319] font-black text-[#2D2319] flex items-center gap-2 cursor-pointer active:scale-[0.98] active:translate-y-0.5 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <span>Next Step</span>
            <span className="w-5 h-5 rounded-full bg-[#2D2319]/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              sound?.playKeyClick?.();
              if (onStartTyping) onStartTyping();
            }}
            className="group px-4 py-1.5 rounded-full bg-[#48B89F] hover:bg-[#3fa38b] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] hover:shadow-[3px_3px_0px_#2D2319] font-black text-white flex items-center gap-2 cursor-pointer active:scale-[0.98] active:translate-y-0.5 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <span>Start Typing</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
          </button>
        )}
      </div>
    </div>
  </div>
  );
}
