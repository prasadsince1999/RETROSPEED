// RETROSPEED Accuracy Badges (3)
export const ACCURACY_BADGES = [
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
    courseShortcut: 'keystroke-foundations',
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
    courseShortcut: 'keystroke-foundations',
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
    courseShortcut: 'keystroke-foundations',
    targetLevel: 5,
    metricKey: 'perfectLessons'
  }
];
