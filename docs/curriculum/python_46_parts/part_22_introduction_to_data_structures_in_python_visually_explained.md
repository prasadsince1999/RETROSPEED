# Part 22: Introduction to Data Structures in Python (Visually Explained)
**Video URL**: https://www.youtube.com/watch?v=SVjXp22ddFQ&list=PLNcg_FV9n7qZGfFl2ANI_zISzNp257Lwn
**Video ID**: `SVjXp22ddFQ`
**Curriculum Stage**: Stage 5 // Data Collections & Sequences
**Concept Domain**: Collection Topology, Memory Layout, Primitive vs. Composite Types, The 4 Built-In Collections & Function-Method Boundaries
**Target Skill Tier**: Code Pilot / System Architect
**Estimated Duration**: 10:11

---

## 1. Executive Summary & Pedagogical Goals

### The Core Problem
Until this point in the curriculum, students have worked exclusively with **primitive scalar data types** (`int`, `float`, `str`, `bool`). Each scalar variable can hold only one single, isolated value in memory. When beginner developers attempt to model real-world business domains (such as shopping carts, database records, monthly expenses, or telemetry streams), they fall into the catastrophic **Variable Proliferation Antipattern**:
1. **The Scalar Variable Explosion**: Beginners declare separate, hardcoded variables for each data point: `cost1 = 10`, `cost2 = 15`, `cost3 = 20`, `cost4 = 25`, `cost5 = 30`. Script sizes balloon, namespace pollution runs rampant, and code becomes impossible to maintain.
2. **Brittle, Fragile Aggregation Formulas**: Calculating totals or averages requires manual, hardcoded arithmetic formulas: `total = cost1 + cost2 + cost3 + cost4 + cost5`. If a sixth cost arrives tomorrow, the developer must manually declare `cost6` and rewrite every calculation formula across the entire codebase.
3. **The Method vs. Function Mental Fog**: When introduced to collections, learners confuse Python's **Built-in Functions** (like `len()`, `sum()`, `max()`) with **Class Methods** (like `.append()`, `.sort()`). Novices frequently assign the return value of mutator methods (`costs = costs.append(50)`), oblivious to the fact that in-place methods return `None`, wiping out their datasets in memory.

### The Visual Solution
Baraa introduces **Data Structures** as standardized, compartmentalized memory containers that organize, manage, and store related collections of values under a single identifier in Python's heap memory:
- **From Chaotic Scatter to Unified Collection**:
  - Instead of managing 5 individual variables, all values are consolidated into a single contiguous structure: `costs = [10, 15, 20, 25, 30]`.
  - Aggregations collapse from brittle multi-line equations into universal functions: `total = sum(costs)`.
  - When new data arrives, zero formulas change—the data is simply deposited into the container!
- **The 4 Built-In Python Data Structures & Their Architectural Personalities**:
  1. **List (`[...]`)**: Ordered, mutable, allows duplicates. The daily versatile workhorse for general sequences.
  2. **Tuple (`(...)`)**: Ordered, immutable (tamper-proof / locked), allows duplicates. Ideal for fixed schemas, coordinates, and constant records.
  3. **Set (`{...}`)**: Unordered, mutable, strictly unique elements (automatic deduplication), hash-table backed.
  4. **Dictionary (`{key: value}`)**: Associative key-value mapping, ultra-fast $O(1)$ key lookups, fundamental for data engineering, JSON payloads, and relational modeling.
- **The Function vs. Method Boundary**:
  - **Built-in Functions (`sum(data)`, `len(data)`)**: Non-destructive standard library tools that intake collections as parameters, compute transformations, and return fresh values *without modifying the original collection in place*.
  - **Class Methods (`data.append(x)`, `data.sort()`)**: Type-specific member operations bound to the object's class. Many mutator methods modify the original object directly in RAM and return `None`.

```
===================== SCALAR CHAOS vs. DATA STRUCTURE HARMONY =====================

  SCALAR ANTIPATTERN (Chaotic & Brittle):
  [cost1: 10]   [cost2: 15]   [cost3: 20]   [cost4: 25]   [cost5: 30]
         │             │             │             │             │
         └─────────────┴─────────────┼─────────────┴─────────────┘
                                     ▼
                  total = cost1 + cost2 + cost3 + cost4 + cost5
                  (Adding cost6 requires rewriting source code!)

  DATA STRUCTURE SOLUTION (Unified & Scalable):
  costs = [ 10 ,  15 ,  20 ,  25 ,  30 ] ──► Single Pointer in RAM
                 │
                 ├──► sum(costs) ──► Returns 100
                 ├──► len(costs) ──► Returns 5
                 └──► costs.append(50) ──► Seamless Expansion (Zero formula rewrites!)
===================================================================================
```

