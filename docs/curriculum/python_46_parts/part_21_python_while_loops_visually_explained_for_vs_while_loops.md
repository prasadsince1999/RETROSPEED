# Part 21: Python While Loops (Visually Explained) | For vs While Loops
**Video URL**: https://www.youtube.com/watch?v=gD8ePxAhjUM&list=PLNcg_FV9n7qZGfFl2ANI_zISzNp257Lwn
**Video ID**: `gD8ePxAhjUM`
**Curriculum Stage**: Stage 4 // Iteration & Repetition Engines
**Concept Domain**: Stateful Polling, Event Loops, While-Condition vs. While-True Architecture, Loop Invariants & Termination Safety
**Target Skill Tier**: Code Pilot
**Estimated Duration**: 16:40

---

## 1. Executive Summary & Pedagogical Goals

### The Core Problem
Until this stage in the curriculum, students have worked almost exclusively with `for` loops. While `for` loops excel at traversing known, finite sequences (lists, strings, ranges), real-world systems operate under conditions where the total number of iterations cannot be known in advance (e.g., polling an external REST API until a dataset finishes exporting, awaiting user confirmation, or maintaining a long-running service daemon). When transitioning to `while` loops, beginners face three major cognitive and systemic traps:
1. **The Missing Update Trap (The Infinite Loop Disaster)**: Beginners write a condition like `while i < 5:`, print `i`, but forget to increment `i`. Because the condition remains permanently `True`, the loop runs at maximum clock speed, pinning the CPU at 100%, consuming system memory, freezing the terminal, and crashing the runtime.
2. **The Uninitialized Variable Trap**: Beginners attempt to reference a state variable in the `while` condition header (e.g., `while answer != "yes":`) before defining it in the outer scope, triggering an immediate `NameError` crash.
3. **The Architectural Ambiguity (For vs. While Decision Paralysis)**: Novices struggle to decide which loop structure to use. They either write cumbersome, manual counter-driven `while` loops to iterate over simple lists (reinventing `for` loops poorly) or attempt to shoehorn non-deterministic polling problems into static `for` loops.

### The Visual Solution
Baraa visually contrasts the internal runtime mechanics of `for` vs. `while` loops and categorizes while loops into two robust operational architectures:
- **The Core Mechanical Distinction (Predefined Sequence vs. Dynamic Condition)**:
  - `for` loop: Python creates an internal **Iterator Object** over a predefined sequence. Python manages the step pointer and condition automatically ("Are we at the end of the sequence?"). It terminates naturally with zero risk of infinite loops.
  - `while` loop: Python checks a **custom Boolean condition expression**. Python does *not* manage state or step updates automatically. The developer owns the lifecycle and must provide the update mechanism.
- **The 3 Mandatory Pillars of a While-Condition Loop**:
  1. **Initialization**: Establishing the loop variable in memory *before* entering the loop.
  2. **Condition / Gate**: The boolean predicate evaluated at the head of every cycle.
  3. **Update Mechanism**: Mutating the variable inside the loop body to steer the condition toward `False`.
- **The Two Architectural Patterns**:
  1. **The Classical `while <condition>:` Loop**: Bounded, state-monitored iteration. Terminates naturally when the guard flips to `False`. Ideal for counters, bounded retries, and input sanitation.
  2. **The `while True:` + `break` Engine**: Open-ended, indefinite event loop. Runs infinitely by default until an internal `if <event>: break` tripwire fires. Ideal for live event listeners, network stream polling, and interactive console REPLs.

```
====================== FOR LOOP vs. WHILE LOOP ARCHITECTURES ======================

  FOR LOOP (Definite Iteration)           WHILE LOOP (Indefinite Iteration)
  ┌─────────────────────────────┐         ┌─────────────────────────────────┐
  │ Predefined Sequence [1,2,3] │         │  Initialization: counter = 1    │
  └──────────────┬──────────────┘         └────────────────┬────────────────┘
                 │                                         │
                 ▼                                         ▼
  ┌─────────────────────────────┐         ┌─────────────────────────────────┐
  │ Internal Iterator Manages   │         │ Head Evaluation: counter <= 5?  │
  │ Next Item & Auto-Stops      │         └────────┬───────────────┬────────┘
  └──────────────┬──────────────┘                  │ [TRUE]        │ [FALSE]
                 │                                 ▼               ▼
                 ▼                        ┌─────────────────┐  ┌────────────┐
  ┌─────────────────────────────┐         │ Execute Suite & │  │ Terminate  │
  │ Deterministic Natural Exit  │         │ MUST Mutate:    │  │ & Exit     │
  └─────────────────────────────┘         │ counter += 1    │  └────────────┘
                                          └────────┬────────┘
                                                   │
                                                   └─► Cycles Back to Guard
===================================================================================
```

