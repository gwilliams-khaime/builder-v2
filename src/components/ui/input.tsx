import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { ResponsiveModal } from '@/components/modals/responsive-modal';
import { Datepicker } from './datepicker';
import { Timepicker } from './timepicker';
import { motion, AnimatePresence } from 'framer-motion';
import { CurrencyCode } from '@/components/modals/currency-modal';
import { Icons } from '@/icons';

// Base input props shared across all input types
interface BaseInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange' | 'value' | 'type'
  > {
  error?: string;
  label?: string | React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  iconSize?: 'sm' | 'md' | 'lg';
  size?: 'sm' | 'md' | 'lg';
  toolTip?: boolean;
  toolTipPosition?: 'left' | 'center' | 'right';
}

// Text-based input types (text, email, password)
interface TextInputProps extends BaseInputProps {
  type?: 'text' | 'email' | 'password' | 'url';
  value?: string;
  onChange?: (value: string) => void;
}

// Number input type
interface NumberInputProps extends BaseInputProps {
  type: 'number';
  value?: number | string;
  onChange?: (value: number) => void;
  step?: number;
  showNumberControls?: boolean;
  // Allow currency properties on number inputs for backward compatibility
  currency?: CurrencyCode;
  onCurrencyModalOpen?: () => void;
  showCurrencyToggled?: boolean;
  hideCurrencyText?: boolean;
  onCurrencyChange?: (currency: CurrencyCode) => void;
  currencyDropdownClassName?: string;
}

