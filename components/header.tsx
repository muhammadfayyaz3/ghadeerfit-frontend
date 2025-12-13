'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import NotificationBell from './notification-bell';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language || 'ar';
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Sync with URL search params
  useEffect(() => {
    const query = searchParams.get('search') || '';
    if (query !== searchQuery) {
      setSearchQuery(query);
    }
  }, [searchParams, searchQuery]);

  // Handle search change - update local state and URL with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pathname === `/${locale}`) {
        const currentSearch = searchParams.get('search') || '';
        if (searchQuery !== currentSearch) {
          const params = new URLSearchParams(searchParams);
          if (searchQuery) {
            params.set('search', searchQuery);
          } else {
            params.delete('search');
          }
          router.push(`/${locale}?${params.toString()}`, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, pathname, searchParams, router, locale]);

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show header at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else {
        // Scrolling up - show header
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full border-b bg-white shadow-xl transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
      <button onClick={handleLogoClick} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
          <Image 
            src="/logo.png" 
            alt={t('header.logo')}
            width={140} 
            height={40}
            className="h-10 w-auto"
            priority
            style={{ height: '35px', width: '35px' }}
          />
          <p className="text-2xl font-bold text-gray-700 font-weight-400 ml-2">{t('header.logo')}</p>
        </button>

        <div className="flex items-center">
          <NotificationBell />
        </div>
      </div>
    </header>
  );
}
