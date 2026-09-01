import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import DeskCoachStage from './DeskCoachStage';
import MotionCaptionBar from './MotionCaptionBar';
import MotionTransportBar from './MotionTransportBar';
import { getMotionLesson } from '../../data/motion';
import { sound } from '../../utils/audio';

/**
 * Interactive Scripted Motion Lesson Player
 * Replaces the old static video player with a timed graphic motion lesson on the retro desk.
 * Includes synchronized narration, kinetic paper keyboard, and physical keyboard gates.
 */
export default function MotionLessonPlayer({
  lesson = {},
  onComplete,
  onExit,
  layout = 'qwerty'
}) {
  const motionData = useMemo(() => {
    return getMotionLesson(lesson.motionId || lesson.id);
  }, [lesson]);

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showCaptions, setShowCaptions] = useState(true);

  // Key Gate state
  const [isGateActive, setIsGateActive] = useState(false);
  const [gateType, setGateType] = useState(null);
  const [gateStatus, setGateStatus] = useState({ f: false, j: false, u: false });
  const clearedGatesRef = useRef(new Set());

  const audioRef = useRef(null);
  const speechUtteranceRef = useRef(null);
  const animFrameRef = useRef(null);
  const isAudioAvailableRef = useRef(true);

  const durationMs = motionData.durationMs || 66000;
  const beats = motionData.beats || [];

  // Determine active beat based on currentTime
  const currentBeatIndex = useMemo(() => {
    let activeIdx = 0;
    for (let i = 0; i < beats.length; i++) {
      if (currentTime >= beats[i].at) {
        activeIdx = i;
      } else {
        break;
      }
    }
    return activeIdx;
  }, [beats, currentTime]);

  const currentBeat = beats[currentBeatIndex] || beats[0];

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(motionData.audio || '/voice/home-row.neerja.mp3');
    audio.playbackRate = playbackRate;
    audioRef.current = audio;

    const handleCanPlay = () => {
      isAudioAvailableRef.current = true;
      if (isPlaying && !isGateActive) {
        audio.play().catch(() => {
          // Autoplay policy or offline fallback
          fallbackSpeech(0);
        });
      }
    };

    const handleError = () => {
      isAudioAvailableRef.current = false;
      fallbackSpeech(currentTime);
    };

    const handleEnded = () => {
      handleLessonFinished();
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      if (speechUtteranceRef.current && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [motionData]);

  // Sync playback position via animation frame
  useEffect(() => {
    let lastStamp = performance.now();

    const tick = (now) => {
      const delta = now - lastStamp;
      lastStamp = now;

      if (isPlaying && !isGateActive) {
        if (audioRef.current && !audioRef.current.paused && isAudioAvailableRef.current) {
          const ms = audioRef.current.currentTime * 1000;
          setCurrentTime(ms);
        } else {
          // Fallback timer increment
          setCurrentTime(prev => {
            const next = prev + delta * playbackRate;
            if (next >= durationMs) {
              handleLessonFinished();
              return durationMs;
            }
            return next;
          });
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, isGateActive, playbackRate, durationMs]);

  // Speech synthesis fallback helper
  const fallbackSpeech = (fromTime) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // Find next upcoming line
    const beat = beats.find(b => b.at >= fromTime) || beats[0];
    if (!beat) return;

    const utter = new SpeechSynthesisUtterance(beat.line);
    utter.rate = playbackRate;
    speechUtteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
  };

  // Check for Physical Key Gates when active beat changes
  useEffect(() => {
    if (!currentBeat) return;

    if (currentBeat.requires && !clearedGatesRef.current.has(currentBeat.id)) {
      // Pause speech and engage gate!
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsGateActive(true);
      setGateType(currentBeat.requires);
      setGateStatus({ f: false, j: false, u: false });
    }
  }, [currentBeat]);

  // Physical Keyboard Listener (for gates and shortcuts)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Global navigation shortcuts
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        handleLessonFinished();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        onExit();
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setShowCaptions(prev => !prev);
        return;
      }

      // If Physical Key Gate is Active
      if (isGateActive) {
        const key = e.key.toLowerCase();

        // Gate 1: Both F and J
        if (gateType === 'fj') {
          if (key === 'f') {
            sound.playKeyClick();
            setGateStatus(prev => {
              const updated = { ...prev, f: true };
              if (updated.f && updated.j) {
                resolveGate();
              }
              return updated;
            });
          } else if (key === 'j') {
            sound.playKeyClick();
            setGateStatus(prev => {
              const updated = { ...prev, j: true };
              if (updated.f && updated.j) {
                resolveGate();
              }
              return updated;
            });
          }
        }

        // Gate 2: Reach U then return to J
        if (gateType === 'uj') {
          if (key === 'u') {
            sound.playKeyClick();
            setGateStatus(prev => ({ ...prev, u: true }));
          } else if (key === 'j' && gateStatus.u) {
            sound.playSuccessChime();
            setGateStatus(prev => ({ ...prev, j: true }));
            resolveGate();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGateActive, gateType, gateStatus, onExit]);

  // Resolve gate and resume playback
  const resolveGate = () => {
    sound.playSuccessChime();
    clearedGatesRef.current.add(currentBeat.id);

    setTimeout(() => {
      setIsGateActive(false);
      setGateType(null);
      if (audioRef.current && isAudioAvailableRef.current) {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(true);
    }, 400);
  };

  const handleSkipGate = () => {
    sound.playKeyClick();
    if (currentBeat?.id) {
      clearedGatesRef.current.add(currentBeat.id);
    }
    setIsGateActive(false);
    setGateType(null);
    if (audioRef.current && isAudioAvailableRef.current) {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    sound.playKeyClick();
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      if (audioRef.current && isAudioAvailableRef.current) {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(true);
    }
  };

  const handleToggleSpeed = () => {
    sound.playKeyClick();
    const nextRate = playbackRate === 1.0 ? 1.25 : 1.0;
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const handleSeek = (targetMs) => {
    sound.playKeyClick();
    setCurrentTime(targetMs);
    if (audioRef.current) {
      audioRef.current.currentTime = targetMs / 1000;
    }
  };

  const handleRestart = () => {
    sound.playKeyClick();
    setCurrentTime(0);
    clearedGatesRef.current.clear();
    setIsGateActive(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(true);
  };

  const handleLessonFinished = () => {
    sound.playSuccessChime();
    if (audioRef.current) audioRef.current.pause();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    
    if (onComplete) {
      onComplete({
        wpm: 25,
        accuracy: 100,
        stars: 5,
        points: 500,
        time: Math.round(currentTime / 1000),
        errors: 0
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between select-none py-2 px-2 sm:px-4 max-w-5xl mx-auto font-sans animate-in fade-in duration-200">
      
      {/* TOP RETRO COACH TOOLBAR */}
      <div className="w-full bg-[var(--rs-paper-alt)] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_var(--rs-shadow)] mb-2.5 p-2.5 sm:p-3 flex items-center justify-between gap-3 transition-colors duration-200">
        
        {/* Left: Back button & Lesson Title */}
        <div className="flex items-center space-x-3">
          <button 
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onExit();
            }}
            className="px-3 py-1.5 rounded-lg bg-[var(--rs-paper)] hover:bg-white text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="px-2 py-0.5 rounded bg-[var(--rs-paper)] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319]">
                MOTION LESSON
              </span>
              <span className="px-2 py-0.5 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-black border border-[#2D2319]">
                Interactive Coach
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-[#2D2319] font-display leading-tight truncate max-w-[200px] sm:max-w-md mt-0.5">
              {motionData.title}
            </h2>
          </div>
        </div>

        {/* Right: Coach Mode Badge */}
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Desk Coach</span>
          </div>
        </div>

      </div>

      {/* CENTER HERO: PAPER DESK & KINETIC KEYBOARD STAGE */}
      <div className="flex-1 flex flex-col justify-center my-auto min-h-[360px] sm:min-h-[420px]">
        <DeskCoachStage
          currentBeat={currentBeat}
          isGateActive={isGateActive}
          gateType={gateType}
          gateStatus={gateStatus}
          onSkipGate={handleSkipGate}
          layout={layout}
        />
      </div>

      {/* CAPTION BAR */}
      <MotionCaptionBar
        currentBeat={currentBeat}
        totalBeats={beats.length}
        isVisible={showCaptions}
      />

      {/* BOTTOM TRANSPORT & SCRUBBER BAR */}
      <MotionTransportBar
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onRestart={handleRestart}
        playbackRate={playbackRate}
        onToggleSpeed={handleToggleSpeed}
        currentTime={currentTime}
        durationMs={durationMs}
        onSeek={handleSeek}
        beats={beats}
        currentBeatIndex={currentBeatIndex}
        showCaptions={showCaptions}
        onToggleCaptions={() => setShowCaptions(prev => !prev)}
        onSkipToDrill={handleLessonFinished}
      />

    </div>
  );
}
