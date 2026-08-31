import React from 'react';
import { cn } from '../../utils/cn';

const badgeVariants = {
  default: 'bg-[#FDF8EE] text-[#2D2319] border-[#2D2319]',
  primary: 'bg-[#4BA3E3] text-[#2D2319] border-[#2D2319]',
  sky: 'bg-[#4BA3E3] text-[#2D2319] border-[#2D2319]',
  emerald: 'bg-[#48B89F] text-[#2D2319] border-[#2D2319]',
  success: 'bg-[#48B89F] text-[#2D2319] border-[#2D2319]',
  amber: 'bg-[#F6C445] text-[#2D2319] border-[#2D2319]',
  warning: 'bg-[#F6C445] text-[#2D2319] border-[#2D2319]',
  gold: 'bg-[#F6C445] text-[#2D2319] border-[#2D2319]',
  rose: 'bg-[#F28B82] text-[#2D2319] border-[#2D2319]',
  danger: 'bg-[#F28B82] text-[#2D2319] border-[#2D2319]',
  coral: 'bg-[#F28B82] text-[#2D2319] border-[#2D2319]',
  purple: 'bg-[#C3A6E8] text-[#2D2319] border-[#2D2319]',
  lilac: 'bg-[#C3A6E8] text-[#2D2319] border-[#2D2319]',
  indigo: 'bg-[#C3A6E8] text-[#2D2319] border-[#2D2319]',
  teal: 'bg-[#48B89F] text-[#2D2319] border-[#2D2319]',
  cyan: 'bg-[#4BA3E3] text-[#2D2319] border-[#2D2319]',
  slate: 'bg-[#FBF6EA] text-[#2D2319] border-[#2D2319]',
  dark: 'bg-[#2D2319] text-[#FDF8EE] border-[#2D2319]',
  outline: 'bg-transparent text-[#2D2319] border-[#2D2319]',
  glow: 'bg-[#4BA3E3]/20 text-[#2D2319] border-[#2D2319]',
  glass: 'bg-[#FDF8EE] text-[#2D2319] border-[#2D2319]'
};

const badgeSizes = {
  xs: 'px-1.5 py-0.5 text-[10px] rounded-[3px]',
  sm: 'px-2 py-0.5 text-[11px] rounded-md font-bold',
  md: 'px-2.5 py-1 text-xs rounded-md font-black',
  lg: 'px-3 py-1.5 text-sm rounded-lg font-black'
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
 * Solid retro stamp badge with dark border and solid pastel fills.
 */
export function Badge({
  children,
  className = '',
  variant = 'default',
  size = 'sm',
  icon: Icon,
  dot = false,
  pulse = false,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center space-x-1.5 border-2 font-display tracking-wider uppercase select-none shadow-[2px_2px_0px_#2D2319]',
        badgeVariants[variant] || badgeVariants.default,
        badgeSizes[size] || badgeSizes.sm,
        pulse && 'animate-pulse',
        className
      )}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#2D2319] shrink-0" />
      )}
      {Icon && (
        <span className="shrink-0 inline-flex items-center justify-center">
          {renderIconElement(Icon, 'w-3.5 h-3.5')}
        </span>
      )}
      {children && <span>{children}</span>}
    </span>
  );
}

export default Badge;
