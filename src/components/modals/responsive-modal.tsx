'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string | React.ReactNode;
  height?: string | number;
  width?: string | number;
  radius?: number;
  withCloseButton?: boolean;
  withDragHandle?: boolean;
  swipeToClose?: boolean;
  transitionDuration?: number;
  closeOnClickOutside?: boolean;
  className?: string;
  contentClassName?: string;
  isCenter?: boolean;
  mobileBreakpoint?: number;
  overlayClassName?: string;
  lockScroll?: boolean;
}

export function ResponsiveModal({
  isOpen,
  onClose,
  children,
  title = '',
  height = 'auto',
  width = 'auto',
  radius = 16,
  withCloseButton = true,
  swipeToClose = false,
  transitionDuration = 400,
  closeOnClickOutside = true,
  className,
  contentClassName,
  isCenter = false,
  mobileBreakpoint = 768,
  overlayClassName,
  lockScroll = true,
}: ResponsiveModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Create portal container on mount
  useEffect(() => {
    setIsMounted(true);

    // Create a div for the portal if it doesn't exist
    let container = document.getElementById('responsive-modal-portal');
    if (!container) {
      container = document.createElement('div');
      container.id = 'responsive-modal-portal';
      document.body.appendChild(container);
    }

    setPortalContainer(container);
  }, []);

  // Handle resize and initial detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  // Improved body scroll lock
  useEffect(() => {
    if (isOpen && lockScroll) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Store original body styles
      const originalStyles = {
        position: document.body.style.position,
        top: document.body.style.top,
        width: document.body.style.width,
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
      };

      // Apply scroll lock styles
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      // Compensate for scrollbar width to prevent layout shift
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        // Restore original styles
        Object.assign(document.body.style, originalStyles);

        // Restore scroll position
        if (scrollY) {
          window.scrollTo(0, scrollY);
        }
      };
    }
  }, [isOpen, lockScroll]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on Escape for better UX on mobile keyboards/hardware back
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isMounted || !portalContainer) {
    return null;
  }

  // Determine modal position and animation based on device and isCenter prop
  const shouldCenter = isCenter || !isMobile;
  const isFullHeight = height === '100vh';

  const modalVariants = {
    hidden: shouldCenter ? { opacity: 0, scale: 0.8, y: 0 } : { opacity: 0, y: '100%' },
    visible: shouldCenter ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, y: 0 },
    exit: shouldCenter ? { opacity: 0, scale: 0.8, y: 0 } : { opacity: 0, y: '100%' },
  };

  // Calculate content height dynamically
  const getModalHeight = () => {
    if (typeof height === 'string') {
      return height;
    }
    if (typeof height === 'number') {
      return `${height}px`;
    }
    return 'auto';
  };

  const modalHeight = getModalHeight();
  const hasExplicitHeight = modalHeight !== 'auto';

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            'fixed inset-0 flex z-[99999999] font-inter',
            overlayClassName || 'bg-black/50 backdrop-blur-sm'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration / 1000 }}
          onClick={handleBackdropClick}
          style={{
            // Ensure the backdrop takes full viewport
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <motion.div
            className={cn(
              'bg-popover text-popover-foreground flex flex-col',
              shouldCenter ? 'm-auto' : 'mt-auto w-full',
              className
            )}
            style={{
              borderRadius: shouldCenter
                ? `${radius}px`
                : isFullHeight
                  ? '0'
                  : `${radius}px ${radius}px 0 0`,
              width: shouldCenter ? width : '100%',
              height: hasExplicitHeight ? modalHeight : 'auto',
              maxHeight: shouldCenter ? '90vh' : isFullHeight ? '100vh' : '90vh',
              maxWidth: shouldCenter ? '90vw' : '100%',
              // Important: set overflow to hidden at modal level
              overflow: 'hidden',
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{
              type: 'tween',
              ease: 'easeOut',
              duration: transitionDuration / 1000,
            }}
          >
            {swipeToClose && !shouldCenter && (
              <div className="w-full flex justify-center py-2 flex-shrink-0">
                <div className="w-10 h-1 bg-muted-foreground/30 rounded-full"></div>
              </div>
            )}

            {title && (
              <div className="px-4 py-3 border-b border-border flex justify-between items-center flex-shrink-0 font-inter">
                <h3 className="font-medium text-foreground">{title}</h3>
                <div className="flex items-center gap-2">
                  {!shouldCenter && swipeToClose && (
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <span>Swipe to close</span>
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ y: [0, 3, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <path
                          d="M5.33317 8.66602L7.99984 11.3327L10.6665 8.66602M5.33317 4.66602L7.99984 7.33268L10.6665 4.66602"
                          className="stroke-muted-foreground"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </div>
                  )}
                  {withCloseButton && (
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary text-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Replace Mantine ScrollArea with native scrollable div */}
            <div
              ref={scrollRef}
              className={cn('px-4 py-4', contentClassName)}
              style={{
                flex: '1 1 auto',
                overflowY: 'auto',
                overflowX: 'hidden',
                // Enable momentum scrolling on iOS
                WebkitOverflowScrolling: 'touch',
                // Ensure content is scrollable
                minHeight: 0,
                // Add some padding at the bottom for iOS safe area
                paddingBottom: 'env(safe-area-inset-bottom, 16px)',
              }}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalContainer
  );
}