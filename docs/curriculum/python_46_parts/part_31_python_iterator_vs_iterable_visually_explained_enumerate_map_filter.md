# Part 31: Python Iterator vs Iterable (Visually Explained) | enumerate, map, filter
**Video URL**: https://www.youtube.com/watch?v=hgQD2znCc_I  
**Video ID**: `hgQD2znCc_I`  
**Curriculum Stage**: Stage 4 // Collections & Data Structures  
**Concept Domain**: Lazy Evaluation, Iterator Protocols, Stream Transformations (`map`, `filter`), Index Tracking (`enumerate`)  
**Target Skill Tier**: Code Pilot / System Architect  
**Estimated Duration**: 23:27  

---

## 1. Executive Summary & Pedagogical Goals
- **The Core Problem**: Beginners treat all sequence processing as eager array operations, allocating massive lists in memory and writing redundant manual indexing loops (`i = 0; i += 1`). When introduced to modern data pipelines, learners face four critical stumbling blocks:
  1. **The Memory Exhaustion Anti-Pattern**: Loading millions of records into memory at once in concrete lists, unaware that Python provides stateful stream generators (iterators) that consume and yield records one-by-one with \(O(1)\) memory footprint.
  2. **The "Iterable vs. Iterator" False Equivalence**: Conflating the passive data container (an *iterable* like `list` or `str`) with the active stateful generator engine (an *iterator* that implements the `next()` protocol).
  3. **The Uninvoked Function Reference Mystery**: Calling transforming functions immediately inside `map()` or `filter()` (e.g., writing `map(str.upper(), data)` instead of passing the function reference `map(str.upper, data)`), triggering runtime `TypeError` crashes.
  4. **The Single-Pass Exhaustion Trap**: Assuming an iterator or generator can be looped over multiple times, only to find subsequent loops or list casts produce empty results because the iterator's internal pointer reached the end on the first pass.
- **The Visual Solution**: The visual stage models stream processing as **The On-Demand Conveyor Dispenser & Sensor Gating Line**:
  - **The Warehouse Storage Bin (Iterable)**: Static containers holding items at rest in RAM.
  - **The Gating Feeder (Iterator)**: An automated dispenser that advances one single box onto the line only when the downstream consumer presses the `next()` pedal.
  - **The Ticketer Head (`enumerate`)**: Laser-stamps consecutive sequence index tags onto boxes as they roll by (defaulting to 0 or custom `start=1`).
  - **The In-Line Spray Booth (`map`)**: Applies a transformation function (casing, type casting, whitespace trimming) to each box dynamically on the fly.
  - **The Quality Trapdoor Flap (`filter`)**: An optical sensor that inspects passing boxes against a boolean rule (`None`, `bool`, `str.isalpha`), dropping invalid boxes through a scrap chute while clean records continue to the collection hopper.
- **3 Concrete Learning Outcomes**:
  1. Differentiate unequivocally between iterables (containers implementing `__iter__`) and iterators (engines implementing `__next__`), predicting state exhaustion behaviors.
  2. Eliminate manual loop index counters by utilizing `enumerate(iterable, start=N)` to extract synchronized `(index, value)` pairs.
  3. Construct declarative, memory-efficient data cleaning pipelines using `map()` and `filter()`, passing first-class function references and materializing results on demand via `list()`.

---

## 2. Visual Mental Model & Analogy (For DynamicVisualStage.jsx)
- **analogyType**: `conveyor`
- **Analogy Name**: The On-Demand Conveyor Dispenser & Sensor Gating Line
- **Physical Metaphor**: Imagine an automated industrial bottling and packaging plant:
  1. **The Static Storage Crate (The Iterable)**:
     - A large wooden pallet holding all bottles at rest in the warehouse (`Memory: Large allocation`).
     - A list `["apple", "banana", "cherry"]` is an iterable. It sits in RAM, fully materialized. You can query its length (`len()`) and access random elements by index (`items[0]`).
  2. **The On-Demand Dispenser Gantry (The Iterator)**:
     - The crate is loaded into an automated hopper. The hopper does NOT dump all bottles onto the floor.
     - Instead, a mechanical gate releases **one single bottle** only when the downstream machine sends an electrical pulse (`next(iterator)`).
     - The iterator remembers its exact cursor position. It does not look backward, cannot jump ahead, and once the last bottle leaves the chute, the hopper raises a `StopIteration` flag.
  3. **The Index Barcode Ticketer (`enumerate`)**:
     - Positioned directly at the hopper exit is a high-speed barcode printer.
     - As each bottle rolls out, the printer stamps a numerical index onto its neck: `(0, "apple")`, `(1, "banana")`, `(2, "cherry")`.
     - Setting `start=100` configures the printer counter to begin at `100` without changing the underlying items.
  4. **The In-Line Transformation Laser (`map`)**:
     - Further down the conveyor belt sits a laser workstation. As each bottle glides underneath, the laser transforms its label (e.g., executing `str.upper` or `int()` string-to-number casting).
     - It does not process the entire crate upfront; it transforms each bottle in real-time as it glides past.
  5. **The Quality Reject Trapdoor (`filter`)**:
     - An optical inspection camera scans the passing bottles against a quality specification:
       - If `filter(None, items)` is configured, the camera checks truthiness: empty bottles (`""`, `None`, `False`, `0`) trigger a solenoid trapdoor that dumps them into the discard bin.
       - If `filter(str.isalpha, items)` is active, bottles containing numeric symbols are rejected.
       - Clean bottles pass smoothly to the final packing crate (`list()`).
