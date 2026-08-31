# ✦ RETROSPEED — Race Your Fingers

> **"Type keywords. Beat the clock. Improve every day."**

**RETROSPEED** is an arcade-powered, mathematically grounded desktop touch typing trainer and coding velocity studio built with React, Vite, Tailwind CSS, and Electron. Featuring a **100% Solid Retro Neo-Brutalist design system**, real-time keystroke telemetry (IKI, HT, FT, KPL, KRL), Dynamic Difficulty Adjustment (DDA), and 9 responsive arcade game engines.

---

## 🌟 Key Features

### 🖥️ Native Desktop Window OS Experience
- **Retro 90s OS Shell**: Solid Lilac titlebar (`#C3A6E8`), native controls (`_ □ ✕`), menu bar (`Game`, `Tracks`, `Stats`, `Settings`, `Help`), and hard offset drop shadows (`shadow-[4px_4px_0px_#2D2319]`).
- **Unified Window Workspace**: All drills, practice hubs, challenge suites, diagnostics, achievements, and arcade games run inside the unified native window frame.
- **Zero Gradients**: High-contrast, accessibility-friendly solid pastel color palette.

### 📚 Comprehensive 13-Track Curriculum
1. **Keystroke Foundations**: Pure muscle memory drills for home row, top row, bottom row, and punctuation.
2. **KeyCraft Odyssey**: Comprehensive 700+ milestone adventure across all keyboard zones.
3. **Syntax Forge (Developer Track)**: Real-world syntax practice for JavaScript, TypeScript, Python, Rust, Go, CSS, SQL, and HTML.
4. **Global Lexicon & Etymology**: Loanwords, Greco-Roman roots, linguistics, and multicultural terminology.
5. **Chronicles of Mystery**: Detective case dossiers, noir investigation logs, and cipher solving.
6. **Symphony & Harmonic Keys**: Music theory, tempo rhythm typing, and notation.
7. **Atlas of 50 States**: Geography, state capitals, historical landmarks, and US history.
8. **The Curiosity Vault**: Fascinating science facts, astronomy, quantum physics, and biology.
9. **Pioneers & Innovators**: Biographies of computing legends (Turing, Lovelace, Hopper, Berners-Lee).
10. **Wild Kingdom**: Zoological classification, ecology, and wildlife conservation.
11. **Literary Heritage & Vocabulary**: Classical literature, rhetoric, and SAT/GRE vocabulary.
12. **Ergo Dvorak Layout**: Full transition path from QWERTY to Dvorak ergonomic layout.
13. **Speed Colemak Layout**: Transition path to Colemak speed layout.

### 🕹️ 9 Live Arcade & Defense Engines
- **🎈 Balloon Ninja**: Garden slicer with sine-wave floating teardrop balloons, active target sunburst halo `< K >`, and katana slash arcs.
- **👾 Monster Attack**: Orbital defense against 8-bit alien invaders with dual rotating plasma turrets.
- **🏺 Temple Bash**: Sandstone desert sanctuary with falling hieroglyphic rune monoliths and warhammer smash physics.
- **🫧 Floating Bubbles**: Deep ocean trench diver with hydrodynamic rising bubbles and splash particle bursts.
- **🍎 Apple Thieves**: Autumn orchard harvest with slingshot raccoon firing acorns at falling apples.
- **☄️ Meteor Words Defense**: Real-time atmospheric missile defense with spatial priority threat ranking.
- **🏎️ Velocity Grand Prix**: Multi-lane racing simulator with ARIMA AI ghost racers and sliding-window instantaneous WPM.
- **💣 Word Bomb**: Ticking time-bomb anagram solver powered by a 5,000+ word Prefix Trie with Zipf frequency scoring.
- **⚡ Syntax Matrix**: AST token defense defending firewalls against malicious code packets.

### 📊 Mathematical Telemetry & Diagnostics
- **Sub-millisecond Latencies**: Inter-Keystroke Interval ($IKI$), Hold Time ($HT$), Flight Time ($FT$), Keystroke Press Latency ($KPL$), Keystroke Release Latency ($KRL$).
- **Statistical Modeling**: Log-Normal Distribution modeling $(\mu, \sigma)$ for keystroke intervals.
- **Cognitive Diagnostics**: Fluster Index ($FI$) measuring post-error hesitation and panic keystrokes.
- **Finger Load Balance ($FLB$)**: Real-time ergonomic finger load distribution analysis.
- **Dynamic Difficulty Adjustment ($DDA$)**: Adaptive difficulty variable $D \in [0.1, 1.0]$ adjusting spawn rates, vocabulary complexity, and time limits to keep players in psychological flow.
- **Interactive Keyboard Heatmap**: Per-key accuracy, hit counts, and error-frequency analysis.

### 🏆 24 Unlocked Achievements & Player Progression
- Speed, Accuracy, Consistency/Streak, Arcade Champions, and Curriculum Mastery badges.
- Dynamic XP, leveling system, unlockable themes, and customizable player titles.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, Vite 6
- **Styling**: Tailwind CSS (Retro Neo-Brutalism tokens)
- **Desktop Runtime**: Electron 44, `electron-builder`
- **Animations**: Canvas 2D Physics, Rive (`@rive-app/react-canvas`), `canvas-confetti`
- **Icons**: `lucide-react`
- **Audio Engine**: Web Audio API Procedural Synthesizer & Sound FX

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation
```bash
git clone https://github.com/prasadsince1999/KeyCraft.git
cd KeyCraft
npm install
```

### Development Server
```bash
# Run web client in browser (http://localhost:3000)
npm run dev

# Run in Electron desktop window
npm run electron:dev
```

### Production Build
```bash
# Build optimized web assets
npm run build

# Package portable Windows executable (.exe)
npm run package:win

# Package NSIS Windows installer
npm run electron:build

# Package Microsoft Store AppX / MSIX package
npm run package:store
```

---

## 📄 License
MIT License. Created by Prasad (RETROSPEED Studio).
