// RETROSPEED Course Catalog Registry
import basicsLessons from './courses/typing_basics_1.json';
import codeLessons from './courses/code_typing_306.json';
import funFactsLessons from './courses/fun_facts_246.json';
import loanwordsLessons from './courses/loanwords_240.json';
import naturalWorldLessons from './courses/natural_world_248.json';
import peopleProgressLessons from './courses/people_and_progress_247.json';
import mysteryLessons from './courses/mystery_detective_255.json';
import musicLessons from './courses/music_theory_254.json';
import stateFactsLessons from './courses/us_state_facts_249.json';
import dvorakLessons from './courses/dvorak_18.json';
import colemakLessons from './courses/colemak_19.json';
import vocabNonfictionLessons from './courses/vocab_nonfiction_289.json';

export const COURSES_CATALOG = [
  {
    id: 'keystroke-foundations',
    programId: 1,
    title: 'Keystroke Foundations',
    category: 'Core Touch Typing',
    grade: 'Foundations (100 Lessons)',
    lessonsCount: 100,
    description: 'The definitive touch typing curriculum covering home row to full punctuation and muscle memory reflexes.',
    badge: 'Core',
    color: 'from-blue-500 to-cyan-700',
    titleVariant: 'sky',
    keyboardType: 'qwerty',
    data: basicsLessons.lessons
  },
  {
    id: 'retrospeed-odyssey',
    programId: 1,
    title: 'RETROSPEED Odyssey',
    category: 'Core Touch Typing',
    grade: 'All Levels',
    lessonsCount: 100,
    description: 'A comprehensive touch typing journey across all keyboard zones with arcade defense challenges.',
    badge: 'Popular',
    color: 'from-sky-400 to-indigo-600',
    titleVariant: 'sky',
    keyboardType: 'qwerty',
    data: basicsLessons.lessons
  },
  {
    id: 'syntax-forge',
    programId: 306,
    title: 'Syntax Forge | Developer Track',
    category: 'Programming & Tech',
    grade: 'Developers & Students',
    lessonsCount: 729,
    description: 'Structure, formatting, and precision required when typing code. Master symbols, punctuation, spacing, and syntax across variables, loops, arrays, and algorithms.',
    badge: 'Code',
    color: 'from-slate-800 via-indigo-900 to-slate-950',
    titleVariant: 'dark',
    keyboardType: 'qwerty',
    data: codeLessons.lessons
  },
  {
    id: 'global-lexicon',
    programId: 240,
    title: 'Global Lexicon & Etymology',
    category: 'Language & Etymology',
    grade: 'Advanced Vocab',
    lessonsCount: 443,
    description: 'Delve into loanwords that have entered English from around the globe, combining definitions, etymology, and contextual sentences across typing lessons.',
    badge: 'Linguistics',
    color: 'from-emerald-500 to-teal-700',
    titleVariant: 'teal',
    keyboardType: 'qwerty',
    data: loanwordsLessons.lessons
  },
  {
    id: 'chronicles-of-mystery',
    programId: 255,
    title: 'Chronicles of Mystery',
    category: 'Interactive Story',
    grade: 'Mystery & Speed',
    lessonsCount: 358,
    description: 'Solve gripping detective mysteries, log evidence, decipher clues, and build rapid typing skills across interactive story chapters.',
    badge: 'Story',
    color: 'from-slate-700 via-amber-900 to-stone-900',
    titleVariant: 'mustard',
    keyboardType: 'qwerty',
    data: mysteryLessons.lessons
  },
  {
    id: 'symphony-keys',
    programId: 254,
    title: 'Symphony & Harmonic Keys',
    category: 'Music & Arts',
    grade: 'Musicians & Typists',
    lessonsCount: 250,
    description: 'Advance your musical notation, scales, chords, rhythms, and audio terms while building precision touch typing speed.',
    badge: 'Music',
    color: 'from-purple-600 to-indigo-800',
    titleVariant: 'lilac',
    keyboardType: 'qwerty',
    data: musicLessons.lessons
  },
  {
    id: 'atlas-chronicles',
    programId: 249,
    title: 'Atlas of 50 States',
    category: 'Geography & Trivia',
    grade: 'Speed & Stamina',
    lessonsCount: 290,
    description: 'Explore the history, geography, mottoes, landmarks, and facts of all 50 states while honing high-speed touch typing.',
    badge: 'Geography',
    color: 'from-red-500 via-sky-600 to-blue-800',
    titleVariant: 'coral',
    keyboardType: 'qwerty',
    data: stateFactsLessons.lessons
  },
  {
    id: 'curiosity-vault',
    programId: 246,
    title: 'The Curiosity Vault',
    category: 'General Knowledge',
    grade: 'Speed & Stamina',
    lessonsCount: 201,
    description: 'Continued development of typing skills for students who have already mastered touch typing basics. Type and discover world records, famous firsts, and fascinating trivia.',
    badge: 'Trivia',
    color: 'from-amber-400 to-orange-600',
    titleVariant: 'mustard',
    keyboardType: 'qwerty',
    data: funFactsLessons.lessons
  },
  {
    id: 'pioneers-innovators',
    programId: 247,
    title: 'Pioneers & Innovators',
    category: 'History & Tech',
    grade: 'Speed & Stamina',
    lessonsCount: 201,
    description: 'Discover fascinating facts relating to global inventors, architectural wonders, cultural milestones, and scientific breakthroughs.',
    badge: 'History',
    color: 'from-rose-500 to-pink-700',
    titleVariant: 'coral',
    keyboardType: 'qwerty',
    data: peopleProgressLessons.lessons
  },
  {
    id: 'wild-kingdom',
    programId: 248,
    title: 'Wild Kingdom',
    category: 'Science & Nature',
    grade: 'Speed & Stamina',
    lessonsCount: 201,
    description: 'Type and discover fascinating facts relating to wildlife, dinosaurs, marine ecosystems, outer space, and geological wonders.',
    badge: 'Science',
    color: 'from-cyan-500 to-blue-700',
    titleVariant: 'teal',
    keyboardType: 'qwerty',
    data: naturalWorldLessons.lessons
  },
  {
    id: 'literary-heritage',
    programId: 289,
    title: 'Literary Heritage & Vocabulary',
    category: 'Literature & Vocabulary',
    grade: 'Advanced Vocab',
    lessonsCount: 392,
    description: 'Master rich vocabulary, root words, synonyms, and antonyms through celebrated nonfiction memoirs and autobiographies.',
    badge: 'Literature',
    color: 'from-teal-600 to-emerald-900',
    titleVariant: 'teal',
    keyboardType: 'qwerty',
    data: vocabNonfictionLessons.lessons
  },
  {
    id: 'ergo-dvorak',
    programId: 18,
    title: 'Ergo Dvorak Layout',
    category: 'Alternative Layouts',
    grade: 'Ergonomics',
    lessonsCount: 655,
    description: 'Master the ergonomic Dvorak keyboard layout with authentic Dvorak finger positioning and dedicated Dvorak visual keymaps.',
    badge: 'Ergonomic',
    color: 'from-violet-600 to-purple-800',
    titleVariant: 'lilac',
    keyboardType: 'dvorak',
    data: dvorakLessons.lessons
  },
  {
    id: 'speed-colemak',
    programId: 19,
    title: 'Speed Colemak Layout',
    category: 'Alternative Layouts',
    grade: 'Ergonomics',
    lessonsCount: 550,
    description: 'Master the fast, modern Colemak keyboard layout designed for minimal finger travel and maximum typing efficiency.',
    badge: 'Ergonomic',
    color: 'from-fuchsia-600 to-indigo-800',
    titleVariant: 'lilac',
    keyboardType: 'colemak',
    data: colemakLessons.lessons
  }
];

// Backwards compatibility map for shorthand aliases
const LEGACY_COURSE_ID_MAP = {
  'basics': 'keystroke-foundations',
  'odyssey': 'retrospeed-odyssey',
  'typing-basics': 'keystroke-foundations',
  'code-typing': 'syntax-forge',
  'loanwords': 'global-lexicon',
  'mystery-detective': 'chronicles-of-mystery',
  'music-theory': 'symphony-keys',
  'us-state-facts': 'atlas-chronicles',
  'fun-facts': 'curiosity-vault',
  'people-progress': 'pioneers-innovators',
  'natural-world': 'wild-kingdom',
  'vocab-nonfiction': 'literary-heritage',
  'dvorak': 'ergo-dvorak',
  'colemak': 'speed-colemak'
};

export function resolveCourseId(courseId) {
  if (!courseId) return 'keystroke-foundations';
  return LEGACY_COURSE_ID_MAP[courseId] || courseId;
}

export function getCourseById(courseId) {
  const normalizedId = resolveCourseId(courseId);
  return COURSES_CATALOG.find(c => c.id === normalizedId) || COURSES_CATALOG[0];
}