- **Visual Scene Breakdown**:
  - **Component A (The Feeder Hopper / Iterable)**: Shows static boxes waiting in queue.
  - **Component B (The Gating Escapement / Iterator)**: A rotating mechanical cog that dispenses one element per cycle.
  - **Component C (The Ticketer & Sensor Array)**: Over-conveyor tools showing laser badges for `enumerate`, `map`, and `filter`.
  - **Component D (The Collection Crate / Materializer)**: A receiving box at the end of the line that accumulates items when `list()` is called.
- **State Machine Transitions**:
  - `idle`: Feeder belt stationary; optical sensors emit low-power amber alignment beams.
  - `active / executing`:
    - On `next()`: Escapement rotates with a crisp ratchet click; a single box glides forward.
    - On `enumerate`: Laser flashes cyan, branding the sequential integer tag onto the box.
    - On `map`: Spray booth pulses green, transforming box contents in-flight.
    - On `filter`: Scanner beam evaluates truthiness; trapdoor flaps open for rejected items with a mechanical puff.
  - `success`: Items arrive at packing station; green counter display updates.
  - `error`: Calling `next()` on an exhausted iterator triggers a red warning light: `StopIteration`; attempting to loop over an `int` flashes `TypeError: 'int' object is not iterable`.
- **ASCII / Diagrammatic Wireframe**:
  ```text
  ========================================================================================
           THE RETROSPEED ON-DEMAND CONVEYOR & SENSOR GATING PIPELINE (STAGE 4)
  ========================================================================================

  [STATIC CRATE: Iterable]  ["  alpha  ", "", "beta", None, "123", "delta"]
             |
             V
  +--------------------------------------------------------------------------------------+
  | THE ON-DEMAND HOPPER (Iterator Engine)                                               |
  | Dispenses ONE item per next() call. Stateful cursor. Memory footprint = O(1).        |
  +--------------------------------------------------------------------------------------+
             |
             V (One item at a time)
  +--------------------------------------------------------------------------------------+
  | STATION 1: filter(None, ...) --> TRUTHINESS TRAPDOOR                                 |
  |   - "  alpha  " --> PASS                                                             |
  |   - ""          --> REJECTED! (Trapdoor drops empty string into void)                |
  |   - "beta"      --> PASS                                                             |
  |   - None        --> REJECTED! (Trapdoor drops None into void)                        |
  +--------------------------------------------------------------------------------------+
             |
             V
  +--------------------------------------------------------------------------------------+
  | STATION 2: map(str.strip, ...) --> IN-LINE CLEANING                                  |
  |   - "  alpha  " --> Trimmed to "alpha"                                               |
  |   - "beta"      --> "beta"                                                           |
  |   - "123"       --> "123"                                                            |
  +--------------------------------------------------------------------------------------+
             |
             V
  +--------------------------------------------------------------------------------------+
  | STATION 3: filter(str.isalpha, ...) --> ALPHABETIC SPECIFICATION                     |
  |   - "alpha" --> PASS                                                                 |
  |   - "beta"  --> PASS                                                                 |
  |   - "123"   --> REJECTED! (Digits dropped)                                           |
  |   - "delta" --> PASS                                                                 |
  +--------------------------------------------------------------------------------------+
             |
             V
  +--------------------------------------------------------------------------------------+
  | STATION 4: enumerate(..., start=1) --> INDEX BARCODE TICKETER                        |
  |   - Slot 1: (1, "alpha")                                                             |
  |   - Slot 2: (2, "beta")                                                              |
  |   - Slot 3: (3, "delta")                                                             |
  +--------------------------------------------------------------------------------------+
             |
             V
  [COLLECTION HOPPER: list()] ==> [ (1, "alpha"), (2, "beta"), (3, "delta") ]
  ========================================================================================
  ```

