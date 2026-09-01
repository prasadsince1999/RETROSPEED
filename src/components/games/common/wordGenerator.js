// Guaranteed Key-Locked Word & N-Gram Generator for RETROSPEED Arcade Games
// Ensures games NEVER leak untaught characters into gameplay.

const EXTENDED_DICTIONARY = [
  // Home row & early keys
  'all', 'ask', 'fall', 'sad', 'glad', 'salad', 'flask', 'dash', 'flash', 'half',
  'glass', 'hall', 'lass', 'dad', 'add', 'fad', 'ska', 'jag', 'gas', 'flag',
  'had', 'has', 'shah', 'gash', 'hag', 'dash', 'lads', 'fads', 'falls', 'flasks',
  
  // Top row keys
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can', 'her', 'was',
  'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now',
  'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she',
  'too', 'use', 'air', 'oil', 'red', 'set', 'top', 'raw', 'war', 'tea', 'eat', 'tap',
  'pat', 'pot', 'top', 'row', 'low', 'toe', 'tie', 'pie', 'pit', 'tip', 'rip', 'pin',
  'pen', 'pet', 'net', 'ten', 'tin', 'nit', 'rot', 'tor', 'dot', 'hot', 'hit', 'hat',
  'fat', 'fit', 'fig', 'fog', 'dog', 'god', 'got', 'tag', 'gap', 'pig', 'peg', 'leg',
  
  // Words & Code fragments
  'true', 'false', 'null', 'void', 'const', 'let', 'var', 'type', 'func', 'path',
  'port', 'desk', 'read', 'write', 'open', 'close', 'send', 'recv', 'sync', 'lock',
  'speed', 'track', 'train', 'coach', 'rails', 'route', 'wheel', 'steam', 'power',
  'plate', 'press', 'paper', 'print', 'stamp', 'proof', 'sheet', 'block', 'metal'
];

/**
 * Validates if every character in word belongs to allowed key set.
 */
export function isWordValidForKeys(word, allowedKeys) {
  if (!word || !allowedKeys || allowedKeys.length === 0) return false;
  const lowerKeys = new Set(allowedKeys.map(k => String(k).toLowerCase()));
  const chars = String(word).toLowerCase().split('');
  return chars.every(ch => lowerKeys.has(ch) || ch === ' ');
}

/**
 * Returns a pool of words guaranteed to only contain characters in lesson.keys.
 * If dictionary has < 4 matches, generates structured rhythmic n-grams from keys.
 */
export function getWordsForLesson(lesson, defaultPool = [], minCount = 16) {
  const rawKeys = lesson?.keys || lesson?.targetKeys || [];
  const cleanKeys = Array.from(new Set(
    rawKeys
      .filter(k => k && typeof k === 'string' && k.length === 1 && k !== ' ')
      .map(k => k.toLowerCase())
  ));

  // If no keys specified, return default pool safely
  if (cleanKeys.length === 0) {
    return defaultPool.length > 0 ? defaultPool : ['type', 'fast', 'keys', 'flow'];
  }

  // Combine dictionaries
  const combinedDict = Array.from(new Set([...defaultPool, ...EXTENDED_DICTIONARY]));

  // Filter for 100% matching words
  const matchingWords = combinedDict.filter(w => isWordValidForKeys(w, cleanKeys));

  if (matchingWords.length >= 6) {
    return matchingWords;
  }

  // If dictionary yields few words (e.g. initial 2-key or 4-key clusters like 'f j k d'):
  // Generate rhythmic, typing-club-style n-grams exclusively from cleanKeys
  const generated = [];
  const keyCount = cleanKeys.length;

  // Pattern 1: Alternating left-right / pairs (e.g. 'ffjj', 'jffd', 'kdfj')
  for (let i = 0; i < 20; i++) {
    let word = '';
    const wordLen = keyCount <= 2 ? (3 + (i % 2)) : (3 + (i % 3));
    for (let j = 0; j < wordLen; j++) {
      const idx = (i + j * 2 + Math.floor(Math.sin(i * 7 + j) * 10) + 100) % keyCount;
      word += cleanKeys[idx];
    }
    if (!generated.includes(word)) {
      generated.push(word);
    }
  }

  // Pattern 2: Doubled drill patterns (e.g. 'fjk', 'kdf', 'dkf', 'jfd')
  for (let i = 0; i < keyCount; i++) {
    for (let j = 0; j < keyCount; j++) {
      for (let k = 0; k < keyCount; k++) {
        if (generated.length >= minCount) break;
        const gram = `${cleanKeys[i]}${cleanKeys[j]}${cleanKeys[k]}`;
        if (!generated.includes(gram)) {
          generated.push(gram);
        }
      }
    }
  }

  return [...matchingWords, ...generated];
}
