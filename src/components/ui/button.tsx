import React from 'react';
import clsx from 'clsx';
import { Loader } from './loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'transparent' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xs';
  color?: 'primary' | 'gray' | 'red' | 'blue' | 'green';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'sm',
  color,
  type = 'button',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const getColorClasses = (baseColor: string) => {
    switch (baseColor) {
      case 'gray':
        return {
          solid: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400/50',
          outline:
            'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 focus:ring-gray-400/50',
          ghost: 'text-gray-600 bg-transparent hover:bg-gray-100 focus:ring-gray-400/50',
        };
      case 'red':
        return {
          solid: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50',
          outline:
            'border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white focus:ring-red-500/50',
          ghost: 'text-red-600 bg-transparent hover:bg-red-100 focus:ring-red-500/50',
        };
      case 'blue':
        return {
          solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50',
          outline:
            'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white focus:ring-blue-500/50',
          ghost: 'text-blue-600 bg-transparent hover:bg-blue-100 focus:ring-blue-500/50',
        };
      case 'green':
        return {
          solid: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500/50',
          outline:
            'border-2 border-green-600 text-green-600 bg-transparent hover:bg-green-600 hover:text-white focus:ring-green-500/50',
          ghost: 'text-green-600 bg-transparent hover:bg-green-100 focus:ring-green-500/50',
        };

      default: // primary
        return {
          solid: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50 hover:text-white',
          outline:
            'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-primary/50',
          ghost: 'text-primary bg-transparent hover:bg-primary/10 focus:ring-primary/50',
        };
    }
  };

  const getVariantClasses = () => {
    const colorScheme = getColorClasses(color || 'primary');

    switch (variant) {
      case 'primary':
        return colorScheme.solid;
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-panel-hover focus:ring-ring/50';
      case 'outline':
        return colorScheme.outline;
      case 'ghost':
        return colorScheme.ghost;
      case 'danger':
        return 'bg-destructive text-white hover:bg-destructive/90 focus:ring-destructive/50';
      case 'transparent':
        return 'bg-transparent text-foreground hover:bg-transparent hover:text-foreground focus:ring-ring/50';
      default:
        return colorScheme.solid;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm font-medium rounded-lg';
      case 'lg':
        return 'px-8 py-4 text-lg font-semibold rounded-xl';
      case 'xs':
        return 'px-2 py-2 text-sm font-medium rounded-lg';
      default:
        return 'px-6 py-3.5 text-base font-semibold rounded-xl';
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0',
        getVariantClasses(),
        getSizeClasses(),
        fullWidth && 'w-full',
        isDisabled && 'opacity-50 cursor-not-allowed',
        loading && 'cursor-wait',
        className
      )}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {loading && (
        <Loader
          size="xs"
          color={
            variant === 'primary' || variant === 'danger' || (variant === 'outline' && color)
              ? 'white'
              : 'primary'
          }
        />
      )}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {!loading && <span className={clsx(loading && 'opacity-0')}>{children}</span>}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};