---

## 3. Gamification Mechanics & Puzzle Design (For Game Loops & Challenges)
- **Level Objective**: Build stream-processing pipelines using `enumerate()`, `map()`, and `filter()`, managing the iterator lifecycle and avoiding premature exhaustion or eager memory bloat.
- **Interactive Puzzle Mechanics**:
  - **The Step-by-Step `next()` Trigger**: A manual push-button in the UI that advances an iterator one step at a time, watching the state machine transition from slot to slot and observing the internal pointer move.
  - **The Lazy Inspection Gauge**: Demonstrates memory usage: a 1,000,000-item list uses ~8 MB of RAM, while an equivalent `map()` or `filter()` iterator uses only 48 bytes of RAM!
- **Hazards & Anti-Patterns (The "Potholes")**:
  - **Pothole 1: The Function Call in Map/Filter**:
    ```python
    names = ["alice", "bob"]
    # ❌ CATASTROPHIC BUG: Invoking the function instead of passing reference!
    result = map(str.upper(), names) # TypeError: method takes 0 args (1 given)
    # ✅ Correct: Pass function reference:
    result = map(str.upper, names)
    ```
  - **Pothole 2: The Exhausted Iterator Ghost**:
    ```python
    stream = filter(None, [1, 2, 3])
    list_a = list(stream) # [1, 2, 3]
    list_b = list(stream) # ❌ list_b is EMPTY []! stream is already exhausted!
    ```
  - **Pothole 3: Direct Printing of Raw Iterators**:
    ```python
    nums = [1, 2, 3]
    print(map(abs, nums)) 
    # ❌ Outputs: <map object at 0x000002A...>
    # ✅ Correct: print(list(map(abs, nums))) or loop over it in a for loop!
    ```
  - **Pothole 4: Iterating Non-Iterables**:
    ```python
    code = 404
    for digit in code: # 💥 Crash! TypeError: 'int' object is not iterable
        pass
    ```
- **Streak & Velocity Multipliers**:
  - **10x Streak**: ⚡ "Stream Aligned" — 1.5x XP Boost + Mechanical dispenser tick.
  - **25x Streak**: 🌊 "Lazy Flow" — 2.0x XP Boost + Cyan photon stream trail.
  - **50x Streak**: 🏆 "Iterator Grandmaster" — 3.0x XP Boost + Gold conveyor cog unlock.
- **Badge / Achievement Unlock**:
  - **Badge ID**: `badge_part_31`
  - **Badge Name**: "Lazy Streamer"
  - **Criteria**: Complete all 3 typing drill tiers and achieve 100% test pass rate in the Log Stream Sanitizer challenge.

---

## 4. Code Anatomy & Token Breakdown (For PythonStepTeacher.jsx)

### Canonical Code Snippet
```python
raw_entries = ["  admin  ", "", "operator", None, "audit_99"]

valid_entries = filter(None, raw_entries)
clean_entries = map(str.strip, valid_entries)

for index, user in enumerate(clean_entries, start=1):
    print(f"User #{index}: {user.upper()}")
```

### Token-by-Token Dissection Table
| Token | Syntax Category | Hex Color | Deep Explanation |
| :--- | :--- | :--- | :--- |
| `raw_entries` | Identifier | `#48B89F` | Memory pointer referencing the initial raw input list (the iterable). |
| `=` | Operator | `#F6C445` | Binds variable label to newly constructed iterator or list. |
| `filter` | Built-in Function | `#C3A6E8` | Generator function constructing a lazy filter iterator yielding elements where predicate is true. |
| `None` | Sentinel Literal | `#F28B82` | When passed as predicate to `filter()`, acts as an inherent truthiness filter (purges falsy values). |
| `,` | Delimiter | `#E0E0E0` | Separates predicate argument from iterable data source. |
| `raw_entries` | Argument | `#48B89F` | The source iterable fed into the filter stream. |
| `map` | Built-in Function | `#C3A6E8` | Generator function applying a transformation callable lazily across every element of an iterable. |
| `str.strip` | Method Reference | `#C3A6E8` | Uncalled method reference bound to `str` class, invoked by `map` on each element dynamically. |
| `for` | Keyword | `#C3A6E8` | Initiates loop, calling `__iter__()` and stepping through `__next__()` until `StopIteration`. |
| `index, user` | Target Identifiers | `#48B89F` | Unpacks the 2-element tuple `(index, value)` yielded by `enumerate` on each iteration. |
| `in` | Keyword | `#C3A6E8` | Connects iteration target variables to the source iterator. |
| `enumerate` | Built-in Function | `#C3A6E8` | Wraps any iterable in an iterator yielding sequential `(index, value)` pairs. |
| `start=1` | Keyword Argument | `#F6C445` | Configures `enumerate` to begin index counting at integer 1 instead of default 0. |