// Date input type
interface DateInputProps extends BaseInputProps {
  type: 'date';
  value?: Date | string;
  onChange?: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

// Time input type
interface TimeInputProps extends BaseInputProps {
  type: 'time';
  value?: Date | string;
  onChange?: (value: Date) => void;
}

// Price input type
interface PriceInputProps extends BaseInputProps {
  type: 'price';
  value?: number | string;
  onChange?: (value: number) => void;
  currency?: CurrencyCode;
  onCurrencyModalOpen?: () => void;
  showCurrencyToggled?: boolean;
  hideCurrencyText?: boolean;
  onCurrencyChange?: (currency: CurrencyCode) => void;
  currencyDropdownClassName?: string;
}

// Union type for all input props
type InputProps =
  | TextInputProps
  | NumberInputProps
  | DateInputProps
  | TimeInputProps
  | PriceInputProps;

// Helper function to format date to mm/dd/yyyy
const formatDateToString = (date: Date | null | undefined): string => {
  if (!date || !(date instanceof Date)) return '';
  if (isNaN(date.getTime())) return '';
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Helper function to format time to hh:mm AM/PM
const formatTimeToString = (date: Date | null | undefined): string => {
  if (!date || !(date instanceof Date)) return '';
  if (isNaN(date.getTime())) return '';
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format
  return `${String(hours).padStart(2, '0')}:${minutes} ${period}`;
};

// Normalize various input values into a valid Date or undefined
const normalizeToValidDate = (value: unknown, kind: 'date' | 'time'): Date | undefined => {
  if (!value) return undefined;
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? undefined : value;
  }
  if (typeof value === 'number') {
    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
  }
  if (typeof value === 'string') {
    if (kind === 'date') {
      // Try native parse first
      const d1 = new Date(value);
      if (!isNaN(d1.getTime())) return d1;
      // Try mm/dd/yyyy
      const d2 = parseDateString(value);
      if (d2 && !isNaN(d2.getTime())) return d2;
      return undefined;
    }
    // time parsing: supports HH:MM, HH:MM:SS, and with AM/PM
    const timeStr = value.trim();
    const ampmMatch = timeStr.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
    if (ampmMatch) {
      let hours = parseInt(ampmMatch[1], 10);
      const minutes = parseInt(ampmMatch[2], 10);
      const seconds = ampmMatch[3] ? parseInt(ampmMatch[3], 10) : 0;
      const period = ampmMatch[4]?.toUpperCase();
      if (period) {
        if (period === 'PM' && hours < 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
      }
      const d = new Date();
      d.setHours(hours, minutes, seconds, 0);
      return isNaN(d.getTime()) ? undefined : d;
    }
    // Fallback to Date parse
    const d3 = new Date(value);
    return isNaN(d3.getTime()) ? undefined : d3;
  }
  return undefined;
};

// Helper function to parse mm/dd/yyyy string to Date
const parseDateString = (dateString: string): Date | null => {
  if (!dateString) return null;
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;
  const month = parseInt(parts[0], 10) - 1;
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const parsedDate = new Date(year, month, day);
  // Validate the date is valid
  if (isNaN(parsedDate.getTime())) return null;
  return parsedDate;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // Type guards to narrow the union type
  const isTextInput = (p: InputProps): p is TextInputProps =>
    p.type === 'text' || p.type === 'email' || p.type === 'password';
  const isNumberInput = (p: InputProps): p is NumberInputProps => p.type === 'number';
  const isDateInput = (p: InputProps): p is DateInputProps => p.type === 'date';
  const isTimeInput = (p: InputProps): p is TimeInputProps => p.type === 'time';
  const isPriceInput = (p: InputProps): p is PriceInputProps => p.type === 'price';

  const {
    error,
    label,
    className,
    leftIcon,
    rightIcon,
    onLeftIconClick,
    onRightIconClick,
    iconSize = 'sm',
    size = 'sm',
    onChange,
    type = 'text',
    step = 1,
    ...restProps
  } = props;

  // Extract type-specific props with proper typing
  const currency = 'currency' in props ? props.currency : undefined;
  const onCurrencyModalOpen =
    'onCurrencyModalOpen' in props ? props.onCurrencyModalOpen : undefined;
  const showCurrencyToggled = 'showCurrencyToggled' in props ? props.showCurrencyToggled : true;
  const hideCurrencyText = 'hideCurrencyText' in props ? props.hideCurrencyText : false;
  const onCurrencyChange = 'onCurrencyChange' in props ? props.onCurrencyChange : undefined;
  const toolTip = 'toolTip' in props ? props.toolTip : false;
  const currencyDropdownClassName =
    'currencyDropdownClassName' in props ? props.currencyDropdownClassName : undefined;
  const minDate = 'minDate' in props ? props.minDate : undefined;
  const maxDate = 'maxDate' in props ? props.maxDate : undefined;
  const showNumberControls = 'showNumberControls' in props ? props.showNumberControls : true;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const priceInputRef = React.useRef<HTMLInputElement>(null);

  // Memoize control sizes to prevent re-calculation on every render
  const controlSizes = useMemo(() => {
    switch (size) {
      case 'sm':
        return {
          padding: 'right-2',
          gap: 'gap-0',
          buttonPadding: 'p-0.5',
          iconSize: 'w-3 h-3',
          inputPadding: 'pr-10',
        };
      case 'lg':
        return {
          padding: 'right-3',
          gap: 'gap-1',
          buttonPadding: 'p-1.5',
          iconSize: 'w-5 h-5',
          inputPadding: 'pr-20',
        };
      default: // md
        return {
          padding: 'right-2',
          gap: 'gap-0.5',
          buttonPadding: 'p-1',
          iconSize: 'w-4 h-4',
          inputPadding: 'pr-16',
        };
    }
  }, [size]);

  // Memoize increment handler to prevent re-creation on every render
  const handleIncrement = React.useCallback(() => {
    if (!isNumberInput(props) && !isPriceInput(props)) return;
    const currentValue =
      typeof restProps.value === 'number'
        ? restProps.value
        : typeof restProps.value === 'string'
          ? Number(restProps.value) || 0
          : 0;
    const newValue = currentValue + Number(step);
    const max = restProps.max !== undefined ? Number(restProps.max) : Infinity;
    const finalValue = Math.min(newValue, max);
    (onChange as any)?.(finalValue);
  }, [restProps.value, restProps.max, step, onChange, props]);

  // Memoize decrement handler to prevent re-creation on every render
  const handleDecrement = React.useCallback(() => {
    if (!isNumberInput(props) && !isPriceInput(props)) return;
    const currentValue =
      typeof restProps.value === 'number'
        ? restProps.value
        : typeof restProps.value === 'string'
          ? Number(restProps.value) || 0
          : 0;
    const newValue = currentValue - Number(step);
    const min = restProps.min !== undefined ? Number(restProps.min) : -Infinity;
    const finalValue = Math.max(newValue, min);
    (onChange as any)?.(finalValue);
  }, [restProps.value, restProps.min, step, onChange, props]);

  const getCountryCode = (curr: CurrencyCode) => {
    switch (curr) {
      case 'USD':
        return 'US';
      case 'NGN':
        return 'NG';
      case 'GBP':
        return 'GB';
      default:
        return 'US';
    }
  };

  const getCurrencySymbol = (curr: CurrencyCode) => {
    switch (curr) {
      case 'USD':
        return '$';
      case 'NGN':
        return '₦';
      case 'GBP':
        return '£';
      default:
        return '$';
    }
  };

  const getIconSizeClasses = () => {
    switch (iconSize) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  const getSizeClasses = () => {
    const isIos = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const textSize = isIos ? 'text-base' : 'text-sm';
    switch (size) {
      case 'sm':
        return `${textSize} py-2 px-4 rounded-sm`;
      case 'lg':
        return 'text-lg py-4 px-6 rounded-md';
      default:
        return 'text-base py-3 px-5 rounded-md';
    }
  };

  const getLabelClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm font-semibold';
      case 'lg':
        return 'text-lg font-semibold';
      default:
        return 'text-base font-semibold';
    }
  };

  const getPaddingClasses = () => {
    const leftPadding = leftIcon
      ? iconSize === 'sm'
        ? 'pl-10'
        : iconSize === 'lg'
          ? 'pl-14'
          : 'pl-12'
      : 'pl-4';
    const rightPadding =
      rightIcon || type === 'password'
        ? iconSize === 'sm'
          ? 'pr-10'
          : iconSize === 'lg'
            ? 'pr-14'
            : 'pr-12'
        : 'pr-4';
    return `${leftPadding} ${rightPadding}`.trim();
  };

  const validatePassword = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[#$&!@%^*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      isLonger: password.length >= 12,
    };
  };

