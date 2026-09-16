# Part 25: Python Unpacking (Visually Explained) | Asterisk * and Underscore _
**Video URL**: https://www.youtube.com/watch?v=mSUBfY-Geuc&list=PLNcg_FV9n7qZGfFl2ANI_zISzNp257Lwn
**Video ID**: `mSUBfY-Geuc`
**Curriculum Stage**: Stage 5 // Data Collections & Sequences
**Concept Domain**: Sequence Unpacking, 1-to-1 Destructuring, Extended Iterable Unpacking (`*rest`), The Underscore Throwaway Idiom (`_`, `*_`), Mismatched Length Invariants & Variable Swapping
**Target Skill Tier**: Code Pilot / System Architect
**Estimated Duration**: 17:59

---

## 1. Executive Summary & Pedagogical Goals

### The Core Problem
When working with data collections (records, database rows, coordinate tuples, or API payloads), developers constantly need to extract individual elements and assign them to meaningful variable names. Before learning unpacking, beginners fall into three cumbersome and error-prone habits:
1. **The Verbose Indexing Cascade**: Manually writing repetitive, line-by-line index assignments:
   ```python
   name = person[0]
   age = person[1]
   role = person[2]
   country = person[3]
   ```
   If a record contains 10 attributes, the developer writes 10 lines of repetitive boilerplate that is fragile to schema adjustments and index drift.
2. **The Mismatched Variable Crash (`ValueError`)**: When attempting multi-variable assignment without understanding Python's unpacking contract, learners trigger runtime crashes:
   - `ValueError: not enough values to unpack` (fewer collection elements than variables).
   - `ValueError: too many values to unpack` (more collection elements than variables).
3. **Memory Waste & Variable Pollution on Throwaways**: When developers only care about the first and last elements of a collection, they invent temporary dummy variables (`temp1`, `unused_val`) to satisfy 1-to-1 matching, needlessly allocating memory and cluttering the namespace.

### The Visual Solution
Baraa visually contrasts **Packing** (putting items into a traveling suitcase) with **Unpacking** (opening the suitcase and placing items directly into labeled workspace slots):
- **1-to-1 Destructuring**:
  ```python
  name, age, role, country = person
  ```
  In a single atomic line, Python pulls elements out of `person` in strict sequential order and binds each to its corresponding variable name.
- **The Asterisk `*` (The Residual Collector / "Vacuum Cleaner")**:
  - Gathers all leftover, unassigned elements into a **brand-new list**.
  - **Head & Tail Pattern**: `first, *middle, last = items` (binds index 0 to `first`, index -1 to `last`, and all intermediate items to `middle`).
  - **Head & Rest Pattern**: `first, *rest = items` (binds index 0 to `first`, and all remaining elements to `rest`).
  - **Rest & Tail Pattern**: `*rest, last = items` (gathers all initial items into `rest`, and binds the final element to `last`).
  - **Syntax Invariant**: Only **one** starred expression is permitted per unpacking assignment target.
  - **Empty Residual Grace**: If there are no leftovers, the starred variable cleanly receives an empty list `[]` without raising an error.
- **The Underscore `_` (The Throwaway Trash Can)**:
  - Serves as Python's universal convention for values that must be unpacked to satisfy position but are intentionally discarded.
  - Can be used multiple times: `name, _, role, _ = person`.
- **The Combined Superpower (`*_`)**:
  - Gathers and silently discards arbitrary numbers of unwanted intermediate elements:
    ```python
    first, *_, last = large_dataset
    ```
- **Atomic Variable Swapping**:
  - `a, b = b, a` utilizes tuple packing and unpacking under the hood, swapping variables without requiring temporary auxiliary storage (`temp = a`).

```
========================= UNPACKING MECHANICS IN RAM =========================

  PACKED CONTAINER (Suitcase in RAM):
  person = [ "Maria" ,  29 ,  "Data Engineer" ,  "Spain" ]
                │       │            │              │
  1-to-1 DESTRUCTURING: │            │              │
  name , age , role , country = person              │
    │      │     │       │                          │
    ▼      ▼     ▼       ▼                          │
 'Maria'  29  'Engineer' 'Spain'                    │
                                                    │
  EXTENDED UNPACKING WITH ASTERISK (*):             │
  name , *details , country = person                │
    │         │          │                          │
    ▼         ▼          ▼                          │
 'Maria'   [ 29 , 'Data Engineer' ]   'Spain'       │
          (Collected into a New List!)              │
                                                    │
  DISCARDING WITH COMBINED ASTERISK-UNDERSCORE (*_):│
  name , *_ , country = person                      │
    │     │      │                                  │
    ▼     ▼      ▼                                  │
 'Maria' [DISCARDED] 'Spain' (Zero memory wasted on intermediate variables!)
==============================================================================
```

