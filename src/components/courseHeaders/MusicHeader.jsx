import React from 'react';
import { Music, Disc } from 'lucide-react';

export const MUSIC_THEORY_DOMAINS = [
  {
    keywords: ['time signature', 'meter', 'rhythm and meter', 'rhythm', 'tempo', 'beat', 'duration', 'note values'],
    badge: '𝄴 Time Signatures & Meter',
    symbol: '𝄴',
    title: 'Meter, Rhythm & Time Signatures',
    callout: 'Notation: 4/4 Common Time • 3/4 Waltz • 6/8 Compound • Whole 𝅝, Half 𝅗𝅥, Quarter 𝅘𝅥, Eighth 𝅘𝅥𝅮 notes and rests 𝄽',
    theme: 'purple'
  },
  {
    keywords: ['scale', 'major scale', 'minor scale', 'key signature', 'circle of fifths', 'tonality', 'tonic', 'octave', 'pitch', 'sharps and flats', 'accidentals'],
    badge: '𝄞 Scales & Key Signatures',
    symbol: '𝄞',
    title: 'Scales, Tonality & Pitch',
    callout: 'Formulas: Major (W-W-H-W-W-W-H) • Natural Minor (W-H-W-W-H-W-W) • Accidentals (♯ Sharp, ♭ Flat, ♮ Natural)',
    theme: 'indigo'
  },
  {
    keywords: ['staff', 'clef', 'treble clef', 'bass clef', 'sheet music', 'musical alphabet', 'ledger line'],
    badge: '🎼 Staff & Clef Notation',
    symbol: '🎼',
    title: 'Clefs & The Grand Staff',
    callout: 'Treble Clef (E-G-B-D-F / F-A-C-E) • Bass Clef (G-B-D-F-A / A-C-E-G) • Middle C anchor line',
    theme: 'pink'
  },
  {
    keywords: ['chord', 'triad', 'harmony', 'interval', 'major triad', 'minor triad', 'root position'],
    badge: '🎹 Chords & Harmony',
    symbol: '🎹',
    title: 'Harmonic Triads & Intervals',
    callout: 'Triad Structure: Root + Major/Minor Third + Perfect Fifth • Diatonic chord progressions',
    theme: 'teal'
  },
  {
    keywords: ['dynamics', 'articulation', 'expression', 'crescendo', 'staccato', 'legato', 'forte', 'piano'],
    badge: '𝄢 Expression & Dynamics',
    symbol: '𝄢',
    title: 'Dynamics, Tempo & Articulations',
    callout: 'Volume: Pianissimo (pp) to Fortissimo (ff) • Expressions: Staccato dots, Legato slurs, Crescendo wedges',
    theme: 'amber'
  }
];

export function MusicHeader({ lesson, title, stage }) {
  const stageAndTitle = (stage + ' ' + title).toLowerCase();
  let domain = MUSIC_THEORY_DOMAINS.find(d => 
    d.keywords.some(kw => stageAndTitle.includes(kw))
  ) || MUSIC_THEORY_DOMAINS[0];

  return (
    <div className="w-full max-w-4xl mx-auto mb-3">
      <div className="bg-[#f3e8ff] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
        <div className="bg-[#2c3e50] text-white px-3.5 py-1 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-purple-300">✦</span>
            <span className="font-bold tracking-wider">MUSIC_WORKSHOP.EXE // NOTATION_THEORY</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3.5 h-3.5 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono text-slate-300">_</span>
            <span className="w-3.5 h-3.5 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[8px] font-mono text-slate-300">□</span>
            <span className="w-3.5 h-3.5 bg-[#f87171] border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono text-slate-900">✕</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-900">
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-white text-slate-950 font-mono text-xs font-black border border-slate-900 shadow-[1px_1px_0_#0f172a] inline-flex items-center space-x-1">
                <Music className="w-3.5 h-3.5 text-purple-700" />
                <span>{domain.badge}</span>
              </span>

              <span className="px-2.5 py-0.5 rounded bg-purple-200 text-purple-950 font-mono text-xs font-bold border border-purple-500 inline-flex items-center space-x-1">
                <Disc className="w-3.5 h-3.5 text-purple-800" />
                <span>{stage}</span>
              </span>
            </div>

            <div className="text-xs font-mono pt-0.5">
              <span className="font-bold text-purple-900">{domain.title}: </span>
              <span className="text-slate-700">{domain.callout}</span>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="px-2.5 py-0.5 rounded bg-white border border-slate-900 shadow-[1px_1px_0_#0f172a] text-slate-900 font-mono text-xs font-black">
              🎵 THEORY & NOTATION
            </span>
            <span className="text-[10px] text-slate-600 font-mono mt-0.5">Lesson {lesson.id} • {lesson.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
