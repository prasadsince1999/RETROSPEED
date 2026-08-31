// RETROSPEED Zero-to-Hero Driving School Spine
// "First you learn the clutch. Then the road. Then highway shortcuts."

export const SPINE_PARTS = [
  {
    partNumber: 1,
    id: 'part-1-sit-and-home',
    title: 'Part 1: Sit and Home',
    subtitle: 'The Clutch',
    focus: 'Eyes on screen. F & J bumps. Left hand ASDF, right hand JKL;.',
    targetSpeed: 'Any WPM',
    passAccuracy: 90,
    badge: 'Foundation',
    color: '#4BA3E3',
    gameBreak: {
      gameId: 'balloon',
      name: 'Balloon Ninja',
      keys: ['f', 'j', 'd', 'k', 's', 'l', 'a', ';'],
      description: 'Test your home row reflexes with floating target balloons.'
    },
    lessons: [
      {
        id: 'spine-1-1',
        partNumber: 1,
        lessonNumber: 1,
        title: 'The Anchor Bumps (Keys F & J)',
        description: 'Feel the small physical bumps on F and J with your index fingers. Keep them anchored at all times.',
        targetKeys: ['f', 'j', ' '],
        goalWpm: 10,
        minAccuracy: 90,
        text: 'f j f j ff jj fff jjj fj jf fjj jff fjf jfj ff jj f j f j'
      },
      {
        id: 'spine-1-2',
        partNumber: 1,
        lessonNumber: 2,
        title: 'Left & Right Middle (Keys D & K)',
        description: 'Middle fingers rest directly beside your index fingers on D (left) and K (right).',
        targetKeys: ['d', 'k', 'f', 'j', ' '],
        goalWpm: 12,
        minAccuracy: 90,
        text: 'd k d k dd kk df jk dk fd kf jd ddk kfd dfj kjd dd kk d k'
      },
      {
        id: 'spine-1-3',
        partNumber: 1,
        lessonNumber: 3,
        title: 'The Ring Anchors (Keys S & L)',
        description: 'Ring fingers naturally occupy S on the left hand and L on the right hand.',
        targetKeys: ['s', 'l', 'd', 'k', 'f', 'j', ' '],
        goalWpm: 12,
        minAccuracy: 90,
        text: 's l s l ss ll sd lk sf lj ls sl ds kl fs jl ss ll s l s l'
      },
      {
        id: 'spine-1-4',
        partNumber: 1,
        lessonNumber: 4,
        title: 'The Pinky Outers (Keys A & ;)',
        description: 'Your pinky fingers rest on A (left) and Semicolon (right) without lifting your wrists.',
        targetKeys: ['a', ';', 's', 'l', 'd', 'k', 'f', 'j', ' '],
        goalWpm: 14,
        minAccuracy: 90,
        text: 'a ; a ; aa ;; as ;l ad ;k af ;j fa j; da k; sa l; aa ;; a ;'
      },
      {
        id: 'spine-1-5',
        partNumber: 1,
        lessonNumber: 5,
        title: 'The Complete Home Row Lock',
        description: 'All eight fingers active across ASDF and JKL; with thumbs floating over the spacebar.',
        targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', ' '],
        goalWpm: 15,
        minAccuracy: 90,
        text: 'asdf jkl; asdf jkl; a s d f j k l ; fdsa ;lkj asdf jkl; asdf jkl;'
      }
    ]
  },
  {
    partNumber: 2,
    id: 'part-2-home-row-words',
    title: 'Part 2: Home Row Words',
    subtitle: 'First Gear',
    focus: 'Real English words built purely from the home row without wandering fingers.',
    targetSpeed: '15 WPM',
    passAccuracy: 90,
    badge: 'Words',
    color: '#48B89F',
    gameBreak: {
      gameId: 'apple',
      name: 'Apple Thieves',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      description: 'Catch falling orchard apples using home-row word combinations.'
    },
    lessons: [
      {
        id: 'spine-2-1',
        partNumber: 2,
        lessonNumber: 6,
        title: 'Two-Letter Home Combos',
        description: 'Building muscle memory on frequent pairs: as, fa, la, ja, ka.',
        targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ' '],
        goalWpm: 15,
        minAccuracy: 90,
        text: 'as fa la ja ka as fa la ja ka ask lad fad dad sad all ask lad'
      },
      {
        id: 'spine-2-2',
        partNumber: 2,
        lessonNumber: 7,
        title: 'Three-Letter Core Words',
        description: 'dad, sad, lad, fad, ask, all, had, gas.',
        targetKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ' '],
        goalWpm: 15,
        minAccuracy: 90,
        text: 'dad sad lad fad ask all had gas dad sad lad fad ask all had gas'
      },
      {
        id: 'spine-2-3',
        partNumber: 2,
        lessonNumber: 8,
        title: 'Double Consonants & Endings',
        description: 'Mastering repeating taps: fall, hall, tall, pass, glass, flask.',
        targetKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ' '],
        goalWpm: 16,
        minAccuracy: 90,
        text: 'fall hall all add pass fall hall all add pass flask glad salad'
      },
      {
        id: 'spine-2-4',
        partNumber: 2,
        lessonNumber: 9,
        title: 'Home Row Sentences',
        description: 'Putting it together in smooth, unbroken sentences.',
        targetKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ' '],
        goalWpm: 18,
        minAccuracy: 92,
        text: 'a sad lad had a fall a glad dad had a flask all dads had salads'
      }
    ]
  },
  {
    partNumber: 3,
    id: 'part-3-top-bottom-rows',
    title: 'Part 3: Top + Bottom Rows',
    subtitle: 'The Road',
    focus: 'Full QWERTY letters. Reaching up and down without moving your wrists.',
    targetSpeed: '25 WPM',
    passAccuracy: 92,
    badge: 'QWERTY Full',
    color: '#F6C445',
    gameBreak: {
      gameId: 'monster',
      name: 'Monster Attack',
      keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
      description: 'Defend your base against alien invaders across the full alphabet.'
    },
    lessons: [
      {
        id: 'spine-3-1',
        partNumber: 3,
        lessonNumber: 10,
        title: 'Top Row Vowels (Keys E & I)',
        description: 'Middle fingers reach up to E and I, then instantly return to D and K.',
        targetKeys: ['e', 'i', 'd', 'k', ' '],
        goalWpm: 20,
        minAccuracy: 92,
        text: 'ded kik ded kik see die kid led fed red like side ride slide'
      },
      {
        id: 'spine-3-2',
        partNumber: 3,
        lessonNumber: 11,
        title: 'Index Reaches (Keys R, U, T, Y)',
        description: 'Index fingers govern the center reaches: R and T (left), U and Y (right).',
        targetKeys: ['r', 'u', 't', 'y', 'f', 'j', ' '],
        goalWpm: 22,
        minAccuracy: 92,
        text: 'try run yet rut rust turn yard your duty true year rust fury'
      },
      {
        id: 'spine-3-3',
        partNumber: 3,
        lessonNumber: 12,
        title: 'Outer Top Reaches (Keys W, O, Q, P)',
        description: 'Ring and pinky upward reaches for full top row coverage.',
        targetKeys: ['w', 'o', 'q', 'p', 's', 'l', 'a', ';', ' '],
        goalWpm: 22,
        minAccuracy: 92,
        text: 'work open quit power drop quick plot world paper quote loop'
      },
      {
        id: 'spine-3-4',
        partNumber: 3,
        lessonNumber: 13,
        title: 'Bottom Row Centers (Keys V, M, B, N)',
        description: 'Index fingers reach down to V, B (left) and M, N (right).',
        targetKeys: ['v', 'b', 'n', 'm', 'f', 'j', ' '],
        goalWpm: 24,
        minAccuracy: 92,
        text: 'van man ban mob oven verb name barn move numb vent member'
      },
      {
        id: 'spine-3-5',
        partNumber: 3,
        lessonNumber: 14,
        title: 'Bottom Row Outers (Keys C, X, Z)',
        description: 'Middle, ring, and pinky downward reaches completing all 26 letters.',
        targetKeys: ['c', 'x', 'z', ' '],
        goalWpm: 25,
        minAccuracy: 92,
        text: 'cave exam zero zone box camp cold next zinc flex size zero'
      }
    ]
  },
  {
    partNumber: 4,
    id: 'part-4-words-that-breathe',
    title: 'Part 4: Words That Breathe',
    subtitle: 'Cruising',
    focus: 'Spaces, shift capitalization, commas, periods, and sentence rhythm.',
    targetSpeed: '35 WPM',
    passAccuracy: 94,
    badge: 'Cadence',
    color: '#C3A6E8',
    gameBreak: {
      gameId: 'bubbles',
      name: 'Floating Bubbles',
      keys: ['Shift', '.', ',', ' '],
      description: 'Pop floating sea bubbles with calm, rhythmic capitalization cadence.'
    },
    lessons: [
      {
        id: 'spine-4-1',
        partNumber: 4,
        lessonNumber: 15,
        title: 'The Shift Key Balance',
        description: 'Right shift for left hand letters; left shift for right hand letters.',
        targetKeys: ['Shift', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
        goalWpm: 28,
        minAccuracy: 94,
        text: 'Apple Bread Cat Dog Elephant Frog Gold House Ice Jump King Lion Moon'
      },
      {
        id: 'spine-4-2',
        partNumber: 4,
        lessonNumber: 16,
        title: 'Punctuation Cadence (Commas & Periods)',
        description: 'Keep your flow steady through natural sentence breaks.',
        targetKeys: ['.', ',', ' '],
        goalWpm: 30,
        minAccuracy: 94,
        text: 'The swift runner took a breath, paused for a moment, and crossed the line.'
      },
      {
        id: 'spine-4-3',
        partNumber: 4,
        lessonNumber: 17,
        title: 'Natural Paragraph Flow',
        description: 'Read one word ahead so your hands never stop moving.',
        targetKeys: ['all'],
        goalWpm: 35,
        minAccuracy: 94,
        text: 'Clear water flows down the quiet stone path. Every morning brings a fresh start, a clean desk, and steady hands on the keyboard.'
      }
    ]
  },
  {
    partNumber: 5,
    id: 'part-5-numbers-and-symbols',
    title: 'Part 5: Numbers & Symbols',
    subtitle: 'Dashboard & Gauges',
    focus: 'Number row 1-0 and essential everyday symbols (@ # $ % & * ( ) - =).',
    targetSpeed: '40 WPM',
    passAccuracy: 92,
    badge: 'Symbols',
    color: '#F28B82',
    gameBreak: {
      gameId: 'temple',
      name: 'Temple Bash',
      keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '@', '#', '$'],
      description: 'Smash ancient sandstone rune blocks engraved with numbers and symbols.'
    },
    lessons: [
      {
        id: 'spine-5-1',
        partNumber: 5,
        lessonNumber: 18,
        title: 'The Number Row (1 to 0)',
        description: 'Reaching up from home row to the numbers without looking down.',
        targetKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        goalWpm: 35,
        minAccuracy: 90,
        text: '12 34 56 78 90 2026 1999 100 450 780 999 12345 67890 2048'
      },
      {
        id: 'spine-5-2',
        partNumber: 5,
        lessonNumber: 19,
        title: 'Email & URL Crumb Syntax',
        description: 'user@ksmxtech.com, https://github.com, file_name-v2.json.',
        targetKeys: ['@', '.', '_', '-', '/', ':'],
        goalWpm: 38,
        minAccuracy: 92,
        text: 'hello@ksmxtech.com support@domain.org https://github.com/prasadsince1999/RETROSPEED'
      },
      {
        id: 'spine-5-3',
        partNumber: 5,
        lessonNumber: 20,
        title: 'Parentheses & Technical Brackets',
        description: '( ) [ ] { } + = - * /',
        targetKeys: ['(', ')', '[', ']', '{', '}', '+', '=', '-', '*'],
        goalWpm: 40,
        minAccuracy: 92,
        text: '(10 + 5) * 2 = 30; items[0] = { count: 12 }; total = price - discount;'
      }
    ]
  },
  {
    partNumber: 6,
    id: 'part-6-speed-without-panic',
    title: 'Part 6: Speed Without Panic',
    subtitle: 'The Highway',
    focus: 'Timed 60-second endurance, burst recovery, and weak-key repair.',
    targetSpeed: '50 WPM',
    passAccuracy: 95,
    badge: 'Velocity',
    color: '#F6C445',
    gameBreak: {
      gameId: 'meteor',
      name: 'Meteor Words',
      keys: ['all'],
      description: 'High-pressure word defense against falling meteor showers.'
    },
    lessons: [
      {
        id: 'spine-6-1',
        partNumber: 6,
        lessonNumber: 21,
        title: 'Cadence Control & Metronome Flow',
        description: 'Even keystroke timing without burst-then-freeze pauses.',
        targetKeys: ['all'],
        goalWpm: 45,
        minAccuracy: 95,
        text: 'The best way to type fast is to never hurry. When you stop rushing, errors disappear, and speed rises on its own.'
      },
      {
        id: 'spine-6-2',
        partNumber: 6,
        lessonNumber: 22,
        title: 'Trigrams & High-Frequency Blends',
        description: 'the, and, ing, ion, tio, for, tha, ter, res, com.',
        targetKeys: ['all'],
        goalWpm: 48,
        minAccuracy: 95,
        text: 'running jumping standing action station condition communication information computer remember'
      },
      {
        id: 'spine-6-3',
        partNumber: 6,
        lessonNumber: 23,
        title: 'The 60s Highway Sprint',
        description: 'Sustain 50+ WPM with 95%+ precision over a continuous 60-second track.',
        targetKeys: ['all'],
        goalWpm: 50,
        minAccuracy: 95,
        text: 'Speed is not tension. Speed is relaxation. Your fingers glide effortlessly across the keyboard, turning thoughts directly into clean text on screen.'
      }
    ]
  },
  {
    partNumber: 7,
    id: 'part-7-computer-skills',
    title: 'Part 7: Computer Skills & Shortcuts',
    subtitle: 'Cockpit Mastery',
    focus: 'Chording mastery: Ctrl+C, Ctrl+V, Alt+Tab, Win+D. Hands stay on the board.',
    targetSpeed: '8/10 Clean Chords',
    passAccuracy: 95,
    badge: 'Operator',
    color: '#48B89F',
    gameBreak: {
      gameId: 'kitchen',
      name: 'Shortcut Kitchen',
      keys: ['Ctrl', 'Shift', 'Alt', 'Win'],
      description: 'Serve incoming shortcut orders before the ticket timer runs out.'
    },
    lessons: [
      {
        id: 'spine-7-1',
        partNumber: 7,
        lessonNumber: 24,
        title: 'Windows Essentials (Undo, Copy, Paste, Select All)',
        description: 'Ctrl+Z, Ctrl+C, Ctrl+V, Ctrl+A.',
        isShortcut: true,
        track: 'windows',
        chords: ['Ctrl+Z', 'Ctrl+C', 'Ctrl+V', 'Ctrl+A'],
        goalWpm: 40,
        minAccuracy: 95,
        text: 'Ctrl+A (Select All), Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+Z (Undo)'
      },
      {
        id: 'spine-7-2',
        partNumber: 7,
        lessonNumber: 25,
        title: 'Window Management (Alt+Tab, Win+D, Win+Arrows)',
        description: 'Switch apps, minimize to desktop, snap split-screen windows.',
        isShortcut: true,
        track: 'windows',
        chords: ['Alt+Tab', 'Win+D', 'Win+Left', 'Win+Right'],
        goalWpm: 40,
        minAccuracy: 95,
        text: 'Alt+Tab (Switch App), Win+D (Show Desktop), Win+Left (Snap Left), Win+Right (Snap Right)'
      },
      {
        id: 'spine-7-3',
        partNumber: 7,
        lessonNumber: 26,
        title: 'Browser Navigation (Tabs, Search, URL Bar)',
        description: 'Ctrl+T, Ctrl+W, Ctrl+L, Ctrl+R, Ctrl+F.',
        isShortcut: true,
        track: 'browser',
        chords: ['Ctrl+T', 'Ctrl+W', 'Ctrl+L', 'Ctrl+R', 'Ctrl+F'],
        goalWpm: 40,
        minAccuracy: 95,
        text: 'Ctrl+T (New Tab), Ctrl+W (Close Tab), Ctrl+L (Address Bar), Ctrl+F (Find in Page)'
      }
    ]
  },
  {
    partNumber: 8,
    id: 'part-8-pro-lane',
    title: 'Part 8: Pro Lane',
    subtitle: 'High Performance',
    focus: 'Developer code syntax, terminal commands, or professional speed typing.',
    targetSpeed: '60 WPM',
    passAccuracy: 96,
    badge: 'Grandmaster',
    color: '#2D2319',
    gameBreak: {
      gameId: 'racer',
      name: 'Velocity GP',
      keys: ['all'],
      description: 'Competitive track race pushing past 60+ WPM with pro precision.'
    },
    lessons: [
      {
        id: 'spine-8-1',
        partNumber: 8,
        lessonNumber: 27,
        title: 'Developer Syntax & Arrow Functions',
        description: 'const handleClick = (e) => { e.preventDefault(); };',
        targetKeys: ['all'],
        goalWpm: 55,
        minAccuracy: 96,
        text: 'const calculateWpm = (chars, seconds) => Math.round((chars / 5) / (seconds / 60));'
      },
      {
        id: 'spine-8-2',
        partNumber: 8,
        lessonNumber: 28,
        title: 'Terminal & Command Line Pacing',
        description: 'git checkout -b feature/fast-fingers && npm run build',
        targetKeys: ['all'],
        goalWpm: 58,
        minAccuracy: 96,
        text: 'git add . && git commit -m "feat: pro lane speed unlocked" && git push origin main'
      },
      {
        id: 'spine-8-3',
        partNumber: 8,
        lessonNumber: 29,
        title: 'The Grandmaster Championship Sprint',
        description: '60+ WPM, 96%+ accuracy across complex mixed vocabulary.',
        targetKeys: ['all'],
        goalWpm: 60,
        minAccuracy: 96,
        text: 'Mastery is not an accident. It is the natural outcome of deliberate practice, correct posture, steady breathing, and hundreds of thousands of clean keystrokes.'
      }
    ]
  }
];

export function getSpinePartByNumber(partNumber) {
  return SPINE_PARTS.find(p => p.partNumber === Number(partNumber)) || SPINE_PARTS[0];
}

export function getNextSpineLesson(userProgress = {}) {
  const completedMap = userProgress.completedLessons || {};
  
  for (const part of SPINE_PARTS) {
    for (const lesson of part.lessons) {
      if (!completedMap[lesson.id]) {
        return { part, lesson };
      }
    }
  }
  
  const lastPart = SPINE_PARTS[SPINE_PARTS.length - 1];
  return { part: lastPart, lesson: lastPart.lessons[lastPart.lessons.length - 1] };
}
