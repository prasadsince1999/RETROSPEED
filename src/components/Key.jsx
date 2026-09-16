import React from 'react';

/**
 * Reusable Key Component for RETROSPEED Virtual Keyboard & UI keycaps
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
  strokeWidth = 1,
  keycapStyle = 'standard'
}) {
  if (!keyDef) return null;

  // Resolve keycap style attributes
  let effectiveFill = fill;
  let effectiveStroke = stroke;
  let effectiveStrokeWidth = strokeWidth;
  let effectiveTextFill = textFill;

  if (keycapStyle === 'colorful') {
    const fingerBg = {
      'left-pinky': '#e0f2fe',
      'left-ring': '#ecfccb',
      'left-middle': '#fef9c3',
      'left-index': '#fee2e2',
      'thumbs': '#f1f5f9',
      'right-index': '#fee2e2',
      'right-middle': '#fef9c3',
      'right-ring': '#ecfccb',
      'right-pinky': '#e0f2fe',
    }[keyDef.finger] || '#f8fafc';
    effectiveFill = fingerBg;
    effectiveStroke = '#cbd5e1';
    effectiveStrokeWidth = 1.2;
    effectiveTextFill = '#1e293b';
  } else if (keycapStyle === 'glass') {
    effectiveFill = 'rgba(255, 255, 255, 0.72)';
    effectiveStroke = '#93c5fd';
    effectiveStrokeWidth = 1.5;
  } else if (keycapStyle === 'cartoon') {
    effectiveFill = '#ffffff';
    effectiveStroke = '#0f172a';
    effectiveStrokeWidth = 2.2;
    effectiveTextFill = '#0f172a';
  } else if (keycapStyle === 'classic') {
    effectiveFill = '#eae4d9';
    effectiveStroke = '#beaf9d';
    effectiveStrokeWidth = 1.5;
    effectiveTextFill = '#33271b';
  } else if (keycapStyle === 'marble') {
    effectiveFill = '#f1f5f9';
    effectiveStroke = '#94a3b8';
    effectiveStrokeWidth = 1.4;
    effectiveTextFill = '#334155';
  } else if (keycapStyle === 'modern') {
    effectiveFill = '#f8fafc';
    effectiveStroke = '#e2e8f0';
    effectiveStrokeWidth = 1;
    effectiveTextFill = '#475569';
  } else if (keycapStyle === 'wobbly') {
    effectiveFill = '#ffffff';
    effectiveStroke = '#334155';
    effectiveStrokeWidth = 1.8;
  }

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
        fill={isError ? '#ef4444' : isActive ? '#1888ff' : isShiftGuide ? '#6366f1' : isPressed ? '#38bdf8' : effectiveFill}
        stroke={isError ? '#b91c1c' : isActive ? '#0284c7' : isShiftGuide ? '#4f46e5' : isPressed ? '#0ea5e9' : effectiveStroke}
        strokeWidth={isError || isActive || isShiftGuide ? 2 : effectiveStrokeWidth}
        className={`transition-all ${
          isPressed 
            ? 'duration-75 ease-out' 
            : 'duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
        }`}
        style={{
          transform: isPressed ? 'translateY(2px) scale(0.98)' : 'none',
          transformOrigin: `${keyDef.cx}px ${keyDef.cy}px`,
          filter: isPressed
            ? (isActive ? 'drop-shadow(0 1px 4px rgba(24, 136, 255, 0.7))' : 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))')
            : isActive 
            ? 'drop-shadow(0 2px 10px rgba(24, 136, 255, 0.6))' 
            : isShiftGuide 
            ? 'drop-shadow(0 2px 8px rgba(99, 102, 241, 0.5))' 
            : keycapStyle === 'glass'
            ? 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08))'
            : 'none'
        }}
      />

      {/* Physical Home Key Bumps */}
      {keyDef.isHomeKey && (
        <line
          x1={keyDef.cx - 4.5}
          y1={keyDef.cy + 12.5}
          x2={keyDef.cx + 4.5}
          y2={keyDef.cy + 12.5}
          stroke={isActive ? '#ffffff' : effectiveTextFill}
          strokeWidth="1.6"
          strokeLinecap="round"
          className={`transition-all ${
            isPressed 
              ? 'duration-75 ease-out' 
              : 'duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
          }`}
          style={{
            transform: isPressed ? 'translateY(2px) scale(0.98)' : 'none',
            transformOrigin: `${keyDef.cx}px ${keyDef.cy}px`,
          }}
        />
      )}

      {/* Key Label Text */}
      <text
        x={keyDef.cx}
        y={keyDef.id === 'space' ? keyDef.cy + 1 : keyDef.cy - 1}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={keyDef.id === 'space' || keyDef.id === 'shift-left' || keyDef.id === 'shift-right' || keyDef.id === 'capslock' || keyDef.id === 'tab' || keyDef.id === 'enter' || keyDef.id === 'backspace' ? "12" : "15"}
        fontWeight={isActive || isShiftGuide || keyDef.isHomeKey || keycapStyle === 'cartoon' ? "700" : "500"}
        fontFamily="Rubik, system-ui, sans-serif"
        fill={isActive || isShiftGuide || isError ? '#ffffff' : effectiveTextFill}
        className={`pointer-events-none transition-all ${
          isPressed 
            ? 'duration-75 ease-out' 
            : 'duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
        }`}
        style={{
          transform: isPressed ? 'translateY(2px) scale(0.98)' : 'none',
          transformOrigin: `${keyDef.cx}px ${keyDef.cy}px`,
        }}
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