### 3 Concrete Learning Outcomes
1. **Eliminate Multi-Line Index Boilerplate**: Replace repetitive manual index extractions with clean, idiomatic 1-to-1 sequence destructuring in a single line.
2. **Master Extended Starred Unpacking (`*rest`)**: Collect dynamic residuals into sub-lists, accurately extracting head, tail, or partitioned segments from variable-length sequences.
3. **Optimize Resource Footprints with Underscore Idioms (`_`, `*_`)**: Discard irrelevant fields and multi-element leftovers cleanly without variable naming pollution or memory allocation.

---

## 2. Visual Mental Model & Analogy (For DynamicVisualStage.jsx)

- **analogyType**: `tray`
- **Analogy Name**: "The Quick-Draw Component Unboxer & Wildcard Hopper"
- **Physical Metaphor**:
  Imagine an automated logistics unboxing station:
  - **The Packing Crate**: A sealed shipping crate arrives containing multiple precision parts (`["Maria", 29, "Engineer", "Spain"]`).
  - **The Unboxing Chutes (1-to-1 Destructuring)**: Above the conveyor sits an inverted distribution rack with 4 chutes labeled `name`, `age`, `role`, `country`. When the crate unlatches, each part drops straight into its dedicated chute simultaneously.
  - **The Starred Hopper (`*details`)**: Instead of 4 narrow chutes, we have a chute on the left (`name`), a chute on the right (`country`), and a wide, motorized vacuum hopper in the center (`*details`). Any items between the first and last are sucked into the central hopper and boxed into a new container.
  - **The Incinerator Trapdoor (`_` and `*_`)**: Chutes labeled with an underscore `_` lead straight to a scrap recycling bin. If an item drops into `_`, it is discarded. The wide vacuum trapdoor `*_` captures all intermediate scrap without wasting clean storage bins.

```
+=================================================================================+
|            QUICK-DRAW COMPONENT UNBOXER & WILDCARD HOPPER (tray)                |
+=================================================================================+
|                                                                                 |
|  [ INCOMING CRATE ]: person = ['Maria', 29, 'Data Engineer', 'Spain']           |
|  ┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐  |
|  │ [0]: 'Maria'     │ [1]: 29          │ [2]: 'Engineer'  │ [3]: 'Spain'     │  |
|  └────────┬─────────┴────────┬─────────┴────────┬─────────┴────────┬─────────┘  |
|           │                  │                  │                  │            |
|           ▼                  ▼                  ▼                  ▼            |
|     CHUTE: name        CHUTE: age         CHUTE: role        CHUTE: country     |
|                                                                                 |
|  EXTENDED UNPACKING (Wildcard Vacuum Hopper):                                   |
|  first, *details, last = person                                                 |
|  ┌──────────────────┐    ┌──────────────────────────────────┐    ┌───────────┐  |
|  │ Slot: first      │    │ 🌀 VACUUM HOPPER: *details       │    │Slot: last │  |
|  │ Val: 'Maria'     │    │ Collects: [29, 'Data Engineer']  │    │Val:'Spain'│  |
|  └──────────────────┘    └──────────────────────────────────┘    └───────────┘  |
|                                                                                 |
|  THROWAWAY DISCARD (*_):                                                        |
|  first, *_, last = person ──► Middle items dump straight to recycle chute!      |
+=================================================================================+
```

### Visual Scene Breakdown
- **Component A (The Packing Chassis / Source Sequence)**: A multi-slot tray displaying the source elements in memory.
- **Component B (The Drop Chutes / Target Variables)**: Receptive bins positioned directly below each slot, lighting up as matching variables are bound.
- **Component C (The Accordion Vacuum Hopper / Starred Operator)**: An elastic, expandable accordion chamber labeled `*` that stretches to swallow any remaining elements between boundary chutes.

