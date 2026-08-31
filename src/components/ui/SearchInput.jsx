import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const searchSizes = {
  sm: {
    container: 'h-8 text-xs',
    iconBox: 'w-8 h-full',
    icon: 'w-3.5 h-3.5',
    input: 'px-2.5 text-xs',
    clearBtn: 'p-0.5',
    badge: 'text-[10px] px-1.5 py-0.2'
  },
  md: {
    container: 'h-10 text-sm',
    iconBox: 'w-10 h-full',
    icon: 'w-4 h-4',
    input: 'px-3 text-sm',
    clearBtn: 'p-1',
    badge: 'text-xs px-1.5 py-0.5'
  },
  lg: {
    container: 'h-12 text-base',
    iconBox: 'w-12 h-full',
    icon: 'w-5 h-5',
    input: 'px-3.5 text-base',
    clearBtn: 'p-1.5',
    badge: 'text-xs px-2 py-0.5'
  }
};

/**
 * Retro address/search input with yellow magnifying glass block (bg-[#F6C445]).
 */
export const SearchInput = forwardRef(function SearchInput(
  {
    value = '',
    onChange,
    onClear,
    placeholder = 'Search...',
    shortcutKey = '/',
    enableShortcut = true,
    size = 'md',
    variant = 'default',
    fullWidth = true,
    className = '',
    inputClassName = '',
    disabled = false,
    ...props
  },
  ref
) {
  const inputRef = useRef(null);

  // Expose inner input ref
  useImperativeHandle(ref, () => inputRef.current);

  // Global hotkey to focus search
  useEffect(() => {
    if (!enableShortcut || disabled) return;

    const handleKeyDown = (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isInputActive = activeTag === 'input' || activeTag === 'textarea' || document.activeElement.isContentEditable;

      if (shortcutKey === '/' && e.key === '/' && !isInputActive) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (
        (shortcutKey.toLowerCase().includes('k') || shortcutKey === 'Ctrl+K') &&
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === 'k'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableShortcut, shortcutKey, disabled]);

  const handleClear = (e) => {
    e.stopPropagation();
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } });
    }
    inputRef.current?.focus();
  };

  const hasValue = Boolean(value && String(value).length > 0);
  const sizeConfig = searchSizes[size] || searchSizes.md;

  return (
    <div
      className={cn(
        'relative inline-flex items-center rounded-lg border-2 border-[#2D2319] bg-[#FDF8EE] shadow-[3px_3px_0px_#2D2319] overflow-hidden select-none transition-all',
        'focus-within:shadow-[4px_4px_0px_#2D2319] focus-within:-translate-y-0.5',
        disabled && 'opacity-60 cursor-not-allowed',
        fullWidth ? 'w-full' : 'w-auto',
        sizeConfig.container,
        className
      )}
    >
      {/* Yellow Magnifying Glass Block */}
      <div
        className={cn(
          'bg-[#F6C445] border-r-2 border-[#2D2319] flex items-center justify-center text-[#2D2319] shrink-0 font-bold select-none',
          sizeConfig.iconBox
        )}
      >
        <Search className={sizeConfig.icon} />
      </div>

      {/* Input element */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          'w-full h-full bg-transparent outline-none font-sans font-medium text-[#2D2319] placeholder:text-[#2D2319]/45',
          sizeConfig.input,
          inputClassName
        )}
        {...props}
      />

      {/* Clear Button */}
      {hasValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className={cn(
            'mr-2 text-[#2D2319] hover:bg-[#2D2319]/10 rounded border border-transparent hover:border-[#2D2319]/30 transition-colors focus:outline-none shrink-0',
            sizeConfig.clearBtn
          )}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Keyboard Shortcut Badge */}
      {!hasValue && enableShortcut && shortcutKey && !disabled && (
        <div
          className={cn(
            'mr-2 pointer-events-none hidden sm:inline-flex items-center font-mono font-bold text-[#2D2319] bg-[#F6C445] border border-[#2D2319] rounded shadow-[1px_1px_0px_#2D2319] shrink-0',
            sizeConfig.badge
          )}
        >
          {shortcutKey}
        </div>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
