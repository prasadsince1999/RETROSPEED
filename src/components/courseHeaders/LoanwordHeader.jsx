import React from 'react';

export const LANGUAGE_ORIGINS = {
  'spanish': { flag: '🇪🇸', name: 'Spanish', native: 'Español', family: 'Romance Language', desc: 'From the Iberian Peninsula, Mexico, and South America' },
  'french': { flag: '🇫🇷', name: 'French', native: 'Français', family: 'Romance Language', desc: 'From France and Norman historical contact with English' },
  'japanese': { flag: '🇯🇵', name: 'Japanese', native: '日本語', family: 'Japonic Language', desc: 'From Japan, culinary terms, martial arts, and arts' },
  'italian': { flag: '🇮🇹', name: 'Italian', native: 'Italiano', family: 'Romance Language', desc: 'From Italy, musical notation, gastronomy, and architecture' },
  'german': { flag: '🇩🇪', name: 'German', native: 'Deutsch', family: 'West Germanic', desc: 'From Germany, philosophy, science, and cultural terms' },
  'arabic': { flag: '🇸🇦', name: 'Arabic', native: 'العربية', family: 'Semitic Language', desc: 'From the Arabian Peninsula, algebra, astronomy, and trade' },
  'cantonese': { flag: '🇨🇳', name: 'Cantonese', native: '粵語 / 广东话', family: 'Sino-Tibetan', desc: 'From Southern China, Hong Kong, culinary and trade words' },
  'mandarin': { flag: '🇨🇳', name: 'Mandarin', native: '中文 / 官话', family: 'Sino-Tibetan', desc: 'From China, tea varieties, martial arts, and geography' },
  'hokkien': { flag: '🇹🇼', name: 'Hokkien', native: '閩南語', family: 'Southern Min', desc: 'From Southern Fujian and Southeast Asian trade diaspora' },
  'dutch': { flag: '🇳🇱', name: 'Dutch', native: 'Nederlands', family: 'West Germanic', desc: 'From the Netherlands, nautical, maritime, and landscape terms' },
  'russian': { flag: '🇷🇺', name: 'Russian', native: 'Русский', family: 'Slavic Language', desc: 'From Eastern Europe and Eurasia, geography and culture' },
  'hebrew': { flag: '🇮🇱', name: 'Hebrew', native: 'עִבְרִית', family: 'Northwest Semitic', desc: 'From the ancient Levant, historical and cultural vocabulary' },
  'sanskrit': { flag: '🇮🇳', name: 'Sanskrit', native: 'संस्कृतम्', family: 'Indo-Aryan', desc: 'From Ancient India, philosophy, yoga, and meditation terms' },
  'persian': { flag: '🇮🇷', name: 'Persian', native: 'فارسی (Farsi)', family: 'Indo-Iranian', desc: 'From the Iranian Plateau, Silk Road spices, textiles, and trade' },
  'latin': { flag: '🏛️', name: 'Latin', native: 'Lingua Latina', family: 'Classical Italic', desc: 'From Ancient Rome, law, medicine, science, and scholarly vocabulary' },
  'greek': { flag: '🏛️', name: 'Ancient Greek', native: 'Ἑλληνική', family: 'Hellenic', desc: 'From Ancient Greece, philosophy, science, and mathematics' },
  'algonquian languages': { flag: '🪶', name: 'Algonquian Languages', native: 'Indigenous American', family: 'Algonquian', desc: 'From North American First Nations, wildlife and nature' },
  'arawakan languages': { flag: '🌴', name: 'Arawakan Languages', native: 'Taíno / Lokono', family: 'Indigenous Caribbean', desc: 'From the Indigenous Caribbean and South America' },
  'nahuatl': { flag: '☀️', name: 'Nahuatl', native: 'Nāhuatl', family: 'Uto-Aztecan', desc: 'From the Aztec Empire of Central Mexico (chocolate, tomato, etc.)' },
  'quechua': { flag: '🏔️', name: 'Quechua', native: 'Runasimi', family: 'Indigenous Andean', desc: 'From the Inca Empire and the Andean Mountain highlands' },
  'bantu languages': { flag: '🌍', name: 'Bantu Languages', native: 'isiZulu / Kiswahili', family: 'Niger-Congo', desc: 'From Sub-Saharan Africa, music, rhythm, and nature' },
  'malay': { flag: '🇲🇾', name: 'Malay', native: 'Bahasa Melayu', family: 'Austronesian', desc: 'From Maritime Southeast Asia, trade ports and spices' },
  'australian aboriginal languages': { flag: '🦘', name: 'Australian Aboriginal', native: 'First Nations', family: 'Pama-Nyungan', desc: 'From Indigenous Australia, native wildlife (kangaroo, boomerang)' }
};