### State Machine Transitions
- `idle`: Unboxing chutes aligned above empty conveyor; green readiness lamps illuminated.
- `unpacking_exact`: 1-to-1 match detected; parts drop smoothly through individual chutes with a quick multi-click sound effect.
- `vacuum_engaging`: Starred variable `*` activates; accordion chamber expands, pulling intermediate items into a newly spawned sub-list capsule.
- `throwaway_dump`: Underscore `_` or `*_` activates; intermediate items drop through a trapdoor into recycling, showing a ghost outline that vanishes from RAM.
- `error_mismatch`: Unequal item counts without `*` trigger an amber klaxon with Coach Byte's diagnostic: *"ValueError: Target variable count does not match collection length!"*

---

## 3. Gamification Mechanics & Puzzle Design (For Game Loops & Challenges)

- **Level Objective**:
  Assume command of the Galactic Data Router. High-velocity telemetry packets and employee records arrive in heterogeneous sequence formats. You must unpack, route, and discard packet payloads using 1-to-1 destructuring, starred wildcards, and underscore throwaways without throwing `ValueError` exceptions.
- **Interactive Puzzle Mechanics**:
  - **Chute Alignment Puzzle**: Learners drag variable names under array slots to visualize how Python pairs variables to values in strict left-to-right order.
  - **Vacuum Hopper Slider**: Interactive exercise where learners adjust the position of `*` (front, middle, back) to see which elements are captured into the residual list.
  - **Variable Swapper Mini-Game**: Learners practice instant 2-variable and 3-variable circular swaps (`x, y = y, x`) without declaring temp variables.
- **Hazards & Anti-Patterns (The "Potholes")**:
  - *The Dual-Asterisk Violation*: Attempting `*head, *tail = items` (raises `SyntaxError: multiple starred expressions in assignment`).
  - *The Variable Starvation Crash*: Unpacking 3 variables from a 2-item list without `*` (`ValueError: not enough values to unpack`).
  - *The Orphaned Asterisk in Expression*: Typing `*items` on the right-hand side of a standard assignment instead of using it as a destructuring target.
- **Streak & Velocity Multipliers**:
  - **10x Streak**: ⚡ "Chutes Aligned" — 1.5x XP Boost; vacuum hoppers pulse with electric cyan.
  - **25x Streak**: 🌀 "Vortex Master" — 2.0x XP Boost; residual capture emits retro pneumatic woosh audio.
  - **50x Streak**: 🏆 "System Architect" — 3.0x XP Boost; unlocks the "Unpack Master" badge.
- **Badge / Achievement Unlock**:
  - **Badge ID**: `badge_part_25`
  - **Badge Name**: Unpack Master
  - **Criteria**: Complete all 3 typing drill tiers and achieve 100% test pass rate on the telemetry packet deconstructor challenge at 45+ WPM.

---

## 4. Code Anatomy & Token Breakdown (For PythonStepTeacher.jsx)

### Canonical Code Snippet
```python
# Modern Python Sequence Unpacking: 1-to-1, Starred Rest & Throwaway Idioms
person = ["Maria", 29, "Data Engineer", "Spain"]

# 1. Full 1-to-1 Destructuring
name, age, role, country = person

# 2. Extended Unpacking: Extract First and Last, Gather Middle
first, *details, last = person

# 3. Discard Middle Leftovers with *_
lead, *_, origin = person

# 4. Atomic Variable Swap
a, b = 10, 20
a, b = b, a
```

### Token-by-Token Dissection Table

| Token | Syntax Category | Hex Color | Deep Explanation |
| :--- | :--- | :--- | :--- |
| `name, age...` | Identifier Tuple | `#48B89F` | Target variable tuple receiving unpacked values in strict positional order. |
| `=` | Assignment Operator | `#F6C445` | Triggers Python's sequence unpacking protocol, binding left-hand targets to right-hand items. |
| `*details` | Starred Target | `#C3A6E8` | **The Extended Unpack Operator.** Gathers all unassigned intermediate elements into a fresh `list`. |
| `_` | Identifier (Throwaway) | `#F28B82` | Conventional throwaway identifier signifying that the unpacked value at this position is discarded. |
| `*_` | Starred Throwaway | `#F28B82` | Consumes and discards all remaining unassigned elements without allocating memory. |
| `a, b = b, a` | Atomic Swap Idiom | `#C3A6E8` | Evaluates right-hand tuple `(b, a)` in memory, then unpacks into `a, b`, swapping values with zero temp variables. |

