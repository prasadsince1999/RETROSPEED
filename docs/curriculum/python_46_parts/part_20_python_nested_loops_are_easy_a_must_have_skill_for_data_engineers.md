# Part 20: Python Nested Loops are Easy | A Must-Have Skill for Data Engineers
**Video URL**: https://www.youtube.com/watch?v=ck1AzCDs0ss&list=PLNcg_FV9n7qZGfFl2ANI_zISzNp257Lwn
**Video ID**: `ck1AzCDs0ss`
**Curriculum Stage**: Stage 4 // Iteration & Sequential Processing
**Concept Domain**: Multidimensional Iteration, The Inner-Outer Loop Cycle, Cartesian Products & Hierarchical Data Pipelines
**Target Skill Tier**: Code Pilot / System Architect
**Estimated Duration**: 16:43

---

## 1. Executive Summary & Pedagogical Goals

### The Core Problem
Beginner programmers frequently struggle to construct and predict the behavior of **nested loops** (a loop defined inside another loop). When encountering nested iteration, learners stumble into three severe cognitive and operational pitfalls:
1. **The Lockstep Synchronization Myth**: Novices intuitively assume that nested loops advance in lockstep—expecting the outer and inner loops to tick simultaneously like two parallel conveyor belts (e.g., pairing item 0 with item 0, then item 1 with item 1). They fail to realize that **for each single iteration of the outer loop, the inner loop executes completely from start to finish**.
2. **The Multiplicative Complexity Explosion ($O(N \times M)$)**: Beginners fail to anticipate how quickly iteration counts scale. Nesting a loop of 1,000 items inside another loop of 1,000 items produces $1,000,000$ iterations. In data engineering, applying nested loops blindly over large datasets leads to catastrophic CPU spikes, memory saturation, and pipeline deadlocks.
3. **The Indentation & Variable Shadowing Trap**: Beginners frequently reuse the same loop variable name for both outer and inner loops (e.g., `for i in list1:` followed by `for i in list2:`), overwriting the outer iterator reference. Furthermore, misplacing an accumulator or print statement by a single 4-space indentation level leads to silent algorithmic bugs where operations execute either too often or not often enough.

### The Visual Solution
Baraa visually deconstructs nested loops into an asymmetric **Outer Cycle vs. Inner Cycle** execution architecture:
- **The Planetary Orbit / Clock Metaphor**: The outer loop is the **Hour Hand**; the inner loop is the **Minute Hand**. The minute hand must complete a full $360^\circ$ revolution (exhausting all minutes) before the hour hand advances by a single tick.
- **The Iterator Lifecycle Under the Hood**:
  1. Python instantiates an iterator for the outer loop and fetches the first element.
  2. Python enters the outer loop suite and encounters the inner `for` statement.
  3. Python instantiates a **brand-new iterator** for the inner loop and cycles through all inner elements until raising `StopIteration`.
  4. The inner loop terminates; Python returns to the head of the outer loop and fetches the next outer element.
  5. Python restarts the inner loop from scratch with another fresh iterator!
- **The Two Core Data Engineering Workhorses**:
  1. **Cartesian Products & Data Pairing**: Combining every element from set $A$ with every element from set $B$ (e.g., pairing colors `['red', 'blue', 'green']` with sizes `['S', 'M', 'L']` to generate an e-commerce catalog).
  2. **Hierarchical Drill-Down**: Navigating multi-level structural hierarchies:
     - **Temporal Drill-Down**: `years` $\rightarrow$ `months` $\rightarrow$ `days` (generating automated partition paths like `report_2026_Jan_01.csv`).
     - **Database Schema Drill-Down**: `database` $\rightarrow$ `tables` $\rightarrow$ `columns` (generating dynamic automated SQL quality-audit queries for `NULL` checks across production tables).
     - **Cloud Storage Drill-Down**: `storage containers/buckets` $\rightarrow$ `directories/partitions` $\rightarrow$ `data files`.

