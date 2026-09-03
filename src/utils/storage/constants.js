// RETROSPEED Storage Constants & Mappings

export const STORAGE_KEY = 'retrospeed_user_v1';

// Standard 47 typing keys for keyboard coverage calculation
export const STANDARD_TYPING_KEYS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  '-', '=', '[', ']', ';', "'", ',', '.', '/', '`', ' '
];

// Key to finger and hand mapping for problem key analysis
export const KEY_FINGER_MAPPING = {
  'q': { finger: 'Left Pinky', hand: 'Left' },
  'a': { finger: 'Left Pinky', hand: 'Left' },
  'z': { finger: 'Left Pinky', hand: 'Left' },
  '1': { finger: 'Left Pinky', hand: 'Left' },
  '`': { finger: 'Left Pinky', hand: 'Left' },
  'w': { finger: 'Left Ring', hand: 'Left' },
  's': { finger: 'Left Ring', hand: 'Left' },
  'x': { finger: 'Left Ring', hand: 'Left' },
  '2': { finger: 'Left Ring', hand: 'Left' },
  'e': { finger: 'Left Middle', hand: 'Left' },
  'd': { finger: 'Left Middle', hand: 'Left' },
  'c': { finger: 'Left Middle', hand: 'Left' },
  '3': { finger: 'Left Middle', hand: 'Left' },
  'r': { finger: 'Left Index', hand: 'Left' },
  'f': { finger: 'Left Index (Home)', hand: 'Left' },
  'v': { finger: 'Left Index', hand: 'Left' },
  't': { finger: 'Left Index', hand: 'Left' },
  'g': { finger: 'Left Index', hand: 'Left' },
  'b': { finger: 'Left Index', hand: 'Left' },
  '4': { finger: 'Left Index', hand: 'Left' },
  '5': { finger: 'Left Index', hand: 'Left' },
  'y': { finger: 'Right Index', hand: 'Right' },
  'h': { finger: 'Right Index', hand: 'Right' },
  'n': { finger: 'Right Index', hand: 'Right' },
  'u': { finger: 'Right Index', hand: 'Right' },
  'j': { finger: 'Right Index (Home)', hand: 'Right' },
  'm': { finger: 'Right Index', hand: 'Right' },
  '6': { finger: 'Right Index', hand: 'Right' },
  '7': { finger: 'Right Index', hand: 'Right' },
  'i': { finger: 'Right Middle', hand: 'Right' },
  'k': { finger: 'Right Middle', hand: 'Right' },
  ',': { finger: 'Right Middle', hand: 'Right' },
  '8': { finger: 'Right Middle', hand: 'Right' },
  'o': { finger: 'Right Ring', hand: 'Right' },
  'l': { finger: 'Right Ring', hand: 'Right' },
  '.': { finger: 'Right Ring', hand: 'Right' },
  '9': { finger: 'Right Ring', hand: 'Right' },
  'p': { finger: 'Right Pinky', hand: 'Right' },
  ';': { finger: 'Right Pinky', hand: 'Right' },
  '/': { finger: 'Right Pinky', hand: 'Right' },
  '0': { finger: 'Right Pinky', hand: 'Right' },
  '-': { finger: 'Right Pinky', hand: 'Right' },
  '=': { finger: 'Right Pinky', hand: 'Right' },
  '[': { finger: 'Right Pinky', hand: 'Right' },
  ']': { finger: 'Right Pinky', hand: 'Right' },
  "'": { finger: 'Right Pinky', hand: 'Right' },
  ' ': { finger: 'Thumb', hand: 'Both' }
};

export const PLAYER_AVATARS = [
  { id: 'ninja', icon: '🥷', label: 'Ninja', bg: '#F28B82' },
  { id: 'hacker', icon: '💻', label: 'Hacker', bg: '#48B89F' },
  { id: 'racer', icon: '🏎️', label: 'Racer', bg: '#F6C445' },
  { id: 'robot', icon: '🤖', label: 'Robot', bg: '#4BA3E3' },
  { id: 'wizard', icon: '🧙', label: 'Wizard', bg: '#C3A6E8' },
  { id: 'diver', icon: '🤿', label: 'Diver', bg: '#70B9D9' },
  { id: 'tiger', icon: '🐯', label: 'Tiger', bg: '#F6C445' },
  { id: 'raccoon', icon: '🦝', label: 'Raccoon', bg: '#FAF3E0' },
  { id: 'star', icon: '⭐', label: 'Star', bg: '#F6C445' }
];

export const LEVEL_TIERS = [
  { minLevel: 1, maxLevel: 4, title: 'Novice Typist', badge: 'Tier 1' },
  { minLevel: 5, maxLevel: 9, title: 'Velocity Racer', badge: 'Tier 2' },
  { minLevel: 10, maxLevel: 19, title: 'Typing Grandmaster', badge: 'Tier 3' },
  { minLevel: 20, maxLevel: 99, title: 'Arcade Legend', badge: 'Tier 4' }
];
