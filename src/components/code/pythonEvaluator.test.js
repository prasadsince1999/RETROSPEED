import { describe, it, expect } from 'vitest';
import {
  analyzePythonSyntax,
  evaluateLearnerCode,
  generateProgressiveHints
} from './pythonEvaluator';

describe('Python Syntax Analysis Engine', () => {
  it('identifies clean syntax as "Syntax OK"', () => {
    expect(analyzePythonSyntax("print('Hello, Python!')").message).toBe('Syntax OK');
    expect(analyzePythonSyntax("def add(a, b):\n    return a + b").message).toBe('Syntax OK');
    expect(analyzePythonSyntax("for i in range(5):\n    print(i)").message).toBe('Syntax OK');
    expect(analyzePythonSyntax("if x > 0:\n    print('pos')\nelse:\n    print('non-pos')").message).toBe('Syntax OK');
    expect(analyzePythonSyntax("items = [1, 2, 3]").message).toBe('Syntax OK');
    expect(analyzePythonSyntax("user = {'name': 'Ada', 'role': 'Pioneer'}").message).toBe('Syntax OK');
  });

  it('detects missing colons on def statements with correct line number', () => {
    const res = analyzePythonSyntax("def add(a, b)\n    return a + b");
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Missing colon on line 1');
  });

  it('detects missing colons on if / for statements', () => {
    const resIf = analyzePythonSyntax("if x > 10\n    print(x)");
    expect(resIf.valid).toBe(false);
    expect(resIf.message).toBe('Missing colon on line 1');

    const resFor = analyzePythonSyntax("data = [1, 2]\nfor x in data\n    print(x)");
    expect(resFor.valid).toBe(false);
    expect(resFor.message).toBe('Missing colon on line 2');
  });

  it('detects unmatched parentheses', () => {
    const unclosed = analyzePythonSyntax("print('Hello, Python!'");
    expect(unclosed.valid).toBe(false);
    expect(unclosed.message).toBe('Unmatched parentheses');

    const extraClosing = analyzePythonSyntax("print(1 + 2))");
    expect(extraClosing.valid).toBe(false);
    expect(extraClosing.message).toBe('Unmatched parentheses');
  });

  it('detects unmatched brackets and braces', () => {
    const unclosedBracket = analyzePythonSyntax("numbers = [1, 2, 3");
    expect(unclosedBracket.valid).toBe(false);
    expect(unclosedBracket.message).toBe('Unmatched brackets');

    const unclosedBrace = analyzePythonSyntax("mapping = {'key': 'value'");
    expect(unclosedBrace.valid).toBe(false);
    expect(unclosedBrace.message).toBe('Unmatched braces');
  });

  it('detects unclosed string quotes', () => {
    const unclosed = analyzePythonSyntax("message = 'Hello world");
    expect(unclosed.valid).toBe(false);
    expect(unclosed.message).toBe('Unmatched quotes');
  });
});

describe('Auto-Grading & Test Assertion Evaluation (python-testing-patterns)', () => {
  it('evaluates learner code with standard pytest AAA assertions', () => {
    const lesson = {
      id: 1,
      title: 'First Python Program',
      code: "print('Hello, Python!')",
      expectedOutput: 'Hello, Python!',
      concept: 'Standard output stream'
    };

    const evaluation = evaluateLearnerCode(lesson.code, lesson.expectedOutput, lesson);

    expect(evaluation.allPassed).toBe(true);
    expect(evaluation.totalCount).toBe(4);
    expect(evaluation.passedCount).toBe(4);

    // Verify exact expected output string format
    const test1 = evaluation.tests.find((t) => t.id === 'test_output_match');
    expect(test1.passed).toBe(true);
    expect(test1.outputStr).toBe("✓ Test 1: Output matches 'Hello, Python!' [PASSED]");

    const test2 = evaluation.tests.find((t) => t.id === 'test_syntax_validity');
    expect(test2.passed).toBe(true);
    expect(test2.outputStr).toContain('[PASSED]');

    const test3 = evaluation.tests.find((t) => t.id === 'test_print_statements');
    expect(test3.passed).toBe(true);
    expect(test3.outputStr).toContain('[PASSED]');
  });

  it('flags failures when syntax errors break evaluation', () => {
    const brokenCode = "def greet(name)\n    print(name)";
    const evaluation = evaluateLearnerCode(brokenCode, 'Ada', { code: brokenCode });

    expect(evaluation.allPassed).toBe(false);
    expect(evaluation.syntax.valid).toBe(false);
    expect(evaluation.syntax.message).toBe('Missing colon on line 1');

    const syntaxTest = evaluation.tests.find((t) => t.id === 'test_syntax_validity');
    expect(syntaxTest.passed).toBe(false);
    expect(syntaxTest.outputStr).toContain('[FAILED]');
  });
});

describe('Progressive Pedagogical Clues (Code Hints)', () => {
  it('generates 3-stage progressive clues from lesson concept and code', () => {
    const lesson = {
      id: 10,
      title: 'Function Definition',
      concept: 'Functions encapsulate reusable behavior in Python.',
      code: "def add(a, b):\n    return a + b"
    };

    const hints = generateProgressiveHints(lesson);

    expect(hints).toHaveLength(3);
    // Level 1: Concept
    expect(hints[0]).toContain('Concept: Functions encapsulate reusable behavior');
    // Level 2: Structure
    expect(hints[1]).toContain('def name(args):');
    expect(hints[1]).toContain('colon');
    // Level 3: Blueprint
    expect(hints[2]).toContain('Blueprint:');
    expect(hints[2]).toContain('def add');
  });

  it('preserves pre-authored lesson hints when provided', () => {
    const lesson = {
      hints: ['Clue 1: Read line 1', 'Clue 2: Add print', 'Clue 3: Run']
    };
    const hints = generateProgressiveHints(lesson);
    expect(hints).toEqual(lesson.hints);
  });
});