  const validation = validatePassword(passwordValue);

  const commonClasses = useMemo(
    () =>
      clsx(
        `w-full text-lg border rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 focus:bg-card text-foreground ${
          error
            ? 'border-destructive/50 focus:border-destructive bg-destructive/5'
            : 'border-border focus:border-primary bg-transparent'
        }`,
        '[&::-webkit-calendar-picker-indicator]:hidden',
        '[&::-webkit-inner-spin-button]:hidden',
        '[&::-webkit-outer-spin-button]:hidden',
        getPaddingClasses(),
        className,
        getSizeClasses()
      ),
    [error, className, getPaddingClasses(), getSizeClasses()]
  );

  const getInputTypeComponent = () => {
    switch (type) {
      case 'password':
        return (
          <>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-gray-700 transition-colors focus:outline-none"
                tabIndex={-1}
              >
                <motion.div
                  key={showPassword ? 'eye-open' : 'eye-close'}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'center' }}
                >
                  {showPassword ? <Icons.EyeOpen /> : <Icons.EyeClose />}
                </motion.div>
              </button>
              <input
                ref={ref}
                className={commonClasses}
                onChange={(e) => {
                  setPasswordValue(e.target.value);
                  setShowPasswordTooltip(true);
                  (onChange as any)?.(e.target.value);
                }}
                onFocus={() => {
                  setShowPasswordTooltip(true);
                }}
                onFocusCapture={() => {
                  setShowPasswordTooltip(true);
                }}
                onBlurCapture={() => {
                  setShowPasswordTooltip(false);
                }}
                {...restProps}
                value={typeof restProps.value === 'string' ? restProps.value : ''}
                type={showPassword ? 'text' : 'password'}
              />
            </div>
            {showPasswordTooltip && toolTip && (
              <div className="absolute left-0 bottom-full mt-2 w-full max-w-sm bg-white border border-[#7c7c7c] rounded-xl shadow-lg p-4 z-50">
                <div className="absolute -bottom-2.5 left-6 w-4 h-4 bg-white border-r border-b border-[#7c7c7c] transform rotate-45" />
                <p className="text-sm font-semibold text-black mb-3">
                  Must be at least 8 characters
                </p>
                <p className="text-xs font-medium text-black mb-2">Tips to do:</p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-xs">
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        validation.hasUpperCase && validation.hasLowerCase
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      )}
                    />
                    <span
                      className={cn(
                        validation.hasUpperCase && validation.hasLowerCase
                          ? 'text-gray-700'
                          : 'text-black'
                      )}
                    >
                      Upper & lower case letters
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        validation.hasSymbol ? 'bg-green-500' : 'bg-gray-300'
                      )}
                    />
                    <span className={cn(validation.hasSymbol ? 'text-gray-700' : 'text-black')}>
                      A symbol like (#$&)
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        validation.hasNumber ? 'bg-green-500' : 'bg-gray-300'
                      )}
                    />
                    <span className={cn(validation.hasNumber ? 'text-gray-700' : 'text-black')}>
                      One number
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        validation.isLonger ? 'bg-green-500' : 'bg-gray-300'
                      )}
                    />
                    <span className={cn(validation.isLonger ? 'text-gray-700' : 'text-black')}>
                      A longer password
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </>
        );
      case 'date':
        return (
          <>
            <input
              type="text"
              onClick={() => setIsCalendarOpen(true)}
              readOnly
              value={formatDateToString(normalizeToValidDate(restProps.value, 'date'))}
              placeholder={restProps.placeholder || 'mm/dd/yyyy'}
              className={commonClasses}
            />

            <ResponsiveModal
              title="Select Date"
              isOpen={isCalendarOpen}
              onClose={() => {
                setIsCalendarOpen(false);
              }}
              width='400px'
            >
              <Datepicker
                onChange={(value) => {
                  (onChange as any)?.(value);
                  setIsCalendarOpen(false);
                }}
                value={normalizeToValidDate(restProps.value, 'date')}
                minDate={minDate}
                maxDate={maxDate}
              />
            </ResponsiveModal>
          </>
        );
      case 'time':
        return (
          <>
            <input
              type="text"
              onClick={() => setIsTimeOpen(true)}
              readOnly
              value={formatTimeToString(normalizeToValidDate(restProps.value, 'time'))}
              placeholder={restProps.placeholder || 'hh:mm AM/PM'}
              className={clsx(commonClasses, 'cursor-pointer')}
            />

            <ResponsiveModal
              title="Select Time"
              isOpen={isTimeOpen}
              onClose={() => {
                setIsTimeOpen(false);
              }}
            >
              <Timepicker
                onChange={(value) => {
                  (onChange as any)?.(value);
                }}
                value={normalizeToValidDate(restProps.value, 'time')}
              />
            </ResponsiveModal>
          </>
        );
      case 'price':
        return (
          <div className="flex items-center gap-3">
            {showCurrencyToggled && (
              <button
                type="button"
                onClick={() => onCurrencyModalOpen?.()}
                disabled={restProps.disabled}
                className={cn(
                  'flex items-center justify-between py-4 px-3 bg-white border border-[#E0E0E0] rounded-xl hover:bg-gray-50 transition-colors  !h-full disabled:opacity-50 disabled:cursor-not-allowed',
                  !hideCurrencyText && 'min-w-[100px]',
                  currencyDropdownClassName
                )}
              >
                <div
                  className={cn('flex items-center gap-2', hideCurrencyText && 'justify-center')}
                >
                  <ReactCountryFlag
                    countryCode={getCountryCode(currency || 'USD')}
                    svg
                    style={{ width: '1.2em', height: '1.2em' }}
                  />
                  {!hideCurrencyText && (
                    <span className="text-sm font-medium text-[#323232]">{currency}</span>
                  )}
                </div>
                <ChevronDown className="w-4 h-4 text-[#323232]" />
              </button>
            )}
            <div className="relative flex-1">
              {/* <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-600 bg-white">
                {getCurrencySymbol(currency || 'USD')}
              </span> */}

              <input
                ref={ref}
                className={clsx('h-[52px]', commonClasses)}
                value={
                  typeof restProps.value === 'number'
                    ? restProps.value.toString()
                    : typeof restProps.value === 'string'
                      ? restProps.value
                      : ''
                }
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9.]/g, '');
                  const numericValue = parseFloat(rawValue) || 0;
                  (onChange as any)?.(numericValue);
                }}
                onBlurCapture={(e) => {
                  // Format on blur to show proper formatting when not focused
                  if (restProps.value) {
                    const formatted = Number(restProps.value).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                    e.target.value = formatted;
                  }
                }}
                onFocusCapture={(e) => {
                  // Show raw number when focused for easier editing
                  if (restProps.value) {
                    e.target.value = String(restProps.value);
                  }
                }}
                placeholder={restProps.placeholder || '0.00'}
                disabled={restProps.disabled}
                name={restProps.name}
                id={restProps.id}
                inputMode="decimal"
              />
            </div>
          </div>
        );

      case 'number':
        return (
          <div className="relative">
            <input
              ref={ref}
              inputMode="numeric"
              className={clsx(commonClasses, showNumberControls && controlSizes.inputPadding)}
              type="number"
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : Number(e.target.value);
                (onChange as any)?.(value);
              }}
              {...restProps}
              value={
                typeof restProps.value === 'number'
                  ? restProps.value.toString()
                  : typeof restProps.value === 'string'
                    ? restProps.value
                    : ''
              }
            />
            {showNumberControls && (
              <div
                className={clsx(
                  'absolute top-1/2 -translate-y-1/2 flex flex-col',
                  controlSizes.padding,
                  controlSizes.gap
                )}
              >
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={
                    restProps.disabled ||
                    (restProps.max !== undefined &&
                      Number(restProps.value) >= Number(restProps.max))
                  }
                  className={clsx(
                    'rounded hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                    controlSizes.buttonPadding
                  )}
                  tabIndex={-1}
                >
                  <ChevronUp className={clsx(controlSizes.iconSize, 'text-gray-600')} />
                </button>
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={
                    restProps.disabled ||
                    (restProps.min !== undefined &&
                      Number(restProps.value) <= Number(restProps.min))
                  }
                  className={clsx(
                    'rounded hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                    controlSizes.buttonPadding
                  )}
                  tabIndex={-1}
                >
                  <ChevronDown className={clsx(controlSizes.iconSize, 'text-gray-600')} />
                </button>
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            ref={ref}
            inputMode={restProps.inputMode}
            className={commonClasses}
            type={type}
            onChange={(e) => (onChange as any)?.(e.target.value)}
            {...restProps}
            value={typeof restProps.value === 'string' ? restProps.value : ''}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {label && <h3 className={clsx(getLabelClasses(), 'text-muted-foreground')}>{label}</h3>}
      <div className="relative">
        {getInputTypeComponent()}

        {leftIcon && (
          <div
            className={clsx(
              'absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center',
              getIconSizeClasses(),
              onLeftIconClick && 'cursor-pointer hover:opacity-70 transition-opacity'
            )}
            onClick={onLeftIconClick}
          >
            <div className="w-full h-full flex items-center justify-center text-black">
              {leftIcon}
            </div>
          </div>
        )}
        {rightIcon && (
          <div
            className={clsx(
              'absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center',
              getIconSizeClasses(),
              onRightIconClick && 'cursor-pointer hover:opacity-70 transition-opacity'
            )}
            onClick={onRightIconClick}
          >
            <div className="w-full h-full flex items-center justify-center text-black">
              {rightIcon}
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <p className="w-full mt-2 text-sm text-red-600 bg-red-50/80 border border-red-100 p-2.5 rounded-lg font-medium input-error backdrop-blur-sm">
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

Input.displayName = 'Input';
