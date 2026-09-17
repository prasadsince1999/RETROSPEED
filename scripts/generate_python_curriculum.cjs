// Complete Python Forge & Zero-to-Hero 197-Lesson Generator (9 Stages)
// Grounded in the 13-Hour Python Zero-to-Hero Master Course Transcript
const fs = require('fs');
const path = require('path');

const VALID_ANALOGY_TYPES = [
  'box',
  'box_reassign',
  'megaphone',
  'megaphone_sticky',
  'microphone',
  'language_ladder',
  'cpython_pipeline',
  'type_transformer',
  'train',
  'fork',
  'conveyor',
  'machine',
  'tray',
  'arithmetic'
];

let globalIndex = 1;
const stageLessonCounters = {};

/**
 * Derives an appropriate analogyType if not explicitly supplied.
 */
function deriveAnalogyType(analogy, stageNum) {
  const a = (analogy || '').toLowerCase();
  if (a.includes('ladder') || a.includes('tower') || a.includes('level') || a.includes('tier') || a.includes('translator')) return 'language_ladder';
  if (a.includes('cpython') || a.includes('bytecode') || a.includes('compiler') || a.includes('pvm') || a.includes('curtain') || a.includes('pipeline')) return 'cpython_pipeline';
  if (a.includes('sticky') || a.includes('comment') || a.includes('greeting') || a.includes('megaphone vs sticky')) return 'megaphone_sticky';
  if (a.includes('reassign') || a.includes('updating box') || a.includes('storage box') || a.includes('swap') || a.includes('labeled storage') || a.includes('quartet')) return 'box_reassign';
  if (a.includes('transformer') || a.includes('cast') || a.includes('string glue') || a.includes('converter') || a.includes('object scanner')) return 'type_transformer';
  if (a.includes('box') || a.includes('storage') || a.includes('variable') || a.includes('pointer') || a.includes('capsule') || a.includes('label') || a.includes('scope')) return 'box';
  if (a.includes('megaphone') || a.includes('broadcast') || a.includes('print') || a.includes('delimiter') || a.includes('ticket') || a.includes('stream') || a.includes('ink')) return 'megaphone';
  if (a.includes('microphone') || a.includes('input') || a.includes('kiosk') || a.includes('voice') || a.includes('keystroke')) return 'microphone';
  if (a.includes('train') || a.includes('ruler') || a.includes('slice') || a.includes('character') || a.includes('chain') || a.includes('cipher') || a.includes('morse')) return 'train';
  if (a.includes('fork') || a.includes('switch') || a.includes('branch') || a.includes('decision') || a.includes('gate') || a.includes('logic') || a.includes('road') || a.includes('filter') || a.includes('bouncer') || a.includes('referee')) return 'fork';
  if (a.includes('conveyor') || a.includes('loop') || a.includes('belt') || a.includes('motor') || a.includes('lap') || a.includes('stride') || a.includes('generator') || a.includes('timer') || a.includes('accumulator')) return 'conveyor';
  if (a.includes('tray') || a.includes('shelf') || a.includes('compartment') || a.includes('locker') || a.includes('cart') || a.includes('stack') || a.includes('list') || a.includes('dict') || a.includes('set') || a.includes('tuple') || a.includes('registry') || a.includes('ledger') || a.includes('board') || a.includes('album')) return 'tray';
  if (a.includes('arithmetic') || a.includes('math') || a.includes('calc') || a.includes('engine') || a.includes('modulo') || a.includes('power') || a.includes('division') || a.includes('factor') || a.includes('vector') || a.includes('scale')) return 'arithmetic';
  if (a.includes('machine') || a.includes('function') || a.includes('gear') || a.includes('factory') || a.includes('tool') || a.includes('blueprint') || a.includes('lathe')) return 'machine';

  // Fallback by stage
  switch (stageNum) {
    case 1: return 'language_ladder';
    case 2: return 'train';
    case 3: return 'arithmetic';
    case 4: return 'fork';
    case 5: return 'fork';
    case 6: return 'conveyor';
    case 7: return 'tray';
    case 8: return 'machine';
    case 9: return 'machine';
    default: return 'machine';
  }
}

/**
 * Derives a conversational 2-3 sentence instructor explanation matching transcript tone.
 */
function deriveInstructorExplanation(title, concept, analogy, stageNum) {
  const prefix = "Hey friends! ";
  switch (stageNum) {
    case 1:
      return `${prefix}In this lesson on ${title}, we take our first fun steps with Python! Think of ${analogy}: giving your computer clear instructions is just like writing down a friendly to-do list. Every variable is like a labeled storage jar where you keep your favorite things.`;
    case 2:
      return `${prefix}Welcome to strings! In ${title}, we see how Python plays with text. Think of ${analogy}: letters in a word are like beads on a necklace. You can grab the first bead, cut out a small slice, or easily build sentences using clean f-strings with {curly braces}.`;
    case 3:
      return `${prefix}Math time! In ${title}, Python acts like a super-smart pocket calculator. Think of ${analogy}: it solves calculations step-by-step from left to right, following simple school math rules. You can add, multiply, or find remainders with zero sweat.`;
    case 4:
      return `${prefix}In this lesson on ${title}, we look at making simple Yes-or-No choices. Think of ${analogy}: Python checks if something is True or False, just like checking a traffic light. If it is green, go; if it is red, wait!`;
    case 5:
      return `${prefix}Welcome to decision making! In ${title}, your code chooses which path to take. Think of ${analogy}: like following road signs, if, elif, and else guide your program down the right path. The neat indented spaces show Python which actions belong together.`;
    case 6:
      return `${prefix}Ready for a superpower? In ${title}, you learn how to make the computer do repetitive tasks for you! Think of ${analogy}: like items rolling on a grocery checkout belt, a loop handles each item one by one so you never have to repeat code by hand.`;
    case 7:
      return `${prefix}Let's get organized! In ${title}, we look at easy ways to hold lots of data. Think of ${analogy}: lists are like your shopping lists, and dictionaries are like phone contacts where you look up a name to find a number. Super intuitive and tidy!`;
    case 8:
      return `${prefix}In ${title}, you become a recipe master! Think of ${analogy}: instead of typing the same steps again and again, you create a named recipe with def, give it ingredients, and get a neat result back with return. This makes your code clean, tidy, and fun to build.`;
    case 9:
      return `${prefix}You made it to the project zone! In ${title}, all your skills come together. Think of ${analogy}: you are snapping together the tools you learned like colorful Lego bricks to build a complete, working mini-app. Enjoy seeing your code come to life!`;
    default:
      return `${prefix}In this lesson on ${title}, we explore ${analogy}. Follow along step by step, and you will see how simple and natural Python feels to write.`;
  }
}

/**
 * Derives a high-fidelity token breakdown from Python code.
 */
function deriveCodeBreakdown(code, title) {
  if (!code || typeof code !== 'string') return [];
  const tokens = [];
  const seen = new Set();

  const add = (tok, label, exp) => {
    if (!tok || seen.has(tok)) return;
    seen.add(tok);
    tokens.push({ token: tok, label, explanation: exp });
  };

  const lines = code.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) {
      add('# ...', 'Comment', 'Friendly note for humans that Python ignores when running.');
      break;
    }
  }

  if (code.includes('def ')) add('def', 'Define Recipe', 'Creates a reusable function recipe you can run anytime.');
  if (code.includes('return')) add('return', 'Return', 'Sends the final answer back from your function.');
  if (code.includes('if ')) add('if', 'If Choice', 'Checks if a condition is True before running the indented steps.');
  if (code.includes('elif ')) add('elif', 'Else If', 'Checks a backup condition if the earlier choices were False.');
  if (code.includes('else:')) add('else:', 'Otherwise', 'Runs automatically when none of the choices above were True.');
  if (code.includes('for ')) add('for ... in', 'For Loop', 'Steps through items in a list or sequence one by one.');
  if (code.includes('while ')) add('while', 'While Loop', 'Keeps repeating as long as your condition stays True.');
  if (code.includes('break')) add('break', 'Stop Loop', 'Immediately stops the loop and jumps right out.');
  if (code.includes('continue')) add('continue', 'Skip Step', 'Skips the rest of this turn and jumps to the next item.');
  if (code.includes('match ')) add('match ... case', 'Pattern Matcher', 'Routes a value to matching patterns cleanly.');
  if (code.includes('lambda ')) add('lambda', 'Short Function', 'Creates a tiny quick one-line helper function.');
  if (code.includes('global ')) add('global', 'Global', 'Tells Python to update the variable outside this function.');

  if (code.includes('print(')) add('print(...)', 'Print', 'Shows words or numbers on your terminal screen.');
  if (code.includes('input(')) add('input(...)', 'Ask User', 'Asks the user to type something and waits for them.');
  if (code.includes('len(')) add('len(...)', 'Count Items', 'Tells you how many letters or items are inside.');
  if (code.includes('range(')) add('range(...)', 'Number Sequence', 'Generates numbers in order, like 0, 1, 2, 3, 4.');
  if (code.includes('enumerate(')) add('enumerate(...)', 'Count & Item', 'Pairs each item with its number index (0, 1, 2...).');
  if (code.includes('zip(')) add('zip(...)', 'Zip Together', 'Pairs up items from two lists side by side.');
  if (code.includes('int(')) add('int(...)', 'Whole Number', 'Turns text into a whole number so you can do math.');
  if (code.includes('float(')) add('float(...)', 'Decimal Number', 'Turns text or numbers into decimals like 3.14.');
  if (code.includes('str(')) add('str(...)', 'Text String', 'Turns numbers or data into readable text.');
  if (code.includes('bool(')) add('bool(...)', 'True or False', 'Checks if a value counts as True or False.');
  if (code.includes('type(')) add('type(...)', 'Check Type', 'Tells you what kind of data is stored inside.');
  if (code.includes('round(')) add('round(...)', 'Round Number', 'Rounds a decimal number to neat decimal places.');
  if (code.includes('abs(')) add('abs(...)', 'Positive Value', 'Gives the positive distance of a number, ignoring minus signs.');
  if (code.includes('min(') || code.includes('max(')) add('min/max(...)', 'Lowest / Highest', 'Picks the smallest or largest value easily.');
  if (code.includes('sum(')) add('sum(...)', 'Add All Up', 'Adds together all numbers in a list.');

  if (code.includes('.append(')) add('.append(...)', 'Add to End', 'Tucks a new item onto the very end of your list.');
  if (code.includes('.insert(')) add('.insert(...)', 'Insert at Slot', 'Puts an item into a specific slot in your list.');
  if (code.includes('.pop(')) add('.pop(...)', 'Remove Item', 'Pops an item out of your list and gives it to you.');
  if (code.includes('.remove(')) add('.remove(...)', 'Delete Value', 'Finds and removes a specific item from your list.');
  if (code.includes('.get(')) add('.get(...)', 'Safe Lookup', 'Safely looks up a dictionary key without crashing.');
  if (code.includes('.items()')) add('.items()', 'Key & Value', 'Gives both the name and value for each dictionary entry.');
  if (code.includes('.split(')) add('.split(...)', 'Split Text', 'Chops a sentence into a list of words.');
  if (code.includes('.join(')) add('.join(...)', 'Glue Words', 'Glues a list of words together into one sentence.');
  if (code.includes('.strip()')) add('.strip()', 'Trim Spaces', 'Trims extra spaces off the front and back.');
  if (code.includes('.upper()') || code.includes('.lower()')) add('.upper() / .lower()', 'Change Casing', 'Turns text into ALL CAPS or all lowercase.');

  if (code.includes("f'") || code.includes('f"')) add('f"..."', 'f-String', 'Modern, easy way to insert variables into text using {curly braces}.');
  if (code.includes('//')) add('//', 'Floor Division', 'Divides and rounds down to a whole number.');
  else if (code.includes('/')) add('/', 'Division', 'Divides numbers and gives a decimal result.');
  if (code.includes('%')) add('%', 'Remainder (Modulo)', 'Gives what is left over after dividing.');
  if (code.includes('**')) add('**', 'Power (Exponent)', 'Multiplies a number by itself, like 2 ** 3 = 8.');
  if (code.includes('==')) add('==', 'Is Equal?', 'Checks if both sides have the exact same value.');
  if (code.includes('!=')) add('!=', 'Not Equal?', 'Checks if both sides are different.');
  if (code.includes(' and ')) add('and', 'Both True', 'Only True if BOTH conditions are True.');
  if (code.includes(' or ')) add('or', 'Either True', 'True if AT LEAST ONE condition is True.');
  if (code.includes('not ')) add('not', 'Flip True/False', 'Flips True to False, or False to True.');
  if (code.includes(' in ')) add('in', 'Inside List?', 'Checks if an item exists inside a sequence or list.');
  if (code.includes(' is ')) add('is', 'Exact Same Item', 'Checks if two names point to the exact same object in memory.');
  if (code.includes('[') && code.includes(']')) add('[...]', 'List / Index', 'Creates a list or accesses an item at a numbered slot.');
  if (code.includes('{') && code.includes('}')) add('{...}', 'Dictionary / Set', 'Stores key-value pairs or a collection of unique items.');

  if (tokens.length === 0) {
    add(title, 'Expression', 'Evaluates the Python expression step by step.');
  }

  return tokens.slice(0, 5);
}

/**
 * Derives a step-by-step execution trace for Python code.
 */
