// Authentic EdClub Achievements & Badges Registry
// 24 Authentic Achievements across 5 Categories

export const ACHIEVEMENT_CATEGORIES = [
  { id: 'all', label: 'All Badges', countKey: 'all' },
  { id: 'speed', label: 'Speed', countKey: 'speed' },
  { id: 'accuracy', label: 'Accuracy', countKey: 'accuracy' },
  { id: 'streaks', label: 'Streaks', countKey: 'streaks' },
  { id: 'arcade', label: 'Arcade', countKey: 'arcade' },
  { id: 'mastery', label: 'Mastery', countKey: 'mastery' }
];

export const ACHIEVEMENTS = [
  // ==========================================
  // 1. SPEED BADGES (5)
  // ==========================================
  {
    id: 'swift-fingers',
    title: 'Swift Fingers',
    subtitle: '15 WPM Speed',
    category: 'speed',
    categoryLabel: 'Speed Badges',
    targetValue: 15,
    unit: 'WPM',
    rarity: 'Common',
    rarityColor: 'emerald',
    xp: 100,
    requirement: 'Achieve a typing speed of 15 WPM on any completed lesson.',
    lore: 'The journey of ten thousand words begins with a single swift keystroke. Your fingers are learning the foundational rhythm of the keyboard.',
    courseShortcut: 'typing-jungle',
    targetLevel: 1,
    metricKey: 'maxWpm'
  },
  {
    id: 'velocity-typist',
    title: 'Velocity Typist',
    subtitle: '30 WPM Speed',
    category: 'speed',
    categoryLabel: 'Speed Badges',
    targetValue: 30,
    unit: 'WPM',
    rarity: 'Uncommon',
    rarityColor: 'sky',
    xp: 250,
    requirement: 'Achieve a typing speed of 30 WPM on any completed lesson.',
    lore: 'Breaking through everyday casual typing into conversational fluency. You can now type at the same pace as ordinary speaking conversation.',
    courseShortcut: 'typing-jungle',
    targetLevel: 5,
    metricKey: 'maxWpm'
  },
  {
    id: 'turbo-touch',
    title: 'Turbo Touch',
    subtitle: '50 WPM Speed',
    category: 'speed',
    categoryLabel: 'Speed Badges',
    targetValue: 50,
    unit: 'WPM',
    rarity: 'Rare',
    rarityColor: 'indigo',
    xp: 500,
    requirement: 'Reach a blazing speed of 50 WPM on any completed lesson.',
    lore: 'Pure muscle memory in action. Your fingers fly effortlessly across the keys without looking down at the keyboard.',
    courseShortcut: 'typing-jungle',
    targetLevel: 15,
    metricKey: 'maxWpm'
  },
  {
    id: 'sonic-keystrokes',
    title: 'Sonic Keystrokes',
    subtitle: '70 WPM Speed',
    category: 'speed',
    categoryLabel: 'Speed Badges',
    targetValue: 70,
    unit: 'WPM',
    rarity: 'Epic',
    rarityColor: 'purple',
    xp: 1000,
    requirement: 'Surpass 70 WPM on any rigorous touch typing test.',
    lore: 'Breaking the sound barrier of touch typing. Words materialize on the screen as fast as thoughts form in your conscious mind.',
    courseShortcut: 'typing-jungle',
    targetLevel: 25,
    metricKey: 'maxWpm'
  },
  {
    id: 'light-speed-master',
    title: 'Light Speed Master',
    subtitle: '100 WPM Speed',
    category: 'speed',
    categoryLabel: 'Speed Badges',
    targetValue: 100,
    unit: 'WPM',
    rarity: 'Mythic',
    rarityColor: 'gold',
    xp: 2500,
    requirement: 'Reach the elite world-class threshold of 100+ Words Per Minute.',
    lore: 'A true typing virtuoso. You belong to the top tier of typists globally, moving with blinding speed and supreme confidence.',
    courseShortcut: 'typing-jungle',
    targetLevel: 50,
    metricKey: 'maxWpm'
  },

  // ==========================================
  // 2. ACCURACY BADGES (3)
  // ==========================================
  {
    id: 'sharp-shooter',
    title: 'Sharp Shooter',
    subtitle: '95% Accuracy',
    category: 'accuracy',
    categoryLabel: 'Accuracy Badges',
    targetValue: 95,
    unit: '%',
    rarity: 'Common',
    rarityColor: 'emerald',
    xp: 150,
    requirement: 'Complete any lesson with at least 95% typing accuracy.',
    lore: 'Precision over haste. Every keypress hits its mark with steady, measured discipline and minimal backspaces.',
    courseShortcut: 'typing-jungle',
    targetLevel: 1,
    metricKey: 'maxAccuracy'
  },
  {
    id: 'bullseye',
    title: 'Bullseye',
    subtitle: '98% Accuracy',
    category: 'accuracy',
    categoryLabel: 'Accuracy Badges',
    targetValue: 98,
    unit: '%',
    rarity: 'Rare',
    rarityColor: 'sky',
    xp: 400,
    requirement: 'Complete any lesson with pinpoint 98% or higher accuracy.',
    lore: 'Near-flawless execution. Your typing cadence is crisp, your error rate is nearly non-existent.',
    courseShortcut: 'typing-jungle',
    targetLevel: 3,
    metricKey: 'maxAccuracy'
  },
  {
    id: 'absolute-perfection',
    title: 'Absolute Perfection',
    subtitle: '100% Accuracy on 5+ Lessons',
    category: 'accuracy',
    categoryLabel: 'Accuracy Badges',
    targetValue: 5,
    unit: 'Lessons',
    rarity: 'Legendary',
    rarityColor: 'gold',
    xp: 1200,
    requirement: 'Achieve 100% spotless accuracy across 5 or more distinct lessons.',
    lore: 'Total mastery of touch typing discipline. Not a single errant keystroke across multiple rigorous exercises.',
    courseShortcut: 'typing-jungle',
    targetLevel: 5,
    metricKey: 'perfectLessons'
  },

  // ==========================================
  // 3. CONSISTENCY & STREAKS (4)
  // ==========================================
  {
    id: 'dedicated-learner',
    title: 'Dedicated Learner',
    subtitle: '3-Day Streak',
    category: 'streaks',
    categoryLabel: 'Consistency & Streaks',
    targetValue: 3,
    unit: 'Days',
    rarity: 'Common',
    rarityColor: 'emerald',
    xp: 200,
    requirement: 'Practice typing for 3 consecutive days.',
    lore: 'Great habits are formed through steady daily commitment. You have established the cadence of regular practice.',
    courseShortcut: 'typing-jungle',
    targetLevel: 1,
    metricKey: 'streakDays'
  },
  {
    id: 'weekly-warrior',
    title: 'Weekly Warrior',
    subtitle: '7-Day Streak',
    category: 'streaks',
    categoryLabel: 'Consistency & Streaks',
    targetValue: 7,
    unit: 'Days',
    rarity: 'Rare',
    rarityColor: 'amber',
    xp: 600,
    requirement: 'Maintain an unbroken 7-day typing streak.',
    lore: 'A full week of dedicated practice! Rain or shine, your dedication to muscle memory never wavers.',
    courseShortcut: 'typing-jungle',
    targetLevel: 2,
    metricKey: 'streakDays'
  },
  {
    id: 'touch-typing-legend',
    title: 'Touch Typing Legend',
    subtitle: '30-Day Streak',
    category: 'streaks',
    categoryLabel: 'Consistency & Streaks',
    targetValue: 30,
    unit: 'Days',
    rarity: 'Mythic',
    rarityColor: 'gold',
    xp: 2000,
    requirement: 'Maintain an unstoppable 30-day streak of daily practice.',
    lore: 'A full month of continuous dedication. Touch typing is no longer just a skill—it is second nature ingrained in your mind.',
    courseShortcut: 'typing-jungle',
    targetLevel: 10,
    metricKey: 'streakDays'
  },
  {
    id: 'marathon-typist',
    title: 'Marathon Typist',
    subtitle: '1+ Hour Practice',
    category: 'streaks',
    categoryLabel: 'Consistency & Streaks',
    targetValue: 60,
    unit: 'Minutes',
    rarity: 'Epic',
    rarityColor: 'purple',
    xp: 800,
    requirement: 'Accumulate 60 or more minutes of total focused keyboard practice.',
    lore: 'Endurance that rivals marathon runners. You have spent over an hour refining every finger on the home row.',
    courseShortcut: 'typing-jungle',
    targetLevel: 5,
    metricKey: 'practiceMinutes'
  },

  // ==========================================
  // 4. ARCADE CHAMPIONS (5)
  // ==========================================
  {
    id: 'balloon-ninja-slicer',
    title: 'Balloon Ninja Slicer',
    subtitle: 'Complete 5 Balloon Games',
    category: 'arcade',
    categoryLabel: 'Arcade Champions',
    targetValue: 5,
    unit: 'Games',
    rarity: 'Uncommon',
    rarityColor: 'sky',
    xp: 350,
    requirement: 'Complete 5 Balloon Ninja arcade challenges without letting words float away.',
    lore: 'Slice like the wind! Your rapid finger strikes pop airborne balloons before they reach the stratosphere.',
    courseShortcut: 'typing-jungle',
    targetLevel: 4,
    metricKey: 'balloonGames'
  },
  {
    id: 'planetary-defender',
    title: 'Planetary Defender',
    subtitle: 'Defeat 10 Alien Waves',
    category: 'arcade',
    categoryLabel: 'Arcade Champions',
    targetValue: 10,
    unit: 'Waves',
    rarity: 'Rare',
    rarityColor: 'indigo',
    xp: 500,
    requirement: 'Defeat 10 alien attack waves in Monster Attack space defense.',
    lore: "Earth's frontline guardian. Your rapid laser keystrokes vaporize invading alien armadas before they breach orbit.",
    courseShortcut: 'typing-jungle',
    targetLevel: 8,
    metricKey: 'monsterWaves'
  },
  {
    id: 'pharaohs-scribe',
    title: "Pharaoh's Scribe",
    subtitle: 'Break 20 Temple Runes',
    category: 'arcade',
    categoryLabel: 'Arcade Champions',
    targetValue: 20,
    unit: 'Runes',
    rarity: 'Epic',
    rarityColor: 'amber',
    xp: 750,
    requirement: 'Bash and solve 20 ancient stone hieroglyphs in Temple Bash.',
    lore: 'Deciphering the lost hieroglyphs of antiquity. Your hammer strikes true on every sacred monument.',
    courseShortcut: 'typing-jungle',
    targetLevel: 12,
    metricKey: 'templeRunes'
  },
  {
    id: 'deep-sea-diver',
    title: 'Deep Sea Diver',
    subtitle: 'Pop 25 Bubbles',
    category: 'arcade',
    categoryLabel: 'Arcade Champions',
    targetValue: 25,
    unit: 'Bubbles',
    rarity: 'Rare',
    rarityColor: 'cyan',
    xp: 450,
    requirement: 'Pop 25 submerged word bubbles in Floating Bubbles deep oceanic trench.',
    lore: 'Navigating the ocean depths with submarine precision. Underwater currents are no match for your calm fingers.',
    courseShortcut: 'typing-jungle',
    targetLevel: 16,
    metricKey: 'bubblesPopped'
  },
  {
    id: 'orchard-master',
    title: 'Orchard Master',
    subtitle: 'Harvest 50 Apples',
    category: 'arcade',
    categoryLabel: 'Arcade Champions',
    targetValue: 50,
    unit: 'Apples',
    rarity: 'Epic',
    rarityColor: 'rose',
    xp: 700,
    requirement: 'Harvest and protect 50 ripe apples in Apple Thieves orchard defense.',
    lore: 'The bountiful harvest is secured! Raccoons and thieves scramble away empty-handed from your lightning reflexes.',
    courseShortcut: 'typing-jungle',
    targetLevel: 20,
    metricKey: 'applesHarvested'
  },

  // ==========================================
  // 5. CURRICULUM MASTERY (7)
  // ==========================================
  {
    id: 'home-row-hero',
    title: 'Home Row Hero',
    subtitle: 'Master Home Row Keys',
    category: 'mastery',
    categoryLabel: 'Curriculum Mastery',
    targetValue: 8,
    unit: 'Lessons',
    rarity: 'Common',
    rarityColor: 'emerald',
    xp: 200,
    requirement: 'Complete all foundational Home Row lessons (F, J, D, K, S, L, A, ;).',
    lore: 'The sacred anchor of all touch typing. Your fingers rest naturally on the tactile bumps of F and J.',
    courseShortcut: 'keystroke-foundations',
    targetLevel: 1,
    metricKey: 'homeRowLessons'
  },
  {
    id: 'full-alphabet-master',
    title: 'Full Alphabet Master',
    subtitle: 'All 26 Alphabet Keys',
    category: 'mastery',
    categoryLabel: 'Curriculum Mastery',
    targetValue: 26,
    unit: 'Keys',
    rarity: 'Rare',
    rarityColor: 'sky',
    xp: 800,
    requirement: 'Successfully unlock and master lessons covering all 26 letters from A to Z.',
    lore: 'The complete English alphabet is at your command. No character escapes your mental keyboard map.',
    courseShortcut: 'keycraft-odyssey',
    targetLevel: 50,
    metricKey: 'alphabetKeys'
  },
  {
    id: 'code-typing-prodigy',
    title: 'Code Typing Prodigy',
    subtitle: 'Programming Syntax',
    category: 'mastery',
    categoryLabel: 'Curriculum Mastery',
    targetValue: 10,
    unit: 'Lessons',
    rarity: 'Epic',
    rarityColor: 'purple',
    xp: 1000,
    requirement: 'Complete 10 coding lessons featuring braces, brackets, and camelCase syntax.',
    lore: 'Speaking the native tongue of software. Curly braces, semicolons, and operators flow effortlessly from your fingertips.',
    courseShortcut: 'syntax-forge',
    targetLevel: 1,
    metricKey: 'codeLessons'
  },
  {
    id: 'detective-inspector',
    title: 'Detective Inspector',
    subtitle: 'Mystery Stories',
    category: 'mastery',
    categoryLabel: 'Curriculum Mastery',
    targetValue: 5,
    unit: 'Cases',
    rarity: 'Rare',
    rarityColor: 'amber',
    xp: 600,
    requirement: 'Type through and solve 5 detective investigative mystery chapters.',
    lore: 'Elementary, my dear typist! You piece together clues and uncover mysteries one sentence at a time.',
    courseShortcut: 'chronicles-of-mystery',
    targetLevel: 1,
    metricKey: 'detectiveLessons'
  },
  {
    id: 'music-maestro',
    title: 'Music Maestro',
    subtitle: 'Rhythm & Tempo',
    category: 'mastery',
    categoryLabel: 'Curriculum Mastery',
    targetValue: 5,
    unit: 'Lessons',
    rarity: 'Epic',
    rarityColor: 'rose',
    xp: 750,
    requirement: 'Master 5 musical typing tracks with steady cadence and metronome precision.',
    lore: 'Typing is music in motion. Your keystrokes create a symphonic rhythm that flows in melodic harmony.',
    courseShortcut: 'symphony-keys',
    targetLevel: 1,
    metricKey: 'musicLessons'
  },
  {
    id: 'number-row-champion',
    title: 'Number Row Champion',
    subtitle: 'Top Row & Symbols',
    category: 'mastery',
    categoryLabel: 'Curriculum Mastery',
    targetValue: 10,
    unit: 'Lessons',
    rarity: 'Rare',
    rarityColor: 'indigo',
    xp: 850,
    requirement: 'Master 10 top row lessons featuring numbers 0-9 and Shift symbols (!@#$%^&*).',
    lore: 'Reaching the summit of the keyboard without hesitation. Numbers and special characters are second nature.',
    courseShortcut: 'keycraft-odyssey',
    targetLevel: 60,
    metricKey: 'numberLessons'
  },
  {
    id: 'typing-jungle-grandmaster',
    title: 'KeyCraft Grandmaster',
    subtitle: 'The Ultimate Summit',
    category: 'mastery',
    categoryLabel: 'Curriculum Mastery',
    targetValue: 100,
    unit: 'Stars',
    rarity: 'Mythic',
    rarityColor: 'gold',
    xp: 5000,
    requirement: 'Advance deep into the KeyCraft Odyssey journey and collect 100+ total stars.',
    lore: 'The supreme rank of the typing realm. You stand atop the summit of KeyCraft as an undisputed grandmaster.',
    courseShortcut: 'keycraft-odyssey',
    targetLevel: 100,
    metricKey: 'totalStars'
  }
];

