import React from 'react';
import { Target, Timer, Crosshair, Flame } from 'lucide-react';

const DRILLS = [
  { id: 'quick', title: 'Quick drill', blurb: '60 seconds. Easy words.', difficulty: 'easy', timeLimit: 60, icon: Timer },
  { id: 'daily', title: 'Daily sprint', blurb: '90 seconds. Medium pace.', difficulty: 'medium', timeLimit: 90, icon: Flame },
  { id: 'sprint', title: 'Speed sprint', blurb: 'Go fast for one minute.', difficulty: 'medium', timeLimit: 60, icon: Target },
  { id: 'gauntlet', title: 'Accuracy gauntlet', blurb: 'Hard words. Stay clean.', difficulty: 'hard', timeLimit: 90, icon: Crosshair },
];

export default function PracticeLobby({ onStartDrill }) {
  return (
    <div className="w-full h-full p-5 sm:p-8 bg-retro-surface text-retro-ink overflow-y-auto">
      <h1 className="font-display font-black text-2xl">Practice</h1>
      <p className="text-sm text-retro-ink/70 mt-1 mb-6">
        Pick a drill. Nothing starts until you click.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
        {DRILLS.map((drill) => {
          const Icon = drill.icon;
          return (
            <button
              key={drill.id}
              type="button"
              onClick={() => onStartDrill(drill)}
              className="text-left p-4 rounded-2xl border-2 border-retro-ink bg-retro-surface-alt hover:bg-retro-mustard shadow-retro-sm active:translate-x-0.5 active:translate-y-0.5"
            >
              <div className="flex items-center gap-2 font-display font-black text-sm">
                <Icon className="w-4 h-4" />
                {drill.title}
              </div>
              <p className="text-xs text-retro-ink/70 mt-1">{drill.blurb}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
