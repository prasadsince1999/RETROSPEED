import React from 'react';

/**
 * GameEnvironment
 * Layered SVG parallax environmental backdrops for all authentic EdClub game worlds:
 * 1. Daylight Sky with Karst Mountains & Clouds (Balloon Ninja / Valley)
 * 2. Deep Ocean Abyss with God Rays (Floating Bubbles Ocean)
 * 3. Ancient Sandstone Desert Temple (Temple Bash Hieroglyphs)
 * 4. Orchard Tree Canopy (Apple Thieves Orchard)
 * 5. Orbital Cosmos (Monster Space Defense)
 */

// 1. Daylight Sky with Karst Mountains & Clouds Backdrop
function DaylightKarstSkyEnvironment({ animated = true }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100">
      
      {/* Radiant Sun & Lens Corona */}
      <div className="absolute top-6 right-16 w-44 h-44 rounded-full bg-amber-100/50 blur-2xl pointer-events-none" />
      <div className="absolute top-12 right-24 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-100 shadow-[0_0_60px_rgba(251,191,36,0.8)] pointer-events-none" />
      
      {/* Wind Streaks */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent animate-wind-drift" />
        <div className="absolute top-44 left-10 w-full h-[1.5px] bg-gradient-to-r from-transparent via-sky-100/60 to-transparent animate-wind-drift" style={{ animationDelay: '2s' }} />
        <div className="absolute top-72 -left-10 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-200/50 to-transparent animate-wind-drift" style={{ animationDelay: '3.5s' }} />
      </div>

      {/* Layered Vector Sky Scene: Distant Karst Peaks & Mountain Silhouettes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="karstFarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#bfdbfe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="karstMidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="karstNearGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#1d4ed8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Distant Misty Karst Spire Silhouette Peaks (Guilin / Halong Bay style) */}
        <g opacity="0.6">
          <path
            d="M -50 650 Q 80 320 180 310 Q 240 310 320 650 L -50 650 Z"
            fill="url(#karstFarGrad)"
          />
          <path
            d="M 280 650 Q 390 260 470 240 Q 560 250 660 650 L 280 650 Z"
            fill="url(#karstFarGrad)"
          />
          <path
            d="M 600 650 Q 720 290 820 280 Q 910 290 1020 650 L 600 650 Z"
            fill="url(#karstFarGrad)"
          />
          <path
            d="M 980 650 Q 1120 220 1240 210 Q 1340 230 1490 650 L 980 650 Z"
            fill="url(#karstFarGrad)"
          />
        </g>

        {/* Midground Karst Mountain Peaks with atmospheric depth */}
        <g opacity="0.8">
          <path
            d="M 60 750 Q 160 400 240 390 Q 330 410 420 750 Z"
            fill="url(#karstMidGrad)"
          />
          <path
            d="M 450 750 Q 560 350 670 340 Q 780 360 880 750 Z"
            fill="url(#karstMidGrad)"
          />
          <path
            d="M 850 750 Q 980 380 1090 360 Q 1200 390 1320 750 Z"
            fill="url(#karstMidGrad)"
          />
          <path
            d="M 1250 750 Q 1340 440 1420 420 Q 1480 440 1520 750 Z"
            fill="url(#karstMidGrad)"
          />
        </g>

        {/* Foreground Mountain Ridges & Cliff Base Silhouettes */}
        <path
          d="M -20 900 L -20 640 Q 180 580 360 640 Q 560 700 780 620 Q 1020 540 1220 620 Q 1380 680 1460 640 L 1460 900 Z"
          fill="url(#karstNearGrad)"
        />

        {/* Soaring Distant Birds Flocks */}
        <g fill="#1e293b" opacity="0.45">
          <path d="M 220 180 Q 228 172 236 180 Q 244 172 252 180 Q 244 176 236 182 Q 228 176 220 180 Z" />
          <path d="M 255 195 Q 261 189 267 195 Q 273 189 279 195 Q 273 192 267 196 Q 261 192 255 195 Z" />
          <path d="M 240 215 Q 245 210 250 215 Q 255 210 260 215 Q 255 212 250 216 Q 245 212 240 215 Z" />
          <path d="M 940 140 Q 948 132 956 140 Q 964 132 972 140 Q 964 136 956 142 Q 948 136 940 140 Z" />
          <path d="M 975 155 Q 981 149 987 155 Q 993 149 999 155 Q 993 152 987 156 Q 981 152 975 155 Z" />
        </g>
      </svg>

      {/* Floating Cloud Layers */}
      <div className={`absolute inset-0 pointer-events-none ${animated ? 'animate-wind-drift' : ''}`}>
        <div className="absolute top-16 left-12 w-96 h-28 bg-white/70 rounded-full blur-2xl opacity-80" />
        <div className="absolute top-28 right-24 w-80 h-24 bg-white/60 rounded-full blur-2xl opacity-75" />
        <div className="absolute top-52 left-1/3 w-[32rem] h-32 bg-sky-100/50 rounded-full blur-3xl opacity-60" />
      </div>
    </div>
  );
}

