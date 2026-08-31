import React from 'react';

/**
 * Reusable Key Component for KeyCraft Virtual Keyboard & UI keycaps
 */
export default function Key({ 
  keyDef, 
  isActive = false, 
  isShiftGuide = false, 
  isPressed = false, 
  isError = false, 
  isShiftRequired = false,
  fill = '#ffffff', 
  stroke = '#cbd5e1', 
  textFill = '#475569',
  strokeWidth = 1 
}) {
  if (!keyDef) return null;

  return (
    <g id={`key-group-${keyDef.id}`}>
      {/* Active Glowing Contour */}
      {isActive && (
        <>
          <path
            d={keyDef.d}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            opacity="0.85"
            className="animate-pulse"
            style={{ filter: 'drop-shadow(0 0 10px #38bdf8)' }}
          />
          <circle
            cx={keyDef.cx}
            cy={keyDef.cy}
            r="24"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            opacity="0.6"
            className="animate-ping origin-center"
            style={{ transformOrigin: `${keyDef.cx}px ${keyDef.cy}px` }}
          />
        </>
      )}

      {/* Shift Guide Glowing Contour */}
      {isShiftGuide && !isActive && (
        <path
          d={keyDef.d}
          fill="none"
          stroke="#818cf8"
          strokeWidth="2.5"
          opacity="0.9"
          className="animate-pulse"
          style={{ filter: 'drop-shadow(0 0 8px #6366f1)' }}
        />
      )}

      {/* Physical Keycap */}
      <path
        id={keyDef.id}
        d={keyDef.d}
        fill={isError ? '#ef4444' : isActive ? '#1888ff' : isShiftGuide ? '#6366f1' : isPressed ? '#38bdf8' : fill}
        stroke={isError ? '#b91c1c' : isActive ? '#0284c7' : isShiftGuide ? '#4f46e5' : isPressed ? '#0ea5e9' : stroke}
        strokeWidth={isError || isActive || isShiftGuide ? 2 : strokeWidth}
        className="transition-all duration-75"
        style={{
          transform: isPressed ? 'translateY(1.5px)' : 'none',
          transformOrigin: `${keyDef.cx}px ${keyDef.cy}px`,
          filter: isActive 
            ? 'drop-shadow(0 2px 10px rgba(24, 136, 255, 0.6))' 
            : isShiftGuide 
            ? 'drop-shadow(0 2px 8px rgba(99, 102, 241, 0.5))' 
            : 'none'
        }}
      />

      {/* Physical Home Key Bumps */}
      {keyDef.isHomeKey && (
        <line
          x1={keyDef.cx - 5}
          y1={keyDef.cy + 10}
          x2={keyDef.cx + 5}
          y2={keyDef.cy + 10}
          stroke={isActive ? '#ffffff' : textFill}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}

      {/* Key Label Text */}
      <text
        x={keyDef.cx}
        y={keyDef.cy + (keyDef.id === 'space' ? 4 : 5)}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={keyDef.id === 'space' || keyDef.id === 'shift-left' || keyDef.id === 'shift-right' || keyDef.id === 'capslock' || keyDef.id === 'tab' || keyDef.id === 'enter' || keyDef.id === 'backspace' ? "12" : "15"}
        fontWeight={isActive || isShiftGuide || keyDef.isHomeKey ? "700" : "500"}
        fontFamily="Rubik, system-ui, sans-serif"
        fill={isActive || isShiftGuide || isError ? '#ffffff' : textFill}
        className="pointer-events-none transition-colors duration-75"
      >
        {keyDef.id === 'enter' && isActive 
          ? 'enter ↵' 
          : keyDef.id === 'tab' && isActive 
          ? 'tab ⇥' 
          : keyDef.id === 'space' 
          ? 'space' 
          : (isShiftRequired && keyDef.shiftLabel ? keyDef.shiftLabel : keyDef.label)}
      </text>
    </g>
  );
}
