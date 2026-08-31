import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

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
 * Retro Dropdown component with 90s OS styling, dark chocolate ink borders, and solid fills.
 */
export function Dropdown({
  isOpen: controlledIsOpen,
  onOpenChange,
  onClose,
  onOpen,
  trigger,
  header,
  footer,
  align = 'left',
  position = 'bottom',
  width = 'md',
  className,
  children,
  ...props
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledOpen;
  const dropdownRef = useRef(null);

  const setIsOpen = (nextState) => {
    if (!isControlled) {
      setUncontrolledOpen(nextState);
    }
    if (onOpenChange) {
      onOpenChange(nextState);
    }
    if (nextState && onOpen) {
      onOpen();
    } else if (!nextState && onClose) {
      onClose();
    }
  };

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        close();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const alignStyles = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
    center: 'left-1/2 -translate-x-1/2 origin-top'
  };

  const positionStyles = {
    bottom: 'top-full mt-2',
    top: 'bottom-full mb-2'
  };

  const widthStyles = {
    auto: 'min-w-[12rem] w-auto',
    sm: 'w-48',
    md: 'w-56',
    lg: 'w-64',
    xl: 'w-72',
    full: 'w-full'
  };

  const resolvedWidth = widthStyles[width] || (typeof width === 'string' && width.includes('w-') ? width : 'w-56');

  return (
    <div ref={dropdownRef} className="relative inline-block text-left select-none font-sans" {...props}>
      {/* Trigger Slot */}
      {trigger ? (
        <div onClick={toggle} className="cursor-pointer inline-flex">
          {trigger}
        </div>
      ) : null}

      {/* Menu Panel */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 rounded-xl bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] overflow-hidden animate-in fade-in zoom-in-95 duration-150',
            alignStyles[align] || alignStyles.left,
            positionStyles[position] || positionStyles.bottom,
            resolvedWidth,
            className
          )}
          role="menu"
        >
          {/* Header slot if passed as prop */}
          {header && (
            <div className="px-3.5 py-2 bg-[#F6C445] border-b-2 border-[#2D2319] text-xs font-black text-[#2D2319] font-display uppercase tracking-wider flex items-center justify-between">
              <span>{header}</span>
            </div>
          )}

          {/* Children items */}
          <div className="py-1">
            {typeof children === 'function' ? children({ close, isOpen }) : children}
          </div>

          {/* Footer slot if passed as prop */}
          {footer && (
            <div className="p-2 border-t-2 border-[#2D2319]/20 bg-[#FBF6EA]">
              {footer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const DropdownTrigger = forwardRef(function DropdownTrigger(
  { className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex items-center justify-between gap-2 px-3 py-2 text-xs sm:text-sm font-bold rounded-lg bg-[#FDF8EE] border-2 border-[#2D2319] text-[#2D2319] shadow-[2px_2px_0px_#2D2319] hover:bg-[#FBF6EA] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#2D2319] transition-all focus:outline-none',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className="w-4 h-4 text-[#2D2319] shrink-0" />
    </button>
  );
});
DropdownTrigger.displayName = 'DropdownTrigger';

export const DropdownMenu = forwardRef(function DropdownMenu(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn('py-1', className)} {...props}>
      {children}
    </div>
  );
});
DropdownMenu.displayName = 'DropdownMenu';

export const DropdownItem = forwardRef(function DropdownItem(
  {
    className,
    icon,
    rightIcon,
    selected = false,
    active = false,
    disabled = false,
    danger = false,
    shortcut,
    onClick,
    children,
    ...props
  },
  ref
) {
  const isSelected = selected || active;
  const resolvedIcon = renderIconElement(icon, 'w-4 h-4 text-current');
  const resolvedRightIcon = renderIconElement(rightIcon, 'w-4 h-4 text-[#2D2319]');

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={(e) => {
        if (disabled) return;
        if (onClick) onClick(e);
      }}
      className={cn(
        'w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm font-bold transition-colors select-none text-left border-b border-[#2D2319]/10 last:border-b-0',
        danger
          ? 'text-[#2D2319] bg-[#F28B82]/20 hover:bg-[#F28B82] hover:text-[#2D2319]'
          : isSelected
          ? 'bg-[#4BA3E3] text-[#2D2319] font-black'
          : 'text-[#2D2319] hover:bg-[#4BA3E3]/20 active:bg-[#4BA3E3]/40',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5 truncate">
        {resolvedIcon && <span className="w-4 h-4 shrink-0">{resolvedIcon}</span>}
        <div className="truncate">{children}</div>
      </div>

      <div className="flex items-center gap-2 pl-2 shrink-0">
        {shortcut && (
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#2D2319] bg-[#F6C445] border border-[#2D2319] px-1.5 py-0.2 rounded shadow-[1px_1px_0px_#2D2319]">
            {shortcut}
          </span>
        )}
        {resolvedRightIcon ? (
          resolvedRightIcon
        ) : (
          isSelected && <Check className="w-4 h-4 text-[#2D2319] shrink-0 stroke-[3]" />
        )}
      </div>
    </button>
  );
});
DropdownItem.displayName = 'DropdownItem';

export const DropdownLabel = forwardRef(function DropdownLabel(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#2D2319] bg-[#FBF6EA] border-b border-[#2D2319]/20 font-display',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownLabel.displayName = 'DropdownLabel';

// Aliases for compatibility
export const DropdownHeader = DropdownLabel;

export const DropdownSeparator = forwardRef(function DropdownSeparator(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('h-0.5 my-1 bg-[#2D2319]/20', className)}
      role="separator"
      {...props}
    />
  );
});
DropdownSeparator.displayName = 'DropdownSeparator';

// Aliases for compatibility
export const DropdownDivider = DropdownSeparator;

export const DropdownFooter = forwardRef(function DropdownFooter(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'p-2 mt-1 border-t-2 border-[#2D2319]/20 bg-[#FBF6EA] flex items-center justify-between gap-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownFooter.displayName = 'DropdownFooter';

export default Dropdown;