### 3 Concrete Learning Outcomes
1. **Differentiate Definite vs. Indefinite Loop Use Cases**: Discern when a business requirement mandates a deterministic `for` loop (sequence processing) versus an open-ended `while` loop (dynamic polling, state monitoring).
2. **Construct Bulletproof While-Condition Loops**: Implement the 3-phase invariant (Initialization $\rightarrow$ Guard Condition $\rightarrow$ Internal Mutation) with zero infinite loop leaks.
3. **Master the `while True:` Event Loop Architecture**: Build resilient, infinite polling loops equipped with internal condition checks and explicit `break` termination switches.

---

## 2. Visual Mental Model & Analogy (For DynamicVisualStage.jsx)

- **analogyType**: `conveyor`
- **Analogy Name**: "The Steam Engine Governor & State Sentinel Cycle"
- **Physical Metaphor**:
  Imagine an industrial steam turbine regulated by a centrifugal flyball governor:
  - **The Water Reservoir (Initialization)**: Before firing the boiler, the engineer fills the tank to a specific level (`counter = 1`).
  - **The Pressure Guard Sensor (Condition Check)**: At the top of every stroke, a mechanical pressure gauge checks the threshold: `pressure < max_pressure`. If the gauge reads safe (`True`), the intake valve remains open and the piston fires.
  - **The Work Stroke & Stroke Injector (Update Mechanism)**: Inside the cylinder, the piston completes a cycle, printing power to the wheels, and an automated pump injects fuel or increments the pressure counter (`counter += 1`).
  - **The Exhaust Cutoff (Termination)**: The moment the pressure hits the cutoff limit (`counter >= max_pressure`), the spring-loaded gate snaps shut (`False`), venting the steam and halting the flywheel smoothly.
  - **The Emergency Relief Valve (`while True:` + `break`)**: If operating under an unregulated infinite boiler (`while True:`), the engine spins continuously until an inspector detects an anomaly or target event and manually pulls the emergency steam purge lever (`break`), bringing the turbine to an instant dead stop.

```
+=================================================================================+
|            STEAM ENGINE GOVERNOR & STATE SENTINEL CYCLE (conveyor)              |
+=================================================================================+
|                                                                                 |
|  [ 1. INITIALIZATION ]                                                          |
|  pressure = 1 (Boiler Primed in RAM)                                            |
|       │                                                                         |
|       ▼                                                                         |
|  [ 2. PRESSURE GUARD ] ◄──────────────────────────────────────────────┐         |
|  Is pressure <= 5?                                                    │         |
|       │                                                               │         |
|       ├──► [TRUE: GATE OPEN] ──► [ 3. PISTON STROKE: print(pressure) ] │         |
|       │                                       │                       │         |
|       │                                       ▼                       │         |
|       │                          [ 4. INJECT FUEL: pressure += 1 ] ───┘         |
|       │                                                                         |
|       └──► [FALSE: GATE SHUT] ──► Steam Exhaust Vent Open ──► Engine Stops      |
|                                                                                 |
+=================================================================================+
```

### Visual Scene Breakdown
- **Component A (The Priming Gauge / Initialization)**: Memory display box showing the initial variable state (`counter = 1`) positioned above the intake chamber.
- **Component B (The Sentinel Gate / Condition)**: A mechanical sliding gate illuminated with green/red neon indicators. If `True`, the gate lifts, allowing the conveyor item to roll into the processor; if `False`, the gate slams down, shunting execution to the exit track.
- **Component C (The Gear Incrementer / Update Mechanism)**: An animated ratchet gear mechanism inside the processing bay that physically ratchets the counter integer by `+1` (or applies user input) before sending the cycle back to Component B.

### State Machine Transitions
- `idle`: Sentinel gate closed; digital readout shows `counter = None`; amber neon standby glow.
- `initialized`: Variable allocated in RAM; digital readout flips to initial value; sentinel gate turns neon green.
- `cycling / active`: Piston fires; terminal logs standard output; ratchet gear ticks `+1`; particle sparks burst on the update line.
- `condition_exhausted`: Counter reaches terminal value; sentinel gate turns glowing red; gate lowers, directing execution path out of the loop.
- `emergency_break`: In a `while True:` setup, an internal tripwire triggers a loud mechanical clamp (`break`), freezing the conveyor instantly with red strobe lights.

