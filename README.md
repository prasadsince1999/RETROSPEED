# ⚡ RETROSPEED — Race Your Fingers

> *The authentic retro arcade touch typing trainer and developer velocity studio.*

**RETROSPEED** is a desktop touch typing and keyboard velocity studio that transforms typing practice into high-intensity retro arcade defense games and structured muscle memory drills. 

Built with **React 18, Vite 6, Tailwind CSS, and Electron**, RETROSPEED operates on a **100% offline, local-first architecture** with sub-millisecond keystroke telemetry, Dynamic Difficulty Adjustment (DDA), and an authentic **Neo-Brutalist 90s OS window shell** with zero gradients.

Built by [KSM × Tech](https://ksmxtech.com), a product studio.

---

## 🌟 Why This Exists

Most typing websites and tutors are sterile, subscription-gated web apps filled with ads, corporate progress bars, and artificial gamification. They measure only basic gross WPM and ignore the true cognitive and biomechanical realities of typing: **Inter-Keystroke Latency ($IKI$), Finger Load Imbalance ($FLB$), and Panic Hesitation ($FI$)**.

RETROSPEED starts from a different premise:

1. **Typing is an arcade reflex** — High-stakes, responsive feedback loops build faster sub-cortical muscle memory than passive text repetition.
2. **Keystrokes are biometric telemetry** — Real speed requires measuring physical key-hold duration, finger transitions, and post-error cognitive recovery.
3. **No dark patterns or cloud bloat** — Your keystrokes, practice history, and speed profiles stay strictly on your local machine. No mandatory accounts. No tracking scripts.

---

## ⚙️ How Telemetry & Dynamic Difficulty Work

Deterministic mathematical modeling. Zero black boxes.

```
Keystroke Event (keydown / keyup)
                 ↓
    Telemetry Engine (Sub-millisecond high-resolution timer):
      • Inter-Keystroke Interval:  IKI(k) = t_down(k) - t_down(k-1)
      • Key Hold Duration:         HT(k)  = t_up(k) - t_down(k)
      • Flight Time:               FT(k)  = t_down(k) - t_up(k-1)
      • Keystroke Latencies:       KPL(k) & KRL(k)
                 ↓
    Cognitive & Biomechanical Evaluators:
      • Fluster Index (FI):        Measures post-typo hesitation & burst panic
      • Finger Load Balance (FLB): Left vs Right hand & per-finger fatigue
      • Statistical Model:         Log-Normal distribution fit (μ, σ)
                 ↓
    Continuous DDA Engine (Dynamic Difficulty Adjustment):
      • Continuous difficulty parameter D ∈ [0.1, 1.0]
      • Scales spawn frequency, entity speed, and vocabulary tier
      • Maintains learner in optimal psychological "Flow Zone"
```

---

## 🕹️ The 8 Paper-Arcade Workshop Games

RETROSPEED features eight distinct canvas-rendered workshop games unified under the Neo-Brutalist paper desk theme:

| Workshop Game | Mechanics & Skill Focus | Visual Theme |
|---|---|---|
| **📄 Press Room** | **Single-Key Factory Drill**: Moving paper slips on conveyor belt with mechanical rubber stamp slam. | Warm cream paper desk with steel conveyor guide. |
| **✈️ Paper Planes** | **Short Word Origami**: Ascending paper notes folded and launched into flight by typing. | Paper workshop desk with soaring origami gliders. |
| **🚆 Local Line** | **Paced Commuter Duel**: Dual commuter coaches on railway tracks; clean words accelerate, typos brake. | Twin paper rail lines with dual passenger coaches. |
| **🍜 Night Market** | **Kitchen Ticket Dispatch**: Counter order tickets sliding from right; item names stamped PAID. | Wooden market counter with order ticket rails. |
| **📥 Drop Chits** | **Falling Word Sorter**: Paper slips dropping from top sorting rail; clear before hitting desk. | Sorting rail workspace with cream drop slips. |
| **💣 Fuse Desk** | **Root Word Pressure**: Manila envelope with ticking red fuse bar matching English root prompts. | Manila envelope desk with glowing red fuse timer. |
| **🏎️ Pit Lane** | **60-Second WPM Sprint**: Dual typewriter racers powered by live WPM telemetry. | Dual-lane paper asphalt strip with racing ribbons. |
| **💻 Patch Terminal** | **Code Token Defense**: Falling lines of real JS, Python, Rust, and SQL code syntax to patch. | Clean cream code workbench with monospace font. |

---

## 📚 Driving School Spine & Comprehensive Curriculum

RETROSPEED ships with an 8-Part Zero-to-Hero Spine and 12 structured specialty tracks:

1. **Keystroke Foundations**: Pure tactile muscle memory drills for home row, top row, bottom row, and numbers.
2. **RETROSPEED Odyssey**: The master journey from single letters to advanced full-keyboard mastery.
3. **Syntax Forge (Developer Track)**: Real-world syntax drills across **JavaScript, TypeScript, Python, Rust, Go, CSS, SQL, and HTML**.
4. **Global Lexicon & Etymology**: Loanwords, Latin and Greek roots, scientific taxonomy, and multicultural vocabulary.
5. **Chronicles of Mystery**: Detective case dossiers, noir investigation logs, and forensic cipher solving.
6. **Symphony & Harmonic Keys**: Classical music theory, tempo rhythm typing, and harmonic notation.
7. **Atlas of 50 States**: Geography, state capitals, historical landmarks, and US history.
8. **The Curiosity Vault**: Fascinating science facts, astronomy, quantum physics, and biology.
9. **Pioneers & Innovators**: Biographies of computing legends (Alan Turing, Ada Lovelace, Grace Hopper, Tim Berners-Lee).
10. **Wild Kingdom**: Zoological classification, apex predators, ecology, and wildlife conservation.
11. **Literary Heritage & Vocabulary**: Classical literature, rhetoric, and SAT/GRE high-frequency vocabulary.
12. **Ergo Dvorak Layout**: Complete transition curriculum from standard QWERTY to Dvorak ergonomic layout.
13. **Speed Colemak Layout**: Transition curriculum to the Colemak high-velocity layout.

### 🎯 Pedagogical Invariants & Special Learning Environments

- **The 4-Box Lesson Progression**: Every curriculum stage follows the battle-tested EdClub pedagogical cycle: `1. NEW KEYS` (Finger placement) $\to$ `2. REVIEW` (Rhythm blending) $\to$ `3. PRACTICE` (Timed speed assessment) $\to$ `4. PLAY` (High-stakes paper-arcade defense).
- **Unskippable 4-Round Guided Drills**: Single-key introduction overviews can be skipped directly into Round 1, but the 4-round drill itself features strictly zero skip and zero previous buttons. Students must type all 4 progressive rounds (Repetitions $\to$ Alternations $\to$ Combinations $\to$ Rhythm check) to guarantee sub-cortical muscle memory.
- **Python Code Studio (`python-studio`)**: Real coding syntax workbench with syntax highlighting, indentation brackets, token matching, and simulated compiler/terminal execution.
- **Graphic Motion Player (`motion`)**: Scripted timed visual coaching for ergonomic posture, finger curvature, and eyes-on-the-screen discipline.
- **Shortcut & Chord Lab (`shortcuts`)**: Native OS hotkey muscle-memory training (Ctrl+C/V/Z/S/A/T/W, Alt+Tab) without touching the mouse.

---

## 🏗️ System & Codebase Architecture

```
RETROSPEED/
├── electron/
│   ├── main.cjs               # Native Electron browser window (1280x820), IPC handlers & app menu
│   └── preload.cjs            # Secure contextBridge exposing platform & system info
├── src/
│   ├── components/
│   │   ├── DesktopWindowShell.jsx # Vintage 90s OS window shell with titlebar (_ □ ✕), menus & sidebar
│   │   ├── HomeView.jsx           # Main Hub: Quick Play, Daily Challenge, & KPI Summary
│   │   ├── PracticeHub.jsx        # Curriculum directory dividing 13 tracks into 5 distinct categories
│   │   ├── ChallengeHub.jsx       # Skill trials, Live Arcade Launchers, & Keyword Battle Suite
│   │   ├── LessonPlayer.jsx       # Stream typing window, hands guide & real-time metric HUD
│   │   ├── QuickDrillPlayer.jsx   # 30s/60s/90s/120s standalone speed & accuracy sprint engine
│   │   ├── ShortcutPlayer.jsx     # Computer skills & OS hotkey chord training engine
│   │   ├── VideoPlayer.jsx        # Educational typing video player with synchronized transcripts
│   │   ├── ScoreModal.jsx         # 5-star pop-in victory modal with confetti and XP counter
│   │   ├── UnlockModal.jsx        # License management and workshop access modal
│   │   ├── stats/                 # Deep Analytics: KPI Cards, Timeline Chart, Heatmap, Problem Keys
│   │   ├── shop/                  # Customizer: Themes, Keycap Audio Packs, Avatars, Course Library
│   │   ├── map/                   # Journey Map: Interactive Avatar Pawn, Milestone Gates, Node Tiles
│   │   ├── badges/icons/          # Vector SVG trophy badges across Speed, Accuracy, Streaks & Mastery
│   │   ├── courseHeaders/         # Context Dossiers: Atlas, Loanwords, Detective, Music, Syntax
│   │   ├── motion/                # MotionLessonPlayer: Scripted posture & reaching coach
│   │   ├── code/                  # PythonCodeStudio: Code token typing & live terminal compiler
│   │   ├── games/                 # The 8 Paper-Arcade Defense Games
│   │   │   ├── PressRoomGame.jsx      # Conveyor belt rubber stamp factory
│   │   │   ├── PaperPlanesGame.jsx    # Airmail origami glide dispatch
│   │   │   ├── LocalLineGame.jsx      # Twin commuter railway velocity duel
│   │   │   ├── NightMarketGame.jsx    # Kitchen ticket order counter
│   │   │   ├── DropChitsGame.jsx      # Sorting rail drop chits vault
│   │   │   ├── FuseDeskGame.jsx       # Manila envelope ticking fuse pressure
│   │   │   ├── PitLaneGame.jsx        # 60s WPM Grand Prix typewriter racer
│   │   │   └── PatchTerminalGame.jsx  # Real code token terminal defender
│   │   ├── animation/             # Rive runtime, Tachometer Speedometer, Combo Flame & Mascot
│   │   └── ui/                    # Reusable Neo-Brutalist primitives (Button, Card, Modal, Badge, etc.)
│   ├── hooks/
│   │   ├── useUserProgress.js     # State hook for progress, enrollments, themes, and audio
│   │   └── useLessonSession.js    # State hook for active drills, completions, and game lifecycles
│   ├── routes/
│   │   └── AppRouter.jsx          # Route coordinator with code-split lazy view loaders
│   ├── data/
│   │   ├── curriculum.js          # Course registry and level loader
│   │   ├── courseCatalog.js       # Metadata for all 13 official courses
│   │   ├── achievements/          # Modular badge criteria & real-time unlock evaluators
│   │   ├── keyboardLayout.js      # Layout definitions (QWERTY, Dvorak, Colemak)
│   │   └── courses/*.json         # Lesson definitions with target keys and exercise text
│   └── utils/
│       ├── storage/               # Migrations, progress persistence, stats math, and profiles
│       ├── audio/                 # SoundEngine, procedural keycap packs, arcade & UI sound FX
│       ├── telemetryEngine.js     # High-resolution IKI, HT, FT, FI, and FLB calculator
│       ├── ddaEngine.js           # Dynamic Difficulty Adjustment differential update loop
│       └── lexiconTrie.js         # Prefix Trie with 5,000+ words and Zipf frequency rankings
├── microsoft-store-config.yaml    # Microsoft Store Partner Center publishing configuration
├── PRIVACY.md                     # Certified offline local-first privacy policy
├── tailwind.config.js             # Solid Retro Neo-Brutalist color tokens & hard offset shadows
└── vite.config.js                 # High-performance Vite build config
```

---

## 💻 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | React 18 (Hooks, Suspense, Lazy Loading) | Component architecture & state management |
| **Build Tool** | Vite 6 | Sub-second HMR & Rollup production bundling |
| **Desktop Runtime** | Electron 44 & `electron-builder` | Native Windows desktop packaging (EXE & AppX/MSIX) |
| **Styling & Theme** | Tailwind CSS 3 | Solid Retro Neo-Brutalist design tokens (0% gradients) |
| **Game Physics** | HTML5 Canvas 2D Physics Engine | 60 FPS particle systems, missile trajectories, collision detection |
| **Animation Systems** | Rive Canvas (`@rive-app/react-canvas`), `canvas-confetti` | High-fidelity vector state machine animations |
| **Keycap Acoustics** | Web Audio API Procedural Synthesizer | Cherry MX Blue, Gateron Brown, IBM Model M, Thocky Linear & Chiptune |
| **Icons** | `lucide-react` | Clean, crisp interface iconography |
| **Unit Testing** | Vitest 3 | Fast, deterministic test runner for telemetry, storage & mechanics |
| **Code Modularity** | Deep Module Architecture | Strict `< 600 lines` file size mandate across all application code |
| **CI / CD** | GitHub Actions | Automated Windows executable & Microsoft Store AppX release builds |

---

## 🛡️ The Ethical Stance

Every build at **KSM × Tech** refuses the easy dishonest version of itself.

**RETROSPEED refuses the cloud-locked data capture and subscription trap:**

- **100% Offline & Local-First**: All typing records, speeds, problem keys, and diagnostics stay on your device.
- **Zero Telemetry Transmitted**: We never send your keystrokes to any server or LLM.
- **Zero Ads & Zero In-App Microtransactions**: Everything is unlocked through pure typing mastery.
- **Deterministic Math**: Every WPM, accuracy %, and Fluster Index calculation is transparent and mathematically verifiable.

See [PRIVACY.md](PRIVACY.md) for our full privacy commitment.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation
```bash
git clone https://github.com/prasadsince1999/RETROSPEED.git
cd RETROSPEED
npm install
```

### Local Development
```bash
# Run web client in browser (http://localhost:3000)
npm run dev

# Run in Electron desktop window
npm run electron:dev
```

### Verification & Automated Testing
```bash
# Run Vitest test suites (deterministic math, storage migrations, engine sims)
npm run test

# Run tests in interactive watch mode
npm run test:watch
```

### Production Build & Packaging
```bash
# Compile and build web production bundle
npm run build

# Package standalone portable Windows executable (.exe)
npm run package:win

# Package NSIS Windows installer
npm run electron:build

# Package Microsoft Store AppX / MSIX package
npm run package:store
```

---

## 🌐 Part of KSM × Tech

**RETROSPEED** is part of the product suite from [KSM × Tech](https://ksmxtech.com):

| Build | Core Purpose | What It Refuses |
|---|---|---|
| **[RETROSPEED](https://github.com/prasadsince1999/RETROSPEED)** | Retro Arcade Touch Typing Velocity Studio | Cloud bloat, telemetry logging, and subscription paywalls |
| **[Book Is Your Friend](https://github.com/prasadsince1999/BYF)** | Bibliotherapy Audiobook & Summary Matcher | The black box — deterministic, transparent recommendations |
| **[Mārgadarshak](https://github.com/prasadsince1999/MargaDarshak)** | Transparent Career & Higher Education Guidance | Pay-to-rank — no institution can buy a student's ranking |
| **[Krishna as Sarathi](https://github.com/prasadsince1999/krishna-as-sarathi)** | Contextual Philosophical Decision Guidance | Generic platitudes — reads the situation, not the sentence |

---

## 📄 License
MIT License. Created with ❤️ by Prasad at **KSM × Tech Studio**.