### Coach Byte's Conversational Guide
- **Opening Hook**: *"Welcome to professional-grade Python! Beginners load 10-gigabyte CSV files into massive lists and watch their computer freeze. Senior engineers use iterators: streaming data through memory like water through a garden hose—one droplet at a time! Today, we master lazy streaming with `enumerate`, `map`, and `filter`!"*
- **The Secret Insight**: *"Notice something crucial about `map(str.strip, items)`? There are NO parentheses after `str.strip`! You are not running the function right now. You are handing the function to the conveyor machine as an instruction manual, saying: 'Hey, whenever a box rolls by, apply this operation to it!'"*
- **Pro Tip**: *"Always remember the golden rule of iterators: they are single-use disposable tickets! Once you consume an iterator in a `for` loop or convert it with `list()`, it is empty. If you try to loop over it a second time, Python will silently yield nothing!"*

---

## 5. Execution Simulation Trace (Step-by-Step State Machine)

```python
# Program under trace:
raw = ["  dev  ", "", "ops"]        # L1
valid = filter(None, raw)           # L2
cleaned = map(str.strip, valid)     # L3
audit = list(enumerate(cleaned, 1)) # L4
```

| Step | Line # | Interpreter Action | Memory / RAM State (`vars`) | Terminal `stdout` | Visual Particle FX |
| :---: | :---: | :--- | :--- | :--- | :--- |
| 1 | L1 | Allocate 3-element list in heap; bind `raw` | `raw: ['  dev  ', '', 'ops']` | `""` | 3 cargo boxes loaded onto intake dock |
| 2 | L2 | Construct lazy `filter` iterator object (evaluates nothing yet) | `valid: <filter object at 0x01>` | `""` | Trapdoor scanner powers on with green laser |
| 3 | L3 | Construct lazy `map` iterator object wrapping `valid` | `cleaned: <map object at 0x02>` | `""` | In-line spray booth lowers onto belt |
| 4 | L4.1 | `list()` requests item 1: `valid` pulls `'  dev  '` (truthy); `map` trims to `'dev'`; `enumerate` yields `(1, 'dev')` | Interim accumulation: `[(1, 'dev')]` | `""` | Box 1 stamped, trimmed, dropped in hopper |
| 5 | L4.2 | `list()` requests item 2: `valid` pulls `''` (falsy); trapdoor rejects it; `valid` pulls `'ops'` (truthy); `map` trims to `'ops'`; `enumerate` yields `(2, 'ops')` | Interim accumulation: `[(1, 'dev'), (2, 'ops')]` | `""` | Trapdoor snaps open; empty string discarded; box 2 accepted |
| 6 | L4.3 | `list()` requests next: `raw` exhausted; `StopIteration` raised; list finalized | `audit: [(1, 'dev'), (2, 'ops')]` | `""` | Hopper latches shut; green status glow locks |

---

## 6. Muscle-Memory Typing Drills (For RETROSPEED Typing Stage)

### Level 1: Syntax & Operator Micro-Drill
- `iter(items)`
- `next(stream)`
- `enumerate(items)`
- `enumerate(items, start=1)`
- `map(str.upper, items)`
- `map(int, text_digits)`
- `filter(None, items)`
- `filter(bool, items)`
- `filter(str.isalpha, items)`
- `list(map(str.strip, items))`

### Level 2: Line Construction Drill (< 65 characters/line)
- `for i, item in enumerate(queue, start=1):`
- `clean_names = list(map(str.strip, raw_names))`
- `non_empty = list(filter(None, form_inputs))`
- `valid_codes = list(filter(str.isalpha, raw_tokens))`
- `numbered_roster = list(enumerate(valid_codes, start=101))`
- `parsed_ints = list(map(int, numeric_strings))`