---

## 3. Gamification Mechanics & Puzzle Design (For Game Loops & Challenges)

- **Level Objective**:
  Assume command of the Orbital Relay Station. An incoming telemetry feed requires continuous polling until an active satellite handshake is established. You must construct stateful `while` polling engines that monitor incoming signal buffers, retry failed handshakes up to a strict limit, and handle emergency abort signals without creating infinite loop deadlocks.
- **Interactive Puzzle Mechanics**:
  - **Infinite Loop Sentinel**: A real-time execution watchdog monitors loop iteration counts. If a learner's code executes more than 2,000 cycles without state mutation, the simulation pauses, displays a cooling fan animation, and emits: *"Watchdog Abort: Infinite loop detected! Did you forget to increment your counter?"*
  - **Condition Toggle HUD**: Interactive slider adjusts initial variables, allowing learners to observe why `while i < 0:` never executes a single iteration (0-trip loop).
  - **Emergency Kill Switch (`Ctrl + C`)**: Learners practice terminating runaway processes in the terminal simulator using the retro keyboard shortcut.
- **Hazards & Anti-Patterns (The "Potholes")**:
  - *The Frozen Counter Antipattern*: Forgetting `counter += 1`, resulting in infinite stdout spam.
  - *The Off-by-One Guard*: Confusing `<` with `<=` (e.g., stopping at 4 iterations instead of 5).
  - *The Unreachable Break*: Placing `break` outside the `if` condition in a `while True:` loop, causing it to terminate prematurely on the very first cycle.
- **Streak & Velocity Multipliers**:
  - **10x Streak**: ⚙️ "Governor Locked" — 1.5x XP Boost; gears turn smoothly with rhythmic click audio.
  - **25x Streak**: ⚡ "Sentinel Surge" — 2.0x XP Boost; laser sweep illuminates the condition gate.
  - **50x Streak**: 🏆 "Master of State" — 3.0x XP Boost; unlocks the "Infinite Loop Survivor" badge title.
- **Badge / Achievement Unlock**:
  - **Badge ID**: `badge_part_21`
  - **Badge Name**: State Sentinel
  - **Criteria**: Complete all 3 typing drill tiers and successfully write an automated API retry polling engine with 100% test pass rate at 45+ WPM.

---

## 4. Code Anatomy & Token Breakdown (For PythonStepTeacher.jsx)

### Canonical Code Snippet
```python
# The 3-Phase While Loop Architecture: Counter & Guard Pattern
counter = 1

while counter <= 5:
    print(f"Polling attempt: {counter}")
    counter += 1

print("Service operational.")
```

### Token-by-Token Dissection Table

| Token | Syntax Category | Hex Color | Deep Explanation |
| :--- | :--- | :--- | :--- |
| `counter = 1` | Statement (Init) | `#F6C445` | **Phase 1: Initialization.** Allocates an integer object `1` and binds the label `counter` before the loop starts. |
| `while` | Keyword (Control Flow) | `#C3A6E8` | Declares an indefinite conditional iteration block. Evaluates the guard before every cycle. |
| `counter <= 5` | Relational Expression | `#48B89F` | **Phase 2: The Guard Condition.** Evaluated to a boolean (`True`/`False`). If `True`, the suite runs; if `False`, loop exits. |
| `:` | Delimiter (Block Header)| `#FFFFFF` | Colon establishing the boundary for the indented suite. |
| `print(...)` | Function Call | `#48B89F` | Emits current iteration status to standard output. |
| `counter += 1` | Augmented Assignment | `#F6C445` | **Phase 3: The Update Mechanism.** Increments `counter` by 1. Without this mutation, the loop becomes infinite. |
| `print("Service...")`| Unindented Statement | `#48B89F` | Executes sequentially *after* the while loop condition evaluates to `False`. |

