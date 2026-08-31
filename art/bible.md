# RETROSPEED Art Bible & Design System

> **The Paper-Arcade Desk**  
> *"Rive is the actor. Canvas is the stage. SVG is the furniture."*

---

## 🎨 1. The 7-Color Palette (Locked)

If a new asset or game needs an 8th color, **reject it**.

| Token | Hex | Role | Usage |
| :--- | :--- | :--- | :--- |
| **`paper`** | `#FDF8EE` | Desk / Canvas | Base surface, cards, keycaps |
| **`paperAlt`** | `#FAF3E0` | Container Depth | Titlebars, sub-panels, drawers |
| **`ink`** | `#2D2319` | Outlines & Typography | 2px–3px borders, text, hard shadows |
| **`mustard`** | `#F6C445` | Speed & Primary | Quick play buttons, active stars, speed lines |
| **`mint`** | `#48B89F` | Precision & Target | Correct keys, 100% acc badges, active halos |
| **`coral`** | `#F28B82` | Miss & Danger | Typos, cracked hearts, urgent timers, close buttons |
| **`sky`** | `#4BA3E3` | Time & Metrics | WPM metrics, clock icons, foundation badges |
| **`lilac`** | `#C3A6E8` | Special & Chords | Window chrome, shortcuts, mystery tracks |

---

## 📐 2. Physical Rendering Rules

1. **Hard Outlines**:
   - All interactive components use `2px solid #2D2319` or `3px solid #2D2319`.
   - Never use soft blurred dropshadows (`rgba(0,0,0,0.15)`).
   - Use hard offset shadows: `shadow-[4px_4px_0px_#2D2319]` (large), `shadow-[2px_2px_0px_#2D2319]` (buttons).
2. **Tactile Depress**:
   - Active state physically translates down-right: `active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2D2319]`.
3. **Zero Gradients**:
   - Solid matte color blocks only. No multi-stop linear or radial background gradients.
4. **Corner Geometry**:
   - Windows & Cards: `rounded-2xl` (16px) or `rounded-xl` (12px).
   - Game Sprites & Keycaps: `rounded-lg` (8px) or `rounded-md` (4px).

---

## 🎮 3. Game Stage Rules

1. **One Shared HUD**:
   - Top-Left: Menu `≡`
   - Top-Center: Score & Combo Multiplier
   - Top-Right: 3 Paper Hearts (`#F28B82` filled, `#FAF3E0` cracked)
   - Bottom: Target character / keyboard prompt
2. **Layer Discipline**:
   - **Layer 1 (Hit)**: Keycap depress + synthetic click
   - **Layer 2 (Target)**: Halo only on the active letter/word
   - **Layer 3 (Combo)**: Flame climbs, dies instantly on typo
   - **Layer 4 (World)**: 1 reacting object (balloon bursts, missile fires, rune crumbles)
   - **Layer 5 (Fail)**: 4px horizontal screen nudge + wrong key flashes coral
   - **Layer 6 (Rest)**: Game freezes on pause; no entity spawning

---

## 🎭 4. Technology Boundaries

- **Canvas 2D**: For dynamic physics, moving sprites, missiles, falling letters.
- **SVG**: For static keycaps, icons, hearts, window frames, and layouts.
- **Web Audio (Procedural)**: 6 blip samples max (hit, miss, combo, pop, tick, win). 100% offline.
- **Rive**: Reserved strictly for the Desk Mascot and standalone Combo Flame. No `.riv` dependency required to ship.
