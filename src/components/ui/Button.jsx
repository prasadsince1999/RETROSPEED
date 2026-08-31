import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { sound } from '../../utils/audio';

const buttonVariants = {
  primary: 'bg-[#4BA3E3] text-[#2D2319] hover:bg-[#3d95d5] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  secondary: 'bg-[#FBF6EA] text-[#2D2319] hover:bg-[#f3edd9] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  success: 'bg-[#48B89F] text-[#2D2319] hover:bg-[#3da58e] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  danger: 'bg-[#F28B82] text-[#2D2319] hover:bg-[#e47970] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  warning: 'bg-[#F6C445] text-[#2D2319] hover:bg-[#eab839] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  gold: 'bg-[#F6C445] text-[#2D2319] hover:bg-[#eab839] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  purple: 'bg-[#C3A6E8] text-[#2D2319] hover:bg-[#b393db] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  outline: 'bg-[#FDF8EE] text-[#2D2319] hover:bg-[#FBF6EA] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  neutral: 'bg-[#FDF8EE] text-[#2D2319] hover:bg-[#FBF6EA] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  dark: 'bg-[#2D2319] text-[#FDF8EE] hover:bg-[#3d3024] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  ghost: 'bg-transparent text-[#2D2319] hover:bg-[#2D2319]/10 border-2 border-transparent hover:border-[#2D2319]/20 shadow-none',
  'dark-outline': 'bg-transparent text-[#2D2319] hover:bg-[#2D2319]/10 border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]',
  'dark-ghost': 'bg-transparent text-[#2D2319] hover:bg-[#2D2319]/10 border-2 border-transparent shadow-none'
};

const buttonSizes = {
  xs: 'h-7 px-2.5 text-xs rounded-md gap-1.5',
  sm: 'h-8 px-3 text-xs sm:text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'h-12 px-5 py-2.5 text-base rounded-xl gap-2.5 font-bold',
  'icon-xs': 'w-7 h-7 p-0 rounded-md',
  'icon-sm': 'w-8 h-8 p-0 rounded-lg',
  icon: 'w-10 h-10 p-0 rounded-lg',
  'icon-md': 'w-10 h-10 p-0 rounded-lg',
  'icon-lg': 'w-12 h-12 p-0 rounded-xl'
};

const iconSizes = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  'icon-xs': 'w-3.5 h-3.5',
  'icon-sm': 'w-4 h-4',
  icon: 'w-4 h-4',
  'icon-md': 'w-4 h-4',
  'icon-lg': 'w-5 h-5'
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
 * Button component with tactile depression, sound effects, loading spinner, icons, sizes, and solid retro variants.
 */
export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon,
    leftIcon,
    rightIcon,
    fullWidth = false,
    loading = false,
    disabled = false,
    playSound = true,
    soundType = 'keyClick',
    onClick,
    children,
    className,
    type = 'button',
    ...props
  },
  ref
) {
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    if (playSound && sound) {
      try {
        if (soundType === 'keyClick' && typeof sound.playKeyClick === 'function') {
          sound.playKeyClick();
        } else if (soundType === 'pop' && typeof sound.playBalloonPop === 'function') {
          sound.playBalloonPop();
        } else if (soundType === 'chime' && typeof sound.playSuccessChime === 'function') {
          sound.playSuccessChime();
        } else if (soundType === 'laser' && typeof sound.playLaserBeam === 'function') {
          sound.playLaserBeam();
        } else if (soundType === 'slash' && typeof sound.playBladeSlash === 'function') {
          sound.playBladeSlash();
        } else if (typeof sound.playKeyClick === 'function') {
          sound.playKeyClick();
        }
      } catch (err) {
        // Audio error caught safely
      }
    }

    if (onClick) {
      onClick(e);
    }
  };

  const isDisabled = disabled || loading;
  const currentVariant = buttonVariants[variant] || buttonVariants.primary;
  const currentSize = buttonSizes[size] || buttonSizes.md;
  const currentIconSize = iconSizes[size] || iconSizes.md;

  const resolvedLeftIcon = renderIconElement(leftIcon || (children ? null : icon), currentIconSize);
  const resolvedRightIcon = renderIconElement(rightIcon, currentIconSize);

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        'inline-flex items-center justify-center font-bold font-display select-none transition-all duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D2319] focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
        'active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#2D2319]',
        currentVariant,
        currentSize,
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className={cn('animate-spin', currentIconSize)} />
      ) : (
        resolvedLeftIcon && (
          <span className={cn('inline-flex items-center shrink-0', currentIconSize)}>
            {resolvedLeftIcon}
          </span>
        )
      )}

      {children && <span>{children}</span>}

      {!loading && resolvedRightIcon && (
        <span className={cn('inline-flex items-center shrink-0', currentIconSize)}>
          {resolvedRightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
