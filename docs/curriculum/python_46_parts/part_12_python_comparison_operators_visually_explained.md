# Part 12: Python Comparison Operators (Visually Explained)
**Video URL**: https://www.youtube.com/watch?v=OZ7AinsDYVo
**Video ID**: `OZ7AinsDYVo`
**Curriculum Stage**: Stage 2 // Boolean Expressions & Relational Logic
**Concept Domain**: Relational Operators, Boolean Evaluation, Lexicographical Ordering, Chained Comparisons
**Target Skill Tier**: Syntax Apprentice
**Estimated Duration**: 07:07

---

## 1. Executive Summary & Pedagogical Goals

### The Core Problem
Novice programmers constantly stumble when bridging the gap between assignment and evaluation. They routinely confuse the single equals sign `=` (variable assignment) with double equals `==` (equality testing), leading to frustrating `SyntaxError` crashes. Furthermore, beginners often fail to recognize that comparisons are self-contained interrogative expressions that always resolve down to a single primitive Boolean data type (`True` or `False`), and they struggle to understand how chained range comparisons (e.g., `18 <= age <= 30`) evaluate left-to-right under the hood.

### The Visual Solution
The video demystifies comparison logic by visualizing every comparison as an interrogative engine: **`[ Value  Operator  Value ]`**. This construct acts as a question (`?`) that branches strictly into binary electrical states: **`True` (Neon Green)** or **`False` (Crimson Red)**. The visual sketch illustrates that Python automatically reduces whatever is on the left and right—whether literals (`3 > 2`), variables (`x < 2`), arithmetic expressions (`2 - 1 != 2`), or function invocations (`len("Hi") == 3`)—into resolved values before passing them to the operator. It then extends this model to chained comparisons, highlighting sequential left-to-right evaluation that mirrors SQL’s `BETWEEN` operator.

```
                     +-----------------------------------+
                     |   [ Value   Operator   Value ]    |
                     +-----------------+-----------------+
                                       |
                                       v
                                  ( Question )
                                     /    \
                                    /      \
                             [ True ]      [ False ]
```

### 3 Concrete Learning Outcomes
1. **Master the Six Relational Operators**: Correctly identify, construct, and evaluate equality (`==`), inequality (`!=`), strictly greater/lesser (`>`, `<`), and boundary-inclusive (`>=`, `<=`) expressions.
2. **Dissect Lexicographical & Type Sensitivities**: Predict Boolean outcomes when comparing strings alphabetically and explain why Python's case-sensitivity causes `"a" == "A"` to evaluate to `False`.
3. **Construct Clean Chained Range Queries**: Write and trace chained comparisons (e.g., `min_val <= val <= max_val`) without redundant logical operator bloat, understanding their short-circuit, left-to-right verification mechanics.

---

## 2. Visual Mental Model & Analogy (For `DynamicVisualStage.jsx`)

- **analogyType**: `machine`
- **Analogy Name**: The Dual-Caliper Relational Comparator Machine
- **Physical Metaphor**: Imagine an arcade inspection machine mounted over two conveyor hoppers. The machine has two laser calipers (Left Jaw and Right Jaw) and a swappable central Logic Core (`==`, `!=`, `<`, `>`, `<=`, `>=`). Incoming items (raw numbers, variable registers, arithmetic reduction gears, or function output tubes) drop onto the caliper plates. The machine closes its calipers, asks a binary interrogation question, and trips one of two signal lamps: an illuminated Emerald `True` beacon or an Amber-Red `False` reject gate. When running a chained comparison, two Comparator Machines lock in series, requiring an item to pass through both optical gates consecutively to receive a green clearance signal.

### Visual Scene Breakdown
- **Component A (Input Caliper Trays)**: Left and Right evaluation cradles. If an operand is complex (e.g., `2 - 1` or `len("Hi")`), an inline grinding gear reduces the operand into a single numeric pellet (`1` or `2`) before the calipers lock.
- **Component B (Swappable Logic Core)**: A neon-backlit relational cartridge inserted in the center (`==`, `!=`, `<`, `>`, `<=`, `>=`). When energized, it flashes the interrogative glyph `?`.
- **Component C (Dual-Beacon Relay & Passthrough)**:
  - Upper Green Beacon: Lit upon `True` resolution.
  - Lower Red Beacon: Lit upon `False` resolution.
  - Chained Extension Track: Links the output of Caliper 1 directly to Caliper 2 for multi-point range checking (`18 <= age <= 30`).