### Coach Byte's Conversational Guide
- **Opening Hook**: *"Hey friends! Welcome to Part 21! Up until now, we've used `for` loops when we knew exactly what we were looping through. But what if you don't know how many times you need to loop? What if you're waiting for a server to respond, or asking a user until they give a valid answer? That's where the mighty `while` loop comes to save the day!"*
- **The Secret Insight**: *"Always remember the 3 Golden Rules of While Loops: 1. Initialize outside, 2. Check at the gate, 3. Update inside! If you forget rule #3, Python will never stop running your code until your computer's fan sounds like a jet engine!"*
- **Pro Tip**: *"When should you use `while True:` vs `while condition:`? If your loop has a natural numerical limit (like 5 retries), use `while condition:`. But if your loop is listening for an external event or user command, `while True:` with an internal `if event: break` is cleaner, more readable, and standard industry practice!"*

---

## 5. Execution Simulation Trace (Step-by-Step State Machine)

Given `counter = 1` and `while counter <= 3:`:

| Step | Line # | Interpreter Action | Memory State (`vars`) | Terminal `stdout` | Visual Particle FX |
| :---: | :---: | :--- | :--- | :--- | :--- |
| 1 | L2 | Assign initial counter integer | `counter = 1` | `""` | Reservoir fills with water |
| 2 | L4 | Evaluate guard: `1 <= 3` $\rightarrow$ `True` | `counter = 1` | `""` | Sentinel gate glows neon green |
| 3 | L5 | Format and emit attempt string | `counter = 1` | `"Polling attempt: 1"` | Phosphor CRT flash |
| 4 | L6 | Increment `counter`: `1 + 1` | `counter = 2` | `"Polling attempt: 1"` | Ratchet gear turns 1 click |
| 5 | L4 | Re-evaluate guard: `2 <= 3` $\rightarrow$ `True` | `counter = 2` | `"Polling attempt: 1"` | Sentinel gate remains green |
| 6 | L5 | Format and emit attempt string | `counter = 2` | `"Polling attempt: 2"` | Phosphor CRT flash |
| 7 | L6 | Increment `counter`: `2 + 1` | `counter = 3` | `"Polling attempt: 2"` | Ratchet gear turns 1 click |
| 8 | L4 | Re-evaluate guard: `3 <= 3` $\rightarrow$ `True` | `counter = 3` | `"Polling attempt: 2"` | Sentinel gate remains green |
| 9 | L5 | Format and emit attempt string | `counter = 3` | `"Polling attempt: 3"` | Phosphor CRT flash |
| 10 | L6 | Increment `counter`: `3 + 1` | `counter = 4` | `"Polling attempt: 3"` | Ratchet gear turns 1 click |
| 11 | L4 | Re-evaluate guard: `4 <= 3` $\rightarrow$ `False` | `counter = 4` | `"Polling attempt: 3"` | Gate slams shut (neon red) |
| 12 | Exit | Jump past while block to outer scope | `counter = 4` | `"Polling attempt: 3"` | Steam exhaust vents open |
| 13 | L8 | Execute final unindented print | `counter = 4` | `"Service operational."` | Green checkmark animation |

---

## 6. Muscle-Memory Typing Drills (For RETROSPEED Typing Stage)

### Level 1: Syntax & Operator Micro-Drill
*Focus on while keywords, comparison operators, and augmented assignment.*
- Drill 1: `while count < 5:`
- Drill 2: `counter += 1`
- Drill 3: `while True: if done: break`
- Drill 4: `while answer != "yes": answer = input()`
- Drill 5: `while retries > 0: retries -= 1`

### Level 2: Line Construction Drill (Home-Row & Rhythm calibrated, < 65 chars/line)
- Line 1: `attempt = 1`
- Line 2: `while attempt <= max_retries:`
- Line 3: `    status = poll_service(attempt)`
- Line 4: `    if status == "OK":`
- Line 5: `        break`
- Line 6: `    attempt += 1`

### Level 3: Velocity Sprint (Full runnable mini-block)
```python
# Target WPM: 45+ | Target Accuracy: 96%+
battery = 100
discharge_rate = 25

cycles = 0
while battery > 0:
    battery -= discharge_rate
    cycles += 1

print(f"Battery depleted after {cycles} operational cycles.")
```

---

## 7. Python Code Studio Challenge & Auto-Grading (For PythonCodeStudio.jsx)

### Challenge Name: Resilient Network Polling & Exponential Backoff Engine

### Scenario
You are developing an automated microservice health monitor for a mission-critical cloud platform. When an upstream data service fails or restarts, the monitor must execute a stateful polling loop, attempting to re-establish a connection up to a specified maximum number of attempts (`max_retries`).

If the service responds before `max_retries` is reached, the loop must terminate immediately via `break` (or return) to prevent unnecessary network overhead. If all attempts fail, the function must report a timeout failure.

