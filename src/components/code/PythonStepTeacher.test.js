import { describe, it, expect } from 'vitest';
import React from 'react';
import { detectAnalogyType } from './visuals/DynamicVisualStage';
import { getVisualComponentForLesson } from './visuals/index';

describe('Python Step Teacher & Dynamic Visual Stage', () => {
  describe('Analogy Detection Engine', () => {
    it('respects explicit analogyType on lesson metadata', () => {
      expect(detectAnalogyType({ analogyType: 'train' })).toBe('train');
      expect(detectAnalogyType({ analogyType: 'machine' })).toBe('machine');
      expect(detectAnalogyType({ analogyType: 'conveyor' })).toBe('conveyor');
      expect(detectAnalogyType({ analogyType: 'fork' })).toBe('fork');
    });

    it('infers microphone for input statements', () => {
      expect(detectAnalogyType({ code: 'name = input("Enter name: ")' })).toBe('microphone');
      expect(detectAnalogyType({ concept: 'Read user input from keyboard prompt' })).toBe('microphone');
    });

    it('infers train for string indexing and slicing', () => {
      expect(detectAnalogyType({ code: 'word = "PYTHON"\nprint(word[0:3])' })).toBe('train');
      expect(detectAnalogyType({ title: 'String Slicing and Length', concept: 'Negative indexing' })).toBe('train');
    });

    it('infers fork for conditionals and branches', () => {
      expect(detectAnalogyType({ code: 'if score >= 80:\n    print("Pass")' })).toBe('fork');
      expect(detectAnalogyType({ concept: 'Branching decisions with elif and else' })).toBe('fork');
    });

    it('infers conveyor for loops and iteration', () => {
      expect(detectAnalogyType({ code: 'for item in items:\n    print(item)' })).toBe('conveyor');
      expect(detectAnalogyType({ concept: 'Iterating sequences using while loop' })).toBe('conveyor');
    });

    it('infers machine for functions and parameters', () => {
      expect(detectAnalogyType({ code: 'def calculate(x, y):\n    return x + y' })).toBe('machine');
      expect(detectAnalogyType({ concept: 'Defining custom functions and return values' })).toBe('machine');
    });

    it('infers tray for lists, dicts, and collection structures', () => {
      expect(detectAnalogyType({ code: 'fruits = ["apple", "banana", "cherry"]' })).toBe('tray');
      expect(detectAnalogyType({ code: 'hero = {"name": "Byte", "level": 10}' })).toBe('tray');
    });

    it('infers arithmetic for math operations and calculations', () => {
      expect(detectAnalogyType({ code: 'total = 15 + 25\nprint(total)' })).toBe('arithmetic');
      expect(detectAnalogyType({ concept: 'Arithmetic operators and numeric calculations' })).toBe('arithmetic');
    });

    it('infers megaphone for output and print statements', () => {
      expect(detectAnalogyType({ code: 'print("Hello, World!")' })).toBe('megaphone');
      expect(detectAnalogyType({ concept: 'Output broadcasting to standard out' })).toBe('megaphone');
    });

    it('defaults to box for simple variables or memory assignments', () => {
      expect(detectAnalogyType({ code: 'score = 100' })).toBe('box');
      expect(detectAnalogyType({})).toBe('box');
    });
  });

  describe('Lesson Visual Component Resolver', () => {
    it('renders accurate DynamicVisualStage by analogyType without static 5+5 fallback', () => {
      const visual1 = getVisualComponentForLesson({
        id: 'py-101',
        title: 'Why Computers Need Python',
        code: 'print("Hello")',
        chapter: 1
      });
      expect(React.isValidElement(visual1)).toBe(true);
      expect(visual1.props.analogyType).toBe('language_ladder');

      const visualVar = getVisualComponentForLesson({
        id: 'py-106',
        code: 'age = 25',
        chapter: 1
      });
      expect(React.isValidElement(visualVar)).toBe(true);
      expect(visualVar.props.analogyType).toBe('box_reassign');
    });

    it('routes chapter-based lessons accurately', () => {
      const ch2 = getVisualComponentForLesson('py-201', 2);
      expect(React.isValidElement(ch2)).toBe(true);
      expect(ch2.props.analogyType).toBe('train');

      const ch5 = getVisualComponentForLesson('py-501', 5);
      expect(React.isValidElement(ch5)).toBe(true);
      expect(ch5.props.analogyType).toBe('fork');

      const ch6 = getVisualComponentForLesson('py-601', 6);
      expect(React.isValidElement(ch6)).toBe(true);
      expect(ch6.props.analogyType).toBe('conveyor');

      const ch7 = getVisualComponentForLesson('py-701', 7);
      expect(React.isValidElement(ch7)).toBe(true);
      expect(ch7.props.analogyType).toBe('tray');

      const ch8 = getVisualComponentForLesson('py-801', 8);
      expect(React.isValidElement(ch8)).toBe(true);
      expect(ch8.props.analogyType).toBe('machine');
    });
  });
});