### Coach Byte's Conversational Guide
- **Opening Hook**: *"Hey friends! Welcome to Part 25! Today we unlock one of the coolest, most Pythonic features in the entire language: sequence unpacking! If you're still writing `x = data[0]` and `y = data[1]` on separate lines, prepare to have your mind blown!"*
- **The Secret Insight**: *"Think of unpacking like unzipping a bag! If you have 4 items in your list, you can create 4 variables all at once: `a, b, c, d = my_list`! But what if you only care about the first and last items? Don't write 10 variables—just use the magic asterisk: `first, *middle, last = my_list`! Python automatically gathers all the middle leftovers into a clean list for you!"*
- **Pro Tip**: *"Want to be a true Python pro? Use the underscore `_` for values you want to ignore. If you only need the first item and the last item, write `first, *_, last = my_list`. The `*_` vacuum cleaner throws away everything in the middle so you don't waste memory or create clutter! And remember: you can only have ONE asterisk on the left side of the equals sign!"*

---

## 5. Execution Simulation Trace (Step-by-Step State Machine)

Given `person = ["Maria", 29, "Engineer", "Spain"]`:

| Step | Line # | Interpreter Action | Memory State (`vars`) | Terminal `stdout` | Visual Particle FX |
| :---: | :---: | :--- | :--- | :--- | :--- |
| 1 | L2 | Allocate list with 4 elements | `person = ['Maria', 29, 'Engineer', 'Spain']` | `""` | 4-slot crate loaded on conveyor |
| 2 | L5 | 1-to-1 unpack: bind 4 targets | `name='Maria', age=29, role='Engineer', country='Spain'` | `""` | 4 chutes open; items drop simultaneously |
| 3 | L8 | Extended unpack: `first, *details, last` | `first='Maria', details=[29, 'Engineer'], last='Spain'` | `""` | Vacuum hopper sucks middle items into sub-list |
| 4 | L11 | Discard intermediate with `*_` | `lead='Maria', origin='Spain'` (Middle discarded) | `""` | Trapdoor drops middle items into recycle bin |
| 5 | L14-15| Atomic swap: `a, b = 10, 20` $\rightarrow$ `a, b = b, a` | `a=20, b=10` | `""` | Binary tumbler flips values in place |

---

## 6. Muscle-Memory Typing Drills (For RETROSPEED Typing Stage)

### Level 1: Syntax & Operator Micro-Drill
*Focus on comma-separated identifiers, asterisk wildcards, and underscore throwaways.*
- Drill 1: `a, b = items`
- Drill 2: `first, *rest = data`
- Drill 3: `*start, last = data`
- Drill 4: `head, *middle, tail = stream`
- Drill 5: `x, *_, y = packet; a, b = b, a`

### Level 2: Line Construction Drill (Home-Row & Rhythm calibrated, < 65 chars/line)
- Line 1: `user_id, username, email = record[:3]`
- Line 2: `first_metric, *middle_metrics, last_metric = readings`
- Line 3: `target_name, *_ = profile`
- Line 4: `*_, final_status = status_history`
- Line 5: `x_coord, y_coord = y_coord, x_coord`

### Level 3: Velocity Sprint (Full runnable mini-block)
```python
# Target WPM: 45+ | Target Accuracy: 96%+
payload = [101, "Telemetry_OK", 24.5, 25.1, 26.0, "CHECKSUM_PASS"]

device_id, status, *temperatures, checksum = payload
print(f"Device: {device_id} | Status: {status}")
print(f"Core Readings: {temperatures} | Verified: {checksum}")
```

---

## 7. Python Code Studio Challenge & Auto-Grading (For PythonCodeStudio.jsx)

### Challenge Name: Satellite Telemetry Frame Deconstructor & Stream Parser

### Scenario
You are building an automated packet ingestion service for an orbital communications relay. Sensor logs arrive as variable-length telemetry packet lists:
`packet = [device_id, metric_1, metric_2, ..., metric_N, checksum_code]`

Depending on the sensor configuration, the number of internal metric readings varies from zero to dozens. Manually indexing through variable lengths with `len()` is brittle and leads to boundary bugs. You must implement a resilient unpacking parser function `parse_telemetry_packet(packet: list) -> dict` utilizing 1-to-1 destructuring, starred residual unpacking, and throwaway idioms.

