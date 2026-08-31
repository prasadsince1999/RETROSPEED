import React from 'react';
import { 
  Search, 
  FileSearch, 
  ShieldAlert, 
  Fingerprint, 
  FolderCheck,
  Globe, 
  Languages, 
  BookOpen, 
  Quote, 
  History, 
  Music, 
  Disc, 
  MapPin, 
  Compass, 
  Landmark,
  Sparkles,
  Award,
  Terminal,
  Code,
  Braces,
  Cpu
} from 'lucide-react';
import { Card, Badge } from './ui';

// ==========================================
// 1. U.S. STATES REGISTRY & TRIVIA DATABASE
// ==========================================
const US_STATES_DB = {
  'alabama': { code: 'AL', name: 'Alabama', capital: 'Montgomery', nickname: 'The Heart of Dixie', region: 'The Southeast', flag: '🌲', trivia: 'Home to the Marshall Space Flight Center in Huntsville.' },
  'alaska': { code: 'AK', name: 'Alaska', capital: 'Juneau', nickname: 'The Last Frontier', region: 'Non-contiguous States', flag: '🏔️', trivia: 'The largest U.S. state by area, containing over 3 million lakes.' },
  'arizona': { code: 'AZ', name: 'Arizona', capital: 'Phoenix', nickname: 'The Grand Canyon State', region: 'The Southwest', flag: '🏜️', trivia: 'Home to the magnificent Grand Canyon and the Sonoran Desert.' },
  'arkansas': { code: 'AR', name: 'Arkansas', capital: 'Little Rock', nickname: 'The Natural State', region: 'South Central', flag: '💎', trivia: 'Home to the Crater of Diamonds State Park where visitors find real diamonds.' },
  'california': { code: 'CA', name: 'California', capital: 'Sacramento', nickname: 'The Golden State', region: 'The West Coast', flag: '☀️', trivia: 'Most populous U.S. state, featuring Yosemite, Redwood forests, and Silicon Valley.' },
  'colorado': { code: 'CO', name: 'Colorado', capital: 'Denver', nickname: 'The Centennial State', region: 'The West', flag: '🏔️', trivia: 'Has the highest mean altitude of any state, with over 50 peaks exceeding 14,000 feet.' },
  'connecticut': { code: 'CT', name: 'Connecticut', capital: 'Hartford', nickname: 'The Constitution State', region: 'New England', flag: '⚓', trivia: 'Home to Yale University and the first public library in America.' },
  'delaware': { code: 'DE', name: 'Delaware', capital: 'Dover', nickname: 'The First State', region: 'The Mid-Atlantic', flag: '🏛️', trivia: 'The first state to ratify the United States Constitution on December 7, 1787.' },
  'florida': { code: 'FL', name: 'Florida', capital: 'Tallahassee', nickname: 'The Sunshine State', region: 'The Southeast', flag: '🌴', trivia: 'Home to the Everglades ecosystem, Kennedy Space Center, and the Florida Keys.' },
  'georgia': { code: 'GA', name: 'Georgia', capital: 'Atlanta', nickname: 'The Peach State', region: 'The Southeast', flag: '🍑', trivia: 'Top producer of peaches, peanuts, and pecans in the United States.' },
  'hawaii': { code: 'HI', name: 'Hawaii', capital: 'Honolulu', nickname: 'The Aloha State', region: 'Non-contiguous States', flag: '🌺', trivia: 'The only U.S. state located in Oceania, made entirely of volcanic islands.' },
  'idaho': { code: 'ID', name: 'Idaho', capital: 'Boise', nickname: 'The Gem State', region: 'The West', flag: '🥔', trivia: 'Produces one third of all potatoes grown in the United States and has 72 gem varieties.' },
  'illinois': { code: 'IL', name: 'Illinois', capital: 'Springfield', nickname: 'The Prairie State', region: 'The Great Lakes', flag: '🏙️', trivia: 'Known as the Land of Lincoln and home to Chicago on the shores of Lake Michigan.' },
  'indiana': { code: 'IN', name: 'Indiana', capital: 'Indianapolis', nickname: 'The Hoosier State', region: 'The Great Lakes', flag: '🏎️', trivia: 'Hosts the world-famous Indianapolis 500 motor race every Memorial Day weekend.' },
  'iowa': { code: 'IA', name: 'Iowa', capital: 'Des Moines', nickname: 'The Hawkeye State', region: 'The Midwest', flag: '🌽', trivia: 'A powerhouse in corn and agriculture, bounded by the Mississippi and Missouri rivers.' },
  'kansas': { code: 'KS', name: 'Kansas', capital: 'Topeka', nickname: 'The Sunflower State', region: 'The Midwest', flag: '🌻', trivia: 'Located in the geographic center of the 48 contiguous United States.' },
  'kentucky': { code: 'KY', name: 'Kentucky', capital: 'Frankfort', nickname: 'The Bluegrass State', region: 'South Central', flag: '🐎', trivia: 'Famous for the Kentucky Derby and Mammoth Cave, the longest cave system in the world.' },
  'louisiana': { code: 'LA', name: 'Louisiana', capital: 'Baton Rouge', nickname: 'The Pelican State', region: 'South Central', flag: '🎷', trivia: 'Renowned for French Creole culture, Mardi Gras, and the birthplace of Jazz.' },
  'maine': { code: 'ME', name: 'Maine', capital: 'Augusta', nickname: 'The Pine Tree State', region: 'New England', flag: '🦞', trivia: 'Easternmost state in the U.S., famous for rocky coastlines and lobster fishing.' },
  'maryland': { code: 'MD', name: 'Maryland', capital: 'Annapolis', nickname: 'The Old Line State', region: 'The Mid-Atlantic', flag: '🦀', trivia: 'Famous for blue crabs from Chesapeake Bay and birthplace of the Star-Spangled Banner.' },
  'massachusetts': { code: 'MA', name: 'Massachusetts', capital: 'Boston', nickname: 'The Bay State', region: 'New England', flag: '⛵', trivia: 'Landing site of the Mayflower pilgrims at Plymouth in 1620 and cradle of the American Revolution.' },
  'michigan': { code: 'MI', name: 'Lansing', capital: 'Lansing', nickname: 'The Great Lakes State', region: 'The Great Lakes', flag: '🚗', trivia: 'The only state composed of two separate peninsulas, bordered by four of the five Great Lakes.' },
  'minnesota': { code: 'MN', name: 'Saint Paul', capital: 'Saint Paul', nickname: 'Land of 10,000 Lakes', region: 'The Great Lakes', flag: '🌲', trivia: 'Contains 11,842 lakes and the northern headwaters of the great Mississippi River.' },
  'mississippi': { code: 'MS', name: 'Jackson', capital: 'Jackson', nickname: 'The Magnolia State', region: 'The Southeast', flag: '🎸', trivia: 'The birthplace of Delta Blues music and major producer of farm-raised catfish.' },
  'missouri': { code: 'MO', name: 'Jefferson City', capital: 'Jefferson City', nickname: 'The Show-Me State', region: 'The Midwest', flag: '🏛️', trivia: 'Features the stainless steel Gateway Arch in St. Louis, the Gateway to the West.' },
  'montana': { code: 'MT', name: 'Helena', capital: 'Helena', nickname: 'The Treasure State', region: 'The West', flag: '🏔️', trivia: 'Known as "Big Sky Country" and home to Glacier National Park.' },
  'nebraska': { code: 'NE', name: 'Lincoln', capital: 'Lincoln', nickname: 'The Cornhusker State', region: 'The Midwest', flag: '🌾', trivia: 'Home to Chimney Rock, a landmark along the historic Oregon and Mormon trails.' },
  'nevada': { code: 'NV', name: 'Carson City', capital: 'Carson City', nickname: 'The Silver State', region: 'The West', flag: '🎰', trivia: 'Leading producer of gold and silver in the U.S., featuring the Great Basin and Hoover Dam.' },
  'new hampshire': { code: 'NH', name: 'Concord', capital: 'Concord', nickname: 'The Granite State', region: 'New England', flag: '⛰️', trivia: 'First state to declare its independence from Great Britain in January 1776.' },
  'new jersey': { code: 'NJ', name: 'Trenton', capital: 'Trenton', nickname: 'The Garden State', region: 'The Mid-Atlantic', flag: '🎡', trivia: 'Has the highest population density in the U.S. and famous Atlantic boardwalks.' },
  'new mexico': { code: 'NM', name: 'Santa Fe', capital: 'Santa Fe', nickname: 'The Land of Enchantment', region: 'The Southwest', flag: '🌶️', trivia: 'Santa Fe is the oldest state capital in the U.S., founded in 1610.' },
  'new york': { code: 'NY', name: 'Albany', capital: 'Albany', nickname: 'The Empire State', region: 'The Mid-Atlantic', flag: '🗽', trivia: 'Home to the Statue of Liberty, Adirondack Park, and Niagara Falls.' },
  'north carolina': { code: 'NC', name: 'Raleigh', capital: 'Raleigh', nickname: 'The Tar Heel State', region: 'The Southeast', flag: '✈️', trivia: 'First in Flight: The Wright Brothers made the first powered flight at Kitty Hawk in 1903.' },
  'north dakota': { code: 'ND', name: 'Bismarck', capital: 'Bismarck', nickname: 'The Peace Garden State', region: 'The Midwest', flag: '🦬', trivia: 'Home to Theodore Roosevelt National Park and leading producer of spring wheat and sunflowers.' },
  'ohio': { code: 'OH', name: 'Columbus', capital: 'Columbus', nickname: 'The Buckeye State', region: 'The Great Lakes', flag: '🛸', trivia: 'Birthplace of aviation pioneers and 24 American astronauts, including Neil Armstrong.' },
  'oklahoma': { code: 'OK', name: 'Oklahoma City', capital: 'Oklahoma City', nickname: 'The Sooner State', region: 'South Central', flag: '🏹', trivia: 'Rich Native American history with 39 tribal nations headquartered in the state.' },
  'oregon': { code: 'OR', name: 'Salem', capital: 'Salem', nickname: 'The Beaver State', region: 'The West Coast', flag: '🌲', trivia: 'Home to Crater Lake, the deepest lake in the United States, formed by an ancient volcano.' },
  'pennsylvania': { code: 'PA', name: 'Harrisburg', capital: 'Harrisburg', nickname: 'The Keystone State', region: 'The Mid-Atlantic', flag: '🔔', trivia: 'Birthplace of American independence, where the Declaration of Independence was signed.' },
  'rhode island': { code: 'RI', name: 'Providence', capital: 'Providence', nickname: 'The Ocean State', region: 'New England', flag: '⛵', trivia: 'The smallest state by land area, but boasting over 400 miles of tidal shoreline.' },
  'south carolina': { code: 'SC', name: 'Columbia', capital: 'Columbia', nickname: 'The Palmetto State', region: 'The Southeast', flag: '🌴', trivia: 'Historic coastal state where the first shots of the Civil War were fired at Fort Sumter.' },
  'south dakota': { code: 'SD', name: 'Pierre', capital: 'Pierre', nickname: 'The Mount Rushmore State', region: 'The Midwest', flag: '🗿', trivia: 'Features the famous Mount Rushmore National Memorial carved into the Black Hills.' },
  'tennessee': { code: 'TN', name: 'Nashville', capital: 'Nashville', nickname: 'The Volunteer State', region: 'The Southeast', flag: '🎸', trivia: 'Known worldwide as the capital of Country Music (Nashville) and Blues/Rock (Memphis).' },
  'texas': { code: 'TX', name: 'Austin', capital: 'Austin', nickname: 'The Lone Star State', region: 'South Central', flag: '⭐', trivia: 'Second largest U.S. state by area and population, with rich cattle and aerospace heritage.' },
  'utah': { code: 'UT', name: 'Salt Lake City', capital: 'Salt Lake City', nickname: 'The Beehive State', region: 'The West', flag: '🏜️', trivia: 'Famous for the "Mighty 5" National Parks (Zion, Bryce, Arches, Canyonlands, Capitol Reef).' },
  'vermont': { code: 'VT', name: 'Montpelier', capital: 'Montpelier', nickname: 'The Green Mountain State', region: 'New England', flag: '🍁', trivia: 'Leading producer of pure maple syrup in the U.S. and famous for its covered bridges.' },
  'virginia': { code: 'VA', name: 'Richmond', capital: 'Richmond', nickname: 'The Old Dominion', region: 'The Southeast', flag: '🏛️', trivia: 'Birthplace of eight U.S. presidents, more than any other state.' },
  'washington': { code: 'WA', name: 'Olympia', capital: 'Olympia', nickname: 'The Evergreen State', region: 'The West Coast', flag: '🌲', trivia: 'Home to Mount Rainier, Puget Sound, and leading producer of apples and sweet cherries.' },
  'west virginia': { code: 'WV', name: 'Charleston', capital: 'Charleston', nickname: 'The Mountain State', region: 'The Mid-Atlantic', flag: '⛰️', trivia: 'The only state entirely located within the Appalachian Mountain range.' },
  'wisconsin': { code: 'WI', name: 'Madison', capital: 'Madison', nickname: 'The Badger State', region: 'The Great Lakes', flag: '🧀', trivia: 'Known as "America\'s Dairyland", producing over a quarter of all cheese in the nation.' },
  'wyoming': { code: 'WY', name: 'Cheyenne', capital: 'Cheyenne', nickname: 'The Equality State', region: 'The West', flag: '🦬', trivia: 'First state to grant women the right to vote (1869), and home to Yellowstone National Park.' }
};

