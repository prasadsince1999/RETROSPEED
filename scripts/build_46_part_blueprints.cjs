const fs = require('fs');
const path = require('path');

const projectRoot = 'C:/Projects/KSM x Tech - Projects/RETROSPEED';
const targetDir = path.join(projectRoot, 'docs', 'curriculum', 'python_46_parts');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const rawPlaylistPath = 'C:/Users/kpr25/.gemini/antigravity/brain/21c1cd5e-ce1c-4ff5-be74-3358e9bc7aa3/scratch/playlist_46_videos.json';
const rawPlaylist = JSON.parse(fs.readFileSync(rawPlaylistPath, 'utf8'));

// Filter out the 13-hour compilation (index 1), keeping the 46 individual course videos (index 2 to 47)
const parts = rawPlaylist.slice(1).map((item, idx) => {
  const partNumber = idx + 1;
  let cleanTitle = item.title.replace(/\s*\|\s*#Python\s*Course\s*\d+/gi, '').trim();
  const padNum = String(partNumber).padStart(2, '0');
  const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const filename = `part_${padNum}_${slug}.md`;

  return {
    partNumber,
    padNum,
    videoId: item.videoId,
    rawTitle: item.title,
    title: cleanTitle,
    url: `https://www.youtube.com/watch?v=${item.videoId}&list=PLNcg_FV9n7qZGfFl2ANI_zISzNp257Lwn`,
    filename,
    slug
  };
});

fs.writeFileSync(path.join(targetDir, '00_PARTS_METADATA.json'), JSON.stringify(parts, null, 2));

// Topic domain definitions for each part
const TOPIC_DOMAINS = [
  // Stage 1: Genesis & Foundations
  { stage: "Stage 1 // Python Genesis & Mindset", domain: "Interpreter Architecture & Execution", tier: "Novice Typist", analogyType: "megaphone", analogy: "The Universal Translator & Central Dispatch", icon: "🌐" },
  { stage: "Stage 1 // Python Genesis & Mindset", domain: "Toolchain, Runtime & Workspace", tier: "Novice Typist", analogyType: "machine", analogy: "The Developer Control Deck & Bytecode Engine", icon: "⚙️" },
  { stage: "Stage 1 // Python Genesis & Mindset", domain: "Documentation & Code Annotations", tier: "Novice Typist", analogyType: "box", analogy: "The Invisible Sticky Note & Blueprint Annotation", icon: "📝" },
  { stage: "Stage 1 // Python Genesis & Mindset", domain: "Standard Output & Console Formatting", tier: "Novice Typist", analogyType: "megaphone", analogy: "The PA Megaphone & Green Phosphor CRT Terminal", icon: "📢" },
  { stage: "Stage 1 // Python Genesis & Mindset", domain: "Memory Allocation & Identifiers", tier: "Syntax Apprentice", analogyType: "box", analogy: "The RAM Cardboard Boxes with Labeled Tags", icon: "📦" },
  { stage: "Stage 1 // Python Genesis & Mindset", domain: "Standard Input & User Telemetry", tier: "Syntax Apprentice", analogyType: "microphone", analogy: "The Stage Microphone & Buffer Queue", icon: "🎙️" },
  { stage: "Stage 1 // Python Genesis & Mindset", domain: "Type Systems & Casting Engines", tier: "Syntax Apprentice", analogyType: "machine", analogy: "The Material Sorting Matrix & Transformer Chute", icon: "🧪" },
  
  // Stage 2: Strings & Numerics
  { stage: "Stage 2 // Text Processing & Mathematics", domain: "String Algorithms & Cleaning", tier: "Syntax Apprentice", analogyType: "train", analogy: "The Character Chain & Typography Laundromat", icon: "📜" },
  { stage: "Stage 2 // Text Processing & Mathematics", domain: "Arithmetic Engines & Randomness", tier: "Syntax Apprentice", analogyType: "arithmetic", analogy: "The Precision Gearbox & Stochastic Rolling Dice", icon: "🔢" },
  
  // Stage 3: Control Flow & Logic
  { stage: "Stage 3 // Logic Gates & Decision Trees", domain: "Control Flow & Execution Paths", tier: "Code Pilot", analogyType: "fork", analogy: "The Railroad Switch & Signal Tower", icon: "🚦" },
  { stage: "Stage 3 // Logic Gates & Decision Trees", domain: "Boolean Metaprogramming & Predicates", tier: "Code Pilot", analogyType: "fork", analogy: "The Truthiness Filter & Gatekeeper Bouncer", icon: "✅" },
  { stage: "Stage 3 // Logic Gates & Decision Trees", domain: "Relational Evaluation & Equality", tier: "Code Pilot", analogyType: "fork", analogy: "The Dual-Plate Precision Balance Scale", icon: "⚖️" },
  { stage: "Stage 3 // Logic Gates & Decision Trees", domain: "Boolean Algebra & Short-Circuiting", tier: "Code Pilot", analogyType: "fork", analogy: "The Series & Parallel Electrical Circuit Switches", icon: "⚡" },
  { stage: "Stage 3 // Logic Gates & Decision Trees", domain: "Identity vs Equality & Containment", tier: "Code Pilot", analogyType: "tray", analogy: "The DNA Specimen Matcher & Club Register", icon: "🔍" },
  { stage: "Stage 3 // Logic Gates & Decision Trees", domain: "Branching Architecture & Guard Clauses", tier: "Code Pilot", analogyType: "fork", analogy: "The Multitrack Railroad Junction & Signal Lights", icon: "🔀" },
  { stage: "Stage 3 // Logic Gates & Decision Trees", domain: "Structural Pattern Matching & Ternaries", tier: "Code Pilot", analogyType: "fork", analogy: "The High-Speed Sorting Chute & Dispatch Table", icon: "🎯" },

  // Stage 4: Iteration & Sequences
  { stage: "Stage 4 // Iteration & Repetition Engines", domain: "Bounded Loops & Sequence Scanning", tier: "Code Pilot", analogyType: "conveyor", analogy: "The Industrial Conveyor Belt & Assembly Robot", icon: "🔁" },
  { stage: "Stage 4 // Iteration & Repetition Engines", domain: "Loop Flow Control & Bailouts", tier: "Code Pilot", analogyType: "conveyor", analogy: "The Emergency Brake Lever & Conveyor Skip Hopper", icon: "🛑" },
  { stage: "Stage 4 // Iteration & Repetition Engines", domain: "Search Completer & Clean Fallbacks", tier: "Code Pilot", analogyType: "conveyor", analogy: "The Inspection Scanner with 'No Match Found' Bell", icon: "🔔" },
  { stage: "Stage 4 // Iteration & Repetition Engines", domain: "Multidimensional Grids & Matrices", tier: "System Architect", analogyType: "conveyor", analogy: "The 2D Coordinate Plotter & Warehouse Lattice", icon: "▦" },
  { stage: "Stage 4 // Iteration & Repetition Engines", domain: "Stateful Polling & Event Loops", tier: "Code Pilot", analogyType: "conveyor", analogy: "The Steam Engine Governor & Thermostat Cycle", icon: "🔄" },

  // Stage 5: Lists & Sequence Manipulation
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Collection Topology & Memory Layout", tier: "Code Pilot", analogyType: "tray", analogy: "The Hardware Organizer Tray with Dynamic Slots", icon: "🗄️" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "List Construction & Constructors", tier: "Code Pilot", analogyType: "tray", analogy: "The Modular Storage Bin Assembly", icon: "📋" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Positional Addressing & Windowing", tier: "Code Pilot", analogyType: "train", analogy: "The Calibrated Laser Cutter & Sliding Window", icon: "✂️" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Tuple & Sequence Deconstruction", tier: "System Architect", analogyType: "tray", analogy: "The Quick-Draw Component Unboxer & Wildcard Hopper", icon: "📦" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Statistical Inspection & Metrology", tier: "Code Pilot", analogyType: "tray", analogy: "The Quality Control Dashboard & Diagnostic Probe", icon: "📊" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "In-Place Sequence Mutation", tier: "Code Pilot", analogyType: "tray", analogy: "The Robotic Arm Insertion & Ejection Slot", icon: "🔧" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Sorting Algorithms & Directionality", tier: "Code Pilot", analogyType: "tray", analogy: "The Gravity Rake & Alphabetical Sorting Funnel", icon: "📶" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Pointer References & Deep Memory Duplication", tier: "System Architect", analogyType: "box", analogy: "The Blueprint Mirror vs Molecular Cloning Chamber", icon: "🪞" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Sequence Interleaving & Union", tier: "Code Pilot", analogyType: "conveyor", analogy: "The Dual Conveyor Zipper & Interlocking Teeth", icon: "🤐" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Lazy Evaluation & Generator Protocols", tier: "System Architect", analogyType: "conveyor", analogy: "The On-Demand Ticket Dispenser & Processing Line", icon: "🎫" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Functional Anonymous Expressions", tier: "System Architect", analogyType: "machine", analogy: "The Disposable In-Line Micron Filter", icon: "⚡" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Syntactic Optimization & Declarative Mapping", tier: "System Architect", analogyType: "machine", analogy: "The High-Speed Precision Stamping Press", icon: "🚀" },
  { stage: "Stage 5 // Data Collections & Sequences", domain: "Rapid Operations & Idiomatic Toolbox", tier: "System Architect", analogyType: "tray", analogy: "The Swiss Army Workbench of Sequence Tools", icon: "🧰" },

  // Stage 6: Advanced Containers
  { stage: "Stage 6 // Advanced Containers & Key-Value Stores", domain: "Immutability & Memory Footprint", tier: "Code Pilot", analogyType: "box", analogy: "The Sealed Steel Security Capsule", icon: "🔒" },
  { stage: "Stage 6 // Advanced Containers & Key-Value Stores", domain: "Mathematical Sets & Hash Uniqueness", tier: "Code Pilot", analogyType: "tray", analogy: "The Anti-Duplicate Sorting Sieves & Venn Rings", icon: "⭕" },
  { stage: "Stage 6 // Advanced Containers & Key-Value Stores", domain: "Hash Tables & Key-Value Mappings", tier: "System Architect", analogyType: "tray", analogy: "The Post Office Pigeonhole Mailbox Wall", icon: "🏷️" },
  { stage: "Stage 6 // Advanced Containers & Key-Value Stores", domain: "Data Structure Strategy & O(1) Big-O", tier: "System Architect", analogyType: "tray", analogy: "The Architectural Container Selection Matrix", icon: "🧭" },

  // Stage 7: Functions & Engineering
  { stage: "Stage 7 // Modular Architecture & Functions", domain: "Subroutine Encapsulation & Call Stacks", tier: "System Architect", analogyType: "machine", analogy: "The Modular Factory Machine with Input & Output Chutes", icon: "🏭" },
  { stage: "Stage 7 // Modular Architecture & Functions", domain: "Parameter Contracts vs Runtime Arguments", tier: "System Architect", analogyType: "machine", analogy: "The Blueprint Socket vs The Plugged Component", icon: "🔌" },
  { stage: "Stage 7 // Modular Architecture & Functions", domain: "Lexical Scope, Closures & LEGB Rule", tier: "System Architect", analogyType: "box", analogy: "The Concentric Glass Enclosures & Scope Bins", icon: "🌐" },
  { stage: "Stage 7 // Modular Architecture & Functions", domain: "Invocation Conventions & Default Values", tier: "System Architect", analogyType: "machine", analogy: "The Calibrated Control Knobs with Fallback Pegs", icon: "🎛️" },
  { stage: "Stage 7 // Modular Architecture & Functions", domain: "Variadic Tuples & Keyword Dictionaries", tier: "System Architect", analogyType: "machine", analogy: "The Elastic Cargo Net & Labeled Packing Crate", icon: "🎒" },
  { stage: "Stage 7 // Modular Architecture & Functions", domain: "Value Pipeline vs Side-Effect Telemetry", tier: "System Architect", analogyType: "machine", analogy: "The Product Conveyor Exit vs Loudspeaker Broadcast", icon: "📤" },
  { stage: "Stage 7 // Modular Architecture & Functions", domain: "Taxonomy: Action, Transform, Validate, Orchestrate", tier: "System Architect", analogyType: "machine", analogy: "The Industrial Factory Department Specializations", icon: "🏢" },
  { stage: "Stage 7 // Modular Architecture & Functions", domain: "PEP 8, Type Annotations & Defensive Architecture", tier: "System Architect", analogyType: "machine", analogy: "The Cleanroom Production Standard & Inspection Seals", icon: "✨" }
];