### Specification & Rules
Implement `parse_telemetry_packet(packet: list) -> dict`:
1. **Input Validation**:
   - If `packet` is not an instantiated `list` or is completely empty (`[]`), return the default failure report:
     ```python
     {
         "valid": False,
         "device_id": None,
         "first_metric": None,
         "middle_metrics": [],
         "checksum": None
     }
     ```
2. **Length-Specific Unpacking Rules**:
   - **Case 1 (Single Element Packet, `len == 1`)**:
     - Extract `device_id` from `packet[0]`.
     - `first_metric = None`, `middle_metrics = []`, `checksum = None`.
   - **Case 2 (Two Element Packet, `len == 2`)**:
     - Use 1-to-1 destructuring: `device_id, checksum = packet`.
     - `first_metric = None`, `middle_metrics = []`.
   - **Case 3 (Three or More Elements, `len >= 3`)**:
     - Use extended unpacking to destructure the packet:
       `device_id, first_metric, *middle_metrics, checksum = packet`
3. **Return Schema**:
   Return a dictionary:
   ```python
   {
       "valid": True,
       "device_id": int or str,
       "first_metric": float or int or None,
       "middle_metrics": list,
       "checksum": int or str or None
   }
   ```

### Starter Code (Learner Canvas)
```python
def parse_telemetry_packet(packet: list) -> dict:
    # TODO: Implement sequence unpacking (1-to-1 and starred *)
    # to parse variable-length telemetry packets cleanly.
    pass
```

### Target Solution Code
```python
def parse_telemetry_packet(packet: list) -> dict:
    if not isinstance(packet, list) or not packet:
        return {
            "valid": False,
            "device_id": None,
            "first_metric": None,
            "middle_metrics": [],
            "checksum": None
        }

    length = len(packet)
    if length == 1:
        device_id = packet[0]
        first_metric = None
        middle_metrics = []
        checksum = None
    elif length == 2:
        device_id, checksum = packet
        first_metric = None
        middle_metrics = []
    else:
        device_id, first_metric, *middle_metrics, checksum = packet

    return {
        "valid": True,
        "device_id": device_id,
        "first_metric": first_metric,
        "middle_metrics": middle_metrics,
        "checksum": checksum
    }
```

### Real-Time AST & Diagnostic Checks (Static Lints)
- **Check 1 (Starred Unpacking Check)**: Inspect the AST to ensure an `ast.Starred` node exists in an assignment target (`ast.Assign`).
- **Check 2 (Tuple Destructuring Check)**: Verify that multi-variable assignment targets (e.g. `ast.Tuple` on the left-hand side) are utilized.
- **Check 3 (Single Star Limit)**: Ensure no assignment statement contains more than one starred expression.

### Automated Test Cases

#### Test Case 1 (Standard Telemetry Packet with Multiple Readings - Video Scenario)
- **Input**: `parse_telemetry_packet([101, 24.5, 25.0, 25.8, 999])`
- **Expected Output**:
  ```python
  {
      "valid": True,
      "device_id": 101,
      "first_metric": 24.5,
      "middle_metrics": [25.0, 25.8],
      "checksum": 999
  }
  ```
- **Assertion**:
  ```python
  res = parse_telemetry_packet([101, 24.5, 25.0, 25.8, 999])
  assert res["valid"] is True
  assert res["device_id"] == 101
  assert res["first_metric"] == 24.5
  assert res["middle_metrics"] == [25.0, 25.8]
  assert res["checksum"] == 999
  ```
- **Failure Feedback**: *"Failed standard extended unpacking on 5-element telemetry packet."*

#### Test Case 2 (3-Element Packet - Zero Middle Residuals Boundary)
- **Input**: `parse_telemetry_packet(["SAT_A", 18.0, "CRC_OK"])`
- **Expected Output**:
  ```python
  {
      "valid": True,
      "device_id": "SAT_A",
      "first_metric": 18.0,
      "middle_metrics": [],
      "checksum": "CRC_OK"
  }
  ```
- **Assertion**:
  ```python
  res = parse_telemetry_packet(["SAT_A", 18.0, "CRC_OK"])
  assert res["first_metric"] == 18.0
  assert res["middle_metrics"] == []
  assert res["checksum"] == "CRC_OK"
  ```
