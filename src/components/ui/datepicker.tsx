"use client";

import { useState, useEffect, useRef } from 'react';
import { IconChevronLeft, IconChevronRight, IconCalendar } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface DatepickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  highlightToday?: boolean;
  showInput?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const sizeConfig = {
  sm: {
    container: 'p-2',
    dayButton: 'h-7 w-7 text-xs',
    dayLabel: 'h-7 w-7 text-xs',
    headerHeight: 'h-8',
    headerText: 'text-sm',
    icon: 16,
    input: 'px-2 py-1 text-sm',
    calendarHeight: 'min-h-[200px]',
    pickerHeight: 'h-[200px]',
    pickerButton: 'px-2 py-1 text-xs',
    gap: 'gap-0.5',
  },
  md: {
    container: 'p-4',
    dayButton: 'h-10 w-10 text-sm',
    dayLabel: 'h-10 w-10 text-sm',
    headerHeight: 'h-10',
    headerText: 'text-lg',
    icon: 20,
    input: 'px-3 py-2 text-base',
    calendarHeight: 'min-h-[280px]',
    pickerHeight: 'h-[280px]',
    pickerButton: 'px-3 py-2 text-sm',
    gap: 'gap-1',
  },
  lg: {
    container: 'p-6',
    dayButton: 'h-12 w-12 text-base',
    dayLabel: 'h-12 w-12 text-base',
    headerHeight: 'h-12',
    headerText: 'text-xl',
    icon: 24,
    input: 'px-4 py-3 text-lg',
    calendarHeight: 'min-h-[340px]',
    pickerHeight: 'h-[340px]',
    pickerButton: 'px-4 py-3 text-base',
    gap: 'gap-2',
  },
};

