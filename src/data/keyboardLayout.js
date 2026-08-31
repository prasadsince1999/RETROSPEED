// Universal Multi-Layout Keyboard schema for QWERTY, Dvorak, and Colemak
// Exact SVG paths, physical key IDs, finger assignments, and coordinates

export const FINGER_ZONES = {
  'left-pinky': { color: '#ec4899', light: '#fdf2f8', label: 'Left Pinky' },
  'left-ring': { color: '#f59e0b', light: '#fffbeb', label: 'Left Ring' },
  'left-middle': { color: '#10b981', light: '#ecfdf5', label: 'Left Middle' },
  'left-index': { color: '#1888ff', light: '#eff6ff', label: 'Left Index' },
  'thumbs': { color: '#8b5cf6', light: '#f5f3ff', label: 'Thumb' },
  'right-index': { color: '#1888ff', light: '#eff6ff', label: 'Right Index' },
  'right-middle': { color: '#10b981', light: '#ecfdf5', label: 'Right Middle' },
  'right-ring': { color: '#f59e0b', light: '#fffbeb', label: 'Right Ring' },
  'right-pinky': { color: '#ec4899', light: '#fdf2f8', label: 'Right Pinky' }
};

export const BASE_KEY_SLOTS = [
  // Row 1 (Numbers)
  { id: 'tilda', row: 1, finger: 'left-pinky', hand: 'left', cx: 37, cy: 36, d: 'M58.4,53.7c0,1.7-1.4,3-3,3H18.9c-1.6,0-3-1.3-3-3V18.3c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V53.7z' },
  { id: 'key-1', row: 1, finger: 'left-pinky', hand: 'left', cx: 82, cy: 36, d: 'M103.4,53.7c0,1.7-1.3,3-3,3H63.9c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z' },
  { id: 'key-2', row: 1, finger: 'left-ring', hand: 'left', cx: 127, cy: 36, d: 'M148.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V53.7z' },
  { id: 'key-3', row: 1, finger: 'left-middle', hand: 'left', cx: 172, cy: 36, d: 'M193.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V53.7z' },
  { id: 'key-4', row: 1, finger: 'left-index', hand: 'left', cx: 217, cy: 36, d: 'M238.4,53.7c0,1.7-1.4,3-3,3H199c-1.7,0-3-1.3-3-3V18.3c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V53.7z' },
  { id: 'key-5', row: 1, finger: 'left-index', hand: 'left', cx: 262, cy: 36, d: 'M283.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.7,1.3-3,3-3h36.5c1.7,0,3,1.3,3,3V53.7z' },
  { id: 'key-6', row: 1, finger: 'right-index', hand: 'right', cx: 307, cy: 36, d: 'M328.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.7,1.4-3,3-3h36.5c1.7,0,3,1.3,3,3V53.7z' },
  { id: 'key-7', row: 1, finger: 'right-index', hand: 'right', cx: 352, cy: 36, d: 'M373.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z' },
  { id: 'key-8', row: 1, finger: 'right-middle', hand: 'right', cx: 397, cy: 36, d: 'M418.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z' },
  { id: 'key-9', row: 1, finger: 'right-ring', hand: 'right', cx: 442, cy: 36, d: 'M463.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z' },
  { id: 'key-0', row: 1, finger: 'right-pinky', hand: 'right', cx: 487, cy: 36, d: 'M508.4,53.7c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3V18.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V53.7z' },
  { id: 'minus', row: 1, finger: 'right-pinky', hand: 'right', cx: 532, cy: 36, d: 'M553.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V53.7z' },
  { id: 'equal', row: 1, finger: 'right-pinky', hand: 'right', cx: 577, cy: 36, d: 'M598.4,53.7c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V53.7z' },
  { id: 'backspace', label: '⌫', shiftLabel: 'backspace', row: 1, finger: 'right-pinky', hand: 'right', cx: 635, cy: 36, d: 'M668.8,53.7c0,1.7-1.3,3-3,3h-61.9c-1.7,0-3-1.3-3-3V18.3c0-1.6,1.3-3,3-3h61.9c1.7,0,3,1.4,3,3V53.7z' },

  // Row 2 (Top Row)
  { id: 'tab', label: 'tab', row: 2, finger: 'left-pinky', hand: 'left', cx: 48, cy: 80, d: 'M81.7,97.6c0,1.6-1.3,3-3,3H18.9c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.3-3,3-3h59.8c1.7,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-1', row: 2, finger: 'left-pinky', hand: 'left', cx: 105, cy: 80, d: 'M126.7,97.6c0,1.6-1.3,3-3,3H87.2c-1.7,0-3-1.4-3-3V62.3c0-1.6,1.3-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-2', row: 2, finger: 'left-ring', hand: 'left', cx: 150, cy: 80, d: 'M171.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-3', row: 2, finger: 'left-middle', hand: 'left', cx: 195, cy: 80, d: 'M216.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.7,1.4-3,3-3h36.5c1.7,0,3,1.3,3,3V97.6z' },
  { id: 'pos-2-4', row: 2, finger: 'left-index', hand: 'left', cx: 240, cy: 80, d: 'M261.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-5', row: 2, finger: 'left-index', hand: 'left', cx: 285, cy: 80, d: 'M306.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-6', row: 2, finger: 'right-index', hand: 'right', cx: 330, cy: 80, d: 'M351.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-7', row: 2, finger: 'right-index', hand: 'right', cx: 375, cy: 80, d: 'M396.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-8', row: 2, finger: 'right-middle', hand: 'right', cx: 420, cy: 80, d: 'M441.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-9', row: 2, finger: 'right-ring', hand: 'right', cx: 465, cy: 80, d: 'M486.7,97.6c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-10', row: 2, finger: 'right-pinky', hand: 'right', cx: 510, cy: 80, d: 'M531.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-11', row: 2, finger: 'right-pinky', hand: 'right', cx: 555, cy: 80, d: 'M576.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-12', row: 2, finger: 'right-pinky', hand: 'right', cx: 600, cy: 80, d: 'M621.7,97.6c0,1.6-1.3,3-3,3h-36.5c-1.6,0-3-1.4-3-3V62.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V97.6z' },
  { id: 'pos-2-13', row: 2, finger: 'right-pinky', hand: 'right', cx: 646, cy: 80, d: 'M668.8,97.6c0,1.6-1.3,3-3,3h-38.6c-1.6,0-3-1.4-3-3V62.4c0-1.6,1.4-3,3-3h38.6c1.7,0,3,1.4,3,3V97.6z' },

  // Row 3 (Home Row)
  { id: 'capslock', label: 'caps', row: 3, finger: 'left-pinky', hand: 'left', cx: 53, cy: 124, d: 'M92.4,141.5c0,1.6-1.3,3-3,3H18.9c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h70.4c1.7,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-1', row: 3, finger: 'left-pinky', hand: 'left', cx: 116, cy: 124, d: 'M137.4,141.5c0,1.6-1.4,3-3,3H97.9c-1.7,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-2', row: 3, finger: 'left-ring', hand: 'left', cx: 161, cy: 124, d: 'M182.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-3', row: 3, finger: 'left-middle', hand: 'left', cx: 206, cy: 124, d: 'M227.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-4', row: 3, finger: 'left-index', hand: 'left', isHomeKey: true, cx: 251, cy: 124, d: 'M272.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-5', row: 3, finger: 'left-index', hand: 'left', cx: 296, cy: 124, d: 'M317.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-6', row: 3, finger: 'right-index', hand: 'right', cx: 341, cy: 124, d: 'M362.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-7', row: 3, finger: 'right-index', hand: 'right', isHomeKey: true, cx: 386, cy: 124, d: 'M407.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-8', row: 3, finger: 'right-middle', hand: 'right', cx: 431, cy: 124, d: 'M452.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-9', row: 3, finger: 'right-ring', hand: 'right', cx: 476, cy: 124, d: 'M497.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-10', row: 3, finger: 'right-pinky', hand: 'right', cx: 521, cy: 124, d: 'M542.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.6,0-3-1.4-3-3v-35.4c0-1.7,1.4-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'pos-3-11', row: 3, finger: 'right-pinky', hand: 'right', cx: 566, cy: 124, d: 'M587.4,141.5c0,1.6-1.4,3-3,3h-36.5c-1.7,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V141.5z' },
  { id: 'enter', label: 'enter', row: 3, finger: 'right-pinky', hand: 'right', cx: 628, cy: 124, d: 'M668.8,141.5c0,1.6-1.3,3-3,3h-72.9c-1.7,0-3-1.4-3-3v-35.4c0-1.7,1.3-3,3-3h72.9c1.7,0,3,1.3,3,3V141.5z' },

  // Row 4 (Bottom Row)
  { id: 'shift-left', label: 'shift', row: 4, finger: 'left-pinky', hand: 'left', cx: 65, cy: 168, d: 'M115.8,185.4c0,1.7-1.3,3-3,3H18.9c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h93.8c1.7,0,3,1.4,3,3V185.4z' },
  { id: 'pos-4-1', row: 4, finger: 'left-pinky', hand: 'left', cx: 139, cy: 168, d: 'M160.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.7,1.3-3,3-3h36.5c1.6,0,3,1.3,3,3V185.4z' },
  { id: 'pos-4-2', row: 4, finger: 'left-ring', hand: 'left', cx: 184, cy: 168, d: 'M205.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z' },
  { id: 'pos-4-3', row: 4, finger: 'left-middle', hand: 'left', cx: 229, cy: 168, d: 'M250.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z' },
  { id: 'pos-4-4', row: 4, finger: 'left-index', hand: 'left', cx: 274, cy: 168, d: 'M295.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.7,0-3-1.3-3-3v-35.3c0-1.6,1.3-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z' },
  { id: 'pos-4-5', row: 4, finger: 'left-index', hand: 'left', cx: 319, cy: 168, d: 'M340.8,185.4c0,1.7-1.4,3-3,3h-36.6c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.6c1.6,0,3,1.4,3,3V185.4z' },
  { id: 'pos-4-6', row: 4, finger: 'right-index', hand: 'right', cx: 364, cy: 168, d: 'M385.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z' },
  { id: 'pos-4-7', row: 4, finger: 'right-index', hand: 'right', cx: 409, cy: 168, d: 'M430.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z' },
  { id: 'pos-4-8', row: 4, finger: 'right-middle', hand: 'right', cx: 454, cy: 168, d: 'M475.8,185.4c0,1.7-1.4,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.6,0,3,1.4,3,3V185.4z' },
  { id: 'pos-4-9', row: 4, finger: 'right-ring', hand: 'right', cx: 499, cy: 168, d: 'M520.8,185.4c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V185.4z' },
  { id: 'pos-4-10', row: 4, finger: 'right-pinky', hand: 'right', cx: 544, cy: 168, d: 'M565.8,185.4c0,1.7-1.3,3-3,3h-36.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h36.5c1.7,0,3,1.4,3,3V185.4z' },
  { id: 'shift-right', label: 'shift', row: 4, finger: 'right-pinky', hand: 'right', cx: 618, cy: 168, d: 'M668.8,185.4c0,1.7-1.3,3-3,3h-94.5c-1.6,0-3-1.3-3-3v-35.3c0-1.6,1.4-3,3-3h94.5c1.7,0,3,1.4,3,3V185.4z' },

  // Row 5 (Space Row)
  { id: 'space', label: 'space', row: 5, finger: 'thumbs', hand: 'both', cx: 324, cy: 213, d: 'M460.4,191c1.6,0,3,1.4,3,3v42c0,1.7-1.4,3-3,3H187.5c-1.6,0-3-1.3-3-3v-42c0-1.6,1.4-3,3-3H460.4z' }
];

// Layout Character Maps
export const LAYOUT_MAPPINGS = {
  qwerty: {
    'tilda': { label: '`', shiftLabel: '~' },
    'key-1': { label: '1', shiftLabel: '!' },
    'key-2': { label: '2', shiftLabel: '@' },
    'key-3': { label: '3', shiftLabel: '#' },
    'key-4': { label: '4', shiftLabel: '$' },
    'key-5': { label: '5', shiftLabel: '%' },
    'key-6': { label: '6', shiftLabel: '^' },
    'key-7': { label: '7', shiftLabel: '&' },
    'key-8': { label: '8', shiftLabel: '*' },
    'key-9': { label: '9', shiftLabel: '(' },
    'key-0': { label: '0', shiftLabel: ')' },
    'minus': { label: '-', shiftLabel: '_' },
    'equal': { label: '=', shiftLabel: '+' },
    'pos-2-1': { label: 'q', shiftLabel: 'Q' },
    'pos-2-2': { label: 'w', shiftLabel: 'W' },
    'pos-2-3': { label: 'e', shiftLabel: 'E' },
    'pos-2-4': { label: 'r', shiftLabel: 'R' },
    'pos-2-5': { label: 't', shiftLabel: 'T' },
    'pos-2-6': { label: 'y', shiftLabel: 'Y' },
    'pos-2-7': { label: 'u', shiftLabel: 'U' },
    'pos-2-8': { label: 'i', shiftLabel: 'I' },
    'pos-2-9': { label: 'o', shiftLabel: 'O' },
    'pos-2-10': { label: 'p', shiftLabel: 'P' },
    'pos-2-11': { label: '[', shiftLabel: '{' },
    'pos-2-12': { label: ']', shiftLabel: '}' },
    'pos-2-13': { label: '\\', shiftLabel: '|' },
    'pos-3-1': { label: 'a', shiftLabel: 'A' },
    'pos-3-2': { label: 's', shiftLabel: 'S' },
    'pos-3-3': { label: 'd', shiftLabel: 'D' },
    'pos-3-4': { label: 'f', shiftLabel: 'F', isHomeKey: true },
    'pos-3-5': { label: 'g', shiftLabel: 'G' },
    'pos-3-6': { label: 'h', shiftLabel: 'H' },
    'pos-3-7': { label: 'j', shiftLabel: 'J', isHomeKey: true },
    'pos-3-8': { label: 'k', shiftLabel: 'K' },
    'pos-3-9': { label: 'l', shiftLabel: 'L' },
    'pos-3-10': { label: ';', shiftLabel: ':' },
    'pos-3-11': { label: "'", shiftLabel: '"' },
    'pos-4-1': { label: 'z', shiftLabel: 'Z' },
    'pos-4-2': { label: 'x', shiftLabel: 'X' },
    'pos-4-3': { label: 'c', shiftLabel: 'C' },
    'pos-4-4': { label: 'v', shiftLabel: 'V' },
    'pos-4-5': { label: 'b', shiftLabel: 'B' },
    'pos-4-6': { label: 'n', shiftLabel: 'N' },
    'pos-4-7': { label: 'm', shiftLabel: 'M' },
    'pos-4-8': { label: ',', shiftLabel: '<' },
    'pos-4-9': { label: '.', shiftLabel: '>' },
    'pos-4-10': { label: '/', shiftLabel: '?' }
  },
  dvorak: {
    'tilda': { label: '`', shiftLabel: '~' },
    'key-1': { label: '1', shiftLabel: '!' },
    'key-2': { label: '2', shiftLabel: '@' },
    'key-3': { label: '3', shiftLabel: '#' },
    'key-4': { label: '4', shiftLabel: '$' },
    'key-5': { label: '5', shiftLabel: '%' },
    'key-6': { label: '6', shiftLabel: '^' },
    'key-7': { label: '7', shiftLabel: '&' },
    'key-8': { label: '8', shiftLabel: '*' },
    'key-9': { label: '9', shiftLabel: '(' },
    'key-0': { label: '0', shiftLabel: ')' },
    'minus': { label: '[', shiftLabel: '{' },
    'equal': { label: ']', shiftLabel: '}' },
    'pos-2-1': { label: "'", shiftLabel: '"' },
    'pos-2-2': { label: ',', shiftLabel: '<' },
    'pos-2-3': { label: '.', shiftLabel: '>' },
    'pos-2-4': { label: 'p', shiftLabel: 'P' },
    'pos-2-5': { label: 'y', shiftLabel: 'Y' },
    'pos-2-6': { label: 'f', shiftLabel: 'F' },
    'pos-2-7': { label: 'g', shiftLabel: 'G' },
    'pos-2-8': { label: 'c', shiftLabel: 'C' },
    'pos-2-9': { label: 'r', shiftLabel: 'R' },
    'pos-2-10': { label: 'l', shiftLabel: 'L' },
    'pos-2-11': { label: '/', shiftLabel: '?' },
    'pos-2-12': { label: '=', shiftLabel: '+' },
    'pos-2-13': { label: '\\', shiftLabel: '|' },
    'pos-3-1': { label: 'a', shiftLabel: 'A' },
    'pos-3-2': { label: 'o', shiftLabel: 'O' },
    'pos-3-3': { label: 'e', shiftLabel: 'E' },
    'pos-3-4': { label: 'u', shiftLabel: 'U', isHomeKey: true },
    'pos-3-5': { label: 'i', shiftLabel: 'I' },
    'pos-3-6': { label: 'd', shiftLabel: 'D' },
    'pos-3-7': { label: 'h', shiftLabel: 'H', isHomeKey: true },
    'pos-3-8': { label: 't', shiftLabel: 'T' },
    'pos-3-9': { label: 'n', shiftLabel: 'N' },
    'pos-3-10': { label: 's', shiftLabel: 'S' },
    'pos-3-11': { label: '-', shiftLabel: '_' },
    'pos-4-1': { label: ';', shiftLabel: ':' },
    'pos-4-2': { label: 'q', shiftLabel: 'Q' },
    'pos-4-3': { label: 'j', shiftLabel: 'J' },
    'pos-4-4': { label: 'k', shiftLabel: 'K' },
    'pos-4-5': { label: 'x', shiftLabel: 'X' },
    'pos-4-6': { label: 'b', shiftLabel: 'B' },
    'pos-4-7': { label: 'm', shiftLabel: 'M' },
    'pos-4-8': { label: 'w', shiftLabel: 'W' },
    'pos-4-9': { label: 'v', shiftLabel: 'V' },
    'pos-4-10': { label: 'z', shiftLabel: 'Z' }
  },
  colemak: {
    'tilda': { label: '`', shiftLabel: '~' },
    'key-1': { label: '1', shiftLabel: '!' },
    'key-2': { label: '2', shiftLabel: '@' },
    'key-3': { label: '3', shiftLabel: '#' },
    'key-4': { label: '4', shiftLabel: '$' },
    'key-5': { label: '5', shiftLabel: '%' },
    'key-6': { label: '6', shiftLabel: '^' },
    'key-7': { label: '7', shiftLabel: '&' },
    'key-8': { label: '8', shiftLabel: '*' },
    'key-9': { label: '9', shiftLabel: '(' },
    'key-0': { label: '0', shiftLabel: ')' },
    'minus': { label: '-', shiftLabel: '_' },
    'equal': { label: '=', shiftLabel: '+' },
    'pos-2-1': { label: 'q', shiftLabel: 'Q' },
    'pos-2-2': { label: 'w', shiftLabel: 'W' },
    'pos-2-3': { label: 'f', shiftLabel: 'F' },
    'pos-2-4': { label: 'p', shiftLabel: 'P' },
    'pos-2-5': { label: 'g', shiftLabel: 'G' },
    'pos-2-6': { label: 'j', shiftLabel: 'J' },
    'pos-2-7': { label: 'l', shiftLabel: 'L' },
    'pos-2-8': { label: 'u', shiftLabel: 'U' },
    'pos-2-9': { label: 'y', shiftLabel: 'Y' },
    'pos-2-10': { label: ';', shiftLabel: ':' },
    'pos-2-11': { label: '[', shiftLabel: '{' },
    'pos-2-12': { label: ']', shiftLabel: '}' },
    'pos-2-13': { label: '\\', shiftLabel: '|' },
    'pos-3-1': { label: 'a', shiftLabel: 'A' },
    'pos-3-2': { label: 'r', shiftLabel: 'R' },
    'pos-3-3': { label: 's', shiftLabel: 'S' },
    'pos-3-4': { label: 't', shiftLabel: 'T', isHomeKey: true },
    'pos-3-5': { label: 'd', shiftLabel: 'D' },
    'pos-3-6': { label: 'h', shiftLabel: 'H' },
    'pos-3-7': { label: 'n', shiftLabel: 'N', isHomeKey: true },
    'pos-3-8': { label: 'e', shiftLabel: 'E' },
    'pos-3-9': { label: 'i', shiftLabel: 'I' },
    'pos-3-10': { label: 'o', shiftLabel: 'O' },
    'pos-3-11': { label: "'", shiftLabel: '"' },
    'pos-4-1': { label: 'z', shiftLabel: 'Z' },
    'pos-4-2': { label: 'x', shiftLabel: 'X' },
    'pos-4-3': { label: 'c', shiftLabel: 'C' },
    'pos-4-4': { label: 'v', shiftLabel: 'V' },
    'pos-4-5': { label: 'b', shiftLabel: 'B' },
    'pos-4-6': { label: 'k', shiftLabel: 'K' },
    'pos-4-7': { label: 'm', shiftLabel: 'M' },
    'pos-4-8': { label: ',', shiftLabel: '<' },
    'pos-4-9': { label: '.', shiftLabel: '>' },
    'pos-4-10': { label: '/', shiftLabel: '?' }
  }
};

export function getKeysForLayout(layoutName = 'qwerty') {
  const mapping = LAYOUT_MAPPINGS[layoutName] || LAYOUT_MAPPINGS.qwerty;
  return BASE_KEY_SLOTS.map(slot => {
    const override = mapping[slot.id] || {};
    return {
      ...slot,
      label: override.label || slot.label || '',
      shiftLabel: override.shiftLabel || slot.shiftLabel || '',
      isHomeKey: override.isHomeKey || false
    };
  });
}

export const KEY_DEFINITIONS = getKeysForLayout('qwerty');

// Helper to look up key by character and active layout
export function getKeyForChar(char, layout = 'qwerty') {
  if (!char) return null;
  const keys = getKeysForLayout(layout);
  if (char === ' ' || char === '\u00A0') return keys.find(k => k.id === 'space');
  if (char === '\n' || char === 'Enter') return keys.find(k => k.id === 'enter');
  if (char === '\t' || char === 'Tab') return keys.find(k => k.id === 'tab');
  if (char === '’' || char === '‘') return keys.find(k => k.label === "'" || k.shiftLabel === "'");
  if (char === '“' || char === '”') return keys.find(k => k.shiftLabel === '"' || k.label === '"');
  if (char === '—' || char === '–') return keys.find(k => k.id === 'minus');
  if (char === '…') return keys.find(k => k.label === '.' || k.shiftLabel === '.');

  const lower = char.toLowerCase();
  
  const found = keys.find(k => 
    k.label === char || 
    k.label === lower || 
    k.shiftLabel === char || 
    k.id === char
  );
  return found || null;
}

// Helper to determine if a character requires the Shift key
export function isShiftChar(char, layout = 'qwerty') {
  if (!char || char.length !== 1) return false;
  const keyDef = getKeyForChar(char, layout);
  if (!keyDef) return false;
  return (keyDef.shiftLabel === char && keyDef.label !== char) || (char >= 'A' && char <= 'Z');
}

