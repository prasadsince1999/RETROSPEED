/**
 * Pure helper to format lesson key previews on cards, maps, and hub tiles.
 * Guarantees centered, non-wrapping typography across all courses and sessions.
 */
export function getTargetKeyDisplay(lesson = {}) {
  if (lesson.type === 'game' || lesson.type === 'motion' || lesson.type === 'video') {
    return null;
  }
  if (lesson.type === 'code' || lesson.renderEngine === 'python-studio') {
    return null;
  }

  let rawKeys = Array.isArray(lesson.targetKeys) && lesson.targetKeys.length > 0
    ? lesson.targetKeys
    : (Array.isArray(lesson.keys) && lesson.keys.length > 0
        ? lesson.keys
        : (lesson.newKeys ? (Array.isArray(lesson.newKeys) ? lesson.newKeys : [lesson.newKeys]) : []));

  // Filter out stray ampersands from lessons like "Capital F & J"
  rawKeys = rawKeys.filter(k => k && k !== '&');

  if (rawKeys.length === 0) {
    return { text: '⌨', fontSize: 'text-sm' };
  }

  const titleLower = (lesson.title || '').toLowerCase();
  const isCapitalLesson = titleLower.includes('capital');

  // Single key
  if (rawKeys.length === 1) {
    const k = rawKeys[0];
    if (k === ' ' || k === 'space') return { text: '␣', fontSize: 'text-sm' };
    if (k === '\n' || k === 'enter') return { text: '↵', fontSize: 'text-sm' };
    if (k === '\t' || k === 'tab') return { text: '⇥', fontSize: 'text-sm' };
    if (k.toLowerCase() === 'shift') return { text: '⇧', fontSize: 'text-xs' };
    if (k.length > 3) return { text: k.slice(0, 3).toUpperCase(), fontSize: 'text-[10px]' };
    return { text: isCapitalLesson ? k.toUpperCase() : k, fontSize: 'text-xs' };
  }

  // Two keys (most common standard lessons: 'f j', 'g h', 'd k', etc.)
  if (rawKeys.length === 2) {
    const k1 = rawKeys[0] === ' ' ? '␣' : rawKeys[0] === '\n' ? '↵' : rawKeys[0] === '\t' ? '⇥' : rawKeys[0];
    const k2 = rawKeys[1] === ' ' ? '␣' : rawKeys[1] === '\n' ? '↵' : rawKeys[1] === '\t' ? '⇥' : rawKeys[1];
    const t1 = isCapitalLesson ? k1.toUpperCase() : k1;
    const t2 = isCapitalLesson ? k2.toUpperCase() : k2;
    return { text: `${t1} ${t2}`, fontSize: 'text-xs' };
  }

  // 3 keys with space (e.g. Space Bar lesson #3 with 'f', 'j', ' ')
  if (rawKeys.length === 3 && rawKeys.includes(' ')) {
    const nonSpace = rawKeys.filter(k => k !== ' ');
    return { text: `${nonSpace.join(' ')} ␣`, fontSize: 'text-xs' };
  }

  // Multi-key: check for hand orientation in title
  let displayKeys = rawKeys;
  if (rawKeys.length > 4) {
    if (titleLower.includes('right hand') || titleLower.includes('r hand')) {
      displayKeys = rawKeys.slice(-4);
    } else {
      displayKeys = rawKeys.slice(0, 4);
    }
  }

  const formatted = displayKeys.map(k => {
    if (k === ' ') return '␣';
    if (k === '\n') return '↵';
    if (k === '\t') return '⇥';
    return isCapitalLesson ? k.toUpperCase() : k;
  }).join(' ');

  return { text: formatted, fontSize: 'text-[11px]' };
}

/**
 * Format typing drill text to prevent container overflow across any screen size or font setting.
 * Wraps long drill lines at word boundaries while preserving code lessons, whitespace, and word order.
 * Ensures lines never exceed maxLineLen (default 22 characters), breaking long lines into balanced rows.
 */
export function formatDrillText(rawText, maxLineLen = 22) {
  if (!rawText || typeof rawText !== 'string') return '';
  // Preserve code lessons with indentation or syntax
  if (
    rawText.includes('def ') || 
    rawText.includes('class ') || 
    rawText.includes('print(') || 
    rawText.includes('    ') ||
    rawText.includes('\t')
  ) {
    return rawText;
  }

  const rawLines = rawText.split('\n');
  const formattedLines = [];

  for (const rawLine of rawLines) {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      formattedLines.push('');
      continue;
    }

    if (trimmed.length <= maxLineLen) {
      formattedLines.push(trimmed);
      continue;
    }

    const rawWords = trimmed.split(/\s+/).filter(Boolean);
    const words = [];
    for (const rw of rawWords) {
      if (rw.length <= maxLineLen) {
        words.push(rw);
      } else {
        // Chunk long unbreakable tokens so they never exceed maxLineLen
        for (let i = 0; i < rw.length; i += maxLineLen) {
          words.push(rw.slice(i, i + maxLineLen));
        }
      }
    }

    let cur = [];
    let curLen = 0;

    for (const w of words) {
      const nextLen = curLen + (cur.length > 0 ? 1 : 0) + w.length;
      const shouldWrap = cur.length > 0 && (
        nextLen > maxLineLen || 
        (cur.length >= 4 && curLen >= 14 && nextLen > Math.max(16, maxLineLen - 4))
      );

      if (shouldWrap) {
        formattedLines.push(cur.join(' '));
        cur = [w];
        curLen = w.length;
      } else {
        cur.push(w);
        curLen = nextLen;
      }
    }
    if (cur.length > 0) {
      formattedLines.push(cur.join(' '));
    }
  }

  return formattedLines.join('\n');
}

