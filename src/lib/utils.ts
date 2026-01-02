import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToRGBA(hex: string, opacity: number) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return rgba format
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function themeColor() {
  return (typeof window !== 'undefined' && localStorage.getItem('primaryColor')) || '#4840E0';
}

export function themeColorRGBA(opacity: number) {
  return hexToRGBA(themeColor(), opacity);
}

const roundToDp = (num: number, dp = 2) => {
  return num.toFixed(dp);
};

const addCommas = (num: number | string) => {
  num = Number(num);
  if (isNaN(num)) return '';

  return num ? Number(num)?.toLocaleString() : '';
};

export const formatBankAmount = (num: number | string, dp = 2) => {
  num = Number(num);

  if (isNaN(num)) return '';

  // convert to dp
  num = roundToDp(num, dp);

  // Convert the number to a string
  const str = num.toString();

  // Split the string into whole and decimal parts
  const parts = str.split('.');
  const wholePart = parts[0];
  const decimalPart = parts[1] || '0'.repeat(dp);

  // Combine the whole and decimal parts with a period
  let formattedNum = `${addCommas(wholePart) || '0'}.${decimalPart}`;

  // Add trailing zeros to the decimal part if necessary
  if (decimalPart.length === 1) {
    formattedNum += '0';
  }

  return formattedNum || `0.${'0'.repeat(dp)}`;
};

export function appendCategoriesWithUnderscore(baseId: string, categories: string[]): string {
  // Sort to ensure consistent order
  const sortedCategories = [...categories].sort();
  
  // Add timestamp to ensure uniqueness even for same categories
  const timestamp = Date.now();
  
  // Create a more unique hash using a combination of the strings and timestamp
  const hash = btoa(`${sortedCategories.join('_')}_${timestamp}`)
    .replace(/[/+=]/g, '') // Remove non-alphanumeric characters
    .slice(0, 8); // Keep it reasonably short
    
  return `${baseId}_${hash}`;
}

const DeviceSizes: Record<string, number> = {
  Desktop: 992,
  Mobile: 385,
  Tablet: 768,
};

export function findNearestDeviceSize(value: number): string {
  const sortedDevices = Object.entries(DeviceSizes).sort((a, b) => a[1] - b[1]);

  // If the value is less than the smallest device value
  if (value < sortedDevices[0][1]) {
    return `(max-width: ${sortedDevices[0][1]}px)`;
  }

  // If the value is greater than the largest device value
  if (value > sortedDevices[sortedDevices.length - 1][1]) {
    return `(min-width: ${sortedDevices[sortedDevices.length - 1][1]}px)`;
  }

  // Find the nearest device within range and return a range query
  let nearestLowerDevice: [string, number] | null = null;
  let nearestUpperDevice: [string, number] | null = null;

  for (let i = 0; i < sortedDevices.length; i++) {
    const [device, deviceValue] = sortedDevices[i];
    if (deviceValue <= value) {
      nearestLowerDevice = [device, deviceValue];
    }
    if (deviceValue >= value && !nearestUpperDevice) {
      nearestUpperDevice = [device, deviceValue];
    }
  }

  if (nearestLowerDevice && nearestUpperDevice) {
    return `(min-width: ${nearestLowerDevice[1]}px) and (max-width: ${nearestUpperDevice[1]}px)`;
  }

  return '';
}
