import React, { useState } from 'react';
import { Info } from 'lucide-react';

export function StatsPerformanceChart({ chartData, totalPracticeTime }) {
  const [hoveredChartIndex, setHoveredChartIndex] = useState(null);

  return (
    <div className="border-2 border-[#2D2319] bg-[var(--rs-paper)] rounded-xl shadow-[4px_4px_0px_var(--rs-shadow)] p-5 sm:p-6 text-[#2D2319] overflow-hidden transition-colors duration-200">
      {/* Chart Header & Solid Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#2D2319]/15 pb-4 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base sm:text-lg font-black text-[#2D2319] tracking-tight font-display">
              Progress Overview Timeline (Dual-Axis Chart)
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#4BA3E3] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              Interactive
            </span>
          </div>
          <p className="text-xs text-[#2D2319]/70 font-medium mt-0.5 font-mono">
            Visual correlation between daily practice duration (minutes), average WPM speed, and accuracy curves.
          </p>
        </div>

        {/* Solid Legend Indicators */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded-[2px] bg-[#4BA3E3] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] inline-block" />
            <span className="text-[#2D2319]">Practice Time (min)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-1.5 rounded-full bg-[#F6C445] border border-[#2D2319] inline-block" />
            <span className="text-[#2D2319]">Speed (WPM)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-1.5 rounded-full bg-[#10B981] border border-[#2D2319] inline-block" />
            <span className="text-[#2D2319]">Accuracy (%)</span>
          </div>
        </div>
      </div>

      {/* Pure SVG Chart Canvas */}
      <div className="relative w-full pt-2">
        {/* Floating Retro Hover Tooltip */}
        {hoveredChartIndex !== null && chartData[hoveredChartIndex] && (
          <div 
            className="absolute z-20 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full bg-[#FDF8EE] text-[#2D2319] p-3 rounded-xl shadow-[4px_4px_0px_#2D2319] border-2 border-[#2D2319] text-xs font-mono min-w-[180px]"
            style={{
              left: `${((hoveredChartIndex + 0.5) / Math.max(1, chartData.length)) * 100}%`,
              top: '25%'
            }}
          >
            <div className="text-[11px] font-bold text-[#2D2319] bg-[#F6C445] border-b-2 border-[#2D2319] px-2 py-1 -mx-3 -mt-3 rounded-t-[10px] mb-2 flex items-center justify-between">
              <span>{chartData[hoveredChartIndex].dayName}, {chartData[hoveredChartIndex].date}</span>
              <span className="px-1.5 py-0.2 bg-[#FDF8EE] rounded border border-[#2D2319] text-[9px] font-bold">
                {chartData[hoveredChartIndex].attemptsCount} sessions
              </span>
            </div>
            <div className="space-y-1 text-[#2D2319] font-bold">
              <div className="flex justify-between">
                <span className="text-[#2D2319]/70">Practice Time:</span>
                <span className="text-[#4BA3E3] font-black">{chartData[hoveredChartIndex].practiceTimeFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2D2319]/70">Typing Speed:</span>
                <span className="text-[#F59E0B] font-black">{chartData[hoveredChartIndex].wpm} WPM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2D2319]/70">Accuracy:</span>
                <span className="text-[#10B981] font-black">{chartData[hoveredChartIndex].accuracy}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Pure SVG Chart */}
        <div className="w-full h-64 sm:h-72">
          <svg 
            viewBox="0 0 800 240" 
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible select-none"
          >
            {/* Horizontal Grid Guidelines (0, 25, 50, 75, 100) */}
            {[0, 25, 50, 75, 100].map((pct, idx) => {
              const y = 200 - (pct / 100) * 160;
              return (
                <g key={idx}>
                  <line 
                    x1="45" 
                    y1={y} 
                    x2="755" 
                    y2={y} 
                    stroke="#2D2319" 
                    strokeDasharray={pct === 0 ? "none" : "4,4"} 
                    strokeWidth={pct === 0 ? "1.5" : "1"}
                    opacity={pct === 0 ? 0.8 : 0.2}
                  />
                  <text 
                    x="38" 
                    y={y + 3} 
                    fontSize="9" 
                    fill="#2D2319" 
                    textAnchor="end" 
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {pct}
                  </text>
                  <text 
                    x="762" 
                    y={y + 3} 
                    fontSize="9" 
                    fill="#2D2319" 
                    textAnchor="start" 
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {Math.round((pct / 100) * 30)}m
                  </text>
                </g>
              );
            })}

            {/* Solid Cyan Bars (#4BA3E3) */}
            {chartData.map((item, idx) => {
              const numBars = chartData.length;
              const slotWidth = 710 / numBars;
              const barWidth = Math.min(32, slotWidth * 0.45);
              const x = 45 + idx * slotWidth + (slotWidth - barWidth) / 2;
              
              const practiceMins = Number(item.practiceTimeMinutes) || 0;
              const barHeight = Math.min(160, Math.max(4, (practiceMins / 30) * 160));
              const y = 200 - barHeight;
              const isHovered = hoveredChartIndex === idx;

              return (
                <g 
                  key={`bar_${idx}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredChartIndex(idx)}
                  onMouseLeave={() => setHoveredChartIndex(null)}
                >
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="3"
                    fill={isHovered ? "#3d95d5" : "#4BA3E3"}
                    stroke="#2D2319"
                    strokeWidth="1.5"
                    className="transition-all duration-150"
                  />
                </g>
              );
            })}

            {/* Solid Amber WPM Trend Line (#F6C445) */}
            {(() => {
              if (chartData.length < 2) return null;
              const numBars = chartData.length;
              const slotWidth = 710 / numBars;
              
              const points = chartData.map((d, i) => {
                const x = 45 + i * slotWidth + slotWidth / 2;
                const wpmVal = Number(d.wpm) || 0;
                const y = 200 - Math.min(160, Math.max(0, (wpmVal / 100) * 160));
                return { x, y, val: wpmVal };
              });

              let pathD = `M ${points[0].x} ${points[0].y}`;
              for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                const cpX1 = prev.x + (curr.x - prev.x) / 2;
                const cpX2 = cpX1;
                pathD += ` C ${cpX1} ${prev.y}, ${cpX2} ${curr.y}, ${curr.x} ${curr.y}`;
              }

              return (
                <g>
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#F6C445"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {points.map((p, idx) => (
                    <circle
                      key={`wpm_pt_${idx}`}
                      cx={p.x}
                      cy={p.y}
                      r={hoveredChartIndex === idx ? 6.5 : 4.5}
                      fill="#F6C445"
                      stroke="#2D2319"
                      strokeWidth="2"
                      className="transition-all duration-150 cursor-pointer"
                      onMouseEnter={() => setHoveredChartIndex(idx)}
                      onMouseLeave={() => setHoveredChartIndex(null)}
                    />
                  ))}
                </g>
              );
            })()}

            {/* Solid Emerald Accuracy Trend Line (#10B981) */}
            {(() => {
              if (chartData.length < 2) return null;
              const numBars = chartData.length;
              const slotWidth = 710 / numBars;
              
              const points = chartData.map((d, i) => {
                const x = 45 + i * slotWidth + slotWidth / 2;
                const accVal = Number(d.accuracy) || 0;
                const y = 200 - Math.min(160, Math.max(0, (accVal / 100) * 160));
                return { x, y, val: accVal };
              });

              let pathD = `M ${points[0].x} ${points[0].y}`;
              for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                const cpX1 = prev.x + (curr.x - prev.x) / 2;
                const cpX2 = cpX1;
                pathD += ` C ${cpX1} ${prev.y}, ${cpX2} ${curr.y}, ${curr.x} ${curr.y}`;
              }

              return (
                <g>
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeDasharray="5,3"
                    strokeLinecap="round"
                  />
                  {points.map((p, idx) => (
                    <rect
                      key={`acc_pt_${idx}`}
                      x={p.x - (hoveredChartIndex === idx ? 5 : 3.5)}
                      y={p.y - (hoveredChartIndex === idx ? 5 : 3.5)}
                      width={hoveredChartIndex === idx ? 10 : 7}
                      height={hoveredChartIndex === idx ? 10 : 7}
                      transform={`rotate(45 ${p.x} ${p.y})`}
                      fill="#10B981"
                      stroke="#2D2319"
                      strokeWidth="1.5"
                      className="transition-all duration-150 cursor-pointer"
                      onMouseEnter={() => setHoveredChartIndex(idx)}
                      onMouseLeave={() => setHoveredChartIndex(null)}
                    />
                  ))}
                </g>
              );
            })()}

            {/* Bottom X Axis Days Labels */}
            {chartData.map((item, idx) => {
              const numBars = chartData.length;
              const slotWidth = 710 / numBars;
              const x = 45 + idx * slotWidth + slotWidth / 2;
              const isHovered = hoveredChartIndex === idx;

              return (
                <text
                  key={`lbl_${idx}`}
                  x={x}
                  y="222"
                  textAnchor="middle"
                  fontSize={numBars > 14 ? "8" : "10"}
                  fontWeight={isHovered ? "900" : "700"}
                  fill="#2D2319"
                  fontFamily="monospace"
                  className="transition-colors duration-150 select-none cursor-pointer"
                  onMouseEnter={() => setHoveredChartIndex(idx)}
                  onMouseLeave={() => setHoveredChartIndex(null)}
                >
                  {item.date}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Bottom Chart Footer Explanation */}
        <div className="mt-3 pt-3 border-t-2 border-[#2D2319]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#2D2319] gap-2 font-mono">
          <span className="flex items-center space-x-1.5">
            <Info className="w-4 h-4 text-[#4BA3E3] shrink-0" />
            <span>Hover over any bar or node to inspect granular session details.</span>
          </span>
          <span className="font-bold">
            Total Interval Practice: <span className="bg-[#4BA3E3] text-[#2D2319] px-2 py-0.5 rounded border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] font-black">{totalPracticeTime}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
