import React, { useEffect, useRef, forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const modalSizes = {
  xs: 'max-w-sm',
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-6xl'
};

const titleBarVariants = {
  sky: 'bg-[#4BA3E3] text-[#2D2319]',
  coral: 'bg-[#F28B82] text-[#2D2319]',
  mustard: 'bg-[#F6C445] text-[#2D2319]',
  teal: 'bg-[#48B89F] text-[#2D2319]',
  lilac: 'bg-[#C3A6E8] text-[#2D2319]',
  dark: 'bg-[#2D2319] text-[#FDF8EE]',
  cream: 'bg-[#FBF6EA] text-[#2D2319]'
};

/**
 * Accessible Retro Modal dialog with 90s OS window chrome, solid titlebar, and tactile buttons.
 */
export function Modal({
  isOpen = false,
  onClose,
  title,
  titleVariant = 'sky',
  icon,
  description,
  footer,
  size = 'md',
  showCloseButton = true,
  showClose,
  closeOnBackdrop = true,
  closeOnOverlayClick,
  closeOnEscape = true,
  className,
  children,
  ...props
}) {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (onClose) onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && modalRef.current && !modalRef.current.contains(e.target)) {
      if (onClose) onClose();
    }
  };

  const currentSizeClass = modalSizes[size] || modalSizes.md;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2D2319]/60 backdrop-blur-xs overflow-y-auto modal-backdrop-animate select-none"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={cn(
          'relative w-full bg-[#FDF8EE] rounded-xl shadow-[6px_6px_0px_#2D2319] border-2 border-[#2D2319] text-[#2D2319]',
          'flex flex-col max-h-[90vh] my-auto overflow-hidden modal-window-animate',
          currentSizeClass,
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {/* Retro Window Titlebar if title or showCloseButton is enabled */}
        {(title || showCloseButton) && (
          <div
            className={cn(
              'px-3.5 py-2 border-b-2 border-[#2D2319] flex items-center justify-between gap-2 font-mono select-none shrink-0',
              titleBarVariants[titleVariant] || titleBarVariants.sky
            )}
          >
            <div className="flex items-center space-x-2 truncate font-bold text-xs sm:text-sm">
              {icon && <span className="shrink-0">{icon}</span>}
              <span className="truncate">{title || 'RETROSPEED Window'}</span>
            </div>

            {showCloseButton && onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-4 h-4 bg-[#F28B82] hover:bg-rose-400 border border-[#2D2319] rounded-[2px] flex items-center justify-center text-[9px] font-mono font-bold leading-none text-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none shrink-0"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Optional quick description if passed as prop */}
        {description && (
          <div className="px-6 pt-4 pb-0 text-xs text-[#2D2319]/80 font-medium">
            {description}
          </div>
        )}

        {/* Children content */}
        {children}

        {/* Optional quick footer if provided as prop */}
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </div>
    </div>
  );
}

export const ModalHeader = forwardRef(function ModalHeader(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'p-6 pb-3 border-b-2 border-[#2D2319]/15 flex flex-col space-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ModalHeader.displayName = 'ModalHeader';

export const ModalTitle = forwardRef(function ModalTitle(
  { className, as: Component = 'h2', children, ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'text-lg sm:text-xl font-black text-[#2D2319] tracking-tight font-display',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
ModalTitle.displayName = 'ModalTitle';

export const ModalDescription = forwardRef(function ModalDescription(
  { className, children, ...props },
  ref
) {
  return (
    <p
      ref={ref}
      className={cn('text-xs sm:text-sm text-[#2D2319]/80 font-medium leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
});
ModalDescription.displayName = 'ModalDescription';

export const ModalBody = forwardRef(function ModalBody(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('p-6 overflow-y-auto flex-1 text-[#2D2319] text-xs sm:text-sm leading-relaxed', className)}
      {...props}
    >
      {children}
    </div>
  );
});
ModalBody.displayName = 'ModalBody';

export const ModalFooter = forwardRef(function ModalFooter(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'p-4 sm:p-6 pt-3 border-t-2 border-[#2D2319]/20 bg-[#FBF6EA] flex flex-col-reverse sm:flex-row items-center sm:justify-end gap-2.5 mt-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ModalFooter.displayName = 'ModalFooter';

export default Modal;
