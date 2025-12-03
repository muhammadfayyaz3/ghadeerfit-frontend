'use client';

import React, { useState } from 'react';
import { Category } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
}

const CATEGORY_COLORS = [
  '#F56247',
  '#534444',
  '#f84e2e',
  '#313131',
  '#707174',
  '#f65b14',
  '#de7962',
  '#d62424',
  '#AD3928',
  '#e19181',
];

// Helper function to darken a hex color for hover effect
const darkenColor = (hex: string, percent: number = 10): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.floor((num >> 16) * (1 - percent / 100)));
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) * (1 - percent / 100)));
  const b = Math.max(0, Math.floor((num & 0x0000FF) * (1 - percent / 100)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

// Number of categories to show in 2 lines on small screens
const INITIAL_CATEGORIES_COUNT = 6;

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryToggle,
}: CategoryFilterProps) {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  
  // Determine which categories to show on small screens
  const displayCategories = showAll ? categories : categories.slice(0, INITIAL_CATEGORIES_COUNT);
  const hasMoreCategories = categories.length > INITIAL_CATEGORIES_COUNT;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 justify-center">
        {/* On small screens, show limited categories. On md+ screens, show all */}
        {categories.map((category, index) => {
          const isSelected = selectedCategories.includes(category.id);
          const backgroundColor = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
          const hoverColor = darkenColor(backgroundColor, 15);
          const isHiddenOnMobile = !showAll && index >= INITIAL_CATEGORIES_COUNT;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryToggle(category.id)}
              className={cn(
                'px-6 py-2 rounded-full font-bold text-sm md:text-base transition-all duration-200 shadow-md text-white',
                isSelected 
                  ? 'ring-2 ring-offset-2 ring-[#ed4d50] scale-105'
                  : 'opacity-75',
                // Hide categories beyond initial count on small screens only
                isHiddenOnMobile && 'hidden md:inline-block'
              )}
              style={{
                backgroundColor: backgroundColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = backgroundColor;
              }}
              aria-pressed={isSelected}
              aria-label={category.name}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      
      {/* Show more/less button - only visible on small screens */}
      {hasMoreCategories && (
        <div className="flex justify-center mt-3 md:hidden">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            {showAll ? t('common.showLess') : t('common.showMore')}
          </button>
        </div>
      )}
    </div>
  );
}