```
========================= NESTED LOOP EXECUTION LIFECYCLE =========================

  [ OUTER ITERATOR ] (e.g., Tables: ['users', 'orders'])
          │
          ├─► Outer Step 1: table = 'users'
          │       │
          │       ▼
          │   [ INNER ITERATOR CREATED ] (e.g., Columns: ['id', 'status'])
          │       │
          │       ├─► Inner Step 1.1: column = 'id'     ──► Executes Suite (users, id)
          │       ├─► Inner Step 1.2: column = 'status' ──► Executes Suite (users, status)
          │       ▼
          │   [ INNER ITERATOR EXHAUSTED (StopIteration) ]
          │
          ├─► Outer Step 2: table = 'orders'
          │       │
          │       ▼
          │   [ FRESH INNER ITERATOR RE-CREATED ]
          │       │
          │       ├─► Inner Step 2.1: column = 'id'     ──► Executes Suite (orders, id)
          │       ├─► Inner Step 2.2: column = 'status' ──► Executes Suite (orders, status)
          │       ▼
          │   [ INNER ITERATOR EXHAUSTED (StopIteration) ]
          │
          ▼
  [ OUTER ITERATOR EXHAUSTED ] ──► Program Proceeds to Subsequent Statements
===================================================================================
```

### 3 Concrete Learning Outcomes
1. **Trace Asymmetric Multidimensional Execution**: Predict with 100% accuracy the exact order of variable assignments and terminal output in nested 2D and 3D iteration loops ($N \times M$ and $N \times M \times K$).
2. **Synthesize Cartesian Data Matrices**: Build clean, bug-free data pairing algorithms that cross multiple independent lists without manual index pointers or duplicate iterations.
3. **Architect Metadata-Driven Data Pipelines**: Construct dynamic SQL generators and directory crawlers that traverse real-world enterprise hierarchies (tables $\rightarrow$ columns, folders $\rightarrow$ files) to automate repetitive data engineering workflows.

---

## 2. Visual Mental Model & Analogy (For DynamicVisualStage.jsx)

- **analogyType**: `conveyor`
- **Analogy Name**: "The Multi-Tier Warehouse Carousel & 2D Coordinate Grid Matrix"
- **Physical Metaphor**:
  Imagine an automated logistics warehouse containing a dual-axis robotic retrieval gantry:
  - **The Gantry Rail (Outer Loop)**: A heavy master carriage that moves horizontally along the warehouse floor, stopping in front of each **Aisle** (`Aisle 0, Aisle 1, Aisle 2`).
  - **The Shuttle Mast (Inner Loop)**: A high-speed vertical robotic elevator mounted on the gantry carriage. When the gantry stops at an aisle, the gantry locks its magnetic brakes in place. The vertical shuttle then climbs and scans every individual **Shelf Bin** (`Shelf A, Shelf B, Shelf C`) from bottom to top.
  - **The Mechanical Rule**: The gantry crane *cannot move to the next aisle* until the vertical shuttle has completely scanned every single bin on the active rack. Once the shuttle finishes the top bin, it resets back to the bottom, the gantry advances to the next aisle, and the shuttle performs its entire vertical climb all over again.
  - If the warehouse has 3 aisles and 3 shelves per aisle, the scanner fires $3 \times 3 = 9$ times.

```
+=================================================================================+
|            WAREHOUSE GANTRY & 2D COORDINATE GRID LATTICE (conveyor)             |
+=================================================================================+
|                                                                                 |
|   OUTER AXIS (Gantry / Tables):                                                 |
|   [ Aisle 0: 'customers' ]    [ Aisle 1: 'orders' ]    [ Aisle 2: 'products' ]  |
|            │ (LOCKED)                                                           |
|            ▼                                                                    |
|   INNER AXIS (Vertical Shuttle / Columns):                                      |
|   ┌─────────────────────────────────────────────────────────────┐               |
|   │  ▲ [Shelf 2: 'email' ]  ──► Executes Query ('customers', 'email')           |
|   │  │ [Shelf 1: 'name'  ]  ──► Executes Query ('customers', 'name')            |
|   │  │ [Shelf 0: 'id'    ]  ──► Executes Query ('customers', 'id')              |
|   │  Shuttle sweeps 0 -> 1 -> 2 to top, then resets to bottom.  │               |
|   └─────────────────────────────────────────────────────────────┘               |
|            │                                                                    |
|            ▼ (Inner Exhausted: Shuttle Resets)                                  |
|   Gantry rolls to [ Aisle 1: 'orders' ] ──► Shuttle climbs Shelves 0, 1, 2      |
+=================================================================================+
```