### Level 3: Velocity Sprint (Target: 45+ WPM, 96%+ Accuracy)
```python
def sanitize_telemetry(raw_signals):
    active_signals = filter(None, raw_signals)
    cleaned_signals = map(str.strip, active_signals)
    alpha_telemetry = filter(str.isalpha, cleaned_signals)
    return list(enumerate(alpha_telemetry, start=1))
```

---

## 7. Python Code Studio Challenge & Auto-Grading (For PythonCodeStudio.jsx)

- **Challenge Name**: "Cloud Ingestion Stream Sanitizer & Indexed Audit Pipeline"
- **Scenario**: You are an SRE building the telemetry pre-processor for an enterprise cloud platform. Raw system logs arrive as un-sanitized batches containing whitespace pollution, empty entries, numeric error codes, and valid service tags.
  Your task is to implement `audit_service_stream(raw_logs, start_index)` that processes the stream using lazy functional transformations:
  1. **Truthiness Gate (`filter`)**: Purge all falsy values (`None`, `""`, `0`, `False`) from `raw_logs` using `filter(None, ...)`.
  2. **Whitespace Stripping (`map`)**: Clean all remaining string entries by applying `str.strip` using `map()`.
  3. **Alpha-Only Validation (`filter`)**: Retain only records that contain strictly alphabetic characters using `filter(str.isalpha, ...)`.
  4. **Upper-Case Normalization (`map`)**: Convert all surviving records to uppercase using `map(str.upper, ...)`.
  5. **Indexed Audit Packaging (`enumerate`)**: Wrap the normalized stream with `enumerate(..., start=start_index)` and materialize into a concrete `list` of `(audit_id, service_name)` tuples.
  6. **Return**: Return a dictionary with:
     - `"sanitized_audit"`: The materialized list of indexed tuples.
     - `"record_count"`: The integer number of clean records produced.
     - `"is_stream_exhausted"`: A boolean check verifying that calling `list()` on the consumed generator pipeline now yields `[]`.

- **Starter Code (Learner Canvas)**:
```python
def audit_service_stream(raw_logs, start_index=1):
    # TODO 1: Filter out falsy values using filter(None, ...)
    
    # TODO 2: Strip whitespaces using map(str.strip, ...)
    
    # TODO 3: Filter alphabetic-only using filter(str.isalpha, ...)
    
    # TODO 4: Transform to uppercase using map(str.upper, ...)
    
    # TODO 5: Enumerate with start_index and materialize to list
    
    # TODO 6: Return dictionary with sanitized_audit, record_count, is_stream_exhausted
    pass
```

- **Target Solution Code**:
```python
def audit_service_stream(raw_logs, start_index=1):
    # 1. Filter out falsy entries
    truthy_stream = filter(None, raw_logs)
    
    # 2. Strip whitespace dynamically
    stripped_stream = map(str.strip, truthy_stream)
    
    # 3. Filter alphabetic-only records
    alpha_stream = filter(str.isalpha, stripped_stream)
    
    # 4. Normalize to uppercase
    upper_stream = map(str.upper, alpha_stream)
    
    # 5. Enumerate and materialize
    sanitized_audit = list(enumerate(upper_stream, start=start_index))
    
    # 6. Verify iterator exhaustion (pipeline is already drained)
    is_stream_exhausted = (list(upper_stream) == [])
    
    return {
        "sanitized_audit": sanitized_audit,
        "record_count": len(sanitized_audit),
        "is_stream_exhausted": is_stream_exhausted
    }
```

- **Real-Time AST & Diagnostic Checks (Static Lints)**:
  - **Check 1 (Signature Check)**: Function must be named `audit_service_stream` and accept `raw_logs` and `start_index`.
  - **Check 2 (Uncalled Reference Linter)**: Forbid calling `str.strip()` or `str.upper()` with parentheses inside `map()`.
  - **Check 3 (No Manual Index Counters)**: Disallow `i = 0; i += 1` manual indexing; enforce `enumerate`.