### State Machine Transitions
- `idle`: Both caliper trays are empty. The central cartridge slot glows dim gray with a question mark `?`. Both signal beacons remain unlit.
- `active / executing`: Operands drop into trays. Reduction gears compress expressions down to primitive values. Calipers slide inward to measure both sides while the operator core pulses cyan.
- `success`: The operator condition holds. The mechanism fires an emerald laser pulse upward, illuminating the `True` beacon with CRT phosphor bloom and chiming a high-pitch clearance chime.
- `error`: The condition evaluates to `False`, dropping a mechanical deflector gate and flashing the `False` warning lamp. If an assignment token `=` is mistakenly loaded into the comparator core, the engine sparks violently, halts the conveyor, and flashes `SyntaxError: expression cannot contain assignment`.

### ASCII / Diagrammatic Wireframe
```text
  ======================= RETROSPEED COMPARATOR STAGE =======================
  
      [ LEFT HOPPER ]                                    [ RIGHT HOPPER ]
   +-------------------+                              +--------------------+
   |  Expr: 2 - 1      |                              |  Literal: 2        |
   |  (Pre-Evaluation) |                              |  (Direct Pellet)   |
   +---------+---------+                              +---------+----------+
             | [Crush Gear: 2 - 1 => 1]                         |
             v                                                  v
     [ Caliper Tray A ]                             [ Caliper Tray B ]
    +------------------+     +------------------+  +-------------------+
    |     Value: 1     | <== |  RELATIONAL CORE | ==> |    Value: 2      |
    +------------------+     |       !=         |  +-------------------+
                             +--------+---------+
                                      |
                                      v
                             +------------------+
                             | Question Engine  |
                             | "Is 1 != 2 ?"    |
                             +--------+---------+
                                      |
                     +----------------+----------------+
                     |                                 |
                     v                                 v
          +----------------------+          +----------------------+
          |   [ BEACON: TRUE ]   |          |  [ BEACON: FALSE ]   |
          |  * EMERALD GLOW *    |          |    (De-energized)    |
          +----------------------+          +----------------------+
  ===========================================================================
```

---

## 3. Gamification Mechanics & Puzzle Design (For Game Loops & Challenges)

### Level Objective
**MISSION PROTOCOL: THE NEON BORDER CHECKPOINT**  
You are the Chief Gatekeeper of Core Memory Station 0x7F. Incoming data packets are attempting to cross system boundaries. Route 10 consecutive data packets through the Relational Comparator Gate by typing and evaluating comparison statements. Validate numeric ranges, filter corrupted string inputs, and ensure all system security bounds hold without triggering a single `SyntaxError` panic.

### Interactive Puzzle Mechanics
1. **The Dynamic Caliper Lock**: The player is presented with a left and right value (or expression). The player must type the exact operator (`==`, `!=`, `<`, `<=`, `>`, `>=`) within a countdown timer to match the required target state (`True` or `False`).
2. **Alphabetical Sorter**: Strings slide down the terminal conveyor. Players must evaluate character ASCII hierarchies (e.g., verifying if `"apple" < "banana"` or identifying that `"a" == "A"` evaluates to `False`).
3. **The Range Clamp (Chained Comparison)**: A numeric value (e.g., `player_age = 22`) sits in an inspection chamber. The player must type a single chained expression (e.g., `18 <= age <= 30`) to verify inclusion within the allowed system clearance band.

### Hazards & Anti-Patterns (The "Potholes")
- **The Single-Equals Sinkhole**: Typing `age = 18` inside an evaluation query instead of `age == 18`. Result: Conveyor jams instantly, spewing electrical sparks with a loud `SyntaxError` alarm buzzer.
- **The Case-Sensitivity Tripwire**: Assuming `"admin" == "Admin"`. In Python, lowercase characters have higher ASCII values than uppercase ones; failing to match exact casing diverts packets into the incinerator.
- **The Inverted Boundary Glitch**: Writing `18 >= age <= 30` instead of `18 <= age <= 30`. An inverted caliper causes immediate system logic failure and dumps your multiplier streak.