// 2. Deep Ocean Abyss with God Rays Backdrop
function DeepOceanAbyssEnvironment({ animated = true }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#0369a1] via-[#082f49] to-[#020617]">
      
      {/* Volumetric Angled God Rays Beaming from Water Surface */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <div 
          className={`absolute -top-32 left-1/4 w-32 h-[1200px] bg-gradient-to-b from-cyan-200 via-cyan-400/30 to-transparent transform -rotate-25 origin-top blur-xl ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ animationDuration: '6s' }}
        />
        <div 
          className={`absolute -top-32 left-1/2 w-48 h-[1300px] bg-gradient-to-b from-sky-100 via-cyan-300/25 to-transparent transform -rotate-20 origin-top blur-2xl ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ animationDuration: '8s', animationDelay: '2s' }}
        />
        <div 
          className={`absolute -top-32 right-1/4 w-36 h-[1100px] bg-gradient-to-b from-teal-200 via-sky-400/20 to-transparent transform -rotate-15 origin-top blur-xl ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ animationDuration: '7s', animationDelay: '4s' }}
        />
      </div>

      {/* Surface Light Water Caustics & Shimmer Waves */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-cyan-300/30 via-sky-400/10 to-transparent pointer-events-none border-b border-cyan-200/20" />

      {/* Ambient Rising Micro-bubbles Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={`ambient-bubble-${i}`}
            className="absolute rounded-full bg-cyan-200/40 border border-white/60 shadow-[0_0_6px_rgba(34,211,238,0.6)] animate-float-fade"
            style={{
              width: `${4 + (i % 5) * 3}px`,
              height: `${4 + (i % 5) * 3}px`,
              left: `${(i * 5.7 + 3) % 96}%`,
              bottom: `${(i * 12 + 10) % 85}%`,
              animationDuration: `${3.5 + (i % 4) * 1.5}s`,
              animationDelay: `${(i * 0.45) % 4}s`,
              animationIterationCount: 'infinite'
            }}
          />
        ))}
      </div>

      {/* Deep Underwater Trench & Coral / Kelp Silhouette SVGs */}
      <svg
        className="absolute bottom-0 inset-x-0 w-full h-80 pointer-events-none opacity-80"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="abyssFloorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        {/* Distant Sea Floor Ridge */}
        <path
          d="M 0 400 L 0 240 Q 240 180 480 260 Q 720 320 960 220 Q 1200 160 1440 240 L 1440 400 Z"
          fill="url(#abyssFloorGrad)"
        />
        {/* Kelp Forest Silhouettes on Sides */}
        <g fill="#075985" opacity="0.7">
          <path d="M 60 400 Q 80 280 50 180 Q 70 80 50 0 Q 30 80 50 180 Q 20 280 40 400 Z" />
          <path d="M 120 400 Q 150 290 130 200 Q 160 120 140 30 Q 110 120 130 200 Q 90 290 100 400 Z" />
          <path d="M 1340 400 Q 1310 270 1350 170 Q 1320 80 1350 10 Q 1370 80 1350 170 Q 1380 270 1360 400 Z" />
          <path d="M 1400 400 Q 1380 300 1410 210 Q 1390 130 1420 40 Q 1440 130 1410 210 Q 1430 300 1420 400 Z" />
        </g>
      </svg>
    </div>
  );
}

// 3. Ancient Sandstone Desert Temple Backdrop
function AncientSandstoneTempleEnvironment({ animated = true }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#4c1d95] via-[#854d0e] to-[#451a03]">
      
      {/* Twilight Sunset Solar Disc & Radiant Aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-orange-500 shadow-[0_0_80px_rgba(245,158,11,0.9)] pointer-events-none" />

      {/* Drifting Sand & Dust Haze Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-48 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-300/60 to-transparent animate-wind-drift" style={{ animationDuration: '9s' }} />
        <div className="absolute top-72 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-orange-300/50 to-transparent animate-wind-drift" style={{ animationDuration: '7s', animationDelay: '2.5s' }} />
        <div className="absolute bottom-40 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-200/40 to-transparent animate-wind-drift" style={{ animationDuration: '11s', animationDelay: '1s' }} />
      </div>

      {/* Layered Desert Pyramids, Monoliths & Carved Sandstone Pillars */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pyramidDistantGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="pyramidMidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#451a03" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="templePillarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#291102" />
          </linearGradient>
        </defs>

        {/* Distant Great Pyramid Silhouettes */}
        <g opacity="0.75">
          <polygon points="340,360 480,560 200,560" fill="url(#pyramidDistantGrad)" />
          <polygon points="340,360 380,560 480,560" fill="#92400e" opacity="0.8" />
          <polygon points="1080,340 1240,560 920,560" fill="url(#pyramidDistantGrad)" />
          <polygon points="1080,340 1130,560 1240,560" fill="#92400e" opacity="0.8" />
        </g>

        {/* Midground Sand Dunes */}
        <path
          d="M 0 680 Q 360 520 720 620 Q 1080 720 1440 560 L 1440 900 L 0 900 Z"
          fill="url(#pyramidMidGrad)"
        />

        {/* Authentic Carved Temple Colonnades on Flanks with Hieroglyphs */}
        <g>
          {/* Left Colonnade */}
          <rect x="40" y="240" width="80" height="660" fill="url(#templePillarGrad)" stroke="#f59e0b" strokeWidth="2" />
          <rect x="25" y="220" width="110" height="24" rx="4" fill="#d97706" stroke="#fef3c7" strokeWidth="1" />
          <line x1="80" y1="260" x2="80" y2="900" stroke="#f59e0b" strokeWidth="1" strokeDasharray="6 6" />
          <text x="80" y="320" fill="#fde68a" fontSize="24" textAnchor="middle" opacity="0.8">𓋹</text>
          <text x="80" y="420" fill="#fde68a" fontSize="24" textAnchor="middle" opacity="0.8">𓂀</text>
          <text x="80" y="520" fill="#fde68a" fontSize="24" textAnchor="middle" opacity="0.8">𓁐</text>
          <text x="80" y="620" fill="#fde68a" fontSize="24" textAnchor="middle" opacity="0.8">𓆃</text>

          {/* Right Colonnade */}
          <rect x="1320" y="240" width="80" height="660" fill="url(#templePillarGrad)" stroke="#f59e0b" strokeWidth="2" />
          <rect x="1305" y="220" width="110" height="24" rx="4" fill="#d97706" stroke="#fef3c7" strokeWidth="1" />
          <line x1="1360" y1="260" x2="1360" y2="900" stroke="#f59e0b" strokeWidth="1" strokeDasharray="6 6" />
          <text x="1360" y="320" fill="#fde68a" fontSize="24" textAnchor="middle" opacity="0.8">𓇯</text>
          <text x="1360" y="420" fill="#fde68a" fontSize="24" textAnchor="middle" opacity="0.8">𓈖</text>
          <text x="1360" y="520" fill="#fde68a" fontSize="24" textAnchor="middle" opacity="0.8">𓊃</text>
          <text x="1360" y="620" fill="#fde68a" fontSize="24" textAnchor="middle" opacity="0.8">𓂋</text>
        </g>
      </svg>
    </div>
  );
}

// 4. Orchard Tree Canopy Backdrop
function OrchardTreeCanopyEnvironment({ animated = true }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#38bdf8] via-[#a7f3d0] to-[#15803d]">
      
      {/* Morning Sun Filtering Through Foliage */}
      <div className="absolute top-4 left-1/3 w-64 h-64 rounded-full bg-yellow-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-8 left-1/3 w-28 h-28 rounded-full bg-yellow-100/90 shadow-[0_0_70px_rgba(253,224,71,0.8)] pointer-events-none" />

      {/* Dappled Sunbeams / Bokeh Discs */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-1/4 w-16 h-16 rounded-full bg-yellow-100/60 blur-md animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-36 right-1/3 w-24 h-24 rounded-full bg-emerald-100/50 blur-lg animate-pulse" style={{ animationDuration: '6s', animationDelay: '1.5s' }} />
        <div className="absolute top-48 left-2/3 w-20 h-20 rounded-full bg-lime-100/40 blur-md animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }} />
      </div>

      {/* Ambient Drifting Leaves Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`orchard-leaf-${i}`}
            className="absolute rounded-tr-full rounded-bl-full shadow-sm animate-float-fade"
            style={{
              width: `${10 + (i % 4) * 4}px`,
              height: `${8 + (i % 3) * 3}px`,
              backgroundColor: i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#f59e0b' : '#22c55e',
              left: `${(i * 8.3 + 5) % 92}%`,
              top: `${(i * 7 + 10) % 70}%`,
              transform: `rotate(${(i * 45) % 360}deg)`,
              animationDuration: `${4.5 + (i % 3) * 2}s`,
              animationDelay: `${(i * 0.6) % 5}s`,
              animationIterationCount: 'infinite'
            }}
          />
        ))}
      </div>

      {/* Layered Lush Tree Canopy & Rolling Orchard Hills */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="leafCanopyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="60%" stopColor="#166534" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="orchardHillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="60%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
        </defs>

        {/* Top Framing Leafy Tree Canopy Clusters */}
        <g fill="url(#leafCanopyGrad)">
          <ellipse cx="120" cy="40" rx="220" ry="140" />
          <ellipse cx="440" cy="20" rx="260" ry="120" />
          <ellipse cx="800" cy="10" rx="240" ry="110" />
          <ellipse cx="1160" cy="30" rx="260" ry="130" />
          <ellipse cx="1400" cy="50" rx="200" ry="140" />
          <ellipse cx="0" cy="140" rx="140" ry="180" opacity="0.9" />
          <ellipse cx="1440" cy="140" rx="140" ry="180" opacity="0.9" />
        </g>

        {/* Sprawling Tree Branches Framing */}
        <g stroke="#78350f" strokeWidth="14" strokeLinecap="round" fill="none">
          <path d="M 0 100 Q 140 120 280 80" />
          <path d="M 1440 100 Q 1300 120 1160 80" />
          <path d="M 280 80 Q 360 60 440 90" strokeWidth="8" />
          <path d="M 1160 80 Q 1080 60 1000 90" strokeWidth="8" />
        </g>

        {/* Rolling Orchard Hills */}
        <path
          d="M 0 720 Q 360 600 720 680 Q 1080 760 1440 640 L 1440 900 L 0 900 Z"
          fill="url(#orchardHillGrad)"
        />

        {/* Rustic Split-Rail Orchard Wooden Fence */}
        <g stroke="#78350f" strokeWidth="5" strokeLinecap="round" opacity="0.8">
          <line x1="80" y1="760" x2="480" y2="740" />
          <line x1="80" y1="780" x2="480" y2="760" />
          <line x1="140" y1="730" x2="140" y2="800" strokeWidth="8" />
          <line x1="280" y1="720" x2="280" y2="790" strokeWidth="8" />
          <line x1="420" y1="710" x2="420" y2="780" strokeWidth="8" />
        </g>
      </svg>
    </div>
  );
}

// 5. Orbital Cosmos Backdrop (Space Defense)
function OrbitalCosmosEnvironment({ animated = true }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]">
      
      {/* Deep Galactic Nebula Clouds */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      <div className="absolute top-48 right-16 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[30rem] h-64 rounded-full bg-pink-600/15 blur-3xl pointer-events-none" />

      {/* Massive Ringed Planetary Giant */}
      <div className="absolute top-12 right-20 w-44 h-44 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-900 via-purple-700 to-pink-500 shadow-[0_0_50px_rgba(168,85,247,0.7)]" />
        <div className="absolute -inset-4 top-16 h-8 rounded-full border-4 border-cyan-300/60 transform -rotate-25 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
      </div>

      {/* Twinkling Starfield Multi-Layer Canvas / SVGs */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`cosmos-star-${i}`}
            className={`absolute rounded-full ${
              i % 4 === 0
                ? 'bg-cyan-300 shadow-[0_0_6px_#22d3ee]'
                : i % 3 === 0
                  ? 'bg-amber-200 shadow-[0_0_6px_#fde047]'
                  : 'bg-white shadow-[0_0_4px_#ffffff]'
            } ${animated && i % 2 === 0 ? 'animate-pulse' : ''}`}
            style={{
              width: `${1.5 + (i % 3)}px`,
              height: `${1.5 + (i % 3)}px`,
              left: `${(i * 7.7 + 2) % 98}%`,
              top: `${(i * 11.3 + 4) % 96}%`,
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i * 0.3) % 3}s`
            }}
          />
        ))}
      </div>

      {/* Holographic Cybernetic Defense Grid & Horizon Reticle */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="700" x2="1440" y2="700" stroke="#06b6d4" strokeWidth="1" strokeDasharray="8 8" />
        <line x1="0" y1="760" x2="1440" y2="760" stroke="#0ea5e9" strokeWidth="1.5" />
        <line x1="0" y1="840" x2="1440" y2="840" stroke="#38bdf8" strokeWidth="2" />
        {/* Perspective grid lines converging to center horizon */}
        {Array.from({ length: 15 }).map((_, i) => {
          const xBottom = (i * 1440) / 14;
          return (
            <line
              key={`grid-line-${i}`}
              x1="720"
              y1="700"
              x2={xBottom}
              y2="900"
              stroke="#0891b2"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function GameEnvironment({
  theme = 'daylight-sky',
  animated = true,
  overlayVignette = true,
  className = '',
  children
}) {
  const normalizedTheme = (theme || 'daylight-sky').toLowerCase();

  let environmentContent = null;

  if (
    normalizedTheme.includes('sky') || 
    normalizedTheme.includes('karst') || 
    normalizedTheme.includes('balloon') || 
    normalizedTheme.includes('valley') || 
    normalizedTheme.includes('ninja')
  ) {
    environmentContent = <DaylightKarstSkyEnvironment animated={animated} />;
  } else if (
    normalizedTheme.includes('ocean') || 
    normalizedTheme.includes('abyss') || 
    normalizedTheme.includes('bubble') || 
    normalizedTheme.includes('sea') || 
    normalizedTheme.includes('water')
  ) {
    environmentContent = <DeepOceanAbyssEnvironment animated={animated} />;
  } else if (
    normalizedTheme.includes('temple') || 
    normalizedTheme.includes('desert') || 
    normalizedTheme.includes('bash') || 
    normalizedTheme.includes('sandstone') || 
    normalizedTheme.includes('pyramid')
  ) {
    environmentContent = <AncientSandstoneTempleEnvironment animated={animated} />;
  } else if (
    normalizedTheme.includes('orchard') || 
    normalizedTheme.includes('apple') || 
    normalizedTheme.includes('thief') || 
    normalizedTheme.includes('tree') || 
    normalizedTheme.includes('canopy')
  ) {
    environmentContent = <OrchardTreeCanopyEnvironment animated={animated} />;
  } else if (
    normalizedTheme.includes('cosmos') || 
    normalizedTheme.includes('space') || 
    normalizedTheme.includes('orbital') || 
    normalizedTheme.includes('monster') || 
    normalizedTheme.includes('alien')
  ) {
    environmentContent = <OrbitalCosmosEnvironment animated={animated} />;
  } else {
    // Default fallback
    environmentContent = <DaylightKarstSkyEnvironment animated={animated} />;
  }

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {environmentContent}
      
      {/* Subtle Depth Vignette Overlay */}
      {overlayVignette && (
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      )}

      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
}

export {
  DaylightKarstSkyEnvironment,
  DeepOceanAbyssEnvironment,
  AncientSandstoneTempleEnvironment,
  OrchardTreeCanopyEnvironment,
  OrbitalCosmosEnvironment
};
