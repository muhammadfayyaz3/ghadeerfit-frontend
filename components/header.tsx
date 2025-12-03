'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import NotificationBell from './notification-bell';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language || 'en';
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white shadow-xl">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
      <Link href={`/${locale}`} className="flex items-center">
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
        </Link>

        <div className="flex items-center">
          <NotificationBell />
        </div>
      </div>
    </header>
  );
}