### 3 Concrete Learning Outcomes
1. **Differentiate the 4 Core Data Structures**: Select the optimal collection type (`list`, `tuple`, `set`, `dict`) based on mutability requirements, uniqueness constraints, and access patterns.
2. **Master Container Syntax Delimiters**: Instantly identify and author collections using standard syntactic delimiters (`[]` square brackets, `()` parentheses, `{}` curly braces, and `{k: v}` key-value pairs).
3. **Safely Distinguish Functions from In-Place Methods**: Avoid accidental `NoneType` overwrites by differentiating between non-destructive built-in functions that return values versus class mutator methods that alter state in place.

---

## 2. Visual Mental Model & Analogy (For DynamicVisualStage.jsx)

- **analogyType**: `tray`
- **Analogy Name**: "The Modular Hardware Organizer & Compartment Tray"
- **Physical Metaphor**:
  Imagine a craftsman's workshop equipped with specialized modular storage trays:
  - **The List Tray (`[]` Square Bins)**: An open, expandable drawer organizer. You can drop screws into slot `[0]`, `[1]`, `[2]`, rearrange them, swap them, or click in new expansion compartments whenever you need more space.
  - **The Tuple Tray (`()` Resin Mold)**: A precision mold cured in solid industrial resin. The tools inside are locked in permanent, immutable positions. You can inspect and measure them anytime, but nobody can add, remove, or swap a tool without breaking the mold.
  - **The Set Tray (`{}` Magnetic Sieve)**: A smart sorting tray with magnetic polarities. If you drop in three identical 10mm bolts, the magnetic repulsion instantly merges them into a single unique slot. Duplicates are physically impossible.
  - **The Dictionary Tray (`{k: v}` Labeled Pigeonholes)**: A mail sorting cabinet with custom alphabetical label tags (`"user_id"`, `"status"`, `"balance"`). Instead of hunting by index numbers, you look directly at the labeled slot tag to pull out its contents in constant time $O(1)$.

```
+=================================================================================+
|            MODULAR HARDWARE ORGANIZER & COMPARTMENT TRAY (tray)                 |
+=================================================================================+
|                                                                                 |
|   1. LIST TRAY: costs = [10, 15, 20, 25, 30] (Expandable & Mutable)            |
|   ┌────────────┬────────────┬────────────┬────────────┬────────────┐            |
|   │ Slot [0]   │ Slot [1]   │ Slot [2]   │ Slot [3]   │ Slot [4]   │ [ + Slot ] |
|   │ val: 10    │ val: 15    │ val: 20    │ val: 25    │ val: 30    │ (Appends)  |
|   └────────────┴────────────┴────────────┴────────────┴────────────┘            |
|                                                                                 |
|   2. TUPLE TRAY: point = (1920, 1080) (Resin-Sealed / Locked / Immutable)      |
|   ┌────────────────────────┬────────────────────────┐                           |
|   │ 🔒 Slot [0]: 1920      │ 🔒 Slot [1]: 1080      │ (Write-Protected)         |
|   └────────────────────────┴────────────────────────┘                           |
|                                                                                 |
|   3. SET TRAY: tags = {"admin", "editor"} (Magnetic Unique Deduplication)       |
|   ┌────────────────────────┬────────────────────────┐                           |
|   │ 🧲 "admin"             │ 🧲 "editor"            │ (Rejects Duplicates)      |
|   └────────────────────────┴────────────────────────┘                           |
|                                                                                 |
|   4. DICTIONARY TRAY: user = {"name": "Byte", "level": 42} (Key-Value Slots)   |
|   ┌────────────────────────┬────────────────────────┐                           |
|   │ Tag: 'name' ──► "Byte" │ Tag: 'level' ──► 42    │ (Fast Direct Lookup)      |
|   └────────────────────────┴────────────────────────┘                           |
+=================================================================================+
```