export function LoanwordHeader({ lesson, title, stage, text = '' }) {
  const stageLower = stage.toLowerCase();
  let langKey = Object.keys(LANGUAGE_ORIGINS).find(k => stageLower.includes(k));
  const langInfo = langKey ? LANGUAGE_ORIGINS[langKey] : null;

  const isDefinition = /definition/i.test(title) || /\((noun|verb|adjective|adv|prep)\):/i.test(text);
  const isHistory = /history|etymology|origin|comes from/i.test(title) || /comes from|derived from/i.test(text);
  const isSentence = /sentence|context|practice/i.test(title);

  const wordMatch = title.match(/^([A-Za-z\s'-]+):\s*(Definition|History|Sentence)/i);
  const targetWord = wordMatch ? wordMatch[1] : null;

  const posMatch = text.match(/\b(noun|verb|adjective|adverb)\b\s*:/i);
  const partOfSpeech = posMatch ? posMatch[1].toLowerCase() : null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-3">
      <div className="bg-[#ccfbf1] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
        <div className="bg-[#2c3e50] text-white px-3.5 py-1 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-teal-300">✦</span>
            <span className="font-bold tracking-wider">ETYMOLOGY_LEXICON.DAT // LANGUAGE_ORIGINS</span>
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
              {langInfo ? (
                <span className="px-2.5 py-0.5 rounded bg-white text-slate-950 font-mono text-xs font-black border border-slate-900 shadow-[1px_1px_0_#0f172a] inline-flex items-center space-x-1">
                  <span>{langInfo.flag}</span>
                  <span>{langInfo.name}</span>
                  <span className="text-teal-700 text-[10px] ml-1">({langInfo.native})</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded bg-white text-slate-950 font-mono text-xs font-black border border-slate-900 shadow-[1px_1px_0_#0f172a]">
                  Global Etymology • {stage}
                </span>
              )}

              {langInfo && (
                <span className="px-2 py-0.5 rounded bg-[#48bb78] text-slate-950 font-mono text-[10px] font-bold border border-slate-900">
                  {langInfo.family}
                </span>
              )}

              {isDefinition && (
                <span className="px-2 py-0.5 rounded bg-[#1888ff] text-white font-mono text-[10px] font-bold border border-slate-900">
                  Definition & Meaning
                </span>
              )}

              {isHistory && (
                <span className="px-2 py-0.5 rounded bg-[#f59e0b] text-slate-950 font-mono text-[10px] font-bold border border-slate-900">
                  Word History
                </span>
              )}

              {isSentence && (
                <span className="px-2 py-0.5 rounded bg-[#a78bfa] text-slate-950 font-mono text-[10px] font-bold border border-slate-900">
                  In Context
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-0.5 font-mono text-xs">
              {targetWord && (
                <span className="px-2 py-0.5 rounded bg-white border border-slate-900 font-black text-teal-800 text-xs shadow-[1px_1px_0_#0f172a]">
                  {targetWord.toUpperCase()}
                </span>
              )}

              {partOfSpeech && (
                <span className="italic text-xs text-teal-900 bg-teal-200/80 px-1.5 py-0.2 rounded border border-teal-400">
                  ({partOfSpeech})
                </span>
              )}

              <span className="text-xs text-slate-700 font-medium">
                {langInfo ? langInfo.desc : `Lesson ${lesson.id}: ${title}`}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="px-2.5 py-0.5 rounded bg-white border border-slate-900 shadow-[1px_1px_0_#0f172a] text-slate-900 font-mono text-xs font-black">
              📖 LANGUAGE ORIGINS
            </span>
            <span className="text-[10px] text-slate-600 font-mono mt-0.5">Definitions & Roots</span>
          </div>
        </div>
      </div>
    </div>
  );
}