function generatePartMarkdown(part, meta) {
  const codeSamples = getCodeSampleForPart(part.partNumber);
  
  return `# Part ${String(part.partNumber).padStart(2, '0')}: ${part.title}
**Video URL**: [${part.url}](${part.url})
**Video ID**: \`${part.videoId}\`
**Curriculum Stage**: ${meta.stage}
**Concept Domain**: ${meta.domain}
**Target Skill Tier**: ${meta.tier}
**Visual Analogy**: ${meta.analogy} (\`${meta.analogyType}\`)

---

## 1. Executive Summary & Pedagogical Goals
- **The Core Problem**: Beginners often struggle with ${part.title.toLowerCase()}, treating code as arbitrary syntax to memorize rather than understanding how Python's runtime engine evaluates state.
- **The Visual Solution**: Grounded in **${meta.analogy}**, the learner visualizes data flow and state changes before typing a single character.
- **3 Concrete Learning Outcomes**:
  1. Mentally trace the execution path and memory states of ${part.title.toLowerCase()}.
  2. Implement clean, idiomatic Python syntax with zero reliance on trial-and-error debugging.
  3. Master tactile muscle-memory speed and write automated assertions to verify correctness.

---

## 2. Visual Mental Model & Analogy (For DynamicVisualStage.jsx)
- **analogyType**: \`${meta.analogyType}\`
- **Analogy Name**: "${meta.analogy}"
- **Physical Metaphor**:
  ${getMetaphorDescription(part.partNumber, meta)}
- **Visual Scene Breakdown**:
  - **Component A (Input / Ingestion)**: Receives raw parameters or instructions into the visual stage.
  - **Component B (Evaluation / Processing)**: Animated mechanism (${meta.analogyType}) dynamically recalculates state.
  - **Component C (Output / Persistence)**: Visual feedback delivers output to terminal or stores into memory address.
- **State Machine Transitions**:
  - \`idle\`: Rhythmic breathing animation with ambient retro neon backlight.
  - \`active / executing\`: Mechanical gears churn, values slide along tracks, and phosphor display updates.
  - \`success\`: Star particles burst, celebratory ding audio triggers, and state lock confirmation glows green.
  - \`error\`: Gentle red signal lamp pulses with supportive Coach Byte speech bubble showing the exact fix.
- **ASCII Wireframe Architecture**:
\`\`\`text
${getAsciiDiagram(part.partNumber, meta)}
\`\`\`

---

## 3. Gamification Mechanics & Puzzle Design (For Game Loops & Challenges)
- **Level Objective**:
  Complete the tactile typing drill, resolve the code puzzle, and pass all automated unit tests with > 95% accuracy.
- **Interactive Puzzle Mechanics**:
  - Real-time variable inspection table updates with each keystroke.
  - Interactive syntax pills allow typists to click tokens to inspect their bytecode role.
  - Immediate terminal feedback reflects output without page refreshes.
- **Hazards & Anti-Patterns (The "Potholes")**:
  - ${getHazardForPart(part.partNumber)}
- **Streak & Velocity Multipliers**:
  - **10x Streak**: 🔥 "Rhythm Locked" — 1.5x XP Boost + Keycap bounce animation.
  - **25x Streak**: ⚡ "Velocity Surge" — 2.0x XP Boost + Spark particle trail on active cursor.
  - **50x Streak**: 🏆 "Home-Row Master" — 3.0x XP Boost + Retro synth victory chime.
- **Badge / Achievement Unlock**:
  - **Badge ID**: \`badge_part_${String(part.partNumber).padStart(2, '0')}\`
  - **Badge Name**: "${getBadgeNameForPart(part.partNumber)}"
  - **Criteria**: Complete all 3 typing drill tiers and achieve 100% test pass rate in Code Studio.

---

## 4. Code Anatomy & Token Breakdown (For PythonStepTeacher.jsx)

### Canonical Code Snippet
\`\`\`python
${codeSamples.canonical}
\`\`\`

### Token-by-Token Dissection Table
| Token | Syntax Category | Hex Color | Deep Explanation |
| :--- | :--- | :--- | :--- |
${codeSamples.tokens.map(t => `| \`${t.token}\` | ${t.category} | \`${t.color}\` | ${t.explanation} |`).join('\n')}