### Visual Scene Breakdown
- **Component A (The Multi-Slot Tray Base)**: A retro compartmentalized wooden/plastic drawer rendered with crisp borders and index labels `[0]`, `[1]`, `[2]` or dictionary key tags.
- **Component B (The Item Inserts)**: Color-coded data pills representing stored values (`int`, `str`, `float`) resting inside individual compartments.
- **Component C (The Global Tool Overhead Bar)**: A split diagnostic HUD showing the difference between Built-in Functions (`sum()`, `len()`) operating externally above the tray vs. Class Methods (`.append()`, `.sort()`) acting directly on the tray's internal gears.

### State Machine Transitions
- `idle`: Tray rests in neutral lighting; compartment slots display placeholder dashed outlines.
- `populating`: Values slide down intake chutes and seat into compartments with a satisfying wooden snap audio.
- `function_eval`: `len()` or `sum()` scanner laser sweeps horizontally across all slots without disturbing items, projecting calculated summary digits onto the phosphor display.
- `in_place_mutation`: Method `.append()` triggers a mechanical drawer expansion, adding slot `[N]` with gear-turning particle sparks.
- `tamper_alert`: Attempting an in-place mutation on a tuple triggers a flashing amber lock icon with a mechanical refusal clink.

---

## 3. Gamification Mechanics & Puzzle Design (For Game Loops & Challenges)

- **Level Objective**:
  Assume the role of Data Architecture Lead at OmniCorp Logistics. The legacy system has dumped hundreds of disconnected scalar variables across memory. You must refactor the disorganized scalar clutter into standardized, elegant Python data structures, utilizing built-in functions and type-safe methods to restore system order.
- **Interactive Puzzle Mechanics**:
  - **Syntax Bracket Decryption**: Typing challenges where learners rapidly select the correct bracket pair (`[]`, `()`, `{}`) matching the required container architecture.
  - **In-Place Mutation Trap Interceptor**: If a learner writes `data = data.append(x)`, the terminal simulator freezes, displays a red ghost icon, and warns: *"NoneType Wipeout Hazard: .append() mutates in place and returns None! Reassigning will erase your list!"*
  - **Memory Inspection View**: Interactive toggle displays memory addresses, showing how a single list reference points to a sequence of heap pointers.
- **Hazards & Anti-Patterns (The "Potholes")**:
  - *The Method Reassignment Trap*: Writing `my_list = my_list.sort()` or `my_list = my_list.append(val)`.
  - *The Bracket Mismatch*: Using curly braces `{}` expecting a list, accidentally creating a set or dictionary.
  - *The Scalar Trap*: Continuing to declare individual variables (`user1`, `user2`) instead of grouping items in a collection.
- **Streak & Velocity Multipliers**:
  - **10x Streak**: 📦 "Container Organized" — 1.5x XP Boost; tray slots light up in mint green.
  - **25x Streak**: ⚡ "Schema Architect" — 2.0x XP Boost; mechanical drawer slides open with precision sound effects.
  - **50x Streak**: 🏆 "Master of Structures" — 3.0x XP Boost; unlocks the coveted "Structure Architect" profile badge.
- **Badge / Achievement Unlock**:
  - **Badge ID**: `badge_part_22`
  - **Badge Name**: Structure Architect
  - **Criteria**: Complete all 3 typing drill tiers and successfully write an automated dataset normalizer and metrics aggregator with 100% test pass rate at 45+ WPM.

---

## 4. Code Anatomy & Token Breakdown (For PythonStepTeacher.jsx)

### Canonical Code Snippet
```python
# Enterprise Data Collection Architecture: Scalar Consolidation Pattern
costs = [10, 15, 20, 25, 30]

total_cost = sum(costs)
item_count = len(costs)

print(f"Total: ${total_cost} across {item_count} items")
```

### Token-by-Token Dissection Table

| Token | Syntax Category | Hex Color | Deep Explanation |
| :--- | :--- | :--- | :--- |
| `costs` | Identifier | `#48B89F` | Named variable holding a heap reference pointer to the instantiated `list` object. |
| `=` | Assignment Operator | `#F6C445` | Binds the identifier `costs` to the evaluated collection container. |
| `[` | Bracket Delimiter | `#C3A6E8` | **The List Constructor.** Tells the Python compiler to allocate an ordered, mutable list. |
| `10, 15...` | Literals & Delimiters | `#F28B82` | Sequence of integer objects separated by commas (`,`), populating slots `[0]` through `[4]`. |
| `]` | Bracket Delimiter | `#C3A6E8` | Closes the list container boundary. |
| `sum(...)` | Built-in Function | `#48B89F` | Standard library function that traverses the iterable and returns the cumulative arithmetic sum. |
| `len(...)` | Built-in Function | `#48B89F` | Queries the collection's internal C-level length header (`ob_size`) in constant time $O(1)$. |
| `print(...)` | Built-in Function | `#48B89F` | Formats and emits the aggregated metrics string to standard output. |

