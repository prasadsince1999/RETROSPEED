import React, { forwardRef } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

const tileTheme = {
  default: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#FBF6EA] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  },
  blue: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#4BA3E3] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  },
  sky: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#4BA3E3] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  },
  emerald: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#48B89F] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  },
  teal: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#48B89F] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  },
  amber: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#F6C445] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  },
  gold: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#F6C445] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  },
  purple: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#C3A6E8] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  },
  lilac: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#C3A6E8] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  },
  rose: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#F28B82] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  },
  coral: {
    bg: 'bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319]',
    iconBg: 'bg-[#F28B82] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]',
    valueColor: 'text-[#2D2319]'
  }
};

function renderIconElement(iconNode, defaultClass) {
  if (!iconNode) return null;
  if (React.isValidElement(iconNode)) return iconNode;
  if (typeof iconNode === 'function' || (typeof iconNode === 'object' && iconNode !== null)) {
    const IconComp = iconNode;
    return <IconComp className={defaultClass} />;
  }
  return iconNode;
}

/**
 * Retro MetricTile widget for WPM, Accuracy, Stars, Points, and Time.
 */
export const MetricTile = forwardRef(function MetricTile(
  {
    icon,
    value,
    label,
    title,
    subtitle,
    description,
    subtext,
    trend,
    trendValue,
    trendLabel,
    variant = 'default',
    compact = false,
    interactive = false,
    onClick,
    className,
    ...props
  },
  ref
) {
  const displayLabel = label || title;
  const displaySubtitle = subtitle || description || subtext;
  const theme = tileTheme[variant] || tileTheme.default;
  const isClickable = interactive || !!onClick;
  const resolvedIcon = renderIconElement(icon, compact ? 'w-4 h-4' : 'w-5 h-5');

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        'rounded-xl select-none flex flex-col justify-between font-sans transition-all duration-150',
        theme.bg,
        isClickable && 'cursor-pointer hover:shadow-[6px_6px_0px_#2D2319] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#2D2319]',
        compact ? 'p-3.5' : 'p-4 sm:p-5',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {displayLabel && (
            <p className="text-xs font-black uppercase tracking-wider text-[#2D2319]/80 font-display truncate">
              {displayLabel}
            </p>
          )}
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className={cn(
                'font-black tracking-tight font-display',
                compact ? 'text-xl' : 'text-2xl sm:text-3xl',
                theme.valueColor
              )}
            >
              {value}
            </span>
          </div>
        </div>

        {resolvedIcon && (
          <div
            className={cn(
              'rounded-xl flex items-center justify-center shrink-0 font-bold',
              compact ? 'w-9 h-9' : 'w-11 h-11',
              theme.iconBg
            )}
          >
            {resolvedIcon}
          </div>
        )}
      </div>

      {(displaySubtitle || trendValue || trend) && (
        <div className="mt-3 pt-2.5 border-t-2 border-[#2D2319]/15 flex items-center justify-between gap-2 text-xs font-medium">
          {displaySubtitle && (
            <span className="text-[#2D2319]/80 truncate">
              {displaySubtitle}
            </span>
          )}

          {trendValue && (
            <div
              className={cn(
                'inline-flex items-center gap-1 font-bold ml-auto shrink-0 font-mono',
                trend === 'up' && 'text-[#48B89F]',
                trend === 'down' && 'text-[#F28B82]',
                trend === 'neutral' && 'text-[#2D2319]'
              )}
            >
              {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
              <span>{trendValue}</span>
              {trendLabel && (
                <span className="text-[11px] font-normal text-[#2D2319]/60">
                  {trendLabel}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

MetricTile.displayName = 'MetricTile';

export default MetricTile;