// Region icons and descriptions
const US_REGIONS_CONFIG = {
  'The West Coast': { icon: '🌲', theme: 'emerald', label: 'West Coast • Pacific Shore & Cascades' },
  'The West': { icon: '🏔️', theme: 'amber', label: 'Mountain West • Rockies & High Plateaus' },
  'The Southwest': { icon: '🏜️', theme: 'orange', label: 'American Southwest • Deserts & Canyons' },
  'The Midwest': { icon: '🌽', theme: 'yellow', label: 'The Heartland • Prairie & Agriculture' },
  'The Great Lakes': { icon: '🌊', theme: 'cyan', label: 'Great Lakes Region • Upper Midwest' },
  'South Central': { icon: '🤠', theme: 'stone', label: 'South Central • Gulf Coast & Plains' },
  'The Southeast': { icon: '☀️', theme: 'rose', label: 'The Southeast • Sun Belt & Atlantic Coast' },
  'The Mid-Atlantic': { icon: '🏛️', theme: 'blue', label: 'Mid-Atlantic • Capital & Colonial Heritage' },
  'New England': { icon: '🍁', theme: 'red', label: 'New England • Historic Atlantic Coast' },
  'Non-contiguous States': { icon: '🌋', theme: 'indigo', label: 'Pacific & Arctic • Alaska & Hawaii' },
  'Regions': { icon: '🗺️', theme: 'sky', label: '50 States • Geographic Regions of America' },
  'Introduction': { icon: '🇺🇸', theme: 'blue', label: 'Welcome to the 50 Great United States' }
};