### Coach Byte's Conversational Guide
- **Opening Hook**: *"Hey friends! Welcome to Chapter 5: Data Structures! This is the most important chapter in the entire course—it's what companies test in coding interviews and what data engineers use every single day! Say goodbye to chaotic single variables and welcome the power of collections!"*
- **The Secret Insight**: *"Why do we need data structures? Think about this: if you have 100 prices, do you want 100 separate variables and a 5-line addition formula? NO! Put them into one single list `prices = [...]`. Then, `sum(prices)` calculates everything instantly! When tomorrow brings 10 more prices, your code stays identical!"*
- **Pro Tip**: *"Remember your brackets! Square brackets `[]` make a List. Parentheses `()` make a Tuple. Curly braces `{}` make a Set or a Dictionary. And beware the #1 beginner bug: methods like `.append()` and `.sort()` change your list directly in memory and return `None`—never write `data = data.append(5)` or you will overwrite your data with nothingness!"*

---

## 5. Execution Simulation Trace (Step-by-Step State Machine)

Given `costs = [10, 20, 30]`:

| Step | Line # | Interpreter Action | Memory State (`vars`) | Terminal `stdout` | Visual Particle FX |
| :---: | :---: | :--- | :--- | :--- | :--- |
| 1 | L2 | Allocate list container of size 3 on heap | `costs = [10, 20, 30]` (Address `0x7FFE`) | `""` | 3 wooden slots slide into tray |
| 2 | L4 | Invoke `sum(costs)` $\rightarrow$ iterate elements | `costs = [...], total_cost = 60` | `""` | Laser sweeps slots; displays `60` |
| 3 | L5 | Invoke `len(costs)` $\rightarrow$ read internal size | `..., item_count = 3` | `""` | O(1) header tag reads size `3` |
| 4 | L7 | Evaluate f-string and emit output | `..., stdout emitted` | `"Total: $60 across 3 items"` | Green phosphor CRT flash |

---

## 6. Muscle-Memory Typing Drills (For RETROSPEED Typing Stage)

### Level 1: Syntax & Operator Micro-Drill
*Focus on collection delimiters, commas, and built-in functions.*
- Drill 1: `costs = [10, 20, 30]`
- Drill 2: `coords = (1920, 1080)`
- Drill 3: `unique_tags = {"admin", "staff"}`
- Drill 4: `user = {"id": 101, "role": "lead"}`
- Drill 5: `total = sum(items); count = len(items)`

### Level 2: Line Construction Drill (Home-Row & Rhythm calibrated, < 65 chars/line)
- Line 1: `prices = [12.50, 45.00, 9.99, 100.00]`
- Line 2: `total = sum(prices)`
- Line 3: `average = total / len(prices)`
- Line 4: `inventory = {"sku": "A101", "stock": 42}`
- Line 5: `immutable_bounds = (0, 100)`

### Level 3: Velocity Sprint (Full runnable mini-block)
```python
# Target WPM: 45+ | Target Accuracy: 96%+
records = [88, 92, 79, 95, 100]

record_sum = sum(records)
record_avg = record_sum / len(records)
record_max = max(records)

print(f"Metrics: Sum={record_sum}, Avg={record_avg:.1f}, High={record_max}")
```

---

## 7. Python Code Studio Challenge & Auto-Grading (For PythonCodeStudio.jsx)

### Challenge Name: Enterprise Metrics Aggregator & Schema Normalizer

### Scenario
You are developing an ingestion adapter for a distributed telemetry platform. Data payloads arrive as mixed or raw collections of numeric values. Legacy scripts processed each metric with disconnected scalar variables, resulting in frequent calculation bugs whenever payload sizes varied.

You must build an automated, defensive aggregation function `summarize_dataset(data: list) -> dict` that intakes a composite list, filters out any invalid entries, computes summary metrics using Python's non-destructive built-in functions, and returns a structured key-value summary dictionary.

### Specification & Rules
Implement `summarize_dataset(data: list) -> dict`:
1. **Input Validation**:
   - Verify that `data` is a `list`. If `data` is not a list or is empty (`[]`), return the default empty summary:
     ```python
     {
         "count": 0,
         "total": 0,
         "min": None,
         "max": None,
         "average": 0.0
     }
     ```