export function Datepicker({
  value,
  onChange,
  minDate,
  maxDate,
  className,
  highlightToday = true,
  showInput = true,
  size = 'md',
}: DatepickerProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    if (value instanceof Date) return value;
    if (value) return new Date(value);
    return new Date();
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const sizes = sizeConfig[size];

  // Format date as MM/DD/YYYY
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Update currentDate and input when value changes
  useEffect(() => {
    if (value instanceof Date) {
      setCurrentDate(value);
      setSelectedDate(value);
      setInputValue(formatDate(value));
    } else if (value) {
      const newDate = new Date(value);
      setCurrentDate(newDate);
      setSelectedDate(newDate);
      setInputValue(formatDate(newDate));
    }
  }, [value]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);

    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
    setInputValue(formatDate(newDate));
    onChange?.(newDate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);

    // Try to parse the date (supports MM/DD/YYYY, M/D/YYYY, etc.)
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = input.match(dateRegex);

    if (match) {
      const month = parseInt(match[1], 10) - 1;
      const day = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);

      const newDate = new Date(year, month, day);

      // Validate the date is real (handles invalid dates like 02/31/2024)
      if (
        newDate.getFullYear() === year &&
        newDate.getMonth() === month &&
        newDate.getDate() === day
      ) {
        if (minDate && newDate < minDate) return;
        if (maxDate && newDate > maxDate) return;

        setCurrentDate(newDate);
        setSelectedDate(newDate);
        onChange?.(newDate);
      }
    }
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentMonth, 1));
    setShowYearPicker(false);
  };

  const handleMonthSelect = (month: number) => {
    setCurrentDate(new Date(currentYear, month, 1));
    setShowMonthPicker(false);
  };

  // Generate year range (current year ± 100 years)
  const generateYears = () => {
    const years = [];
    const startYear = currentYear - 100;
    const endYear = currentYear + 100;
    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const renderDays = () => {
    const days = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <button
          key={`prev-${day}`}
          className={cn(
            sizes.dayButton,
            'text-gray-400 hover:bg-gray-100 rounded-lg transition-colors cursor-default'
          )}
          disabled
        >
          {day}
        </button>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const disabled = isDateDisabled(day);
      const today = isToday(day);
      const selected = isSelected(day);

      days.push(
        <button
          key={`current-${day}`}
          onClick={() => !disabled && handleDateClick(day)}
          disabled={disabled}
          className={cn(
            sizes.dayButton,
            'rounded-lg font-medium transition-all',
            'hover:bg-primary/10 hover:text-primary',
            {
              'text-gray-400 cursor-not-allowed': disabled,
              'bg-primary text-white hover:bg-primary hover:text-white': selected,
              'ring-2 ring-primary ring-offset-2': today && highlightToday && !selected,
              'cursor-pointer': !disabled,
            }
          )}
        >
          {day}
        </button>
      );
    }

    // Next month days to fill the grid
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - days.length;

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className={cn(
            sizes.dayButton,
            'text-gray-400 hover:bg-gray-100 rounded-lg transition-colors cursor-default'
          )}
          disabled
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={cn('bg-white rounded-xl w-full', sizes.container, className)}>
      {/* Date Input Field */}
      {showInput && (
        <div className="mb-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="MM/DD/YYYY"
              className={cn(
                'w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                sizes.input
              )}
            />
            <IconCalendar
              size={sizes.icon}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      )}

      {/* Header with fixed height */}
      <div className={cn('flex items-center justify-between mb-4', sizes.headerHeight)}>
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          aria-label="Previous month"
        >
          <IconChevronLeft size={sizes.icon} />
        </button>

        <div className={cn('flex items-center gap-2 font-semibold', sizes.headerText)}>
          <button
            onClick={() => {
              setShowMonthPicker(!showMonthPicker);
              setShowYearPicker(false);
            }}
            className="hover:text-primary transition-colors px-2 py-1 rounded hover:bg-gray-100"
          >
            {MONTHS[currentMonth]}
          </button>
          <button
            onClick={() => {
              setShowYearPicker(!showYearPicker);
              setShowMonthPicker(false);
            }}
            className="hover:text-primary transition-colors px-2 py-1 rounded hover:bg-gray-100"
          >
            {currentYear}
          </button>
        </div>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          aria-label="Next month"
        >
          <IconChevronRight size={sizes.icon} />
        </button>
      </div>

      {/* Fixed height container to prevent jumping */}
      <div className={sizes.calendarHeight}>
        {/* Year Picker */}
        {showYearPicker && (
          <div className={cn(sizes.pickerHeight, 'overflow-y-auto border border-gray-200 rounded-lg')}>
            <div className={cn('grid grid-cols-3 p-2', sizes.gap)}>
              {generateYears().map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className={cn(
                    sizes.pickerButton,
                    'rounded-lg font-medium transition-all hover:bg-primary/10',
                    {
                      'bg-primary text-white hover:bg-primary': year === currentYear,
                    }
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Month Picker */}
        {showMonthPicker && (
          <div className={cn(sizes.pickerHeight, 'flex items-center justify-center')}>
            <div className={cn('grid grid-cols-3 p-2 w-full', sizes.gap)}>
              {MONTHS.map((month, index) => (
                <button
                  key={month}
                  onClick={() => handleMonthSelect(index)}
                  className={cn(
                    sizes.pickerButton,
                    'rounded-lg font-medium transition-all hover:bg-primary/10',
                    {
                      'bg-primary text-white hover:bg-primary': index === currentMonth,
                    }
                  )}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Calendar View */}
        {!showYearPicker && !showMonthPicker && (
          <>
            {/* Day labels */}
            <div className={cn('grid grid-cols-7 mb-2', sizes.gap)}>
              {DAYS.map((day) => (
                <div
                  key={day}
                  className={cn(
                    sizes.dayLabel,
                    'flex items-center justify-center font-medium text-gray-600'
                  )}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className={cn('grid grid-cols-7', sizes.gap)}>{renderDays()}</div>
          </>
        )}
      </div>
    </div>
  );
}

 