### Visual Scene Breakdown
- **Component A (The Gantry Carriage / Outer Loop)**: Heavy horizontal track on the factory floor labeled `for x in outer_list:`. When an outer item is active, an industrial yellow spotlight illuminates the current aisle index.
- **Component B (The Vertical Shuttle / Inner Loop)**: Motorized platform traveling vertically along the gantry mast labeled `for y in inner_list:`. Glowing cyan laser line scans each bin item in rapid succession.
- **Component C (The Dual-Coordinate Terminal HUD)**: A green phosphor CRT terminal displaying the live Cartesian coordinate readout: `Active Item: (outer[x], inner[y]) | Matrix Cell [x][y] | Total Iterations: N * M`.

### State Machine Transitions
- `idle`: Gantry and vertical shuttle centered at origin `(0, 0)`; amber neon standby illumination.
- `outer_advance`: Gantry rolls to next aisle station; outer variable indicator updates; magnetic lock engages with a mechanical clunk.
- `inner_cycling`: Vertical shuttle accelerates up the mast, scanning items one by one; CRT terminal emits laser pulse audio and logs dynamic output string.
- `inner_exhausted`: Shuttle hits top limit switch; resets to base station in a rapid glide; triggers outer gantry release.
- `success / matrix_complete`: All aisles and shelves fully scanned; CRT terminal flashes green matrix raster effect; celebratory retro synth chord triggers.

---

## 3. Gamification Mechanics & Puzzle Design (For Game Loops & Challenges)

- **Level Objective**:
  Assume the role of Lead Data Architect at Nebula Cloud Logistics. An automated data warehouse migration requires auditing hundreds of incoming staging tables for missing data and generating clean product catalog SKUs. You must construct nested iteration engines that traverse multi-dimensional data grids with zero syntax leaks and zero variable shadowing.
- **Interactive Puzzle Mechanics**:
  - **The Matrix Visualizer**: Typing nested loops renders a real-time 2D grid matrix on screen. Keystrokes light up grid cells in row-major order `(row, col)`.
  - **Complexity Gauge ($O(N \times M)$)**: A live dial indicates total computational operations. Learners see the counter calculate $3 \times 2 = 6$ operations in real time.
  - **Shadowing Interceptor**: If the learner accidentally reuses a loop variable name (e.g. `for item in batch: for item in sub_batch:`), Coach Byte activates an emergency warning beacon: *"Variable Collision Detected: Inner variable shadows outer iterator!"*
- **Hazards & Anti-Patterns (The "Potholes")**:
  - *The Lockstep Illusion*: Writing `for x, y in list1, list2:` expecting element-wise iteration (which requires `zip()`, not nested loops).
  - *The Inner Accumulator Reset Bug*: Initializing a list or total inside the inner loop when it should accumulate across the outer loop (or vice versa, failing to reset per-row aggregates).
  - *The Cartesian Time-Bomb*: Nesting 3 or 4 loops deeply without filtering, causing exponential execution time $O(N^k)$.
- **Streak & Velocity Multipliers**:
  - **10x Streak**: ⚡ "Grid Sync" — 1.5x XP Boost; scanner beam switches from amber to electric cyan.
  - **25x Streak**: 🔥 "Lattice Runner" — 2.0x XP Boost; laser scanlines emit retro hum audio on each row completion.
  - **50x Streak**: 🏆 "System Architect" — 3.0x XP Boost; unlocks the "Master of Dimensions" title.
- **Badge / Achievement Unlock**:
  - **Badge ID**: `badge_part_20`
  - **Badge Name**: Matrix Navigator
  - **Criteria**: Complete all 3 typing drill tiers and successfully implement the automated metadata SQL auditor challenge with 100% test pass rate at 45+ WPM.

---

## 4. Code Anatomy & Token Breakdown (For PythonStepTeacher.jsx)

### Canonical Code Snippet
```python
# Production Data Engineering Pattern: Dynamic Metadata Audit Query Generator
tables = ["customers", "orders", "products"]
columns = ["id", "create_date"]

for table in tables:
    for column in columns:
        query = f"SELECT COUNT(*) FROM {table} WHERE {column} IS NULL;"
        print(query)
```