2. **Data Sanitization**:
   - Extract only valid numerical elements (`int` or `float`). Ignore strings, `None`, booleans, or other non-numeric types.
   - If no valid numbers remain after sanitization, return the default empty summary.
3. **Metric Calculations**:
   - Use Python's built-in functions:
     - `"count"`: Number of valid elements (`len(valid_nums)`).
     - `"total"`: Sum of all valid elements (`sum(valid_nums)`).
     - `"min"`: Smallest element (`min(valid_nums)`).
     - `"max"`: Largest element (`max(valid_nums)`).
     - `"average"`: Calculated as `round(total / count, 2)`.
4. **Return Schema**:
   Return a dictionary containing the five calculated metrics with the exact key names shown above.

### Starter Code (Learner Canvas)
```python
def summarize_dataset(data: list) -> dict:
    # TODO: Validate collection, sanitize numbers, and compute metrics
    # using built-in functions (sum, len, min, max).
    pass
```

### Target Solution Code
```python
def summarize_dataset(data: list) -> dict:
    empty_summary = {
        "count": 0,
        "total": 0,
        "min": None,
        "max": None,
        "average": 0.0
    }
    
    if not isinstance(data, list) or not data:
        return empty_summary

    # Sanitize: extract ints/floats, excluding bools (since bool is a subclass of int)
    valid_nums = [
        x for x in data
        if (isinstance(x, (int, float)) and not isinstance(x, bool))
    ]

    if not valid_nums:
        return empty_summary

    count = len(valid_nums)
    total = sum(valid_nums)
    min_val = min(valid_nums)
    max_val = max(valid_nums)
    avg_val = round(total / count, 2)

    return {
        "count": count,
        "total": total,
        "min": min_val,
        "max": max_val,
        "average": avg_val
    }
```

### Real-Time AST & Diagnostic Checks (Static Lints)
- **Check 1 (Built-In Function Usage)**: Inspect the AST to ensure the code calls at least two of `len`, `sum`, `min`, `max`. If absent, warn: *"Collection Efficiency: Utilize Python's built-in functions (sum, len, min, max) rather than manual loops for aggregation."*
- **Check 2 (Dictionary Construction)**: Verify that the function returns a `dict` object with curly braces or `dict()`.
- **Check 3 (In-Place Reassignment Check)**: Flag any statements reassigning the output of `.append()` or `.sort()` (e.g. `x = x.append(...)`).

### Automated Test Cases

#### Test Case 1 (Standard Clean Number Collection)
- **Input**: `summarize_dataset([10, 20, 30, 40])`
- **Expected Output**:
  ```python
  {
      "count": 4,
      "total": 100,
      "min": 10,
      "max": 40,
      "average": 25.0
  }
  ```
- **Assertion**:
  ```python
  res = summarize_dataset([10, 20, 30, 40])
  assert res["count"] == 4
  assert res["total"] == 100
  assert res["min"] == 10
  assert res["max"] == 40
  assert res["average"] == 25.0
  ```
- **Failure Feedback**: *"Failed standard clean integer array metrics aggregation."*

#### Test Case 2 (Dirty Collection with Mixed Non-Numeric Data)
- **Input**: `summarize_dataset([10, "N/A", None, 30, True, 20])`
- **Expected Output**:
  ```python
  {
      "count": 3,
      "total": 60,
      "min": 10,
      "max": 30,
      "average": 20.0
  }
  ```
- **Assertion**:
  ```python
  res = summarize_dataset([10, "N/A", None, 30, True, 20])
  assert res["count"] == 3
  assert res["total"] == 60
  assert res["average"] == 20.0
  ```
- **Failure Feedback**: *"Non-numeric items and booleans must be filtered out before aggregation."*

#### Test Case 3 (Empty List Boundary Defense)
- **Input**: `summarize_dataset([])`
- **Expected Output**:
  ```python
  {
      "count": 0,
      "total": 0,
      "min": None,
      "max": None,
      "average": 0.0
  }
  ```
- **Assertion**:
  ```python
  res = summarize_dataset([])
  assert res["count"] == 0
  assert res["min"] is None
  assert res["average"] == 0.0
  ```
- **Failure Feedback**: *"Empty lists must return default zero/None metrics safely without ZeroDivisionError."*

