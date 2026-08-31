import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const barColors = {
  sky: '#4BA3E3',
  blue: '#4BA3E3',
  primary: '#4BA3E3',
  mustard: '#F6C445',
  amber: '#F6C445',
  gold: '#F6C445',
  warning: '#F6C445',
  coral: '#F28B82',
  rose: '#F28B82',
  danger: '#F28B82',
  red: '#F28B82',
  teal: '#48B89F',
  emerald: '#48B89F',
  green: '#48B89F',
  success: '#48B89F',
  lilac: '#C3A6E8',
  purple: '#C3A6E8',
  dark: '#2D2319',
  default: '#4BA3E3'
};

const barBgClasses = {
  sky: 'bg-[#4BA3E3]',
  blue: 'bg-[#4BA3E3]',
  primary: 'bg-[#4BA3E3]',
  mustard: 'bg-[#F6C445]',
  amber: 'bg-[#F6C445]',
  gold: 'bg-[#F6C445]',
  warning: 'bg-[#F6C445]',
  coral: 'bg-[#F28B82]',
  rose: 'bg-[#F28B82]',
  danger: 'bg-[#F28B82]',
  red: 'bg-[#F28B82]',
  teal: 'bg-[#48B89F]',
  emerald: 'bg-[#48B89F]',
  green: 'bg-[#48B89F]',
  success: 'bg-[#48B89F]',
  lilac: 'bg-[#C3A6E8]',
  purple: 'bg-[#C3A6E8]',
  dark: 'bg-[#2D2319]',
  default: 'bg-[#4BA3E3]'
};

const barHeights = {
  xs: 'h-2',
  sm: 'h-3',
  md: 'h-5',
  lg: 'h-7'
};

/**
 * Retro vertical-striped segmented ProgressBar in dark-bordered cream box (||||||||||||).
 */
export const ProgressBar = forwardRef(function ProgressBar(
  {
    value = 0,
    max = 100,
    min = 0,
    height = 'md',
    variant,
    color = 'primary',
    showLabel = false,
    labelPosition = 'outside',
    label,
    sublabel,
    labelFormat,
    striped = true,
    animated = false,
    className,
    barClassName,
    ...props
  },
  ref
) {
  const safeMin = Number(min) || 0;
  const safeMax = Number(max) || 100;
  const safeVal = Number(value) || 0;

  const percentage = Math.min(100, Math.max(0, ((safeVal - safeMin) / (safeMax - safeMin)) * 100));
  const roundedPct = Math.round(percentage);

  const formattedLabel = labelFormat
    ? (typeof labelFormat === 'function' ? labelFormat(roundedPct, safeVal, safeMax) : labelFormat)
    : `${roundedPct}%`;

  const selectedKey = variant || color || 'primary';
  const fillColor = barColors[selectedKey] || barColors.default;
  const fillBgClass = barBgClasses[selectedKey] || barBgClasses.default;
  const currentHeight = barHeights[height] || barHeights.md;

  return (
    <div ref={ref} className={cn('w-full select-none font-sans', className)} {...props}>
      {/* Outside Top Label / Header row if provided */}
      {(showLabel && labelPosition === 'outside') || label || sublabel ? (
        <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-[#2D2319]">
          <div>{label || (showLabel && <span>Progress</span>)}</div>
          <div className="font-mono">{sublabel || (showLabel && formattedLabel)}</div>
        </div>
      ) : null}

      {/* Retro Dark-Bordered Cream Box Track */}
      <div
        className={cn(
          'w-full bg-[#FDF8EE] border-2 border-[#2D2319] rounded-lg p-0.5 shadow-[2px_2px_0px_#2D2319] overflow-hidden relative',
          currentHeight
        )}
        role="progressbar"
        aria-valuenow={safeVal}
        aria-valuemin={safeMin}
        aria-valuemax={safeMax}
        aria-label="Progress Bar"
      >
        {/* Striped Segmented Fill */}
        <div
          className={cn(
            'h-full rounded-[3px] transition-all duration-300 ease-out flex items-center justify-center relative overflow-hidden border border-[#2D2319]',
            fillBgClass,
            barClassName
          )}
          style={{
            width: `${percentage}%`,
            backgroundImage: striped
              ? `repeating-linear-gradient(90deg, ${fillColor} 0px, ${fillColor} 6px, #2D2319 6px, #2D2319 8px)`
              : undefined
          }}
        >
          {/* Inside Label */}
          {showLabel && labelPosition === 'inside' && height !== 'xs' && height !== 'sm' && percentage > 18 && (
            <span className="text-[10px] font-black text-[#2D2319] bg-[#FDF8EE] px-1.5 py-0.2 rounded border border-[#2D2319] truncate shadow-[1px_1px_0px_#2D2319] font-mono select-none">
              {formattedLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
