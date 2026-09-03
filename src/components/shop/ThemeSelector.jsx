import React from 'react';
import { Check } from 'lucide-react';

export const RETRO_THEMES = [
  {
    id: 'bone',
    name: 'Vintage 90s OS (Default)',
    subtitle: 'Warm cream canvas with solid mustard & lilac accents',
    bg: '#B9D2E8',
    surface: '#FDF8EE',
    header: '#C3A6E8',
    accent: '#F6C445',
    tag: 'Classic'
  },
  {
    id: 'vintage',
    name: 'Macintosh Classic Paper',
    subtitle: 'Soft sandstone parchment with sky denim highlights',
    bg: '#C5D8E6',
    surface: '#F7F1E1',
    header: '#4BA3E3',
    accent: '#48B89F',
    tag: 'Vintage'
  },
  {
    id: 'cyber-mint',
    name: 'Neo Mint & Lavender',
    subtitle: 'Pastel mint green surfaces with lavender titlebars',
    bg: '#D4E8DC',
    surface: '#F1FAF5',
    header: '#48B89F',
    accent: '#C3A6E8',
    tag: 'Modern Retro'
  },
  {
    id: 'lavender',
    name: 'Pastel Dreamscape',
    subtitle: 'Solid lilac headers with warm coral accents',
    bg: '#E3D7F4',
    surface: '#FAF5FE',
    header: '#C3A6E8',
    accent: '#F28B82',
    tag: 'Pastel'
  },
  {
    id: 'terminal',
    name: 'Terminal Amber',
    subtitle: 'Golden mustard titlebars with high contrast ink cards',
    bg: '#E8DEC4',
    surface: '#FDF8EC',
    header: '#F6C445',
    accent: '#F6C445',
    tag: 'Hacker CRT'
  }
];

export function ThemeSelector({ selectedTheme, onSelectTheme }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {RETRO_THEMES.map(th => {
        const isActive = selectedTheme === th.id;
        return (
          <div
            key={th.id}
            onClick={() => onSelectTheme(th.id)}
            className={`p-4 rounded-2xl border-2 border-[#2D2319] cursor-pointer transition-all ${
              isActive 
                ? 'bg-[#FAF3E0] shadow-[4px_4px_0px_#2D2319] ring-2 ring-[#48B89F]' 
                : 'bg-[#FDF8EE] hover:bg-[#FAF3E0] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-5 h-5 rounded-md border border-[#2D2319]"
                  style={{ backgroundColor: th.header }}
                />
                <span className="font-display font-black text-sm text-[#2D2319]">{th.name}</span>
              </div>

              <span className="px-2 py-0.5 rounded bg-[#FDF8EE] border border-[#2D2319] text-[10px] font-mono font-bold text-[#2D2319]">
                {th.tag}
              </span>
            </div>

            <p className="text-xs text-[#2D2319]/70 mt-2 font-medium">
              {th.subtitle}
            </p>

            <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-[#2D2319]/10">
              <span className="text-[10px] font-mono text-[#2D2319]/60">Palette:</span>
              <span className="w-4 h-4 rounded border border-[#2D2319]" style={{ backgroundColor: th.bg }} title="Canvas Wallpaper" />
              <span className="w-4 h-4 rounded border border-[#2D2319]" style={{ backgroundColor: th.surface }} title="Card Surface" />
              <span className="w-4 h-4 rounded border border-[#2D2319]" style={{ backgroundColor: th.header }} title="Titlebar Header" />
              <span className="w-4 h-4 rounded border border-[#2D2319]" style={{ backgroundColor: th.accent }} title="Accent Color" />
              
              {isActive && (
                <span className="ml-auto text-xs font-mono font-black text-[#48B89F] flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>ACTIVE</span>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
