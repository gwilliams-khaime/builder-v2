'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IconChevronUp, IconChevronDown, IconKeyboard, IconEdit } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface TimepickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  format?: '12h' | '24h';
  minuteStep?: number;
  className?: string;
  disabled?: boolean;
  defaultInputMode?: boolean;
  showModeToggle?: boolean;
}

export function Timepicker({
  value,
  onChange,
  format = '12h',
  minuteStep = 1,
  className,
  disabled = false,
  defaultInputMode = false,
  showModeToggle = true,
}: TimepickerProps) {
  const [selectedTime, setSelectedTime] = useState<Date>(value || new Date());
  const [hours, setHours] = useState(
    format === '12h' ? selectedTime.getHours() % 12 || 12 : selectedTime.getHours()
  );
  const [minutes, setMinutes] = useState(selectedTime.getMinutes());
  const [period, setPeriod] = useState<'AM' | 'PM'>(selectedTime.getHours() >= 12 ? 'PM' : 'AM');

  // String inputs for free typing
  const [hourInput, setHourInput] = useState(hours.toString().padStart(2, '0'));
  const [minuteInput, setMinuteInput] = useState(minutes.toString().padStart(2, '0'));
  const [timeInput, setTimeInput] = useState(
    format === '12h'
      ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
      : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  );
  const [isTyping, setIsTyping] = useState(false);
  const [focusedField, setFocusedField] = useState<'hours' | 'minutes' | 'time' | null>(null);
  const [inputMode, setInputMode] = useState(defaultInputMode);

  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const newHours = format === '12h' ? value.getHours() % 12 || 12 : value.getHours();
      setHours(newHours);
      setMinutes(value.getMinutes());
      setPeriod(value.getHours() >= 12 ? 'PM' : 'AM');

      // Only update inputs if not actively typing
      if (!isTyping) {
        setHourInput(newHours.toString().padStart(2, '0'));
        setMinuteInput(value.getMinutes().toString().padStart(2, '0'));
        const newPeriod = value.getHours() >= 12 ? 'PM' : 'AM';
        setTimeInput(
          format === '12h'
            ? `${newHours.toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')} ${newPeriod}`
            : `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`
        );
      }
    }
  }, [value, format, isTyping]);

  // Sync input strings when hours/minutes change via buttons (only if not typing)
  useEffect(() => {
    if (!isTyping && !inputMode) {
      setHourInput(hours.toString().padStart(2, '0'));
    }
    if (!isTyping && inputMode) {
      setTimeInput(
        format === '12h'
          ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
          : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      );
    }
  }, [hours, minutes, period, isTyping, inputMode, format]);

  useEffect(() => {
    if (!isTyping && !inputMode) {
      setMinuteInput(minutes.toString().padStart(2, '0'));
    }
  }, [minutes, isTyping, inputMode]);

  const updateTime = useCallback(
    (newHours: number, newMinutes: number, newPeriod: 'AM' | 'PM') => {
      const date = new Date(selectedTime);

      if (format === '12h') {
        let hour24 = newHours === 12 ? 0 : newHours;
        if (newPeriod === 'PM') {
          hour24 += 12;
        }
        date.setHours(hour24);
      } else {
        date.setHours(newHours);
      }

      date.setMinutes(newMinutes);
      setSelectedTime(date);
      onChange?.(date);
    },
    [selectedTime, format, onChange]
  );

  const incrementHours = useCallback(() => {
    const maxHours = format === '12h' ? 12 : 23;
    const minHours = format === '12h' ? 1 : 0;
    const newHours = hours >= maxHours ? minHours : hours + 1;
    setHours(newHours);
    setHourInput(newHours.toString().padStart(2, '0'));
    setIsTyping(false);
    updateTime(newHours, minutes, period);
  }, [hours, minutes, period, format, updateTime]);

  const decrementHours = useCallback(() => {
    const maxHours = format === '12h' ? 12 : 23;
    const minHours = format === '12h' ? 1 : 0;
    const newHours = hours <= minHours ? maxHours : hours - 1;
    setHours(newHours);
    setHourInput(newHours.toString().padStart(2, '0'));
    setIsTyping(false);
    updateTime(newHours, minutes, period);
  }, [hours, minutes, period, format, updateTime]);

  const incrementMinutes = useCallback(() => {
    const newMinutes = (minutes + minuteStep) % 60;
    setMinutes(newMinutes);
    setMinuteInput(newMinutes.toString().padStart(2, '0'));
    setIsTyping(false);
    updateTime(hours, newMinutes, period);
  }, [minutes, minuteStep, hours, period, updateTime]);

  const decrementMinutes = useCallback(() => {
    const newMinutes = minutes - minuteStep < 0 ? 60 - minuteStep : minutes - minuteStep;
    setMinutes(newMinutes);
    setMinuteInput(newMinutes.toString().padStart(2, '0'));
    setIsTyping(false);
    updateTime(hours, newMinutes, period);
  }, [minutes, minuteStep, hours, period, updateTime]);

  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setIsTyping(true);

    // Only allow numbers and limit to 2 digits
    if (val === '' || /^\d{0,2}$/.test(val)) {
      setHourInput(val);

      // Parse and validate
      if (val !== '') {
        const numVal = parseInt(val);
        const maxHours = format === '12h' ? 12 : 23;
        const minHours = format === '12h' ? 1 : 0;

        if (!isNaN(numVal) && numVal >= minHours && numVal <= maxHours) {
          setHours(numVal);
          updateTime(numVal, minutes, period);

          // Auto-advance to minutes when 2 digits are entered
          if (val.length === 2) {
            setTimeout(() => {
              minuteInputRef.current?.focus();
              minuteInputRef.current?.select();
            }, 0);
          }
        }
      }
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setIsTyping(true);

    // Only allow numbers and limit to 2 digits
    if (val === '' || /^\d{0,2}$/.test(val)) {
      setMinuteInput(val);

      // Parse and validate
      if (val !== '') {
        const numVal = parseInt(val);

        if (!isNaN(numVal) && numVal >= 0 && numVal <= 59) {
          setMinutes(numVal);
          updateTime(hours, numVal, period);
        }
      }
    }
  };

  const handleHourBlur = useCallback(() => {
    setIsTyping(false);
    setFocusedField(null);

    // Reset to valid value if empty or invalid on blur
    const maxHours = format === '12h' ? 12 : 23;
    const minHours = format === '12h' ? 1 : 0;
    const numVal = parseInt(hourInput);

    if (hourInput === '' || isNaN(numVal) || numVal < minHours || numVal > maxHours) {
      const defaultHour = format === '12h' ? 12 : 0;
      setHours(defaultHour);
      setHourInput(defaultHour.toString().padStart(2, '0'));
      updateTime(defaultHour, minutes, period);
    } else {
      // Pad valid value to 2 digits
      setHourInput(numVal.toString().padStart(2, '0'));
    }
  }, [hourInput, format, minutes, period, updateTime]);

  const handleMinuteBlur = useCallback(() => {
    setIsTyping(false);
    setFocusedField(null);

    // Reset to valid value if empty or invalid on blur
    const numVal = parseInt(minuteInput);

    if (minuteInput === '' || isNaN(numVal) || numVal < 0 || numVal > 59) {
      setMinutes(0);
      setMinuteInput('00');
      updateTime(hours, 0, period);
    } else {
      // Pad valid value to 2 digits
      setMinuteInput(numVal.toString().padStart(2, '0'));
    }
  }, [minuteInput, hours, period, updateTime]);

  // Time input handler for input mode
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    setIsTyping(true);
    setFocusedField('time');

    // Remove any non-digit, non-colon, non-space, non-AM/PM characters
    if (format === '12h') {
      // Allow digits, colon, space, and A/P/M (case insensitive)
      val = val.replace(/[^\d:\sAPM]/gi, '');
      
      // Limit to format: HH:MM AM/PM (max 11 characters: "12:59 PM")
      // Extract digits only first
      const digitsOnly = val.replace(/\D/g, '');
      const periodMatch = val.match(/([AP]M?)/i);
      const periodStr = periodMatch ? periodMatch[1].toUpperCase() : '';
      
      // Limit digits to 4 (2 for hour, 2 for minute)
      const limitedDigits = digitsOnly.slice(0, 4);
      
      // Format: HH:MM
      let formatted = '';
      if (limitedDigits.length > 0) {
        const hourPart = limitedDigits.slice(0, 2);
        const minutePart = limitedDigits.slice(2, 4);
        
        // Validate hour (1-12)
        const hour = parseInt(hourPart);
        if (hourPart.length === 1) {
          formatted = hourPart;
        } else if (hourPart.length === 2) {
          if (hour >= 1 && hour <= 12) {
            formatted = hourPart;
            // Auto-insert colon when minutes start
            if (minutePart.length > 0) {
              formatted += ':' + minutePart;
            } else if (val.includes(':')) {
              formatted += ':';
            }
          } else {
            // Invalid hour (e.g., 13+), keep only first digit
            formatted = hourPart[0];
            if (minutePart.length > 0) {
              formatted += ':' + minutePart;
            }
          }
        }
        
        // Add period if present
        if (periodStr) {
          formatted += ' ' + periodStr;
        }
      }
      
      setTimeInput(formatted);
      
      // Parse and update time
      const match = formatted.match(/^(\d{1,2}):?(\d{0,2})\s*([AP]M?)?$/i);
      if (match) {
        const [, hourStr, minuteStr, periodMatch] = match;
        const hour = parseInt(hourStr);
        const minute = minuteStr ? parseInt(minuteStr) : 0;
        const newPeriod = periodMatch ? (periodMatch.toUpperCase().startsWith('A') ? 'AM' : 'PM') : period;

        if (!isNaN(hour) && hour >= 1 && hour <= 12) {
          setHours(hour);
          if (!isNaN(minute) && minute >= 0 && minute <= 59) {
            setMinutes(minute);
          }
          if (periodMatch) {
            setPeriod(newPeriod);
            updateTime(hour, minute || 0, newPeriod);
          } else {
            updateTime(hour, minute || 0, period);
          }
        }
      }
    } else {
      // 24h format: only digits and colon
      val = val.replace(/[^\d:]/g, '');
      
      // Limit to format: HH:MM (max 5 characters: "23:59")
      const digitsOnly = val.replace(/\D/g, '');
      const limitedDigits = digitsOnly.slice(0, 4);
      
      // Format: HH:MM
      let formatted = '';
      if (limitedDigits.length > 0) {
        const hourPart = limitedDigits.slice(0, 2);
        const minutePart = limitedDigits.slice(2, 4);
        
        // Validate hour (0-23)
        const hour = parseInt(hourPart);
        if (hourPart.length === 1) {
          formatted = hourPart;
        } else if (hourPart.length === 2) {
          if (hour >= 0 && hour <= 23) {
            formatted = hourPart;
            // Auto-insert colon when minutes start
            if (minutePart.length > 0) {
              formatted += ':' + minutePart;
            } else if (val.includes(':')) {
              formatted += ':';
            }
          } else {
            // Invalid hour (e.g., 24+), keep only first digit
            formatted = hourPart[0];
            if (minutePart.length > 0) {
              formatted += ':' + minutePart;
            }
          }
        }
      }
      
      setTimeInput(formatted);
      
      // Parse and update time
      const match = formatted.match(/^(\d{1,2}):?(\d{0,2})$/);
      if (match) {
        const [, hourStr, minuteStr] = match;
        const hour = parseInt(hourStr);
        const minute = minuteStr ? parseInt(minuteStr) : 0;

        if (!isNaN(hour) && hour >= 0 && hour <= 23) {
          setHours(hour);
          if (!isNaN(minute) && minute >= 0 && minute <= 59) {
            setMinutes(minute);
          }
          updateTime(hour, minute || 0, period);
        }
      }
    }
  };

  const handleTimeBlur = () => {
    setIsTyping(false);
    setFocusedField(null);

    // Format and validate the time input
    if (format === '12h') {
      const match = timeInput.match(/^(\d{1,2}):?(\d{0,2})\s*(AM|PM|am|pm)?$/i);
      if (match) {
        const [, hourStr, minuteStr, periodStr] = match;
        const hour = parseInt(hourStr);
        const minute = minuteStr ? parseInt(minuteStr) : minutes;
        const newPeriod = periodStr ? (periodStr.toUpperCase() === 'AM' ? 'AM' : 'PM') : period;

        if (
          !isNaN(hour) &&
          hour >= 1 &&
          hour <= 12 &&
          !isNaN(minute) &&
          minute >= 0 &&
          minute <= 59
        ) {
          setHours(hour);
          setMinutes(minute);
          setPeriod(newPeriod);
          setTimeInput(
            `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${newPeriod}`
          );
          updateTime(hour, minute, newPeriod);
        } else {
          // Reset to current valid time
          setTimeInput(
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
          );
        }
      } else {
        // Reset to current valid time
        setTimeInput(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
        );
      }
    } else {
      // 24h format
      const match = timeInput.match(/^(\d{1,2}):?(\d{0,2})$/);
      if (match) {
        const [, hourStr, minuteStr] = match;
        const hour = parseInt(hourStr);
        const minute = minuteStr ? parseInt(minuteStr) : minutes;

        if (
          !isNaN(hour) &&
          hour >= 0 &&
          hour <= 23 &&
          !isNaN(minute) &&
          minute >= 0 &&
          minute <= 59
        ) {
          setHours(hour);
          setMinutes(minute);
          setTimeInput(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
          updateTime(hour, minute, period);
        } else {
          // Reset to current valid time
          setTimeInput(
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
          );
        }
      } else {
        // Reset to current valid time
        setTimeInput(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      }
    }
  };

  // Keyboard navigation handlers
  const handleHourKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        incrementHours();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        decrementHours();
      } else if (e.key === 'ArrowRight' || e.key === 'Tab') {
        if (!e.shiftKey) {
          e.preventDefault();
          minuteInputRef.current?.focus();
          minuteInputRef.current?.select();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleHourBlur();
        minuteInputRef.current?.focus();
      }
    },
    [disabled, incrementHours, decrementHours, handleHourBlur]
  );

  const handleMinuteKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        incrementMinutes();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        decrementMinutes();
      } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        hourInputRef.current?.focus();
        hourInputRef.current?.select();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleMinuteBlur();
      }
    },
    [disabled, incrementMinutes, decrementMinutes, handleMinuteBlur]
  );

  // Mouse wheel support
  const handleHourWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (disabled || focusedField !== 'hours') return;
      e.preventDefault();
      if (e.deltaY < 0) {
        incrementHours();
      } else {
        decrementHours();
      }
    },
    [disabled, focusedField, incrementHours, decrementHours]
  );

  const handleMinuteWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (disabled || focusedField !== 'minutes') return;
      e.preventDefault();
      if (e.deltaY < 0) {
        incrementMinutes();
      } else {
        decrementMinutes();
      }
    },
    [disabled, focusedField, incrementMinutes, decrementMinutes]
  );

  return (
    <div
      className={cn(
        'bg-white rounded-xl  p-6 w-full',
        { 'opacity-50 pointer-events-none': disabled },
        className
      )}
    >
      {/* Mode Toggle */}
      {showModeToggle && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setInputMode(!inputMode)}
            disabled={disabled}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all',
              'hover:bg-gray-100 active:bg-gray-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              inputMode ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-600'
            )}
            aria-label={inputMode ? 'Switch to button mode' : 'Switch to input mode'}
          >
            {inputMode ? <IconEdit size={16} /> : <IconKeyboard size={16} />}
            <span>{inputMode ? 'Button Mode' : 'Input Mode'}</span>
          </button>
        </div>
      )}

      {inputMode ? (
        /* Input Mode - Single time input */
        <div className="flex flex-col items-center gap-4">
          <input
            ref={timeInputRef}
            type="text"
            value={timeInput}
            onChange={handleTimeChange}
            onBlur={handleTimeBlur}
            onFocus={() => {
              setFocusedField('time');
              setIsTyping(true);
            }}
            disabled={disabled}
            placeholder={format === '12h' ? 'HH:MM AM/PM' : 'HH:MM'}
            maxLength={format === '12h' ? 11 : 5}
            className={cn(
              'w-full max-w-xs px-4 py-3 text-2xl font-bold text-center rounded-lg',
              'bg-white border-2 border-gray-300',
              'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
              'transition-all',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              focusedField === 'time' && 'bg-primary/5'
            )}
            aria-label="Time"
          />
          <p className="text-xs text-gray-500">
            {format === '12h'
              ? 'Format: HH:MM AM/PM (e.g., 02:30 PM)'
              : 'Format: HH:MM (e.g., 14:30)'}
          </p>
        </div>
      ) : (
        /* Button Mode - Separate hour/minute inputs */
        <div className={cn('flex items-center justify-center gap-4')}>
          {/* Hours */}
          <div className="flex flex-col items-center gap-2">
            {!inputMode && (
              <button
                onClick={incrementHours}
                disabled={disabled}
                className={cn(
                  'p-2 rounded-lg transition-all',
                  'hover:bg-gray-100 active:bg-gray-200',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                )}
                aria-label="Increment hours"
              >
                <IconChevronUp size={20} />
              </button>
            )}

            <div
              ref={hourRef}
              onWheel={handleHourWheel}
              className={cn(
                'relative flex items-center justify-center rounded-lg transition-all',
                inputMode ? 'w-20 h-20' : 'w-16 h-16',
                focusedField === 'hours' && 'ring-2 ring-primary ring-offset-2'
              )}
            >
              <input
                ref={hourInputRef}
                type="text"
                value={hourInput}
                onChange={handleHourChange}
                onBlur={handleHourBlur}
                onFocus={() => {
                  setFocusedField('hours');
                  setIsTyping(true);
                }}
                onKeyDown={handleHourKeyDown}
                disabled={disabled}
                className={cn(
                  'w-full h-full font-bold text-center rounded-lg',
                  inputMode
                    ? 'text-4xl bg-white border-2 border-gray-300'
                    : 'text-3xl bg-gray-50 border-2 border-transparent',
                  'focus:outline-none focus:ring-0 focus:border-primary',
                  'transition-all cursor-pointer select-all',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  focusedField === 'hours' && 'bg-primary/5'
                )}
                maxLength={2}
                aria-label="Hours"
              />
            </div>

            {!inputMode && (
              <button
                onClick={decrementHours}
                disabled={disabled}
                className={cn(
                  'p-2 rounded-lg transition-all',
                  'hover:bg-gray-100 active:bg-gray-200',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                )}
                aria-label="Decrement hours"
              >
                <IconChevronDown size={20} />
              </button>
            )}

            {!inputMode && <span className="text-xs text-gray-500 mt-1">Hours</span>}
          </div>

          {/* Separator */}
          <div
            className={cn('font-bold text-gray-400', inputMode ? 'text-4xl mb-0' : 'text-3xl mb-8')}
          >
            :
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center gap-2">
            {!inputMode && (
              <button
                onClick={incrementMinutes}
                disabled={disabled}
                className={cn(
                  'p-2 rounded-lg transition-all',
                  'hover:bg-gray-100 active:bg-gray-200',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                )}
                aria-label="Increment minutes"
              >
                <IconChevronUp size={20} />
              </button>
            )}

            <div
              ref={minuteRef}
              onWheel={handleMinuteWheel}
              className={cn(
                'relative flex items-center justify-center rounded-lg transition-all',
                inputMode ? 'w-20 h-20' : 'w-16 h-16',
                focusedField === 'minutes' && 'ring-2 ring-primary ring-offset-2'
              )}
            >
              <input
                ref={minuteInputRef}
                type="text"
                value={minuteInput}
                onChange={handleMinuteChange}
                onBlur={handleMinuteBlur}
                onFocus={() => {
                  setFocusedField('minutes');
                  setIsTyping(true);
                }}
                onKeyDown={handleMinuteKeyDown}
                disabled={disabled}
                className={cn(
                  'w-full h-full font-bold text-center rounded-lg',
                  inputMode
                    ? 'text-4xl bg-white border-2 border-gray-300'
                    : 'text-3xl bg-gray-50 border-2 border-transparent',
                  'focus:outline-none focus:ring-0 focus:border-primary',
                  'transition-all cursor-pointer select-all',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  focusedField === 'minutes' && 'bg-primary/5'
                )}
                maxLength={2}
                aria-label="Minutes"
              />
            </div>

            {!inputMode && (
              <button
                onClick={decrementMinutes}
                disabled={disabled}
                className={cn(
                  'p-2 rounded-lg transition-all',
                  'hover:bg-gray-100 active:bg-gray-200',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                )}
                aria-label="Decrement minutes"
              >
                <IconChevronDown size={20} />
              </button>
            )}

            {!inputMode && <span className="text-xs text-gray-500 mt-1">Minutes</span>}
          </div>

          {/* AM/PM Toggle (12h format only) */}
          {format === '12h' && (
            <div className="flex flex-col items-center gap-2 ml-2">
              <button
                onClick={togglePeriod}
                disabled={disabled}
                className={cn(
                  'rounded-lg font-bold transition-all',
                  inputMode ? 'w-20 h-20 text-xl' : 'w-16 h-16 mb-8 text-lg',
                  'border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  period === 'AM'
                    ? 'bg-white text-primary border-primary hover:bg-primary hover:text-white'
                    : 'bg-primary text-white border-primary hover:bg-primary/90'
                )}
                aria-label={`Toggle period, currently ${period}`}
              >
                {period}
              </button>
              <span className="text-xs text-gray-500 mt-1">Period</span>
            </div>
          )}
        </div>
      )}

      {/* Current time display */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">Selected time</p>
        <p className="text-lg font-semibold text-primary">
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
          {format === '12h' ? ` ${period}` : ''}
        </p>
      </div>
    </div>
  );
}
