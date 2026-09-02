// RETROSPEED Course Catalog Registry
import basicsLessons from './courses/typing_basics_1.json';
import typingJungle685 from './courses/typing_jungle_685.json';
import codeLessons from './courses/code_typing_306.json';
import pythonZeroToHero from './courses/python_zero_to_hero.json';
import funFactsLessons from './courses/fun_facts_246.json';
import loanwordsLessons from './courses/loanwords_240.json';
import naturalWorldLessons from './courses/natural_world_248.json';
import peopleProgressLessons from './courses/people_and_progress_247.json';
import mysteryLessons from './courses/mystery_detective_255.json';
import musicLessons from './courses/music_theory_254.json';
import vocabNonfictionLessons from './courses/vocab_nonfiction_289.json';

export const COURSES_CATALOG = [
  {
    id: 'retrospeed-odyssey',
    programId: 1,
    title: 'RETROSPEED Odyssey',
    category: 'Core Touch Typing',
    grade: 'Flagship (685 Lessons)',
    lessonsCount: 685,
    description: 'The definitive touch typing curriculum across 25 stages from Home Row fundamentals to Speed Goal 75 WPM.',
    badge: 'Flagship',
    color: 'from-emerald-500 to-teal-700',
    titleVariant: 'teal',
    keyboardType: 'qwerty',
    data: typingJungle685
  },
  {
    id: 'python-zero-to-hero',
    alias: 'python-forge',
    programId: 312,
    title: 'Python Zero to Hero | 13-Hour Mastery',
    category: 'Programming & Tech',
    grade: 'Developers & Data Analysts',
    lessonsCount: 197,
    description: 'Master Python from fundamentals to advanced functions and data structures. Type concepts, code snippets, mental models, single-token quizzes, multi-line drills, and syntax arcade battles.',
    badge: 'Python 3.12',
    color: 'from-amber-500 via-sky-600 to-indigo-900',
    titleVariant: 'mustard',
    keyboardType: 'qwerty',
    data: pythonZeroToHero
  },
  {
    id: 'keystroke-foundations',
    programId: 1,
    title: 'Keystroke Foundations (Typing Basics)',
    category: 'Core Touch Typing',
    grade: 'Fast Track (100 Lessons)',
    lessonsCount: 100,
    description: 'The classic fast-paced 100-lesson touch typing course covering Home Row, Top Row, Bottom Row, Shift, Numbers, and Symbols.',
    badge: 'Core',
    color: 'from-blue-500 to-cyan-700',
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
  'fun-facts': 'curiosity-vault',
  'people-progress': 'pioneers-innovators',
  'natural-world': 'wild-kingdom',
  'vocab-nonfiction': 'literary-heritage'
};

export function resolveCourseId(courseId) {
  if (!courseId) return 'retrospeed-odyssey';
  return LEGACY_COURSE_ID_MAP[courseId] || courseId;
}

export function getCourseById(courseId) {
  const normalizedId = resolveCourseId(courseId);
  return COURSES_CATALOG.find(c => c.id === normalizedId) || COURSES_CATALOG[0];
}
