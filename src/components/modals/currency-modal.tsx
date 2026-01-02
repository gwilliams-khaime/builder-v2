'use client';

import React from 'react';
import { ResponsiveModal } from './responsive-modal';
import ReactCountryFlag from 'react-country-flag';
import { CurrencyCode } from './base-currency-modal';
export type { CurrencyCode };

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  countryCode: string;
}

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: CurrencyCode | string;
  onSelectCurrency: (currency: CurrencyCode) => void;
  title?: string;
  currencies?: Currency[];
}

const defaultCurrencies: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    countryCode: 'US',
  },
  {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    countryCode: 'NG',
  },
  {
    code: 'GBP',
    name: 'Pound Sterling',
    symbol: '£',
    countryCode: 'GB',
  },
];

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  onSelectCurrency,
  title = 'Select Currency',
  currencies = defaultCurrencies,
}) => {
  const handleSelect = (currencyCode: CurrencyCode) => {
    onSelectCurrency(currencyCode);
    onClose();
  };

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} title={title} width="400px">
      <div className="  space-y-3 pb-5">
        {currencies.map((currency) => (
          <button
            key={currency.code}
            onClick={() => handleSelect(currency.code)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
              currentCurrency === currency.code
                ? 'border-primary bg-primary/10'
                : 'border-[#E0E0E0] hover:bg-[#F6F6F6]'
            }`}
          >
            <ReactCountryFlag
              countryCode={currency.countryCode}
              svg
              style={{ width: '1.5em', height: '1.5em' }}
            />
            <div className="text-left">
              <div className="text-sm font-medium text-[#161616]">{currency.name}</div>
              <div className="text-xs text-[#323232]">
                {currency.code} ({currency.symbol})
              </div>
            </div>
            {currentCurrency === currency.code && (
              <div className="ml-auto w-4 h-4 border-2 border-primary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </ResponsiveModal>
  );
};

// Hook for managing currency modal state
export const useCurrencyModal = (
  initialCurrency: CurrencyCode = 'NGN',
  autoDetect: boolean = true
) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<CurrencyCode>(initialCurrency);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDetecting, setIsDetecting] = React.useState(false);

  // Detect currency from IP on mount if autoDetect is true
  React.useEffect(() => {
    if (!autoDetect) return;

    const detectCurrency = async () => {
      setIsDetecting(true);
      try {
        // const { getCachedOrDetectCurrency } = await import('@/utils/ip-currency-detection');
        // const detectedCurrency = await getCachedOrDetectCurrency(initialCurrency);
        // setSelectedCurrency(detectedCurrency);
      } catch (error) {
        console.error('Failed to detect currency:', error);
        setSelectedCurrency(initialCurrency);
      } finally {
        setIsDetecting(false);
      }
    };

    detectCurrency();
  }, [autoDetect, initialCurrency]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const selectCurrency = (currency: CurrencyCode) => {
    setSelectedCurrency(currency);
    closeModal();
  };

  return {
    selectedCurrency,
    isOpen,
    openModal,
    closeModal,
    selectCurrency,
    setSelectedCurrency,
    isDetecting,
  };
};

export default CurrencyModal;