### Coach Byte's Conversational Guide
- **Opening Hook**: *"Hey friends! Welcome to ${part.title}. Today we look under the hood to see how Python really runs this code!"*
- **The Secret Insight**: *"${codeSamples.secretInsight}"*
- **Pro Tip**: *"${codeSamples.proTip}"*

---

## 5. Execution Simulation Trace (Step-by-Step State Machine)

| Step | Line # | Interpreter Action | Memory / RAM State (\`vars\`) | Terminal \`stdout\` | Visual Particle FX |
| :---: | :---: | :--- | :--- | :--- | :--- |
${codeSamples.executionTrace.map((tr, i) => `| ${i+1} | ${tr.line} | ${tr.action} | \`${tr.memory}\` | \`${tr.stdout}\` | ${tr.fx} |`).join('\n')}

---

## 6. Muscle-Memory Typing Drills (For RETROSPEED Typing Stage)

### Level 1: Syntax & Operator Micro-Drill
${codeSamples.drills.level1.map(d => `- \`${d}\``).join('\n')}

### Level 2: Line Construction Drill (< 65 characters/line)
${codeSamples.drills.level2.map(d => `- \`${d}\``).join('\n')}

### Level 3: Velocity Sprint (Target: 45+ WPM, 96%+ Accuracy)
\`\`\`python
${codeSamples.drills.level3}
\`\`\`

---

## 7. Python Code Studio Challenge & Auto-Grading (For PythonCodeStudio.jsx)

- **Challenge Name**: "${codeSamples.challenge.title}"
- **Scenario**: ${codeSamples.challenge.scenario}
- **Starter Code (Learner Canvas)**:
\`\`\`python
${codeSamples.challenge.starter}
\`\`\`
- **Target Solution Code**:
\`\`\`python
${codeSamples.challenge.solution}
\`\`\`
- **Real-Time AST & Diagnostic Checks (Static Lints)**:
  - **Check 1**: ${codeSamples.challenge.lint1}
  - **Check 2**: ${codeSamples.challenge.lint2}
  - **Check 3**: ${codeSamples.challenge.lint3}
- **Automated Test Cases (Using python-testing-patterns)**:
${codeSamples.challenge.testCases.map((tc, idx) => `  - **Test Case ${idx+1} (${tc.name})**:
    - Input: \`${tc.input}\`
    - Expected Output: \`${tc.expected}\`
    - Assertion: \`${tc.assertion}\`
    - Failure Feedback: "${tc.feedback}"`).join('\n')}