// ==========================================
// 2. LANGUAGE ORIGINS REGISTRY (LOANWORDS)
// ==========================================
const LANGUAGE_ORIGINS = {
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

// ==========================================
// 3. MUSIC THEORY NOTATION CALLOUTS
// ==========================================
const MUSIC_THEORY_DOMAINS = [
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
    title: 'Staff, Clefs & Pitch Reading',
    callout: 'Treble Clef 𝄞 (Lines: E-G-B-D-F, Spaces: F-A-C-E) • Bass Clef 𝄢 (Lines: G-B-D-F-A, Spaces: A-C-E-G)',
    theme: 'violet'
  },
  {
    keywords: ['chord', 'triad', 'seventh chord', 'chord progression', 'harmony', 'harmonic', 'interval'],
    badge: '🎹 Chords & Harmony',
    symbol: '🎹',
    title: 'Chords, Triads & Harmonic Structure',
    callout: 'Harmony: Major Triad (1-3-5) • Minor Triad (1-♭3-5) • Progressions: I - IV - V - I • Roman Numeral Analysis',
    theme: 'fuchsia'
  },
  {
    keywords: ['dynamics', 'expression', 'articulation', 'tempo markings', 'piano', 'forte', 'staccato', 'legato', 'crescendo'],
    badge: '𝆑 Dynamics & Expression',
    symbol: '𝆑',
    title: 'Dynamics, Articulations & Tempo',
    callout: 'Nuance: Pianissimo (pp) 𝆏 < Forte (ff) 𝆑 • Crescendo / Decrescendo • Staccato, Legato, Allegro & Andante',
    theme: 'rose'
  }
];

