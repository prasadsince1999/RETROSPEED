# ⚡ RETROSPEED — Race Your Fingers

> *The authentic retro arcade touch typing trainer and developer velocity studio.*

**RETROSPEED** is a desktop touch typing and keyboard velocity studio that transforms typing practice into high-intensity retro arcade defense games and structured muscle memory drills. 

Built with **React 18, Vite 6, Tailwind CSS, and Electron**, RETROSPEED operates on a **100% offline, local-first architecture** with sub-millisecond keystroke telemetry, Dynamic Difficulty Adjustment (DDA), and an authentic **Neo-Brutalist 90s OS window shell** with zero gradients.

Built by [KSM × Tech](https://ksmxtech.com), a product studio in Bhubaneswar, India.

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

## 🕹️ 9 Live Arcade & Defense Engines

RETROSPEED features nine distinct canvas-rendered arcade game engines built with custom 2D physics:

| Arcade Engine | Genre / Mechanics | Visual Theme |
|---|---|---|
| **🎈 Balloon Ninja** | **Garden Slicer**: Sine-wave floating teardrop balloons on trapeze bars, active target sunburst halo `< K >`, parabolic ninja leap, and glowing katana slash beam. | Daylight denim sky, karst mountain peaks, cliff rim, and lilypad lake. |
| **👾 Monster Attack** | **Space Defender**: Advancing 8-bit alien saucers, drones, and octopi descending along orbital attack vectors with dual rotating plasma turrets. | Dark starfield cosmos, planetary rings, and mint laser bolts. |
| **🏺 Temple Bash** | **Physics Crumble**: Falling hieroglyphic rune monoliths, golden bronze warhammer windup, ground screen-shake, and stone rubble physics. | Ancient Egyptian sandstone desert sanctuary with massive pillars. |
| **🫧 Floating Bubbles** | **Hydrodynamic Diver**: Translucent matte bubble spheres floating up from the deep; popping releases water droplet splash particles and ripple rings. | Deep ocean coral trench seabed with surface barrier line. |
| **🍎 Apple Thieves** | **Harvest Defense**: Dangling apples with leaf stems; bandit raccoon aiming wooden slingshot with parabolic acorn projectile physics. | Autumn orchard canopy with warm cream paper backdrop. |
| **☄️ Meteor Words** | **Atmospheric Missile Defense**: Multisyllabic falling keywords with spatial threat ranking $P(w) = \frac{v_w}{y_{max} - y_w} \cdot (1 + \text{len})$, Bézier intercept missiles, and screen shake. | Orbital neon defense grid with radar scan lines. |
| **🏎️ Velocity GP** | **Multi-lane Grand Prix**: 15-keystroke sliding-window instantaneous speed $IWPM$, ARIMA AI ghost racers, oil slicks, and turbo boosts. | High-contrast retro asphalt speedway with chequered flags. |
| **💣 Word Bomb** | **Ticking Keyword Match**: Prefix Trie matching over a 5,000+ word dictionary, exponential fuse decay $T_{fuse}(k) = T_0 \cdot e^{-\lambda k}$, and Zipf rarity scoring. | Steampunk explosive chamber with ticking detonators. |
| **⚡ Syntax Matrix** | **AST Token Defense**: Syntactic code parsing (keywords, identifiers, literals, operators), auto-indentation, and pinky-finger fatigue mitigation. | Cyberpunk IDE terminal with cascading matrix code streams. |

---

## 📚 13-Track Comprehensive Curriculum

RETROSPEED ships with 13 structured tracks comprising over 700+ individual progressive lessons and challenges:

1. **Keystroke Foundations**: Pure tactile muscle memory drills for home row, top row, bottom row, and numbers.
2. **KeyCraft Odyssey**: The master journey from single letters to advanced full-keyboard mastery.
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
│   │   ├── StatsDashboard.jsx     # Telemetry diagnostics, WPM charts, heatmaps & problem keys
│   │   ├── BadgesDashboard.jsx    # 24 unlockable achievement trophies across 5 categories
│   │   ├── QuickDrillPlayer.jsx   # 30s/60s/90s/120s standalone speed & accuracy sprint engine
│   │   ├── LessonPlayer.jsx       # Stream typing window, hands guide & real-time metric HUD
│   │   ├── LessonMap.jsx          # Journey map with stone milestone archways & stage drawer
│   │   ├── ShopView.jsx           # Theme customizer & player profile customization
│   │   ├── VideoPlayer.jsx        # Educational typing video player with synchronized transcripts
│   │   ├── ScoreModal.jsx         # 5-star pop-in victory modal with confetti and XP counter
│   │   ├── games/                 # 9 Canvas-rendered arcade defense game engines
│   │   │   ├── BalloonNinjaGame.jsx
│   │   │   ├── MonsterAttackGame.jsx
│   │   │   ├── TempleBashGame.jsx
│   │   │   ├── FloatingBubblesGame.jsx
│   │   │   ├── AppleThievesGame.jsx
│   │   │   ├── FallingWordsDefenseGame.jsx
│   │   │   ├── TypingRacerGame.jsx
│   │   │   ├── WordBombGame.jsx
│   │   │   └── SyntaxHackerGame.jsx
│   │   ├── animation/             # Rive runtime, Tachometer Speedometer, Combo Flame & Mascot
│   │   └── ui/                    # Reusable Neo-Brutalist primitives (Button, Card, Modal, Badge, etc.)
│   ├── data/
│   │   ├── curriculum.js          # Course registry and level loader
│   │   ├── courseCatalog.js       # Metadata for all 13 official courses
│   │   ├── achievementsData.js    # 24 achievements with progression evaluators
│   │   └── courses/*.json         # Lesson definitions with target keys and exercise text
│   └── utils/
│       ├── telemetryEngine.js     # High-resolution IKI, HT, FT, FI, and FLB calculator
│       ├── ddaEngine.js           # Dynamic Difficulty Adjustment differential update loop
│       ├── lexiconTrie.js         # Prefix Trie with 5,000+ words and Zipf frequency rankings
│       ├── storage.js             # Local-first persistence engine (v2 storage schema)
│       └── audio.js               # Web Audio API procedural synthesizer and sound FX
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
| **Icons** | `lucide-react` | Clean, crisp interface iconography |
| **Audio Synthesizer** | Web Audio API | Procedural sound generation without heavy MP3 asset bloat |
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
MIT License. Created with ❤️ by Prasad at **KSM × Tech Studio** (Bhubaneswar, India).
