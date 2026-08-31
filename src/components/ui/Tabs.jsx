import React, { createContext, useContext, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { sound } from '../../utils/audio';

const TabsContext = createContext(null);

const tabSizes = {
  sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg font-bold',
  md: 'text-xs sm:text-sm px-4 py-2 gap-2 rounded-xl font-bold',
  lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5 rounded-xl font-black'
};

/**
 * Tabs component supporting Pills, Segmented sliders, and Underline variants with retro 90s styling.
 */
export function Tabs({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  defaultValue,
  variant = 'pills',
  size = 'md',
  fullWidth = false,
  playSound = true,
  className,
  children,
  ...props
}) {
  const [internalActiveTab, setInternalActiveTab] = React.useState(defaultValue || (tabs && tabs[0]?.id));
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const handleTabSelect = (tabId, disabled = false) => {
    if (disabled) return;

    if (playSound && sound && typeof sound.playKeyClick === 'function') {
      try {
        sound.playKeyClick();
      } catch (e) {
        // Silently catch audio errors
      }
    }

    if (!isControlled) {
      setInternalActiveTab(tabId);
    }
    if (onChange) {
      onChange(tabId);
    }
  };

  // If simple tabs array prop is passed, render array-driven tabs
  if (Array.isArray(tabs)) {
    return (
      <div
        className={cn(
          'flex items-center overflow-x-auto scrollbar-none select-none font-sans',
          variant === 'segmented' && 'p-1 bg-[#FBF6EA] rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] gap-1',
          variant === 'underline' && 'border-b-2 border-[#2D2319] gap-6',
          variant === 'pills' && 'flex-wrap gap-1.5 sm:gap-2',
          fullWidth && 'w-full',
          className
        )}
        role="tablist"
        {...props}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = !!tab.disabled;

          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={isDisabled}
              onClick={() => handleTabSelect(tab.id, isDisabled)}
              className={cn(
                'inline-flex items-center justify-center font-display transition-all duration-150 cursor-pointer select-none shrink-0 whitespace-nowrap focus:outline-none',
                tabSizes[size] || tabSizes.md,
                fullWidth && 'flex-1',
                isDisabled && 'opacity-40 cursor-not-allowed pointer-events-none',

                // Variant: Pills
                variant === 'pills' && (
                  isActive
                    ? 'bg-[#4BA3E3] text-[#2D2319] font-black border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] translate-x-[1px] translate-y-[1px]'
                    : 'bg-[#FDF8EE] text-[#2D2319] font-bold hover:bg-[#FBF6EA] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-[1px] active:translate-y-[1px]'
                ),

                // Variant: Segmented
                variant === 'segmented' && (
                  isActive
                    ? 'bg-[#FDF8EE] text-[#2D2319] font-black border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] rounded-lg'
                    : 'text-[#2D2319]/70 hover:text-[#2D2319] font-bold border-2 border-transparent'
                ),

                // Variant: Underline
                variant === 'underline' && [
                  'rounded-none border-b-2 -mb-0.5 px-1 pb-2 font-bold',
                  isActive
                    ? 'border-[#4BA3E3] text-[#2D2319] font-black'
                    : 'border-transparent text-[#2D2319]/60 hover:text-[#2D2319]'
                ]
              )}
            >
              {tab.icon && <span className="shrink-0 inline-flex items-center">{tab.icon}</span>}
              <span>{tab.label}</span>

              {tab.count !== undefined && (
                <span
                  className={cn(
                    'ml-1 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold border border-[#2D2319]',
                    isActive
                      ? 'bg-[#FDF8EE] text-[#2D2319]'
                      : 'bg-[#F6C445] text-[#2D2319]'
                  )}
                >
                  {tab.count}
                </span>
              )}

              {tab.badge && (
                <span className="ml-1 shrink-0">{tab.badge}</span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Compound component mode
  return (
    <TabsContext.Provider
      value={{
        activeTab,
        handleTabSelect,
        variant,
        size,
        fullWidth
      }}
    >
      <div className={cn('w-full select-none font-sans', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export const TabList = forwardRef(function TabList(
  { className, children, ...props },
  ref
) {
  const context = useContext(TabsContext);
  const variant = context?.variant || 'pills';
  const fullWidth = context?.fullWidth || false;

  return (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        'flex items-center overflow-x-auto scrollbar-none select-none',
        variant === 'segmented' && 'p-1 bg-[#FBF6EA] rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] gap-1',
        variant === 'underline' && 'border-b-2 border-[#2D2319] gap-6',
        variant === 'pills' && 'flex-wrap gap-1.5 sm:gap-2',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TabList.displayName = 'TabList';

export const TabTrigger = forwardRef(function TabTrigger(
  {
    value,
    icon,
    count,
    disabled = false,
    className,
    children,
    ...props
  },
  ref
) {
  const context = useContext(TabsContext);
  const isActive = context?.activeTab === value;
  const variant = context?.variant || 'pills';
  const size = context?.size || 'md';
  const fullWidth = context?.fullWidth || false;

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => context?.handleTabSelect(value, disabled)}
      className={cn(
        'inline-flex items-center justify-center font-display transition-all duration-150 cursor-pointer select-none shrink-0 whitespace-nowrap focus:outline-none',
        tabSizes[size] || tabSizes.md,
        fullWidth && 'flex-1',
        disabled && 'opacity-40 cursor-not-allowed pointer-events-none',

        variant === 'pills' && (
          isActive
            ? 'bg-[#4BA3E3] text-[#2D2319] font-black border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] translate-x-[1px] translate-y-[1px]'
            : 'bg-[#FDF8EE] text-[#2D2319] font-bold hover:bg-[#FBF6EA] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-[1px] active:translate-y-[1px]'
        ),

        variant === 'segmented' && (
          isActive
            ? 'bg-[#FDF8EE] text-[#2D2319] font-black border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] rounded-lg'
            : 'text-[#2D2319]/70 hover:text-[#2D2319] font-bold border-2 border-transparent'
        ),

        variant === 'underline' && [
          'rounded-none border-b-2 -mb-0.5 px-1 pb-2 font-bold',
          isActive
            ? 'border-[#4BA3E3] text-[#2D2319] font-black'
            : 'border-transparent text-[#2D2319]/60 hover:text-[#2D2319]'
        ],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 inline-flex items-center">{icon}</span>}
      <span>{children}</span>

      {count !== undefined && (
        <span
          className={cn(
            'ml-1 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold border border-[#2D2319]',
            isActive
              ? 'bg-[#FDF8EE] text-[#2D2319]'
              : 'bg-[#F6C445] text-[#2D2319]'
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
});
TabTrigger.displayName = 'TabTrigger';

export const TabContent = forwardRef(function TabContent(
  { value, className, children, ...props },
  ref
) {
  const context = useContext(TabsContext);
  if (context?.activeTab !== value) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn('mt-4 animate-in fade-in duration-150 text-[#2D2319]', className)}
      {...props}
    >
      {children}
    </div>
  );
});
TabContent.displayName = 'TabContent';

export default Tabs;
