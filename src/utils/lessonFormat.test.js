import { describe, it, expect } from 'vitest';
import { getTargetKeyDisplay, formatDrillText } from './lessonFormat';

describe('getTargetKeyDisplay', () => {
  it('formats standard 2-key lessons cleanly centered', () => {
    const l2 = { id: 2, title: 'Keys f & j', keys: ['f', 'j'] };
    expect(getTargetKeyDisplay(l2)).toEqual({ text: 'f j', fontSize: 'text-xs' });

    const l20 = { id: 20, title: 'Review: g & h', keys: ['g', 'h'] };
    expect(getTargetKeyDisplay(l20)).toEqual({ text: 'g h', fontSize: 'text-xs' });
  });

  it('formats multi-key lessons like #14, #16, #22 on one line with text-[11px]', () => {
    const l14 = { id: 14, title: 'First 8 Keys', targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'] };
    expect(getTargetKeyDisplay(l14)).toEqual({ text: 'a s d f', fontSize: 'text-[11px]' });

    const l16 = { id: 16, title: 'Home, Sweet Home!', targetKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'] };
    expect(getTargetKeyDisplay(l16)).toEqual({ text: 'a s d f', fontSize: 'text-[11px]' });

    const l22 = { id: 22, title: 'Home Row Review', targetKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'] };
    expect(getTargetKeyDisplay(l22)).toEqual({ text: 'a s d f', fontSize: 'text-[11px]' });
  });

  it('formats right hand multi-key lessons using right hand keys', () => {
    const l33 = { id: 33, title: 'Top Row: Right Hand', targetKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'] };
    expect(getTargetKeyDisplay(l33)).toEqual({ text: 'u i o p', fontSize: 'text-[11px]' });
  });

  it('formats space bar and special keys with clean symbols', () => {
    const l3 = { id: 3, title: 'Space Bar', keys: ['f', 'j', ' '] };
    expect(getTargetKeyDisplay(l3)).toEqual({ text: 'f j ␣', fontSize: 'text-xs' });

    const spaceSolo = { id: 99, title: 'Space Drill', keys: [' '] };
    expect(getTargetKeyDisplay(spaceSolo)).toEqual({ text: '␣', fontSize: 'text-sm' });

    const enterSolo = { id: 100, title: 'Return Key', keys: ['\n'] };
    expect(getTargetKeyDisplay(enterSolo)).toEqual({ text: '↵', fontSize: 'text-sm' });

    const tabSolo = { id: 101, title: 'Tab Indent', keys: ['\t'] };
    expect(getTargetKeyDisplay(tabSolo)).toEqual({ text: '⇥', fontSize: 'text-sm' });

    const shiftSolo = { id: 102, title: 'Shift Key', keys: ['shift'] };
    expect(getTargetKeyDisplay(shiftSolo)).toEqual({ text: '⇧', fontSize: 'text-xs' });
  });

  it('formats capital letters in uppercase and filters stray & symbols', () => {
    const capFJ = { id: 139, title: 'Capital F & J', keys: ['f', '&', 'j'] };
    expect(getTargetKeyDisplay(capFJ)).toEqual({ text: 'F J', fontSize: 'text-xs' });

    const capDK = { id: 142, title: 'Capital D & K', keys: ['d', '&', 'k'] };
    expect(getTargetKeyDisplay(capDK)).toEqual({ text: 'D K', fontSize: 'text-xs' });
  });

  it('returns null for game, video, and code lessons handled by dedicated engines', () => {
    expect(getTargetKeyDisplay({ type: 'game' })).toBeNull();
    expect(getTargetKeyDisplay({ type: 'motion' })).toBeNull();
    expect(getTargetKeyDisplay({ type: 'code' })).toBeNull();
  });
});

describe('formatDrillText', () => {
  it('formats Lesson 6 long drill lines into balanced lines <= 22 chars', () => {
    const lesson6Raw = 'dddd kkkk dd kk ddd kkk dk dk kkd\nddk ddd kkk ddk kkd dkdk dddk kkkd\nddkk dd kk dddd';
    const formatted = formatDrillText(lesson6Raw);
    const lines = formatted.split('\n');

    expect(lines).toEqual([
      'dddd kkkk dd kk',
      'ddd kkk dk dk kkd',
      'ddk ddd kkk ddk',
      'kkd dkdk dddk kkkd',
      'ddkk dd kk dddd'
    ]);

    lines.forEach(line => {
      expect(line.length).toBeLessThanOrEqual(22);
    });
  });

  it('preserves short lines that already fit within safe bounds', () => {
    const shortText = 'ffff jjjj ff jj ffjj\nfjfj fjj jff ffj fff';
    expect(formatDrillText(shortText)).toBe(shortText);
  });

  it('preserves code lessons with indentation and python keywords', () => {
    const pythonCode = 'def greet(name):\n    print(f"Hello, {name}")\n    return True';
    expect(formatDrillText(pythonCode)).toBe(pythonCode);
  });

  it('formats Lesson 16 and Lesson 14 without dropping words or exceeding line lengths', () => {
    const lesson14Raw = 'asdf jkl; asdf jkl; a s d f j k l ; ; l k j f d s a\nasdfjkl; ;lkjfdsa a;sl dkfj fjdk sla; asdf jkl;\nfdsa ;lkj asdf jkl; a; sl dk fj fj dk sl a;';
    const formatted = formatDrillText(lesson14Raw);
    const lines = formatted.split('\n');

    lines.forEach(line => {
      expect(line.length).toBeLessThanOrEqual(22);
    });

    const origWords = lesson14Raw.trim().split(/\s+/).filter(Boolean);
    const formattedWords = formatted.trim().split(/\s+/).filter(Boolean);
    expect(formattedWords).toEqual(origWords);
  });

  it('handles empty and invalid input gracefully', () => {
    expect(formatDrillText('')).toBe('');
    expect(formatDrillText(null)).toBe('');
    expect(formatDrillText(undefined)).toBe('');
  });

  it('chunks unbreakable tokens that exceed maxLineLen so no line overflows', () => {
    const longToken = 'supercalifragilisticexpialidocious';
    const formatted = formatDrillText(longToken, 22);
    const lines = formatted.split('\n');
    expect(lines.length).toBe(2);
    expect(lines[0]).toBe('supercalifragilisticex');
    expect(lines[1]).toBe('pialidocious');
    lines.forEach(l => expect(l.length).toBeLessThanOrEqual(22));
  });

  it('preserves all words and keystrokes of Lesson 3 Space Bar drill without corruption', () => {
    const lesson3Raw = 'f f j j fj fj jf jf f j f j ff jj f f j j\nff jj f j fj jf f j j f ff jj ff jj\nf f j j fj fj jf jf';
    const formatted = formatDrillText(lesson3Raw, 22);
    const lines = formatted.split('\n');

    lines.forEach(l => expect(l.length).toBeLessThanOrEqual(22));
    const origWords = lesson3Raw.trim().split(/\s+/).filter(Boolean);
    const formattedWords = formatted.trim().split(/\s+/).filter(Boolean);
    expect(formattedWords).toEqual(origWords);
    expect(formattedWords.length).toBe(40);
  });

  it('preserves all words of Lesson 4 Review drill without dropping ending words', () => {
    const lesson4Raw = 'ffff jjjj ff jj fff jjj fj fj jjf\nffj fff jjj ffj jjf fjfj fffj jjjf\nffjj ff jj ffff';
    const formatted = formatDrillText(lesson4Raw, 22);
    const lines = formatted.split('\n');

    lines.forEach(l => expect(l.length).toBeLessThanOrEqual(22));
    const origWords = lesson4Raw.trim().split(/\s+/).filter(Boolean);
    const formattedWords = formatted.trim().split(/\s+/).filter(Boolean);
    expect(formattedWords).toEqual(origWords);
    expect(formattedWords.length).toBe(21);
  });

  it('respects custom maxLineLen parameter scaling', () => {
    const text = 'the quick brown fox jumps over the lazy dog and runs away';
    const formatted15 = formatDrillText(text, 15);
    formatted15.split('\n').forEach(l => expect(l.length).toBeLessThanOrEqual(15));

    const formatted30 = formatDrillText(text, 30);
    formatted30.split('\n').forEach(l => expect(l.length).toBeLessThanOrEqual(30));
  });
});

import typingJungle685 from '../data/courses/typing_jungle_685.json';

describe('Odyssey 685 Course Curriculum Audit', () => {
  it('validates that all 685 lessons in typing_jungle_685.json have line lengths <= 22 characters', () => {
    let totalLessons = 0;
    const violations = [];

    typingJungle685.stages.forEach(stage => {
      stage.lessons.forEach(lesson => {
        totalLessons++;
        if (!lesson.text) return;
        const lines = lesson.text.split('\n');
        lines.forEach((line, idx) => {
          if (line.length > 22) {
            violations.push({
              lessonId: lesson.id,
              title: lesson.title,
              lineIdx: idx,
              lineLength: line.length,
              line
            });
          }
        });
      });
    });

    expect(totalLessons).toBe(685);
    expect(violations).toEqual([]);
  });

  it('validates Lesson 6 Review: d & k specifically satisfies line length <= 22 chars', () => {
    const stage1 = typingJungle685.stages[0];
    const lesson6 = stage1.lessons.find(l => l.id === 6);
    expect(lesson6).toBeDefined();
    expect(lesson6.title).toBe('Review: d & k');

    const lines = lesson6.text.split('\n');
    expect(lines).toEqual([
      'dddd kkkk dd kk',
      'ddd kkk dk dk kkd',
      'ddk ddd kkk ddk',
      'kkd dkdk dddk kkkd',
      'ddkk dd kk dddd'
    ]);
    lines.forEach(line => {
      expect(line.length).toBeLessThanOrEqual(22);
    });
  });
});