#### Test Case 4 (Float Decimal Accuracy)
- **Input**: `summarize_dataset([10.5, 20.25, 30.75])`
- **Expected Output**:
  ```python
  {
      "count": 3,
      "total": 61.5,
      "min": 10.5,
      "max": 30.75,
      "average": 20.5
  }
  ```
- **Assertion**:
  ```python
  res = summarize_dataset([10.5, 20.25, 30.75])
  assert res["count"] == 3
  assert res["total"] == 61.5
  assert res["average"] == 20.5
  ```
- **Failure Feedback**: *"Floating point values must be correctly summed and averaged."*

### Progressive Hint Ladder
- **Hint 1 (Mental Model Clue)**: Think of the compartment tray! Filter out junk items first into a clean list of numbers, then pass that clean list to Python's built-in functions (`sum`, `len`, `min`, `max`).
- **Hint 2 (Structural Pseudocode)**:
  ```python
  valid_nums = [x for x in data if isinstance(x, (int, float)) and not isinstance(x, bool)]
  if not valid_nums:
      return empty_summary
  return {
      "count": len(valid_nums),
      "total": sum(valid_nums),
      "min": min(valid_nums),
      "max": max(valid_nums),
      "average": round(sum(valid_nums) / len(valid_nums), 2)
  }
  ```
- **Hint 3 (Syntax Unlock)**: Remember that in Python, `bool` is a subclass of `int` (`isinstance(True, int)` is `True`). To strictly exclude booleans, add `and not isinstance(x, bool)`!

---

## 8. Conceptual Mastery Quiz (3 High-Yield Questions)

### Question 1: The Core Value Proposition of Data Structures
Why does storing multiple related values inside a data structure (like a list) provide a massive architectural advantage over creating multiple scalar variables (`x1`, `x2`, `x3`)?
- A) Scalar variables can only store binary zeros and ones.
- B) Data structures consolidate related values into a single memory reference, allowing dynamic iteration, flexible scaling, and universal aggregation without rewriting existing code formulas.
- C) Data structures run on the graphics card GPU, while scalar variables run on the CPU.
- D) Python allows a maximum of 10 scalar variables per script before crashing.

**Correct Answer**: **B**
**Deep Explanation**:
Using scalar variables for collections of data creates variable explosion and rigid, fragile code where every calculation must be hardcoded (`x1 + x2 + x3`). Data structures bundle values under one reference in heap memory. This enables dynamic looping, built-in aggregations like `sum()` and `len()`, and allows collections to grow or shrink at runtime without requiring any changes to downstream business logic.

---

### Question 2: Syntax Delimiter Matching
Which syntactic brackets designate a Python **List**, a **Tuple**, a **Set**, and a **Dictionary**, respectively?
- A) List: `()`, Tuple: `[]`, Set: `<>`, Dictionary: `{}`
- B) List: `[]`, Tuple: `()`, Set: `{}`, Dictionary: `{key: value}`
- C) List: `{}`, Tuple: `[]`, Set: `()`, Dictionary: `[]`
- D) List: `<>`, Tuple: `()`, Set: `[]`, Dictionary: `[key: value]`

**Correct Answer**: **B**
**Deep Explanation**:
Python uses distinct bracket delimiters to indicate collection types:
- Square brackets `[]` construct a **List** (ordered, mutable).
- Parentheses `()` construct a **Tuple** (ordered, immutable).
- Curly braces `{}` construct a **Set** (unordered, unique values).
- Curly braces with colons `{key: value}` construct a **Dictionary** (associative key-value mapping).

---

### Question 3: Functions vs. Methods & In-Place Mutation
What is the terminal output of the following Python code snippet, and why?
```python
numbers = [3, 1, 2]
result = numbers.sort()
print(result, numbers)
```
- A) `[1, 2, 3] [1, 2, 3]`
- B) `None [1, 2, 3]`
- C) `[1, 2, 3] [3, 1, 2]`
- D) `AttributeError: list has no attribute sort`

**Correct Answer**: **B**
**Deep Explanation**:
In Python, `.sort()` is a class method that performs **in-place mutation**: it sorts the elements directly within the existing list object in memory and explicitly returns `None`. When `result = numbers.sort()` executes, `result` is assigned `None`, while `numbers` itself has been reordered to `[1, 2, 3]`. This is why reassigning `numbers = numbers.sort()` is a notorious beginner bug that accidentally wipes out the list.