export default function CourseContextHeaders({ lesson, courseId, programId }) {
  if (!lesson) return null;

  const prog = Number(programId || lesson.programId);
  const cId = courseId || lesson.courseId || '';
  const stage = lesson.stageTitle || lesson.stage || '';
  const title = lesson.title || '';
  const text = lesson.text || '';

  // ----------------------------------------------------
  // A. MYSTERY DETECTIVE (Program 255 / 'chronicles-of-mystery' / 'mystery-detective')
  // ----------------------------------------------------
  if (prog === 255 || cId === 'chronicles-of-mystery' || cId === 'mystery-detective' || /mystery/i.test(cId)) {
    const caseTitle = stage || 'The Case of the Missing Cookies';
    const isClue = /clue|evidence|witness|suspect|search|alibi|investigation|dossier|crime|scene|napkin|crumb|jar/i.test(title + ' ' + text);
    const isInterrogation = /interview|interrogat|suspect|motive|family meeting|accusation/i.test(title + ' ' + text);

    return (
      <div className="w-full max-w-4xl mx-auto mb-3">
        <div className="bg-[#fef9c3] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
          {/* Top Dossier Title Strip */}
          <div className="bg-[#2c3e50] text-white px-3.5 py-1 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-amber-400">✦</span>
              <span className="font-bold tracking-wider">CASE_DOSSIER.LOG // CLASSIFIED EVIDENCE</span>
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
                <span className="px-2.5 py-0.5 rounded bg-[#f59e0b] text-slate-950 font-mono text-xs font-black border border-slate-900 shadow-[1px_1px_0_#0f172a] inline-flex items-center space-x-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>CASE DOSSIER</span>
                </span>

                <span className="px-2.5 py-0.5 rounded bg-white text-slate-900 font-mono text-xs font-bold border border-slate-900 shadow-[1px_1px_0_#0f172a] inline-flex items-center space-x-1">
                  <FolderCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>{caseTitle}</span>
                </span>

                {isClue && (
                  <span className="px-2 py-0.5 rounded bg-[#fef08a] text-slate-950 font-mono text-[10px] font-bold border border-slate-900 inline-flex items-center space-x-1">
                    <Search className="w-3.5 h-3.5 text-amber-700" />
                    <span>DETECTIVE CLUE</span>
                  </span>
                )}

                {isInterrogation && (
                  <span className="px-2 py-0.5 rounded bg-[#f87171] text-slate-950 font-mono text-[10px] font-bold border border-slate-900 inline-flex items-center space-x-1">
                    <FileSearch className="w-3.5 h-3.5" />
                    <span>SUSPECT LOG</span>
                  </span>
                )}
              </div>

              {/* Case Chapter Subtitle */}
              <div className="text-xs font-mono pt-0.5">
                <span className="font-bold text-amber-800">Scene #{lesson.id}: </span>
                <span className="font-bold text-slate-900">{lesson.title}</span>
                <span className="text-slate-600 ml-1">• Follow narrative clues and type each piece of evidence</span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="px-2.5 py-0.5 rounded bg-white border border-slate-900 shadow-[1px_1px_0_#0f172a] text-slate-900 font-mono text-xs font-black">
                🔍 EVIDENCE BANNER
              </span>
              <span className="text-[10px] text-slate-600 font-mono mt-0.5">Interactive Story Chapter</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // B. LOANWORDS & ETYMOLOGY (Program 240 / 'global-lexicon' / 'loanwords')
  // ----------------------------------------------------
  if (prog === 240 || cId === 'global-lexicon' || cId === 'loanwords' || /loanword|lexicon|etymology/i.test(cId)) {
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
          {/* Top Dossier Title Strip */}
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

              {/* Target Word & Definition */}
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

  // ----------------------------------------------------
  // B2. VOCABULARY & NARRATIVE NONFICTION (Program 289 / 'literary-heritage' / 'vocab-nonfiction')
  // ----------------------------------------------------
  if (prog === 289 || cId === 'literary-heritage' || cId === 'vocab-nonfiction' || /vocab|heritage|literature/i.test(cId)) {
    const isIntro = /intro/i.test(title);
    const isContext = /context/i.test(title) || /slide/i.test(title);
    const isSynonym = /synonym/i.test(title) || /antonym/i.test(title);
    const isReview = /review/i.test(title) || /quiz/i.test(title) || /assessment/i.test(title);

    return (
      <div className="w-full max-w-4xl mx-auto mb-3">
        <div className="bg-[#dcfce7] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
          {/* Top Dossier Title Strip */}
          <div className="bg-[#2c3e50] text-white px-3.5 py-1 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-300">✦</span>
              <span className="font-bold tracking-wider">VOCABULARY_READER.TXT // NONFICTION_MEMOIRS</span>
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
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Narrative Nonfiction</span>
                </span>

                <span className="px-2.5 py-0.5 rounded bg-emerald-200 text-emerald-950 font-mono text-xs font-bold border border-emerald-600">
                  {stage || 'Literary Vocabulary'}
                </span>

                {isIntro && (
                  <span className="px-2 py-0.5 rounded bg-[#1888ff] text-white font-mono text-[10px] font-bold border border-slate-900">
                    Word Introduction
                  </span>
                )}

                {isContext && (
                  <span className="px-2 py-0.5 rounded bg-[#f59e0b] text-slate-950 font-mono text-[10px] font-bold border border-slate-900">
                    Word in Context
                  </span>
                )}

                {isSynonym && (
                  <span className="px-2 py-0.5 rounded bg-[#a78bfa] text-slate-950 font-mono text-[10px] font-bold border border-slate-900">
                    Synonyms & Antonyms
                  </span>
                )}

                {isReview && (
                  <span className="px-2 py-0.5 rounded bg-[#48bb78] text-slate-950 font-mono text-[10px] font-bold border border-slate-900">
                    Mastery Challenge
                  </span>
                )}
              </div>

              {/* Literary Subtitle */}
              <div className="text-xs font-mono text-slate-700 pt-0.5">
                <span>Lesson {lesson.id}: {title} • </span>
                <span className="font-bold text-emerald-900">Build rich academic vocabulary through celebrated memoirs.</span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="px-2.5 py-0.5 rounded bg-white border border-slate-900 shadow-[1px_1px_0_#0f172a] text-slate-900 font-mono text-xs font-black">
                📖 VOCABULARY
              </span>
              <span className="text-[10px] text-slate-600 font-mono mt-0.5">Roots & Meaning</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // C. MUSIC THEORY (Program 254 / 'symphony-keys' / 'music-theory')
  // ----------------------------------------------------
  if (prog === 254 || cId === 'symphony-keys' || cId === 'music-theory' || /music|symphony/i.test(cId)) {
    const stageAndTitle = (stage + ' ' + title).toLowerCase();
    
    let domain = MUSIC_THEORY_DOMAINS.find(d => 
      d.keywords.some(kw => stageAndTitle.includes(kw))
    ) || MUSIC_THEORY_DOMAINS[0];

    return (
      <div className="w-full max-w-4xl mx-auto mb-3">
        <div className="bg-[#f3e8ff] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
          {/* Top Dossier Title Strip */}
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

              {/* Musical Notation Subtitle */}
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

  // ----------------------------------------------------
  // D. U.S. STATE FACTS (Program 249 / 'atlas-chronicles' / 'us-state-facts')
  // ----------------------------------------------------
  if (prog === 249 || cId === 'atlas-chronicles' || cId === 'us-state-facts' || /state|atlas|geography/i.test(cId)) {
    const searchTarget = (title + ' ' + stage).toLowerCase();
    let matchedState = null;
    for (const [key, stateData] of Object.entries(US_STATES_DB)) {
      if (searchTarget.includes(key)) {
        matchedState = stateData;
        break;
      }
    }

    let regionInfo = US_REGIONS_CONFIG[stage] || US_REGIONS_CONFIG['50 States'] || {
      icon: '🗺️',
      theme: 'blue',
      label: stage || 'United States Geography'
    };

    return (
      <div className="w-full max-w-4xl mx-auto mb-3">
        <div className="bg-[#e0f2fe] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
          {/* Top Dossier Title Strip */}
          <div className="bg-[#2c3e50] text-white px-3.5 py-1 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-sky-300">✦</span>
              <span className="font-bold tracking-wider">US_ATLAS.DAT // 50_STATES_GEOGRAPHY</span>
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
                  <span>{regionInfo.icon}</span>
                  <span>{stage}</span>
                </span>

                {matchedState && (
                  <span className="px-2.5 py-0.5 rounded bg-[#fef08a] text-slate-950 font-mono text-xs font-black border border-slate-900 shadow-[1px_1px_0_#0f172a] inline-flex items-center space-x-1">
                    <span>{matchedState.flag}</span>
                    <span>{matchedState.name} [{matchedState.code}]</span>
                  </span>
                )}

                {matchedState && (
                  <span className="px-2 py-0.5 rounded bg-sky-200 text-sky-950 font-mono text-[10px] font-bold border border-sky-600 inline-flex items-center space-x-1">
                    <Landmark className="w-3 h-3 text-sky-800" />
                    <span>Capital: {matchedState.capital}</span>
                  </span>
                )}

                {matchedState?.nickname && (
                  <span className="italic text-xs font-mono text-sky-900 bg-sky-100 px-2 py-0.2 rounded border border-sky-300">
                    "{matchedState.nickname}"
                  </span>
                )}
              </div>

              {/* State Trivia */}
              <div className="text-xs font-mono text-slate-700 pt-0.5 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span>
                  {matchedState ? matchedState.trivia : `${regionInfo.label} • Lesson ${lesson.id}: ${title}`}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="px-2.5 py-0.5 rounded bg-white border border-slate-900 shadow-[1px_1px_0_#0f172a] text-slate-900 font-mono text-xs font-black">
                🇺🇸 STATE TRIVIA
              </span>
              <span className="text-[10px] text-slate-600 font-mono mt-0.5">Capitals & Geography</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // E. CODE TYPING / DEVELOPER TRACK ('syntax-forge' / 'code-typing')
  // ----------------------------------------------------
  if (prog === 306 || cId === 'syntax-forge' || cId === 'code-typing' || /code|syntax|developer/i.test(cId)) {
    const textLower = (text + ' ' + title + ' ' + stage).toLowerCase();
    const isJS = /javascript|js|const |let |var |console\.log|function/i.test(textLower);
    const isPython = /python|def |print\(|elif |import |self\b/i.test(textLower);
    const isCpp = /c\+\+|cpp|#include|cout|std::|int main/i.test(textLower);
    const isHtml = /html|css|<div|<span|class=|margin|padding/i.test(textLower);
    const isJson = /json|{\s*"|key-value/i.test(textLower);

    const langName = isPython ? 'Python' : isCpp ? 'C++' : isHtml ? 'HTML / CSS' : isJson ? 'JSON' : isJS ? 'JavaScript' : 'Code Syntax';
    const langIcon = isPython ? '🐍' : isCpp ? '⚙️' : isHtml ? '🌐' : isJson ? '📋' : '⚡';

    const hasBraces = text.includes('{') || text.includes('}');
    const hasParens = text.includes('(') || text.includes(')');
    const hasBrackets = text.includes('[') || text.includes(']');
    const hasSemicolon = text.includes(';');
    const hasIndentation = text.includes('\t') || text.includes('  ');

    return (
      <div className="w-full max-w-4xl mx-auto mb-3">
        <div className="bg-[#0f172a] text-slate-200 border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] overflow-hidden">
          {/* Top Terminal Title Strip */}
          <div className="bg-[#1e293b] text-white px-3.5 py-1 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✦</span>
              <span className="font-bold tracking-wider">DEV_TERMINAL.SH // SYNTAX_FORMATTING</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3.5 h-3.5 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono text-slate-300">_</span>
              <span className="w-3.5 h-3.5 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[8px] font-mono text-slate-300">□</span>
              <span className="w-3.5 h-3.5 bg-[#f87171] border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono text-slate-900">✕</span>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#1888ff] text-white font-mono text-xs font-black border border-slate-700 shadow-[1px_1px_0_#000] inline-flex items-center space-x-1">
                  <span>{langIcon}</span>
                  <span>{langName}</span>
                </span>

                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-700">
                  {stage || 'Syntax Formatting'}
                </span>

                {hasBraces && (
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] font-bold border border-amber-600">
                    Curly Braces {"{ }"}
                  </span>
                )}

                {hasParens && (
                  <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-mono text-[10px] font-bold border border-sky-600">
                    Parentheses ( )
                  </span>
                )}

                {hasBrackets && (
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono text-[10px] font-bold border border-purple-600">
                    Square Brackets [ ]
                  </span>
                )}

                {hasSemicolon && (
                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-mono text-[10px] font-bold border border-rose-600">
                    Semicolon ;
                  </span>
                )}

                {hasIndentation && (
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-600">
                    Indentation
                  </span>
                )}
              </div>

              {/* Coding Prompt Guidance */}
              <div className="text-xs font-mono text-slate-300 pt-0.5 flex items-center space-x-1.5">
                <Code className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>
                  Lesson {lesson.id}: {title} • <span className="text-sky-300">Reach with pinky fingers for punctuation and maintain clean rhythm.</span>
                </span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700 shadow-[1px_1px_0_#000] text-sky-400 font-mono text-xs font-black">
                ⌨ CODE TYPING
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">Structure & Syntax</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for general knowledge courses or standard lessons
  return null;
}
