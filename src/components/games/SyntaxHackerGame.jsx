import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Terminal, 
  Code, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Activity, 
  Sparkles 
} from 'lucide-react';
import { TelemetryCollector } from '../../utils/telemetryEngine';
import { DDAController } from '../../utils/ddaEngine';
import { sound } from '../../utils/audio';

const COLOR_TOKENS = {
  CORAL: '#F28B82',     // Operators (Strain 8)
  MUSTARD: '#F6C445',   // Delimiters (Strain 9)
  MINT: '#48B89F',      // Literals (Strain 3)
  SKY: '#4BA3E3',       // Functions / Identifiers
  LILAC: '#C3A6E8',     // Keywords (Strain 2)
  PAPER_CREAM: '#FDF8EE',
  CHARCOAL: '#2D2319',
  DARK_TERMINAL: '#1E1B18'
};

// Code Snippets with Token Classification
const CODE_SNIPPETS = [
  {
    title: 'Async Data Fetcher',
    tokens: [
      { text: 'async', type: 'keyword', color: COLOR_TOKENS.LILAC },
      { text: 'function', type: 'keyword', color: COLOR_TOKENS.LILAC },
      { text: 'fetchUser', type: 'identifier', color: COLOR_TOKENS.SKY },
      { text: '()', type: 'delimiter', color: COLOR_TOKENS.MUSTARD },
      { text: '{', type: 'delimiter', color: COLOR_TOKENS.MUSTARD },
      { text: 'const', type: 'keyword', color: COLOR_TOKENS.LILAC },
      { text: 'res', type: 'identifier', color: COLOR_TOKENS.SKY },
      { text: '=', type: 'operator', color: COLOR_TOKENS.CORAL },
      { text: 'await', type: 'keyword', color: COLOR_TOKENS.LILAC },
      { text: 'api.get', type: 'identifier', color: COLOR_TOKENS.SKY },
      { text: '("/users");', type: 'literal', color: COLOR_TOKENS.MINT },
      { text: 'return', type: 'keyword', color: COLOR_TOKENS.LILAC },
      { text: 'res.data;', type: 'identifier', color: COLOR_TOKENS.SKY },
      { text: '}', type: 'delimiter', color: COLOR_TOKENS.MUSTARD }
    ]
  },
  {
    title: 'React State Hook Engine',
    tokens: [
      { text: 'const', type: 'keyword', color: COLOR_TOKENS.LILAC },
      { text: '[wpm, setWpm]', type: 'identifier', color: COLOR_TOKENS.SKY },
      { text: '=', type: 'operator', color: COLOR_TOKENS.CORAL },
      { text: 'useState', type: 'keyword', color: COLOR_TOKENS.LILAC },
      { text: '(0);', type: 'delimiter', color: COLOR_TOKENS.MUSTARD },
      { text: 'useEffect', type: 'keyword', color: COLOR_TOKENS.LILAC },
      { text: '(() => {', type: 'delimiter', color: COLOR_TOKENS.MUSTARD },
      { text: 'sound.playClick();', type: 'identifier', color: COLOR_TOKENS.SKY },
      { text: '}, [wpm]);', type: 'delimiter', color: COLOR_TOKENS.MUSTARD }
    ]
  },
  {
    title: 'Mathematical Sigmoid Curve',
    tokens: [
      { text: 'const', type: 'keyword', color: COLOR_TOKENS.LILAC },
      { text: 'sigmoid', type: 'identifier', color: COLOR_TOKENS.SKY },
      { text: '=', type: 'operator', color: COLOR_TOKENS.CORAL },
      { text: '(x)', type: 'delimiter', color: COLOR_TOKENS.MUSTARD },
      { text: '=>', type: 'operator', color: COLOR_TOKENS.CORAL },
      { text: '1', type: 'literal', color: COLOR_TOKENS.MINT },
      { text: '/', type: 'operator', color: COLOR_TOKENS.CORAL },
      { text: '(1 + Math.exp(-x));', type: 'delimiter', color: COLOR_TOKENS.MUSTARD }
    ]
  }
];

