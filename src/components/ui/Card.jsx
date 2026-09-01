import React from 'react';
import { cn } from '../../utils/cn';

// Retro window header background color variants (100% solid matte - no gradients)
export const titleBarVariants = {
  sky: 'bg-[#4BA3E3] text-[#2D2319]',
  coral: 'bg-[#F28B82] text-[#2D2319]',
  mustard: 'bg-[#F6C445] text-[#2D2319]',
  teal: 'bg-[#48B89F] text-[#2D2319]',
  lilac: 'bg-[#C3A6E8] text-[#2D2319]',
  dark: 'bg-[#2D2319] text-[#FDF8EE]',
  cream: 'bg-[#FBF6EA] text-[#2D2319]',
  // Aliases
  blue: 'bg-[#4BA3E3] text-[#2D2319]',
  amber: 'bg-[#F6C445] text-[#2D2319]',
  rose: 'bg-[#F28B82] text-[#2D2319]',
  emerald: 'bg-[#48B89F] text-[#2D2319]',
  purple: 'bg-[#C3A6E8] text-[#2D2319]',
  default: 'bg-[var(--rs-titlebar)] text-[#2D2319]'
};

// Retro Card Container Variants
const cardVariants = {
  default: 'bg-[var(--rs-paper)] border-2 border-[#2D2319] shadow-[4px_4px_0px_var(--rs-shadow)] text-[#2D2319] transition-colors duration-200',
  flat: 'bg-[var(--rs-paper-alt)] border-2 border-[#2D2319] text-[#2D2319] transition-colors duration-200',
  bordered: 'bg-[var(--rs-paper)] border-2 border-[#2D2319] shadow-[2px_2px_0px_var(--rs-shadow)] text-[#2D2319] transition-colors duration-200',
  elevated: 'bg-[var(--rs-paper)] border-2 border-[#2D2319] shadow-[6px_6px_0px_var(--rs-shadow)] text-[#2D2319] transition-colors duration-200',
  interactive: 'bg-[var(--rs-paper)] border-2 border-[#2D2319] shadow-[4px_4px_0px_var(--rs-shadow)] text-[#2D2319] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--rs-shadow)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--rs-shadow)] cursor-pointer transition-all duration-150',
  hoverable: 'bg-[var(--rs-paper)] border-2 border-[#2D2319] shadow-[4px_4px_0px_var(--rs-shadow)] text-[#2D2319] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--rs-shadow)] cursor-pointer transition-all duration-150 overflow-hidden',
  dark: 'bg-[#2D2319] border-2 border-[#2D2319] shadow-[4px_4px_0px_var(--rs-shadow)] text-[#FDF8EE]',
  indigo: 'bg-[#4BA3E3] border-2 border-[#2D2319] shadow-[4px_4px_0px_var(--rs-shadow)] text-[#2D2319]',
  glass: 'bg-[var(--rs-paper)] border-2 border-[#2D2319] shadow-[4px_4px_0px_var(--rs-shadow)] text-[#2D2319] transition-colors duration-200',
  darkGlass: 'bg-[#2D2319] border-2 border-[#2D2319] shadow-[4px_4px_0px_var(--rs-shadow)] text-[#FDF8EE]',
  glow: 'bg-[var(--rs-paper)] border-2 border-[#2D2319] shadow-[4px_4px_0px_var(--rs-shadow)] text-[#2D2319] transition-colors duration-200'
};

const paddingSizes = {
  none: '',
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8'
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
 * Window Chrome Controls: _ □ ✕
 */
export function WindowControls({
  onMinimize,
  onMaximize,
  onClose,
  className = ''
}) {
  return (
    <div className={cn('flex items-center space-x-1 shrink-0 select-none', className)}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onMinimize) onMinimize(e);
        }}
        className="w-4 h-4 bg-[#FDF8EE] hover:bg-[#FBF6EA] border border-[#2D2319] rounded-[2px] flex items-center justify-center text-[9px] font-mono font-bold leading-none text-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none"
        title="Minimize"
        aria-label="Minimize"
      >
        _
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onMaximize) onMaximize(e);
        }}
        className="w-4 h-4 bg-[#FDF8EE] hover:bg-[#FBF6EA] border border-[#2D2319] rounded-[2px] flex items-center justify-center text-[8px] font-mono font-bold leading-none text-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none"
        title="Maximize"
        aria-label="Maximize"
      >
        □
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onClose) onClose(e);
        }}
        className="w-4 h-4 bg-[#F28B82] hover:bg-rose-400 border border-[#2D2319] rounded-[2px] flex items-center justify-center text-[9px] font-mono font-bold leading-none text-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none"
        title="Close"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}

/**
 * Retro Card / Window Component with authentic 90s OS neo-brutalist aesthetics
 */
export function Card({
  children,
  className = '',
  variant = 'default',
  title,
  titleVariant = 'sky',
  icon,
  windowControls = false,
  onClose,
  onMinimize,
  onMaximize,
  padding = 'none',
  hover = false,
  onClick,
  ...props
}) {
  const showAutoTitleBar = Boolean(title);

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl transition-all duration-150 overflow-hidden flex flex-col',
        cardVariants[variant] || cardVariants.default,
        paddingSizes[padding],
        hover && 'hover:shadow-[6px_6px_0px_#2D2319] hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {showAutoTitleBar && (
        <CardHeader
          variant={titleVariant}
          icon={icon}
          windowControls={windowControls}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
        >
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = '',
  variant = 'cream',
  title,
  icon: Icon,
  windowControls = false,
  onClose,
  onMinimize,
  onMaximize,
  ...props
}) {
  const resolvedIcon = renderIconElement(Icon, 'w-4 h-4 text-current shrink-0');
  const headerTheme = titleBarVariants[variant] || titleBarVariants.cream;

  // If structured title or windowControls is requested, render a retro titlebar row
  if (title || windowControls) {
    return (
      <div
        className={cn(
          'px-3.5 py-2 border-b-2 border-[#2D2319] flex items-center justify-between gap-2 font-mono select-none',
          headerTheme,
          className
        )}
        {...props}
      >
        <div className="flex items-center space-x-2 truncate font-bold text-xs sm:text-sm">
          {resolvedIcon}
          <span className="truncate">{title || children}</span>
        </div>

        {windowControls && (
          <WindowControls
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
          />
        )}
      </div>
    );
  }

  // Standard flexible CardHeader container
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 p-4 sm:p-6 border-b-2 border-[#2D2319]/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', as: Tag = 'h3', ...props }) {
  return (
    <Tag
      className={cn('font-black text-base sm:text-lg text-[#2D2319] leading-tight tracking-tight font-display', className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p
      className={cn('text-xs sm:text-sm text-[#2D2319]/80 font-medium', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', padding = 'md', ...props }) {
  return (
    <div
      className={cn(paddingSizes[padding] || 'p-4 sm:p-6', 'text-[#2D2319]', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div
      className={cn(
        'flex items-center p-4 sm:p-6 pt-3 border-t-2 border-[#2D2319]/20 bg-[#FBF6EA]/60 mt-auto text-[#2D2319]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;