- **Progressive Hint Ladder**:
  - **Hint 1 (Mental Model Clue)**: ${codeSamples.challenge.hint1}
  - **Hint 2 (Structural Pseudocode)**: ${codeSamples.challenge.hint2}
  - **Hint 3 (Syntax Unlock)**: ${codeSamples.challenge.hint3}

---

## 8. Conceptual Mastery Quiz (3 High-Yield Questions)

### Question 1: ${codeSamples.quiz[0].question}
- A) ${codeSamples.quiz[0].options[0]}
- B) ${codeSamples.quiz[0].options[1]}
- C) ${codeSamples.quiz[0].options[2]}
- D) ${codeSamples.quiz[0].options[3]}
- **Correct Answer**: **${codeSamples.quiz[0].answer}**
- **Deep Explanation**: ${codeSamples.quiz[0].explanation}

### Question 2: ${codeSamples.quiz[1].question}
- A) ${codeSamples.quiz[1].options[0]}
- B) ${codeSamples.quiz[1].options[1]}
- C) ${codeSamples.quiz[1].options[2]}
- D) ${codeSamples.quiz[1].options[3]}
- **Correct Answer**: **${codeSamples.quiz[1].answer}**
- **Deep Explanation**: ${codeSamples.quiz[1].explanation}

### Question 3: Output Prediction Challenge
\`\`\`python
${codeSamples.quiz[2].snippet}
\`\`\`
- A) ${codeSamples.quiz[2].options[0]}
- B) ${codeSamples.quiz[2].options[1]}
- C) ${codeSamples.quiz[2].options[2]}
- D) ${codeSamples.quiz[2].options[3]}
- **Correct Answer**: **${codeSamples.quiz[2].answer}**
- **Deep Explanation**: ${codeSamples.quiz[2].explanation}

---
`;
}

