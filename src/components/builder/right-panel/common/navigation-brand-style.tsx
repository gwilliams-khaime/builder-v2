'use client';

import { Icons } from "@/icons";
import { Tooltip } from "@mantine/core";
import { Check, EditIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface LogoPositionDropdownProps {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  loading?: boolean;
}

const LogoPositionDropdown: React.FC<LogoPositionDropdownProps> = ({
  value,
  onChange,
  isOpen,
  onToggle,
  loading = false,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const options: SelectOption[] = [
    { value: 'left', label: 'Left Side' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right Side' },
  ];

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  const handleOptionClick = (option: SelectOption) => {
    onChange(option.value);
    onToggle();
  };

  return (
    <div className="relative flex-1" ref={selectRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!loading) onToggle();
        }}
        disabled={loading}
        className={`w-full bg-secondary rounded-lg p-3 flex items-center justify-between border border-border transition-all duration-200 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span className="text-sm font-medium text-foreground">{selectedOption?.label}</span>
        <div className="flex items-center gap-2">
          {loading && (
            <div className="w-3 h-3 border border-gray-400 border-t-gray-600 rounded-full animate-spin" />
          )}
          <svg
            className={`w-4 h-4 text-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div
        className={`absolute top-full left-0 right-0 mt-2 bg-popover rounded-xl border z-50 border-border overflow-hidden transition-all duration-300 ease-out origin-top ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
        style={{
          boxShadow: '0px 4px 16px 0px #0000001A',
        }}
      >
        {options.map((option, index) => (
          <button
            key={option.value}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOptionClick(option);
            }}
            className={`w-full p-3 flex items-center hover:bg-secondary transition-colors duration-150 ${
              selectedOption.value === option.value ? 'bg-secondary' : ''
            } ${index !== options.length - 1 ? 'border-b border-border' : ''}`}
          >
            <span className="text-sm font-medium text-foreground">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

interface NavigationBrandStyleProps {
  brandStyle: {
    logo_type: 'image' | 'typography';
    logo_position: 'left' | 'center' | 'right';
    logo_size: 'small' | 'medium' | 'large';
  };
  setBrandStyle: (values: {
    logo_type: 'image' | 'typography';
    logo_position: 'left' | 'center' | 'right';
    logo_size: 'small' | 'medium' | 'large';
  }) => void;
  onNameChange?: (name: string) => void;
}

export const NavigationBrandStyle = ({ brandStyle, setBrandStyle, onNameChange }: NavigationBrandStyleProps) => {
  // Simulated loading state (set to false for static data)
  const isLoading = false;

  // Dropdown visibility state
  const [showPositionDropdown, setShowPositionDropdown] = useState<boolean>(false);

  // Simulated business name editing state
  const [businessNameValue, setBusinessNameValue] = useState({
    businessName: 'My Business',
    isEditing: false,
  });

  // Simulated educator/business data - will be replaced with API data
  const educatorName = 'My Business';
  const educatorLogo = ''; // Empty string to test typography fallback, or use a placeholder URL

  // Simulated mutation state for company info updates
  const updateCompanyInfoMutation = {
    isPending: false,
    mutate: (data: { businessName: string }) => {
      // Simulate API call
      console.log('Updating company info:', data);
      setBusinessNameValue((prev) => ({
        ...prev,
        businessName: data.businessName,
        isEditing: false,
      }));
      onNameChange?.(data.businessName);
    },
  };

  // Handler for toggling edit mode
  const handleEditToggle = () => {
    if (businessNameValue.isEditing) {
      // Save the name
      updateCompanyInfoMutation.mutate({ businessName: businessNameValue.businessName });
    } else {
      // Enter edit mode
      setBusinessNameValue((prev) => ({ ...prev, isEditing: true }));
    }
  };

  // Handler for logo type change
  const handleLogoTypeChange = (type: 'image' | 'typography') => {
    setBrandStyle({
      ...brandStyle,
      logo_type: type,
    });
  };

  // Handler for logo position change
  const handleLogoPositionChange = (position: string) => {
    setBrandStyle({
      ...brandStyle,
      logo_position: position as 'left' | 'center' | 'right',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-xs font-light text-foreground">Brand Logo</h3>
        <Tooltip
          label="Select the type of logo you want to display in your navigation"
          multiline
          w={220}
          withArrow
          radius="md"
          styles={{ tooltip: { fontSize: 'var(--mantine-font-size-xs)' } }}
        >
          <Icons.Info className="w-4 h-4 text-muted-foreground" />
        </Tooltip>
      </div>

      <div className="relative border border-border bg-card rounded-full">
        <div
          className={`absolute top-0 bottom-0 bg-foreground rounded-full transition-all duration-300 ease-in-out ${
            brandStyle.logo_type === 'image' ? 'left-0 right-1/2' : 'left-1/2 right-0'
          }`}
        />
        <div className="relative flex">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLogoTypeChange('image');
            }}
            className={`flex-1 px-4 py-3 rounded-full text-xs font-medium transition-colors duration-300 relative z-10 flex items-center justify-center gap-2 ${
              brandStyle.logo_type === 'image' ? 'text-background' : 'text-muted-foreground'
            } ${brandStyle.logo_type ? 'opacity-70' : ''}`}
          >
            {brandStyle.logo_type === 'image' && isLoading && (
              <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
            )}
            Brand Logo
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLogoTypeChange('typography');
            }}
            className={`flex-1 px-6 py-3 rounded-full text-xs font-medium transition-colors duration-300 relative z-10 flex items-center justify-center gap-2 ${
              brandStyle.logo_type === 'typography' ? 'text-background' : 'text-muted-foreground'
            } ${brandStyle.logo_type ? 'opacity-70' : ''}`}
          >
            {brandStyle.logo_type === 'typography' && isLoading && (
              <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
            )}
            Typography
          </button>
        </div>
      </div>

      {/* Logo Preview */}
      <div className="w-full h-32 bg-secondary rounded-lg flex items-center justify-center relative">
        {brandStyle.logo_type === 'typography' && (
          <button
            className="absolute top-3 right-3 w-8 h-8 transition-colors flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEditToggle();
            }}
          >
            {updateCompanyInfoMutation.isPending ? (
              <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
            ) : businessNameValue.isEditing ? (
              <Check className="w-4 h-4 text-foreground" />
            ) : (
              <EditIcon className="w-4 h-4 text-foreground" />
            )}
          </button>
        )}
        <div className="flex items-center justify-center h-full px-4">
          {brandStyle.logo_type === 'typography' ? (
            businessNameValue.isEditing ? (
              <input
                type="text"
                value={businessNameValue.businessName}
                onChange={(e) => {
                  setBusinessNameValue((prev) => ({ ...prev, businessName: e.target.value }));
                }}
                className="text-2xl font-bold text-foreground w-[250px] bg-transparent border-b-2 border-border focus:border-primary focus:outline-none text-center min-w-0 flex-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEditToggle();
                  } else if (e.key === 'Escape') {
                    setBusinessNameValue((prev) => ({ ...prev, isEditing: false }));
                  }
                }}
              />
            ) : (
              <div
                className="text-2xl font-bold text-foreground cursor-pointer"
                onClick={() => setBusinessNameValue((prev) => ({ ...prev, isEditing: true }))}
              >
                {businessNameValue.businessName || educatorName}
              </div>
            )
          ) : educatorLogo ? (
            <img
              src={educatorLogo}
              alt={`${educatorName} Logo`}
              className="max-h-20 max-w-full object-contain"
              onError={(e) => {
                // Fallback to typography if image fails to load
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
          ) : (
            <div className="text-2xl font-bold text-foreground">{educatorName}</div>
          )}
          {/* Fallback typography (hidden by default) */}
          {brandStyle.logo_type === 'image' && educatorLogo && (
            <div className="text-2xl font-bold text-foreground" style={{ display: 'none' }}>
              {educatorName}
            </div>
          )}
        </div>
      </div>

      {/* Logo Position Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-light text-foreground">Logo Position</h3>
        <LogoPositionDropdown
          value={brandStyle.logo_position}
          onChange={handleLogoPositionChange}
          isOpen={showPositionDropdown}
          onToggle={() => setShowPositionDropdown(!showPositionDropdown)}
          loading={false}
        />
      </div>
    </div>
  );
};