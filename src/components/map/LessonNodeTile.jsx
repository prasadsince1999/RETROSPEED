import React from 'react';
import { Lock, Play } from 'lucide-react';
import { JourneyAvatar } from './JourneyAvatar';

export function LessonNodeTile({
  lesson,
  score,
  isUnlocked,
  isNextActive,
  avatarHopping,
  course,
  onCardClick,
  onAvatarClick
}) {
  const isCompleted = Boolean(score && score.completed);

  const renderCardIllustration = () => {
    if (lesson.type === 'game') {
      const gTitle = `${lesson.title || ''} ${lesson.gameId || ''}`.toLowerCase();
      const isPlane = gTitle.includes('plane') || gTitle.includes('paper');
      const isTrain = gTitle.includes('line') || gTitle.includes('train') || gTitle.includes('local');
      const isMarket = gTitle.includes('market') || gTitle.includes('night');
      const isChits = gTitle.includes('chit') || gTitle.includes('drop');
      const isFuse = gTitle.includes('fuse') || gTitle.includes('desk') || gTitle.includes('circuit');
      const isPit = gTitle.includes('pit') || gTitle.includes('lane') || gTitle.includes('racer');
      const isPatch = gTitle.includes('patch') || gTitle.includes('terminal');

      const emoji = isPlane ? '✈️' : isTrain ? '🚂' : isMarket ? '🏮' : isChits ? '📜' : isFuse ? '⚡' : isPit ? '🏎️' : isPatch ? '🔌' : '🖨️';

      return (
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center text-[#2D2319] font-black text-lg bg-[#F6C445]">
            {emoji}
          </div>
        </div>
      );
    }

    if (lesson.type === 'video' || lesson.type === 'motion') {
      return (
        <div className="relative flex items-center justify-center">
          <div className="w-11 h-9 rounded-xl bg-white border-2 border-[#2D2319] flex items-center justify-center text-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <div className="w-6 h-6 rounded-lg bg-[#F28B82] border border-[#2D2319] text-[#2D2319] flex items-center justify-center">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
          </div>
        </div>
      );
    }

    if (lesson.type === 'code' || lesson.renderEngine === 'python-studio' || course.id === 'python-zero-to-hero') {
      const titleLower = (lesson.title || '').toLowerCase();
      let iconText = '</>';
      let bgTheme = 'bg-[#F6C445]';

      if (titleLower.includes('why') || titleLower.includes('behind') || titleLower.includes('think') || titleLower.includes('concept')) {
        iconText = '💡';
        bgTheme = 'bg-[#C3A6E8]';
      } else if (titleLower.includes('comment') || titleLower.includes('sticky')) {
        iconText = '#';
        bgTheme = 'bg-[#48B89F]';
      } else if (titleLower.includes('print') || titleLower.includes('megaphone')) {
        iconText = '📢';
        bgTheme = 'bg-[#F6C445]';
      } else if (titleLower.includes('variable') || titleLower.includes('box') || titleLower.includes('ram')) {
        iconText = '📦';
        bgTheme = 'bg-[#4BA3E3]';
      } else if (titleLower.includes('input') || titleLower.includes('micro')) {
        iconText = '🎙️';
        bgTheme = 'bg-[#F28B82]';
      } else if (titleLower.includes('type') || titleLower.includes('cast')) {
        iconText = 'str';
        bgTheme = 'bg-[#C7E8CA]';
      } else if (titleLower.includes('string') || titleLower.includes('f-string')) {
        iconText = '“ ”';
        bgTheme = 'bg-[#F6C445]';
      } else if (titleLower.includes('slic') || titleLower.includes('index')) {
        iconText = '[ : ]';
        bgTheme = 'bg-[#4BA3E3]';
      } else if (titleLower.includes('number') || titleLower.includes('math') || titleLower.includes('int')) {
        iconText = '123';
        bgTheme = 'bg-[#48B89F]';
      } else if (titleLower.includes('bool') || titleLower.includes('logic')) {
        iconText = 'T/F';
        bgTheme = 'bg-[#C3A6E8]';
      } else if (titleLower.includes('if') || titleLower.includes('fork') || titleLower.includes('condition')) {
        iconText = '🔀';
        bgTheme = 'bg-[#F28B82]';
      } else if (titleLower.includes('loop') || titleLower.includes('conveyor') || titleLower.includes('for') || titleLower.includes('while')) {
        iconText = '🔁';
        bgTheme = 'bg-[#F6C445]';
      } else if (titleLower.includes('list') || titleLower.includes('array')) {
        iconText = '[ ]';
        bgTheme = 'bg-[#4BA3E3]';
      } else if (titleLower.includes('dict')) {
        iconText = '{ }';
        bgTheme = 'bg-[#48B89F]';
      } else if (titleLower.includes('func') || titleLower.includes('machine') || titleLower.includes('parameter')) {
        iconText = 'def';
        bgTheme = 'bg-[#C3A6E8]';
      }

      return (
        <div className="relative flex items-center justify-center">
          <div className={`w-12 h-9 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-mono font-black text-xs ${
            isCompleted ? 'bg-[#C7E8CA] text-[#2D2319]' : `${bgTheme} text-[#2D2319]`
          }`}>
            {iconText}
          </div>
        </div>
      );
    }

    const targetKeyText = Array.isArray(lesson.targetKeys) && lesson.targetKeys.length > 0
      ? lesson.targetKeys.slice(0, 4).join(' ')
      : (lesson.newKeys ? lesson.newKeys.slice(0, 4) : '⌨');

    return (
      <div className="relative flex items-center justify-center">
        <div className={`w-12 h-9 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-mono font-black text-xs ${
          isCompleted ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-white text-[#2D2319]'
        }`}>
          {targetKeyText}
        </div>
      </div>
    );
  };

  return (
    <div id={`lesson-node-${lesson.id}`} className="relative">
      {isNextActive && (
        <JourneyAvatar 
          isHopping={avatarHopping} 
          onClick={onAvatarClick} 
        />
      )}

      <div
        onClick={() => onCardClick(lesson)}
        className={`relative aspect-square p-3 border-2 border-[#2D2319] rounded-2xl flex flex-col justify-between cursor-pointer transition-all duration-150 select-none ${
          isNextActive
            ? 'bg-[#F6C445] text-[#2D2319] shadow-[5px_5px_0px_#2D2319] ring-2 ring-[#1888ff] -translate-y-1'
            : isCompleted
            ? 'bg-[#C7E8CA] text-[#2D2319] shadow-[3px_3px_0px_#2D2319] hover:shadow-[5px_5px_0px_#2D2319] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
            : isUnlocked
            ? 'bg-white text-[#2D2319] shadow-[3px_3px_0px_#2D2319] hover:shadow-[5px_5px_0px_#2D2319] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
            : 'bg-[#FDF8EE]/60 text-[#2D2319]/40 border-2 border-[#2D2319]/30 opacity-60 shadow-[1px_1px_0px_#2D2319] cursor-not-allowed'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 min-w-0">
            <span className={`text-sm sm:text-base font-black font-mono ${isNextActive ? 'text-[#2D2319]' : 'text-[#2D2319]'}`}>
              #{lesson.number || lesson.id}
            </span>
            {lesson.section && (
              <span className="text-[9px] font-mono font-bold text-[#2D2319]/60">
                ({lesson.section})
              </span>
            )}
          </div>
          {!isUnlocked && (
            <Lock className="w-3.5 h-3.5 text-[#2D2319]/50 shrink-0 ml-1" />
          )}
          {isCompleted && (
            <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-950 font-mono text-[10px] font-black border border-[#2D2319] shrink-0 ml-1">
              ★ {score.stars || 5}
            </span>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center my-1">
          {renderCardIllustration()}
        </div>

        <div className="border-t border-[#2D2319]/20 pt-1 text-center">
          <span className="text-[10px] font-bold text-[#2D2319] truncate block font-display">
            {lesson.title}
          </span>
        </div>
      </div>
    </div>
  );
}
