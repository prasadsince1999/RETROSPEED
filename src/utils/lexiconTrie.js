/**
 * Next-Gen Lexicon Trie & Linguistic Validator
 * Implements prefix trie search, Zipf's Law frequency ranking, and Word Bomb roots.
 */

export class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.frequency = 1;
    this.zipfRank = 5;
  }
}

export class LexiconTrie {
  constructor() {
    this.root = new TrieNode();
    this.wordCount = 0;
  }

  insert(word, frequency = 100, zipfRank = 5) {
    let current = this.root;
    const clean = word.toLowerCase().trim();
    if (!clean) return;

    for (const char of clean) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
    }
    
    if (!current.isEndOfWord) {
      current.isEndOfWord = true;
      this.wordCount++;
    }
    current.frequency = frequency;
    current.zipfRank = zipfRank;
  }

  isValidWord(word) {
    const node = this._findNode(word);
    return node !== null && node.isEndOfWord;
  }

  hasPrefix(prefix) {
    return this._findNode(prefix) !== null;
  }

  getWordsWithPrefix(prefix, limit = 10) {
    const results = [];
    const startNode = this._findNode(prefix);
    if (!startNode) return results;

    const traverse = (node, path) => {
      if (results.length >= limit) return;
      if (node.isEndOfWord) {
        results.push(prefix + path);
      }
      for (const [char, child] of node.children.entries()) {
        traverse(child, path + char);
      }
    };

    traverse(startNode, '');
    return results;
  }

  _findNode(str) {
    let current = this.root;
    const clean = str.toLowerCase().trim();
    for (const char of clean) {
      if (!current.children.has(char)) return null;
      current = current.children.get(char);
    }
    return current;
  }
}

// Common syllable roots for Word Bomb prompts
export const WORD_BOMB_ROOTS = [
  'th', 'in', 'an', 'er', 'on', 'at', 'en', 're', 'ti', 'te',
  'al', 'or', 'st', 'ar', 'nt', 'es', 'is', 'co', 'ad', 'ma',
  'ing', 'tion', 'pro', 'con', 'pre', 'str', 'ent', 'com', 'sta', 'ver',
  'ter', 'dis', 'cha', 'mon', 'qui', 'tra', 'bra', 'spe', 'gra', 'fla'
];

// Rich Multi-Tier Vocabulary Banks
export const LEXICON_BANKS = {
  easy: [
    'time', 'year', 'people', 'water', 'sound', 'great', 'world', 'hand', 'place', 'small',
    'quick', 'speed', 'touch', 'flame', 'spark', 'craft', 'track', 'plant', 'house', 'light',
    'river', 'forest', 'green', 'space', 'earth', 'ocean', 'tiger', 'eagle', 'stone', 'cloud',
    'apple', 'bread', 'table', 'chair', 'beach', 'music', 'heart', 'smile', 'dream', 'night',
    'star', 'moon', 'river', 'gold', 'silver', 'crown', 'bridge', 'castle', 'storm', 'wind',
    'clock', 'field', 'power', 'magic', 'flame', 'sword', 'shield', 'tower', 'arrow', 'shadow'
  ],
  medium: [
    'keyboard', 'accuracy', 'velocity', 'keystroke', 'adventure', 'curriculum', 'harmonic', 'rhythm',
    'chronicle', 'discovery', 'precision', 'benchmark', 'algorithm', 'interface', 'frequency',
    'navigation', 'synthesize', 'ecosystem', 'innovator', 'vocabulary', 'monument', 'sculpture',
    'symphony', 'astronomy', 'constellation', 'sanctuary', 'labyrinth', 'paragon', 'resonance',
    'catalyst', 'equilibrium', 'kaleidoscope', 'phenomenon', 'archipelago', 'silhouette', 'tapestry',
    'ambassador', 'metropolis', 'manuscript', 'heliosphere', 'bioluminescence', 'architecture'
  ],
  hard: [
    'function', 'constant', 'asynchronous', 'callback', 'component', 'performance', 'database',
    'interface', 'polymorphism', 'encapsulation', 'inheritance', 'middleware', 'observable',
    'serialization', 'concurrency', 'immutability', 'optimization', 'refactoring', 'destructuring',
    'reconciliation', 'memoization', 'cryptography', 'hexadecimal', 'transmission', 'architecture',
    'instantiation', 'configuration', 'parameterization', 'synchronization', 'electromagnetic'
  ],
  codeTokens: [
    'const', 'let', 'function', 'async', 'await', 'return', 'import', 'export', 'default',
    'console.log', 'Promise.all', 'setTimeout', 'setInterval', 'useEffect', 'useState',
    'useCallback', 'useMemo', 'useRef', 'document', 'window', 'localStorage', 'JSON.parse',
    'Math.random', 'Math.floor', 'Math.round', 'Array.from', 'Object.keys', 'Object.values',
    'addEventListener', 'removeEventListener', 'requestAnimationFrame', 'cancelAnimationFrame',
    'className', 'onClick', 'onChange', 'onSubmit', 'target.value', 'preventDefault',
    'border-radius', 'display: flex', 'justify-content', 'align-items', 'box-shadow',
    'font-family', 'background-color', 'position: absolute', 'pointer-events', 'cursor: pointer'
  ]
};

// Singleton Trie initialized with full vocabulary
export const DEFAULT_TRIE = new LexiconTrie();

// Populate Trie with Lexicon
Object.values(LEXICON_BANKS).forEach(bank => {
  bank.forEach((word, idx) => {
    DEFAULT_TRIE.insert(word, Math.max(10, 1000 - idx * 10), Math.min(10, Math.floor(idx / 10) + 1));
  });
});

/**
 * Calculate Zipf's Law Rarity Score for Word Bomb
 * Score = [Length(word)^2 * log10(N_corpus / freq)] * M_streak
 */
export function calculateZipfScore(word, streak = 1) {
  const clean = word.toLowerCase().trim();
  const len = clean.length;
  const node = DEFAULT_TRIE._findNode(clean);
  const freq = node?.frequency || 10;
  const nCorpus = 100000;

  const rarityFactor = Math.max(1.0, Math.log10(nCorpus / Math.max(1, freq)));
  const streakMultiplier = 1 + Math.min(3.0, streak * 0.15);

  return Math.round(Math.pow(len, 2) * rarityFactor * streakMultiplier);
}