/**
 * Computes dynamic metrics and achievement progress from userProgress state.
 */
export function evaluateAchievements(userProgress = {}) {
  const courses = userProgress.courses || {};
  
  // 1. Calculate base metrics across all courses
  let maxWpm = Math.max(0, Number(userProgress.maxWpm) || 0);
  let maxAccuracy = Math.max(0, Number(userProgress.maxAccuracy) || 0);
  let perfectLessons = Math.max(0, Number(userProgress.perfectLessons) || 0);
  let totalLessonsCompleted = 0;
  let totalStars = Math.max(0, Number(userProgress.totalStars) || 0);
  let totalPoints = Math.max(0, Number(userProgress.totalPoints) || 0);
  let totalTimeSeconds = Math.max(0, Number(userProgress.totalTimeSeconds) || 0);

  Object.values(courses).forEach(c => {
    totalStars += Math.max(0, Number(c.totalStars) || 0);
    totalPoints += Math.max(0, Number(c.totalPoints) || 0);
    totalTimeSeconds += Math.max(0, Number(c.totalTimeSeconds) || 0);
    const scores = c.scores || {};
    const lessonIds = Object.keys(scores);
    totalLessonsCompleted += lessonIds.length;

    lessonIds.forEach(id => {
      const s = scores[id];
      if (s) {
        const w = Number(s.wpm || 0);
        const a = Number(s.accuracy ?? 0);
        if (w > maxWpm) maxWpm = w;
        if (a > maxAccuracy) maxAccuracy = a;
        if (a >= 100 && s.completed) perfectLessons += 1;
      }
    });
  });

  // Scan historical attempt logs
  if (Array.isArray(userProgress.attemptLogs)) {
    userProgress.attemptLogs.forEach(att => {
      const w = Number(att.wpm || 0);
      const a = Number(att.accuracy ?? 0);
      if (w > maxWpm) maxWpm = w;
      if (a > maxAccuracy) maxAccuracy = a;
    });
  }

  const streakDays = Math.max(0, Number(userProgress.streakDays ?? userProgress.streak ?? (totalLessonsCompleted > 0 ? 1 : 0)));
  const practiceMinutes = userProgress.practiceMinutes !== undefined 
    ? Math.max(0, Number(userProgress.practiceMinutes) || 0) 
    : Math.max(0, Math.round(totalTimeSeconds / 60));

  const arcade = userProgress.arcadeStats || {};
  const balloonGames = Math.max(0, Number(arcade.balloonGames ?? userProgress.balloonGames ?? 0));
  const monsterWaves = Math.max(0, Number(arcade.monsterWaves ?? userProgress.monsterWaves ?? 0));
  const templeRunes = Math.max(0, Number(arcade.templeRunes ?? userProgress.templeRunes ?? 0));
  const bubblesPopped = Math.max(0, Number(arcade.bubblesPopped ?? userProgress.bubblesPopped ?? 0));
  const applesHarvested = Math.max(0, Number(arcade.applesHarvested ?? userProgress.applesHarvested ?? 0));

  const odysseyCourse = courses['keycraft-odyssey'] || courses['typing-jungle'] || {};
  const syntaxCourse = courses['syntax-forge'] || courses['code-typing'] || {};
  const mysteryCourse = courses['chronicles-of-mystery'] || courses['mystery-detective'] || {};
  const musicCourse = courses['symphony-keys'] || courses['music-theory'] || {};

  const mastery = userProgress.masteryStats || {};
  const homeRowLessons = Math.max(0, Number(
    mastery.homeRowLessons ?? userProgress.homeRowLessons ?? (Object.keys(odysseyCourse.scores || {}).filter(id => Number(id) <= 8).length)
  ));
  const alphabetKeys = Math.max(0, Number(
    mastery.alphabetKeys ?? userProgress.alphabetKeys ?? (userProgress.keyStats ? Object.keys(userProgress.keyStats).filter(k => /^[a-z]$/i.test(k) && (((userProgress.keyStats[k].hits || 0) > 0) || ((userProgress.keyStats[k].misses || 0) > 0))).length : 0)
  ));
  const codeLessons = Math.max(0, Number(
    mastery.codeLessons ?? userProgress.codeLessons ?? (Object.keys(syntaxCourse.scores || {}).length)
  ));
  const detectiveLessons = Math.max(0, Number(
    mastery.detectiveLessons ?? userProgress.detectiveLessons ?? (Object.keys(mysteryCourse.scores || {}).length)
  ));
  const musicLessons = Math.max(0, Number(
    mastery.musicLessons ?? userProgress.musicLessons ?? (Object.keys(musicCourse.scores || {}).length)
  ));
  const numberLessons = Math.max(0, Number(
    mastery.numberLessons ?? userProgress.numberLessons ?? (Object.keys(odysseyCourse.scores || {}).filter(id => Number(id) >= 20).length)
  ));

  const metricMap = {
    maxWpm,
    maxAccuracy,
    perfectLessons,
    streakDays,
    practiceMinutes,
    balloonGames,
    monsterWaves,
    templeRunes,
    bubblesPopped,
    applesHarvested,
    homeRowLessons,
    alphabetKeys,
    codeLessons,
    detectiveLessons,
    musicLessons,
    numberLessons,
    totalStars
  };

  // Custom manual unlock overrides if stored
  const customUnlocked = userProgress.unlockedBadgeIds || [];

  // Evaluate each achievement
  let totalUnlocked = 0;
  let earnedXp = 0;
  let totalPossibleXp = 0;

  const categoryCounts = {
    all: { total: ACHIEVEMENTS.length, unlocked: 0 },
    speed: { total: 0, unlocked: 0 },
    accuracy: { total: 0, unlocked: 0 },
    streaks: { total: 0, unlocked: 0 },
    arcade: { total: 0, unlocked: 0 },
    mastery: { total: 0, unlocked: 0 }
  };

  const enrichedAchievements = ACHIEVEMENTS.map((badge, index) => {
    const rawVal = Math.max(0, Number(metricMap[badge.metricKey] ?? 0));
    const target = Math.max(1, Number(badge.targetValue) || 1);
    const isManuallyUnlocked = customUnlocked.includes(badge.id);
    const isStatUnlocked = rawVal >= target;
    const isUnlocked = isStatUnlocked || isManuallyUnlocked;

    const currentVal = isUnlocked ? target : Math.min(target, rawVal);
    const progressPercent = Math.min(100, Math.max(0, Math.round((currentVal / target) * 100)));

    // Calculate simulated or stored unlock date
    let unlockDate = null;
    if (isUnlocked) {
      const storedDate = userProgress.earnedBadgeDates?.[badge.id];
      if (storedDate) {
        unlockDate = storedDate;
      } else {
        const daysAgo = Math.max(1, (ACHIEVEMENTS.length - index) % 7 + 1);
        const d = new Date('2026-08-31');
        d.setDate(d.getDate() - daysAgo);
        unlockDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      totalUnlocked += 1;
      earnedXp += badge.xp;
    }

    totalPossibleXp += badge.xp;

    // Track category counts
    if (categoryCounts[badge.category]) {
      categoryCounts[badge.category].total += 1;
      if (isUnlocked) categoryCounts[badge.category].unlocked += 1;
    }
    if (isUnlocked) categoryCounts.all.unlocked += 1;

    return {
      ...badge,
      currentValue: currentVal,
      isUnlocked,
      unlockDate,
      progressPercent,
      remaining: Math.max(0, target - currentVal)
    };
  });

  // Calculate overall completion percent clamped [0, 100]
  const completionPercent = ACHIEVEMENTS.length > 0 ? Math.min(100, Math.max(0, Math.round((totalUnlocked / ACHIEVEMENTS.length) * 100))) : 0;

  // Find Next Upcoming Badge (the locked badge with highest progress percentage < 100)
  const lockedBadges = enrichedAchievements.filter(b => !b.isUnlocked);
  lockedBadges.sort((a, b) => b.progressPercent - a.progressPercent);
  const nextUpcomingBadge = lockedBadges[0] || null;

  // Rank Tier based on unlock count
  let rankTitle = 'Novice Keyboardist';
  let rankTier = 'Bronze';
  if (totalUnlocked >= 20) {
    rankTitle = 'Typing Jungle Grandmaster';
    rankTier = 'Mythic';
  } else if (totalUnlocked >= 15) {
    rankTitle = 'Legendary Touch Virtuoso';
    rankTier = 'Legendary';
  } else if (totalUnlocked >= 10) {
    rankTitle = 'High-Speed Scribe';
    rankTier = 'Epic';
  } else if (totalUnlocked >= 5) {
    rankTitle = 'Jungle Explorer Typist';
    rankTier = 'Rare';
  }

  return {
    achievements: enrichedAchievements,
    totalUnlocked,
    totalBadges: ACHIEVEMENTS.length,
    completionPercent,
    earnedXp,
    totalPossibleXp,
    nextUpcomingBadge,
    rankTitle,
    rankTier,
    categoryCounts
  };
}
