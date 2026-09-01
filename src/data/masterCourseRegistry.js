/**
 * RETROSPEED Master Course & Lesson Data Registry
 * ===============================================
 * This file serves as the single source of truth for all courses, stages, and lesson breakdowns.
 * You can paste or define course contents, stage titles, lesson names, target keys, and typing texts here.
 * 
 * Lesson Schema:
 * --------------
 * - id: number | string (e.g. 1, "lesson-01")
 * - title: string (e.g. "Keys F & J", "The Spacebar")
 * - type: "intro" | "review" | "practice" | "drill" | "game" | "motion" | "video" | "chord" | "anchor"
 * - keys: string[] (e.g. ["f", "j", " "])
 * - text: string (e.g. "f j f j ff jj fff jjj ...")
 * - goalWpm: number (default 15)
 * - minAccuracy: number (default 90)
 * - gameId?: "press-room" | "paper-planes" | "local-line" | "night-market" | "drop-chits" | "pit-lane" | "fuse-desk" | "patch-terminal"
 * - description?: string
 * - hand?: "both" | "left" | "right"
 */

export const MASTER_COURSES = {
  // =========================================================================
  // CATEGORY 1: CORE TOUCH TYPING & FOUNDATIONS
  // =========================================================================
  
  "retrospeed-odyssey": {
    courseId: "retrospeed-odyssey",
    title: "RETROSPEED Odyssey",
    category: "Core Touch Typing",
    grade: "All Levels (Primary Path)",
    description: "The definitive 97-lesson spine curriculum covering Home Row to Full Keyboard mastery with 4-box pedagogical cycles and integrated arcade games.",
    keyboardType: "qwerty",
    stages: [
      {
        stageNumber: 1,
        title: "The Home Row",
        shortTitle: "Home Row",
        targetWpm: 15,
        lessons: [
          { id: 1, type: "motion", title: "Home Row Desk & Tactile Bumps", keys: ["f", "j", "u", " "], goalWpm: 10, minAccuracy: 90, description: "Learn anchor bumps on F & J and finger curvature." },
          { id: 2, type: "intro", title: "Keys F & J", keys: ["f", "j"], text: "f j f j ff jj fff jjj fj jf fjj jff fjf jfj ff jj f j f j", goalWpm: 10, minAccuracy: 90 },
          { id: 3, type: "practice", title: "The Spacebar", keys: [" ", "f", "j"], text: "f j   f j   ff jj   fj jf   f f j j   f j f j", goalWpm: 10, minAccuracy: 90 },
          { id: 4, type: "review", title: "F, J & Space", keys: ["f", "j", " "], text: "fj jf fj jf f j f j ff jj ff jj jf fj j f j f", goalWpm: 10, minAccuracy: 90 },
          { id: 5, type: "intro", title: "Keys D & K", keys: ["d", "k"], text: "d k d k dd kk ddd kkk dk kd dkk kdd dkd kdk dd kk", goalWpm: 12, minAccuracy: 90 },
          { id: 6, type: "review", title: "D, K + F, J", keys: ["d", "k", "f", "j", " "], text: "dk fj dk fj df jk df jk fjdk jfkd dkkf jffd dk fj", goalWpm: 12, minAccuracy: 90 },
          { id: 7, type: "drill", title: "D & K (Timed Drill)", keys: ["d", "k", "f", "j", " "], text: "f j d k fj dk jk df kf jd dj fk kd jf dd kk ff jj", goalWpm: 14, minAccuracy: 90 },
          { id: 8, type: "game", gameId: "press-room", title: "Press Room: Home Four", keys: ["f", "j", "k", "d", " "], goalWpm: 12, minAccuracy: 85 },
          { id: 9, type: "intro", title: "Keys S & L", keys: ["s", "l"], text: "s l s l ss ll sss lll sl ls sll lss sls lsl ss ll", goalWpm: 12, minAccuracy: 90 },
          { id: 10, type: "review", title: "S, L + Known Keys", keys: ["s", "l", "d", "k", "f", "j", " "], text: "sl dk fj sl dk fj sk dl fl js ls kd jf sl dk fj", goalWpm: 12, minAccuracy: 90 },
          { id: 11, type: "drill", title: "S & L (Timed Drill)", keys: ["s", "l", "d", "k", "f", "j", " "], text: "ls kd jf sl dk fj sk dl fl js fs jl ld ks sf lj", goalWpm: 14, minAccuracy: 90 },
          { id: 12, type: "intro", title: "Keys A & ;", keys: ["a", ";"], text: "a ; a ; aa ;; aaa ;;; a; ;a a;; ;aa a;a ;a; aa ;;", goalWpm: 14, minAccuracy: 90 },
          { id: 13, type: "review", title: "A, ; + Known Keys", keys: ["a", ";", "s", "l", "d", "k", "f", "j", " "], text: "as df jk l; a; sl dk fj fall lass asks flask lads", goalWpm: 14, minAccuracy: 90 },
          { id: 14, type: "drill", title: "First Eight Keys Drill", keys: ["a", "s", "d", "f", "j", "k", "l", ";", " "], text: "asdf jkl; a;sl dkfj a s d f j k l ; dad salad salsa", goalWpm: 15, minAccuracy: 90 },
          { id: 15, type: "game", gameId: "press-room", title: "Press Room: Home Eight", keys: ["a", "s", "d", "f", "j", "k", "l", ";", " "], goalWpm: 14, minAccuracy: 85 },
          { id: 16, type: "motion", title: "Coach: Eyes on Page", keys: ["a", "s", "d", "f", "j", "k", "l", ";", " "], goalWpm: 14, minAccuracy: 90, description: "Eyes-on-the-page motion checkpoint." },
          { id: 17, type: "anchor", hand: "left", title: "Left Hand Anchor (ASDF)", keys: ["a", "s", "d", "f", " "], text: "asdf asdf fdas fdas asdf fdas a s d f dad daff fad", goalWpm: 14, minAccuracy: 90 },
          { id: 18, type: "anchor", hand: "right", title: "Right Hand Anchor (JKL;)", keys: ["j", "k", "l", ";", " "], text: "jkl; jkl; ;lkj ;lkj jkl; ;lkj j k l ; all fall flask", goalWpm: 14, minAccuracy: 90 },
          { id: 19, type: "intro", title: "Keys G & H", keys: ["g", "h"], text: "g h g h gg hh ggg hhh gh hg ghh hgg ghg hgh gg hh", goalWpm: 14, minAccuracy: 90 },
          { id: 20, type: "review", title: "Full Home Row Review", keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", " "], text: "asdfg hjkl; glad half flag dash flash gash hall", goalWpm: 15, minAccuracy: 90 },
          { id: 21, type: "drill", title: "Full Home Row Speed Drill", keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", " "], text: "gas had lad gal ash lag glad half flag dash hall", goalWpm: 16, minAccuracy: 90 },
          { id: 22, type: "checkpoint", title: "Checkpoint: Home Row Master", keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", " "], text: "a glad lad had a flag a half dash fell as glad lads hall", goalWpm: 18, minAccuracy: 92 },
          { id: 23, type: "game", gameId: "paper-planes", title: "Play: Home Row Boss", keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", " "], goalWpm: 15, minAccuracy: 85 }
        ]
      }
    ]
  },

  // =========================================================================
  // CATEGORY 2: PROGRAMMING & TECH
  // =========================================================================

  "syntax-forge": {
    courseId: "syntax-forge",
    title: "Syntax Forge | Developer Track",
    category: "Programming & Tech",
    grade: "Developers & Students",
    description: "Structure, formatting, and precision required when typing code. Master symbols, punctuation, spacing, and syntax across variables, loops, arrays, and algorithms.",
    keyboardType: "qwerty",
    stages: [
      {
        stageNumber: 1,
        title: "Home Row in Code",
        targetWpm: 20,
        lessons: [
          // Paste or provide lessons here
        ]
      },
      {
        stageNumber: 2,
        title: "Top Row & Identifiers",
        targetWpm: 25,
        lessons: []
      },
      {
        stageNumber: 3,
        title: "Brackets, Semicolons & Operators",
        targetWpm: 25,
        lessons: []
      }
    ]
  },

  // =========================================================================
  // CATEGORY 3: LANGUAGE ARTS & ETYMOLOGY
  // =========================================================================

  "global-lexicon": {
    courseId: "global-lexicon",
    title: "Global Lexicon & Etymology",
    category: "Language & Etymology",
    grade: "Advanced Vocab",
    description: "Delve into loanwords that have entered English from around the globe, combining definitions, etymology, and contextual sentences.",
    keyboardType: "qwerty",
    stages: [
      {
        stageNumber: 1,
        title: "Spanish Loanwords",
        targetWpm: 25,
        lessons: []
      },
      {
        stageNumber: 2,
        title: "French Loanwords",
        targetWpm: 25,
        lessons: []
      }
    ]
  },

  // =========================================================================
  // CATEGORY 4: INTERACTIVE STORIES & DETECTIVE MYSTERIES
  // =========================================================================

  "chronicles-of-mystery": {
    courseId: "chronicles-of-mystery",
    title: "Chronicles of Mystery",
    category: "Interactive Story",
    grade: "Mystery & Speed",
    description: "Solve gripping detective mysteries, log evidence, decipher clues, and build rapid typing skills across interactive story chapters.",
    keyboardType: "qwerty",
    stages: [
      {
        stageNumber: 1,
        title: "The Case of the Missing Cookies",
        targetWpm: 25,
        lessons: []
      },
      {
        stageNumber: 2,
        title: "The Secret Message in the Library",
        targetWpm: 25,
        lessons: []
      }
    ]
  },

  // =========================================================================
  // CATEGORY 5: MUSIC & ARTS
  // =========================================================================

  "symphony-keys": {
    courseId: "symphony-keys",
    title: "Symphony & Harmonic Keys",
    category: "Music & Arts",
    grade: "Musicians & Typists",
    description: "Advance your musical notation, scales, chords, rhythms, and audio terms while building precision touch typing speed.",
    keyboardType: "qwerty",
    stages: [
      {
        stageNumber: 1,
        title: "Introduction to Music Theory",
        targetWpm: 20,
        lessons: []
      }
    ]
  },

  // =========================================================================
  // CATEGORY 6: GEOGRAPHY & TRIVIA
  // =========================================================================

  "atlas-chronicles": {
    courseId: "atlas-chronicles",
    title: "Atlas of 50 States",
    category: "Geography & Trivia",
    grade: "Speed & Stamina",
    description: "Explore the history, geography, mottoes, landmarks, and facts of all 50 states while honing high-speed touch typing.",
    keyboardType: "qwerty",
    stages: [
      {
        stageNumber: 1,
        title: "Introduction & Regions",
        targetWpm: 25,
        lessons: []
      }
    ]
  },

  // =========================================================================
  // CATEGORY 7: GENERAL KNOWLEDGE & SCIENCE
  // =========================================================================

  "curiosity-vault": {
    courseId: "curiosity-vault",
    title: "The Curiosity Vault",
    category: "General Knowledge",
    grade: "Speed & Stamina",
    description: "Type and discover world records, famous firsts, and fascinating trivia across 200+ lessons.",
    keyboardType: "qwerty",
    stages: [
      {
        stageNumber: 1,
        title: "Number Fun",
        targetWpm: 25,
        lessons: []
      }
    ]
  },

  "pioneers-innovators": {
    courseId: "pioneers-innovators",
    title: "Pioneers & Innovators",
    category: "History & Tech",
    grade: "Speed & Stamina",
    description: "Discover fascinating facts relating to global inventors, architectural wonders, cultural milestones, and scientific breakthroughs.",
    keyboardType: "qwerty",
    stages: [
      {
        stageNumber: 1,
        title: "U.S. History & Pioneers",
        targetWpm: 25,
        lessons: []
      }
    ]
  },

  "wild-kingdom": {
    courseId: "wild-kingdom",
    title: "Wild Kingdom",
    category: "Science & Nature",
    grade: "Speed & Stamina",
    description: "Type and discover fascinating facts relating to wildlife, dinosaurs, marine ecosystems, outer space, and geological wonders.",
    keyboardType: "qwerty",
    stages: [
      {
        stageNumber: 1,
        title: "Amazing Animals",
        targetWpm: 25,
        lessons: []
      }
    ]
  },

  // =========================================================================
  // CATEGORY 8: LITERATURE & VOCABULARY
  // =========================================================================

  "literary-heritage": {
    courseId: "literary-heritage",
    title: "Literary Heritage & Vocabulary",
    category: "Literature & Vocabulary",
    grade: "Advanced Vocab",
    description: "Master rich vocabulary, root words, synonyms, and antonyms through celebrated nonfiction memoirs and autobiographies.",
    keyboardType: "qwerty",
    stages: [
      {
        stageNumber: 1,
        title: "Narrative of the Life of Frederick Douglass",
        targetWpm: 30,
        lessons: []
      }
    ]
  },

  // =========================================================================
  // CATEGORY 9: ERGONOMIC & ALTERNATIVE LAYOUTS
  // =========================================================================

  "ergo-dvorak": {
    courseId: "ergo-dvorak",
    title: "Ergo Dvorak Layout",
    category: "Alternative Layouts",
    grade: "Ergonomics",
    description: "Master the ergonomic Dvorak keyboard layout with authentic Dvorak finger positioning and dedicated visual keymaps.",
    keyboardType: "dvorak",
    stages: [
      {
        stageNumber: 1,
        title: "The Home Row (AOEU HTNS)",
        targetWpm: 15,
        lessons: []
      }
    ]
  },

  "speed-colemak": {
    courseId: "speed-colemak",
    title: "Speed Colemak Layout",
    category: "Alternative Layouts",
    grade: "Ergonomics",
    description: "Master the fast, modern Colemak keyboard layout designed for minimal finger travel and maximum typing efficiency.",
    keyboardType: "colemak",
    stages: [
      {
        stageNumber: 1,
        title: "The Home Row (ARST HNEI)",
        targetWpm: 15,
        lessons: []
      }
    ]
  }
};

export function getMasterCourse(courseId) {
  return MASTER_COURSES[courseId] || MASTER_COURSES["retrospeed-odyssey"];
}