### Streak & Velocity Multipliers
- **10x Streak**: *Phosphor Overdrive* — The terminal font shifts to radiant neon green; keystroke audio switches from typewriter clicks to mechanical arcade switch thuds.
- **25x Streak**: *Laser Caliper Surge* — Sparks burst across the comparator caliper rails; evaluation latency drops to zero with instant Boolean feedback.
- **50x Streak**: *SYSTEM OVERSEER UNLOCKED* — Ambient synth-wave theme intensifies; terminal displays an animated CRT matrix banner: `[RELATIONAL ARCHITECT ACTIVE]`.

### Badge / Achievement Unlock
- **Badge ID**: `badge_comparator_sentinel`
- **Badge Name**: Comparator Sentinel
- **Criteria**: Complete 20 consecutive comparison evaluations without mistyping a single comparison operator, maintaining an average typing speed above 45 WPM with 100% accuracy on chained bounds.

---

## 4. Code Anatomy & Token Breakdown (For `PythonStepTeacher.jsx`)

### Canonical Code Snippet
```python
# Video 12 Demonstration: Relational Operators, Types, and Chaining
age = 20
is_eligible = 18 <= age <= 30
is_exact = 10 == 10
is_mismatch = "a" == "A"
```

### Token-by-Token Dissection Table

| Token | Syntax Category | Hex Color | Deep Explanation |
| :--- | :--- | :--- | :--- |
| `age` | Identifier / Variable | `#48B89F` | Memory pointer registered in local symbol table pointing to the integer object `20`. |
| `=` | Assignment Operator | `#C3A6E8` | Allocates or points the identifier on the left to the evaluated memory object on the right. Must never be confused with `==`. |
| `20` | Numeric Literal (`int`) | `#F6C445` | Primitive integer object containing value `20` instantiated in memory. |
| `is_eligible` | Identifier / Variable | `#48B89F` | Boolean target variable allocated to store the outcome of the chained evaluation. |
| `18` | Numeric Literal (`int`) | `#F6C445` | Lower boundary constant representing minimum inclusive qualification threshold. |
| `<=` | Relational Operator | `#C3A6E8` | Less-than-or-equal-to comparison. Tests if left operand is smaller than or identical to right operand. |
| `age` | Identifier / Variable | `#48B89F` | Central operand evaluated against both left boundary (`18`) and right boundary (`30`). |
| `<=` | Relational Operator | `#C3A6E8` | Second chained comparison operator. Executed sequentially left-to-right. |
| `30` | Numeric Literal (`int`) | `#F6C445` | Upper boundary constant representing maximum inclusive threshold. |
| `is_exact` | Identifier / Variable | `#48B89F` | Target identifier storing the truth state of the equality test. |
| `10` | Numeric Literal (`int`) | `#F6C445` | Left operand literal for the numeric equality check. |
| `==` | Equality Operator | `#C3A6E8` | Relational equality operator. Asks Python: "Do these two operands evaluate to identical values?" Returns `True` or `False`. |
| `10` | Numeric Literal (`int`) | `#F6C445` | Right operand literal for the numeric equality check. |
| `is_mismatch` | Identifier / Variable | `#48B89F` | Target identifier capturing character case evaluation result. |
| `"a"` | String Literal (`str`) | `#F28B82` | String object containing lowercase 'a' (ASCII integer value 97). |
| `==` | Equality Operator | `#C3A6E8` | Relational equality comparison between two string entities. |
| `"A"` | String Literal (`str`) | `#F28B82` | String object containing uppercase 'A' (ASCII integer value 65). Case difference guarantees inequality. |

### Coach Byte's Conversational Guide
- **Opening Hook**: *"Hey friends! Welcome back! Today we are looking at Python’s decision engine. Every smart application—from a high-frequency trading bot to a retro arcade game loop—needs to make decisions. But how does Python decide? It doesn't use magic; it asks simple yes-or-no questions using comparison operators!"*
- **The Secret Insight**: *"Here is the golden rule: A comparison operator doesn't change data; it inspects data. Python evaluates both sides completely first. It turns `2 - 1` into `1` before asking if it equals `2`. And when you chain comparisons like `18 <= age <= 30`, Python doesn't collapse `18 <= age` into `True` and then test `True <= 30` like other broken languages! It acts like a sleek SQL `BETWEEN` query, checking `18 <= age` and then `age <= 30` seamlessly."*
- **Pro Tip**: *"Never ever type `if x = 5:`! That single equal sign is the Assignment Operator—it stamps values into memory. If you put it where Python expects a comparison, Python will throw a `SyntaxError: expression cannot contain assignment, perhaps you meant '=='?`. Always remember: One `=` assigns, Two `==` compares!"*

