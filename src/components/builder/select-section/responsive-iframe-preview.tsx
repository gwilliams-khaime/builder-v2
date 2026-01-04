'use client';

import { useState, useEffect, useRef } from 'react';

interface ResponsiveIframePreviewProps {
  src: string;
  onLoad?: () => void;
}

export const ResponsiveIframePreview = ({ src, onLoad }: ResponsiveIframePreviewProps) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Original iframe dimensions (preserved resolution)
  const IFRAME_WIDTH = 1200;
  const IFRAME_HEIGHT = 600;

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerWidth = container.clientWidth;

      // Calculate scale to span full width of container while preserving resolution
      const calculatedScale = containerWidth / IFRAME_WIDTH;

      // Set a minimum scale to prevent it from being too small
      setScale(Math.max(calculatedScale, 0.1));
    };

    // Calculate initial scale after a brief delay to ensure DOM is ready
    const timeoutId = setTimeout(calculateScale, 0);

    // Use ResizeObserver to recalculate on container resize
    const resizeObserver = new ResizeObserver(() => {
      calculateScale();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also listen to window resize as fallback
    window.addEventListener('resize', calculateScale);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateScale);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-hidden"
    >
      <iframe
        scrolling="no"
        style={{
          pointerEvents: 'none',
          overflow: 'hidden',
          width: `${IFRAME_WIDTH}px`,
          height: `${IFRAME_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          display: 'block',
        }}
        data-src={src}
        loading="lazy"
        src={src}
        onLoad={onLoad}
      />
    </div>
  );
};
