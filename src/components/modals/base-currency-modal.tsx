'use client';

import React, { useState, useMemo } from 'react';
import { ResponsiveModal } from './responsive-modal';
import ReactCountryFlag from 'react-country-flag';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search } from 'lucide-react';

export type CurrencyCode = 'USD' | 'NGN' | 'GBP' | 'CAD' | 'AUD';

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  countryCode: string;
  region: string;
}

interface BaseCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (currency: CurrencyCode) => void;
}

const allCurrencies: Currency[] = [
  {
    code: 'GBP',
    name: 'GBP - United Kingdom',
    symbol: '£',
    countryCode: 'GB',
    region: 'United Kingdom',
  },
  {
    code: 'USD',
    name: 'USD - United States',
    symbol: '$',
    countryCode: 'US',
    region: 'United States',
  },
  {
    code: 'NGN',
    name: 'NGN - Nigeria',
    symbol: '₦',
    countryCode: 'NG',
    region: 'Nigeria',
  },
  {
    code: 'CAD',
    name: 'CAD - Canada',
    symbol: '$',
    countryCode: 'CA',
    region: 'Canada',
  },
//   {
//     code: 'AUD',
//     name: 'AUD - Australia',
//     symbol: '$',
//     countryCode: 'AU',
//     region: 'Australia',
//   },
];

export const BaseCurrencyModal: React.FC<BaseCurrencyModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery.trim()) {
      return allCurrencies;
    }

    const query = searchQuery.toLowerCase();
    return allCurrencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query) ||
        currency.region.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleUpdateCurrency = async () => {
    if (!selectedCurrency) {
      toast.error('Please select a currency');
      return;
    }

    setIsLoading(true);
    try {
      // await updateCompanyInfo({
      //   baseline_currency:selectedCurrency
      // });

      toast.success('Base currency updated successfully');
      onSuccess(selectedCurrency);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Failed to update base currency:', error);
      toast.error('Failed to update base currency. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Base Currency"
      width="500px"
      closeOnClickOutside={false}
    >
      <div className="mb-4 space-y-4">
        <p className="text-sm text-gray-600">
          Choose your primary currency for all your created products. You will still earn in other
          currencies on Khaime.
        </p>

        <div className="relative">
          <Input
            placeholder="Search for Currency..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value as string)}
            leftIcon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Common Selection</h4>
          <div className="grid grid-cols-2 gap-3">
            {filteredCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => setSelectedCurrency(currency.code)}
                className={`flex items-center gap-1 p-2 rounded-full border transition-all ${
                  selectedCurrency === currency.code
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ReactCountryFlag
                  countryCode={currency.countryCode}
                  svg
                  style={{ width: '.5em', height: '.5em' }}
                />
                <span className="text-sm font-medium text-gray-900">{currency.name}</span>
              </button>
            ))}
          </div>

          {filteredCurrencies.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No currencies found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>

        <Button
          onClick={handleUpdateCurrency}
          variant="primary"
          fullWidth
          size="lg"
          loading={isLoading}
          disabled={!selectedCurrency || isLoading}
          className="mt-4"
        >
          Update Currency
        </Button>
      </div>
    </ResponsiveModal>
  );
};
