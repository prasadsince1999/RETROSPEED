// RETROSPEED Zero-to-Hero Spine Curriculum (Shelf A: Primary Path)
// 97 Granular Micro-Lessons following the 4-box pedagogical cycle:
// 1 NEW KEYS -> 2 REVIEW -> 3 PRACTICE (Clock) -> 4 PLAY (Game)
// Global numbering: 1..97 across 8 structured units.

export const SPINE_PARTS = [
  // =========================================================================
  // UNIT 1: THE HOME ROW (23 Lessons, Global #1 to #23)
  // =========================================================================
  {
    partNumber: 1,
    title: "The Home Row",
    shortTitle: "Home Row",
    description: "Anchor on F & J bumps. Master left hand ASDF, right hand JKL;, Space, and G & H.",
    targetWpm: 15,
    lessons: [
      {
        id: "spine.p1.l01",
        part: 1,
        index: 1,
        type: "motion",
        title: "Home Row Desk & Tactile Bumps",
        description: "Interactive motion coach: learn the anchor bumps on F and J, finger curvature, and the eyes-on-the-page rule.",
        motionId: "motion.home-row",
        keys: ["f", "j", "u", " "],
        goalWpm: 10,
        minAccuracy: 90
      },
      {
        id: "spine.p1.l02",
        part: 1,
        index: 2,
        type: "keys",
        title: "Keys F & J",
        description: "Left index on F, right index on J. Feel the tactile bump.",
        keys: ["f", "j"],
        goalWpm: 10,
        minAccuracy: 90,
        text: "f j f j ff jj fff jjj fj jf fjj jff fjf jfj ff jj f j f j"
      },
      {
        id: "spine.p1.l03",
        part: 1,
        index: 3,
        type: "keys",
        title: "The Spacebar",
        description: "Tap space lightly with your right or left thumb.",
        keys: [" ", "f", "j"],
        goalWpm: 10,
        minAccuracy: 90,
        text: "f j f j f f j j fj fj jf jf ff jj fj jf f j f j"
      },
      {
        id: "spine.p1.l04",
        part: 1,
        index: 4,
        type: "review",
        title: "Review: F, J & Space",
        description: "Build steady rhythm across F, J and Space.",
        keys: ["f", "j", " "],
        goalWpm: 10,
        minAccuracy: 90,
        text: "ff jj fj jf ffjj jjff f j f j fjf jfj jff fjj ff jj f j"
      },
      {
        id: "spine.p1.l05",
        part: 1,
        index: 5,
        type: "keys",
        title: "Keys D & K",
        description: "Left middle finger on D, right middle finger on K.",
        keys: ["d", "k"],
        goalWpm: 12,
        minAccuracy: 90,
        text: "d k d k dd kk ddd kkk dk kd dkk kdd dkd kdk dd kk d k"
      },
      {
        id: "spine.p1.l06",
        part: 1,
        index: 6,
        type: "review",
        title: "Review: D, K + F, J",
        description: "Combine index and middle fingers on both hands.",
        keys: ["d", "k", "f", "j", " "],
        goalWpm: 12,
        minAccuracy: 90,
        text: "fd jk df kj fdkj jkfd dk fj kd jf fjd kdf df jk ff jj dd kk"
      },
      {
        id: "spine.p1.l07",
        part: 1,
        index: 7,
        type: "practice",
        title: "Practice: D & K (Timed)",
        description: "Maintain steady speed and high accuracy on F, J, D, K.",
        keys: ["d", "k", "f", "j", " "],
        goalWpm: 14,
        minAccuracy: 90,
        text: "dk fj kf dj fjd kdf df jk dd kk ff jj fdkj jkfd dk fj kf dj"
      },
      {
        id: "spine.p1.l08",
        part: 1,
        index: 8,
        type: "play",
        title: "Play: Press Room (FJKD)",
        description: "Paper press game: stamp incoming sheets using F, J, K, D and Space.",
        gameId: "press-room",
        keys: ["f", "j", "k", "d", " "],
        goalWpm: 12,
        minAccuracy: 90,
        lives: 3
      },
      {
        id: "spine.p1.l09",
        part: 1,
        index: 9,
        type: "keys",
        title: "Keys S & L",
        description: "Left ring finger on S, right ring finger on L.",
        keys: ["s", "l"],
        goalWpm: 12,
        minAccuracy: 90,
        text: "s l s l ss ll sss lll sl ls sll lss sls lsl ss ll s l"
      },
      {
        id: "spine.p1.l10",
        part: 1,
        index: 10,
        type: "review",
        title: "Review: S, L + Known Keys",
        description: "Six home row keys active: S, D, F and J, K, L.",
        keys: ["s", "l", "d", "k", "f", "j", " "],
        goalWpm: 12,
        minAccuracy: 90,
        text: "sd kl ls dk sl dkf jls sl dk fj lk sd fj kl sd ls dk fj"
      },
      {
        id: "spine.p1.l11",
        part: 1,
        index: 11,
        type: "practice",
        title: "Practice: S & L (Timed)",
        description: "Timed rhythm across all six inner home row keys.",
        keys: ["s", "l", "d", "k", "f", "j", " "],
        goalWpm: 14,
        minAccuracy: 90,
        text: "sldk fjkd slfj kldf lksd dksl fjsl kldf sd kl ls dk sl dk"
      },
      {
        id: "spine.p1.l12",
        part: 1,
        index: 12,
        type: "keys",
        title: "Keys A & ;",
        description: "Left pinky on A, right pinky on Semicolon (;).",
        keys: ["a", ";"],
        goalWpm: 14,
        minAccuracy: 90,
        text: "a ; a ; aa ;; aaa ;;; a; ;a a;; ;aa a;a ;a; aa ;; a ;"
      },
      {
        id: "spine.p1.l13",
        part: 1,
        index: 13,
        type: "review",
        title: "Review: A, ; + Known Keys",
        description: "All eight home resting positions: ASDF and JKL;.",
        keys: ["a", ";", "s", "l", "d", "k", "f", "j", " "],
        goalWpm: 14,
        minAccuracy: 90,
        text: "asdf jkl; asdf jkl; fdsa ;lkj asdf ;lkj a; sl dk fj as df jk l;"
      },
      {
        id: "spine.p1.l14",
        part: 1,
        index: 14,
        type: "practice",
        title: "Practice: First Eight Keys",
        description: "Master clean touch-typing across ASDF and JKL;.",
        keys: ["a", "s", "d", "f", "j", "k", "l", ";", " "],
        goalWpm: 15,
        minAccuracy: 90,
        text: "asdf jkl; a; sl dk fj fall lass flask salad all dad ask adds"
      },
      {
        id: "spine.p1.l15",
        part: 1,
        index: 15,
        type: "play",
        title: "Play: Press Room (Home Eight)",
        description: "Speed press challenge using all 8 home row rest positions.",
        gameId: "press-room",
        keys: ["a", "s", "d", "f", "j", "k", "l", ";", " "],
        goalWpm: 14,
        minAccuracy: 90,
        lives: 3
      },
      {
        id: "spine.p1.l16",
        part: 1,
        index: 16,
        type: "motion",
        title: "Coach: Eyes on the Screen",
        description: "Anchoring and visual discipline: never look down at your hands.",
        motionId: "motion.eyes-up",
        keys: ["a", "s", "d", "f", "j", "k", "l", ";", " "],
        goalWpm: 14,
        minAccuracy: 90
      },
      {
        id: "spine.p1.l17",
        part: 1,
        index: 17,
        type: "one-hand",
        title: "Left Hand Anchor: ASDFG",
        description: "Focus exclusively on the left hand home row quadrant.",
        hand: "left",
        keys: ["a", "s", "d", "f", "g", " "],
        goalWpm: 14,
        minAccuracy: 90,
        text: "a s d f g as df fg gf da sa fa ga dag fad gad fads gads"
      },
      {
        id: "spine.p1.l18",
        part: 1,
        index: 18,
        type: "one-hand",
        title: "Right Hand Anchor: HJKL;",
        description: "Focus exclusively on the right hand home row quadrant.",
        hand: "right",
        keys: ["h", "j", "k", "l", ";", " "],
        goalWpm: 14,
        minAccuracy: 90,
        text: "h j k l ; hj kl l; ;l jh kh lh ;k hall lash jall half"
      },
      {
        id: "spine.p1.l19",
        part: 1,
        index: 19,
        type: "keys",
        title: "Keys G & H",
        description: "Left index reaches right to G; right index reaches left to H.",
        keys: ["g", "h"],
        goalWpm: 15,
        minAccuracy: 90,
        text: "g h g h gg hh ggg hhh gh hg ghh hgg ghg hgh gg hh g h fg jh"
      },
      {
        id: "spine.p1.l20",
        part: 1,
        index: 20,
        type: "review",
        title: "Review: G, H + Full Home Row",
        description: "Form full home row words: had, glad, flash, glass, shall, half.",
        keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", " "],
        goalWpm: 16,
        minAccuracy: 90,
        text: "glad had half fall salad dash flag flash glass shall hall jag"
      },
      {
        id: "spine.p1.l21",
        part: 1,
        index: 21,
        type: "practice",
        title: "Practice: Full Home (Timed)",
        description: "High-speed rhythm drill across all 10 home row keys.",
        keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "glad dad had half a salad; a glass flask fall; shall dad ask"
      },
      {
        id: "spine.p1.l22",
        part: 1,
        index: 22,
        type: "checkpoint",
        title: "Checkpoint: Home Row Mastery",
        description: "Certification test for Unit 1. High precision benchmark.",
        keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", " "],
        goalWpm: 20,
        minAccuracy: 92,
        text: "all glad lads had half a flask; flash a flag as salads fall"
      },
      {
        id: "spine.p1.l23",
        part: 1,
        index: 23,
        type: "play",
        title: "Play: Drop Slips Boss (Home Row)",
        description: "Unit 1 Boss: catch all incoming slips using the entire Home Row.",
        gameId: "drop-chits",
        keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", " "],
        goalWpm: 18,
        minAccuracy: 90,
        lives: 3
      }
    ]
  },

  // =========================================================================
  // UNIT 2: THE TOP ROW (16 Lessons, Global #24 to #39)
  // =========================================================================
  {
    partNumber: 2,
    title: "The Top Row",
    shortTitle: "Top Row",
    description: "Reach up from the home row anchors to E/I, R/U, T/Y, W/O, Q/P and return.",
    targetWpm: 18,
    lessons: [
      {
        id: "spine.p2.l24",
        part: 2,
        index: 24,
        type: "keys",
        title: "Keys E & I",
        description: "Left middle reaches up to E, right middle reaches up to I.",
        keys: ["e", "i"],
        goalWpm: 14,
        minAccuracy: 90,
        text: "e i e i ee ii eee iii ei ie eii iie eie iei ee ii e i de ki"
      },
      {
        id: "spine.p2.l25",
        part: 2,
        index: 25,
        type: "review",
        title: "Review: E, I + Home Row",
        description: "Reach and return: see, side, like, file, feed, seal, sail.",
        keys: ["e", "i", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", " "],
        goalWpm: 15,
        minAccuracy: 90,
        text: "see side like file feed seal sail desk field life lead fill dill"
      },
      {
        id: "spine.p2.l26",
        part: 2,
        index: 26,
        type: "keys",
        title: "Keys R & U",
        description: "Left index reaches up to R, right index reaches up to U.",
        keys: ["r", "u"],
        goalWpm: 15,
        minAccuracy: 90,
        text: "r u r u rr uu rrr uuu ru ur ruu uur rur uru rr uu r u fr ju"
      },
      {
        id: "spine.p2.l27",
        part: 2,
        index: 27,
        type: "review",
        title: "Review: R, U + Known Keys",
        description: "Words with R & U: fire, rush, pure, sure, dark, surf, rule.",
        keys: ["r", "u", "e", "i", "a", "s", "d", "f", "g", "h", "j", "k", "l", " "],
        goalWpm: 16,
        minAccuracy: 90,
        text: "fire rush pure sure dark surf rule user fruit guard figure"
      },
      {
        id: "spine.p2.l28",
        part: 2,
        index: 28,
        type: "practice",
        title: "Practice: EIRU (Timed)",
        description: "Timed reach and return on the core top row anchors.",
        keys: ["e", "i", "r", "u", "a", "s", "d", "f", "j", "k", "l", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "sure user fire rush ride rule dark fuel sail like drill skill"
      },
      {
        id: "spine.p2.l29",
        part: 2,
        index: 29,
        type: "play",
        title: "Play: Paper Planes (EIRU)",
        description: "Launch airmail planes with top row word combinations.",
        gameId: "paper-planes",
        keys: ["e", "i", "r", "u", "f", "j", "d", "k", "s", "l", "a", " "],
        goalWpm: 16,
        minAccuracy: 90,
        lives: 3
      },
      {
        id: "spine.p2.l30",
        part: 2,
        index: 30,
        type: "keys",
        title: "Keys T & Y",
        description: "Left index reaches up-right to T, right index reaches up-left to Y.",
        keys: ["t", "y"],
        goalWpm: 16,
        minAccuracy: 90,
        text: "t y t y tt yy ttt yyy ty yt tyy yyt tyt yty tt yy t y ft jy"
      },
      {
        id: "spine.p2.l31",
        part: 2,
        index: 31,
        type: "review",
        title: "Review: T, Y + Known Keys",
        description: "Words with T & Y: stay, year, they, duty, city, late, yet.",
        keys: ["t", "y", "r", "u", "e", "i", "a", "s", "d", "f", "g", "h", "j", "k", "l", " "],
        goalWpm: 16,
        minAccuracy: 90,
        text: "stay year they duty city late yet trial yard delay reality"
      },
      {
        id: "spine.p2.l32",
        part: 2,
        index: 32,
        type: "keys",
        title: "Keys W & O",
        description: "Left ring reaches up to W, right ring reaches up to O.",
        keys: ["w", "o"],
        goalWpm: 16,
        minAccuracy: 90,
        text: "w o w o ww oo www ooo wo ow woo oow wow owo ww oo w o sw lo"
      },
      {
        id: "spine.p2.l33",
        part: 2,
        index: 33,
        type: "review",
        title: "Review: W, O + Known Keys",
        description: "Words with W & O: word, work, flow, slow, wood, grow, show.",
        keys: ["w", "o", "t", "y", "r", "u", "e", "i", "a", "s", "d", "f", "g", "h", "j", "k", "l", " "],
        goalWpm: 17,
        minAccuracy: 90,
        text: "word work flow slow wood grow show world power water tower"
      },
      {
        id: "spine.p2.l34",
        part: 2,
        index: 34,
        type: "keys",
        title: "Keys Q & P",
        description: "Left pinky reaches up to Q, right pinky reaches up to P.",
        keys: ["q", "p"],
        goalWpm: 16,
        minAccuracy: 90,
        text: "q p q p qq pp qqq ppp qp pq qpp pqq qpq pqp qq pp q p aq ;p"
      },
      {
        id: "spine.p2.l35",
        part: 2,
        index: 35,
        type: "review",
        title: "Review: Q, P + Full Top Row",
        description: "Words with Q & P: quiet, page, paper, equal, quick, report.",
        keys: ["q", "p", "w", "o", "e", "r", "t", "y", "u", "i", "a", "s", "d", "f", "g", "h", "j", "k", "l", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "quiet page paper equal quick report project speed proof quote"
      },
      {
        id: "spine.p2.l36",
        part: 2,
        index: 36,
        type: "practice",
        title: "Practice: Full Top Row (Timed)",
        description: "Rapid transition between Home Row and Top Row.",
        keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", " "],
        goalWpm: 20,
        minAccuracy: 90,
        text: "the quick power of true words will spark great quality today"
      },
      {
        id: "spine.p2.l37",
        part: 2,
        index: 37,
        type: "checkpoint",
        title: "Checkpoint: Top Row Mastery",
        description: "Precision benchmark on Home and Top row combinations.",
        keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", " "],
        goalWpm: 22,
        minAccuracy: 92,
        text: "proper write speed requires polite posture and light touches"
      },
      {
        id: "spine.p2.l38",
        part: 2,
        index: 38,
        type: "one-hand",
        title: "Top Row Hand Balance (L vs R)",
        description: "Alternate left and right hand top row reaches.",
        hand: "both",
        keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", " "],
        goalWpm: 20,
        minAccuracy: 90,
        text: "qwert yuiop we top row type write power out your output tree"
      },
      {
        id: "spine.p2.l39",
        part: 2,
        index: 39,
        type: "play",
        title: "Play: Local Line Boss (Top Row)",
        description: "Unit 2 Boss: switch tracks using Top and Home Row words.",
        gameId: "local-line",
        keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", " "],
        goalWpm: 20,
        minAccuracy: 90,
        lives: 3
      }
    ]
  },

  // =========================================================================
  // UNIT 3: THE BOTTOM ROW (14 Lessons, Global #40 to #53)
  // =========================================================================
  {
    partNumber: 3,
    title: "The Bottom Row",
    shortTitle: "Bottom Row",
    description: "Reach down from home anchors to C/V, B/N, M/Comma, X/Period, Z/Slash.",
    targetWpm: 20,
    lessons: [
      {
        id: "spine.p3.l40",
        part: 3,
        index: 40,
        type: "keys",
        title: "Keys C & V",
        description: "Left middle reaches down to C, left index reaches down to V.",
        keys: ["c", "v"],
        goalWpm: 16,
        minAccuracy: 90,
        text: "c v c v cc vv ccc vvv cv vc cvv vcc cvc vcv cc vv c v dc fv"
      },
      {
        id: "spine.p3.l41",
        part: 3,
        index: 41,
        type: "review",
        title: "Review: C, V + Known Keys",
        description: "Words with C & V: cave, voice, cover, clear, active, advice.",
        keys: ["c", "v", "a", "s", "d", "f", "e", "r", "t", "y", "u", "i", "o", "p", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "cave voice cover clear active advice vector curved clover civics"
      },
      {
        id: "spine.p3.l42",
        part: 3,
        index: 42,
        type: "keys",
        title: "Keys B & N",
        description: "Left index reaches down-right to B, right index reaches down-left to N.",
        keys: ["b", "n"],
        goalWpm: 16,
        minAccuracy: 90,
        text: "b n b n bb nn bbb nnn bn nb bnn nbb bnb nbn bb nn b n fb jn"
      },
      {
        id: "spine.p3.l43",
        part: 3,
        index: 43,
        type: "review",
        title: "Review: B, N + Known Keys",
        description: "Words with B & N: brain, brown, begin, banner, bounce, number.",
        keys: ["b", "n", "c", "v", "a", "e", "i", "o", "u", "r", "t", "s", "d", "f", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "brain brown begin banner bounce number balance beacon cabin button"
      },
      {
        id: "spine.p3.l44",
        part: 3,
        index: 44,
        type: "play",
        title: "Play: Press Room (CVBN)",
        description: "Speed press with bottom row central keys.",
        gameId: "press-room",
        keys: ["c", "v", "b", "n", "a", "s", "d", "f", "j", "k", "l", " "],
        goalWpm: 18,
        minAccuracy: 90,
        lives: 3
      },
      {
        id: "spine.p3.l45",
        part: 3,
        index: 45,
        type: "keys",
        title: "Keys M & Comma (,)",
        description: "Right index reaches down to M, right middle reaches down to Comma (,).",
        keys: ["m", ","],
        goalWpm: 16,
        minAccuracy: 90,
        text: "m , m , mm ,, mmm ,,, m, ,m m,, ,mm m,m ,m, mm ,, m , jm k,"
      },
      {
        id: "spine.p3.l46",
        part: 3,
        index: 46,
        type: "review",
        title: "Review: M, Comma + Known Keys",
        description: "Words and commas: morning, time, simple, flame, dream, march.",
        keys: ["m", ",", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "n", "o", "p", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "morning, time, simple, flame, dream, march, summer, memory, calm"
      },
      {
        id: "spine.p3.l47",
        part: 3,
        index: 47,
        type: "keys",
        title: "Keys X & Period (.)",
        description: "Left ring reaches down to X, right ring reaches down to Period (.).",
        keys: ["x", "."],
        goalWpm: 16,
        minAccuracy: 90,
        text: "x . x . xx .. xxx ... x. .x x.. .xx x.x .x. xx .. x . sx l."
      },
      {
        id: "spine.p3.l48",
        part: 3,
        index: 48,
        type: "review",
        title: "Review: X, Period + Full Bottom",
        description: "Sentences with X and period: text, extra, next, exact, relax.",
        keys: ["x", ".", "m", ",", "c", "v", "b", "n", "a", "e", "i", "o", "u", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "extra text. exact next. relax now. make index. exit box."
      },
      {
        id: "spine.p3.l49",
        part: 3,
        index: 49,
        type: "keys",
        title: "Keys Z & Slash (/)",
        description: "Left pinky reaches down to Z, right pinky reaches down to Slash (/).",
        keys: ["z", "/"],
        goalWpm: 16,
        minAccuracy: 90,
        text: "z / z / zz // zzz /// z/ /z z// /zz z/z /z/ zz // z / az ;/"
      },
      {
        id: "spine.p3.l50",
        part: 3,
        index: 50,
        type: "review",
        title: "Review: Full Alphabet & Punctuation",
        description: "All 26 letters of the English alphabet are now active!",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", ",", " "],
        goalWpm: 20,
        minAccuracy: 90,
        text: "the quick brown fox jumps over the lazy dog. zebras and foxes."
      },
      {
        id: "spine.p3.l51",
        part: 3,
        index: 51,
        type: "practice",
        title: "Practice: 3-Row Alphabet (Timed)",
        description: "Full three-row keyboard fluency sprint.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", ",", " "],
        goalWpm: 22,
        minAccuracy: 90,
        text: "pack my box with five dozen liquor jugs. every letter in flight."
      },
      {
        id: "spine.p3.l52",
        part: 3,
        index: 52,
        type: "checkpoint",
        title: "Checkpoint: Full Alphabet Mastery",
        description: "Certification test for complete 3-row touch typing.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", ",", " "],
        goalWpm: 24,
        minAccuracy: 92,
        text: "sphinx of black quartz, judge my vow. zero mistakes on full keys."
      },
      {
        id: "spine.p3.l53",
        part: 3,
        index: 53,
        type: "play",
        title: "Play: Night Market Boss (Full Alphabet)",
        description: "Unit 3 Boss: sort and harvest packages across all 26 alphabet keys.",
        gameId: "night-market",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "],
        goalWpm: 22,
        minAccuracy: 90,
        lives: 3
      }
    ]
  },

  // =========================================================================
  // UNIT 4: SHIFT KEY & WORDS (12 Lessons, Global #54 to #65)
  // =========================================================================
  {
    partNumber: 4,
    title: "Words & Shift Key",
    shortTitle: "Words & Shift",
    description: "Master opposite-hand Shift key technique for capitals, sentences, and punctuation flow.",
    targetWpm: 24,
    lessons: [
      {
        id: "spine.p4.l54",
        part: 4,
        index: 54,
        type: "keys",
        title: "Left Shift Key (Right Hand Caps)",
        description: "Hold Left Shift with left pinky to capitalize right hand letters: J, K, L, U, I, O, P, H, N, M.",
        keys: ["J", "K", "L", "U", "I", "O", "P", "H", "N", "M", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "J K L U I O P H N M John Paul India Ohio London Japan Paris"
      },
      {
        id: "spine.p4.l55",
        part: 4,
        index: 55,
        type: "keys",
        title: "Right Shift Key (Left Hand Caps)",
        description: "Hold Right Shift with right pinky to capitalize left hand letters: F, D, S, A, R, E, W, Q, G, T, V, C, X, Z.",
        keys: ["F", "D", "S", "A", "R", "E", "W", "Q", "G", "T", "V", "C", "X", "Z", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "F D S A R E W Q G T V C X Z Frank David Sarah Alice Rome Texas"
      },
      {
        id: "spine.p4.l56",
        part: 4,
        index: 56,
        type: "review",
        title: "Review: Opposite Shift Balance",
        description: "Practice alternating Shift hands for proper ergonomic capitalization.",
        keys: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " "],
        goalWpm: 20,
        minAccuracy: 90,
        text: "Alice and Bob went to Chicago. David met Frank in Tokyo."
      },
      {
        id: "spine.p4.l57",
        part: 4,
        index: 57,
        type: "practice",
        title: "Practice: Capitalization Cadence",
        description: "Smooth shifting without breaking rhythm or lifting palms.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", " "],
        goalWpm: 22,
        minAccuracy: 90,
        text: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday."
      },
      {
        id: "spine.p4.l58",
        part: 4,
        index: 58,
        type: "keys",
        title: "Punctuation: Apostrophe & Quote (' \")",
        description: "Single quote (') with right pinky; Double quote (\") with Left Shift + (').",
        keys: ["'", "\"", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "it's don't can't won't \"hello\" \"yes\" \"ready\" \"go\" \"steady\""
      },
      {
        id: "spine.p4.l59",
        part: 4,
        index: 59,
        type: "review",
        title: "Review: Dialogue & Contractions",
        description: "Type natural sentences with quotes and contractions.",
        keys: ["'", "\"", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", " "],
        goalWpm: 22,
        minAccuracy: 90,
        text: "\"It's time to begin,\" said the captain. \"Keep your eyes up.\""
      },
      {
        id: "spine.p4.l60",
        part: 4,
        index: 60,
        type: "practice",
        title: "Practice: Question Mark & Colon (? :)",
        description: "Shift + Slash for (?), Shift + Semicolon for (:).",
        keys: ["?", ":", "!", ".", ",", " "],
        goalWpm: 20,
        minAccuracy: 90,
        text: "Who is there? Note: always verify. Why? Because quality matters!"
      },
      {
        id: "spine.p4.l61",
        part: 4,
        index: 61,
        type: "play",
        title: "Play: Paper Planes (Sentences)",
        description: "Launch airmail envelopes by typing full punctuated sentences.",
        gameId: "paper-planes",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", "?", "!", " "],
        goalWpm: 22,
        minAccuracy: 90,
        lives: 3
      },
      {
        id: "spine.p4.l62",
        part: 4,
        index: 62,
        type: "practice",
        title: "Practice: Paragraph Flow",
        description: "Paragraph typing with capitalization, commas, and periods.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", ",", " "],
        goalWpm: 24,
        minAccuracy: 90,
        text: "Great typing is not about frantic speed. It is about calm rhythm and consistent precision."
      },
      {
        id: "spine.p4.l63",
        part: 4,
        index: 63,
        type: "one-hand",
        title: "Shift & Punctuation Symmetry",
        description: "Check left vs right pinky independence.",
        hand: "both",
        keys: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ".", "!", " "],
        goalWpm: 24,
        minAccuracy: 92,
        text: "Every Good Typist Knows That Clear Form Leads To Swift Results."
      },
      {
        id: "spine.p4.l64",
        part: 4,
        index: 64,
        type: "checkpoint",
        title: "Checkpoint: Prose & Punctuation",
        description: "Certification test for prose typing fluency.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", ",", "'", "\"", " "],
        goalWpm: 26,
        minAccuracy: 92,
        text: "When we practice daily, our fingers find each key effortlessly without hesitation."
      },
      {
        id: "spine.p4.l65",
        part: 4,
        index: 65,
        type: "play",
        title: "Play: Fuse Desk Boss (Words)",
        description: "Unit 4 Boss: defuse ticking word bombs before timers expire.",
        gameId: "fuse-desk",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "],
        goalWpm: 24,
        minAccuracy: 90,
        lives: 3
      }
    ]
  },

  // =========================================================================
  // UNIT 5: THE NUMBERS ROW (8 Lessons, Global #66 to #73)
  // =========================================================================
  {
    partNumber: 5,
    title: "The Numbers Row",
    shortTitle: "Numbers",
    description: "Reach up two rows to 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 with correct finger assignments.",
    targetWpm: 22,
    lessons: [
      {
        id: "spine.p5.l66",
        part: 5,
        index: 66,
        type: "keys",
        title: "Numbers 1, 2, 3, 4",
        description: "Left hand reaches: Pinky (1), Ring (2), Middle (3), Index (4).",
        keys: ["1", "2", "3", "4"],
        goalWpm: 16,
        minAccuracy: 90,
        text: "1 2 3 4 11 22 33 44 1234 4321 14 23 32 41 12 34 13 24 1 2 3 4"
      },
      {
        id: "spine.p5.l67",
        part: 5,
        index: 67,
        type: "keys",
        title: "Numbers 5 & 6",
        description: "Left index reaches up-right to 5, right index reaches up-left to 6.",
        keys: ["5", "6"],
        goalWpm: 16,
        minAccuracy: 90,
        text: "5 6 5 6 55 66 555 666 56 65 565 656 123456 654321 5 6"
      },
      {
        id: "spine.p5.l68",
        part: 5,
        index: 68,
        type: "keys",
        title: "Numbers 7, 8, 9, 0",
        description: "Right hand reaches: Index (7), Middle (8), Ring (9), Pinky (0).",
        keys: ["7", "8", "9", "0"],
        goalWpm: 16,
        minAccuracy: 90,
        text: "7 8 9 0 77 88 99 00 7890 0987 70 89 98 07 78 90 7 8 9 0"
      },
      {
        id: "spine.p5.l69",
        part: 5,
        index: 69,
        type: "review",
        title: "Review: Complete Number Row (0–9)",
        description: "Full 10-digit number row precision without looking down.",
        keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "1234567890 0987654321 2026 1999 100 250 500 1024 4096 8192"
      },
      {
        id: "spine.p5.l70",
        part: 5,
        index: 70,
        type: "practice",
        title: "Practice: Dates & Numbers in Context",
        description: "Mix words and numbers: dates, years, quantities, and addresses.",
        keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", " "],
        goalWpm: 20,
        minAccuracy: 90,
        text: "On October 14, 1947, the aircraft flew at 700 mph across 42 miles."
      },
      {
        id: "spine.p5.l71",
        part: 5,
        index: 71,
        type: "one-hand",
        title: "Number Reach Hand Balance",
        description: "Alternate left hand (1-5) and right hand (6-0) reaches.",
        hand: "both",
        keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", " "],
        goalWpm: 20,
        minAccuracy: 90,
        text: "16 27 38 49 50 1984 2001 2024 365 24 7 360 180 90 45"
      },
      {
        id: "spine.p5.l72",
        part: 5,
        index: 72,
        type: "checkpoint",
        title: "Checkpoint: Numbers Mastery",
        description: "Certification test for high-speed number typing.",
        keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", " "],
        goalWpm: 22,
        minAccuracy: 92,
        text: "Room 402 has 28 desks, 56 chairs, and 14 laptops ready by 9 am."
      },
      {
        id: "spine.p5.l73",
        part: 5,
        index: 73,
        type: "play",
        title: "Play: Drop Slips (Numbers)",
        description: "Catch falling numeric slips with rapid number row reaches.",
        gameId: "drop-chits",
        keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        goalWpm: 20,
        minAccuracy: 90,
        lives: 3
      }
    ]
  },

  // =========================================================================
  // UNIT 6: SYMBOLS & SPEED GATES (10 Lessons, Global #74 to #83)
  // =========================================================================
  {
    partNumber: 6,
    title: "Symbols & Speed Gates",
    shortTitle: "Symbols & Speed",
    description: "Master symbols (! @ # $ % & * [ ] { } = + < >) and pass 30, 40, 50 WPM speed gates.",
    targetWpm: 30,
    lessons: [
      {
        id: "spine.p6.l74",
        part: 6,
        index: 74,
        type: "keys",
        title: "Symbols: Exclamation, At, Hash (! @ #)",
        description: "Shift + 1 (!), Shift + 2 (@), Shift + 3 (#).",
        keys: ["!", "@", "#", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "! @ # !@ #! @#! user@mail.com #1 #2 #3 Alert! Warning!"
      },
      {
        id: "spine.p6.l75",
        part: 6,
        index: 75,
        type: "keys",
        title: "Symbols: Dollar, Percent, Ampersand ($ % &)",
        description: "Shift + 4 ($), Shift + 5 (%), Shift + 7 (&).",
        keys: ["$", "%", "&", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "$ % & $100 $250 50% 100% Salt & Pepper Research & Development"
      },
      {
        id: "spine.p6.l76",
        part: 6,
        index: 76,
        type: "keys",
        title: "Symbols: Brackets, Braces & Parens ([ ] { } ( ))",
        description: "Shift + 9/0 for ( ), [ ] next to P, Shift + [ ] for { }.",
        keys: ["(", ")", "[", "]", "{", "}", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "(item) [index] {config} (a + b) [0, 1, 2] { user: true }"
      },
      {
        id: "spine.p6.l77",
        part: 6,
        index: 77,
        type: "keys",
        title: "Symbols: Math & Logic (+ = - _ < > |)",
        description: "Equal (=), Plus (+), Minus (-), Underscore (_), Angles (< >).",
        keys: ["+", "=", "-", "_", "<", ">", "|", " "],
        goalWpm: 18,
        minAccuracy: 90,
        text: "a + b = c; x - y = 0; user_name; count > 0; size < 100; a | b"
      },
      {
        id: "spine.p6.l78",
        part: 6,
        index: 78,
        type: "review",
        title: "Review: Mixed Symbols in Context",
        description: "Real-world coding and email symbol combinations.",
        keys: ["@", "#", "$", "%", "&", "*", "(", ")", "[", "]", "{", "}", "+", "=", "-", "_", " "],
        goalWpm: 22,
        minAccuracy: 90,
        text: "const total = (price * 1.08) - discount; email: admin@domain.org;"
      },
      {
        id: "spine.p6.l79",
        part: 6,
        index: 79,
        type: "practice",
        title: "Speed Gate: 30 WPM Qualifier",
        description: "Speed gate benchmark: achieve steady 30 WPM with 92% accuracy.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", ",", " "],
        goalWpm: 30,
        minAccuracy: 92,
        text: "Focus on rhythm and muscle memory. The fingers know the distance to every letter on the board."
      },
      {
        id: "spine.p6.l80",
        part: 6,
        index: 80,
        type: "practice",
        title: "Speed Gate: 40 WPM Velocity",
        description: "Speed gate benchmark: maintain 40 WPM sustained sprint.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", ",", " "],
        goalWpm: 40,
        minAccuracy: 92,
        text: "Typing at high speed is like playing piano. Each keystroke flows smoothly into the next chord."
      },
      {
        id: "spine.p6.l81",
        part: 6,
        index: 81,
        type: "practice",
        title: "Speed Gate: 50 WPM Pro Sprint",
        description: "Speed gate benchmark: 50 WPM pro velocity qualification.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", ",", " "],
        goalWpm: 50,
        minAccuracy: 94,
        text: "Professional typists rarely pause between words. Their gaze remains locked on the incoming thoughts."
      },
      {
        id: "spine.p6.l82",
        part: 6,
        index: 82,
        type: "checkpoint",
        title: "Checkpoint: Symbols & High Speed",
        description: "Mastery certification across full keyboard symbols and high velocity.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "@", "#", "$", "%", "&", "*", "(", ")", "[", "]", "{", "}", "+", "=", "-", "_", " "],
        goalWpm: 35,
        minAccuracy: 92,
        text: "System status: OK. All 97 nodes operating at 100% capacity with 0 packet loss."
      },
      {
        id: "spine.p6.l83",
        part: 6,
        index: 83,
        type: "play",
        title: "Play: Patch Terminal Boss (Symbols)",
        description: "Unit 6 Boss: patch falling server code vulnerabilities under high pressure.",
        gameId: "patch-terminal",
        keys: ["{", "}", "[", "]", "(", ")", "<", ">", "=", "+", "-", ";", ":", "a", "b", "c", "d", "e", "f", "g", " "],
        goalWpm: 30,
        minAccuracy: 90,
        lives: 3
      }
    ]
  },

  // =========================================================================
  // UNIT 7: SHORTCUT LAB (8 Lessons, Global #84 to #91)
  // =========================================================================
  {
    partNumber: 7,
    title: "Shortcut Lab",
    shortTitle: "Shortcut Lab",
    description: "Master essential computer keyboard shortcuts and OS chords without touching the mouse.",
    targetWpm: 25,
    lessons: [
      {
        id: "spine.p7.l84",
        part: 7,
        index: 84,
        type: "chord",
        title: "Clipboard Chords: Copy, Cut, Paste",
        description: "Ctrl+C (Copy), Ctrl+X (Cut), Ctrl+V (Paste) with left hand pinky & index.",
        isShortcut: true,
        keys: ["Ctrl", "C", "V", "X"],
        goalWpm: 20,
        minAccuracy: 90,
        text: "Ctrl+C Copy • Ctrl+X Cut • Ctrl+V Paste"
      },
      {
        id: "spine.p7.l85",
        part: 7,
        index: 85,
        type: "chord",
        title: "History Chords: Undo & Redo",
        description: "Ctrl+Z (Undo) and Ctrl+Y / Ctrl+Shift+Z (Redo).",
        isShortcut: true,
        keys: ["Ctrl", "Z", "Y"],
        goalWpm: 20,
        minAccuracy: 90,
        text: "Ctrl+Z Undo • Ctrl+Y Redo • Ctrl+Z Undo"
      },
      {
        id: "spine.p7.l86",
        part: 7,
        index: 86,
        type: "chord",
        title: "Navigation Chords: Select All & Find",
        description: "Ctrl+A (Select All) and Ctrl+F (Find in Page).",
        isShortcut: true,
        keys: ["Ctrl", "A", "F"],
        goalWpm: 20,
        minAccuracy: 90,
        text: "Ctrl+A Select All • Ctrl+F Find • Ctrl+S Save"
      },
      {
        id: "spine.p7.l87",
        part: 7,
        index: 87,
        type: "chord",
        title: "Browser Chords: Tabs & Windows",
        description: "Ctrl+T (New Tab), Ctrl+W (Close Tab), Ctrl+Tab (Next Tab).",
        isShortcut: true,
        keys: ["Ctrl", "T", "W", "Tab"],
        goalWpm: 20,
        minAccuracy: 90,
        text: "Ctrl+T New Tab • Ctrl+W Close Tab • Ctrl+Tab Switch"
      },
      {
        id: "spine.p7.l88",
        part: 7,
        index: 88,
        type: "chord",
        title: "Window Switcher: Alt+Tab Flow",
        description: "Alt+Tab (App Switcher) and Win+D / Cmd+D (Show Desktop).",
        isShortcut: true,
        keys: ["Alt", "Tab", "Win", "D"],
        goalWpm: 20,
        minAccuracy: 90,
        text: "Alt+Tab Switch Window • Win+D Show Desktop"
      },
      {
        id: "spine.p7.l89",
        part: 7,
        index: 89,
        type: "chord",
        title: "Terminal Chords: Interrupt & Clear",
        description: "Ctrl+C (SIGINT Break), Ctrl+L (Clear Screen), Ctrl+D (Exit EOF).",
        isShortcut: true,
        keys: ["Ctrl", "C", "L", "D"],
        goalWpm: 20,
        minAccuracy: 90,
        text: "Ctrl+C Break Process • Ctrl+L Clear Screen • Ctrl+D Exit"
      },
      {
        id: "spine.p7.l90",
        part: 7,
        index: 90,
        type: "checkpoint",
        title: "Checkpoint: Computer Shortcut Mastery",
        description: "Speed test for all primary OS and application keyboard chords.",
        isShortcut: true,
        keys: ["Ctrl", "Alt", "Shift", "Tab", "A", "C", "V", "Z", "F", "S"],
        goalWpm: 25,
        minAccuracy: 95,
        text: "Ctrl+A Ctrl+C Ctrl+V Ctrl+Z Ctrl+S Alt+Tab Ctrl+W Ctrl+T"
      },
      {
        id: "spine.p7.l91",
        part: 7,
        index: 91,
        type: "play",
        title: "Play: Shortcut Kitchen Boss",
        description: "Unit 7 Boss: execute fast-paced recipe shortcut orders against the clock.",
        gameId: "press-room",
        keys: ["Ctrl", "C", "V", "X", "Z", "A", "S", " "],
        goalWpm: 25,
        minAccuracy: 90,
        lives: 3
      }
    ]
  },

  // =========================================================================
  // UNIT 8: PRO WORK (6 Lessons, Global #92 to #97)
  // =========================================================================
  {
    partNumber: 8,
    title: "Pro Work & Certification",
    shortTitle: "Pro Work",
    description: "Type actual code, Git terminal workflows, Markdown documentation, and pass the Graduation Sprint.",
    targetWpm: 35,
    lessons: [
      {
        id: "spine.p8.l92",
        part: 8,
        index: 92,
        type: "practice",
        title: "Code Syntax: Functions & Return",
        description: "JavaScript & Python syntax with brackets, colons, arrows, and semicolons.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "(", ")", "{", "}", ";", ":", "=", ">", " "],
        goalWpm: 30,
        minAccuracy: 92,
        text: "function calculateScore(wpm, accuracy) { return Math.round(wpm * (accuracy / 100)); }"
      },
      {
        id: "spine.p8.l93",
        part: 8,
        index: 93,
        type: "practice",
        title: "Terminal Flow: Git & Shell Commands",
        description: "Type realistic shell commands without hesitation.",
        keys: ["g", "i", "t", "s", "t", "a", "u", "c", "o", "m", "-", "p", "u", "h", " "],
        goalWpm: 32,
        minAccuracy: 92,
        text: 'git add . && git commit -m "feat: complete touch typing journey" && git push origin main'
      },
      {
        id: "spine.p8.l94",
        part: 8,
        index: 94,
        type: "practice",
        title: "Technical Docs: Markdown Headers & Links",
        description: "Type markdown tables, links, code fences, and blockquotes.",
        keys: ["#", "[", "]", "(", ")", "`", "*", "-", ">", "|", " "],
        goalWpm: 32,
        minAccuracy: 92,
        text: "### Key Highlights\n- **Speed**: `50 WPM`\n- **Accuracy**: `98%`\n[Documentation](https://retrospeed.app)"
      },
      {
        id: "spine.p8.l95",
        part: 8,
        index: 95,
        type: "checkpoint",
        title: "The 60-Second Grand Sprint",
        description: "Final velocity challenge across mixed English prose, numbers, and code.",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", ";", " "],
        goalWpm: 40,
        minAccuracy: 94,
        text: "Touch typing transforms your computer from a slow tool into a direct extension of your thoughts."
      },
      {
        id: "spine.p8.l96",
        part: 8,
        index: 96,
        type: "play",
        title: "Play: Pit Lane Grand Prix (Graduation Race)",
        description: "The Ultimate Graduation Race: drive your retro formula car to victory at top typing speed.",
        gameId: "pit-lane",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "],
        goalWpm: 35,
        minAccuracy: 92,
        lives: 3
      },
      {
        id: "spine.p8.l97",
        part: 8,
        index: 97,
        type: "checkpoint",
        title: "Grand Graduation Certification",
        description: "Complete certification exam: 97 lessons conquered. Touch typing mastery achieved!",
        keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", " "],
        goalWpm: 45,
        minAccuracy: 95,
        text: "Congratulations! You have completed the RETROSPEED Zero-to-Hero Spine. Your fingers race like a pro."
      }
    ]
  }
];

// Helper: Get lesson by global index (1..97) or ID
export function getSpineLesson(idOrIndex) {
  for (const part of SPINE_PARTS) {
    for (const lesson of part.lessons) {
      if (lesson.id === idOrIndex || lesson.index === Number(idOrIndex)) {
        return { ...lesson, partTitle: part.title };
      }
    }
  }
  return null;
}

// Helper: Get next lesson in sequence or first uncompleted from userProgress
export function getNextSpineLesson(userProgressOrCurrentId) {
  if (userProgressOrCurrentId && typeof userProgressOrCurrentId === 'object') {
    const scores = userProgressOrCurrentId.courses?.spine?.scores || {};
    for (const part of SPINE_PARTS) {
      for (const lesson of part.lessons) {
        if (!scores[lesson.id]?.completed) {
          return { part, lesson, partTitle: part.title };
        }
      }
    }
    return { part: SPINE_PARTS[0], lesson: SPINE_PARTS[0].lessons[0], partTitle: SPINE_PARTS[0].title };
  }

  let foundCurrent = false;
  for (const part of SPINE_PARTS) {
    for (const lesson of part.lessons) {
      if (foundCurrent) {
        return { part, lesson, partTitle: part.title };
      }
      if (lesson.id === userProgressOrCurrentId) {
        foundCurrent = true;
      }
    }
  }
  return null;
}

// Total lesson count across all parts
export const TOTAL_SPINE_LESSONS = SPINE_PARTS.reduce((acc, p) => acc + p.lessons.length, 0);
