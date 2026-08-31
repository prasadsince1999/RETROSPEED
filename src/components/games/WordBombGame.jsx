import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Bomb, 
  Flame, 
  Clock, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { DEFAULT_TRIE, WORD_BOMB_ROOTS, calculateZipfScore } from '../../utils/lexiconTrie';
import { sound } from '../../utils/audio';

const COLOR_TOKENS = {
  CORAL: '#F28B82',
  MUSTARD: '#F6C445',
  MINT: '#48B89F',
  SKY: '#4BA3E3',
  LILAC: '#C3A6E8',
  PAPER_CREAM: '#FDF8EE',
  CHARCOAL: '#2D2319',
  SURFACE_ALT: '#FAF3E0'
};

export default function WordBombGame({
  onComplete,
  onExit,
  initialFuseSeconds = 15,
  floorFuseSeconds = 5
}) {
  const [currentRoot, setCurrentRoot] = useState('th');
  const [inputWord, setInputWord] = useState('');
  const [usedWords, setUsedWords] = useState(new Set());
  const [turnCount, setTurnCount] = useState(0);
  
  const [timeLeft, setTimeLeft] = useState(initialFuseSeconds);
  const [maxTurnTime, setMaxTurnTime] = useState(initialFuseSeconds);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastScoreGained, setLastScoreGained] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [gameStateStatus, setGameStateStatus] = useState('playing'); // 'playing' | 'exploded'
  
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [gameStateStatus]);

  // Pick new root for next turn
  const pickNextRoot = useCallback(() => {
    const root = WORD_BOMB_ROOTS[Math.floor(Math.random() * WORD_BOMB_ROOTS.length)].toUpperCase();
    setCurrentRoot(root);
  }, []);

  // Compute decaying fuse duration: T_fuse(k) = T_floor + (T_initial - T_floor) * exp(-0.06 * k)
  const computeTurnFuse = useCallback((turn) => {
    const decay = Math.exp(-0.06 * turn);
    const duration = floorFuseSeconds + (initialFuseSeconds - floorFuseSeconds) * decay;
    return Number(duration.toFixed(1));
  }, [floorFuseSeconds, initialFuseSeconds]);

  // Initialize round
  useEffect(() => {
    pickNextRoot();
    setTimeLeft(initialFuseSeconds);
    setMaxTurnTime(initialFuseSeconds);
  }, [pickNextRoot, initialFuseSeconds]);

  // Countdown timer loop
  useEffect(() => {
    if (gameStateStatus !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(timerRef.current);
          handleBombExplosion();
          return 0;
        }
        return Number((prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(timerRef.current);
  }, [gameStateStatus]);

  // Handle Explosion
  const handleBombExplosion = () => {
    sound.playError();
    setGameStateStatus('exploded');
  };

  // Submit Word
  const handleSubmit = (e) => {
    e?.preventDefault();
    if (gameStateStatus !== 'playing') return;

    const word = inputWord.trim().toLowerCase();
    const root = currentRoot.toLowerCase();

    // 1. Substring Inclusion Check: Sub_req in S_player
    if (!word.includes(root)) {
      sound.playError();
      setErrorMessage(`Word must contain "${currentRoot}"!`);
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }

    // 2. Novelty Constraint: Word not in usedWords
    if (usedWords.has(word)) {
      sound.playError();
      setErrorMessage(`"${word.toUpperCase()}" was already used this match!`);
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }

    // 3. Dictionary Validity Check: Word in Trie
    if (!DEFAULT_TRIE.isValidWord(word) && word.length < 3) {
      sound.playError();
      setErrorMessage(`"${word.toUpperCase()}" not found in lexicon dictionary!`);
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }

    // Word is VALID!
    sound.playWordSuccess();
    const zipfPts = calculateZipfScore(word, streak + 1);
    
    // Time Restoration: deltaT_bonus = theta * Length(S) * (1 + 1/freq)
    const bonusTime = Number((word.length * 0.45).toFixed(1));
    const nextTurn = turnCount + 1;
    const nextMaxTime = computeTurnFuse(nextTurn);

    setScore(prev => prev + zipfPts);
    setStreak(prev => prev + 1);
    setTurnCount(nextTurn);
    setMaxTurnTime(nextMaxTime);
    setTimeLeft(prev => Math.min(nextMaxTime, Number((prev + bonusTime).toFixed(1))));
    
    setUsedWords(prev => new Set(prev).add(word));
    setInputWord('');
    setLastScoreGained({ word: word.toUpperCase(), pts: zipfPts });
    setTimeout(() => setLastScoreGained(null), 1800);

    pickNextRoot();
  };

  const handleRestart = () => {
    sound.playKeyClick();
    setUsedWords(new Set());
    setTurnCount(0);
    setScore(0);
    setStreak(0);
    setInputWord('');
    setErrorMessage('');
    setTimeLeft(initialFuseSeconds);
    setMaxTurnTime(initialFuseSeconds);
    setGameStateStatus('playing');
    pickNextRoot();
  };

  const fusePercent = Math.max(0, Math.min(100, Math.round((timeLeft / maxTurnTime) * 100)));

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto">
      
      {/* Top HUD: Title, Back Button, Score & Streak */}
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
            <span>Exit Bomb</span>
          </button>

          <span className="px-3 py-1 rounded-xl bg-[#C3A6E8] border-2 border-[#2D2319] font-black uppercase text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            💣 Word Bomb // Anagram Match
          </span>
        </div>

        {/* Score & Streak Pill */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-[#FAF3E0] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Flame className="w-4 h-4 text-[#F28B82] fill-[#F28B82]" />
            <span className="font-bold text-[#2D2319]/70">Streak:</span>
            <span className="font-black text-sm text-[#2D2319]">{streak}</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#F6C445] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Trophy className="w-4 h-4 text-[#2D2319]" />
            <span className="font-bold text-[#2D2319]/80">Score:</span>
            <span className="font-black text-sm text-[#2D2319]">{score.toLocaleString()}</span>
          </div>
        </div>

      </div>

      {/* Main Bomb Area */}
      <div className="my-6 max-w-xl mx-auto w-full flex flex-col items-center space-y-6">
        
        {/* Animated Neo-Brutalist Bomb Display */}
        <div className="relative flex flex-col items-center">
          
          {/* Burning Spark Fuse */}
          <div className="w-1.5 h-10 bg-[#2D2319] relative">
            <div 
              className="absolute -top-3 -left-2 text-xl animate-bounce"
              title="Burning Fuse"
            >
              🔥
            </div>
          </div>

          {/* Bomb Body Container */}
          <div className="w-36 h-36 rounded-full bg-[#2D2319] border-4 border-[#2D2319] shadow-[6px_6px_0px_#2D2319] flex flex-col items-center justify-center text-white relative">
            <div className="text-4xl mb-1">💣</div>
            <div className="text-xl font-display font-black text-[#F6C445]">
              {timeLeft}s
            </div>
            <div className="text-[9px] font-mono text-white/70">FUSE TIME</div>
          </div>

        </div>

        {/* Required Root Capsule */}
        <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D2319] w-full text-center space-y-2">
          <div className="text-xs font-mono font-bold text-[#2D2319]/70 uppercase tracking-wider">
            Required Syllable Substring:
          </div>
          <div className="text-3xl sm:text-4xl font-black font-display text-[#2D2319] tracking-widest bg-[#FDF8EE] py-2 px-4 rounded-xl border-2 border-[#2D2319] inline-block shadow-[2px_2px_0px_#2D2319]">
            {currentRoot}
          </div>
          <div className="text-xs font-mono text-[#2D2319]/80 font-medium">
            Type any valid English word containing <span className="font-bold underline text-[#2D2319]">"{currentRoot}"</span>!
          </div>
        </div>

        {/* Input Form Box */}
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              placeholder={`Enter word with "${currentRoot}"...`}
              disabled={gameStateStatus !== 'playing'}
              className="w-full px-4 py-3.5 bg-[#FAF3E0] border-3 border-[#2D2319] rounded-2xl text-center font-display font-black text-xl text-[#2D2319] placeholder:text-[#2D2319]/40 shadow-[4px_4px_0px_#2D2319] focus:outline-none focus:bg-white transition-all uppercase"
              autoFocus
            />
          </div>

          {/* Feedback or Error Banner */}
          {errorMessage && (
            <div className="bg-[#F28B82] text-[#2D2319] px-3 py-1.5 rounded-xl border-2 border-[#2D2319] font-mono font-bold text-xs text-center shadow-[2px_2px_0px_#2D2319] animate-shake">
              ⚠️ {errorMessage}
            </div>
          )}

          {lastScoreGained && (
            <div className="bg-[#48B89F] text-white px-3 py-1.5 rounded-xl border-2 border-[#2D2319] font-mono font-black text-xs text-center shadow-[2px_2px_0px_#2D2319] animate-bounce">
              ✓ +{lastScoreGained.pts} Zipf Points ({lastScoreGained.word})
            </div>
          )}

          {/* Fuse Time Progress Bar */}
          <div className="space-y-1 pt-1 font-mono text-xs">
            <div className="flex justify-between font-bold text-[#2D2319]">
              <span>Fuse Pressure</span>
              <span>{timeLeft}s / {maxTurnTime}s</span>
            </div>
            <div className="w-full h-3.5 bg-[#FAF3E0] rounded-full border-2 border-[#2D2319] overflow-hidden p-0.5 flex">
              <div 
                className={`h-full rounded-full transition-all duration-100 ${
                  timeLeft <= 4 ? 'bg-[#F28B82]' : 'bg-[#F6C445]'
                }`}
                style={{ width: `${fusePercent}%` }}
              />
            </div>
          </div>
        </form>

      </div>

      {/* Helper Bar */}
      <div className="border-t border-[#2D2319]/20 pt-2 flex items-center justify-between text-[11px] font-mono text-[#2D2319]/70">
        <div>Press <span className="font-bold underline text-[#2D2319]">Enter</span> to submit words. Rarer words grant exponentially higher Zipf points!</div>
        <button
          type="button"
          onClick={handleRestart}
          className="px-3 py-1 bg-[#FAF3E0] hover:bg-white border border-[#2D2319] rounded-lg font-bold flex items-center space-x-1 text-[#2D2319]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restart</span>
        </button>
      </div>

      {/* Explosion / Game Over Modal */}
      {gameStateStatus === 'exploded' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/60 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden p-6 text-center space-y-4 font-sans">
            <div className="text-4xl">💥 BOOM!</div>
            <h3 className="text-xl font-black font-display text-[#2D2319]">The Bomb Detonated!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">You ran out of time before resolving the syllable constraint.</p>
            <div className="bg-[#FAF3E0] p-3 rounded-xl border border-[#2D2319] text-xs font-mono space-y-1">
              <div>Words Matched: <span className="font-bold">{turnCount}</span></div>
              <div>Final Score: <span className="font-bold">{score.toLocaleString()} pts</span></div>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2 bg-[#F6C445] border-2 border-[#2D2319] rounded-xl font-display font-black text-xs"
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