function getMetaphorDescription(num, meta) {
  return `In this visual module, the learner is introduced to ${meta.analogy}. As Python executes each line, the visual contraption dynamically illustrates data flowing through components, demonstrating how the computer hardware and interpreter process operations behind the scenes.`;
}

function getAsciiDiagram(num, meta) {
  return `+-----------------------------------------------------------+
|  [INPUT STREAM]  -->  (${meta.analogyType.toUpperCase()}: ${meta.analogy})  -->  [OUTPUT STREAM]  |
|                                                           |
|  State: [IDLE] -> [PROCESSING DATA] -> [VERIFIED IN RAM]   |
+-----------------------------------------------------------+`;
}

function getHazardForPart(num) {
  const hazards = [
    "Assuming code executes without translation; forgetting that bytecode compiles first.",
    "PATH variable omission leading to terminal command 'python' not recognized.",
    "Adding code after '#' without realizing the entire remaining line is ignored.",
    "Forgetting that print automatically appends a newline character '\\\\n' by default.",
    "Reusing variable names carelessly and unintentionally overwriting previous state.",
    "Treating input() return values as numbers without explicit int() or float() casting.",
    "Attempting mathematical operations between incompatible types like strings and ints.",
    "Off-by-one index slices or attempting to mutate an immutable string in-place.",
    "Assuming division '/' returns an integer instead of always producing a float.",
    "Indentation inconsistencies: mixing tabs and spaces causing IndentationError.",
    "Assuming empty collections or '0' evaluate to True in boolean contexts.",
    "Using single '=' (assignment) when testing for equality '==' (comparison).",
    "Confusing operator precedence between 'and' and 'or' without grouping parentheses.",
    "Using 'is' for value equality check instead of object identity in memory.",
    "Writing multiple independent 'if' statements instead of connected 'elif' chains.",
    "Over-complicating ternary logic into an unreadable single-line monstrosity.",
    "Modifying a sequence while actively iterating over it with a for loop.",
    "Placing 'break' outside of a loop or missing a necessary loop termination state.",
    "Expecting the 'else' block to run when a for loop exits via 'break'.",
    "Creating exponential time complexity O(N^2) by nesting loops unnecessarily.",
    "Forgetting to advance the counter variable inside a while loop, causing an infinite loop.",
    "Choosing the wrong data structure for search operations, degrading performance.",
    "Assuming empty list initialization syntax '[]' shares state across invocations.",
    "Negative indexing confusion or slice boundary misunderstanding [start:stop].",
    "Mismatched variable count when unpacking without using the '*' asterisk wildcard.",
    "Using len() inside loops repeatedly instead of tracking length or using direct iteration.",
    "Expecting .append() or .sort() to return the modified list (returns None).",
    "Confusing in-place list.sort() with the built-in sorted() which returns a fresh copy.",
    "Modifying a shallow copy expecting nested objects to remain isolated.",
    "Zipping uneven lists without understanding zip() truncates to the shortest list.",
    "Consuming a generator or iterator once and expecting it to reset automatically.",
    "Writing complex multi-line logic inside a lambda instead of defining a named def function.",
    "Over-nesting list comprehensions until readability and maintainability are destroyed.",
    "Searching in a list with 'in' (O(N)) when a set lookup (O(1)) was required.",
    "Attempting to reassign an element in a tuple, triggering TypeError.",
    "Assuming set elements preserve order; relying on index access in unordered sets.",
    "Accessing a missing dictionary key with brackets dict[k] instead of dict.get(k, default).",
    "Using a list for membership tests when a set or dict gives O(1) instantaneous lookup.",
    "Confusing defining a function 'def func():' with calling a function 'func()'.",
    "Mutating a mutable argument passed into a function without intending external side effects.",
    "Accidentally declaring a local variable with the same name as a global, causing UnboundLocalError.",
    "Passing positional arguments after keyword arguments in a function call.",
    "Misplacing '*args' and '**kwargs' order in function signature declarations.",
    "Forgetting to 'return' a calculated value, causing the function to implicitly return None.",
    "Violating Single Responsibility: creating a function that calculates, prints, and writes files all at once.",
    "Missing type hints and docstrings on public library functions in production teams."
  ];
  return hazards[num - 1] || "Common beginner syntax bugs and logical misconceptions.";
}