### Token-by-Token Dissection Table

| Token | Syntax Category | Hex Color | Deep Explanation |
| :--- | :--- | :--- | :--- |
| `tables` | Identifier | `#48B89F` | Outer collection variable holding the list of target database table names. |
| `columns` | Identifier | `#48B89F` | Inner collection variable holding the audit column attributes to check. |
| `for` (Outer) | Keyword (Iteration) | `#C3A6E8` | Requests an iterator over `tables`; establishes the outer loop boundary. |
| `table` | Identifier (Loop Var) | `#48B89F` | Outer loop variable bound to the current table string for the duration of the inner loop. |
| `:` (Outer) | Delimiter | `#FFFFFF` | Colon header opening the outer loop block suite (indented by 4 spaces). |
| `for` (Inner) | Keyword (Iteration) | `#C3A6E8` | **The Nested Engine.** Instantiates a brand-new iterator over `columns` for every outer tick. |
| `column` | Identifier (Loop Var) | `#48B89F` | Inner loop variable updated on each sub-cycle while `table` remains stationary. |
| `:` (Inner) | Delimiter | `#FFFFFF` | Colon header opening the inner loop body (indented by 8 spaces). |
| `query =` | Variable Assignment | `#F6C445` | Dynamically formats a SQL query string combining the active `table` and `column`. |
| `f"..."` | Format String Literal | `#F28B82` | Interpolates `{table}` and `{column}` into a parameterized SQL statement. |
| `print(query)` | Built-in Function Call| `#48B89F` | Emits the assembled query string to standard output (`stdout`). |

### Coach Byte's Conversational Guide
- **Opening Hook**: *"Hey friends! Welcome to Part 20! Today we explore one of the most powerful patterns in modern data engineering: nested loops! A lot of beginners find them confusing, but I promise you, once you visualize the hour hand and minute hand, nested loops are easy!"*
- **The Secret Insight**: *"Here is the golden rule: Python executes from the inside out! For every single step of your outer loop, the inner loop runs completely from start to finish! If your outer list has 3 tables and your inner list has 2 columns, that inner code will run exactly 3 times 2 = 6 times!"*
- **Pro Tip**: *"In real data engineering, we use this constantly to build metadata-driven pipelines. Don't write 50 SQL queries by hand! Store your table and column names in lists, wrap them in a nested loop, and let Python generate and execute your queries automatically!"*

---

## 5. Execution Simulation Trace (Step-by-Step State Machine)

Given `tables = ["users", "orders"]` and `columns = ["id", "status"]`:

| Step | Line # | Interpreter Action | Memory State (`vars`) | Terminal `stdout` | Visual Particle FX |
| :---: | :---: | :--- | :--- | :--- | :--- |
| 1 | L2-3 | Allocate `tables` (size 2) and `columns` (size 2) | `tables=['users', 'orders'], columns=['id', 'status']` | `""` | Gantry rail & shuttle initialize |
| 2 | L5 | Outer Loop starts: fetch index 0 from `tables` | `table='users'` | `""` | Gantry rolls to Aisle 0 ('users') |
| 3 | L6 | Inner Loop starts: create fresh iterator over `columns` | `table='users', column='id'` | `""` | Shuttle scans Shelf 0 ('id') |
| 4 | L7-8 | Format string and print SQL query | `query='SELECT COUNT(*) FROM users WHERE id IS NULL;'` | `"SELECT COUNT(*) FROM users WHERE id IS NULL;"` | CRT terminal flashes cyan text |
| 5 | L6 | Inner Loop ticks: fetch index 1 from `columns` | `table='users', column='status'` | `""` | Shuttle climbs to Shelf 1 ('status') |
| 6 | L7-8 | Format string and print SQL query | `query='SELECT COUNT(*) FROM users WHERE status IS NULL;'` | `"SELECT COUNT(*) FROM users WHERE status IS NULL;"` | CRT terminal flashes cyan text |
| 7 | L6 | Inner Loop exhausts: `StopIteration` raised | `table='users'` | `""` | Shuttle resets to base station |
| 8 | L5 | Outer Loop advances: fetch index 1 from `tables` | `table='orders'` | `""` | Gantry rolls to Aisle 1 ('orders') |
| 9 | L6 | Inner Loop restarts: create fresh iterator over `columns` | `table='orders', column='id'` | `""` | Shuttle scans Shelf 0 ('id') again |
| 10 | L7-8 | Format string and print SQL query | `query='SELECT COUNT(*) FROM orders WHERE id IS NULL;'` | `"SELECT COUNT(*) FROM orders WHERE id IS NULL;"` | CRT terminal flashes cyan text |
| 11 | L6 | Inner Loop ticks: fetch index 1 from `columns` | `table='orders', column='status'` | `""` | Shuttle climbs to Shelf 1 ('status') |
| 12 | L7-8 | Format string and print SQL query | `query='SELECT COUNT(*) FROM orders WHERE status IS NULL;'` | `"SELECT COUNT(*) FROM orders WHERE status IS NULL;"` | CRT terminal flashes cyan text |
| 13 | L6 | Inner Loop exhausts: `StopIteration` raised | `table='orders'` | `""` | Shuttle resets to base station |
| 14 | L5 | Outer Loop exhausts: `StopIteration` raised | `tables, columns, table, column, query` | `""` | Gantry locks; celebration particle burst |

