import React from 'react';
import clsx from 'clsx';

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray' | 'red';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', color = 'primary', className }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-4 h-4 border-[3px]';
      case 'sm':
        return 'w-6 h-6 border-[3px]';
      case 'md':
        return 'w-10 h-10 border-[3px]';
      case 'lg':
        return 'w-14 h-14 border-[4px]';
      case 'xl':
        return 'w-20 h-20 border-[5px]';
      default:
        return 'w-10 h-10 border-[3px]';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'border-gray-200 border-t-primary';
      case 'white':
        return 'border-gray-300 border-t-white';
      case 'gray':
        return 'border-gray-200 border-t-gray-600';
      case 'red':
        return 'border-gray-200 border-t-red-600';
      default:
        return 'border-gray-200 border-t-primary';
    }
  };

  return (
    <div
      className={clsx(
        'inline-block animate-spin rounded-full',
        getSizeClasses(),
        getColorClasses(),
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