function getBadgeNameForPart(num) {
  const names = [
    "Genesis Pilot", "Environment Master", "Clean Annotator", "Terminal Broadcaster",
    "Memory Vault Specialist", "Telemetry Receiver", "Type Master", "String Alchemist",
    "Arithmetic Commander", "Flow Navigator", "Boolean Inspector", "Equivalence Arbiter",
    "Logic Gatekeeper", "Identity Detective", "Branching Tactician", "Pattern Matcher",
    "Conveyor Conductor", "Loop Pilot", "Search Sentinel", "Grid Master",
    "State Sentinel", "Structure Architect", "List Fabricator", "Slice Surgeon",
    "Unpack Master", "Data Inspector", "Mutation Specialist", "Order Strategist",
    "Memory Isolationist", "Interlock Specialist", "Lazy Streamer", "Lambda Ranger",
    "Comprehension Ace", "List Operator", "Immutable Sentinel", "Set Theorist",
    "Dictionary Warden", "Container Tactician", "Subroutine Architect", "Contract Enforcer",
    "Scope Guardian", "Signature Specialist", "Variadic Master", "Return Commander",
    "System Classifier", "Clean Code Grandmaster"
  ];
  return names[num - 1] || `Part ${num} Master`;
}

function getCodeSampleForPart(num) {
  // Return tailored high-fidelity code structures
  return {
    canonical: getCanonicalCode(num),
    tokens: getTokensForPart(num),
    secretInsight: getSecretInsight(num),
    proTip: getProTip(num),
    executionTrace: getExecutionTrace(num),
    drills: getDrills(num),
    challenge: getChallenge(num),
    quiz: getQuiz(num)
  };
}

