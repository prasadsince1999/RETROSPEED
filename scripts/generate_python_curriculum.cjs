// Complete Python Forge & Zero-to-Hero 197-Lesson Generator (9 Stages)
const fs = require('fs');
const path = require('path');

const stages = [];
let globalIndex = 1;

function makeLesson(stageNum, section, type, title, text, concept, analogy, code, expectedOutput, goalWpm, minAcc, extra = {}) {
  const lesson = {
    id: globalIndex,
    rawId: `py.s${stageNum}.l${String(globalIndex).padStart(2, '0')}`,
    codeId: `py-${stageNum}${String(globalIndex).padStart(2, '0')}`,
    stageNumber: stageNum,
    section: section,
    type: type,
    title: title,
    text: text,
    concept: concept || text,
    analogy: analogy || 'Python Mental Model',
    code: code || text,
    expectedOutput: expectedOutput || '',
    goalWpm: goalWpm || 24,
    minAccuracy: minAcc || 90,
    ...extra
  };
  globalIndex++;
  return lesson;
}

// ==========================================
// STAGE 1: PYTHON FOUNDATIONS (16 lessons)
// ==========================================
const s1Lessons = [
  makeLesson(1, "1.1", "slide", "Why Computers Need Python", 
    "A program is a list of instructions a machine can run. Human speech is too loose. Python is a high-level language: closer to English than to ones and zeros.",
    "Python is a high-level language bridging human thought and raw machine instructions.", "The Universal Translator",
    "print('Hello, Python Developer!')", "Hello, Python Developer!", 20, 90),
  makeLesson(1, "1.1", "quiz", "Quiz: High-level or Machine Language?", 
    "high-level", "Is Python high-level (human readable) or low-level machine code?", "Language Tier Recall",
    "high-level", "Correct! Python is high-level.", 20, 95),
  makeLesson(1, "1.2", "slide", "The CPython Pipeline & Bytecode", 
    "CPython compiles your .py source file to bytecode instructions, then the Python virtual machine runs that bytecode on your CPU.",
    "Source code (.py) is compiled to bytecode (.pyc) before execution by the Python Virtual Machine (PVM).", "The Chef Recipe Pipeline",
    "print(5 + 5)", "10", 20, 90),
  makeLesson(1, "1.2", "code", "First Math Execution", 
    "print(5 + 5)", "Python evaluates arithmetic expressions inside print() before displaying the output.", "The Arithmetic Engine",
    "print(5 + 5)", "10", 22, 92),
  makeLesson(1, "1.2", "explain", "Why Python Feels Seamless", 
    "You never type the bytecode yourself. The interpreter compiles, links libraries, and executes in memory in one command.",
    "The interpreter handles compilation and memory management automatically.", "Behind the Curtain",
    "print('Compiled and executed!')", "Compiled and executed!", 20, 90),
  makeLesson(1, "1.2", "quiz", "Quiz: Python File Extension", 
    ".py", "What is the standard file extension for Python source files?", "Extension Check",
    ".py", "Correct! Python files end with .py", 20, 95),
  makeLesson(1, "1.3", "slide", "The Megaphone & The Sticky Note", 
    "print writes text to your screen. A hash symbol (#) marks a comment that Python completely ignores during execution.",
    "print() outputs text; comments (#) document code for human readers.", "Megaphone vs Sticky Note",
    "# greet the terminal\nprint('hello, terminal')", "hello, terminal", 22, 92),
  makeLesson(1, "1.3", "code", "Comments and Greeting", 
    "# greet the desk\nprint('hello, desk')", "Write comments above code to explain the intent of the following statement.", "Documenting Instructions",
    "# greet the desk\nprint('hello, desk')", "hello, desk", 22, 92),
  makeLesson(1, "1.4", "slide", "Variables: Labeled Boxes in Memory", 
    "A variable is a name bound to a value in memory. score = 10 allocates RAM for integer 10 and points the label score to it.",
    "Variables store values in computer memory with identifiable labels.", "Labeled Storage Boxes",
    "score = 10\nprint(score)", "10", 22, 90),
  makeLesson(1, "1.4", "code", "Reassigning Variables", 
    "score = 10\nscore = score + 2\nprint(score)", "Variables can be updated by evaluating the right-hand side and binding the new result.", "Updating Box Contents",
    "score = 10\nscore = score + 2\nprint(score)", "12", 24, 92),
  makeLesson(1, "1.4", "quiz", "Quiz: Value After Arithmetic Update", 
    "12", "What does score = 10 followed by score = score + 2 print?", "Mental Math Check",
    "12", "Correct! 10 + 2 = 12.", 20, 95),
  makeLesson(1, "1.5", "slide", "The Microphone: input()", 
    "input() pauses execution and reads user input from the console. It always returns a string object.",
    "input() captures user keystrokes as a text string (str type).", "The Stage Microphone",
    "name = input('Name: ')\nprint('Welcome', name)", "Welcome User", 22, 90),
  makeLesson(1, "1.5", "code", "Input and Numeric Conversion", 
    "raw = input('n: ')\nn = int(raw)\nprint(n * 2)", "Cast string input with int() before doing numerical multiplication.", "Type Transformer",
    "raw = input('n: ')\nn = int(raw)\nprint(n * 2)", "10", 24, 92),
  makeLesson(1, "1.5", "explain", "Why Casting Matters", 
    "Without int(), the string '5' * 2 produces '55' instead of 10. Data types decide how operators behave.",
    "Operators are overloaded based on data type: '+' concatenates strings and adds numbers.", "String Glue vs Math Addition",
    "print('5' + '5')\nprint(5 + 5)", "55\n10", 22, 90),
  makeLesson(1, "1.6", "drill", "Foundations Integration Drill", 
    "# doubling calculator\nraw_val = input('enter: ')\nnum = int(raw_val)\nans = num * 2\nprint('result:', ans)",
    "Combine input, type casting, arithmetic, and formatted print output.", "The Mini Calculator",
    "# doubling calculator\nraw_val = input('enter: ')\nnum = int(raw_val)\nans = num * 2\nprint('result:', ans)", "result: 20", 25, 92),
  makeLesson(1, "1.6", "checkpoint", "Stage 1 Foundations Checkpoint", 
    "# stage 1 mastery\napp = 'RETROSPEED'\nver = 3\nprint(app, 'Python Engine', ver)",
    "Stage 1 review verifying variables, data types, and console printing.", "Stage 1 Checkpoint Flag",
    "# stage 1 mastery\napp = 'RETROSPEED'\nver = 3\nprint(app, 'Python Engine', ver)", "RETROSPEED Python Engine 3", 25, 94)
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
// STAGE 2: TOOLS & OUTPUT (18 lessons)
// ==========================================
const s2Lessons = [
  makeLesson(2, "2.1", "slide", "Custom Delimiters with sep",
    "print accepts multiple items. By default it joins them with a space. Pass sep=' -> ' to insert custom glue between items.",
    "The sep parameter controls the separator string between multiple print arguments.", "Custom Ticket Glue",
    "print('A', 'B', 'C', sep=' -> ')", "A -> B -> C", 22, 90),
  makeLesson(2, "2.1", "code", "Type the Pipeline Separator",
    "print('Ingest', 'Clean', 'Analyze', sep=' | ')\nprint('2026', '09', '02', sep='-')",
    "Use sep to format dates, pipelines, and CSV tokens in a single statement.", "Delimiter Press",
    "print('Ingest', 'Clean', 'Analyze', sep=' | ')\nprint('2026', '09', '02', sep='-')", "Ingest | Clean | Analyze\n2026-09-02", 24, 92),
  makeLesson(2, "2.1", "explain", "Why sep Beats String Joining",
    "sep automatically converts non-string arguments to strings before printing, avoiding manual str() wrapping.",
    "print(1, 2, sep='-') works seamlessly without type errors.", "Auto String Coercion",
    "print('Item', 1, 'Status', 'OK', sep=': ')", "Item: 1: Status: OK", 22, 90),
  makeLesson(2, "2.1", "quiz", "Quiz: Default print separator",
    "' '", "What is the default value of sep in print()?", "Default Param Check",
    "' '", "Correct! The default separator is a single space ' '.", 20, 95),
  makeLesson(2, "2.2", "slide", "Controlling Line Endings with end",
    "print ends with a newline by default. Use end='' or end='... ' to keep the next print call on the very same screen line.",
    "The end parameter specifies the trailing character after printing all items.", "Inline Cursor Hold",
    "print('Downloading', end='... ')\nprint('Done!')", "Downloading... Done!", 22, 90),
  makeLesson(2, "2.2", "code", "Loading Indicator Stream",
    "print('Loading asset', end=' [')\nprint('====', end='] ')\nprint('100%')",
    "Combine multiple inline print calls to render real-time progress bars.", "Single Line Progress Bar",
    "print('Loading asset', end=' [')\nprint('====', end='] ')\nprint('100%')", "Loading asset [====] 100%", 24, 92),
  makeLesson(2, "2.2", "quiz", "Quiz: Default Line Ending",
    "'\\n'", "What is the default value of end in print()?", "Linefeed Recall",
    "'\\n'", "Correct! The default end is '\\n' (newline).", 20, 95),
  makeLesson(2, "2.3", "slide", "Escape Characters: \\n and \\t",
    "A backslash (\\) escapes the following character: \\n breaks into a new line, \\t inserts a tab stop, and \\\\ prints a literal backslash.",
    "Escape sequences allow invisible or special characters to be represented inside string literals.", "Invisible Formatting Codes",
    "print('NAME\\tSCORE\\nAlice\\t100')", "NAME\tSCORE\nAlice\t100", 22, 90),
  makeLesson(2, "2.3", "code", "Formatted Console Table",
    "print('RANK\\tUSER\\tWPM')\nprint('1\\tAlex\\t78')\nprint('2\\tMaya\\t74')",
    "Use \\t to align tabular data in monospace console outputs.", "Monospace Column Grid",
    "print('RANK\\tUSER\\tWPM')\nprint('1\\tAlex\\t78')\nprint('2\\tMaya\\t74')", "RANK\tUSER\tWPM\n1\tAlex\t78\n2\tMaya\t74", 24, 92),
  makeLesson(2, "2.3", "quiz", "Quiz: Tab Escape Token",
    "'\\t'", "What escape token inserts a horizontal tab?", "Tab Token Check",
    "'\\t'", "Correct! '\\t' represents a tab stop.", 20, 95),
  makeLesson(2, "2.4", "slide", "Multiple Variable Assignment & Swapping",
    "Python unpacks comma-separated values in one step: x, y = 10, 20. Swapping variables is as clean as a, b = b, a.",
    "Multiple assignment evaluates all right-side expressions before binding to left-side names.", "Simultaneous Value Swap",
    "x, y = 10, 20\nx, y = y, x\nprint(x, y)", "20 10", 24, 90),
  makeLesson(2, "2.4", "code", "Atomic Swapping Demo",
    "player_one = 'Knight'\nplayer_two = 'Ninja'\nplayer_one, player_two = player_two, player_one\nprint(player_one, player_two)",
    "No temporary variable is needed when swapping values in Python.", "Direct Swap Without Temp Variable",
    "player_one = 'Knight'\nplayer_two = 'Ninja'\nplayer_one, player_two = player_two, player_one\nprint(player_one, player_two)", "Ninja Knight", 24, 92),
  makeLesson(2, "2.5", "slide", "Constants & PEP 8 Style Guide",
    "Variables written in ALL_CAPS signal constants that should not be reassigned. Use descriptive snake_case for standard variables.",
    "PEP 8 is the official Python style guide recommending snake_case for variables and SCREAMING_SNAKE for constants.", "The Developer Code of Conduct",
    "MAX_SPEED = 120\nretry_count = 3\nprint(MAX_SPEED, retry_count)", "120 3", 22, 90),
  makeLesson(2, "2.5", "code", "PEP 8 Constant Declaration",
    "SERVER_HOST = '127.0.0.1'\nSERVER_PORT = 8080\nprint('Listening on', SERVER_HOST, sep='://', end=':')\nprint(SERVER_PORT)",
    "Declare network config constants and format them cleanly with sep and end.", "Server Configuration Header",
    "SERVER_HOST = '127.0.0.1'\nSERVER_PORT = 8080\nprint('Listening on', SERVER_HOST, sep='://', end=':')\nprint(SERVER_PORT)", "Listening on://127.0.0.1:8080", 24, 92),
  makeLesson(2, "2.6", "drill", "Output Tools Master Drill",
    "# log dispatcher\nAPP_NAME = 'KEYCRAFT'\nstatus = 'ONLINE'\nprint(APP_NAME, status, sep=' -> ', end=' | ')\nprint('PORT', 3000, sep=': ')",
    "Combine constants, custom separators, and inline progress indicators.", "Production Log Dispatcher",
    "# log dispatcher\nAPP_NAME = 'KEYCRAFT'\nstatus = 'ONLINE'\nprint(APP_NAME, status, sep=' -> ', end=' | ')\nprint('PORT', 3000, sep=': ')", "KEYCRAFT -> ONLINE | PORT: 3000", 26, 92),
  makeLesson(2, "2.6", "checkpoint", "Stage 2 Formatting Checkpoint",
    "x, y, z = 1, 2, 3\nprint(x, y, z, sep=', ', end='.\\n')\nprint('STAGE 2 COMPLETE')",
    "Stage 2 checkpoint testing multiple assignment, custom sep, and end control.", "Stage 2 Milestone Arch",
    "x, y, z = 1, 2, 3\nprint(x, y, z, sep=', ', end='.\\n')\nprint('STAGE 2 COMPLETE')", "1, 2, 3.\nSTAGE 2 COMPLETE", 26, 94),
  makeLesson(2, "2.7", "play", "Press Room: Keyword Stamp Factory",
    "print input sep end int str #",
    "Reflex arcade drill stamping Python keywords on incoming work orders.", "Rubber Stamp Reflexes",
    "print input sep end int str #", "", 25, 90, { gameId: "press-room", targetKeys: ["p", "r", "i", "n", "t", "s", "e", "p"] }),
  makeLesson(2, "2.8", "play", "Press Room: Special Characters & Syntax",
    "# \\n \\t , : ' \" = _",
    "Single-key reflex factory drilling quotes, backslashes, and syntax punctuation.", "Syntax Factory Shift",
    "# \\n \\t , : ' \" = _", "", 25, 90, { gameId: "press-room", targetKeys: ["#", "\n", "\t", ",", ":", "'", "\"", "="] })
];
stages.push({
  stageNumber: 2,
  id: "stage-2",
  title: "Stage 2: Tools & Output Formatting",
  targetWpm: 22,
  goal: "22 WPM",
  lessons: s2Lessons
});

// ==========================================
// STAGE 3: DATA TYPES & CASTING (14 lessons)
// ==========================================
const s3Lessons = [
  makeLesson(3, "3.1", "slide", "The 4 Core Primitive Types",
    "Python provides 4 core atomic types: int for whole numbers, float for decimals, str for text characters, and bool for True or False logic.",
    "Primitive data types define memory layout and allowed operations.", "The 4 Fundamental Elements",
    "age = 25\nrate = 3.14\nuser = 'Dev'\nis_active = True", "", 22, 90),
  makeLesson(3, "3.1", "code", "Declaring Primitive Quartet",
    "count = 100\nratio = 0.95\nlabel = 'Accuracy'\npassed = True\nprint(count, ratio, label, passed)",
    "Declare integer, floating point, string, and boolean variables in sequence.", "Typed Registry Record",
    "count = 100\nratio = 0.95\nlabel = 'Accuracy'\npassed = True\nprint(count, ratio, label, passed)", "100 0.95 Accuracy True", 24, 92),
  makeLesson(3, "3.1", "quiz", "Quiz: Data Type of 3.14",
    "float", "What type name does Python give to decimal floating-point numbers?", "Type Name Recall",
    "float", "Correct! Decimals are of type float.", 20, 95),
  makeLesson(3, "3.2", "slide", "Inspecting Types with type()",
    "The built-in type() function inspects any object at runtime and returns its class: type(42) returns <class 'int'>.",
    "Python is dynamically typed: variable types are checked and resolved at runtime.", "The Object Scanner",
    "print(type(42))\nprint(type('hello'))", "<class 'int'>\n<class 'str'>", 22, 90),
  makeLesson(3, "3.2", "code", "Runtime Type Verification",
    "val = 3.14159\nprint('Value:', val)\nprint('Type:', type(val))",
    "Use type() to debug variable mutations in complex calculations.", "Diagnostic Sensor",
    "val = 3.14159\nprint('Value:', val)\nprint('Type:', type(val))", "Value: 3.14159\nType: <class 'float'>", 24, 92),
  makeLesson(3, "3.3", "slide", "Explicit Type Conversion",
    "Cast values explicitly using int(), float(), str(), or bool(). Casting '99.5' requires float() before converting to int().",
    "Explicit type casting converts data representations between incompatible memory formats.", "The Material Converter",
    "num_str = '42'\nnum_int = int(num_str)\nprint(num_int + 8)", "50", 24, 90),
  makeLesson(3, "3.3", "code", "Price & Tax Calculator",
    "price_str = '49.95'\ntax_str = '0.08'\nprice = float(price_str)\ntotal = price * (1 + float(tax_str))\nprint('Total:', round(total, 2))",
    "Parse string inputs into floats and compute rounded business calculations.", "Checkout Register Logic",
    "price_str = '49.95'\ntax_str = '0.08'\nprice = float(price_str)\ntotal = price * (1 + float(tax_str))\nprint('Total:', round(total, 2))", "Total: 53.95", 26, 92),
  makeLesson(3, "3.3", "quiz", "Quiz: Result of bool(0)",
    "False", "What does the integer 0 evaluate to when cast to bool?", "Boolean Truthiness",
    "False", "Correct! 0 is falsy, evaluating to False.", 20, 95),
  makeLesson(3, "3.4", "slide", "Truthy & Falsy Concepts",
    "In Python, empty values (0, 0.0, '', None, [], {}) are falsy. Any non-empty string, non-zero number, or populated structure is truthy.",
    "Truthiness allows clean conditional checks without verbose comparisons like if len(x) > 0.", "Empty Box vs Filled Box",
    "print(bool(''))\nprint(bool('Python'))", "False\nTrue", 22, 90),
  makeLesson(3, "3.4", "code", "Truthiness Spectrum",
    "print('Empty str:', bool(''))\nprint('Non-empty:', bool('data'))\nprint('Zero int:', bool(0))\nprint('Positive:', bool(100))",
    "Verify truthiness across different data types.", "Truthiness Spectrum Meter",
    "print('Empty str:', bool(''))\nprint('Non-empty:', bool('data'))\nprint('Zero int:', bool(0))\nprint('Positive:', bool(100))", "Empty str: False\nNon-empty: True\nZero int: False\nPositive: True", 24, 92),
  makeLesson(3, "3.4", "explain", "Why Truthiness Simplifies Code",
    "Python developers write if user_name: instead of if user_name != '':. Empty strings naturally trigger the else branch.",
    "Idiomatic Python (Pythonic style) leverages truthiness for concise guards.", "Pythonic Conciseness",
    "name = ''\nif not name:\n    print('Anonymous user')", "Anonymous user", 22, 90),
  makeLesson(3, "3.4", "quiz", "Quiz: Is bool(' ') True or False?",
    "True", "A string containing a single space has length 1. Is it truthy?", "Space Character Truthiness",
    "True", "Correct! A space string is non-empty, so it is True.", 20, 95),
  makeLesson(3, "3.5", "drill", "Type Casting & Verification Drill",
    "# sensor telemetry parser\nraw_temp = '98.6'\nraw_alert = '1'\ntemp = float(raw_temp)\nalert = bool(int(raw_alert))\nprint('Temp:', temp, 'Alert:', alert)",
    "Cast raw telemetry strings into floating point temperatures and boolean alert flags.", "Telemetry Signal Processor",
    "# sensor telemetry parser\nraw_temp = '98.6'\nraw_alert = '1'\ntemp = float(raw_temp)\nalert = bool(int(raw_alert))\nprint('Temp:', temp, 'Alert:', alert)", "Temp: 98.6 Alert: True", 26, 92),
  makeLesson(3, "3.5", "checkpoint", "Stage 3 Types Checkpoint",
    "a = int('15')\nb = float('4.5')\nflag = bool(a)\nprint(a + int(b), flag)\nprint('STAGE 3 PASSED')",
    "Stage 3 milestone verifying type conversion and boolean evaluation.", "Stage 3 Milestone Gate",
    "a = int('15')\nb = float('4.5')\nflag = bool(a)\nprint(a + int(b), flag)\nprint('STAGE 3 PASSED')", "19 True\nSTAGE 3 PASSED", 26, 94)
];
stages.push({
  stageNumber: 3,
  id: "stage-3",
  title: "Stage 3: Data Types & Casting",
  targetWpm: 24,
  goal: "24 WPM",
  lessons: s3Lessons
});

// ==========================================
// STAGE 4: STRINGS & SLICING (22 lessons)
// ==========================================
const s4Lessons = [
  makeLesson(4, "4.1", "slide", "Strings as Sequences & len()",
    "Strings are ordered sequences of characters. The len() function returns the exact total count of characters, including spaces and symbols.",
    "String characters are indexed from 0 to len(s) - 1.", "The Character Chain",
    "text = 'Python'\nprint(len(text))", "6", 24, 90),
  makeLesson(4, "4.1", "code", "Character Count Meter",
    "title = 'Retrospeed Touch'\nlength = len(title)\nprint(title, 'has', length, 'characters')",
    "Measure string length and print summary message.", "Character Counter",
    "title = 'Retrospeed Touch'\nlength = len(title)\nprint(title, 'has', length, 'characters')", "Retrospeed Touch has 16 characters", 25, 92),
  makeLesson(4, "4.2", "slide", "Zero-Based Indexing & Tails",
    "Access any character by its 0-based offset: s[0] is the head. Negative indices count backwards from the end: s[-1] is the last character.",
    "Zero-based indexing represents the distance from the start of the memory buffer.", "The Ruler Offset",
    "word = 'Python'\nprint(word[0], word[-1])", "P n", 24, 90),
  makeLesson(4, "4.2", "code", "Head & Tail Inspection",
    "filename = 'dataset.csv'\nfirst = filename[0]\nlast = filename[-1]\nprint('First:', first, 'Last:', last)",
    "Extract first and last characters from filenames and paths.", "Boundary Inspection",
    "filename = 'dataset.csv'\nfirst = filename[0]\nlast = filename[-1]\nprint('First:', first, 'Last:', last)", "First: d Last: v", 26, 92),
  makeLesson(4, "4.2", "quiz", "Quiz: Index of the first character",
    "0", "What index retrieves the first item in any Python sequence?", "First Index Recall",
    "0", "Correct! Python indexing begins at 0.", 20, 95),
  makeLesson(4, "4.3", "slide", "String Slicing: [start:stop]",
    "Slicing extracts a substring using [start:stop]. The start index is included, but the stop index is excluded (half-open interval).",
    "Slicing never throws IndexError on out-of-range bounds; it gracefully truncates.", "The Substring Scalpel",
    "code = 'PY-312'\nprefix = code[0:2]\nprint(prefix)", "PY", 24, 90),
  makeLesson(4, "4.3", "code", "Domain & Username Slicer",
    "email = 'dev@retro.io'\nuser = email[:3]\ndomain = email[4:]\nprint('User:', user, 'Domain:', domain)",
    "Omit start to slice from the beginning, or omit stop to slice to the end.", "Email Partitioning",
    "email = 'dev@retro.io'\nuser = email[:3]\ndomain = email[4:]\nprint('User:', user, 'Domain:', domain)", "User: dev Domain: retro.io", 26, 92),
  makeLesson(4, "4.3", "explain", "Why Stop Index is Excluded",
    "Excluding stop ensures stop - start gives the exact length of the sliced segment: s[0:3] yields 3 characters.",
    "Mathematical property of half-open intervals [a, b).", "Length Formula Invariant",
    "s = 'abcdef'\nprint(len(s[1:4]))", "3", 22, 90),
  makeLesson(4, "4.4", "slide", "Step Slicing & Reversal [::-1]",
    "Pass a third parameter for step: s[::2] picks every second character. A negative step [::-1] cleanly reverses the entire string.",
    "Extended slicing [start:stop:step] controls traversal direction and stride.", "Stride & Inversion",
    "word = 'radar'\nprint(word[::-1])", "radar", 25, 90),
  makeLesson(4, "4.4", "code", "Palindrome Checker Slicer",
    "token = 'level'\nis_palindrome = token == token[::-1]\nprint(token, 'is palindrome:', is_palindrome)",
    "Reverse strings with [::-1] to check symmetry.", "Palindrome Verifier",
    "token = 'level'\nis_palindrome = token == token[::-1]\nprint(token, 'is palindrome:', is_palindrome)", "level is palindrome: True", 26, 92),
  makeLesson(4, "4.4", "quiz", "Quiz: Reverse String Slice",
    "[::-1]", "What slice notation reverses an entire sequence?", "Reverse Slice Token",
    "[::-1]", "Correct! [::-1] steps backwards through the string.", 20, 95),
  makeLesson(4, "4.5", "slide", "Case Transforms: upper, lower, strip",
    "Strings are immutable. Methods like .upper(), .lower(), and .strip() return a fresh new transformed string without altering the original.",
    "String methods never modify in place; they allocate a new string object.", "String Transformer Methods",
    "raw = '  admin  '\nclean = raw.strip().upper()\nprint(clean)", "ADMIN", 24, 90),
  makeLesson(4, "4.5", "code", "Sanitizing User Queries",
    "query = '  FIND DATA  '\nnormalized = query.strip().lower()\nprint('Search key:', normalized)",
    "Sanitize search queries with method chaining .strip().lower().", "Query Normalizer",
    "query = '  FIND DATA  '\nnormalized = query.strip().lower()\nprint('Search key:', normalized)", "Search key: find data", 26, 92),
  makeLesson(4, "4.6", "slide", "Searching with startswith, endswith, find",
    "startswith checks the head, endswith checks the tail, and find returns the first index of a substring or -1 if missing.",
    "String inspection methods validate extensions and search needle positions safely.", "Search Trio",
    "name = 'report.csv'\nprint(name.endswith('.csv'))\nprint(name.find('.'))", "True\n6", 24, 90),
  makeLesson(4, "4.6", "code", "Type the Search Trio",
    "name = 'report.csv'\nprint(name.startswith('rep'))\nprint(name.endswith('.csv'))\nprint(name.find('.'))\nprint(name.find('pdf'))",
    "Perform prefix, suffix, and substring searches across file names.", "File Extension Validator",
    "name = 'report.csv'\nprint(name.startswith('rep'))\nprint(name.endswith('.csv'))\nprint(name.find('.'))\nprint(name.find('pdf'))", "True\nTrue\n6\n-1", 26, 92),
  makeLesson(4, "4.6", "explain", "Why find() is Safe",
    "find() does not raise an exception when the needle is absent. It returns sentinel -1 so you can guard with if idx != -1:.",
    "Sentinel return values prevent crashes during exploratory text parsing.", "Sentinel Value Safety",
    "tag = 'header'\npos = tag.find('z')\nprint('Found at:', pos)", "Found at: -1", 22, 90),
  makeLesson(4, "4.6", "quiz", "Quiz: find('z') in 'abc' returns",
    "-1", "What does .find() return when the target substring is missing?", "Sentinel Return Check",
    "-1", "Correct! find() returns -1 on missing needles.", 20, 95),
  makeLesson(4, "4.7", "slide", "Modern f-Strings: Variable Injection",
    "Prefix a string with f to embed expressions directly inside curly braces: f'Score: {score} pts'. Fast, readable, and Pythonic.",
    "f-strings (PEP 498) evaluate embedded Python expressions at runtime with high speed.", "The Template Injector",
    "user = 'Alex'\nwpm = 82\nprint(f'{user} typed at {wpm} WPM')", "Alex typed at 82 WPM", 25, 90),
  makeLesson(4, "4.7", "code", "f-String Formatting Precision",
    "item = 'Mechanical Switch'\nprice = 1.495\nqty = 10\nprint(f'{qty}x {item} @ ${price:.2f} = ${qty * price:.2f}')",
    "Format floats to two decimals using :.2f inside f-string placeholders.", "Price Tag Formatter",
    "item = 'Mechanical Switch'\nprice = 1.495\nqty = 10\nprint(f'{qty}x {item} @ ${price:.2f} = ${qty * price:.2f}')", "10x Mechanical Switch @ $1.50 = $14.95", 28, 92),
  makeLesson(4, "4.8", "drill", "String Parsing & Formatting Drill",
    "# parse student log\nentry = 'USER:042:MAYA:78WPM'\ntokens = entry.split(':')\nuid, name, speed = tokens[1], tokens[2], tokens[3]\nprint(f'Player #{uid} ({name}) hit {speed}')",
    "Combine splitting, indexing, and f-string interpolation to parse structured telemetry.", "Telemetry Record Parser",
    "# parse student log\nentry = 'USER:042:MAYA:78WPM'\ntokens = entry.split(':')\nuid, name, speed = tokens[1], tokens[2], tokens[3]\nprint(f'Player #{uid} ({name}) hit {speed}')", "Player #042 (MAYA) hit 78WPM", 28, 92),
  makeLesson(4, "4.8", "checkpoint", "Stage 4 Strings Checkpoint",
    "s = 'python.touch.typing'\nparts = s.split('.')\nslug = '-'.join(parts)\nprint(f'SLUG: {slug.upper()}')\nprint('STAGE 4 COMPLETE')",
    "Stage 4 review verifying split, join, case manipulation, and f-strings.", "Stage 4 Milestone Arch",
    "s = 'python.touch.typing'\nparts = s.split('.')\nslug = '-'.join(parts)\nprint(f'SLUG: {slug.upper()}')\nprint('STAGE 4 COMPLETE')", "SLUG: PYTHON-TOUCH-TYPING\nSTAGE 4 COMPLETE", 28, 94),
  makeLesson(4, "4.9", "play", "Patch Terminal: String Punctuation Hack",
    "\" \" ' ' \\n \\t [ : ] { } . _ f",
    "Arcade syntax stream hacking quotes, slice brackets, and f-string braces.", "String Syntax Decryptor",
    "\" \" ' ' \\n \\t [ : ] { } . _ f", "", 26, 90, { gameId: "patch-terminal", targetKeys: ["\"", "'", "\n", "\t", "[", "]", ":", "{", "}", "."] })
];
stages.push({
  stageNumber: 4,
  id: "stage-4",
  title: "Stage 4: Strings & Slicing",
  targetWpm: 25,
  goal: "25 WPM",
  lessons: s4Lessons
});

// ==========================================
// STAGE 5: NUMBERS, OPERATORS & MATH (14 lessons)
// ==========================================
const s5Lessons = [
  makeLesson(5, "5.1", "slide", "Floor Division (//) vs Float (/)",
    "Single slash (/) always returns a float (7 / 2 -> 3.5). Double slash (//) performs floor division, rounding down to an integer (7 // 2 -> 3).",
    "Floor division calculates the integer quotient, discarding any fractional remainder.", "Quotient vs Floor",
    "print(7 / 2)\nprint(7 // 2)", "3.5\n3", 24, 90),
  makeLesson(5, "5.1", "code", "Division Dual Mode",
    "total_seconds = 185\nminutes = total_seconds // 60\nseconds = total_seconds % 60\nprint(f'{minutes}m {seconds}s')",
    "Use floor division and modulo to convert seconds into minutes and seconds.", "Clock Converter",
    "total_seconds = 185\nminutes = total_seconds // 60\nseconds = total_seconds % 60\nprint(f'{minutes}m {seconds}s')", "3m 5s", 26, 92),
  makeLesson(5, "5.1", "quiz", "Quiz: Result of 7 // 2",
    "3", "What is the integer result of 7 // 2?", "Floor Division Check",
    "3", "Correct! 7 // 2 truncates down to 3.", 20, 95),
  makeLesson(5, "5.2", "slide", "Modulo (%) & Exponentiation (**)",
    "Modulo (%) returns the remainder of a division (10 % 3 -> 1). Exponentiation (**) raises a base to a power (2 ** 8 -> 256).",
    "Modulo is essential for even/odd checks, circular buffer indexing, and time conversions.", "Remainder & Power Operators",
    "print(10 % 3)\nprint(2 ** 8)", "1\n256", 24, 90),
  makeLesson(5, "5.2", "code", "Even Number & Power Calculation",
    "num = 14\nis_even = (num % 2 == 0)\nbyte_combos = 2 ** 8\nprint('Even:', is_even, 'Byte combos:', byte_combos)",
    "Test divisibility using num % 2 and compute 8-bit powers.", "Bit Combinatorics",
    "num = 14\nis_even = (num % 2 == 0)\nbyte_combos = 2 ** 8\nprint('Even:', is_even, 'Byte combos:', byte_combos)", "Even: True Byte combos: 256", 26, 92),
  makeLesson(5, "5.2", "quiz", "Quiz: 10 % 3 equals",
    "1", "What is the remainder when 10 is divided by 3?", "Modulo Math Recall",
    "1", "Correct! 10 = 3 * 3 + 1.", 20, 95),
  makeLesson(5, "5.3", "slide", "Augmented Assignment (+=, -=, *=, /=)",
    "Shortcut operators update a variable in place: count += 1 is shorthand for count = count + 1. Clean, concise, and standard.",
    "Augmented assignment evaluates the right expression and modifies the left variable.", "The In-Place Incrementer",
    "total = 100\ntotal += 25\ntotal -= 10\nprint(total)", "115", 24, 90),
  makeLesson(5, "5.3", "code", "Score Multiplier Accumulator",
    "score = 500\nscore += 150\nscore *= 2\nprint('Final score:', score)",
    "Accumulate game points and apply streak multipliers using augmented operators.", "Scoreboard Accumulator",
    "score = 500\nscore += 150\nscore *= 2\nprint('Final score:', score)", "Final score: 1300", 26, 92),
  makeLesson(5, "5.4", "slide", "Built-In Math Functions",
    "Python includes built-in functions: abs() for absolute value, round() for rounding, min() for lowest, and max() for highest.",
    "Built-in arithmetic utilities operate directly without requiring external module imports.", "The Numeric Swiss Army Knife",
    "print(abs(-42))\nprint(max(10, 85, 33))\nprint(round(3.14159, 2))", "42\n85\n3.14", 24, 90),
  makeLesson(5, "5.4", "code", "Stats Bounds Extractor",
    "scores = [72, 95, 88, 64, 91]\nlow = min(scores)\nhigh = max(scores)\navg = round(sum(scores) / len(scores), 1)\nprint(f'Range: {low}-{high}, Avg: {avg}')",
    "Calculate min, max, sum, and average from score distributions.", "Grade Telemetry Analyzer",
    "scores = [72, 95, 88, 64, 91]\nlow = min(scores)\nhigh = max(scores)\navg = round(sum(scores) / len(scores), 1)\nprint(f'Range: {low}-{high}, Avg: {avg}')", "Range: 64-95, Avg: 82.0", 28, 92),
  makeLesson(5, "5.5", "slide", "Importing math & random Modules",
    "Import standard library tools with import math and import random. Access functions via dot notation: math.sqrt(16) or random.randint(1, 6).",
    "The Python standard library provides batteries-included mathematical and stochastic modules.", "Module Toolbox",
    "import math\nprint(math.sqrt(64))\nprint(math.pi)", "8.0\n3.141592653589793", 25, 90),
  makeLesson(5, "5.5", "code", "Distance & Probability Engine",
    "import math\nimport random\ndx, dy = 3, 4\ndist = math.hypot(dx, dy)\nroll = random.randint(1, 6)\nprint(f'Distance: {dist}, Dice Roll: {roll}')",
    "Compute Euclidean distance and simulate random dice rolls.", "Geometry & Stochastic Engine",
    "import math\nimport random\ndx, dy = 3, 4\ndist = math.hypot(dx, dy)\nroll = random.randint(1, 6)\nprint(f'Distance: {dist}, Dice Roll: {roll}')", "Distance: 5.0, Dice Roll: 6", 28, 92),
  makeLesson(5, "5.6", "drill", "Math & Physics Vector Drill",
    "# 2D velocity calculation\nimport math\nvx, vy = 12.0, 16.0\nspeed = math.sqrt(vx**2 + vy**2)\nangle_deg = round(math.degrees(math.atan2(vy, vx)), 1)\nprint(f'Speed: {speed} m/s, Angle: {angle_deg} deg')",
    "Calculate 2D velocity magnitude and heading angles.", "Physics Vector Engine",
    "# 2D velocity calculation\nimport math\nvx, vy = 12.0, 16.0\nspeed = math.sqrt(vx**2 + vy**2)\nangle_deg = round(math.degrees(math.atan2(vy, vx)), 1)\nprint(f'Speed: {speed} m/s, Angle: {angle_deg} deg')", "Speed: 20.0 m/s, Angle: 53.1 deg", 28, 92),
  makeLesson(5, "5.7", "play", "Fuse Box: Circuit Operator Duel",
    "// % ** += -= *= /= == != < > <= >=",
    "Reflex arcade wire patch typing mathematical and assignment operators.", "Operator Wire Terminal",
    "// % ** += -= *= /= == != < > <= >=", "", 26, 90, { gameId: "fuse-desk", targetKeys: ["/", "%", "*", "+", "-", "=", "!", "<", ">"] })
];
stages.push({
  stageNumber: 5,
  id: "stage-5",
  title: "Stage 5: Numbers, Operators & Math",
  targetWpm: 25,
  goal: "25 WPM",
  lessons: s5Lessons
});

// ==========================================
// STAGE 6: LOGIC, COMPARISONS & BOOLEANS (18 lessons)
// ==========================================
const s6Lessons = [
  makeLesson(6, "6.1", "slide", "Comparison Operators (==, !=, <, >)",
    "Comparison operators test relationships and return boolean True or False: == checks value equality, != checks inequality, < and > test ordering.",
    "Comparisons evaluate expressions down to strict boolean primitives.", "The Logical Comparator",
    "x = 10\nprint(x == 10)\nprint(x != 5)\nprint(x > 20)", "True\nTrue\nFalse", 24, 90),
  makeLesson(6, "6.1", "code", "Grade & Threshold Comparisons",
    "speed = 65\naccuracy = 98\nmet_speed = (speed >= 60)\nmet_acc = (accuracy >= 95)\nprint('Speed OK:', met_speed, 'Acc OK:', met_acc)",
    "Test numerical thresholds against speed and accuracy requirements.", "Requirement Checker",
    "speed = 65\naccuracy = 98\nmet_speed = (speed >= 60)\nmet_acc = (accuracy >= 95)\nprint('Speed OK:', met_speed, 'Acc OK:', met_acc)", "Speed OK: True Acc OK: True", 26, 92),
  makeLesson(6, "6.1", "explain", "Equality == vs Assignment =",
    "A single equal sign (=) assigns a value to a variable. A double equal sign (==) asks if two values are equal. Mixing them is a classic syntax bug.",
    "Assignment binds names; equality evaluates comparison.", "The Equal Sign Distinction",
    "status = 'active'\nis_admin = (status == 'admin')\nprint(is_admin)", "False", 22, 90),
  makeLesson(6, "6.1", "quiz", "Quiz: Equality Comparison Operator",
    "==", "What operator tests whether two values are equal in Python?", "Equality Token Check",
    "==", "Correct! Double equals == tests equality.", 20, 95),
  makeLesson(6, "6.2", "slide", "Logical Conjunction: and",
    "The and operator requires both operands to be True: True and True -> True. If either side is False, the entire expression evaluates to False.",
    "Logical AND represents intersection: both conditions must hold simultaneously.", "The Dual Key Lock",
    "age = 20\nhas_id = True\ncan_enter = (age >= 18 and has_id)\nprint(can_enter)", "True", 24, 90),
  makeLesson(6, "6.2", "code", "Security Guard Dual Gate",
    "user_role = 'editor'\nis_logged_in = True\nhas_write_access = (is_logged_in and user_role in ['editor', 'admin'])\nprint('Write access:', has_write_access)",
    "Verify multiple authorization rules simultaneously with and.", "Access Control Guard",
    "user_role = 'editor'\nis_logged_in = True\nhas_write_access = (is_logged_in and user_role in ['editor', 'admin'])\nprint('Write access:', has_write_access)", "Write access: True", 26, 92),
  makeLesson(6, "6.3", "slide", "Logical Disjunction: or",
    "The or operator requires at least one operand to be True: False or True -> True. It only evaluates to False if both sides are False.",
    "Logical OR represents union: any passing condition succeeds.", "The Multiple Door Entry",
    "is_admin = False\nis_owner = True\ncan_delete = (is_admin or is_owner)\nprint(can_delete)", "True", 24, 90),
  makeLesson(6, "6.3", "code", "Discount Eligibility Filter",
    "is_student = False\nis_senior = True\nhas_coupon = False\neligible = (is_student or is_senior or has_coupon)\nprint('Discount eligible:', eligible)",
    "Combine multiple fallback qualifying flags using or chains.", "Promotional Discount Filter",
    "is_student = False\nis_senior = True\nhas_coupon = False\neligible = (is_student or is_senior or has_coupon)\nprint('Discount eligible:', eligible)", "Discount eligible: True", 26, 92),
  makeLesson(6, "6.4", "slide", "Logical Negation: not",
    "The not operator inverts a boolean value: not True -> False, and not False -> True. Use it to check empty or uninitialized states.",
    "Logical NOT flips truthiness states.", "The Boolean Inverter",
    "is_locked = False\ncan_open = not is_locked\nprint('Can open:', can_open)", "Can open: True", 24, 90),
  makeLesson(6, "6.4", "code", "Inventory Out of Stock Guard",
    "stock_count = 0\nis_out_of_stock = not bool(stock_count)\nprint('Reorder needed:', is_out_of_stock)",
    "Invert empty stock numbers into proactive restock triggers.", "Stock Inverter Guard",
    "stock_count = 0\nis_out_of_stock = not bool(stock_count)\nprint('Reorder needed:', is_out_of_stock)", "Reorder needed: True", 26, 92),
  makeLesson(6, "6.5", "explain", "Short-Circuit Evaluation",
    "In a and b, if a is False, Python never evaluates b. In a or b, if a is True, Python stops immediately. This prevents crashes.",
    "Short-circuiting ensures safe attribute lookups like if user and user.is_active:.", "The Early Exit Circuit",
    "name = None\n# safe: does not crash because name is falsy\nis_valid = (name is not None and len(name) > 0)\nprint('Valid:', is_valid)", "Valid: False", 22, 90),
  makeLesson(6, "6.5", "quiz", "Quiz: True or False evaluates to",
    "True", "What does the expression True or False evaluate to?", "Short-circuit OR recall",
    "True", "Correct! Any True operand satisfies or.", 20, 95),
  makeLesson(6, "6.6", "slide", "Membership Testing with in and not in",
    "The in operator checks if an item exists inside a container (string, list, set, dict). not in checks if it is absent.",
    "Membership testing provides readable, high-speed lookup across collections.", "The Guest List Inspector",
    "vowels = 'aeiou'\nprint('e' in vowels)\nprint('x' not in vowels)", "True\nTrue", 24, 90),
  makeLesson(6, "6.6", "code", "Allowed Domain Whitelist",
    "whitelist = ['retro.io', 'keycraft.dev', 'python.org']\nhost = 'retro.io'\nis_allowed = (host in whitelist)\nprint(f'Host {host} allowed: {is_allowed}')",
    "Validate network domain origins against safe lists.", "Domain Whitelist Guard",
    "whitelist = ['retro.io', 'keycraft.dev', 'python.org']\nhost = 'retro.io'\nis_allowed = (host in whitelist)\nprint(f'Host {host} allowed: {is_allowed}')", "Host retro.io allowed: True", 26, 92),
  makeLesson(6, "6.7", "slide", "Identity (is) vs Equality (==)",
    "== checks if two objects have identical values. is checks if both variables point to the exact same memory address. Use is for None.",
    "Value equality vs object identity in Python memory.", "Same Value vs Same Object",
    "a = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)\nprint(a is b)", "True\nFalse", 24, 90),
  makeLesson(6, "6.7", "code", "None Singleton Identity Check",
    "payload = None\nis_empty = (payload is None)\nprint('Payload is None:', is_empty)",
    "Always check None using is None instead of == None.", "None Singleton Check",
    "payload = None\nis_empty = (payload is None)\nprint('Payload is None:', is_empty)", "Payload is None: True", 26, 92),
  makeLesson(6, "6.8", "drill", "Complex Boolean Logic Gate Drill",
    "# user permission evaluator\nis_authenticated = True\nis_verified = True\nis_banned = False\nrole = 'moderator'\ncan_publish = (is_authenticated and is_verified and not is_banned and (role in ['admin', 'moderator']))\nprint('Can publish:', can_publish)",
    "Combine authentication, verification, ban status, and role checking into a single boolean decision.", "Role Permission Evaluator",
    "# user permission evaluator\nis_authenticated = True\nis_verified = True\nis_banned = False\nrole = 'moderator'\ncan_publish = (is_authenticated and is_verified and not is_banned and (role in ['admin', 'moderator']))\nprint('Can publish:', can_publish)", "Can publish: True", 28, 92),
  makeLesson(6, "6.8", "checkpoint", "Stage 6 Logic Checkpoint",
    "flag_a = True\nflag_b = False\nres = (flag_a or flag_b) and not (flag_a and flag_b)\nprint('XOR Result:', res)\nprint('STAGE 6 LOGIC MASTERED')",
    "Stage 6 milestone verifying boolean algebra and XOR emulation.", "Stage 6 Milestone Gate",
    "flag_a = True\nflag_b = False\nres = (flag_a or flag_b) and not (flag_a and flag_b)\nprint('XOR Result:', res)\nprint('STAGE 6 LOGIC MASTERED')", "XOR Result: True\nSTAGE 6 LOGIC MASTERED", 28, 94)
];
stages.push({
  stageNumber: 6,
  id: "stage-6",
  title: "Stage 6: Logic, Comparisons & Booleans",
  targetWpm: 26,
  goal: "26 WPM",
  lessons: s6Lessons
});

// ==========================================
// STAGE 7: BRANCHING & LOOPS (36 lessons + Night Market)
// ==========================================
const s7Lessons = [];
for (let i = 1; i <= 36; i++) {
  let lType = "code";
  let title = `Control Flow Step ${i}`;
  let text = `print('Loop step ${i}')`;
  let concept = "Branching and looping control structures.";
  let analogy = "The Railroad Switcher";
  let exp = `Loop step ${i}`;
  let extra = {};

  if (i === 1) {
    lType = "slide"; title = "Conditional Execution with if";
    text = "An if statement evaluates a boolean expression. If True, Python executes the indented block below it. Indentation must be 4 spaces.";
    concept = "Code blocks in Python are defined strictly by whitespace indentation."; analogy = "The Decision Fork";
    code = "score = 85\nif score >= 80:\n    print('Great job!')"; exp = "Great job!";
  } else if (i === 2) {
    lType = "code"; title = "Basic if Block";
    text = "speed = 72\nif speed > 60:\n    print('Turbo Speed Active!')";
    concept = "Execute conditional branch when speed threshold is met."; analogy = "Speed Sensor Trigger";
    code = text; exp = "Turbo Speed Active!";
  } else if (i === 3) {
    lType = "slide"; title = "Two-Way Branching: if-else";
    text = "Use else to provide an alternate execution path when the if condition evaluates to False. Exactly one branch will run.";
    concept = "Binary choice branching guarantees one of two blocks will execute."; analogy = "The Fork in the Road";
    code = "accuracy = 92\nif accuracy >= 95:\n    print('Gold Star')\nelse:\n    print('Silver Star')"; exp = "Silver Star";
  } else if (i === 4) {
    lType = "code"; title = "Pass / Fail Exam Evaluation";
    text = "score = 75\nif score >= 60:\n    print('Status: PASS')\nelse:\n    print('Status: RETRY')";
    code = text; exp = "Status: PASS";
  } else if (i === 5) {
    lType = "slide"; title = "Multi-Branch Ladders: elif";
    text = "Chain multiple mutual exclusive conditions using elif (short for else if). Python evaluates from top to bottom, stopping at the first True match.";
    concept = "Multi-way decision ladders."; analogy = "The Multi-Track Switch";
    code = "tier = 2\nif tier == 1:\n    print('Bronze')\nelif tier == 2:\n    print('Silver')\nelse:\n    print('Gold')"; exp = "Silver";
  } else if (i === 6) {
    lType = "code"; title = "Grading Ladder Dispatcher";
    text = "marks = 88\nif marks >= 90:\n    grade = 'A'\nelif marks >= 80:\n    grade = 'B'\nelif marks >= 70:\n    grade = 'C'\nelse:\n    grade = 'F'\nprint('Grade:', grade)";
    code = text; exp = "Grade: B";
  } else if (i === 7) {
    lType = "quiz"; title = "Quiz: Python Keyword for Else-If",
    text = "elif"; concept = "What keyword does Python use for 'else if'?"; analogy = "Syntax Keyword Recall";
    code = "elif"; exp = "Correct! elif is Python's else-if.";
  } else if (i === 8) {
    lType = "slide"; title = "Ternary Expressions (Inline If)";
    text = "Condense simple if-else decisions into one clean line: value_if_true if condition else value_if_false.";
    concept = "Ternary conditional expressions return values inline."; analogy = "One-Line Selector";
    code = "age = 20\nstatus = 'Adult' if age >= 18 else 'Minor'\nprint(status)"; exp = "Adult";
  } else if (i === 9) {
    lType = "code"; title = "Inline Theme Selector";
    text = "is_dark_mode = True\nbg_color = '#2D2319' if is_dark_mode else '#FDF8EE'\nprint('Background:', bg_color)";
    code = text; exp = "Background: #2D2319";
  } else if (i === 10) {
    lType = "slide"; title = "Definite Iteration with for loops";
    text = "A for loop iterates over each item in a sequence (string, list, range). The loop variable updates automatically each iteration.";
    concept = "for loops process collections item by item until exhausted."; analogy = "The Assembly Line";
    code = "for char in 'ABC':\n    print('Key:', char)"; exp = "Key: A\nKey: B\nKey: C";
  } else if (i === 11) {
    lType = "code"; title = "Looping Characters in Sequence";
    text = "word = 'PYTHON'\nfor letter in word:\n    print(f'[{letter}]', end=' ')\nprint()";
    code = text; exp = "[P] [Y] [T] [H] [O] [N] ";
  } else if (i === 12) {
    lType = "slide"; title = "Generating Sequences with range()";
    text = "range(stop) counts from 0 up to stop - 1. range(start, stop, step) customizes start offset and stride.";
    concept = "range generates numbers in memory on demand without allocating large lists."; analogy = "The Number Generator";
    code = "for i in range(1, 4):\n    print('Lap', i)"; exp = "Lap 1\nLap 2\nLap 3";
  } else if (i === 13) {
    lType = "code"; title = "Range Stepping & Summation";
    text = "total = 0\nfor n in range(2, 11, 2):\n    total += n\nprint('Sum of evens:', total)";
    code = text; exp = "Sum of evens: 30";
  } else if (i === 14) {
    lType = "quiz"; title = "Quiz: list(range(3)) yields",
    text = "[0, 1, 2]"; concept = "What list of numbers is produced by range(3)?"; analogy = "Range Output Check";
    code = "[0, 1, 2]"; exp = "Correct! range(3) produces 0, 1, 2.";
  } else if (i === 15) {
    lType = "slide"; title = "Tracking Indices with enumerate()";
    text = "enumerate(sequence, start=0) yields both the index and the item during each loop pass, eliminating manual index tracking.";
    concept = "Enumerate pairs sequential counter indices with collection values."; analogy = "Numbered Checklist";
    code = "keys = ['F', 'J', 'D']\nfor i, k in enumerate(keys, 1):\n    print(f'{i}. Key {k}')"; exp = "1. Key F\n2. Key J\n3. Key D";
  } else if (i === 16) {
    lType = "code"; title = "Leaderboard Rank Enumerator";
    text = "podium = ['Alpha', 'Bravo', 'Charlie']\nfor rank, player in enumerate(podium, 1):\n    print(f'#{rank}: {player}')";
    code = text; exp = "#1: Alpha\n#2: Bravo\n#3: Charlie";
  } else if (i === 17) {
    lType = "slide"; title = "Parallel Iteration with zip()";
    text = "zip() pairs up corresponding elements from multiple lists simultaneously: for name, score in zip(names, scores):.";
    concept = "zip combines multiple iterables into tuples of grouped elements."; analogy = "The Zipper Mechanism";
    code = "users = ['A', 'B']\nwpm = [80, 95]\nfor u, w in zip(users, wpm):\n    print(u, w)"; exp = "A 80\nB 95";
  } else if (i === 18) {
    lType = "code"; title = "Multi-List Telemetry Pairing";
    text = "subjects = ['Speed', 'Accuracy', 'Rhythm']\nscores = [92, 98, 85]\nfor subj, score in zip(subjects, scores):\n    print(f'{subj}: {score}%')";
    code = text; exp = "Speed: 92%\nAccuracy: 98%\nRhythm: 85%";
  } else if (i === 19) {
    lType = "slide"; title = "Indefinite Loops: while";
    text = "A while loop keeps running as long as its condition remains True. Always make sure the loop body updates the condition variable.";
    concept = "while loops execute repeatedly until a state condition is invalidated."; analogy = "The Running Motor";
    code = "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint('GO!')"; exp = "3\n2\n1\nGO!";
  } else if (i === 20) {
    lType = "code"; title = "Countdown Timer Sequence";
    text = "timer = 5\nwhile timer > 0:\n    print(f'T-{timer}s')\n    timer -= 1\nprint('LIFTOFF!')";
    code = text; exp = "T-5s\nT-4s\nT-3s\nT-2s\nT-1s\nLIFTOFF!";
  } else if (i === 21) {
    lType = "slide"; title = "Breaking Out Early with break";
    text = "The break statement terminates the active loop immediately, jumping directly to the first line of code after the loop.";
    concept = "break halts iteration instantly upon discovering a target or error."; analogy = "The Emergency Stop Switch";
    code = "for n in range(10):\n    if n == 3:\n        break\n    print(n)"; exp = "0\n1\n2";
  } else if (i === 22) {
    lType = "code"; title = "Target Search with break";
    text = "target = 'FLAG'\nitems = ['DATA', 'KEY', 'FLAG', 'LOG']\nfor item in items:\n    if item == target:\n        print('Found target!')\n        break";
    code = text; exp = "Found target!";
  } else if (i === 23) {
    lType = "slide"; title = "Skipping Iterations with continue";
    text = "The continue statement skips the rest of the current iteration and jumps immediately to the next loop pass.";
    concept = "continue bypasses unwanted elements without stopping the whole loop."; analogy = "Skip to Next Track";
    code = "for n in range(5):\n    if n % 2 == 0:\n        continue\n    print(n)"; exp = "1\n3";
  } else if (i === 24) {
    lType = "code"; title = "Filtering Non-Printable Tokens";
    text = "tokens = ['valid', '', 'data', None, 'clean']\nfor t in tokens:\n    if not t:\n        continue\n    print('Token:', t)";
    code = text; exp = "Token: valid\nToken: data\nToken: clean";
  } else if (i === 25) {
    lType = "slide"; title = "The Unique Loop else Clause";
    text = "A loop can have an else block. It executes only if the loop finishes naturally without encountering a break statement.";
    concept = "Loop else acts as a 'no-break' completion handler."; analogy = "Exhausted Search Trigger";
    code = "for n in [1, 3, 5]:\n    if n % 2 == 0:\n        break\nelse:\n    print('No evens found')"; exp = "No evens found";
  } else if (i === 26) {
    lType = "code"; title = "Prime Number Search Engine";
    text = "n = 7\nfor i in range(2, n):\n    if n % i == 0:\n        print(f'{n} is composite')\n        break\nelse:\n    print(f'{n} is prime!')";
    code = text; exp = "7 is prime!";
  } else if (i === 27) {
    lType = "slide"; title = "Nested Loops & Grids";
    text = "A loop inside another loop is a nested loop. The inner loop completes all its iterations for every single pass of the outer loop.",
    concept = "Nested iteration traverses 2D tables and matrix grids."; analogy = "Row and Column Traversal";
    code = "for r in range(2):\n    for c in range(2):\n        print(f'({r},{c})', end=' ')\n    print()"; exp = "(0,0) (0,1) \n(1,0) (1,1) ";
  } else if (i === 28) {
    lType = "code"; title = "ASCII Matrix Grid Plotter";
    text = "for row in range(3):\n    for col in range(3):\n        print('#', end=' ')\n    print()";
    code = text; exp = "# # # \n# # # \n# # # ";
  } else if (i === 29) {
    lType = "drill"; title = "Loop Filtering & Aggregation Drill";
    text = "# calculate sum of squares for evens\ntotal = 0\nfor x in range(1, 10):\n    if x % 2 != 0:\n        continue\n    total += x ** 2\nprint('Sum of even squares:', total)";
    code = text; exp = "Sum of even squares: 120";
  } else if (i === 30) {
    lType = "drill"; title = "While Loop Convergence Drill";
    text = "balance = 1000\nyears = 0\nwhile balance < 1200:\n    balance *= 1.05\n    years += 1\nprint(f'Target reached in {years} years: ${round(balance, 2)}')";
    code = text; exp = "Target reached in 4 years: $1215.51";
  } else if (i === 31) {
    lType = "drill"; title = "Matrix Search Algorithm";
    text = "grid = [[1, 2], [3, 4]]\nfound = False\nfor r_idx, row in enumerate(grid):\n    for c_idx, val in enumerate(row):\n        if val == 3:\n            print(f'Found at ({r_idx}, {c_idx})')\n            found = True";
    code = text; exp = "Found at (1, 0)";
  } else if (i === 32) {
    lType = "drill"; title = "FizzBuzz Classic Algorithm";
    text = "for i in range(1, 6):\n    if i % 15 == 0:\n        print('FizzBuzz')\n    elif i % 3 == 0:\n        print('Fizz')\n    elif i % 5 == 0:\n        print('Buzz')\n    else:\n        print(i)";
    code = text; exp = "1\n2\nFizz\n4\nBuzz";
  } else if (i === 33) {
    lType = "drill"; title = "String Substring Accumulator";
    text = "text = 'PYTHON'\nout = ''\nfor ch in text:\n    out += ch\n    print(out)";
    code = text; exp = "P\nPY\nPYT\nPYTH\nPYTHO\nPYTHON";
  } else if (i === 34) {
    lType = "drill"; title = "Early Exit Validation Drill";
    text = "passwords = ['abc', '12345678', 'short']\nfor pw in passwords:\n    if len(pw) >= 8:\n        print('Valid password found:', pw)\n        break\nelse:\n    print('No valid password')";
    code = text; exp = "Valid password found: 12345678";
  } else if (i === 35) {
    lType = "checkpoint"; title = "Stage 7 Control Flow Checkpoint";
    text = "total = sum(x for x in range(10) if x % 3 == 0)\nprint('Total multiples of 3:', total)\nprint('STAGE 7 CONTROL FLOW MASTERED')";
    code = text; exp = "Total multiples of 3: 18\nSTAGE 7 CONTROL FLOW MASTERED";
  } else if (i === 36) {
    lType = "play"; title = "Night Market: Keyword Wares Dispatch";
    text = "if elif else for in while break continue range zip enumerate",
    concept = "Arcade dispatch game fulfilling orders by typing Python control flow keywords.";
    analogy = "The Night Market Dispatcher";
    code = "if elif else for in while break continue range zip enumerate";
    exp = "";
    extra = { gameId: "night-market", targetKeys: ["i", "f", "e", "l", "s", "o", "r", "w", "h", "b", "a", "k"] };
  }

  s7Lessons.push(makeLesson(7, `7.${i}`, lType, title, text, concept, analogy, code || text, exp, 28, 92, extra));
}
stages.push({
  stageNumber: 7,
  id: "stage-7",
  title: "Stage 7: Branching & Loops",
  targetWpm: 28,
  goal: "28 WPM",
  lessons: s7Lessons
});

// ==========================================
// STAGE 8: DATA STRUCTURES (40 lessons)
// ==========================================
const s8Lessons = [];
for (let i = 1; i <= 40; i++) {
  let lType = "code";
  let title = `Data Structures Step ${i}`;
  let text = `print('Data structure step ${i}')`;
  let concept = "Core Python data structures (lists, tuples, dicts, sets, comprehensions).";
  let analogy = "Structured Data Containers";
  let exp = `Data structure step ${i}`;
  let extra = {};

  if (i === 1) {
    lType = "slide"; title = "Lists: Mutable Ordered Sequences";
    text = "Lists are mutable sequences written with square brackets: [1, 2, 3]. Elements can be changed, added, or removed after creation.";
    concept = "Lists provide dynamic array storage in Python."; analogy = "The Expandable Shelf";
    code = "items = ['keyboard', 'mouse', 'monitor']\nprint(items[0], len(items))"; exp = "keyboard 3";
  } else if (i === 2) {
    lType = "code"; title = "Creating and Indexing Lists";
    text = "languages = ['Python', 'Rust', 'TypeScript']\nprint('First:', languages[0])\nprint('Last:', languages[-1])";
    code = text; exp = "First: Python\nLast: TypeScript";
  } else if (i === 3) {
    lType = "slide"; title = "Appending & Inserting Elements";
    text = ".append(x) adds x to the tail in O(1) time. .insert(i, x) inserts x at specific index i, shifting following elements.";
    concept = "List insertion operations."; analogy = "Adding Items to the Conveyor";
    code = "nums = [1, 2]\nnums.append(3)\nnums.insert(0, 0)\nprint(nums)"; exp = "[0, 1, 2, 3]";
  } else if (i === 4) {
    lType = "code"; title = "Dynamic Inventory Appending";
    text = "cart = []\ncart.append('Switch')\ncart.append('Keycap')\nprint('Cart items:', cart)";
    code = text; exp = "Cart items: ['Switch', 'Keycap']";
  } else if (i === 5) {
    lType = "slide"; title = "Removing Elements: pop & remove";
    text = ".pop() removes and returns the last element. .pop(i) removes at index i. .remove(x) searches and deletes the first match of value x.";
    concept = "List item deletion methods."; analogy = "Popping Items off the Stack";
    code = "stack = ['a', 'b', 'c']\ntop = stack.pop()\nprint('Popped:', top, 'Remaining:', stack)"; exp = "Popped: c Remaining: ['a', 'b']";
  } else if (i === 6) {
    lType = "code"; title = "Stack LIFO Execution";
    text = "tasks = ['read', 'type', 'compile']\nactive = tasks.pop()\nprint('Executing:', active)\nprint('Pending:', tasks)";
    code = text; exp = "Executing: compile\nPending: ['read', 'type']";
  } else if (i === 7) {
    lType = "quiz"; title = "Quiz: pop() with no args removes",
    text = "last"; concept = "Which element does list.pop() remove by default?"; analogy = "Default Pop Recall";
    code = "last"; exp = "Correct! .pop() removes the last element.";
  } else if (i === 8) {
    lType = "slide"; title = "List Slicing & Slice Replacement";
    text = "You can assign directly to a slice to replace multiple items at once: items[1:3] = ['new_a', 'new_b'].";
    concept = "Slice assignment replaces ranges in mutable sequences."; analogy = "Bulk Replacement";
    code = "colors = ['red', 'green', 'blue']\ncolors[1:3] = ['emerald', 'sapphire']\nprint(colors)"; exp = "['red', 'emerald', 'sapphire']";
  } else if (i === 9) {
    lType = "code"; title = "Sub-Array Patching";
    text = "grid_row = [0, 0, 0, 0]\ngrid_row[1:3] = [1, 1]\nprint('Patched row:', grid_row)";
    code = text; exp = "Patched row: [0, 1, 1, 0]";
  } else if (i === 10) {
    lType = "slide"; title = "Tuples: Immutable Ordered Records";
    text = "Tuples are immutable sequences defined with parentheses: (10, 20). Once created, their items cannot be modified, added, or removed.";
    concept = "Tuples provide read-only data integrity and can serve as dictionary keys."; analogy = "The Sealed Capsule";
    code = "point = (1920, 1080)\nprint('Width:', point[0], 'Height:', point[1])"; exp = "Width: 1920 Height: 1080";
  } else if (i === 11) {
    lType = "code"; title = "Tuple Unpacking to Variables";
    text = "dimensions = (1280, 720)\nwidth, height = dimensions\nprint(f'{width}x{height} HD')";
    code = text; exp = "1280x720 HD";
  } else if (i === 12) {
    lType = "explain"; title = "Why Tuples Prevent Bugs",
    text = "Tuples protect critical constants from accidental mutation and are memory-efficient compared to lists.";
    concept = "Immutability ensures data cannot be modified by downstream functions."; analogy = "Data Integrity Lock";
    code = "ORIGIN = (0, 0)\nprint('Origin constant:', ORIGIN)"; exp = "Origin constant: (0, 0)";
  } else if (i === 13) {
    lType = "quiz"; title = "Quiz: Bracket style for Tuples",
    text = "()"; concept = "What bracket style defines a tuple?"; analogy = "Tuple Bracket Check";
    code = "()"; exp = "Correct! Tuples use round parentheses ().";
  } else if (i === 14) {
    lType = "slide"; title = "Tuple Unpacking with Rest (*)";
    text = "Use an asterisk (*) during unpacking to capture remaining elements into a list: first, *rest = [1, 2, 3, 4].";
    concept = "Extended unpacking with the star operator."; analogy = "Head and Tail Collector";
    code = "scores = [99, 85, 82, 70]\ntop, *others = scores\nprint('Top:', top, 'Others:', others)"; exp = "Top: 99 Others: [85, 82, 70]";
  } else if (i === 15) {
    lType = "code"; title = "Head and Tail Splitter";
    text = "items = ['main.py', 'util.py', 'test.py']\nentrypoint, *modules = items\nprint('Entry:', entrypoint, 'Modules:', modules)";
    code = text; exp = "Entry: main.py Modules: ['util.py', 'test.py']";
  } else if (i === 16) {
    lType = "slide"; title = "Dictionaries: Key-Value Hash Maps";
    text = "Dictionaries store key-value pairs inside curly braces: {'user': 'Alex', 'wpm': 80}. Keys must be immutable objects.",
    concept = "Dictionaries provide average O(1) key lookup and retrieval."; analogy = "The Keyed Locker System";
    code = "player = {'name': 'Ninja', 'level': 42}\nprint(player['name'])"; exp = "Ninja";
  } else if (i === 17) {
    lType = "code"; title = "Creating and Accessing Dicts";
    text = "specs = {'cpu': 'M3', 'ram': 16, 'storage': 512}\nprint(f\"{specs['cpu']} with {specs['ram']}GB RAM\")";
    code = text; exp = "M3 with 16GB RAM";
  } else if (i === 18) {
    lType = "slide"; title = "Safe Access with .get()";
    text = "Direct lookup d['missing'] raises KeyError. Use d.get('key', default) to safely return default if the key is missing.";
    concept = "Safe dictionary lookup with default fallbacks."; analogy = "The Safe Drawer";
    code = "profile = {'name': 'Maya'}\nage = profile.get('age', 18)\nprint('Age:', age)"; exp = "Age: 18";
  } else if (i === 19) {
    lType = "code"; title = "Fallback Configuration Reader";
    text = "config = {'theme': 'dark'}\nport = config.get('port', 8080)\nprint('Connected on port:', port)";
    code = text; exp = "Connected on port: 8080";
  } else if (i === 20) {
    lType = "quiz"; title = "Quiz: Missing key with .get()",
    text = "-1"; concept = "What does {'a': 1}.get('b', -1) return?"; analogy = "Default Return Check";
    code = "-1"; exp = "Correct! .get() returns the supplied default -1.";
  } else if (i === 21) {
    lType = "slide"; title = "Iterating Dictionaries (.items())";
    text = "Iterate keys with for k in d, or iterate key-value pairs simultaneously with for key, val in d.items():.";
    concept = "Dictionary view iteration methods (.keys, .values, .items)."; analogy = "Key-Value Reader";
    code = "scores = {'A': 95, 'B': 88}\nfor k, v in scores.items():\n    print(k, '->', v)"; exp = "A -> 95\nB -> 88";
  } else if (i === 22) {
    lType = "code"; title = "Telemetry Key-Value Formatter";
    text = "metrics = {'WPM': 78, 'Accuracy': '99%'}\nfor metric, value in metrics.items():\n    print(f'{metric}: {value}')";
    code = text; exp = "WPM: 78\nAccuracy: 99%";
  } else if (i === 23) {
    lType = "slide"; title = "Sets: Unique Collections";
    text = "Sets store unique, unordered elements inside curly braces: {1, 2, 3}. Duplicate values are automatically discarded.",
    concept = "Sets provide O(1) membership tests and automatic deduplication."; analogy = "The Unique Stamp Album";
    code = "tags = {'python', 'code', 'python'}\nprint(tags)"; exp = "{'code', 'python'}";
  } else if (i === 24) {
    lType = "code"; title = "Deduplicating Lists with set()";
    text = "raw_keys = ['a', 'b', 'a', 'c', 'b']\nunique_keys = sorted(set(raw_keys))\nprint('Unique keys:', unique_keys)";
    code = text; exp = "Unique keys: ['a', 'b', 'c']";
  } else if (i === 25) {
    lType = "slide"; title = "Set Mathematics (| & - ^)";
    text = "Sets support Venn diagram operations: | (union), & (intersection), - (difference), and ^ (symmetric difference).";
    concept = "Mathematical set theory operations in Python."; analogy = "Venn Diagram Math";
    code = "a = {1, 2, 3}\nb = {2, 3, 4}\nprint('Common:', a & b)\nprint('Union:', a | b)"; exp = "Common: {2, 3}\nUnion: {1, 2, 3, 4}";
  } else if (i === 26) {
    lType = "code"; title = "Finding Shared Permissions";
    text = "admin_perms = {'read', 'write', 'delete'}\nuser_perms = {'read', 'comment'}\nshared = admin_perms & user_perms\nprint('Shared:', shared)";
    code = text; exp = "Shared: {'read'}";
  } else if (i === 27) {
    lType = "quiz"; title = "Quiz: Set Intersection Operator",
    text = "&"; concept = "What operator calculates set intersection in Python?"; analogy = "Intersection Operator";
    code = "&"; exp = "Correct! Ampersand & computes set intersection.";
  } else if (i === 28) {
    lType = "slide"; title = "Assignment is Not a Copy",
    text = "Writing b = a does NOT copy a list; it creates a second reference pointing to the very same memory list. Mutating b also changes a.",
    concept = "Reference assignment vs deep object duplication.", analogy = "Two Labels on One Box";
    code = "a = [1, 2]\nb = a\nb.append(3)\nprint('a is now:', a)"; exp = "a is now: [1, 2, 3]";
  } else if (i === 29) {
    lType = "code"; title = "Demonstrating Reference Mutation";
    text = "original = ['a', 'b']\nalias = original\nalias.append('c')\nprint('Original modified:', original)";
    code = text; exp = "Original modified: ['a', 'b', 'c']";
  } else if (i === 30) {
    lType = "explain"; title = "Why b = a Modifies Both",
    text = "Variables hold pointers to memory objects. To create a true independent duplicate, call .copy() or use the copy module.",
    concept = "Memory addresses and pointer aliasing.", analogy = "The Shared Blueprint";
    code = "orig = [1, 2]\nclone = orig.copy()\nclone.append(99)\nprint('Orig:', orig, 'Clone:', clone)"; exp = "Orig: [1, 2] Clone: [1, 2, 99]";
  } else if (i === 31) {
    lType = "slide"; title = "Deep Copy for Nested Structures",
    text = "Shallow copy (.copy()) only copies the outer container. For nested lists or dicts, use copy.deepcopy() to duplicate all layers.",
    concept = "Recursive deep copy vs shallow surface copy.", analogy = "Copying Nested Boxes";
    code = "import copy\nmatrix = [[1], [2]]\ndeep = copy.deepcopy(matrix)\ndeep[0].append(9)\nprint('Original untouched:', matrix[0])"; exp = "Original untouched: [1]";
  } else if (i === 32) {
    lType = "code"; title = "Deep Matrix Duplication";
    text = "import copy\ngrid = [['X', 'O'], ['O', 'X']]\nbackup = copy.deepcopy(grid)\nbackup[0][0] = ' '\nprint('Grid preserved:', grid[0][0])";
    code = text; exp = "Grid preserved: X";
  } else if (i === 33) {
    lType = "slide"; title = "List Comprehensions: [x for x in seq]";
    text = "List comprehensions build new lists declaratively in one line: [x * 2 for x in numbers if x > 0]. Fast, readable, and Pythonic.",
    concept = "List comprehensions replace multi-line append loops with expressive syntax.", analogy = "The Inline Factory Line";
    code = "squares = [x**2 for x in range(1, 5)]\nprint(squares)"; exp = "[1, 4, 9, 16]";
  } else if (i === 34) {
    lType = "code"; title = "Filtered Comprehension Pipeline";
    text = "nums = [1, 2, 3, 4, 5, 6]\neven_squares = [n**2 for n in nums if n % 2 == 0]\nprint('Even squares:', even_squares)";
    code = text; exp = "Even squares: [4, 16, 36]";
  } else if (i === 35) {
    lType = "explain"; title = "Comprehension vs Loop Speed",
    text = "Comprehensions execute at C-speed in CPython because bytecode avoids the overhead of calling .append() repeatedly.",
    concept = "Performance optimization with bytecode list construction.", analogy = "C-Speed Acceleration";
    code = "words = ['code', 'data', 'byte']\nupper = [w.upper() for w in words]\nprint(upper)"; exp = "['CODE', 'DATA', 'BYTE']";
  } else if (i === 36) {
    lType = "slide"; title = "Dictionary Comprehensions {k: v}";
    text = "Build dictionaries dynamically with dict comprehensions: {x: x**2 for x in range(3)} -> {0: 0, 1: 1, 2: 4}.",
    concept = "Dynamic hash map generation.", analogy = "Hash Map Generator";
    code = "names = ['Alice', 'Bob']\nlengths = {name: len(name) for name in names}\nprint(lengths)"; exp = "{'Alice': 5, 'Bob': 3}";
  } else if (i === 37) {
    lType = "code"; title = "Inverting a Dictionary Mapping";
    text = "codes = {'US': 1, 'UK': 44, 'IN': 91}\ninverted = {val: key for key, val in codes.items()}\nprint('Inverted map:', inverted)";
    code = text; exp = "Inverted map: {1: 'US', 44: 'UK', 91: 'IN'}";
  } else if (i === 38) {
    lType = "drill"; title = "Nested Data Structure Aggregator";
    text = "players = [\n    {'name': 'Alex', 'wpm': 82},\n    {'name': 'Maya', 'wpm': 95},\n    {'name': 'Liam', 'wpm': 74}\n]\npro_names = [p['name'] for p in players if p['wpm'] >= 80]\nprint('Pro Typists:', pro_names)";
    code = text; exp = "Pro Typist: ['Alex', 'Maya']";
  } else if (i === 39) {
    lType = "checkpoint"; title = "Stage 8 Data Structures Checkpoint",
    text = "data = {'items': [10, 20, 30], 'tag': 'PRO'}\ntotal = sum(data['items'])\nprint(f\"{data['tag']} TOTAL: {total}\")\nprint('STAGE 8 STRUCTURES MASTERED')";
    code = text; exp = "PRO TOTAL: 60\nSTAGE 8 STRUCTURES MASTERED";
  } else if (i === 40) {
    lType = "play"; title = "Patch Terminal: Data Structure Brackets",
    text = "[] {} () : , . append pop get items keys values copy deepcopy",
    concept = "Arcade typing drill for brackets, commas, colons, and data structure methods.",
    analogy = "Data Structure Patch Matrix",
    code = "[] {} () : , . append pop get items keys values copy deepcopy",
    exp = "",
    extra = { gameId: "patch-terminal", targetKeys: ["[", "]", "{", "}", "(", ")", ":", ",", "."] }
  }

  s8Lessons.push(makeLesson(8, `8.${i}`, lType, title, text, concept, analogy, code || text, exp, 30, 92, extra));
}
stages.push({
  stageNumber: 8,
  id: "stage-8",
  title: "Stage 8: Data Structures",
  targetWpm: 30,
  goal: "30 WPM",
  lessons: s8Lessons
});

// ==========================================
// STAGE 9: FUNCTIONS & ARCHITECTURE (19 lessons)
// ==========================================
const s9Lessons = [
  makeLesson(9, "9.1", "slide", "Defining Functions with def",
    "A function packages reusable logic under a named block. Define functions with the def keyword followed by parentheses and a colon.",
    "Functions encapsulate repeatable operations and prevent code duplication (DRY principle).", "The Tool Blueprint",
    "def greet(name):\n    print(f'Hello, {name}!')\n\ngreet('Developer')", "Hello, Developer!", 26, 90),
  makeLesson(9, "9.1", "code", "Reusable Greeting Machine",
    "def calculate_wpm(chars, minutes):\n    return round((chars / 5) / minutes)\n\nspeed = calculate_wpm(250, 1.0)\nprint('WPM:', speed)",
    "Define a calculation function with parameters and invoke it.", "WPM Engine Function",
    "def calculate_wpm(chars, minutes):\n    return round((chars / 5) / minutes)\n\nspeed = calculate_wpm(250, 1.0)\nprint('WPM:', speed)", "WPM: 50", 28, 92),
  makeLesson(9, "9.2", "slide", "Returning Values vs print()",
    "print() displays output to human eyes on the screen, returning None. return sends computational results back to the caller for further chaining.",
    "Functions produce values via return; side effects output via print.", "Data Pipe vs Screen Ink",
    "def add(a, b):\n    return a + b\n\nresult = add(10, 20)\nprint('Result:', result)", "Result: 30", 26, 90),
  makeLesson(9, "9.2", "code", "Computational Return Pipeline",
    "def square(n):\n    return n * n\n\ndef sum_squares(a, b):\n    return square(a) + square(b)\n\nprint('Sum of squares:', sum_squares(3, 4))",
    "Chain multiple returning functions together in pipelines.", "Nested Function Pipeline",
    "def square(n):\n    return n * n\n\ndef sum_squares(a, b):\n    return square(a) + square(b)\n\nprint('Sum of squares:', sum_squares(3, 4))", "Sum of squares: 25", 28, 92),
  makeLesson(9, "9.2", "quiz", "Quiz: Return value when omitted",
    "None", "What special object does a function return if it lacks a return statement?", "Default Return Value",
    "None", "Correct! Omitted returns evaluate to None.", 20, 95),
  makeLesson(9, "9.3", "slide", "Positional vs Keyword Arguments",
    "Arguments can be passed by position in order total(1, 2) or explicitly by keyword total(x=1, y=2). Keyword calls improve clarity.",
    "Keyword arguments make function invocations self-documenting.", "Labeled Input Ports",
    "def create_user(name, role='member'):\n    return f'{name} ({role})'\n\nprint(create_user('Alex', role='admin'))", "Alex (admin)", 26, 90),
  makeLesson(9, "9.3", "code", "Named Argument Dispatch",
    "def configure_server(host, port, debug=False):\n    return f'{host}:{port} [DEBUG={debug}]'\n\nstatus = configure_server(host='localhost', port=3000, debug=True)\nprint(status)",
    "Call functions with mixed positional and keyword arguments.", "Server Configurator",
    "def configure_server(host, port, debug=False):\n    return f'{host}:{port} [DEBUG={debug}]'\n\nstatus = configure_server(host='localhost', port=3000, debug=True)\nprint(status)", "localhost:3000 [DEBUG=True]", 28, 92),
  makeLesson(9, "9.4", "slide", "Default Parameter Pitfall: Mutable Defaults",
    "Never use mutable objects ([], {}) as default parameters. Python creates default objects only once at definition time, sharing state across calls.",
    "Always use arg=None and initialize fresh containers inside the function body.", "The Mutable Default Trap",
    "def append_item(item, target=None):\n    if target is None:\n        target = []\n    target.append(item)\n    return target", "", 26, 90),
  makeLesson(9, "9.4", "code", "Safe Container Initialization",
    "def append_score(score, scores=None):\n    if scores is None:\n        scores = []\n    scores.append(score)\n    return scores\n\nprint(append_score(95))\nprint(append_score(88))",
    "Implement the None sentinel pattern for clean default list arguments.", "Safe Sentinel Pattern",
    "def append_score(score, scores=None):\n    if scores is None:\n        scores = []\n    scores.append(score)\n    return scores\n\nprint(append_score(95))\nprint(append_score(88))", "[95]\n[88]", 28, 92),
  makeLesson(9, "9.5", "slide", "Variable Arguments: *args and **kwargs",
    "*args collects arbitrary positional arguments into a tuple. **kwargs collects arbitrary keyword arguments into a dictionary.",
    "Variable input collectors allow flexible function APIs.", "The Universal Input Collector",
    "def sum_all(*args):\n    return sum(args)\n\nprint(sum_all(1, 2, 3, 4, 5))", "15", 26, 90),
  makeLesson(9, "9.5", "code", "Logging Dispatcher with **kwargs",
    "def log_event(event_type, **meta):\n    details = ', '.join(f'{k}={v}' for k, v in meta.items())\n    return f'[{event_type}] {details}'\n\nlog = log_event('LOGIN', user='Alex', ip='127.0.0.1')\nprint(log)",
    "Use **kwargs to accept arbitrary metadata flags in logging APIs.", "Structured Event Logger",
    "def log_event(event_type, **meta):\n    details = ', '.join(f'{k}={v}' for k, v in meta.items())\n    return f'[{event_type}] {details}'\n\nlog = log_event('LOGIN', user='Alex', ip='127.0.0.1')\nprint(log)", "[LOGIN] user=Alex, ip=127.0.0.1", 30, 92),
  makeLesson(9, "9.6", "slide", "Variable Scope: LEGB Rule",
    "Python resolves variable names following LEGB order: Local -> Enclosing -> Global -> Built-in. Function locals are destroyed upon return.",
    "Local stack frames isolate variables from leaking into the global namespace.", "The Scope Hierarchy",
    "g_var = 100\ndef show_scope():\n    l_var = 50\n    return g_var + l_var\n\nprint(show_scope())", "150", 26, 90),
  makeLesson(9, "9.6", "code", "Scope Isolation Demonstration",
    "x = 'GLOBAL'\ndef worker():\n    x = 'LOCAL'\n    return x\n\nprint('Worker:', worker())\nprint('Outer:', x)",
    "Demonstrate variable shadowing between local stack frames and global scope.", "Shadowing Inspector",
    "x = 'GLOBAL'\ndef worker():\n    x = 'LOCAL'\n    return x\n\nprint('Worker:', worker())\nprint('Outer:', x)", "Worker: LOCAL\nOuter: GLOBAL", 28, 92),
  makeLesson(9, "9.7", "slide", "Lambda Functions & Type Hints",
    "lambda creates concise inline anonymous functions: square = lambda x: x**2. Type hints def greet(name: str) -> str: document expected types.",
    "Anonymous lambda functions and modern static type annotations (PEP 484).", "Inline Lambdas & Type Signatures",
    "double = lambda x: x * 2\nprint(double(21))", "42", 26, 90),
  makeLesson(9, "9.7", "code", "Typed Transformer Pipeline",
    "def format_metric(label: str, value: float) -> str:\n    return f'{label.upper()}: {value:.1f}'\n\nprint(format_metric('Accuracy', 98.66))",
    "Define typed function signatures with return annotations.", "Typed Metric Transformer",
    "def format_metric(label: str, value: float) -> str:\n    return f'{label.upper()}: {value:.1f}'\n\nprint(format_metric('Accuracy', 98.66))", "ACCURACY: 98.7", 30, 92),
  makeLesson(9, "9.7", "quiz", "Quiz: Anonymous Function Keyword",
    "lambda", "What keyword defines an anonymous one-line function in Python?", "Lambda Keyword Check",
    "lambda", "Correct! lambda defines anonymous functions.", 20, 95),
  makeLesson(9, "9.8", "drill", "The 4 Functional Archetypes (Orchestrator)",
    "# Orchestrator coordinates Validation -> Transform -> Action\ndef validate(score: int) -> bool:\n    return 0 <= score <= 100\n\ndef transform(score: int) -> str:\n    return f'PRO-{score:03d}'\n\ndef publish(badge: str) -> None:\n    print(f'PUBLISHED BADGE: {badge}')\n\nraw_score = 98\nif validate(raw_score):\n    publish(transform(raw_score))",
    "Build a production modular architecture separating validation, business transformation, and action execution.", "The 4 Functional Archetypes",
    "# Orchestrator coordinates Validation -> Transform -> Action\ndef validate(score: int) -> bool:\n    return 0 <= score <= 100\n\ndef transform(score: int) -> str:\n    return f'PRO-{score:03d}'\n\ndef publish(badge: str) -> None:\n    print(f'PUBLISHED BADGE: {badge}')\n\nraw_score = 98\nif validate(raw_score):\n    publish(transform(raw_score))", "PUBLISHED BADGE: PRO-098", 32, 94),
  makeLesson(9, "9.8", "checkpoint", "Stage 9 Graduation Checkpoint",
    "# python graduation master\ndef compile_report(student: str, wpm: int, acc: float) -> str:\n    return f'GRADUATE: {student} | {wpm} WPM | {acc}% ACC'\n\nprint(compile_report('Developer', 85, 99.2))\nprint('ALL 9 PYTHON STAGES MASTERED!')",
    "Stage 9 graduation milestone proving full Python mastery across all 197 lessons.", "The Graduation Arch",
    "# python graduation master\ndef compile_report(student: str, wpm: int, acc: float) -> str:\n    return f'GRADUATE: {student} | {wpm} WPM | {acc}% ACC'\n\nprint(compile_report('Developer', 85, 99.2))\nprint('ALL 9 PYTHON STAGES MASTERED!')", "GRADUATE: Developer | 85 WPM | 99.2% ACC\nALL 9 PYTHON STAGES MASTERED!", 32, 95),
  makeLesson(9, "9.9", "play", "Pit Lane Graduation Grand Prix",
    "def return args kwargs lambda None True False int str float len range zip enumerate class import from as with try except finally",
    "The ultimate typing speedway graduation race across all core Python keywords.", "Graduation Grand Prix",
    "def return args kwargs lambda None True False int str float len range zip enumerate class import from as with try except finally", "", 32, 92,
    { gameId: "pit-lane", targetKeys: ["d", "e", "f", "r", "t", "u", "n", "l", "a", "m", "b", "c", "s", "i", "p", "o"] })
];
stages.push({
  stageNumber: 9,
  id: "stage-9",
  title: "Stage 9: Functions & Architecture",
  targetWpm: 32,
  goal: "32 WPM",
  lessons: s9Lessons
});

const totalLessons = stages.reduce((acc, s) => acc + s.lessons.length, 0);

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