---

## 5. Execution Simulation Trace (Step-by-Step State Machine)

Let us simulate the execution of the full code script demonstrated across the video:

```python
1: x = 5
2: check_val = x < 2
3: expr_check = (2 - 1) != 2
4: func_check = len("Hi") == 3
5: age = 20
6: in_range = 18 <= age <= 30
7: str_check = "a" == "A"
```

| Step | Line # | Interpreter Action | Memory / RAM State (`vars`) | Terminal `stdout` | Visual Particle FX |
| :---: | :---: | :--- | :--- | :--- | :--- |
| **01** | `L1` | Allocates integer `5` and binds name `x`. | `{'x': 5}` | `""` | Cyan memory cell lights up |
| **02** | `L2` | Evaluates `x < 2` -> `5 < 2` -> `False`. Binds to `check_val`. | `{'x': 5, 'check_val': False}` | `""` | Crimson Red phosphor flicker |
| **03** | `L3` | Evaluates `(2 - 1)` -> `1`. Compares `1 != 2` -> `True`. Binds to `expr_check`. | `{'x': 5, 'check_val': False, 'expr_check': True}` | `""` | Emerald Green laser chime |
| **04** | `L4` | Calls `len("Hi")` -> `2`. Compares `2 == 3` -> `False`. Binds to `func_check`. | `{'x': 5, 'check_val': False, 'expr_check': True, 'func_check': False}` | `""` | Red caliper shutter drop |
| **05** | `L5` | Allocates integer `20` and binds identifier `age`. | `{'...': '...', 'age': 20}` | `""` | Cyan memory allocation pulse |
| **06** | `L6` | Evaluates chained comparison: `18 <= 20` (`True`) and `20 <= 30` (`True`). Entire chain -> `True`. | `{'...': '...', 'in_range': True}` | `""` | Dual Green beacon burst |
| **07** | `L7` | Compares ASCII `"a"` (97) with `"A"` (65). Evaluates to `False`. Binds to `str_check`. | `{'...': '...', 'str_check': False}` | `""` | Warning pulse on case mismatch |

---

## 6. Muscle-Memory Typing Drills (For RETROSPEED Typing Stage)

### Level 1: Syntax & Operator Micro-Drill
*Focus: Master the exact shift keys, equal sequences, exclamation points, and angle brackets on the home row.*

- Drill 1: `== != < > <= >= == != < > <= >= == !=`
- Drill 2: `10 == 10; 10 != 10; 7 > 3; 3 < 7; 7 >= 7; 7 <= 7`
- Drill 3: `x == y; x != y; "a" < "b"; "a" == "A"; len("Hi") == 2`

### Level 2: Line Construction Drill
*Focus: Standard Python comparison statements (< 65 chars/line, rhythmic cadence).*

- Line 1: `is_same = 10 == 10`
- Line 2: `is_different = 10 != 10`
- Line 3: `is_greater = 7 >= 3`
- Line 4: `is_valid_range = 18 <= age <= 30`
- Line 5: `is_case_match = "alpha" == "Alpha"`
- Line 6: `is_expr_true = (2 - 1) != 2`

### Level 3: Velocity Sprint
*Target WPM: 48+ | Target Accuracy: 97%+*

```python
# System Validation Pipeline
min_limit = 18
max_limit = 30
user_age = 25
in_bounds = min_limit <= user_age <= max_limit
is_equal = 100 == 100
is_mismatch = "root" == "Root"
```

---

## 7. Python Code Studio Challenge & Auto-Grading (For `PythonCodeStudio.jsx`)

### Challenge Name
**Security Clearance Gate: The Access Control Matrix**

### Scenario
You are developing the entrance gate protocol for a secure data bunker. Each incoming user profile contains an `age` (`int`), a security `clearance_code` (`str`), and an active `session_id` length. 

You must write a function `evaluate_access(age, clearance_code, token_str)` that executes three strict relational checks:
1. **Age Range Verification**: The user’s age must be between `18` and `65`, inclusive. Use a **chained comparison** (`min <= age <= max`).
2. **Clearance Code Exact Match**: The `clearance_code` must match the system master key `"ALPHA-KEY"`. Remember that Python string comparisons are case-sensitive!
3. **Token Integrity Check**: The length of the `token_str` must not equal `0` (`len(token_str) != 0`).

