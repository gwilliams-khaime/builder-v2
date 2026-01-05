'use client';

import { Icons } from '@/icons';
import { cn } from '@/lib/utils';
import { Select, Tooltip } from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DesignColorPicker } from './components/design-color-picker';
import { Crop, Plus, Trash2 } from 'lucide-react';

interface BackgroundDesignPanelProps {
  componentId: string;
}

type BackgroundStyle = 'colour' | 'image' | 'video';
type ImageEffect = 'original' | 'greyscale' | 'blur' | 'invert' | 'sepia' | 'cartoon';
interface BackgroundDesignPanelProps {
  componentId: string;
}

const DEFAULT_COLOR = '#151515';

export function BackgroundDesignPanel({ componentId }: BackgroundDesignPanelProps) {
const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>('colour');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>(DEFAULT_COLOR);
  const [autoplay, setAutoplay] = useState<boolean>(true);
  const [muteVideo, setMuteVideo] = useState<boolean>(true);
  const [showVideoControls, setShowVideoControls] = useState<boolean>(true);
  const [backgroundPosition, setBackgroundPosition] = useState<string>('center');
  const [imageEffect, setImageEffect] = useState<ImageEffect>('original');
  const [indicatorX, setIndicatorX] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageButtonRef = useRef<HTMLButtonElement>(null);
  const videoButtonRef = useRef<HTMLButtonElement>(null);
  const hasImage = Boolean(imageUrl);
  const hasVideo = Boolean(videoUrl);

  const backgroundPositionOptions = [
    { label: 'Top Left', value: 'top left' },
    { label: 'Top Center', value: 'top center' },
    { label: 'Top Right', value: 'top right' },
    { label: 'Center Left', value: 'center left' },
    { label: 'Center', value: 'center' },
    { label: 'Center Right', value: 'center right' },
    { label: 'Bottom Left', value: 'bottom left' },
    { label: 'Bottom Center', value: 'bottom center' },
    { label: 'Bottom Right', value: 'bottom right' },
  ];

  const imageEffectOptions = [
    { label: 'Original', value: 'original' },
    { label: 'Greyscale', value: 'greyscale' },
    { label: 'Blur', value: 'blur' },
    { label: 'Invert', value: 'invert' },
    { label: 'Sepia', value: 'sepia' },
    { label: 'Cartoon', value: 'cartoon' },
  ];

  const handleBackgroundStyleChange = (style: BackgroundStyle) => {
    if (backgroundStyle === style) return;
    setBackgroundStyle(style);

  };

    useEffect(() => {
    const updateIndicatorPosition = () => {
      const index = ['colour', 'image', 'video'].indexOf(backgroundStyle);
      const button = buttonRefs.current[index];
      const container = containerRef.current;

      if (button && container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const x = buttonRect.left - containerRect.left;
        setIndicatorX(x);
      }
    };

    updateIndicatorPosition();
    window.addEventListener('resize', updateIndicatorPosition);
    return () => window.removeEventListener('resize', updateIndicatorPosition);
  }, [backgroundStyle]);



  return (
    <>
      <div className="space-y-4">
        {/* Background Style Section */}
        <div className="space-y-2.5">
          <label className="block text-xs font-light text-body">Background Style</label>
          <div
            ref={containerRef}
            className="relative flex gap-1 bg-secondary h-[32px] rounded-full border border-border"
          >
            {/* Sliding indicator */}
            <motion.div
              className="absolute top-0 bottom-0 bg-foreground rounded-full shadow-sm"
              style={{
                width: `calc((100% - 0.5rem) / 3)`,
              }}
              initial={false}
              animate={{
                x: indicatorX -1,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
            {(['colour', 'image', 'video'] as BackgroundStyle[]).map((style, index) => (
              <button
                key={style}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                // disabled={style === 'video'}
                onClick={() => handleBackgroundStyleChange(style)}
                className={cn(
                  'relative z-10 flex-1 px-3 py-2 cursor-pointer text-xs font-light rounded-full disabled:opacity-50 transition-colors',
                  backgroundStyle === style ? 'text-background' : 'text-muted-foreground'
                )}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Background Colour Section (shown when Colour is selected) */}
        {backgroundStyle === 'colour' && (
          <div className="flex items-center flex-1 w-full justify-between gap-4 border-b border-border pb-4">
            <div className="flex items-center flex-1 gap-1.5">
              <label className="block text-xs font-light text-body">Background Colour</label>
              <Tooltip
                label="Choose the solid colour that fills the background of this section."
                multiline
                w={220}
                withArrow
                radius="md"
                styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
              >
                <span>
                  <Icons.Info className="w-4 h-4 text-white fill-[#7C7C7C]" />
                </span>
              </Tooltip>
            </div>
            <div className="flex items-center justify-end">
              <DesignColorPicker value={backgroundColor} onChange={() => {}} />
            </div>
          </div>
        )}

        {/* Image Upload Section (shown when Image is selected) */}
        {backgroundStyle === 'image' && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <label className="block text-xs text-body">Image Upload</label>
                <Tooltip
                  label="Add or change the image that appears behind this section."
                  multiline
                  w={220}
                  withArrow
                  radius="md"
                  styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
                >
                  <span>
                    <Icons.Info className="w-4 h-4 text-white fill-[#7C7C7C]" />
                  </span>
                </Tooltip>
              </div>
              {hasImage && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {}}
                    className="flex items-center gap-1.5 text-xs text-[#D93AF6] underline font-medium"
                  >
                    <Crop className="w-3.5 h-3.5" />
                    <span>Crop Image</span>
                  </button>
                  <button
                    onClick={() => {}}
                    className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 underline font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>

            {!hasImage ? (
              <button
                type="button"
                ref={imageButtonRef}
                onClick={(event) => {}}
                className="w-full flex items-center justify-center h-[120px] text-xs font-medium rounded-xl border-[#E0E0E0] bg-[#F6FCFF] border-dashed cursor-pointer transition-all duration-300 group"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-light text-[#545454] transition-colors">Add Image</span>
                </div>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  ref={imageButtonRef}
                  onClick={(event) => {

                  }}
                  className="relative w-full h-[120px] rounded-xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={imageUrl}
                    alt="Background"
                    className="w-full h-full object-cover text-xs"
                  />
                  <span className="absolute inset-0 flex items-center font-semibold justify-center text-xs text-white rounded-xl bg-black/30 opacity-0 hover:opacity-100 hover:backdrop-blur-sm transition-all">
                    Change Image
                  </span>
                </button>

                <div className="flex items-center justify-between w-full py-4 border-b border-[#F6F6F6]">
                  <div className="flex items-center gap-1.5">
                    <label className="block text-xs text-body">Background Position</label>
                    <Tooltip
                      label="Choose which part of the image stays visible (for example: centre, top, or bottom) when the section resizes."
                      multiline
                      w={220}
                      withArrow
                      radius="md"
                      styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
                    >
                      <span>
                        <Icons.Info className="w-4 h-4 text-white fill-[#7C7C7C]" />
                      </span>
                    </Tooltip>
                  </div>
                  <Select
                    value={backgroundPosition}
                    onChange={(value) => {
                      setBackgroundPosition(value || '');
                    }}
                    data={backgroundPositionOptions}
                    classNames={{
                      input: 'border-[#7C7C7C] w-[120px] rounded-lg h-9 text-sm',
                      dropdown: 'rounded-xl',
                      options: 'hover:rounded-xl',
                    }}
                  />
                </div>

                <div className="flex items-center justify-between w-full py-4 border-b border-[#F6F6F6]">
                  <div className="flex items-center gap-1.5">
                    <label className="block text-xs text-body">Image Effects</label>
                    <Tooltip
                      label="Apply a simple filter to your image (for example: cartoon, black & white, or other styles)."
                      multiline
                      w={220}
                      withArrow
                      radius="md"
                      styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
                    >
                      <span>
                        <Icons.Info className="w-4 h-4 text-white fill-[#7C7C7C]" />
                      </span>
                    </Tooltip>
                  </div>
                  <Select
                    value={imageEffect}
                    onChange={(value) => {
                      setImageEffect(value as ImageEffect);
                    }}
                    data={imageEffectOptions}
                    classNames={{
                      input: 'border-[#7C7C7C] w-[120px] rounded-lg h-9 text-sm',
                      dropdown: 'rounded-xl',
                      options: 'hover:rounded-xl',
                    }}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Video Upload Section (shown when Video is selected) */}
        {backgroundStyle === 'video' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <label className="block text-xs text-body">Select Video</label>
                <Tooltip
                  label="Pick or upload the video that will play behind this section."
                  multiline
                  w={220}
                  withArrow
                  radius="md"
                  styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
                >
                  <span>
                    <Icons.Info className="w-4 h-4 text-white fill-stroke" />
                  </span>
                </Tooltip>
              </div>
              {hasVideo && (
                <button
                  onClick={() => {}}
                  className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 underline font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}
            </div>

            {!hasVideo ? (
              <button
                type="button"
                ref={videoButtonRef}
                onClick={(event) => {}}
                className="w-full flex items-center justify-center h-[120px] text-xs font-medium rounded-xl bg-[#F6FCFF] border-dashed cursor-pointer transition-all duration-300 group"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-light text-[#545454] transition-colors">
                    Add Video <br /> (Up to 200MB)
                  </span>
                </div>
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  ref={videoButtonRef}
                  onClick={(event) => {}}
                  className="relative w-full h-[120px] rounded-xl overflow-hidden cursor-pointer"
                >
                  <video
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                  />
                  <span className="absolute inset-0 flex items-center font-semibold justify-center text-xs text-white rounded-xl bg-black/30 opacity-0 hover:opacity-100 hover:backdrop-blur-sm transition-all">
                    Change Video
                  </span>
                </button>

                {/* Video Controls */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <label className="block text-sm font-medium text-[gray-900]">Autoplay</label>
                      <Tooltip
                        label="When turned on, the video starts playing automatically as soon as the section is visible."
                        multiline
                        w={220}
                        withArrow
                        radius="md"
                        styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
                      >
                        <span>
                          <Icons.Info className="w-4 h-4 text-white fill-[#7C7C7C]" />
                        </span>
                      </Tooltip>
                    </div>
                    <button
                      onClick={() => {}}
                      className={cn(
                        'relative w-11 h-6 rounded-full transition-colors duration-200',
                        autoplay ? 'bg-primary' : 'bg-gray-300'
                      )}
                    >
                      <span
                        className={cn(
                          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
                          autoplay ? 'translate-x-5' : 'translate-x-0'
                        )}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <label className="block text-sm font-medium text-[gray-900]">
                        Mute Video
                      </label>
                      <Tooltip
                        label="When turned on, the video plays with no sound so it doesn't distract visitors."
                        multiline
                        w={220}
                        withArrow
                        radius="md"
                        styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
                      >
                        <span>
                          <Icons.Info className="w-4 h-4 text-white fill-[#7C7C7C]" />
                        </span>
                      </Tooltip>
                    </div>
                    <button
                      onClick={() => {}}
                      className={cn(
                        'relative w-11 h-6 rounded-full transition-colors duration-200',
                        muteVideo ? 'bg-primary' : 'bg-gray-300'
                      )}
                    >
                      <span
                        className={cn(
                          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
                          muteVideo ? 'translate-x-5' : 'translate-x-0'
                        )}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <label className="block text-sm font-medium text-[gray-900]">
                        Show Video Control
                      </label>
                      <Tooltip
                        label="When turned on, viewers see play/pause controls so they can control the video."
                        multiline
                        w={220}
                        withArrow
                        radius="md"
                        styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
                      >
                        <span>
                          <Icons.Info className="w-4 h-4 text-white fill-[#7C7C7C]" />
                        </span>
                      </Tooltip>
                    </div>
                    <button
                      onClick={() => {}}
                      className={cn(
                        'relative w-11 h-6 rounded-full transition-colors duration-200',
                        showVideoControls ? 'bg-primary' : 'bg-gray-300'
                      )}
                    >
                      <span
                        className={cn(
                          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
                          showVideoControls ? 'translate-x-5' : 'translate-x-0'
                        )}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