- **Automated Test Cases (Using python-testing-patterns)**:
  - **Test Case 1 (Standard Mixed Telemetry Batch)**:
    - Input:
      - `logs = ["  auth_service  ", "", None, "  database  ", "90210", "  cache  "]`
      - `start = 100`
    - Assertion:
      ```python
      logs = ["  auth_service  ", "", None, "  database  ", "90210", "  cache  "]
      res = audit_service_stream(logs, start_index=100)
      # "auth_service" has underscore, so isalpha fails; only database and cache survive!
      # Wait: "database" is alpha, "cache" is alpha.
      assert res["record_count"] == 2
      assert res["sanitized_audit"] == [(100, "DATABASE"), (101, "CACHE")]
      assert res["is_stream_exhausted"] is True
      ```
    - Failure Feedback: "Failed on standard mixed log stream; verify filter predicates and start offset."
  - **Test Case 2 (Pure Alpha Stream with Default Start Index)**:
    - Input: `logs = ["api", "gateway"]`, `start_index = 1`
    - Assertion:
      ```python
      res = audit_service_stream(["api", "gateway"], start_index=1)
      assert res["sanitized_audit"] == [(1, "API"), (2, "GATEWAY")]
      assert res["record_count"] == 2
      ```
    - Failure Feedback: "Failed on pure alphabetic stream with default indexing."
  - **Test Case 3 (All-Falsy / All-Numeric Rejection Boundary)**:
    - Input: `logs = ["", None, False, "123", "   "]`
    - Assertion:
      ```python
      res = audit_service_stream(["", None, False, "123", "   "], 50)
      assert res["sanitized_audit"] == []
      assert res["record_count"] == 0
      assert res["is_stream_exhausted"] is True
      ```
    - Failure Feedback: "Failed on complete rejection boundary check."

- **Progressive Hint Ladder**:
  - **Hint 1 (Mental Model Clue)**: Chain your stations like an assembly line! Output from `filter(None, ...)` feeds into `map(str.strip, ...)`, which feeds into `filter(str.isalpha, ...)`.
  - **Hint 2 (Function References)**: Never write parentheses when passing methods to `map()` or `filter()`. Pass `str.strip`, not `str.strip()`.
  - **Hint 3 (Index Offsets)**: `enumerate(stream, start=start_index)` assigns the start index cleanly without manual counter math.

---

## 8. Conceptual Mastery Quiz (3 High-Yield Questions)

### Question 1: Iterable vs. Iterator Definitions
Which of the following statements correctly distinguishes an **iterable** from an **iterator** in Python?
- A) An iterable implements `next()`, while an iterator implements `len()`.
- B) An iterable is a data container you can loop over (like a `list`); an iterator is the stateful stream engine that produces items one-by-one via `next()`.
- C) Iterables and iterators are completely identical terms for any sequence.
- D) An iterator can be iterated over infinite times without resetting, while an iterable can only be read once.
- **Correct Answer**: **B**
- **Deep Explanation**: An *iterable* is any object capable of returning its members one at a time (e.g., lists, strings, dictionaries). It implements `__iter__()`. An *iterator* is the actual stream engine that tracks iteration state in memory and produces values upon successive calls to `__next__()`. When all elements are yielded, the iterator raises `StopIteration`.

### Question 2: Passing Functions to `map()` and `filter()`
What happens when you execute `map(str.upper(), ["a", "b", "c"])` with parentheses after `upper`?
- A) It successfully converts the list to `["A", "B", "C"]`.
- B) It raises a `TypeError` because `str.upper()` is executed immediately without an argument rather than passing the callable reference.
- C) It converts the list into a generator of strings.
- D) It returns `None`.
- **Correct Answer**: **B**
- **Deep Explanation**: `map()` requires a **callable function reference** as its first argument. Calling `str.upper()` executes the method immediately during argument evaluation. Because `str.upper()` requires a string instance (`self`), calling it unbound without arguments immediately triggers `TypeError: descriptor 'upper' of 'str' object needs an argument`. The correct syntax is `map(str.upper, ["a", "b", "c"])`.

### Question 3: Iterator Consumption Lifecycle
Examine the following code snippet:
```python
numbers = [1, 2, 3]
doubled = map(lambda x: x * 2, numbers)
first_pass = list(doubled)
second_pass = list(doubled)
print(first_pass, second_pass)
```
What is the terminal output?
- A) `[2, 4, 6] [2, 4, 6]`
- B) `[2, 4, 6] []`
- C) `[] [2, 4, 6]`
- D) A `StopIteration` error is raised
- **Correct Answer**: **B**
- **Deep Explanation**: Iterators in Python are **single-pass, stateful streams**. When `list(doubled)` runs the first time, it advances the iterator until exhaustion, accumulating `[2, 4, 6]`. The iterator's internal cursor is now at the end. When `list(doubled)` is called a second time, the iterator immediately signals exhaustion (`StopIteration`), resulting in an empty list `[]`.