The function should return a dictionary summarizing the three Boolean outcomes and a final overall access flag.

### Starter Code (Learner Canvas)
```python
def evaluate_access(age: int, clearance_code: str, token_str: str) -> dict:
    # TODO: Perform the comparison checks using comparison operators
    # 1. Check if age is between 18 and 65 inclusive (use chained comparison)
    # 2. Check if clearance_code is exactly equal to "ALPHA-KEY"
    # 3. Check if length of token_str is not equal to 0
    
    age_ok = None
    code_ok = None
    token_ok = None
    access_granted = None
    
    return {
        "age_ok": age_ok,
        "code_ok": code_ok,
        "token_ok": token_ok,
        "access_granted": access_granted
    }
```

### Target Solution Code
```python
def evaluate_access(age: int, clearance_code: str, token_str: str) -> dict:
    # Step 1: Chained range comparison
    age_ok = 18 <= age <= 65
    
    # Step 2: Exact string comparison (case-sensitive)
    code_ok = clearance_code == "ALPHA-KEY"
    
    # Step 3: Expression and function return comparison
    token_ok = len(token_str) != 0
    
    # Composite authorization evaluation
    access_granted = age_ok and code_ok and token_ok
    
    return {
        "age_ok": age_ok,
        "code_ok": code_ok,
        "token_ok": token_ok,
        "access_granted": access_granted
    }
```

### Real-Time AST & Diagnostic Checks (Static Lints)
- **Check 1 (No Single Equals in Conditions)**: Inspect the AST to ensure no `Assign` nodes are mistakenly placed inside expressions. Enforce usage of `Compare` nodes.
- **Check 2 (Chained Comparison Verification)**: Verify that the comparison for `age` contains multiple comparators (`ops=[LtE(), LtE()]`) demonstrating the canonical chained comparison syntax taught in the video.
- **Check 3 (Function Signature Integrity)**: Verify that `evaluate_access` accepts three parameters and returns a dictionary with keys `'age_ok'`, `'code_ok'`, `'token_ok'`, `'access_granted'`.

### Automated Test Cases (Using `python-testing-patterns`)

#### Test Case 1 (Basic Clearance - All Valid)
- **Input**: `evaluate_access(25, "ALPHA-KEY", "token_99x")`
- **Expected Output**:
  ```python
  {
      "age_ok": True,
      "code_ok": True,
      "token_ok": True,
      "access_granted": True
  }
  ```
- **Assertion**:
  ```python
  res = evaluate_access(25, "ALPHA-KEY", "token_99x")
  assert res["access_granted"] is True
  assert res["age_ok"] is True
  ```
- **Failure Feedback**: *"Clearance failed for standard valid input. Check your comparison operators."*

#### Test Case 2 (Edge Case - Case Sensitivity & Empty Token)
- **Input**: `evaluate_access(30, "alpha-key", "")`
- **Expected Output**:
  ```python
  {
      "age_ok": True,
      "code_ok": False,
      "token_ok": False,
      "access_granted": False
  }
  ```
- **Assertion**:
  ```python
  res = evaluate_access(30, "alpha-key", "")
  assert res["code_ok"] is False, "Clearance code must be case sensitive! 'alpha-key' != 'ALPHA-KEY'"
  assert res["token_ok"] is False, "Empty token should evaluate len != 0 to False"
  assert res["access_granted"] is False
  ```
- **Failure Feedback**: *"Python comparisons are strictly case-sensitive. Lowercase 'alpha' does not equal uppercase 'ALPHA'."*

#### Test Case 3 (Boundary Limits - Inclusive Bounds)
- **Input 3A**: `evaluate_access(18, "ALPHA-KEY", "valid_tok")`
- **Input 3B**: `evaluate_access(65, "ALPHA-KEY", "valid_tok")`
- **Input 3C**: `evaluate_access(17, "ALPHA-KEY", "valid_tok")`
- **Assertion**:
  ```python
  assert evaluate_access(18, "ALPHA-KEY", "valid_tok")["age_ok"] is True, "Boundary 18 must be inclusive (<=)."
  assert evaluate_access(65, "ALPHA-KEY", "valid_tok")["age_ok"] is True, "Boundary 65 must be inclusive (<=)."
  assert evaluate_access(17, "ALPHA-KEY", "valid_tok")["age_ok"] is False, "17 is outside the valid range."
  ```