function deriveExecutionSteps(code, expectedOutput, stageNum, title) {
  const steps = [];
  const cleanExp = (expectedOutput || '').split('\n')[0] || 'Done';

  steps.push({
    step: 1,
    title: "Read & Understand",
    description: "Python reads your code line by line and prepares the instruction in memory."
  });

  // Check for variable assignments
  const varMatch = code && code.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/m);
  if (varMatch) {
    const varName = varMatch[1];
    const rawVal = varMatch[2].split('\n')[0].replace(/['"]/g, '').trim();
    steps.push({
      step: 2,
      title: "Store in Memory",
      description: `Python saves '${rawVal}' inside the box labeled '${varName}' so it can use it anytime.`,
      memoryState: { [varName]: rawVal }
    });
  } else if (code && code.includes('def ')) {
    const fnMatch = code.match(/def\s+([a-zA-Z_]\w*)/);
    const fnName = fnMatch ? fnMatch[1] : 'func';
    steps.push({
      step: 2,
      title: "Create Recipe",
      description: `Python saves the reusable function recipe named '${fnName}' ready to be called.`,
      memoryState: { [fnName]: '<function>' }
    });
  } else {
    steps.push({
      step: 2,
      title: "Process & Calculate",
      description: "Python evaluates the expressions and values step by step."
    });
  }

  if (expectedOutput) {
    steps.push({
      step: 3,
      title: "Show Result on Screen",
      description: `Python prints the final result on your screen: ${cleanExp}`,
      stdout: cleanExp
    });
  } else {
    steps.push({
      step: 3,
      title: "Finished Smoothly",
      description: "Your code ran completely and finished with zero errors!"
    });
  }

  return steps;
}

/**
 * Master helper for constructing a verified, enriched lesson.
 */
function makeLesson(stageNum, section, type, title, text, concept, analogy, code, expectedOutput, goalWpm, minAcc, extra = {}) {
  const lessonIndexInStage = (stageLessonCounters[stageNum] || 0) + 1;
  stageLessonCounters[stageNum] = lessonIndexInStage;

  const analogyType = extra.analogyType || deriveAnalogyType(analogy, stageNum);
  if (!VALID_ANALOGY_TYPES.includes(analogyType)) {
    throw new Error(`Invalid analogyType "${analogyType}" for lesson "${title}". Allowed: ${VALID_ANALOGY_TYPES.join(', ')}`);
  }

  const lessonCode = code || text;
  const lessonConcept = concept || text;
  const instructorExplanation = extra.instructorExplanation || deriveInstructorExplanation(title, lessonConcept, analogy, stageNum);
  const codeBreakdown = extra.codeBreakdown || deriveCodeBreakdown(lessonCode, title);
  const executionSteps = extra.executionSteps || deriveExecutionSteps(lessonCode, expectedOutput, stageNum, title);

  const lesson = {
    id: globalIndex,
    rawId: `py.s${stageNum}.l${String(globalIndex).padStart(2, '0')}`,
    codeId: `py-${stageNum}${String(lessonIndexInStage).padStart(2, '0')}`,
    stageNumber: stageNum,
    chapter: stageNum,
    section: section,
    type: type,
    title: title,
    text: text,
    concept: lessonConcept,
    analogy: analogy || 'Python Mental Model',
    analogyType: analogyType,
    instructorExplanation: instructorExplanation,
    codeBreakdown: codeBreakdown,
    executionSteps: executionSteps,
    code: lessonCode,
    expectedOutput: expectedOutput || '',
    goalWpm: goalWpm || 24,
    minAccuracy: minAcc || 90,
    ...extra
  };

  globalIndex++;
  return lesson;
}

const stages = [];

// ==========================================
// STAGE 1: PYTHON FOUNDATIONS (20 lessons)
// ==========================================
const s1Lessons = [
  makeLesson(1, "1.1", "slide", "Why Computers Need Python",
    "A program is a list of instructions a machine can run. Human speech is too loose. Python is a high-level language: closer to English than to ones and zeros.",
    "Python bridges human intent and raw hardware architecture as a readable high-level language.",
    "The 4-Tier Language Tower",
    "print('Hello, Python Developer!')", "Hello, Python Developer!", 20, 90, {
      analogyType: "language_ladder",
      instructorExplanation: "Hey friends! Welcome to Python. Computers only speak binary zeros and ones, which is nearly impossible for humans to write. Think of a 4-floor tower: Human Speech on top, Python on floor 3, Assembly on floor 2, and raw 0s and 1s at the foundation. Python acts as our elevator bridge!"
    }),

  makeLesson(1, "1.1", "quiz", "Quiz: High-level or Machine Language?",
    "high-level",
    "Is Python classified as a high-level human-readable language or raw machine code?",
    "The 4-Tier Language Tower",
    "high-level", "Correct! Python is high-level.", 20, 95, {
      analogyType: "language_ladder",
      instructorExplanation: "Python sits high up on our Language Tower. It abstracts away CPU registers and raw transistors into clear words like print, if, and for."
    }),

  makeLesson(1, "1.2", "slide", "The CPython Pipeline & Bytecode",
    "CPython compiles your .py source file to bytecode instructions, then the Python virtual machine runs that bytecode on your CPU.",
    "Source code (.py) is compiled to intermediate bytecode (.pyc) before execution by the Python Virtual Machine (PVM).",
    "The 3-Stage Pipeline",
    "# CPython compiles source to bytecode\nprint('Bytecode execution ready!')", "Bytecode execution ready!", 20, 90, {
      analogyType: "cpython_pipeline",
      instructorExplanation: "Behind the scenes, Python doesn't feed English text to your CPU. Think of a 3-step factory conveyor: your app.py goes into the Compiler, gets transformed into app.pyc Bytecode, and the Python Virtual Machine (PVM) feeds instructions to the processor!"
    }),

  makeLesson(1, "1.2", "code", "First Math Execution",
    "print(5 + 5)",
    "Python evaluates arithmetic expressions inside print() before displaying the output.",
    "The Arithmetic Engine",
    "print(5 + 5)", "10", 22, 92, {
      analogyType: "arithmetic",
      instructorExplanation: "Notice how Python calculates before printing. The engine sees 5 + 5 inside the parentheses, solves it to 10 in memory, and then passes the answer to the print megaphone."
    }),

  makeLesson(1, "1.2", "explain", "Why Python Feels Seamless",
    "You never type bytecode yourself. The interpreter compiles, links libraries, and executes in memory in one command.",
    "The interpreter handles compilation and memory management automatically without manual link steps.",
    "The 3-Stage Pipeline",
    "print('Compiled and executed in memory!')", "Compiled and executed in memory!", 20, 90, {
      analogyType: "cpython_pipeline",
      instructorExplanation: "Unlike older languages like C where you have to manually run compile and link steps, Python runs the whole 3-stage conveyor automatically in memory in a fraction of a second."
    }),

  makeLesson(1, "1.2", "quiz", "Quiz: Python File Extension",
    ".py",
    "What is the standard file extension for Python source files?",
    "The 3-Stage Pipeline",
    ".py", "Correct! Python files end with .py", 20, 95, {
      analogyType: "cpython_pipeline",
      instructorExplanation: "Every Python script ends with the .py extension so operating systems and the CPython pipeline know to start the compiler."
    }),

  makeLesson(1, "1.3", "slide", "The Megaphone & The Sticky Note",
    "print writes text to your screen. A hash symbol (#) marks a comment that Python completely ignores during execution.",
    "print() broadcasts text; comments (#) provide non-executable documentation for humans.",
    "Megaphone & Sticky Note",
    "# greet the terminal\nprint('hello, terminal')", "hello, terminal", 22, 92, {
      analogyType: "megaphone_sticky",
      instructorExplanation: "Think of print() like a vintage megaphone broadcasting words out onto the screen. Meanwhile, the # hash symbol is a yellow sticky note left for human readers that Python's scanner completely skips!"
    }),

  makeLesson(1, "1.3", "code", "Comments and Greeting",
    "# greet the desk\nprint('hello, desk')",
    "Write comments above code to explain the intent of the following statement.",
    "Megaphone & Sticky Note",
    "# greet the desk\nprint('hello, desk')", "hello, desk", 22, 92, {
      analogyType: "megaphone_sticky",
      instructorExplanation: "Good developers write sticky notes with # so teammates know what the code is doing. Practice typing both the comment and the print statement."
    }),

  makeLesson(1, "1.4", "slide", "Variables: Labeled Boxes in Memory",
    "A variable is a name bound to a value in memory. score = 10 allocates RAM for integer 10 and points the label score to it.",
    "Variables store values in computer memory with identifiable labels.",
    "Storage Box & Value Swap",
    "score = 10\nprint(score)", "10", 22, 90, {
      analogyType: "box_reassign",
      instructorExplanation: "Think of a variable as a sturdy cardboard box with a name tag. Writing score = 10 drops the number 10 into the box labeled 'score' so you can retrieve it whenever you need it."
    }),

  makeLesson(1, "1.4", "code", "Reassigning Variables",
    "score = 10\nscore = score + 2\nprint(score)",
    "Variables can be updated by evaluating the right-hand side and binding the new result.",
    "Storage Box & Value Swap",
    "score = 10\nscore = score + 2\nprint(score)", "12", 24, 92, {
      analogyType: "box_reassign",
      instructorExplanation: "Watch the value swap in action: Python first computes 10 + 2 = 12 on the right, lifts the old 10 out of the box, and drops the new 12 inside!"
    }),

  makeLesson(1, "1.4", "quiz", "Quiz: Value After Arithmetic Update",
    "12",
    "What does score = 10 followed by score = score + 2 print?",
    "Storage Box & Value Swap",
    "12", "Correct! 10 + 2 = 12.", 20, 95, {
      analogyType: "box_reassign",
      instructorExplanation: "The box holds one value at a time. The new value 12 replaces the old 10."
    }),

  makeLesson(1, "1.5", "slide", "The Microphone: input()",
    "input() pauses execution and reads user input from the console. It always returns a string object.",
    "input() captures user keystrokes as a text string (str type).",
    "The Stage Microphone",
    "name = input('Name: ')\nprint(f'Welcome {name}!')", "Welcome Alex!", 22, 90, {
      analogyType: "microphone",
      instructorExplanation: "If print() is the megaphone shouting outward, input() is the microphone listening inward. It pauses Python and waits for the user to type something and press Enter."
    }),

  makeLesson(1, "1.5", "code", "Input and Numeric Conversion",
    "raw = input('n: ')\nn = int(raw)\nprint(n * 2)",
    "Cast string input with int() before doing numerical multiplication.",
    "The Type Converter Chamber",
    "raw = input('n: ')\nn = int(raw)\nprint(n * 2)", "10", 24, 92, {
      analogyType: "type_transformer",
      instructorExplanation: "Here is the biggest trap for freshers: input() always hears plain text! If a user types 5, Python receives '5' with quotes. You must send it through int() to strip the quotes before doing math."
    }),

  makeLesson(1, "1.5", "explain", "Why Casting Matters",
    "Without int(), the string '5' * 2 produces '55' instead of 10. Data types decide how operators behave.",
    "Operators are overloaded based on data type: '+' concatenates strings and adds numbers.",
    "The Type Converter Chamber",
    "print('5' + '5')\nprint(int('5') + int('5'))", "55\n10", 22, 90, {
      analogyType: "type_transformer",
      instructorExplanation: "Look at this difference: adding two strings glues them together like words ('5' + '5' = '55'). But converting them with int() does real math addition (5 + 5 = 10)!"
    }),

  makeLesson(1, "1.6", "slide", "Inspecting Types with type()",
    "The built-in type() function inspects any object at runtime and returns its class: type(42) returns <class 'int'>.",
    "Python is dynamically typed: variable types are checked and resolved at runtime.",
    "The Type Converter Chamber",
    "print(type(42))\nprint(type('hello'))", "<class 'int'>\n<class 'str'>", 22, 90, {
      analogyType: "type_transformer",
      instructorExplanation: "Whenever you are not sure what kind of data is living in your box, use type(). It inspects whether Python sees text, whole numbers, or decimals."
    }),

  makeLesson(1, "1.6", "code", "Declaring the Primitive Quartet",
    "age = 25\nrate = 3.14\nuser = 'Dev'\nis_active = True\nprint(age, rate, user, is_active)",
    "Declare integer, floating point, string, and boolean variables in sequence.",
    "Storage Box & Value Swap",
    "age = 25\nrate = 3.14\nuser = 'Dev'\nis_active = True\nprint(age, rate, user, is_active)", "25 3.14 Dev True", 24, 92, {
      analogyType: "box_reassign",
      instructorExplanation: "These are the 4 fundamental storage boxes of Python: whole numbers (int), decimals (float), text strings (str), and Yes/No flags (bool)."
    }),

  makeLesson(1, "1.7", "code", "Modern f-Strings: Fast & Clean Formatting",
    "name = 'Alex'\ncountry = 'Canada'\nprint(f'Hello my name is {name}. I am from {country}!')",
    "Instead of commas, modern Python uses f-strings: write f'...' and put variables inside {curly braces}.",
    "The Magic Template String",
    "name = 'Alex'\ncountry = 'Canada'\nprint(f'Hello my name is {name}. I am from {country}!')", "Hello my name is Alex. I am from Canada!", 24, 92, {
      analogyType: "megaphone",
      instructorExplanation: "Instead of dealing with awkward commas or messy plus signs, modern Python gives us f-strings! Just put an 'f' in front of your quotes and write variable names inside {curly braces}. Python automatically replaces {name} with its value!"
    }),

  makeLesson(1, "1.7", "drill", "Interactive Greeting with f-Strings",
    "# friendly interactive greeting\nname = input('Enter name: ')\ncountry = input('Enter country: ')\nprint(f'Hello my name is {name}. I am from {country}!')",
    "Combine input capture and clean f-string formatting into an easy-to-read greeting.",
    "The Greeting Kiosk",
    "# friendly interactive greeting\nname = input('Enter name: ')\ncountry = input('Enter country: ')\nprint(f'Hello my name is {name}. I am from {country}!')", "Hello my name is Alex. I am from Canada!", 25, 92, {
      analogyType: "microphone",
      instructorExplanation: "Look how easy this is to read! When you capture user input, you drop variables directly into your message with {name} and {country}. It reads like natural English with zero punctuation clutter."
    }),

  makeLesson(1, "1.8", "checkpoint", "Stage 1 Foundations Checkpoint",
    "# stage 1 mastery\napp = 'RETROSPEED'\nver = 3\nprint(f'{app} Python Engine {ver}')\nprint('STAGE 1 FOUNDATIONS PASSED')",
    "Stage 1 review verifying variables, data types, comments, and console printing.",
    "Stage 1 Milestone Arch",
    "# stage 1 mastery\napp = 'RETROSPEED'\nver = 3\nprint(f'{app} Python Engine {ver}')\nprint('STAGE 1 FOUNDATIONS PASSED')", "RETROSPEED Python Engine 3\nSTAGE 1 FOUNDATIONS PASSED", 25, 94, {
      analogyType: "box",
      instructorExplanation: "Congratulations on completing Stage 1! This checkpoint locks in your understanding of variables, comments, and runtime output before we dive into strings."
    }),

  makeLesson(1, "1.8", "play", "Press Room: Foundations Keywords",
    "print input int str type score name level # = ()",
    "Reflex arcade drill stamping Python keywords and syntax on incoming work orders.",
    "Rubber Stamp Reflexes",
    "print input int str type score name level # = ()", "", 24, 90, {
      analogyType: "machine",
      gameId: "press-room",
      targetKeys: ["p", "r", "i", "n", "t", "s", "u", "e"]
    })
];

stages.push({
  stageNumber: 1,
  id: "stage-1",
  title: "Stage 1: Python Foundations",
  targetWpm: 20,
  goal: "20 WPM",
  lessons: s1Lessons
});

// ==========================================
// STAGE 2: STRINGS & STRING METHODS (22 lessons)
// ==========================================
const s2Lessons = [
  makeLesson(2, "2.1", "slide", "Custom Delimiters with sep",
    "print accepts multiple items. By default it joins them with a space. Pass sep=' -> ' to insert custom glue between items.",
    "The sep parameter controls the separator string between multiple print arguments.",
    "Custom Ticket Glue",
    "print('A', 'B', 'C', sep=' -> ')", "A -> B -> C", 22, 90, {
      analogyType: "megaphone"
    }),

  makeLesson(2, "2.1", "code", "Pipeline Separator Formatting",
    "print('Ingest', 'Clean', 'Analyze', sep=' | ')\nprint('2026', '09', '02', sep='-')",
    "Use sep to format dates, pipelines, and CSV tokens in a single statement.",
    "Delimiter Press",
    "print('Ingest', 'Clean', 'Analyze', sep=' | ')\nprint('2026', '09', '02', sep='-')", "Ingest | Clean | Analyze\n2026-09-02", 24, 92, {
      analogyType: "megaphone"
    }),

  makeLesson(2, "2.2", "slide", "Controlling Line Endings with end",
    "print ends with a newline by default. Use end='' or end='... ' to keep the next print call on the very same screen line.",
    "The end parameter specifies the trailing character after printing all items.",
    "Inline Cursor Hold",
    "print('Downloading', end='... ')\nprint('Done!')", "Downloading... Done!", 22, 90, {
      analogyType: "megaphone"
    }),

  makeLesson(2, "2.2", "code", "Loading Indicator Stream",
    "print('Loading asset', end=' [')\nprint('====', end='] ')\nprint('100%')",
    "Combine multiple inline print calls to render real-time progress bars.",
    "Single Line Progress Bar",
    "print('Loading asset', end=' [')\nprint('====', end='] ')\nprint('100%')", "Loading asset [====] 100%", 24, 92, {
      analogyType: "megaphone"
    }),

  makeLesson(2, "2.3", "slide", "Escape Characters: \\n and \\t",
    "A backslash (\\) escapes the following character: \\n breaks into a new line, \\t inserts a tab stop, and \\\\ prints a literal backslash.",
    "Escape sequences allow invisible or special characters to be represented inside string literals.",
    "Invisible Formatting Codes",
    "print('NAME\\tSCORE\\nAlice\\t100')", "NAME\tSCORE\nAlice\t100", 22, 90, {
      analogyType: "train"
    }),

  makeLesson(2, "2.3", "code", "Formatted Console Table with Tabs",
    "print('RANK\\tUSER\\tWPM')\nprint('1\\tAlex\\t78')\nprint('2\\tMaya\\t74')",
    "Use \\t to align tabular data in monospace console outputs.",
    "Monospace Column Grid",
    "print('RANK\\tUSER\\tWPM')\nprint('1\\tAlex\\t78')\nprint('2\\tMaya\\t74')", "RANK\tUSER\tWPM\n1\tAlex\t78\n2\tMaya\t74", 24, 92, {
      analogyType: "train"
    }),

  makeLesson(2, "2.4", "slide", "Strings as Sequences & len()",
    "Strings are ordered sequences of characters. The len() function returns the exact total count of characters, including spaces and symbols.",
    "String characters are indexed sequentially from 0 to len(s) - 1.",
    "The Character Chain",
    "text = 'RETROSPEED'\nprint(f'Length: {len(text)}')", "Length: 10", 24, 90, {
      analogyType: "train"
    }),

  makeLesson(2, "2.4", "slide", "Zero-Based Indexing & Negative Offsets",
    "Access any character by its 0-based offset: s[0] is the head. Negative indices count backwards from the end: s[-1] is the last character.",
    "Zero-based indexing represents the distance from the start of the memory buffer.",
    "The Ruler Offset",
    "word = 'Python'\nprint(f'{word[0]} {word[-1]}')", "P n", 24, 90, {
      analogyType: "train"
    }),

  makeLesson(2, "2.4", "code", "Head & Tail Character Extraction",
    "filename = 'dataset.csv'\nfirst = filename[0]\nlast = filename[-1]\nprint(f'First: {first} Last: {last}')",
    "Extract first and last characters from filenames and paths.",
    "Boundary Inspection",
    "filename = 'dataset.csv'\nfirst = filename[0]\nlast = filename[-1]\nprint(f'First: {first} Last: {last}')", "First: d Last: v", 26, 92, {
      analogyType: "train"
    }),

  makeLesson(2, "2.4", "quiz", "Quiz: Index of First Item",
    "0",
    "What index retrieves the very first character in any Python sequence?",
    "First Index Recall",
    "0", "Correct! Python sequences start at index 0.", 20, 95, {
      analogyType: "train"
    }),

  makeLesson(2, "2.5", "slide", "String Slicing: [start:stop]",
    "Slicing extracts a substring using [start:stop]. The start index is included, but the stop index is excluded (half-open interval).",
    "Slicing never throws IndexError on out-of-range bounds; it gracefully truncates.",
    "The Substring Scalpel",
    "code = 'PY-312'\nprefix = code[0:2]\nprint(prefix)", "PY", 24, 90, {
      analogyType: "train"
    }),

  makeLesson(2, "2.5", "code", "Domain & Username Slicer",
    "email = 'dev@retro.io'\nuser = email[:3]\ndomain = email[4:]\nprint(f'User: {user} Domain: {domain}')",
    "Omit start to slice from the beginning, or omit stop to slice to the end.",
    "Email Partitioning",
    "email = 'dev@retro.io'\nuser = email[:3]\ndomain = email[4:]\nprint(f'User: {user} Domain: {domain}')", "User: dev Domain: retro.io", 26, 92, {
      analogyType: "train"
    }),

  makeLesson(2, "2.5", "slide", "Step Slicing & String Reversal [::-1]",
    "Pass a third parameter for step: s[::2] picks every second character. A negative step [::-1] cleanly reverses the entire string.",
    "Extended slicing [start:stop:step] controls traversal direction and stride.",
    "Stride & Inversion",
    "word = 'radar'\nprint(word[::-1])", "radar", 25, 90, {
      analogyType: "train"
    }),

  makeLesson(2, "2.5", "code", "Palindrome Checker Slicer",
    "token = 'level'\nis_palindrome = token == token[::-1]\nprint(f'{token} is palindrome: {is_palindrome}')",
    "Reverse strings with [::-1] to check symmetry.",
    "Palindrome Verifier",
    "token = 'level'\nis_palindrome = token == token[::-1]\nprint(f'{token} is palindrome: {is_palindrome}')", "level is palindrome: True", 26, 92, {
      analogyType: "train"
    }),

  makeLesson(2, "2.6", "slide", "Case Transforms: upper, lower, strip",
    "Strings are immutable. Methods like .upper(), .lower(), and .strip() return a fresh new transformed string without altering the original.",
    "String methods allocate new string objects rather than mutating in place.",
    "String Transformer Methods",
    "raw = '  admin  '\nclean = raw.strip().upper()\nprint(clean)", "ADMIN", 24, 90, {
      analogyType: "machine"
    }),

  makeLesson(2, "2.6", "code", "Sanitizing User Queries",
    "query = '  FIND DATA  '\nnormalized = query.strip().lower()\nprint(f'Search key: {normalized}')",
    "Sanitize search queries with method chaining .strip().lower().",
    "Query Normalizer",
    "query = '  FIND DATA  '\nnormalized = query.strip().lower()\nprint(f'Search key: {normalized}')", "Search key: find data", 26, 92, {
      analogyType: "machine"
    }),

  makeLesson(2, "2.6", "code", "Replacing Substrings with .replace()",
    "slug = 'python-course-basics'\nclean_title = slug.replace('-', ' ').title()\nprint(clean_title)",
    "Use .replace(old, new) to swap characters across text strings.",
    "Token Swapper",
    "slug = 'python-course-basics'\nclean_title = slug.replace('-', ' ').title()\nprint(clean_title)", "Python Course Basics", 26, 92, {
      analogyType: "machine"
    }),

  makeLesson(2, "2.7", "slide", "Searching with startswith & endswith",
    "startswith checks the head, endswith checks the tail, and find returns the first index of a substring or -1 if missing.",
    "Validate extensions and search needle positions safely without exceptions.",
    "Extension Inspector",
    "name = 'report.csv'\nprint(name.endswith('.csv'))\nprint(name.startswith('rep'))", "True\nTrue", 24, 90, {
      analogyType: "train"
    }),

  makeLesson(2, "2.7", "slide", "Modern f-Strings: Variable Injection",
    "Prefix a string with f to embed expressions directly inside curly braces: f'Score: {score} pts'. Fast, readable, and Pythonic.",
    "f-strings (PEP 498) evaluate embedded Python expressions at runtime with high speed.",
    "The Template Injector",
    "user = 'Alex'\nwpm = 82\nprint(f'{user} typed at {wpm} WPM')", "Alex typed at 82 WPM", 25, 90, {
      analogyType: "megaphone"
    }),

  makeLesson(2, "2.7", "code", "f-String Formatting Precision (:.2f)",
    "item = 'Switch'\nprice = 1.495\nqty = 10\nprint(f'{qty}x {item} @ ${price:.2f} = ${qty * price:.2f}')",
    "Format floats to two decimals using :.2f inside f-string placeholders.",
    "Price Tag Formatter",
    "item = 'Switch'\nprice = 1.495\nqty = 10\nprint(f'{qty}x {item} @ ${price:.2f} = ${qty * price:.2f}')", "10x Switch @ $1.50 = $14.95", 28, 92, {
      analogyType: "megaphone"
    }),

  makeLesson(2, "2.8", "drill", "String Parsing & Formatting Drill",
    "# parse student log\nentry = 'USER:042:MAYA:78WPM'\ntokens = entry.split(':')\nuid, name, speed = tokens[1], tokens[2], tokens[3]\nprint(f'Player #{uid} ({name}) hit {speed}')",
    "Combine splitting, indexing, and f-string interpolation to parse structured telemetry.",
    "Telemetry Record Parser",
    "# parse student log\nentry = 'USER:042:MAYA:78WPM'\ntokens = entry.split(':')\nuid, name, speed = tokens[1], tokens[2], tokens[3]\nprint(f'Player #{uid} ({name}) hit {speed}')", "Player #042 (MAYA) hit 78WPM", 28, 92, {
      analogyType: "train"
    }),

  makeLesson(2, "2.8", "checkpoint", "Stage 2 Strings Checkpoint",
    "s = 'python.touch.typing'\nparts = s.split('.')\nslug = '-'.join(parts)\nprint(f'SLUG: {slug.upper()}')\nprint('STAGE 2 STRINGS COMPLETE')",
    "Stage 2 review verifying split, join, case manipulation, and f-strings.",
    "Stage 2 Milestone Arch",
    "s = 'python.touch.typing'\nparts = s.split('.')\nslug = '-'.join(parts)\nprint(f'SLUG: {slug.upper()}')\nprint('STAGE 2 STRINGS COMPLETE')", "SLUG: PYTHON-TOUCH-TYPING\nSTAGE 2 STRINGS COMPLETE", 28, 94, {
      analogyType: "train"
    })
];

stages.push({
  stageNumber: 2,
  id: "stage-2",
  title: "Stage 2: Strings & String Methods",
  targetWpm: 22,
  goal: "22 WPM",
  lessons: s2Lessons
});

// ==========================================
// STAGE 3: NUMBERS, OPERATORS & MATH (16 lessons)
// ==========================================
const s3Lessons = [
  makeLesson(3, "3.1", "slide", "Floor Division (//) vs Float (/)",
    "Single slash (/) always returns a float (7 / 2 -> 3.5). Double slash (//) performs floor division, rounding down to an integer (7 // 2 -> 3).",
    "Floor division calculates the integer quotient, discarding any fractional remainder.",
    "Quotient vs Floor",
    "print(7 / 2)\nprint(7 // 2)", "3.5\n3", 24, 90, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.1", "code", "Seconds to Minutes Time Converter",
    "total_seconds = 185\nminutes = total_seconds // 60\nseconds = total_seconds % 60\nprint(f'{minutes}m {seconds}s')",
    "Use floor division and modulo to convert seconds into minutes and seconds.",
    "Clock Converter",
    "total_seconds = 185\nminutes = total_seconds // 60\nseconds = total_seconds % 60\nprint(f'{minutes}m {seconds}s')", "3m 5s", 26, 92, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.1", "slide", "Modulo (%) & Exponentiation (**)",
    "Modulo (%) returns the remainder of a division (17 % 5 -> 2). Exponentiation (**) raises a base to a power (2 ** 5 -> 32).",
    "Modulo is essential for parity checks and circular cycles; exponentiation calculates powers.",
    "Remainder & Power Operators",
    "print(17 % 5)\nprint(2 ** 5)", "2\n32", 24, 90, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.1", "code", "Even Number Divisibility & Powers",
    "num = 14\nis_even = (num % 2 == 0)\nbyte_combos = 2 ** 8\nprint(f'Even: {is_even} Byte combos: {byte_combos}')",
    "Test divisibility using num % 2 and compute 8-bit powers.",
    "Bit Combinatorics",
    "num = 14\nis_even = (num % 2 == 0)\nbyte_combos = 2 ** 8\nprint(f'Even: {is_even} Byte combos: {byte_combos}')", "Even: True Byte combos: 256", 26, 92, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.1", "quiz", "Quiz: 17 % 5 Remainder",
    "2",
    "What is the remainder when 17 is divided by 5?",
    "Modulo Math Recall",
    "2", "Correct! 17 = 5 * 3 + 2.", 20, 95, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.2", "slide", "Augmented Assignment (+=, -=, *=, /=)",
    "Shortcut operators update a variable in place: count += 1 is shorthand for count = count + 1. Clean, concise, and standard.",
    "Augmented assignment evaluates the right expression and modifies the left variable.",
    "The In-Place Incrementer",
    "total = 100\ntotal += 25\ntotal -= 10\nprint(total)", "115", 24, 90, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.2", "code", "Score Multiplier Accumulator",
    "score = 500\nscore += 150\nscore *= 2\nprint(f'Final score: {score}')",
    "Accumulate game points and apply streak multipliers using augmented operators.",
    "Scoreboard Accumulator",
    "score = 500\nscore += 150\nscore *= 2\nprint(f'Final score: {score}')", "Final score: 1300", 26, 92, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.3", "slide", "Built-In Math Functions: abs() & round()",
    "Python includes built-in functions: abs() for absolute value, round() for rounding, min() for lowest, and max() for highest.",
    "Built-in arithmetic utilities operate directly without requiring external module imports.",
    "The Numeric Swiss Army Knife",
    "print(abs(-42))\nprint(round(3.14159, 2))", "42\n3.14", 24, 90, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.3", "code", "Aggregate Math: min(), max(), sum()",
    "scores = [72, 95, 88, 64, 91]\nlow = min(scores)\nhigh = max(scores)\navg = round(sum(scores) / len(scores), 1)\nprint(f'Range: {low}-{high}, Avg: {avg}')",
    "Calculate min, max, sum, and average from score distributions.",
    "Statistical Bounds Extractor",
    "scores = [72, 95, 88, 64, 91]\nlow = min(scores)\nhigh = max(scores)\navg = round(sum(scores) / len(scores), 1)\nprint(f'Range: {low}-{high}, Avg: {avg}')", "Range: 64-95, Avg: 82.0", 28, 92, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.4", "slide", "Importing the math Standard Module",
    "Import standard library tools with import math. Access functions via dot notation: math.sqrt(64) or math.pi.",
    "The Python standard library provides batteries-included mathematical utilities.",
    "The Math Tool Chest",
    "import math\nprint(math.sqrt(64))\nprint(round(math.pi, 2))", "8.0\n3.14", 25, 90, {
      analogyType: "machine"
    }),

  makeLesson(3, "3.4", "code", "Square Roots & Floor Functions",
    "import math\nval = 15.8\nprint(f'Sqrt: {math.sqrt(16)}')\nprint(f'Floor: {math.floor(val)}')\nprint(f'Ceil: {math.ceil(val)}')",
    "Execute square roots and integer rounding boundaries with the math module.",
    "Geometric Calculator",
    "import math\nval = 15.8\nprint(f'Sqrt: {math.sqrt(16)}')\nprint(f'Floor: {math.floor(val)}')\nprint(f'Ceil: {math.ceil(val)}')", "Sqrt: 4.0\nFloor: 15\nCeil: 16", 26, 92, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.5", "code", "Random Number Generation with random",
    "import random\nroll = random.randint(1, 6)\nchoice = random.choice(['heads', 'tails'])\nprint(f'Dice: {roll} Coin: {choice}')",
    "Generate pseudo-random integers and select elements from collections.",
    "The Dice Shaker",
    "import random\nroll = random.randint(1, 6)\nchoice = random.choice(['heads', 'tails'])\nprint(f'Dice: {roll} Coin: {choice}')", "Dice: 6 Coin: heads", 26, 92, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.5", "code", "Checkout Register Tax Calculation",
    "subtotal = 89.50\ntax_rate = 0.08\ntax = subtotal * tax_rate\ntotal = round(subtotal + tax, 2)\nprint(f'Total bill: ${total}')",
    "Perform financial tax calculations and round currency values safely.",
    "Financial Ledger Engine",
    "subtotal = 89.50\ntax_rate = 0.08\ntax = subtotal * tax_rate\ntotal = round(subtotal + tax, 2)\nprint(f'Total bill: ${total}')", "Total bill: $96.66", 26, 92, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.6", "drill", "Physics 2D Velocity Vector Drill",
    "# 2D velocity magnitude\nimport math\nvx, vy = 12.0, 16.0\nspeed = math.sqrt(vx**2 + vy**2)\nangle_deg = round(math.degrees(math.atan2(vy, vx)), 1)\nprint(f'Speed: {speed} m/s, Angle: {angle_deg} deg')",
    "Calculate 2D velocity magnitude and heading angles.",
    "Physics Vector Engine",
    "# 2D velocity magnitude\nimport math\nvx, vy = 12.0, 16.0\nspeed = math.sqrt(vx**2 + vy**2)\nangle_deg = round(math.degrees(math.atan2(vy, vx)), 1)\nprint(f'Speed: {speed} m/s, Angle: {angle_deg} deg')", "Speed: 20.0 m/s, Angle: 53.1 deg", 28, 92, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.6", "checkpoint", "Stage 3 Numbers Checkpoint",
    "a, b = 25, 4\nq, r = divmod(a, b)\nprint(f'{a} // {b} = {q} rem {r}')\nprint('STAGE 3 MATH PASSED')",
    "Stage 3 milestone verifying integer math, division, and modulo operations.",
    "Stage 3 Milestone Gate",
    "a, b = 25, 4\nq, r = divmod(a, b)\nprint(f'{a} // {b} = {q} rem {r}')\nprint('STAGE 3 MATH PASSED')", "25 // 4 = 6 rem 1\nSTAGE 3 MATH PASSED", 28, 94, {
      analogyType: "arithmetic"
    }),

  makeLesson(3, "3.7", "play", "Fuse Box: Math Operators Duel",
    "// % ** += -= *= /= round abs min max math",
    "Reflex arcade wire patch typing mathematical and assignment operators.",
    "Operator Wire Terminal",
    "// % ** += -= *= /= round abs min max math", "", 26, 90, {
      analogyType: "arithmetic",
      gameId: "fuse-desk",
      targetKeys: ["/", "%", "*", "+", "-", "=", "<", ">"]
    })
];

stages.push({
  stageNumber: 3,
  id: "stage-3",
  title: "Stage 3: Numbers, Operators & Math",
  targetWpm: 24,
  goal: "24 WPM",
  lessons: s3Lessons
});

// ==========================================
// STAGE 4: BOOLEANS, LOGIC & COMPARISONS (16 lessons)
// ==========================================
const s4Lessons = [
  makeLesson(4, "4.1", "slide", "Comparison Operators (==, !=, <, >)",
    "Comparison operators test relationships and return boolean True or False: == checks value equality, != checks inequality, < and > test ordering.",
    "Comparisons evaluate expressions down to strict boolean primitives.",
    "The Logical Comparator",
    "x = 10\nprint(x == 10)\nprint(x != 5)\nprint(x > 20)", "True\nTrue\nFalse", 24, 90, {
      analogyType: "fork"
    }),

  makeLesson(4, "4.1", "explain", "Equality == vs Assignment =",
    "A single equal sign (=) assigns a value to a variable. A double equal sign (==) asks if two values are equal. Mixing them is a classic syntax bug.",
    "Assignment binds names; equality evaluates comparison.",
    "The Equal Sign Distinction",
    "status = 'active'\nis_admin = (status == 'admin')\nprint(is_admin)", "False", 22, 90, {
      analogyType: "fork"
    }),

  makeLesson(4, "4.1", "quiz", "Quiz: Equality Operator Token",
    "==",
    "What operator tests whether two values are equal in Python?",
    "Equality Token Check",
    "==", "Correct! Double equals == tests equality.", 20, 95, {
      analogyType: "fork"
    }),

  makeLesson(4, "4.2", "slide", "Logical Conjunction: and",
    "The and operator requires both operands to be True: True and True -> True. If either side is False, the entire expression evaluates to False.",
    "Logical AND represents intersection: both conditions must hold simultaneously.",
    "The Dual Key Lock",
    "age = 20\nhas_id = True\ncan_enter = (age >= 18 and has_id)\nprint(can_enter)", "True", 24, 90, {
      analogyType: "fork"
    }),

  makeLesson(4, "4.2", "code", "Security Gate with Dual Conditions",
    "user_role = 'editor'\nis_logged_in = True\nhas_write_access = (is_logged_in and user_role == 'editor')\nprint(f'Write access: {has_write_access}')",
    "Verify multiple authorization rules simultaneously with and.",
    "Access Control Guard",
    "user_role = 'editor'\nis_logged_in = True\nhas_write_access = (is_logged_in and user_role == 'editor')\nprint(f'Write access: {has_write_access}')", "Write access: True", 26, 92, {
      analogyType: "fork"
    }),

  makeLesson(4, "4.3", "slide", "Logical Disjunction: or",
    "The or operator requires at least one operand to be True: False or True -> True. It only evaluates to False if both sides are False.",
    "Logical OR represents union: any passing condition succeeds.",
    "The Multiple Door Entry",
    "is_admin = False\nis_owner = True\ncan_delete = (is_admin or is_owner)\nprint(can_delete)", "True", 24, 90, {
      analogyType: "fork"
    }),

  makeLesson(4, "4.3", "code", "Discount Eligibility with or Chains",
    "is_student = False\nis_senior = True\nhas_coupon = False\neligible = (is_student or is_senior or has_coupon)\nprint(f'Discount eligible: {eligible}')",
    "Combine multiple fallback qualifying flags using or chains.",
    "Promotional Discount Filter",
    "is_student = False\nis_senior = True\nhas_coupon = False\neligible = (is_student or is_senior or has_coupon)\nprint(f'Discount eligible: {eligible}')", "Discount eligible: True", 26, 92, {
      analogyType: "fork"
    }),

  makeLesson(4, "4.4", "slide", "Logical Negation: not",
    "The not operator inverts a boolean value: not True -> False, and not False -> True. Use it to check empty or uninitialized states.",
    "Logical NOT flips truthiness states.",
    "The Boolean Inverter",
    "is_locked = False\ncan_open = not is_locked\nprint(f'Can open: {can_open}')", "Can open: True", 24, 90, {
      analogyType: "fork"
    }),

  makeLesson(4, "4.4", "slide", "Truthy and Falsy Values",
    "In Python, empty values (0, 0.0, '', None, [], {}) are falsy. Any non-empty string, non-zero number, or populated structure is truthy.",
    "Truthiness allows clean conditional checks without verbose comparisons like len(x) > 0.",
    "Empty Box vs Filled Box",
    "print(bool(''))\nprint(bool('Python'))\nprint(bool(0))\nprint(bool(42))", "False\nTrue\nFalse\nTrue", 24, 90, {
      analogyType: "box"
    }),

  makeLesson(4, "4.4", "code", "Truthiness Spectrum Verification",
    "name = ''\nif not name:\n    print('Guest user identified')",
    "Idiomatic Python uses truthiness for concise guards.",
    "Truthiness Spectrum Meter",
    "name = ''\nif not name:\n    print('Guest user identified')", "Guest user identified", 26, 92, {
      analogyType: "box"
    }),

  makeLesson(4, "4.5", "explain", "Short-Circuit Evaluation Safety",
    "In a and b, if a is False, Python never evaluates b. In a or b, if a is True, Python stops immediately. This prevents crashes.",
    "Short-circuiting ensures safe attribute lookups without throwing NoneType errors.",
    "The Early Exit Circuit",
    "name = None\nis_valid = (name is not None and len(name) > 0)\nprint(f'Valid: {is_valid}')", "Valid: False", 22, 90, {
      analogyType: "fork"
    }),

  makeLesson(4, "4.6", "slide", "Membership Testing with in and not in",
    "The in operator checks if an item exists inside a container (string, list, set, dict). not in checks if it is absent.",
    "Membership testing provides readable, high-speed lookup across collections.",
    "The Guest List Inspector",
    "vowels = 'aeiou'\nprint('e' in vowels)\nprint('x' not in vowels)", "True\nTrue", 24, 90, {
      analogyType: "tray"
    }),

  makeLesson(4, "4.6", "code", "Allowed Domain Whitelist Guard",
    "whitelist = ['retro.io', 'python.org']\nhost = 'retro.io'\nis_allowed = (host in whitelist)\nprint(f'Host {host} allowed: {is_allowed}')",
    "Validate network domain origins against safe lists.",
    "Domain Whitelist Guard",
    "whitelist = ['retro.io', 'python.org']\nhost = 'retro.io'\nis_allowed = (host in whitelist)\nprint(f'Host {host} allowed: {is_allowed}')", "Host retro.io allowed: True", 26, 92, {
      analogyType: "tray"
    }),

  makeLesson(4, "4.7", "slide", "Identity (is) vs Equality (==)",
    "== checks if two objects have identical values. is checks if both variables point to the exact same memory address. Use is for None.",
    "Value equality vs object identity in Python memory.",
    "Same Value vs Same Object",
    "a = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)\nprint(a is b)", "True\nFalse", 24, 90, {
      analogyType: "box"
    }),

  makeLesson(4, "4.8", "drill", "Complex Role Permission Gate Drill",
    "# user permission evaluator\nis_auth = True\nis_verified = True\nis_banned = False\nrole = 'moderator'\ncan_publish = (is_auth and is_verified and not is_banned and role in ['admin', 'moderator'])\nprint(f'Can publish: {can_publish}')",
    "Combine authentication, verification, ban status, and role checking into a single boolean decision.",
    "Role Permission Evaluator",
    "# user permission evaluator\nis_auth = True\nis_verified = True\nis_banned = False\nrole = 'moderator'\ncan_publish = (is_auth and is_verified and not is_banned and role in ['admin', 'moderator'])\nprint(f'Can publish: {can_publish}')", "Can publish: True", 28, 92, {
      analogyType: "fork"
    }),

  makeLesson(4, "4.8", "checkpoint", "Stage 4 Logic Checkpoint",
    "flag_a = True\nflag_b = False\nres = (flag_a or flag_b) and not (flag_a and flag_b)\nprint(f'XOR Result: {res}')\nprint('STAGE 4 LOGIC MASTERED')",
    "Stage 4 milestone verifying boolean algebra and XOR emulation.",
    "Stage 4 Milestone Gate",
    "flag_a = True\nflag_b = False\nres = (flag_a or flag_b) and not (flag_a and flag_b)\nprint(f'XOR Result: {res}')\nprint('STAGE 4 LOGIC MASTERED')", "XOR Result: True\nSTAGE 4 LOGIC MASTERED", 28, 94, {
      analogyType: "fork"
    })
];

stages.push({
  stageNumber: 4,
  id: "stage-4",
  title: "Stage 4: Booleans, Logic & Comparisons",
  targetWpm: 25,
  goal: "25 WPM",
  lessons: s4Lessons
});

// ==========================================
// STAGE 5: CONTROL FLOW & BRANCHING (20 lessons)
// ==========================================
const s5Lessons = [
  makeLesson(5, "5.1", "slide", "Conditional Execution with if",
    "An if statement evaluates a boolean expression. If True, Python executes the indented block below it. Indentation must be 4 spaces.",
    "Code blocks in Python are defined strictly by whitespace indentation.",
    "The Decision Fork",
    "score = 85\nif score >= 80:\n    print('Great job!')", "Great job!", 24, 90, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.1", "code", "Basic if Block Execution",
    "speed = 72\nif speed > 60:\n    print('Turbo Speed Active!')",
    "Execute conditional branch when speed threshold is met.",
    "Speed Sensor Trigger",
    "speed = 72\nif speed > 60:\n    print('Turbo Speed Active!')", "Turbo Speed Active!", 26, 92, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.2", "slide", "Two-Way Branching: if-else",
    "Use else to provide an alternate execution path when the if condition evaluates to False. Exactly one branch will run.",
    "Binary choice branching guarantees one of two blocks will execute.",
    "The Fork in the Road",
    "accuracy = 92\nif accuracy >= 95:\n    print('Gold Star')\nelse:\n    print('Silver Star')", "Silver Star", 24, 90, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.2", "code", "Pass / Fail Exam Evaluation",
    "score = 75\nif score >= 60:\n    print('Status: PASS')\nelse:\n    print('Status: RETRY')",
    "Evaluate student score and route to PASS or RETRY branches.",
    "Exam Grading Gate",
    "score = 75\nif score >= 60:\n    print('Status: PASS')\nelse:\n    print('Status: RETRY')", "Status: PASS", 26, 92, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.3", "slide", "Multi-Branch Ladders: elif",
    "Chain multiple mutual exclusive conditions using elif (short for else if). Python evaluates from top to bottom, stopping at the first True match.",
    "Multi-way decision ladders route code across sequential criteria.",
    "The Multi-Track Switch",
    "tier = 2\nif tier == 1:\n    print('Bronze')\nelif tier == 2:\n    print('Silver')\nelse:\n    print('Gold')", "Silver", 24, 90, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.3", "code", "Letter Grade Dispatcher with elif",
    "marks = 88\nif marks >= 90:\n    grade = 'A'\nelif marks >= 80:\n    grade = 'B'\nelif marks >= 70:\n    grade = 'C'\nelse:\n    grade = 'F'\nprint(f'Grade: {grade}')",
    "Map percentage marks to academic letter grades with an elif ladder.",
    "Grading Ladder Dispatcher",
    "marks = 88\nif marks >= 90:\n    grade = 'A'\nelif marks >= 80:\n    grade = 'B'\nelif marks >= 70:\n    grade = 'C'\nelse:\n    grade = 'F'\nprint(f'Grade: {grade}')", "Grade: B", 26, 92, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.3", "quiz", "Quiz: Keyword for Else-If",
    "elif",
    "What keyword does Python use for 'else if'?",
    "Syntax Keyword Recall",
    "elif", "Correct! elif is Python's else-if.", 20, 95, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.4", "slide", "Nested Conditional Statements",
    "An if statement inside another if block creates nested decision trees. Use nesting when an action requires qualifying secondary criteria.",
    "Nested conditions evaluate dependent hierarchies of logic.",
    "Nested Checkpoints",
    "is_member = True\nbalance = 50\nif is_member:\n    if balance >= 20:\n        print('Purchase approved')", "Purchase approved", 24, 90, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.4", "code", "User Permission Nested Validator",
    "role = 'admin'\nis_active = True\nif is_active:\n    if role == 'admin':\n        print('Full root control')\n    else:\n        print('Standard read-only')",
    "Validate account status before testing administrative roles.",
    "Multi-Tier Access Gate",
    "role = 'admin'\nis_active = True\nif is_active:\n    if role == 'admin':\n        print('Full root control')\n    else:\n        print('Standard read-only')", "Full root control", 26, 92, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.5", "slide", "Ternary Expressions (Inline If)",
    "Condense simple if-else decisions into one clean line: value_if_true if condition else value_if_false.",
    "Ternary conditional expressions return values inline.",
    "One-Line Selector",
    "age = 20\nstatus = 'Adult' if age >= 18 else 'Minor'\nprint(status)", "Adult", 24, 90, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.5", "code", "Theme Selector Inline Ternary",
    "is_dark_mode = True\nbg_color = '#2D2319' if is_dark_mode else '#FDF8EE'\nprint(f'Background: {bg_color}')",
    "Select UI palette tokens using inline ternary statements.",
    "Inline Theme Switch",
    "is_dark_mode = True\nbg_color = '#2D2319' if is_dark_mode else '#FDF8EE'\nprint(f'Background: {bg_color}')", "Background: #2D2319", 26, 92, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.6", "slide", "Structural Pattern Matching: match-case",
    "Python 3.10 introduced match-case for pattern matching: match command: case 'start': ... case _: (default fallback).",
    "Structural pattern matching provides clean declarative routing over values and structures.",
    "The Pattern Routing Hub",
    "command = 'start'\nmatch command:\n    case 'start':\n        print('System starting')\n    case 'stop':\n        print('System stopped')\n    case _:\n        print('Unknown')", "System starting", 26, 90, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.6", "code", "HTTP Status Router with match-case",
    "status_code = 200\nmatch status_code:\n    case 200:\n        msg = 'OK'\n    case 404:\n        msg = 'Not Found'\n    case _:\n        msg = 'Error'\nprint(f'HTTP Response: {msg}')",
    "Route HTTP status codes cleanly using match-case blocks.",
    "Status Code Router",
    "status_code = 200\nmatch status_code:\n    case 200:\n        msg = 'OK'\n    case 404:\n        msg = 'Not Found'\n    case _:\n        msg = 'Error'\nprint(f'HTTP Response: {msg}')", "HTTP Response: OK", 28, 92, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.7", "code", "Wildcard Fallback in match-case",
    "action = 'unknown_op'\nmatch action:\n    case 'save':\n        res = 'Saved'\n    case _:\n        res = 'Fallback default'\nprint(res)",
    "Use the underscore _ case as the catch-all wildcard branch.",
    "Default Route Catchall",
    "action = 'unknown_op'\nmatch action:\n    case 'save':\n        res = 'Saved'\n    case _:\n        res = 'Fallback default'\nprint(res)", "Fallback default", 26, 92, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.7", "explain", "Guard Clauses and Early Exits",
    "Instead of deeply nesting multiple if statements, check for invalid states at the top and exit early. This keeps code flat and readable.",
    "Guard clauses eliminate indentation drift in production code.",
    "The Bouncer Pattern",
    "token = None\nif not token:\n    print('Abort: Missing token')", "Abort: Missing token", 24, 90, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.8", "drill", "Discount Tier Bracket Drill",
    "cart_total = 120\ndiscount = 0.20 if cart_total > 100 else 0.05\nfinal_price = cart_total * (1 - discount)\nprint(f'Final: ${final_price:.2f}')",
    "Apply percentage discounts based on shopping cart order thresholds.",
    "Pricing Ladder Calculator",
    "cart_total = 120\ndiscount = 0.20 if cart_total > 100 else 0.05\nfinal_price = cart_total * (1 - discount)\nprint(f'Final: ${final_price:.2f}')", "Final: $96.00", 28, 92, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.8", "drill", "Speed Trap Alert Logic Drill",
    "speed = 65\nlimit = 55\nif speed > limit + 10:\n    penalty = 'Ticket'\nelif speed > limit:\n    penalty = 'Warning'\nelse:\n    penalty = 'OK'\nprint(f'Status: {penalty}')",
    "Calculate driving infraction severity based on speed radar limits.",
    "Speed Radar Dispatcher",
    "speed = 65\nlimit = 55\nif speed > limit + 10:\n    penalty = 'Ticket'\nelif speed > limit:\n    penalty = 'Warning'\nelse:\n    penalty = 'OK'\nprint(f'Status: {penalty}')", "Status: Warning", 28, 92, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.9", "drill", "Rock Paper Scissors Rule Resolver",
    "p1, p2 = 'rock', 'scissors'\nif p1 == p2:\n    res = 'Draw'\nelif (p1 == 'rock' and p2 == 'scissors') or (p1 == 'paper' and p2 == 'rock'):\n    res = 'Player 1 wins'\nelse:\n    res = 'Player 2 wins'\nprint(res)",
    "Resolve tournament outcome rules between two player weapon choices.",
    "Referee Decision Matrix",
    "p1, p2 = 'rock', 'scissors'\nif p1 == p2:\n    res = 'Draw'\nelif (p1 == 'rock' and p2 == 'scissors') or (p1 == 'paper' and p2 == 'rock'):\n    res = 'Player 1 wins'\nelse:\n    res = 'Player 2 wins'\nprint(res)", "Player 1 wins", 28, 92, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.9", "checkpoint", "Stage 5 Control Flow Checkpoint",
    "flag = True\nstatus = 'ACTIVE' if flag else 'OFFLINE'\nprint(f'SYSTEM: {status}')\nprint('STAGE 5 CONTROL FLOW MASTERED')",
    "Stage 5 checkpoint verifying if-else, elif, ternary, and pattern matching.",
    "Stage 5 Milestone Gate",
    "flag = True\nstatus = 'ACTIVE' if flag else 'OFFLINE'\nprint(f'SYSTEM: {status}')\nprint('STAGE 5 CONTROL FLOW MASTERED')", "SYSTEM: ACTIVE\nSTAGE 5 CONTROL FLOW MASTERED", 28, 94, {
      analogyType: "fork"
    }),

  makeLesson(5, "5.10", "play", "Night Market: Control Flow Keywords",
    "if elif else match case _ pass and or not in",
    "Arcade dispatch drill stamping Python control flow and branching keywords.",
    "Control Flow Stamp Shift",
    "if elif else match case _ pass and or not in", "", 26, 90, {
      analogyType: "fork",
      gameId: "night-market",
      targetKeys: ["i", "f", "e", "l", "s", "m", "a", "t", "c", "h"]
    })
];

stages.push({
  stageNumber: 5,
  id: "stage-5",
  title: "Stage 5: Control Flow & Branching",
  targetWpm: 26,
  goal: "26 WPM",
  lessons: s5Lessons
});

// ==========================================
// STAGE 6: LOOPS & ITERATION (24 lessons)
// ==========================================
const s6Lessons = [
  makeLesson(6, "6.1", "slide", "Definite Iteration with for Loops",
    "A for loop iterates over each item in a sequence (string, list, range). The loop variable updates automatically each iteration.",
    "for loops process collections item by item until exhausted.",
    "The Conveyor Belt",
    "for char in 'ABC':\n    print(f'Key: {char}')", "Key: A\nKey: B\nKey: C", 26, 90, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.1", "code", "Iterating String Characters",
    "word = 'PYTHON'\nfor letter in word:\n    print(f'[{letter}]', end=' ')\nprint()",
    "Traverse text strings character by character.",
    "Character Car Inspector",
    "word = 'PYTHON'\nfor letter in word:\n    print(f'[{letter}]', end=' ')\nprint()", "[P] [Y] [T] [H] [O] [N] ", 26, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.1", "code", "Iterating List Collections",
    "tools = ['terminal', 'editor', 'git']\nfor tool in tools:\n    print(f'Using {tool}')",
    "Iterate through lists of strings and process items sequentially.",
    "Toolbox Item Loader",
    "tools = ['terminal', 'editor', 'git']\nfor tool in tools:\n    print(f'Using {tool}')", "Using terminal\nUsing editor\nUsing git", 26, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.2", "slide", "Generating Sequences with range()",
    "range(stop) counts from 0 up to stop - 1. range(start, stop, step) customizes start offset and stride.",
    "range generates numbers in memory on demand without allocating large lists.",
    "The Number Generator",
    "for i in range(1, 4):\n    print(f'Lap {i}')", "Lap 1\nLap 2\nLap 3", 26, 90, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.2", "code", "Range Stepping & Even Summation",
    "total = 0\nfor n in range(2, 11, 2):\n    total += n\nprint(f'Sum of evens: {total}')",
    "Use range step to iterate over even numbers and accumulate sums.",
    "Even Step Stride",
    "total = 0\nfor n in range(2, 11, 2):\n    total += n\nprint(f'Sum of evens: {total}')", "Sum of evens: 30", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.2", "quiz", "Quiz: range(3) Output",
    "[0, 1, 2]",
    "What list of numbers is produced by range(3)?",
    "Range Output Check",
    "[0, 1, 2]", "Correct! range(3) produces 0, 1, 2.", 20, 95, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.3", "code", "The Accumulator Loop Pattern",
    "total = 0\nfor x in range(1, 6):\n    total += x\nprint(f'Sum 1-5: {total}')",
    "Initialize an accumulator variable before the loop and increment it inside.",
    "Rolling Total Hopper",
    "total = 0\nfor x in range(1, 6):\n    total += x\nprint(f'Sum 1-5: {total}')", "Sum 1-5: 15", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.3", "slide", "Tracking Indices with enumerate()",
    "enumerate(sequence, start=0) yields both the index and the item during each loop pass, eliminating manual index tracking.",
    "Enumerate pairs sequential counter indices with collection values.",
    "Numbered Checklist",
    "keys = ['F', 'J', 'D']\nfor i, k in enumerate(keys, 1):\n    print(f'{i}. Key {k}')", "1. Key F\n2. Key J\n3. Key D", 26, 90, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.3", "code", "Leaderboard Rank Enumerator",
    "podium = ['Alpha', 'Bravo', 'Charlie']\nfor rank, player in enumerate(podium, 1):\n    print(f'#{rank}: {player}')",
    "Enumerate leaderboard podium winners with 1-based ranks.",
    "Podium Ranker",
    "podium = ['Alpha', 'Bravo', 'Charlie']\nfor rank, player in enumerate(podium, 1):\n    print(f'#{rank}: {player}')", "#1: Alpha\n#2: Bravo\n#3: Charlie", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.4", "slide", "Parallel Iteration with zip()",
    "zip() pairs up corresponding elements from multiple lists simultaneously: for name, score in zip(names, scores):.",
    "zip combines multiple iterables into tuples of grouped elements.",
    "The Zipper Mechanism",
    "users = ['A', 'B']\nwpm = [80, 95]\nfor u, w in zip(users, wpm):\n    print(f'{u} {w}')", "A 80\nB 95", 26, 90, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.4", "code", "Multi-List Telemetry Pairing",
    "subjects = ['Speed', 'Accuracy']\nscores = [92, 98]\nfor subj, score in zip(subjects, scores):\n    print(f'{subj}: {score}%')",
    "Pair metrics and percentages across lists with zip().",
    "Metric Pairing Engine",
    "subjects = ['Speed', 'Accuracy']\nscores = [92, 98]\nfor subj, score in zip(subjects, scores):\n    print(f'{subj}: {score}%')", "Speed: 92%\nAccuracy: 98%", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.5", "slide", "Indefinite Loops with while",
    "A while loop keeps running as long as its condition remains True. Always make sure the loop body updates the condition variable.",
    "while loops execute repeatedly until a state condition is invalidated.",
    "The Running Motor",
    "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint('GO!')", "3\n2\n1\nGO!", 26, 90, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.5", "code", "Countdown Timer Sequence",
    "timer = 3\nwhile timer > 0:\n    print(f'T-{timer}s')\n    timer -= 1\nprint('LIFTOFF!')",
    "Simulate rocket liftoff countdown sequences with while loops.",
    "Rocket Launch Timer",
    "timer = 3\nwhile timer > 0:\n    print(f'T-{timer}s')\n    timer -= 1\nprint('LIFTOFF!')", "T-3s\nT-2s\nT-1s\nLIFTOFF!", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.5", "code", "Geometric Doubling While Loop",
    "n = 1\nwhile n <= 8:\n    print(n, end=' ')\n    n *= 2\nprint()",
    "Double power of two counters indefinitely inside while loops.",
    "Binary Doubler",
    "n = 1\nwhile n <= 8:\n    print(n, end=' ')\n    n *= 2\nprint()", "1 2 4 8 ", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.6", "slide", "Breaking Out Early with break",
    "The break statement terminates the active loop immediately, jumping directly to the first line of code after the loop.",
    "break halts iteration instantly upon discovering a target or error condition.",
    "The Emergency Stop Switch",
    "for n in range(10):\n    if n == 3:\n        break\n    print(n)", "0\n1\n2", 26, 90, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.6", "code", "Target Item Search with break",
    "target = 'FLAG'\nitems = ['DATA', 'KEY', 'FLAG', 'LOG']\nfor item in items:\n    if item == target:\n        print('Found target!')\n        break",
    "Halt collection scans immediately when search needle is found.",
    "Linear Search Finder",
    "target = 'FLAG'\nitems = ['DATA', 'KEY', 'FLAG', 'LOG']\nfor item in items:\n    if item == target:\n        print('Found target!')\n        break", "Found target!", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.7", "slide", "Skipping Iterations with continue",
    "The continue statement skips the rest of the current iteration and jumps immediately to the next loop pass.",
    "continue bypasses unwanted elements without stopping the whole loop.",
    "Skip to Next Track",
    "for n in range(5):\n    if n % 2 == 0:\n        continue\n    print(n)", "1\n3", 26, 90, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.7", "code", "Filtering Tokens with continue",
    "tokens = ['valid', '', 'clean']\nfor t in tokens:\n    if not t:\n        continue\n    print(f'Token: {t}')",
    "Skip empty string tokens using continue guards.",
    "Dirty Token Filter",
    "tokens = ['valid', '', 'clean']\nfor t in tokens:\n    if not t:\n        continue\n    print(f'Token: {t}')", "Token: valid\nToken: clean", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.8", "slide", "The Loop else Clause",
    "A loop can have an else block. It executes only if the loop finishes naturally without encountering a break statement.",
    "Loop else acts as a 'no-break' completion handler.",
    "Exhausted Search Trigger",
    "for n in [1, 3, 5]:\n    if n % 2 == 0:\n        break\nelse:\n    print('No evens found')", "No evens found", 26, 90, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.8", "code", "Prime Number Search Engine",
    "n = 7\nfor i in range(2, n):\n    if n % i == 0:\n        print(f'{n} is composite')\n        break\nelse:\n    print(f'{n} is prime!')",
    "Verify primality using loop-else to detect when no divisors exist.",
    "Prime Number Verifier",
    "n = 7\nfor i in range(2, n):\n    if n % i == 0:\n        print(f'{n} is composite')\n        break\nelse:\n    print(f'{n} is prime!')", "7 is prime!", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.9", "slide", "Nested Loops & 2D Matrix Grids",
    "A loop inside another loop is a nested loop. The inner loop completes all its iterations for every single pass of the outer loop.",
    "Nested iteration traverses 2D tables and matrix grids.",
    "Row and Column Traversal",
    "for r in range(2):\n    for c in range(2):\n        print(f'({r},{c})', end=' ')\n    print()", "(0,0) (0,1) \n(1,0) (1,1) ", 26, 90, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.9", "code", "ASCII Matrix Grid Plotter",
    "for row in range(3):\n    for col in range(3):\n        print('#', end=' ')\n    print()",
    "Render 2D ASCII square grids with nested row-column iterations.",
    "Monospace Grid Painter",
    "for row in range(3):\n    for col in range(3):\n        print('#', end=' ')\n    print()", "# # # \n# # # \n# # # ", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.10", "drill", "Classic FizzBuzz Algorithm Drill",
    "for i in range(1, 6):\n    if i % 15 == 0:\n        print('FizzBuzz')\n    elif i % 3 == 0:\n        print('Fizz')\n    elif i % 5 == 0:\n        print('Buzz')\n    else:\n        print(i)",
    "Implement the classic software interview FizzBuzz sequence.",
    "FizzBuzz Division Filter",
    "for i in range(1, 6):\n    if i % 15 == 0:\n        print('FizzBuzz')\n    elif i % 3 == 0:\n        print('Fizz')\n    elif i % 5 == 0:\n        print('Buzz')\n    else:\n        print(i)", "1\n2\nFizz\n4\nBuzz", 28, 92, {
      analogyType: "conveyor"
    }),

  makeLesson(6, "6.10", "checkpoint", "Stage 6 Loops Checkpoint",
    "total = sum(x for x in range(10) if x % 3 == 0)\nprint(f'Total multiples of 3: {total}')\nprint('STAGE 6 LOOPS MASTERED')",
    "Stage 6 milestone verifying for loops, while loops, range, and iteration.",
    "Stage 6 Milestone Gate",
    "total = sum(x for x in range(10) if x % 3 == 0)\nprint(f'Total multiples of 3: {total}')\nprint('STAGE 6 LOOPS MASTERED')", "Total multiples of 3: 18\nSTAGE 6 LOOPS MASTERED", 28, 94, {
      analogyType: "conveyor"
    })
];

stages.push({
  stageNumber: 6,
  id: "stage-6",
  title: "Stage 6: Loops & Iteration",
  targetWpm: 28,
  goal: "28 WPM",
  lessons: s6Lessons
});

// ==========================================
// STAGE 7: DATA STRUCTURES (35 lessons)
// ==========================================
const s7Lessons = [
  makeLesson(7, "7.1", "slide", "Lists: Mutable Ordered Sequences",
    "Lists are mutable sequences written with square brackets: [1, 2, 3]. Elements can be changed, added, or removed after creation.",
    "Lists provide dynamic array storage in Python with index-based access.",
    "The Expandable Shelf",
    "items = ['apple', 'berry']\nprint(f'First item: {items[0]}')", "First item: apple", 28, 90, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.1", "code", "Creating and Indexing Lists",
    "languages = ['Python', 'Rust', 'TypeScript']\nprint(f'First: {languages[0]}')\nprint(f'Last: {languages[-1]}')",
    "Access list elements by forward 0-based and backward -1 indices.",
    "Numbered Slot Access",
    "languages = ['Python', 'Rust', 'TypeScript']\nprint(f'First: {languages[0]}')\nprint(f'Last: {languages[-1]}')", "First: Python\nLast: TypeScript", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.2", "slide", "Appending Elements with .append()",
    ".append(x) adds x to the tail in O(1) time. It mutates the list in place and returns None.",
    "Dynamic list growth through in-place append operations.",
    "Adding Items to Conveyor",
    "cart = []\ncart.append('Switch')\ncart.append('Keycap')\nprint(f'Cart: {cart}')", "Cart: ['Switch', 'Keycap']", 28, 90, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.2", "code", "Dynamic Shopping Cart Appending",
    "cart = ['Switch']\ncart.append('Lube')\nprint(f'Cart length: {len(cart)}')\nprint(f'Items: {cart}')",
    "Grow inventory arrays dynamically with sequential append calls.",
    "Cart Item Accumulator",
    "cart = ['Switch']\ncart.append('Lube')\nprint(f'Cart length: {len(cart)}')\nprint(f'Items: {cart}')", "Cart length: 2\nItems: ['Switch', 'Lube']", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.2", "code", "Inserting at Specific Index with .insert()",
    "nums = [1, 3]\nnums.insert(1, 2)\nprint(f'Inserted list: {nums}')",
    "Use .insert(index, value) to inject elements at arbitrary list positions.",
    "Slot Inserter",
    "nums = [1, 3]\nnums.insert(1, 2)\nprint(f'Inserted list: {nums}')", "Inserted list: [1, 2, 3]", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.3", "slide", "Removing Elements: pop and remove",
    ".pop() removes and returns the last element. .pop(i) removes at index i. .remove(x) searches and deletes the first match of value x.",
    "List item deletion methods supporting LIFO stacks and value-based removal.",
    "Popping Items off Stack",
    "stack = ['a', 'b', 'c']\ntop = stack.pop()\nprint(f'Popped: {top} | Remaining: {stack}')", "Popped: c | Remaining: ['a', 'b']", 28, 90, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.3", "code", "Stack LIFO Execution with .pop()",
    "tasks = ['read', 'type', 'compile']\nactive = tasks.pop()\nprint(f'Executing: {active}')\nprint(f'Pending: {tasks}')",
    "Implement Last-In First-Out execution queues with list.pop().",
    "Stack Task Dispatcher",
    "tasks = ['read', 'type', 'compile']\nactive = tasks.pop()\nprint(f'Executing: {active}')\nprint(f'Pending: {tasks}')", "Executing: compile\nPending: ['read', 'type']", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.3", "quiz", "Quiz: Default Behavior of pop()",
    "last",
    "Which element does list.pop() remove when called with no arguments?",
    "Default Pop Recall",
    "last", "Correct! .pop() defaults to removing the tail item.", 20, 95, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.4", "code", "List Slicing and In-Place Patching",
    "colors = ['red', 'green', 'blue']\ncolors[1:3] = ['emerald', 'sapphire']\nprint(colors)",
    "Assign directly to slice ranges to replace multiple list elements simultaneously.",
    "Sub-Array Patching",
    "colors = ['red', 'green', 'blue']\ncolors[1:3] = ['emerald', 'sapphire']\nprint(colors)", "['red', 'emerald', 'sapphire']", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.4", "code", "Sorting Lists with .sort() vs sorted()",
    "nums = [5, 2, 8, 1]\nnums.sort()\nprint(f'Sorted in-place: {nums}')",
    ".sort() mutates the list in place; sorted() returns a brand new sorted list.",
    "Data Reorganizer",
    "nums = [5, 2, 8, 1]\nnums.sort()\nprint(f'Sorted in-place: {nums}')", "Sorted in-place: [1, 2, 5, 8]", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.5", "slide", "Tuples: Immutable Ordered Records",
    "Tuples are immutable sequences defined with parentheses: (10, 20). Once created, their items cannot be modified, added, or removed.",
    "Tuples provide read-only data integrity and can serve as dictionary keys.",
    "The Sealed Capsule",
    "point = (1920, 1080)\nprint(f'Width: {point[0]} Height: {point[1]}')", "Width: 1920 Height: 1080", 28, 90, {
      analogyType: "box"
    }),

  makeLesson(7, "7.5", "code", "Tuple Unpacking to Named Variables",
    "dimensions = (1280, 720)\nwidth, height = dimensions\nprint(f'{width}x{height} HD')",
    "Unpack tuple elements into discrete descriptive variable names.",
    "Coordinate Unpacker",
    "dimensions = (1280, 720)\nwidth, height = dimensions\nprint(f'{width}x{height} HD')", "1280x720 HD", 28, 92, {
      analogyType: "box"
    }),

  makeLesson(7, "7.5", "code", "Extended Unpacking with Rest (*)",
    "scores = [99, 85, 82, 70]\ntop, *others = scores\nprint(f'Top: {top} Others: {others}')",
    "Use an asterisk (*) during unpacking to capture remaining elements into a list.",
    "Head and Tail Collector",
    "scores = [99, 85, 82, 70]\ntop, *others = scores\nprint(f'Top: {top} Others: {others}')", "Top: 99 Others: [85, 82, 70]", 28, 92, {
      analogyType: "box"
    }),

  makeLesson(7, "7.5", "quiz", "Quiz: Bracket Syntax for Tuples",
    "()",
    "What bracket style defines a tuple in Python?",
    "Tuple Bracket Check",
    "()", "Correct! Tuples use round parentheses ().", 20, 95, {
      analogyType: "box"
    }),

  makeLesson(7, "7.6", "slide", "Dictionaries: Key-Value Hash Maps",
    "Dictionaries store key-value pairs inside curly braces: {'user': 'Alex', 'wpm': 80}. Keys must be immutable objects.",
    "Dictionaries provide average O(1) key lookup and retrieval.",
    "The Keyed Locker System",
    "user = {'name': 'Alex', 'score': 100}\nprint(f\"{user['name']} {user['score']}\")", "Alex 100", 28, 90, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.6", "code", "Creating and Accessing Dictionary Keys",
    "specs = {'cpu': 'M3', 'ram': 16}\nprint(f\"{specs['cpu']} with {specs['ram']}GB RAM\")",
    "Store structured object attributes in key-value dictionary hash maps.",
    "Hardware Spec Registry",
    "specs = {'cpu': 'M3', 'ram': 16}\nprint(f\"{specs['cpu']} with {specs['ram']}GB RAM\")", "M3 with 16GB RAM", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.6", "code", "Dictionary Mutation and Key Insertion",
    "hero = {'name': 'Knight', 'hp': 100}\nhero['hp'] = 90\nhero['level'] = 2\nprint(f'Hero: {hero}')",
    "Mutate dictionary values and assign new key-value pairs dynamically.",
    "Player Stats Updater",
    "hero = {'name': 'Knight', 'hp': 100}\nhero['hp'] = 90\nhero['level'] = 2\nprint(f'Hero: {hero}')", "Hero: {'name': 'Knight', 'hp': 90, 'level': 2}", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.7", "slide", "Safe Key Access with .get(key, default)",
    "Direct lookup d['missing'] raises KeyError. Use d.get('key', default) to safely return default if the key is missing.",
    "Safe dictionary lookup with default fallbacks.",
    "The Safe Drawer",
    "profile = {'name': 'Maya'}\nage = profile.get('age', 18)\nprint(f'Age: {age}')", "Age: 18", 28, 90, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.7", "code", "Config Reader with Fallback Defaults",
    "config = {'theme': 'dark'}\nport = config.get('port', 8080)\nprint(f'Connected on port: {port}')",
    "Prevent KeyErrors when reading user and environment configurations.",
    "Fallback Config Reader",
    "config = {'theme': 'dark'}\nport = config.get('port', 8080)\nprint(f'Connected on port: {port}')", "Connected on port: 8080", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.7", "slide", "Iterating Key-Value Pairs with .items()",
    "Iterate keys with for k in d, or iterate key-value pairs simultaneously with for key, val in d.items():.",
    "Dictionary view iteration methods (.keys, .values, .items).",
    "Key-Value Reader",
    "scores = {'A': 95, 'B': 88}\nfor k, v in scores.items():\n    print(f'{k} -> {v}')", "A -> 95\nB -> 88", 28, 90, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.7", "code", "Telemetry Metrics Formatter with .items()",
    "metrics = {'WPM': 78, 'Accuracy': '99%'}\nfor metric, value in metrics.items():\n    print(f'{metric}: {value}')",
    "Format dictionary telemetry pairs cleanly across stdout.",
    "Metric Display Formatter",
    "metrics = {'WPM': 78, 'Accuracy': '99%'}\nfor metric, value in metrics.items():\n    print(f'{metric}: {value}')", "WPM: 78\nAccuracy: 99%", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.8", "slide", "Sets: Unique Unordered Collections",
    "Sets store unique, unordered elements inside curly braces: {1, 2, 3}. Duplicate values are automatically discarded.",
    "Sets provide O(1) membership tests and automatic deduplication.",
    "The Unique Stamp Album",
    "tags = {'python', 'code', 'python'}\nprint(tags)", "{'code', 'python'}", 28, 90, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.8", "code", "Deduplicating Lists with set()",
    "raw_keys = ['a', 'b', 'a', 'c', 'b']\nunique_keys = sorted(set(raw_keys))\nprint(f'Unique keys: {unique_keys}')",
    "Clean dirty datasets containing duplicate items using set conversion.",
    "Duplicate Remover",
    "raw_keys = ['a', 'b', 'a', 'c', 'b']\nunique_keys = sorted(set(raw_keys))\nprint(f'Unique keys: {unique_keys}')", "Unique keys: ['a', 'b', 'c']", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.8", "slide", "Set Mathematics (| & - ^)",
    "Sets support Venn diagram operations: | (union), & (intersection), - (difference), and ^ (symmetric difference).",
    "Mathematical set theory operations in Python.",
    "Venn Diagram Math",
    "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(f'Common: {a & b}')\nprint(f'Union: {a | b}')", "Common: {2, 3}\nUnion: {1, 2, 3, 4}", 28, 90, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.8", "code", "Permission Intersection with Sets",
    "admin_perms = {'read', 'write', 'delete'}\nuser_perms = {'read', 'comment'}\nshared = admin_perms & user_perms\nprint(f'Shared: {shared}')",
    "Find overlapping access privileges using set intersection &.",
    "Shared Permission Filter",
    "admin_perms = {'read', 'write', 'delete'}\nuser_perms = {'read', 'comment'}\nshared = admin_perms & user_perms\nprint(f'Shared: {shared}')", "Shared: {'read'}", 28, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.9", "slide", "Assignment is a Reference, Not a Copy",
    "Writing b = a does NOT copy a list; it creates a second reference pointing to the very same memory list. Mutating b also changes a.",
    "Reference assignment vs deep object duplication in memory.",
    "Two Labels on One Box",
    "a = [1, 2]\nb = a\nb.append(3)\nprint(f'a is now: {a}')", "a is now: [1, 2, 3]", 28, 90, {
      analogyType: "box"
    }),

  makeLesson(7, "7.9", "code", "Demonstrating Reference Aliasing Mutation",
    "original = ['a', 'b']\nalias = original\nalias.append('c')\nprint(f'Original modified: {original}')",
    "Verify how aliased references inadvertently alter shared containers.",
    "Shared Memory Blueprint",
    "original = ['a', 'b']\nalias = original\nalias.append('c')\nprint(f'Original modified: {original}')", "Original modified: ['a', 'b', 'c']", 28, 92, {
      analogyType: "box"
    }),

  makeLesson(7, "7.9", "code", "Shallow Copy with .copy()",
    "orig = [1, 2]\nclone = orig.copy()\nclone.append(99)\nprint(f'Orig: {orig} Clone: {clone}')",
    "Use .copy() to create an independent single-layer copy.",
    "Surface Duplicator",
    "orig = [1, 2]\nclone = orig.copy()\nclone.append(99)\nprint(f'Orig: {orig} Clone: {clone}')", "Orig: [1, 2] Clone: [1, 2, 99]", 28, 92, {
      analogyType: "box"
    }),

  makeLesson(7, "7.9", "slide", "Deep Copy for Nested Containers",
    "Shallow copy (.copy()) only copies the outer container. For nested lists or dicts, use copy.deepcopy() to duplicate all layers.",
    "Recursive deep copy vs shallow surface copy.",
    "Copying Nested Boxes",
    "import copy\nmatrix = [[1], [2]]\ndeep = copy.deepcopy(matrix)\ndeep[0].append(9)\nprint(f'Original untouched: {matrix[0]}')", "Original untouched: [1]", 28, 90, {
      analogyType: "box"
    }),

  makeLesson(7, "7.9", "code", "Deep Matrix Duplication with copy.deepcopy",
    "import copy\ngrid = [['X', 'O']]\nbackup = copy.deepcopy(grid)\nbackup[0][0] = ' '\nprint(f'Grid preserved: {grid[0][0]}')",
    "Prevent nested matrix mutation bugs using copy.deepcopy().",
    "Matrix Backup Guard",
    "import copy\ngrid = [['X', 'O']]\nbackup = copy.deepcopy(grid)\nbackup[0][0] = ' '\nprint(f'Grid preserved: {grid[0][0]}')", "Grid preserved: X", 28, 92, {
      analogyType: "box"
    }),

  makeLesson(7, "7.10", "slide", "List Comprehensions: [x for x in seq]",
    "List comprehensions build new lists declaratively in one line: [x * 2 for x in numbers if x > 0]. Fast, readable, and Pythonic.",
    "List comprehensions replace multi-line append loops with expressive syntax.",
    "The Inline Factory Line",
    "squares = [x**2 for x in range(1, 5)]\nprint(squares)", "[1, 4, 9, 16]", 28, 90, {
      analogyType: "machine"
    }),

  makeLesson(7, "7.10", "code", "Filtered List Comprehensions with if",
    "nums = [1, 2, 3, 4, 5, 6]\neven_squares = [n**2 for n in nums if n % 2 == 0]\nprint(f'Even squares: {even_squares}')",
    "Combine mapping and filtering into a single Pythonic list comprehension.",
    "Even Squares Pipeline",
    "nums = [1, 2, 3, 4, 5, 6]\neven_squares = [n**2 for n in nums if n % 2 == 0]\nprint(f'Even squares: {even_squares}')", "Even squares: [4, 16, 36]", 30, 92, {
      analogyType: "machine"
    }),

  makeLesson(7, "7.10", "code", "Dictionary Comprehensions {k: v}",
    "codes = {'US': 1, 'UK': 44, 'IN': 91}\ninverted = {val: key for key, val in codes.items()}\nprint(f'Inverted map: {inverted}')",
    "Invert dictionary key-value associations with dict comprehensions.",
    "Inverted Index Generator",
    "codes = {'US': 1, 'UK': 44, 'IN': 91}\ninverted = {val: key for key, val in codes.items()}\nprint(f'Inverted map: {inverted}')", "Inverted map: {1: 'US', 44: 'UK', 91: 'IN'}", 30, 92, {
      analogyType: "machine"
    }),

  makeLesson(7, "7.10", "drill", "Student Honors Registry Aggregator Drill",
    "students = [\n    {'name': 'Maya', 'grade': 95},\n    {'name': 'Liam', 'grade': 82}\n]\nhonors = [s['name'] for s in students if s['grade'] >= 90]\nprint(f'Honors: {honors}')",
    "Query and filter nested dictionaries inside list comprehensions.",
    "Registry Query Drill",
    "students = [\n    {'name': 'Maya', 'grade': 95},\n    {'name': 'Liam', 'grade': 82}\n]\nhonors = [s['name'] for s in students if s['grade'] >= 90]\nprint(f'Honors: {honors}')", "Honors: ['Maya']", 30, 92, {
      analogyType: "tray"
    }),

  makeLesson(7, "7.10", "checkpoint", "Stage 7 Data Structures Checkpoint",
    "record = {'id': 1, 'items': [10, 20, 30]}\nprint(f\"ID {record['id']} SUM: {sum(record['items'])}\")\nprint('STAGE 7 DATA STRUCTURES COMPLETE')",
    "Stage 7 milestone verifying lists, dicts, tuples, sets, and comprehensions.",
    "Stage 7 Milestone Arch",
    "record = {'id': 1, 'items': [10, 20, 30]}\nprint(f\"ID {record['id']} SUM: {sum(record['items'])}\")\nprint('STAGE 7 DATA STRUCTURES COMPLETE')", "ID 1 SUM: 60\nSTAGE 7 DATA STRUCTURES COMPLETE", 30, 94, {
      analogyType: "tray"
    })
];

stages.push({
  stageNumber: 7,
  id: "stage-7",
  title: "Stage 7: Data Structures (Lists, Dicts, Tuples, Sets)",
  targetWpm: 30,
  goal: "30 WPM",
  lessons: s7Lessons
});

// ==========================================
// STAGE 8: FUNCTIONS & ARCHITECTURE (24 lessons)
// ==========================================
const s8Lessons = [
  makeLesson(8, "8.1", "slide", "Defining Functions with def",
    "A function packages reusable logic under a named block. Define functions with the def keyword followed by parentheses and a colon.",
    "Functions encapsulate repeatable operations and prevent code duplication (DRY principle).",
    "The Tool Blueprint",
    "def greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Developer'))", "Hello, Developer!", 26, 90, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.1", "code", "Reusable Calculation Machine",
    "def calculate_wpm(chars, minutes):\n    return round((chars / 5) / minutes)\n\nspeed = calculate_wpm(250, 1.0)\nprint(f'WPM: {speed}')",
    "Define a calculation function with parameters and invoke it.",
    "WPM Engine Function",
    "def calculate_wpm(chars, minutes):\n    return round((chars / 5) / minutes)\n\nspeed = calculate_wpm(250, 1.0)\nprint(f'WPM: {speed}')", "WPM: 50", 28, 92, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.2", "slide", "Returning Values vs print()",
    "print() displays output to human eyes on the screen, returning None. return sends computational results back to caller code.",
    "Functions produce values via return; side effects output via print.",
    "Data Pipe vs Screen Ink",
    "def add(a, b):\n    return a + b\n\nresult = add(10, 20)\nprint(f'Result: {result}')", "Result: 30", 26, 90, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.2", "code", "Computational Return Chaining",
    "def square(n):\n    return n * n\n\ndef sum_squares(a, b):\n    return square(a) + square(b)\n\nprint(f'Sum of squares: {sum_squares(3, 4)}')",
    "Chain multiple returning functions together in mathematical pipelines.",
    "Nested Function Pipeline",
    "def square(n):\n    return n * n\n\ndef sum_squares(a, b):\n    return square(a) + square(b)\n\nprint(f'Sum of squares: {sum_squares(3, 4)}')", "Sum of squares: 25", 28, 92, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.2", "quiz", "Quiz: Return Value When Omitted",
    "None",
    "What special object does a function return if it lacks an explicit return statement?",
    "Default Return Check",
    "None", "Correct! Omitted returns evaluate to None.", 20, 95, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.3", "slide", "Positional vs Keyword Arguments",
    "Arguments can be passed by position in order total(1, 2) or explicitly by keyword total(x=1, y=2). Keyword calls improve clarity.",
    "Keyword arguments make function invocations self-documenting.",
    "Labeled Input Ports",
    "def create_user(name, role='member'):\n    return f'{name} ({role})'\n\nprint(create_user('Alex', role='admin'))", "Alex (admin)", 26, 90, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.3", "code", "Named Argument Dispatcher",
    "def configure_server(host, port, debug=False):\n    return f'{host}:{port} [DEBUG={debug}]'\n\nstatus = configure_server(host='localhost', port=3000, debug=True)\nprint(status)",
    "Call functions with mixed positional and keyword arguments.",
    "Server Configurator",
    "def configure_server(host, port, debug=False):\n    return f'{host}:{port} [DEBUG={debug}]'\n\nstatus = configure_server(host='localhost', port=3000, debug=True)\nprint(status)", "localhost:3000 [DEBUG=True]", 28, 92, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.3", "code", "Default Parameter Values",
    "def power(base, exp=2):\n    return base ** exp\n\nprint(f'Default power: {power(4)}')\nprint(f'Custom power: {power(4, 3)}')",
    "Provide sensible fallback default values for function arguments.",
    "Fallback Setting Valve",
    "def power(base, exp=2):\n    return base ** exp\n\nprint(f'Default power: {power(4)}')\nprint(f'Custom power: {power(4, 3)}')", "Default power: 16\nCustom power: 64", 28, 92, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.4", "slide", "Mutable Default Trap: arg=None Sentinel",
    "Never use mutable objects ([], {}) as default parameters. Python creates default objects only once at definition time, sharing state across calls.",
    "Always use arg=None and initialize fresh containers inside the function body.",
    "The Mutable Default Trap",
    "def append_item(item, target=None):\n    if target is None:\n        target = []\n    target.append(item)\n    return target", "", 26, 90, {
      analogyType: "box"
    }),

  makeLesson(8, "8.4", "code", "Safe Container Initialization Sentinel",
    "def append_score(score, scores=None):\n    if scores is None:\n        scores = []\n    scores.append(score)\n    return scores\n\nprint(append_score(95))\nprint(append_score(88))",
    "Implement the None sentinel pattern for clean default list arguments.",
    "Safe Sentinel Pattern",
    "def append_score(score, scores=None):\n    if scores is None:\n        scores = []\n    scores.append(score)\n    return scores\n\nprint(append_score(95))\nprint(append_score(88))", "[95]\n[88]", 28, 92, {
      analogyType: "box"
    }),

  makeLesson(8, "8.5", "slide", "Arbitrary Positional Arguments: *args",
    "*args collects arbitrary positional arguments into a tuple. Use it when a function can receive any number of inputs.",
    "Variable input collectors allow flexible function APIs.",
    "The Universal Input Collector",
    "def sum_all(*args):\n    return sum(args)\n\nprint(sum_all(1, 2, 3, 4, 5))", "15", 26, 90, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.5", "code", "Summing Arbitrary Numbers with *args",
    "def average(*grades):\n    return round(sum(grades) / len(grades), 1)\n\nprint(f'Average: {average(85, 90, 95)}')",
    "Calculate statistics over arbitrary argument lists with *args.",
    "Variable Accumulator",
    "def average(*grades):\n    return round(sum(grades) / len(grades), 1)\n\nprint(f'Average: {average(85, 90, 95)}')", "Average: 90.0", 28, 92, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.5", "code", "Arbitrary Keyword Arguments: **kwargs",
    "def log_event(event_type, **meta):\n    details = ', '.join(f'{k}={v}' for k, v in meta.items())\n    return f'[{event_type}] {details}'\n\nlog = log_event('LOGIN', user='Alex', ip='127.0.0.1')\nprint(log)",
    "Use **kwargs to accept arbitrary metadata key-value flags in logging APIs.",
    "Structured Event Logger",
    "def log_event(event_type, **meta):\n    details = ', '.join(f'{k}={v}' for k, v in meta.items())\n    return f'[{event_type}] {details}'\n\nlog = log_event('LOGIN', user='Alex', ip='127.0.0.1')\nprint(log)", "[LOGIN] user=Alex, ip=127.0.0.1", 30, 92, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.6", "slide", "Variable Scope: LEGB Rule",
    "Python resolves variable names following LEGB order: Local -> Enclosing -> Global -> Built-in. Function locals are destroyed upon return.",
    "Local stack frames isolate variables from leaking into the global namespace.",
    "The Scope Hierarchy",
    "g_var = 100\ndef show_scope():\n    l_var = 50\n    return g_var + l_var\n\nprint(show_scope())", "150", 26, 90, {
      analogyType: "box"
    }),

  makeLesson(8, "8.6", "code", "Local Frame Shadowing Demonstration",
    "x = 'GLOBAL'\ndef worker():\n    x = 'LOCAL'\n    return x\n\nprint(f'Worker: {worker()}')\nprint(f'Outer: {x}')",
    "Demonstrate variable shadowing between local stack frames and global scope.",
    "Shadowing Inspector",
    "x = 'GLOBAL'\ndef worker():\n    x = 'LOCAL'\n    return x\n\nprint(f'Worker: {worker()}')\nprint(f'Outer: {x}')", "Worker: LOCAL\nOuter: GLOBAL", 28, 92, {
      analogyType: "box"
    }),

  makeLesson(8, "8.6", "code", "Modifying Global State with global",
    "counter = 0\ndef bump():\n    global counter\n    counter += 1\n\nbump()\nbump()\nprint(f'Counter: {counter}')",
    "Use the global keyword to declare that an inner assignment targets module-level state.",
    "Global State Valve",
    "counter = 0\ndef bump():\n    global counter\n    counter += 1\n\nbump()\nbump()\nprint(f'Counter: {counter}')", "Counter: 2", 28, 92, {
      analogyType: "box"
    }),

  makeLesson(8, "8.7", "slide", "Anonymous Functions with lambda",
    "lambda creates concise inline anonymous functions: square = lambda x: x**2. Use them for short callbacks and key functions.",
    "Anonymous lambda functions allow one-line operations without full def blocks.",
    "Inline Micro-Engine",
    "double = lambda x: x * 2\nprint(double(21))", "42", 26, 90, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.7", "code", "Lambda as Sorting Key",
    "words = ['banana', 'pie', 'apple']\nsorted_words = sorted(words, key=lambda w: len(w))\nprint(f'Sorted by length: {sorted_words}')",
    "Pass inline lambda functions as custom sorting criteria.",
    "Custom Sort Compass",
    "words = ['banana', 'pie', 'apple']\nsorted_words = sorted(words, key=lambda w: len(w))\nprint(f'Sorted by length: {sorted_words}')", "Sorted by length: ['pie', 'apple', 'banana']", 28, 92, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.7", "slide", "Type Hints & PEP 484 Annotations",
    "Type hints def greet(name: str) -> str: document expected parameter and return types for tools like mypy and IDE autocompletion.",
    "Static type hints make function APIs self-documenting and robust.",
    "Typed Port Contracts",
    "def format_metric(label: str, value: float) -> str:\n    return f'{label.upper()}: {value:.1f}'\n\nprint(format_metric('Accuracy', 98.66))", "ACCURACY: 98.7", 28, 90, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.7", "code", "Typed Metric Transformer",
    "def format_metric(label: str, value: float) -> str:\n    return f'{label.upper()}: {value:.1f}'\n\nprint(format_metric('Accuracy', 98.66))",
    "Define typed function signatures with return annotations.",
    "Validated Metric Chute",
    "def format_metric(label: str, value: float) -> str:\n    return f'{label.upper()}: {value:.1f}'\n\nprint(format_metric('Accuracy', 98.66))", "ACCURACY: 98.7", 30, 92, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.8", "code", "Archetype 1: Pure Validator Function",
    "def is_valid_email(email: str) -> bool:\n    return '@' in email and email.endswith('.com')\n\nprint(f'Valid: {is_valid_email(\"dev@retro.com\")}')",
    "Pure functions take inputs and return booleans with zero side effects.",
    "The Verification Filter",
    "def is_valid_email(email: str) -> bool:\n    return '@' in email and email.endswith('.com')\n\nprint(f'Valid: {is_valid_email(\"dev@retro.com\")}')", "Valid: True", 30, 92, {
      analogyType: "fork"
    }),

  makeLesson(8, "8.8", "code", "Archetype 2: Business Transformer Function",
    "def normalize_username(raw: str) -> str:\n    return raw.strip().lower().replace(' ', '_')\n\nprint(f'Clean: {normalize_username(\"  Alex Dev  \")}')",
    "Transform raw inputs into clean standardized outputs deterministically.",
    "Data Transformer Lathe",
    "def normalize_username(raw: str) -> str:\n    return raw.strip().lower().replace(' ', '_')\n\nprint(f'Clean: {normalize_username(\"  Alex Dev  \")}')", "Clean: alex_dev", 30, 92, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.8", "drill", "Archetype 3 & 4: Orchestrator Pipeline",
    "# Orchestrator coordinates Validation -> Transform -> Action\ndef validate(score: int) -> bool:\n    return 0 <= score <= 100\n\ndef transform(score: int) -> str:\n    return f'PRO-{score:03d}'\n\ndef publish(badge: str) -> None:\n    print(f'PUBLISHED BADGE: {badge}')\n\nraw_score = 98\nif validate(raw_score):\n    publish(transform(raw_score))",
    "Build a production modular architecture separating validation, business transformation, and action execution.",
    "The 4 Functional Archetypes",
    "# Orchestrator coordinates Validation -> Transform -> Action\ndef validate(score: int) -> bool:\n    return 0 <= score <= 100\n\ndef transform(score: int) -> str:\n    return f'PRO-{score:03d}'\n\ndef publish(badge: str) -> None:\n    print(f'PUBLISHED BADGE: {badge}')\n\nraw_score = 98\nif validate(raw_score):\n    publish(transform(raw_score))", "PUBLISHED BADGE: PRO-098", 32, 94, {
      analogyType: "machine"
    }),

  makeLesson(8, "8.8", "checkpoint", "Stage 8 Functions Checkpoint",
    "def compile_report(dev: str, wpm: int) -> str:\n    return f'REPORT: {dev} | {wpm} WPM'\n\nprint(compile_report('Hero', 90))\nprint('STAGE 8 FUNCTIONS MASTERED')",
    "Stage 8 milestone proving mastery of functions, parameters, scopes, and architectures.",
    "The Function Arch",
    "def compile_report(dev: str, wpm: int) -> str:\n    return f'REPORT: {dev} | {wpm} WPM'\n\nprint(compile_report('Hero', 90))\nprint('STAGE 8 FUNCTIONS MASTERED')", "REPORT: Hero | 90 WPM\nSTAGE 8 FUNCTIONS MASTERED", 32, 95, {
      analogyType: "machine"
    })
];

stages.push({
  stageNumber: 8,
  id: "stage-8",
  title: "Stage 8: Functions & Architecture",
  targetWpm: 32,
  goal: "32 WPM",
  lessons: s8Lessons
});

// ==========================================
// STAGE 9: PROJECTS & INTEGRATION (20 lessons)
// ==========================================
const s9Lessons = [
  makeLesson(9, "9.1", "code", "Project 1: Command-Line Arithmetic Calculator",
    "def calculate(a: float, b: float, op: str) -> float:\n    if op == '+': return a + b\n    elif op == '-': return a - b\n    elif op == '*': return a * b\n    elif op == '/': return a / b if b != 0 else 0.0\n    return 0.0\n\nresult = calculate(10, 2, '*')\nprint(f'Result: {result}')",
    "Build a complete 4-operation mathematical calculation engine.",
    "The Integrated Calculator",
    "def calculate(a: float, b: float, op: str) -> float:\n    if op == '+': return a + b\n    elif op == '-': return a - b\n    elif op == '*': return a * b\n    elif op == '/': return a / b if b != 0 else 0.0\n    return 0.0\n\nresult = calculate(10, 2, '*')\nprint(f'Result: {result}')", "Result: 20.0", 30, 92, {
      analogyType: "arithmetic"
    }),

  makeLesson(9, "9.1", "code", "Project 2: Temperature Dual Converter",
    "def c_to_f(celsius: float) -> float:\n    return round((celsius * 9/5) + 32, 1)\n\ndef c_to_k(celsius: float) -> float:\n    return round(celsius + 273.15, 2)\n\ntemp_c = 25.0\nprint(f'{temp_c}C = {c_to_f(temp_c)}F | {c_to_k(temp_c)}K')",
    "Convert Celsius temperatures into Fahrenheit and Kelvin scales.",
    "Thermal Scale Transformer",
    "def c_to_f(celsius: float) -> float:\n    return round((celsius * 9/5) + 32, 1)\n\ndef c_to_k(celsius: float) -> float:\n    return round(celsius + 273.15, 2)\n\ntemp_c = 25.0\nprint(f'{temp_c}C = {c_to_f(temp_c)}F | {c_to_k(temp_c)}K')", "25.0C = 77.0F | 298.15K", 30, 92, {
      analogyType: "machine"
    }),

  makeLesson(9, "9.2", "code", "Project 3: Secret Number Guessing Game",
    "secret = 42\nguesses = [20, 50, 42]\nfor g in guesses:\n    if g == secret:\n        print(f'Guess {g}: Correct! You win!')\n        break\n    elif g < secret:\n        print(f'Guess {g}: Too low!')\n    else:\n        print(f'Guess {g}: Too high!')",
    "Implement binary search logic for a classic number guessing game.",
    "Target Guessing Engine",
    "secret = 42\nguesses = [20, 50, 42]\nfor g in guesses:\n    if g == secret:\n        print(f'Guess {g}: Correct! You win!')\n        break\n    elif g < secret:\n        print(f'Guess {g}: Too low!')\n    else:\n        print(f'Guess {g}: Too high!')", "Guess 20: Too low!\nGuess 50: Too high!\nGuess 42: Correct! You win!", 32, 92, {
      analogyType: "fork"
    }),

  makeLesson(9, "9.2", "code", "Project 4: Password Strength Auditor",
    "def check_password(pwd: str) -> bool:\n    has_len = len(pwd) >= 8\n    has_num = any(ch.isdigit() for ch in pwd)\n    has_upper = any(ch.isupper() for ch in pwd)\n    return has_len and has_num and has_upper\n\nvalid = check_password('RetroSpeed2026')\nprint(f'Strong password: {valid}')",
    "Audit passwords against length, numeric, and uppercase criteria.",
    "Security Shield Guard",
    "def check_password(pwd: str) -> bool:\n    has_len = len(pwd) >= 8\n    has_num = any(ch.isdigit() for ch in pwd)\n    has_upper = any(ch.isupper() for ch in pwd)\n    return has_len and has_num and has_upper\n\nvalid = check_password('RetroSpeed2026')\nprint(f'Strong password: {valid}')", "Strong password: True", 32, 92, {
      analogyType: "fork"
    }),

  makeLesson(9, "9.3", "code", "Project 5: Rock Paper Scissors Tournament",
    "wins = {'rock': 'scissors', 'scissors': 'paper', 'paper': 'rock'}\nmatches = [('rock', 'scissors'), ('paper', 'paper'), ('scissors', 'rock')]\nfor p1, p2 in matches:\n    if p1 == p2: res = 'Draw'\n    elif wins[p1] == p2: res = 'P1 Wins'\n    else: res = 'P2 Wins'\n    print(f'{p1} vs {p2} -> {res}')",
    "Simulate game rounds using dictionary rules and tuple iteration.",
    "Arena Match Referee",
    "wins = {'rock': 'scissors', 'scissors': 'paper', 'paper': 'rock'}\nmatches = [('rock', 'scissors'), ('paper', 'paper'), ('scissors', 'rock')]\nfor p1, p2 in matches:\n    if p1 == p2: res = 'Draw'\n    elif wins[p1] == p2: res = 'P1 Wins'\n    else: res = 'P2 Wins'\n    print(f'{p1} vs {p2} -> {res}')", "rock vs scissors -> P1 Wins\npaper vs paper -> Draw\nscissors vs rock -> P2 Wins", 32, 92, {
      analogyType: "fork"
    }),

  makeLesson(9, "9.3", "code", "Project 6: Word Frequency & Corpus Analyzer",
    "text = 'python speed python touch code python'\ncounts = {}\nfor word in text.split():\n    counts[word] = counts.get(word, 0) + 1\ntop_word = max(counts, key=counts.get)\nprint(f'Top word: {top_word} ({counts[top_word]}x)')",
    "Count word occurrences across raw text and identify mode frequencies.",
    "Text Intelligence Scanner",
    "text = 'python speed python touch code python'\ncounts = {}\nfor word in text.split():\n    counts[word] = counts.get(word, 0) + 1\ntop_word = max(counts, key=counts.get)\nprint(f'Top word: {top_word} ({counts[top_word]}x)')", "Top word: python (3x)", 30, 92, {
      analogyType: "tray"
    }),

  makeLesson(9, "9.4", "code", "Project 7: E-Commerce Shopping Cart Checkout",
    "cart = [\n    {'item': 'Switch', 'price': 1.50, 'qty': 10},\n    {'item': 'Lube', 'price': 8.00, 'qty': 1}\n]\nsubtotal = sum(i['price'] * i['qty'] for i in cart)\ntax = round(subtotal * 0.08, 2)\nprint(f'Subtotal: ${subtotal:.2f} | Total: ${subtotal + tax:.2f}')",
    "Compute items subtotal, tax percentages, and order totals.",
    "Digital Register Till",
    "cart = [\n    {'item': 'Switch', 'price': 1.50, 'qty': 10},\n    {'item': 'Lube', 'price': 8.00, 'qty': 1}\n]\nsubtotal = sum(i['price'] * i['qty'] for i in cart)\ntax = round(subtotal * 0.08, 2)\nprint(f'Subtotal: ${subtotal:.2f} | Total: ${subtotal + tax:.2f}')", "Subtotal: $23.00 | Total: $24.84", 30, 92, {
      analogyType: "tray"
    }),

  makeLesson(9, "9.4", "code", "Project 8: Terminal Task & To-Do Manager",
    "todo = []\ndef add_task(t): todo.append(t)\ndef complete_task(): return todo.pop(0) if todo else 'Empty'\n\nadd_task('Write tests')\nadd_task('Ship build')\ndone = complete_task()\nprint(f'Completed: {done}')\nprint(f'Remaining: {todo}')",
    "Implement task queues with append and FIFO pop.",
    "Task Dispatch Board",
    "todo = []\ndef add_task(t): todo.append(t)\ndef complete_task(): return todo.pop(0) if todo else 'Empty'\n\nadd_task('Write tests')\nadd_task('Ship build')\ndone = complete_task()\nprint(f'Completed: {done}')\nprint(f'Remaining: {todo}')", "Completed: Write tests\nRemaining: ['Ship build']", 30, 92, {
      analogyType: "tray"
    }),

  makeLesson(9, "9.5", "code", "Project 9: Student Academic Gradebook",
    "grades = {'Alex': 88, 'Maya': 95, 'Liam': 72}\nstats = {\n    'top': max(grades, key=grades.get),\n    'avg': round(sum(grades.values()) / len(grades), 1)\n}\nprint(f\"Top: {stats['top']} | Class Avg: {stats['avg']}\")",
    "Aggregate class metrics using dictionary mapping and built-in math.",
    "Grade Analytics Dashboard",
    "grades = {'Alex': 88, 'Maya': 95, 'Liam': 72}\nstats = {\n    'top': max(grades, key=grades.get),\n    'avg': round(sum(grades.values()) / len(grades), 1)\n}\nprint(f\"Top: {stats['top']} | Class Avg: {stats['avg']}\")", "Top: Maya | Class Avg: 85.0", 30, 92, {
      analogyType: "tray"
    }),

  makeLesson(9, "9.5", "code", "Project 10: Interactive Trivia Quiz Engine",
    "quiz = [\n    {'q': 'Python extension?', 'a': '.py'},\n    {'q': 'Default sep?', 'a': ' '}\n]\nscore = sum(1 for item in quiz if item['a'] in ['.py', ' '])\nprint(f'Quiz score: {score}/{len(quiz)}')",
    "Evaluate quiz answers using comprehension matching and score tracking.",
    "Quiz Bowl Master",
    "quiz = [\n    {'q': 'Python extension?', 'a': '.py'},\n    {'q': 'Default sep?', 'a': ' '}\n]\nscore = sum(1 for item in quiz if item['a'] in ['.py', ' '])\nprint(f'Quiz score: {score}/{len(quiz)}')", "Quiz score: 2/2", 30, 92, {
      analogyType: "fork"
    }),

  makeLesson(9, "9.6", "code", "Project 11: Caesar Cipher Text Encryptor",
    "def encrypt(text: str, shift: int) -> str:\n    out = []\n    for ch in text:\n        if ch.isalpha():\n            base = ord('a') if ch.islower() else ord('A')\n            out.append(chr((ord(ch) - base + shift) % 26 + base))\n        else:\n            out.append(ch)\n    return ''.join(out)\n\nenc = encrypt('Hello', 3)\nprint(f'Encrypted: {enc}')",
    "Encrypt messages using character ordinals and modulo wrap math.",
    "The Cryptographic Wheel",
    "def encrypt(text: str, shift: int) -> str:\n    out = []\n    for ch in text:\n        if ch.isalpha():\n            base = ord('a') if ch.islower() else ord('A')\n            out.append(chr((ord(ch) - base + shift) % 26 + base))\n        else:\n            out.append(ch)\n    return ''.join(out)\n\nenc = encrypt('Hello', 3)\nprint(f'Encrypted: {enc}')", "Encrypted: Khoor", 32, 92, {
      analogyType: "train"
    }),

  makeLesson(9, "9.6", "code", "Project 12: Searchable Contact Directory",
    "contacts = [\n    {'name': 'Alex', 'role': 'Lead'},\n    {'name': 'Maya', 'role': 'Dev'}\n]\ndef find_contact(name: str):\n    return next((c for c in contacts if c['name'] == name), None)\n\nfound = find_contact('Maya')\nprint(f\"Found: {found['name']} ({found['role']})\")",
    "Query directories using generator expressions and dictionary filtering.",
    "Rolodex Search Engine",
    "contacts = [\n    {'name': 'Alex', 'role': 'Lead'},\n    {'name': 'Maya', 'role': 'Dev'}\n]\ndef find_contact(name: str):\n    return next((c for c in contacts if c['name'] == name), None)\n\nfound = find_contact('Maya')\nprint(f\"Found: {found['name']} ({found['role']})\")", "Found: Maya (Dev)", 32, 92, {
      analogyType: "tray"
    }),

  makeLesson(9, "9.7", "code", "Project 13: Bank Account Overdraft Guard",
    "def withdraw(balance: float, amount: float):\n    if amount > balance:\n        return balance, 'DECLINED'\n    return balance - amount, 'APPROVED'\n\nbal, status = withdraw(100.0, 45.0)\nprint(f'Status: {status} | New Balance: ${bal:.2f}')",
    "Model state transitions and overdraft safety guards with return tuples.",
    "The Secure Bank Vault",
    "def withdraw(balance: float, amount: float):\n    if amount > balance:\n        return balance, 'DECLINED'\n    return balance - amount, 'APPROVED'\n\nbal, status = withdraw(100.0, 45.0)\nprint(f'Status: {status} | New Balance: ${bal:.2f}')", "Status: APPROVED | New Balance: $55.00", 30, 92, {
      analogyType: "box"
    }),

  makeLesson(9, "9.7", "code", "Project 14: Telemetry Log Severity Auditor",
    "logs = ['INFO:ok', 'ERROR:db_fail', 'WARN:slow', 'ERROR:timeout']\nerrors = [log.split(':')[1] for log in logs if log.startswith('ERROR')]\nprint(f'Found {len(errors)} errors: {errors}')",
    "Parse and extract critical incidents from server log streams.",
    "Log Stream Inspector",
    "logs = ['INFO:ok', 'ERROR:db_fail', 'WARN:slow', 'ERROR:timeout']\nerrors = [log.split(':')[1] for log in logs if log.startswith('ERROR')]\nprint(f'Found {len(errors)} errors: {errors}')", "Found 2 errors: ['db_fail', 'timeout']", 30, 92, {
      analogyType: "tray"
    }),

  makeLesson(9, "9.8", "code", "Project 15: Engineering Unit Converter",
    "def convert(val: float, unit_from: str, unit_to: str) -> float:\n    ratios = {'m_to_km': 0.001, 'km_to_m': 1000.0, 'kg_to_lb': 2.20462}\n    key = f'{unit_from}_to_{unit_to}'\n    return round(val * ratios[key], 2)\n\nkm = convert(5000, 'm', 'km')\nprint(f'5000m in km: {km}')",
    "Implement ratio lookup tables for metric-imperial conversions.",
    "Universal Measurement Converter",
    "def convert(val: float, unit_from: str, unit_to: str) -> float:\n    ratios = {'m_to_km': 0.001, 'km_to_m': 1000.0, 'kg_to_lb': 2.20462}\n    key = f'{unit_from}_to_{unit_to}'\n    return round(val * ratios[key], 2)\n\nkm = convert(5000, 'm', 'km')\nprint(f'5000m in km: {km}')", "5000m in km: 5.0", 30, 92, {
      analogyType: "machine"
    }),

  makeLesson(9, "9.8", "code", "Project 16: Morse Code Signal Encoder",
    "morse_map = {'S': '...', 'O': '---'}\ndef to_morse(msg: str) -> str:\n    return ' '.join(morse_map.get(c, '') for c in msg.upper() if c in morse_map)\n\nsig = to_morse('SOS')\nprint(f'SOS Signal: {sig}')",
    "Map text sequences to audio/telegraph codes using hash maps.",
    "Telegraph Wire Translator",
    "morse_map = {'S': '...', 'O': '---'}\ndef to_morse(msg: str) -> str:\n    return ' '.join(morse_map.get(c, '') for c in msg.upper() if c in morse_map)\n\nsig = to_morse('SOS')\nprint(f'SOS Signal: {sig}')", "SOS Signal: ... --- ...", 30, 92, {
      analogyType: "train"
    }),

  makeLesson(9, "9.9", "code", "Project 17: Prime Factorization Engine",
    "def prime_factors(n: int):\n    factors = []\n    d = 2\n    while d * d <= n:\n        while n % d == 0:\n            factors.append(d)\n            n //= d\n        d += 1\n    if n > 1: factors.append(n)\n    return factors\n\nfactors = prime_factors(60)\nprint(f'Factors of 60: {factors}')",
    "Deconstruct composite integers into prime component factors.",
    "Factorization Sieve",
    "def prime_factors(n: int):\n    factors = []\n    d = 2\n    while d * d <= n:\n        while n % d == 0:\n            factors.append(d)\n            n //= d\n        d += 1\n    if n > 1: factors.append(n)\n    return factors\n\nfactors = prime_factors(60)\nprint(f'Factors of 60: {factors}')", "Factors of 60: [2, 2, 3, 5]", 32, 92, {
      analogyType: "arithmetic"
    }),

  makeLesson(9, "9.9", "code", "Project 18: Monthly Expense Category Tracker",
    "expenses = [\n    {'cat': 'food', 'amt': 45.0},\n    {'cat': 'rent', 'amt': 800.0},\n    {'cat': 'food', 'amt': 30.0}\n]\ntotals = {}\nfor e in expenses:\n    totals[e['cat']] = totals.get(e['cat'], 0.0) + e['amt']\nprint(f'Totals: {totals}')",
    "Aggregate structured transaction records by category grouping.",
    "Ledger Budget Analyzer",
    "expenses = [\n    {'cat': 'food', 'amt': 45.0},\n    {'cat': 'rent', 'amt': 800.0},\n    {'cat': 'food', 'amt': 30.0}\n]\ntotals = {}\nfor e in expenses:\n    totals[e['cat']] = totals.get(e['cat'], 0.0) + e['amt']\nprint(f'Totals: {totals}')", "Totals: {'food': 75.0, 'rent': 800.0}", 32, 92, {
      analogyType: "tray"
    }),

  makeLesson(9, "9.10", "drill", "Capstone: End-to-End System Graduation",
    "# python graduation master\ndef compile_report(student: str, wpm: int, acc: float) -> str:\n    return f'GRADUATE: {student} | {wpm} WPM | {acc}% ACC'\n\nprint(compile_report('Developer', 85, 99.2))\nprint('ALL 9 PYTHON STAGES MASTERED!')",
    "Stage 9 graduation milestone proving full Python mastery across all 197 lessons.",
    "The Full Python Architecture",
    "# python graduation master\ndef compile_report(student: str, wpm: int, acc: float) -> str:\n    return f'GRADUATE: {student} | {wpm} WPM | {acc}% ACC'\n\nprint(compile_report('Developer', 85, 99.2))\nprint('ALL 9 PYTHON STAGES MASTERED!')", "GRADUATE: Developer | 85 WPM | 99.2% ACC\nALL 9 PYTHON STAGES MASTERED!", 34, 95, {
      analogyType: "machine"
    }),

  makeLesson(9, "9.10", "play", "Pit Lane Graduation Grand Prix",
    "def return args kwargs lambda None True False int str float len range zip enumerate class import from as with try except finally",
    "The ultimate typing speedway graduation race across all core Python keywords.",
    "Graduation Grand Prix",
    "def return args kwargs lambda None True False int str float len range zip enumerate class import from as with try except finally", "", 34, 92, {
      analogyType: "machine",
      gameId: "pit-lane",
      targetKeys: ["d", "e", "f", "r", "t", "u", "n", "l", "a", "m", "b", "c", "s", "i", "p", "o"]
    })
];

stages.push({
  stageNumber: 9,
  id: "stage-9",
  title: "Stage 9: Projects & Integration",
  targetWpm: 34,
  goal: "34 WPM",
  lessons: s9Lessons
});

const totalLessons = stages.reduce((acc, s) => acc + s.lessons.length, 0);

// Validation assertions
if (totalLessons !== 197) {
  throw new Error(`Curriculum generation failed: expected exactly 197 lessons, but got ${totalLessons}`);
}

let count55 = 0;
stages.forEach(s => {
  s.lessons.forEach(l => {
    if (l.code && l.code.includes('5 + 5')) {
      count55++;
      if (l.id !== 4) {
        throw new Error(`Violation: Lesson ID ${l.id} ("${l.title}") contains "5 + 5". Only Lesson 4 is allowed to contain "5 + 5"!`);
      }
    }
  });
});

if (count55 !== 1) {
  throw new Error(`Violation: Expected exactly 1 lesson with "5 + 5" (lesson 4), but found ${count55}.`);
}

const courseData = {
  id: "python-zero-to-hero",
  alias: "python-forge",
  programId: 312,
  title: "Python Zero to Hero | 13-Hour Mastery",
  category: "Programming & Tech",
  grade: "Developers & Data Analysts",
  lessonsCount: totalLessons,
  description: "Master Python from fundamentals to advanced functions and data structures. Type concepts, code snippets, mental models, single-token quizzes, multi-line drills, and syntax arcade battles.",
  badge: "Python 3.12",
  color: "from-amber-500 via-sky-600 to-indigo-900",
  titleVariant: "mustard",
  keyboardType: "qwerty",
  stages: stages
};

// Write out to python_zero_to_hero.json and python_forge.json
const coursesDir = path.join(__dirname, '..', 'src', 'data', 'courses');
fs.writeFileSync(path.join(coursesDir, 'python_zero_to_hero.json'), JSON.stringify(courseData, null, 2), 'utf-8');
fs.writeFileSync(path.join(coursesDir, 'python_forge.json'), JSON.stringify(courseData, null, 2), 'utf-8');

console.log(`✅ Successfully generated ${totalLessons} lessons across ${stages.length} stages!`);
stages.forEach(s => {
  console.log(`  • ${s.title}: ${s.lessons.length} lessons (Goal: ${s.goal})`);
});