export default function SyntaxHackerGame({
  onComplete,
  onExit
}) {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  
  const [telemetryStats, setTelemetryStats] = useState({
    iwpm: 0,
    accuracy: 100,
    flusterIndex: 0,
    pinkyStrain: 0,
    isPinkyOverloaded: false,
    score: 0,
    streak: 0,
    snippetsCompleted: 0
  });

  const [isVictory, setIsVictory] = useState(false);

  const engineRef = useRef({
    telemetry: new TelemetryCollector(),
    dda: new DDAController(),
    score: 0,
    streak: 0,
    snippetsCompleted: 0
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [snippetIndex, currentTokenIndex]);

  const activeSnippet = CODE_SNIPPETS[snippetIndex] || CODE_SNIPPETS[0];
  const activeToken = activeSnippet.tokens[currentTokenIndex];

  // Handle typing input
  const handleInputChange = (e) => {
    const val = e.target.value;
    const engine = engineRef.current;
    const now = performance.now();

    if (!activeToken) return;
    const targetText = activeToken.text;

    // Check if user submitted token with Space or Enter
    if (val.endsWith(' ') || val.endsWith('\n')) {
      const trimmed = val.trim();
      if (trimmed === targetText) {
        // Token correct!
        sound.playKeyClick();
        engine.streak++;
        engine.score += 75 + engine.streak * 10;
        setCurrentInput('');

        const nextTokenIdx = currentTokenIndex + 1;
        if (nextTokenIdx >= activeSnippet.tokens.length) {
          // Snippet completed!
          sound.playWordSuccess();
          engine.snippetsCompleted++;
          const nextSnippetIdx = snippetIndex + 1;

          if (nextSnippetIdx >= CODE_SNIPPETS.length) {
            // Victory!
            sound.playTada();
            setIsVictory(true);
            confetti({ particleCount: 80, spread: 70 });
          } else {
            setSnippetIndex(nextSnippetIdx);
            setCurrentTokenIndex(0);
          }
        } else {
          setCurrentTokenIndex(nextTokenIdx);
        }
      } else {
        // Mistyped token
        sound.playError();
        engine.telemetry.markLastError(true);
        engine.streak = 0;
      }
      return;
    }

    // Normal typing character
    engine.telemetry.recordKeyDown(val.slice(-1) || 'a', now);
    if (targetText.startsWith(val)) {
      sound.playKeyClick();
    } else {
      sound.playError();
      engine.telemetry.markLastError(true);
      engine.streak = 0;
    }

    setCurrentInput(val);

    // Update Telemetry
    const liveMetrics = engine.telemetry.getLiveMetrics(now);
    setTelemetryStats({
      iwpm: liveMetrics.iwpm,
      accuracy: liveMetrics.accuracy,
      flusterIndex: liveMetrics.flusterIndex,
      pinkyStrain: liveMetrics.pinkyStrain,
      isPinkyOverloaded: liveMetrics.isPinkyOverloaded,
      score: engine.score,
      streak: engine.streak,
      snippetsCompleted: engine.snippetsCompleted
    });
  };

  const handleRestart = () => {
    sound.playKeyClick();
    const engine = engineRef.current;
    engine.telemetry.reset();
    engine.dda.reset();
    engine.score = 0;
    engine.streak = 0;
    engine.snippetsCompleted = 0;
    setSnippetIndex(0);
    setCurrentTokenIndex(0);
    setCurrentInput('');
    setIsVictory(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto">
      
      {/* Top HUD: Title, Back Button, Pinky Strain & Score */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2D2319] pb-3 font-mono text-xs">
        
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              if (onExit) onExit();
            }}
            className="px-3 py-1.5 bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl font-bold flex items-center space-x-1.5 shadow-[2px_2px_0px_#2D2319]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Matrix</span>
          </button>

          <span className="px-3 py-1 rounded-xl bg-[#48B89F] border-2 border-[#2D2319] font-black uppercase text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            🛡️ Syntax Matrix // Code Defense
          </span>
        </div>

        {/* Pinky Load Balance Gauge */}
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] ${
            telemetryStats.isPinkyOverloaded ? 'bg-[#F28B82]' : 'bg-[#FAF3E0]'
          }`}>
            <Activity className="w-4 h-4 text-[#2D2319]" />
            <span className="font-bold text-[#2D2319]/70">Pinky Load:</span>
            <span className="font-black text-sm text-[#2D2319]">
              {(telemetryStats.pinkyStrain * 100).toFixed(1)}% {telemetryStats.isPinkyOverloaded && '⚠️ High'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#F6C445] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Zap className="w-4 h-4 text-[#2D2319]" />
            <span className="font-bold text-[#2D2319]/80">Score:</span>
            <span className="font-black text-sm text-[#2D2319]">{telemetryStats.score}</span>
          </div>
        </div>

      </div>

      {/* 4 Neo-Brutalist Legend Pills: Keywords, Operators, Delimiters, Literals */}
      <div className="flex flex-wrap items-center justify-between gap-2 my-3 font-mono text-xs">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded bg-[#C3A6E8] border border-[#2D2319] font-bold text-[#2D2319]">
            Keywords (Lilac)
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F28B82] border border-[#2D2319] font-bold text-[#2D2319]">
            Operators (Coral)
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F6C445] border border-[#2D2319] font-bold text-[#2D2319]">
            Delimiters (Mustard)
          </span>
          <span className="px-2 py-0.5 rounded bg-[#48B89F] border border-[#2D2319] font-bold text-[#2D2319]">
            Literals (Mint)
          </span>
        </div>

        <div className="text-[#2D2319]/70 font-bold">
          Snippet: {snippetIndex + 1} / {CODE_SNIPPETS.length} ({activeSnippet.title})
        </div>
      </div>

      {/* Main Terminal Code Matrix Window */}
      <div className="my-3 bg-[#FAF3E0] border-3 border-[#2D2319] rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#2D2319] relative min-h-[220px] flex flex-col justify-between font-mono">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#2D2319]/20 pb-2 mb-4 text-xs font-bold text-[#2D2319]/70">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#2D2319]" />
            <span>TERMINAL_STREAM // {activeSnippet.title.toUpperCase()}</span>
          </div>
          <span className="text-[#48B89F] font-black">● LIVE AST PARSER</span>
        </div>

        {/* Syntax Tokens Stream */}
        <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-xl my-4">
          {activeSnippet.tokens.map((tok, idx) => {
            const isCurrent = idx === currentTokenIndex;
            const isPast = idx < currentTokenIndex;

            if (isCurrent) {
              return (
                <div 
                  key={idx}
                  className="px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] font-black scale-105 transition-transform"
                  style={{ backgroundColor: tok.color }}
                >
                  {tok.text}
                </div>
              );
            }

            return (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded-lg border ${
                  isPast 
                    ? 'border-[#2D2319]/20 bg-[#FAF3E0] text-[#2D2319]/40 line-through' 
                    : 'border-[#2D2319]/40 bg-[#FDF8EE] text-[#2D2319]'
                }`}
              >
                {tok.text}
              </span>
            );
          })}
        </div>

        {/* Typing Input Box */}
        <div className="relative mt-4">
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            placeholder={`Type "${activeToken?.text || ''}" and press Space...`}
            className="w-full px-4 py-2.5 bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl font-mono font-bold text-sm text-[#2D2319] shadow-[2px_2px_0px_#2D2319] focus:outline-none focus:bg-white"
            autoFocus
          />
        </div>

      </div>

      {/* Helper Bar */}
      <div className="border-t border-[#2D2319]/20 pt-2 flex items-center justify-between text-[11px] font-mono text-[#2D2319]/70">
        <div>Type the highlighted syntax token and press <span className="font-bold underline text-[#2D2319]">Space</span> to parse the next token.</div>
        <button
          type="button"
          onClick={handleRestart}
          className="px-3 py-1 bg-[#FAF3E0] hover:bg-white border border-[#2D2319] rounded-lg font-bold flex items-center space-x-1 text-[#2D2319]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restart</span>
        </button>
      </div>

      {/* Victory Modal */}
      {isVictory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/60 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden p-6 text-center space-y-4 font-sans">
            <div className="text-3xl">🎉</div>
            <h3 className="text-xl font-black font-display text-[#2D2319]">Matrix Decrypted!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">You conquered all software syntax defense streams!</p>
            <div className="bg-[#FAF3E0] p-3 rounded-xl border border-[#2D2319] text-xs font-mono">
              <div>Total Score: <span className="font-bold">{telemetryStats.score} pts</span></div>
              <div>Peak Speed: <span className="font-bold">{telemetryStats.iwpm} WPM</span></div>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2 bg-[#48B89F] border-2 border-[#2D2319] rounded-xl font-display font-black text-xs text-white"
              >
                Play Again
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onExit) onExit();
                }}
                className="px-4 py-2 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl font-display font-bold text-xs"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