- **Failure Feedback**: *"Check your boundary operators! Remember to use `<=` and not strictly `<`."*

### Progressive Hint Ladder
- **Hint 1 (Mental Model Clue)**: *"Think of the comparator calipers. For age, place `18` on the far left, `age` in the middle, and `65` on the far right using `<=` on both sides: `18 <= age <= 65`."*
- **Hint 2 (Structural Pseudocode)**:
  ```text
  age_ok = 18 <= age <= 65
  code_ok = clearance_code == "ALPHA-KEY"
  token_ok = len(token_str) != 0
  access_granted = age_ok and code_ok and token_ok
  ```
- **Hint 3 (Syntax Unlock)**: *"Make sure you use double equals `==` to compare the strings: `clearance_code == 'ALPHA-KEY'`. If you use a single `=`, Python thinks you are assigning a variable inside an expression and will fail!"*

---

## 8. Conceptual Mastery Quiz (3 High-Yield Questions)

### Question 1: [Operator Identity & Syntax Core]
What is the fundamental difference between the `=` symbol and the `==` symbol in Python?
- A) `=` compares whether two variables share the same type, while `==` compares their values.
- B) `=` assigns a value to a variable, while `==` asks whether two values are equal and returns a Boolean (`True` or `False`).
- C) `=` is used for comparing numbers, while `==` is reserved exclusively for comparing strings.
- D) `=` checks if two objects are stored in the same memory slot, while `==` evaluates chained inequalities.
- **Correct Answer**: **B**
- **Deep Explanation**: In Python, `=` is the **assignment statement operator**. It binds an identifier on the left to an object in memory on the right. In contrast, `==` is the **relational equality operator**. It acts as an interrogative expression comparing values and evaluating strictly to `True` or `False`. Writing `x = 10` inside a condition causes a `SyntaxError`.

---

### Question 2: [String Comparison & Case Sensitivity]
Consider the following interactive Python terminal session:
```python
result_1 = "apple" < "banana"
result_2 = "Cat" == "cat"
result_3 = "a" > "A"
```
What are the resolved values of `result_1`, `result_2`, and `result_3`?
- A) `result_1 = True`, `result_2 = False`, `result_3 = True`
- B) `result_1 = False`, `result_2 = True`, `result_3 = False`
- C) `result_1 = True`, `result_2 = True`, `result_3 = False`
- D) `result_1 = True`, `result_2 = False`, `result_3 = False`
- **Correct Answer**: **A**
- **Deep Explanation**:
  1. `result_1`: Strings are compared lexicographically (alphabetical order based on ASCII/Unicode codes). Since `'a'` (ASCII 97) comes before `'b'` (ASCII 98), `"apple" < "banana"` is `True`.
  2. `result_2`: Python is strictly case-sensitive. `'C'` (ASCII 67) does not match `'c'` (ASCII 99), so `"Cat" == "cat"` is `False`.
  3. `result_3`: In the ASCII character table, uppercase letters (`'A'` = 65) appear before lowercase letters (`'a'` = 97). Because 97 > 65, the condition `"a" > "A"` evaluates to `True`.

---

### Question 3: [Chained Comparison Evaluation Order]
What will the following code snippet print?
```python
val = 4
result = 5 < val < 6
print(result)
```
- A) `True` (because 4 is less than 6)
- B) `False` (because 5 is not less than 4)
- C) `TypeError` (because chained comparisons are illegal in Python)
- D) `1` (because `5 < 4` converts to `0`, and `0 < 6` evaluates to `1`)
- **Correct Answer**: **B**
- **Deep Explanation**: In Python, chained comparisons evaluate sequentially from left to right. The expression `5 < val < 6` expands logically to `(5 < val) and (val < 6)`.
Python first evaluates the leftmost pair: `5 < 4`. This evaluates to `False`. Because the first link in the chain is false, Python short-circuits and immediately resolves the entire expression to `False`. Unlike C or JavaScript, Python does *not* evaluate `(5 < 4)` to `0` and then compare `0 < 6` (which would produce an erroneous `True`). Every link in Python's chained comparison must be satisfied.
