const fs = require('fs');
const path = require('path');

const targetDir = 'C:/Projects/KSM x Tech - Projects/RETROSPEED/docs/curriculum/python_46_parts';
const metadata = JSON.parse(fs.readFileSync(path.join(targetDir, '00_PARTS_METADATA.json'), 'utf8'));

let md = `# RETROSPEED Python Visual Course — Master 46-Part Registry

> **Curriculum Grounding**: Built from the authentic [Python Visual Course Playlist (46 Parts)](https://youtube.com/playlist?list=PLNcg_FV9n7qZGfFl2ANI_zISzNp257Lwn) and master 13-hour compilation (\`Rq5gJVxz55Q\`).
> **Agent Prompt**: See [\`00_UNIVERSAL_AGENT_PROMPT.md\`](./00_UNIVERSAL_AGENT_PROMPT.md) for the exact prompt to analyze each video using Google AI Studio / Gemini Agentic Video Understanding.

---

## 46-Part Video & Blueprint Directory

| Part | Title | Video ID | YouTube Watch Link | Blueprint Document |
| :---: | :--- | :---: | :---: | :--- |
`;

metadata.forEach(p => {
  md += `| **${p.partNumber}** | ${p.title} | \`${p.videoId}\` | [Watch Video (${p.videoId})](${p.url}) | [\`${p.filename}\`](./${p.filename}) |\n`;
});

md += `\n---

## Curriculum Stages Overview

- **Stage 1: Python Genesis & Mindset** (Parts 01 – 07)
  - Runtime, Bytecode, Comments, Print, Variables, Input, Primitive Types
- **Stage 2: Strings & Mathematics** (Parts 08 – 09)
  - String manipulation, indexing, slicing, numeric functions, random module
- **Stage 3: Logic Gates & Decision Trees** (Parts 10 – 16)
  - Control flow, booleans, comparison, logical operators, membership & identity, if/elif/else, match-case
- **Stage 4: Iteration & Repetition Engines** (Parts 17 – 21)
  - For loops, break/continue/pass, for-else trick, nested loops, while loops
- **Stage 5: Lists & Sequence Manipulation** (Parts 22 – 34)
  - Creating lists, indexing/slicing, unpacking, analyzing, mutation, sorting, shallow vs deepcopy, zip/combine, iterators/iterables, lambdas, list comprehensions, 30 power operations
- **Stage 6: Advanced Containers & Key-Value Stores** (Parts 35 – 38)
  - Tuples, sets, dictionaries, data structure selection matrix
- **Stage 7: Modular Architecture & Functions** (Parts 39 – 46)
  - Function mechanics, parameters vs arguments, scopes, default/keyword args, *args & **kwargs, return vs print, function taxonomy, 8 production clean code habits
`;

fs.writeFileSync(path.join(targetDir, '00_PLAYLIST_REGISTRY.md'), md, 'utf8');
console.log('✅ Updated 00_PLAYLIST_REGISTRY.md');