---

## 6. Muscle-Memory Typing Drills (For RETROSPEED Typing Stage)

### Level 1: Syntax & Operator Micro-Drill
*Calibrated for nested 4-space and 8-space indentation, colon delimiters, and loop variables.*
- Drill 1: `for x in range(3): for y in range(2): print(x, y)`
- Drill 2: `for row in matrix: for val in row: sum_val += val`
- Drill 3: `for color in colors: for size in sizes: print(color, size)`
- Drill 4: `for t in tables: for c in cols: query = f"{t}.{c}"`
- Drill 5: `for y in years: for m in months: for d in days: pass`

### Level 2: Line Construction Drill (Home-Row & Rhythm calibrated, < 65 chars/line)
- Line 1: `for table in tables:`
- Line 2: `    for column in columns:`
- Line 3: `        query = f"SELECT {column} FROM {table}"`
- Line 4: `        queries.append(query)`
- Line 5: `for x in range(rows):`
- Line 6: `    for y in range(cols):`
- Line 7: `        grid[x][y] = 0`

### Level 3: Velocity Sprint (Full runnable mini-block)
```python
# Target WPM: 45+ | Target Accuracy: 96%+
colors = ["red", "blue"]
sizes = ["S", "M", "L"]

catalog = []
for color in colors:
    for size in sizes:
        sku = f"{color.upper()}-{size}"
        catalog.append(sku)

print(f"Generated {len(catalog)} SKUs: {catalog}")
```

---

## 7. Python Code Studio Challenge & Auto-Grading (For PythonCodeStudio.jsx)

### Challenge Name: Automated Lakehouse Data Quality Auditor & Query Generator

### Scenario
You are building an automated ingestion and quality verification engine for an enterprise Cloud Lakehouse. Before new data partitions can be merged into production, the pipeline must verify that critical primary keys and timestamp columns contain zero `NULL` entries across all affected tables.

