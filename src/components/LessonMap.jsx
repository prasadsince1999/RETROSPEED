import React, { useState } from 'react';
import { 
  Target, 
  ChevronUp, 
  ChevronDown, 
  List, 
  Star, 
  Zap, 
  CheckCircle2,
  Compass,
  ArrowLeft,
  Search,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import StageDrawer from './StageDrawer';
import { sound } from '../utils/audio';
import {
  JourneyAvatar,
  StageBossMilestoneGate,
  LessonNodeTile,
  StageHeaderBanner
} from './map';

export default function LessonMap({
  course = {},
  stages = [],
  lessons = [],
  userProgress = {},
  onSelectLesson,
  onJumpWarning,
  onNavigate,
  onBack
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [avatarHopping, setAvatarHopping] = useState(false);

  const courseScores = userProgress.courses?.[course.id]?.scores || {};
  const unlockedLevel = userProgress.courses?.[course.id]?.unlockedLevel || 1;
  const totalStars = userProgress.courses?.[course.id]?.totalStars || 0;
  const totalPoints = userProgress.courses?.[course.id]?.totalPoints || 0;

  const completedCount = Object.values(courseScores).filter(s => s.completed).length;
  const progressPercent = lessons.length > 0 ? Math.min(100, Math.round((completedCount / lessons.length) * 100)) : 0;

  const filteredStages = stages.filter(stage => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const matchesTitle = stage.title.toLowerCase().includes(q);
    const stageLessons = lessons.filter(l => {
      const lNum = typeof l.number === 'number' ? l.number : (typeof l.id === 'number' ? l.id : parseInt(String(l.id).replace(/\D/g, ''), 10));
      return (l.stageId && stage.id) ? l.stageId === stage.id : (lNum >= stage.start && lNum <= stage.end);
    });
    const matchesLesson = stageLessons.some(l => 
      l.title.toLowerCase().includes(q) || 
      String(l.id).toLowerCase().includes(q) || 
      String(l.number || l.id) === q ||
      (l.rawId && String(l.rawId).toLowerCase().includes(q)) ||
      (l.section && String(l.section).toLowerCase().includes(q))
    );
    return matchesTitle || matchesLesson;
  });

  const locateActiveHero = () => {
    sound.playKeyClick();
    const node = document.getElementById(`lesson-node-${unlockedLevel}`);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setAvatarHopping(true);
      setTimeout(() => setAvatarHopping(false), 900);
    }
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    sound.playSuccessChime();
    setAvatarHopping(true);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.6 }
    });
    setTimeout(() => setAvatarHopping(false), 900);
  };

  const handleCardClick = (lesson) => {
    sound.playKeyClick();
    if (lesson.id > unlockedLevel) {
      if (onJumpWarning) onJumpWarning(lesson);
      return;
    }
    if (onSelectLesson) onSelectLesson(lesson);
  };

  return (
    <div className="min-h-screen bg-[var(--rs-paper)] select-none relative pb-32 font-sans text-[#2D2319] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-4 pb-2 space-y-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                sound.playKeyClick();
                if (onBack) onBack();
                else if (onNavigate) onNavigate('learn');
              }}
              className="px-3 py-1.5 rounded-xl bg-[var(--rs-paper-alt)] hover:bg-white text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← My Learnings</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playKeyClick();
                if (onNavigate) onNavigate('shop-courses');
              }}
              className="px-3 py-1.5 rounded-xl bg-[var(--rs-paper-alt)] hover:bg-white text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all hidden sm:flex items-center space-x-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#F6C445]" />
              <span>+ Shop Library</span>
            </button>
          </div>

          <div className="text-xs text-[#2D2319] font-mono font-bold hidden sm:flex items-center space-x-2 bg-[var(--rs-paper-alt)] px-3.5 py-1.5 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <span className="text-[#2D2319]/60">Keys:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#2D2319] text-[10px]">L</kbd>
            <span>Locate</span>
            <span>•</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#2D2319] text-[10px]">T</kbd>
            <span>Stages</span>
            <span>•</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#2D2319] text-[10px]">Esc</kbd>
            <span>Hub</span>
          </div>
        </div>

        {/* Stage Header Banner */}
        <StageHeaderBanner 
          course={course} 
          progressPercent={progressPercent} 
          totalStars={totalStars} 
          totalPoints={totalPoints} 
        />
      </div>

      {/* Filter, Stats & Stage Drawer Navigation Bar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="bg-[var(--rs-paper-alt)] px-4 py-2 rounded-2xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] flex items-center space-x-3 text-xs font-mono font-bold text-[#2D2319] w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-[#2D2319] font-black">{completedCount} / {lessons.length}</span>
            <span className="text-[#2D2319]/60 font-normal">done</span>
          </div>
          <span className="text-[#2D2319]/30">|</span>
          <div className="flex items-center space-x-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-amber-700 font-black">{totalStars}</span>
          </div>
          <span className="text-[#2D2319]/30">|</span>
          <div className="flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-sky-600" />
            <span className="text-[#2D2319] font-black">{totalPoints.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="flex-1 sm:w-64">
            <div className="flex items-center bg-white border-2 border-[#2D2319] rounded-xl px-3 py-1.5 shadow-[3px_3px_0px_#2D2319]">
              <Search className="w-4 h-4 text-[#2D2319]/60 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search level or key..."
                className="w-full bg-transparent border-none outline-none text-xs font-mono font-bold text-[#2D2319] placeholder:text-[#2D2319]/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-mono font-bold text-[#2D2319]/50 hover:text-[#2D2319]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={locateActiveHero}
            title="Locate Hero on Map (L)"
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] font-black text-xs border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1 font-display cursor-pointer"
          >
            <Compass className="w-4 h-4 text-sky-600" />
            <span>Locate</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setDrawerOpen(true);
            }}
            title="Open Table of Contents (T)"
            className="px-3.5 py-1.5 rounded-xl bg-[#F6C445] hover:bg-[#eab308] text-[#2D2319] font-black text-xs border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 font-display cursor-pointer"
          >
            <List className="w-4 h-4" />
            <span>Stages ({stages.length})</span>
          </button>
        </div>
      </div>

      {/* Main Levels Map Container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 relative">
        {filteredStages.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-[#2D2319]/40 rounded-2xl p-12 text-center shadow-[4px_4px_0px_#2D2319] mt-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--rs-paper)] border-2 border-[#2D2319] text-[#2D2319] flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#2D2319]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#2D2319] font-display">No levels found</h3>
            <p className="text-xs text-[#2D2319]/70 mt-1 max-w-sm mx-auto font-mono">
              No matches found for <strong className="text-[#2D2319]">"{searchQuery}"</strong>. Try a level number or key phrase.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 px-3 py-1.5 rounded-xl bg-[#1888ff] text-white font-black text-xs border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="space-y-12 mt-4">
            {filteredStages.map((stage, stageIndex) => {
              const stageLessons = lessons.filter(l => {
                const lNum = typeof l.number === 'number' ? l.number : (typeof l.id === 'number' ? l.id : parseInt(String(l.id).replace(/\D/g, ''), 10));
                const inRange = (l.stageId && stage.id) ? l.stageId === stage.id : (lNum >= stage.start && lNum <= stage.end);
                if (!inRange) return false;
                if (!searchQuery.trim()) return true;
                const q = searchQuery.toLowerCase().trim();
                return (
                  l.title.toLowerCase().includes(q) || 
                  String(l.id).toLowerCase().includes(q) || 
                  String(l.number || l.id) === q ||
                  (l.rawId && String(l.rawId).toLowerCase().includes(q)) ||
                  (l.section && String(l.section).toLowerCase().includes(q))
                );
              });

              if (stageLessons.length === 0) return null;

              const nextStage = filteredStages[stageIndex + 1];
              const completedInThisStage = lessons.filter(l => {
                const lNum = typeof l.number === 'number' ? l.number : (typeof l.id === 'number' ? l.id : parseInt(String(l.id).replace(/\D/g, ''), 10));
                const inRange = (l.stageId && stage.id) ? l.stageId === stage.id : (lNum >= stage.start && lNum <= stage.end);
                return inRange && courseScores[l.id]?.completed;
              }).length;
              const totalInThisStage = stage.end - stage.start + 1;
              const isStageGateUnlocked = completedInThisStage >= totalInThisStage || unlockedLevel > stage.end;

              return (
                <React.Fragment key={stage.id}>
                  <div id={stage.id} className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#2D2319] pb-2">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl sm:text-2xl font-black text-[#2D2319] tracking-tight font-display">
                          {stage.title}
                        </h2>
                        <span className="px-2 py-0.5 rounded-md bg-[#2D2319] text-[#FDF8EE] font-mono text-[10px] font-bold">
                          Levels {stage.start}–{stage.end}
                        </span>
                      </div>

                      {stage.goal && (
                        <span className="px-2.5 py-0.5 rounded-md bg-[#C7E8CA] text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1">
                          <Target className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Goal: {stage.goal}</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-10">
                      {stageLessons.map(lesson => (
                        <LessonNodeTile
                          key={lesson.id}
                          lesson={lesson}
                          score={courseScores[lesson.id]}
                          isUnlocked={lesson.id <= unlockedLevel}
                          isNextActive={lesson.id === unlockedLevel}
                          avatarHopping={avatarHopping}
                          course={course}
                          onCardClick={handleCardClick}
                          onAvatarClick={handleAvatarClick}
                        />
                      ))}
                    </div>
                  </div>

                  {nextStage && (
                    <StageBossMilestoneGate
                      fromStage={stage}
                      toStage={nextStage}
                      stageIndex={stageIndex}
                      isUnlocked={isStageGateUnlocked}
                      completedLevels={completedInThisStage}
                      totalLevels={totalInThisStage}
                      onInspectGate={() => {}}
                      onJumpToActive={locateActiveHero}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Navigation Rail */}
      <div className="fixed right-4 top-1/3 z-40 hidden md:flex flex-col items-center space-y-2 bg-[var(--rs-paper-alt)] p-2 rounded-2xl shadow-[4px_4px_0px_#2D2319] border-2 border-[#2D2319]">
        <button 
          onClick={() => {
            sound.playKeyClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Scroll to Top"
          className="p-2 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <button 
          onClick={() => {
            sound.playKeyClick();
            setDrawerOpen(true);
          }}
          title="Table of Contents (T)"
          className="p-2 rounded-xl bg-[#F6C445] hover:bg-[#eab308] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <List className="w-4 h-4" />
        </button>

        <button 
          onClick={locateActiveHero}
          title="Locate Hero (L)"
          className="p-2 rounded-xl bg-[#4BA3E3] hover:bg-sky-500 text-white border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4" />
        </button>

        <button 
          onClick={() => {
            sound.playKeyClick();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }}
          title="Scroll to Bottom"
          className="p-2 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <StageDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        stages={stages}
        userProgress={userProgress.courses?.[course.id] || {}}
        onSelectStage={stage => {
          setDrawerOpen(false);
          const el = document.getElementById(stage.id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />
    </div>
  );
}
