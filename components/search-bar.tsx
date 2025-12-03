'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const { t, i18n } = useTranslation();
  const actualPlaceholder = placeholder || t('search.placeholder');
  const isRTL = i18n.language === 'ar';
  
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6">
      <div className="relative">
        <Search className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${
          isRTL ? 'right-3 top-4' : 'left-3'
        }`} />
        <Input
          type="text"
          placeholder={actualPlaceholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`py-6 text-base rounded-full shadow-md ${
            isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'
          }`}
          aria-label={t('search.placeholder')}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors ${
              isRTL ? 'left-3' : 'right-3'
            }`}
            aria-label={t('search.clear')}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