Manually writing separate SQL validation queries for every table and column combination is brittle and violates the `DRY` (Don't Repeat Yourself) principle. You must implement a metadata-driven query generator function `generate_audit_queries(tables: list, columns: list) -> list` that uses nested loops to assemble dynamic SQL audit queries.

### Specification & Rules
1. Implement `generate_audit_queries(tables: list, columns: list) -> list`:
   - Takes a list of table names `tables` (outer dimension) and a list of column names `columns` (inner dimension).
   - Iterates through each `table` in `tables`.
   - For each table, iterates through each `column` in `columns`.
   - Assembles a formatted SQL check query string matching the exact pattern:
     `f"SELECT COUNT(*) FROM {table} WHERE {column} IS NULL;"`
   - Appends each assembled query string to a master query results list.
   - Returns the complete list of query strings.
2. **Edge Cases & Defensive Validation**:
   - If either `tables` or `columns` is empty (`[]`), the function must return an empty list `[]`.
   - If any item in `tables` or `columns` is `None` or an empty string `""`, skip that specific iteration cleanly.
3. **Execution Order Invariant**:
   - The query list must strictly follow row-major traversal: all columns for table 0 must appear before any columns for table 1.

### Starter Code (Learner Canvas)
```python
def generate_audit_queries(tables: list, columns: list) -> list:
    # TODO: Build an automated metadata-driven SQL audit generator.
    # Use nested loops to pair every table with every column.
    pass
```

### Target Solution Code
```python
def generate_audit_queries(tables: list, columns: list) -> list:
    if not tables or not columns:
        return []
    
    queries = []
    for table in tables:
        if not table:
            continue
        for column in columns:
            if not column:
                continue
            query = f"SELECT COUNT(*) FROM {table} WHERE {column} IS NULL;"
            queries.append(query)
            
    return queries
```

### Real-Time AST & Diagnostic Checks (Static Lints)
- **Check 1 (Nested Loop Hierarchy)**: Inspect the AST to ensure an `ast.For` node contains another `ast.For` node within its body. If missing, warn: *"Missing Nested Loop: You must use an inner loop inside your outer loop to traverse both dimensions."*
- **Check 2 (Variable Collision / Shadowing Ban)**: Verify that the outer loop target variable identifier and the inner loop target variable identifier are distinct (e.g. forbid `for item in tables: for item in columns:`).
- **Check 3 (Return Type Enforcement)**: Ensure the function returns an instantiated `list` object.

### Automated Test Cases

#### Test Case 1 (Standard Enterprise Tables & Columns - Video Scenario)
- **Input**:
  ```python
  generate_audit_queries(
      tables=["customers", "orders", "products"],
      columns=["id", "create_date"]
  )
  ```
- **Expected Output**:
  ```python
  [
      "SELECT COUNT(*) FROM customers WHERE id IS NULL;",
      "SELECT COUNT(*) FROM customers WHERE create_date IS NULL;",
      "SELECT COUNT(*) FROM orders WHERE id IS NULL;",
      "SELECT COUNT(*) FROM orders WHERE create_date IS NULL;",
      "SELECT COUNT(*) FROM products WHERE id IS NULL;",
      "SELECT COUNT(*) FROM products WHERE create_date IS NULL;"
  ]
  ```
- **Assertion**:
  ```python
  res = generate_audit_queries(["customers", "orders", "products"], ["id", "create_date"])
  assert len(res) == 6
  assert res[0] == "SELECT COUNT(*) FROM customers WHERE id IS NULL;"
  assert res[1] == "SELECT COUNT(*) FROM customers WHERE create_date IS NULL;"
  assert res[4] == "SELECT COUNT(*) FROM products WHERE id IS NULL;"
  ```
- **Failure Feedback**: *"Failed to generate all 6 queries in correct outer-table inner-column sequence."*

#### Test Case 2 (Single Table Multi-Column)
- **Input**: `generate_audit_queries(["analytics_events"], ["user_id", "session_id", "timestamp"])`
- **Expected Output**:
  ```python
  [
      "SELECT COUNT(*) FROM analytics_events WHERE user_id IS NULL;",
      "SELECT COUNT(*) FROM analytics_events WHERE session_id IS NULL;",
      "SELECT COUNT(*) FROM analytics_events WHERE timestamp IS NULL;"
  ]
  ```
- **Assertion**:
  ```python
  res = generate_audit_queries(["analytics_events"], ["user_id", "session_id", "timestamp"])
  assert len(res) == 3
  assert res[2] == "SELECT COUNT(*) FROM analytics_events WHERE timestamp IS NULL;"
  ```
- **Failure Feedback**: *"Single table expansion failed to pair with all target columns."*

#### Test Case 3 (Empty Input Boundary Defense)
- **Input**: `generate_audit_queries([], ["id", "status"])`
- **Expected Output**: `[]`
- **Assertion**: `assert generate_audit_queries([], ["id", "status"]) == []`
- **Failure Feedback**: *"Function must return an empty list when tables input is empty."*

#### Test Case 4 (None and Empty String Sanitization)
- **Input**: `generate_audit_queries(["users", ""], ["id", None, "email"])`
- **Expected Output**:
  ```python
  [
      "SELECT COUNT(*) FROM users WHERE id IS NULL;",
      "SELECT COUNT(*) FROM users WHERE email IS NULL;"
  ]
  ```
- **Assertion**:
  ```python
  res = generate_audit_queries(["users", ""], ["id", None, "email"])
  assert len(res) == 2
  assert res[0] == "SELECT COUNT(*) FROM users WHERE id IS NULL;"
  assert res[1] == "SELECT COUNT(*) FROM users WHERE email IS NULL;"
  ```
- **Failure Feedback**: *"Corrupt or empty table/column strings must be skipped cleanly."*

### Progressive Hint Ladder
- **Hint 1 (Mental Model Clue)**: Remember the warehouse gantry! Loop through each table first (outer loop). Inside that loop, loop through each column (inner loop).
- **Hint 2 (Structural Pseudocode)**:
  ```python
  queries = []
  for table in tables:
      for column in columns:
          query = f"SELECT COUNT(*) FROM {table} WHERE {column} IS NULL;"
          queries.append(query)
  return queries
  ```
- **Hint 3 (Syntax Unlock)**: Use 4 spaces for the outer loop indentation and 8 spaces for the inner loop block. Don't forget to filter out invalid entries using `if not table: continue`.

---

## 8. Conceptual Mastery Quiz (3 High-Yield Questions)

### Question 1: The Asymmetric Execution Invariant
Given the following nested loop construct, in what order does Python execute the inner loop relative to the outer loop?
```python
for outer in ["A", "B"]:
    for inner in [1, 2, 3]:
        print(outer, inner)
```
- A) Outer and inner advance together in parallel: `A 1`, then `B 2`.
- B) The inner loop runs completely from start to finish (`1, 2, 3`) for each single step of the outer loop (`A`, then `B`).
- C) The outer loop runs to completion first, and only then does the inner loop start.
- D) Python alternates randomly between the two sequences based on thread availability.