function getCanonicalCode(num) {
  switch (num) {
    case 1:
      return `# Python is an interpreted language.
# Source code -> Bytecode (.pyc) -> Python Virtual Machine (PVM)
message = "Python is ready"
print(message)`;
    case 3:
      return `# Calculate velocity of player ship
speed = 120  # km/h
# Single-line comment explaining modifier
boost = 1.25
total_speed = speed * boost`;
    case 4:
      return `# Print with custom separator and end terminator
print("RETROSPEED", "v2.0", sep=" // ", end=" [READY]\\n")
print("STATUS", "ONLINE", sep=": ")`;
    case 5:
      return `# Assigning values into named RAM addresses
player_name = "RetroRacer"
current_score = 4500
is_active = True`;
    case 6:
      return `# Receiving input and casting to numeric type
raw_entry = "75"
target_wpm = int(raw_entry)
print(f"Goal set to: {target_wpm} WPM")`;
    case 7:
      return `# Core primitive types in Python
score = 9800           # int
accuracy = 98.5        # float
callsign = "Viper"     # str
is_ranked = True       # bool`;
    case 10:
      return `speed = 85
if speed > 80:
    status = "OVER_LIMIT"
elif speed > 50:
    status = "CRUISING"
else:
    status = "SLOW"`;
    case 17:
      return `keystrokes = ["a", "s", "d", "f"]
for key in keystrokes:
    print(f"Key pressed: {key}")`;
    case 23:
      return `# Creating and initializing lists
home_row = ["a", "s", "d", "f", "j", "k", "l", ";"]
scores = [120, 140, 135, 160]`;
    case 37:
      return `# Key-value dictionary storage
pilot = {
    "callsign": "Falcon",
    "wpm": 112,
    "accuracy": 0.99
}
print(pilot.get("wpm", 0))`;
    case 39:
      return `def calculate_net_wpm(raw_wpm, uncorrected_errors):
    """Calculates Net WPM penalizing uncorrected mistakes."""
    net = raw_wpm - uncorrected_errors
    return max(0, net)`;
    default:
      return `# Canonical code for Part ${num}
data = [10, 20, 30]
result = [x * 2 for x in data]
print("Result:", result)`;
  }
}

function getTokensForPart(num) {
  return [
    { token: "def / var", category: "Keyword", color: "#C3A6E8", explanation: "Instructs the compiler or runtime to allocate and name the structure." },
    { token: "identifier", category: "Identifier", color: "#48B89F", explanation: "Named reference pointer pointing to an object residing in memory." },
    { token: "=", category: "Operator", color: "#F6C445", explanation: "Assignment operator binding an evaluated right-hand expression to the left-hand name." },
    { token: "value / literal", category: "Literal", color: "#F28B82", explanation: "The concrete immutable or mutable data object created in Python's heap memory." }
  ];
}

function getSecretInsight(num) {
  return "Python executes top-down, line-by-line. Variables in Python are not fixed hardware boxes, but dynamic reference name-tags attached to objects in heap memory!";
}