- **Failure Feedback**: *"When length is exactly 3, *middle_metrics must receive an empty list without error."*

#### Test Case 3 (Minimal 2-Element Header-Checksum Packet)
- **Input**: `parse_telemetry_packet([202, 500])`
- **Expected Output**:
  ```python
  {
      "valid": True,
      "device_id": 202,
      "first_metric": None,
      "middle_metrics": [],
      "checksum": 500
  }
  ```
- **Assertion**:
  ```python
  res = parse_telemetry_packet([202, 500])
  assert res["device_id"] == 202
  assert res["checksum"] == 500
  assert res["first_metric"] is None
  assert res["middle_metrics"] == []
  ```
- **Failure Feedback**: *"2-element packet must unpack device_id and checksum with None for metrics."*

#### Test Case 4 (Empty Packet Boundary Defense)
- **Input**: `parse_telemetry_packet([])`
- **Expected Output**:
  ```python
  {
      "valid": False,
      "device_id": None,
      "first_metric": None,
      "middle_metrics": [],
      "checksum": None
  }
  ```
- **Assertion**:
  ```python
  res = parse_telemetry_packet([])
  assert res["valid"] is False
  assert res["device_id"] is None
  ```
- **Failure Feedback**: *"Empty packet input must return valid=False report."*

### Progressive Hint Ladder
- **Hint 1 (Mental Model Clue)**: Remember the vacuum hopper! For packets with 3 or more elements, write: `device_id, first_metric, *middle_metrics, checksum = packet`.
- **Hint 2 (Structural Pseudocode)**:
  ```python
  if len(packet) >= 3:
      device_id, first_metric, *middle_metrics, checksum = packet
  elif len(packet) == 2:
      device_id, checksum = packet
  ```
- **Hint 3 (Syntax Unlock)**: The starred variable `*middle_metrics` automatically becomes a list holding all items between `first_metric` and `checksum`!

---

## 8. Conceptual Mastery Quiz (3 High-Yield Questions)

### Question 1: Behavior of Starred Unpacking on Zero Leftovers
Given `data = [10, 20]`, what will the variable `rest` contain after executing `first, second, *rest = data`?
- A) It raises a `ValueError: not enough values to unpack`.
- B) `rest` is assigned `None`.
- C) `rest` is assigned an empty list `[]`.
- D) `rest` raises a `NameError`.

**Correct Answer**: **C**
**Deep Explanation**:
In Python extended iterable unpacking, a starred variable captures all remaining unassigned elements. If the number of elements exactly matches the non-starred target variables, there are zero leftovers; Python gracefully binds the starred variable to an empty list `[]` rather than raising an error.

---

### Question 2: Syntax Rules Governing the Starred Target
Which of the following unpacking assignments is syntactically **illegal** in Python and will raise a compile-time `SyntaxError`?
- A) `first, *middle, last = [1, 2, 3, 4]`
- B) `*head, tail = [1, 2, 3, 4]`
- C) `*first, *second = [1, 2, 3, 4]`
- D) `first, *_ = [1, 2, 3, 4]`

**Correct Answer**: **C**
**Deep Explanation**:
Python grammar strictly allows **at most one starred expression** in an assignment target list (`SyntaxError: multiple starred expressions in assignment`). If multiple starred variables were permitted, Python could not deterministically decide how to divide the variable-length sequence between them.

---

### Question 3: The Atomic Variable Swap Invariant
How does Python execute `x, y = y, x` behind the scenes without losing either value?
- A) It creates a hidden operating system register that locks the variables.
- B) Python first packs the right-hand values into an anonymous tuple `(y, x)` in memory, and then immediately unpacks that tuple into the left-hand targets `x` and `y`.
- C) It converts both variables to string binary representations in the stack.
- D) It calls C-level `memcpy` directly on the GPU.

**Correct Answer**: **B**
**Deep Explanation**:
Python evaluates the entire right-hand side of an assignment before binding any left-hand variables. In `x, y = y, x`, Python first constructs a 2-element tuple containing the current values `(y, x)` in heap memory. Next, it performs sequence unpacking, binding `x` to the first tuple item (the old `y`) and `y` to the second tuple item (the old `x`). This atomic evaluation eliminates the need for temporary variables.
