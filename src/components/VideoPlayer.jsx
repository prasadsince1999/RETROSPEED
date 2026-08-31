import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  CheckCircle, 
  FileText, 
  Sparkles, 
  Check, 
  Monitor, 
  Compass, 
  ChevronDown, 
  ChevronUp,
  Info
} from 'lucide-react';
import { Button, Card, ProgressBar, Badge, Modal } from './ui';
import { sound } from '../utils/audio';

const VIDEO_TRANSCRIPTS = {
  default: [
    { time: '0:00', title: 'Home Row Anchor Position', text: 'Place your left index finger on F and right index finger on J. Feel the tactile bumps on these anchor keys.' },
    { time: '0:05', title: 'Ergonomic Hand Posture', text: 'Curve your fingers gently like holding a tennis ball. Keep your wrists hovering slightly above the desk, never resting heavily.' },
    { time: '0:10', title: 'Key Reach Technique', text: 'Each finger has dedicated columns. Always return your fingers to the home row resting posture after typing any letter.' },
    { time: '0:15', title: 'Rhythm Over Speed', text: 'Focus on clean accuracy and smooth rhythm first. Speed naturally follows once muscle memory is established.' }
  ]
};

export default function VideoPlayer({ lesson, onComplete, onExit }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            sound.playSuccessChime();
            setTimeout(() => {
              onComplete({
                wpm: 25,
                accuracy: 100,
                stars: 5,
                points: 500,
                time: 15,
                errors: 0
              });
            }, 600);
            return 100;
          }
          return prev + 2;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onComplete]);

  // Video Player Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleFinish();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onExit();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setShowTranscript(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  const handleFinish = () => {
    sound.playSuccessChime();
    onComplete({
      wpm: 25,
      accuracy: 100,
      stars: 5,
      points: 500,
      time: Math.max(5, Math.round(progress * 0.15)),
      errors: 0
    });
  };

  const transcriptList = lesson.transcript || VIDEO_TRANSCRIPTS.default;

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col justify-between p-3 sm:px-6 max-w-5xl mx-auto select-none font-sans">
      
      {/* Top Retro OS Window Header Card */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] mb-4 overflow-hidden">
        
        {/* Window Top Title Strip */}
        <div className="bg-[#2c3e50] text-white px-3.5 py-1.5 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-amber-400">✦</span>
            <span className="font-bold tracking-wider">MEDIA_PLAYER.EXE // VIDEO_TUTORIAL</span>
          </div>

          <div className="flex items-center space-x-1">
            <button className="w-4 h-4 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono font-bold leading-none text-slate-300">_</button>
            <button className="w-4 h-4 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[8px] font-mono font-bold leading-none text-slate-300">□</button>
            <button onClick={onExit} className="w-4 h-4 bg-[#f87171] border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono font-bold leading-none text-slate-900">✕</button>
          </div>
        </div>

        <div className="p-3 sm:p-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onExit();
            }}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs font-bold border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Map</span>
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <span className="px-2 py-0.2 rounded bg-slate-200 text-slate-800 font-mono text-[10px] font-bold border border-slate-400">
                {lesson.stageTitle || 'STAGE'}
              </span>
              <span className="px-2 py-0.2 rounded bg-[#f87171] text-slate-950 font-mono text-[10px] font-black border border-slate-900">
                Video Lesson {lesson.id}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 mt-0.5 font-display">
              {lesson.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setShowTranscript(!showTranscript);
            }}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs font-bold border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Transcript</span>
            {showTranscript ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Main Video Canvas & Theater Stage */}
      <div className="flex-1 flex flex-col items-center justify-center my-2">
        <div className="relative w-full max-w-3xl aspect-video bg-[#0f172a] rounded-2xl overflow-hidden shadow-[6px_6px_0_#0f172a] border-4 border-slate-900 flex flex-col items-center justify-center text-white">
          
          {/* Top Coral Header Bar */}
          <div className="absolute top-0 inset-x-0 bg-[#f87171] text-slate-950 px-4 py-1.5 border-b-2 border-slate-900 flex items-center justify-between font-mono text-xs font-black z-20">
            <div className="flex items-center space-x-2">
              <span>● REC</span>
              <span>HD 1080P // LESSON #{lesson.id}</span>
            </div>
            <span>{Math.round(progress)}% COMPLETED</span>
          </div>

          {/* Animated Instructional Graphic */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4 max-w-lg mt-4">
            <div 
              onClick={() => {
                sound.playKeyClick();
                setIsPlaying(!isPlaying);
              }}
              className="w-16 h-16 rounded-2xl bg-[#fef08a] border-2 border-slate-900 flex items-center justify-center shadow-[4px_4px_0_#000] cursor-pointer hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-slate-950 fill-slate-950" />
              ) : (
                <Play className="w-8 h-8 text-slate-950 fill-slate-950 ml-1" />
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                {lesson.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md font-mono">
                Learn fundamental typing posture, home row finger anchors, rhythm cadence, and ergonomic health.
              </p>
            </div>

            {/* Live Playing Status Badge */}
            <div className="flex items-center space-x-3 bg-slate-900/90 px-3.5 py-1 rounded-lg border border-slate-700 font-mono text-xs">
              <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block mr-1" />
                {isPlaying ? 'Playing Tutorial' : 'Paused'}
              </span>
              <span className="text-slate-500">|</span>
              <span className="font-bold text-amber-300">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Bottom Video Control Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-[#1e293b] border-t-2 border-slate-900 p-3 flex items-center justify-between gap-3 z-20">
            <button
              onClick={() => {
                sound.playKeyClick();
                setIsPlaying(!isPlaying);
              }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* Video Scrubber Bar */}
            <div className="flex-1 mx-2 sm:mx-4 h-3.5 bg-slate-900 rounded border-2 border-slate-900 overflow-hidden p-0.5">
              <div 
                className="h-full rounded-xs bg-[#1888ff]"
                style={{ 
                  width: `${progress}%`,
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 6px)'
                }}
              />
            </div>

            <button
              onClick={handleFinish}
              className="px-3 py-1 rounded-lg bg-[#fef08a] hover:bg-yellow-300 text-slate-950 font-mono text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              Skip Video
            </button>
          </div>

        </div>

        {/* Expandable Transcript Drawer */}
        {showTranscript && (
          <div className="w-full max-w-3xl mt-4 bg-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div className="bg-[#2c3e50] text-white px-3.5 py-1.5 border-b-2 border-slate-900 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <span className="font-bold">LESSON_TRANSCRIPT.TXT</span>
              </div>
              <span className="px-2 py-0.2 rounded bg-[#fef08a] text-slate-950 font-black text-[10px]">
                KEY TAKEAWAYS
              </span>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {transcriptList.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-sky-700 mb-1">
                    <span className="bg-[#1888ff] text-white px-1.5 py-0.2 rounded text-[10px]">{item.time}</span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-normal">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Controls */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] p-3 mt-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setProgress(0);
            }}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs font-bold border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Rewind</span>
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="px-5 py-2 rounded-xl bg-[#48bb78] hover:bg-emerald-500 text-slate-950 font-mono text-xs sm:text-sm font-black border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-2 uppercase font-display"
          >
            <span>Complete Video</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Exit Confirmation Modal if needed */}
      <Modal
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        title="Leave Video?"
        description="Your progress in this video tutorial will be saved."
        size="sm"
      >
        <div className="flex justify-end space-x-3 pt-4 font-mono">
          <button 
            onClick={() => setShowExitConfirm(false)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300"
          >
            Stay
          </button>
          <button 
            onClick={onExit}
            className="px-3 py-1.5 rounded-lg bg-[#f87171] text-slate-950 text-xs font-bold border border-slate-900"
          >
            Exit
          </button>
        </div>
      </Modal>

    </div>
  );
}