### Specification & Rules
Implement `poll_service_connection(max_retries: int, success_after_attempt: int) -> dict`:
1. **Parameters**:
   - `max_retries` (`int`): The maximum number of connection attempts allowed before giving up.
   - `success_after_attempt` (`int`): The mock attempt threshold at which the remote service becomes available. (e.g., if `2`, attempts 1 and 2 fail, but attempt 3 succeeds).
2. **Behavior**:
   - Use a `while` loop (either `while attempt <= max_retries:` or `while True:` with counter tracking).
   - Initialize `attempt = 1`.
   - On each iteration:
     - Check if `attempt > success_after_attempt`. If `True`, the connection succeeds! Return the success report immediately.
     - If not, advance `attempt += 1`.
   - If the loop finishes because `attempt > max_retries`, the connection timed out!
3. **Defensive Validation**:
   - If `max_retries <= 0`, return immediately:
     ```python
     {"connected": False, "attempts_used": 0, "status": "INVALID_MAX_RETRIES"}
     ```
4. **Return Schema**:
   - On Success:
     ```python
     {
         "connected": True,
         "attempts_used": int,
         "status": "ONLINE"
     }
     ```
   - On Timeout (Exhausted):
     ```python
     {
         "connected": False,
         "attempts_used": int,
         "status": "TIMEOUT"
     }
     ```

### Starter Code (Learner Canvas)
```python
def poll_service_connection(max_retries: int, success_after_attempt: int) -> dict:
    # TODO: Implement stateful polling using a while loop.
    # Track attempts, update counter, and handle success/timeout states.
    pass
```

### Target Solution Code
```python
def poll_service_connection(max_retries: int, success_after_attempt: int) -> dict:
    if max_retries <= 0:
        return {
            "connected": False,
            "attempts_used": 0,
            "status": "INVALID_MAX_RETRIES"
        }

    attempt = 1
    while attempt <= max_retries:
        if attempt > success_after_attempt:
            return {
                "connected": True,
                "attempts_used": attempt,
                "status": "ONLINE"
            }
        attempt += 1

    return {
        "connected": False,
        "attempts_used": max_retries,
        "status": "TIMEOUT"
    }
```

### Real-Time AST & Diagnostic Checks (Static Lints)
- **Check 1 (While Loop Verification)**: Inspect the AST to ensure an `ast.While` node exists in the function body. If missing, warn: *"Missing While Loop: You must implement your polling retry logic using a while loop."*
- **Check 2 (Update Mechanism Presence)**: Verify that an `ast.AugAssign` or `ast.Assign` targeting the attempt counter variable exists inside the while loop body to prevent infinite loop deadlocks.
- **Check 3 (Return Type Validation)**: Verify that the function returns a `dict` with keys `'connected'`, `'attempts_used'`, and `'status'`.

### Automated Test Cases

#### Test Case 1 (Standard Connection Success - Attempt 3 of 5)
- **Input**: `poll_service_connection(max_retries=5, success_after_attempt=2)`
- **Expected Output**:
  ```python
  {
      "connected": True,
      "attempts_used": 3,
      "status": "ONLINE"
  }
  ```
- **Assertion**:
  ```python
  res = poll_service_connection(5, 2)
  assert res["connected"] is True
  assert res["attempts_used"] == 3
  assert res["status"] == "ONLINE"
  ```
- **Failure Feedback**: *"Service should have connected on attempt 3 and terminated early."*

#### Test Case 2 (Immediate First Attempt Success)
- **Input**: `poll_service_connection(max_retries=3, success_after_attempt=0)`
- **Expected Output**:
  ```python
  {
      "connected": True,
      "attempts_used": 1,
      "status": "ONLINE"
  }
  ```
- **Assertion**:
  ```python
  res = poll_service_connection(3, 0)
  assert res["connected"] is True
  assert res["attempts_used"] == 1
  assert res["status"] == "ONLINE"
  ```
- **Failure Feedback**: *"Service should connect on attempt 1 when threshold is 0."*

#### Test Case 3 (Connection Timeout - Exhausted Retries)
- **Input**: `poll_service_connection(max_retries=4, success_after_attempt=10)`
- **Expected Output**:
  ```python
  {
      "connected": False,
      "attempts_used": 4,
      "status": "TIMEOUT"
  }
  ```
- **Assertion**:
  ```python
  res = poll_service_connection(4, 10)
  assert res["connected"] is False
  assert res["attempts_used"] == 4
  assert res["status"] == "TIMEOUT"
  ```