**Correct Answer**: **B**
**Deep Explanation**:
Python loops execute sequentially and hierarchically. For each single element yielded by the outer iterator (`'A'`), Python enters the inner loop and runs it through its entire sequence (`1`, `2`, `3`) until exhaustion. Only after the inner loop finishes does control return to the outer loop, which yields `'B'`, causing the inner loop to restart and execute completely from `1` to `3` again. Total output lines: $2 \times 3 = 6$.

---

### Question 2: Multiplicative Iteration Scaling
A data engineer writes a script to clean incoming batch records using 3 nested loops:
- The outer loop iterates through 5 database tables.
- The middle loop iterates through 10 columns per table.
- The innermost loop iterates through 100 validation rules per column.

How many total times will the innermost statement execute?
- A) 115 times ($5 + 10 + 100$)
- B) 500 times ($5 \times 100$)
- C) 5,000 times ($5 \times 10 \times 100$)
- D) 50,000 times ($5 \times 10 \times 100 \times 10$)

**Correct Answer**: **C**
**Deep Explanation**:
In nested loops, total iterations multiply across dimensions. The number of innermost executions equals the product of all sequence lengths: $\text{Total} = N_{\text{outer}} \times N_{\text{middle}} \times N_{\text{inner}} = 5 \times 10 \times 100 = 5,000$. This multiplicative behavior ($O(N \times M \times K)$) explains why data engineers must be cautious when nesting loops over large datasets.

---

### Question 3: Output Prediction & Accumulator Scope
What is printed by the following script?
```python
matrix = [[1, 2], [3, 4]]
total = 0

for row in matrix:
    row_sum = 0
    for val in row:
        row_sum += val
    total += row_sum

print(row_sum, total)
```
- A) `10 10`
- B) `3 10`
- C) `7 10`
- D) `4 10`

**Correct Answer**: **C**
**Deep Explanation**:
- For the first row `[1, 2]`: `row_sum` is reset to `0`. The inner loop adds `1` and `2`, leaving `row_sum = 3`. `total` becomes `0 + 3 = 3`.
- For the second row `[3, 4]`: `row_sum` is reset to `0`. The inner loop adds `3` and `4`, leaving `row_sum = 7`. `total` becomes `3 + 7 = 10`.
- After both loops finish, `row_sum` retains its final value from the last completed row (`7`), while `total` contains the sum of all elements (`10`). The output is `7 10`.