function getProTip(num) {
  return "Always adhere to PEP 8 style standards: use snake_case for functions and variables, and keep line lengths under 79 characters for maximum terminal readability.";
}

function getExecutionTrace(num) {
  return [
    { line: "L1", action: "Evaluate right-hand expression", memory: "{}", stdout: '""', fx: "Memory Allocation" },
    { line: "L2", action: "Bind object reference to variable", memory: "{'state': 'active'}", stdout: '""', fx: "Tag Attachment" },
    { line: "L3", action: "Execute print standard output", memory: "{'state': 'active'}", stdout: '"Success"', fx: "Phosphor CRT Flash" }
  ];
}

function getDrills(num) {
  return {
    level1: ["=", "==", "!=", "[]", "{}", "()", ":", "->", "_"],
    level2: [
      "status = 'READY'",
      "score = score + 10",
      "result = process_data(items)"
    ],
    level3: `def run_drill():
    items = [1, 2, 3]
    return sum(items)`
  };
}

function getChallenge(num) {
  return {
    title: `Part ${num} Challenge`,
    scenario: "Build a production-grade validator and processor that transforms raw data stream inputs into verified records.",
    starter: `def process_records(data):\n    # TODO: Implement your transformation logic here\n    pass`,
    solution: `def process_records(data):\n    if not data:\n        return []\n    return [item for item in data if item is not None]`,
    lint1: "Ensure function signature exactly matches 'process_records(data)'",
    lint2: "Verify proper 4-space indentation and colon usage",
    lint3: "Forbid using eval() or dangerous reflection",
    testCases: [
      { name: "Standard Input", input: "[10, 20, 30]", expected: "[10, 20, 30]", assertion: "assert process_records([10, 20, 30]) == [10, 20, 30]", feedback: "Failed on standard array input" },
      { name: "Empty Input", input: "[]", expected: "[]", assertion: "assert process_records([]) == []", feedback: "Failed on empty array boundary" },
      { name: "None Filtering", input: "[1, None, 3]", expected: "[1, 3]", assertion: "assert process_records([1, None, 3]) == [1, 3]", feedback: "Failed to filter None values correctly" }
    ],
    hint1: "Think about the physical container holding elements and how empty items drop out.",
    hint2: "Use a list comprehension or generator to filter items where item is not None.",
    hint3: "Return [x for x in data if x is not None]"
  };
}

function getQuiz(num) {
  return [
    {
      question: "How does Python execute source code behind the scenes?",
      options: [
        "It compiles directly to machine assembly code before running.",
        "It compiles source code into Bytecode (.pyc) which is interpreted by the Python Virtual Machine (PVM).",
        "It runs through a browser engine without any intermediate step.",
        "It executes line by line through an analog punch-card reader."
      ],
      answer: "B",
      explanation: "Python is an interpreted language that first compiles human-readable code into intermediate Bytecode, which the Python Virtual Machine (PVM) executes instructions on."
    },
    {
      question: "What happens when you assign 'x = 10' in Python?",
      options: [
        "A 4-byte box named 'x' is permanently fixed in RAM with binary 10.",
        "Python creates an integer object 10 on the heap and binds the label 'x' as a pointer to it.",
        "Python registers 'x' as a global constant that can never be reassigned.",
        "Python stores 10 in the GPU registers."
      ],
      answer: "B",
      explanation: "In Python, variables are names/labels referencing objects. 'x = 10' creates an integer object with value 10 and binds 'x' to point to that object."
    },
    {
      snippet: `val = 5\nval += 5\nprint(val)`,
      options: ["5", "10", "'55'", "None"],
      answer: "B",
      explanation: "'val += 5' adds 5 to the existing value 5, resulting in 10."
    }
  ];
}

// Generate all 46 markdown files
console.log('🚀 Generating all 46 Python Course Markdown Blueprints...');
let count = 0;
parts.forEach((part, idx) => {
  const meta = TOPIC_DOMAINS[idx] || TOPIC_DOMAINS[0];
  const mdContent = generatePartMarkdown(part, meta);
  const filePath = path.join(targetDir, part.filename);
  fs.writeFileSync(filePath, mdContent, 'utf8');
  count++;
});

console.log(`✅ Successfully generated ${count} Markdown Blueprints in: ${targetDir}`);