- **Failure Feedback**: *"Service must report TIMEOUT with attempts_used == max_retries when threshold exceeds limit."*

#### Test Case 4 (Zero / Negative Retries Boundary Defense)
- **Input**: `poll_service_connection(max_retries=0, success_after_attempt=2)`
- **Expected Output**:
  ```python
  {
      "connected": False,
      "attempts_used": 0,
      "status": "INVALID_MAX_RETRIES"
  }
  ```
- **Assertion**:
  ```python
  res = poll_service_connection(0, 2)
  assert res["connected"] is False
  assert res["attempts_used"] == 0
  assert res["status"] == "INVALID_MAX_RETRIES"
  ```
- **Failure Feedback**: *"Non-positive max_retries must be rejected defensively."*

### Progressive Hint Ladder
- **Hint 1 (Mental Model Clue)**: Think of the steam governor! Initialize `attempt = 1` before entering the loop. In each cycle, check if `attempt > success_after_attempt`.
- **Hint 2 (Structural Pseudocode)**:
  ```python
  attempt = 1
  while attempt <= max_retries:
      if attempt > success_after_attempt:
          return {"connected": True, "attempts_used": attempt, "status": "ONLINE"}
      attempt += 1
  return {"connected": False, "attempts_used": max_retries, "status": "TIMEOUT"}
  ```
- **Hint 3 (Syntax Unlock)**: Don't forget `attempt += 1` at the end of the while loop body, otherwise `attempt` will stay `1` forever and freeze your browser!

---

## 8. Conceptual Mastery Quiz (3 High-Yield Questions)

### Question 1: The Fundamental For vs. While Invariant
What is the core architectural difference between a Python `for` loop and a `while` loop?
- A) A `for` loop can only iterate over numbers, whereas a `while` loop can only iterate over strings.
- B) A `for` loop iterates over a predefined sequence using an internal iterator, whereas a `while` loop evaluates an open-ended boolean condition on every cycle.
- C) `while` loops run on the GPU, whereas `for` loops run on the CPU.
- D) `while` loops execute their body at least once even if the condition is `False` initially.

**Correct Answer**: **B**
**Deep Explanation**:
In Python, `for` loops are designed for definite iteration: they traverse an existing iterable (list, tuple, string, range) where Python manages iterator advancement and termination automatically. A `while` loop is designed for indefinite iteration: it continuously tests a boolean predicate expression, making it suitable for event loops, polling routines, and scenarios where iteration counts cannot be determined in advance.

---

### Question 2: Diagnosing Runaway While Loops
Consider the following code snippet:
```python
count = 1
while count < 10:
    print(count)
    if count == 5:
        count += 2
```
What will happen when this script is executed?
- A) It prints `1, 2, 3, 4, 5, 7, 9` and terminates.
- B) It prints `1` infinitely because `count` is never modified when `count != 5`.
- C) It raises an `UnboundLocalError`.
- D) It automatically exits after 100 milliseconds due to Python's built-in timeout.

**Correct Answer**: **B**
**Deep Explanation**:
On the first iteration, `count = 1`. The condition `1 < 10` is `True`. Line 3 prints `1`. Then the `if count == 5:` check evaluates to `False`, so line 5 (`count += 2`) is skipped. The loop cycles back to the top with `count` still equal to `1`. Because `count` never changes when it is not `5`, the loop is trapped in an infinite execution cycle, spamming `1` continuously until interrupted.

---

### Question 3: While-True Architecture with Break
Why is `while True:` combined with an internal `if ...: break` frequently preferred over a complex `while <condition>:` header in interactive applications?
- A) `while True:` executes 50% faster in CPython bytecode.
- B) It eliminates the need for redundant initialization boilerplate before the loop and cleanly centralizes exit logic at the exact moment user input or an event is evaluated.
- C) Python forbids calling `input()` inside standard `while <condition>:` loops.
- D) `while True:` prevents `KeyboardInterrupt` exceptions from occurring.

**Correct Answer**: **B**
**Deep Explanation**:
With a standard `while answer != "yes":`, the developer is forced to define a dummy variable `answer = ""` before the loop so Python doesn't raise a `NameError`. With `while True:`, the loop starts immediately without dummy variables; inside, it prompts the user, evaluates the response, and calls `break` at the exact point of satisfaction. This structure avoids duplicate prompts and creates clearer, more maintainable code for event-driven workflows.
